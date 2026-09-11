import assert from "node:assert/strict";
import test from "node:test";
import { calculateLeadScore, configuredDailyAllowance, resolveLeadStatus, requiredDailyPace, scheduleForMonth, type OutreachPolicy } from "./outreachSystemConfig";

const policy = {
  monthlySchedules: [
    { month: "2026-09", monthlyTarget: 12000, dailyTarget: 400, laneAllocations: { named: 100, public: 100, hotMarket: 100, hotLead: 100 } },
    { month: "2026-10", monthlyTarget: 20000 },
    { month: "2026-11", monthlyTarget: 35000 },
    { month: "2026-12", monthlyTarget: 50000 },
    { month: "2027-01", monthlyTarget: 50000 },
  ],
  forwardMonthlyCap: 50000,
  scoring: { positiveReply: 100, reply: 90, multipleClicks: 70, click: 55, repeatedEngagement: 50, multipleOpens: 25, singleOpen: 10, negativeReply: -30 },
  verification: {}, suppression: {}, sendingSafeguards: { timezone: "America/Phoenix", requireQualifiedInventory: true, requireDeliverabilityReady: true, maxMonthly: 50000 },
  lifecycleStatuses: ["cold", "engaged", "replied", "qualified", "not_interested", "suppressed"],
} as OutreachPolicy;

test("authoritative schedule resolves September through forward", () => {
  assert.equal(scheduleForMonth(policy, "2026-09")?.monthlyTarget, 12000);
  assert.equal(scheduleForMonth(policy, "2026-10")?.monthlyTarget, 20000);
  assert.equal(scheduleForMonth(policy, "2026-11")?.monthlyTarget, 35000);
  assert.equal(scheduleForMonth(policy, "2026-12")?.monthlyTarget, 50000);
  assert.equal(scheduleForMonth(policy, "2028-02")?.monthlyTarget, 50000);
});
test("dynamic pacing is remaining target divided by sending days", () => assert.equal(requiredDailyPace(20000, 8450, 10), 1155));
test("October allowance uses exact remaining weekdays, not a /22 constant", () => {
  const runtime = { version: 1, policy, month: "2026-10", schedule: policy.monthlySchedules[1] };
  assert.equal(configuredDailyAllowance(runtime, new Date("2026-10-01T15:00:00Z")), 910);
  assert.equal(configuredDailyAllowance(runtime, new Date("2026-10-30T15:00:00Z")), 20000);
});
test("September remains explicitly capped at 400", () => {
  const runtime = { version: 1, policy, month: "2026-09", schedule: policy.monthlySchedules[0] };
  assert.equal(configuredDailyAllowance(runtime, new Date("2026-09-30T15:00:00Z")), 400);
});
test("forward schedule never exceeds cap", () => assert.ok((scheduleForMonth(policy, "2030-01")?.monthlyTarget ?? Infinity) <= policy.forwardMonthlyCap));
test("score ordering and suppression precedence are deterministic", () => {
  assert.equal(calculateLeadScore(policy, { clickCount: 2, openCount: 4 }), 70);
  assert.equal(calculateLeadScore(policy, { positiveReply: true, clickCount: 2 }), 100);
  assert.equal(resolveLeadStatus({ suppressed: true, positiveReply: true }), "suppressed");
  assert.equal(resolveLeadStatus({ negativeReply: true, reply: true }), "not_interested");
});