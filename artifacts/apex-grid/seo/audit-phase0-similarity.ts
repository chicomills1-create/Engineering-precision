/**
 * Streaming Phase 0 similarity audit.
 *
 * The audit reads one generated HTML file at a time and compares only the
 * visible <main> copy marked data-phase0. It intentionally fails at 85% or
 * above so a page cannot be added by changing only a title or location name.
 */
import fs from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = process.env.SEO_OUTPUT_DIR ? path.resolve(__dirname, "..", process.env.SEO_OUTPUT_DIR) : path.resolve(__dirname, "../public");
const REPORT = path.join(__dirname, "reports", "phase0-similarity.json");
const LIMIT = 0.85;

type CorpusPage = { url: string; text: string; shingles: Set<string> };

async function* htmlFiles(dir: string): AsyncGenerator<string> {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.isFile() && entry.name === "index.html") yield full;
  }
}

async function readMarkedMain(file: string): Promise<string | undefined> {
  const input = createInterface({ input: fs.createReadStream(file, "utf8"), crlfDelay: Infinity });
  const lines: string[] = [];
  let marked = false;
  for await (const line of input) {
    if (line.includes('data-phase0="true"')) marked = true;
    if (marked) lines.push(line);
    if (marked && line.includes("</main>")) break;
  }
  if (!marked) return undefined;
  return lines.join("\n");
}

function pageUrl(file: string): string {
  const relative = path.relative(PUBLIC, file).replace(/\\/g, "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/\/index\.html$/, "")}/`;
}

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
  const result = new Set<string>();
  for (let index = 0; index + 4 <= words.length; index++) {
    result.add(words.slice(index, index + 4).join(" "));
  }
  return result;
}

function similarity(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  const smaller = a.size < b.size ? a : b;
  const larger = a.size < b.size ? b : a;
  let intersection = 0;
  for (const item of smaller) if (larger.has(item)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

async function main() {
  const pages: CorpusPage[] = [];
  for await (const file of htmlFiles(PUBLIC)) {
    const main = await readMarkedMain(file);
    if (!main) continue;
    const text = visibleText(main);
    pages.push({ url: pageUrl(file), text, shingles: shingleSet(text) });
  }
  const violations: Array<{ similarity: number; first: string; second: string }> = [];
  let maxObserved = { similarity: 0, first: "", second: "" };
  for (let left = 0; left < pages.length; left++) {
    for (let right = left + 1; right < pages.length; right++) {
      const score = similarity(pages[left].shingles, pages[right].shingles);
      if (score > maxObserved.similarity) {
        maxObserved = { similarity: Number(score.toFixed(4)), first: pages[left].url, second: pages[right].url };
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
  violations.sort((a, b) => b.similarity - a.similarity);
  const report = {
    generatedAt: "deterministic",
    threshold: LIMIT,
    phase0Pages: pages.length,
    comparisons: (pages.length * (pages.length - 1)) / 2,
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
    throw new Error(`Phase 0 similarity audit failed: ${violations.length} pair(s) at or above ${(LIMIT * 100).toFixed(0)}%; see seo/reports/phase0-similarity.json`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});