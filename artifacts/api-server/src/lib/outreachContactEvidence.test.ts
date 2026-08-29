import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import { eq, inArray } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  outreachSuppressionsTable,
  prospectsTable,
} from "@workspace/db";
import { recordContactEvidence } from "./outreachContactEvidence";

async function createFixture() {
  const suffix = randomUUID();
  const email = `contact-evidence-${suffix}@example.com`;
  const [campaign] = await db.insert(campaignsTable).values({
    name: `Contact evidence ${suffix}`,
    audience: "architect",
    states: ["AZ"],
    status: "active",
  }).returning();
  const [prospect] = await db.insert(prospectsTable).values({
    campaignId: campaign!.id,
    companyName: `Evidence Test ${suffix}`,
    city: "Phoenix",
    state: "AZ",
    audience: "architect",
    contactEmail: email,
    contactName: "Original Contact",
    contactTitle: "Principal",
    contactConfidence: "high",
    contactSourceUrl: "https://example.com/original",
    emailStatus: "verified",
    status: "contacted",
    fitScore: 80,
    needScore: 80,
    needSignals: "Public project signal",
    dedupeKey: `contact-evidence:${suffix}`,
  }).returning();
  const messages = await db.insert(outreachMessagesTable).values([
    {
      prospectId: prospect!.id,
      campaignId: campaign!.id,
      sequenceNumber: 1,
      subject: "Delivered",
      body: "Delivered body",
      status: "delivered",
    },
    {
      prospectId: prospect!.id,
      campaignId: campaign!.id,
      sequenceNumber: 2,
      subject: "Approved",
      body: "Approved body",
      status: "approved",
    },
    {
      prospectId: prospect!.id,
      campaignId: campaign!.id,
      sequenceNumber: 3,
      subject: "Draft",
      body: "Draft body",
      status: "draft",
    },
    {
      prospectId: prospect!.id,
      campaignId: campaign!.id,
      sequenceNumber: 4,
      subject: "Sending",
      body: "Sending body",
      status: "sending",
    },
  ]).returning();
  return { campaign: campaign!, prospect: prospect!, messages, email };
}

async function cleanupFixture(fixture: Awaited<ReturnType<typeof createFixture>>) {
  await db.delete(outreachSuppressionsTable).where(eq(outreachSuppressionsTable.email, fixture.email));
  await db.delete(outreachMessagesTable).where(eq(outreachMessagesTable.prospectId, fixture.prospect.id));
  await db.delete(prospectsTable).where(eq(prospectsTable.id, fixture.prospect.id));
  await db.delete(campaignsTable).where(eq(campaignsTable.id, fixture.campaign.id));
}

async function loadFixtureState(fixture: Awaited<ReturnType<typeof createFixture>>) {
  const [prospect] = await db.select().from(prospectsTable).where(eq(prospectsTable.id, fixture.prospect.id));
  const messages = await db.select().from(outreachMessagesTable)
    .where(inArray(outreachMessagesTable.id, fixture.messages.map((message) => message.id)));
  const [suppression] = await db.select().from(outreachSuppressionsTable)
    .where(eq(outreachSuppressionsTable.email, fixture.email));
  return { prospect: prospect!, messages, suppression };
}

test("forwarded reply evidence stops every pending state without suppressing the address", async () => {
  const fixture = await createFixture();
  try {
    const result = await recordContactEvidence({
      prospectId: fixture.prospect.id,
      evidenceType: "forwarded_reply",
      evidenceNote: "Forwarded reply received by the team.",
    });
    const state = await loadFixtureState(fixture);
    assert.equal(result?.stoppedMessageCount, 3);
    assert.equal(state.prospect.status, "replied");
    assert.equal(state.prospect.contactStatus, "replied");
    assert.equal(state.prospect.contactEvidence, "Forwarded reply received by the team.");
    assert.equal(state.suppression, undefined);
    assert.equal(state.messages.find((message) => message.sequenceNumber === 1)?.status, "delivered");
    assert.ok(state.messages.filter((message) => message.sequenceNumber > 1)
      .every((message) => message.status === "replied"));
  } finally {
    await cleanupFixture(fixture);
  }
});

test("temporary unavailability pauses outreach with a review date and no suppression", async () => {
  const fixture = await createFixture();
  const reviewAt = new Date("2030-02-03T16:00:00.000Z");
  try {
    await recordContactEvidence({
      prospectId: fixture.prospect.id,
      evidenceType: "temporary_unavailability",
      evidenceNote: "Automatic reply says the contact returns next month.",
      reviewAt,
    });
    const state = await loadFixtureState(fixture);
    assert.equal(state.prospect.status, "review");
    assert.equal(state.prospect.contactStatus, "temporary_unavailable");
    assert.equal(state.prospect.contactReviewAt?.toISOString(), reviewAt.toISOString());
    assert.equal(state.suppression, undefined);
    assert.ok(state.messages.filter((message) => message.sequenceNumber > 1)
      .every((message) => message.status === "needs_review"));
  } finally {
    await cleanupFixture(fixture);
  }
});

test("departure evidence suppresses the old address and the prospect", async () => {
  const fixture = await createFixture();
  try {
    const result = await recordContactEvidence({
      prospectId: fixture.prospect.id,
      evidenceType: "departed",
      evidenceNote: "Forwarded notice confirms the contact retired.",
    });
    const state = await loadFixtureState(fixture);
    assert.equal(result?.suppressedEmail, fixture.email);
    assert.equal(state.prospect.status, "suppressed");
    assert.equal(state.prospect.contactStatus, "departed");
    assert.equal(state.suppression?.reason, "Contact departed; forwarded evidence recorded");
    assert.ok(state.messages.filter((message) => message.sequenceNumber > 1)
      .every((message) => message.status === "unsubscribed"));
  } finally {
    await cleanupFixture(fixture);
  }
});

test("a replacement contact remains unverified and pending manual review", async () => {
  const fixture = await createFixture();
  try {
    const result = await recordContactEvidence({
      prospectId: fixture.prospect.id,
      evidenceType: "departed",
      evidenceNote: "Departure notice names a possible replacement.",
      replacementContactName: "Replacement Contact",
      replacementContactTitle: "Director",
      replacementContactEmail: "Replacement@Example.com",
      replacementContactSourceUrl: "https://example.com/replacement",
    });
    const state = await loadFixtureState(fixture);
    assert.equal(result?.replacementPending, true);
    assert.equal(state.prospect.status, "review");
    assert.equal(state.prospect.contactStatus, "replacement_pending");
    assert.equal(state.prospect.contactEmail, "replacement@example.com");
    assert.equal(state.prospect.contactConfidence, "unknown");
    assert.equal(state.prospect.emailStatus, "unverified");
    assert.ok(state.suppression);
  } finally {
    await cleanupFixture(fixture);
  }
});

test("evidence service rejects blank evidence, stale review dates, and partial replacements", async () => {
  await assert.rejects(
    recordContactEvidence({
      prospectId: 1,
      evidenceType: "forwarded_reply",
      evidenceNote: "   ",
    }),
    /Evidence details are required/,
  );
  await assert.rejects(
    recordContactEvidence({
      prospectId: 1,
      evidenceType: "temporary_unavailability",
      evidenceNote: "Out of office",
      reviewAt: new Date("2029-01-01T00:00:00.000Z"),
      now: new Date("2030-01-01T00:00:00.000Z"),
    }),
    /future review date/,
  );
  await assert.rejects(
    recordContactEvidence({
      prospectId: 1,
      evidenceType: "departed",
      evidenceNote: "Departed",
      replacementContactName: "Only a name",
    }),
    /all required/,
  );
});