import assert from "node:assert/strict";
import test from "node:test";
import {
  PE_STATE_SOURCE_LINKS,
  PHASE0_AEO_PAGES,
  PHASE0_BATCH1_AEO_PAGES,
  PHASE0_BATCH2_AEO_PAGES,
  PHASE0_BATCH3_PROJECT_PAGES,
  PHASE0_PLAN_CHECK_PLAYBOOKS,
  PHASE0_RESOURCE_PAGES,
  PHASE0_SERVICE_PAGES,
} from "./phase0-corpus";
import { WAVE_B_ANSWER_PAGES } from "./wave-b-answer-pages";

test("Phase 0 corpus keeps the confirmed page inventory", () => {
  assert.equal(Object.keys(PE_STATE_SOURCE_LINKS).length, 49);
  assert.ok(!Object.hasOwn(PE_STATE_SOURCE_LINKS, "alaska"));
  assert.equal(PHASE0_AEO_PAGES.length, 57);
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

test("Phase 0 Batch 1 lists ten bespoke answer records", () => {
  const expectedSlugs = [
    "load-bearing-wall-removal",
    "home-addition-second-story",
    "engineered-deck-drawings",
    "pe-stamp-adu-plans",
    "garage-conversion",
    "retaining-wall",
    "structural-letter-solar-panels",
    "structural-home-inspection",
    "architect-stamp-vs-pe-stamp",
    "engineer-stamping-someone-elses-drawings",
  ];
  assert.deepEqual(PHASE0_BATCH1_AEO_PAGES.map((page) => page.slug), expectedSlugs);
  assert.deepEqual(
    expectedSlugs.filter((slug) => PHASE0_AEO_PAGES.some((page) => page.slug === slug)),
    expectedSlugs,
  );
  for (const page of PHASE0_BATCH1_AEO_PAGES) {
    assert.ok(page.sections && page.sections.length >= 3);
    assert.ok(page.sections.every((section) => section.body.length >= 180));
    assert.ok(page.sections.some((section) => (section.bullets?.length ?? 0) >= 4));
    assert.match(page.serviceHref ?? "", /^\/(?:services|permit-engineering|pe-stamp)\//);
    assert.match(page.founderNote ?? "", /Jeremy Mills/);
    assert.match(page.founderNote ?? "", /CEO & Founder/);
    assert.match(page.founderNote ?? "", /U\.S\. Air Force veteran/);
    assert.match(page.founderNote ?? "", /veteran-owned/);
    assert.doesNotMatch(page.founderNote ?? "", /Jeremy Mills,\s*PE\b/);
    assert.ok(page.sections?.some((section) => /\bI(?:'m| ask| look| do| explain)\b/.test(section.body)));
    assert.equal(page.faqs.length, 4);
    assert.equal(new Set(page.faqs.map((faq) => faq.question)).size, 4);
  }
});

test("Phase 0 Batch 2 lists eight bespoke cost answer records", () => {
  const expectedSlugs = [
    "how-much-does-structural-engineering-cost",
    "load-bearing-wall-removal-cost",
    "residential-structural-engineering-fees",
    "pe-stamp-cost-for-house-plans",
    "engineered-deck-drawing-cost",
    "adu-plan-engineering-cost",
    "retaining-wall-engineering-cost",
    "foundation-assessment-cost",
  ];
  assert.deepEqual(PHASE0_BATCH2_AEO_PAGES.map((page) => page.slug), expectedSlugs);
  assert.deepEqual(
    expectedSlugs.filter((slug) => PHASE0_AEO_PAGES.some((page) => page.slug === slug)),
    expectedSlugs,
  );
  for (const page of PHASE0_BATCH2_AEO_PAGES) {
    assert.ok(page.title.length >= 50 && page.title.length <= 60);
    assert.ok(page.description.length >= 150 && page.description.length <= 160);
    assert.ok(page.answer.length > 220);
    assert.ok(page.sections && page.sections.length >= 3);
    assert.ok(page.sections.every((section) => section.body.length >= 180));
    assert.ok(page.sections.every((section) => (section.bullets?.length ?? 0) >= 4));
    assert.match(page.serviceHref ?? "", /^\/(?:services|permit-engineering|pe-stamp)\//);
    assert.ok((page.extraLinks?.length ?? 0) >= 2);
    assert.match(page.founderNote ?? "", /Jeremy Mills/);
    assert.match(page.founderNote ?? "", /CEO & Founder/);
    assert.match(page.founderNote ?? "", /U\.S\. Air Force veteran/);
    assert.match(page.founderNote ?? "", /veteran-owned/);
    assert.doesNotMatch(page.founderNote ?? "", /Jeremy Mills,\s*PE\b/);
    assert.ok(page.sections?.some((section) => /\bI(?:'m| ask| look| do| explain| recommend| tell| discourage| prefer)\b/.test(section.body)));
    assert.equal(page.faqs.length, 4);
    assert.equal(new Set(page.faqs.map((faq) => faq.question)).size, 4);
  }
});

test("Phase 0 Batch 3 lists ten deduplicated project answer records", () => {
  const expectedSlugs = [
    "new-custom-home-engineering",
    "adu-engineering-plans",
    "basement-finish-structural-plans",
    "deck-patio-cover-pergola-engineering",
    "retaining-wall-design-process",
    "kitchen-remodel-structural-engineering",
    "church-school-engineering-projects",
    "swimming-pool-structural-engineering",
    "guest-house-casita-engineering",
    "manufactured-modular-home-engineering",
  ];
  assert.deepEqual(PHASE0_BATCH3_PROJECT_PAGES.map((page) => page.slug), expectedSlugs);
  assert.deepEqual(
    expectedSlugs.filter((slug) => PHASE0_AEO_PAGES.some((page) => page.slug === slug)),
    expectedSlugs,
  );
  for (const page of PHASE0_BATCH3_PROJECT_PAGES) {
    assert.ok(page.title.length >= 50 && page.title.length <= 60);
    assert.ok(page.description.length >= 150 && page.description.length <= 160);
    assert.ok(page.answer.length > 220);
    assert.equal(page.sections?.length, 4);
    assert.ok(page.sections?.every((section) => section.body.length >= 180));
    assert.ok(page.sections?.every((section) => (section.bullets?.length ?? 0) >= 4));
    assert.match(page.serviceHref ?? "", /^\/(?:services|permit-engineering|pe-stamp)\//);
    assert.ok((page.extraLinks?.length ?? 0) >= 3);
    assert.ok(page.extraLinks?.some((link) => /^\/locations\/[a-z-]+\/$/.test(link.href)));
    assert.match(page.founderNote ?? "", /Jeremy Mills/);
    assert.match(page.founderNote ?? "", /CEO & Founder/);
    assert.match(page.founderNote ?? "", /U\.S\. Air Force veteran/);
    assert.match(page.founderNote ?? "", /veteran-owned/);
    assert.doesNotMatch(page.founderNote ?? "", /Jeremy Mills,\s*PE\b/);
    assert.ok(page.sections?.filter((section) => /\bI(?:'m| ask| look| do| explain| recommend| tell| start| want)\b/.test(section.body)).length >= 2);
    assert.ok(page.faqs.length >= 4 && page.faqs.length <= 6);
    assert.equal(new Set(page.faqs.map((faq) => faq.question)).size, page.faqs.length);
  }
});

test("Wave B lists ten bespoke founder answer records", () => {
  const expectedSlugs = [
    "mep-engineering-scope-of-work",
    "mep-engineer-vs-mechanical-engineer",
    "cleanroom-mep-engineering-requirements",
    "post-tensioned-concrete-design-cost",
    "vrf-system-engineering-design",
    "medical-office-mep-requirements",
    "vrf-vs-traditional-hvac-cost",
    "geotechnical-engineering-cost",
    "civil-engineering-cost-commercial-project",
    "mep-permit-drawings-requirements",
  ];
  assert.deepEqual(WAVE_B_ANSWER_PAGES.map((page) => page.slug), expectedSlugs);
  assert.deepEqual(expectedSlugs.filter((slug) => PHASE0_AEO_PAGES.some((page) => page.slug === slug)), expectedSlugs);
  for (const page of WAVE_B_ANSWER_PAGES) {
    assert.ok(page.title.length >= 50 && page.title.length <= 60, `${page.slug}: title length ${page.title.length}`);
    assert.ok(page.description.length >= 150 && page.description.length <= 160, `${page.slug}: description length ${page.description.length}`);
    assert.ok(page.answer.length > 220);
    assert.ok(page.sections && page.sections.length >= 3);
    assert.ok(page.sections.every((section) => section.body.length >= 180));
    assert.ok(page.sections.every((section) => (section.bullets?.length ?? 0) >= 4));
    assert.ok(page.sections.some((section) => /\bI(?:'m| ask| tell| recommend| discourage| prefer| start)\b/.test(section.body)));
    assert.match(page.founderNote ?? "", /Jeremy Mills/);
    assert.match(page.founderNote ?? "", /CEO & Founder/);
    assert.match(page.founderNote ?? "", /U\.S\. Air Force veteran/);
    assert.doesNotMatch(page.founderNote ?? "", /Jeremy Mills,\s*PE\b/);
    assert.ok(page.faqs.length >= 4 && page.faqs.length <= 6);
    assert.equal(new Set(page.faqs.map((faq) => faq.question)).size, page.faqs.length);
    assert.ok((page.extraLinks?.length ?? 0) >= 2);
  }
});