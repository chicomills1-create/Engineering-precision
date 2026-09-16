import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const SITE = "https://apexgrideng.com";
const PUBLIC = path.resolve(import.meta.dirname, "../public");

const requiredSitemapRoutes = [
  "/answers/how-much-does-structural-engineering-cost/",
  "/answers/load-bearing-wall-removal-cost/",
  "/answers/residential-structural-engineering-fees/",
  "/answers/pe-stamp-cost-for-house-plans/",
  "/answers/engineered-deck-drawing-cost/",
  "/answers/retaining-wall-engineering-cost/",
  "/answers/foundation-assessment-cost/",
  "/answers/adu-plan-engineering-cost/",
  "/project-types/facility-upgrades/",
  "/project-types/accessibility-upgrades/",
  "/project-types/building-repairs/",
  "/project-types/code-compliance-upgrades/",
  "/project-types/permit-corrections/",
  "/project-types/plan-check-responses/",
  "/project-types/utility-upgrades/",
  "/who-we-work-with/builders/",
  "/who-we-work-with/owner-representatives/",
  "/who-we-work-with/construction-managers/",
  "/who-we-work-with/portfolio-clients/",
  "/who-we-work-with/national-accounts/",
  "/projects/case-studies/kestrel-point-tower/",
  "/projects/case-studies/bluewire-data-campus/",
  "/projects/case-studies/saguaro-gate-medical-campus/",
  "/projects/case-studies/windlass-logistics-hub/",
  "/projects/case-studies/ironquill-lofts/",
  "/projects/case-studies/cumberland-forge-corporate-center/",
  "/projects/case-studies/marketplace-at-cholla-verde/",
  "/projects/case-studies/basalt-bend-stem-academy/",
  "/projects/case-studies/alpenlight-worship-center/",
];

const requiredIndexableRoutes = [
  "/structural-engineering/masonry-design/",
  "/resources/title-24-energy-compliance-commercial-buildings/",
  "/resources/ashrae-90-1-vs-iecc-commercial-energy-code/",
  "/resources/what-does-a-structural-engineer-do-that-an-architect-doesnt/",
  "/resources/vrf-vs-rooftop-unit-commercial-hvac/",
  "/resources/commercial-building-permit-process-what-engineers-deliver/",
  "/resources/how-much-does-mep-engineering-cost/",
];

test("Wave A routes have exact-once sitemap coverage", () => {
  const sitemapFiles = fs.readdirSync(PUBLIC).filter((name) => /^sitemap-.+\.xml$/.test(name));
  const xml = sitemapFiles.map((name) => fs.readFileSync(path.join(PUBLIC, name), "utf8")).join("\n");
  for (const route of requiredSitemapRoutes) {
    const marker = `<loc>${SITE}${route}</loc>`;
    assert.equal(xml.split(marker).length - 1, 1, `${route} must occur exactly once`);
  }
});

test("Wave A content routes are indexable and self-canonical", () => {
  for (const route of requiredIndexableRoutes) {
    const html = fs.readFileSync(path.join(PUBLIC, route.replace(/^\/|\/$/g, ""), "index.html"), "utf8");
    assert.doesNotMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i, `${route} must not be noindex`);
    assert.match(html, new RegExp(`<link rel="canonical" href="${SITE}${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), `${route} must be self-canonical`);
  }
});