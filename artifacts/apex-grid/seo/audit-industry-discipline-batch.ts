import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { INDUSTRY_DISCIPLINE_PAGES, getIndustryDisciplineUrl } from "./industry-discipline-pages";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures: string[] = [];
const batch = INDUSTRY_DISCIPLINE_PAGES.slice(0, 25);

const decode = (value: string) =>
  value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, " ").trim();
const visible = (html: string) =>
  decode(html.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));

for (const page of batch) {
  const url = getIndustryDisciplineUrl(page);
  const file = path.join(root, "public", url.replace(/^\/|\/$/g, ""), "index.html");
  if (!fs.existsSync(file)) {
    failures.push(`${url}: missing generated HTML`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const pageText = visible(html);
  const faqScripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as { "@type"?: string; mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }> })
    .filter((schema) => schema["@type"] === "FAQPage");
  if (faqScripts.length !== 1) {
    failures.push(`${url}: expected one FAQPage schema, found ${faqScripts.length}`);
    continue;
  }
  const entities = faqScripts[0].mainEntity ?? [];
  if (entities.length !== 3) failures.push(`${url}: expected three FAQ entities, found ${entities.length}`);
  for (const entity of entities) {
    const question = decode(entity.name ?? "");
    const answer = decode(entity.acceptedAnswer?.text ?? "");
    if (!question || !pageText.includes(question)) failures.push(`${url}: FAQ question is not visible`);
    if (!answer || !pageText.includes(answer)) failures.push(`${url}: FAQ answer is not visible`);
  }
  if ((html.match(/<h1\b/g) ?? []).length !== 1) failures.push(`${url}: expected one H1`);
  if (!html.includes(`<link rel="canonical" href="https://apexgrideng.com${url}"`)) failures.push(`${url}: canonical mismatch`);
}

if (failures.length) {
  console.error(`Industry-discipline AEO batch failed (${failures.length}):\n${failures.join("\n")}`);
  process.exit(1);
}
console.log(`Industry-discipline AEO batch passed for ${batch.length} generated pages.`);