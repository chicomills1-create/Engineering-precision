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
  assert.match(content.html, /Veteran-owned engineering company/);
  assert.match(content.html, /href="https:\/\/apexgrideng\.com"[^>]*>apexgrideng\.com<\/a>/);
  assert.match(content.html, /https:\/\/apexgrideng\.com\/logo\.svg/);
  assert.doesNotMatch(content.html, /Quintero/);
  assert.doesNotMatch(content.plainText, /Quintero/);
  assert.match(content.html, />Unsubscribe<\/a>/);
  assert.match(content.html, /href="https:\/\/example\.com\/unsubscribe/);
  assert.match(content.plainText, /Unsubscribe: https:\/\/example\.com/);
  assert.doesNotMatch(content.html, /Hello <Principal>/);
});

test("uses the named recipient instead of a generic greeting", () => {
  const content = renderBrandedEmail(
    "Hi there,\n\nWe can help with the current review.",
    "https://example.com/unsubscribe",
    "Ernesto Garcia",
  );

  assert.match(content.html, />Hi Ernesto Garcia,<\/p>/);
  assert.match(content.plainText, /^Hi Ernesto Garcia,/);
  assert.doesNotMatch(content.html, /Hi there/);
});

test("does not include a sender email address in the signature", () => {
  const content = renderBrandedEmail(
    "We can help with the current review.",
    "https://example.com/unsubscribe",
  );

  assert.doesNotMatch(content.html, /mailto:/);
});