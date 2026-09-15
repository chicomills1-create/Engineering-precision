/**
 * All-pairs four-word-shingle audit for the 49 state estimator pages.
 *
 * The inclusive threshold is intentional: a pair at exactly 0.85 is a
 * failure, catching state doorway pages whose only meaningful change is a
 * state name or URL.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = process.env.SEO_OUTPUT_DIR
  ? path.resolve(here, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(here, "../public");
const estimatorDir = path.join(publicDir, "engineering-cost-estimator");
const reportPath = path.join(here, "reports", "estimator-similarity.json");
const LIMIT = 0.85;

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim().toLowerCase();
}

function shingles(html: string): Set<string> {
  const words = visibleText(html).split(/\s+/).filter(Boolean);
  const output = new Set<string>();
  for (let index = 0; index + 4 <= words.length; index++) {
    output.add(words.slice(index, index + 4).join(" "));
  }
  return output;
}

function similarity(first: Set<string>, second: Set<string>): number {
  const smaller = first.size < second.size ? first : second;
  const larger = first.size < second.size ? second : first;
  let intersection = 0;
  for (const shingle of smaller) if (larger.has(shingle)) intersection++;
  return intersection / (first.size + second.size - intersection);
}

if (!fs.existsSync(estimatorDir)) throw new Error("Estimator similarity audit missing engineering-cost-estimator output; run seo:generate first.");
const pages = fs.readdirSync(estimatorDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((entry) => {
    const url = `/engineering-cost-estimator/${entry.name}/`;
    const file = path.join(estimatorDir, entry.name, "index.html");
    if (!fs.existsSync(file)) throw new Error(`Estimator similarity audit missing page: ${url}`);
    const html = fs.readFileSync(file, "utf8");
    return { url, shingles: shingles(html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? html) };
  });
if (pages.length !== 49) throw new Error(`Estimator similarity audit expected 49 pages, found ${pages.length}`);

const violations: Array<{ similarity: number; first: string; second: string }> = [];
let maxObserved = { similarity: 0, first: "", second: "" };
for (let left = 0; left < pages.length; left++) {
  for (let right = left + 1; right < pages.length; right++) {
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
  estimatorPages: pages.length,
  comparisons: (pages.length * (pages.length - 1)) / 2,
  violations: violations.length,
  failures: violations.length,
  maxObservedSimilarity: maxObserved.similarity,
  maxObservedPair: maxObserved.similarity ? [maxObserved.first, maxObserved.second] : [],
  topMatches: violations.slice(0, 25),
};
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report));
if (violations.length) {
  throw new Error(`Estimator similarity audit failed: ${violations.length} pair(s) at or above 85%; see seo/reports/estimator-similarity.json`);
}