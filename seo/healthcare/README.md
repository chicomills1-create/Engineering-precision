# Healthcare & Life Sciences SEO Tier

Branch: `seo/healthcare-tier` (from `migration/apex-fix`). **Do not merge to main without instruction.**

## Contents

| File | Pages | Export |
|---|---|---|
| `wave-hc-hub.ts` | 1 hub | `WAVE_HC_HUB` (`HealthcareHubPage`) |
| `wave-hc-states.ts` | 50 state hubs | `WAVE_HC_STATES` (`HealthcareStatePage`) |
| `wave-hc-cities.ts` | 310 city pages | `WAVE_HC_CITIES` (`HealthcareCityPage`) |
| `wave-hc-answers.ts` | 22 AEO answers | `WAVE_HC_ANSWERS` (`HealthcareAnswerPage`) |

**Total: 383 pages.** Sitemap: `artifacts/apex-grid/public/sitemap-healthcare.xml` (383 URLs),
registered in `artifacts/apex-grid/public/sitemap_index.xml` (new file — no sitemap existed in the repo).

## URL structure

- Hub: `/healthcare-design/`
- State: `/healthcare-design/[state]/` (50: 49 states + DC; Alaska excluded — not licensed)
- City: `/healthcare-design/[state]/[city]/` (5–7 per state, real medical-hub cities)
- Answers: `/answers/healthcare-[topic]/` (22)

`slug` is the full URL path: render each page at `/{slug}/`.

## Conventions

- Wave format matches the existing SEO batch convention (cf. batch-131 city waves):
  `slug, title (55–65 chars), description (150–160), h1 == title, directAnswer, answer,
  sections, faqs, founderNote, extraLinks`. Each file has exactly one `];` and passes esbuild.
- Answer pages are Phase0AeoPage-shaped but **self-contained**: `phase0-corpus` does not exist
  on `migration/apex-fix`, so the interface is declared locally in `wave-hc-answers.ts`
  (uses `label` in extraLinks, matching the answer-page convention).
- Founder note: Jeremy Mills, CEO & Founder, USAF veteran — **not a PE** (never present as one).
- All hospital/health-system names were verified via web search on 2026-10-02. Never invent a facility.
- Cross-links: `/mep-engineering/`, `/mechanical-engineering/`, `/electrical-engineering/`,
  `/industries/healthcare/`, `/estimate`, plus answer-page interlinks.

## Render integration (for whoever wires generate.ts)

```ts
import { WAVE_HC_HUB } from "./seo/healthcare/wave-hc-hub";
import { WAVE_HC_STATES } from "./seo/healthcare/wave-hc-states";
import { WAVE_HC_CITIES } from "./seo/healthcare/wave-hc-cities";
import { WAVE_HC_ANSWERS } from "./seo/healthcare/wave-hc-answers";
// spread into the page arrays; render each at `/${page.slug}/` with the site shell
```

## Verification (2026-10-02)

- 383 unique slugs across all four files; titles 55–65 chars; descriptions 150–160; h1 == title.
- `grep -c '^];'` == 1 per file; `esbuild --loader:.ts=ts` exits clean on all four.
