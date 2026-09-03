import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getDailyResearchTarget,
  getPhoenixResearchWindow,
  isResearchScheduleDue,
  MAX_DAILY_RESEARCH_PROSPECTS,
  OUTREACH_RESEARCH_LOCAL_HOUR,
  OUTREACH_RESEARCH_TIMEZONE,
} from "./outreachResearchScheduler";
import {
  getHotMarketResearchStates,
  LICENSED_OUTREACH_STATES,
} from "./hotMarketResearch";

test("uses the Phoenix calendar day and 8 AM boundary", () => {
  assert.deepEqual(
    getPhoenixResearchWindow(new Date("2026-08-29T14:59:00.000Z")),
    { runDate: "2026-08-29", localHour: 7 },
  );
  assert.deepEqual(
    getPhoenixResearchWindow(new Date("2026-08-29T15:00:00.000Z")),
    { runDate: "2026-08-29", localHour: 8 },
  );
  assert.equal(OUTREACH_RESEARCH_TIMEZONE, "America/Phoenix");
  assert.equal(OUTREACH_RESEARCH_LOCAL_HOUR, 8);
});

test("keeps the Phoenix date stable across the UTC year boundary", () => {
  assert.deepEqual(
    getPhoenixResearchWindow(new Date("2026-01-01T06:59:00.000Z")),
    { runDate: "2025-12-31", localHour: 23 },
  );
});

test("runs only enabled schedules on active campaigns after the local hour", () => {
  const beforeEight = new Date("2026-08-29T14:59:00.000Z");
  const atEight = new Date("2026-08-29T15:00:00.000Z");
  const schedule = { enabled: true, localHour: 8 };
  const campaign = { status: "active" };

  assert.equal(isResearchScheduleDue(schedule as any, campaign as any, beforeEight), false);
  assert.equal(isResearchScheduleDue({ ...schedule, localHour: 7 } as any, campaign as any, beforeEight), false);
  assert.equal(isResearchScheduleDue(schedule as any, campaign as any, atEight), true);
  assert.equal(isResearchScheduleDue({ ...schedule, enabled: false } as any, campaign as any, atEight), false);
  assert.equal(isResearchScheduleDue(schedule as any, { status: "paused" } as any, atEight), false);
});

test("caps daily scheduled research at the 150-per-day monthly-safe target", () => {
  assert.equal(MAX_DAILY_RESEARCH_PROSPECTS, 150);
  assert.equal(getDailyResearchTarget(10, 167), 150);
  assert.equal(getDailyResearchTarget(167, 500), 150);
  assert.equal(getDailyResearchTarget(5, 5), 5);
});

test("national hot-market research always starts with Arizona and California and rotates other licensed states", () => {
  const first = getHotMarketResearchStates("2026-09-03");
  const next = getHotMarketResearchStates("2026-09-04");
  assert.deepEqual(first.slice(0, 2), ["AZ", "CA"]);
  assert.deepEqual(next.slice(0, 2), ["AZ", "CA"]);
  assert.equal(first.length, 6);
  assert.equal(next.length, 6);
  assert.equal(first.includes("AK" as any), false);
  assert.equal(LICENSED_OUTREACH_STATES.length, 49);
  assert.notDeepEqual(first.slice(2), next.slice(2));
});