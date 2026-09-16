import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { PROJECT_TYPE_PAGES } from "./project-type-pages";
import { SITE } from "./shell";

const NEW_SLUGS = [
  "facility-upgrades",
  "accessibility-upgrades",
  "building-repairs",
  "code-compliance-upgrades",
  "permit-corrections",
  "plan-check-responses",
  "utility-upgrades",
] as const;

test("master-spec project-type expansion has seven unique enhanced pages", () => {
  const pages = NEW_SLUGS.map((slug) => PROJECT_TYPE_PAGES.find((page) => page.slug === slug));
  assert.ok(pages.every(Boolean));
  assert.equal(new Set(NEW_SLUGS).size, 7);
  assert.equal(new Set(pages.map((page) => page!.title)).size, 7);
  assert.equal(new Set(pages.map((page) => page!.description)).size, 7);

  for (const page of pages) {
    assert.ok(page);
    assert.ok(page.title.length >= 35 && page.title.length <= 65, `${page.slug} title length`);
    assert.ok(page.description.length >= 140 && page.description.length <= 170, `${page.slug} description length`);
    assert.match(page.founderPerspective ?? "", /\bI\b/);
    assert.ok(page.faqs && page.faqs.length >= 4 && page.faqs.length <= 6);
    assert.ok(page.relatedSlugs.length >= 3);
  }
});

test("generated project-type expansion meets page and sitemap contracts", () => {
  const sitemapPath = path.resolve("public/sitemap-solutions.xml");
  if (!fs.existsSync(sitemapPath)) return;
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const slug of NEW_SLUGS) {
    const route = `/project-types/${slug}/`;
    const htmlPath = path.resolve("public", route.slice(1), "index.html");
    assert.ok(fs.existsSync(htmlPath), `missing ${route}`);
    const html = fs.readFileSync(htmlPath, "utf8");
    assert.ok(html.includes(`rel="canonical" href="${SITE}${route}"`));
    assert.match(html, /By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
    assert.equal((html.match(/"@type":"FAQPage"/g) ?? []).length, 1);
    assert.ok((html.match(/<details><summary>/g) ?? []).length >= 4);
    assert.match(html, /href="\/estimate\/"/);
    assert.match(html, /href="\/project-types\//);
    assert.equal(sitemap.split(`<loc>${SITE}${route}</loc>`).length - 1, 1);
  }
});