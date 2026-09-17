import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PHASE0_AEO_PAGES } from "./phase0-corpus";
import { PHASE0_PLAN_CHECK_PLAYBOOKS, PHASE0_RESOURCE_PAGES } from "./phase0-corpus";
import { GUIDE_PAGES } from "./guides-pages";
import { PHASE7_COST_PAGES } from "./phase7-cost-pages";
import { PHASE7_HIRING_PAGES } from "./phase7-hiring-pages";
import { PHASE7_LICENSING_PAGES } from "./phase7-licensing-pages";
import { PHASE7_PERMIT_PAGES } from "./phase7-permit-pages";
import { PHASE7_TECHNICAL_PAGES } from "./phase7-technical-pages";
import { PHASE7_TIMELINE_PAGES } from "./phase7-timeline-pages";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = process.env.SEO_OUTPUT_DIR
  ? path.resolve(here, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(here, "../public");
const phase7Pages = [
  ...PHASE7_COST_PAGES,
  ...PHASE7_TIMELINE_PAGES,
  ...PHASE7_HIRING_PAGES,
  ...PHASE7_LICENSING_PAGES,
  ...PHASE7_PERMIT_PAGES,
  ...PHASE7_TECHNICAL_PAGES,
];
const allPages = [...PHASE0_AEO_PAGES, ...phase7Pages];

function schemaScripts(html: string): Array<Record<string, unknown>> {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as Record<string, unknown>);
}

function phase7Faqs(page: (typeof phase7Pages)[number]) {
  return [
    { question: `What is the short answer about ${page.topic.toLowerCase()}?`, answer: page.answer },
    {
      question: `What does ${page.topic.toLowerCase()} depend on?`,
      answer: `The answer depends on the project scope, governing jurisdiction, current records, design inputs, and the responsible professional's independent review. ${page.answer}`,
    },
    {
      question: "Does this answer guarantee a permit or project outcome?",
      answer: "No. The answer provides general engineering orientation. The responsible professional confirms the project scope and evidence, while the authority having jurisdiction controls its requirements, review, interpretation, and approval decision.",
    },
    {
      question: "What should I send for an initial engineering review?",
      answer: "Send the project address, plain-language scope, current drawings, existing-condition records, relevant calculations or comments, schedule, and the authority or code information already available. The responsible engineer will identify gaps.",
    },
  ];
}

test("Phase 7 seed inventory has exactly the requested cluster counts", () => {
  assert.equal(phase7Pages.length, 101);
  assert.equal(new Set(phase7Pages.map((page) => page.slug)).size, 101);
  assert.deepEqual(
    Object.fromEntries([...new Set(phase7Pages.map((page) => page.cluster))].sort().map((cluster) => [
      cluster,
      phase7Pages.filter((page) => page.cluster === cluster).length,
    ])),
    {
      "Cost and pricing": 20,
      "Hiring and vetting": 16,
      "PE licensing": 16,
      "Plan check and permits": 14,
      "Project timelines": 18,
      "Technical explainers": 17,
    },
  );
});

test("Phase 7 seeds do not overlap the existing answer corpus", () => {
  const existing = new Set([
    ...PHASE0_AEO_PAGES.map((page) => page.slug),
    ...PHASE0_PLAN_CHECK_PLAYBOOKS.map((page) => page.slug),
    ...PHASE0_RESOURCE_PAGES.map((page) => page.slug),
    ...GUIDE_PAGES.map((page) => page.slug),
  ]);
  assert.ok(phase7Pages.every((page) => !existing.has(page.slug)));
  assert.ok(phase7Pages.every((page) => /^[a-z0-9-]+$/.test(page.slug) && /^\/[a-z0-9/_-]+\/?$/.test(page.serviceHref)));
});

test("generated answer library has 163 static indexable self-canonical pages", () => {
  const answerDir = path.join(publicDir, "answers");
  if (!fs.existsSync(answerDir)) return;
  const files = allPages.map((page) => path.join(answerDir, page.slug, "index.html"));
  assert.equal(files.filter(fs.existsSync).length, 163);
  assert.ok(fs.existsSync(path.join(answerDir, "index.html")));
  const sitemap = fs.readFileSync(path.join(publicDir, "sitemap-services.xml"), "utf8");
  const answerUrls = [...sitemap.matchAll(/<loc>(https:\/\/apexgrideng\.com\/answers\/[^<]+)<\/loc>/g)]
    .map((match) => match[1]);
  assert.equal(answerUrls.length, 163);
  assert.equal(new Set(answerUrls).size, 163);
  assert.match(sitemap, /<loc>https:\/\/apexgrideng\.com\/answers\/<\/loc>/);

  for (const page of allPages) {
    const url = `/answers/${page.slug}/`;
    const html = fs.readFileSync(path.join(answerDir, page.slug, "index.html"), "utf8");
    if ("cluster" in page) assert.match(html, /data-phase7="true"/);
    assert.match(html, /<meta name="robots" content="index,follow"/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://apexgrideng\\.com${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(html, /Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
    assert.match(html, /Updated 2026-09-15/);
    assert.match(html, /href="\/estimate"/);
    assert.match(html, /href="\/metros\/"/);
    assert.match(html, /href="\/locations\/"/);
    assert.match(html, /<script type="application\/ld\+json">/);
    const schemas = schemaScripts(html);
    assert.ok(schemas.some((schema) => schema["@type"] === "Article"));
    assert.ok(schemas.some((schema) => schema["@type"] === "BreadcrumbList"));
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage") as {
      mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
    } | undefined;
    const expectedFaqCount = "faqs" in page ? page.faqs.length : 4;
    assert.equal(faq?.mainEntity?.length, expectedFaqCount);
    for (const entry of faq?.mainEntity ?? []) {
      assert.ok(html.includes(entry.name.replace(/&/g, "&amp;")));
      assert.ok(html.includes(entry.acceptedAnswer.text.replace(/&/g, "&amp;")));
    }
    if ("cluster" in page) {
      assert.match(html, new RegExp(`href="${page.serviceHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
      const sameCluster = phase7Pages.filter((candidate) => candidate.cluster === page.cluster && candidate.slug !== page.slug);
      assert.ok(sameCluster.some((candidate) => html.includes(`/answers/${candidate.slug}/`)));
    }
  }
});