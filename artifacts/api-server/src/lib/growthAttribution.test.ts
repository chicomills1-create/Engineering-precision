import test from "node:test";
import assert from "node:assert/strict";
import { getReferralConversionDelta, validateAttributionPair } from "./growthAttribution";

test("attribution source type and id are all-or-nothing", () => {
  assert.equal(validateAttributionPair(), null);
  assert.equal(validateAttributionPair("referral_partner", 12), null);
  assert.equal(validateAttributionPair("lead"), "sourceType and sourceId must be provided together");
  assert.equal(validateAttributionPair(undefined, 12), "sourceType and sourceId must be provided together");
});

test("referral conversions count only transitions into and out of closed", () => {
  assert.equal(getReferralConversionDelta("new", "closed"), 1);
  assert.equal(getReferralConversionDelta("contacted", "closed"), 1);
  assert.equal(getReferralConversionDelta("closed", "contacted"), -1);
  assert.equal(getReferralConversionDelta("closed", "closed"), 0);
  assert.equal(getReferralConversionDelta("new", "contacted"), 0);
});