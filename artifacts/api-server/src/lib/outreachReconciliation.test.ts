import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import { eq } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachSendReservationsTable,
  outreachSequenceSendClaimsTable,
  prospectsTable,
} from "@workspace/db";
import {
  ensureProviderReconciliationKey,
  isDefinitiveSendGridRejection,
  reserveSequenceSend,
  sendApprovedOutreach,
} from "./outreach";
import { processSendGridEvents } from "./outreachEvents";
import {
  claimOutreachMessageForSending,
  getSendFailureStatus,
  reconcileSendingOutreachMessages,
} from "./outreachWorker";

async function createFixture(status = "approved") {
  const suffix = randomUUID();
  const [campaign] = await db.insert(campaignsTable).values({
    name: `Reconciliation test ${suffix}`,
    audience: "architect",
    states: ["AZ"],
    status: "active",
  }).returning();
  const [prospect] = await db.insert(prospectsTable).values({
    campaignId: campaign!.id,
    companyName: `Reconciliation Test ${suffix}`,
    city: "Phoenix",
    state: "AZ",
    audience: "architect",
    contactEmail: `reconciliation-${suffix}@example.com`,
    contactName: "Test Contact",
    contactTitle: "Principal",
    contactConfidence: "high",
    contactSourceUrl: "https://example.com/contact",
    emailStatus: "verified",
    status: "approved",
    fitScore: 80,
    needScore: 80,
    needSignals: "Public project signal",
    dedupeKey: `reconciliation-test:${suffix}`,
  }).returning();
  const [message] = await db.insert(outreachMessagesTable).values({
    prospectId: prospect!.id,
    campaignId: campaign!.id,
    sequenceNumber: 1,
    subject: "Reconciliation test",
    body: "Reconciliation test body",
    status,
  }).returning();
  return { campaign: campaign!, prospect: prospect!, message: message! };
}

async function cleanFixture(fixture: Awaited<ReturnType<typeof createFixture>>): Promise<void> {
  await db.delete(outreachDeliveryEventsTable).where(eq(outreachDeliveryEventsTable.outreachMessageId, fixture.message.id));
  await db.delete(outreachSendReservationsTable).where(eq(outreachSendReservationsTable.messageId, fixture.message.id));
  await db.delete(outreachSequenceSendClaimsTable).where(eq(outreachSequenceSendClaimsTable.prospectId, fixture.prospect.id));
  await db.delete(outreachMessagesTable).where(eq(outreachMessagesTable.prospectId, fixture.prospect.id));
  await db.delete(prospectsTable).where(eq(prospectsTable.id, fixture.prospect.id));
  await db.delete(campaignsTable).where(eq(campaignsTable.id, fixture.campaign.id));
}

test("a reconciliation key is stable when initialized concurrently", async () => {
  const fixture = await createFixture();
  try {
    const keys = await Promise.all([
      ensureProviderReconciliationKey(fixture.message.id),
      ensureProviderReconciliationKey(fixture.message.id),
    ]);
    assert.equal(keys[0], `outreach-message-${fixture.message.id}`);
    assert.equal(keys[1], keys[0]);
    const [stored] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(stored?.providerReconciliationKey, keys[0]);
  } finally {
    await cleanFixture(fixture);
  }
});

test("only one concurrent worker can claim an approved message", async () => {
  const fixture = await createFixture();
  try {
    const claims = await Promise.all([
      claimOutreachMessageForSending(fixture.message.id),
      claimOutreachMessageForSending(fixture.message.id),
    ]);
    assert.equal(claims.filter(Boolean).length, 1);
    assert.equal(claims.find(Boolean)?.status, "sending");
  } finally {
    await cleanFixture(fixture);
  }
});

test("provider evidence reconciles a sending message without redispatch", async () => {
  const fixture = await createFixture("sending");
  try {
    const reconciliationKey = await ensureProviderReconciliationKey(fixture.message.id);
    const occurredAt = new Date("2026-08-29T12:00:00.000Z");
    await db.insert(outreachDeliveryEventsTable).values({
      outreachMessageId: fixture.message.id,
      reconciliationKey,
      providerMessageId: `provider-${fixture.message.id}`,
      email: `reconciliation-${fixture.message.id}@example.com`,
      eventType: "processed",
      occurredAt,
    });

    assert.equal(await reconcileSendingOutreachMessages(occurredAt), 1);
    const [message] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(message?.status, "sent");
    assert.equal(message?.providerMessageId, `provider-${fixture.message.id}`);
    assert.equal(message?.sentAt?.toISOString(), occurredAt.toISOString());
  } finally {
    await cleanFixture(fixture);
  }
});

test("an unknown result is escalated for review and never reset for retry", async () => {
  const fixture = await createFixture("sending");
  try {
    assert.equal(
      getSendFailureStatus(new Error("SendGrid dispatch result is unknown; message requires reconciliation before retry")),
      "needs_review",
    );
    assert.equal(await reconcileSendingOutreachMessages(new Date(), 0), 1);
    const [message] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(message?.status, "needs_review");
    assert.match(message?.error ?? "", /review provider activity/i);
    assert.equal(await claimOutreachMessageForSending(fixture.message.id), undefined);
  } finally {
    await cleanFixture(fixture);
  }
});

test("only unambiguous permanent SendGrid responses release a send claim", () => {
  assert.equal(isDefinitiveSendGridRejection(400), true);
  assert.equal(isDefinitiveSendGridRejection(401), true);
  assert.equal(isDefinitiveSendGridRejection(403), true);
  assert.equal(isDefinitiveSendGridRejection(408), false);
  assert.equal(isDefinitiveSendGridRejection(409), false);
  assert.equal(isDefinitiveSendGridRejection(425), false);
  assert.equal(isDefinitiveSendGridRejection(429), false);
  assert.equal(isDefinitiveSendGridRejection(500), false);
  assert.equal(isDefinitiveSendGridRejection(503), false);
});

