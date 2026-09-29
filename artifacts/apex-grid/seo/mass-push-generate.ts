/**
 * Mass-push SEO page generator — 24/7 production.
 * Generates HTML for programmatic city×service pages from mass-push data files.
 * Run after main seo:generate: SEO_OUTPUT_DIR=dist/public pnpm run seo:generate:mass-push
 *
 * This script:
 * 1. Imports all mass-push data files
 * 2. Generates static HTML pages using the site shell
 * 3. Writes sitemap-mass-push.xml
 * 4. Updates sitemap_index.xml to include the new sitemap
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { htmlShell, SITE } from "./shell.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.env.SEO_OUTPUT_DIR || path.join(__dirname, "../dist/public");
const MASS_PUSH_DIR = path.join(__dirname, "mass-push");

interface SeoPage {
  url: string; slug: string; title: string; description: string;
  h1: string; intro: string; body: string;
  faqs: { question: string; answer: string }[];
  city: string; state: string; state_abbr: string;
  service: string; service_slug: string;
}

async function main() {
  console.log("[mass-push] Starting generation...");

  // Dynamically import all mass-push data files
  const files = fs.readdirSync(MASS_PUSH_DIR).filter(f => f.endsWith(".ts") && f !== "index.ts");
  console.log(`[mass-push] Found ${files.length} data files`);

  let allPages: SeoPage[] = [];
  for (const file of files) {
    const mod = await import(path.join(MASS_PUSH_DIR, file));
    const constName = Object.keys(mod).find(k => k.endsWith("_PAGES_0000") || Array.isArray(mod[k]));
    if (constName && Array.isArray(mod[constName])) {
      allPages.push(...mod[constName]);
      console.log(`[mass-push] ${file}: ${mod[constName].length} pages`);
    }
  }

  console.log(`[mass-push] Total: ${allPages.length} pages`);

  // Generate HTML for each page
  let written = 0;
  const sitemapUrls: string[] = [];

  for (const page of allPages) {
    const pagePath = page.url.replace(/^\//, "").replace(/\/$/, "");
    const dir = path.join(OUT, pagePath);
    fs.mkdirSync(dir, { recursive: true });

    const schemaJson: object[] = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": page.service,
        "provider": {
          "@type": "LocalBusiness",
          "name": "Apex Grid Engineering",
          "url": SITE,
        },
        "areaServed": {
          "@type": "City",
          "name": page.city,
          "containedInPlace": { "@type": "State", "name": page.state },
        },
        "description": page.description,
      },
    ];

    if (page.faqs.length > 0) {
      schemaJson.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": page.faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer },
        })),
      });
    }

    const faqHtml = page.faqs.length > 0 ? `
      <section class="faqs">
        <h2>Frequently Asked Questions</h2>
        ${page.faqs.map(f => `
          <div class="faq">
            <h3>${f.question}</h3>
            <p>${f.answer}</p>
          </div>
        `).join("")}
      </section>` : "";

    const bodyHtml = `
      <main class="seo-page">
        <h1>${page.h1}</h1>
        <p class="intro">${page.intro}</p>
        <div class="content">
          <p>${page.body}</p>
        </div>
        ${faqHtml}
        <section class="cta">
          <h2>Get ${page.service} in ${page.city}</h2>
          <p>Apex Grid Engineering is licensed in 49 states with 10+ PEs. Send us your project for a fast quote.</p>
          <a href="/estimate" class="btn">Get an Estimate</a>
        </section>
      </main>
    `;

    const html = htmlShell({
      title: page.title,
      description: page.description,
      canonical: `${SITE}${page.url}`,
      schemaJson,
      body: bodyHtml,
    });

    fs.writeFileSync(path.join(dir, "index.html"), html);
    written++;
    sitemapUrls.push(`${SITE}${page.url}`);

    if (written % 1000 === 0) {
      console.log(`[mass-push] ${written}/${allPages.length} written...`);
    }
  }

  console.log(`[mass-push] Wrote ${written} HTML files`);

  // Generate sitemap-mass-push.xml (split into 50K chunks per Google limit)
  const CHUNK = 50000;
  const sitemapFiles: string[] = [];
  for (let i = 0; i < sitemapUrls.length; i += CHUNK) {
    const chunk = sitemapUrls.slice(i, i + CHUNK);
    const sitemapName = `sitemap-mass-push-${Math.floor(i / CHUNK)}.xml`;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      chunk.map(u => `  <url><loc>${u}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join("\n") +
      `\n</urlset>`;
    fs.writeFileSync(path.join(OUT, sitemapName), xml);
    sitemapFiles.push(sitemapName);
    console.log(`[mass-push] Wrote ${sitemapName} (${chunk.length} URLs)`);
  }

  // Update sitemap_index.xml to include mass-push sitemaps
  const indexPath = path.join(OUT, "sitemap_index.xml");
  if (fs.existsSync(indexPath)) {
    let indexXml = fs.readFileSync(indexPath, "utf-8");
    const newEntries = sitemapFiles
      .map(f => `  <sitemap><loc>${SITE}/${f}</loc></sitemap>`)
      .join("\n");
    // Insert before closing </sitemapindex>
    indexXml = indexXml.replace("</sitemapindex>", `${newEntries}\n</sitemapindex>`);
    fs.writeFileSync(indexPath, indexXml);
    console.log(`[mass-push] Updated sitemap_index.xml with ${sitemapFiles.length} sitemaps`);
  } else {
    console.log("[mass-push] WARNING: sitemap_index.xml not found, skipping update");
  }

  console.log(`[mass-push] DONE: ${written} pages, ${sitemapFiles.length} sitemap files`);
}

main().catch(e => { console.error(e); process.exit(1); });
