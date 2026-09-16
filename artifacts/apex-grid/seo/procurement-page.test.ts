import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { STATIC_STANDALONE_PAGES } from "./static-pages";
import { SITE } from "./shell";

const route = "/procurement/";
const page = STATIC_STANDALONE_PAGES.find((entry) => entry.slug === "procurement");

test("procurement page has a unique reviewed source contract", () => {
  assert.ok(page);
  assert.equal(STATIC_STANDALONE_PAGES.filter((entry) => entry.dir === "procurement").length, 1);
  assert.ok(page.title.length >= 50 && page.title.length <= 60);
  assert.ok(page.description.length >= 150 && page.description.length <= 160);
  assert.equal(page.showFounderByline, true);
  assert.equal(page.ctaHref, "/procurement/submit-rfp-rfq/");
  assert.ok(page.sections.some((section) => /\bI\b/.test(section.content)));
  const faq = page.schemaJson?.filter((schema) => schema["@type"] === "FAQPage") ?? [];
  assert.equal(faq.length, 1);
  assert.ok(Array.isArray(faq[0].mainEntity));
  assert.ok((faq[0].mainEntity as unknown[]).length >= 4 && (faq[0].mainEntity as unknown[]).length <= 6);
});

test("generated procurement page meets canonical, content, link, and sitemap contracts", () => {
  const htmlPath = path.resolve("public/procurement/index.html");
  const sitemapPath = path.resolve("public/sitemap-core.xml");
  if (!fs.existsSync(htmlPath) || !fs.existsSync(sitemapPath)) return;
  const html = fs.readFileSync(htmlPath, "utf8");
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  assert.ok(html.includes(`rel="canonical" href="${SITE}${route}"`));
  assert.match(html, /By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
  assert.equal((html.match(/"@type":"FAQPage"/g) ?? []).length, 1);
  assert.equal((html.match(/<details><summary>/g) ?? []).length, 5);
  assert.match(html, /href="\/procurement\/submit-rfp-rfq\/"/);
  for (const href of ["/procurement/submit-rfp-rfq/", "/capabilities", "/capabilities-statement.html", "/licensing-service-coverage/", "/government/", "/government-contracting/", "/military"]) {
    assert.ok(html.includes(`href="${href}"`), `missing related link ${href}`);
  }
  assert.equal(sitemap.split(`<loc>${SITE}${route}</loc>`).length - 1, 1);
});