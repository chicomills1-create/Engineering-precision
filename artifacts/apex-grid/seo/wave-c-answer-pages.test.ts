import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { WAVE_C_ANSWER_PAGES } from "./wave-c-answer-pages";

const SITE = "https://apexgrideng.com";
const PUBLIC = process.env.SEO_OUTPUT_DIR
  ? path.resolve(import.meta.dirname, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(import.meta.dirname, "../public");

test("Wave C source records meet the editorial specification", () => {
  assert.equal(WAVE_C_ANSWER_PAGES.length, 5);
  assert.equal(new Set(WAVE_C_ANSWER_PAGES.map((page) => page.slug)).size, 5);
  for (const page of WAVE_C_ANSWER_PAGES) {
    const directWords = page.directAnswer?.trim().split(/\s+/).length ?? 0;
    assert.ok(directWords >= 40 && directWords <= 60, `${page.slug}: ${directWords}-word direct answer`);
    assert.ok((page.sections?.length ?? 0) >= 4, `${page.slug}: practical sections`);
    assert.ok(page.sections?.every((section) => section.heading.endsWith("?")), `${page.slug}: question H2s`);
    assert.ok(page.faqs.length >= 4 && page.faqs.length <= 6, `${page.slug}: FAQ count`);
    assert.doesNotMatch(JSON.stringify(page), /Jeremy Mills,? PE\b|Jeremy Mills is a PE/i);
  }
});

test("Wave C generated pages are indexable, self-canonical, linked, and schema-complete", () => {
  for (const page of WAVE_C_ANSWER_PAGES) {
    const route = `/answers/${page.slug}/`;
    const html = fs.readFileSync(path.join(PUBLIC, "answers", page.slug, "index.html"), "utf8");
    assert.match(html, new RegExp(`<link rel="canonical" href="${SITE}${route}"`));
    assert.doesNotMatch(html, /name="robots" content="noindex/i);
    assert.match(html, /By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran\./);
    assert.equal((html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length, 1);
    assert.match(html, /href="\/estimate"/);
    for (const href of [
      "/resources/title-24-energy-compliance-commercial-buildings/",
      "/answers/what-is-title-24/",
      "/answers/title-24-vs-iecc/",
    ]) assert.match(html, new RegExp(`href="${href}"`));
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]) as { "@type"?: string; mainEntity?: unknown[]; step?: unknown[] });
    assert.equal(schemas.find((schema) => schema["@type"] === "FAQPage")?.mainEntity?.length, page.faqs.length);
    if (page.howTo) assert.equal(schemas.find((schema) => schema["@type"] === "HowTo")?.step?.length, page.sections?.length);
    else assert.equal(schemas.some((schema) => schema["@type"] === "HowTo"), false);
  }
});

test("Wave C routes occur exactly once in sitemap-services.xml and nowhere else", () => {
  const sitemapFiles = fs.readdirSync(PUBLIC).filter((name) => /^sitemap-.+\.xml$/.test(name));
  for (const page of WAVE_C_ANSWER_PAGES) {
    const marker = `<loc>${SITE}/answers/${page.slug}/</loc>`;
    const containing = sitemapFiles.filter((name) => fs.readFileSync(path.join(PUBLIC, name), "utf8").includes(marker));
    assert.deepEqual(containing, ["sitemap-services.xml"], page.slug);
    assert.equal(fs.readFileSync(path.join(PUBLIC, "sitemap-services.xml"), "utf8").split(marker).length - 1, 1);
  }
});