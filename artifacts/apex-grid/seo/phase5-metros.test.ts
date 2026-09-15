import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { PHASE1_METROS } from "./phase1-metros";
import { PHASE2_METROS } from "./phase2-metros";
import { PHASE3_METROS } from "./phase3-metros";
import { PHASE4_METROS } from "./phase4-metros";
import { PHASE5_METROS, PHASE5_SERVICE_SLUGS, PHASE5_SOURCE_URL } from "./phase5-metros";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = process.env.SEO_OUTPUT_DIR ? path.resolve(here, "..", process.env.SEO_OUTPUT_DIR) : path.resolve(here, "../public");

test("Phase 5 is the next 50 eligible Census metros after Phases 1-4", () => {
  const prior = new Set([...PHASE1_METROS, ...PHASE2_METROS, ...PHASE3_METROS, ...PHASE4_METROS].map((metro) => metro.cbsaCode));
  assert.equal(PHASE5_METROS.length, 50);
  assert.equal(new Set(PHASE5_METROS.map((metro) => metro.cbsaCode)).size, 50);
  assert.ok(PHASE5_METROS.every((metro) => !prior.has(metro.cbsaCode)));
  assert.deepEqual(PHASE5_METROS.map((metro) => metro.rank), Array.from({ length: 50 }, (_, index) => index + 201));
  assert.ok(PHASE5_METROS.every((metro) => metro.metroCode === 2 && metro.sourceUrl === PHASE5_SOURCE_URL));
  assert.ok(PHASE5_METROS.every((metro) => !/(?:,|-)\s*(?:AK|PR)(?:-|$)|Alaska|Puerto Rico|Virgin Islands|Guam/i.test(metro.metroName)));
  assert.deepEqual([PHASE5_METROS[0].metroName, PHASE5_METROS[0].permitTotal2025], ["Santa Fe, NM", 495]);
  assert.deepEqual([PHASE5_METROS[49].metroName, PHASE5_METROS[49].permitTotal2025], ["Lawton, OK", 201]);
});

test("Phase 5 records are typed and editorially substantive", () => {
  assert.equal(PHASE5_SERVICE_SLUGS.length, 7);
  assert.ok(PHASE5_METROS.every((metro) =>
    /^[a-z0-9-]+$/.test(metro.slug)
    && metro.representativeCity.length > 1
    && metro.representativeState.length > 1
    && Object.values(metro.editorial).every((value) => value.length > 80),
  ));
});

test("Phase 5 namespace has exactly eight static indexable pages per metro", () => {
  const sitemapUrls = [...fs.readFileSync(path.join(publicDir, "sitemap-metros.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(sitemapUrls.length, 2001);
  assert.equal(new Set(sitemapUrls).size, 2001);
  for (const metro of PHASE5_METROS) {
    const dir = path.join(publicDir, "metros", metro.slug);
    const files = [path.join(dir, "index.html"), ...PHASE5_SERVICE_SLUGS.map((slug) => path.join(dir, slug, "index.html"))];
    assert.equal(files.filter(fs.existsSync).length, 8, metro.slug);
    for (const file of files) {
      const html = fs.readFileSync(file, "utf8");
      const relative = `/${path.relative(publicDir, file).replace(/\\/g, "/").replace(/\/index\.html$/, "")}/`;
      assert.match(html, /<meta name="robots" content="index,follow"/);
      assert.match(html, /data-phase5="true"/);
      assert.match(html, /Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
      assert.match(html, new RegExp(`<link rel="canonical" href="https://apexgrideng\\.com${relative.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
      assert.match(html, /<meta property="og:title"/);
      assert.match(html, /<script type="application\/ld\+json">/);
      assert.match(html, new RegExp(PHASE5_SOURCE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      assert.doesNotMatch(html, /content="noindex|Alaska|near me|Jeremy Mills, PE|\$\s?\d/i);
      if (file !== path.join(dir, "index.html")) assert.match(html, /href="\/estimate"/);
    }
  }
});