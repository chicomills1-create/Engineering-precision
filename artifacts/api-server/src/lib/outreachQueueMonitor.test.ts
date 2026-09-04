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

test("uses the provider-independent fallback when SendGrid notification fails", async () => {
  const now = new Date("2026-09-04T16:00:00.000Z");
  const summary = {
    overdueCount: 2,
    scheduledFrom: new Date(now.getTime() - 12 * 60 * 1000),
    scheduledThrough: new Date(now.getTime() - 8 * 60 * 1000),
    providerAmbiguousCount: 1,
    deliveryFailureCount: 3,
  };
  let fallback:
    | { summary: typeof summary; primaryError: string }
    | undefined;

  const result = await monitorOverdueOutreachQueue({
    now,
    notify: async () => { throw new Error("SendGrid unavailable"); },
    fallbackNotify: async (receivedSummary, primaryError) => {
      fallback = { summary: receivedSummary, primaryError };
    },
    loadSummary: async () => summary,
  });
  const [incident] = await db.select().from(outreachQueueAlertsTable);

  assert.equal(result.state, "alerted");
  assert.equal(fallback?.summary, summary);
  assert.equal(fallback?.primaryError, "SendGrid unavailable");
  assert.equal(incident?.status, "fallback_sent");
  assert.equal(incident?.error, "SendGrid unavailable");
  assert.equal(incident?.sentAt?.toISOString(), now.toISOString());
});

test("deduplicates repeats after the provider-independent fallback succeeds", async () => {
  const now = new Date("2026-09-04T16:00:00.000Z");
  const summary = {
    overdueCount: 1,
    scheduledFrom: new Date(now.getTime() - 10 * 60 * 1000),
    scheduledThrough: new Date(now.getTime() - 10 * 60 * 1000),
    providerAmbiguousCount: 0,
    deliveryFailureCount: 0,
  };
  let primaryAttempts = 0;
  let fallbackAttempts = 0;
  const notify = async () => {
    primaryAttempts += 1;
    throw new Error("SendGrid unavailable");
  };
  const fallbackNotify = async () => { fallbackAttempts += 1; };

  const first = await monitorOverdueOutreachQueue({
    now,
    notify,
    fallbackNotify,
    loadSummary: async () => summary,
  });
  const repeated = await monitorOverdueOutreachQueue({
    now: new Date(now.getTime() + 60_000),
    notify,
    fallbackNotify,
    loadSummary: async () => summary,
  });

  assert.equal(first.state, "alerted");
  assert.equal(repeated.state, "deduplicated");
  assert.equal(primaryAttempts, 1);
  assert.equal(fallbackAttempts, 1);
});