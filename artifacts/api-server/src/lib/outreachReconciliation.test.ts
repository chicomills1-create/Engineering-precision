import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import { eq } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachMonthlySendReservationsTable,
  outreachRepliesTable,
  outreachSendReservationsTable,
  outreachSequenceSendClaimsTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import {
  ensureProviderReconciliationKey,
  isDefinitiveSendGridRejection,
  reserveSequenceSend,
  sendApprovedOutreach,
} from "./outreach";
import { captureInboundReply, processSendGridEvents } from "./outreachEvents";
import {
  claimOutreachMessageForSending,
  getSendFailureStatus,
  reconcileSendingOutreachMessages,
} from "./outreachWorker";
import {
  classifySendGridActivity,
  reconcileUncertainOutreachMessages,
  type ProviderActivityOutcome,
} from "./outreachReconciliation";

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
    sourceUrl: "https://example.com/projects",
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
  await db.delete(outreachRepliesTable)
    .where(eq(outreachRepliesTable.senderEmail, fixture.prospect.contactEmail!));
  await db.delete(outreachSuppressionsTable)
    .where(eq(outreachSuppressionsTable.email, fixture.prospect.contactEmail!));
  await db.delete(outreachDeliveryEventsTable).where(eq(outreachDeliveryEventsTable.outreachMessageId, fixture.message.id));
  await db.delete(outreachSendReservationsTable).where(eq(outreachSendReservationsTable.messageId, fixture.message.id));
  await db.delete(outreachMonthlySendReservationsTable)
    .where(eq(outreachMonthlySendReservationsTable.messageId, fixture.message.id));
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

