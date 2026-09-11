import test from "node:test";
import assert from "node:assert/strict";
import { buildTrafficAlerts, type PageEvidence } from "./seoTrafficAlerts";

const protectedPage: PageEvidence = { protected: true, exists: true, noindex: false, canonical: null, coverageState: null, redirect: false };

test("flags material protected-page loss as position movement", () => {
  const alerts = buildTrafficAlerts(
    [{ page: "https://example.com/a", query: "engineer", clicks: 10, impressions: 300, position: 8 }],
    [{ page: "https://example.com/a", query: "engineer", clicks: 20, impressions: 500, position: 4 }],
    () => protectedPage,
  );
  assert.equal(alerts.length, 1);
  assert.equal(alerts[0].reason, "position_movement");
  assert.equal(alerts[0].severity, "warning");
});

test("prioritizes structural causes and excluded-page traffic", () => {
  const alerts = buildTrafficAlerts(
    [
      { page: "https://example.com/a", query: "engineer", clicks: 0, impressions: 20, position: 0 },
      { page: "https://example.com/old", query: "old page", clicks: 6, impressions: 80, position: 12 },
    ],
    [{ page: "https://example.com/a", query: "engineer", clicks: 12, impressions: 220, position: 5 }],
    (page) => page.endsWith("/a")
      ? { ...protectedPage, noindex: true }
      : { ...protectedPage, protected: false },
  );
  assert.deepEqual(alerts.map((alert) => alert.reason), ["noindex", "excluded_page"]);
  assert.ok(alerts.every((alert) => alert.severity === "critical"));
  assert.equal(alerts[1].previousAvailable, true);
});

test("ignores small fluctuations", () => {
  const alerts = buildTrafficAlerts(
    [{ page: "https://example.com/a", query: "engineer", clicks: 8, impressions: 190, position: 6 }],
    [{ page: "https://example.com/a", query: "engineer", clicks: 10, impressions: 200, position: 5 }],
    () => protectedPage,
  );
  assert.equal(alerts.length, 0);
});

test("does not treat omitted rows as zero when the current result is truncated", () => {
  const alerts = buildTrafficAlerts(
    [],
    [{ page: "https://example.com/a", query: "engineer", clicks: 20, impressions: 500, position: 4 }],
    () => protectedPage,
    { currentComplete: false },
  );
  assert.equal(alerts.length, 0);
});

test("normalizes equivalent canonical URLs", () => {
  const alerts = buildTrafficAlerts(
    [{ page: "https://example.com/a/", query: "engineer", clicks: 5, impressions: 100, position: 7 }],
    [{ page: "https://example.com/a/", query: "engineer", clicks: 12, impressions: 250, position: 5 }],
    () => ({ ...protectedPage, canonical: "/a" }),
  );
  assert.equal(alerts[0].reason, "position_movement");
});