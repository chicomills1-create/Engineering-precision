import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { WAVE_B_ANSWER_PAGES } from "./wave-b-answer-pages";

const SITE = "https://apexgrideng.com";
const PUBLIC = process.env.SEO_OUTPUT_DIR
  ? path.resolve(import.meta.dirname, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(import.meta.dirname, "../public");

test("Wave B pages are indexable, self-canonical, and schema-complete", () => {
  for (const page of WAVE_B_ANSWER_PAGES) {
    const route = `/answers/${page.slug}/`;
    const html = fs.readFileSync(path.join(PUBLIC, "answers", page.slug, "index.html"), "utf8");
    assert.match(html, new RegExp(`<title>${page.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</title>`));
    assert.match(html, new RegExp(`<link rel="canonical" href="${SITE}${route}"`));
    assert.doesNotMatch(html, /name="robots" content="noindex/i);
    assert.match(html, /By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
    assert.match(html, /href="\/estimate"/);
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length, 1);
    const directAnswerWords = page.directAnswer?.trim().split(/\s+/).length ?? 0;
    assert.ok(directAnswerWords >= 40 && directAnswerWords <= 60, `${page.slug}: ${directAnswerWords}-word direct answer`);
    assert.match(html, /<div class="direct-answer" aria-label="Direct answer"><p>/);
    assert.match(html, /<table><thead><tr><th>Planning fact<\/th>/);
    assert.match(html, /<ul class="scope">/);
    const h2s = [...html.matchAll(/<h2>([\s\S]*?)<\/h2>/g)]
      .map((match) => match[1].replace(/<[^>]+>/g, "").trim());
    assert.ok(h2s.length >= 6);
    assert.ok(h2s.every((heading) => heading.endsWith("?")), `${page.slug}: every H2 must be a question`);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]) as { "@type"?: string; mainEntity?: unknown[]; step?: unknown[] });
    assert.equal(schemas.find((schema) => schema["@type"] === "FAQPage")?.mainEntity?.length, page.faqs.length);
    assert.equal(schemas.find((schema) => schema["@type"] === "HowTo")?.step?.length, page.sections?.length);
    for (const faq of page.faqs) {
      assert.ok(html.includes(faq.question.replaceAll("&", "&amp;").replaceAll("'", "&#39;")));
    }
  }
});

test("Wave B routes occur exactly once in sitemap-services.xml and nowhere else", () => {
  const sitemapFiles = fs.readdirSync(PUBLIC).filter((name) => /^sitemap-.+\.xml$/.test(name));
  for (const page of WAVE_B_ANSWER_PAGES) {
    const marker = `<loc>${SITE}/answers/${page.slug}/</loc>`;
    const containing = sitemapFiles.filter((name) => fs.readFileSync(path.join(PUBLIC, name), "utf8").includes(marker));
    assert.deepEqual(containing, ["sitemap-services.xml"], page.slug);
  }
});

test("high-impression source pages contextually link to every Wave B answer", () => {
  const sourceFiles = [
    path.join(PUBLIC, "index.html"),
    path.join(PUBLIC, "resources/mep/what-is-mep-engineering/index.html"),
    path.join(PUBLIC, "resources/how-much-does-mep-engineering-cost/index.html"),
    path.join(PUBLIC, "engineering-glossary/post-tensioned-concrete/index.html"),
    path.join(PUBLIC, "engineering-glossary/vrf/index.html"),
  ];
  const sourceHtml = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  for (const page of WAVE_B_ANSWER_PAGES) {
    assert.match(sourceHtml, new RegExp(`href="/answers/${page.slug}/"`), page.slug);
  }
});