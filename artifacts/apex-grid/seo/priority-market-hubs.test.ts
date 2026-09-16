import test from "node:test";
import assert from "node:assert/strict";
import {
  PRIORITY_MARKET_AUTHOR,
  PRIORITY_MARKET_HUBS,
  priorityMarketHubPage,
  priorityMarketHubUrl,
} from "./priority-market-hubs";

test("priority market hubs are distinct, indexable, and conversion-ready", () => {
  assert.deepEqual(
    PRIORITY_MARKET_HUBS.map(priorityMarketHubUrl),
    [
      "/locations/california/orange-county/",
      "/locations/california/bay-area/",
      "/locations/california/inland-empire/",
      "/locations/virginia/northern-virginia/",
      "/locations/virginia/arlington/",
    ],
  );
  assert.equal(new Set(PRIORITY_MARKET_HUBS.map((page) => page.title)).size, 5);
  assert.equal(new Set(PRIORITY_MARKET_HUBS.map((page) => page.description)).size, 5);
  assert.equal(new Set(PRIORITY_MARKET_HUBS.map((page) => page.intro)).size, 5);
  for (const page of PRIORITY_MARKET_HUBS) {
    assert.ok(page.title.length >= 50 && page.title.length <= 60, `${page.title.length}: ${page.title}`);
    assert.ok(page.description.length >= 150 && page.description.length <= 160, `${page.description.length}: ${page.description}`);
    assert.ok(page.faqs.length >= 4 && page.faqs.length <= 6);
    assert.ok(page.relatedLinks.length >= 5);
    const html = priorityMarketHubPage(page);
    assert.match(html, new RegExp(`By ${PRIORITY_MARKET_AUTHOR}`));
    assert.match(html, new RegExp(`rel="canonical" href="https://apexgrideng\\.com${priorityMarketHubUrl(page)}"`));
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /"@type":"CollectionPage"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) ?? []).length, 1);
    assert.match(html, /href="\/estimate\/"/);
    assert.match(html, new RegExp(`href="/locations/${page.stateSlug}/"`));
    assert.doesNotMatch(html, /guarantee permit approval/i);
  }
});