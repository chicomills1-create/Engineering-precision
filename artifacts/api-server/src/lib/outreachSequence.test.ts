import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import { eq } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachSequenceSendClaimsTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import {
  backfillDeliveredFollowUpSequences,
  ensureApprovedFollowUpSequence,
  isOpenerFollowUpWithinWindow,
  isSafeDeterministicFollowUpRetry,
} from "./outreachSequence";

test("opener reminders accept only opens from the prior 30 days", () => {
  const now = new Date("2026-09-03T15:00:00.000Z");
  assert.equal(
    isOpenerFollowUpWithinWindow(new Date("2026-08-04T15:00:00.000Z"), now),
    true,
  );
  assert.equal(
    isOpenerFollowUpWithinWindow(new Date("2026-08-04T14:59:59.999Z"), now),
    false,
  );
  assert.equal(
    isOpenerFollowUpWithinWindow(new Date("2026-09-03T15:00:00.001Z"), now),
    false,
  );
});

test("only deterministic pre-handoff follow-up failures can be retried", () => {
  const base = {
    status: "failed",
    error: "Follow-up cannot send before its Phoenix opener-based business cadence",
    sentAt: null,
    providerMessageId: null,
    providerReconciliationKey: null,
  };
  assert.equal(isSafeDeterministicFollowUpRetry(base), true);
  assert.equal(isSafeDeterministicFollowUpRetry({
    ...base,
    error: "SendGrid activity has no matching record yet; retry remains blocked pending clear provider evidence",
  }), false);
  assert.equal(isSafeDeterministicFollowUpRetry({
    ...base,
    providerMessageId: "provider-evidence",
  }), false);
});

test("enrollment remains idempotent when a separate draft writer races it", async () => {
  const suffix = randomUUID();
  const [campaign] = await db.insert(campaignsTable).values({
    name: `Enrollment ${suffix}`,
    audience: "architect",
    states: ["AZ"],
    status: "active",
  }).returning();
  const [prospect] = await db.insert(prospectsTable).values({
    campaignId: campaign!.id,
    companyName: `Enrollment ${suffix}`,
    city: "Phoenix",
    state: "AZ",
    audience: "architect",
    contactEmail: `enrollment-${suffix}@example.com`,
    contactName: "Sequence Test",
    contactTitle: "Principal",
    contactConfidence: "high",
    contactSourceUrl: "https://example.com/enrollment",
    emailStatus: "verified",
    status: "approved",
    fitScore: 80,
    needScore: 80,
    needSignals: "Public project signal",
    dedupeKey: `enrollment:${suffix}`,
  }).returning();
  const [initial] = await db.insert(outreachMessagesTable).values({
    prospectId: prospect!.id,
    campaignId: campaign!.id,
    sequenceNumber: 1,
    subject: "Initial",
    body: "Initial body",
    status: "sent",
  }).returning();
  await db.insert(outreachDeliveryEventsTable).values([
    {
      email: prospect!.contactEmail!,
      eventType: "delivered",
      occurredAt: new Date("2026-08-28T14:59:00.000Z"),
      outreachMessageId: initial!.id,
    },
    {
      email: prospect!.contactEmail!,
      eventType: "open",
      occurredAt: new Date("2026-08-28T15:00:00.000Z"),
      outreachMessageId: initial!.id,
    },
  ]);
  await db.insert(outreachMessagesTable).values({
    prospectId: prospect!.id,
    campaignId: campaign!.id,
    sequenceNumber: 2,
    subject: "Concurrent draft",
    body: "Concurrent draft body",
    status: "draft",
  });

  try {
    await Promise.all([
      ensureApprovedFollowUpSequence(initial!, prospect!),
      ensureApprovedFollowUpSequence(initial!, prospect!),
    ]);
    const messages = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.prospectId, prospect!.id));
    const followUps = messages
      .filter((message) => message.sequenceNumber > 1)
      .sort((left, right) => left.sequenceNumber - right.sequenceNumber);
    assert.deepEqual(followUps.map((message) => message.sequenceNumber), [2]);
    assert.ok(followUps.every((message) => message.status === "approved"));
    assert.ok(followUps[0]?.scheduledAt);
  } finally {
    await db.delete(outreachDeliveryEventsTable)
      .where(eq(outreachDeliveryEventsTable.outreachMessageId, initial!.id));
    await db.delete(prospectsTable).where(eq(prospectsTable.id, prospect!.id));
    await db.delete(campaignsTable).where(eq(campaignsTable.id, campaign!.id));
  }
});

