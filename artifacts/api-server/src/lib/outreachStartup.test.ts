import assert from "node:assert/strict";
import test from "node:test";
import { startOutreachStartupJobs } from "./outreachStartup";

test("verified seed failure cannot prevent follow-up reconciliation or scheduler arming", async () => {
  const events: string[] = [];
  const startup = await startOutreachStartupJobs({
    ensureFollowUps: async () => {
      events.push("follow-ups");
      return { created: 16, scheduled: 16 };
    },
    armSchedulers: () => events.push("armed"),
    seedVerified: async () => {
      events.push("verified-seed");
      throw new Error("seed failed");
    },
    prepareVerified: async () => {
      events.push("verified-preparation");
      return { prepared: 0, shortfall: 0 };
    },
    seedHotMarket: async () => {
      events.push("hot-market-seed");
      return { state: "ready" };
    },
    logger: {
      info: () => undefined,
      error: () => undefined,
    },
  });

  assert.deepEqual(events.slice(0, 2), ["follow-ups", "armed"]);
  await startup.background;
  assert.ok(events.includes("verified-seed"));
  assert.ok(events.includes("hot-market-seed"));
  assert.ok(!events.includes("verified-preparation"));
});