import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import { eq } from "drizzle-orm";
import {
  campaignsTable,
  db,
  outreachMessagesTable,
  prospectsTable,
} from "@workspace/db";
import { ensureApprovedFollowUpSequence } from "./outreachSequence";

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

  try {
    await Promise.all([
      ensureApprovedFollowUpSequence(initial!, prospect!),
      db.insert(outreachMessagesTable).values([2, 3, 4].map((sequenceNumber) => ({
        prospectId: prospect!.id,
        campaignId: campaign!.id,
        sequenceNumber,
        subject: `Concurrent draft ${sequenceNumber}`,
        body: `Concurrent draft body ${sequenceNumber}`,
        status: "draft",
      }))).onConflictDoNothing(),
    ]);
    const messages = await db.select().from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.prospectId, prospect!.id));
    const followUps = messages
      .filter((message) => message.sequenceNumber > 1)
      .sort((left, right) => left.sequenceNumber - right.sequenceNumber);
    assert.deepEqual(
      followUps.map((message) => message.sequenceNumber),
      [2, 3, 4],
    );
    assert.ok(followUps.every((message) => message.status === "approved"));
  } finally {
    await db.delete(prospectsTable).where(eq(prospectsTable.id, prospect!.id));
    await db.delete(campaignsTable).where(eq(campaignsTable.id, campaign!.id));
  }
});