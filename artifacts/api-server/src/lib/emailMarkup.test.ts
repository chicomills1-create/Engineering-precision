import assert from "node:assert/strict";
import { test } from "node:test";
import { renderBrandedEmail } from "./emailMarkup";

test("renders outreach as readable HTML while retaining a plain-text fallback", () => {
  const content = renderBrandedEmail(
    "Hello <Principal>.\n\nWe can help with the current review.",
    "https://example.com/api/outreach/unsubscribe?email=test%40example.com&token=long-token",
  );

  assert.match(content.html, /Civil · Structural · MEP Engineering/);
  assert.match(content.html, /Hello &lt;Principal&gt;\.<\/p>/);
  assert.match(content.html, />Unsubscribe<\/a>/);
  assert.match(content.html, /href="https:\/\/example\.com\/api\/outreach\/unsubscribe/);
  assert.match(content.plainText, /Unsubscribe: https:\/\/example\.com/);
  assert.doesNotMatch(content.html, /Hello <Principal>/);
});