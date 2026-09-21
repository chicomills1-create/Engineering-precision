import { and, eq, gte, inArray, isNull, lt, sql } from "drizzle-orm";
import {
  db,
  campaignsTable,
  campaignsTable,
  campaignsTable,
  campaignsTable,
  campaignsTable,
  campaignsTable,
  campaignsTable,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachRepliesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import { approvedOutreachFollowUpMessages, hotLeadFollowUpMessages } from "./verifiedOutreachBatch";
import { assertOutreachEligibilityBase, getFollowUpScheduledAt } from "./outreachEligibility";
import { getVerifiedInitialEngagementAt } from "./outreachSequence";

const CLICK_START = new Date("2026-09-01T07:00:00.000Z");
const CLICK_END = new Date("2026-09-13T07:00:00.000Z");
const SEND_AT = new Date("2026-09-13T15:00:00.000Z");
const EXPECTED_CLICKER_COUNT = 110;
const WALBRIDGE_CORRECTION = new Map([
  ["mhall@walbridge.com", "mhaller@walbridge.com"],
]);

export type HotLeadQueueSkip = {
  email: string;
  reason: string;
};

export type HotLeadQueueReport = {
  cohortCount: number;
  created: number;
  skipped: number;
  scheduledAt: string;
  createdEmails: string[];
  skippedEmails: HotLeadQueueSkip[];
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export function isDedicatedHotLeadSource(sourceType: string | null): boolean {
  return sourceType === "hot_lead" || sourceType === "hot_lead_verified";
}

export function canConvertGenericFollowUp(input: {
  status: string;
  sentAt: Date | null;
  providerMessageId: string | null;
  providerReconciliationKey: string | null;
}): boolean {
  return ["draft", "approved", "needs_review"].includes(input.status)
    && !input.sentAt
    && !input.providerMessageId
    && !input.providerReconciliationKey;
}

export async function enqueueSeptemberClickerFollowUps(): Promise<HotLeadQueueReport> {
  return db.transaction(async (tx) => {
    await tx.execute(sql`
      select pg_advisory_xact_lock(
        hashtextextended('admin:september-2026-clicker-follow-ups', 0)
      )
    `);

    const clickedRows = await tx.select({
      initialMessageId: outreachMessagesTable.id,
      prospectId: prospectsTable.id,
      campaignId: outreachMessagesTable.campaignId,
      contactName: prospectsTable.contactName,
      contactEmail: prospectsTable.contactEmail,
      prospectStatus: prospectsTable.status,
      contactStatus: prospectsTable.contactStatus,
      sourceType: outreachMessagesTable.sourceType,
      sourceId: outreachMessagesTable.sourceId,
      initialMessageStatus: outreachMessagesTable.status,
      clickedAt: outreachDeliveryEventsTable.occurredAt,
    })
      .from(outreachMessagesTable)
      .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
      .innerJoin(
        outreachDeliveryEventsTable,
        eq(outreachDeliveryEventsTable.outreachMessageId, outreachMessagesTable.id),
      )
      .where(and(
        eq(outreachMessagesTable.sequenceNumber, 1),
        eq(outreachDeliveryEventsTable.eventType, "click"),
        gte(outreachDeliveryEventsTable.occurredAt, CLICK_START),
        lt(outreachDeliveryEventsTable.occurredAt, CLICK_END),
      ));

    const byEmail = new Map<string, typeof clickedRows[number]>();
    for (const row of clickedRows) {
      if (!row.contactEmail) continue;
      const observedEmail = normalizeEmail(row.contactEmail);
      const email = WALBRIDGE_CORRECTION.get(observedEmail) ?? observedEmail;
      const current = byEmail.get(email);
      if (!current || row.clickedAt < current.clickedAt) byEmail.set(email, row);
    }

    if (byEmail.size !== EXPECTED_CLICKER_COUNT) {
      throw new Error(
        `Safety check failed: expected exactly ${EXPECTED_CLICKER_COUNT} distinct September 1-12 clicker emails, found ${byEmail.size}. No follow-ups were created.`,
      );
    }

    if (byEmail.has("mhall@walbridge.com")) {
      throw new Error("Safety check failed: the obsolete Walbridge address is still present. No follow-ups were created.");
    }

    const createdEmails: string[] = [];
    const skippedEmails: HotLeadQueueSkip[] = [];

    for (const [email, observed] of [...byEmail.entries()].sort(([a], [b]) => a.localeCompare(b))) {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${email}, 0))`);

      let candidate = observed;
      if (normalizeEmail(observed.contactEmail ?? "") !== email) {
        const [corrected] = await tx.select({
          initialMessageId: outreachMessagesTable.id,
          prospectId: prospectsTable.id,
          campaignId: outreachMessagesTable.campaignId,
          contactName: prospectsTable.contactName,
          contactEmail: prospectsTable.contactEmail,
          prospectStatus: prospectsTable.status,
          contactStatus: prospectsTable.contactStatus,
          sourceType: outreachMessagesTable.sourceType,
          sourceId: outreachMessagesTable.sourceId,
          initialMessageStatus: outreachMessagesTable.status,
          clickedAt: sql<Date>`${observed.clickedAt}`,
        })
          .from(prospectsTable)
          .innerJoin(
            outreachMessagesTable,
            and(
              eq(outreachMessagesTable.prospectId, prospectsTable.id),
              eq(outreachMessagesTable.sequenceNumber, 1),
            ),
          )
          .where(sql`lower(trim(${prospectsTable.contactEmail})) = ${email}`)
          .limit(1);
        if (!corrected) {
          skippedEmails.push({ email, reason: "corrected_recipient_not_found" });
          continue;
        }
        candidate = corrected;
      }

      if (candidate.contactStatus !== "active" || !["approved", "contacted"].includes(candidate.prospectStatus)) {
        skippedEmails.push({ email, reason: "recipient_not_active" });
        continue;
      }

      const [suppression, negativeEvent, reply, deliveredEvidence] = await Promise.all([
        tx.select({ id: outreachSuppressionsTable.id })
          .from(outreachSuppressionsTable)
          .where(sql`lower(trim(${outreachSuppressionsTable.email})) = ${email}`)
          .limit(1),
        tx.select({ id: outreachDeliveryEventsTable.id })
          .from(outreachDeliveryEventsTable)
          .where(and(
            sql`lower(trim(${outreachDeliveryEventsTable.email})) = ${email}`,
            inArray(outreachDeliveryEventsTable.eventType, ["bounce", "complaint", "unsubscribe", "invalid"]),
          ))
          .limit(1),
        tx.select({ id: outreachRepliesTable.id })
          .from(outreachRepliesTable)
          .where(eq(outreachRepliesTable.prospectId, candidate.prospectId))
          .limit(1),
        tx.select({ id: outreachDeliveryEventsTable.id })
          .from(outreachDeliveryEventsTable)
          .where(and(
            eq(outreachDeliveryEventsTable.outreachMessageId, candidate.initialMessageId),
            eq(outreachDeliveryEventsTable.eventType, "delivered"),
          ))
          .limit(1),
      ]);
      if (suppression.length) {
        skippedEmails.push({ email, reason: "suppressed_or_unsubscribed" });
        continue;
      }
      if (negativeEvent.length) {
        skippedEmails.push({ email, reason: "bounce_complaint_or_invalid" });
        continue;
      }
      if (reply.length) {
        skippedEmails.push({ email, reason: "already_replied" });
        continue;
      }
      if (candidate.initialMessageStatus !== "delivered" && !deliveredEvidence.length) {
        skippedEmails.push({ email, reason: "missing_delivery_evidence" });
        continue;
      }

      const [template] = hotLeadFollowUpMessages(candidate.contactName ?? "there");
      const [existingDedicatedFollowUp] = await tx.select({ id: outreachMessagesTable.id })
        .from(outreachMessagesTable)
        .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
        .where(and(
          eq(outreachMessagesTable.sequenceNumber, 2),
          inArray(outreachMessagesTable.sourceType, ["hot_lead", "hot_lead_verified"]),
          sql`lower(trim(${prospectsTable.contactEmail})) = ${email}`,
        ))
        .limit(1);
      if (existingDedicatedFollowUp) {
        skippedEmails.push({ email, reason: "follow_up_already_exists" });
        continue;
      }

      const [conflictingGenericFollowUp] = await tx.select({
        id: outreachMessagesTable.id,
        status: outreachMessagesTable.status,
        sentAt: outreachMessagesTable.sentAt,
        providerMessageId: outreachMessagesTable.providerMessageId,
        providerReconciliationKey: outreachMessagesTable.providerReconciliationKey,
      })
        .from(outreachMessagesTable)
        .where(and(
          eq(outreachMessagesTable.prospectId, candidate.prospectId),
          candidate.campaignId == null
            ? sql`${outreachMessagesTable.campaignId} is null`
            : eq(outreachMessagesTable.campaignId, candidate.campaignId),
          eq(outreachMessagesTable.sequenceNumber, 2),
        ))
        .limit(1);

      if (conflictingGenericFollowUp) {
        if (!canConvertGenericFollowUp(conflictingGenericFollowUp)) {
          skippedEmails.push({ email, reason: "prior_follow_up_already_dispatched" });
          continue;
        }
        await tx.update(outreachMessagesTable).set({
          subject: template!.subject,
          body: template!.body,
          status: "approved",
          scheduledAt: SEND_AT,
          sourceType: "hot_lead",
          sourceId: candidate.initialMessageId,
          error: null,
        }).where(eq(outreachMessagesTable.id, conflictingGenericFollowUp.id));
        createdEmails.push(email);
        continue;
      }

      const [inserted] = await tx.insert(outreachMessagesTable).values({
        prospectId: candidate.prospectId,
        campaignId: candidate.campaignId,
        sequenceNumber: 2,
        subject: template!.subject,
        body: template!.body,
        status: "approved",
        scheduledAt: SEND_AT,
        sourceType: "hot_lead",
        sourceId: candidate.initialMessageId,
      }).onConflictDoNothing().returning({ id: outreachMessagesTable.id });

      if (!inserted) {
        skippedEmails.push({ email, reason: "follow_up_conflict_created_concurrently" });
        continue;
      }
      createdEmails.push(email);
    }

    return {
      cohortCount: byEmail.size,
      created: createdEmails.length,
      skipped: skippedEmails.length,
      scheduledAt: SEND_AT.toISOString(),
      createdEmails,
      skippedEmails,
    };
  });
}