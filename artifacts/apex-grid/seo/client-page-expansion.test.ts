import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { CLIENT_PAGES } from "./client-pages";

const NEW_SLUGS = [
  "builders",
  "owner-representatives",
  "construction-managers",
  "portfolio-clients",
  "national-accounts",
] as const;

test("remaining master-spec audience pages have unique complete source contracts", () => {
  const pages = NEW_SLUGS.map((slug) => {
    const page = CLIENT_PAGES.find((candidate) => candidate.slug === slug);
    assert.ok(page, `missing ${slug}`);
    return page;
  });

  assert.equal(new Set(pages.map((page) => page.title)).size, pages.length);
  assert.equal(new Set(pages.map((page) => page.description)).size, pages.length);

  for (const page of pages) {
    assert.equal(page.ctaHref, "/estimate/");
    assert.ok(page.sections.length >= 4);
    assert.ok(page.relatedLinks && page.relatedLinks.length >= 4);
    assert.ok(page.faqs && page.faqs.length >= 4 && page.faqs.length <= 6);
  }
});

test("generated audience pages have exact byline, canonical, FAQs, links, and sitemap coverage", () => {
  const sitemap = readFileSync("public/sitemap-solutions.xml", "utf8");

  for (const slug of NEW_SLUGS) {
    const html = readFileSync(`public/who-we-work-with/${slug}/index.html`, "utf8");
    const canonical = `https://apexgrideng.com/who-we-work-with/${slug}/`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
    assert.match(html, /By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
    assert.equal((html.match(/"@type":"FAQPage"/g) ?? []).length, 1);
    assert.equal((html.match(/<details>/g) ?? []).length, 4);
    assert.match(html, /href="\/estimate\/"/);
    assert.match(html, /href="\/who-we-work-with\/"/);
    assert.equal((sitemap.match(new RegExp(`<loc>${canonical}</loc>`, "g")) ?? []).length, 1);
  }
});