/**
 * Streaming SEO corpus audit.
 *
 * This intentionally audits the generated public corpus rather than source
 * data. It catches regressions introduced by either the SEO generator or the
 * React prerender step.
 */
import fs from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = process.env.SEO_OUTPUT_DIR
  ? path.resolve(__dirname, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(__dirname, "../public");
const SITE = "https://apexgrideng.com";
const LEGAL_ALLOWLIST = new Set(["/privacy", "/privacy/", "/terms", "/terms/"]);
const REDIRECT_MARKERS = [
  /<meta[^>]+http-equiv=["']refresh["']/i,
  /data-legacy-location=/i,
];

type Page = {
  file: string;
  url: string;
  canonical?: string;
  noindex: boolean;
  redirect: boolean;
  contentWords: number;
  faqs: Array<{ q: string; a: string }>;
  internalLinks: string[];
};

function normalize(value: string): string {
  const pathname = value.replace(/^https:\/\/apexgrideng\.com/i, "").split("?")[0] || "/";
  return pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function visibleContentWords(html: string): number {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  const visible = decodeHtml(
    body
      .replace(/<(script|style|noscript|svg|header|nav|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
  return visible.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

async function* htmlFiles(dir: string): AsyncGenerator<string> {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) yield full;
  }
}

async function readStream(file: string): Promise<string> {
  const input = createInterface({ input: fs.createReadStream(file, "utf8"), crlfDelay: Infinity });
  const chunks: string[] = [];
  for await (const line of input) chunks.push(line);
  return chunks.join("\n");
}

function extractFaqs(html: string): Array<{ q: string; a: string }> {
  const visible: Array<{ q: string; a: string }> = [];
  const details = /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<div[^>]*class=["'][^"']*\ba\b[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*<\/details>/gi;
  for (const match of html.matchAll(details)) {
    visible.push({
      q: decodeHtml(match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()),
      a: decodeHtml(match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()),
    });
  }
  const headingFaqBlock = html.match(
    /<h2[^>]*>\s*Frequently Asked Questions\s*<\/h2>([\s\S]*?)(?=<h2\b|<\/article>|$)/i,
  )?.[1];
  if (headingFaqBlock) {
    for (const match of headingFaqBlock.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi)) {
      visible.push({
        q: decodeHtml(match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()),
        a: decodeHtml(match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()),
      });
    }
  }
  const schemaFaqs: Array<{ q: string; a: string }> = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]) as Record<string, unknown>;
      const candidates = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of candidates) {
        if (item?.["@type"] !== "FAQPage" || !Array.isArray(item.mainEntity)) continue;
        for (const entity of item.mainEntity as Array<Record<string, unknown>>) {
          const answer = entity.acceptedAnswer as Record<string, unknown> | undefined;
          if (typeof entity.name === "string" && typeof answer?.text === "string") {
            schemaFaqs.push({ q: entity.name, a: answer.text });
          }
        }
      }
    } catch {
      // Malformed JSON-LD is reported by the FAQ mismatch below when paired
      // with visible FAQ markup; other schema validation belongs elsewhere.
    }
  }
  const key = (faq: { q: string; a: string }) => `${faq.q}\u0000${faq.a}`;
  const visibleKeys = new Set(visible.map(key));
  const schemaKeys = new Set(schemaFaqs.map(key));
  if (visibleKeys.size || schemaKeys.size) {
    if (visibleKeys.size !== schemaKeys.size || [...visibleKeys].some((item) => !schemaKeys.has(item))) {
      throw new Error("visible FAQ/AEO answers diverge from SSR FAQ JSON-LD");
    }
  }
  return visible;
}

function pageUrl(file: string): string {
  const relative = path.relative(PUBLIC, file).replace(/\\/g, "/");
  if (relative === "index.html") return "/";
  return `/${relative.replace(/\/index\.html$/, "")}`;
}

