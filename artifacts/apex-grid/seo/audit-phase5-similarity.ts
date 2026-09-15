import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PHASE5_METROS, PHASE5_SERVICE_SLUGS } from "./phase5-metros";

const here = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = process.env.SEO_OUTPUT_DIR ? path.resolve(here, "..", process.env.SEO_OUTPUT_DIR) : path.resolve(here, "../public");
const REPORT = path.join(here, "reports", "phase5-similarity.json");
const LIMIT = 0.85;

function shingles(html: string): Set<string> {
  const text = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, " ").trim().toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  return new Set(words.slice(0, -3).map((_, index) => words.slice(index, index + 4).join(" ")));
}

function similarity(a: Set<string>, b: Set<string>): number {
  const smaller = a.size < b.size ? a : b;
  const larger = a.size < b.size ? b : a;
  let intersection = 0;
  for (const item of smaller) if (larger.has(item)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

const corpus = PHASE5_METROS.flatMap((metro) => [
  `/metros/${metro.slug}/`,
  ...PHASE5_SERVICE_SLUGS.map((service) => `/metros/${metro.slug}/${service}/`),
]).map((url) => {
  const file = path.join(PUBLIC, url.replace(/^\/|\/$/g, ""), "index.html");
  if (!fs.existsSync(file)) throw new Error(`Phase 5 similarity audit missing page: ${url}`);
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes('data-phase5="true"')) throw new Error(`Phase 5 page is not marked for audit: ${url}`);
  return { url, shingles: shingles(html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html) };
});

if (corpus.length !== 400) throw new Error(`Phase 5 similarity audit expected 400 pages, found ${corpus.length}`);
const violations: Array<{ similarity: number; first: string; second: string }> = [];
let maxObserved = { similarity: 0, first: "", second: "" };
for (let left = 0; left < corpus.length; left++) {
  for (let right = left + 1; right < corpus.length; right++) {
    const score = similarity(corpus[left].shingles, corpus[right].shingles);
    if (score > maxObserved.similarity) maxObserved = {
      similarity: Number(score.toFixed(4)),
      first: corpus[left].url,
      second: corpus[right].url,
    };
    if (score >= LIMIT) violations.push({
      similarity: Number(score.toFixed(4)),
      first: corpus[left].url,
      second: corpus[right].url,
    });
  }
}
violations.sort((a, b) => b.similarity - a.similarity || a.first.localeCompare(b.first) || a.second.localeCompare(b.second));
const report = {
  generatedAt: "deterministic",
  threshold: LIMIT,
  phase5Pages: corpus.length,
  comparisons: (corpus.length * (corpus.length - 1)) / 2,
  violations: violations.length,
  failures: violations.length,
  maxObservedSimilarity: maxObserved.similarity,
  maxObservedPair: maxObserved.similarity ? [maxObserved.first, maxObserved.second] : [],
  topMatches: violations.slice(0, 25),
};
fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report));
if (violations.length) throw new Error(`Phase 5 similarity audit failed: ${violations.length} pair(s) at or above 85%`);