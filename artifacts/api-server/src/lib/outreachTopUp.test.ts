import assert from "node:assert/strict";
import test from "node:test";
import { runDailyOutreachOnce } from "./outreachDailyRunner";

async function runTopUpScenario(
  windowCount: number,
  topUp: { prepared: number; shortfall: number },
) {
  const calls: Array<{ scheduledAt: Date; needed: number }> = [];
  const result = await runDailyOutreachOnce({
    processHotMarketResearch: async () => undefined,
    processScheduledResearch: async () => 0,
    prepareRegularOutreach: async () => ({
      state: "completed", prepared: 500, directPrepared: 500,
      publicPrepared: 0, directShortfall: 0, publicShortfall: 0, shortfall: 0,
    }),
    prepareHotMarketOutreach: async () => ({
      state: "completed", prepared: 0, totalScheduled: 0, shortfall: 100,
    }),
    prepareHotLeadOutreach: async () => ({
      state: "completed", prepared: 0, totalScheduled: 0, shortfall: 100,
    }),
    countInitialMessagesInWindow: async () => windowCount,
    topUpVerifiedPreparation: async (scheduledAt, needed) => {
      calls.push({ scheduledAt, needed });
      return topUp;
    },
    processDueMessages: async () => ({
      claimed: 0, providerAccepted: 0, stopped: 0, unresolved: 0,
    }),
    processProviderReconciliation: async () => ({
      accepted: 0, failed: 0, ambiguous: 0,
    }),
    now: () => new Date("2026-01-15T16:00:00.000Z"),
    wait: async () => undefined,
  });
  return { calls, result };
}

test("100 hot + 500 verified reaches 600 without a top-up call", async () => {
  const { calls, result } = await runTopUpScenario(600, { prepared: 0, shortfall: 0 });
  assert.equal(calls.length, 0);
  assert.equal(result.topUpPrepared, 0);
});

test("0 hot + 500 verified requests and prepares 100", async () => {
  const { calls, result } = await runTopUpScenario(500, { prepared: 100, shortfall: 0 });
  assert.equal(calls[0]?.needed, 100);
  assert.equal(result.topUpPrepared, 100);
  assert.equal(result.topUpShortfall, 0);
});

test("30 hot + 500 verified requests and prepares 70", async () => {
  const { calls, result } = await runTopUpScenario(530, { prepared: 70, shortfall: 0 });
  assert.equal(calls[0]?.needed, 70);
  assert.equal(result.topUpPrepared, 70);
  assert.equal(result.topUpShortfall, 0);
});

test("fresh supply shortfall reports 40 prepared and 60 missing", async () => {
  const { calls, result } = await runTopUpScenario(500, { prepared: 40, shortfall: 60 });
  assert.equal(calls[0]?.needed, 100);
  assert.equal(result.topUpPrepared, 40);
  assert.equal(result.topUpShortfall, 60);
});

test("an idempotent second pass at 600 does not re-stage", async () => {
  const first = await runTopUpScenario(500, { prepared: 100, shortfall: 0 });
  const second = await runTopUpScenario(600, { prepared: 0, shortfall: 0 });
  assert.equal(first.calls.length, 1);
  assert.equal(second.calls.length, 0);
  assert.equal(second.result.topUpPrepared, 0);
});