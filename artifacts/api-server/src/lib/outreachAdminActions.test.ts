import assert from "node:assert/strict";
import test from "node:test";
import {
  canConvertGenericFollowUp,
  isDedicatedHotLeadSource,
} from "./outreachAdminActions";

test("dedupe recognizes only genuine dedicated hot-lead sources", () => {
  assert.equal(isDedicatedHotLeadSource("hot_lead"), true);
  assert.equal(isDedicatedHotLeadSource("hot_lead_verified"), true);
  assert.equal(isDedicatedHotLeadSource("hot_market_one_time"), false);
  assert.equal(isDedicatedHotLeadSource(null), false);
});

test("only undispatched generic follow-ups can be converted", () => {
  assert.equal(canConvertGenericFollowUp({
    status: "needs_review",
    sentAt: null,
    providerMessageId: null,
    providerReconciliationKey: null,
  }), true);
  assert.equal(canConvertGenericFollowUp({
    status: "delivered",
    sentAt: new Date(),
    providerMessageId: "provider-id",
    providerReconciliationKey: null,
  }), false);
  assert.equal(canConvertGenericFollowUp({
    status: "needs_review",
    sentAt: null,
    providerMessageId: "ambiguous-provider-id",
    providerReconciliationKey: null,
  }), false);
});