import { and, asc, eq, gte, inArray, isNull, lte, sql } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachSequenceSendClaimsTable,
  outreachSuppressionsTable,
  prospectsTable,
  type OutreachMessage,
  type Prospect,
} from "@workspace/db";
import { approvedOutreachFollowUpMessages } from "./verifiedOutreachBatch";
import { getFollowUpScheduledAt } from "./outreachEligibility";

const FOLLOW_UP_SEQUENCE_NUMBERS = [2] as const;
const LEGACY_EXTRA_FOLLOW_UP_SEQUENCE_NUMBERS = [3, 4] as const;
export const OPENER_FOLLOW_UP_MAX_AGE_DAYS = 30;
const OPENER_FOLLOW_UP_MAX_AGE_MS = OPENER_FOLLOW_UP_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
const DETERMINISTIC_PREFLIGHT_FAILURES = new Set([
  "Follow-up cannot send before its Phoenix opener-based business cadence",
  "Message cannot send before its scheduled time",
]);

export function isSafeDeterministicFollowUpRetry(
  message: Pick<
    OutreachMessage,
    "status" | "error" | "sentAt" | "providerMessageId" | "providerReconciliationKey"
  >,
): boolean {
  return message.status === "failed"
    && Boolean(message.error && DETERMINISTIC_PREFLIGHT_FAILURES.has(message.error))
    && message.sentAt === null
    && message.providerMessageId === null
    && message.providerReconciliationKey === null;
}

export function isOpenerFollowUpWithinWindow(
  engagedAt: Date,
  now = new Date(),
): boolean {
  const ageMs = now.getTime() - engagedAt.getTime();
  return ageMs >= 0 && ageMs <= OPENER_FOLLOW_UP_MAX_AGE_MS;
}

type InitialSequenceMessage = Pick<
  OutreachMessage,
  "id" | "prospectId" | "campaignId" | "sequenceNumber" | "sourceType" | "sourceId"
>;

