import test from "node:test";
import assert from "node:assert/strict";
import { classifyAuditPage, duplicateMetadataIssues } from "./seoAudit";

test("audit classifies sitemap/noindex/static risks honestly", () => {
  const issues = classifyAuditPage({
    url: "https://apexgrideng.com/example/",
    path: "/example/",
    hasStaticFile: false,
    robotsBlocked: true,
    html: '<html><head><meta name="robots" content="noindex"></head></html>',
  });
  assert.deepEqual(issues.filter((issue) => issue.severity === "critical").map((issue) => issue.category), ["static_file", "robots", "noindex"]);
  assert.ok(issues.some((issue) => issue.category === "title"));
});

test("audit finds duplicate titles without treating them as a critical outage", () => {
  const issues = duplicateMetadataIssues([
    { url: "https://example.test/a/", html: "<title>Shared</title>" },
    { url: "https://example.test/b/", html: "<title>Shared</title>" },
  ]);
  assert.equal(issues.length, 2);
  assert.ok(issues.every((issue) => issue.category === "duplicate_title" && issue.severity === "warning"));
});