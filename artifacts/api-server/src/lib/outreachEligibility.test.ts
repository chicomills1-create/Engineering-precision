import assert from "node:assert/strict";
import { test } from "node:test";
import type { Campaign, OutreachMessage, Prospect } from "@workspace/db";
import {
  assertOutreachEligibilityBase,
  assertScheduledTimeReady,
  assertSequenceDeliveryReady,
  getFollowUpScheduledAt,
} from "./outreachEligibility";

const now = new Date();
const eligibleProspect: Prospect = {
  id: 1,
  companyName: "Qualified Commercial Firm",
  website: "https://example.com",
  city: "Phoenix",
  state: "AZ",
  audience: "architect",
  sourceUrl: "https://example.com/projects",
  researchNotes: "Publicly announced active commercial project.",
  fitScore: 85,
  needScore: 80,
  needSignals: "Active project and consultant demand",
  contactName: "Alex Rivera",
  contactTitle: "Principal",
  contactEmail: "Alex@Example.com",
  contactConfidence: "high",
  contactSourceUrl: "https://example.com/team",
  dedupeKey: "key",
  researchRunId: null,
  emailStatus: "verified",
  status: "approved",
  createdAt: now,
  updatedAt: now,
};
const approvedMessage: OutreachMessage = {
  id: 1,
  prospectId: 1,
  campaignId: 1,
  sequenceNumber: 1,
  subject: "Project support",
  body: "Body",
  status: "approved",
  scheduledAt: null,
  sentAt: null,
  providerMessageId: null,
  error: null,
  createdAt: now,
  updatedAt: now,
};
const activeCampaign: Campaign = {
  id: 1,
  name: "Arizona architects",
  audience: "architect",
  states: ["AZ"],
  dailyLimit: 10,
  status: "active",
  subjectTemplate: null,
  bodyTemplate: null,
  createdAt: now,
  updatedAt: now,
};

test("eligible outreach returns a normalized email", () => {
  assert.equal(assertOutreachEligibilityBase(approvedMessage, eligibleProspect, activeCampaign), "alex@example.com");
});

const blockedCases: Array<[string, Partial<Prospect>, Partial<OutreachMessage>, Partial<Campaign>, string]> = [
  ["missing email", { contactEmail: null }, {}, {}, "does not have a business email"],
  ["unapproved message", {}, { status: "draft" }, {}, "must be approved"],
  ["unapproved prospect", { status: "review" }, {}, {}, "Prospect must be approved"],
  ["low fit", { fitScore: 59 }, {}, {}, "enough evidence"],
  ["low need", { needScore: 59 }, {}, {}, "enough evidence"],
  ["missing need evidence", { needSignals: null }, {}, {}, "enough evidence"],
  ["unknown contact", { contactConfidence: "unknown" }, {}, {}, "high-confidence"],
  ["missing decision-maker", { contactName: null }, {}, {}, "high-confidence"],
  ["missing contact source", { contactSourceUrl: null }, {}, {}, "public source"],
  ["unverified email", { emailStatus: "unverified" }, {}, {}, "must be verified"],
  ["paused campaign", {}, {}, { status: "paused" }, "must be active"],
  ["wrong campaign audience", {}, {}, { audience: "builder" }, "targeting does not match"],
  ["wrong campaign state", {}, {}, { states: ["CA"] }, "targeting does not match"],
];

for (const [name, prospectPatch, messagePatch, campaignPatch, expected] of blockedCases) {
  test(`blocks ${name}`, () => {
    assert.throws(
      () => assertOutreachEligibilityBase(
        { ...approvedMessage, ...messagePatch },
        { ...eligibleProspect, ...prospectPatch },
        { ...activeCampaign, ...campaignPatch },
      ),
      new RegExp(expected),
    );
  });
}

test("initial outreach does not require a prior delivery", () => {
  assert.doesNotThrow(() => assertSequenceDeliveryReady(1));
});

test("follow-up requires the immediately prior sequence to be delivered", () => {
  assert.throws(() => assertSequenceDeliveryReady(2, "sent"), /must be delivered/);
  assert.throws(() => assertSequenceDeliveryReady(3, "bounced"), /must be delivered/);
  assert.doesNotThrow(() => assertSequenceDeliveryReady(2, "delivered"));
});

test("follow-ups use 3, 8, and 15 days from verified initial delivery", () => {
  const initialDeliveredAt = new Date("2026-08-28T12:00:00.000Z");
  assert.equal(getFollowUpScheduledAt(1, initialDeliveredAt), null);
  assert.equal(getFollowUpScheduledAt(2, initialDeliveredAt)?.toISOString(), "2026-08-31T12:00:00.000Z");
  assert.equal(getFollowUpScheduledAt(3, initialDeliveredAt)?.toISOString(), "2026-09-05T12:00:00.000Z");
  assert.equal(getFollowUpScheduledAt(4, initialDeliveredAt)?.toISOString(), "2026-09-12T12:00:00.000Z");
});

test("manual and automatic follow-ups cannot bypass their due time", () => {
  const now = new Date("2026-08-28T12:00:00.000Z");
  assert.doesNotThrow(() => assertScheduledTimeReady(1, null, now));
  assert.throws(() => assertScheduledTimeReady(2, null, now), /scheduled send time/);
  assert.throws(
    () => assertScheduledTimeReady(2, new Date("2026-08-29T12:00:00.000Z"), now),
    /before its scheduled time/,
  );
  assert.doesNotThrow(
    () => assertScheduledTimeReady(2, new Date("2026-08-28T11:59:59.000Z"), now),
  );
});