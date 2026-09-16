import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { PHASE11_AUTHOR, PHASE11_PROJECT_CASE_STUDIES, phase11Page, phase11Url } from "./phase11-project-case-studies";

test("Phase 11 has exactly nine portfolio-record case studies", () => {
  const expectedSlugs = ["kestrel-point-tower", "bluewire-data-campus", "saguaro-gate-medical-campus", "windlass-logistics-hub", "ironquill-lofts", "alpenlight-worship-center", "cumberland-forge-corporate-center", "marketplace-at-cholla-verde", "basalt-bend-stem-academy"];
  assert.deepEqual(PHASE11_PROJECT_CASE_STUDIES.map(p => p.slug), expectedSlugs);
  assert.equal(PHASE11_PROJECT_CASE_STUDIES.length, 9);
  const routes = PHASE11_PROJECT_CASE_STUDIES.map(phase11Url);
  assert.equal(new Set(routes).size, 9);
  assert.equal(new Set(PHASE11_PROJECT_CASE_STUDIES.map(p => p.title)).size, 9);
  assert.equal(new Set(PHASE11_PROJECT_CASE_STUDIES.map(p => p.description)).size, 9);
  for (const page of PHASE11_PROJECT_CASE_STUDIES) {
    assert.match(page.title, /Apex Grid$/);
    assert.ok(page.title.length >= 35 && page.title.length <= 65);
    assert.ok(page.description.length >= 140 && page.description.length <= 170);
    assert.ok(page.faqs.length >= 4 && page.faqs.length <= 6);
    const html = phase11Page(page);
    assert.match(html, new RegExp(`By ${PHASE11_AUTHOR}`));
    assert.match(html, new RegExp(`rel="canonical" href="https://apexgrideng\\.com${phase11Url(page)}"`));
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) ?? []).length, 1);
    assert.match(html, /"@type":"Article"/);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.equal((html.match(/"@type":"FAQPage"/g) ?? []).length, 1);
    assert.equal((html.match(/<details><summary>/g) ?? []).length, page.faqs.length);
    for (const faq of page.faqs) {
      assert.match(html, new RegExp(faq.question.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      assert.match(html, new RegExp(faq.answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
    assert.match(html, /href="\/projects\//);
    assert.ok(page.links.length >= 3);
    assert.match(html, /href="\/estimate\/"/);
    assert.match(html, /<img src="\/images\/case-studies\/project-\d\.webp"/);
    assert.match(html, /My founder perspective/);
    assert.match(html, /\bI\b/);
    assert.ok(
      fs.existsSync(path.resolve(process.cwd(), "../../attached_assets/generated_images", path.basename(page.image))),
      `missing source image ${page.image}`,
    );
  }
});