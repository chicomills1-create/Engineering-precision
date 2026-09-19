import assert from "node:assert/strict";
import { test } from "node:test";
import type { Campaign, OutreachMessage, Prospect } from "@workspace/db";
import {
  assertOutreachEligibilityBase,
  assertFollowUpCadenceReady,
  assertScheduledTimeReady,
  assertSequenceDeliveryReady,
  getFollowUpScheduledAt,
  getNextPhoenixEightPm,
  getPhoenixCalendarDayStart,
  isOutreachContactExcluded,
} from "./outreachEligibility";
import {
  getLegacyOutreachMonthlySentCount,
  getLegacyOutreachSentCount,
  getGlobalOutreachDailyLimit,
  getOutreachDailyLimit,
  getOutreachDailyLane,
  getOutreachDailyLaneLimit,
  getOutreachMonthlyLimit,
  getPhoenixOutreachMonthKey,
  isRegularMonthlyOutreachLimitReached,
  isDuplicateEmailSequenceStatus,
} from "./outreach";
import { laneConfigTotal } from "./outreachLaneConfig";
import { OUTREACH_UNCAPPED } from "./outreachSystemConfig";
import {
  HOT_MARKET_RECURRING_SOURCE_TYPE,
  HOT_MARKET_SOURCE_TYPE,
} from "./hotMarketOutreachBatch";
import { MAX_SCHEDULED_MESSAGES_PER_RUN } from "./outreachWorker";

test("the global target reserves 150 regular and 50 hot-market slots while allowing verified extras", () => {
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-03T15:00:00.000Z")), 400);
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-03T15:00:00.000Z"), 50), 400);
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-03T15:00:00.000Z"), 73), 400);
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-03T15:00:00.000Z"), 100), 400);
  assert.ok(MAX_SCHEDULED_MESSAGES_PER_RUN >= 223);
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-04T15:00:00.000Z"), 100), 400);
  assert.equal(getOutreachMonthlyLimit(new Date("2026-09-03T15:00:00.000Z")), 12000);
});

test("JOB 2 global regular allowance changes on the Phoenix cutover date", () => {
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-12T15:00:00.000Z")), 400);
  assert.equal(getGlobalOutreachDailyLimit(new Date("2026-09-13T15:00:00.000Z")), 600);
});

test("dispatch lane inference isolates Direct, Public, recurring Hot Market, and verified extras", () => {
  const direct = { contactEmail: "jordan@example.com", contactName: "Jordan Lee", contactEvidenceType: null };
  const publicInbox = { contactEmail: "info@example.com", contactName: null, contactEvidenceType: null };
  const publishedInbox = { contactEmail: "jordan@example.com", contactName: "Jordan Lee", contactEvidenceType: "official_publication" as const };
  const verifiedPublicInbox = { contactEmail: "info@example.com", contactName: null, contactEvidenceType: "official_publication" as const };
  const regular = { sourceType: null } as Pick<OutreachMessage, "sourceType">;

  // Null-source legacy regular messages are classified from current evidence.
  assert.equal(getOutreachDailyLane(regular, direct), "named");
  assert.equal(getOutreachDailyLane(regular, publicInbox), "named");
  assert.equal(getOutreachDailyLane(regular, publishedInbox), "named");
  assert.equal(getOutreachDailyLane(regular, verifiedPublicInbox), "public");
  assert.equal(getOutreachDailyLane({ sourceType: HOT_MARKET_RECURRING_SOURCE_TYPE }, direct), "hot_market");
  assert.equal(getOutreachDailyLane({ sourceType: HOT_MARKET_SOURCE_TYPE }, publicInbox), "hot_market");
  const laneConfig = { namedLimit: 100, publicLimit: 50, hotMarketLimit: 50, hotLeadLimit: 25 };
  assert.equal(getOutreachDailyLaneLimit("direct", laneConfig), 100);
  assert.equal(getOutreachDailyLaneLimit("public", laneConfig), 50);
  assert.equal(getOutreachDailyLaneLimit("hot_market", laneConfig), 50);
  assert.equal(getOutreachDailyLaneLimit("hot_market_extra", laneConfig), undefined);
});

