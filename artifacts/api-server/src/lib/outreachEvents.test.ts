import assert from "node:assert/strict";
import { generateKeyPairSync, randomUUID, sign } from "node:crypto";
import { afterEach, test } from "node:test";
import {
  campaignsTable,
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachRepliesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import {
  captureInboundReply,
  classifyInboundReply,
  processInboundReply,
  processSendGridEvents,
  recordInboundReplyForwarding,
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

async function createEventFixture(initialStatus: "approved" | "sent" = "sent") {
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
      status: initialStatus,
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
  await db.delete(outreachRepliesTable).where(eq(outreachRepliesTable.senderEmail, fixture.email));
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

test("a late delivered event cannot revive a bounced message or its follow-ups", async () => {
  const fixture = await createEventFixture();
  try {
    await processSendGridEvents([{
      email: fixture.email,
      event: "bounce",
      reason: "Mailbox unavailable",
      timestamp: 1787970001,
      sg_message_id: `late-bounce-${fixture.campaign.id}.filter`,
      outreach_message_id: String(fixture.initial.id),
      outreach_prospect_id: String(fixture.prospect.id),
    }]);
    await processSendGridEvents([{
      email: fixture.email,
      event: "delivered",
      timestamp: 1787970002,
      sg_message_id: `late-delivery-${fixture.campaign.id}.filter`,
      outreach_message_id: String(fixture.initial.id),
      outreach_prospect_id: String(fixture.prospect.id),
    }]);

    const [message] = await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, fixture.initial.id));
    const [followUp] = await db.select().from(outreachMessagesTable).where(eq(outreachMessagesTable.id, fixture.followUp.id));
    assert.equal(message?.status, "bounced");
    assert.equal(followUp?.status, "bounced");
    assert.equal(followUp?.scheduledAt, null);
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
  const fixture = await createEventFixture("approved");
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

test("retains an inbound reply once when SendGrid retries the same message", async () => {
  const fixture = await createEventFixture("approved");
  try {
    const input = {
      from: fixture.email,
      senderName: "Test Contact",
      to: "replies@example.com",
      subject: "Re: Initial test",
      text: "Yes, please call me next week.",
      headers: "Message-ID: <reply-dedupe@example.com>\nAuto-Submitted: no",
    };
    const first = await captureInboundReply(input);
    const duplicate = await captureInboundReply(input);
    assert.equal(first.inserted, true);
    assert.equal(first.matchedProspects, 1);
    assert.equal(duplicate.inserted, false);
    assert.equal(duplicate.matchedProspects, 0);
    assert.equal(first.reply.prospectId, fixture.prospect.id);
    assert.equal(first.reply.outreachMessageId, null);
    const retained = await db.select().from(outreachRepliesTable)
      .where(eq(outreachRepliesTable.senderEmail, fixture.email));
    assert.equal(retained.length, 1);
  } finally {
    await cleanEventFixture(fixture);
  }
});

test("classifies out-of-office replies and pauses rather than permanently closing the prospect", async () => {
  const fixture = await createEventFixture("approved");
  try {
    const captured = await captureInboundReply({
      from: fixture.email,
      subject: "Automatic reply: Re: Initial test",
      text: "I am out of the office and will return soon.",
      headers: "Message-ID: <auto-reply@example.com>\nAuto-Submitted: auto-replied",
      receivedAt: new Date("2026-08-31T16:00:00.000Z"),
    });
    assert.equal(captured.reply.messageType, "auto_reply");
    assert.ok(captured.reply.followUpAt);
    const [prospect] = await db.select().from(prospectsTable)
      .where(eq(prospectsTable.id, fixture.prospect.id));
    const messages = await db.select().from(outreachMessagesTable)
      .where(inArray(outreachMessagesTable.id, [fixture.initial.id, fixture.followUp.id]));
    assert.equal(prospect?.status, "review");
    assert.equal(prospect?.contactStatus, "temporary_unavailable");
    assert.ok(messages.every((message) => message.status === "needs_review"));
  } finally {
    await cleanEventFixture(fixture);
  }
});

test("retains unmatched replies for triage and records forwarding failure independently", async () => {
  const email = `unmatched-${randomUUID()}@example.com`;
  try {
    const captured = await captureInboundReply({
      from: email,
      subject: "Question about Apex Grid",
      text: "Can someone help?",
      headers: `Message-ID: <${randomUUID()}@example.com>`,
    });
    assert.equal(captured.matchedProspects, 0);
    assert.equal(captured.reply.prospectId, null);
    await recordInboundReplyForwarding(captured.reply.id, {
      status: "failed",
      error: "Simulated forwarding outage",
    });
    const [retained] = await db.select().from(outreachRepliesTable)
      .where(eq(outreachRepliesTable.id, captured.reply.id));
    assert.equal(retained?.status, "unread");
    assert.equal(retained?.forwardStatus, "failed");
    assert.equal(retained?.forwardError, "Simulated forwarding outage");
  } finally {
    await db.delete(outreachRepliesTable).where(eq(outreachRepliesTable.senderEmail, email));
  }
});

test("does not misclassify ordinary replies as automatic", () => {
  assert.equal(classifyInboundReply({
    subject: "Re: Initial test",
    text: "Thanks, this is interesting.",
    headers: "Auto-Submitted: no",
  }), "reply");
});

test("classifies an explicit permanent business closure separately from a temporary auto-reply", () => {
  assert.equal(classifyInboundReply({
    subject: "Auto Response from BKBC Architects",
    text: "BKBC Architects Inc. has permanently closed.",
    headers: "Auto-Submitted: auto-replied",
  }), "permanent_closure");
});

test("a permanent closure reply suppresses the address and stops pending outreach", async () => {
  const fixture = await createEventFixture("approved");
  try {
    const captured = await captureInboundReply({
      from: fixture.email,
      subject: "Auto Response from Test Firm",
      text: "As of March 31, 2026, Test Firm has permanently closed.",
      headers: `Message-ID: <closure-${fixture.prospect.id}@example.com>`,
    });
    assert.equal(captured.reply.messageType, "permanent_closure");
    const [prospect] = await db.select().from(prospectsTable)
      .where(eq(prospectsTable.id, fixture.prospect.id));
    const [suppression] = await db.select().from(outreachSuppressionsTable)
      .where(eq(outreachSuppressionsTable.email, fixture.email));
    const messages = await db.select().from(outreachMessagesTable)
      .where(inArray(outreachMessagesTable.id, [fixture.initial.id, fixture.followUp.id]));
    assert.equal(prospect?.status, "suppressed");
    assert.equal(prospect?.contactStatus, "departed");
    assert.ok(suppression);
    assert.ok(messages.every((message) => message.status === "unsubscribed"));
  } finally {
    await cleanEventFixture(fixture);
  }
});