test("concurrent duplicate campaign sequence records can acquire only one send claim", async () => {
  const fixture = await createFixture();
  try {
    const [duplicate] = await db.insert(outreachMessagesTable).values({
      prospectId: fixture.prospect.id,
      campaignId: fixture.campaign.id,
      sequenceNumber: fixture.message.sequenceNumber,
      subject: "Duplicate",
      body: "Duplicate body",
      status: "approved",
    }).returning();
    const claims = await Promise.allSettled([
      reserveSequenceSend(fixture.message),
      reserveSequenceSend(duplicate!),
    ]);
    assert.equal(claims.filter((claim) => claim.status === "fulfilled").length, 1);
    assert.equal(claims.filter((claim) => claim.status === "rejected").length, 1);
  } finally {
    await cleanFixture(fixture);
  }
});

test("an accepted-but-unknown dispatch is not sent twice and late evidence resolves review", async () => {
  const fixture = await createFixture();
  const originalFetch = globalThis.fetch;
  const originalEnv = {
    OUTREACH_FROM_EMAIL: process.env.OUTREACH_FROM_EMAIL,
    OUTREACH_REPLY_TO_EMAIL: process.env.OUTREACH_REPLY_TO_EMAIL,
    SENDGRID_ISOLATION_VERIFIED: process.env.SENDGRID_ISOLATION_VERIFIED,
    SENDGRID_DEDICATED_API_KEY: process.env.SENDGRID_DEDICATED_API_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
  };
  let providerCalls = 0;
  try {
    process.env.OUTREACH_FROM_EMAIL = "outreach@example.com";
    process.env.OUTREACH_REPLY_TO_EMAIL = "replies@example.com";
    process.env.SENDGRID_ISOLATION_VERIFIED = "true";
    process.env.SENDGRID_DEDICATED_API_KEY = "test-only";
    process.env.SESSION_SECRET = "test-only";
    globalThis.fetch = async () => {
      providerCalls += 1;
      const [stored] = await db.select().from(outreachMessagesTable)
        .where(eq(outreachMessagesTable.id, fixture.message.id));
      assert.equal(stored?.providerReconciliationKey, `outreach-message-${fixture.message.id}`);
      throw new Error("connection closed after provider acceptance");
    };

    const claimed = await claimOutreachMessageForSending(fixture.message.id);
    assert.ok(claimed);
    await assert.rejects(
      sendApprovedOutreach(
        { ...claimed, status: "approved" },
        fixture.prospect,
        fixture.campaign,
      ),
      /dispatch result is unknown/,
    );
    await db.update(outreachMessagesTable)
      .set({ status: "needs_review", error: "SendGrid dispatch result is unknown" })
      .where(eq(outreachMessagesTable.id, fixture.message.id));

    const [duplicate] = await db.insert(outreachMessagesTable).values({
      prospectId: fixture.prospect.id,
      campaignId: fixture.campaign.id,
      sequenceNumber: fixture.message.sequenceNumber,
      subject: "Duplicate retry",
      body: "Duplicate retry body",
      status: "approved",
    }).returning();
    await assert.rejects(
      sendApprovedOutreach(duplicate!, fixture.prospect, fixture.campaign),
      /already reserved or was sent/,
    );
    assert.equal(providerCalls, 1);

    await processSendGridEvents([{
      email: fixture.prospect.contactEmail!,
      event: "delivered",
      timestamp: 1787990400,
      sg_message_id: `accepted-${fixture.message.id}.filter`,
      outreach_reconciliation_key: `outreach-message-${fixture.message.id}`,
      outreach_prospect_id: String(fixture.prospect.id),
    }]);
    const [reconciled] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(reconciled?.status, "delivered");
    assert.equal(reconciled?.providerMessageId, `accepted-${fixture.message.id}`);
    assert.equal(providerCalls, 1);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    await cleanFixture(fixture);
  }
});

test("a provider 503 retains the sequence claim and blocks redispatch", async () => {
  const fixture = await createFixture();
  const originalFetch = globalThis.fetch;
  const originalEnv = {
    OUTREACH_FROM_EMAIL: process.env.OUTREACH_FROM_EMAIL,
    OUTREACH_REPLY_TO_EMAIL: process.env.OUTREACH_REPLY_TO_EMAIL,
    SENDGRID_ISOLATION_VERIFIED: process.env.SENDGRID_ISOLATION_VERIFIED,
    SENDGRID_DEDICATED_API_KEY: process.env.SENDGRID_DEDICATED_API_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
  };
  let providerCalls = 0;
  try {
    process.env.OUTREACH_FROM_EMAIL = "outreach@example.com";
    process.env.OUTREACH_REPLY_TO_EMAIL = "replies@example.com";
    process.env.SENDGRID_ISOLATION_VERIFIED = "true";
    process.env.SENDGRID_DEDICATED_API_KEY = "test-only";
    process.env.SESSION_SECRET = "test-only";
    globalThis.fetch = async () => {
      providerCalls += 1;
      return new Response(null, { status: 503 });
    };

    await assert.rejects(
      sendApprovedOutreach(fixture.message, fixture.prospect, fixture.campaign),
      /dispatch result is unknown after status 503/,
    );
    await assert.rejects(
      sendApprovedOutreach(fixture.message, fixture.prospect, fixture.campaign),
      /already reserved or was sent/,
    );
    assert.equal(providerCalls, 1);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    await cleanFixture(fixture);
  }
});