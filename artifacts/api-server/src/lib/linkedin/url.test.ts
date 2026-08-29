import assert from "node:assert/strict";
import test from "node:test";
import { normalizeLinkedinUrl } from "./url";
test("normalizes a public LinkedIn URL", () => assert.equal(normalizeLinkedinUrl("https://linkedin.com/in/alex/?x=1#y"), "https://www.linkedin.com/in/alex"));
test("rejects private and action URLs", () => {
  assert.throws(() => normalizeLinkedinUrl("javascript:alert(1)"));
  assert.throws(() => normalizeLinkedinUrl("https://www.linkedin.com/messaging/"));
  assert.throws(() => normalizeLinkedinUrl("https://evil.example/in/alex"));
});