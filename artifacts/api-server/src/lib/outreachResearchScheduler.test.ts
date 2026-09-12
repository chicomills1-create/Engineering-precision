import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getDailyResearchTarget,
  getHotMarketResearchStates,
  getHotMarketResearchTarget,
  getPhoenixResearchWindow,
  HOT_MARKET_RESEARCH_STATES_PER_RUN,
  isResearchScheduleDue,
  OUTREACH_RESEARCH_LOCAL_HOUR,
  OUTREACH_RESEARCH_TIMEZONE,
  usesGenericResearchPipeline,
} from "./outreachResearchScheduler";
import { RESEARCH_STATE_ORDER } from "./publicResearch";

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

test("uses the configurable discovery cap independently of sending capacity", () => {
  assert.equal(getDailyResearchTarget(10, 167), 167);
  assert.equal(getDailyResearchTarget(167, 500), 400);
  assert.equal(getDailyResearchTarget(5, 5), 5);
});

test("national hot-market research always starts in Arizona and California", () => {
  const states = getHotMarketResearchStates("2026-09-03");
  assert.equal(HOT_MARKET_RESEARCH_STATES_PER_RUN, 8);
  assert.equal(states.length, 8);
  assert.deepEqual(states.slice(0, 2), ["AZ", "CA"]);
  assert.equal(new Set(states).size, states.length);
  assert.equal(RESEARCH_STATE_ORDER.length, 49);
  assert.equal(RESEARCH_STATE_ORDER.includes("AK" as never), false);
});

test("national hot-market research rotates the remaining licensed states", () => {
  const first = getHotMarketResearchStates("2026-09-03");
  const second = getHotMarketResearchStates("2026-09-04");
  assert.deepEqual(second.slice(0, 2), ["AZ", "CA"]);
  assert.notDeepEqual(first.slice(2), second.slice(2));
});

test("hot-market research always stages the following Phoenix day at 8:10", () => {
  assert.deepEqual(
    getHotMarketResearchTarget(new Date("2026-09-04T15:00:00.000Z")),
    {
      targetDate: "2026-09-05",
      scheduledAt: new Date("2026-09-05T15:10:00.000Z"),
    },
  );
  assert.deepEqual(
    getHotMarketResearchTarget(new Date("2026-09-04T20:00:00.000Z")),
    {
      targetDate: "2026-09-05",
      scheduledAt: new Date("2026-09-05T15:10:00.000Z"),
    },
  );
});

test("routes the recurring hot-market campaign only through verified hot-market research", () => {
  assert.equal(
    usesGenericResearchPipeline({ name: "Verified National Hot-Market Outreach" }),
    false,
  );
  assert.equal(usesGenericResearchPipeline({ name: "Architect outreach" }), true);
});