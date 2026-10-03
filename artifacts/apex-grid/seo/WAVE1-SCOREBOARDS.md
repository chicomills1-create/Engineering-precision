# Wave 1 — Three Scoreboards + Infrastructure Spec

> **Dashboard warning (display prominently):** Crawled ≠ Indexed ≠ Valuable.
> A page Google crawls is not necessarily indexed. A page Google indexes is not
> necessarily driving impressions, clicks, or revenue. Scale only what converts.

## Scoreboard 1 — Infrastructure

Tracks whether the machine serves Googlebot cleanly.

| Metric | Source | Alert threshold |
|---|---|---|
| Googlebot requests/day (total) | Server/CDN logs | — |
| Googlebot requests/day per cohort | Server/CDN logs (URL → cohort map) | — |
| Median response latency (Googlebot) | Server/CDN logs | > 2s sustained |
| % HTTP 200 | Server/CDN logs | — |
| % HTTP 3xx | Server/CDN logs | > 5% (redirect chains) |
| % HTTP 4xx | Server/CDN logs | > 2% (dead ends in sitemap) |
| % HTTP 5xx | Server/CDN logs | **> 0.5% → PAGE** (see alarms) |
| Rendering errors (Search Console) | GSC Page Experience / crawl stats | any spike |

**Alarms:** If 5xx rate rises during Googlebot crawls, alert immediately. A 5xx
during a crawl wave wastes the entire cohort's crawl budget for that cycle.

## Scoreboard 2 — Search

Tracks discovery → visibility per cohort.

| Metric | Source | Notes |
|---|---|---|
| Submitted | cohort-tracking.json (`submitted`) | 25,000 total |
| Discovered | GSC sitemap report | sitemap fetched, URLs seen |
| Crawled | GSC crawl stats + server logs | Googlebot actually fetched |
| Indexed | GSC index coverage per sitemap | **per-cohort sitemap names enable this** |
| Impressions | GSC performance per sitemap | — |
| Avg. position | GSC performance per sitemap | — |
| Clicks | GSC performance per sitemap | — |
| CTR | derived | — |

**Decision gate (2–4 weeks after Google begins crawling):**
- Scale cohorts with **search visibility + commercial intent**, not just high indexation.
- Weak cohorts get **revised, not multiplied**.
- Indexation rate < 20% of submitted → diagnose template/content before expanding.

## Scoreboard 3 — Business

Tracks dollars per cohort. This is the scoreboard that matters.

Attribution chain (every RFQ carries):
```
Landing URL → cohort ID → service → metro/state → template version
  → proposal → signed contract → revenue → gross profit
```

| Metric | Source |
|---|---|
| RFQs per cohort | Estimate form attribution payload |
| First-touch cohort (immutable) | `apex_first_touch` localStorage |
| Conversion-touch cohort | URL params at submit |
| Proposals sent | CRM / proposal system |
| Contracts signed | CRM |
| Revenue | CRM / accounting |
| Gross profit | CRM / accounting |
| **Profit per 1,000 indexed pages** | derived — **the Wave 2 scaling metric** |

## Infrastructure requirements

1. **Shallow hub pages** — Implemented. `/wave1/` → `/wave1/:service/` →
   `/wave1/:service/:state/` → city pages. Every money page reachable in ≤4
   clicks from homepage via HTML links, not just sitemap.
2. **Sitemap submission** — 180 per-cohort sitemaps (`sitemap-wave1-{service}-{abbr}.xml`)
   registered in `sitemap_index.xml` and `seo/generate.ts`. Submit index via
   Search Console Sitemaps API after deploy goes live.
3. **Accurate lastmod** — Sitemap `<lastmod>` reflects deployment date, not
   regenerated daily. Do not bump dates on unchanged pages.
4. **Fast serving** — Dynamic routes render client-side; ensure CDN caching,
   HTTP 304 support, and zero 5xx during crawl waves.
5. **Clean crawl** — Wave 1 URLs are param-free canonical paths. The estimate
   CTA carries `?src=wave1&cohort=...` params; the estimate page sets
   self-referencing canonical to prevent param duplicates from competing
   for crawl budget.
6. **Googlebot monitoring from Day 1** — Ship server/CDN log pipeline keyed
   by cohort (URL prefix → cohort ID map in `wave1-manifest.json`) before
   expecting Search Console data.

## SSR note

Wave 1 pages are client-rendered (wouter SPA), consistent with all existing
Apex dynamic batches (franchise, verticals, buildings, specialties). Critical
SEO elements (title, meta description, canonical, H1, breadcrumbs, JSON-LD)
are set in document head via the component. Googlebot renders JavaScript;
server-side rendering for 25,000 dynamic URLs would require SSR route
wiring — recommended as a future infrastructure upgrade, not a Wave 1 blocker.

## Freeze policy

Content and templates are FROZEN for the measurement window. Only
instrumentation and infrastructure may change. Doing less is part of the experiment.
