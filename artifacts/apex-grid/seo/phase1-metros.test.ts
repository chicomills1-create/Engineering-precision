import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  PHASE1_METROS,
  PHASE1_SERVICE_SLUGS,
  PHASE1_SOURCE_URL,
} from "./phase1-metros";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, "../public");

test("Phase 1 corpus is the ranked top 50 Census metro set", () => {
  assert.equal(PHASE1_METROS.length, 50);
  assert.equal(new Set(PHASE1_METROS.map((metro) => metro.cbsaCode)).size, 50);
  assert.deepEqual(PHASE1_METROS.map((metro) => metro.rank), Array.from({ length: 50 }, (_, index) => index + 1));
  assert.ok(PHASE1_METROS.every((metro) => metro.metroCode === 2));
  assert.ok(PHASE1_METROS.every((metro) => !/\bAK\b|Alaska/i.test(metro.metroName)));
  assert.equal(PHASE1_METROS[0].metroName, "Dallas-Fort Worth-Arlington, TX");
  assert.equal(PHASE1_METROS[0].permitTotal2025, 66179);
  assert.equal(PHASE1_METROS[49].metroName, "Pittsburgh, PA");
  assert.equal(PHASE1_METROS[49].permitTotal2025, 5797);
  assert.ok(PHASE1_METROS.every((metro) => metro.sourceUrl === PHASE1_SOURCE_URL));
});

test("Phase 1 records have typed identity and varied substantive editorial fields", () => {
  assert.equal(PHASE1_SERVICE_SLUGS.length, 7);
  assert.ok(PHASE1_METROS.every((metro) =>
    /^[a-z0-9-]+$/.test(metro.slug)
    && metro.representativeCity.length > 1
    && metro.representativeState.length > 1
    && Object.values(metro.editorial).every((value) => value.length > 80),
  ));
  assert.ok(new Set(PHASE1_METROS.map((metro) => `${metro.permitTotal2025}:${metro.cbsaCode}`)).size === 50);
});

test("generated Phase 1 namespace has exactly eight indexable pages per metro", () => {
  if (!fs.existsSync(publicDir)) return;
  const sitemap = path.join(publicDir, "sitemap-metros.xml");
  if (fs.existsSync(sitemap)) {
    const sitemapUrls = [...fs.readFileSync(sitemap, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    assert.equal(sitemapUrls.length, 1601);
    assert.equal(new Set(sitemapUrls).size, 1601);
  }
  for (const metro of PHASE1_METROS) {
    const dir = path.join(publicDir, "metros", metro.slug);
    if (!fs.existsSync(dir)) return;
    const files = [path.join(dir, "index.html"), ...PHASE1_SERVICE_SLUGS.map((slug) => path.join(dir, slug, "index.html"))];
    assert.equal(files.filter((file) => fs.existsSync(file)).length, 8, metro.slug);
    for (const file of files) {
      const html = fs.readFileSync(file, "utf8");
      const relative = `/${path.relative(publicDir, file).replace(/\\/g, "/").replace(/\/index\.html$/, "")}/`;
      assert.match(html, /<meta name="robots" content="index,follow"/);
      assert.match(html, /data-phase1="true"/);
      assert.match(html, /Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
      assert.match(html, new RegExp(`<link rel="canonical" href="https://apexgrideng\\.com${relative.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
      assert.match(html, /<meta property="og:title"/);
      assert.match(html, /<meta property="og:description"/);
      assert.match(html, /<meta property="og:url"/);
      assert.match(html, /<script type="application\/ld\+json">/);
      assert.match(html, new RegExp(PHASE1_SOURCE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      assert.doesNotMatch(html, /content="noindex/i);
      assert.doesNotMatch(html, /Alaska|near me|Jeremy Mills, PE|\$\s?\d/i);
      if (!file.endsWith("/index.html") || file !== path.join(publicDir, "metros", metro.slug, "index.html")) {
        assert.match(html, /href="\/estimate"/);
        assert.doesNotMatch(html, /\$\s?\d/);
      }
    }
  }
});