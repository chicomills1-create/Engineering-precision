import assert from "node:assert/strict";
import { test } from "node:test";
import type { Campaign, OutreachMessage, Prospect } from "@workspace/db";
import {
  assertOutreachEligibilityBase,
  assertScheduledTimeReady,
  assertSequenceDeliveryReady,
  getFollowUpScheduledAt,
  getNextPhoenixEightAm,
  getPhoenixCalendarDayStart,
  isOutreachContactExcluded,
} from "./outreachEligibility";
import { getOutreachDailyLimit } from "./outreach";

  const now = new Date("2026-08-28T12:00:00.000Z");
const eligibleProspect: Prospect = {
  id: 1,
  campaignId: null,
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
  providerReconciliationKey: null,
  error: null,
  sourceType: null,
  sourceId: null,
  createdAt: now,
  updatedAt: now,
};
const activeCampaign: Campaign = {
  id: 1,
  name: "Arizona architects",
  audience: "architect",
  states: ["AZ"],
  dailyLimit: 100,
  status: "active",
  subjectTemplate: null,
  bodyTemplate: null,
  createdAt: now,
  updatedAt: now,
};

test("eligible outreach returns a normalized email", () => {
  assert.equal(assertOutreachEligibilityBase(approvedMessage, eligibleProspect, activeCampaign), "alex@example.com");
});

test("draft approval validates sending safeguards without requiring prior approval", () => {
  assert.equal(
    assertOutreachEligibilityBase(
      { ...approvedMessage, status: "draft" },
      eligibleProspect,
      activeCampaign,
      { requireApprovedMessage: false },
    ),
    "alex@example.com",
  );
  assert.throws(
    () => assertOutreachEligibilityBase(
      { ...approvedMessage, status: "draft" },
      { ...eligibleProspect, emailStatus: "unverified" },
      activeCampaign,
      { requireApprovedMessage: false },
    ),
    /must be verified/,
  );
});

test("rejects whitespace-only outreach evidence", () => {
  assert.throws(
    () => assertOutreachEligibilityBase(
      approvedMessage,
      { ...eligibleProspect, needSignals: "   " },
      activeCampaign,
    ),
    /current need/,
  );
  assert.throws(
    () => assertOutreachEligibilityBase(
      approvedMessage,
      { ...eligibleProspect, contactSourceUrl: "   " },
      activeCampaign,
    ),
    /public source/,
  );
});

test("excludes current client contacts by name and company", () => {
  assert.equal(isOutreachContactExcluded({
    companyName: "Atmosphere Architects, Inc.",
    contactName: "Tim Boyle",
  }), true);
  assert.equal(isOutreachContactExcluded({
    companyName: "Atmosphere Architects",
    contactName: "Mike Hudson",
  }), true);
  assert.equal(isOutreachContactExcluded({
    companyName: "Atmosphere Architects",
    contactName: "Other Contact",
  }), false);
  assert.throws(
    () => assertOutreachEligibilityBase(
      approvedMessage,
      { ...eligibleProspect, companyName: "Atmosphere Architects", contactName: "Tim Boyle" },
      activeCampaign,
    ),
    /excluded from outreach/,
  );
});

test("enforces the 150-per-day campaign ceiling from the first send day", () => {
  assert.equal(getOutreachDailyLimit(100, 0), 100);
  assert.equal(getOutreachDailyLimit(100, 2), 100);
  assert.equal(getOutreachDailyLimit(100, 3), 100);
  assert.equal(getOutreachDailyLimit(250, 3), 150);
  assert.equal(getOutreachDailyLimit(167, 0), 150);
  assert.equal(getOutreachDailyLimit(500, 0), 150);
  assert.equal(getOutreachDailyLimit(500, 3), 150);
});

const blockedCases: Array<[string, Partial<Prospect>, Partial<OutreachMessage>, Partial<Campaign>, string]> = [
  ["missing email", { contactEmail: null }, {}, {}, "real business email"],
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

test("blocks malformed legacy Public values before approval", () => {
  assert.throws(
    () => assertOutreachEligibilityBase(
      approvedMessage,
      {
        ...eligibleProspect,
        companyName: "[object Object]",
        contactEmail: "info@company.com",
        sourceUrl: "",
      },
      activeCampaign,
    ),
    /usable company name, real business email, public source URL/,
  );
});

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

test("queues approved outreach for the next 8 AM Phoenix window", () => {
  assert.equal(
    getNextPhoenixEightAm(new Date("2026-08-29T14:00:00.000Z")).toISOString(),
    "2026-08-29T15:00:00.000Z",
  );
  assert.equal(
    getNextPhoenixEightAm(new Date("2026-08-29T15:01:00.000Z")).toISOString(),
    "2026-08-30T15:00:00.000Z",
  );
});

test("uses Phoenix midnight for dashboard daily counts", () => {
  assert.equal(
    getPhoenixCalendarDayStart(new Date("2026-08-29T05:30:00.000Z")).toISOString(),
    "2026-08-28T07:00:00.000Z",
  );
  assert.equal(
    getPhoenixCalendarDayStart(new Date("2026-08-29T08:30:00.000Z")).toISOString(),
    "2026-08-29T07:00:00.000Z",
  );
});
