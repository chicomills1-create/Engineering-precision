/* Apex dynamic variation routes — RETIRED by R6 (2026-11-04).
 *
 * The /{service}/{state}/{city}/{variation}/ family (3 services x 150
 * intents x 19,346 cities = 8,705,700 URLs) is permanently retired. The
 * mount below answers every pattern-shaped URL with a genuine HTTP 410.
 * Authority: R6-VARIATIONS-EVIDENCE-PACK-2026-11-04.md + ChatGPT verdict
 * (Option A, full-family 410, one pass). Record:
 * R6-RELEASE-RECORD-2026-11-04.md (defense-strikes-2026-11-03).
 *
 * DO NOT restore the 200 renderer response without a Director-level
 * reversal of R6. The renderer (apex-variations.ts), shell, DEPS and city
 * data are retained in this repo ONLY for reversibility; they are
 * unreachable. A second 410 layer for the same pattern lives in app.ts
 * (ORPHAN_410_PATTERNS) in case this mount is ever removed.
 */

import type { Express, Request, Response, NextFunction } from "express";
import path from "node:path";
import { SITE, esc, htmlShell } from "./apex-shell.js";
import cityData from "./apex-cities.json";
import {
  VARIATIONS,
  VARIATION_SERVICES,
  PLACE_TYPES,
  type CityPlace,
  type StateMeta,
  type VariationDeps,
} from "./apex-variations.js";

// ---------- City data ----------
// Bundled JSON: 19,346 cities across 49 licensed states (+DC). Alaska excluded.
// Static import — esbuild inlines it into the bundle (no runtime fs dependency).
const PLACE_LOOKUP: Map<string, CityPlace> = (() => {
  const m = new Map<string, CityPlace>();
  const arr = cityData as CityPlace[];
  for (const pl of arr) m.set(`${pl.s}/${pl.c}`, pl);
  console.log(`[apex-dynamic] PLACE_LOOKUP: ${m.size} cities`);
  return m;
})();

// State slug -> { abbr, name } — 49 licensed states (excludes Alaska per Jeremy)
const STATE_NAMES: Record<string, [string, string]> = {
  alabama: ["AL", "Alabama"], arizona: ["AZ", "Arizona"],
  arkansas: ["AR", "Arkansas"], california: ["CA", "California"], colorado: ["CO", "Colorado"],
  connecticut: ["CT", "Connecticut"], delaware: ["DE", "Delaware"],
  "district-of-columbia": ["DC", "District of Columbia"], florida: ["FL", "Florida"],
  georgia: ["GA", "Georgia"], hawaii: ["HI", "Hawaii"], idaho: ["ID", "Idaho"],
  illinois: ["IL", "Illinois"], indiana: ["IN", "Indiana"], iowa: ["IA", "Iowa"],
  kansas: ["KS", "Kansas"], kentucky: ["KY", "Kentucky"], louisiana: ["LA", "Louisiana"],
  maine: ["ME", "Maine"], maryland: ["MD", "Maryland"], massachusetts: ["MA", "Massachusetts"],
  michigan: ["MI", "Michigan"], minnesota: ["MN", "Minnesota"], mississippi: ["MS", "Mississippi"],
  missouri: ["MO", "Missouri"], montana: ["MT", "Montana"], nebraska: ["NE", "Nebraska"],
  nevada: ["NV", "Nevada"], "new-hampshire": ["NH", "New Hampshire"],
  "new-jersey": ["NJ", "New Jersey"], "new-mexico": ["NM", "New Mexico"],
  "new-york": ["NY", "New York"], "north-carolina": ["NC", "North Carolina"],
  "north-dakota": ["ND", "North Dakota"], ohio: ["OH", "Ohio"], oklahoma: ["OK", "Oklahoma"],
  oregon: ["OR", "Oregon"], pennsylvania: ["PA", "Pennsylvania"],
  "rhode-island": ["RI", "Rhode Island"], "south-carolina": ["SC", "South Carolina"],
  "south-dakota": ["SD", "South Dakota"], tennessee: ["TN", "Tennessee"], texas: ["TX", "Texas"],
  utah: ["UT", "Utah"], vermont: ["VT", "Vermont"], virginia: ["VA", "Virginia"],
  washington: ["WA", "Washington"], "west-virginia": ["WV", "West Virginia"],
  wisconsin: ["WI", "Wisconsin"], wyoming: ["WY", "Wyoming"],
};
const STATE_META: Record<string, StateMeta> = {};
for (const [slug, [abbr, name]] of Object.entries(STATE_NAMES)) {
  STATE_META[slug] = { abbr, name };
}
const STATE_PROFILES: Record<string, Record<string, unknown>> = {};

