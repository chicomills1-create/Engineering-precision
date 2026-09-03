import assert from "node:assert/strict";
import { test } from "node:test";
import type { Campaign, OutreachMessage, Prospect } from "@workspace/db";
import {
  assertOutreachEligibilityBase,
  assertFollowUpCadenceReady,
  assertScheduledTimeReady,
  assertSequenceDeliveryReady,
  getFollowUpScheduledAt,
  getNextPhoenixEightAm,
  getPhoenixCalendarDayStart,
  isOutreachContactExcluded,
} from "./outreachEligibility";
import {
  getLegacyOutreachMonthlySentCount,
  getLegacyOutreachSentCount,
  getGlobalOutreachDailyLimit,
  getOutreachDailyLimit,
  getOutreachMonthlyLimit,
  getPhoenixOutreachMonthKey,
  isDuplicateEmailSequenceStatus,
} from "./outreach";

test("the September 3 hot-market exception raises only that Phoenix day's global limit", () => {
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-03T15:00:00.000Z")), 250);
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-04T15:00:00.000Z")), 200);
  assert.equal(getOutreachMonthlyLimit(), 6000);
});

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
  contactStatus: "active",
  contactEvidenceType: null,
  contactEvidence: null,
  contactEvidenceAt: null,
  contactReviewAt: null,
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

test("automatic preparation may pre-approve a fully verified review prospect", () => {
  assert.equal(
    assertOutreachEligibilityBase(
      { ...approvedMessage, status: "draft" },
      { ...eligibleProspect, status: "review" },
      activeCampaign,
      {
        requireApprovedMessage: false,
        requireApprovedProspect: false,
      },
    ),
    "alex@example.com",
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

test("enforces the 200-per-day campaign ceiling from the first send day", () => {
  assert.equal(getOutreachDailyLimit(100, 0), 100);
  assert.equal(getOutreachDailyLimit(100, 2), 100);
  assert.equal(getOutreachDailyLimit(100, 3), 100);
  assert.equal(getOutreachDailyLimit(250, 3), 200);
  assert.equal(getOutreachDailyLimit(167, 0), 167);
  assert.equal(getOutreachDailyLimit(500, 0), 200);
  assert.equal(getOutreachDailyLimit(500, 3), 200);
});

test("legacy same-day sends consume the new global reservation ceiling", () => {
  assert.equal(getLegacyOutreachSentCount(167, 0), 167);
  assert.equal(getLegacyOutreachSentCount(100, 100), 0);
  assert.equal(getLegacyOutreachSentCount(120, 20), 100);
});

test("monthly outreach quota uses Phoenix calendar months and a hard 6000 ceiling", () => {
  assert.equal(getPhoenixOutreachMonthKey(new Date("2026-09-01T06:59:59.000Z")), "2026-08");
  assert.equal(getPhoenixOutreachMonthKey(new Date("2026-09-01T07:00:00.000Z")), "2026-09");
  assert.equal(getOutreachMonthlyLimit(), 6000);
  assert.equal(getLegacyOutreachMonthlySentCount(6100, 100), 6000);
  assert.equal(getLegacyOutreachMonthlySentCount(50, 75), 0);
});

test("duplicate recipient sequence policy blocks active and post-acceptance states", () => {
  for (const status of [
    "sending",
    "needs_review",
    "sent",
    "delivered",
    "bounced",
    "replied",
    "unsubscribed",
  ]) {
    assert.equal(isDuplicateEmailSequenceStatus(status), true);
  }
  for (const status of ["draft", "approved", "failed"]) {
    assert.equal(isDuplicateEmailSequenceStatus(status), false);
  }
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

test("follow-ups use Phoenix 8 AM on days 3, 8, and 15 after verified initial delivery", () => {
  const initialDeliveredAt = new Date("2026-08-28T12:00:00.000Z");
  assert.equal(getFollowUpScheduledAt(1, initialDeliveredAt), null);
  assert.equal(getFollowUpScheduledAt(2, initialDeliveredAt)?.toISOString(), "2026-08-31T15:00:00.000Z");
  assert.equal(getFollowUpScheduledAt(3, initialDeliveredAt)?.toISOString(), "2026-09-05T15:00:00.000Z");
  assert.equal(getFollowUpScheduledAt(4, initialDeliveredAt)?.toISOString(), "2026-09-12T15:00:00.000Z");
});

test("follow-ups cannot bypass the delivery-derived Phoenix cadence", () => {
  const deliveredAt = new Date("2026-08-28T12:00:00.000Z");
  assert.throws(
    () => assertFollowUpCadenceReady(2, new Date("2026-08-29T15:00:00.000Z"), deliveredAt),
    /Phoenix delivery-based cadence/,
  );
  assert.throws(
    () => assertFollowUpCadenceReady(2, new Date("2026-08-31T15:00:00.000Z"), null),
    /verified delivered/,
  );
  assert.doesNotThrow(
    () => assertFollowUpCadenceReady(2, new Date("2026-08-31T15:00:00.000Z"), deliveredAt),
  );
});

test("manual and automatic sends cannot bypass their due time", () => {
  const now = new Date("2026-08-28T12:00:00.000Z");
  assert.doesNotThrow(() => assertScheduledTimeReady(1, null, now));
  assert.throws(
    () => assertScheduledTimeReady(1, new Date("2026-08-29T12:00:00.000Z"), now),
    /before its scheduled time/,
  );
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

test("blocks every contact with recorded reply, availability, departure, or replacement evidence", () => {
  for (const contactStatus of ["replied", "temporary_unavailable", "departed", "replacement_pending"] as const) {
    assert.throws(
      () => assertOutreachEligibilityBase(
        approvedMessage,
        { ...eligibleProspect, contactStatus },
        activeCampaign,
      ),
      /requiring review/,
    );
  }
});
