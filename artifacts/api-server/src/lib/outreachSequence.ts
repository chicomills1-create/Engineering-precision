import { and, asc, eq, inArray, isNull, sql } from "drizzle-orm";
import {
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  prospectsTable,
  type OutreachMessage,
  type Prospect,
} from "@workspace/db";
import { approvedOutreachFollowUpMessages } from "./verifiedOutreachBatch";
import { getFollowUpScheduledAt } from "./outreachEligibility";

const FOLLOW_UP_SEQUENCE_NUMBERS = [2, 3, 4] as const;

type InitialSequenceMessage = Pick<
  OutreachMessage,
  "prospectId" | "campaignId" | "sequenceNumber" | "sourceType" | "sourceId"
>;

export async function ensureApprovedFollowUpSequence(
  initialMessage: InitialSequenceMessage,
  prospect: Pick<Prospect, "contactName">,
): Promise<number> {
  if (initialMessage.sequenceNumber !== 1) return 0;

  const campaignScope = initialMessage.campaignId
    ? `campaign:${initialMessage.campaignId}`
    : "campaign:none";
  const templates = approvedOutreachFollowUpMessages(prospect.contactName ?? "there");

  return db.transaction(async (tx) => {
    await tx.execute(sql`
      select pg_advisory_xact_lock(
        hashtextextended(${`outreach-follow-ups:${initialMessage.prospectId}:${campaignScope}`}, 0)
      )
    `);
    const [currentProspect] = await tx.select({
      status: prospectsTable.status,
      contactStatus: prospectsTable.contactStatus,
    })
      .from(prospectsTable)
      .where(eq(prospectsTable.id, initialMessage.prospectId))
      .for("update")
      .limit(1);
    if (
      !currentProspect
      || currentProspect.contactStatus !== "active"
      || ["replied", "suppressed", "not_a_fit"].includes(currentProspect.status)
    ) {
      return 0;
    }

    const scope = initialMessage.campaignId
      ? eq(outreachMessagesTable.campaignId, initialMessage.campaignId)
      : isNull(outreachMessagesTable.campaignId);
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
      const current = existingBySequence.get(sequenceNumber);
      if (current) {
        if (current.status === "draft") {
          const [approved] = await tx.update(outreachMessagesTable)
            .set({ status: "approved", scheduledAt: null, error: null })
            .where(and(
              eq(outreachMessagesTable.id, current.id),
              eq(outreachMessagesTable.status, "draft"),
            ))
            .returning({ id: outreachMessagesTable.id });
          if (approved) enrolled += 1;
        }
        continue;
      }

      const template = templates[sequenceNumber - 2]!;
      const [inserted] = await tx.insert(outreachMessagesTable).values({
        prospectId: initialMessage.prospectId,
        campaignId: initialMessage.campaignId,
        sequenceNumber,
        subject: template.subject,
        body: template.body,
        status: "approved",
        scheduledAt: null,
        sourceType: initialMessage.sourceType,
        sourceId: initialMessage.sourceId,
      }).onConflictDoNothing().returning({ id: outreachMessagesTable.id });
      if (inserted) {
        enrolled += 1;
        continue;
      }

      const [approvedConcurrentDraft] = await tx.update(outreachMessagesTable)
        .set({ status: "approved", scheduledAt: null, error: null })
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

export async function backfillDeliveredFollowUpSequences(limit = 1000): Promise<number> {
  const candidates = await db.select({
    message: outreachMessagesTable,
    contactName: prospectsTable.contactName,
    deliveredAt: outreachDeliveryEventsTable.occurredAt,
  })
    .from(outreachMessagesTable)
    .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
    .innerJoin(
      outreachDeliveryEventsTable,
      eq(outreachDeliveryEventsTable.outreachMessageId, outreachMessagesTable.id),
    )
    .where(and(
      eq(outreachMessagesTable.sequenceNumber, 1),
      eq(outreachMessagesTable.status, "delivered"),
      eq(outreachDeliveryEventsTable.eventType, "delivered"),
      eq(prospectsTable.contactStatus, "active"),
      inArray(prospectsTable.status, ["approved", "contacted"]),
      sql`(
        select count(*)
        from ${outreachMessagesTable} as follow_up
        where follow_up.prospect_id = ${outreachMessagesTable.prospectId}
          and follow_up.sequence_number in (2, 3, 4)
          and follow_up.scheduled_at is not null
          and (
            follow_up.campaign_id = ${outreachMessagesTable.campaignId}
            or (
              follow_up.campaign_id is null
              and ${outreachMessagesTable.campaignId} is null
            )
          )
      ) < 3`,
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
    await ensureApprovedFollowUpSequence(candidate.message, {
      contactName: candidate.contactName,
    });
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
        candidate.deliveredAt,
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