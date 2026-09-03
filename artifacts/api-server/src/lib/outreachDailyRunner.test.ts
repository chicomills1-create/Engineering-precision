import assert from "node:assert/strict";
import test from "node:test";
import {
  getPhoenixStagedMessageWaitMs,
  runDailyOutreachOnce,
} from "./outreachDailyRunner";

test("waits from the 08:00 Phoenix scheduled invocation until 08:10", () => {
  const invokedAt = new Date("2026-01-15T15:00:00.000Z");
  const afterResearch = new Date("2026-01-15T15:04:30.000Z");

  assert.equal(getPhoenixStagedMessageWaitMs(invokedAt, afterResearch), 330_000);
});

test("does not wait after 08:10 or for a catch-up invocation", () => {
  assert.equal(
    getPhoenixStagedMessageWaitMs(
      new Date("2026-01-15T15:00:00.000Z"),
      new Date("2026-01-15T15:11:00.000Z"),
    ),
    0,
  );
  assert.equal(
    getPhoenixStagedMessageWaitMs(
      new Date("2026-01-15T16:00:00.000Z"),
      new Date("2026-01-15T16:01:00.000Z"),
    ),
    0,
  );
});

test("researches before dispatching and makes a second pass after the safe wait", async () => {
  const calls: string[] = [];
  const times = [
    new Date("2026-01-15T15:00:00.000Z"),
    new Date("2026-01-15T15:06:00.000Z"),
  ];
  let sends = 0;

  const result = await runDailyOutreachOnce({
    processHotMarketResearch: async () => { calls.push("hot-market"); },
    processScheduledResearch: async () => { calls.push("scheduled"); return 0; },
    processDueMessages: async () => {
      calls.push(`send-${++sends}`);
      return sends;
    },
    now: () => times.shift()!,
    wait: async (milliseconds) => { calls.push(`wait-${milliseconds}`); },
  });

  assert.deepEqual(calls, ["hot-market", "scheduled", "send-1", "wait-240000", "send-2"]);
  assert.deepEqual(result, { initialSent: 1, stagedSent: 2, waitMs: 240_000 });
});

test("does not make a second send pass for catch-up runs", async () => {
  let sends = 0;
  const result = await runDailyOutreachOnce({
    processHotMarketResearch: async () => undefined,
    processScheduledResearch: async () => 0,
    processDueMessages: async () => ++sends,
    now: () => new Date("2026-01-15T16:00:00.000Z"),
    wait: async () => assert.fail("catch-up runs must not wait"),
  });

  assert.deepEqual(result, { initialSent: 1, stagedSent: 0, waitMs: 0 });
});