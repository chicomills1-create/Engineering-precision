/**
 * Full all-pairs Phase 1 corpus similarity audit.
 *
 * Only the 400 MSA pages are compared (the collection index is intentionally
 * not part of the per-MSA corpus). The threshold is inclusive: 0.85 fails.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PHASE1_METROS, PHASE1_SERVICE_SLUGS } from "./phase1-metros";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = process.env.SEO_OUTPUT_DIR ? path.resolve(__dirname, "..", process.env.SEO_OUTPUT_DIR) : path.resolve(__dirname, "../public");
const REPORT = path.join(__dirname, "reports", "phase1-similarity.json");
const LIMIT = 0.85;

type CorpusPage = { url: string; shingles: Set<string> };

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function shingleSet(text: string): Set<string> {
  const words = text.split(/\s+/).filter(Boolean);
  const shingles = new Set<string>();
  for (let index = 0; index + 4 <= words.length; index++) {
    shingles.add(words.slice(index, index + 4).join(" "));
  }
  return shingles;
}

function similarity(a: Set<string>, b: Set<string>): number {
  const smaller = a.size < b.size ? a : b;
  const larger = a.size < b.size ? b : a;
  let intersection = 0;
  for (const item of smaller) if (larger.has(item)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

function pages(): CorpusPage[] {
  return PHASE1_METROS.flatMap((metro) => [
    `/metros/${metro.slug}/`,
    ...PHASE1_SERVICE_SLUGS.map((service) => `/metros/${metro.slug}/${service}/`),
  ]).map((url) => {
    const file = path.join(PUBLIC, url.replace(/^\/|\/$/g, ""), "index.html");
    if (!fs.existsSync(file)) throw new Error(`Phase 1 similarity audit missing page: ${url}`);
    const html = fs.readFileSync(file, "utf8");
    if (!html.includes('data-phase1="true"')) throw new Error(`Phase 1 page is not marked for audit: ${url}`);
    return { url, shingles: shingleSet(visibleText(html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html)) };
  });
}

function main() {
  const corpus = pages();
  const expected = PHASE1_METROS.length * 8;
  if (corpus.length !== expected) throw new Error(`Phase 1 similarity audit expected ${expected} pages, found ${corpus.length}`);
  const violations: Array<{ similarity: number; first: string; second: string }> = [];
  let maxObserved = { similarity: 0, first: "", second: "" };
  for (let left = 0; left < corpus.length; left++) {
    for (let right = left + 1; right < corpus.length; right++) {
      const score = similarity(corpus[left].shingles, corpus[right].shingles);
      if (score > maxObserved.similarity) {
        maxObserved = {
          similarity: Number(score.toFixed(4)),
          first: corpus[left].url,
          second: corpus[right].url,
        };
      }
      if (score >= LIMIT) {
        violations.push({
          similarity: Number(score.toFixed(4)),
          first: corpus[left].url,
          second: corpus[right].url,
        });
      }
    }
  }
  violations.sort((a, b) => b.similarity - a.similarity);
  const report = {
    generatedAt: "deterministic",
    threshold: LIMIT,
    phase1Pages: corpus.length,
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
  if (violations.length) {
    throw new Error(`Phase 1 similarity audit failed: ${violations.length} pair(s) at or above 85%; see seo/reports/phase1-similarity.json`);
  }
}

main();