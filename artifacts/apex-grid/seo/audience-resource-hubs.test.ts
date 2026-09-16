import test from "node:test";
import assert from "node:assert/strict";
import {
  AUDIENCE_RESOURCE_AUTHOR,
  AUDIENCE_RESOURCE_HUBS,
  audienceResourceHubPage,
} from "./audience-resource-hubs";

test("audience resource hubs have complete indexable metadata and distinct content", () => {
  assert.deepEqual(
    AUDIENCE_RESOURCE_HUBS.map((page) => page.slug),
    ["architects", "contractors", "developers", "property-managers"],
  );
  assert.equal(new Set(AUDIENCE_RESOURCE_HUBS.map((page) => page.title)).size, 4);
  assert.equal(new Set(AUDIENCE_RESOURCE_HUBS.map((page) => page.description)).size, 4);
  assert.equal(new Set(AUDIENCE_RESOURCE_HUBS.map((page) => page.intro)).size, 4);
  for (const page of AUDIENCE_RESOURCE_HUBS) {
    assert.ok(page.title.length >= 50 && page.title.length <= 60);
    assert.ok(page.description.length >= 150 && page.description.length <= 160);
    assert.equal(page.faqs.length, 5);
    assert.equal(page.relatedResources.length, 5);
    const html = audienceResourceHubPage(page);
    assert.match(html, new RegExp(`By ${AUDIENCE_RESOURCE_AUTHOR}`));
    assert.match(html, new RegExp(`rel="canonical" href="https://apexgrideng\\.com/resources/${page.slug}/"`));
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /"@type":"CollectionPage"/);
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) ?? []).length, 1);
    assert.match(html, /href="\/estimate\/"/);
    assert.match(html, /href="\/resources\/phase-0\/"/);
    assert.match(html, /href="\/answers\/"/);
    assert.match(html, new RegExp(`href="/for-${page.slug}/"`));
    for (const resource of page.relatedResources) {
      assert.match(html, new RegExp(`href="${resource.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    }
  }
});