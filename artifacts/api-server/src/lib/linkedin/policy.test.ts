import assert from "node:assert/strict";
import test from "node:test";
import { actorFromRequest, canonicalDomain, CONTENT_PUBLISH_QUOTA_LOCK, defaultRetentionUntil, normalizeLinkedinName, PERSON_ACTION_QUOTA_LOCK } from "./policy";

test("uses the authenticated identity as immutable approval actor", () => {
  assert.equal(actorFromRequest({ auth: { userId: "user_42" } }), "user_42");
  assert.throws(() => actorFromRequest({}), /Authenticated actor/);
});
test("normalizes duplicate keys and safe default retention", () => {
  assert.equal(normalizeLinkedinName("  Apex   Grid "), "apex grid");
  assert.equal(canonicalDomain("https://www.apex.example/path"), "apex.example");
  assert.equal(defaultRetentionUntil(new Date("2025-01-02T00:00:00Z")).toISOString(), "2026-01-02T00:00:00.000Z");
});
test("daily quotas use shared global locks", () => {
  assert.notEqual(PERSON_ACTION_QUOTA_LOCK, CONTENT_PUBLISH_QUOTA_LOCK);
});