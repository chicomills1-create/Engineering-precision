import assert from "node:assert/strict";
import test from "node:test";
import { isEvidenceBackedPublicInbox } from "./publicInboxClassifier";

test("public classifier accepts only the approved evidence-backed role set", () => {
  assert.equal(isEvidenceBackedPublicInbox("estimating@example.com", "Estimating", "official_publication"), true);
  assert.equal(isEvidenceBackedPublicInbox("hello@example.com", "Hello", "official_publication"), false);
  assert.equal(isEvidenceBackedPublicInbox("sales@example.com", "Sales", "official_publication"), false);
});

test("named official-publication contacts remain named", () => {
  assert.equal(isEvidenceBackedPublicInbox("info@example.com", "Jordan Lee", "official_publication"), false);
});