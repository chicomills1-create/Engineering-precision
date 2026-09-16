import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { SITE } from "./shell";

const route = "/procurement/submit-rfp-rfq/";
const htmlPath = path.resolve("public/procurement/submit-rfp-rfq/index.html");
const sitemapPath = path.resolve("public/sitemap-core.xml");
const sourcePath = path.resolve("src/pages/RfpRfqSubmission.tsx");

test("prerendered RFP/RFQ submission page has one canonical SEO contract", () => {
  if (!fs.existsSync(htmlPath)) return;
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.ok(html.includes(`<title>Submit an RFP or RFQ Package | Apex Grid Engineering</title>`));
  assert.ok(html.includes(`rel="canonical" href="${SITE}${route}"`));
  assert.match(html, /By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran/);
  assert.equal((html.match(/"@type":"FAQPage"/g) ?? []).length, 1);
  assert.equal((html.match(/<h3 class="font-bold text-foreground leading-snug">/g) ?? []).length, 5);
  assert.match(html, /href="\/estimate\/"/);
  assert.match(html, /href="\/procurement\/"/);
  const source = fs.readFileSync(sourcePath, "utf8");
  assert.match(source, /fetch\("\/api\/storage\/uploads"/);
  assert.match(source, /attachments: uploadedFiles\.map/);
  assert.match(source, /uploadedFiles\.length === 0/);
});

test("RFP/RFQ submission route appears exactly once in the core sitemap", () => {
  if (!fs.existsSync(sitemapPath)) return;
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  assert.equal(sitemap.split(`<loc>${SITE}${route}</loc>`).length - 1, 1);
});