test("backfill repairs only deterministic pre-provider failures with populated schedules", async () => {
  const suffix = randomUUID();
  const [campaign] = await db.insert(campaignsTable).values({
    name: `Retry safety ${suffix}`,
    audience: "architect",
    states: ["AZ"],
    status: "active",
  }).returning();
  const cases = [
    { key: "safe", expected: "approved" },
    { key: "ambiguous", expected: "failed", error: "SendGrid activity has no matching record yet; retry remains blocked pending clear provider evidence" },
    { key: "claimed", expected: "failed", claimed: true },
    { key: "suppressed", expected: "failed", suppressed: true },
    { key: "inactive", expected: "failed", inactive: true },
    { key: "provider", expected: "failed", providerMessageId: "provider-evidence" },
  ] as const;
  const prospectIds: number[] = [];
  const messageIds = new Map<string, number>();
  const suppressedEmails: string[] = [];

  try {
    for (const fixture of cases) {
      const email = `retry-${fixture.key}-${suffix}@example.com`;
      const [prospect] = await db.insert(prospectsTable).values({
        campaignId: campaign!.id,
        companyName: `Retry ${fixture.key} ${suffix}`,
        city: "Phoenix",
        state: "AZ",
        audience: "architect",
        contactEmail: email,
        contactName: "Sequence Test",
        contactTitle: "Principal",
        contactConfidence: "high",
        contactSourceUrl: "https://example.com/retry",
        emailStatus: "verified",
        contactStatus: fixture.inactive ? "paused" : "active",
        status: "approved",
        fitScore: 80,
        needScore: 80,
        needSignals: "Public project signal",
        dedupeKey: `retry:${fixture.key}:${suffix}`,
      }).returning();
      prospectIds.push(prospect!.id);
      const [initial] = await db.insert(outreachMessagesTable).values({
        prospectId: prospect!.id,
        campaignId: campaign!.id,
        sequenceNumber: 1,
        subject: "Initial",
        body: "Initial body",
        status: "delivered",
      }).returning();
      await db.insert(outreachDeliveryEventsTable).values([
        {
          email,
          eventType: "delivered",
          occurredAt: new Date("2026-09-08T14:59:00.000Z"),
          outreachMessageId: initial!.id,
        },
        {
          email,
          eventType: "open",
          occurredAt: new Date("2026-09-08T15:00:00.000Z"),
          outreachMessageId: initial!.id,
        },
      ]);
      const [followUp] = await db.insert(outreachMessagesTable).values({
        prospectId: prospect!.id,
        campaignId: campaign!.id,
        sequenceNumber: 2,
        subject: "Follow-up",
        body: "Follow-up body",
        status: "failed",
        scheduledAt: new Date("2026-09-09T03:00:00.000Z"),
        error: fixture.error ?? "Follow-up cannot send before its Phoenix opener-based business cadence",
        providerMessageId: fixture.providerMessageId ?? null,
      }).returning();
      messageIds.set(fixture.key, followUp!.id);
      if (fixture.claimed) {
        await db.insert(outreachSequenceSendClaimsTable).values({
          messageId: followUp!.id,
          prospectId: prospect!.id,
          campaignScope: `campaign:${campaign!.id}`,
          sequenceNumber: 2,
        });
      }
      if (fixture.suppressed) {
        await db.insert(outreachSuppressionsTable).values({
          email,
          reason: "test suppression",
        });
        suppressedEmails.push(email);
      }
    }

    await backfillDeliveredFollowUpSequences(1000, new Date("2026-09-19T15:00:00.000Z"));
    for (const fixture of cases) {
      const [message] = await db.select().from(outreachMessagesTable)
        .where(eq(outreachMessagesTable.id, messageIds.get(fixture.key)!));
      assert.equal(message?.status, fixture.expected, fixture.key);
    }
  } finally {
    for (const email of suppressedEmails) {
      await db.delete(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, email));
    }
    for (const prospectId of prospectIds) {
      await db.delete(prospectsTable).where(eq(prospectsTable.id, prospectId));
    }
    await db.delete(campaignsTable).where(eq(campaignsTable.id, campaign!.id));
  }
});