test("an inbound reply is serialized with an in-flight provider dispatch", async () => {
  const fixture = await createFixture();
  const originalFetch = globalThis.fetch;
  const originalEnv = {
    OUTREACH_FROM_EMAIL: process.env.OUTREACH_FROM_EMAIL,
    OUTREACH_REPLY_TO_EMAIL: process.env.OUTREACH_REPLY_TO_EMAIL,
    SENDGRID_ISOLATION_VERIFIED: process.env.SENDGRID_ISOLATION_VERIFIED,
    SENDGRID_DEDICATED_API_KEY: process.env.SENDGRID_DEDICATED_API_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
  };
  let providerStarted!: () => void;
  const providerReady = new Promise<void>((resolve) => { providerStarted = resolve; });
  let releaseProvider!: () => void;
  const providerRelease = new Promise<void>((resolve) => { releaseProvider = resolve; });
  let providerCalls = 0;
  try {
    process.env.OUTREACH_FROM_EMAIL = "outreach@example.com";
    process.env.OUTREACH_REPLY_TO_EMAIL = "replies@example.com";
    process.env.SENDGRID_ISOLATION_VERIFIED = "true";
    process.env.SENDGRID_DEDICATED_API_KEY = "test-only";
    process.env.SESSION_SECRET = "test-only";
    globalThis.fetch = async () => {
      providerCalls += 1;
      providerStarted();
      await providerRelease;
      return new Response(null, {
        status: 202,
        headers: { "x-message-id": "provider-race-test" },
      });
    };

    const claimed = await claimOutreachMessageForSending(fixture.message.id);
    assert.ok(claimed);
    const sendPromise = sendApprovedOutreach(
      { ...claimed, status: "approved" },
      fixture.prospect,
      fixture.campaign,
      { expectedPersistedStatus: "sending" },
    );
    await providerReady;
    const replyPromise = captureInboundReply({
      from: fixture.prospect.contactEmail!,
      subject: "Re: Reconciliation test",
      text: "Yes, let's discuss this.",
      headers: `Message-ID: <race-${fixture.message.id}@example.com>`,
    });
    releaseProvider();
    await sendPromise;
    const captured = await replyPromise;
    assert.equal(providerCalls, 1);
    assert.equal(captured.inserted, true);
    const [followUp] = await db.select({ status: outreachMessagesTable.status })
      .from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(followUp?.status, "replied");
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
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
      /already (?:active|reserved)|was sent/,
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
      /already (?:active|reserved)|was sent/,
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

async function addSendClaims(fixture: Awaited<ReturnType<typeof createFixture>>): Promise<void> {
  await db.insert(outreachSequenceSendClaimsTable).values({
    messageId: fixture.message.id,
    prospectId: fixture.prospect.id,
    campaignScope: `campaign:${fixture.campaign.id}`,
    sequenceNumber: fixture.message.sequenceNumber,
  });
  await db.insert(outreachSendReservationsTable).values({
    messageId: fixture.message.id,
    quotaKey: "outreach-global:2026-08-30",
    slot: fixture.message.id,
  });
  await db.insert(outreachMonthlySendReservationsTable).values({
    messageId: fixture.message.id,
    normalizedEmail: fixture.prospect.contactEmail!.trim().toLowerCase(),
    sequenceNumber: fixture.message.sequenceNumber,
    quotaKey: "outreach-global:2026-08",
    slot: fixture.message.id,
  });
}

function lookupResult(outcome: ProviderActivityOutcome) {
  return async () => outcome;
}

test("terminal non-delivery takes precedence over an earlier processed event", () => {
  const outcome = classifySendGridActivity({
    messages: [{
      msg_id: "mixed-event-message",
      status: "not_delivered",
      last_event_time: "2026-08-30T15:00:00.000Z",
      events: [
        "processed",
        { event_name: "bounce", reason: "Mailbox rejected the message" },
      ],
    }],
  });
  assert.equal(outcome.state, "terminal_failure");
  assert.match(outcome.reason, /mailbox rejected/i);
});

test("activity bounce suppresses the address and cannot release a resend", async () => {
  const fixture = await createFixture("sending");
  try {
    await ensureProviderReconciliationKey(fixture.message.id);
    await addSendClaims(fixture);
    const summary = await reconcileUncertainOutreachMessages({
      reviewAfterMs: 0,
      lookupActivity: lookupResult(classifySendGridActivity({
        messages: [{
          msg_id: `bounced-${fixture.message.id}`,
          status: "not_delivered",
          last_event_time: "2026-08-30T15:00:00.000Z",
          events: [
            "processed",
            { event_name: "bounce", reason: "Mailbox unavailable" },
          ],
        }],
      })),
    });
    const [message] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    const [prospect] = await db.select().from(prospectsTable)
      .where(eq(prospectsTable.id, fixture.prospect.id));
    const [suppression] = await db.select().from(outreachSuppressionsTable)
      .where(eq(outreachSuppressionsTable.email, fixture.prospect.contactEmail!));
    assert.equal(summary.failed, 1);
    assert.equal(summary.retryReleased, 0);
    assert.equal(message?.status, "bounced");
    assert.equal(prospect?.status, "suppressed");
    assert.ok(suppression);
    assert.equal(
      (await db.select().from(outreachSendReservationsTable)
        .where(eq(outreachSendReservationsTable.messageId, fixture.message.id))).length,
      1,
    );
    assert.equal(
      (await db.select().from(outreachSequenceSendClaimsTable)
        .where(eq(outreachSequenceSendClaimsTable.messageId, fixture.message.id))).length,
      1,
    );
    assert.equal(
      (await db.select().from(outreachMonthlySendReservationsTable)
        .where(eq(outreachMonthlySendReservationsTable.messageId, fixture.message.id))).length,
      1,
    );
    assert.equal(await claimOutreachMessageForSending(fixture.message.id), undefined);
  } finally {
    await cleanFixture(fixture);
  }
});

test("provider acceptance reconciles the message and preserves quota without resending", async () => {
  const fixture = await createFixture("sending");
  try {
    const reconciliationKey = await ensureProviderReconciliationKey(fixture.message.id);
    await addSendClaims(fixture);
    const occurredAt = new Date("2026-08-30T15:00:00.000Z");
    const summary = await reconcileUncertainOutreachMessages({
      reviewAfterMs: 0,
      lookupActivity: async (key) => {
        assert.equal(key, reconciliationKey);
        return {
          state: "accepted",
          providerMessageId: `accepted-${fixture.message.id}`,
          occurredAt,
          delivered: false,
          reason: "accepted",
        };
      },
    });

    const [message] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    const reservations = await db.select().from(outreachSendReservationsTable)
      .where(eq(outreachSendReservationsTable.messageId, fixture.message.id));
    const claims = await db.select().from(outreachSequenceSendClaimsTable)
      .where(eq(outreachSequenceSendClaimsTable.messageId, fixture.message.id));
    assert.equal(summary.accepted, 1);
    assert.equal(message?.status, "sent");
    assert.equal(message?.providerMessageId, `accepted-${fixture.message.id}`);
    assert.equal(message?.sentAt?.toISOString(), occurredAt.toISOString());
    assert.equal(reservations.length, 1);
    assert.equal(claims.length, 1);
  } finally {
    await cleanFixture(fixture);
  }
});

test("confirmed provider rejection releases exactly one automatic retry", async () => {
  const fixture = await createFixture("sending");
  try {
    await ensureProviderReconciliationKey(fixture.message.id);
    await addSendClaims(fixture);
    const rejected: ProviderActivityOutcome = {
      state: "not_accepted",
      providerMessageId: `rejected-${fixture.message.id}`,
      occurredAt: new Date("2026-08-30T15:01:00.000Z"),
      reason: "Provider rejected before delivery",
    };
    const first = await reconcileUncertainOutreachMessages({
      reviewAfterMs: 0,
      lookupActivity: lookupResult(rejected),
    });
    const [released] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(first.retryReleased, 1);
    assert.equal(released?.status, "approved");
    assert.equal(
      (await db.select().from(outreachSendReservationsTable)
        .where(eq(outreachSendReservationsTable.messageId, fixture.message.id))).length,
      0,
    );
    assert.equal(
      (await db.select().from(outreachSequenceSendClaimsTable)
        .where(eq(outreachSequenceSendClaimsTable.messageId, fixture.message.id))).length,
      0,
    );
    assert.equal(
      (await db.select().from(outreachMonthlySendReservationsTable)
        .where(eq(outreachMonthlySendReservationsTable.messageId, fixture.message.id))).length,
      0,
    );

    await db.update(outreachMessagesTable).set({ status: "sending" })
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    await addSendClaims(fixture);
    const second = await reconcileUncertainOutreachMessages({
      reviewAfterMs: 0,
      lookupActivity: lookupResult(rejected),
    });
    const [failed] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(second.failed, 1);
    assert.equal(failed?.status, "failed");
    assert.match(failed?.error ?? "", /one automatic retry/i);
  } finally {
    await cleanFixture(fixture);
  }
});

test("provider activity timeout remains blocked with a clear review reason", async () => {
  const fixture = await createFixture("sending");
  try {
    await ensureProviderReconciliationKey(fixture.message.id);
    await addSendClaims(fixture);
    const summary = await reconcileUncertainOutreachMessages({
      reviewAfterMs: 0,
      lookupActivity: lookupResult({
        state: "ambiguous",
        reason: "SendGrid activity lookup timed out",
      }),
    });
    const [message] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(summary.ambiguous, 1);
    assert.equal(message?.status, "needs_review");
    assert.match(message?.error ?? "", /timed out/i);
    assert.match(message?.error ?? "", /retry remains blocked/i);
    assert.equal(
      (await db.select().from(outreachSequenceSendClaimsTable)
        .where(eq(outreachSequenceSendClaimsTable.messageId, fixture.message.id))).length,
      1,
    );
  } finally {
    await cleanFixture(fixture);
  }
});

test("concurrent reconciliation cannot release the same retry twice", async () => {
  const fixture = await createFixture("sending");
  try {
    await ensureProviderReconciliationKey(fixture.message.id);
    await addSendClaims(fixture);
    const rejected: ProviderActivityOutcome = {
      state: "not_accepted",
      providerMessageId: `duplicate-safe-${fixture.message.id}`,
      occurredAt: new Date("2026-08-30T15:02:00.000Z"),
      reason: "Provider rejected before delivery",
    };
    const results = await Promise.all([
      reconcileUncertainOutreachMessages({
        reviewAfterMs: 0,
        lookupActivity: lookupResult(rejected),
      }),
      reconcileUncertainOutreachMessages({
        reviewAfterMs: 0,
        lookupActivity: lookupResult(rejected),
      }),
    ]);
    assert.equal(results.reduce((total, result) => total + result.retryReleased, 0), 1);
    const retryMarkers = await db.select().from(outreachDeliveryEventsTable)
      .where(eq(outreachDeliveryEventsTable.outreachMessageId, fixture.message.id));
    assert.equal(
      retryMarkers.filter((event) => event.eventType === "reconciliation_retry_released").length,
      1,
    );
    const [message] = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, fixture.message.id));
    assert.equal(message?.status, "approved");
  } finally {
    await cleanFixture(fixture);
  }
});