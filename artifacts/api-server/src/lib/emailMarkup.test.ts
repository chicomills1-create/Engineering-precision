import assert from "node:assert/strict";
import { test } from "node:test";
import { renderBrandedEmail } from "./emailMarkup";

test("renders outreach as readable HTML while retaining a plain-text fallback", () => {
  const content = renderBrandedEmail(
    "Hello <Principal>.\n\nWe can help with the current review.\n\nNeed a PE stamp? We got you — we can review and stamp your finished design: https://apexgrideng.com/pe-stamp/",
    "https://apexgrideng.com/unsubscribe?email=test%40example.com&token=long-token",
  );

  assert.match(content.html, /Hello &lt;Principal&gt;\.<\/p>/);
  assert.match(content.html, /Jeremy Mills/);
  assert.match(content.html, /480-490-0064/);
  assert.match(content.html, /CEO · USAF Veteran/);
  assert.match(content.html, /Veteran-owned engineering company/);
  assert.match(content.html, /href="https:\/\/apexgrideng\.com"[^>]*>apexgrideng\.com<\/a>/);
  assert.match(
    content.html,
    /Need a PE stamp\? We got you — we can review and stamp your finished design: <a href="https:\/\/apexgrideng\.com\/pe-stamp\/"[^>]*>https:\/\/apexgrideng\.com\/pe-stamp\/<\/a>/,
  );
  assert.match(
    content.plainText,
    /Need a PE stamp\? We got you — we can review and stamp your finished design: https:\/\/apexgrideng\.com\/pe-stamp\//,
  );
  // September 2026 relaunch: no estimator CTA in campaign email.
  assert.doesNotMatch(content.html, /Get My Instant Ballpark Estimate/);
  assert.doesNotMatch(content.html, /apexgrideng\.com\/estimate/);
  assert.doesNotMatch(content.plainText, /Get My Instant Ballpark Estimate/);
  assert.doesNotMatch(content.plainText, /apexgrideng\.com\/estimate/);
  assert.match(content.html, /https:\/\/apexgrideng\.com\/logo\.png/);
  assert.match(content.html, /Apex Grid Engineering PLLC[\s\S]*22475 E Quintero Rd[\s\S]*Queen Creek, AZ 85142/);
  assert.match(content.plainText, /Apex Grid Engineering PLLC\n22475 E Quintero Rd\nQueen Creek, AZ 85142/);
  assert.match(content.html, />Unsubscribe<\/a>/);
  assert.match(content.html, /href="https:\/\/apexgrideng\.com\/unsubscribe/);
  assert.match(content.plainText, /Unsubscribe: https:\/\/apexgrideng\.com/);
  assert.doesNotMatch(content.html, /Hello <Principal>/);
  assert.match(content.html, /@media only screen and \(max-width:600px\)/);
  assert.match(content.html, /overflow-wrap:anywhere/);
});

test("uses the named recipient instead of a generic greeting", () => {
  const content = renderBrandedEmail(
    "Hi there,\n\nWe can help with the current review.",
    "https://apexgrideng.com/unsubscribe",
    "Ernesto Garcia",
  );

  assert.match(content.html, />Hi Ernesto Garcia,<\/p>/);
  assert.match(content.plainText, /^Hi Ernesto Garcia,/);
  assert.doesNotMatch(content.html, /Hi there/);
});

test("does not include a sender email address in the signature", () => {
  const content = renderBrandedEmail(
    "We can help with the current review.",
    "https://apexgrideng.com/unsubscribe",
  );

  assert.doesNotMatch(content.html, /mailto:/);
});

test("rejects unsubscribe URLs outside the secure Apex Grid host", () => {
  assert.throws(
    () => renderBrandedEmail("Body", "http://apexgrideng.com/unsubscribe"),
    /valid HTTPS Apex Grid URL/,
  );
  assert.throws(
    () => renderBrandedEmail("Body", "https://example.com/unsubscribe"),
    /valid HTTPS Apex Grid URL/,
  );
});

test("keeps outreach copy and approved signature wording in the plain-text alternative", () => {
  const content = renderBrandedEmail(
    "Project review support is available.",
    "https://apexgrideng.com/unsubscribe?token=signed",
  );
  for (const value of [
    "Project review support is available.",
    "Best regards,",
    "Jeremy Mills",
    "CEO · USAF Veteran",
    "Apex Grid Engineering PLLC",
    "Veteran-owned engineering company",
    "480-490-0064",
    "https://apexgrideng.com",
  ]) {
    assert.match(content.plainText, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});