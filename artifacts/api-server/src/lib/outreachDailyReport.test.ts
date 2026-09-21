import assert from "node:assert/strict";
import test from "node:test";
import { buildDailyOutreachReport } from "./outreachDailyReport";

test("daily outreach report includes dispatch proof and next-day lane counts", () => {
  const report = buildDailyOutreachReport("2026-09-05", {
    claimed: 203,
    providerAccepted: 200,
    delivered: 196,
    bounced: 4,
    stopped: 3,
    unresolved: 0,
    regularPrepared: 150,
    regularState: "completed",
    regularPreparedThisRun: 150,
    regularWindowQueued: 200,
    directPrepared: 100,
    publicPrepared: 50,
    directShortfall: 0,
    publicShortfall: 0,
    regularShortfall: 0,
    hotMarketPrepared: 50,
    hotMarketState: "completed",
    hotMarketPreparedThisRun: 50,
    hotMarketWindowQueued: 50,
    hotMarketScheduled: 50,
    hotMarketShortfall: 0,
    hotLeadState: "skipped",
    hotLeadPreparedThisRun: 0,
    hotLeadWindowQueued: 0,
    acquisitionErrors: [],
    waitMs: 0,
  });

  assert.match(report.subject, /200 provider accepted/);
  assert.match(report.body, /Provider accepted: 200/);
  assert.match(report.body, /Delivered at reconciliation: 196/);
  assert.match(report.body, /Direct prepared: 100/);
  assert.match(report.body, /Direct shortfall: 0/);
  assert.match(report.body, /Public prepared: 50/);
  assert.match(report.body, /Public shortfall: 0/);
  assert.match(report.body, /Regular preparation state: completed/);
  assert.match(report.body, /Regular prepared this run: 150/);
  assert.match(report.body, /Regular queued for window: 200/);
  assert.match(report.body, /Hot Market preparation state: completed/);
  assert.match(report.body, /Hot Market prepared this run: 50/);
  assert.match(report.body, /Hot Market queued for window: 50/);
  assert.match(report.body, /Hot Lead preparation state: skipped/);
  assert.match(report.body, /Hot Lead prepared this run: 0/);
  assert.match(report.body, /Hot Lead queued for window: 0/);
  assert.match(report.body, /No ambiguous provider handoffs remain/);
});