export async function ensureApprovedFollowUpSequence(
  initialMessage: InitialSequenceMessage,
  prospect: Pick<Prospect, "contactName">,
  now = new Date(),
  options: { emailLockAlreadyHeld?: boolean } = {},
): Promise<number> {
  if (initialMessage.sequenceNumber !== 1) return 0;

  const [candidate] = await db.select({
    contactEmail: prospectsTable.contactEmail,
  })
    .from(prospectsTable)
    .where(eq(prospectsTable.id, initialMessage.prospectId))
    .limit(1);
  const candidateEmail = candidate?.contactEmail?.trim().toLowerCase();
  if (!candidateEmail) return 0;
  const campaignScope = initialMessage.campaignId
    ? `campaign:${initialMessage.campaignId}`
    : "campaign:none";
  const templates = approvedOutreachFollowUpMessages(prospect.contactName ?? "there");

  return db.transaction(async (tx) => {
    if (!options.emailLockAlreadyHeld) {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${candidateEmail}, 0))`);
    }
    await tx.execute(sql`
      select pg_advisory_xact_lock(
        hashtextextended(${`outreach-follow-ups:${initialMessage.prospectId}:${campaignScope}`}, 0)
      )
    `);
    if (!initialMessage.campaignId) return 0;
    const [currentCampaign] = await tx.select({ status: campaignsTable.status })
      .from(campaignsTable)
      .where(eq(campaignsTable.id, initialMessage.campaignId))
      .limit(1);
    if (currentCampaign?.status !== "active") return 0;
    const [currentProspect] = await tx.select({
      status: prospectsTable.status,
      contactStatus: prospectsTable.contactStatus,
      contactEmail: prospectsTable.contactEmail,
    })
      .from(prospectsTable)
      .where(eq(prospectsTable.id, initialMessage.prospectId))
      .for("update")
      .limit(1);
    if (
      !currentProspect
      || currentProspect.contactStatus !== "active"
      || !["approved", "contacted"].includes(currentProspect.status)
    ) {
      return 0;
    }
    const normalizedEmail = currentProspect.contactEmail?.trim().toLowerCase();
    if (!normalizedEmail || normalizedEmail !== candidateEmail) return 0;
    const [suppression] = await tx.select({ id: outreachSuppressionsTable.id })
      .from(outreachSuppressionsTable)
      .where(eq(outreachSuppressionsTable.email, normalizedEmail))
      .limit(1);
    if (suppression) return 0;
    const scope = initialMessage.campaignId
      ? eq(outreachMessagesTable.campaignId, initialMessage.campaignId)
      : isNull(outreachMessagesTable.campaignId);
    const [initialEngagement] = await tx.select({
      occurredAt: outreachDeliveryEventsTable.occurredAt,
    })
      .from(outreachDeliveryEventsTable)
      .where(and(
        eq(outreachDeliveryEventsTable.outreachMessageId, initialMessage.id),
        inArray(outreachDeliveryEventsTable.eventType, ["open", "click"]),
        sql`exists (
          select 1
          from outreach_delivery_events as delivery_evidence
          where delivery_evidence.outreach_message_id = ${initialMessage.id}
            and delivery_evidence.event_type = 'delivered'
            and delivery_evidence.occurred_at <= ${outreachDeliveryEventsTable.occurredAt}
        )`,
      ))
      .orderBy(asc(outreachDeliveryEventsTable.occurredAt))
      .limit(1);
    if (!initialEngagement || !isOpenerFollowUpWithinWindow(initialEngagement.occurredAt, now)) {
      await tx.update(outreachMessagesTable)
        .set({
          status: "needs_review",
          scheduledAt: null,
          error: "Stopped because the qualifying engagement was outside the 30-day reminder window",
        })
        .where(and(
          eq(outreachMessagesTable.prospectId, initialMessage.prospectId),
          scope,
          eq(outreachMessagesTable.sequenceNumber, 2),
          inArray(outreachMessagesTable.status, ["draft", "approved"]),
        ));
      return 0;
    }

    await tx.update(outreachMessagesTable)
      .set({
        status: "needs_review",
        scheduledAt: null,
        error: "Stopped because the approved opener policy permits only one follow-up",
      })
      .where(and(
        eq(outreachMessagesTable.prospectId, initialMessage.prospectId),
        inArray(
          outreachMessagesTable.sequenceNumber,
          [...LEGACY_EXTRA_FOLLOW_UP_SEQUENCE_NUMBERS],
        ),
        inArray(outreachMessagesTable.status, ["draft", "approved"]),
      ));

    const existing = await tx.select().from(outreachMessagesTable).where(and(
      eq(outreachMessagesTable.prospectId, initialMessage.prospectId),
      scope,
      inArray(outreachMessagesTable.sequenceNumber, FOLLOW_UP_SEQUENCE_NUMBERS),
    ));
    const existingBySequence = new Map(
      existing.map((message) => [message.sequenceNumber, message]),
    );

    let enrolled = 0;
    for (const sequenceNumber of FOLLOW_UP_SEQUENCE_NUMBERS) {
      const template = templates[sequenceNumber - 2]!;
      const current = existingBySequence.get(sequenceNumber);
      if (current) {
        if (current.sourceType === "hot_lead" || current.sourceType === "hot_lead_verified") {
          continue;
        }
        await tx.update(outreachMessagesTable)
          .set({ subject: template.subject, body: template.body })
          .where(and(
            eq(outreachMessagesTable.id, current.id),
            inArray(outreachMessagesTable.status, ["draft", "approved"]),
          ));
        if (current.status === "approved" && !current.scheduledAt) {
          const [scheduled] = await tx.update(outreachMessagesTable)
            .set({
              scheduledAt: getFollowUpScheduledAt(sequenceNumber, initialEngagement.occurredAt),
              error: null,
            })
            .where(and(
              eq(outreachMessagesTable.id, current.id),
              eq(outreachMessagesTable.status, "approved"),
              isNull(outreachMessagesTable.scheduledAt),
            ))
            .returning({ id: outreachMessagesTable.id });
          if (scheduled) enrolled += 1;
          continue;
        }
        if (current.status === "draft") {
          const [approved] = await tx.update(outreachMessagesTable)
            .set({
              status: "approved",
              scheduledAt: getFollowUpScheduledAt(2, initialEngagement.occurredAt),
              error: null,
            })
            .where(and(
              eq(outreachMessagesTable.id, current.id),
              eq(outreachMessagesTable.status, "draft"),
            ))
            .returning({ id: outreachMessagesTable.id });
          if (approved) enrolled += 1;
          continue;
        }
        if (isSafeDeterministicFollowUpRetry(current)) {
          const [approved] = await tx.update(outreachMessagesTable)
            .set({
              subject: template.subject,
              body: template.body,
              status: "approved",
              scheduledAt: getFollowUpScheduledAt(sequenceNumber, initialEngagement.occurredAt),
              error: null,
            })
            .where(and(
              eq(outreachMessagesTable.id, current.id),
              eq(outreachMessagesTable.status, "failed"),
              inArray(outreachMessagesTable.error, [...DETERMINISTIC_PREFLIGHT_FAILURES]),
              isNull(outreachMessagesTable.sentAt),
              isNull(outreachMessagesTable.providerMessageId),
              isNull(outreachMessagesTable.providerReconciliationKey),
              sql`not exists (
                select 1
                from ${outreachSequenceSendClaimsTable} as retry_claim
                where retry_claim.message_id = ${outreachMessagesTable.id}
              )`,
            ))
            .returning({ id: outreachMessagesTable.id });
          if (approved) enrolled += 1;
        }
        continue;
      }
      const [inserted] = await tx.insert(outreachMessagesTable).values({
        prospectId: initialMessage.prospectId,
        campaignId: initialMessage.campaignId,
        sequenceNumber,
        subject: template.subject,
        body: template.body,
        status: "approved",
        scheduledAt: getFollowUpScheduledAt(sequenceNumber, initialEngagement.occurredAt),
        sourceType: initialMessage.sourceType,
        sourceId: initialMessage.sourceId,
      }).onConflictDoNothing().returning({ id: outreachMessagesTable.id });
      if (inserted) {
        enrolled += 1;
        continue;
      }

      const [approvedConcurrentDraft] = await tx.update(outreachMessagesTable)
        .set({
          status: "approved",
          scheduledAt: getFollowUpScheduledAt(sequenceNumber, initialEngagement.occurredAt),
          error: null,
        })
        .where(and(
          eq(outreachMessagesTable.prospectId, initialMessage.prospectId),
          scope,
          eq(outreachMessagesTable.sequenceNumber, sequenceNumber),
          eq(outreachMessagesTable.status, "draft"),
        ))
        .returning({ id: outreachMessagesTable.id });
      if (approvedConcurrentDraft) enrolled += 1;
    }

    return enrolled;
  });
}

export async function backfillDeliveredFollowUpSequences(
  limit = 1000,
  now = new Date(),
): Promise<number> {
  const cutoff = new Date(now.getTime() - OPENER_FOLLOW_UP_MAX_AGE_MS);
  const candidates = await db.select({
    message: outreachMessagesTable,
    contactName: prospectsTable.contactName,
    engagedAt: outreachDeliveryEventsTable.occurredAt,
  })
    .from(outreachMessagesTable)
    .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
    .innerJoin(
      outreachDeliveryEventsTable,
      eq(outreachDeliveryEventsTable.outreachMessageId, outreachMessagesTable.id),
    )
    .where(and(
      eq(outreachMessagesTable.sequenceNumber, 1),
      inArray(outreachDeliveryEventsTable.eventType, ["open", "click"]),
      gte(outreachDeliveryEventsTable.occurredAt, cutoff),
      lte(outreachDeliveryEventsTable.occurredAt, now),
      sql`exists (
        select 1
        from outreach_delivery_events as delivery_evidence
        where delivery_evidence.outreach_message_id = ${outreachMessagesTable.id}
          and delivery_evidence.event_type = 'delivered'
          and delivery_evidence.occurred_at <= ${outreachDeliveryEventsTable.occurredAt}
      )`,
      eq(prospectsTable.contactStatus, "active"),
      inArray(prospectsTable.status, ["approved", "contacted"]),
      sql`(
        select count(*)
        from ${outreachMessagesTable} as follow_up
          where follow_up.prospect_id = ${outreachMessagesTable.prospectId}
          and follow_up.sequence_number = 2
          and follow_up.scheduled_at is not null
          and (
            follow_up.campaign_id = ${outreachMessagesTable.campaignId}
            or (
              follow_up.campaign_id is null
              and ${outreachMessagesTable.campaignId} is null
            )
          )
      ) < 1`,
    ))
    .orderBy(asc(outreachDeliveryEventsTable.occurredAt))
    .limit(limit);

  const earliestByMessage = new Map<number, typeof candidates[number]>();
  for (const candidate of candidates) {
    if (!earliestByMessage.has(candidate.message.id)) {
      earliestByMessage.set(candidate.message.id, candidate);
    }
  }

  let repaired = 0;
  for (const candidate of earliestByMessage.values()) {
    await ensureApprovedFollowUpSequence(
      candidate.message,
      { contactName: candidate.contactName },
      now,
    );
    const scope = candidate.message.campaignId
      ? eq(outreachMessagesTable.campaignId, candidate.message.campaignId)
      : isNull(outreachMessagesTable.campaignId);
    const followUps = await db.select().from(outreachMessagesTable).where(and(
      eq(outreachMessagesTable.prospectId, candidate.message.prospectId),
      scope,
      inArray(outreachMessagesTable.sequenceNumber, FOLLOW_UP_SEQUENCE_NUMBERS),
      eq(outreachMessagesTable.status, "approved"),
      isNull(outreachMessagesTable.scheduledAt),
    ));
    for (const followUp of followUps) {
      const scheduledAt = getFollowUpScheduledAt(
        followUp.sequenceNumber,
        candidate.engagedAt,
      );
      if (!scheduledAt) continue;
      await db.update(outreachMessagesTable)
        .set({ scheduledAt })
        .where(and(
          eq(outreachMessagesTable.id, followUp.id),
          eq(outreachMessagesTable.status, "approved"),
          isNull(outreachMessagesTable.scheduledAt),
        ));
    }
    repaired += 1;
  }

  return repaired;
}

export async function stopStaleOpenerFollowUps(now = new Date()): Promise<number> {
  const cutoff = new Date(now.getTime() - OPENER_FOLLOW_UP_MAX_AGE_MS);
  const stopped = await db.update(outreachMessagesTable)
    .set({
      status: "needs_review",
      scheduledAt: null,
      error: "Stopped because no qualifying engagement fell within the 30-day reminder window",
    })
    .where(and(
      eq(outreachMessagesTable.sequenceNumber, 2),
      inArray(outreachMessagesTable.status, ["draft", "approved"]),
      sql`not exists (
        select 1
        from outreach_messages as initial_message
        inner join outreach_delivery_events as initial_engagement
          on initial_engagement.outreach_message_id = initial_message.id
        where initial_message.prospect_id = ${outreachMessagesTable.prospectId}
          and initial_message.sequence_number = 1
          and (
            initial_message.campaign_id = ${outreachMessagesTable.campaignId}
            or (
              initial_message.campaign_id is null
              and ${outreachMessagesTable.campaignId} is null
            )
          )
          and initial_engagement.event_type in ('open', 'click')
          and initial_engagement.occurred_at >= ${cutoff}
          and initial_engagement.occurred_at <= ${now}
          and exists (
            select 1
            from outreach_delivery_events as delivery_evidence
            where delivery_evidence.outreach_message_id = initial_message.id
              and delivery_evidence.event_type = 'delivered'
              and delivery_evidence.occurred_at <= initial_engagement.occurred_at
          )
      )`,
    ))
    .returning({ id: outreachMessagesTable.id });
  return stopped.length;
}

export async function stopLegacyAdditionalFollowUps(): Promise<number> {
  const stopped = await db.update(outreachMessagesTable)
    .set({
      status: "needs_review",
      scheduledAt: null,
      error: "Stopped because the approved opener policy permits only one follow-up",
    })
    .where(and(
      inArray(
        outreachMessagesTable.sequenceNumber,
        [...LEGACY_EXTRA_FOLLOW_UP_SEQUENCE_NUMBERS],
      ),
      inArray(outreachMessagesTable.status, ["draft", "approved"]),
    ))
    .returning({ id: outreachMessagesTable.id });
  return stopped.length;
}

export async function getVerifiedInitialDeliveryAt(
  message: Pick<OutreachMessage, "prospectId" | "campaignId">,
): Promise<Date | null> {
  const scope = message.campaignId
    ? eq(outreachMessagesTable.campaignId, message.campaignId)
    : isNull(outreachMessagesTable.campaignId);
  const [delivery] = await db.select({
    occurredAt: outreachDeliveryEventsTable.occurredAt,
  })
    .from(outreachMessagesTable)
    .innerJoin(
      outreachDeliveryEventsTable,
      eq(outreachDeliveryEventsTable.outreachMessageId, outreachMessagesTable.id),
    )
    .where(and(
      eq(outreachMessagesTable.prospectId, message.prospectId),
      scope,
      eq(outreachMessagesTable.sequenceNumber, 1),
      eq(outreachDeliveryEventsTable.eventType, "delivered"),
    ))
    .orderBy(asc(outreachDeliveryEventsTable.occurredAt))
    .limit(1);
  return delivery?.occurredAt ?? null;
}

export async function getVerifiedInitialEngagementAt(
  message: Pick<OutreachMessage, "prospectId" | "campaignId">,
): Promise<Date | null> {
  const scope = message.campaignId
    ? eq(outreachMessagesTable.campaignId, message.campaignId)
    : isNull(outreachMessagesTable.campaignId);
  const [engagement] = await db.select({
    occurredAt: outreachDeliveryEventsTable.occurredAt,
  })
    .from(outreachMessagesTable)
    .innerJoin(
      outreachDeliveryEventsTable,
      eq(outreachDeliveryEventsTable.outreachMessageId, outreachMessagesTable.id),
    )
    .where(and(
      eq(outreachMessagesTable.prospectId, message.prospectId),
      scope,
      eq(outreachMessagesTable.sequenceNumber, 1),
      inArray(outreachDeliveryEventsTable.eventType, ["open", "click"]),
      sql`exists (
          select 1
          from outreach_delivery_events as delivery_evidence
          where delivery_evidence.outreach_message_id = ${outreachMessagesTable.id}
            and delivery_evidence.event_type = 'delivered'
            and delivery_evidence.occurred_at <= ${outreachDeliveryEventsTable.occurredAt}
      )`,
    ))
    .orderBy(asc(outreachDeliveryEventsTable.occurredAt))
    .limit(1);
  return engagement?.occurredAt ?? null;
}

/** @deprecated Use getVerifiedInitialEngagementAt for open-or-click qualification. */
export const getVerifiedInitialOpenAt = getVerifiedInitialEngagementAt;