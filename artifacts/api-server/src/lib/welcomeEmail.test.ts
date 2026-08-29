import assert from "node:assert/strict";
import test from "node:test";
import { buildWelcomeEmailPayload } from "./welcomeEmail";

test("welcome marketing email fails closed without both signed unsubscribe URLs", () => {
  const result = buildWelcomeEmailPayload(
    "subscriber@example.com",
    "updates@apexgrideng.com",
    undefined,
    undefined,
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Unsubscribe signing/);
});

test("welcome marketing payload includes compliant plain text and HTML alternatives", () => {
  const result = buildWelcomeEmailPayload(
    "subscriber@example.com",
    "updates@apexgrideng.com",
    "https://apexgrideng.com/unsubscribe?token=signed",
    "https://apexgrideng.com/api/subscribers/one-click-unsubscribe?token=signed",
  );
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.payload.content.length, 2);
    assert.match(result.payload.headers["List-Unsubscribe"], /one-click/);
  }
});

test("welcome marketing email fails closed for unsafe unsubscribe URLs", () => {
  const result = buildWelcomeEmailPayload(
    "subscriber@example.com",
    "updates@apexgrideng.com",
    "http://apexgrideng.com/unsubscribe?token=signed",
    "https://evil.example/api/subscribers/one-click-unsubscribe?token=signed",
  );
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /Secure unsubscribe links/);
});