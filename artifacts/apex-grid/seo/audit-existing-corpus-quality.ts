/**
 * Streaming quality audit for the existing location corpus.
 *
 * This intentionally does not compare every page to every other page. It
 * keeps memory bounded to one file at a time, fingerprints normalized visible
 * copy, reports exact duplicate groups, and counts thin/noindex pages. This
 * makes it safe for a directory corpus in the tens of thousands of pages.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");
const LOCATIONS = path.join(PUBLIC, "locations");
const REPORT = path.join(__dirname, "reports", "existing-corpus-quality.json");
const THIN_WORD_LIMIT = 400;

type LocationRecord = { url: string; noindex: boolean; redirect: boolean; words: number; fingerprint: string };

async function* htmlFiles(dir: string): AsyncGenerator<string> {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.isFile() && entry.name === "index.html") yield full;
  }
}

async function readHtml(file: string): Promise<string> {
  const input = createInterface({ input: fs.createReadStream(file, "utf8"), crlfDelay: Infinity });
  const chunks: string[] = [];
  for await (const line of input) chunks.push(line);
  return chunks.join("\n");
}

function urlFor(file: string): string {
  const relative = path.relative(PUBLIC, file).replace(/\\/g, "/");
  return `/${relative.replace(/\/index\.html$/, "")}/`.replace("//", "/");
}

function visibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim().toLowerCase();
}

async function main() {
  const records: LocationRecord[] = [];
  for await (const file of htmlFiles(LOCATIONS)) {
    const html = await readHtml(file);
    const text = visibleText(html);
    const words = text ? text.split(/\s+/).length : 0;
    records.push({
      url: urlFor(file),
      noindex: /\bnoindex\b/i.test(html),
      redirect: /http-equiv=["']refresh|data-legacy-location=/i.test(html),
      words,
      fingerprint: crypto.createHash("sha256").update(text).digest("hex"),
    });
  }
  const exactGroups = new Map<string, string[]>();
  for (const record of records.filter((item) => !item.noindex && !item.redirect)) {
    const urls = exactGroups.get(record.fingerprint) ?? [];
    urls.push(record.url);
    exactGroups.set(record.fingerprint, urls);
  }
  const duplicateGroups = [...exactGroups.values()].filter((urls) => urls.length > 1);
  const indexable = records.filter((record) => !record.noindex && !record.redirect);
  const noindex = records.filter((record) => record.noindex);
  const thinIndexable = indexable.filter((record) => record.words < THIN_WORD_LIMIT);
  const report = {
    generatedAt: "deterministic",
    scope: "public/locations/**/*.html",
    corpusPages: records.length,
    indexablePages: indexable.length,
    noindexPages: noindex.length,
    redirectPages: records.filter((record) => record.redirect).length,
    thinWordLimit: THIN_WORD_LIMIT,
    thinIndexablePages: thinIndexable.length,
    thinIndexableSamples: thinIndexable.slice(0, 25).map(({ url, words }) => ({ url, words })),
    exactDuplicateIndexableGroups: duplicateGroups.length,
    exactDuplicateIndexableSamples: duplicateGroups.slice(0, 25),
    policy: {
      directoryLite: "Directory-derived pages that fail identity, slug, or population review are generated noindex,follow; records that pass the conservative gate may be indexable. Curated researched pages use the separate research gate.",
      similarity: "This audit uses streaming normalized-text fingerprints and bounded reports. It does not run O(n²) all-pairs comparisons across the existing corpus. Phase 0 pages use the separate 85% similarity audit.",
      interpretation: "Thin or duplicate findings are review signals, not automatic deletion or unsupported local claims.",
    },
  };
  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  fs.writeFileSync(REPORT, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report));
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});