async function loadPage(file: string): Promise<Page> {
  const html = await readStream(file);
  const url = pageUrl(file);
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1];
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i)?.[1] ?? "";
  let faqs: Array<{ q: string; a: string }>;
  try {
    faqs = extractFaqs(html);
  } catch (error) {
    throw new Error(`${url}: ${error instanceof Error ? error.message : String(error)}`);
  }
  return {
    file,
    url,
    canonical: canonical ? normalize(canonical) : undefined,
    noindex: /\bnoindex\b/i.test(robots),
    redirect: REDIRECT_MARKERS.some((marker) => marker.test(html)),
    contentWords: visibleContentWords(html),
    faqs,
    internalLinks: [...html.matchAll(/<a[^>]+href=["'](\/[^"'#?]*)/gi)].map((match) => normalize(match[1])),
  };
}

function sitemapUrls(): string[] {
  const urls: string[] = [];
  for (const filename of fs.readdirSync(PUBLIC)) {
    if (!/^sitemap(?:[-_].+)?\.xml$/.test(filename)) continue;
    const xml = fs.readFileSync(path.join(PUBLIC, filename), "utf8");
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      if (!/\.xml(?:$|\?)/i.test(match[1])) urls.push(normalize(match[1]));
    }
  }
  return [...new Set(urls)];
}

async function main() {
  if (!fs.existsSync(PUBLIC)) throw new Error(`SEO corpus missing: ${PUBLIC}`);
  const pages = new Map<string, Page>();
  let noindex = 0;
  let redirects = 0;
  for await (const file of htmlFiles(PUBLIC)) {
    const page = await loadPage(file);
    pages.set(page.url, page);
    if (page.noindex) noindex++;
    if (page.redirect) redirects++;
  }
  const sitemap = sitemapUrls();
  const redirectsFile = path.join(PUBLIC, "legacy-location-redirects.json");
  const registeredRedirects = fs.existsSync(redirectsFile)
    ? JSON.parse(fs.readFileSync(redirectsFile, "utf8")) as Record<string, string>
    : {};
  const sitemapRedirectUrls = sitemap.filter((url) => Object.hasOwn(registeredRedirects, url));
  const invalidRedirectTargets: string[] = [];
  for (const [source, destination] of Object.entries(registeredRedirects)) {
    const targetUrl = normalize(destination);
    const target = pages.get(targetUrl);
    if (!target) invalidRedirectTargets.push(`${source} -> ${destination}: target has no generated HTML`);
    else if (target.noindex) invalidRedirectTargets.push(`${source} -> ${destination}: target is noindex`);
    else if (target.redirect) invalidRedirectTargets.push(`${source} -> ${destination}: target redirects again`);
    else if (target.canonical !== targetUrl) invalidRedirectTargets.push(`${source} -> ${destination}: target is not self-canonical`);
    else if (target.contentWords < 100) invalidRedirectTargets.push(`${source} -> ${destination}: target has only ${target.contentWords} visible content words`);
  }
  const internalLinksToNoindex = [...pages.values()].reduce(
    (total, page) => total + page.internalLinks.filter((target) => pages.get(target)?.noindex).length,
    0,
  );
  const indexableSourceLinksToNoindex = [...pages.values()]
    .filter((page) => !page.noindex && !page.redirect)
    .reduce(
      (total, page) => total + page.internalLinks.filter((target) => pages.get(target)?.noindex).length,
      0,
    );
  const excludedSourceLinksToNoindex = internalLinksToNoindex - indexableSourceLinksToNoindex;
  const failures: string[] = [];
  for (const failure of invalidRedirectTargets) failures.push(`invalid legacy redirect target: ${failure}`);
  for (const url of sitemap) {
    const page = pages.get(url);
    if (Object.hasOwn(registeredRedirects, url)) failures.push(`sitemap URL is registered to redirect: ${url} -> ${registeredRedirects[url]}`);
    else if (!page) failures.push(`sitemap URL has no HTML corpus page: ${url}`);
    else if (page.noindex) failures.push(`sitemap URL is noindex: ${url}`);
    else if (page.redirect) failures.push(`sitemap URL is a redirect: ${url}`);
    else if (!page.canonical || page.canonical !== url) failures.push(`sitemap URL is not self-canonical: ${url}`);
  }
  const byCanonical = new Map<string, Page[]>();
  for (const page of pages.values()) {
    if (page.noindex || page.redirect || !page.canonical) continue;
    const entries = byCanonical.get(page.canonical) ?? [];
    entries.push(page);
    byCanonical.set(page.canonical, entries);
  }
  const duplicateGroups = [...byCanonical.entries()].filter(([, entries]) => entries.length > 1);
  for (const [canonical, entries] of duplicateGroups) {
    failures.push(`multiple indexable sources share canonical ${canonical}: ${entries.map((entry) => entry.url).join(", ")}`);
  }
  const sitemapSet = new Set(sitemap);
  const omitted = [...byCanonical.entries()]
    .filter(([canonical]) => !sitemapSet.has(canonical) && !LEGAL_ALLOWLIST.has(canonical))
    .map(([canonical]) => canonical)
    .sort();
  for (const url of omitted) failures.push(`indexable SEO-owned canonical omitted from sitemap: ${url}`);
  const thinIndexablePages = [...pages.values()]
    .filter((page) => !page.noindex && !page.redirect && !LEGAL_ALLOWLIST.has(page.url) && page.contentWords < 100)
    .sort((a, b) => a.url.localeCompare(b.url));
  for (const page of thinIndexablePages) {
    failures.push(`indexable page has only ${page.contentWords} visible content words: ${page.url}`);
  }
  const report = {
    generatedAt: "deterministic",
    htmlPages: pages.size,
    sitemapUrls: sitemap.length,
    indexablePages: [...pages.values()].filter((page) => !page.noindex && !page.redirect).length,
    noindexPages: noindex,
    redirectPages: redirects,
    sitemapRedirectUrls: sitemapRedirectUrls.length,
    invalidRedirectTargets: invalidRedirectTargets.length,
    thinIndexablePages: thinIndexablePages.length,
    duplicateCanonicalGroups: duplicateGroups.length,
    sitemapOmissions: omitted.length,
    failures: failures.length,
    internalLinksToNoindex,
    indexableSourceLinksToNoindex,
    excludedSourceLinksToNoindex,
  };
  const reportDir = path.join(__dirname, "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "corpus-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report));
  if (failures.length) throw new Error(`SEO corpus audit failed with ${failures.length} findings; see seo/reports/corpus-audit.json\n${failures.slice(0, 20).join("\n")}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});