import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  PHASE4_METROS,
  PHASE4_SERVICE_SLUGS,
  PHASE4_SOURCE_URL,
} from "./phase4-metros";
import { PHASE1_METROS } from "./phase1-metros";
import { PHASE2_METROS } from "./phase2-metros";
import { PHASE3_METROS } from "./phase3-metros";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, "../public");

test("Phase 4 corpus is the ranked 151-200 Census metro set", () => {
  assert.equal(PHASE4_METROS.length, 50);
  assert.equal(new Set(PHASE4_METROS.map((metro) => metro.cbsaCode)).size, 50);
  const priorCbsas = new Set([...PHASE1_METROS, ...PHASE2_METROS, ...PHASE3_METROS].map((metro) => metro.cbsaCode));
  assert.ok(PHASE4_METROS.every((metro) => !priorCbsas.has(metro.cbsaCode)));
  assert.deepEqual(PHASE4_METROS.map((metro) => metro.rank), Array.from({ length: 50 }, (_, index) => index + 151));
  assert.ok(PHASE4_METROS.every((metro) => metro.metroCode === 2));
  assert.ok(PHASE4_METROS.every((metro) => !/\bAK\b|Alaska|Puerto Rico|Virgin Islands|Guam/i.test(metro.metroName)));
  assert.equal(PHASE4_METROS[0].metroName, "Jonesboro, AR");
  assert.equal(PHASE4_METROS[0].permitTotal2025, 1017);
  assert.equal(PHASE4_METROS[49].metroName, "Hanford-Corcoran, CA");
  assert.equal(PHASE4_METROS[49].permitTotal2025, 507);
  assert.ok(PHASE4_METROS.every((metro) => metro.sourceUrl === PHASE4_SOURCE_URL));
});

test("Phase 4 records have typed identity and varied substantive editorial fields", () => {
  assert.equal(PHASE4_SERVICE_SLUGS.length, 7);
  assert.ok(PHASE4_METROS.every((metro) =>
    /^[a-z0-9-]+$/.test(metro.slug)
    && metro.representativeCity.length > 1
    && metro.representativeState.length > 1
    && Object.values(metro.editorial).every((value) => value.length > 80),
  ));
  assert.equal(new Set(PHASE4_METROS.map((metro) => `${metro.permitTotal2025}:${metro.cbsaCode}`)).size, 50);
});

test("Phase 4 namespace has exactly eight indexable pages per metro", () => {
  if (!fs.existsSync(publicDir)) return;
  const sitemap = path.join(publicDir, "sitemap-metros.xml");
  if (fs.existsSync(sitemap)) {
    const sitemapUrls = [...fs.readFileSync(sitemap, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    assert.equal(sitemapUrls.length, 1601);
    assert.equal(new Set(sitemapUrls).size, 1601);
  }
  for (const metro of PHASE4_METROS) {
    const dir = path.join(publicDir, "metros", metro.slug);
    if (!fs.existsSync(dir)) return;
    const files = [path.join(dir, "index.html"), ...PHASE4_SERVICE_SLUGS.map((slug) => path.join(dir, slug, "index.html"))];
    assert.equal(files.filter((file) => fs.existsSync(file)).length, 8, metro.slug);
    for (const file of files) {
      const html = fs.readFileSync(file, "utf8");
      const relative = `/${path.relative(publicDir, file).replace(/\\/g, "/").replace(/\/index\.html$/, "")}/`;
      assert.match(html, /<meta name="robots" content="index,follow"/);
      assert.match(html, /data-phase4="true"/);
      assert.match(html, /Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
      assert.match(html, new RegExp(`<link rel="canonical" href="https://apexgrideng\\.com${relative.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
      assert.match(html, /<meta property="og:title"/);
      assert.match(html, /<meta property="og:description"/);
      assert.match(html, /<meta property="og:url"/);
      assert.match(html, /<script type="application\/ld\+json">/);
      assert.match(html, new RegExp(PHASE4_SOURCE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
      assert.doesNotMatch(html, /content="noindex/i);
      assert.doesNotMatch(html, /Alaska|near me|Jeremy Mills, PE|\$\s?\d/i);
      if (file !== path.join(publicDir, "metros", metro.slug, "index.html")) {
        assert.match(html, /href="\/estimate"/);
        assert.doesNotMatch(html, /\$\s?\d/);
      }
    }
  }
});