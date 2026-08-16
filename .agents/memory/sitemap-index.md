---
name: Sitemap index
description: How the sitemap index is structured, generated, and submitted to search engines.
---

# Sitemap Index

## Structure
`seo:generate` produces a sitemap index (`sitemap_index.xml`) + 6 category sitemaps:

| File | Contents | ~URLs |
|------|----------|-------|
| `sitemap-core.xml` | Homepage, services, contact, team, audience pages | 17 |
| `sitemap-services.xml` | Discipline hubs + subpages, title-24, permit, existing-building | 114 |
| `sitemap-industries.xml` | Industry pages + industry×discipline combinations | 125 |
| `sitemap-solutions.xml` | Solutions, project types, who-we-work-with, projects, misc | 165 |
| `sitemap-resources.xml` | Resource articles, guides, blog, glossary | 200+ |
| `sitemap-locations.xml` | States, curated cities, directory cities, location×service | 3,600+ |

`sitemap.xml` is written as an alias for `sitemap_index.xml` (same content) so existing GSC submissions continue working.

## robots.txt
Declares both:
```
Sitemap: https://apexgrideng.com/sitemap_index.xml
Sitemap: https://apexgrideng.com/sitemap.xml
```

## Bing Ping
At the end of `seo:generate`, the script pings:
`https://www.bing.com/ping?sitemap=https://apexgrideng.com/sitemap_index.xml`

Google deprecated their ping URL in June 2023 — GSC + robots.txt Sitemap directive is the correct Google discovery path now.

## Google Indexing API
Do NOT use Google's Indexing API for these pages. As of 2026 it is only eligible for `JobPosting` and livestream `BroadcastEvent` content. Using it for engineering/location/service pages violates Google's terms.

## How to Apply
- `writeSitemap()` in `artifacts/apex-grid/seo/generate.ts` (around line 588) produces all files
- Helper functions `u()` and `writeSingleSitemap()` are defined just above it
- All files are written to `artifacts/apex-grid/public/` and copied to `dist/public/` by `vite build`
- Submit `https://apexgrideng.com/sitemap_index.xml` in Google Search Console → Sitemaps
