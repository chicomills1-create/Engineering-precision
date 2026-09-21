import assert from "node:assert/strict";
import test from "node:test";
import {
  getPhoenixStagedMessageWaitMs,
  isPrimaryPhoenixInvocation,
  runDailyOutreachOnce,
  withExclusiveDailyOutreachRun,
} from "./outreachDailyRunner";

test("distinguishes the primary Phoenix invocation from recovery", () => {
  assert.equal(isPrimaryPhoenixInvocation(new Date("2026-01-16T03:00:00.000Z")), true);
  assert.equal(isPrimaryPhoenixInvocation(new Date("2026-01-15T15:30:00.000Z")), false);
});

test("recovery cannot overlap a live primary and can run after release", async () => {
  let held = false;
  const lease = {
    tryAcquire: async () => {
      if (held) return false;
      held = true;
      return true;
    },
    release: async () => { held = false; },
  };
  let releasePrimary!: () => void;
  const primaryWait = new Promise<void>((resolve) => { releasePrimary = resolve; });
  const primary = withExclusiveDailyOutreachRun(lease, async () => {
    await primaryWait;
    return "primary";
  });

  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(
    await withExclusiveDailyOutreachRun(lease, async () => "overlap"),
    { state: "busy" },
  );

  releasePrimary();
  assert.deepEqual(await primary, { state: "completed", result: "primary" });
  assert.deepEqual(
    await withExclusiveDailyOutreachRun(lease, async () => "recovery"),
    { state: "completed", result: "recovery" },
  );
});

test("exclusive lease is released when a run fails", async () => {
  let held = false;
  const lease = {
    tryAcquire: async () => {
      if (held) return false;
      held = true;
      return true;
    },
    release: async () => { held = false; },
  };
  await assert.rejects(
    withExclusiveDailyOutreachRun(lease, async () => {
      throw new Error("failed");
    }),
    /failed/,
  );
  assert.equal(held, false);
});

test("waits from the 20:00 Phoenix scheduled invocation until 20:10", () => {
  const invokedAt = new Date("2026-01-16T03:00:00.000Z");
  const afterResearch = new Date("2026-01-16T03:04:30.000Z");

  assert.equal(getPhoenixStagedMessageWaitMs(invokedAt, afterResearch), 330_000);
});

test("does not wait after 20:10 or for a catch-up invocation", () => {
  assert.equal(
    getPhoenixStagedMessageWaitMs(
      new Date("2026-01-16T03:00:00.000Z"),
      new Date("2026-01-16T03:11:00.000Z"),
    ),
    0,
  );
  assert.equal(
    getPhoenixStagedMessageWaitMs(
      new Date("2026-01-16T04:00:00.000Z"),
      new Date("2026-01-16T04:01:00.000Z"),
    ),
    0,
  );
});

test("researches before dispatching and makes a second pass after the safe wait", async () => {
  const calls: string[] = [];
  const times = [
    new Date("2026-01-16T03:00:00.000Z"),
    new Date("2026-01-16T03:06:00.000Z"),
  ];
  let sends = 0;

  const result = await runDailyOutreachOnce({
    processHotMarketResearch: async () => { calls.push("hot-market"); },
    processScheduledResearch: async () => { calls.push("scheduled"); return 0; },
    prepareRegularOutreach: async () => {
      calls.push("prepare-regular");
      return {
        state: "completed", prepared: 150, directPrepared: 100,
        publicPrepared: 50, directShortfall: 0, publicShortfall: 0,
        shortfall: 0,
      };
    },
    prepareHotMarketOutreach: async () => {
      calls.push("prepare-hot-market");
      return { state: "completed", prepared: 50, totalScheduled: 50, shortfall: 0 };
    },
    processDueMessages: async () => {
      calls.push(`send-${++sends}`);
      return {
        claimed: sends,
        providerAccepted: sends,
        stopped: 0,
        unresolved: 0,
      };
    },
    processProviderReconciliation: async () => {
      calls.push("reconcile");
      return { accepted: 0, failed: 0, ambiguous: 0 };
    },
    now: () => times.shift()!,
    wait: async (milliseconds) => { calls.push(`wait-${milliseconds}`); },
  });

  assert.deepEqual(calls, [
    "hot-market",
    "scheduled",
    "prepare-regular",
    "send-1",
    "reconcile",
    "wait-240000",
    "send-2",
  ]);
  assert.deepEqual(result, {
    claimed: 3,
    providerAccepted: 3,
    delivered: 0,
    bounced: 0,
    stopped: 0,
    unresolved: 0,
    regularPrepared: 150,
    regularState: "completed",
    regularPreparedThisRun: 150,
    regularWindowQueued: 150,
    directPrepared: 100,
    publicPrepared: 50,
    directShortfall: 0,
    publicShortfall: 0,
    regularShortfall: 0,
    hotMarketPrepared: 0,
    hotMarketState: "skipped",
    hotMarketPreparedThisRun: 0,
    hotMarketWindowQueued: 0,
    hotMarketSkippedBecause: "dedicated hot-market preparation is disabled in the unified verified pool",
    hotMarketScheduled: 0,
    hotMarketShortfall: 0,
    hotLeadTarget: 100,
    hotLeadPrepared: 0,
    hotLeadState: "skipped",
    hotLeadPreparedThisRun: 0,
    hotLeadWindowQueued: 0,
    hotLeadSkippedBecause: "hot-lead preparation operation is not configured",
    hotLeadShortfall: 100,
    acquisitionErrors: [],
    verificationPromoted: undefined,
    verificationFinderCalls: undefined,
    verificationCreditBlocked: undefined,
    waitMs: 240_000,
  });
});