test("JOB 2 models hot leads as uncapped and keeps named plus hot-market shared", () => {
  const laneConfig = {
    campaignKey: "2026-09",
    effectiveMonth: "2026-09",
    persisted: true,
    namedLimit: 200,
    publicLimit: 100,
    hotMarketLimit: 200,
    hotLeadLimit: OUTREACH_UNCAPPED,
    namedHotMarketSharedLimit: 200,
  };
  assert.equal(getOutreachDailyLaneLimit("hot_lead", laneConfig), OUTREACH_UNCAPPED);
  assert.equal(laneConfigTotal(laneConfig), 300);
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
  leadScore: 0,
  leadStatus: "cold",
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
  catchUpCohortId: null,
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

test("officially published public inboxes do not require named-contact confidence", () => {
  assert.equal(
    assertOutreachEligibilityBase(
      approvedMessage,
      {
        ...eligibleProspect,
        website: "https://quinnevans.com",
        sourceUrl: "https://quinnevans.com/projects",
        contactEmail: "info@quinnevans.com",
        contactName: "Office",
        contactTitle: null,
        contactConfidence: "medium",
        contactEvidenceType: "official_publication",
        contactSourceUrl: "https://quinnevans.com/contact",
      },
      activeCampaign,
    ),
    "info@quinnevans.com",
  );
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
  assert.equal(getOutreachDailyLimit(250, 3), 250);
  assert.equal(getOutreachDailyLimit(167, 0), 167);
  assert.equal(getOutreachDailyLimit(500, 0), 500);
  assert.equal(getOutreachDailyLimit(500, 3), 500);
  assert.equal(getOutreachDailyLimit(250, 0, true), 250);
});

test("legacy same-day sends consume the new global reservation ceiling", () => {
  assert.equal(getLegacyOutreachSentCount(167, 0), 167);
  assert.equal(getLegacyOutreachSentCount(100, 100), 0);
  assert.equal(getLegacyOutreachSentCount(120, 20), 100);
});

test("regular sequence-1 outreach uses the approved Phoenix-month ramp", () => {
  assert.equal(getPhoenixOutreachMonthKey(new Date("2026-09-01T06:59:59.000Z")), "2026-08");
  assert.equal(getPhoenixOutreachMonthKey(new Date("2026-09-01T07:00:00.000Z")), "2026-09");
  assert.equal(getOutreachMonthlyLimit(new Date("2026-08-31T12:00:00.000Z")), 12000);
  assert.equal(getOutreachMonthlyLimit(new Date("2026-09-30T12:00:00.000Z")), 12000);
  assert.equal(getOutreachMonthlyLimit(new Date("2026-10-01T06:59:59.000Z")), 12000);
  assert.equal(getOutreachMonthlyLimit(new Date("2026-10-01T07:00:00.000Z")), 20_000);
  assert.equal(getOutreachMonthlyLimit(new Date("2026-11-01T07:00:00.000Z")), 35_000);
  assert.equal(getOutreachMonthlyLimit(new Date("2026-12-01T07:00:00.000Z")), 50_000);
  assert.equal(getOutreachMonthlyLimit(new Date("2027-01-01T06:59:59.000Z")), 50_000);
  assert.equal(getOutreachMonthlyLimit(new Date("2027-01-01T07:00:00.000Z")), 50_000);
  assert.equal(getOutreachMonthlyLimit(new Date("2027-02-01T12:00:00.000Z")), 50_000);
  assert.equal(getOutreachMonthlyLimit(new Date("2028-01-01T12:00:00.000Z")), 50_000);
  assert.equal(getLegacyOutreachMonthlySentCount(6100, 100), 6000);
  assert.equal(getLegacyOutreachMonthlySentCount(50, 75), 0);
});

test("regular sequence-1 reservations stop at each Phoenix-month ramp limit", () => {
  for (const [date, limit] of [
    ["2026-09-30T12:00:00.000Z", 12000],
    ["2026-10-31T12:00:00.000Z", 20000],
    ["2026-11-30T12:00:00.000Z", 35000],
    ["2026-12-31T12:00:00.000Z", 50000],
    ["2027-01-31T12:00:00.000Z", 50_000],
  ] as const) {
    assert.equal(isRegularMonthlyOutreachLimitReached(limit - 1, new Date(date)), false);
    assert.equal(isRegularMonthlyOutreachLimitReached(limit, new Date(date)), true);
  }
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
  assert.doesNotThrow(() => assertSequenceDeliveryReady(2, "delivered"));
});

test("the single opener follow-up waits three Phoenix business days", () => {
  const fridayOpen = new Date("2026-08-28T12:00:00.000Z");
  assert.equal(getFollowUpScheduledAt(1, fridayOpen), null);
  assert.equal(getFollowUpScheduledAt(2, fridayOpen)?.toISOString(), "2026-09-02T03:00:00.000Z");
  assert.equal(getFollowUpScheduledAt(3, fridayOpen), null);
  assert.equal(getFollowUpScheduledAt(4, fridayOpen), null);
});

test("follow-ups cannot bypass the opener-derived Phoenix business cadence", () => {
  const openedAt = new Date("2026-08-28T12:00:00.000Z");
  assert.throws(
    () => assertFollowUpCadenceReady(2, new Date("2026-09-01T15:00:00.000Z"), openedAt),
    /Phoenix opener-based business cadence/,
  );
  assert.throws(
    () => assertFollowUpCadenceReady(2, new Date("2026-09-02T15:00:00.000Z"), null),
    /verified open/,
  );
  assert.doesNotThrow(
    () => assertFollowUpCadenceReady(2, new Date("2026-09-02T15:00:00.000Z"), openedAt),
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

test("queues approved outreach for the next 8 PM Phoenix window", () => {
  assert.equal(
    getNextPhoenixEightPm(new Date("2026-08-29T14:00:00.000Z")).toISOString(),
    "2026-08-30T03:00:00.000Z",
  );
  assert.equal(
    getNextPhoenixEightPm(new Date("2026-08-29T15:01:00.000Z")).toISOString(),
    "2026-08-30T03:00:00.000Z",
  );
  assert.equal(
    getNextPhoenixEightPm(new Date("2026-08-30T03:01:00.000Z")).toISOString(),
    "2026-08-31T03:00:00.000Z",
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

  const openedAt = new Date("2026-08-28T12:00:00.000Z");
