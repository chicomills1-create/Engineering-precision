import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type PrerenderManifest = {
  routes: string[];
};

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, "seo", "prerender-manifest.json"), "utf8"),
) as PrerenderManifest;
const routes = manifest.routes.filter((route) => route.startsWith("/industries/"));
const failures: string[] = [];
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function textContent(html: string) {
  return decodeHtml(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
}

function uniqueMeta(
  route: string,
  label: string,
  value: string,
  seen: Map<string, string>,
) {
  if (!value) {
    failures.push(`${route}: missing ${label}`);
    return;
  }
  const prior = seen.get(value);
  if (prior) failures.push(`${route}: duplicate ${label} also used by ${prior}`);
  else seen.set(value, route);
}

for (const route of routes) {
  const relative = route.replace(/^\/|\/$/g, "");
  const file = path.join(root, "dist", "public", relative, "index.html");
  if (!fs.existsSync(file)) {
    failures.push(`${route}: missing prerendered HTML at dist/public/${relative}/index.html`);
    continue;
  }

  const html = fs.readFileSync(file, "utf8");
  const visibleText = textContent(html);
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = decodeHtml(
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["'][^>]*>/i)?.[1] ?? "",
  );
  uniqueMeta(route, "title", title, titles);
  uniqueMeta(route, "meta description", description, descriptions);

  const canonicals = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["'][^>]*>/gi)];
  if (canonicals.length !== 1) {
    failures.push(`${route}: expected one canonical, found ${canonicals.length}`);
  } else {
    try {
      const pathname = new URL(canonicals[0][1], "https://example.com").pathname;
      if (pathname !== route) failures.push(`${route}: canonical path is ${pathname}`);
    } catch {
      failures.push(`${route}: canonical is not a valid URL`);
    }
  }

  const robots =
    html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["'][^>]*>/i)?.[1].toLowerCase() ?? "";
  if (!robots.includes("index") || !robots.includes("follow") || robots.includes("noindex")) {
    failures.push(`${route}: robots must allow index and follow`);
  }

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) failures.push(`${route}: expected one H1, found ${h1Count}`);

  const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let faqEntities: Array<{ name?: string; acceptedAnswer?: { text?: string } }> = [];
  for (const block of jsonLdBlocks) {
    try {
      const schema = JSON.parse(block[1]) as {
        "@type"?: string;
        "@graph"?: Array<{
          "@type"?: string;
          mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
        }>;
        mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }>;
      };
      const candidates = schema["@graph"] ?? [schema];
      const faq = candidates.find((item) => item["@type"] === "FAQPage");
      if (faq?.mainEntity) faqEntities = faq.mainEntity;
    } catch {
      failures.push(`${route}: invalid JSON-LD`);
    }
  }

  if (faqEntities.length !== 3) {
    failures.push(`${route}: expected three FAQ answers, found ${faqEntities.length}`);
  }
  for (const entity of faqEntities) {
    const question = decodeHtml(entity.name ?? "");
    const answer = decodeHtml(entity.acceptedAnswer?.text ?? "");
    if (!question || !visibleText.includes(question)) {
      failures.push(`${route}: FAQ question is not visible: ${question || "(missing)"}`);
    }
    if (!answer || !visibleText.includes(answer)) {
      failures.push(`${route}: FAQ answer is not visible for: ${question || "(missing question)"}`);
    }
  }
}

if (routes.length !== 24) {
  failures.push(`expected 24 canonical industry routes, found ${routes.length}`);
}

if (failures.length) {
  console.error(`Industry SEO/AEO batch audit failed (${failures.length}):\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(
  `Industry SEO/AEO batch audit passed for ${routes.length} prerendered pages: unique metadata, canonical/indexability, one H1, and visible FAQ schema parity confirmed.`,
);