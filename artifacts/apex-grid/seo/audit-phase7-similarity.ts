/**
 * Phase 7 all-pairs similarity audit.
 *
 * Compare every generated answer page with the existing answer corpus and the
 * known guide/resource corpus. The inclusive 0.85 threshold catches template
 * copies whose only meaningful change is a title or URL.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PHASE0_AEO_PAGES } from "./phase0-corpus";
import { PHASE7_COST_PAGES } from "./phase7-cost-pages";
import { PHASE7_HIRING_PAGES } from "./phase7-hiring-pages";
import { PHASE7_LICENSING_PAGES } from "./phase7-licensing-pages";
import { PHASE7_PERMIT_PAGES } from "./phase7-permit-pages";
import { PHASE7_TECHNICAL_PAGES } from "./phase7-technical-pages";
import { PHASE7_TIMELINE_PAGES } from "./phase7-timeline-pages";

const here = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = process.env.SEO_OUTPUT_DIR
  ? path.resolve(here, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(here, "../public");
const REPORT = path.join(here, "reports", "phase7-similarity.json");
const LIMIT = 0.85;
const PHASE7_SLUGS = [
  ...PHASE7_COST_PAGES,
  ...PHASE7_TIMELINE_PAGES,
  ...PHASE7_HIRING_PAGES,
  ...PHASE7_LICENSING_PAGES,
  ...PHASE7_PERMIT_PAGES,
  ...PHASE7_TECHNICAL_PAGES,
].map((page) => page.slug);
const PHASE7_URLS = new Set(PHASE7_SLUGS.map((slug) => `/answers/${slug}/`));

type CorpusPage = { url: string; shingles: Set<string> };

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim().toLowerCase();
}

function shingles(html: string): Set<string> {
  const words = visibleText(html).split(/\s+/).filter(Boolean);
  const result = new Set<string>();
  for (let index = 0; index + 4 <= words.length; index++) {
    result.add(words.slice(index, index + 4).join(" "));
  }
  return result;
}

function similarity(a: Set<string>, b: Set<string>): number {
  const smaller = a.size < b.size ? a : b;
  const larger = a.size < b.size ? b : a;
  let intersection = 0;
  for (const item of smaller) if (larger.has(item)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

function htmlFiles(dir: string, prefix: string): CorpusPage[] {
  if (!fs.existsSync(dir)) return [];
  const output: CorpusPage[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      output.push(...htmlFiles(full, `${prefix}${entry.name}/`));
    } else if (entry.isFile() && entry.name === "index.html") {
      const html = fs.readFileSync(full, "utf8");
      output.push({ url: `/${prefix}`, shingles: shingles(html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html) });
    }
  }
  return output;
}

const pages: CorpusPage[] = [];
for (const slug of PHASE7_SLUGS) {
  const file = path.join(PUBLIC, "answers", slug, "index.html");
  if (!fs.existsSync(file)) throw new Error(`Phase 7 similarity audit missing page: /answers/${slug}/`);
  const html = fs.readFileSync(file, "utf8");
  pages.push({ url: `/answers/${slug}/`, shingles: shingles(html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html) });
}
for (const slug of PHASE0_AEO_PAGES.map((page) => page.slug)) {
  const file = path.join(PUBLIC, "answers", slug, "index.html");
  if (!fs.existsSync(file)) throw new Error(`Phase 7 similarity audit missing existing answer: /answers/${slug}/`);
  const html = fs.readFileSync(file, "utf8");
  pages.push({ url: `/answers/${slug}/`, shingles: shingles(html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html) });
}
pages.push(...htmlFiles(path.join(PUBLIC, "guides"), "guides/"));
pages.push(...htmlFiles(path.join(PUBLIC, "resources"), "resources/"));

if (pages.length < 101 + PHASE0_AEO_PAGES.length) {
  throw new Error(`Phase 7 similarity audit expected generated answer corpus, found ${pages.length} pages`);
}
const violations: Array<{ similarity: number; first: string; second: string }> = [];
let maxObserved = { similarity: 0, first: "", second: "" };
for (let left = 0; left < pages.length; left++) {
  for (let right = left + 1; right < pages.length; right++) {
    if (!PHASE7_URLS.has(pages[left].url) && !PHASE7_URLS.has(pages[right].url)) continue;
    const score = similarity(pages[left].shingles, pages[right].shingles);
    if (score > maxObserved.similarity) {
      maxObserved = {
        similarity: Number(score.toFixed(4)),
        first: pages[left].url,
        second: pages[right].url,
      };
    }
    if (score >= LIMIT) {
      violations.push({
        similarity: Number(score.toFixed(4)),
        first: pages[left].url,
        second: pages[right].url,
      });
    }
  }
}
violations.sort((a, b) => b.similarity - a.similarity || a.first.localeCompare(b.first) || a.second.localeCompare(b.second));
const report = {
  generatedAt: "deterministic",
  threshold: LIMIT,
  inclusive: true,
  phase7Pages: PHASE7_SLUGS.length,
  existingAnswerPages: PHASE0_AEO_PAGES.length,
  comparisonCorpusPages: pages.length,
  comparisons: PHASE7_SLUGS.length * (pages.length - PHASE7_SLUGS.length)
    + (PHASE7_SLUGS.length * (PHASE7_SLUGS.length - 1)) / 2,
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
  throw new Error(`Phase 7 similarity audit failed: ${violations.length} pair(s) at or above 85%; see seo/reports/phase7-similarity.json`);
}