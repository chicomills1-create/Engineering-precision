import assert from "node:assert/strict";
import test from "node:test";
import { assertLinkedinTransition } from "./transitions";
import { linkedinProvider } from "./provider";
test("only permits reviewed action transitions", () => {
  assert.doesNotThrow(() => assertLinkedinTransition("draft", "pending_review"));
  assert.throws(() => assertLinkedinTransition("draft", "completed"));
});
test("manual provider fails closed", async () => {
  assert.equal(linkedinProvider.capabilities.send, false);
  assert.equal(linkedinProvider.capabilities.sendConnectionRequest, false);
  assert.equal(linkedinProvider.capabilities.sendDirectMessage, false);
  await assert.rejects(() => linkedinProvider.execute(), /approved queue action/);
});