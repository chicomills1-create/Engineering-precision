import assert from "node:assert/strict";
import test from "node:test";
import {
  PE_STATE_SOURCE_LINKS,
  PHASE0_AEO_PAGES,
  PHASE0_PLAN_CHECK_PLAYBOOKS,
  PHASE0_RESOURCE_PAGES,
  PHASE0_SERVICE_PAGES,
} from "./phase0-corpus";

test("Phase 0 corpus keeps the confirmed page inventory", () => {
  assert.equal(Object.keys(PE_STATE_SOURCE_LINKS).length, 49);
  assert.ok(!Object.hasOwn(PE_STATE_SOURCE_LINKS, "alaska"));
  assert.ok(PHASE0_AEO_PAGES.length >= 15 && PHASE0_AEO_PAGES.length <= 20);
  assert.equal(PHASE0_SERVICE_PAGES.length, 2);
  assert.equal(PHASE0_PLAN_CHECK_PLAYBOOKS.length, 10);
  assert.ok(PHASE0_RESOURCE_PAGES.length >= 70);
  const starterSlugs = [
    "what-is-mep-engineering",
    "how-much-does-mep-engineering-cost",
    "how-much-does-a-pe-stamp-cost",
    "how-long-does-plan-check-take",
    "what-are-engineering-calculations-for-a-permit",
    "what-is-title-24",
    "title-24-vs-iecc",
    "what-is-a-plan-check-correction",
    "risks-of-buying-pe-stamps-fiverr-upwork",
  ];
  assert.deepEqual(
    starterSlugs.filter((slug) => PHASE0_AEO_PAGES.some((page) => page.slug === slug)),
    starterSlugs,
  );
});

test("Phase 0 routes and official source links are unique and safe", () => {
  const slugs = [
    ...PHASE0_AEO_PAGES.map((page) => page.slug),
    ...PHASE0_SERVICE_PAGES.map((page) => page.slug),
    ...PHASE0_PLAN_CHECK_PLAYBOOKS.map((page) => page.slug),
    ...PHASE0_RESOURCE_PAGES.map((page) => page.slug),
  ];
  assert.equal(new Set(slugs).size, slugs.length);
  for (const source of Object.values(PE_STATE_SOURCE_LINKS)) {
    assert.match(source.boardUrl, /^https:\/\//);
    assert.match(source.lookupUrl, /^https:\/\//);
  }
  for (const page of PHASE0_AEO_PAGES) {
    assert.ok(page.answer.length > 120);
    assert.ok(page.faqs.length >= 4);
  }
});