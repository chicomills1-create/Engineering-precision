import test from "node:test";
import assert from "node:assert/strict";
import { PHASE9_AUTHOR, PHASE9_INBOUND_TARGETS, PHASE9_INDUSTRY_SERVICE_PAGES, phase9Page, phase9Url } from "./phase9-industry-service";

test("Phase 9 industry-service routes are unique and complete", () => {
  const expected = [
    "/industries/healthcare/hospitals/structural-engineering/",
    "/industries/healthcare/medical-office-buildings/electrical-engineering/",
    "/industries/healthcare/surgery-centers/mep-engineering/",
    "/industries/multifamily/student-housing/structural-engineering/",
    "/industries/multifamily/apartments/geotechnical-engineering/",
    "/industries/life-science/cleanroom-electrical-engineering/",
    "/industries/telecommunications/mechanical-engineering/",
    "/industries/agriculture/civil-engineering/",
  ];
  assert.deepEqual(PHASE9_INDUSTRY_SERVICE_PAGES.map(phase9Url), expected);
  assert.deepEqual(Object.keys(PHASE9_INBOUND_TARGETS).sort(), expected.slice().sort());
  assert.equal(new Set(PHASE9_INDUSTRY_SERVICE_PAGES.map((page) => page.title)).size, 8);
  assert.equal(new Set(PHASE9_INDUSTRY_SERVICE_PAGES.map((page) => page.description)).size, 8);
  for (const page of PHASE9_INDUSTRY_SERVICE_PAGES) {
    assert.ok(page.title.length >= 50 && page.title.length <= 60, `${page.title.length}: ${page.title}`);
    assert.ok(page.description.length >= 150 && page.description.length <= 160, `${page.description.length}: ${page.description}`);
    assert.equal(page.faqs.length, 5);
    assert.ok(page.links.length >= 4);
    const html = phase9Page(page);
    assert.match(html, new RegExp(`By ${PHASE9_AUTHOR}`));
    assert.match(html, new RegExp(`rel="canonical" href="https://apexgrideng\\.com${phase9Url(page)}"`));
    assert.match(html, /"@type":"Service"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) ?? []).length, 1);
    assert.equal((html.match(/<details><summary>/g) ?? []).length, 5);
    assert.match(html, /href="\/estimate\/"/);
    assert.match(html, /href="\/industries\//);
    assert.match(html, /href="\/(resources|[a-z-]+-engineering\/)/);
  }
});