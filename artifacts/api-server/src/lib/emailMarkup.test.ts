import assert from "node:assert/strict";
import { test } from "node:test";
import { renderBrandedEmail } from "./emailMarkup";

test("renders outreach as readable HTML while retaining a plain-text fallback", () => {
  const content = renderBrandedEmail(
    "Hello <Principal>.\n\nWe can help with the current review.",
    "https://example.com/unsubscribe?email=test%40example.com&token=long-token",
  );

  assert.match(content.html, /Hello &lt;Principal&gt;\.<\/p>/);
  assert.match(content.html, /Jeremy Mills/);
  assert.match(content.html, /480-490-0064/);
  assert.match(content.html, /https:\/\/apexgrideng\.com\/logo\.svg/);
  assert.doesNotMatch(content.html, /Quintero/);
  assert.doesNotMatch(content.plainText, /Quintero/);
  assert.match(content.html, />Unsubscribe<\/a>/);
  assert.match(content.html, /href="https:\/\/example\.com\/unsubscribe/);
  assert.match(content.plainText, /Unsubscribe: https:\/\/example\.com/);
  assert.doesNotMatch(content.html, /Hello <Principal>/);
});