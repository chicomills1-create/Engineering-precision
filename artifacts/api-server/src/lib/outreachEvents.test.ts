import assert from "node:assert/strict";
import { generateKeyPairSync, randomUUID, sign } from "node:crypto";
import { afterEach, test } from "node:test";
import {
  campaignsTable,
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import {
  processInboundReply,
  processSendGridEvents,
  verifySendGridEventSignature,
} from "./outreachEvents";
import { eq, inArray } from "drizzle-orm";

const originalKey = process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY;
afterEach(() => {
  if (originalKey === undefined) delete process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY;
  else process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY = originalKey;
});

test("accepts a valid SendGrid-style ECDSA SHA-256 signature and rejects tampering", () => {
  const { publicKey, privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
  process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY = publicKey.export({ type: "spki", format: "pem" }).toString();
  const timestamp = "1787970000";
  const body = Buffer.from('[{"event":"delivered","email":"test@example.com"}]');
  const signature = sign("sha256", Buffer.concat([Buffer.from(timestamp), body]), privateKey).toString("base64");
  assert.equal(verifySendGridEventSignature(body, { timestamp, signature }), true);
  assert.equal(verifySendGridEventSignature(Buffer.from(`${body.toString()}x`), { timestamp, signature }), false);
});

test("accepts the base64 DER public-key format returned by SendGrid", () => {
  const { publicKey, privateKey } = generateKeyPairSync("ec", { namedCurve: "prime256v1" });
  process.env.SENDGRID_EVENT_WEBHOOK_PUBLIC_KEY = publicKey
    .export({ type: "spki", format: "der" })
    .toString("base64");
  const timestamp = "1787970001";
  const body = Buffer.from('[{"event":"delivered","email":"test@example.com"}]');
  const signature = sign("sha256", Buffer.concat([Buffer.from(timestamp), body]), privateKey).toString("base64");
  assert.equal(verifySendGridEventSignature(body, { timestamp, signature }), true);
});

async function createEventFixture() {
  const suffix = randomUUID();
  const email = `outreach-test-${suffix}@example.com`;
  const [campaign] = await db.insert(campaignsTable).values({
    name: `Event test ${suffix}`,
    audience: "architect",
    states: ["AZ"],
    status: "active",
  }).returning();
  const [prospect] = await db.insert(prospectsTable).values({
    campaignId: campaign!.id,
    companyName: `Event Test ${suffix}`,
    city: "Phoenix",
    state: "AZ",
    audience: "architect",
    contactEmail: email,
    contactName: "Test Contact",
    contactTitle: "Principal",
    contactConfidence: "high",
    contactSourceUrl: "https://example.com/contact",
    emailStatus: "verified",
    status: "approved",
    fitScore: 80,
    needScore: 80,
    needSignals: "Public project signal",
    dedupeKey: `event-test:${suffix}`,
  }).returning();
  const [initial, followUp] = await db.insert(outreachMessagesTable).values([
    {
      prospectId: prospect!.id,
      campaignId: campaign!.id,
      sequenceNumber: 1,
      subject: "Initial test",
      body: "Initial test body",
      status: "approved",
    },
    {
      prospectId: prospect!.id,
      campaignId: campaign!.id,
      sequenceNumber: 2,
      subject: "Follow-up test",
      body: "Follow-up test body",
      status: "approved",
    },
  ]).returning();
  return { campaign: campaign!, prospect: prospect!, initial: initial!, followUp: followUp!, email };
}

async function cleanEventFixture(fixture: Awaited<ReturnType<typeof createEventFixture>>) {
  await db.delete(outreachDeliveryEventsTable).where(eq(outreachDeliveryEventsTable.email, fixture.email));
  await db.delete(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, fixture.email));
  await db.delete(outreachMessagesTable).where(inArray(outreachMessagesTable.id, [fixture.initial.id, fixture.followUp.id]));
  await db.delete(prospectsTable).where(eq(prospectsTable.id, fixture.prospect.id));
  await db.delete(campaignsTable).where(eq(campaignsTable.id, fixture.campaign.id));
}

test("delivery events mark the message delivered and schedule follow-up timing", async () => {
  const fixture = await createEventFixture();
  try {
    const processed = await processSendGridEvents([{
      email: fixture.email,
      event: "delivered",
      timestamp: 1787970000,
      sg_message_id: `delivered-${fixture.campaign.id}.filter`,
      outreach_message_id: String(fixture.initial.id),
      outreach_prospect_id: String(fixture.prospect.id),
    }]);
    assert.equal(processed, 1);
    const [message] = await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, fixture.initial.id));
    const [followUp] = await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, fixture.followUp.id));
    assert.equal(message?.status, "delivered");
    assert.ok(followUp?.scheduledAt);
  } finally {
    await cleanEventFixture(fixture);
  }
});

test("bounce events suppress the address and stop pending messages", async () => {
  const fixture = await createEventFixture();
  try {
    await processSendGridEvents([{
      email: fixture.email,
      event: "bounce",
      reason: "Mailbox unavailable",
      timestamp: 1787970001,
      sg_message_id: `bounce-${fixture.campaign.id}.filter`,
      outreach_message_id: String(fixture.initial.id),
      outreach_prospect_id: String(fixture.prospect.id),
    }]);
    const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, fixture.prospect.id));
    const messages = await db.select().from(outreachMessagesTable).where(inArray(outreachMessagesTable.id, [fixture.initial.id, fixture.followUp.id]));
    const [suppression] = await db.select().from(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, fixture.email));
    assert.equal(prospect?.status, "suppressed");
    assert.ok(messages.every((message) => message.status === "bounced"));
    assert.ok(suppression);
  } finally {
    await cleanEventFixture(fixture);
  }
});

test("complaint events suppress the address and stop pending messages", async () => {
  const fixture = await createEventFixture();
  try {
    await processSendGridEvents([{
      email: fixture.email,
      event: "spamreport",
      timestamp: 1787970002,
      sg_message_id: `spam-${fixture.campaign.id}.filter`,
      outreach_message_id: String(fixture.initial.id),
      outreach_prospect_id: String(fixture.prospect.id),
    }]);
    const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, fixture.prospect.id));
    const messages = await db.select().from(outreachMessagesTable).where(inArray(outreachMessagesTable.id, [fixture.initial.id, fixture.followUp.id]));
    assert.equal(prospect?.status, "suppressed");
    assert.ok(messages.every((message) => message.status === "unsubscribed"));
  } finally {
    await cleanEventFixture(fixture);
  }
});

test("inbound replies mark the prospect replied and stop pending messages", async () => {
  const fixture = await createEventFixture();
  try {
    assert.equal(await processInboundReply(fixture.email), 1);
    const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, fixture.prospect.id));
    const messages = await db.select().from(outreachMessagesTable).where(inArray(outreachMessagesTable.id, [fixture.initial.id, fixture.followUp.id]));
    assert.equal(prospect?.status, "replied");
    assert.ok(messages.every((message) => message.status === "replied"));
  } finally {
    await cleanEventFixture(fixture);
  }
});