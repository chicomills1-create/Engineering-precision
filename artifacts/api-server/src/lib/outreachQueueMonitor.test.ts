import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  db,
  outreachQueueAlertsTable,
} from "@workspace/db";
import { monitorOverdueOutreachQueue } from "./outreachQueueMonitor";

afterEach(async () => {
  await db.delete(outreachQueueAlertsTable);
});

test("does not alert when approved outreach is inside the grace period", async () => {
  const now = new Date("2026-09-04T16:00:00.000Z");
  let notifications = 0;

  const result = await monitorOverdueOutreachQueue({
    now,
    notify: async () => { notifications += 1; },
    loadSummary: async () => null,
  });

  assert.equal(result.state, "clear");
  assert.equal(notifications, 0);
});

test("alerts once with the overdue count and scheduled window", async () => {
  const now = new Date("2026-09-04T16:00:00.000Z");
  const first = new Date(now.getTime() - 12 * 60 * 1000);
  const second = new Date(now.getTime() - 8 * 60 * 1000);
  let received: import("./outreachQueueMonitor").OutreachQueueAlertSummary | undefined;
  const summary = {
    overdueCount: 2,
    scheduledFrom: first,
    scheduledThrough: second,
    providerAmbiguousCount: 1,
    deliveryFailureCount: 3,
  };

  const result = await monitorOverdueOutreachQueue({
    now,
    notify: async (summary) => { received = summary; },
    loadSummary: async () => summary,
  });

  assert.equal(result.state, "alerted");
  assert.equal(received?.overdueCount, 2);
  assert.equal(received?.scheduledFrom.toISOString(), first.toISOString());
  assert.equal(received?.scheduledThrough.toISOString(), second.toISOString());
  assert.equal(received?.providerAmbiguousCount, 1);
  assert.equal(received?.deliveryFailureCount, 3);
});

test("deduplicates repeated checks while the same overdue incident remains active", async () => {
  const now = new Date("2026-09-04T16:00:00.000Z");
  const summary = {
    overdueCount: 1,
    scheduledFrom: new Date(now.getTime() - 10 * 60 * 1000),
    scheduledThrough: new Date(now.getTime() - 10 * 60 * 1000),
    providerAmbiguousCount: 0,
    deliveryFailureCount: 0,
  };
  let notifications = 0;
  const notify = async () => { notifications += 1; };

  const first = await monitorOverdueOutreachQueue({ now, notify, loadSummary: async () => summary });
  const repeated = await monitorOverdueOutreachQueue({
    now: new Date(now.getTime() + 60_000),
    notify,
    loadSummary: async () => summary,
  });

  assert.equal(first.state, "alerted");
  assert.equal(repeated.state, "deduplicated");
  assert.equal(notifications, 1);
});