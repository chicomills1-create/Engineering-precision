import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { NATIONAL_FACILITY_INTENT_PAGES } from "./national-facility-intent-pages";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures: string[] = [];
const seenCanonicals = new Set<string>();
const servicesSitemap = fs.readFileSync(path.join(root, "public", "sitemap-services.xml"), "utf8");
const projectTypesHub = fs.readFileSync(path.join(root, "public", "project-types", "index.html"), "utf8");
const opportunityMap = JSON.parse(fs.readFileSync(path.join(root, "seo", "reports", "engineering-intent-opportunity-map.json"), "utf8")) as {
  selectionChecks?: { exactRouteScan?: string; searchConsole?: string };
  opportunities?: Array<{ slug?: string; decision?: string }>;
};
const decode = (value: string) =>
  value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, " ").trim();
const visible = (html: string) =>
  decode(html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));

if (NATIONAL_FACILITY_INTENT_PAGES.length !== 25) failures.push(`expected 25 definitions, found ${NATIONAL_FACILITY_INTENT_PAGES.length}`);
if (!opportunityMap.selectionChecks?.exactRouteScan || !opportunityMap.selectionChecks.searchConsole) {
  failures.push("opportunity map is missing exact-route or Search Console selection evidence");
}
const retainedBatch = (opportunityMap.opportunities ?? []).filter((item) =>
  item.decision === "retained" && NATIONAL_FACILITY_INTENT_PAGES.some((page) => page.slug === item.slug));
if (retainedBatch.length !== 25) failures.push(`opportunity map retains ${retainedBatch.length} of 25 batch pages`);

for (const page of NATIONAL_FACILITY_INTENT_PAGES) {
  const url = `/engineering-intent/${page.slug}/`;
  const canonical = `https://apexgrideng.com${url}`;
  const file = path.join(root, "public", url.replace(/^\/|\/$/g, ""), "index.html");
  if (!fs.existsSync(file)) {
    failures.push(`${url}: missing generated HTML`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const pageText = visible(html);
  const faqSchemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as { "@type"?: string; mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }> })
    .filter((schema) => schema["@type"] === "FAQPage");
  if (seenCanonicals.has(canonical)) failures.push(`${url}: duplicate canonical`);
  seenCanonicals.add(canonical);
  if (!html.includes(`<link rel="canonical" href="${canonical}"`)) failures.push(`${url}: canonical mismatch`);
  if (!servicesSitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`${url}: omitted from services sitemap`);
  if (!projectTypesHub.includes(`href="${url}"`)) failures.push(`${url}: missing contextual inbound link from project-types hub`);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) failures.push(`${url}: expected one H1`);
  if (!pageText.includes(page.answer)) failures.push(`${url}: quick answer is not visible`);
  if (faqSchemas.length !== 1) {
    failures.push(`${url}: expected one FAQPage schema`);
    continue;
  }
  const entities = faqSchemas[0].mainEntity ?? [];
  if (entities.length !== page.faqs.length) failures.push(`${url}: FAQ schema count does not match visible definitions`);
  for (const faq of page.faqs) {
    if (!pageText.includes(decode(faq.q)) || !pageText.includes(decode(faq.a))) {
      failures.push(`${url}: FAQ schema content is not visible`);
    }
  }
}

if (failures.length) {
  console.error(`National facility-intent batch failed (${failures.length}):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`National facility-intent batch passed for ${NATIONAL_FACILITY_INTENT_PAGES.length} generated pages.`);