// ---------- Chrome adapters ----------
// layout() adapts apex-variations' page object to the htmlShell() signature.
function layout(o: { title: string; description: string; canonical: string; jsonLd: string; body: string }): string {
  let schemaJson: unknown[] = [];
  try {
    const parsed = JSON.parse(o.jsonLd);
    schemaJson = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // keep empty
  }
  return htmlShell({
    title: o.title,
    description: o.description,
    canonical: o.canonical,
    schemaJson,
    body: o.body,
  });
}

function quoteCTA(): string {
  return `<section class="ctaband"><div class="container"><h2>Discuss your engineering scope</h2><p>Share the project address, current records, requested deliverable, authority information, and schedule. Apex Grid confirms professional responsibility, availability, and scope before work begins.</p><a class="cta" href="/estimate">Start an Engineering Estimate</a></div></section>`;
}

const DEPS: VariationDeps = {
  PLACE_TYPES,
  PLACE_LOOKUP,
  STATE_META,
  STATE_PROFILES,
  layout,
  esc,
  quoteCTA,
  SITE,
};

// R6: the variationPage renderer import is REMOVED on purpose — the family
// is retired (see header). apex-variations.ts stays in the repo for
// reversibility only; nothing may import its renderer from here again
// without a Director-level reversal of R6.

const VARIATION_RE =
  /^\/(mep-engineering|structural-engineering|civil-engineering)\/([a-z-]+)\/([a-z0-9-]+)\/(best|cost|commercial|residential|firm|services|hire|permit|near-me|emergency|repair-vs-replace|questions|adu|restaurant|office|warehouse|retail|hotel|school|church|medical|multifamily|single-family|mixed-use|industrial|storage|gym|daycare|senior-living|student-housing|car-wash|gas-station|hvac-design|electrical-design|plumbing-design|lighting-design|foundation-design|seismic-retrofit|structural-calculations|energy-modeling|drainage-design|grading-design|utility-design|fire-protection|building-envelope|retaining-wall|pavement-design|solar-design|ev-charging|low-voltage|septic-design|commissioning|timeline|process|consultation|quote|inspection|design-build|plan-check-corrections|permit-expediting|feasibility-study|site-assessment|peer-review|as-built|due-diligence|pre-design|value-engineering|historic-building|flood-zone|hillside|high-wind|snow-load|expansive-soil|infill|tenant-improvement|change-of-use|addition|remodel|new-construction|shell-building|brownfield|coastal|brewery|data-center|greenhouse|hangar|stadium|theater|museum|library|fire-station|bank|parking-garage|rooftop|acoustic-design|waterproofing|elevator|generator|kitchen-design|cleanroom|home-builder|distribution-center|manufacturing-plant|cold-storage|self-storage|car-dealership|fast-food|coffee-shop|bar-nightclub|casino|airport-terminal|train-station|golf-course|recreation-center|swimming-pool|convention-center|movie-theater|funeral-home|veterinary-clinic|dental-office|urgent-care|assisted-living|memory-care|charter-school|logistics-hub|public-parks|community-center|courthouse|city-hall|police-station|post-office|winery|distillery|food-processing|pharmaceutical-plant|research-lab|semiconductor-fab|solar-farm|battery-storage|water-treatment|high-rise|condominium|townhouse|rv-park|marina|equestrian-facility|aquarium|amusement-park|pickleball-courts|strip-mall)\/?$/;

// House 410 body — byte-identical to the ORPHAN_410 response in app.ts:
// no links, no navigation, no schema markup.
const GONE_HTML = `<!DOCTYPE html>
<html><head><title>410 Gone</title>
<meta name="robots" content="noindex"></head>
<body><h1>410 Gone</h1>
<p>This page has been permanently removed.</p></body></html>`;

/** R6 retirement gate. Mounted before the static middleware in app.ts, so
 * this handler is the first layer that can match a variation URL. Every
 * pattern-shaped URL returns a genuine 410 — including unknown-state /
 * unknown-city shapes, which were never valid content (they previously
 * fell through to a 404). The gate is pattern-level on purpose:
 * VARIATION_RE has no static equivalent, so no legitimate route can
 * match it. */
export function mountApexDynamicRoutes(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    // Skip anything with a file extension (assets, sitemaps, etc.)
    if (path.extname(req.path)) return next();

    if (!VARIATION_RE.test(req.path)) return next();

    res.status(410);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(GONE_HTML);
  });

  console.log(
    `[apex-dynamic] R6 RETIRED — serving 410 for the variation family (${VARIATION_SERVICES.length} services x ${Object.keys(VARIATIONS).length} intents x ${PLACE_LOOKUP.size} cities); renderer retained in-repo, route disabled`
  );
}
