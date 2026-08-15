# City Pages — Search Console Review & Decision

**Date:** August 2026  
**Reviewed by:** Apex Grid Engineering team  
**Scope:** ~4,864 Census-derived "lite" city pages at `/locations/<state>/<city>/`

---

## Background

We generated service-area pages for every US Census place with population ≥ 5,000 — one page per city, per state. These "lite" pages inherit verified state-level code and climate data (building code, energy code, climate zone, seismic/wind/snow ratings) rather than curated city-specific permitting detail. Content differentiators within a state are limited to: city name, population count, and a list of nearby city links.

**Pre-trim corpus:** 4,864 cities across 50 states  
**Page template:** state codes + city name/pop + service cards + nearby links  

---

## Search Console Coverage Review

### What to watch in Search Console (Coverage → Pages)

After submitting the sitemap, monitor these signals over 4–8 weeks:

| Signal | Healthy range | Action threshold |
|---|---|---|
| **Indexed / Submitted ratio** for `/locations/*` | > 60% | < 40% → investigate |
| **Excluded: Duplicate, Google chose different canonical** | < 20% of `/locations/` | > 30% → enrichment needed |
| **Excluded: Crawled — currently not indexed** | Some is normal | Rising trend → thin-content signal |
| **Excluded: Soft 404** | 0 | Any → check static generation |
| **Core Web Vitals** for location pages | Pass | Any failing URLs → fix before re-requesting |

### Impressions & clicks — baseline expectations

Lite city pages target long-tail queries ("MEP engineer [city]", "[city] structural engineering firm"). Expect:
- **Weeks 1–4:** near-zero impressions while Googlebot crawls and evaluates.
- **Weeks 4–12:** low single-digit impressions per city for cities 10k–50k pop; modest CTR if title matches intent.
- **3 months+:** indexing should stabilize. Cities with impressions but no clicks → tweak title/description. Cities with zero impressions after 12 weeks → consider de-indexing (robots noindex on the template, or removal from the directory).

---

## Decision: TRIM — raise population threshold to 10,000

**Previous threshold:** 5,000 (4,864 cities)  
**New threshold:** 10,000 (3,198 cities, −1,666 removed)

### Rationale

1. **Content differentiation:** All lite pages within a state share the same code/climate data block. The only city-specific content is the city name, population, and adjacent-city links. At 5,000–10,000 population, these cities are unlikely to generate distinct search impressions that justify their own URL.

2. **Crawl budget:** ~1,666 marginal pages removed → crawl budget re-focused on the 3,198 cities that represent genuine commercial engineering markets and on the 18 curated metro pages with full AHJ/code/utility detail.

3. **Doorway-page risk:** Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies#doorway-pages) flag pages "created to rank for specific similar queries" with no unique value. A municipality of 5,500 people with content identical to its neighbors within the same state is the profile Google evaluates as a doorway page.

4. **10,000 as the right floor:** A city of 10k+ is large enough to have its own planning/building department, generate multi-project commercial activity, and have genuine search intent for professional engineering services. The 3,198 remaining cities represent every meaningful US market without the tail that dilutes quality signals.

### What was done

- `seo/cities-directory.json` filtered to `pop >= 10,000` (3,198 cities retained).
- Static pages regenerated via `pnpm --filter @workspace/apex-grid run seo:generate`.
- `sitemap.xml` rebuilt with updated URL list (~1,666 fewer `/locations/` entries).

---

## If coverage metrics worsen after trim

Run in order:
1. **Enrich the template first.** Add county seat status, FEMA flood-zone designation, or utility provider derived from state data — these can be injected statically without per-city research and break content identity within a state.
2. **Raise threshold again.** If impressions concentrate in the 50k+ tier, raise to 25,000 (1,598 cities). The 18 curated metro pages already cover the largest markets with full detail.
3. **Request indexing** in Search Console for high-value pages (major state capitals, county seats) after enrichment, rather than bulk re-submitting the sitemap.

---

## Next quarterly review (target: ~12 weeks post-launch)

- Pull Search Console → Performance → filter by page `/locations/` to see which city pages generated impressions.
- Export the top 50 impression URLs; confirm they are 10k+ population cities (sanity check on trim).
- Compare "Indexed" count vs sitemap count for `/locations/` entries; gap > 20% → enrichment sprint.
- Document findings in an updated version of this file.
