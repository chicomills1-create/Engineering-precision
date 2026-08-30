import assert from "node:assert/strict";
import test from "node:test";
import { actorFromRequest, assertLinkedinDailyLimit, assertLinkedinManualTransitionAllowed, assertLinkedinOrganizationPostCopy, assertLinkedinProviderExecution, assertLinkedinProviderReconciliation, assertNoExistingLinkedinContentClaim, canonicalDomain, CONTENT_PUBLISH_QUOTA_LOCK, defaultRetentionUntil, normalizeLinkedinName, PERSON_ACTION_QUOTA_LOCK } from "./policy";

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
test("provider execution cannot bypass queue approval history", () => {
  const approved = {
    status: "approved",
    providerState: "not_attempted",
    actionType: "organization_post",
    approvedCopy: "Approved post",
    hasApprovedHistory: true,
    supported: true,
  };
  assert.doesNotThrow(() => assertLinkedinProviderExecution(approved));
  assert.throws(() => assertLinkedinProviderExecution({ ...approved, status: "pending_review" }), /approved queue action/);
  assert.throws(() => assertLinkedinProviderExecution({ ...approved, hasApprovedHistory: false }), /approval history/);
  assert.throws(() => assertLinkedinProviderExecution({ ...approved, providerState: "ambiguous" }), /will not be retried/);
  assert.throws(() => assertLinkedinProviderExecution({ ...approved, actionType: "direct_message" }), /not supported/);
});
test("daily limits reject the boundary value", () => {
  assert.doesNotThrow(() => assertLinkedinDailyLimit(2, 3, "published-content"));
  assert.throws(() => assertLinkedinDailyLimit(3, 3, "published-content"), /Phoenix daily published-content limit/);
});
test("provider reconciliation only resolves claimed attempts with provider identity", () => {
  assert.doesNotThrow(() => assertLinkedinProviderReconciliation({
    providerState: "ambiguous",
    status: "succeeded",
    providerActionId: "urn:li:share:123",
  }));
  assert.throws(() => assertLinkedinProviderReconciliation({
    providerState: "not_attempted",
    status: "succeeded",
    providerActionId: "urn:li:share:123",
  }), /pending or ambiguous/);
  assert.throws(() => assertLinkedinProviderReconciliation({
    providerState: "pending",
    status: "succeeded",
  }), /provider action ID/);
});
test("manual transitions and retention cannot cancel a provider dispatch claim", () => {
  assert.doesNotThrow(() => assertLinkedinManualTransitionAllowed("not_attempted"));
  assert.throws(() => assertLinkedinManualTransitionAllowed("pending"), /cannot be transitioned manually/);
  assert.throws(() => assertLinkedinManualTransitionAllowed("ambiguous"), /cannot be transitioned manually/);
});
test("one approved content item cannot acquire two provider dispatch claims", () => {
  assert.doesNotThrow(() => assertNoExistingLinkedinContentClaim(0));
  assert.throws(() => assertNoExistingLinkedinContentClaim(1), /already has a provider dispatch claim/);
});
test("organization publishing cannot substitute different action copy", () => {
  assert.doesNotThrow(() => assertLinkedinOrganizationPostCopy("Approved copy", "Approved copy"));
  assert.throws(() => assertLinkedinOrganizationPostCopy("Changed copy", "Approved copy"), /must match/);
});