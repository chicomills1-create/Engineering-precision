/* Apex dynamic variation routes — Express integration.
 *
 * Serves NEW keyword-variation URLs: /{service}/{state}/{city}/{variation}/
 *   3 services × 49 states × 19,346 cities × 12 intent families = 696,456 URLs
 * Rendered server-side on demand. No per-page files.
 *
 * Mount BEFORE the static/prerendered middleware in app.ts so dynamic routes
 * take precedence. Unknown cities or invalid patterns fall through via next().
 *
 * SEO SAFETY: existing static URLs are never intercepted — this handler only
 * matches the /{service}/{state}/{city}/{variation}/ pattern, which has no
 * static equivalent.
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
    schemaJson = [JSON.parse(o.jsonLd)];
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

// Import variationPage after DEPS (circular-safe: variations module has no deps on this file)
import { variationPage } from "./apex-variations.js";

const VARIATION_RE =
  /^\/(mep-engineering|structural-engineering|civil-engineering)\/([a-z-]+)\/([a-z0-9-]+)\/(best|cost|commercial|residential|firm|services|hire|permit|near-me|emergency|repair-vs-replace|questions)\/?$/;

/** Mount the dynamic variation routes on the Express app. Call before static middleware. */
export function mountApexDynamicRoutes(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET" && req.method !== "HEAD") return next();
    // Skip anything with a file extension (assets, sitemaps, etc.)
    if (path.extname(req.path)) return next();

    const m = req.path.match(VARIATION_RE);
    if (!m) return next();

    const [, svc, state, city, variation] = m;
    // Alaska is excluded (49 licensed states only)
    if (state === "alaska") return next();
    // Unknown state slug → not our route
    if (!STATE_META[state]) return next();

    const html = variationPage(DEPS, svc, state, city, variation);
    if (!html) return next(); // unknown city → fall through to static/404 handling

    res.status(200);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("X-Renderer", "apex-dynamic");
    res.send(html);
  });

  console.log(
    `[apex-dynamic] mounted: ${VARIATION_SERVICES.length} services × ${Object.keys(STATE_META).length} states × ${PLACE_LOOKUP.size} cities × ${Object.keys(VARIATIONS).length} variations`
  );
}