test("continues preparing and dispatching existing inventory when acquisition fails", async () => {
  const calls: string[] = [];
  const errors: string[] = [];
  const result = await runDailyOutreachOnce({
    processHotMarketResearch: async () => { throw new Error("hot-market unavailable"); },
    processScheduledResearch: async () => { throw new Error("discovery unavailable"); },
    verifyProspects: async () => { throw new Error("verification unavailable"); },
    onResearchError: (stage) => { errors.push(stage); },
    prepareRegularOutreach: async () => {
      calls.push("prepare-regular");
      return {
        state: "completed", prepared: 200, directPrepared: 100,
        publicPrepared: 100, directShortfall: 0, publicShortfall: 0, shortfall: 0,
      };
    },
    prepareHotMarketOutreach: async () => {
      calls.push("prepare-hot-market");
      return { state: "completed", prepared: 100, totalScheduled: 100, shortfall: 0 };
    },
    prepareHotLeadOutreach: async () => ({
      state: "completed", prepared: 100, totalScheduled: 100, shortfall: 0,
    }),
    processDueMessages: async () => {
      calls.push("send");
      return { claimed: 400, providerAccepted: 400, stopped: 0, unresolved: 0 };
    },
    processProviderReconciliation: async () => ({ accepted: 0, failed: 0, ambiguous: 0 }),
    now: () => new Date("2026-01-15T16:00:00.000Z"),
    wait: async () => assert.fail("catch-up runs must not wait"),
  });

  assert.deepEqual(errors, ["hot-market-research", "scheduled-research", "verification"]);
  assert.deepEqual(calls, ["prepare-regular", "send"]);
  assert.equal(result.providerAccepted, 400);
  assert.equal(result.regularPrepared + (result.hotLeadPrepared ?? 0), 300);
});

test("does not make a second send pass for catch-up runs", async () => {
  let sends = 0;
  const result = await runDailyOutreachOnce({
    processHotMarketResearch: async () => undefined,
    processScheduledResearch: async () => 0,
    prepareRegularOutreach: async () => ({
      state: "completed", prepared: 150, directPrepared: 100,
      publicPrepared: 50, directShortfall: 0, publicShortfall: 0,
      shortfall: 0,
    }),
    prepareHotMarketOutreach: async () => ({
      state: "completed", prepared: 50, totalScheduled: 50, shortfall: 0,
    }),
    processDueMessages: async () => {
      sends += 1;
      return { claimed: 1, providerAccepted: 1, stopped: 0, unresolved: 0 };
    },
    processProviderReconciliation: async () => ({ accepted: 0, failed: 0, ambiguous: 0 }),
    now: () => new Date("2026-01-15T16:00:00.000Z"),
    wait: async () => assert.fail("catch-up runs must not wait"),
  });

  assert.deepEqual(result, {
    claimed: 1,
    providerAccepted: 1,
    delivered: 0,
    bounced: 0,
    stopped: 0,
    unresolved: 0,
    regularPrepared: 150,
    regularState: "completed",
    regularPreparedThisRun: 150,
    regularWindowQueued: 150,
    directPrepared: 100,
    publicPrepared: 50,
    directShortfall: 0,
    publicShortfall: 0,
    regularShortfall: 0,
    hotMarketPrepared: 0,
    hotMarketState: "skipped",
    hotMarketPreparedThisRun: 0,
    hotMarketWindowQueued: 0,
    hotMarketSkippedBecause: "dedicated hot-market preparation is disabled in the unified verified pool",
    hotMarketScheduled: 0,
    hotMarketShortfall: 0,
    hotLeadTarget: 100,
    hotLeadPrepared: 0,
    hotLeadState: "skipped",
    hotLeadPreparedThisRun: 0,
    hotLeadWindowQueued: 0,
    hotLeadSkippedBecause: "hot-lead preparation operation is not configured",
    hotLeadShortfall: 100,
    acquisitionErrors: [],
    verificationPromoted: undefined,
    verificationFinderCalls: undefined,
    verificationCreditBlocked: undefined,
    waitMs: 0,
  });
});

test("reports next-day lane shortfalls for durable recovery", async () => {
  const result = await runDailyOutreachOnce({
    processHotMarketResearch: async () => undefined,
    processScheduledResearch: async () => 0,
    prepareRegularOutreach: async () => ({
      state: "completed", prepared: 142, directPrepared: 97,
      publicPrepared: 45, directShortfall: 3, publicShortfall: 5,
      shortfall: 8,
    }),
    prepareHotMarketOutreach: async () => ({
      state: "completed", prepared: 47, totalScheduled: 47, shortfall: 3,
    }),
    processDueMessages: async () => ({
      claimed: 200, providerAccepted: 200, stopped: 0, unresolved: 0,
    }),
    processProviderReconciliation: async () => ({
      accepted: 0, failed: 0, ambiguous: 0,
    }),
    now: () => new Date("2026-01-15T16:00:00.000Z"),
    wait: async () => assert.fail("catch-up runs must not wait"),
  });

  assert.equal(result.regularShortfall, 8);
  assert.equal(result.hotMarketShortfall, 0);
});