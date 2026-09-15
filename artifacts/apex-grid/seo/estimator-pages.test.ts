import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PE_STATE_SOURCE_LINKS } from "./phase0-corpus";
import type { StateData } from "./types";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = process.env.SEO_OUTPUT_DIR
  ? path.resolve(here, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(here, "../public");
const estimatorDir = path.join(publicDir, "engineering-cost-estimator");
const stateDir = path.join(here, "states");

const stateFiles = fs.readdirSync(stateDir)
  .filter((file) => file.endsWith(".ts") && file !== "alaska.ts")
  .sort();
const states: StateData[] = [];
for (const file of stateFiles) {
  const module = await import(pathToFileURL(path.join(stateDir, file)).href);
  states.push(Object.values(module)[0] as StateData);
}
states.sort((a, b) => a.slug.localeCompare(b.slug));

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function encode(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function schemaScripts(html: string): Array<Record<string, unknown>> {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as Record<string, unknown>);
}

function localFacts(state: StateData): string[] {
  return [
    state.buildingCode.name,
    state.buildingCode.baseCode,
    state.buildingCode.notes,
    state.energyCode.commercial,
    state.energyCode.notes,
    state.climate.zones,
    ...state.climate.drivers,
    state.structural.seismic,
    state.structural.wind,
    state.structural.snow,
    state.permitting,
    state.marketNotes,
    state.licensure.board,
    state.licensure.notes,
    ...state.metros.slice(0, 3),
  ];
}

function sitemapLocs(file: string): string[] {
  const xml = fs.readFileSync(path.join(publicDir, file), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

test("estimator expansion has exactly 49 reviewed states and excludes Alaska", () => {
  assert.equal(states.length, 49);
  assert.equal(new Set(states.map((state) => state.slug)).size, 49);
  assert.ok(!states.some((state) => state.slug === "alaska"));
  const directories = fs.existsSync(estimatorDir)
    ? fs.readdirSync(estimatorDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())
    : [];
  assert.equal(directories.length, 49);
  assert.ok(!directories.some((entry) => entry.name === "alaska"));
});

test("estimator pages are indexable, self-canonical, locally sourced, and linked", () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const h1s = new Set<string>();
  const h2Structures = new Set<string>();
  for (const state of states) {
    const url = `/engineering-cost-estimator/${state.slug}/`;
    const file = path.join(estimatorDir, state.slug, "index.html");
    assert.ok(fs.existsSync(file), `missing ${url}`);
    const html = fs.readFileSync(file, "utf8");
    const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
    const description = decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "");
    const h1 = decode(html.match(/<h1>([^<]+)<\/h1>/)?.[1] ?? "");
    const h2s = [...html.matchAll(/<h2>([^<]+)<\/h2>/g)].map((match) => decode(match[1]));
    assert.ok(title && description && h1, `${url} is missing title, description, or H1`);
    titles.add(title);
    descriptions.add(description);
    h1s.add(h1);
    assert.ok(h2s.length >= 7, `${url} needs substantial H2 structure`);
    assert.equal(new Set(h2s).size, h2s.length, `${url} repeats an H2`);
    h2Structures.add(h2s.join("|"));
    assert.match(html, /<meta name="robots" content="index,follow"/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://apexgrideng\\.com${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.ok(html.includes('href="/estimate"'), `${url} has no estimate CTA`);
    assert.ok(html.includes(`href="/pe-stamp/${state.slug}/"`), `${url} has no state PE resource link`);
    assert.ok(html.includes('href="/answers/"'), `${url} has no answers-library link`);
    assert.ok(html.includes(`href="/locations/${state.slug}/"`), `${url} has no state location link`);
    const officialSources = PE_STATE_SOURCE_LINKS[state.slug];
    assert.ok(officialSources, `${url} has no reviewed PE source record`);
    assert.ok(html.includes(`href="${officialSources.boardUrl}"`), `${url} has no official board link`);
    assert.ok(html.includes(`href="${officialSources.lookupUrl}"`), `${url} has no official license-lookup link`);
    const localHrefs = [...html.matchAll(new RegExp(`href="(/locations/${state.slug}/[^"]+/)"`, "g"))]
      .map((match) => match[1]);
    assert.ok(localHrefs.length >= 2, `${url} needs multiple local links`);
    for (const href of new Set(localHrefs)) {
      assert.ok(
        fs.existsSync(path.join(publicDir, href.replace(/^\/|\/$/g, ""), "index.html")),
        `${url} links to a missing local page: ${href}`,
      );
    }
    for (const fact of localFacts(state)) {
      assert.ok(html.includes(encode(fact)), `${url} is missing reviewed fact: ${fact}`);
    }
    const schemas = schemaScripts(html);
    assert.ok(schemas.some((schema) => schema["@type"] === "Service"), `${url} has no Service schema`);
    assert.ok(schemas.some((schema) => schema["@type"] === "BreadcrumbList"), `${url} has no Breadcrumb schema`);
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage") as {
      mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }>;
    } | undefined;
    assert.ok(faq && faq.mainEntity && faq.mainEntity.length >= 5, `${url} has no FAQ schema`);
    const visibleFaqs = [...html.matchAll(/<details><summary>([\s\S]*?)<\/summary><div class="a">([\s\S]*?)<\/div><\/details>/g)]
      .map((match) => ({ question: decode(match[1]), answer: decode(match[2]) }));
    assert.deepEqual(
      visibleFaqs,
      (faq?.mainEntity ?? []).map((entry) => ({ question: entry.name, answer: entry.acceptedAnswer.text })),
      `${url} FAQ visible/schema parity`,
    );
    assert.ok(visibleFaqs.some((entry) => entry.question === `How much does a PE stamp cost in ${state.name}?`), `${url} missing PE stamp cost FAQ`);
    const stateLocationFile = path.join(publicDir, "locations", state.slug, "index.html");
    assert.ok(fs.existsSync(stateLocationFile), `missing inbound state location page for ${url}`);
    assert.ok(
      fs.readFileSync(stateLocationFile, "utf8").includes(`href="${url}"`),
      `state location page does not link to ${url}`,
    );
  }
  assert.equal(titles.size, 49);
  assert.equal(descriptions.size, 49);
  assert.equal(h1s.size, 49);
  assert.equal(h2Structures.size, 49);
});

test("estimator sitemap has exact-once coverage and is in the sitemap index", () => {
  const expected = states.map((state) => `https://apexgrideng.com/engineering-cost-estimator/${state.slug}/`).sort();
  const estimatorSitemap = sitemapLocs("sitemap-estimators.xml").sort();
  assert.deepEqual(estimatorSitemap, expected);
  const index = fs.readFileSync(path.join(publicDir, "sitemap_index.xml"), "utf8");
  assert.equal((index.match(/https:\/\/apexgrideng\.com\/sitemap-estimators\.xml/g) ?? []).length, 1);
  const allSitemapFiles = fs.readdirSync(publicDir).filter((file) => /^sitemap-[^/]+\.xml$/.test(file));
  const occurrences = new Map(expected.map((url) => [url, 0]));
  for (const file of allSitemapFiles) {
    for (const loc of sitemapLocs(file)) {
      if (occurrences.has(loc)) occurrences.set(loc, occurrences.get(loc)! + 1);
    }
  }
  for (const [url, count] of occurrences) assert.equal(count, 1, `${url} appears ${count} times in generated sitemaps`);
  assert.ok(!estimatorSitemap.some((url) => /\/alaska\//.test(url)));
});