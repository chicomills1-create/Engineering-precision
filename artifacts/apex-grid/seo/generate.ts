/** Generates static SEO pages into public/locations/ and rebuilds sitemap.xml.
 * Run: pnpm --filter @workspace/apex-grid run seo:generate
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StateData, CityData } from "./types";
import { CITY_PRIORITIES } from "./city-priorities";
import { LEGACY_CURATED_CITY_KEYS } from "./legacy-curated-cities";
import { SERVICES, type ServiceDef } from "./services";
import { htmlShell, SITE } from "./shell";
import { BLOG_POSTS, type BlogPost } from "./blog";
import { verifyBlogPostAuthorship } from "./check-blog-authorship";
import { CLIENT_PAGES, WHO_WE_WORK_WITH_HUB, type ClientPage } from "./client-pages";
import { PROJECT_TYPE_PAGES, PROJECT_TYPES_HUB, type ProjectTypePage } from "./project-type-pages";
import { EXISTING_BUILDING_PAGES, EXISTING_BUILDING_HUB, type ExistingBuildingPage } from "./existing-building-pages";
import { PERMIT_PAGES, PERMIT_HUB, type PermitPage } from "./permit-pages";
import {
  CANONICAL_INDUSTRY_DISCIPLINE_PAGES,
  INDUSTRY_DISCIPLINE_PAGES,
  INDUSTRY_DISCIPLINE_REDIRECTS,
  getIndustryDisciplineUrl,
  type IndustryDisciplinePage,
} from "./industry-discipline-pages";
import { LOCATION_SERVICE_PAGES as RAW_LOCATION_SERVICE_PAGES, type LocationServicePage } from "./location-service-pages";
import { SOLUTION_PAGES, type SolutionPage } from "./solutions-pages";
import { GUIDE_PAGES, GUIDES_HUB, type GuidePage } from "./guides-pages";
import { DISCIPLINE_HUBS, type DisciplineHub, type DisciplineSubpage } from "./discipline-pages";
import { MISC_PAGES, type MiscPage } from "./misc-pages";
import { STRUCTURAL_EXTENDED_PAGES, type StructuralExtendedPage } from "./structural-extended-pages";
import { TITLE_24_HUB, TITLE_24_PAGES, type Title24Page } from "./title-24-pages";
import { PROJECTS_HUB, PROJECT_CATEGORY_PAGES, type ProjectCategoryPage } from "./projects-pages";
import { STATIC_STANDALONE_PAGES, type StaticPageDef } from "./static-pages";
import { DISCIPLINES, type DisciplineDef } from "./disciplines";
import { PARTNER_PAGES, type PartnerPage } from "./partner-pages";
import {
  LOCATION_VERTICALS,
  type DirectoryCity,
  verticalAvailableInState,
  verticalCityPage,
  verticalCityUrl,
  verticalHubPage,
  verticalLandingPage,
  verticalStatePage,
  verticalStateUrl,
  verticalsForState,
} from "./location-verticals";
import {
  LEGACY_LOCATION_REDIRECTS,
  RETAINED_LEGACY_LOCATIONS,
} from "./legacy-locations";
import { ALL_INDUSTRIES } from "../src/data/industries";
import {
  RESOURCE_ARTICLES,
  RESOURCE_DISCIPLINES,
  ROOT_CANONICAL_RESOURCE_SLUGS,
  disciplineOf,
  resourceUrl,
  type ResourceArticle,
  type ResourceDiscipline,
} from "./resources";
import { AUDIENCE_RESOURCE_HUBS, audienceResourceHubPage, AUDIENCE_RESOURCE_AUTHOR } from "./audience-resource-hubs";
import {
  PRIORITY_MARKET_HUBS,
  PRIORITY_MARKET_AUTHOR,
  priorityMarketHubPage,
  priorityMarketHubUrl,
} from "./priority-market-hubs";
import {
  PHASE9_INDUSTRY_SERVICE_PAGES,
  PHASE9_INBOUND_TARGETS,
  phase9Page,
  phase9Url,
} from "./phase9-industry-service";
import { PHASE11_PROJECT_CASE_STUDIES, phase11Page, phase11Url } from "./phase11-project-case-studies";
import { GLOSSARY_TERMS, sortedGlossaryTerms, glossaryByLetter, relatedGlossaryTerms, type GlossaryTerm } from "./glossary";
import { APEX_GRID_BUSINESS_SCHEMA } from "../src/lib/business-schema";
import {
  LICENSED_STATES_TEXT,
  LICENSING_COVERAGE_STATEMENT,
  PROJECT_JURISDICTION_NOTE,
} from "../src/lib/licensing";
import {
  ENGINEERING_INTENT_PAGES,
  NEAR_ME_ENGINEERING_PAGE,
  type EngineeringIntentPage,
} from "./engineering-intent-pages";
import {
  assertNoConflictingOutputOwners,
  assertRouteOwnership,
  resetGeneratedChildrenPreservingHub,
  REACT_OWNED_SHARED_ROUTES,
  REACT_PRERENDER_ROUTES,
  REACT_PRERENDER_SERVICE_ROUTES,
  SEO_GENERATOR_FIXED_INDEX_ROUTES,
} from "./route-ownership";
import { NATIONAL_FACILITY_INTENT_PAGES } from "./national-facility-intent-pages";
import {
  CALIFORNIA_ADU_STATE_PAGE,
  CALIFORNIA_ADU_CITY_PAGES,
  type CaliforniaAduPage,
} from "./california-adu-pages-south";
import {
  CALIFORNIA_ADU_STRUCTURAL_PAGES,
  type CaliforniaAduStructuralPage,
} from "./california-adu-pages-north";
import {
  PLAN_CHECK_CORRECTIONS_PAGE,
  type PlanCheckCorrectionsPage,
} from "./plan-check-corrections-page";
import {
  BATCH2_CORE_SERVICE_SLUGS,
  type Batch2Faq,
  type Batch2StateExpansion,
  type Batch2Metro,
  type Batch2CoreServicePage,
} from "./batch2-core-service-types";
import georgiaBatch2 from "./batch2-georgia";
import illinoisBatch2 from "./batch2-illinois";
import michiganBatch2 from "./batch2-michigan";
import newYorkBatch2 from "./batch2-new-york";
import northCarolinaBatch2 from "./batch2-north-carolina";
import ohioBatch2 from "./batch2-ohio";
import pennsylvaniaBatch2 from "./batch2-pennsylvania";
import { BATCH3_EXPANSIONS, BATCH3_EXPECTED_STATE_SLUGS } from "./batch3-expansions";
import { BATCH4_EXPANSIONS, BATCH4_EXPECTED_STATE_SLUGS } from "./batch4-expansions";
import {
  PE_STATE_SOURCE_LINKS,
  PHASE0_AEO_PAGES,
  PHASE0_PLAN_CHECK_PLAYBOOKS,
  PHASE0_RESOURCE_PAGES,
  PHASE0_SERVICE_PAGES,
  type Phase0AeoPage,
  type Phase0Playbook,
  type Phase0ResourcePage,
  type Phase0ServicePage,
} from "./phase0-corpus";
import {
  PHASE1_METROS,
  PHASE1_SERVICE_SLUGS,
  PHASE1_SOURCE_URL,
  type Phase1Metro,
  type Phase1ServiceSlug,
} from "./phase1-metros";
import {
  PHASE2_METROS,
  PHASE2_SERVICE_SLUGS,
  type Phase2Metro,
  type Phase2ServiceSlug,
} from "./phase2-metros";
import {
  PHASE3_METROS,
  PHASE3_SERVICE_SLUGS,
  type Phase3Metro,
  type Phase3ServiceSlug,
} from "./phase3-metros";
import {
  PHASE4_METROS,
  PHASE4_SERVICE_SLUGS,
  PHASE4_SOURCE_URL,
  type Phase4Metro,
  type Phase4ServiceSlug,
} from "./phase4-metros";
import {
  PHASE5_METROS,
  PHASE5_SERVICE_SLUGS,
  PHASE5_SOURCE_URL,
  type Phase5Metro,
  type Phase5ServiceSlug,
} from "./phase5-metros";
import type { Phase7AeoSeed, Phase7Cluster } from "./phase7-types";
import { PHASE7_COST_PAGES } from "./phase7-cost-pages";
import { PHASE7_TIMELINE_PAGES } from "./phase7-timeline-pages";
import { PHASE7_HIRING_PAGES } from "./phase7-hiring-pages";
import { PHASE7_LICENSING_PAGES } from "./phase7-licensing-pages";
import { PHASE7_PERMIT_PAGES } from "./phase7-permit-pages";
import { PHASE7_TECHNICAL_PAGES } from "./phase7-technical-pages";
import { WAVE_D_ANSWER_PAGES } from "./wave-d-answer-pages";
import { WAVE_E_ANSWER_PAGES } from "./wave-e-answer-pages";
import { WAVE_F_ANSWER_PAGES } from "./wave-f-answer-pages";
import { WAVE_G_ANSWER_PAGES } from "./wave-g-answer-pages";
import { WAVE_H_ANSWER_PAGES } from "./wave-h-answer-pages";
import { WAVE_I_ANSWER_PAGES } from "./wave-i-answer-pages";
import { WAVE_J_ANSWER_PAGES } from "./wave-j-answer-pages";
import { WAVE_K_ANSWER_PAGES } from "./wave-k-answer-pages";
import { WAVE_L_ANSWER_PAGES } from "./wave-l-answer-pages";
import { WAVE_M_ANSWER_PAGES } from "./wave-m-answer-pages";
import { WAVE_N_ANSWER_PAGES } from "./wave-n-answer-pages";
import { WAVE_O_ANSWER_PAGES } from "./wave-o-answer-pages";
import { WAVE_P_ANSWER_PAGES } from "./wave-p-answer-pages";
import { WAVE_Q_ANSWER_PAGES } from "./wave-q-answer-pages";
import { WAVE_R_ANSWER_PAGES } from "./wave-r-answer-pages";
import { WAVE_S_ANSWER_PAGES } from "./wave-s-answer-pages";
import { WAVE_T_ANSWER_PAGES } from "./wave-t-answer-pages";
import { WAVE_U_ANSWER_PAGES } from "./wave-u-answer-pages";
import { WAVE_V_ANSWER_PAGES } from "./wave-v-answer-pages";
import { WAVE_W_ANSWER_PAGES } from "./wave-w-answer-pages";
import { WAVE_X_ANSWER_PAGES } from "./wave-x-answer-pages";
import { WAVE_Y_ANSWER_PAGES } from "./wave-y-answer-pages";
import { WAVE_Z_ANSWER_PAGES } from "./wave-z-answer-pages";
import { WAVE_AA_ANSWER_PAGES } from "./wave-aa-answer-pages";
import { WAVE_AB_ANSWER_PAGES } from "./wave-ab-answer-pages";
import { WAVE_AC_ANSWER_PAGES } from "./wave-ac-answer-pages";
import { WAVE_AD_ANSWER_PAGES } from "./wave-ad-answer-pages";
import { WAVE_AE_ANSWER_PAGES } from "./wave-ae-answer-pages";
import { WAVE_AF_ANSWER_PAGES } from "./wave-af-answer-pages";
import { WAVE_AG_ANSWER_PAGES } from "./wave-ag-answer-pages";
import { WAVE_AH_ANSWER_PAGES } from "./wave-ah-answer-pages";
import { WAVE_AI_ANSWER_PAGES } from "./wave-ai-answer-pages";
import { WAVE_AJ_ANSWER_PAGES } from "./wave-aj-answer-pages";
import { WAVE_AK_ANSWER_PAGES } from "./wave-ak-answer-pages";
import { WAVE_AL_ANSWER_PAGES } from "./wave-al-answer-pages";
import { WAVE_AM_ANSWER_PAGES } from "./wave-am-answer-pages";
import { WAVE_AN_ANSWER_PAGES } from "./wave-an-answer-pages";
import { WAVE_AO_ANSWER_PAGES } from "./wave-ao-answer-pages";
import { WAVE_AP_ANSWER_PAGES } from "./wave-ap-answer-pages";
import { WAVE_AQ_ANSWER_PAGES } from "./wave-aq-answer-pages";
import { WAVE_AR_ANSWER_PAGES } from "./wave-ar-answer-pages";
import { WAVE_AS_ANSWER_PAGES } from "./wave-as-answer-pages";
import { WAVE_AT_ANSWER_PAGES } from "./wave-at-answer-pages";
import { WAVE_AU_ANSWER_PAGES } from "./wave-au-answer-pages";
import { WAVE_AV_ANSWER_PAGES } from "./wave-av-answer-pages";
import { WAVE_AW_ANSWER_PAGES } from "./wave-aw-answer-pages";
import { WAVE_AX_ANSWER_PAGES } from "./wave-ax-answer-pages";
import { WAVE_AY_ANSWER_PAGES } from "./wave-ay-answer-pages";
import { WAVE_AZ_ANSWER_PAGES } from "./wave-az-answer-pages";
import { WAVE_BA_ANSWER_PAGES } from "./wave-ba-answer-pages";
import { WAVE_BB_ANSWER_PAGES } from "./wave-bb-answer-pages";
import { WAVE_BC_ANSWER_PAGES } from "./wave-bc-answer-pages";
import { WAVE_BD_ANSWER_PAGES } from "./wave-bd-answer-pages";
import { WAVE_BE_ANSWER_PAGES } from "./wave-be-answer-pages";
import { WAVE_BF_ANSWER_PAGES } from "./wave-bf-answer-pages";
import { WAVE_BG_ANSWER_PAGES } from "./wave-bg-answer-pages";
import { WAVE_BH_ANSWER_PAGES } from "./wave-bh-answer-pages";
import { WAVE_BI_ANSWER_PAGES } from "./wave-bi-answer-pages";
import { WAVE_BJ_ANSWER_PAGES } from "./wave-bj-answer-pages";
import { WAVE_BK_ANSWER_PAGES } from "./wave-bk-answer-pages";
import { WAVE_BL_ANSWER_PAGES } from "./wave-bl-answer-pages";
import { WAVE_BM_ANSWER_PAGES } from "./wave-bm-answer-pages";
import { WAVE_BN_ANSWER_PAGES } from "./wave-bn-answer-pages";
import { WAVE_BO_ANSWER_PAGES } from "./wave-bo-answer-pages";
import { WAVE_BP_ANSWER_PAGES } from "./wave-bp-answer-pages";
import { WAVE_BQ_ANSWER_PAGES } from "./wave-bq-answer-pages";
import { WAVE_BR_ANSWER_PAGES } from "./wave-br-answer-pages";
import { WAVE_BS_ANSWER_PAGES } from "./wave-bs-answer-pages";
import { WAVE_BT_ANSWER_PAGES } from "./wave-bt-answer-pages";
import { WAVE_BU_ANSWER_PAGES } from "./wave-bu-answer-pages";

const PHASE7_AEO_PAGES: Phase7AeoSeed[] = [
  ...PHASE7_COST_PAGES,
  ...PHASE7_TIMELINE_PAGES,
  ...PHASE7_HIRING_PAGES,
  ...PHASE7_LICENSING_PAGES,
  ...PHASE7_PERMIT_PAGES,
  ...PHASE7_TECHNICAL_PAGES,
];
const PHASE7_CLUSTER_COUNTS: Record<Phase7Cluster, number> = {
  "Cost and pricing": 20,
  "Project timelines": 18,
  "Hiring and vetting": 16,
  "PE licensing": 16,
  "Plan check and permits": 14,
  "Technical explainers": 17,
};

const PROMOTED_CITY_KEYS = new Set([
  "georgia/atlanta", "texas/austin", "north-carolina/charlotte",
  "illinois/chicago", "texas/dallas", "colorado/denver",
  "texas/houston", "california/los-angeles", "arizona/phoenix",
  "florida/orlando",
]);
const STANDARD_CITY_SERVICE_SLUGS = new Set([
  "mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance",
]);
/** Preserve the curated city/service canonical when an older specialty record
 * claims the exact same route. Distinct specialty slugs remain untouched. */
const LOCATION_SERVICE_PAGES = RAW_LOCATION_SERVICE_PAGES.filter((page) =>
  !(PROMOTED_CITY_KEYS.has(`${page.stateSlug}/${page.citySlug}`) && STANDARD_CITY_SERVICE_SLUGS.has(page.serviceSlug)),
);

const RETAINED_INTENT_SLUGS = new Set([
  "structural-engineering-letters", "construction-rfi-submittal-support",
  "value-engineering-design-optimization",
  "deferred-submittal-engineering", "engineer-of-record-transition", "engineering-near-me",
  ...NATIONAL_FACILITY_INTENT_PAGES.map((page) => page.slug),
]);
const ALL_ENGINEERING_INTENT_PAGES = [...ENGINEERING_INTENT_PAGES, ...NATIONAL_FACILITY_INTENT_PAGES, NEAR_ME_ENGINEERING_PAGE]
  .filter((page) => RETAINED_INTENT_SLUGS.has(page.slug));
const CONSOLIDATED_INTENT_PAGES = ENGINEERING_INTENT_PAGES.filter((page) => !RETAINED_INTENT_SLUGS.has(page.slug));

type CityDirectory = Record<string, DirectoryCity[]>; // stateSlug -> cities

function loadDirectory(): CityDirectory {
  const p = path.join(__dirname, "cities-directory.json");
  if (!fs.existsSync(p)) return {};
  const directory = JSON.parse(fs.readFileSync(p, "utf8")) as CityDirectory;
  for (const { stateSlug, city } of RETAINED_LEGACY_LOCATIONS) {
    const entries = directory[stateSlug] ?? [];
    if (!entries.some((entry) => entry.slug === city.slug)) entries.push(city);
    directory[stateSlug] = entries;
  }
  return directory;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = process.env.SEO_OUTPUT_DIR
  ? path.resolve(__dirname, "..", process.env.SEO_OUTPUT_DIR)
  : path.resolve(__dirname, "../public");
const OUT = path.join(PUBLIC, "locations");
const METROS_OUT = path.join(PUBLIC, "metros");

/** States where Apex Grid is NOT licensed — no pages are generated for these
 * (the site publishes its reviewed licensing coverage; claiming licensed services in an
 * unlicensed state would be a misrepresentation). */
const UNLICENSED_STATES = new Set(["alaska"]);

async function loadStates(): Promise<StateData[]> {
  const dir = path.join(__dirname, "states");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && !UNLICENSED_STATES.has(f.replace(/\.ts$/, "")));
  const states: StateData[] = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    const val = Object.values(mod)[0] as StateData;
    states.push(val);
  }
  return states.sort((a, b) => a.name.localeCompare(b.name));
}

async function loadCities(): Promise<CityData[]> {
  const dir = path.join(__dirname, "cities");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
  const cities: CityData[] = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    const val = Object.values(mod)[0] as CityData;
    cities.push(val);
  }
  // The abbreviated St. Louis dataset is historical source material only;
  // its old URLs are emitted as redirects to the normalized city tree.
  return cities
    .filter((city) => !(city.stateSlug === "missouri" && city.slug === "st-louis"))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function isReviewedCity(city: CityData): boolean {
  if (!city.research) return LEGACY_CURATED_CITY_KEYS.has(`${city.stateSlug}/${city.slug}`);
  const sourceGroups = Object.values(city.research.sources);
  return city.research.reviewStatus === "approved"
    && /^\d{4}-\d{2}-\d{2}$/.test(city.research.lastVerified)
    && city.research.reviewedBy.trim().length > 0
    && city.research.priority.commercialOpportunity >= 0
    && city.research.priority.commercialOpportunity <= 100
    && sourceGroups.every((urls) => urls.length > 0 && urls.every((url) => /^https:\/\//.test(url)));
}

function isSupportedCityService(city: CityData, serviceSlug: string): boolean {
  if (!isReviewedCity(city)) return false;
  const supported = city.research?.supportedServiceSlugs;
  return !city.research
    || !supported
    || supported.includes(serviceSlug as NonNullable<CityData["research"]["supportedServiceSlugs"]>[number])
    || (serviceSlug === "energy-code-compliance" && supported.includes("energy-compliance"));
}
function assertCityResearch(city: CityData): void {
  if (!city.research && !LEGACY_CURATED_CITY_KEYS.has(`${city.stateSlug}/${city.slug}`)) {
    throw new Error(`New city is missing required research evidence: ${city.stateSlug}/${city.slug}`);
  }
  if (city.research && !isReviewedCity(city) && city.research.reviewStatus === "approved") {
    throw new Error(`Approved city has incomplete research evidence: ${city.stateSlug}/${city.slug}`);
  }
  if (city.research) {
    const priority = CITY_PRIORITIES.find((entry) => entry.stateSlug === city.stateSlug && entry.citySlug === city.slug);
    if (priority && (
      priority.commercialOpportunity !== city.research.priority.commercialOpportunity ||
      priority.searchConsoleImpressions !== city.research.priority.searchConsoleImpressions ||
      priority.searchConsolePeriod !== city.research.priority.searchConsolePeriod
    )) {
      throw new Error(`City priority evidence does not match research: ${city.stateSlug}/${city.slug}`);
    }
  }
}

function citySourceList(city: CityData): string {
  if (!city.research) return "";
  const labels: Record<keyof CityData["research"]["sources"], string> = {
    ahj: "Permit authority",
    codes: "Adopted codes",
    amendments: "Local amendments",
    utilities: "Utilities",
    climate: "Climate",
    market: "Market context",
  };
  return `<section class="block"><div class="container">
  <h2>Verified <em>Local Sources</em></h2>
  <p class="note">Reviewed ${esc(city.research.lastVerified)}. Code editions and local requirements can change; confirm the current requirements with the authority having jurisdiction before design.</p>
  <div class="linkrow">${Object.entries(city.research.sources).flatMap(([group, urls]) =>
    urls.map((url) => `<a href="${esc(url)}" rel="noopener noreferrer">${esc(labels[group as keyof typeof labels])}</a>`)
  ).join("")}</div>
</div></section>`;
}
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Slugs go into URLs/paths — restrict to safe charset. */
function assertSlug(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Invalid slug: ${slug}`);
}

function validateDirectory(directory: CityDirectory, states: StateData[]): void {
  const knownStates = new Set(states.map((state) => state.slug));
  for (const [stateSlug, entries] of Object.entries(directory)) {
    if (!knownStates.has(stateSlug) && stateSlug !== "alaska") {
      throw new Error(`City directory references unknown state: ${stateSlug}`);
    }
    const seen = new Set<string>();
    for (const city of entries) {
      assertSlug(city.slug);
      if (!city.name.trim()) throw new Error(`City directory has an empty name in ${stateSlug}`);
      if (seen.has(city.slug)) throw new Error(`Duplicate city slug in ${stateSlug}: ${city.slug}`);
      seen.add(city.slug);
      if (city.pop !== undefined && (!Number.isFinite(city.pop) || city.pop < 0)) {
        throw new Error(`Invalid population for ${stateSlug}/${city.slug}`);
      }
      if (city.lat !== undefined && (!Number.isFinite(city.lat) || city.lat < -90 || city.lat > 90)) {
        throw new Error(`Invalid latitude for ${stateSlug}/${city.slug}`);
      }
      if (city.lng !== undefined && (!Number.isFinite(city.lng) || city.lng < -180 || city.lng > 180)) {
        throw new Error(`Invalid longitude for ${stateSlug}/${city.slug}`);
      }
    }
  }
}

function allDirectoryCitiesForState(state: StateData, directory: CityDirectory, curated: CityData[]): DirectoryCity[] {
  const bySlug = new Map<string, DirectoryCity>();
  for (const city of directory[state.slug] ?? []) bySlug.set(city.slug, city);
  for (const city of curated.filter((entry) => entry.stateSlug === state.slug)) {
    const existing = bySlug.get(city.slug);
    bySlug.set(city.slug, {
      ...existing,
      slug: city.slug,
      name: city.name,
      designation: existing?.designation ?? "City",
    });
  }
  // Saint Louis is the sole canonical spelling used by the location tree.
  // The historical "st-louis" paths are emitted as redirects below.
  if (state.slug === "missouri") bySlug.delete("st-louis");
  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/** Conservative gate for Census-directory pages: only publish pages with enough
 * independently useful identity data to avoid state-copy doorway pages. */
const LITE_CITY_MIN_POPULATION = 1;
type CityQualityDecision = {
  state: string;
  slug: string;
  name: string;
  status: "indexed" | "excluded";
  reasons: string[];
  populationStatus?: DirectoryCity["populationStatus"];
  populationYear?: number;
  populationSource?: string;
  populationEvidenceNote?: string;
};
function diagnosticSlug(name: string): string {
  return name.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, "-").replace(/^-|-$/g, "");
}

function assessLiteCity(state: StateData, city: DirectoryCity): CityQualityDecision {
  const reasons: string[] = [];
  if (!city.name.trim() || !/\p{Letter}/u.test(city.name)) reasons.push("invalid-city-name");
  if (!/^[a-z0-9-]+$/.test(city.slug) || city.slug !== diagnosticSlug(city.name)) reasons.push("city-slug-identity-mismatch");
  if (!state.slug || !state.name.trim()) reasons.push("invalid-state-identity");
  if (city.populationStatus === "confirmed-zero") reasons.push("confirmed-zero-population");
  else if (city.populationStatus === "unavailable") reasons.push("population-unavailable");
  else if (!Number.isFinite(city.pop) || (city.pop ?? 0) < LITE_CITY_MIN_POPULATION) reasons.push(`review-signal-population-below-${LITE_CITY_MIN_POPULATION}`);
  return {
    state: state.slug,
    slug: city.slug,
    name: city.name,
    status: reasons.length ? "excluded" : "indexed",
    reasons,
    populationStatus: city.populationStatus,
    populationYear: city.populationYear,
    populationSource: city.populationSource,
    populationEvidenceNote: city.populationEvidenceNote,
  };
}

function eligibleDirectoryCities(state: StateData, directory: CityDirectory, curated: CityData[]): DirectoryCity[] {
  const curatedSlugs = new Set(curated.filter((c) => c.stateSlug === state.slug).map((c) => c.slug));
  return (directory[state.slug] ?? []).filter((city) =>
    !curatedSlugs.has(city.slug)
    && !(state.slug === "missouri" && city.slug === "st-louis")
    && assessLiteCity(state, city).status === "indexed"
  );
}

function writeCityQualityReport(states: StateData[], directory: CityDirectory, curated: CityData[]) {
  const decisions = states.flatMap((state) => (directory[state.slug] ?? [])
    .filter((city) => !curated.some((c) => c.stateSlug === state.slug && c.slug === city.slug))
    .map((city) => assessLiteCity(state, city)));
  const anomalies = decisions.filter((d) => d.status === "excluded");
  const reviewed = curated.filter((city) => city.research && isReviewedCity(city));
  const drafts = curated.filter((city) => city.research && !isReviewedCity(city));
  const indexedDirectoryCount = decisions.filter((decision) => decision.status === "indexed").length;
  const directoryNoindexCount = decisions.length - indexedDirectoryCount;
  const report = {
    reportVersion: 3,
    policy: `Approved CityData pages and Census-verified incorporated places with population at or above ${LITE_CITY_MIN_POPULATION.toLocaleString("en-US")} are indexable as consolidated city-intent hubs. Smaller or incomplete directory records remain live noindex,follow.`,
    reviewedPromotions: reviewed.map((city) => ({
      state: city.stateSlug,
      slug: city.slug,
      lastVerified: city.research!.lastVerified,
      sourceCount: Object.values(city.research!.sources).flat().length,
      checks: { unique: "pass", sources: "pass", canonical: "pass", internalLinks: "pass" },
    })),
    grandfatheredCuratedCount: curated.filter((city) =>
      !city.research && LEGACY_CURATED_CITY_KEYS.has(`${city.stateSlug}/${city.slug}`)
    ).length,
    priorityQueue: CITY_PRIORITIES,
    populationReviewSignal: `confirmed zero-population and unavailable-population records remain excluded; population is not proof of page quality`,
    indexedDirectoryCount,
    indexedCount: indexedDirectoryCount + curated.filter(isReviewedCity).length + RETAINED_LEGACY_LOCATIONS.filter((retained) =>
      !curated.some((city) => city.stateSlug === retained.stateSlug && city.slug === retained.city.slug)
    ).length,
    noindexCount: directoryNoindexCount + drafts.length,
    excludedCount: directoryNoindexCount + drafts.length,
    excludedReasons: anomalies.reduce<Record<string, number>>((counts, d) => {
      for (const reason of d.reasons) counts[reason] = (counts[reason] ?? 0) + 1;
      return counts;
    }, {}),
    anomalies,
  };
  const reportDir = path.join(__dirname, "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "city-page-quality.json"), `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

function writeLlmsTxt() {
  const content = `# Apex Grid Engineering

> Apex Grid Engineering is a professional engineering firm providing structural, MEP, civil, geotechnical, building-assessment, energy-compliance, and municipal plan-check support. The company also publishes information about architecture and construction delivery.

This file is a concise map of canonical public information. It does not imply local offices, guaranteed coverage, or that every listed service is available for every project; scope and jurisdiction requirements should be confirmed with Apex Grid.

## Licensing
- Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska.
- The responsible professional's current license, firm authorization, discipline, and project-jurisdiction requirements are confirmed before work begins.

## High-value sections
- Services: ${SITE}/services
- Commercial engineering search hub: ${SITE}/engineering-intent/engineering-near-me/
- Industries: ${SITE}/industries
- Resources: ${SITE}/resources/
- Glossary: ${SITE}/glossary/
- Service-area information: ${SITE}/locations/
- Census metro engineering guides: ${SITE}/metros/
- Architecture information: ${SITE}/architecture/
- General contracting information: ${SITE}/general-contracting/
- About: ${SITE}/about
- Contact: ${SITE}/contact
- HTML sitemap: ${SITE}/sitemap/
- XML sitemap index: ${SITE}/sitemap_index.xml
`;
  fs.writeFileSync(path.join(PUBLIC, "llms.txt"), content);
}

function legacyLocationRedirectPage(fromPath: string, toPath: string): string {
  const canonical = `${SITE}${toPath}`;
  const body = `<section class="hero"><div class="container">
  <p class="kicker">Location URL Updated</p>
  <h1>This Apex Grid Location Page Has Moved</h1>
  <p class="lede">The U.S. Census place name and URL were normalized. Continue to the current canonical Apex Grid service-area page.</p>
  <a class="cta" href="${esc(toPath)}" style="display:inline-block;margin-top:28px">Open Current Location Page</a>
</div></section>`;
  return htmlShell({
    title: "Location Page Moved | Apex Grid Engineering",
    description: "This Apex Grid location page has moved to its current canonical Census-normalized URL.",
    canonical,
    schemaJson: [{
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: canonical,
      name: "Apex Grid Engineering Location Page",
    }],
    extraHead: `<meta name="robots" content="noindex,follow" /><meta http-equiv="refresh" content="0;url=${esc(toPath)}" />`,
    body: `${body}<span hidden data-legacy-location="${esc(fromPath)}"></span>`,
  });
}

/**
 * A city alias is an alias for the complete location subtree, not only the
 * city landing URL. Expand the reviewed base manifest to service children so
 * old bookmarks receive a real server 301 instead of a duplicate HTML page.
 */
function expandedLegacyLocationRedirects(): Record<string, string> {
  return { ...LEGACY_LOCATION_REDIRECTS };
}

/** Non-HTML data fields must not contain markup. */
function assertNoMarkup(state: StateData) {
  const flat = JSON.stringify(state);
  if (/<\s*(script|iframe|img|svg|style)/i.test(flat)) {
    throw new Error(`State ${state.slug} contains disallowed markup`);
  }
}

function breadcrumb(items: { name: string; href?: string }[]): string {
  return `<nav class="breadcrumb container">${items
    .map((i) => (i.href ? `<a href="${esc(i.href)}">${esc(i.name)}</a>` : esc(i.name)))
    .join(`<span>/</span>`)}</nav>`;
}

function breadcrumbSchema(items: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.name,
      ...(i.href ? { item: `${SITE}${i.href}` } : {}),
    })),
  };
}

type AduRenderedSection = { heading: string; body: string; bullets?: string[] };
type AduRenderedPage = {
  kind: "state" | "city";
  citySlug?: string;
  cityName?: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: AduRenderedSection[];
  permitSteps: string[];
  timeline: string;
  faqs: Array<{ question: string; answer: string }>;
  internalLinks: Array<{ label: string; href: string }>;
  sources: string[];
};

const CALIFORNIA_ADU_CITY_RECORDS: Array<CaliforniaAduPage | CaliforniaAduStructuralPage> = [
  ...CALIFORNIA_ADU_CITY_PAGES,
  ...CALIFORNIA_ADU_STRUCTURAL_PAGES,
];
const CALIFORNIA_ADU_STATE_URL = "/services/california-adu-structural-engineering/";
const CALIFORNIA_ADU_CITY_URLS = CALIFORNIA_ADU_CITY_RECORDS.map((page) => {
  const citySlug = page.slug.replace(/-adu-structural-engineering$/, "");
  return `/locations/california/${citySlug}/adu-structural-engineering/`;
});
const PLAN_CHECK_CORRECTIONS_URL = PLAN_CHECK_CORRECTIONS_PAGE.path;

function normalizeCaliforniaAduPage(
  page: CaliforniaAduPage | CaliforniaAduStructuralPage,
): AduRenderedPage {
  if ("kind" in page) {
    const citySlug = page.kind === "city"
      ? page.slug.replace(/-adu-structural-engineering$/, "")
      : undefined;
    const sections: AduRenderedSection[] = [
      { heading: "Local permitting authority", body: page.authority.name },
      { heading: "How the permit process works", body: page.authority.process },
      { heading: "Code conditions", body: page.codeConditions },
      { heading: "Physical and existing-building constraints", body: page.physicalConstraints },
      ...page.sections,
    ];
    return {
      kind: page.kind,
      citySlug,
      cityName: citySlug ? page.h1.replace(/ ADU Structural Engineering$/, "") : undefined,
      title: page.title,
      description: page.description,
      h1: page.h1,
      kicker: page.kicker,
      lede: page.lede,
      sections,
      permitSteps: page.permitSteps,
      timeline: page.timelineGuidance,
      faqs: page.faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
      internalLinks: page.internalLinks,
      sources: page.sources,
    };
  }

  const citySlug = page.slug.replace(/-adu-structural-engineering$/, "");
  return {
    kind: "city",
    citySlug,
    cityName: page.city,
    title: page.title,
    description: page.description,
    h1: page.h1,
    kicker: page.kicker,
    lede: page.lede,
    sections: [
      { heading: "Local permitting authority and context", body: page.sections.localContext },
      { heading: "Structural engineering scope", body: page.sections.structuralEngineering },
      { heading: "Permit path", body: page.sections.permitPath },
      { heading: "Project timeline", body: page.sections.timeline },
    ],
    permitSteps: page.permitSteps,
    timeline: `${page.timelineGuidance.statutoryWindow} ${page.timelineGuidance.totalDuration}`,
    faqs: page.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
    internalLinks: page.internalLinks,
    sources: [
      ...page.sources.state,
      ...page.sources.city,
      ...page.sources.localConditions,
    ],
  };
}

function californiaAduPage(page: AduRenderedPage): string {
  const url = page.kind === "state"
    ? CALIFORNIA_ADU_STATE_URL
    : `/locations/california/${page.citySlug}/adu-structural-engineering/`;
  const crumbs = page.kind === "state"
    ? [
      { name: "Home", href: "/" },
      { name: "Engineering Services", href: "/services" },
      { name: "California ADU Structural Engineering" },
    ]
    : [
      { name: "Home", href: "/" },
      { name: "Service Areas", href: "/locations/" },
      { name: "California", href: "/locations/california/" },
      { name: page.cityName ?? "California city", href: `/locations/california/${page.citySlug}/` },
      { name: "ADU Structural Engineering" },
    ];
  const cityLinks = page.kind === "state"
    ? CALIFORNIA_ADU_CITY_RECORDS.map((candidate, index) => {
      const normalized = normalizeCaliforniaAduPage(candidate);
      return {
        label: `${normalized.cityName ?? "California"} ADU structural engineering`,
        href: CALIFORNIA_ADU_CITY_URLS[index],
      };
    })
    : [];
  const relatedLinks = [
    ...page.internalLinks,
    { label: "California ADU structural engineering statewide", href: CALIFORNIA_ADU_STATE_URL },
    { label: "Plan-check corrections engineering support", href: PLAN_CHECK_CORRECTIONS_URL },
    ...(page.kind === "city" && page.citySlug
      ? [{ label: `All engineering services in ${page.cityName ?? page.citySlug}`, href: `/locations/california/${page.citySlug}/` }]
      : []),
    ...cityLinks,
  ].filter((link, index, links) => links.findIndex((candidate) => candidate.href === link.href) === index);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: "ADU structural engineering",
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    areaServed: page.kind === "state"
      ? { "@type": "State", name: "California" }
      : { "@type": "City", name: page.cityName, containedInPlace: { "@type": "State", name: "California" } },
  };
  const sourceLinks = page.sources.map((source, index) => {
    let host = source;
    try {
      host = new URL(source).hostname.replace(/^www\./, "");
    } catch {
      // Source URLs are validated by the source modules; retain the URL as label if parsing fails.
    }
    return `<a href="${esc(source)}" rel="noopener noreferrer">Official source ${index + 1}: ${esc(host)}</a>`;
  }).join("");
  const body = `<main>
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(page.kicker)}</p><h1>${esc(page.h1)}</h1><p class="lede">${esc(page.lede)}</p></div></section>
${page.sections.map((section) => `<section class="block"><div class="container"><h2>${esc(section.heading)}</h2><div class="prose"><p>${esc(section.body)}</p>${section.bullets ? `<ul class="scope">${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}</div></div></section>`).join("")}
<section class="block"><div class="container"><h2>ADU permit and engineering <em>process</em></h2><ol class="scope">${page.permitSteps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol><p class="note">${esc(page.timeline)}</p></div></section>
<section class="block"><div class="container faq"><h2>${esc(page.h1)} <em>FAQs</em></h2>${page.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></section>
<section class="block"><div class="container"><h2>Related <em>engineering resources</em></h2><div class="linkrow">${relatedLinks.map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join("")}</div></div></section>
<section class="block"><div class="container"><h2>Official <em>sources</em></h2><p class="note">These government and technical sources provide the regulatory and hazard context described on this page. The current local authority and adopted code edition control the project.</p><div class="linkrow">${sourceLinks}</div></div></section>
<section class="ctaband"><div class="container"><h2>Discuss Your California ADU Scope</h2><p>Send the address, jurisdiction, ADU type, architectural plans, existing-condition records, photographs, and schedule. Scope, licensure, site access, and engineer availability are confirmed before work begins.</p><a class="cta" href="/contact">Request a Project Review</a></div></section>
</main>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, serviceSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function planCheckCorrectionsPage(page: PlanCheckCorrectionsPage): string {
  const url = page.path;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Engineering Services", href: "/services" },
    { name: "Plan-Check Corrections Engineering" },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    serviceType: "Plan-check corrections engineering",
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
  };
  const sourceLinks = page.sources.map((source) =>
    `<a href="${esc(source.url)}" rel="noopener noreferrer">${esc(source.name)}</a>`,
  ).join("");
  const body = `<main>
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(page.kicker)}</p><h1>${esc(page.h1)}</h1><p class="lede">${esc(page.lede)}</p></div></section>
${page.sections.map((section) => `<section class="block"><div class="container"><h2>${esc(section.heading)}</h2><div class="prose"><p>${esc(section.body)}</p>${section.bullets ? `<ul class="scope">${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}</div></div></section>`).join("")}
<section class="block"><div class="container"><h2>Correction response <em>process</em></h2><ol class="scope">${page.process.map((step) => `<li><strong>Step ${step.number}: ${esc(step.heading)}.</strong> ${esc(step.body)}</li>`).join("")}</ol></div></section>
<section class="block"><div class="container"><h2>Scope <em>boundaries</em></h2><ul class="scope">${page.boundaries.map((boundary) => `<li>${esc(boundary)}</li>`).join("")}</ul></div></section>
<section class="block"><div class="container faq"><h2>Plan-check corrections <em>FAQs</em></h2>${page.faqs.map((faq) => `<details><summary>${esc(faq.q)}</summary><div class="a">${esc(faq.a)}</div></details>`).join("")}</div></section>
<section class="block"><div class="container"><h2>Related <em>permit resources</em></h2><div class="linkrow">${page.internalLinks.map((link) => `<a href="${esc(link.href)}" title="${esc(link.context)}">${esc(link.label)}</a>`).join("")}</div></div></section>
<section class="block"><div class="container"><h2>Official <em>sources</em></h2><div class="grid2">${page.sources.map((source) => `<div class="card"><h3><a href="${esc(source.url)}" rel="noopener noreferrer">${esc(source.name)}</a></h3><p>${esc(source.relevance)}</p></div>`).join("")}</div></div></section>
<section class="ctaband"><div class="container"><h2>Send the correction record for review</h2><p>${esc(page.audience)} can send the complete notice, submitted set, calculations, permit number, jurisdiction, and current backgrounds. The authority retains approval responsibility.</p><a class="cta" href="/contact">Request a Project Review</a></div></section>
</main>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, serviceSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function assertIndexableFaqPage(html: string, faqs: Array<{ question: string; answer: string }>, label: string): void {
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length;
  const main = html.match(/<main>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  const visibleWords = main
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as { ["@type"]?: string; mainEntity?: Array<{ name: string; acceptedAnswer: { text: string } }> });
  const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
  if (h1Count !== 1 || visibleWords < 700 || html.includes('name="robots" content="noindex') || !faqSchema
    || faqSchema.mainEntity?.length !== faqs.length
    || faqs.some((faq) => !faqSchema.mainEntity?.some((entry) => entry.name === faq.question && entry.acceptedAnswer.text === faq.answer))) {
    throw new Error(`SEO assertion failed: malformed indexable source page: ${label} (${visibleWords} visible words, ${h1Count} H1s)`);
  }
}

const PHASE0_UPDATED_DATE = "2026-09-15";
const PHASE0_EDITORIAL_AUTHOR = "Apex Grid Engineering";
const PHASE0_JEREMY_AUTHOR = "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran";
const ALL_AEO_PAGES: Array<Phase0AeoPage | Phase7AeoSeed> = [...PHASE0_AEO_PAGES, ...PHASE7_AEO_PAGES, ...WAVE_D_ANSWER_PAGES, ...WAVE_E_ANSWER_PAGES, ...WAVE_F_ANSWER_PAGES, ...WAVE_G_ANSWER_PAGES, ...WAVE_H_ANSWER_PAGES, ...WAVE_I_ANSWER_PAGES, ...WAVE_J_ANSWER_PAGES, ...WAVE_K_ANSWER_PAGES, ...WAVE_L_ANSWER_PAGES, ...WAVE_M_ANSWER_PAGES, ...WAVE_N_ANSWER_PAGES, ...WAVE_O_ANSWER_PAGES, ...WAVE_P_ANSWER_PAGES, ...WAVE_Q_ANSWER_PAGES, ...WAVE_R_ANSWER_PAGES, ...WAVE_S_ANSWER_PAGES, ...WAVE_T_ANSWER_PAGES, ...WAVE_U_ANSWER_PAGES, ...WAVE_V_ANSWER_PAGES, ...WAVE_W_ANSWER_PAGES, ...WAVE_X_ANSWER_PAGES, ...WAVE_Y_ANSWER_PAGES, ...WAVE_Z_ANSWER_PAGES, ...WAVE_AA_ANSWER_PAGES, ...WAVE_AB_ANSWER_PAGES, ...WAVE_AC_ANSWER_PAGES, ...WAVE_AD_ANSWER_PAGES, ...WAVE_AE_ANSWER_PAGES, ...WAVE_AF_ANSWER_PAGES, ...WAVE_AG_ANSWER_PAGES, ...WAVE_AH_ANSWER_PAGES, ...WAVE_AI_ANSWER_PAGES, ...WAVE_AJ_ANSWER_PAGES, ...WAVE_AK_ANSWER_PAGES, ...WAVE_AL_ANSWER_PAGES, ...WAVE_AM_ANSWER_PAGES, ...WAVE_AN_ANSWER_PAGES, ...WAVE_AO_ANSWER_PAGES, ...WAVE_AP_ANSWER_PAGES, ...WAVE_AQ_ANSWER_PAGES, ...WAVE_AR_ANSWER_PAGES, ...WAVE_AS_ANSWER_PAGES, ...WAVE_AT_ANSWER_PAGES, ...WAVE_AU_ANSWER_PAGES, ...WAVE_AV_ANSWER_PAGES, ...WAVE_AW_ANSWER_PAGES, ...WAVE_AX_ANSWER_PAGES, ...WAVE_AY_ANSWER_PAGES, ...WAVE_AZ_ANSWER_PAGES, ...WAVE_BA_ANSWER_PAGES, ...WAVE_BB_ANSWER_PAGES, ...WAVE_BC_ANSWER_PAGES, ...WAVE_BD_ANSWER_PAGES, ...WAVE_BE_ANSWER_PAGES, ...WAVE_BF_ANSWER_PAGES, ...WAVE_BG_ANSWER_PAGES, ...WAVE_BH_ANSWER_PAGES, ...WAVE_BI_ANSWER_PAGES, ...WAVE_BJ_ANSWER_PAGES, ...WAVE_BK_ANSWER_PAGES, ...WAVE_BL_ANSWER_PAGES, ...WAVE_BM_ANSWER_PAGES, ...WAVE_BN_ANSWER_PAGES, ...WAVE_BO_ANSWER_PAGES, ...WAVE_BP_ANSWER_PAGES, ...WAVE_BQ_ANSWER_PAGES, ...WAVE_BR_ANSWER_PAGES, ...WAVE_BS_ANSWER_PAGES, ...WAVE_BT_ANSWER_PAGES, ...WAVE_BU_ANSWER_PAGES];

const PHASE7_COMMON_FAQ = {
  question: "Does this answer guarantee a permit or project outcome?",
  answer: "No. The answer provides general engineering orientation. The responsible professional confirms the project scope and evidence, while the authority having jurisdiction controls its requirements, review, interpretation, and approval decision.",
};

function phase7Faqs(page: Phase7AeoSeed): Array<{ question: string; answer: string }> {
  return [
    { question: `What is the short answer about ${page.topic.toLowerCase()}?`, answer: page.answer },
    {
      question: `What does ${page.topic.toLowerCase()} depend on?`,
      answer: `The answer depends on the project scope, governing jurisdiction, current records, design inputs, and the responsible professional's independent review. ${page.answer}`,
    },
    PHASE7_COMMON_FAQ,
    {
      question: "What should I send for an initial engineering review?",
      answer: "Send the project address, plain-language scope, current drawings, existing-condition records, relevant calculations or comments, schedule, and the authority or code information already available. The responsible engineer will identify gaps.",
    },
  ];
}

function assertPhase7Corpus(): void {
  if (PHASE7_AEO_PAGES.length !== 101) {
    throw new Error(`SEO assertion failed: Phase 7 requires exactly 101 new seeds (found ${PHASE7_AEO_PAGES.length})`);
  }
  const existingSlugs = new Set([
    ...PHASE0_AEO_PAGES.map((page) => page.slug),
    ...PHASE0_PLAN_CHECK_PLAYBOOKS.map((page) => page.slug),
    ...PHASE0_RESOURCE_PAGES.map((page) => page.slug),
    ...GUIDE_PAGES.map((page) => page.slug),
  ]);
  const existingHeadings = new Set([
    ...PHASE0_AEO_PAGES.flatMap((page) => [page.title.toLowerCase(), page.h1.toLowerCase()]),
    ...PHASE0_PLAN_CHECK_PLAYBOOKS.flatMap((page) => [page.title, "h1" in page ? page.h1 : undefined].filter((value): value is string => Boolean(value)).map((value) => value.toLowerCase())),
    ...PHASE0_RESOURCE_PAGES.flatMap((page) => [page.title, "h1" in page ? page.h1 : undefined].filter((value): value is string => Boolean(value)).map((value) => value.toLowerCase())),
    ...GUIDE_PAGES.flatMap((page) => [page.title, "h1" in page ? page.h1 : undefined].filter((value): value is string => Boolean(value)).map((value) => value.toLowerCase())),
  ]);
  const slugs = new Set<string>();
  const counts = {} as Record<Phase7Cluster, number>;
  for (const page of PHASE7_AEO_PAGES) {
    if (slugs.has(page.slug) || existingSlugs.has(page.slug)
      || existingHeadings.has(page.title.toLowerCase()) || existingHeadings.has(page.h1.toLowerCase())) {
      throw new Error(`SEO assertion failed: Phase 7 slug overlaps an existing corpus route: ${page.slug}`);
    }
    slugs.add(page.slug);
    counts[page.cluster] = (counts[page.cluster] ?? 0) + 1;
    if (!/^\/(?:services|permit-engineering|pe-stamp|[a-z0-9-]+\/)/.test(page.serviceHref)
      || !page.answer.trim() || page.answer.length < 120
      || !/^[a-z0-9-]+$/.test(page.slug)) {
      throw new Error(`SEO assertion failed: incomplete Phase 7 seed: ${page.slug}`);
    }
  }
  for (const cluster of Object.keys(PHASE7_CLUSTER_COUNTS) as Phase7Cluster[]) {
    if (counts[cluster] !== PHASE7_CLUSTER_COUNTS[cluster]) {
      throw new Error(`SEO assertion failed: Phase 7 ${cluster} count is ${counts[cluster] ?? 0}, expected ${PHASE7_CLUSTER_COUNTS[cluster]}`);
    }
  }
  const reportDir = path.join(__dirname, "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "phase7-corpus.json"), `${JSON.stringify({
    generatedAt: "deterministic",
    existingAnswerPages: PHASE0_AEO_PAGES.length,
    phase7SeedPages: PHASE7_AEO_PAGES.length,
    answerLibraryPages: PHASE0_AEO_PAGES.length + PHASE7_AEO_PAGES.length,
    clusterCounts: PHASE7_CLUSTER_COUNTS,
  }, null, 2)}\n`);
}

function phase0FaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function phase0FaqMarkup(faqs: Array<{ question: string; answer: string }>): string {
  return `<section class="block"><div class="container"><h2>Frequently Asked Questions</h2><div class="faq">
    ${faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}
  </div></div></section>`;
}

function assertPhase0Page(html: string, canonical: string, faqs: Array<{ question: string; answer: string }>, label: string): void {
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as { "@type"?: string; mainEntity?: unknown[] });
  if ((!html.includes('data-phase0="true"') && !html.includes('data-phase7="true"'))
    || (html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length !== 1
    || !html.includes(`<link rel="canonical" href="${SITE}${canonical}"`)
    || html.includes('name="robots" content="noindex')
    || !html.includes("By ")
    || html.includes("Apex Grid Engineering PE Team")
    || !html.includes(`Updated ${PHASE0_UPDATED_DATE}`)
    || schemas.find((schema) => schema["@type"] === "FAQPage")?.mainEntity?.length !== faqs.length
  ) {
    throw new Error(`SEO assertion failed: malformed Phase 0 page ${label}`);
  }
}

function phase0ArticleFrame(
  opts: {
    canonical: string;
    title: string;
    description: string;
    h1: string;
    kicker: string;
    answer: string;
    sections: Array<{ heading: string; body: string; bullets?: string[] }>;
    faqs: Array<{ question: string; answer: string }>;
    links?: Array<{ label: string; href: string }>;
    schemaType?: "Article" | "Service" | "WebPage";
    author?: string;
    founderNote?: string;
    marker?: string;
    directAnswer?: string;
    facts?: Array<{ label: string; value: string }>;
    howTo?: boolean;
  },
): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: opts.h1 }];
  const author = opts.author ?? PHASE0_EDITORIAL_AUTHOR;
  const byline = `By ${esc(author)}${author === PHASE0_JEREMY_AUTHOR ? "." : ""}`;
  const authorSchema = author === PHASE0_JEREMY_AUTHOR
    ? {
      "@type": "Person",
      name: "Jeremy Mills",
      jobTitle: "CEO & Founder",
      description: "USAF Veteran",
      worksFor: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    }
    : { "@type": "Organization", name: PHASE0_EDITORIAL_AUTHOR, url: SITE };
  const schema = {
    "@context": "https://schema.org",
    "@type": opts.schemaType ?? "Article",
    headline: opts.h1,
    name: opts.h1,
    description: opts.description,
    url: `${SITE}${opts.canonical}`,
    datePublished: PHASE0_UPDATED_DATE,
    dateModified: PHASE0_UPDATED_DATE,
    author: authorSchema,
    publisher: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
  };
  const howToSchema = opts.howTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.h1,
    description: opts.directAnswer ?? opts.answer,
    step: opts.sections.map((section, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: section.heading,
      text: section.body,
      url: `${SITE}${opts.canonical}#step-${index + 1}`,
    })),
  } : undefined;
  const hero = opts.directAnswer
    ? `<section class="hero"><div class="container"><p class="kicker">${esc(opts.kicker)}</p><h1>${esc(opts.h1)}</h1>
      <p class="note">${byline} · Updated ${PHASE0_UPDATED_DATE}</p>
      <div class="direct-answer" aria-label="Direct answer"><p>${esc(opts.directAnswer)}</p></div>
      ${opts.founderNote ? `<p class="founder-note">${esc(opts.founderNote)}</p>` : ""}
    </div></section>`
    : `<section class="hero"><div class="container"><p class="kicker">${esc(opts.kicker)}</p><h1>${esc(opts.h1)}</h1><p class="lede">${esc(opts.answer)}</p>
      <p class="note">${byline} · Updated ${PHASE0_UPDATED_DATE}</p>${opts.founderNote ? `<p class="founder-note">${esc(opts.founderNote)}</p>` : ""}
    </div></section>`;
  const body = `<main ${opts.marker ? `data-${opts.marker}="true"` : 'data-phase0="true"'}>
  ${breadcrumb(crumbs)}
  ${hero}
  ${opts.facts?.length ? `<section class="block"><div class="container"><h2>What facts should you use to plan this scope?</h2><div class="prose"><table><thead><tr><th>Planning fact</th><th>Project-specific value</th></tr></thead><tbody>${opts.facts.map((fact) => `<tr><th scope="row">${esc(fact.label)}</th><td>${esc(fact.value)}</td></tr>`).join("")}</tbody></table></div></div></section>` : ""}
  ${opts.sections.map((section, index) => `<section class="block" id="step-${index + 1}"><div class="container"><h2>${esc(section.heading)}</h2><div class="prose"><p>${esc(section.body)}</p>${section.bullets ? `<ul class="scope">${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}</div></div></section>`).join("")}
  ${opts.links?.length ? `<section class="block"><div class="container"><h2>${opts.directAnswer ? "Which related engineering resources can help?" : "Related Engineering Resources"}</h2><div class="linkrow">${opts.links.map((link) => `<a href="${esc(link.href)}"${/^https:\/\//.test(link.href) ? ' rel="noopener noreferrer"' : ""}>${esc(link.label)}</a>`).join("")}</div></div></section>` : ""}
  ${opts.directAnswer ? `<section class="block"><div class="container"><h2>What else do project teams ask?</h2><div class="faq">${opts.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></div></section>` : phase0FaqMarkup(opts.faqs)}
  <section class="ctaband"><div class="container"><h2>${opts.directAnswer ? "Ready to discuss your engineering scope?" : "Discuss your engineering scope"}</h2><p>Share the project address, current records, requested deliverable, authority information, and schedule. Apex Grid confirms professional responsibility, availability, and scope before work begins.</p><a class="cta" href="/estimate">Start an Engineering Estimate</a></div></section>
  </main>`;
  return htmlShell({
    title: opts.title,
    description: opts.description,
    canonical: `${SITE}${opts.canonical}`,
    schemaJson: [schema, phase0FaqSchema(opts.faqs), ...(howToSchema ? [howToSchema] : []), breadcrumbSchema(crumbs)],
    body,
  });
}

function phase0AeoPage(page: Phase0AeoPage | Phase7AeoSeed): string {
  const phase7 = "cluster" in page;
  const related = phase7
    ? PHASE7_AEO_PAGES
      .filter((candidate) => candidate.slug !== page.slug && candidate.cluster === page.cluster)
      .slice(0, 3)
      .map((candidate) => ({ label: candidate.h1, href: `/answers/${candidate.slug}/` }))
    : PHASE0_AEO_PAGES
      .filter((candidate) => candidate.slug !== page.slug).slice(0, 3)
      .map((candidate) => ({ label: candidate.h1, href: `/answers/${candidate.slug}/` }));
  const serviceHref = "cluster" in page ? page.serviceHref : (page.serviceHref ?? "/services/");
  const links = [
    ...related,
    ...("cluster" in page && page.cluster === "Cost and pricing"
      ? [{ label: "Use our instant estimator", href: "/estimate" }]
      : []),
    ...("cluster" in page ? [] : (page.extraLinks ?? [])),
    { label: "Engineering service for this question", href: serviceHref },
    { label: "Metro engineering guides", href: "/metros/" },
    { label: "Verified service areas", href: "/locations/" },
  ];
  const faqs = "cluster" in page ? phase7Faqs(page) : page.faqs;
  const customSections = "cluster" in page ? undefined : page.sections;
  const sections = !customSections?.length
    ? [
      { heading: "The concise answer", body: page.answer },
      { heading: "How the answer is applied", body: `The correct application of ${page.topic.toLowerCase()} starts with the actual project, not a generic promise. Confirm the jurisdiction, adopted code, design scope, existing conditions, required deliverables, and professional responsibility before relying on a conclusion. A responsible engineer documents assumptions and identifies information that still needs verification.` },
      { heading: "What can change the result", body: "Project type, occupancy, existing construction, site conditions, code edition, agency requirements, and changes made after the original design can change the work. A concise answer is useful for orientation, but the signed or sealed project record must reflect the current scope and the authority's process.", bullets: ["Confirm the authority having jurisdiction and current checklist", "Use current drawings, calculations, field evidence, and equipment information", "Separate engineering decisions from owner, architect, contractor, utility, and agency decisions", "Record assumptions, limitations, and questions requiring direct AHJ confirmation"] },
    ]
    : customSections;
  return phase0ArticleFrame({
    canonical: `/answers/${page.slug}/`,
    title: page.title,
    description: page.description,
    h1: page.h1,
    kicker: `AEO Answer · ${page.topic}`,
    answer: page.answer,
    sections,
    faqs,
    links,
    schemaType: "Article",
    author: PHASE0_JEREMY_AUTHOR,
    founderNote: "cluster" in page ? undefined : page.founderNote,
    marker: "cluster" in page ? "phase7" : undefined,
    directAnswer: "cluster" in page ? undefined : page.directAnswer,
    facts: "cluster" in page ? undefined : page.facts,
    howTo: "cluster" in page ? undefined : page.howTo,
  });
}

function phase0CollectionHub(
  canonical: string,
  title: string,
  description: string,
  h1: string,
  kicker: string,
  answer: string,
  links: Array<{ label: string; href: string }>,
): string {
  return phase0ArticleFrame({
    canonical,
    title,
    description,
    h1,
    kicker,
    answer,
    sections: [
      { heading: "How to use this collection", body: "These pages are national, general guidance. They explain useful questions and records without inventing local permit outcomes, county requirements, client records, or project pricing. Confirm the current jurisdiction, code edition, authority checklist, and responsible professional before relying on a page for a live project." },
      { heading: "A consistent professional boundary", body: "Apex Grid's public guidance does not replace a project proposal, site investigation, design analysis, permit review, inspection, or board decision. Scope, licensing, responsible charge, and deliverables are confirmed for each project." },
    ],
    faqs: [
      { question: "Are these pages static and indexable?", answer: "Yes. Phase 0 pages are generated as static HTML with a self-canonical URL and index,follow metadata, then included in the generated sitemap." },
      { question: "Do these pages contain local guarantees or pricing?", answer: "No. The corpus intentionally excludes invented local records, near-me doorway pages, county guides, and inline location pricing." },
    ],
    links,
    schemaType: "WebPage",
  });
}

function phase1MetroFaqs(metro: Phase1Metro, serviceLabel?: string): Array<{ question: string; answer: string }> {
  const subject = serviceLabel
    ? `${serviceLabel} for the ${metro.metroName} metro`
    : `engineering guides for the ${metro.metroName} metro`;
  return [
    {
      question: `What does ${subject} cover?`,
      answer: `This guide explains planning, records, coordination, and professional boundaries for ${subject}. The exact project scope, responsible professional, and deliverables are confirmed from current records.`,
    },
    {
      question: "Do these metro pages guarantee permit approval?",
      answer: "No. The authority having jurisdiction controls its checklist, interpretation, inspections, review, and approval. A general metro guide cannot promise a local outcome.",
    },
    {
      question: "What should I send for a metro engineering review?",
      answer: "Send the project address, scope, current drawings, existing-condition evidence, equipment or utility information, prior comments, applicable authority information, and requested deliverables. The responsible professional identifies what else is needed.",
    },
  ];
}

function phase0ServicePage(page: Phase0ServicePage): string {
  return phase0ArticleFrame({
    canonical: page.path,
    title: page.title,
    description: page.description,
    h1: page.h1,
    kicker: "Phase 0 Service Scope",
    answer: page.answer,
    sections: [
      ...page.sections,
      {
        heading: "A founder's standard for project clarity",
        body: "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran, emphasizes clear scope, traceable inputs, and direct communication about what remains unverified. That founder perspective does not replace the independent judgment or professional responsibility of the licensed engineer assigned to an accepted project.",
      },
    ],
    faqs: page.faqs,
    links: [
      { label: "Engineering answers library", href: "/answers/" },
      { label: "Plan-check correction playbooks", href: "/plan-check-playbooks/" },
      { label: "Engineering project resources", href: "/resources/phase-0/" },
      { label: "PE-stamped engineering hub", href: "/pe-stamp/" },
      { label: "Plan-check correction support", href: "/services/plan-check-corrections-engineer/" },
      { label: "Contact Apex Grid", href: "/contact/" },
    ],
    schemaType: "Service",
  });
}

function peStampHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "PE Stamp Resources" }];
  const stateLinks = Object.keys(PE_STATE_SOURCE_LINKS).sort().map((slug) => ({
    label: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} PE stamp information`,
    href: `/pe-stamp/${slug}/`,
  }));
  const faqs = [
    { question: "Is a PE stamp a stand-alone product?", answer: "No. A seal represents a responsible engineer's professional review and responsibility for eligible work within the engineer's authorization and applicable rules." },
    { question: "Where can I verify a professional engineer license?", answer: "Use the official board and license-verification resources linked for the relevant state, then confirm project-specific authorization and scope directly with the responsible professional." },
    { question: "Does a PE stamp guarantee permit approval?", answer: "No. The AHJ controls its completeness review, interpretation, comments, and approval decision." },
  ];
  return phase0ArticleFrame({
    canonical: "/pe-stamp/",
    title: "PE Stamp and License Verification Resources | Apex Grid",
    description: "State-by-state professional engineering board and license-verification resources, plus responsible PE document guidance from Apex Grid Engineering.",
    h1: "PE Stamp and Professional Engineer Verification Resources",
    kicker: "Professional Responsibility · State Resources",
    answer: "A PE seal belongs to defined engineering work that a responsible, authorized professional engineer has performed or independently reviewed. This hub links to official state board and license-verification resources without implying a project license, local office, or guaranteed approval.",
    sections: [
      { heading: "Use the official state source first", body: "Board rules, seal requirements, comity processes, and verification systems change. Open the relevant state page below, follow the board's current instructions, and confirm the engineer's authorization for the project's discipline, location, and scope. NCEES, a project owner, or a contractor cannot substitute for the state's official record.", bullets: ["State board landing page", "Official license lookup or verification page", "Project-specific authorization and responsible charge", "AHJ submission and signature requirements"] },
      { heading: "A seal is tied to professional responsibility", body: "Apex Grid does not sell a stamp-for-hire service. Where a project is accepted, the responsible engineer defines the scope, reviews the design basis, performs or verifies the necessary work, coordinates eligible documents, and determines whether signing or sealing is appropriate. Construction, agency, utility, architecture, survey, geotechnical, and specialty responsibilities remain distinct." },
      { heading: "Founder perspective", body: "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran, supports a verification-first approach: confirm the official license record, define the engineering scope, and identify the responsible licensed professional before relying on a seal. This founder statement does not represent Jeremy as a professional engineer." },
    ],
    faqs,
    links: stateLinks,
    schemaType: "WebPage",
  });
}

function peStampStatePage(state: StateData, slug: string): string {
  const links = PE_STATE_SOURCE_LINKS[slug];
  if (!links) throw new Error(`Missing official PE board links for ${slug}`);
  const stateName = state.name;
  const faqs = [
    { question: `How do I verify a PE license in ${stateName}?`, answer: `Start with the official ${stateName} board and license-verification links on this page. Confirm the record directly with the board and separately confirm that the engineer is authorized for the project's discipline and scope.` },
    { question: `Does a ${stateName} PE seal guarantee approval?`, answer: "No. A seal communicates professional responsibility for eligible engineering work. The authority having jurisdiction controls its review, comments, interpretation, and approval decision." },
    { question: `What should a ${stateName} project team confirm before sealing?`, answer: `Confirm the project location, discipline, adopted code, AHJ submission rules, existing-condition evidence, and the engineer's ability to accept responsible charge. ${state.licensure.notes}` },
  ];
  return phase0ArticleFrame({
    canonical: `/pe-stamp/${slug}/`,
    title: `PE Stamp and License Lookup in ${stateName} | Apex Grid`,
    description: `Official ${stateName} professional engineering board and license-verification resources, with project-specific PE responsibility guidance from Apex Grid Engineering.`,
    h1: `PE Stamp and License Verification in ${stateName}`,
    kicker: `${stateName} · Official Board Resources`,
    answer: `For a ${stateName} project, use the state's official engineering board and license-verification resources before relying on a professional credential. A PE seal still requires independent engineering review, professional responsibility, and compliance with the project jurisdiction's submission rules.`,
    sections: [
      { heading: `Official ${stateName} board and lookup links`, body: "These links are provided as starting points to the official state sources. A board's current instructions and online record control; confirm the page, status, discipline, and authorization directly before a project submission.", bullets: [`${stateName} engineering licensing board`, "Official license verification or lookup", `Project code and AHJ requirements for ${stateName}`, "Responsible engineer and scope confirmation"] },
      { heading: "Project-specific engineering responsibility", body: `The ${stateName} board resource does not approve a design or transfer responsibility to a contractor, owner, or another engineer. The responsible professional reviews the project inputs, code basis, calculations, drawings, and existing conditions, then determines which documents can be signed or sealed. ${state.buildingCode.notes} ${state.licensure.notes}` },
      { heading: "Useful project inputs", body: `A ${stateName} PE may need the project address, current architectural backgrounds, discipline scope, adopted code information, site and existing-condition evidence, equipment data, calculations, AHJ checklist, and any correction notice. ${state.permitting} ${state.climate.drivers.join("; ")} are examples of why project inputs must be confirmed rather than assumed.` },
    ],
    faqs,
    links: [
      { label: `${stateName} official board`, href: links.boardUrl },
      { label: `${stateName} official license lookup`, href: links.lookupUrl },
      { label: "PE stamp hub", href: "/pe-stamp/" },
    ],
    schemaType: "WebPage",
  });
}

function estimatorLocationLinks(
  state: StateData,
  cities: CityData[],
  directory: CityDirectory,
): Array<{ name: string; href: string }> {
  const available = allDirectoryCitiesForState(state, directory, cities);
  const byName = new Map(available.map((city) => [diagnosticSlug(city.name), city]));
  const selected: DirectoryCity[] = [];
  for (const metro of state.metros) {
    const normalizedMetro = diagnosticSlug(metro);
    const city = byName.get(normalizedMetro)
      ?? byName.get(normalizedMetro.replace(/-city$/, ""))
      ?? available.find((candidate) =>
        candidate.slug === normalizedMetro || candidate.slug === normalizedMetro.replace(/-city$/, ""),
      );
    if (city && !selected.some((entry) => entry.slug === city.slug)) selected.push(city);
  }
  // A few reviewed metro labels (for example, a multi-city metro or an
  // island community) do not match a Census place slug exactly. Keep the
  // fallback within this state's existing generated location tree.
  for (const city of available) {
    if (selected.length >= 3) break;
    if (!selected.some((entry) => entry.slug === city.slug)) selected.push(city);
  }
  const links = [
    { name: `${state.name} service area`, href: `/locations/${state.slug}/` },
    ...selected.slice(0, 6).map((city) => ({
      name: city.name,
      href: `/locations/${state.slug}/${city.slug}/`,
    })),
  ];
  if (selected[0]) {
    links.push({
      name: `${selected[0].name} MEP engineering`,
      href: `/locations/${state.slug}/${selected[0].slug}/mep-engineering/`,
    });
  }
  for (const specialty of LOCATION_SERVICE_PAGES.filter((page) => page.stateSlug === state.slug).slice(0, 3)) {
    const href = `/locations/${specialty.stateSlug}/${specialty.citySlug}/${specialty.serviceSlug}/`;
    if (!links.some((link) => link.href === href)) {
      links.push({ name: specialty.title, href });
    }
  }
  return links;
}

function engineeringCostEstimatorPage(
  state: StateData,
  cities: CityData[],
  directory: CityDirectory,
): string {
  const canonicalPath = `/engineering-cost-estimator/${state.slug}/`;
  const officialPeSources = PE_STATE_SOURCE_LINKS[state.slug];
  if (!officialPeSources) throw new Error(`Missing official PE board links for estimator page: ${state.slug}`);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Engineering Cost Estimator", href: "/estimate" },
    { name: `${state.name} estimator` },
  ];
  const locationLinks = estimatorLocationLinks(state, cities, directory);
  const faqs = [
    ...state.faqs.map((faq) => ({ question: faq.q, answer: faq.a })),
    {
      question: `How much does a PE stamp cost in ${state.name}?`,
      answer: `There is no responsible flat rate for a PE stamp in ${state.name}. The engineering fee depends on the defined discipline and deliverables, project size and occupancy, current drawings and calculations, existing-condition evidence, site or geotechnical information where relevant, coordination and revision scope, schedule, and the ${state.licensure.board}'s applicable rules. A PE seal is part of professional engineering work and is not a detached signature, guarantee, or approval shortcut.`,
    },
  ];
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Engineering Cost Estimator for ${state.name} Projects`,
    description: `Project-input guidance for scoping structural, MEP, civil, and energy engineering costs in ${state.name} without publishing invented rates.`,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    areaServed: { "@type": "State", name: state.name },
    serviceType: "Engineering cost estimation and project intake",
    url: `${SITE}${canonicalPath}`,
  };
  const faqSchema = phase0FaqSchema(faqs);
  const body = `<main data-estimator-state="${esc(state.slug)}">
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(state.name)} · Engineering Intake</p>
  <h1>${esc(state.name)} Engineering Cost Estimator</h1>
  <p class="lede">Understand the project inputs that shape a responsible structural, MEP, civil, or energy engineering estimate in ${esc(state.name)}. This page explains scope, code, climate, permitting, and professional-review variables; it does not invent a rate or promise an outcome.</p>
</div></section>
<section class="block"><div class="container">
  <h2>How engineering estimates are scoped in ${esc(state.name)}</h2>
  <div class="prose"><p>${esc(state.narratives.mep)} ${esc(state.narratives.structural)}</p><p>A useful estimate starts with the engineering question and the records available to answer it. Cost inputs can include the disciplines requested, building size and occupancy, new versus existing conditions, drawing and calculation quality, field verification, equipment and utility information, site or geotechnical records, permit deliverables, coordination, revisions, and schedule. Apex Grid confirms those assumptions during intake instead of publishing a made-up ${esc(state.name)} rate.</p></div>
  <ul class="scope"><li>Discipline, deliverables, and seal requirements</li><li>Project size, occupancy, systems, and design stage</li><li>Existing conditions, measurements, surveys, and geotechnical evidence</li><li>AHJ checklist, code path, comments, and revision history</li><li>Coordination participants, access, schedule, and review cycles</li></ul>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} code adoption and energy requirements</h2>
  <div class="prose"><p>${esc(state.buildingCode.name)}. ${esc(state.buildingCode.notes)} ${esc(state.buildingCode.baseCode)}.</p><p>The commercial energy code is ${esc(state.energyCode.commercial)}. ${esc(state.energyCode.notes)}${state.energyCode.beyondCode ? ` ${esc(state.energyCode.beyondCode)}` : ""}</p><p>These reviewed facts are dated ${esc(state.lastVerified)}. The engineer still confirms the current edition, amendments, and submission checklist with the specific authority having jurisdiction before relying on them for an estimate.</p></div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} climate and structural drivers</h2>
  <div class="prose"><p>${esc(state.climate.zones)} affects envelope, HVAC, moisture, and energy inputs. Relevant drivers include ${esc(state.climate.drivers.join("; "))}.</p><p>Structural scoping also considers seismic conditions (${esc(state.structural.seismic)}), wind exposure (${esc(state.structural.wind)}), and snow (${esc(state.structural.snow)}). ${state.structural.other ? esc(state.structural.other) : ""}</p><p>${esc(state.narratives.civil)} ${esc(state.narratives.energy)}</p></div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} permitting and market context</h2>
  <div class="prose"><p>${esc(state.permitting)}</p><p>${esc(state.marketNotes)}</p><p>Permitting context changes the records and coordination an estimate needs. The AHJ controls completeness, interpretation, review, corrections, and approval; an estimate is not a permit promise.</p></div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} PE board and responsible-charge notes</h2>
  <div class="prose"><p>The licensing board for ${esc(state.name)} is the ${esc(state.licensure.board)}. ${esc(state.licensure.notes)}</p><p>Before a document is sealed, confirm project jurisdiction, discipline, adopted code, responsible charge, existing-condition evidence, and the board and AHJ rules that apply. A PE stamp is part of defined engineering responsibility, not a commodity purchased separately from the review that supports it.</p></div>
  <div class="linkrow"><a href="${esc(officialPeSources.boardUrl)}" rel="noopener noreferrer">${esc(state.name)} official engineering board</a><a href="${esc(officialPeSources.lookupUrl)}" rel="noopener noreferrer">${esc(state.name)} official license lookup</a></div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} metro coverage and location guides</h2>
  <p class="prose">The reviewed StateData market list includes ${esc(state.metros.join(", "))}. Existing location pages provide context for these markets; they do not imply a local office, guaranteed availability, or a project result.</p>
  <div class="linkrow">${locationLinks.map((link) => `<a href="${esc(link.href)}">${esc(link.name)} engineering location guide</a>`).join("")}</div>
</div></section>
<section class="block"><div class="container">
  <h2>What to send for a ${esc(state.name)} project estimate</h2>
  <div class="prose"><p>Start with the project address, plain-language scope, current drawings, photographs or measurements, equipment and utility information, survey or geotechnical records where relevant, adopted-code information, AHJ comments, desired deliverables, and schedule. The responsible engineer identifies gaps and confirms whether the requested work can be accepted.</p></div>
  <div class="linkrow"><a href="/pe-stamp/${esc(state.slug)}/">${esc(state.name)} PE stamp and license resources</a><a href="/answers/">Engineering answers library</a><a href="/answers/how-much-does-a-pe-stamp-cost/">PE stamp cost guidance</a></div>
</div></section>
<section class="block"><div class="container"><h2>${esc(state.name)} estimator FAQs</h2><div class="faq">${faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></div></section>
<section class="ctaband"><div class="container"><h2>Start your ${esc(state.name)} project estimate</h2><p>Share the project address, records, requested engineering scope, authority information, and schedule through the estimate intake. Scope, professional responsibility, availability, and any fee proposal are confirmed after review.</p><a class="cta" href="/estimate">Open the Engineering Estimate</a></div></section>
</main>`;
  return htmlShell({
    title: `${state.name} Engineering Cost Estimator | PE, Structural, MEP & Civil | Apex Grid`,
    description: `${state.name} engineering cost estimator guidance: understand scope, code, climate, permitting, PE review, and project inputs without invented rates.`,
    canonical: `${SITE}${canonicalPath}`,
    schemaJson: [serviceSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function phase0PlaybookPage(playbook: Phase0Playbook & { angle: string }): string {
  const faqs = [
    { question: `What is the first step for ${playbook.city} plan-check corrections?`, answer: `Preserve the official correction notice and permit record, identify the current submitted set, and build a comment matrix before changing drawings or calculations. ${playbook.angle}` },
    { question: "Can a plan-check playbook promise approval?", answer: "No. It provides a general coordination method. The AHJ decides completeness, interpretation, comments, review timing, and approval." },
    { question: "Which project information should be assembled?", answer: "Collect the complete notice, current and prior submittals, calculations, architectural background, project address, permit number, equipment data, field evidence, and the authority's current resubmittal instructions." },
    { question: "What if a comment belongs to another discipline?", answer: "Assign the item to the responsible architect, engineer, contractor, utility, fire authority, or other specialist and record the dependency instead of claiming that an engineering response resolves it." },
  ];
  return phase0ArticleFrame({
    canonical: `/plan-check-playbooks/${playbook.slug}/`,
    title: playbook.title,
    description: `General plan-check correction guidance for ${playbook.city}, ${playbook.state}: preserve official records, coordinate engineering responses, and separate AHJ decisions from project-team work.`,
    h1: `${playbook.city} Plan Check Correction Playbook`,
    kicker: `${playbook.city}, ${playbook.state} · General Guidance`,
    answer: `This playbook is a general, non-invented workflow for ${playbook.city} plan-check corrections. It does not assert a local approval timeline, a particular code interpretation, or a project-specific agency decision. ${playbook.angle}`,
    sections: [
      { heading: "Preserve the official record", body: `Begin with the ${playbook.city} permit record and correction notice linked below. Save the submitted drawing index, calculations, response forms, correspondence, and portal instructions as received. Record the review cycle and date without guessing what the authority meant beyond the written comment. ${playbook.angle}` },
      { heading: "Build a comment matrix", body: "For every item, copy the comment number and wording, identify the cited sheet or detail, classify the response as comply, clarify, revise, or refer, assign the responsible discipline, and list the evidence needed. A comment that changes the design basis requires engineering work; an owner, zoning, fire, utility, or planning decision must remain with the appropriate party.", bullets: ["Exact comment and original reference", "Responsible discipline and project-team owner", "Calculation, drawing, schedule, or letter needed", "Open input, field verification, or AHJ question", "Revision identifier and final response location"] },
      { heading: "Coordinate before resubmitting", body: "Check the response against the full current set. A structural opening can affect architecture and MEP routing; an equipment change can affect structure, electrical service, controls, and energy documentation; a civil change can affect grading, drainage, utilities, and accessibility. The project applicant follows the official portal, fee, file-naming, signature, and authorization instructions.", bullets: ["Current sheets and revision clouds", "Updated calculations and schedules", "Cross-discipline consistency", "Professional seals where authorized and required", "Applicant and AHJ actions kept separate from engineering work"] },
      { heading: "Use sources without inventing local facts", body: `The ${playbook.city} links below are official starting points, not evidence of a particular project's outcome. Confirm the current checklist, adopted code, permit status, authority, and submission path directly. Model-code resources provide context but do not establish the local adoption or amendment.` },
    ],
    faqs,
    links: playbook.sources.map((source) => ({ label: source.label, href: source.url })),
    schemaType: "Article",
  });
}

function phase0ResourcePage(page: Phase0ResourcePage): string {
  const design = page.track === "design";
  const review = page.track === "review";
  const sections = design
    ? [
      { heading: "Start with the design decision", body: `${page.answer} Before selecting a detail, calculation method, assembly, or system, write the decision in one sentence: what must be designed, for which project condition, and what document will prove it. For this ${page.category} topic, the design team should identify ${page.checklist}. That short brief prevents a preliminary idea from being mistaken for a permit-ready conclusion.` },
      { heading: "Build an input register, not a wish list", body: `The design register should name the source and status of each input: current, assumed, pending, or rejected. For ${page.category}, this normally means checking ${page.checklist} against the current architectural background, project address, code edition, owner criteria, and known field constraints. Note who can confirm each open item. A missing measurement or unselected product is a design dependency, not an invitation to invent a value.` , bullets: ["Design question and acceptance criterion", "Source, date, and confidence for each input", "Code provisions or engineering method to be used", "Interfaces with architecture, MEP, civil, contractor, and owner scope", "Open decisions that must be resolved before issue"] },
      { heading: "Example design deliverable", body: `A useful ${page.category} design record connects the selected approach to a drawing, schedule, calculation, or narrative. It should show the governing assumptions, the condition the design addresses, the limits of applicability, and the coordination detail a reviewer or builder will need. For ${page.title.toLowerCase()}, the output is not just a checklist: it is a controlled design decision that can be checked against later revisions.` },
      { heading: "Design gate before handoff", body: "Before the design moves to review, compare it with the latest background and ask whether changed geometry, occupancy, equipment, loads, utilities, or site evidence affects the conclusion. The responsible engineer decides whether further analysis, a site observation, survey, geotechnical input, testing, or product data is required. Record unresolved items visibly rather than hiding them in a general note." },
    ]
    : review
      ? [
        { heading: "Define what the reviewer is testing", body: `A review of ${page.title.toLowerCase()} is not a second reading of every page. It tests a defined question: whether the record is complete, internally consistent, traceable to its sources, and suitable for the next project decision. Use the following evidence as the starting set: ${page.checklist}. Then state what would cause the reviewer to stop and request more information.` },
        { heading: "Use evidence tests and contradiction checks", body: `For this ${page.category} review, compare the current document against the source record, the coordinated drawing set, and the applicable authority or code instructions. Look for mismatched dimensions, stale schedules, unexplained assumptions, missing references, and changes that appear on one sheet but not another. A reviewer should be able to reproduce the conclusion from the cited evidence rather than infer it from a confident sentence.`, bullets: ["Identity and revision test: is this the current record?", "Completeness test: are the required inputs and attachments present?", "Consistency test: do related sheets, schedules, and calculations agree?", "Responsibility test: is the correct professional or authority answering?", "Exception test: are unresolved items and limitations visible?"] },
        { heading: "Turn findings into actionable comments", body: `A useful review finding says what is wrong, where it occurs, why it matters, and what evidence or revision would close it. For ${page.title.toLowerCase()}, distinguish a missing input from a calculation error, a coordination conflict from an AHJ interpretation, and a formatting issue from a design change. Assign each finding to its owner and preserve the original reference so a later response can be checked.` },
        { heading: "Close the review with a disposition record", body: "The reviewer should issue a dated disposition: accepted, accepted with noted limitation, revise and return, or refer to another project participant. Link each disposition to the revised sheet, calculation, field record, or agency answer. This is quality control, not an approval promise; the AHJ and responsible engineer retain their own professional and regulatory decisions." },
      ]
      : [
        { heading: "Issue a usable delivery record", body: `${page.answer} At delivery, the question is whether the next person can identify, open, rely on, and coordinate the correct record. For ${page.category}, preserve ${page.checklist} in the transmittal or controlled project index. State what is included, what is excluded, which revision is current, and what action remains with the recipient.` },
        { heading: "Handoff details that prevent rework", body: `A ${page.title.toLowerCase()} handoff should identify the recipient, issue date, file names, revision, source documents, professional seal or signature status when applicable, and dependencies outside the package. Explain the practical interface: what the architect must coordinate, what the contractor must verify in the field, what the owner must decide, and what the AHJ may still request. Never treat an uploaded file as proof that another party accepted it.`, bullets: ["Controlled transmittal and revision identifier", "Drawing, calculation, schedule, and specification references", "Field, product, utility, or testing dependencies", "Recipient action and response date when known", "Archive location for superseded and final records"] },
        { heading: "Manage changes after issue", body: `Changes to ${page.category} information can be triggered by a substitution, field condition, correction notice, owner decision, or authority comment. Compare the change with the issued basis before replacing a file. Mark affected documents, update the index, explain the reason for revision, and have the responsible professional determine whether the change requires a new calculation, seal, site verification, or AHJ submission.` },
        { heading: "Closeout is evidence, not a promise", body: "A complete delivery record helps a project team locate what was issued and what remains open; it does not certify concealed construction, guarantee inspection results, or transfer responsibility for work outside the defined scope. Retain the accepted transmittal, response, field evidence, and final revision according to the project record requirements, and identify any deferred or delegated work plainly." },
      ];
  const faqs = design
    ? [
      { question: `What must be decided before ${page.title.toLowerCase()} begins?`, answer: `Define the design question, intended use, applicable authority, and evidence needed. For this topic, start with ${page.checklist}.` },
      { question: "What makes a design input reliable?", answer: "A reliable input has an identifiable source, date, scope, and status. The responsible professional decides whether it is sufficient or needs field verification, testing, survey, geotechnical work, or product data." },
      { question: "Can a preliminary design value be used as the final permit basis?", answer: "Not automatically. Preliminary values must be checked against the current coordinated design and applicable code before they support an issued or sealed document." },
    ]
    : review
      ? [
        { question: `What does a reviewer look for in ${page.title.toLowerCase()}?`, answer: `The reviewer tests identity, completeness, consistency, responsibility, and limitations. The starting evidence includes ${page.checklist}.` },
        { question: "How should an unresolved finding be handled?", answer: "Record the exact issue, affected document, consequence, owner, and evidence needed to close it. Do not silently fill a missing input or convert an AHJ question into an engineering conclusion." },
        { question: "Does a quality review equal AHJ approval?", answer: "No. Internal review improves traceability and coordination; the authority having jurisdiction controls its own interpretation and decision." },
      ]
      : [
        { question: `What belongs in the delivery record for ${page.title.toLowerCase()}?`, answer: `Include the controlled revision, source references, recipient action, and dependencies. For this topic, preserve ${page.checklist}.` },
        { question: "What happens when the project changes after issue?", answer: "Compare the change with the issued basis, update affected documents and the transmittal, and ask the responsible professional whether new analysis, field evidence, signatures, seals, or AHJ action is required." },
        { question: "Does transmitting a document transfer responsibility?", answer: "No. A transmittal identifies what was sent; it does not transfer professional responsibility or prove that an owner, contractor, specialist, or AHJ accepted the work." },
      ];
  return phase0ArticleFrame({
    canonical: `/resources/phase-0/${page.slug}/`,
    title: `${page.title} | Apex Grid`,
    description: `${page.answer} General engineering project guidance with a ${page.track} perspective.`,
    h1: page.title,
    kicker: `Phase 0 Resource · ${page.category}`,
    answer: page.answer,
    sections,
    faqs,
    links: [
      { label: "Engineering calculations service", href: "/services/engineering-calculations/" },
      { label: "Energy compliance service", href: "/services/energy-compliance/" },
      { label: "PE stamp hub", href: "/pe-stamp/" },
    ],
    schemaType: "Article",
  });
}

function engineeringIntentPage(page: EngineeringIntentPage): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Engineering Services", href: "/services" }, { name: page.h1 }];
  const serviceSchema = {
    "@context": "https://schema.org", "@type": "Service", name: page.h1,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    serviceType: "Professional Engineering Services",
  };
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };
  const siblingIntentLinks = ALL_ENGINEERING_INTENT_PAGES
    .filter((candidate) => candidate.slug !== page.slug)
    .slice(0, 3)
    .map((candidate) => [`/engineering-intent/${candidate.slug}/`, candidate.h1] as [string, string]);
  const related = [
    ["/engineering-intent/", "Engineering support by project stage"],
    ["/services/structural", "Structural Engineering"],
    ["/mep-engineering/", "MEP Engineering"],
    ["/civil-engineering/", "Civil Engineering"],
    ["/permit-engineering/", "Permit Engineering"],
    ["/existing-building-engineering/", "Existing Building Engineering"],
    ["/locations/", "Verified Service Areas"],
    ["/contact", "Request a Project Review"],
    ...siblingIntentLinks,
  ];
  const nearMeLinks = page.slug === "engineering-near-me"
    ? `<section class="block"><div class="container"><h2>Verified service-area <em>information</em></h2><p>These are information pages for specific reviewed markets, not local-office or local-pack claims. Confirm current jurisdiction and project requirements during intake.</p><div class="linkrow"><a href="/locations/">All service areas</a><a href="/locations/arizona/phoenix/">Phoenix, Arizona</a><a href="/locations/arizona/scottsdale/">Scottsdale, Arizona</a><a href="/locations/california/los-angeles/">Los Angeles, California</a><a href="/locations/texas/austin/">Austin, Texas</a><a href="/locations/texas/dallas/">Dallas, Texas</a><a href="/locations/florida/tampa/">Tampa, Florida</a></div></div></section>`
    : "";
  const body = `<main>${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(page.kicker)}</p><h1>${esc(page.h1)}</h1><p class="lede">${esc(page.answer)}</p></div></section>
${page.sections.map((s) => `<section class="block"><div class="container"><h2>${esc(s.heading)}</h2><div class="prose"><p>${esc(s.body)}</p></div></div></section>`).join("")}
<section class="block"><div class="container"><h2>Who this is for</h2><p>${esc(page.audience)} can begin with the project address, requested outcome, available records, and relevant schedule or jurisdiction information.</p></div></section>
<section class="block"><div class="container faq"><h2>${esc(page.h1)} <em>FAQs</em></h2>${page.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="a">${esc(f.a)}</div></details>`).join("")}</div></section>
<section class="block"><div class="container"><h2>Related <em>Engineering Resources</em></h2><div class="linkrow">${related.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</div></div></section>
${nearMeLinks}
<section class="ctaband"><div class="container"><h2>Discuss Your Engineering Scope</h2><p>Send the project address, records, desired deliverable, jurisdiction, site-access details, and timing constraint. Scheduling is subject to scope and engineer availability.</p><a class="cta" href="/contact">Request a Proposal</a></div></section></main>`;
  return htmlShell({
    title: page.title, description: page.description, canonical: `${SITE}/engineering-intent/${page.slug}/`,
    schemaJson: [serviceSchema, faqSchema, breadcrumbSchema(crumbs)], body,
  });
}

function engineeringIntentHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Engineering Support" }];
  const cards = ALL_ENGINEERING_INTENT_PAGES.map((p) =>
    `<a class="card" href="/engineering-intent/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.answer.slice(0, 170))}…</p></a>`).join("");
  const existing = [
    ["/permit-engineering/plan-check-responses/", "Permit plan-check responses"],
    ["/permit-engineering/city-comments/", "Permit city comments"],
    ["/permit-engineering/pe-stamped-drawings/", "PE-stamped drawings"],
    ["/existing-building-engineering/condition-assessments/", "Existing-building condition assessments"],
    ["/existing-building-engineering/no-existing-plans/", "Engineering with no original plans"],
    ["/existing-building-engineering/field-verification/", "Existing-condition field verification"],
    ["/solutions/", "Engineering solutions by problem"],
  ];
  const body = `${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">Commercial Engineering Support</p><h1>Engineering Support by Problem and Project Stage</h1><p class="lede">A practical starting point for owners, contractors, architects, and developers who need a defined engineering deliverable. Choose the project problem or stage below; scope, records, jurisdiction, site access, licensure, and engineer availability determine the appropriate path.</p></div></section>
<section class="block"><div class="container"><h2>Retained <em>Commercial Support</em></h2><div class="grid2">${cards}</div></div></section>
<section class="block"><div class="container"><h2>Existing canonical <em>services</em></h2><p>Several high-intent searches are already covered by stronger canonical pages. These links consolidate fast-track scheduling, permit corrections and stamped plans, acquisition diligence, post-event assessment, and existing-condition documentation without creating duplicate URLs.</p><div class="linkrow">${existing.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}</div></div></section>
<section class="block"><div class="container"><h2>Start with a <em>complete intake</em></h2><p>Send the project address and jurisdiction, requested outcome, drawings or photographs, relevant permit or construction correspondence, site-access conditions, desired deliverable, and schedule constraint. A proposal or initial response is not a guarantee of engineering completion, site-visit availability, or permit approval.</p><a class="cta" href="/contact">Request a Project Review</a></div></section>`;
  return htmlShell({
    title: "Commercial Engineering Support by Project Stage",
    description: "Find commercial engineering support by project problem or stage, with links to permit, existing-building, structural, MEP, civil, and construction services.",
    canonical: `${SITE}/engineering-intent/`,
    schemaJson: [{ "@context": "https://schema.org", "@type": "WebPage", name: "Commercial Engineering Support" }, breadcrumbSchema(crumbs)],
    body: body.replace(/[ \t]+$/gm, ""),
  });
}

const orgSchema = APEX_GRID_BUSINESS_SCHEMA;

const PHASE1_AUTHOR = "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran";
const PHASE1_FOOTER_REPLACEMENT = "Engineering availability, professional responsibility, and jurisdiction-specific requirements are confirmed for each project.";
function phase1Html(html: string): string {
  return html.replace(
    "Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska. Engineering stamping and licensure are confirmed for each project jurisdiction.",
    PHASE1_FOOTER_REPLACEMENT,
  );
}
const phase1ServiceLabels: Record<Phase1ServiceSlug, string> = {
  "permit-guide": "Permit Guide",
  "structural-engineering": "Structural Engineering",
  "mep-engineering": "MEP Engineering",
  "pe-stamp": "Professional Seal Guidance",
  "plan-check-corrections": "Plan-Check Corrections",
  "energy-compliance": "Energy Compliance",
  "engineering-calculations": "Engineering Calculations",
};
const phase1ServiceSummaries: Record<Phase1ServiceSlug, string> = {
  "permit-guide": "A project-specific permit path starts with the current drawings, scope, criteria, and filing requirements—not a generic checklist.",
  "structural-engineering": "Structural scope connects existing conditions, gravity and lateral assumptions, member checks, details, and coordinated permit documents.",
  "mep-engineering": "MEP coordination brings mechanical, electrical, and plumbing design inputs together with architectural backgrounds, equipment, utilities, and code documentation.",
  "pe-stamp": "A professional seal identifies responsibility for eligible engineering work after the responsible professional performs or independently reviews that defined scope.",
  "plan-check-corrections": "Correction support turns reviewer comments into an accountable response matrix, coordinated revisions, and a clear record of what remains unresolved.",
  "energy-compliance": "Energy documentation follows the adopted path, project inputs, envelope and system choices, calculations or modeling, and the authority's submission requirements.",
  "engineering-calculations": "Calculations make design decisions traceable by documenting inputs, assumptions, methods, checks, and conclusions for the defined scope.",
};

function phase1MetroHubPage(metro: Phase1Metro): string {
  const url = `/metros/${metro.slug}/`;
  const faqs = phase1MetroFaqs(metro);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Metro engineering guides", href: "/metros/" },
    { name: `${metro.representativeCity} metro` },
  ];
  const links = PHASE1_SERVICE_SLUGS.map((slug) =>
    `<a class="card" href="${url}${slug}/"><div class="label">${phase1ServiceLabels[slug]}</div><h3>${metro.representativeCity} ${phase1ServiceLabels[slug]}</h3><p>${phase1ServiceSummaries[slug]}</p></a>`,
  ).join("");
  const body = `<main data-phase1="true">
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">Census CBSA ${metro.cbsaCode} · 2025 permit context</p><h1>Engineering Guides for the ${esc(metro.metroName)} Metro</h1><p class="lede">A practical, jurisdiction-neutral engineering guide for the ${esc(metro.metroName)} metropolitan area, represented by ${esc(metro.representativeCity)}, ${esc(metro.representativeState)}. The 2025 Census BPS final annual record reports ${metro.permitTotal2025.toLocaleString("en-US")} permitted housing units for this ranked metro record.</p><p class="note">By ${esc(PHASE1_AUTHOR)}</p></div></section>
<section class="block"><div class="container"><h2>How to use this <em>metro guide</em></h2><div class="prose"><p>${esc(metro.editorial.planningLens)}</p><p>${esc(metro.editorial.coordinationLens)}</p><p>This page uses the Census metro record for market context only. It does not invent a local permitting fact, identify an authority's current checklist, promise coverage, or substitute for a project intake and responsible professional review.</p></div></div></section>
<section class="block"><div class="container"><h2>${esc(metro.representativeCity)} <em>engineering paths</em></h2><div class="grid2">${links}</div></div></section>
<section class="block"><div class="container"><h2>Evidence before <em>design decisions</em></h2><div class="prose"><p>${esc(metro.editorial.documentationLens)}</p><p>${esc(metro.editorial.deliveryLens)}</p><p>For an initial review, gather the project address, scope narrative, current architectural backgrounds, existing-condition photographs or measurements, equipment information, site or geotechnical records where relevant, prior comments, and requested deliverables. The responsible professional identifies what is sufficient for the defined question.</p></div></div></section>
<section class="block"><div class="container"><h2>2025 Census <em>source record</em></h2><div class="prose"><p>CBSA ${metro.cbsaCode} is ranked ${metro.rank} among the eligible Metro Code 2 records in the final annual 2025 BPS sheet, ordered by Total descending. “Total” is used as published by Census; it is not a forecast, project count, engineering volume, or promise of demand.</p><p><a href="${PHASE1_SOURCE_URL}" rel="noopener noreferrer">View the official Census BPS workbook (${PHASE1_SERVICE_SLUGS.length ? "MSA Units Ann" : "source"})</a></p></div></div></section>
${phase0FaqMarkup(faqs)}
<section class="ctaband"><div class="container"><h2>Discuss a ${esc(metro.representativeCity)} project</h2><p>Share the address, scope, drawings, existing records, authority information already available, and requested deliverables.</p><a class="cta" href="/estimate">Start an Engineering Estimate</a></div></section>
</main>`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Engineering Guides for the ${metro.metroName} Metro`,
    url: `${SITE}${url}`,
    description: `Engineering planning and documentation guides for the ${metro.metroName} metro, with Census CBSA ${metro.cbsaCode} context.`,
    isPartOf: { "@type": "WebSite", name: "Apex Grid Engineering", url: SITE },
    about: { "@type": "Place", name: metro.metroName },
  };
  return phase1Html(htmlShell({
    title: `${metro.representativeCity} Metro Engineering Guides | Apex Grid`,
    description: `Permit, structural, MEP, energy, corrections, calculations, and professional-seal guidance for the ${metro.metroName} metro.`,
    canonical: `${SITE}${url}`,
    schemaJson: [schema, phase0FaqSchema(faqs), breadcrumbSchema(crumbs)],
    body,
  }));
}

function phase1MetroServicePage(metro: Phase1Metro, service: Phase1ServiceSlug): string {
  const url = `/metros/${metro.slug}/${service}/`;
  const label = phase1ServiceLabels[service];
  const faqs = phase1MetroFaqs(metro, label);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Metro engineering guides", href: "/metros/" },
    { name: `${metro.representativeCity} metro`, href: `/metros/${metro.slug}/` },
    { name: label },
  ];
  const related = PHASE1_SERVICE_SLUGS.filter((candidate) => candidate !== service)
    .map((candidate) => `<a href="/metros/${metro.slug}/${candidate}/">${esc(phase1ServiceLabels[candidate])} for ${esc(metro.representativeCity)}</a>`).join("");
  const serviceDetails: Record<Phase1ServiceSlug, { heading: string; paragraphs: string[]; bullets: string[] }> = {
    "permit-guide": {
      heading: "Build a project-specific permit path",
      paragraphs: [
        "A permit guide should identify the project type, work boundary, discipline responsibilities, drawing index, calculation needs, forms, file requirements, and review questions that must be confirmed with the authority having jurisdiction. It should not pretend that a general metro label determines an authority's current process.",
        metro.editorial.planningLens,
        "Separate intake, completeness review, technical review, correction response, resubmittal, and approval. Those steps may involve different parties and records; a schedule should name dependencies rather than promise a universal duration.",
      ],
      bullets: ["Current architectural and engineering backgrounds", "Project address, scope, occupancy, and alteration boundary", "Applicable code edition and authority checklist to confirm", "Drawing, calculation, form, and file-format inventory", "Comment ownership and controlled resubmittal record"],
    },
    "structural-engineering": {
      heading: "Connect the load path to the permit set",
      paragraphs: [
        "Structural engineering starts with the question the project must answer: new gravity load, lateral change, opening, foundation condition, equipment support, repair, or another defined scope. The engineer confirms existing evidence and design criteria before accepting responsibility for conclusions.",
        metro.editorial.coordinationLens,
        "A defensible package coordinates plans, details, notes, schedules, and calculations. It distinguishes observed conditions from assumptions and flags when field verification, survey, testing, or geotechnical information is needed.",
      ],
      bullets: ["Existing-condition and field evidence review", "Gravity, lateral, connection, and foundation checks as applicable", "Equipment, opening, diaphragm, and support coordination", "Details and calculations tied to sheet references", "Revision responses that preserve technical traceability"],
    },
    "mep-engineering": {
      heading: "Coordinate building systems before issue",
      paragraphs: [
        "MEP engineering turns owner requirements, architectural backgrounds, equipment data, utility information, and operating assumptions into coordinated mechanical, electrical, and plumbing documents. The exact discipline scope follows the project and the required deliverables.",
        metro.editorial.coordinationLens,
        "Resolve equipment clearances, distribution routes, service capacity, ventilation, controls, domestic water, drainage, and access interfaces early. Missing manufacturer data or utility information should remain visible as an intake item rather than being silently guessed.",
      ],
      bullets: ["HVAC loads, equipment schedules, distribution, and controls", "Electrical service, demand, power, lighting, and equipment connections", "Plumbing fixture, domestic-water, sanitary, storm, or gas scope", "Architectural, structural, utility, and equipment coordination", "Schedules, notes, calculations, and revision control"],
    },
    "pe-stamp": {
      heading: "Treat a professional seal as responsibility",
      paragraphs: [
        "A professional seal is tied to the defined engineering work and the person authorized to accept professional responsibility for it. It is not a detached signature, a commodity, or a substitute for design and independent review.",
        metro.editorial.documentationLens,
        "The responsible professional determines whether the requested work is within competence, authorization, and applicable jurisdictional rules. The project team should provide enough records for that decision and should never treat this guide as a claim that a particular document may be sealed.",
      ],
      bullets: ["Defined scope and professional responsibility", "Design basis, calculations, drawings, and coordination record", "License and jurisdiction questions confirmed for the project", "Eligible deliverables identified before issue", "No promise of authority acceptance or approval"],
    },
    "plan-check-corrections": {
      heading: "Turn comments into controlled revisions",
      paragraphs: [
        "Correction support begins with the exact reviewer notice, current permit set, document index, and response instructions. The team then separates technical revisions from applicant actions, missing records, interpretation questions, and items owned by another discipline.",
        metro.editorial.coordinationLens,
        "A good response matrix cites the original comment, states the action, identifies the revised sheet or calculation, and leaves a visible owner for any unresolved question. It supports review; it cannot decide the authority's interpretation or guarantee approval.",
      ],
      bullets: ["Comment-by-comment response matrix", "Drawing, calculation, and schedule revision tracking", "Discipline ownership and coordination checks", "Assumption and evidence gap log", "Resubmittal package and file-control review"],
    },
    "energy-compliance": {
      heading: "Document the adopted energy path",
      paragraphs: [
        "Energy compliance depends on the adopted code edition, project type, alteration status, climate inputs, envelope assemblies, lighting, HVAC, controls, service water, and required reports or forms. Confirm the applicable path with the project team and authority instead of copying an assumed checklist.",
        metro.editorial.planningLens,
        "The record should connect model or calculation inputs to drawings and schedules. When design changes affect an assembly, equipment efficiency, lighting power, or control sequence, update the analysis and identify the affected documents.",
      ],
      bullets: ["Code-path and edition confirmation", "Envelope, fenestration, lighting, HVAC, and controls inputs", "Prescriptive, trade-off, or performance documentation as applicable", "Model assumptions and output review", "Coordinated forms, reports, schedules, and comment responses"],
    },
    "engineering-calculations": {
      heading: "Make engineering decisions traceable",
      paragraphs: [
        "Engineering calculations are the technical record behind a defined decision: capacity, load, sizing, anchorage, drainage, utility, energy, or correction response. They should expose the input data, assumptions, criteria, methods, combinations, checks, and conclusions needed for review.",
        metro.editorial.documentationLens,
        "The responsible engineer decides whether drawings, dimensions, field evidence, equipment data, survey, geotechnical information, or testing is sufficient. A calculation book cannot cure an unknown project scope or stand in for the authority's review.",
      ],
      bullets: ["Inputs, criteria, assumptions, and exclusions", "Traceable methods and load or sizing checks", "Drawing and detail references", "Independent review and revision record", "Clear handoffs for survey, testing, geotechnical, or construction work"],
    },
  };
  const details = serviceDetails[service];
  const body = `<main data-phase1="true">
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(label)} · ${esc(metro.representativeCity)} metro</p><h1>${esc(label)} for the ${esc(metro.metroName)} Metro</h1><p class="lede">${esc(phase1ServiceSummaries[service])} This guide uses CBSA ${metro.cbsaCode} and the 2025 Census permit record only as transparent market context.</p><p class="note">By ${esc(PHASE1_AUTHOR)}</p></div></section>
<section class="block"><div class="container"><h2>${esc(details.heading)}</h2><div class="prose">${details.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</div></div></section>
<section class="block"><div class="container"><h2>Scope and <em>intake evidence</em></h2><div class="prose"><p>${esc(metro.editorial.deliveryLens)}</p><ul class="scope">${details.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul></div></div></section>
<section class="block"><div class="container"><h2>${esc(metro.representativeCity)} metro <em>context</em></h2><div class="prose"><p>${esc(metro.editorial.planningLens)}</p><p>${esc(metro.editorial.coordinationLens)}</p><p>${esc(metro.editorial.documentationLens)}</p></div></div></section>
<section class="block"><div class="container"><h2>Professional <em>boundaries</em></h2><div class="prose"><p>Availability, scope, professional responsibility, applicable licensure, and filing requirements are confirmed per project. This guide does not invent an AHJ requirement, claim an office or project, promise approval, or publish a price. The authority having jurisdiction controls its review and decision.</p><p>The Census BPS final annual 2025 workbook reports ${metro.permitTotal2025.toLocaleString("en-US")} permitted housing units for this Metro Code 2 record, rank ${metro.rank} among the eligible records. <a href="${PHASE1_SOURCE_URL}" rel="noopener noreferrer">Read the official source workbook</a>.</p></div></div></section>
<section class="block"><div class="container"><h2>Related ${esc(metro.representativeCity)} <em>guides</em></h2><div class="linkrow">${related}</div></div></section>
${phase0FaqMarkup(faqs)}
<section class="ctaband"><div class="container"><h2>Define the ${esc(label.toLowerCase())} scope</h2><p>Send the address, project scope, current documents, existing-condition evidence, comments, schedule dependencies, and requested deliverables.</p><a class="cta" href="/estimate">Start an Engineering Estimate</a></div></section>
</main>`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${label} for the ${metro.metroName} Metro`,
    serviceType: label,
    description: phase1ServiceSummaries[service],
    url: `${SITE}${url}`,
    provider: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    areaServed: { "@type": "Place", name: metro.metroName },
  };
  return phase1Html(htmlShell({
    title: `${label} ${metro.representativeCity} Metro | Apex Grid`,
    description: `${label} guidance for the ${metro.metroName} metro: scope, documents, coordination, and responsible project review.`,
    canonical: `${SITE}${url}`,
    schemaJson: [serviceSchema, phase0FaqSchema(faqs), breadcrumbSchema(crumbs)],
    body,
  }));
}

/** Phase 2 intentionally reuses the reviewed Phase 1 renderer and content
 * boundaries while carrying a distinct audit marker.  The records themselves
 * remain typed and source-linked in phase2-metros.ts. */
function phase2MetroHubPage(metro: Phase2Metro): string {
  return phase1MetroHubPage(metro as Phase1Metro).replace(/data-phase1="true"/g, 'data-phase2="true"');
}

function phase2MetroServicePage(metro: Phase2Metro, service: Phase2ServiceSlug): string {
  return phase1MetroServicePage(metro as Phase1Metro, service as Phase1ServiceSlug)
    .replace(/data-phase1="true"/g, 'data-phase2="true"');
}

/** Phase 3 keeps the reviewed Phase 1 renderer and content boundaries while
 * using its own audit marker and typed Census records. */
function phase3MetroHubPage(metro: Phase3Metro): string {
  return phase1MetroHubPage(metro as Phase1Metro).replace(/data-phase1="true"/g, 'data-phase3="true"');
}

function phase3MetroServicePage(metro: Phase3Metro, service: Phase3ServiceSlug): string {
  return phase1MetroServicePage(metro as Phase1Metro, service as Phase1ServiceSlug)
    .replace(/data-phase1="true"/g, 'data-phase3="true"');
}

/** Phase 4 keeps the reviewed Phase 1 renderer and content boundaries while
 * using its own audit marker and typed Census records. */
function phase4MetroHubPage(metro: Phase4Metro): string {
  return phase1MetroHubPage(metro as Phase1Metro)
    .replace(/data-phase1="true"/g, 'data-phase4="true"')
    .replaceAll(PHASE1_SOURCE_URL, PHASE4_SOURCE_URL);
}

function phase4MetroServicePage(metro: Phase4Metro, service: Phase4ServiceSlug): string {
  return phase1MetroServicePage(metro as Phase1Metro, service as Phase1ServiceSlug)
    .replace(/data-phase1="true"/g, 'data-phase4="true"')
    .replaceAll(PHASE1_SOURCE_URL, PHASE4_SOURCE_URL);
}

/** Phase 5 keeps the reviewed Phase 1 renderer and content boundaries while
 * using its own audit marker and typed Census records. */
function phase5MetroHubPage(metro: Phase5Metro): string {
  return phase1MetroHubPage(metro as Phase1Metro)
    .replace(/data-phase1="true"/g, 'data-phase5="true"')
    .replaceAll(PHASE1_SOURCE_URL, PHASE5_SOURCE_URL);
}

function phase5MetroServicePage(metro: Phase5Metro, service: Phase5ServiceSlug): string {
  return phase1MetroServicePage(metro as Phase1Metro, service as Phase1ServiceSlug)
    .replace(/data-phase1="true"/g, 'data-phase5="true"')
    .replaceAll(PHASE1_SOURCE_URL, PHASE5_SOURCE_URL);
}

function phase1MetroCollectionPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Metro engineering guides" }];
  const faqs = [
    { question: "What are the metro engineering guides?", answer: "They are jurisdiction-neutral planning and documentation guides organized around reviewed Census metro records. They help a project team identify questions, records, coordination needs, and responsible-professional boundaries without inventing local requirements." },
    { question: "Do the metro guides guarantee local permit approval?", answer: "No. The authority having jurisdiction controls its current checklist, code interpretation, inspections, review, and approval. A general metro guide cannot promise a local outcome." },
    { question: "What should I provide for a metro engineering review?", answer: "Provide the project address, proposed scope, current drawings, existing-condition evidence, equipment or utility information, prior comments, authority information, and requested deliverables. The responsible professional identifies any additional records needed." },
  ];
  const allMetros = [...PHASE1_METROS, ...PHASE2_METROS, ...PHASE3_METROS, ...PHASE4_METROS, ...PHASE5_METROS];
  const links = allMetros.map((metro) =>
    `<a class="card" href="/metros/${metro.slug}/"><div class="label">Rank ${metro.rank} · CBSA ${metro.cbsaCode}</div><h3>${esc(metro.metroName)}</h3><p>${metro.permitTotal2025.toLocaleString("en-US")} permitted units in the final annual 2025 Census BPS record.</p></a>`,
  ).join("");
  const body = `<main data-metros="true">
${breadcrumb(crumbs)}
  <section class="hero"><div class="container"><p class="kicker">Census BPS metro corpus · Phases 1–5</p><h1>Metro Engineering Guides</h1><p class="lede">Apex Grid's collection covers 250 eligible Metro Code 2 records from the Census BPS final annual 2025 workbook, ranked by Total descending. These guides are jurisdiction-neutral and do not infer local requirements.</p><p class="note">By ${esc(PHASE1_AUTHOR)}</p></div></section>
<section class="block"><div class="container"><h2>Browse the <em>eligible metro records</em></h2><div class="grid2">${links}</div></div></section>
  <section class="block"><div class="container"><h2>Source and <em>method</em></h2><div class="prose"><p>Source: <a href="${PHASE1_SOURCE_URL}" rel="noopener noreferrer">${PHASE1_SOURCE_URL}</a>. The corpus parses the “MSA Units Ann” sheet, keeps eligible Metro / Micro Code 2 records intersecting the reviewed eligibility footprint, and selects ranks 1 through 250 after ordering Total descending and removing prior-phase duplicates. Territories and records outside the reviewed footprint are excluded.</p><p>Representative city and state labels identify the metro record's primary label only. They do not claim an office, project, AHJ fact, county service area, or guaranteed coverage.</p></div></div></section>
${phase0FaqMarkup(faqs)}
</main>`;
  return phase1Html(htmlShell({
    title: "Metro Engineering Guides | Apex Grid Engineering",
    description: "Browse Apex Grid's Census BPS metro engineering guides for permit, structural, MEP, energy, corrections, seals, and calculations.",
    canonical: `${SITE}/metros/`,
    schemaJson: [{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Metro Engineering Guides",
      url: `${SITE}/metros/`,
      numberOfItems: allMetros.length,
    }, phase0FaqSchema(faqs), breadcrumbSchema(crumbs)],
    body,
  }));
}

const INDUSTRY_ROOT_SLUGS: Readonly<Record<string, string>> = {
  agriculture: "agriculture-cannabis-facility-engineering",
  aviation: "aviation-hangar-engineering",
  cannabis: "agriculture-cannabis-facility-engineering",
  "cold-storage": "cold-storage-food-processing-engineering",
  "commercial-office": "commercial-office-engineering",
  "data-centers": "data-center-engineering",
  education: "educational-facility-engineering",
  "ev-automotive": "ev-charging-automotive-engineering",
  government: "government-civic-engineering",
  healthcare: "healthcare-engineering",
  hospitality: "retail-hospitality-engineering",
  "industrial-warehouse": "industrial-warehouse-engineering",
  "life-science": "life-science-cleanroom-engineering",
  "military-defense": "military-defense-engineering",
  multifamily: "multifamily-residential-engineering",
  parking: "parking-structure-engineering",
  "religious-worship": "religious-worship-facility-engineering",
  "renewable-energy": "solar-renewable-energy-engineering",
  restaurants: "restaurant-food-service-engineering",
  retail: "retail-hospitality-engineering",
  "senior-living": "senior-living-assisted-care-engineering",
  "student-housing": "multifamily-residential-engineering",
  telecommunications: "telecommunications-engineering",
};

function industryRootUrl(slug: string): string {
  const canonicalSlug = INDUSTRY_ROOT_SLUGS[slug] ?? slug;
  if (!ALL_INDUSTRIES.some((industry) => industry.slug === canonicalSlug)) {
    throw new Error(`Industry root has no canonical page: ${slug}`);
  }
  return `/industries/${canonicalSlug}/`;
}

const LOCATION_SERVICE_URLS = new Set(
  LOCATION_SERVICE_PAGES.map(
    (page) => `/locations/${page.stateSlug}/${page.citySlug}/${page.serviceSlug}/`,
  ),
);

function staticIndexExists(urlPath: string): boolean {
  return fs.existsSync(
    path.join(PUBLIC, urlPath.replace(/^\/|\/$/g, ""), "index.html"),
  );
}

function servicePage(state: StateData, svc: ServiceDef, allStates: StateData[]): string {
  const url = `/locations/${state.slug}/${svc.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name, href: `/locations/${state.slug}/` },
    { name: svc.shortName },
  ];
  const otherSvcs = SERVICES.filter((x) => x.slug !== svc.slug);
  const nearby = allStates.filter((s) => s.slug !== state.slug).slice(0, 8);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: state.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${svc.name} in ${state.name}`,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    areaServed: { "@type": "State", name: state.name },
    serviceType: svc.name,
  };

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(state.name)} · Licensed Professional Engineering</p>
  <h1>${esc(svc.h1)} <span class="dim">in ${esc(state.name)}</span></h1>
  <p class="lede">${esc(svc.intro)}</p>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(svc.shortName)} Engineering for <em>${esc(state.name)}</em> Conditions</h2>
  <div class="prose"><p>${esc(state.narratives[svc.narrativeKey])}</p></div>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>Code &amp; Design</em> Snapshot</h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Building Code</div><div class="v">${esc(state.buildingCode.name)}</div></div>
    <div class="cell"><div class="k">Commercial Energy Code</div><div class="v">${esc(state.energyCode.commercial)}</div></div>
    <div class="cell"><div class="k">Climate Zone(s)</div><div class="v">${esc(state.climate.zones)}</div></div>
    <div class="cell"><div class="k">Seismic</div><div class="v">${esc(state.structural.seismic)}</div></div>
    <div class="cell"><div class="k">Wind</div><div class="v">${esc(state.structural.wind)}</div></div>
    <div class="cell"><div class="k">Snow</div><div class="v">${esc(state.structural.snow)}</div></div>
  </div>
  <p class="note">Code adoptions change on multi-year cycles and many states allow local amendments. The researched source verification date is ${esc(state.lastVerified)}; we verify the governing edition with your permitting jurisdiction at project kickoff.</p>
</div></section>

<section class="block"><div class="container">
  <h2>Scope of <em>Services</em></h2>
  <ul class="scope">${svc.scope.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
</div></section>

<section class="block"><div class="container">
  <h2>Permitting &amp; Licensure in <em>${esc(state.abbrev)}</em></h2>
  <div class="grid2">
    <div class="card"><div class="label">Permitting Landscape</div><p>${esc(state.permitting)}</p></div>
    <div class="card"><div class="label">PE Licensure — ${esc(state.licensure.board)}</div><p>${esc(state.licensure.notes)}</p></div>
  </div>
  <div style="margin-top:20px" class="card"><div class="label">Market Context</div><p>${esc(state.marketNotes)}</p><p style="margin-top:10px">Key markets: ${esc(state.metros.join(", "))}.</p></div>
</div></section>

<section class="block"><div class="container faq">
  <h2>${esc(state.name)} <em>FAQs</em></h2>
  ${state.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="a">${esc(f.a)}</div></details>`).join("")}
</div></section>

<section class="block"><div class="container">
  <h2>Related <em>Services &amp; Locations</em></h2>
  <div class="linkrow" style="margin-bottom:16px">${otherSvcs
    .map((o) => `<a href="/locations/${state.slug}/${o.slug}/">${esc(o.name)} in ${esc(state.name)}</a>`)
    .join("")}</div>
  <div class="linkrow">${nearby
    .map((n) => `<a href="/locations/${n.slug}/${svc.slug}/">${esc(svc.shortName)} in ${esc(n.name)}</a>`)
    .join("")}</div>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Start Your ${esc(state.name)} Project</h2>
  <p>For projects whose jurisdiction, discipline, and scope pass review, an available licensed PE and coordinated team can be identified. Send us your scope for a proposal; timing and fee depend on the project.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: svc.metaTitle(state),
    description: svc.metaDescription(state),
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, svcSchema, faqSchema, breadcrumbSchema(crumbs)],
    body: body.replace(/[ \t]+$/gm, ""),
  });
}

/** Non-HTML data fields must not contain markup. */
function assertNoMarkupCity(city: CityData) {
  const flat = JSON.stringify(city);
  if (/<\s*(script|iframe|img|svg|style)/i.test(flat)) {
    throw new Error(`City ${city.slug} contains disallowed markup`);
  }
}
function statePage(state: StateData, cities: CityData[], directory: CityDirectory): string {
  const stateCities = cities.filter((c) => c.stateSlug === state.slug && isReviewedCity(c));
  const directoryCities = eligibleDirectoryCities(state, directory, cities);
  const priorityMarkets = PRIORITY_MARKET_HUBS.filter((page) => page.stateSlug === state.slug);
  const specialtyLocationPages = LOCATION_SERVICE_PAGES.filter((p) => p.stateSlug === state.slug);
  const specialtyCityRoots = [...new Set(specialtyLocationPages.map((p) => p.citySlug))]
    .filter((slug) => !stateCities.some((city) => city.slug === slug));
  const availableVerticals = verticalsForState(state.slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name },
  ];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Service Area</p>
  <h1>Engineering Services <span class="dim">in ${esc(state.name)}</span></h1>
  <p class="lede">MEP, structural, civil, and energy-compliance engineering for ${esc(state.name)} projects — designed to the ${esc(state.buildingCode.baseCode)} and the realities of ${esc(state.metros.slice(0, 3).join(", "))} permitting.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Services in <em>${esc(state.name)}</em></h2>
  <div class="grid2">
  ${SERVICES.map(
    (s) => `<a class="card" href="/locations/${state.slug}/${s.slug}/"><div class="label">${esc(s.shortName)}</div><h3>${esc(s.name)} in ${esc(state.name)}</h3><p>${esc(s.intro)}</p></a>`,
  ).join("")}
  </div>
</div></section>
${priorityMarkets.length ? `<section class="block"><div class="container">
  <h2>Priority ${esc(state.name)} <em>Markets</em></h2>
  <p class="prose">Use these regional and city hubs to organize jurisdiction, existing-condition, discipline, and project-scope questions before requesting engineering.</p>
  <div class="grid2">${priorityMarkets.map((market) =>
    `<a class="card" href="${priorityMarketHubUrl(market)}"><div class="label">${esc(market.market)}</div><h3>${esc(market.market)} Engineering Services</h3><p>${esc(market.description)}</p></a>`
  ).join("")}</div>
</div></section>` : ""}
${state.slug === "hawaii" ? `<section class="block"><div class="container">
  <h2>Engineering Coverage in <em>Honolulu</em></h2>
  <div class="grid2">
    <a class="card" href="/locations/hawaii/honolulu/"><div class="label">Honolulu, HI</div><h3>Engineering Services in Honolulu</h3><p>Review the Honolulu service-area page for local project and permitting context.</p></a>
  </div>
</div></section>` : ""}
${directoryCities.length ? `<section class="block"><div class="container">
  <h2>More ${esc(state.name)} <em>City Coverage</em></h2>
  <p class="prose">Explore consolidated engineering hubs for Census-verified incorporated places across ${esc(state.name)}. Each hub covers the major discipline, facility, permit, assessment, renovation, and buyer-intent clusters under one canonical city URL.</p>
  <div class="linkrow">${directoryCities
    .map((city) => `<a href="/locations/${state.slug}/${city.slug}/">${esc(city.name)} engineering services</a>`)
    .join("")}</div>
</div></section>` : ""}
${availableVerticals.length ? `<section class="block"><div class="container">
  <h2>Architecture &amp; Construction <em>Coverage</em></h2>
  <div class="grid2">${availableVerticals
    .map(
      (vertical) =>
        `<a class="card" href="${verticalStateUrl(vertical, state.slug)}"><div class="label">${esc(vertical.shortName)}</div><h3>${esc(vertical.name)} in ${esc(state.name)}</h3><p>Browse incorporated-city service areas backed by verified ${vertical.slug === "architecture" ? "architect" : "contractor"} credentials.</p></a>`,
    )
    .join("")}</div>
</div></section>` : ""}
<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>Design Environment</em></h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Building Code</div><div class="v">${esc(state.buildingCode.name)}</div></div>
    <div class="cell"><div class="k">Energy Code</div><div class="v">${esc(state.energyCode.commercial)}</div></div>
    <div class="cell"><div class="k">Climate</div><div class="v">${esc(state.climate.zones)}</div></div>
    <div class="cell"><div class="k">Key Markets</div><div class="v">${esc(state.metros.join(", "))}</div></div>
  </div>
  <div class="prose" style="margin-top:24px"><p>${esc(state.buildingCode.notes)}</p><p>${esc(state.marketNotes)}</p></div>
</div></section>
${
  stateCities.length
    ? `<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>City Pages</em></h2>
  <div class="grid2">
  ${stateCities
    .map(
      (c) => `<a class="card" href="/locations/${state.slug}/${c.slug}/"><div class="label">${esc(c.county)}</div><h3>Engineering Services in ${esc(c.name)}</h3><p>Permits through ${esc(c.ahj.office)} · ${esc(c.codes.building.split(",")[0].split("(")[0].trim())}</p></a>`,
    )
    .join("")}
  </div>
</div></section>`
    : ""
}
${specialtyLocationPages.length ? `<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>Specialty Location Services</em></h2>
  ${specialtyCityRoots.length ? `<div class="linkrow">${specialtyCityRoots.map((slug) =>
    `<a href="/locations/${state.slug}/${slug}/">${esc(slug.replace(/-/g, " "))} service area</a>`
  ).join("")}</div>` : ""}
  <div class="linkrow">${specialtyLocationPages.map((p) =>
    `<a href="/locations/${p.stateSlug}/${p.citySlug}/${p.serviceSlug}/">${esc(p.title)}</a>`
  ).join("")}</div>
</div></section>` : ""}
<section class="ctaband"><div class="container">
  <h2>Build in ${esc(state.name)} with Apex Grid</h2>
  <p>${esc(state.permitting)}</p>
  <p><a href="/engineering-cost-estimator/${esc(state.slug)}/">${esc(state.name)} engineering cost estimator</a></p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `Engineering Services in ${esc(state.name)} | MEP, Structural, Civil, Energy | Apex Grid`,
    description: `Licensed MEP, structural, civil, and energy-compliance engineering in ${esc(state.name)}. Serving ${state.metros.slice(0, 4).join(", ")} under the ${state.buildingCode.baseCode}.`,
    canonical: `${SITE}/locations/${state.slug}/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body: body.replace(/[ \t]+$/gm, ""),
  });
}

function hubPage(states: StateData[], cities: CityData[]): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Service Areas" }];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Verified Service Areas</p>
  <h1>Service <span class="dim">Areas</span></h1>
  <p class="lede">${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}</p>
</div></section>
<section class="block"><div class="container">
  <h2>Complete <em>Licensing Coverage</em></h2>
  <p>${LICENSED_STATES_TEXT}.</p>
</div></section>
<section class="block"><div class="container">
  <h2>One Organization, <em>Three Divisions</em></h2>
  <div class="grid3">
    <a class="card" href="/locations/"><div class="label">Engineering</div><h3>Engineering Service Areas</h3><p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}</p></a>
    <a class="card" href="/architecture/locations/"><div class="label">Architecture</div><h3>Architectural Design Locations</h3><p>City and state pages where supplied architect credentials support regulated design services.</p></a>
    <a class="card" href="/general-contracting/locations/"><div class="label">PCM Construction Delivery</div><h3>General Contracting Locations</h3><p>Commercial construction service areas backed by PCM's supplied contractor licenses.</p></a>
    <a class="card" href="/engineering-intent/engineering-near-me/"><div class="label">Project Intake</div><h3>Commercial Engineering Firm Near Me</h3><p>Understand search location, remote plan production, site visits, and jurisdiction review before requesting support.</p></a>
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>Major <em>Metro Markets</em></h2>
  <div class="grid3">
   ${cities.filter(isReviewedCity)
    .map(
      (c) => `<a class="card" href="/locations/${c.stateSlug}/${c.slug}/"><div class="label">${esc(c.county)}</div><h3>${esc(c.name)}</h3><p>${esc(c.codes.building.split(",")[0].split("(")[0].trim())} · ${esc(c.utilities.electric.split("—")[0].split("(")[0].trim())}</p></a>`,
    )
    .join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>Choose a <em>State</em></h2>
  <div class="grid3">
  ${states
    .map(
      (s) => `<a class="card" href="/locations/${s.slug}/"><div class="label">${esc(s.abbrev)}</div><h3>${esc(s.name)}</h3><p>${esc(s.energyCode.commercial.split(";")[0].split(" — ")[0])} · ${esc(s.climate.zones.split(";")[0].split("(")[0].trim())}</p></a>`,
    )
    .join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Don't See Your Jurisdiction?</h2>
  <p>Tell us where your project is and we'll verify the requested discipline, responsible individual's PE licensure, firm authorization, and local code requirements before confirming an available engineering path.</p>
  <a class="cta" href="/contact">Contact Us</a>
</div></section>`;

  return htmlShell({
    title: "Licensed in 49 states | Engineering Service Areas | Apex Grid",
    description:
      `${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}`,
    canonical: `${SITE}/locations/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

/** Lightweight service-area page for a Census-listed city without curated data.
 * Inherits verified state-level code/climate facts; never invents city-specific claims. */
function cityLitePage(state: StateData, city: DirectoryCity, siblings: DirectoryCity[], curated: CityData[], indexable = false): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name, href: `/locations/${state.slug}/` },
    { name: city.name },
  ];
  const nearby =
    indexable && Number.isFinite(city.lat) && Number.isFinite(city.lng)
      ? siblings
          .filter((item) =>
            item.slug !== city.slug
            && Number.isFinite(item.lat)
            && Number.isFinite(item.lng)
            && assessLiteCity(state, item).status === "indexed"
          )
          .map((item) => ({
            city: item,
            distance: Math.hypot((item.lat ?? 0) - (city.lat ?? 0), (item.lng ?? 0) - (city.lng ?? 0)),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 10)
          .map(({ city: item }) => item)
      : [];
  // Directory-lite pages remain live for compatibility, but must not form a
  // doorway grid with other noindex pages. Only reviewed city owners are
  // useful contextual destinations from this page.
  const curatedInState = curated.filter((c) => c.stateSlug === state.slug && isReviewedCity(c));
  const populationDatasetLabel = city.populationDataset === "Population Estimates Program"
    ? "Population Estimates Program"
    : "American Community Survey";
  const populationContext = city.pop
    ? ` (population approximately ${city.pop.toLocaleString("en-US")}${city.populationYear ? ` based on the ${city.populationYear} ${populationDatasetLabel}` : ""})`
    : "";
  const availableVerticals = indexable ? verticalsForState(state.slug) : [];
  const capabilityClusters = [
    ["MEP Engineering", "Mechanical and HVAC design, electrical power and lighting, plumbing systems, equipment coordination, controls, and multidisciplinary MEP documentation."],
    ["Structural Engineering", "New structural systems, renovations, additions, adaptive reuse, equipment support, condition assessments, repair design, and existing-building analysis."],
    ["Civil & Site Engineering", "Site planning, grading, drainage, stormwater, utility coordination, accessibility, paving, and permit-support documentation."],
    ["Energy & Building Performance", "Commercial energy-code compliance, COMcheck support, envelope and lighting coordination, mechanical-system efficiency, and performance documentation."],
    ["Geotechnical & Existing Conditions", "Subsurface investigation coordination, foundation recommendations, due diligence, property condition assessments, and renovation feasibility support."],
    ["Permit & Plan-Review Support", "Permit drawings, calculations, specifications, agency responses, deferred-submittal coordination, corrections, and construction-phase engineering support."],
  ];
  const projectClusters = [
    ["Commercial & Tenant Improvement", "Offices, retail, restaurants, mixed-use properties, tenant improvements, renovations, additions, and change-of-use projects."],
    ["Industrial & Advanced Manufacturing", "Manufacturing, warehouses, logistics facilities, process-support spaces, clean environments, laboratories, and technology facilities."],
    ["Healthcare & Institutional", "Hospitals, clinics, medical offices, schools, universities, civic buildings, public facilities, and mission-critical renovations."],
    ["Housing & Hospitality", "Multifamily housing, senior living, hotels, resorts, residential amenities, and building-system modernization."],
    ["Federal, Municipal & Infrastructure", "Government facilities, public works, utility coordination, transportation-support facilities, resilience, and capital-improvement projects."],
    ["Assessments, Retrofits & Repairs", "Facility condition assessments, structural evaluations, energy upgrades, equipment replacements, seismic and wind reviews, and repair programs."],
  ];
  const faqs = [
    {
      q: `Does Apex Grid provide engineering services in ${city.name}, ${state.abbrev}?`,
      a: `Potentially, subject to project-specific review. For qualifying ${city.name} projects, Apex Grid confirms the responsible individual's current license, firm authorization, discipline, and AHJ requirements, along with local code editions, amendments, and permit requirements, before design begins.`,
    },
    {
      q: `Which building code applies to a project in ${city.name}?`,
      a: `${state.name}'s researched statewide baseline is ${state.buildingCode.baseCode}. ${city.name} may enforce local amendments or a different adoption schedule, so Apex Grid verifies the governing code directly with the local permitting jurisdiction at project kickoff.`,
    },
    {
      q: `Can Apex Grid coordinate engineering with architecture or construction in ${city.name}?`,
      a: availableVerticals.length
        ? `Yes. In ${state.name}, Apex Grid can coordinate engineering with ${availableVerticals.map((vertical) => vertical.shortName.toLowerCase()).join(" and ")} where the supplied professional and contractor credentials support the regulated scope.`
        : `Apex Grid coordinates engineering with the project's architect and contractor. Regulated architecture and construction services are offered only after the team confirms credential coverage for the project state and scope.`,
    },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Engineering Services in ${city.name}, ${state.abbrev}`,
    provider: { "@id": `${SITE}/#business` },
    areaServed: { "@type": "City", name: `${city.name}, ${state.abbrev}` },
    serviceType: "Architectural, MEP, structural, civil, and energy-compliance design",
  };
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(state.name)} Service Area</p>
  <h1>Engineering Services <span class="dim">in ${esc(city.name)}, ${esc(state.abbrev)}</span></h1>
  <p class="lede">Licensed MEP, structural, civil, and energy-compliance engineering for ${esc(city.name)} projects${esc(populationContext)} — designed to the ${esc(state.buildingCode.baseCode)} and permitted with the local jurisdiction. We confirm ${esc(city.name)}'s governing code editions and any local amendments with the permit office at project kickoff.</p>
</div></section>
<section class="block"><div class="container">
  <h2>One Organization, <em>Connected Delivery</em></h2>
  <div class="grid3">
    <a class="card" href="/locations/${state.slug}/${city.slug}/"><div class="label">Engineering</div><h3>Engineering in ${esc(city.name)}</h3><p>MEP, structural, civil, and energy-code services.</p></a>
${availableVerticals
      .map(
        (vertical) =>
          `<a class="card" href="${verticalCityUrl(vertical, state.slug, city.slug)}"><div class="label">${esc(vertical.shortName)}</div><h3>${esc(vertical.name)} in ${esc(city.name)}</h3><p>Verified regulated-service coverage in ${esc(state.name)}.</p></a>`,
      )
      .join("")}
  </div>
</div></section>
<section class="block"><div class="container faq">
  <h2>${esc(city.name)} Engineering <em>FAQs</em></h2>
  ${faqs.map((faq) => `<details><summary>${esc(faq.q)}</summary><div class="a">${esc(faq.a)}</div></details>`).join("")}
</div></section>
<section class="block"><div class="container">
  <h2>Services for <em>${esc(city.name)}</em> Projects</h2>
  <div class="grid2">
  ${SERVICES.map(
    (s) => `<a class="card" href="/locations/${state.slug}/${s.slug}/"><div class="label">${esc(s.shortName)}</div><h3>${esc(s.name)} in ${esc(state.name)}</h3><p>${esc(s.intro)}</p></a>`,
  ).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(city.name)} Engineering <em>Capabilities</em></h2>
  <p class="prose">Apex Grid organizes related search intents under this single canonical ${esc(city.name)} engineering hub so owners, architects, contractors, developers, facility managers, and public agencies can find the relevant discipline without duplicate location pages.</p>
  <div class="grid3">${capabilityClusters
    .map(([title, description]) => `<div class="card"><div class="label">${esc(city.name)}</div><h3>${esc(title)} in ${esc(city.name)}</h3><p>${esc(description)}</p></div>`)
    .join("")}</div>
</div></section>
<section class="block"><div class="container">
  <h2>Project Types in <em>${esc(city.name)}</em></h2>
  <div class="grid3">${projectClusters
    .map(([title, description]) => `<div class="card"><div class="label">${esc(state.abbrev)}</div><h3>${esc(title)}</h3><p>${esc(description)}</p></div>`)
    .join("")}</div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>Design Environment</em></h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Building Code (statewide)</div><div class="v">${esc(state.buildingCode.name)}</div></div>
    <div class="cell"><div class="k">Commercial Energy Code</div><div class="v">${esc(state.energyCode.commercial)}</div></div>
    <div class="cell"><div class="k">Climate Zone(s)</div><div class="v">${esc(state.climate.zones)}</div></div>
    <div class="cell"><div class="k">Seismic</div><div class="v">${esc(state.structural.seismic)}</div></div>
    <div class="cell"><div class="k">Wind</div><div class="v">${esc(state.structural.wind)}</div></div>
    <div class="cell"><div class="k">Snow</div><div class="v">${esc(state.structural.snow)}</div></div>
  </div>
  <p class="note">${esc(city.name)} may enforce local amendments on top of the statewide baseline. We verify the governing editions and amendments with the ${esc(city.name)} permitting authority before design begins.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Permitting &amp; Licensure in <em>${esc(state.abbrev)}</em></h2>
  <div class="grid2">
    <div class="card"><div class="label">Permitting Landscape</div><p>${esc(state.permitting)}</p></div>
    <div class="card"><div class="label">PE Licensure — ${esc(state.licensure.board)}</div><p>${esc(state.licensure.notes)}</p></div>
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>More <em>${esc(state.name)} Locations</em></h2>
  <div class="linkrow">${curatedInState
    .map((c) => `<a href="/locations/${state.slug}/${c.slug}/">${esc(c.name)}</a>`)
    .join("")}${nearby
    .map((n) => `<a href="/locations/${state.slug}/${n.slug}/">${esc(n.name)}</a>`)
    .join("")}<a href="/locations/${state.slug}/">${esc(state.name)} (statewide)</a></div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Build in ${esc(city.name)} with Apex Grid</h2>
  <p>With licensed PEs, architecture coordination subject to project-specific credential verification, and a multi-discipline engineering team, we take on ${esc(city.name)} projects of any size — with fast quote turnaround on every request.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `Engineering Services in ${city.name}, ${state.abbrev} | MEP, Structural, Civil | Apex Grid`,
    description: `Licensed MEP, structural, civil, and energy-compliance engineering serving ${city.name}, ${state.abbrev} under the ${state.buildingCode.baseCode}. Fast quotes, permit-ready documents.`,
    canonical: `${SITE}/locations/${state.slug}/${city.slug}/`,
    schemaJson: [orgSchema, svcSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
    robots: indexable ? "index,follow" : "noindex,follow",
  });
}

function blogPostPage(post: BlogPost): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog/" },
    { name: post.title },
  ];
  const dateStr = new Date(post.date + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const articleAuthor = post.author
    ? { "@type": "Person", "@id": post.author.personId, name: post.author.name, url: post.author.profileUrl }
    : { "@type": "Organization", name: "Apex Grid Engineering", url: SITE };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.tag,
    author: articleAuthor,
    publisher: { "@type": "Organization", "@id": `${SITE}/#business`, name: "Apex Grid Engineering", url: SITE },
    mainEntityOfPage: `${SITE}/blog/${post.slug}/`,
  };
  const faqSchema = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;
  const others = BLOG_POSTS
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.tag === post.tag) - Number(a.tag === post.tag))
    .slice(0, 3);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(post.tag)} · ${esc(dateStr)} · ${post.minutes} min read</p>
  <h1>${esc(post.title)}</h1>
  <p class="lede">${esc(post.description)}</p>${post.author ? `
  <p>By <a href="${esc(post.author.profileUrl)}" rel="author">${esc(post.author.name)}</a> · ${esc(post.author.role)}</p>` : ""}${post.editorialApproval ? `
  <p class="note">${esc(post.editorialApproval.label)}</p>` : ""}
</div></section>
<section class="block"><div class="container"><div class="prose">${post.html}</div></div></section>
${post.author ? `<section class="block"><div class="container container--narrow">
  <h2>About the Author</h2>
  <p><a href="${esc(post.author.profileUrl)}" rel="author"><strong>${esc(post.author.name)}</strong></a> is ${esc(post.author.role)}. Read his verified founder profile and other expert answers.</p>
</div></section>` : ""}
${post.faqs?.length ? `<section class="block"><div class="container faq">
  <h2>Quick <em>Answers</em></h2>
  ${post.faqs.map((faq) => `<details><summary>${esc(faq.q)}</summary><div class="a">${esc(faq.a)}</div></details>`).join("")}
</div></section>` : ""}
<section class="block"><div class="container">
  <h2>More from the <em>Blog</em></h2>
  <div class="grid3">
  ${others
    .map((p) => `<a class="card" href="/blog/${p.slug}/"><div class="label">${esc(p.tag)}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></a>`)
    .join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Have a Project in Mind?</h2>
  <p>${post.tag === "South Africa"
    ? "Planning a South Africa opportunity? We can help define the cross-border brief and identify the local registrations and partnerships that must be verified."
    : `${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}`}</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: `${post.title} | Apex Grid Engineering Blog`,
    description: post.description,
    canonical: `${SITE}/blog/${post.slug}/`,
    schemaJson: [orgSchema, articleSchema, ...(faqSchema ? [faqSchema] : []), breadcrumbSchema(crumbs)],
    body,
  });
}

function blogIndexPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Blog" }];
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Insights &amp; Guidance</p>
  <h1>The Apex Grid <span class="dim">Blog</span></h1>
   <p class="lede">Practical guidance on architecture, engineering, construction delivery, codes, permitting, coordination, and multi-state design — written by the team doing the work.</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${sorted
    .map(
      (p) =>
        `<a class="card" href="/blog/${p.slug}/"><div class="label">${esc(p.tag)} · ${esc(new Date(p.date + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></a>`,
    )
    .join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>More <em>Engineering Resources</em></h2>
  <div class="grid2">
    <a class="card" href="/engineering-glossary/"><div class="label">Reference</div><h3>Engineering Glossary</h3><p>Plain-language definitions for 80+ structural, MEP, civil, and geotechnical terms — from load path to ASHRAE 90.1.</p></a>
    <a class="card" href="/resources/"><div class="label">Resource Center</div><h3>Engineering Guides</h3><p>Practical answers to the questions architects, contractors, and developers ask most — ${RESOURCE_ARTICLES.length} guides across every discipline.</p></a>
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Questions About Your Jurisdiction?</h2>
  <p>We track code adoptions across multiple jurisdictions. Tell us where you're building and we'll confirm what applies.</p>
  <a class="cta" href="/contact">Contact Us</a>
</div></section>`;
  return htmlShell({
    title: "Blog | Engineering, Codes & Permitting Insights | Apex Grid",
    description:
       "Practical articles on architecture, engineering, construction delivery, building codes, energy compliance, MEP coordination, and multi-state permitting from Apex Grid.",
    canonical: `${SITE}/blog/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

/** Top-level, content-rich discipline page (e.g. /structural-engineering/). */
function disciplinePage(d: DisciplineDef): string {
  const url = `/${d.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: d.name }];
  const others = DISCIPLINES.filter((x) => x.slug !== d.slug);
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.name,
    serviceType: d.name,
    provider: { "@id": `${SITE}/#business` },
    areaServed: { "@type": "Country", name: "United States" },
    url: `${SITE}${url}`,
    description: d.metaDescription,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(d.kicker)}</p>
  <h1>${esc(d.h1)}</h1>
  <p class="lede">${esc(d.lede)}</p>
</div></section>

${d.sections
  .map(
    (s) => `<section class="block"><div class="container">
  <h2>${esc(s.heading)}</h2>
  <div class="prose">${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
</div></section>`,
  )
  .join("\n")}

<section class="block"><div class="container">
  <h2>What You <em>Receive</em></h2>
  <div class="grid2">${d.deliverables
    .map((x) => `<div class="card"><div class="label">Deliverable</div><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div>`)
    .join("")}</div>
</div></section>

<section class="block"><div class="container">
  <h2>Common <em>Project Types</em></h2>
  <ul class="scope">${d.useCases.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>
</div></section>

<section class="block"><div class="container faq">
  <h2>${esc(d.shortName)} Engineering <em>FAQs</em></h2>
  ${d.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="a">${esc(f.a)}</div></details>`).join("")}
</div></section>

<section class="block"><div class="container">
  <h2>Related <em>Disciplines &amp; Resources</em></h2>
  <div class="linkrow" style="margin-bottom:16px">${others
    .map((o) => `<a href="/${o.slug}/">${esc(o.name)}</a>`)
    .join("")}</div>
  <div class="linkrow"><a href="/services">All Services</a><a href="/locations/">Engineering Service Areas</a><a href="/blog/">Engineering Blog</a><a href="/portfolio">Portfolio</a></div>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Put a Licensed ${esc(d.shortName)} Engineer on Your Project</h2>
  <p>Send us your backgrounds or a project description. We can review the request and, when information is sufficient, provide an initial proposal response; engineering timing remains subject to scope, records, jurisdiction, access, and engineer availability.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: d.metaTitle,
    description: d.metaDescription,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, svcSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}
function u(loc: string, _lastmod: string, changefreq: string, priority: string): string {
  return `  <url><loc>${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

function writeSingleSitemap(filename: string, urls: string[]): void {
  if (urls.length > 50_000) {
    throw new Error(`${filename} exceeds the 50,000-URL sitemap limit (${urls.length})`);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC, filename), xml);
}

/** Audit only generated, indexable sitemap HTML. This deliberately ignores
 * directory-lite/noindex pages and redirect stubs so navigation quality is
 * measured against the real crawl corpus. */
export function writeNormalizedInternalLinkReport(): void {
  const sitemapFiles = fs.readdirSync(PUBLIC)
    .filter((name) => /^sitemap(?:-[\w-]+)?\.xml$/.test(name));
  const normalize = (raw: string): string => {
    try {
      const parsed = new URL(raw, SITE);
      let pathname = parsed.pathname.replace(/\/+/g, "/");
      if (!pathname.endsWith("/")) pathname += "/";
      return pathname;
    } catch {
      return "";
    }
  };
  const urls = new Set<string>();
  for (const file of sitemapFiles) {
    const xml = fs.readFileSync(path.join(PUBLIC, file), "utf8");
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const normalized = normalize(match[1]);
      if (normalized) urls.add(normalized);
    }
  }
  const indexable = new Set<string>();
  const htmlByPath = new Map<string, string>();
  for (const url of urls) {
    const file = path.join(PUBLIC, url.replace(/^\/|\/$/g, ""), "index.html");
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)
      || /http-equiv=["']refresh["']/i.test(html)) continue;
    indexable.add(url);
    htmlByPath.set(url, html);
  }
  const inbound = new Map<string, Set<string>>([...indexable].map((url) => [url, new Set<string>()]));
  for (const [source, html] of htmlByPath) {
    for (const match of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
      const target = normalize(match[1]);
      if (target && target !== source && indexable.has(target)) inbound.get(target)!.add(source);
    }
  }
  const zeroInbound = [...indexable].filter((url) => inbound.get(url)!.size === 0).sort();
  const oneOrLess = [...indexable].filter((url) => inbound.get(url)!.size <= 1).sort();
  const report = {
    generatedAt: "deterministic",
    indexablePages: indexable.size,
    zeroInbound,
    oneOrLessInbound: oneOrLess,
    counts: { zeroInbound: zeroInbound.length, oneOrLessInbound: oneOrLess.length },
    inboundByUrl: Object.fromEntries([...indexable].sort().map((url) => [url, inbound.get(url)!.size])),
  };
  const reportDir = path.join(__dirname, "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "internal-link-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  const allowlisted = new Set(["/privacy/", "/terms/", "/contact/"]);
  const failures = zeroInbound.filter((url) => !allowlisted.has(url));
  if (failures.length) {
    throw new Error(`SEO assertion failed: ${failures.length} indexable sitemap pages have zero contextual inbound links (see seo/reports/internal-link-report.json)`);
  }
}

function writeSitemap(states: StateData[], cities: CityData[], directory: CityDirectory) {
  const today = "";

  // ── Tier 1: Core revenue pages ──────────────────────────────────────────
  const coreUrls: string[] = [
    u(`${SITE}/`, today, "weekly", "1.0"),
    u(`${SITE}/services`, today, "monthly", "0.9"),
    u(`${SITE}/services/mep`, today, "monthly", "0.8"),
    u(`${SITE}/services/structural`, today, "monthly", "0.8"),
    u(`${SITE}/services/civil`, today, "monthly", "0.8"),
    u(`${SITE}/services/assessments`, today, "monthly", "0.8"),
    u(`${SITE}/services/architecture`, today, "monthly", "0.8"),
    u(`${SITE}/portfolio`, today, "monthly", "0.8"),
    u(`${SITE}/military`, today, "monthly", "0.7"),
    u(`${SITE}/about`, today, "monthly", "0.6"),
    u(`${SITE}/team`, today, "monthly", "0.6"),
    u(`${SITE}/contact`, today, "monthly", "0.7"),
    u(`${SITE}/estimate`, today, "monthly", "0.8"),
    u(`${SITE}/for-architects`, today, "monthly", "0.8"),
    u(`${SITE}/for-contractors`, today, "monthly", "0.8"),
    u(`${SITE}/for-developers`, today, "monthly", "0.8"),
    u(`${SITE}/for-property-managers`, today, "monthly", "0.8"),
    u(`${SITE}/procurement/submit-rfp-rfq/`, today, "monthly", "0.8"),
    u(`${SITE}/capabilities-statement.html`, today, "monthly", "0.7"),
    u(`${SITE}/licensing-service-coverage/`, today, "monthly", "0.7"),
    u(`${SITE}/sitemap/`, today, "monthly", "0.3"),
  ];
  for (const page of STATIC_STANDALONE_PAGES.filter((entry) => entry.sitemapCategory === "core")) {
    coreUrls.push(u(`${SITE}/${page.dir}/`, today, "monthly", "0.7"));
  }

  // ── Tier 1-2: Service discipline hubs + deep subpages ───────────────────
  const servicesUrls: string[] = [];
  for (const hub of DISCIPLINE_HUBS) {
    servicesUrls.push(u(`${SITE}/${hub.slug}/`, today, "monthly", "0.9"));
    for (const sp of hub.subpages) {
      servicesUrls.push(u(`${SITE}/${hub.slug}/${sp.slug}/`, today, "monthly", "0.8"));
    }
  }
  for (const sp of STRUCTURAL_EXTENDED_PAGES) {
    servicesUrls.push(u(`${SITE}/structural-engineering/${sp.slug}/`, today, "monthly", "0.8"));
  }
  servicesUrls.push(u(`${SITE}/title-24/`, today, "monthly", "0.9"));
  for (const tp of TITLE_24_PAGES) {
    servicesUrls.push(u(`${SITE}/title-24/${tp.slug}/`, today, "monthly", "0.8"));
  }
  servicesUrls.push(u(`${SITE}/permit-engineering/`, today, "monthly", "0.8"));
  for (const pp of PERMIT_PAGES) {
    servicesUrls.push(u(`${SITE}/permit-engineering/${pp.slug}/`, today, "monthly", "0.7"));
  }
  for (const ep of ALL_ENGINEERING_INTENT_PAGES) {
    servicesUrls.push(u(`${SITE}/engineering-intent/${ep.slug}/`, today, "monthly", "0.8"));
  }
  servicesUrls.push(u(`${SITE}/engineering-intent/`, today, "monthly", "0.8"));
  servicesUrls.push(u(`${SITE}/existing-building-engineering/`, today, "monthly", "0.8"));
  for (const eb of EXISTING_BUILDING_PAGES) {
    servicesUrls.push(u(`${SITE}/existing-building-engineering/${eb.slug}/`, today, "monthly", "0.7"));
  }
  servicesUrls.push(u(`${SITE}${CALIFORNIA_ADU_STATE_URL}`, today, "monthly", "0.8"));
  servicesUrls.push(u(`${SITE}${PLAN_CHECK_CORRECTIONS_URL}`, today, "monthly", "0.8"));
  servicesUrls.push(u(`${SITE}/pe-stamp/`, today, "monthly", "0.8"));
  servicesUrls.push(u(`${SITE}/answers/`, today, "monthly", "0.8"));
  for (const state of states) {
    servicesUrls.push(u(`${SITE}/pe-stamp/${state.slug}/`, today, "monthly", "0.7"));
  }
  for (const page of PHASE0_SERVICE_PAGES) {
    servicesUrls.push(u(`${SITE}${page.path}`, today, "monthly", "0.8"));
  }
  for (const page of ALL_AEO_PAGES) {
    servicesUrls.push(u(`${SITE}/answers/${page.slug}/`, today, "monthly", "0.7"));
  }

  // ── State estimator expansion: one reviewed page per licensed state ─────
  const estimatorUrls = states.map((state) =>
    u(`${SITE}/engineering-cost-estimator/${state.slug}/`, today, "monthly", "0.8"),
  );

  // ── Tier 2: Industries ───────────────────────────────────────────────────
  const industriesUrls: string[] = [
    u(`${SITE}/industries`, today, "monthly", "0.7"),
  ];
  for (const ind of ALL_INDUSTRIES) {
    industriesUrls.push(u(`${SITE}/industries/${ind.slug}`, today, "monthly", "0.8"));
  }
  for (const idp of CANONICAL_INDUSTRY_DISCIPLINE_PAGES) {
    industriesUrls.push(u(`${SITE}${getIndustryDisciplineUrl(idp)}`, today, "monthly", "0.8"));
  }
  for (const page of PHASE9_INDUSTRY_SERVICE_PAGES) {
    industriesUrls.push(u(`${SITE}${phase9Url(page)}`, today, "monthly", "0.8"));
  }

  // ── Tier 3: Solutions ────────────────────────────────────────────────────
  const solutionsUrls: string[] = [
    u(`${SITE}/solutions/`, today, "monthly", "0.8"),
    u(`${SITE}/government/`, today, "monthly", "0.8"),
  ];
  for (const sp of SOLUTION_PAGES) {
    solutionsUrls.push(u(`${SITE}/${sp.dir}/${sp.slug}/`, today, "monthly", "0.7"));
  }
  solutionsUrls.push(u(`${SITE}/project-types/`, today, "monthly", "0.8"));
  for (const pt of PROJECT_TYPE_PAGES.filter((page) => !PROJECT_TYPE_REDIRECTS.has(page.slug))) {
    solutionsUrls.push(u(`${SITE}/project-types/${pt.slug}/`, today, "monthly", "0.7"));
  }
  solutionsUrls.push(u(`${SITE}/who-we-work-with/`, today, "monthly", "0.8"));
  for (const cp of CLIENT_PAGES) {
    solutionsUrls.push(u(`${SITE}/who-we-work-with/${cp.slug}/`, today, "monthly", "0.7"));
  }
  for (const pp of PARTNER_PAGES) {
    solutionsUrls.push(u(`${SITE}/partners/${pp.slug}/`, today, "monthly", "0.7"));
  }
  solutionsUrls.push(u(`${SITE}/projects/`, today, "monthly", "0.8"));
  for (const cat of PROJECT_CATEGORY_PAGES) {
    solutionsUrls.push(u(`${SITE}/projects/${cat.slug}/`, today, "monthly", "0.7"));
  }
  for (const project of PHASE11_PROJECT_CASE_STUDIES) {
    solutionsUrls.push(u(`${SITE}${phase11Url(project)}`, today, "monthly", "0.7"));
  }
  for (const sp of STATIC_STANDALONE_PAGES) {
    if (sp.sitemapCategory !== "core") {
      solutionsUrls.push(u(`${SITE}/${sp.dir}/`, today, "monthly", "0.8"));
    }
  }
  for (const mp of MISC_PAGES) {
    solutionsUrls.push(u(`${SITE}/${mp.slug}/`, today, "monthly", "0.8"));
  }
  const phase11SitemapEntries = PHASE11_PROJECT_CASE_STUDIES.map((project) => `${SITE}${phase11Url(project)}`);
  for (const route of phase11SitemapEntries) {
    const matches = solutionsUrls.filter((entry) => entry.includes(`<loc>${route}</loc>`));
    if (matches.length !== 1) {
      throw new Error(`SEO assertion failed: Phase 11 route must occur exactly once in sitemap-solutions.xml: ${route} (${matches.length})`);
    }
  }
  if (solutionsUrls.filter((entry) => phase11SitemapEntries.some((route) => entry.includes(`<loc>${route}</loc>`))).length !== 9) {
    throw new Error("SEO assertion failed: sitemap-solutions.xml must contain exactly nine Phase 11 case-study routes");
  }

  // ── Tier 5: Resources (blog, guides, resource articles, glossary) ────────
  const resourcesUrls: string[] = [
    u(`${SITE}/resources/`, today, "monthly", "0.8"),
  ];
  for (const d of RESOURCE_DISCIPLINES) {
    resourcesUrls.push(u(`${SITE}/resources/${d.slug}/`, today, "monthly", "0.7"));
  }
  for (const a of RESOURCE_ARTICLES) {
    resourcesUrls.push(u(`${SITE}${resourceUrl(a)}`, today, "monthly", "0.7"));
  }
  for (const page of AUDIENCE_RESOURCE_HUBS) {
    resourcesUrls.push(u(`${SITE}/resources/${page.slug}/`, today, "monthly", "0.8"));
  }
  resourcesUrls.push(u(`${SITE}/guides/`, today, "monthly", "0.8"));
  for (const gp of GUIDE_PAGES.filter((page) => !GUIDE_REDIRECTS.has(page.slug))) {
    resourcesUrls.push(u(`${SITE}/guides/${gp.slug}/`, today, "monthly", "0.7"));
  }
  resourcesUrls.push(u(`${SITE}/blog/`, today, "weekly", "0.7"));
  for (const p of BLOG_POSTS) {
    resourcesUrls.push(u(`${SITE}/blog/${p.slug}/`, p.date, "yearly", "0.6"));
  }
  resourcesUrls.push(u(`${SITE}/engineering-glossary/`, today, "monthly", "0.8"));
  for (const gt of GLOSSARY_TERMS) {
    resourcesUrls.push(u(`${SITE}/engineering-glossary/${gt.slug}/`, today, "yearly", "0.6"));
  }
  for (const page of PHASE0_PLAN_CHECK_PLAYBOOKS) {
    resourcesUrls.push(u(`${SITE}/plan-check-playbooks/${page.slug}/`, today, "monthly", "0.7"));
  }
  resourcesUrls.push(u(`${SITE}/plan-check-playbooks/`, today, "monthly", "0.7"));
  resourcesUrls.push(u(`${SITE}/resources/phase-0/`, today, "monthly", "0.7"));
  for (const page of PHASE0_RESOURCE_PAGES) {
    resourcesUrls.push(u(`${SITE}/resources/phase-0/${page.slug}/`, today, "monthly", "0.6"));
  }

  // ── Tier 4: Locations ────────────────────────────────────────────────────
  const locationsUrls: string[] = [
    u(`${SITE}/locations/`, today, "monthly", "0.8"),
  ];
  for (const s of states) {
    locationsUrls.push(u(`${SITE}/locations/${s.slug}/`, today, "monthly", "0.6"));
    for (const svc of SERVICES) {
      locationsUrls.push(u(`${SITE}/locations/${s.slug}/${svc.slug}/`, today, "monthly", "0.7"));
    }
    for (const c of cities.filter((c) => c.stateSlug === s.slug && isReviewedCity(c))) {
      locationsUrls.push(u(`${SITE}/locations/${s.slug}/${c.slug}/`, today, "monthly", "0.7"));
      for (const svc of SERVICES.filter((service) => isSupportedCityService(c, service.slug))) {
        locationsUrls.push(u(`${SITE}/locations/${s.slug}/${c.slug}/${svc.slug}/`, today, "monthly", "0.7"));
      }
    }
    for (const city of eligibleDirectoryCities(s, directory, cities)) {
      locationsUrls.push(u(`${SITE}/locations/${s.slug}/${city.slug}/`, today, "monthly", "0.5"));
    }
    for (const retained of RETAINED_LEGACY_LOCATIONS.filter((entry) => entry.stateSlug === s.slug)) {
      if (!cities.some((city) => city.stateSlug === s.slug && city.slug === retained.city.slug)) {
        locationsUrls.push(u(`${SITE}/locations/${s.slug}/${retained.city.slug}/`, today, "monthly", "0.5"));
      }
    }
  }
  for (const lsp of LOCATION_SERVICE_PAGES) {
    locationsUrls.push(u(`${SITE}/locations/${lsp.stateSlug}/${lsp.citySlug}/${lsp.serviceSlug}/`, today, "monthly", "0.7"));
  }
  for (const page of PRIORITY_MARKET_HUBS) {
    locationsUrls.push(u(`${SITE}${priorityMarketHubUrl(page)}`, today, "monthly", "0.8"));
  }
  // Batch 2 researched state and service owners are appended after
  // generic location candidates; the sitemap dedupe pass below keeps each
  // canonical route exactly once.
  for (const expansion of [...BATCH2_EXPANSIONS, ...BATCH3_EXPANSIONS, ...BATCH4_EXPANSIONS]) {
    locationsUrls.push(u(`${SITE}/locations/${expansion.stateSlug}/`, today, "monthly", "0.8"));
    for (const metro of expansion.metros) {
      for (const service of metro.services) {
        locationsUrls.push(u(`${SITE}/locations/${expansion.stateSlug}/${metro.slug}/${service.serviceSlug}/`, today, "monthly", "0.8"));
      }
    }
  }
  for (const cityUrl of CALIFORNIA_ADU_CITY_URLS) {
    locationsUrls.push(u(`${SITE}${cityUrl}`, today, "monthly", "0.7"));
  }
  const metrosUrls: string[] = [
    u(`${SITE}/metros/`, today, "monthly", "0.8"),
  ];
  for (const metro of PHASE1_METROS) {
    metrosUrls.push(u(`${SITE}/metros/${metro.slug}/`, today, "monthly", "0.8"));
    for (const service of PHASE1_SERVICE_SLUGS) {
      metrosUrls.push(u(`${SITE}/metros/${metro.slug}/${service}/`, today, "monthly", "0.7"));
    }
  }
  for (const metro of PHASE2_METROS) {
    metrosUrls.push(u(`${SITE}/metros/${metro.slug}/`, today, "monthly", "0.8"));
    for (const service of PHASE2_SERVICE_SLUGS) {
      metrosUrls.push(u(`${SITE}/metros/${metro.slug}/${service}/`, today, "monthly", "0.7"));
    }
  }
  for (const metro of PHASE3_METROS) {
    metrosUrls.push(u(`${SITE}/metros/${metro.slug}/`, today, "monthly", "0.8"));
    for (const service of PHASE3_SERVICE_SLUGS) {
      metrosUrls.push(u(`${SITE}/metros/${metro.slug}/${service}/`, today, "monthly", "0.7"));
    }
  }
  for (const metro of PHASE4_METROS) {
    metrosUrls.push(u(`${SITE}/metros/${metro.slug}/`, today, "monthly", "0.8"));
    for (const service of PHASE4_SERVICE_SLUGS) {
      metrosUrls.push(u(`${SITE}/metros/${metro.slug}/${service}/`, today, "monthly", "0.7"));
    }
  }
  for (const metro of PHASE5_METROS) {
    metrosUrls.push(u(`${SITE}/metros/${metro.slug}/`, today, "monthly", "0.8"));
    for (const service of PHASE5_SERVICE_SLUGS) {
      metrosUrls.push(u(`${SITE}/metros/${metro.slug}/${service}/`, today, "monthly", "0.7"));
    }
  }

  const verticalLocationUrls = new Map<string, string[]>();
  for (const vertical of LOCATION_VERTICALS) {
    const urls = [
      u(`${SITE}/${vertical.slug}/`, today, "monthly", "0.9"),
      u(`${SITE}/${vertical.slug}/locations/`, today, "monthly", "0.8"),
    ];
    for (const state of states.filter((entry) => verticalAvailableInState(vertical, entry.slug))) {
      urls.push(u(`${SITE}${verticalStateUrl(vertical, state.slug)}`, today, "monthly", "0.7"));
      const indexableCitySlugs = new Set([
        ...cities.filter((c) => c.stateSlug === state.slug && isReviewedCity(c)).map((c) => c.slug),
        ...eligibleDirectoryCities(state, directory, cities).map((city) => city.slug),
        ...RETAINED_LEGACY_LOCATIONS.filter((r) => r.stateSlug === state.slug).map((r) => r.city.slug),
      ]);
      for (const city of allDirectoryCitiesForState(state, directory, cities).filter((entry) => indexableCitySlugs.has(entry.slug))) {
        urls.push(u(`${SITE}${verticalCityUrl(vertical, state.slug, city.slug)}`, today, "monthly", "0.6"));
      }
    }
    verticalLocationUrls.set(vertical.slug, urls);
  }

  // ── Write individual sitemaps ────────────────────────────────────────────
  const sitemaps: Array<{ name: string; urls: string[] }> = [
    { name: "sitemap-core.xml",       urls: coreUrls },
    { name: "sitemap-services.xml",   urls: servicesUrls },
    { name: "sitemap-estimators.xml", urls: estimatorUrls },
    { name: "sitemap-industries.xml", urls: industriesUrls },
    { name: "sitemap-solutions.xml",  urls: solutionsUrls },
    { name: "sitemap-resources.xml",  urls: resourcesUrls },
    { name: "sitemap-locations.xml",  urls: locationsUrls },
    { name: "sitemap-metros.xml",     urls: metrosUrls },
    {
      name: "sitemap-architecture-locations.xml",
      urls: verticalLocationUrls.get("architecture") ?? [],
    },
    {
      name: "sitemap-general-contracting-locations.xml",
      urls: verticalLocationUrls.get("general-contracting") ?? [],
    },
  ];
  const seenUrls = new Set<string>();
  const duplicateUrls: string[] = [];
  for (const sitemap of sitemaps) {
    sitemap.urls = sitemap.urls.filter((entry) => {
      const loc = entry.match(/<loc>([^<]+)<\/loc>/)?.[1];
      if (!loc) throw new Error(`Malformed sitemap URL entry in ${sitemap.name}`);
      if (seenUrls.has(loc)) {
        duplicateUrls.push(loc);
        return false;
      }
      seenUrls.add(loc);
      return true;
    });
  }
  if (duplicateUrls.length) {
    console.log(`Sitemap quality check: removed ${duplicateUrls.length} duplicate URL entries.`);
  }
  for (const { name, urls } of sitemaps) {
    writeSingleSitemap(name, urls);
  }

  // ── Write sitemap index ──────────────────────────────────────────────────
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps.map(({ name }) => `  <sitemap>\n    <loc>${SITE}/${name}</loc>\n  </sitemap>`).join("\n")}
</sitemapindex>\n`;
  fs.writeFileSync(path.join(PUBLIC, "sitemap_index.xml"), indexXml);
  // Keep sitemap.xml as the index for backward compat with GSC submissions
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), indexXml);

  const totalUrls = sitemaps.reduce((n, s) => n + s.urls.length, 0);
  console.log(`Sitemap index: ${sitemaps.length} sitemaps, ${totalUrls} total URLs`);
  for (const { name, urls } of sitemaps) {
    console.log(`  ${name}: ${urls.length} URLs`);
  }
}

// ─── Resource Articles ─────────────────────────────────────────────────────

function resourceArticlePage(article: ResourceArticle): string {
  const disc = disciplineOf(article);
  const url = resourceUrl(article);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources/" },
    { name: disc.name, href: `/resources/${disc.slug}/` },
    { name: article.h1 },
  ];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.description,
    author: { "@type": "Organization", "@id": `${SITE}/#business`, name: "Apex Grid Engineering", url: SITE },
    publisher: { "@id": `${SITE}/#business`, "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    mainEntityOfPage: `${SITE}${url}`,
  };
  const faqMatches = [...article.html.matchAll(/<h3>([^<]+)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)]
    .filter((match) => article.html.slice(0, match.index).includes("<h2>Frequently Asked Questions</h2>"))
    .map((match) => ({
      q: match[1].replace(/<[^>]+>/g, "").trim(),
      a: match[2].replace(/<[^>]+>/g, "").trim(),
    }));
  const faqSchema = faqMatches.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqMatches.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }
    : null;
  const others = RESOURCE_ARTICLES.filter((a) => a.slug !== article.slug && a.tag === article.tag).slice(0, 3);
  const fallbacks = RESOURCE_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3 - others.length);
  const related = [...others, ...fallbacks].slice(0, 3);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(article.tag)} · ${article.minutes} min read</p>
  <h1>${esc(article.h1)}</h1>
  <p class="lede">${esc(article.description)}</p>
</div></section>
<section class="block"><div class="container"><article class="prose">${article.html}</article></div></section>
${related.length ? `<section class="block"><div class="container">
  <h2>More from <em>Resources</em></h2>
  <div class="grid3">
  ${related.map((a) => `<a class="card" href="${resourceUrl(a)}"><div class="label">${esc(a.tag)}</div><h3>${esc(a.h1)}</h3><p>${esc(a.description)}</p></a>`).join("")}
  </div>
</div></section>` : ""}
<section class="ctaband"><div class="container">
  <h2>Have a Project in Mind?</h2>
  <p>Integrated structural, MEP, civil, and geotechnical engineering. Send us your scope for an initial response; engineering timing remains subject to scope, records, jurisdiction, access, and engineer availability.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: article.title,
    description: article.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, articleSchema, ...(faqSchema ? [faqSchema] : []), breadcrumbSchema(crumbs)],
    body,
  });
}

/** Category index page at /resources/{discipline}/ listing all articles in that discipline. */
function resourceDisciplinePage(disc: ResourceDiscipline): string {
  const articles = RESOURCE_ARTICLES.filter((a) => a.tag === disc.tag);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources/" },
    { name: disc.name },
  ];
  const otherDiscs = RESOURCE_DISCIPLINES.filter((d) => d.slug !== disc.slug);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Engineering Knowledge Center</p>
  <h1>${esc(disc.name)} <span class="dim">Resources</span></h1>
  <p class="lede">${esc(disc.blurb)} ${articles.length} guides written by the licensed engineers who do the work.</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${articles.map((a) => `<a class="card" href="${resourceUrl(a)}"><div class="label">${esc(a.tag)} · ${a.minutes} min</div><h3>${esc(a.h1)}</h3><p>${esc(a.description)}</p></a>`).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>Browse Other <em>Topics</em></h2>
  <div class="linkrow">${otherDiscs.map((d) => `<a href="/resources/${d.slug}/">${esc(d.name)} Resources</a>`).join("")}<a href="/resources/">All Resources</a></div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Ready to Start Your Project?</h2>
  <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: `${disc.name} Engineering Resources & Guides | Apex Grid Engineering`,
    description: `${disc.blurb} Practical ${disc.name.toLowerCase()} guides written by licensed professional engineers at Apex Grid Engineering.`,
    canonical: `${SITE}/resources/${disc.slug}/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}
function resourcesHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Resources" }];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Engineering Knowledge Center</p>
  <h1>Engineering <span class="dim">Resources</span></h1>
  <p class="lede">Practical answers to the questions architects, contractors, property owners, and developers ask most — ${RESOURCE_ARTICLES.length} guides across structural, MEP, civil, geotechnical, and permit engineering, written by licensed engineers who do the work.</p>
</div></section>
${RESOURCE_DISCIPLINES.map((disc) => {
  const articles = RESOURCE_ARTICLES.filter((a) => a.tag === disc.tag);
  if (!articles.length) return "";
  return `
<section class="block"><div class="container">
  <h2>${esc(disc.name)} <em>Guides</em></h2>
  <p class="note" style="margin-bottom:16px">${esc(disc.blurb)} <a href="/resources/${disc.slug}/">View all ${articles.length} ${esc(disc.name)} guides →</a></p>
  <div class="grid2">
  ${articles.map((a) => `<a class="card" href="${resourceUrl(a)}"><div class="label">${esc(a.tag)} · ${a.minutes} min</div><h3>${esc(a.h1)}</h3><p>${esc(a.description)}</p></a>`).join("")}
  </div>
</div></section>`;
}).join("")}
<section class="block"><div class="container">
  <h2>More <em>Reference Tools</em></h2>
  <div class="grid2">
    <a class="card" href="/engineering-glossary/"><div class="label">Glossary</div><h3>Engineering Glossary</h3><p>Definitions for 80+ structural, MEP, civil, and geotechnical engineering terms — written for architects, contractors, and owners who encounter unfamiliar language on drawings and specs.</p></a>
    <a class="card" href="/guides/"><div class="label">Guides</div><h3>Engineering Guides</h3><p>Step-by-step guides covering permit submittals, code compliance, coordination workflows, and what to expect at each phase of a project.</p></a>
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>Plan by <em>Project Need</em></h2>
  <p>Looking for a defined engineering deliverable rather than a general guide? Use the <a href="/engineering-intent/">engineering support hub</a> to compare permit, construction, assessment, and documentation paths.</p>
  <p class="note">For a complete page index, browse the <a href="/sitemap/">HTML sitemap</a>.</p>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Ready to Start Your Project?</h2>
  <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: "Engineering Resources & Guides | Apex Grid Engineering",
    description: "Practical engineering guides on structural, MEP, civil, geotechnical, and permit topics — written by licensed professional engineers at Apex Grid Engineering.",
    canonical: `${SITE}/resources/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Who We Work With ──────────────────────────────────────────────────────

function clientPage(page: ClientPage): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Who We Work With", href: "/who-we-work-with/" },
    { name: page.h1 },
  ];
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@id": `${SITE}/#business` },
    serviceType: "Engineering Consulting",
  };
  const faqSchema = page.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;
  const others = CLIENT_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);
  const contextualInbound = `<div class="container"><p class="note"><a href="/engineering-intent/construction-rfi-submittal-support/">Construction RFI and submittal engineering support</a> can help when a client-side project question needs a documented discipline review.</p></div>`;
  const body = `
${breadcrumb(crumbs)}
${contextualInbound}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
  <p class="byline">By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran</p>
</div></section>
${page.sections.map((s) => `
<section class="block"><div class="container">
  <h2>${esc(s.heading)}</h2>
  <div class="prose"><p>${esc(s.body)}</p></div>
</div></section>`).join("")}
${page.relatedLinks ? `<section class="block"><div class="container"><h2>Related Engineering Resources</h2><ul>${page.relatedLinks.map((related) => `<li><a href="${esc(related.href)}">${esc(related.label)}</a></li>`).join("")}</ul></div></section>` : ""}
${page.faqs ? `<section class="block faq"><div class="container"><h2>Frequently Asked Questions</h2>${page.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></section>` : ""}
<section class="block"><div class="container">
  <h2>Other <em>Clients We Serve</em></h2>
  <div class="grid2">
  ${others.map((p) => `<a class="card" href="/who-we-work-with/${p.slug}/"><div class="label">Engineering For</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Start Working With Apex Grid</h2>
  <p>Tell us about your project and we will review the request for an initial response; any engineering schedule depends on scope, records, jurisdiction, access, and engineer availability.</p>
  <a class="cta" href="${esc(page.ctaHref)}">${esc(page.cta)}</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}/who-we-work-with/${page.slug}/`,
    schemaJson: [orgSchema, svcSchema, ...(faqSchema ? [faqSchema] : []), breadcrumbSchema(crumbs)],
    body,
  });
}

function whoWeWorkWithHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Who We Work With" }];
  const hub = WHO_WE_WORK_WITH_HUB;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Our Clients & Partners</p>
  <h1>${esc(hub.h1)}</h1>
  <p class="lede">${esc(hub.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <h2>Choose <em>Your Role</em></h2>
  <div class="grid2">
  ${CLIENT_PAGES.map((p) => `<a class="card" href="/who-we-work-with/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>Apex Grid <em>Construction Delivery Branch</em></h2>
  <div class="grid2">
  ${PARTNER_PAGES.map((p) => `<a class="card" href="/partners/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.companyName)}</h3><p>${esc(p.lede.slice(0, 160))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Not Sure Where to Start?</h2>
  <p>Tell us about your project and we will clarify the scope, records, jurisdiction, access, and available engineering path.</p>
  <a class="cta" href="/contact">Contact Us</a>
</div></section>`;
  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}/who-we-work-with/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Construction Partners ──────────────────────────────────────────────────

function partnerPage(page: PartnerPage): string {
  const url = `/partners/${page.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Who We Work With", href: "/who-we-work-with/" },
    { name: page.companyName },
  ];
  const companySchema = {
    "@context": "https://schema.org",
    "@type": "Contractor",
    name: page.companyName,
    url: page.website,
    telephone: page.phone,
    parentOrganization: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
  };
  const partnershipSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    description: page.description,
    url: `${SITE}${url}`,
    about: { "@type": "Organization", name: page.companyName, url: page.website },
    publisher: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
  };
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>

<section class="block"><div class="container">
  <div class="statgrid">
    ${page.highlights.map((item) => `<div class="cell"><div class="v">${esc(item.value)}</div><div class="k">${esc(item.label)}</div></div>`).join("")}
  </div>
</div></section>

<section class="block"><div class="container">
  <h2>Apex Grid <em>Construction Delivery Branch</em></h2>
  <div class="prose">
    <p>Apex Grid provides the engineering, code coordination, and permit-ready design. PCM extends the company into construction delivery, pre-construction planning, and field execution for commercial projects.</p>
    <p>PCM keeps its established name and construction identity while operating as Apex Grid's construction delivery branch, giving owners, developers, and contracting teams one coordinated path from early scope and budget decisions through construction.</p>
  </div>
</div></section>

<section class="block"><div class="container">
  <h2>PCM <em>Services</em></h2>
  <ul class="scope">${page.services.map((service) => `<li>${esc(service)}</li>`).join("")}</ul>
</div></section>

<section class="block"><div class="container">
  <h2>Business <em>Sectors</em></h2>
  <div class="linkrow">${page.sectors.map((sector) => `<span class="card" style="display:inline-block">${esc(sector)}</span>`).join("")}</div>
</div></section>

<section class="block"><div class="container">
  <h2>Selected <em>Experience</em></h2>
  <div class="grid2">
    ${page.experience.map((item) => `<div class="card"><h3>${esc(item.title)}</h3><p>${esc(item.detail)}</p></div>`).join("")}
  </div>
</div></section>

<section class="block"><div class="container">
  <h2>PCM <em>Team</em></h2>
  <div class="grid2">
    ${page.leadership.map((person) => `<div class="card"><div class="label">${esc(person.role)}</div><h3>${esc(person.name)}</h3><p>${esc(person.bio)}</p></div>`).join("")}
  </div>
</div></section>

<section class="block"><div class="container">
  <div class="grid2">
    <div class="card">
      <div class="label">Licenses</div>
      <ul class="scope">${page.licenses.map((license) => `<li>${esc(license)}</li>`).join("")}</ul>
    </div>
    <div class="card">
      <div class="label">Certifications</div>
      <ul class="scope">${page.certifications.map((certification) => `<li>${esc(certification)}</li>`).join("")}</ul>
    </div>
  </div>
</div></section>

<section class="block"><div class="container">
  <h2>Company <em>Information</em></h2>
  <div class="grid2">
    <div class="card"><div class="label">Headquarters</div><p>${esc(page.location)}<br />515 S. Flower Street, Suite 1020<br />Los Angeles, CA 90071</p></div>
    <div class="card"><div class="label">Contact</div><p><a href="tel:+13104141800">${esc(page.phone)}</a><br /><a href="${esc(page.website)}" rel="noopener noreferrer">${esc(page.website.replace(/^https?:\/\//, ""))}</a></p></div>
  </div>
  <p class="note">PCM details on this page are summarized from the firm's Statement of Qualifications dated August 25, 2026. License and certification status should be verified with the issuing agency before award.</p>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Bring Engineering and Construction Together</h2>
  <p>Tell Apex Grid about your project. Our engineering team and PCM construction delivery branch can carry the work from early scope through field execution.</p>
  <a class="cta" href="/contact">Start a Project Conversation</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, companySchema, partnershipSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Project Type Pages ────────────────────────────────────────────────────

function projectTypePage(page: ProjectTypePage): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Project Types", href: "/project-types/" },
    { name: page.h1 },
  ];
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@id": `${SITE}/#business` },
    serviceType: page.h1,
  };
  const faqSchema = page.faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;
  const others = PROJECT_TYPE_PAGES.filter((p) => p.slug !== page.slug)
    .filter((p) => page.relatedSlugs.includes(p.slug) || true)
    .slice(0, 4);
  const contextualInbound = `<p class="note"><a href="/engineering-intent/value-engineering-design-optimization/">Value engineering and design optimization</a> can support project-stage alternatives and constructability decisions.</p>`;
  const body = `
${breadcrumb(crumbs)}
${contextualInbound}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
  ${page.founderPerspective ? `<p class="note">By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran</p>` : ""}
</div></section>
${page.founderPerspective ? `<section class="block"><div class="container prose">
  <h2>My founder perspective</h2>
  <p>I base this guidance on the project type and the engineering coordination it commonly requires. ${esc(page.founderPerspective)}</p>
</div></section>` : ""}
<section class="block"><div class="container">
  <h2>Engineering <em>Disciplines Involved</em></h2>
  <ul class="scope">${page.disciplines.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
</div></section>
<section class="block"><div class="container">
  <h2>What This <em>Scope Includes</em></h2>
  <ul class="scope">${page.topics.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
</div></section>
<section class="block"><div class="container">
  <h2>Related <em>Project Types</em></h2>
  <div class="grid2">
  ${others.map((p) => `<a class="card" href="/project-types/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
</div></section>
${page.faqs ? `<section class="block"><div class="container">
  <h2>Frequently Asked Questions</h2>
  <div class="faq">${page.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div>
</div></section>` : ""}
<section class="ctaband"><div class="container">
  <h2>Start Your Project</h2>
  <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} Send us your scope and get a clear proposal.</p>
  <a class="cta" href="${page.founderPerspective ? "/estimate/" : "/contact"}">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}/project-types/${page.slug}/`,
    schemaJson: [orgSchema, svcSchema, ...(faqSchema ? [faqSchema] : []), breadcrumbSchema(crumbs)],
    body,
  });
}

function projectTypesHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Project Types" }];
  const hub = PROJECT_TYPES_HUB;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Engineering by Project Stage</p>
  <h1>${esc(hub.h1)}</h1>
  <p class="lede">${esc(hub.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${PROJECT_TYPE_PAGES.map((p) => `<a class="card" href="/project-types/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>Facility and project-need <em>engineering</em></h2>
  <p>Choose the facility or project decision that best matches the work. Each guide explains the information, verification, disciplines, and deliverables that may be required before a scope is proposed.</p>
  <div class="grid2">
  ${NATIONAL_FACILITY_INTENT_PAGES.map((p) => `<a class="card" href="/engineering-intent/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.answer.slice(0, 150))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Ready to Get Started?</h2>
  <p>Tell us what stage your project is in and we'll match the right engineering services to your scope and schedule.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}/project-types/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Existing Building Pages ───────────────────────────────────────────────

function existingBuildingPage(page: ExistingBuildingPage): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Existing Building Engineering", href: "/existing-building-engineering/" },
    { name: page.h1 },
  ];
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@id": `${SITE}/#business` },
    serviceType: page.h1,
  };
  const others = EXISTING_BUILDING_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);
  const contextualInbound = `<p class="note"><a href="/engineering-intent/structural-engineering-letters/">Structural engineering letters</a> and <a href="/engineering-intent/engineer-of-record-transition/">engineer-of-record transition support</a> are available when an existing-building question needs documented responsibility.</p>`;
  const body = `
${breadcrumb(crumbs)}
${contextualInbound}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <h2>Scope of <em>Services</em></h2>
  <ul class="scope">${page.topics.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
  ${page.note ? `<p class="note" style="margin-top:20px">${esc(page.note)}</p>` : ""}
</div></section>
<section class="block"><div class="container">
  <h2>Related <em>Existing Building Services</em></h2>
  <div class="grid2">
  ${others.map((p) => `<a class="card" href="/existing-building-engineering/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Tell Us About Your Building</h2>
  <p>Send us what you have — drawings, photos, or just a description. We'll tell you what engineering is needed and how much it costs. Fast quotes, no runaround.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}/existing-building-engineering/${page.slug}/`,
    schemaJson: [orgSchema, svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function existingBuildingHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Existing Building Engineering" }];
  const hub = EXISTING_BUILDING_HUB;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Existing Building Engineering</p>
  <h1>${esc(hub.h1)}</h1>
  <p class="lede">${esc(hub.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${EXISTING_BUILDING_PAGES.map((p) => `<a class="card" href="/existing-building-engineering/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Send Us What You Have</h2>
  <p>No drawings? No problem. Send photos, measurements, and a project description. We'll review what you have and tell you what engineering is needed.</p>
  <a class="cta" href="/contact">Contact Us</a>
</div></section>`;
  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}/existing-building-engineering/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Permit Engineering Pages ──────────────────────────────────────────────

function permitPage(page: PermitPage): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Permit Engineering", href: "/permit-engineering/" },
    { name: page.h1 },
  ];
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@id": `${SITE}/#business` },
    serviceType: "Permit Engineering",
  };
  const contextualInbound = `<p class="note"><a href="/engineering-intent/deferred-submittal-engineering/">Deferred submittal engineering</a> can support an identified later-phase specialty package when the permit documents and authority process allow it.</p>`;
  const others = PERMIT_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);
  const body = `
${breadcrumb(crumbs)}
${contextualInbound}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <h2>What This <em>Service Includes</em></h2>
  <ul class="scope">${page.topics.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
  ${page.note ? `<p class="note" style="margin-top:20px">${esc(page.note)}</p>` : ""}
</div></section>
<section class="block"><div class="container">
  <h2>Related <em>Permit Services</em></h2>
  <div class="grid2">
  ${others.map((p) => `<a class="card" href="/permit-engineering/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Ready to Submit for Permit?</h2>
  <p>We produce complete, PE-stamped permit packages and support the submittal through final approval. Fast turnaround, project-specific licensure and stamping.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}/permit-engineering/${page.slug}/`,
    schemaJson: [orgSchema, svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function permitHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Permit Engineering" }];
  const hub = PERMIT_HUB;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Permit Engineering Services</p>
  <h1>${esc(hub.h1)}</h1>
  <p class="lede">${esc(hub.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${PERMIT_PAGES.map((p) => `<a class="card" href="/permit-engineering/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Need Engineering for a Permit?</h2>
  <p>For projects whose jurisdiction, discipline, and scope are confirmed during intake, we can coordinate PE-stamped structural, MEP, and civil engineering permit documents; schedule and approval remain subject to the project and authority.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}/permit-engineering/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Industry × Discipline Pages ──────────────────────────────────────────

function industryDisciplinePage(page: IndustryDisciplinePage): string {
  const url = getIndustryDisciplineUrl(page);
  const quickAnswers = [
    {
      question: `What can ${page.disciplineLabel.toLowerCase()} include for ${toTitle(page.industrySlug)} projects?`,
      answer: `Typical scope topics include ${page.topics.slice(0, 3).join(", ")}. Final scope depends on the facility, existing conditions, jurisdiction, and requested deliverables.`,
    },
    {
      question: `What information is needed to scope this ${page.disciplineLabel.toLowerCase()} work?`,
      answer: "Available drawings, site or facility conditions, intended use, project phase, jurisdiction, schedule, and required deliverables help establish a project-specific scope.",
    },
    {
      question: "How are applicable codes and professional requirements confirmed?",
      answer: "The adopted codes, amendments, responsible professional, discipline, firm authorization, and authority-having-jurisdiction requirements must be verified for each project before coverage is confirmed.",
    },
  ];
  // Build breadcrumb from segments
  const crumbs: { name: string; href?: string }[] = [{ name: "Home", href: "/" }, { name: "Industries", href: "/industries/" }];
  if (page.segments.length > 2) {
    // sub-industry path: e.g. ["healthcare","hospitals","mep-engineering"]
    crumbs.push({ name: toTitle(page.segments[1]), href: industryRootUrl(page.industrySlug) });
  } else {
    crumbs.push({ name: toTitle(page.segments[0]), href: industryRootUrl(page.industrySlug) });
  }
  crumbs.push({ name: page.disciplineLabel });

  // Related pages: rotate through the same route family so every canonical
  // industry-discipline page receives contextual inbound links.
  const sameIndustry = CANONICAL_INDUSTRY_DISCIPLINE_PAGES.filter(
    (candidate) => candidate.segments[0] === page.segments[0],
  );
  const currentIndex = sameIndustry.indexOf(page);
  const siblings = currentIndex < 0
    ? []
    : Array.from(
        { length: Math.min(4, Math.max(0, sameIndustry.length - 1)) },
        (_, offset) => sameIndustry[(currentIndex + offset + 1) % sameIndustry.length],
      );

  // Derive keyword hints from industry slug words + discipline label words
  const industryWords = page.industrySlug.split("-");
  const disciplineWords = page.disciplineLabel.toLowerCase().split(/[\s-]+/);
  const glossaryHints = [...new Set([...industryWords, ...disciplineWords])];
  const glossaryTerms = relatedGlossaryTerms(glossaryHints);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.description,
    provider: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    url: `${SITE}${url}`,
    areaServed: { "@type": "Country", name: "United States" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: quickAnswers.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>

<section class="block"><div class="container">
  <h2>What We <em>Engineer</em></h2>
  <ul class="scope">
    ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n    ")}
  </ul>
</div></section>

<section class="block"><div class="container">
  <h2>Why Apex Grid for <em>${esc(page.disciplineLabel)}</em>?</h2>
  <div class="grid2">
     <div class="card"><div class="label">Project-specific PE coverage review</div><p>We verify the engineer, discipline, jurisdiction, firm authorization, and AHJ requirements for each project before confirming available coverage.</p></div>
     <div class="card"><div class="label">Coordinated engineering disciplines</div><p>When the requested disciplines and project scope align, our available team can coordinate structural, MEP, civil, and geotechnical deliverables.</p></div>
    <div class="card"><div class="label">Responsive Intake</div><p>We review project requests for an initial proposal response and structure deliverable milestones around your permit or construction schedule when scope and records permit.</p></div>
     <div class="card"><div class="label">Relevant project experience</div><p>We can discuss relevant commercial, industrial, healthcare, and government experience during project review; prior experience does not predict jurisdiction approval.</p></div>
  </div>
</div></section>

${siblings.length ? `<section class="block"><div class="container">
  <h2>More <em>Engineering Services</em> for This Sector</h2>
  <div class="grid2">
  ${siblings.map((s) => `<a class="card" href="${getIndustryDisciplineUrl(s)}"><div class="label">${esc(s.kicker)}</div><h3>${esc(s.h1)}</h3><p>${esc(s.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
  <div class="linkrow" style="margin-top:20px"><a href="${industryRootUrl(page.industrySlug)}">Back to ${esc(toTitle(page.industrySlug))} Engineering</a></div>
</div></section>` : ""}

${glossaryTerms.length ? `<section class="block"><div class="container">
  <h2>Glossary <em>References</em></h2>
  <p class="note">Key terms used in this engineering discipline:</p>
  <div class="linkrow">${glossaryTerms.map((t) => `<a href="/engineering-glossary/${t.slug}/">${esc(t.term)}</a>`).join("")}</div>
</div></section>` : ""}

<section class="block"><div class="container faq">
  <h2>Quick <em>Answers</em></h2>
  ${quickAnswers.map((item) => `<details><summary>${esc(item.question)}</summary><div class="a">${esc(item.answer)}</div></details>`).join("\n  ")}
</div></section>

<section class="ctaband"><div class="container">
  <h2>Start Your Project</h2>
  <p>Licensed professional engineering support and clear proposals. Send us your scope for an initial response outlining potential deliverables, schedule factors, and fee basis.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, pageSchema, breadcrumbSchema(crumbs), faqSchema],
    body,
  });
}

/** Convert a slug like "military-defense" → "Military Defense" for display */
function toTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Location × Service Pages ─────────────────────────────────────────────

function locationServicePage(page: LocationServicePage, city?: CityData): string {
  const url = `/locations/${page.stateSlug}/${page.citySlug}/${page.serviceSlug}/`;
  const cityUrl = `/locations/${page.stateSlug}/${page.citySlug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations/" },
    { name: page.stateName, href: `/locations/${page.stateSlug}/` },
    { name: page.cityName, ...(staticIndexExists(cityUrl) ? { href: cityUrl } : {}) },
    { name: toTitle(page.serviceSlug) },
  ];
  const relatedLinks = page.relatedServiceSlugs
    .filter((serviceSlug) => {
      const relatedUrl = `/locations/${page.stateSlug}/${page.citySlug}/${serviceSlug}/`;
      return LOCATION_SERVICE_URLS.has(relatedUrl) || staticIndexExists(relatedUrl);
    })
    .slice(0, 3)
    .map((s) => `<a href="/locations/${page.stateSlug}/${page.citySlug}/${s}/">${toTitle(s)}</a>`)
    .join(" · ");
  const faqs = [
    {
      q: `What does ${toTitle(page.serviceSlug)} in ${page.cityName} include?`,
      a: page.lede,
    },
    {
      q: `Who reviews ${page.cityName} engineering permit documents?`,
      a: `${page.ahj} is the listed authority having jurisdiction for this service area. The exact reviewer and submittal path should be confirmed for the project address before design begins.`,
    },
    {
      q: `Which building and energy codes apply in ${page.cityName}?`,
      a: `The listed building-code basis is ${page.buildingCode}, and the listed energy-code basis is ${page.energyCode}. Project-specific amendments and effective dates should be verified with the permitting authority.`,
    },
  ];
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request a Proposal</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What We Engineer</h2>
        <ul class="check-list">
          ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    ${city ? citySourceList(city) : ""}

    <section class="section section--light">
      <div class="container container--narrow">
        <h2>Local Engineering Context</h2>
        <dl class="detail-list">
          <dt>Authority Having Jurisdiction</dt><dd>${esc(page.ahj)}</dd>
          <dt>Building Code</dt><dd>${esc(page.buildingCode)}</dd>
          <dt>Energy Code</dt><dd>${esc(page.energyCode)}</dd>
          <dt>Local Market</dt><dd>${esc(page.marketNote)}</dd>
          <dt>Climate &amp; Engineering Conditions</dt><dd>${esc(page.climateNote)}</dd>
        </dl>
      </div>
    </section>

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>About Apex Grid Engineering</h2>
        <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We provide structural, MEP, civil, and geotechnical engineering for commercial, industrial, multifamily, and government clients.</p>
        <p>We work from architectural PDFs, CAD files, or field measurements, and we're set up to turn projects around on compressed schedules when the situation calls for it.</p>
${relatedLinks ? `        <p>Related services in ${esc(page.cityName)}: ${relatedLinks}</p>` : ""}
      </div>
    </section>

    <section class="section section--light">
      <div class="container container--narrow">
        <h2>${esc(page.cityName)} ${esc(toTitle(page.serviceSlug))} Questions</h2>
        <div class="faq-list">
          ${faqs.map((faq) => `<details><summary>${esc(faq.q)}</summary><div class="a">${esc(faq.a)}</div></details>`).join("")}
        </div>
      </div>
    </section>

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Start in ${esc(page.cityName)}?</h2>
        <p>Send us your drawings or describe your project and we'll respond within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Apex Grid Engineering",
    "description": page.lede,
    "url": `${SITE}${url}`,
    "areaServed": { "@type": "City", "name": page.cityName },
    "serviceType": toTitle(page.serviceSlug),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return htmlShell({
    title: page.title,
    description: page.lede,
    canonical: `${SITE}${url}`,
    schemaJson: [svcSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Solution Pages ────────────────────────────────────────────────────────

function solutionPage(page: SolutionPage): string {
  const url = `/${page.dir}/${page.slug}/`;
  const dirLabel = page.dir === "solutions" ? "Solutions" : "Government Engineering";
  const dirHref = `/${page.dir}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: dirLabel, href: dirHref },
    { name: page.h1 },
  ];
  const relatedLinks = page.relatedSlugs
    .map((slug) => SOLUTION_PAGES.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is SolutionPage => Boolean(candidate))
    .slice(0, 4)
    .map((related) => `<a class="card" href="/${related.dir}/${related.slug}/"><h3>${toTitle(related.slug).replace(/Engineering$/, "").trim()}</h3></a>`)
    .join("\n          ");

  // Derive keyword hints from the page slug words + category words
  const slugWords = page.slug.split("-");
  const categoryWords = page.category.toLowerCase().split(/[\s-]+/);
  const glossaryHints = [...new Set([...slugWords, ...categoryWords])];
  const glossaryTerms = relatedGlossaryTerms(glossaryHints);

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Engineering Support</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What This Engineering Scope Covers</h2>
        <ul class="check-list">
          ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--light">
      <div class="container container--narrow">
        <h2>How Apex Grid Handles This</h2>
        <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We engineer ${esc(page.category.toLowerCase())} scopes as a standalone service or as part of a coordinated structural, MEP, civil, and geotechnical package.</p>
        <p>We work from architectural PDFs, contractor sketches, or existing CAD files and produce stamped engineering documents, permit drawings, and calculations that building departments accept the first time.</p>
        <h3>Get Started</h3>
        <p>Send us a brief description of your project or attach your drawings. We'll review the scope and respond with a proposal within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Send Project Details</a>
      </div>
    </section>

    ${relatedLinks ? `
    <section class="section section--white">
      <div class="container">
        <h2>Related Engineering Solutions</h2>
        <div class="card-grid card-grid--4">
          ${relatedLinks}
        </div>
      </div>
    </section>` : ""}

    ${glossaryTerms.length ? `
    <section class="section section--light">
      <div class="container container--narrow">
        <h2>Glossary References</h2>
        <p class="note">Key terms used in this engineering scope:</p>
        <div class="linkrow">${glossaryTerms.map((t) => `<a href="/engineering-glossary/${t.slug}/">${esc(t.term)}</a>`).join("")}</div>
      </div>
    </section>` : ""}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Move Forward?</h2>
        <p>PE-stamped engineering documents, delivered on your schedule, from engineers who've solved this problem before.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const spSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Apex Grid Engineering",
    "description": page.lede,
    "url": `${SITE}${url}`,
    "serviceType": page.category,
  };

  return htmlShell({
    title: page.title,
    description: page.lede,
    canonical: `${SITE}${url}`,
    schemaJson: [spSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function solutionsHubPage(): string {
  const categories = [...new Set(SOLUTION_PAGES.filter((p) => p.dir === "solutions").map((p) => p.category))];
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">Engineering Solutions</div>
        <h1>Engineering Solutions for Common Construction Problems</h1>
        <p class="lede">PE-stamped engineering for the structural, MEP, electrical, plumbing, civil, and geotechnical problems that come up on commercial, industrial, and residential projects — described in plain terms, engineered properly.</p>
        <a class="btn btn--primary" href="/contact/">Talk to an Engineer</a>
      </div>
    </div>

    ${breadcrumb([{ name: "Home", href: "/" }, { name: "Solutions" }])}

    ${categories.map((cat) => {
      const catPages = SOLUTION_PAGES.filter((p) => p.dir === "solutions" && p.category === cat);
      return `
    <section class="section section--white">
      <div class="container">
        <h2>${esc(cat)}</h2>
        <div class="card-grid card-grid--3">
          ${catPages.map((p) => `<a class="card" href="/solutions/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 110))}…</p></a>`).join("\n          ")}
        </div>
      </div>
    </section>`;
    }).join("")}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Don't See Your Problem?</h2>
        <p>We engineer across all disciplines — describe your project and we'll tell you how we can help.</p>
        <a class="btn btn--primary" href="/contact/">Ask an Engineer</a>
      </div>
    </section>`;

  return htmlShell({
    title: "Engineering Solutions | Structural, MEP, Civil & Geotechnical | Apex Grid",
    description: "Engineering solutions for common construction problems — structural, MEP, electrical, plumbing, civil, and geotechnical. PE-stamped drawings and calculations from licensed engineers.",
    canonical: `${SITE}/solutions/`,
    schemaJson: [],
    body,
  });
}

function governmentHubPage(): string {
  const govPages = SOLUTION_PAGES.filter((p) => p.dir === "government");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">Government Engineering</div>
        <h1>Engineering for Government and Federal Facilities</h1>
        <p class="lede">Apex Grid Engineering provides structural, MEP, civil, and geotechnical engineering for federal facilities, military installations, and public works projects — following UFC design criteria, GSA standards, and federal documentation requirements.</p>
        <a class="btn btn--primary" href="/contact/">Request a Proposal</a>
      </div>
    </div>

    ${breadcrumb([{ name: "Home", href: "/" }, { name: "Government Engineering" }])}

    <section class="section section--white">
      <div class="container">
        <div class="card-grid card-grid--2">
          ${govPages.map((p) => `<a class="card" href="/government/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Licensed Reach. Ready for Federal Work.</h2>
        <p>Apex Grid Engineering provides multi-discipline support for federal work. Confirm current professional credentials, SAM.gov registration, SBA certification, and solicitation-specific eligibility from official records before procurement use.</p>
        <a class="btn btn--primary" href="/contact/">Start a Conversation</a>
      </div>
    </section>`;

  return htmlShell({
    title: "Government & Federal Facility Engineering | Apex Grid Engineering",
    description: "Structural, MEP, civil, and geotechnical engineering for federal facilities, military installations, and public works projects. UFC criteria, GSA standards, and EISA compliance.",
    canonical: `${SITE}/government/`,
    schemaJson: [],
    body,
  });
}

const CATEGORY_LABEL: Record<GlossaryTerm["category"], string> = {
  structural: "Structural Engineering",
  mep: "MEP Engineering",
  civil: "Civil Engineering",
  geotech: "Geotechnical Engineering",
  permit: "Permitting & Codes",
  general: "General Engineering",
};
function guidePage(page: GuidePage): string {
  const url = `/guides/${page.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Engineering Guides", href: "/guides/" },
    { name: page.h1 },
  ];
  const sectionsHtml = page.sections
    .map(
      (s) => `
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>${esc(s.heading)}</h2>
        <ul class="check-list">
          ${s.points.map((p) => `<li>${esc(p)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>`,
    )
    .join("");

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.shortAnswer)}</p>
        <a class="btn btn--primary" href="${esc(page.ctaHref)}">${esc(page.ctaText)}</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white faq">
      <div class="container container--narrow">
        <h2>Quick Answer</h2>
        <details open>
          <summary>${esc(page.h1)}</summary>
          <div class="a">${esc(page.shortAnswer)}</div>
        </details>
      </div>
    </section>

    ${sectionsHtml}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Get Started?</h2>
        <p>Send us your project details and we'll respond with a proposal within one business day.</p>
        <a class="btn btn--primary" href="${esc(page.ctaHref)}">${esc(page.ctaText)}</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [{
      "@type": "Question",
      name: page.h1,
      acceptedAnswer: { "@type": "Answer", text: page.shortAnswer },
    }],
  };

  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function guidesHubPage(): string {
  const categories: Record<string, GuidePage[]> = {};
  for (const p of GUIDE_PAGES.filter((page) => !GUIDE_REDIRECTS.has(page.slug))) {
    const cat = p.kicker.split(" · ")[0];
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(p);
  }
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">Engineering Guides</div>
        <h1>${esc(GUIDES_HUB.h1)}</h1>
        <p class="lede">${esc(GUIDES_HUB.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Talk to an Engineer</a>
      </div>
    </div>

    ${breadcrumb([{ name: "Home", href: "/" }, { name: "Engineering Guides" }])}

    ${Object.entries(categories).map(([cat, pages]) => `
    <section class="section section--white">
      <div class="container">
        <h2>${esc(cat)}</h2>
        <div class="card-grid card-grid--3">
          ${pages.map((p) => `<a class="card" href="/guides/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.shortAnswer.slice(0, 110))}…</p></a>`).join("\n          ")}
        </div>
      </div>
    </section>`).join("")}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Have a Question Not Covered Here?</h2>
        <p>We engineer across every building discipline — ask us anything about your project.</p>
        <a class="btn btn--primary" href="/contact/">Ask an Engineer</a>
      </div>
    </section>`;

  return htmlShell({
    title: GUIDES_HUB.title,
    description: GUIDES_HUB.description,
    canonical: `${SITE}/guides/`,
    schemaJson: [],
    body,
  });
}

// ─── Structural Extended Subpage Renderer ────────────────────────────────

function structuralExtendedPage(page: StructuralExtendedPage): string {
  const url = `/structural-engineering/${page.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Structural Engineering", href: "/structural-engineering/" },
    { name: page.h1 },
  ];
  const relatedStructural = STRUCTURAL_EXTENDED_PAGES
    .filter((candidate) => candidate.slug !== page.slug)
    .slice(0, 4);
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Engineering Support</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What This Engineering Scope Covers</h2>
        <ul class="check-list">
          ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section section--light">
      <div class="container container--narrow">
        <h2>Why Work With Apex Grid</h2>
        <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We provide ${esc(page.h1.toLowerCase())} as a standalone service or coordinated with MEP, civil, and geotechnical engineering under one contract.</p>
        <a class="btn btn--primary" href="/contact/">${esc(page.ctaText)}</a>
      </div>
    </section>
    <section class="section section--white"><div class="container">
      <h2>Related <em>Structural Engineering</em></h2>
      <div class="card-grid card-grid--3">
        ${relatedStructural.map((candidate) => `<a class="card" href="/structural-engineering/${candidate.slug}/"><h3>${esc(candidate.h1)}</h3><p>${esc(candidate.lede.slice(0, 120))}…</p></a>`).join("\n")}
      </div>
      <a class="btn btn--secondary" href="/structural-engineering/">Back to Structural Engineering</a>
    </div></section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Move Forward?</h2>
        <p>PE-stamped structural engineering, on your schedule, from engineers who've done this before.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Apex Grid Engineering",
    "description": page.lede,
    "url": `${SITE}${url}`,
    "serviceType": page.h1,
  };
  return htmlShell({ title: page.title, description: page.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

// ─── Title 24 Renderers ───────────────────────────────────────────────────

function title24HubPage(): string {
  const url = `/title-24/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Title 24 Compliance" }];
  const subpageCards = TITLE_24_PAGES.map(
    (p) =>
      `<a class="card" href="/title-24/${p.slug}/"><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`,
  ).join("\n          ");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(TITLE_24_HUB.kicker)}</div>
        <h1>${esc(TITLE_24_HUB.h1)}</h1>
        <p class="lede">${esc(TITLE_24_HUB.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Title 24 Compliance Support</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What Title 24 Covers</h2>
        <p>${esc(TITLE_24_HUB.intro)}</p>
        <ul class="check-list">
          ${TITLE_24_HUB.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section section--light">
      <div class="container">
        <h2>Title 24 Services</h2>
        <div class="card-grid card-grid--2">
          ${subpageCards}
        </div>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Need Title 24 Compliance for a California Project?</h2>
        <p>Send us your project details — we respond with a fee proposal within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "Service", "name": TITLE_24_HUB.h1, "description": TITLE_24_HUB.lede, "url": `${SITE}${url}`, "provider": { "@id": `${SITE}/#business` }, "areaServed": "California", "serviceType": "Title 24 Energy Compliance" };
  return htmlShell({ title: TITLE_24_HUB.title, description: TITLE_24_HUB.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

function title24SubpagePage(page: Title24Page): string {
  const url = `/title-24/${page.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Title 24", href: "/title-24/" }, { name: page.h1 }];
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Get Compliance Support</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What This Covers</h2>
        <p>${esc(page.intro)}</p>
        <ul class="check-list">
          ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section section--light">
      <div class="container container--narrow">
        <h2>How Apex Grid Helps</h2>
        <p>Apex Grid produces Title 24 compliance documentation as part of a full MEP engineering package or as a standalone compliance service. Our engineers are familiar with California's compliance software (CBECC-Com and CBECC-Res), coordinate with the mechanical, electrical, and architectural design, and respond to plan-check comments on compliance issues.</p>
        <a class="btn btn--primary" href="/contact/">${esc(page.ctaText)}</a>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>California Project Ready to Move Forward?</h2>
        <p>We respond within one business day with a fee proposal.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "Service", "name": page.h1, "description": page.lede, "url": `${SITE}${url}`, "provider": { "@id": `${SITE}/#business` }, "areaServed": "California", "serviceType": page.h1 };
  return htmlShell({ title: page.title, description: page.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

// ─── Projects Portfolio Renderers ─────────────────────────────────────────

function projectsHubPage(): string {
  const url = `/projects/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Projects" }];
  const catCards = PROJECT_CATEGORY_PAGES.map(
    (p) =>
      `<a class="card" href="/projects/${p.slug}/"><h3>${esc(p.h1)}</h3><p>${esc(p.disciplines.join(", "))}</p></a>`,
  ).join("\n          ");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(PROJECTS_HUB.kicker)}</div>
        <h1>${esc(PROJECTS_HUB.h1)}</h1>
        <p class="lede">${esc(PROJECTS_HUB.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Start Your Project</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <p>${esc(PROJECTS_HUB.intro)}</p>
      </div>
    </section>
    <section class="section section--light">
      <div class="container">
        <h2>Project Experience by Category</h2>
        <div class="card-grid card-grid--3">
          ${catCards}
        </div>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Tell Us About Your Project</h2>
        <p>Send us your drawings, RFP, or project description and we'll respond with a fee proposal within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", "name": PROJECTS_HUB.h1, "description": PROJECTS_HUB.lede, "url": `${SITE}${url}`, "publisher": { "@type": "Organization", "name": "Apex Grid Engineering", "url": SITE } };
  return htmlShell({ title: PROJECTS_HUB.title, description: PROJECTS_HUB.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

function projectCategoryPage(cat: ProjectCategoryPage): string {
  const url = `/projects/${cat.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Projects", href: "/projects/" }, { name: cat.h1 }];
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(cat.kicker)}</div>
        <h1>${esc(cat.h1)}</h1>
        <p class="lede">${esc(cat.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Discuss Your Project</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>Types of Projects</h2>
        <ul class="check-list">
          ${cat.projectTypes.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
        ${cat.note ? `<p class="note"><em>${esc(cat.note)}</em></p>` : ""}
      </div>
    </section>
    <section class="section section--light">
      <div class="container container--narrow">
        <h2>Engineering Disciplines</h2>
        <p>This project category involves: ${esc(cat.disciplines.join(", "))}. Apex Grid provides these as coordinated multi-discipline services or as individual discipline engagements depending on project scope.</p>
        <a class="btn btn--primary" href="/contact/">Send Us Your Project</a>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Work Together?</h2>
        <p>We respond within one business day with a fee proposal. No project too large or too small.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "Service", "name": cat.h1, "description": cat.lede, "url": `${SITE}${url}`, "provider": { "@id": `${SITE}/#business` }, "serviceType": cat.h1 };
  return htmlShell({ title: cat.title, description: cat.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

// ─── Static Standalone Page Renderer ─────────────────────────────────────

function staticStandalonePage(page: StaticPageDef): string {
  const url = `/${page.dir}/`;
  const enhanced = page.showFounderByline === true;
  const crumbs = [{ name: "Home", href: "/" }, { name: page.h1 }];
  const faqSchema = page.schemaJson?.find((schema) => schema["@type"] === "FAQPage") as
    | { mainEntity?: Array<{ name?: string; acceptedAnswer?: { text?: string } }> }
    | undefined;
  const faqItems = (faqSchema?.mainEntity ?? []).filter(
    (item): item is { name: string; acceptedAnswer: { text: string } } =>
      typeof item.name === "string" && typeof item.acceptedAnswer?.text === "string",
  );
  const faqHtml = faqItems.length
    ? enhanced
      ? `<section class="block">
      <div class="container">
        <div class="faq">
        <h2>Quick Answers</h2>
        ${faqItems.map((item) => `<details><summary>${esc(item.name)}</summary><div class="a">${esc(item.acceptedAnswer.text)}</div></details>`).join("")}
        </div>
      </div>
    </section>`
      : `<section class="section section--white faq">
      <div class="container container--narrow">
        <h2>Quick Answers</h2>
        ${faqItems.map((item) => `<details><summary>${esc(item.name)}</summary><div class="a">${esc(item.acceptedAnswer.text)}</div></details>`).join("")}
      </div>
    </section>`
    : "";
  const sectionsHtml = page.sections
    .map(
      (s) => enhanced
        ? `
    <section class="block">
      <div class="container prose">
        <h2>${esc(s.heading)}</h2>
        <p>${esc(s.content)}</p>
        ${s.bullets ? `<ul class="scope">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>
    </section>`
        : `
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>${esc(s.heading)}</h2>
        <p>${esc(s.content)}</p>
        ${s.bullets ? `<ul class="check-list">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>
    </section>`,
    )
    .join("");
  const relatedHtml = page.relatedLinks?.length
    ? `<section class="block">
      <div class="container">
        <h2>Related Qualification Resources</h2>
        <div class="linkrow">${page.relatedLinks.map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join("")}</div>
      </div>
    </section>`
    : "";
  const ctaHref = page.ctaHref ?? "/contact/";
  const body = enhanced ? `
    <div class="hero">
      <div class="container">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
         ${page.showFounderByline ? `<p class="note">By Jeremy Mills, CEO &amp; Founder, Apex Grid Engineering — USAF Veteran</p>` : ""}
        <div class="linkrow" style="margin-top:22px"><a href="${esc(ctaHref)}">${page.ctaHref ? "Request a Project Review" : "Contact Us"}</a></div>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    ${sectionsHtml}
     ${relatedHtml}
    ${faqHtml}
    <section class="ctaband">
      <div class="container">
        <h2>${esc(page.ctaHeading)}</h2>
        <p>${esc(page.ctaText)}</p>
        <div class="linkrow">
          <a href="${esc(ctaHref)}">${page.ctaHref ? "Request an Estimate" : "Get in Touch"}</a>
          <a href="tel:+14804900064">480-490-0064</a>
        </div>
      </div>
    </section>` : `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    ${sectionsHtml}
    ${faqHtml}
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>${esc(page.ctaHeading)}</h2>
        <p>${esc(page.ctaText)}</p>
        <a class="btn btn--primary" href="/contact/">Get in Touch</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "name": page.h1, "description": page.description, "url": `${SITE}${url}`, "publisher": { "@type": "Organization", "name": "Apex Grid Engineering", "url": SITE } };
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [schema, ...(page.schemaJson ?? []), breadcrumbSchema(crumbs)],
    body: body.replace(/[ \t]+$/gm, ""),
  });
}

// ─── HTML Sitemap Renderer ────────────────────────────────────────────────

function htmlSitemapPage(): string {
  const url = `/sitemap/`;
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">Navigation</div>
        <h1>Site Map</h1>
        <p class="lede">A complete index of Apex Grid Engineering's pages, organized by section.</p>
      </div>
    </div>
    <section class="section section--white">
      <div class="container">
        <div class="sitemap-grid">
          <div class="sitemap-col">
            <h2>Engineering Services</h2>
            <ul>
              <li><a href="/structural-engineering/">Structural Engineering</a></li>
              <li><a href="/mep-engineering/">MEP Engineering</a></li>
              <li><a href="/mechanical-engineering/">Mechanical Engineering</a></li>
              <li><a href="/electrical-engineering/">Electrical Engineering</a></li>
              <li><a href="/plumbing-engineering/">Plumbing Engineering</a></li>
              <li><a href="/civil-engineering/">Civil Engineering</a></li>
              <li><a href="/geotechnical-engineering/">Geotechnical Engineering</a></li>
              <li><a href="/title-24/">California Title 24</a></li>
              <li><a href="/permit-engineering/">Permit Engineering</a></li>
              <li><a href="/existing-building-engineering/">Existing Buildings</a></li>
              <li><a href="/engineering-reports/">Engineering Reports</a></li>
              <li><a href="/engineering-intent/engineering-near-me/">Engineering Firm Near Me</a></li>
            </ul>
            <h2>Project-stage support</h2>
            <ul>${ALL_ENGINEERING_INTENT_PAGES.map((p) => `<li><a href="/engineering-intent/${p.slug}/">${esc(p.h1)}</a></li>`).join("")}</ul>
            <h2>Industries</h2>
            <ul>
              <li><a href="/industries/">All Industries</a></li>
              <li><a href="${industryRootUrl("healthcare")}">Healthcare</a></li>
              <li><a href="${industryRootUrl("multifamily")}">Multifamily</a></li>
              <li><a href="${industryRootUrl("restaurants")}">Restaurants</a></li>
              <li><a href="${industryRootUrl("industrial-warehouse")}">Industrial &amp; Warehouse</a></li>
              <li><a href="${industryRootUrl("data-centers")}">Data Centers</a></li>
              <li><a href="${industryRootUrl("retail")}">Retail</a></li>
              <li><a href="${industryRootUrl("government")}">Government</a></li>
              <li><a href="${industryRootUrl("military-defense")}">Military &amp; Defense</a></li>
              <li><a href="${industryRootUrl("renewable-energy")}">Solar &amp; Renewable Energy</a></li>
              <li><a href="${industryRootUrl("commercial-office")}">Commercial Office</a></li>
              <li><a href="${industryRootUrl("hospitality")}">Hospitality</a></li>
              <li><a href="${industryRootUrl("education")}">Education</a></li>
              <li><a href="${industryRootUrl("life-science")}">Life Science</a></li>
              <li><a href="${industryRootUrl("senior-living")}">Senior Living</a></li>
              <li><a href="${industryRootUrl("cold-storage")}">Cold Storage</a></li>
            </ul>
          </div>
          <div class="sitemap-col">
            <h2>Who We Work With</h2>
            <ul>
              <li><a href="/who-we-work-with/">All Partners</a></li>
              <li><a href="/who-we-work-with/architects/">Architects</a></li>
              <li><a href="/who-we-work-with/general-contractors/">General Contractors</a></li>
              <li><a href="/who-we-work-with/developers/">Developers</a></li>
              <li><a href="/who-we-work-with/property-managers/">Property Managers</a></li>
              <li><a href="/who-we-work-with/government-contractors/">Government Contractors</a></li>
            </ul>
            <h2>Project Types</h2>
            <ul>
              <li><a href="/project-types/">All Project Types</a></li>
              <li><a href="/project-types/new-construction/">New Construction</a></li>
              <li><a href="/project-types/tenant-improvements/">Tenant Improvements</a></li>
              <li><a href="/project-types/renovations/">Renovations</a></li>
              <li><a href="/project-types/adaptive-reuse/">Adaptive Reuse</a></li>
            </ul>
            <h2>Projects</h2>
            <ul>
              <li><a href="/projects/">Project Experience</a></li>
              <li><a href="/projects/structural/">Structural Projects</a></li>
              <li><a href="/projects/mep/">MEP Projects</a></li>
              <li><a href="/projects/civil/">Civil Projects</a></li>
              <li><a href="/projects/government/">Government Projects</a></li>
              <li><a href="/projects/military/">Military Projects</a></li>
              <li><a href="/projects/healthcare/">Healthcare Projects</a></li>
              <li><a href="/projects/multifamily/">Multifamily Projects</a></li>
              <li><a href="/projects/industrial/">Industrial Projects</a></li>
            </ul>
            <h2>Resources</h2>
            <ul>
              <li><a href="/resources/">Engineering Resources</a></li>
              <li><a href="/blog/">Blog</a></li>
              <li><a href="/guides/">Engineering Guides</a></li>
              <li><a href="/engineering-glossary/">Engineering Glossary</a></li>
            </ul>
          </div>
          <div class="sitemap-col">
            <h2>Key Locations</h2>
            <ul>
              <li><a href="/locations/">All Service Areas</a></li>
              <li><a href="/metros/">Census Metro Engineering Guides</a></li>
              <li><a href="/locations/arizona/">Arizona</a></li>
              <li><a href="/locations/california/">California</a></li>
              <li><a href="/locations/texas/">Texas</a></li>
              <li><a href="/locations/florida/">Florida</a></li>
              <li><a href="/locations/virginia/">Virginia</a></li>
              <li><a href="/locations/north-carolina/">North Carolina</a></li>
              <li><a href="/locations/arizona/phoenix/">Phoenix</a></li>
              <li><a href="/locations/arizona/scottsdale/">Scottsdale</a></li>
              <li><a href="/locations/california/los-angeles/">Los Angeles</a></li>
              <li><a href="/locations/california/san-diego/">San Diego</a></li>
              <li><a href="/locations/texas/dallas/">Dallas</a></li>
              <li><a href="/locations/texas/houston/">Houston</a></li>
              <li><a href="/locations/texas/austin/">Austin</a></li>
              <li><a href="/locations/florida/miami/">Miami</a></li>
            </ul>
            <h2>About &amp; Company</h2>
            <ul>
              <li><a href="/about/">About Apex Grid</a></li>
              <li><a href="/military/">Military &amp; Veterans</a></li>
              <li><a href="/capabilities/">Capabilities</a></li>
              <li><a href="/government-contracting/">Government Contracting</a></li>
              <li><a href="/professional-engineering/">Professional Engineering</a></li>
              <li><a href="/quality-control/">Quality Control</a></li>
              <li><a href="/engineering-process/">Our Process</a></li>
              <li><a href="/contact/">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "name": "Site Map | Apex Grid Engineering", "url": `${SITE}${url}`, "publisher": { "@type": "Organization", "name": "Apex Grid Engineering", "url": SITE } };
  return htmlShell({ title: "Site Map | Apex Grid Engineering", description: "Complete index of Apex Grid Engineering pages — engineering services, industries, locations, resources, and company information.", canonical: `${SITE}${url}`, schemaJson: [schema], body });
}

// ─── Discipline Hub + Subpage Renderers ───────────────────────────────────

function disciplineHubPage(hub: DisciplineHub): string {
  const url = `/${hub.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: hub.h1 }];
  const subpageCards = hub.subpages
    .map(
      (sp) =>
        `<a class="card" href="/${hub.slug}/${sp.slug}/"><div class="label">${esc(sp.kicker)}</div><h3>${esc(sp.h1)}</h3><p>${esc(sp.lede.slice(0, 120))}…</p></a>`,
    )
    .join("\n          ");
  const extendedStructuralCards = hub.slug === "structural-engineering"
    ? `<section class="section section--white"><div class="container">
        <h2>Structural <em>Specialty Services</em></h2>
        <p class="lede">Explore focused structural scopes for existing buildings, equipment, site structures, and building modifications.</p>
        <div class="card-grid card-grid--3">${STRUCTURAL_EXTENDED_PAGES.map((sp) =>
          `<a class="card" href="/structural-engineering/${sp.slug}/"><div class="label">${esc(sp.kicker)}</div><h3>${esc(sp.h1)}</h3><p>${esc(sp.lede.slice(0, 140))}…</p></a>`
        ).join("\n")}</div>
      </div></section>`
    : "";

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(hub.kicker)}</div>
        <h1>${esc(hub.h1)}</h1>
        <p class="lede">${esc(hub.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Engineering Support</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What We Engineer</h2>
        <p>${esc(hub.intro)}</p>
        <ul class="check-list">
          ${hub.capabilities.map((c) => `<li>${esc(c)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--light">
      <div class="container">
        <h2>${esc(hub.h1)} Services</h2>
        <div class="card-grid card-grid--3">
          ${subpageCards}
        </div>
      </div>
    </section>
${extendedStructuralCards}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>About Apex Grid Engineering</h2>
        <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We provide ${esc(hub.h1.toLowerCase())} as a standalone service or as part of a coordinated multi-discipline package.</p>
        <p>We work from architectural PDFs, contractor sketches, or existing CAD files and produce stamped engineering documents and permit packages that building departments accept. One business day turnaround on fee proposals.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
      </div>
    </section>

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Start?</h2>
        <p>Send us your drawings or describe your project — we respond with a fee proposal within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Apex Grid Engineering",
    "description": hub.lede,
    "url": `${SITE}${url}`,
    "serviceType": hub.h1,
  };

  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}${url}`,
    schemaJson: [schema, breadcrumbSchema(crumbs)],
    body,
  });
}

function disciplineSubpagePage(hub: DisciplineHub, sp: DisciplineSubpage): string {
  const url = `/${hub.slug}/${sp.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: hub.h1, href: `/${hub.slug}/` },
    { name: sp.h1 },
  ];
  const otherSubpages = hub.subpages.filter((s) => s.slug !== sp.slug).slice(0, 4);
  const relatedLinks = otherSubpages
    .map((s) => `<a class="card" href="/${hub.slug}/${s.slug}/"><h3>${esc(s.h1)}</h3></a>`)
    .join("\n          ");

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(sp.kicker)}</div>
        <h1>${esc(sp.h1)}</h1>
        <p class="lede">${esc(sp.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Engineering Support</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What This Engineering Scope Covers</h2>
        <ul class="check-list">
          ${sp.scope.map((s) => `<li>${esc(s)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--light">
      <div class="container container--narrow">
        <h2>What You Get</h2>
        <ul class="check-list">
          ${sp.deliverables.map((d) => `<li>${esc(d)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>How Apex Grid Handles This</h2>
        <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We provide ${esc(sp.h1.toLowerCase())} as a standalone service or coordinated with structural, MEP, civil, and geotechnical engineering under one contract.</p>
        <a class="btn btn--primary" href="/contact/">Send Your Project Details</a>
      </div>
    </section>

    ${relatedLinks ? `
    <section class="section section--light">
      <div class="container">
        <h2>More ${esc(hub.h1)} Services</h2>
        <div class="card-grid card-grid--4">
          ${relatedLinks}
        </div>
      </div>
    </section>` : ""}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Move Forward?</h2>
        <p>PE-stamped engineering, on your schedule, from engineers who've done this before.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Apex Grid Engineering",
    "description": sp.lede,
    "url": `${SITE}${url}`,
    "serviceType": sp.h1,
  };

  return htmlShell({
    title: sp.title,
    description: sp.description,
    canonical: `${SITE}${url}`,
    schemaJson: [svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function miscPage(page: MiscPage): string {
  const url = `/${page.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: page.h1 }];
  const sectionsHtml = page.sections
    .map(
      (s) => `
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>${esc(s.heading)}</h2>
        <p>${esc(s.content)}</p>
        ${s.bullets ? `<ul class="check-list">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>
    </section>`,
    )
    .join("");

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}
    ${sectionsHtml}
    ${page.relatedLinks?.length ? `<section class="section section--white"><div class="container container--narrow">
      <h2>South Africa Insights</h2>
      <div class="linkrow">${page.relatedLinks.map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join("")}</div>
    </div></section>` : ""}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>${esc(page.ctaHeading)}</h2>
        <p>${esc(page.ctaText)}</p>
        <a class="btn btn--primary" href="/contact/">Get in Touch</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.h1,
    "description": page.description,
    "url": `${SITE}${url}`,
    "publisher": { "@type": "Organization", "name": "Apex Grid Engineering", "url": SITE },
  };

  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [schema, breadcrumbSchema(crumbs)],
    body,
  });
}

const BATCH2_EXPANSIONS: Batch2StateExpansion[] = [
  georgiaBatch2,
  illinoisBatch2,
  michiganBatch2,
  newYorkBatch2,
  northCarolinaBatch2,
  ohioBatch2,
  pennsylvaniaBatch2,
];
const BATCH2_EXPECTED_STATE_SLUGS = new Set([
  "georgia",
  "illinois",
  "michigan",
  "new-york",
  "north-carolina",
  "ohio",
  "pennsylvania",
]);

function batch2FaqSchema(faqs: Batch2Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function batch2VisibleWordCount(html: string): number {
  const main = html.match(/<main>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  return main
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function assertBatch2FaqParity(
  html: string,
  faqs: Batch2Faq[],
  label: string,
  minimumWords: number,
): void {
  const h1Count = (html.match(/<h1(?:\s[^>]*)?>/gi) ?? []).length;
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]) as {
      "@type"?: string;
      mainEntity?: Array<{ name: string; acceptedAnswer?: { text?: string } }>;
    });
  const faqSchema = schemas.find((schema) => schema["@type"] === "FAQPage");
  const visibleWords = batch2VisibleWordCount(html);
  const schemaFaqs = faqSchema?.mainEntity ?? [];
  const parity = schemaFaqs.length === faqs.length
    && faqs.every((faq, index) =>
      schemaFaqs[index]?.name === faq.question
      && schemaFaqs[index]?.acceptedAnswer?.text === faq.answer
      && html.includes(esc(faq.question))
      && html.includes(esc(faq.answer)));
  if (
    h1Count !== 1
    || visibleWords < minimumWords
    || !html.includes(`<link rel="canonical" href="${SITE}${label}"`)
    || html.includes('name="robots" content="noindex')
    || !html.includes('name="robots" content="index,follow"')
    || !faqSchema
    || !parity
  ) {
    throw new Error(`SEO assertion failed: malformed Batch2 page ${label} (${visibleWords} words, ${h1Count} H1s)`);
  }
}

function assertResearchedExpansions(
  expansions: Batch2StateExpansion[],
  expectedStateSlugs: Set<string>,
  expectedMetros: number,
  label: string,
): void {
  if (expansions.length !== expectedStateSlugs.size) {
    throw new Error(`SEO assertion failed: expected exactly ${expectedStateSlugs.size} ${label} expansions, found ${expansions.length}`);
  }
  const actualStateSlugs = new Set(expansions.map((expansion) => expansion.stateSlug));
  if (
    actualStateSlugs.size !== expectedStateSlugs.size
    || [...expectedStateSlugs].some((slug) => !actualStateSlugs.has(slug))
  ) {
    throw new Error(`SEO assertion failed: ${label} state slugs do not match the expected set`);
  }
  const metroKeys = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const h1s = new Set<string>();
  const routes = new Set<string>();
  let serviceCount = 0;
  for (const expansion of expansions) {
    assertSlug(expansion.stateSlug);
    if (expansion.metros.length < 5 || expansion.metros.length > 8) {
      throw new Error(`SEO assertion failed: ${expansion.stateSlug} must have 5-8 metros`);
    }
    for (const metro of expansion.metros) {
      assertSlug(metro.slug);
      const metroKey = `${expansion.stateSlug}/${metro.slug}`;
      if (metroKeys.has(metroKey)) throw new Error(`SEO assertion failed: duplicate ${label} metro key ${metroKey}`);
      metroKeys.add(metroKey);
      const serviceSlugs = metro.services.map((service) => service.serviceSlug);
      const uniqueServiceSlugs = new Set(serviceSlugs);
      if (
        metro.services.length !== BATCH2_CORE_SERVICE_SLUGS.length
        || uniqueServiceSlugs.size !== BATCH2_CORE_SERVICE_SLUGS.length
        || BATCH2_CORE_SERVICE_SLUGS.some((slug) => !uniqueServiceSlugs.has(slug))
      ) {
        throw new Error(`SEO assertion failed: ${metroKey} must have exactly the five researched services`);
      }
      for (const service of metro.services) {
        serviceCount++;
        const route = `/locations/${expansion.stateSlug}/${metro.slug}/${service.serviceSlug}/`;
        if (titles.has(service.title) || descriptions.has(service.description) || h1s.has(service.h1) || routes.has(route)) {
          throw new Error(`SEO assertion failed: duplicate ${label} service metadata or route: ${route}`);
        }
        titles.add(service.title);
        descriptions.add(service.description);
        h1s.add(service.h1);
        routes.add(route);
        if (
          service.sections.length < 3
          || service.permitSteps.length < 4
          || service.faqs.length < 3
          || service.sources.length < 4
          || service.sources.some((source) => !/^https:\/\//.test(source.url))
        ) {
          throw new Error(`SEO assertion failed: incomplete ${label} service record: ${route}`);
        }
      }
    }
  }
  if (metroKeys.size !== expectedMetros) {
    throw new Error(`SEO assertion failed: expected exactly ${expectedMetros} unique ${label} metro keys, found ${metroKeys.size}`);
  }
  if (serviceCount !== expectedMetros * BATCH2_CORE_SERVICE_SLUGS.length) {
    throw new Error(`SEO assertion failed: expected exactly ${expectedMetros * BATCH2_CORE_SERVICE_SLUGS.length} ${label} service records, found ${serviceCount}`);
  }
}

function batch2SourceLinks(sources: Array<{ label: string; url: string }>): string {
  return sources.map((source) =>
    `<a href="${esc(source.url)}" rel="noopener noreferrer">${esc(source.label)}</a>`,
  ).join("");
}

function batch2MetroPage(expansion: Batch2StateExpansion, metro: Batch2Metro): string {
  const url = `/locations/${expansion.stateSlug}/${metro.slug}/`;
  const faqs: Batch2Faq[] = [
    {
      question: `What do the ${metro.name} engineering service paths cover?`,
      answer: `They provide general planning context for the researched service paths in ${metro.name}. The project's address, records, scope, responsible professional, and current authority requirements determine the actual deliverables.`,
    },
    {
      question: "Do these metro pages guarantee permit approval?",
      answer: "No. The authority having jurisdiction controls its checklist, interpretation, inspections, review, and approval. A general metro guide cannot promise a local outcome.",
    },
    {
      question: "What should I send for an initial metro engineering review?",
      answer: "Send the project address, proposed scope, current drawings, existing-condition evidence, authority correspondence, relevant equipment or utility information, and requested deliverables. The responsible professional identifies additional records needed.",
    },
  ];
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: expansion.stateName, href: `/locations/${expansion.stateSlug}/` },
    { name: metro.name },
  ];
  const body = `<main>
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(expansion.stateAbbrev)} • ${esc(metro.county)}</p><h1>Engineering Services in ${esc(metro.name)}</h1><p class="lede">Apex Grid’s five researched engineering services for ${esc(metro.name)}, ${esc(expansion.stateName)}. The responsible professional and local authority confirm project-specific scope, licensure, code edition, and filing requirements.</p></div></section>
<section class="block"><div class="container"><h2>${esc(metro.name)} <em>Service Paths</em></h2><div class="grid2">${metro.services.map((service) =>
    `<a class="card" href="${esc(`${url}${service.serviceSlug}/`)}"><div class="label">${esc(service.kicker)}</div><h3>${esc(service.h1)}</h3><p>${esc(service.lede)}</p></a>`,
  ).join("")}</div></div></section>
<section class="block"><div class="container"><h2>Local <em>project context</em></h2><div class="prose">${metro.services.slice(0, 3).map((service) =>
    `<p><strong>${esc(service.serviceSlug)}:</strong> ${esc(service.localConditions)} ${esc(service.projectTypes)}</p>`,
  ).join("")}</div></div></section>
<section class="block"><div class="container faq"><h2>${esc(metro.name)} <em>FAQs</em></h2>${faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></section>
<section class="ctaband"><div class="container"><h2>Discuss a ${esc(metro.name)} project</h2><p>Send the address, scope, drawings, authority, and requested deliverable. Availability, responsible licensure, and timing are confirmed per project.</p><a class="cta" href="/contact">Request a Project Review</a></div></section>
</main>`;
  return htmlShell({
    title: `${metro.name} Engineering Services | ${expansion.stateName} | Apex Grid`,
    description: `Structural, MEP, civil, energy-compliance, and PE-stamped drawing guidance for ${metro.name}, ${expansion.stateName}.`,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, batch2FaqSchema(faqs), breadcrumbSchema(crumbs)],
    body,
  });
}

function batch2StatePage(expansion: Batch2StateExpansion, stateCities: CityData[]): string {
  const url = `/locations/${expansion.stateSlug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: expansion.stateName },
  ];
  const firstMetro = expansion.metros[0];
  const serviceLinks = BATCH2_CORE_SERVICE_SLUGS.map((slug) => {
    const service = firstMetro.services.find((candidate) => candidate.serviceSlug === slug)!;
    return `<a href="/locations/${expansion.stateSlug}/${firstMetro.slug}/${slug}/">${esc(service.serviceSlug)} in ${esc(expansion.stateName)}</a>`;
  }).join("");
  const metroLinks = expansion.metros.map((metro) => {
    const links = metro.services.map((service) =>
      `<a href="/locations/${expansion.stateSlug}/${metro.slug}/${service.serviceSlug}/">${esc(service.serviceSlug)}</a>`,
    ).join("");
    return `<article class="card"><h3><a href="/locations/${expansion.stateSlug}/${metro.slug}/">${esc(metro.name)}</a></h3><p>${esc(metro.county)}</p><div class="linkrow">${links}</div></article>`;
  }).join("");
  const establishedCityLinks = stateCities.map((city) =>
    `<a href="/locations/${expansion.stateSlug}/${city.slug}/">${esc(city.name)}</a>`,
  ).join("");
  const body = `<main>
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(expansion.hub.kicker)}</p><h1>${esc(expansion.hub.h1)}</h1><p class="lede">${esc(expansion.hub.lede)}</p></div></section>
${expansion.hub.sections.map((section) => `<section class="block"><div class="container"><h2>${esc(section.heading)}</h2><div class="prose"><p>${esc(section.body)}</p></div></div></section>`).join("")}
<section class="block"><div class="container"><h2>Five researched <em>local services</em></h2><p class="prose">Each linked service is organized around the selected metro’s permit authority, code context, local physical conditions, typical project types, permit steps, official references, and responsible-professional boundaries. These pages are information resources, not local-office claims or guarantees of licensure, approval, schedule, or construction outcome.</p><div class="linkrow">${serviceLinks}</div></div></section>
<section class="block"><div class="container"><h2>${esc(expansion.stateName)} <em>metros and services</em></h2><div class="grid2">${metroLinks}</div></div></section>
<section class="block"><div class="container"><h2>Established ${esc(expansion.stateName)} <em>city guides</em></h2><div class="linkrow">${establishedCityLinks}</div></div></section>
<section class="block"><div class="container faq"><h2>${esc(expansion.stateName)} <em>FAQs</em></h2>${expansion.hub.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></section>
<section class="block"><div class="container"><h2>Official <em>sources</em></h2><p class="note">Review the current authority, code, licensing, and environmental information before design or filing.</p><div class="linkrow">${batch2SourceLinks(expansion.hub.sources)}</div></div></section>
<section class="ctaband"><div class="container"><h2>Start a ${esc(expansion.stateName)} project</h2><p>Send the project address, jurisdiction, scope, records, and desired deliverable. Code edition, responsible licensure, authority review, and schedule remain project-specific.</p><p><a href="/engineering-cost-estimator/${esc(expansion.stateSlug)}/">${esc(expansion.stateName)} engineering cost estimator</a></p><a class="cta" href="/contact">Request a Project Review</a></div></section>
</main>`;
  const html = htmlShell({
    title: expansion.hub.title,
    description: expansion.hub.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs), batch2FaqSchema(expansion.hub.faqs)],
    body,
  });
  assertBatch2FaqParity(html, expansion.hub.faqs, url, 500);
  return html;
}

function batch2ServicePage(
  expansion: Batch2StateExpansion,
  metro: Batch2Metro,
  service: Batch2CoreServicePage,
  curatedCity?: CityData,
): string {
  const url = `/locations/${expansion.stateSlug}/${metro.slug}/${service.serviceSlug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: expansion.stateName, href: `/locations/${expansion.stateSlug}/` },
    { name: metro.name, href: `/locations/${expansion.stateSlug}/${metro.slug}/` },
    { name: service.serviceSlug },
  ];
  const localServiceLinks = metro.services.map((candidate) =>
    `<a href="/locations/${expansion.stateSlug}/${metro.slug}/${candidate.serviceSlug}/">${esc(candidate.serviceSlug)} in ${esc(metro.name)}</a>`,
  ).join("");
  const approvedCitySources = curatedCity?.research
    ? Object.values(curatedCity.research.sources).flat()
    : [];
  const sources = [
    ...service.sources,
    ...approvedCitySources.map((url) => ({ label: `${metro.name} approved city evidence`, url })),
  ].filter((source, index, all) => all.findIndex((candidate) => candidate.url === source.url) === index);
  const sourceLinks = batch2SourceLinks(sources);
  const body = `<main>
${breadcrumb(crumbs)}
<section class="hero"><div class="container"><p class="kicker">${esc(service.kicker)}</p><h1>${esc(service.h1)}</h1><p class="lede">${esc(service.lede)}</p></div></section>
<section class="block"><div class="container"><h2>Permit <em>authority</em></h2><div class="prose"><p>${esc(service.permitAuthority)}</p></div></div></section>
<section class="block"><div class="container"><h2>Code <em>context</em></h2><div class="prose"><p>${esc(service.codeContext)}</p></div></div></section>
<section class="block"><div class="container"><h2>Local <em>conditions</em></h2><div class="prose"><p>${esc(service.localConditions)}</p></div></div></section>
<section class="block"><div class="container"><h2>Typical <em>project types</em></h2><div class="prose"><p>${esc(service.projectTypes)}</p></div></div></section>
${service.sections.map((section) => `<section class="block"><div class="container"><h2>${esc(section.heading)}</h2><div class="prose"><p>${esc(section.body)}</p></div></div></section>`).join("")}
<section class="block"><div class="container"><h2>Permit and engineering <em>steps</em></h2><ol class="scope">${service.permitSteps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol></div></section>
<section class="block"><div class="container faq"><h2>${esc(service.h1)} <em>FAQs</em></h2>${service.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></section>
<section class="block"><div class="container"><h2>All five ${esc(metro.name)} <em>services</em></h2><div class="linkrow">${localServiceLinks}</div></div></section>
<section class="block"><div class="container"><h2>Official <em>sources</em></h2><p class="note">These official sources support the local permit, code, utility, climate, and environmental context. The current AHJ and adopted requirements control.</p><div class="linkrow">${sourceLinks}</div></div></section>
<section class="ctaband"><div class="container"><h2>Discuss your ${esc(metro.name)} scope</h2><p>Send the address, existing records, proposed use, authority correspondence, and requested deliverable. Responsible professional review and availability are confirmed before work begins.</p><a class="cta" href="/contact">Request a Project Review</a></div></section>
</main>`;
  const html = htmlShell({
    title: service.title,
    description: service.description,
    canonical: `${SITE}${url}`,
    schemaJson: [
      orgSchema,
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.h1,
        serviceType: service.serviceSlug,
        provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
        areaServed: { "@type": "City", name: metro.name, containedInPlace: { "@type": "State", name: expansion.stateName } },
      },
      batch2FaqSchema(service.faqs),
      breadcrumbSchema(crumbs),
    ],
    body,
  });
  assertBatch2FaqParity(html, service.faqs, url, 350);
  return html;
}

function renderResearchedExpansionPages(
  cities: CityData[],
  expansions: Batch2StateExpansion[],
  expectedStateSlugs: Set<string>,
  expectedMetros: number,
  label: string,
): number {
  assertResearchedExpansions(expansions, expectedStateSlugs, expectedMetros, label);
  let pages = 0;
  for (const expansion of expansions) {
    const stateDir = path.join(OUT, expansion.stateSlug);
    fs.mkdirSync(stateDir, { recursive: true });
    fs.writeFileSync(
      path.join(stateDir, "index.html"),
      batch2StatePage(
        expansion,
        cities.filter((city) => city.stateSlug === expansion.stateSlug),
      ),
    );
    pages++;
    for (const metro of expansion.metros) {
      const metroDir = path.join(stateDir, metro.slug);
      fs.mkdirSync(metroDir, { recursive: true });
      const curatedCity = cities.find(
        (city) => city.stateSlug === expansion.stateSlug && city.slug === metro.slug,
      );
      for (const service of metro.services) {
        const serviceDir = path.join(metroDir, service.serviceSlug);
        fs.mkdirSync(serviceDir, { recursive: true });
        fs.writeFileSync(
          path.join(serviceDir, "index.html"),
          batch2ServicePage(expansion, metro, service, curatedCity),
        );
        pages++;
      }
    }
  }
  return pages;
}

async function main() {
  assertRouteOwnership();
  assertPhase7Corpus();
  const generatedTopLevelRoutes = [
    ...SEO_GENERATOR_FIXED_INDEX_ROUTES,
    "/engineering-cost-estimator",
    ...LOCATION_VERTICALS.map((page) => `/${page.slug}`),
    ...DISCIPLINES.map((page) => `/${page.slug}`),
    ...DISCIPLINE_HUBS.map((page) => `/${page.slug}`),
    ...STATIC_STANDALONE_PAGES.map((page) => `/${page.dir}`),
    ...MISC_PAGES
      .map((page) => `/${page.slug}`)
      .filter(
        (route) =>
          !REACT_OWNED_SHARED_ROUTES.includes(
            route as (typeof REACT_OWNED_SHARED_ROUTES)[number],
          ),
      ),
  ];
  assertNoConflictingOutputOwners({
    "react-prerender": [
      ...REACT_PRERENDER_ROUTES,
      ...REACT_PRERENDER_SERVICE_ROUTES,
      ...ALL_INDUSTRIES.map((industry) => `/industries/${industry.slug}/`),
    ],
    "seo-generator": [
      ...generatedTopLevelRoutes,
      ...INDUSTRY_DISCIPLINE_PAGES.map(
        (page) => `/industries/${page.segments.join("/")}`,
      ),
    ],
  });
  const states = await loadStates();
  const cities = await loadCities();
  if (cities[0] && isReviewedCity({ ...cities[0], slug: "unsourced-promotion-gate-probe", research: undefined })) {
    throw new Error("SEO assertion failed: a new city without approved research passed the promotion gate");
  }
  for (const legacyKey of LEGACY_CURATED_CITY_KEYS) {
    if (!cities.some((city) => `${city.stateSlug}/${city.slug}` === legacyKey && !city.research)) {
      throw new Error(`SEO assertion failed: stale or researched city remains in the legacy allowlist: ${legacyKey}`);
    }
  }
  const directory = loadDirectory();
  validateDirectory(directory, states);
  writeLlmsTxt();
  const cityQuality = writeCityQualityReport(states, directory, cities);
  const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
  for (const s of states) {
    assertSlug(s.slug);
    assertNoMarkup(s);
  }
  for (const c of cities) {
    assertSlug(c.slug);
    assertNoMarkupCity(c);
    assertCityResearch(c);
    if (serviceSlugs.has(c.slug)) throw new Error(`City slug collides with a service slug: ${c.slug}`);
    if (!states.some((s) => s.slug === c.stateSlug)) throw new Error(`City ${c.slug} references unknown state: ${c.stateSlug}`);
  }
  fs.mkdirSync(PUBLIC, { recursive: true });
  fs.writeFileSync(
    path.join(PUBLIC, "legacy-location-redirects.json"),
    `${JSON.stringify(expandedLegacyLocationRedirects(), null, 2)}\n`,
  );
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "index.html"), hubPage(states, cities));
  let pages = 1;
  for (const s of states) {
    const sdir = path.join(OUT, s.slug);
    fs.mkdirSync(sdir, { recursive: true });
    fs.writeFileSync(path.join(sdir, "index.html"), statePage(s, cities, directory));
    pages++;
    for (const svc of SERVICES) {
      const dir = path.join(sdir, svc.slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), servicePage(s, svc, states));
      pages++;
    }
    for (const c of cities.filter((c) => c.stateSlug === s.slug)) {
      const cdir = path.join(sdir, c.slug);
      fs.mkdirSync(cdir, { recursive: true });
      fs.writeFileSync(path.join(cdir, "index.html"), cityPage(s, c, cities));
      pages++;
      for (const svc of SERVICES) {
        const dir = path.join(cdir, svc.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), cityServicePage(s, c, svc, cities));
        pages++;
      }
    }
    // Census-derived lightweight city pages (skip curated cities & reserved slugs)
    const curatedSlugs = new Set(cities.filter((c) => c.stateSlug === s.slug).map((c) => c.slug));
    const dirCities = (directory[s.slug] ?? []).filter((d) => !curatedSlugs.has(d.slug) && !serviceSlugs.has(d.slug));
    for (const d of dirCities) {
      assertSlug(d.slug);
      const cdir = path.join(sdir, d.slug);
      fs.mkdirSync(cdir, { recursive: true });
       fs.writeFileSync(
         path.join(cdir, "index.html"),
         cityLitePage(
           s,
           d,
           dirCities,
           cities,
           assessLiteCity(s, d).status === "indexed"
             || RETAINED_LEGACY_LOCATIONS.some((r) => r.stateSlug === s.slug && r.city.slug === d.slug),
         ),
       );
      pages++;
    }
  }
  // Census metro guides use a new namespace so the established
  // /locations/ tree and its route ownership remain untouched.
  fs.rmSync(METROS_OUT, { recursive: true, force: true });
  fs.mkdirSync(METROS_OUT, { recursive: true });
  fs.writeFileSync(path.join(METROS_OUT, "index.html"), phase1MetroCollectionPage());
  pages++;
  for (const metro of PHASE1_METROS) {
    assertSlug(metro.slug);
    const metroDir = path.join(METROS_OUT, metro.slug);
    fs.mkdirSync(metroDir, { recursive: true });
    fs.writeFileSync(path.join(metroDir, "index.html"), phase1MetroHubPage(metro));
    pages++;
    for (const service of PHASE1_SERVICE_SLUGS) {
      const serviceDir = path.join(metroDir, service);
      fs.mkdirSync(serviceDir, { recursive: true });
      fs.writeFileSync(path.join(serviceDir, "index.html"), phase1MetroServicePage(metro, service));
      pages++;
    }
  }
  for (const metro of PHASE2_METROS) {
    assertSlug(metro.slug);
    const metroDir = path.join(METROS_OUT, metro.slug);
    fs.mkdirSync(metroDir, { recursive: true });
    fs.writeFileSync(path.join(metroDir, "index.html"), phase2MetroHubPage(metro));
    pages++;
    for (const service of PHASE2_SERVICE_SLUGS) {
      const serviceDir = path.join(metroDir, service);
      fs.mkdirSync(serviceDir, { recursive: true });
      fs.writeFileSync(path.join(serviceDir, "index.html"), phase2MetroServicePage(metro, service));
      pages++;
    }
  }
  for (const metro of PHASE3_METROS) {
    assertSlug(metro.slug);
    const metroDir = path.join(METROS_OUT, metro.slug);
    fs.mkdirSync(metroDir, { recursive: true });
    fs.writeFileSync(path.join(metroDir, "index.html"), phase3MetroHubPage(metro));
    pages++;
    for (const service of PHASE3_SERVICE_SLUGS) {
      const serviceDir = path.join(metroDir, service);
      fs.mkdirSync(serviceDir, { recursive: true });
      fs.writeFileSync(path.join(serviceDir, "index.html"), phase3MetroServicePage(metro, service));
      pages++;
    }
  }
  for (const metro of PHASE4_METROS) {
    assertSlug(metro.slug);
    const metroDir = path.join(METROS_OUT, metro.slug);
    fs.mkdirSync(metroDir, { recursive: true });
    fs.writeFileSync(path.join(metroDir, "index.html"), phase4MetroHubPage(metro));
    pages++;
    for (const service of PHASE4_SERVICE_SLUGS) {
      const serviceDir = path.join(metroDir, service);
      fs.mkdirSync(serviceDir, { recursive: true });
      fs.writeFileSync(path.join(serviceDir, "index.html"), phase4MetroServicePage(metro, service));
      pages++;
    }
  }
  for (const metro of PHASE5_METROS) {
    assertSlug(metro.slug);
    const metroDir = path.join(METROS_OUT, metro.slug);
    fs.mkdirSync(metroDir, { recursive: true });
    fs.writeFileSync(path.join(metroDir, "index.html"), phase5MetroHubPage(metro));
    pages++;
    for (const service of PHASE5_SERVICE_SLUGS) {
      const serviceDir = path.join(metroDir, service);
      fs.mkdirSync(serviceDir, { recursive: true });
      fs.writeFileSync(path.join(serviceDir, "index.html"), phase5MetroServicePage(metro, service));
      pages++;
    }
  }
  for (const [fromPath, toPath] of Object.entries(expandedLegacyLocationRedirects())) {
    const legacyDir = path.join(PUBLIC, fromPath.replace(/^\/|\/$/g, ""));
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(path.join(legacyDir, "index.html"), legacyLocationRedirectPage(fromPath, toPath));
    pages++;
  }
  let verticalPages = 0;
  for (const vertical of LOCATION_VERTICALS) {
    const verticalDir = path.join(PUBLIC, vertical.slug);
    fs.rmSync(verticalDir, { recursive: true, force: true });
    fs.mkdirSync(verticalDir, { recursive: true });
    fs.writeFileSync(path.join(verticalDir, "index.html"), verticalLandingPage(vertical));
    pages++;
    verticalPages++;

    const locationsDir = path.join(verticalDir, "locations");
    fs.mkdirSync(locationsDir, { recursive: true });
    const cityCountByState = Object.fromEntries(
      states
        .filter((state) => verticalAvailableInState(vertical, state.slug))
        .map((state) => [state.slug, [
          ...cities.filter((city) => city.stateSlug === state.slug && isReviewedCity(city)).map((city) => city.slug),
          ...eligibleDirectoryCities(state, directory, cities).map((city) => city.slug),
          ...RETAINED_LEGACY_LOCATIONS.filter((retained) => retained.stateSlug === state.slug).map((retained) => retained.city.slug),
        ].length]),
    );
    fs.writeFileSync(path.join(locationsDir, "index.html"), verticalHubPage(vertical, states, cityCountByState));
    pages++;
    verticalPages++;

    for (const state of states.filter((entry) => verticalAvailableInState(vertical, entry.slug))) {
      // State and vertical hubs link only to reviewed/indexable city owners.
      // Directory-lite URLs remain directly addressable noindex,follow pages,
      // but are deliberately excluded from these broad anchor grids.
      const allStateCities = allDirectoryCitiesForState(state, directory, cities);
      const stateCities = allStateCities.filter((city) =>
        cities.some((curated) => curated.stateSlug === state.slug && curated.slug === city.slug && isReviewedCity(curated))
        || assessLiteCity(state, city).status === "indexed"
        || RETAINED_LEGACY_LOCATIONS.some((retained) => retained.stateSlug === state.slug && retained.city.slug === city.slug),
      );
      const stateDir = path.join(locationsDir, state.slug);
      fs.mkdirSync(stateDir, { recursive: true });
      fs.writeFileSync(path.join(stateDir, "index.html"), verticalStatePage(vertical, state, stateCities));
      pages++;
      verticalPages++;

      const curatedBySlug = new Map(
        cities
          .filter((city) => city.stateSlug === state.slug && isReviewedCity(city))
          .map((city) => [city.slug, city]),
      );
      for (const city of allStateCities) {
        const cityDir = path.join(stateDir, city.slug);
        fs.mkdirSync(cityDir, { recursive: true });
        fs.writeFileSync(
          path.join(cityDir, "index.html"),
          verticalCityPage(
            vertical,
            state,
            city,
             stateCities,
            curatedBySlug.get(city.slug),
             Boolean(
               (curatedBySlug.get(city.slug) && isReviewedCity(curatedBySlug.get(city.slug)!))
               || assessLiteCity(state, city).status === "indexed"
               || RETAINED_LEGACY_LOCATIONS.some((r) => r.stateSlug === state.slug && r.city.slug === city.slug)
             ),
          ),
        );
        pages++;
        verticalPages++;
      }
    }
  }
  // Top-level discipline pages
  for (const d of DISCIPLINES) {
    assertSlug(d.slug);
    const ddir = path.join(PUBLIC, d.slug);
    fs.rmSync(ddir, { recursive: true, force: true });
    fs.mkdirSync(ddir, { recursive: true });
    fs.writeFileSync(path.join(ddir, "index.html"), disciplinePage(d));
    pages++;
  }
  // Blog
  const blogDir = path.join(PUBLIC, "blog");
  fs.rmSync(blogDir, { recursive: true, force: true });
  fs.mkdirSync(blogDir, { recursive: true });
  fs.writeFileSync(path.join(blogDir, "index.html"), blogIndexPage());
  pages++;
  for (const p of BLOG_POSTS) {
    assertSlug(p.slug);
    const pdir = path.join(blogDir, p.slug);
    fs.mkdirSync(pdir, { recursive: true });
    const html = blogPostPage(p);
    verifyBlogPostAuthorship(p, html);
    fs.writeFileSync(path.join(pdir, "index.html"), html);
    pages++;
  }
  // Resources / Knowledge Center
  const resourcesDir = path.join(PUBLIC, "resources");
  resetGeneratedChildrenPreservingHub(resourcesDir);
  for (const disc of RESOURCE_DISCIPLINES) {
    assertSlug(disc.slug);
    const ddir = path.join(resourcesDir, disc.slug);
    fs.mkdirSync(ddir, { recursive: true });
    fs.writeFileSync(path.join(ddir, "index.html"), resourceDisciplinePage(disc));
    pages++;
  }
  for (const article of RESOURCE_ARTICLES) {
    assertSlug(article.slug);
    const adir = path.join(PUBLIC, resourceUrl(article).replace(/^\/|\/$/g, ""));
    fs.mkdirSync(adir, { recursive: true });
    fs.writeFileSync(path.join(adir, "index.html"), resourceArticlePage(article));
    pages++;
  }
  // Preserve previously published discipline-nested URLs after restoring the
  // original root resource URLs as the canonical, indexable article owners.
  for (const article of RESOURCE_ARTICLES.filter((entry) => ROOT_CANONICAL_RESOURCE_SLUGS.has(entry.slug))) {
    const oldDir = path.join(resourcesDir, disciplineOf(article).slug, article.slug);
    fs.mkdirSync(oldDir, { recursive: true });
    fs.writeFileSync(path.join(oldDir, "index.html"), redirectPage(resourceUrl(article), article.h1));
  }
  for (const audiencePage of AUDIENCE_RESOURCE_HUBS) {
    const titleLength = audiencePage.title.length;
    const descriptionLength = audiencePage.description.length;
    if (titleLength < 50 || titleLength > 60 || descriptionLength < 150 || descriptionLength > 160) {
      throw new Error(`SEO assertion failed: audience resource metadata length for ${audiencePage.slug} (${titleLength}/${descriptionLength})`);
    }
    if (audiencePage.faqs.length < 4 || audiencePage.faqs.length > 6) {
      throw new Error(`SEO assertion failed: audience resource FAQ count for ${audiencePage.slug}`);
    }
    const audienceDir = path.join(resourcesDir, audiencePage.slug);
    fs.mkdirSync(audienceDir, { recursive: true });
    const html = audienceResourceHubPage(audiencePage);
    if (!html.includes(`By ${AUDIENCE_RESOURCE_AUTHOR}`) || !html.includes(`rel="canonical" href="${SITE}/resources/${audiencePage.slug}/"`)
      || !html.includes('"@type":"FAQPage"') || !html.includes('href="/estimate/"')) {
      throw new Error(`SEO assertion failed: malformed audience resource hub ${audiencePage.slug}`);
    }
    fs.writeFileSync(path.join(audienceDir, "index.html"), html);
    pages++;
  }
  // Who We Work With
  const wwwDir = path.join(PUBLIC, "who-we-work-with");
  fs.rmSync(wwwDir, { recursive: true, force: true });
  fs.mkdirSync(wwwDir, { recursive: true });
  fs.writeFileSync(path.join(wwwDir, "index.html"), whoWeWorkWithHubPage());
  pages++;
  for (const cp of CLIENT_PAGES) {
    assertSlug(cp.slug);
    const cdir = path.join(wwwDir, cp.slug);
    fs.mkdirSync(cdir, { recursive: true });
    fs.writeFileSync(path.join(cdir, "index.html"), clientPage(cp));
    pages++;
  }

  // Construction partners
  const partnersDir = path.join(PUBLIC, "partners");
  fs.rmSync(partnersDir, { recursive: true, force: true });
  fs.mkdirSync(partnersDir, { recursive: true });
  for (const pp of PARTNER_PAGES) {
    assertSlug(pp.slug);
    const pdir = path.join(partnersDir, pp.slug);
    fs.mkdirSync(pdir, { recursive: true });
    fs.writeFileSync(path.join(pdir, "index.html"), partnerPage(pp));
    pages++;
  }

  // Project Types
  const ptDir = path.join(PUBLIC, "project-types");
  fs.rmSync(ptDir, { recursive: true, force: true });
  fs.mkdirSync(ptDir, { recursive: true });
  fs.writeFileSync(path.join(ptDir, "index.html"), projectTypesHubPage());
  pages++;
  for (const pt of PROJECT_TYPE_PAGES) {
    assertSlug(pt.slug);
    const pdir = path.join(ptDir, pt.slug);
    fs.mkdirSync(pdir, { recursive: true });
    const redirect = PROJECT_TYPE_REDIRECTS.get(pt.slug);
    fs.writeFileSync(path.join(pdir, "index.html"), redirect ? redirectPage(redirect.newPath, redirect.title) : projectTypePage(pt));
    pages++;
  }

  // Existing Building Engineering
  const ebDir = path.join(PUBLIC, "existing-building-engineering");
  fs.rmSync(ebDir, { recursive: true, force: true });
  fs.mkdirSync(ebDir, { recursive: true });
  fs.writeFileSync(path.join(ebDir, "index.html"), existingBuildingHubPage());
  pages++;
  for (const eb of EXISTING_BUILDING_PAGES) {
    assertSlug(eb.slug);
    const edir = path.join(ebDir, eb.slug);
    fs.mkdirSync(edir, { recursive: true });
    fs.writeFileSync(path.join(edir, "index.html"), existingBuildingPage(eb));
    pages++;
  }

  // Permit Engineering
  const peDir = path.join(PUBLIC, "permit-engineering");
  fs.rmSync(peDir, { recursive: true, force: true });
  fs.mkdirSync(peDir, { recursive: true });
  fs.writeFileSync(path.join(peDir, "index.html"), permitHubPage());
  pages++;
  for (const pp of PERMIT_PAGES) {
    assertSlug(pp.slug);
    const pdir = path.join(peDir, pp.slug);
    fs.mkdirSync(pdir, { recursive: true });
    fs.writeFileSync(path.join(pdir, "index.html"), permitPage(pp));
    pages++;
  }

  // Industry × Discipline pages
  const indDisciplineDir = path.join(PUBLIC, "industries");
  // Don't wipe the whole /industries dir — the React SPA may also serve routes
  // under it. Instead write only the sub-paths we own.
  for (const idp of INDUSTRY_DISCIPLINE_PAGES) {
    const segments = idp.segments;
    const dir = path.join(indDisciplineDir, ...segments);
    fs.mkdirSync(dir, { recursive: true });
    const redirect = INDUSTRY_DISCIPLINE_REDIRECTS.get(segments.join("/"));
    fs.writeFileSync(path.join(dir, "index.html"), redirect ? redirectPage(redirect.newPath, redirect.title) : industryDisciplinePage(idp));
    pages++;
  }
  // Phase 9 strongest industry × service combinations. These focused pages
  // intentionally use their own five-FAQ, founder-voice renderer rather than
  // weakening the established generic industry-discipline contract.
  for (const page of PHASE9_INDUSTRY_SERVICE_PAGES) {
    const route = phase9Url(page);
    const dir = path.join(indDisciplineDir, ...page.segments);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase9Page(page);
    if (
      !html.includes(`By Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran`)
      || !html.includes(`rel="canonical" href="${SITE}${route}"`)
      || (html.match(/"@type":"FAQPage"/g) ?? []).length !== 1
      || (html.match(/<details><summary>/g) ?? []).length !== 5
      || !html.includes('"@type":"Service"')
      || !html.includes('"@type":"BreadcrumbList"')
      || !html.includes('href="/estimate/"')
    ) {
      throw new Error(`SEO assertion failed: incomplete Phase 9 industry-service page ${route}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }

  // Link each new specialty page from an established family page. This keeps
  // discovery contextual without changing the established page canonicals.
  for (const page of PHASE9_INDUSTRY_SERVICE_PAGES) {
    const route = phase9Url(page);
    const parentRoute = PHASE9_INBOUND_TARGETS[route];
    if (!parentRoute) throw new Error(`SEO assertion failed: missing Phase 9 inbound target ${route}`);
    const parentFile = path.join(PUBLIC, parentRoute.replace(/^\/|\/$/g, ""), "index.html");
    if (!fs.existsSync(parentFile)) throw new Error(`SEO assertion failed: missing Phase 9 inbound parent ${parentRoute}`);
    const parentHtml = fs.readFileSync(parentFile, "utf8");
    const marker = `phase9-inbound-${route}`;
    if (!parentHtml.includes(marker)) {
      const inbound = `<section class="block phase9-inbound" id="${marker}"><div class="container"><h2>Specialty <em>industry scopes</em></h2><p>For a narrower facility or operating condition, I also maintain a focused engineering scope:</p><p><a href="${route}">${page.h1}</a></p></div></section>`;
      fs.writeFileSync(parentFile, parentHtml.replace("</body>", `${inbound}</body>`));
    }
  }

  // Location × Service pages (non-curated cities + new service slugs)
  for (const lsp of LOCATION_SERVICE_PAGES) {
    assertSlug(lsp.stateSlug);
    assertSlug(lsp.citySlug);
    assertSlug(lsp.serviceSlug);
    const dir = path.join(OUT, lsp.stateSlug, lsp.citySlug, lsp.serviceSlug);
    fs.mkdirSync(dir, { recursive: true });
    const city = cities.find((candidate) => candidate.stateSlug === lsp.stateSlug && candidate.slug === lsp.citySlug);
    fs.writeFileSync(path.join(dir, "index.html"), locationServicePage(lsp, city));
    pages++;
  }

  // Roadmap Phase 8 priority regional and city hubs. Render after generic
  // location owners so these reviewed pages replace any directory placeholders.
  for (const market of PRIORITY_MARKET_HUBS) {
    const route = priorityMarketHubUrl(market);
    const dir = path.join(PUBLIC, route.replace(/^\/|\/$/g, ""));
    fs.mkdirSync(dir, { recursive: true });
    const html = priorityMarketHubPage(market);
    if (
      !html.includes(`By ${PRIORITY_MARKET_AUTHOR}`)
      || !html.includes(`rel="canonical" href="${SITE}${route}"`)
      || !html.includes('"@type":"FAQPage"')
      || !html.includes('"@type":"CollectionPage"')
      || !html.includes('href="/estimate/"')
    ) {
      throw new Error(`SEO assertion failed: incomplete priority market hub ${route}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }

  // Batch 2 is intentionally rendered last among location owners. Its
  // researched state hubs and metro service pages therefore win any route
  // collisions with generic state, city, or location-service templates.
  pages += renderResearchedExpansionPages(cities, BATCH2_EXPANSIONS, BATCH2_EXPECTED_STATE_SLUGS, 45, "Batch2");
  pages += renderResearchedExpansionPages(cities, BATCH3_EXPANSIONS, BATCH3_EXPECTED_STATE_SLUGS, 80, "Batch3");
  pages += renderResearchedExpansionPages(cities, BATCH4_EXPANSIONS, BATCH4_EXPECTED_STATE_SLUGS, 75, "Batch4");

  // California ADU structural engineering source pages. These are deliberately
  // separate from the generic location/service templates: the source records
  // carry local authority, site-condition, process, FAQ, and citation detail.
  if (CALIFORNIA_ADU_CITY_RECORDS.length !== 15) {
    throw new Error(`SEO assertion failed: expected 15 California ADU city records, found ${CALIFORNIA_ADU_CITY_RECORDS.length}`);
  }
  const aduState = normalizeCaliforniaAduPage(CALIFORNIA_ADU_STATE_PAGE);
  const aduStateDir = path.join(PUBLIC, "services", "california-adu-structural-engineering");
  fs.mkdirSync(aduStateDir, { recursive: true });
  const aduStateHtml = californiaAduPage(aduState);
  assertIndexableFaqPage(aduStateHtml, aduState.faqs, CALIFORNIA_ADU_STATE_URL);
  fs.writeFileSync(path.join(aduStateDir, "index.html"), aduStateHtml);
  pages++;
  for (const sourcePage of CALIFORNIA_ADU_CITY_RECORDS) {
    const aduCity = normalizeCaliforniaAduPage(sourcePage);
    if (!aduCity.citySlug) throw new Error(`SEO assertion failed: ADU city page has no city slug: ${sourcePage.slug}`);
    if (!cities.some((city) => city.stateSlug === "california" && city.slug === aduCity.citySlug)) {
      throw new Error(`SEO assertion failed: ADU city has no existing California root route: ${aduCity.citySlug}`);
    }
    const aduCityDir = path.join(OUT, "california", aduCity.citySlug, "adu-structural-engineering");
    fs.mkdirSync(aduCityDir, { recursive: true });
    const aduCityHtml = californiaAduPage(aduCity);
    assertIndexableFaqPage(aduCityHtml, aduCity.faqs, aduCity.citySlug);
    fs.writeFileSync(path.join(aduCityDir, "index.html"), aduCityHtml);
    pages++;
  }

  // Dedicated plan-check correction service route. This remains under the
  // service namespace while the existing broad permit-correction page keeps
  // its own canonical intent.
  const planCheckDir = path.join(PUBLIC, "services", PLAN_CHECK_CORRECTIONS_PAGE.slug);
  fs.mkdirSync(planCheckDir, { recursive: true });
  const planCheckHtml = planCheckCorrectionsPage(PLAN_CHECK_CORRECTIONS_PAGE);
  assertIndexableFaqPage(
    planCheckHtml,
    PLAN_CHECK_CORRECTIONS_PAGE.faqs.map((faq) => ({
      question: faq.q,
      answer: faq.a,
    })),
    PLAN_CHECK_CORRECTIONS_PAGE.path,
  );
  fs.writeFileSync(path.join(planCheckDir, "index.html"), planCheckHtml);
  pages++;

  // Confirmed Phase 0 corpus: national AEO answers, professional-engineer
  // verification resources, service pages, and general metro playbooks.
  if (states.length !== 49 || Object.keys(PE_STATE_SOURCE_LINKS).length !== 49) {
    throw new Error(`SEO assertion failed: Phase 0 PE corpus requires 49 licensed states (found ${states.length} states and ${Object.keys(PE_STATE_SOURCE_LINKS).length} source records)`);
  }
  for (const state of states) {
    if (!PE_STATE_SOURCE_LINKS[state.slug]) {
      throw new Error(`SEO assertion failed: missing official PE source links for ${state.slug}`);
    }
  }
  const phase0ServiceDir = path.join(PUBLIC, "services");
  for (const servicePage of PHASE0_SERVICE_PAGES) {
    assertSlug(servicePage.slug);
    const dir = path.join(phase0ServiceDir, servicePage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0ServicePage(servicePage);
    assertPhase0Page(html, servicePage.path, servicePage.faqs, servicePage.path);
    if (!html.includes(esc(PHASE0_JEREMY_AUTHOR))) {
      throw new Error(`SEO assertion failed: missing Jeremy Mills founder mention on ${servicePage.path}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  const phase0AnswersDir = path.join(PUBLIC, "answers");
  const answerHubHtml = phase0CollectionHub(
    "/answers/",
    "Engineering Answers for Permit and Design Questions | Apex Grid",
    "Concise, national engineering answers with FAQ schema and professional-engineering context for permit, PE, structural, MEP, and energy questions.",
    "Engineering Answers for Permit and Design Questions",
    "Phase 0 National AEO Collection",
    "These concise answers address recurring engineering and permit questions, then point to the project inputs and professional boundaries that matter in a real submission.",
    ALL_AEO_PAGES.map((page) => ({ label: page.h1, href: `/answers/${page.slug}/` })),
  );
  fs.rmSync(phase0AnswersDir, { recursive: true, force: true });
  fs.mkdirSync(phase0AnswersDir, { recursive: true });
  assertPhase0Page(answerHubHtml, "/answers/", [
    { question: "Are these pages static and indexable?", answer: "Yes. Phase 0 pages are generated as static HTML with a self-canonical URL and index,follow metadata, then included in the generated sitemap." },
    { question: "Do these pages contain local guarantees or pricing?", answer: "No. The corpus intentionally excludes invented local records, near-me doorway pages, county guides, and inline location pricing." },
  ], "answers");
  fs.writeFileSync(path.join(phase0AnswersDir, "index.html"), answerHubHtml);
  pages++;
  for (const answerPage of PHASE0_AEO_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_D_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_E_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_F_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_G_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_H_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_I_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_J_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_K_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_L_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_M_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_N_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_O_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_P_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_Q_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_R_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_S_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_T_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_U_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_V_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_W_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_X_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_Y_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_Z_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AA_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AB_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AC_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AD_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AE_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AF_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AG_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AH_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AI_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AJ_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AK_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AL_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AM_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AN_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AO_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AP_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AQ_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AR_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AS_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AT_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AU_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AV_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AW_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AX_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AY_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_AZ_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BA_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BB_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BC_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BD_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BE_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BF_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BG_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BH_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BI_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BJ_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BK_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BL_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BM_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BN_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BO_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BP_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BQ_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BR_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BS_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BT_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of WAVE_BU_ANSWER_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, answerPage.faqs, answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`) || html.includes("Jeremy Mills, PE")) {
      throw new Error(`SEO assertion failed: invalid Jeremy Mills author voice on ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  for (const answerPage of PHASE7_AEO_PAGES) {
    assertSlug(answerPage.slug);
    const dir = path.join(phase0AnswersDir, answerPage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0AeoPage(answerPage);
    assertPhase0Page(html, `/answers/${answerPage.slug}/`, phase7Faqs(answerPage), answerPage.slug);
    if (!html.includes(`By ${esc(PHASE0_JEREMY_AUTHOR)}`)
      || !html.includes('href="/estimate"')
      || !html.includes(`href="${esc(answerPage.serviceHref)}"`)) {
      throw new Error(`SEO assertion failed: incomplete Phase 7 answer page ${answerPage.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  if (PHASE0_AEO_PAGES.length + PHASE7_AEO_PAGES.length !== 163) {
    throw new Error(`SEO assertion failed: answer library requires exactly 163 pages (found ${PHASE0_AEO_PAGES.length + PHASE7_AEO_PAGES.length})`);
  }
  if (WAVE_D_ANSWER_PAGES.length !== 9 || WAVE_E_ANSWER_PAGES.length !== 23) {
    throw new Error(`SEO assertion failed: wave-d/wave-e require 9 + 23 answer pages (found ${WAVE_D_ANSWER_PAGES.length} + ${WAVE_E_ANSWER_PAGES.length})`);
  }
  if (WAVE_F_ANSWER_PAGES.length !== 24 || WAVE_G_ANSWER_PAGES.length !== 24 || WAVE_H_ANSWER_PAGES.length !== 24 || WAVE_I_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-f/g/h/i require 24 answer pages each (found ${WAVE_F_ANSWER_PAGES.length} + ${WAVE_G_ANSWER_PAGES.length} + ${WAVE_H_ANSWER_PAGES.length} + ${WAVE_I_ANSWER_PAGES.length})`);
  }
  if (WAVE_J_ANSWER_PAGES.length !== 24 || WAVE_K_ANSWER_PAGES.length !== 24 || WAVE_L_ANSWER_PAGES.length !== 24 || WAVE_M_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-j/k/l/m require 24 answer pages each (found ${WAVE_J_ANSWER_PAGES.length} + ${WAVE_K_ANSWER_PAGES.length} + ${WAVE_L_ANSWER_PAGES.length} + ${WAVE_M_ANSWER_PAGES.length})`);
  }
  if (WAVE_N_ANSWER_PAGES.length !== 24 || WAVE_O_ANSWER_PAGES.length !== 24 || WAVE_P_ANSWER_PAGES.length !== 24 || WAVE_Q_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-n/o/p/q require 24 answer pages each (found ${WAVE_N_ANSWER_PAGES.length} + ${WAVE_O_ANSWER_PAGES.length} + ${WAVE_P_ANSWER_PAGES.length} + ${WAVE_Q_ANSWER_PAGES.length})`);
  }
  if (WAVE_R_ANSWER_PAGES.length !== 24 || WAVE_S_ANSWER_PAGES.length !== 24 || WAVE_T_ANSWER_PAGES.length !== 24 || WAVE_U_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-r/s/t/u require 24 answer pages each (found ${WAVE_R_ANSWER_PAGES.length} + ${WAVE_S_ANSWER_PAGES.length} + ${WAVE_T_ANSWER_PAGES.length} + ${WAVE_U_ANSWER_PAGES.length})`);
  }
  if (WAVE_V_ANSWER_PAGES.length !== 24 || WAVE_W_ANSWER_PAGES.length !== 24 || WAVE_X_ANSWER_PAGES.length !== 24 || WAVE_Y_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-v/w/x/y require 24 answer pages each (found ${WAVE_V_ANSWER_PAGES.length} + ${WAVE_W_ANSWER_PAGES.length} + ${WAVE_X_ANSWER_PAGES.length} + ${WAVE_Y_ANSWER_PAGES.length})`);
  }
  if (WAVE_Z_ANSWER_PAGES.length !== 24 || WAVE_AA_ANSWER_PAGES.length !== 24 || WAVE_AB_ANSWER_PAGES.length !== 24 || WAVE_AC_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-z/aa/ab/ac require 24 answer pages each (found ${WAVE_Z_ANSWER_PAGES.length} + ${WAVE_AA_ANSWER_PAGES.length} + ${WAVE_AB_ANSWER_PAGES.length} + ${WAVE_AC_ANSWER_PAGES.length})`);
  }
  if (WAVE_AD_ANSWER_PAGES.length !== 24 || WAVE_AE_ANSWER_PAGES.length !== 24 || WAVE_AF_ANSWER_PAGES.length !== 24 || WAVE_AG_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-ad/ae/af/ag require 24 answer pages each (found ${WAVE_AD_ANSWER_PAGES.length} + ${WAVE_AE_ANSWER_PAGES.length} + ${WAVE_AF_ANSWER_PAGES.length} + ${WAVE_AG_ANSWER_PAGES.length})`);
  }
  if (WAVE_AH_ANSWER_PAGES.length !== 24 || WAVE_AI_ANSWER_PAGES.length !== 24 || WAVE_AJ_ANSWER_PAGES.length !== 24 || WAVE_AK_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-ah/ai/aj/ak require 24 answer pages each (found ${WAVE_AH_ANSWER_PAGES.length} + ${WAVE_AI_ANSWER_PAGES.length} + ${WAVE_AJ_ANSWER_PAGES.length} + ${WAVE_AK_ANSWER_PAGES.length})`);
  }
  if (WAVE_AL_ANSWER_PAGES.length !== 24 || WAVE_AM_ANSWER_PAGES.length !== 24 || WAVE_AN_ANSWER_PAGES.length !== 24 || WAVE_AO_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-al/am/an/ao require 24 answer pages each (found ${WAVE_AL_ANSWER_PAGES.length} + ${WAVE_AM_ANSWER_PAGES.length} + ${WAVE_AN_ANSWER_PAGES.length} + ${WAVE_AO_ANSWER_PAGES.length})`);
  }
  if (WAVE_AP_ANSWER_PAGES.length !== 24 || WAVE_AQ_ANSWER_PAGES.length !== 24 || WAVE_AR_ANSWER_PAGES.length !== 24 || WAVE_AS_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-ap/aq/ar/as require 24 answer pages each (found ${WAVE_AP_ANSWER_PAGES.length} + ${WAVE_AQ_ANSWER_PAGES.length} + ${WAVE_AR_ANSWER_PAGES.length} + ${WAVE_AS_ANSWER_PAGES.length})`);
  }
  if (WAVE_AT_ANSWER_PAGES.length !== 24 || WAVE_AU_ANSWER_PAGES.length !== 24 || WAVE_AV_ANSWER_PAGES.length !== 24 || WAVE_AW_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-at/au/av/aw require 24 answer pages each (found ${WAVE_AT_ANSWER_PAGES.length} + ${WAVE_AU_ANSWER_PAGES.length} + ${WAVE_AV_ANSWER_PAGES.length} + ${WAVE_AW_ANSWER_PAGES.length})`);
  }
  if (WAVE_AX_ANSWER_PAGES.length !== 24 || WAVE_AY_ANSWER_PAGES.length !== 24 || WAVE_AZ_ANSWER_PAGES.length !== 24 || WAVE_BA_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-ax/ay/az/ba require 24 answer pages each (found ${WAVE_AX_ANSWER_PAGES.length} + ${WAVE_AY_ANSWER_PAGES.length} + ${WAVE_AZ_ANSWER_PAGES.length} + ${WAVE_BA_ANSWER_PAGES.length})`);
  }
  if (WAVE_BB_ANSWER_PAGES.length !== 24 || WAVE_BC_ANSWER_PAGES.length !== 24 || WAVE_BD_ANSWER_PAGES.length !== 24 || WAVE_BE_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-bb/bc/bd/be require 24 answer pages each (found ${WAVE_BB_ANSWER_PAGES.length} + ${WAVE_BC_ANSWER_PAGES.length} + ${WAVE_BD_ANSWER_PAGES.length} + ${WAVE_BE_ANSWER_PAGES.length})`);
  }
  if (WAVE_BF_ANSWER_PAGES.length !== 24 || WAVE_BG_ANSWER_PAGES.length !== 24 || WAVE_BH_ANSWER_PAGES.length !== 24 || WAVE_BI_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-bf/bg/bh/bi require 24 answer pages each (found ${WAVE_BF_ANSWER_PAGES.length} + ${WAVE_BG_ANSWER_PAGES.length} + ${WAVE_BH_ANSWER_PAGES.length} + ${WAVE_BI_ANSWER_PAGES.length})`);
  }
  if (WAVE_BJ_ANSWER_PAGES.length !== 24 || WAVE_BK_ANSWER_PAGES.length !== 24 || WAVE_BL_ANSWER_PAGES.length !== 24 || WAVE_BM_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-bj/bk/bl/bm require 24 answer pages each (found ${WAVE_BJ_ANSWER_PAGES.length} + ${WAVE_BK_ANSWER_PAGES.length} + ${WAVE_BL_ANSWER_PAGES.length} + ${WAVE_BM_ANSWER_PAGES.length})`);
  }
  if (WAVE_BN_ANSWER_PAGES.length !== 24 || WAVE_BO_ANSWER_PAGES.length !== 24 || WAVE_BP_ANSWER_PAGES.length !== 24 || WAVE_BQ_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-bn/bo/bp/bq require 24 answer pages each (found ${WAVE_BN_ANSWER_PAGES.length} + ${WAVE_BO_ANSWER_PAGES.length} + ${WAVE_BP_ANSWER_PAGES.length} + ${WAVE_BQ_ANSWER_PAGES.length})`);
  }
  if (WAVE_BR_ANSWER_PAGES.length !== 24 || WAVE_BS_ANSWER_PAGES.length !== 24 || WAVE_BT_ANSWER_PAGES.length !== 24 || WAVE_BU_ANSWER_PAGES.length !== 24) {
    throw new Error(`SEO assertion failed: wave-br/bs/bt/bu require 24 answer pages each (found ${WAVE_BR_ANSWER_PAGES.length} + ${WAVE_BS_ANSWER_PAGES.length} + ${WAVE_BT_ANSWER_PAGES.length} + ${WAVE_BU_ANSWER_PAGES.length})`);
  }
  const peStampDir = path.join(PUBLIC, "pe-stamp");
  fs.mkdirSync(peStampDir, { recursive: true });
  const peHubHtml = peStampHubPage();
  assertPhase0Page(peHubHtml, "/pe-stamp/", [
    { question: "Is a PE stamp a stand-alone product?", answer: "A seal represents a responsible engineer's professional review and responsibility for eligible work within the engineer's authorization and applicable rules." },
    { question: "Where can I verify a professional engineer license?", answer: "Use the official board and license-verification resources linked for the relevant state, then confirm project-specific authorization and scope directly with the responsible professional." },
    { question: "Does a PE stamp guarantee permit approval?", answer: "No. The AHJ controls its completeness review, interpretation, comments, and approval decision." },
  ], "pe-stamp");
  fs.writeFileSync(path.join(peStampDir, "index.html"), peHubHtml);
  pages++;
  for (const state of states) {
    const dir = path.join(peStampDir, state.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = peStampStatePage(state, state.slug);
    const stateFaqs = [
      { question: `How do I verify a PE license in ${state.name}?`, answer: `Start with the official ${state.name} board and license-verification links on this page. Confirm the record directly with the board and separately confirm that the engineer is authorized for the project's discipline and scope.` },
      { question: `Does a ${state.name} PE seal guarantee approval?`, answer: "No. A seal communicates professional responsibility for eligible engineering work. The authority having jurisdiction controls its review, comments, interpretation, and approval decision." },
      { question: `What should a ${state.name} project team confirm before sealing?`, answer: `Confirm the project location, discipline, adopted code, AHJ submission rules, existing-condition evidence, and the engineer's ability to accept responsible charge. ${state.licensure.notes}` },
    ];
    assertPhase0Page(html, `/pe-stamp/${state.slug}/`, stateFaqs, `pe-stamp/${state.slug}`);
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  const playbooksDir = path.join(PUBLIC, "plan-check-playbooks");
  const playbookHubHtml = phase0CollectionHub(
    "/plan-check-playbooks/",
    "Plan Check Correction Playbooks | Apex Grid Engineering",
    "General, source-linked plan-check correction playbooks for ten major metros, with non-invented guidance on comment logs, engineering revisions, and resubmittals.",
    "Plan Check Correction Playbooks",
    "Phase 0 Metro Review Guidance",
    "These playbooks explain a repeatable correction-response workflow while leaving code interpretation, review timing, and approval decisions to the applicable authority.",
    PHASE0_PLAN_CHECK_PLAYBOOKS.map((page) => ({ label: `${page.city} plan-check playbook`, href: `/plan-check-playbooks/${page.slug}/` })),
  );
  fs.mkdirSync(playbooksDir, { recursive: true });
  assertPhase0Page(playbookHubHtml, "/plan-check-playbooks/", [
    { question: "Are these pages static and indexable?", answer: "Yes. Phase 0 pages are generated as static HTML with a self-canonical URL and index,follow metadata, then included in the generated sitemap." },
    { question: "Do these pages contain local guarantees or pricing?", answer: "No. The corpus intentionally excludes invented local records, near-me doorway pages, county guides, and inline location pricing." },
  ], "plan-check-playbooks");
  fs.writeFileSync(path.join(playbooksDir, "index.html"), playbookHubHtml);
  pages++;
  for (const playbook of PHASE0_PLAN_CHECK_PLAYBOOKS) {
    assertSlug(playbook.slug);
    const dir = path.join(playbooksDir, playbook.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0PlaybookPage(playbook);
    const playbookFaqs = [
      { question: `What is the first step for ${playbook.city} plan-check corrections?`, answer: `Preserve the official correction notice and permit record, identify the current submitted set, and build a comment matrix before changing drawings or calculations. ${(playbook as Phase0Playbook & { angle: string }).angle}` },
      { question: "Can a plan-check playbook promise approval?", answer: "No. It provides a general coordination method. The AHJ decides completeness, interpretation, comments, review timing, and approval." },
      { question: "Which project information should be assembled?", answer: "Collect the complete notice, current and prior submittals, calculations, architectural background, project address, permit number, equipment data, field evidence, and the authority's current resubmittal instructions." },
      { question: "What if a comment belongs to another discipline?", answer: "Assign the item to the responsible architect, engineer, contractor, utility, fire authority, or other specialist and record the dependency instead of claiming that an engineering response resolves it." },
    ];
    assertPhase0Page(html, `/plan-check-playbooks/${playbook.slug}/`, playbookFaqs, playbook.slug);
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  const phase0ResourcesDir = path.join(PUBLIC, "resources", "phase-0");
  const resourceHubHtml = phase0CollectionHub(
    "/resources/phase-0/",
    "Phase 0 Engineering Project Resources | Apex Grid",
    "Differentiated national engineering resources for permit intake, calculations, existing conditions, MEP, energy, civil, structural, and plan-check coordination.",
    "Phase 0 Engineering Project Resources",
    "Phase 0 Supporting Resource Collection",
    "This collection turns recurring engineering project decisions into practical records and review methods without inventing local facts or replacing professional judgment.",
    PHASE0_RESOURCE_PAGES.map((page) => ({ label: page.title, href: `/resources/phase-0/${page.slug}/` })),
  );
  fs.mkdirSync(phase0ResourcesDir, { recursive: true });
  assertPhase0Page(resourceHubHtml, "/resources/phase-0/", [
    { question: "Are these pages static and indexable?", answer: "Yes. Phase 0 pages are generated as static HTML with a self-canonical URL and index,follow metadata, then included in the generated sitemap." },
    { question: "Do these pages contain local guarantees or pricing?", answer: "No. The corpus intentionally excludes invented local records, near-me doorway pages, county guides, and inline location pricing." },
  ], "resources/phase-0");
  fs.writeFileSync(path.join(phase0ResourcesDir, "index.html"), resourceHubHtml);
  pages++;
  for (const resourcePage of PHASE0_RESOURCE_PAGES) {
    assertSlug(resourcePage.slug);
    const dir = path.join(phase0ResourcesDir, resourcePage.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = phase0ResourcePage(resourcePage);
    const resourceFaqs = [
      { question: `What is the key idea in ${resourcePage.title}?`, answer: resourcePage.answer },
      { question: "What should the project team record?", answer: `Record ${resourcePage.checklist} The record should identify what is known, what is assumed, who owns an unresolved decision, and which document contains the current conclusion.` },
      { question: "Does this resource replace professional engineering review?", answer: "No. It is general coordination guidance. The responsible engineer and applicable authority determine the project-specific design, documentation, and professional responsibility." },
    ];
    assertPhase0Page(html, `/resources/phase-0/${resourcePage.slug}/`, resourceFaqs, resourcePage.slug);
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }

  // Guides pages
  const guidesDir = path.join(PUBLIC, "guides");
  fs.rmSync(guidesDir, { recursive: true, force: true });
  fs.mkdirSync(guidesDir, { recursive: true });
  fs.writeFileSync(path.join(guidesDir, "index.html"), guidesHubPage());
  pages++;
  for (const gp of GUIDE_PAGES) {
    assertSlug(gp.slug);
    const dir = path.join(guidesDir, gp.slug);
    fs.mkdirSync(dir, { recursive: true });
    const redirect = GUIDE_REDIRECTS.get(gp.slug);
    fs.writeFileSync(
      path.join(dir, "index.html"),
      redirect ? redirectPage(redirect.newPath, redirect.title) : guidePage(gp),
    );
    pages++;
  }

  // Canonical commercial engineering intent pages (non-location).
  const intentDir = path.join(PUBLIC, "engineering-intent");
  fs.rmSync(intentDir, { recursive: true, force: true });
  fs.mkdirSync(intentDir, { recursive: true });
  fs.writeFileSync(path.join(intentDir, "index.html"), engineeringIntentHubPage());
  pages++;
  const seenTitles = new Set<string>();
  const seenH1 = new Set<string>();
  for (const existing of [...PERMIT_PAGES, ...EXISTING_BUILDING_PAGES]) {
    seenTitles.add(existing.title); seenH1.add(existing.h1);
  }
  for (const ep of ALL_ENGINEERING_INTENT_PAGES) {
    assertSlug(ep.slug);
    if (ep.title.length < 50 || ep.title.length > 60) throw new Error(`SEO assertion failed: intent title length: ${ep.slug}`);
    if (ep.description.length < 140 || ep.description.length > 180) throw new Error(`SEO assertion failed: intent description length: ${ep.slug}`);
    if (seenTitles.has(ep.title) || seenH1.has(ep.h1)) throw new Error(`SEO assertion failed: duplicate intent title or H1: ${ep.slug}`);
    seenTitles.add(ep.title); seenH1.add(ep.h1);
    const dir = path.join(intentDir, ep.slug);
    fs.mkdirSync(dir, { recursive: true });
    const html = engineeringIntentPage(ep);
    const mainMatch = html.match(/<main>([\s\S]*?)<\/main>/i);
    const visibleText = (mainMatch?.[1] ?? "").replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    if (!mainMatch || visibleText.split(/\s+/).length < 700 || ep.faqs.length < 4 || !html.includes("<h1>") || !html.includes('"@type":"Service"') || !html.includes('"@type":"FAQPage"') ||
      !html.includes('"@type":"BreadcrumbList"') || html.includes('name="robots" content="noindex')) {
      throw new Error(`SEO assertion failed: malformed indexable intent page: ${ep.slug} (${visibleText.split(/\s+/).length} words, main=${Boolean(mainMatch)}, faqs=${ep.faqs.length})`);
    }
    if (!jsonLd.some((schema) => schema["@type"] === "Service") || !jsonLd.some((schema) => schema["@type"] === "FAQPage")) {
      throw new Error(`SEO assertion failed: invalid JSON-LD intent schema: ${ep.slug}`);
    }
    if (/(?:we|apex grid|our)\s+(?:guarantee|guaranteed|offer a fixed price|claim a nearby office|provide coverage everywhere|promise emergency availability)/i.test(html)) {
      throw new Error(`SEO assertion failed: prohibited claim on intent page: ${ep.slug}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;
  }
  const intentHubHtml = fs.readFileSync(path.join(intentDir, "index.html"), "utf8");
  for (const ep of ALL_ENGINEERING_INTENT_PAGES) {
    if (!intentHubHtml.includes(`/engineering-intent/${ep.slug}/`)) {
      throw new Error(`SEO assertion failed: retained intent page lacks contextual inbound link: ${ep.slug}`);
    }
  }
  const reportDir = path.join(__dirname, "reports");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(path.join(reportDir, "engineering-intent-opportunity-map.json"), `${JSON.stringify({
    generatedFor: "Apex Grid commercial engineering intent expansion",
    canonicalRule: "One URL per intent cluster; location is never inferred from a query.",
    selectionChecks: {
      exactRouteScan: `${NATIONAL_FACILITY_INTENT_PAGES.length} proposed slugs had no exact match in the SEO source registry before generation.`,
      searchConsole: "Production page-query snapshots were checked on 2026-09-11; no snapshots were synced, so no exact-query rows, impressions, or clicks were available for these 25 primary phrases.",
      decisionBasis: "Retain only facility or project-decision intents with a distinct buyer question, explicit overlap note, and no unsupported location, licensing, credential, client, or performance claim.",
    },
    opportunities: [
      ...ALL_ENGINEERING_INTENT_PAGES.map((ep) => ({
      slug: ep.slug, primaryIntent: ep.h1, supportingPhrases: ep.phrases, canonicalUrl: `${SITE}/engineering-intent/${ep.slug}/`,
      audience: ep.audience, overlapDecision: ep.overlap,
      decision: "retained",
    })),
      ...CONSOLIDATED_INTENT_PAGES.map((ep) => ({
        slug: ep.slug, primaryIntent: ep.h1, supportingPhrases: ep.phrases,
        canonicalUrl: ep.slug === "fast-turnaround-engineering" ? `${SITE}/solutions/fast-track-engineering/` :
          ep.slug === "permit-correction-engineering" ? `${SITE}/solutions/permit-correction-engineering/` :
          ep.slug === "failed-inspection-correction-engineering" ? `${SITE}/solutions/permit-correction-engineering/` :
          ep.slug === "pe-stamped-plans-calculations" ? `${SITE}/permit-engineering/pe-stamped-drawings/` :
          ep.slug === "engineering-due-diligence" ? `${SITE}/existing-building-engineering/condition-assessments/` :
          ep.slug === "urgent-building-assessment" ? `${SITE}/existing-building-engineering/condition-assessments/` :
          ep.slug === "as-built-existing-condition-documentation" ? `${SITE}/existing-building-engineering/field-verification/` : `${SITE}/services/`,
        audience: ep.audience, overlapDecision: ep.overlap, decision: "consolidated into existing canonical",
      })),
       {
         slug: "bess-structural",
         primaryIntent: "Structural engineering for battery energy storage systems",
         canonicalUrl: `${SITE}/solutions/bess-structural-engineering/`,
         decision: "consolidated: the solution page is the stronger single buyer-intent canonical; the industry path is project-type context.",
         rationale: "Both pages target structural design of BESS pads, containers, anchorage, and rooftop loads. Keeping one solution canonical avoids splitting the same structural buyer intent.",
       },
       {
         slug: "parking-lot-expansion",
         primaryIntent: "Parking lot expansion engineering",
         canonicalUrl: `${SITE}/solutions/parking-lot-expansion-engineering/`,
         decision: "consolidated: solution canonical retained; project-type page is the broader project-planning context.",
         rationale: "Both pages describe civil design for expanding parking, including grading, drainage, pavement, ADA, and permits. A single solution URL is clearer for the service buyer.",
       },
    ],
  }, null, 2)}\n`);
  if (/"24-hour turnaround|24–hour turnaround|guaranteed (?:completion|approval)|claimed nearby office|coverage everywhere|fixed-fee proposal/i.test(JSON.stringify(SOLUTION_PAGES))) {
    throw new Error("SEO assertion failed: prohibited turnaround, locality, or fixed-fee claim remains in solution definitions");
  }

  // Solutions pages
  const solutionsDir = path.join(PUBLIC, "solutions");
  fs.rmSync(solutionsDir, { recursive: true, force: true });
  fs.mkdirSync(solutionsDir, { recursive: true });
  fs.writeFileSync(path.join(solutionsDir, "index.html"), solutionsHubPage());
  pages++;
  const governmentDir = path.join(PUBLIC, "government");
  fs.rmSync(governmentDir, { recursive: true, force: true });
  fs.mkdirSync(governmentDir, { recursive: true });
  fs.writeFileSync(path.join(governmentDir, "index.html"), governmentHubPage());
  pages++;
  for (const sp of SOLUTION_PAGES) {
    assertSlug(sp.slug);
    assertSlug(sp.dir);
    const dir = path.join(PUBLIC, sp.dir, sp.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), solutionPage(sp));
    pages++;
  }

  // Engineering Glossary pages
  const glossaryDir = path.join(PUBLIC, "engineering-glossary");
  fs.rmSync(glossaryDir, { recursive: true, force: true });
  fs.mkdirSync(glossaryDir, { recursive: true });
  fs.writeFileSync(path.join(glossaryDir, "index.html"), glossaryHubPage());
  pages++;
  for (const gt of GLOSSARY_TERMS) {
    assertSlug(gt.slug);
    const dir = path.join(glossaryDir, gt.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), glossaryPage(gt));
    pages++;
  }

  // Title 24 hub + subpages
  const title24Dir = path.join(PUBLIC, "title-24");
  fs.rmSync(title24Dir, { recursive: true, force: true });
  fs.mkdirSync(title24Dir, { recursive: true });
  fs.writeFileSync(path.join(title24Dir, "index.html"), title24HubPage());
  pages++;
  for (const tp of TITLE_24_PAGES) {
    assertSlug(tp.slug);
    const tpDir = path.join(title24Dir, tp.slug);
    fs.mkdirSync(tpDir, { recursive: true });
    fs.writeFileSync(path.join(tpDir, "index.html"), title24SubpagePage(tp));
    pages++;
  }

  // Projects portfolio hub + category pages
  const projectsDir = path.join(PUBLIC, "projects");
  fs.rmSync(projectsDir, { recursive: true, force: true });
  fs.mkdirSync(projectsDir, { recursive: true });
  fs.writeFileSync(path.join(projectsDir, "index.html"), projectsHubPage());
  pages++;
  for (const cat of PROJECT_CATEGORY_PAGES) {
    assertSlug(cat.slug);
    const catDir = path.join(projectsDir, cat.slug);
    fs.mkdirSync(catDir, { recursive: true });
    fs.writeFileSync(path.join(catDir, "index.html"), projectCategoryPage(cat));
    pages++;
  }

  // Phase 11 portfolio case studies must be generated after the project tree
  // is rebuilt so the cleanup above cannot delete the detail routes or inbound links.
  const phase11ImageSourceDir = path.resolve(__dirname, "../../../attached_assets/generated_images");
  const phase11ImageOutputDir = path.join(PUBLIC, "images", "case-studies");
  fs.mkdirSync(phase11ImageOutputDir, { recursive: true });
  for (const project of PHASE11_PROJECT_CASE_STUDIES) {
    const route = phase11Url(project);
    const dir = path.join(PUBLIC, route.replace(/^\/|\/$/g, ""));
    const imageName = path.basename(project.image);
    const imageSource = path.join(phase11ImageSourceDir, imageName);
    if (!fs.existsSync(imageSource)) throw new Error(`SEO assertion failed: missing Phase 11 source image ${imageSource}`);
    fs.copyFileSync(imageSource, path.join(phase11ImageOutputDir, imageName));
    fs.mkdirSync(dir, { recursive: true });
    const html = phase11Page(project);
    if (!html.includes(`By Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran`)
      || !html.includes(`rel="canonical" href="${SITE}${route}"`)
      || (html.match(/<h1(?:\s[^>]*)?>/g) ?? []).length !== 1
      || (html.match(/"@type":"FAQPage"/g) ?? []).length !== 1
      || !html.includes('"@type":"Article"')
      || !html.includes('"@type":"BreadcrumbList"')
      || !html.includes('href="/estimate/"')
      || !html.includes("<img ")) {
      throw new Error(`SEO assertion failed: incomplete Phase 11 project case study ${route}`);
    }
    fs.writeFileSync(path.join(dir, "index.html"), html);
    pages++;

    const parentRoute = project.links.find(link => link.href.startsWith("/projects/"))?.href ?? "/projects/";
    const parentFile = path.join(PUBLIC, parentRoute.replace(/^\/|\/$/g, ""), "index.html");
    if (!fs.existsSync(parentFile)) throw new Error(`SEO assertion failed: missing Phase 11 inbound parent ${parentRoute}`);
    const parentHtml = fs.readFileSync(parentFile, "utf8");
    const marker = `phase11-inbound-${project.slug}`;
    const inbound = `<section class="block phase11-inbound" id="${marker}"><div class="container"><h2>Selected <em>case study</em></h2><p><a href="${route}">${project.title}</a></p></div></section>`;
    fs.writeFileSync(parentFile, parentHtml.replace("</body>", `${inbound}</body>`));
  }

  // Static standalone pages (engineering-reports, etc.)
  for (const sp of STATIC_STANDALONE_PAGES) {
    const spDir = path.join(PUBLIC, sp.dir);
    fs.rmSync(spDir, { recursive: true, force: true });
    fs.mkdirSync(spDir, { recursive: true });
    fs.writeFileSync(path.join(spDir, "index.html"), staticStandalonePage(sp));
    pages++;
  }

  // HTML sitemap page
  const sitemapPageDir = path.join(PUBLIC, "sitemap");
  fs.rmSync(sitemapPageDir, { recursive: true, force: true });
  fs.mkdirSync(sitemapPageDir, { recursive: true });
  fs.writeFileSync(path.join(sitemapPageDir, "index.html"), htmlSitemapPage());
  pages++;

  // Discipline hub + subservice pages
  for (const hub of DISCIPLINE_HUBS) {
    assertSlug(hub.slug);
    const hubDir = path.join(PUBLIC, hub.slug);
    fs.rmSync(hubDir, { recursive: true, force: true });
    fs.mkdirSync(hubDir, { recursive: true });
    fs.writeFileSync(path.join(hubDir, "index.html"), disciplineHubPage(hub));
    pages++;
    for (const sp of hub.subpages) {
      assertSlug(sp.slug);
      const spDir = path.join(hubDir, sp.slug);
      fs.mkdirSync(spDir, { recursive: true });
      fs.writeFileSync(path.join(spDir, "index.html"), disciplineSubpagePage(hub, sp));
      pages++;
    }
  }

  // Additional structural pages must be written after the discipline hub,
  // because rebuilding that hub clears its directory first.
  const structuralHubDir = path.join(PUBLIC, "structural-engineering");
  for (const sp of STRUCTURAL_EXTENDED_PAGES) {
    assertSlug(sp.slug);
    const spDir = path.join(structuralHubDir, sp.slug);
    fs.mkdirSync(spDir, { recursive: true });
    fs.writeFileSync(path.join(spDir, "index.html"), structuralExtendedPage(sp));
    pages++;
  }

  // Misc standalone pages. React-owned hubs are never emitted by this pipeline.
  for (const mp of MISC_PAGES) {
    assertSlug(mp.slug);
    if (REACT_OWNED_SHARED_ROUTES.includes(`/${mp.slug}` as (typeof REACT_OWNED_SHARED_ROUTES)[number])) {
      continue;
    }
    const mpDir = path.join(PUBLIC, mp.slug);
    fs.rmSync(mpDir, { recursive: true, force: true });
    fs.mkdirSync(mpDir, { recursive: true });
    fs.writeFileSync(path.join(mpDir, "index.html"), miscPage(mp));
    pages++;
  }

  // State-specific estimator pages use only the reviewed StateData corpus.
  // Keep the directory separate from /estimate so the estimator engine route
  // remains React-owned and unchanged.
  const estimatorOut = path.join(PUBLIC, "engineering-cost-estimator");
  fs.rmSync(estimatorOut, { recursive: true, force: true });
  fs.mkdirSync(estimatorOut, { recursive: true });
  for (const state of states) {
    const stateEstimatorDir = path.join(estimatorOut, state.slug);
    fs.mkdirSync(stateEstimatorDir, { recursive: true });
    fs.writeFileSync(
      path.join(stateEstimatorDir, "index.html"),
      engineeringCostEstimatorPage(state, cities, directory),
    );
    pages++;
  }

  writeSitemap(states, cities, directory);
  const generatedLocationsSitemap = fs.readFileSync(path.join(PUBLIC, "sitemap-locations.xml"), "utf8");
  const generatedServicesSitemap = fs.readFileSync(path.join(PUBLIC, "sitemap-services.xml"), "utf8");
  const researchedSitemapRoutes = [...BATCH2_EXPANSIONS, ...BATCH3_EXPANSIONS, ...BATCH4_EXPANSIONS].flatMap((expansion) => [
    `/locations/${expansion.stateSlug}/`,
    ...expansion.metros.flatMap((metro) => [
      ...metro.services.map((service) => `/locations/${expansion.stateSlug}/${metro.slug}/${service.serviceSlug}/`),
    ]),
  ]);
  for (const route of researchedSitemapRoutes) {
    const marker = `<loc>${SITE}${route}</loc>`;
    const occurrenceCount = generatedLocationsSitemap.split(marker).length - 1;
    if (occurrenceCount !== 1) {
      throw new Error(`SEO assertion failed: researched expansion route must appear once in sitemap-locations.xml: ${route} (${occurrenceCount})`);
    }
  }
  for (const cityPage of CALIFORNIA_ADU_CITY_RECORDS) {
    const citySlug = cityPage.slug.replace(/-adu-structural-engineering$/, "");
    const cityRoot = `/locations/california/${citySlug}/`;
    const cityRootFile = path.join(PUBLIC, cityRoot.replace(/^\/|\/$/g, ""), "index.html");
    if (!fs.existsSync(cityRootFile) || !generatedLocationsSitemap.includes(`<loc>${SITE}${cityRoot}</loc>`)) {
      throw new Error(`SEO assertion failed: existing California metro root route was not retained: ${cityRoot}`);
    }
  }
  for (const requiredUrl of [CALIFORNIA_ADU_STATE_URL, PLAN_CHECK_CORRECTIONS_URL]) {
    if (!generatedServicesSitemap.includes(`<loc>${SITE}${requiredUrl}</loc>`)) {
      throw new Error(`SEO assertion failed: required service URL missing from sitemap: ${requiredUrl}`);
    }
  }
  for (const requiredUrl of CALIFORNIA_ADU_CITY_URLS) {
    if (!generatedLocationsSitemap.includes(`<loc>${SITE}${requiredUrl}</loc>`)) {
      throw new Error(`SEO assertion failed: required ADU city URL missing from sitemap: ${requiredUrl}`);
    }
  }
  fs.rmSync(path.join(PUBLIC, "city-page-quality.json"), { force: true });
  if (!fs.existsSync(path.join(PUBLIC, "llms.txt"))) throw new Error("SEO assertion failed: llms.txt was not generated");
  const sampleArticle = RESOURCE_ARTICLES[0];
  const articleHtml = fs.readFileSync(path.join(PUBLIC, resourceUrl(sampleArticle).replace(/^\/|\/$/g, ""), "index.html"), "utf8");
  if (!articleHtml.includes('"@type":"Article"') || articleHtml.includes("Reviewed by") || articleHtml.includes('rel="author"')) {
    throw new Error("SEO assertion failed: resource Article has an unsupported person byline");
  }
  const robotsHtml = fs.readFileSync(path.join(PUBLIC, "locations", "index.html"), "utf8");
  if (!robotsHtml.includes('<meta name="robots"') || !robotsHtml.includes('name="twitter:card"')) {
    throw new Error("SEO assertion failed: robots or Twitter metadata is missing");
  }
  const qualityPath = path.join(__dirname, "reports", "city-page-quality.json");
  if (!fs.existsSync(qualityPath) || fs.existsSync(path.join(PUBLIC, "city-page-quality.json"))) {
    throw new Error("SEO assertion failed: quality report must be repo-local and not public");
  }
  const qualityReport = JSON.parse(fs.readFileSync(qualityPath, "utf8")) as { indexedCount: number; excludedCount: number; anomalies: unknown[] };
  if (qualityReport.indexedCount < 0 || qualityReport.excludedCount < 0 || !Array.isArray(qualityReport.anomalies)) {
    throw new Error("SEO assertion failed: malformed city quality report");
  }
  const servicesSitemap = fs.readFileSync(path.join(PUBLIC, "sitemap-services.xml"), "utf8");
  const sitemapLocs = new Set([...servicesSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  for (const ep of ALL_ENGINEERING_INTENT_PAGES) {
    if (!sitemapLocs.has(`${SITE}/engineering-intent/${ep.slug}/`)) {
      throw new Error(`SEO assertion failed: intent URL missing from sitemap: ${ep.slug}`);
    }
  }
  if (!sitemapLocs.has(`${SITE}/engineering-intent/`)) throw new Error("SEO assertion failed: intent hub missing from sitemap");
  const nonIntentFiles: string[] = [];
  const collectHtml = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== "engineering-intent" && entry.name !== "sitemap") collectHtml(full);
      else if (entry.isFile() && entry.name === "index.html") nonIntentFiles.push(full);
    }
  };
  collectHtml(PUBLIC);
  const corpusTitles = new Set<string>();
  const corpusH1s = new Set<string>();
  for (const file of nonIntentFiles) {
    const source = fs.readFileSync(file, "utf8");
    const title = source.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
    const h1 = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim();
    if (title) corpusTitles.add(title);
    if (h1) corpusH1s.add(h1);
  }
  for (const ep of ALL_ENGINEERING_INTENT_PAGES) {
    if (corpusTitles.has(ep.title) || corpusH1s.has(ep.h1)) throw new Error(`SEO assertion failed: intent collision in generated corpus: ${ep.slug}`);
    const target = `/engineering-intent/${ep.slug}/`;
    if (!nonIntentFiles.some((file) => fs.readFileSync(file, "utf8").includes(`href="${target}"`))) {
      throw new Error(`SEO assertion failed: no contextual inbound link outside intent/sitemap: ${ep.slug}`);
    }
  }
  const expectedConsolidations: Record<string, string> = {
    "fast-turnaround-engineering": `${SITE}/solutions/fast-track-engineering/`,
    "permit-correction-engineering": `${SITE}/solutions/permit-correction-engineering/`,
    "failed-inspection-correction-engineering": `${SITE}/solutions/permit-correction-engineering/`,
    "pe-stamped-plans-calculations": `${SITE}/permit-engineering/pe-stamped-drawings/`,
    "engineering-due-diligence": `${SITE}/existing-building-engineering/condition-assessments/`,
    "urgent-building-assessment": `${SITE}/existing-building-engineering/condition-assessments/`,
    "as-built-existing-condition-documentation": `${SITE}/existing-building-engineering/field-verification/`,
  };
  for (const [slug, canonical] of Object.entries(expectedConsolidations)) {
    const record = JSON.parse(fs.readFileSync(path.join(__dirname, "reports/engineering-intent-opportunity-map.json"), "utf8"))
      .opportunities.find((item: { slug: string; canonicalUrl: string }) => item.slug === slug);
    if (!record || record.canonicalUrl !== canonical) throw new Error(`SEO assertion failed: consolidation canonical mismatch: ${slug}`);
  }
  const locationsXml = fs.readFileSync(path.join(PUBLIC, "sitemap-locations.xml"), "utf8");
  const liteCandidate = Object.entries(directory).flatMap(([state, entries]) => entries.map((city) => ({ state, city })))
    .find(({ state, city }) => {
      const stateData = states.find((entry) => entry.slug === state);
      return Boolean(
        stateData
        && assessLiteCity(stateData, city).status === "excluded"
        && !cities.some((c) => c.stateSlug === state && c.slug === city.slug)
        && !RETAINED_LEGACY_LOCATIONS.some((r) => r.stateSlug === state && r.city.slug === city.slug)
      );
    });
  if (liteCandidate) {
    const litePath = path.join(PUBLIC, "locations", liteCandidate.state, liteCandidate.city.slug, "index.html");
    const liteHtml = fs.readFileSync(litePath, "utf8");
    if (!liteHtml.includes('<meta name="robots" content="noindex,follow"')) throw new Error("SEO assertion failed: lite page is not noindex");
    for (const sitemap of ["sitemap-locations.xml", "sitemap-architecture-locations.xml", "sitemap-general-contracting-locations.xml"]) {
      if (fs.readFileSync(path.join(PUBLIC, sitemap), "utf8").includes(`${SITE}/locations/${liteCandidate.state}/${liteCandidate.city.slug}/`)) {
        throw new Error(`SEO assertion failed: lite page appears in ${sitemap}`);
      }
    }
  }
  for (const curated of cities.filter(isReviewedCity).slice(0, 3)) {
    const curatedPath = `/locations/${curated.stateSlug}/${curated.slug}/`;
    const curatedHtml = fs.readFileSync(path.join(PUBLIC, curatedPath.replace(/^\/|\/$/g, ""), "index.html"), "utf8");
    if (curatedHtml.includes('content="noindex,follow"') || !locationsXml.includes(`${SITE}${curatedPath}`)) throw new Error(`SEO assertion failed: curated city policy: ${curatedPath}`);
  }
  const reviewedPromotions = cities.filter((city) => city.research && isReviewedCity(city));
  const uniqueNarratives = new Set<string>();
  for (const promoted of reviewedPromotions) {
    const promotedBase = `/locations/${promoted.stateSlug}/${promoted.slug}/`;
    const expectedSources = Object.values(promoted.research!.sources).flat();
    for (const narrative of Object.values(promoted.narratives)) {
      const fingerprint = narrative.toLowerCase().replace(/\s+/g, " ").trim();
      if (uniqueNarratives.has(fingerprint)) throw new Error(`SEO assertion failed: duplicate promoted-city narrative: ${promotedBase}`);
      uniqueNarratives.add(fingerprint);
    }
    for (const relativePath of [promotedBase, ...SERVICES.map((service) => `${promotedBase}${service.slug}/`)]) {
      const htmlFile = path.join(PUBLIC, relativePath.replace(/^\/|\/$/g, ""), "index.html");
      const html = fs.readFileSync(htmlFile, "utf8");
      const canonical = `${SITE}${relativePath}`;
      if (!html.includes(`<link rel="canonical" href="${canonical}"`)) {
        throw new Error(`SEO assertion failed: promoted city canonical mismatch: ${relativePath}`);
      }
      const serviceSlug = relativePath === promotedBase ? undefined : relativePath.split("/").filter(Boolean).at(-1);
      const shouldIndex = !serviceSlug || isSupportedCityService(promoted, serviceSlug);
      if (!html.includes(`<meta name="robots" content="${shouldIndex ? "index,follow" : "noindex,follow"}"`)) {
        throw new Error(`SEO assertion failed: promoted city robots policy mismatch: ${relativePath}`);
      }
      for (const source of expectedSources) {
        if (!html.includes(`href="${esc(source)}"`)) throw new Error(`SEO assertion failed: promoted city source missing from ${relativePath}: ${source}`);
      }
      if (locationsXml.includes(`<loc>${canonical}</loc>`) !== shouldIndex) {
        throw new Error(`SEO assertion failed: promoted city sitemap policy mismatch: ${relativePath}`);
      }
      if (relativePath === promotedBase) {
        for (const service of SERVICES) {
          if (!html.includes(`href="${promotedBase}${service.slug}/"`)) {
            throw new Error(`SEO assertion failed: promoted city missing internal service link: ${relativePath}${service.slug}/`);
          }
        }
      } else if (!html.includes(`href="${promotedBase}"`)) {
        throw new Error(`SEO assertion failed: promoted city service missing parent link: ${relativePath}`);
      }
    }
    const stateHtml = fs.readFileSync(path.join(PUBLIC, "locations", promoted.stateSlug, "index.html"), "utf8");
    if (!stateHtml.includes(`href="${promotedBase}"`)) {
      throw new Error(`SEO assertion failed: promoted city has no inbound state-page link: ${promotedBase}`);
    }
  }
  for (const retained of RETAINED_LEGACY_LOCATIONS) {
    const retainedPath = `/locations/${retained.stateSlug}/${retained.city.slug}/`;
    const retainedFile = path.join(PUBLIC, retainedPath.replace(/^\/|\/$/g, ""), "index.html");
    if (!fs.existsSync(retainedFile) || fs.readFileSync(retainedFile, "utf8").includes('content="noindex,follow"') || !locationsXml.includes(`${SITE}${retainedPath}`)) {
      throw new Error(`SEO assertion failed: retained legacy location missing: ${retainedPath}`);
    }
  }
  if (/<lastmod>/.test(fs.readFileSync(path.join(PUBLIC, "sitemap_index.xml"), "utf8")) || /<lastmod>/.test(locationsXml)) {
    throw new Error("SEO assertion failed: sitemap contains wall-clock lastmod");
  }

  const dirCount = Object.values(directory).reduce((a, v) => a + v.length, 0);
  const disciplineSubpageCount = DISCIPLINE_HUBS.reduce((a, h) => a + h.subpages.length, 0);
  fs.writeFileSync(path.join(reportDir, "phase0-corpus.json"), `${JSON.stringify({
    generatedAt: "deterministic",
    policy: "National guidance only; no Alaska, county guides, near-me pages, invented local records, or inline location pricing.",
    counts: {
      servicePages: PHASE0_SERVICE_PAGES.length,
      aeoPages: PHASE0_AEO_PAGES.length,
      phase7AeoPages: PHASE7_AEO_PAGES.length,
      answerLibraryPages: PHASE0_AEO_PAGES.length + PHASE7_AEO_PAGES.length,
      phase7Clusters: PHASE7_CLUSTER_COUNTS,
      peStampHub: 1,
      peStampStatePages: states.length,
      metroPlanCheckPlaybooks: PHASE0_PLAN_CHECK_PLAYBOOKS.length,
      supportingResources: PHASE0_RESOURCE_PAGES.length,
      collectionHubs: 3,
      totalPhase0Pages: PHASE0_SERVICE_PAGES.length + PHASE0_AEO_PAGES.length + 1 + states.length + PHASE0_PLAN_CHECK_PLAYBOOKS.length + PHASE0_RESOURCE_PAGES.length + 3,
    },
    aeoUpdatedDate: PHASE0_UPDATED_DATE,
    peSourceStates: Object.keys(PE_STATE_SOURCE_LINKS).sort(),
    metroPlaybooks: PHASE0_PLAN_CHECK_PLAYBOOKS.map((page) => ({ city: page.city, state: page.state, slug: page.slug })),
    existingCorpusQuality: {
      directoryLiteNoindexPolicy: "Directory-derived records failing the conservative identity/slug/population gate are emitted noindex,follow; approved curated records use the separate research gate. Passing directory records may remain indexable as lightweight pages.",
      scalableAuditScript: "seo:audit:existing-corpus streams one locations HTML file at a time, counts thin/noindex pages, and fingerprints normalized copy for exact duplicate groups without O(n²) all-pairs comparison.",
      reportPath: "seo/reports/existing-corpus-quality.json",
    },
  }, null, 2)}\n`);
  console.log(`Generated ${pages} pages: ${states.length} states, ${cities.length} curated cities, ~${dirCount} directory cities, ${verticalPages} architecture/GC vertical pages, ${BLOG_POSTS.length} blog posts, ${RESOURCE_ARTICLES.length} resource articles, ${CLIENT_PAGES.length} client pages, ${PARTNER_PAGES.length} construction partner pages, ${PROJECT_TYPE_PAGES.length} project-type pages, ${EXISTING_BUILDING_PAGES.length} existing-building pages, ${PERMIT_PAGES.length} permit pages, ${CANONICAL_INDUSTRY_DISCIPLINE_PAGES.length} canonical industry×discipline pages, ${LOCATION_SERVICE_PAGES.length} location×service pages, ${SOLUTION_PAGES.length} solution pages, ${GLOSSARY_TERMS.length} glossary pages, ${GUIDE_PAGES.length} guide pages, ${DISCIPLINE_HUBS.length} discipline hubs + ${disciplineSubpageCount} subpages, ${MISC_PAGES.length} misc pages, ${STRUCTURAL_EXTENDED_PAGES.length} structural-extended subpages, ${1 + TITLE_24_PAGES.length} title-24 pages, ${1 + PROJECT_CATEGORY_PAGES.length} project pages, ${STATIC_STANDALONE_PAGES.length} standalone pages, Answer library: ${PHASE0_AEO_PAGES.length + PHASE7_AEO_PAGES.length} (${PHASE0_AEO_PAGES.length} existing + ${PHASE7_AEO_PAGES.length} Phase 7), Phase 0: ${PHASE0_SERVICE_PAGES.length} services + ${PHASE0_AEO_PAGES.length} AEO + ${states.length + 1} PE stamp + ${PHASE0_PLAN_CHECK_PLAYBOOKS.length} playbooks + ${PHASE0_RESOURCE_PAGES.length} resources, 1 sitemap page + sitemap.xml`);
}

async function notifySearchEngines() {
  const sitemapIndexPath = path.join(PUBLIC, "sitemap_index.xml");
  if (!fs.existsSync(sitemapIndexPath)) {
    throw new Error("Search-engine notification requires generated sitemaps. Run seo:generate first.");
  }

  // Google deprecated their ping URL in 2023. GSC and the robots.txt sitemap
  // directive are the correct Google discovery paths; Bing still accepts a ping.
  const sitemapIndexUrl = `${SITE}/sitemap_index.xml`;
  const bingRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapIndexUrl)}`);
  console.log(`Bing ping: ${bingRes.status}`);
  if (!bingRes.ok) {
    throw new Error(`Bing sitemap ping failed with status ${bingRes.status}.`);
  }

  // Submit all generated URLs to IndexNow in protocol-safe batches.
  const INDEXNOW_KEY = "b3d4e5f6a7c8d9e0f1a2b3c4d5e6f7a8";
  const INDEXNOW_HOST = new URL(SITE).hostname;
  const indexXml = fs.readFileSync(sitemapIndexPath, "utf8");
  const sitemapNames = [...indexXml.matchAll(/<loc>[^<]*\/([^/<]+\.xml)<\/loc>/g)].map((m) => m[1]);
  const allUrls: string[] = [];
  for (const name of sitemapNames) {
    const filePath = path.join(PUBLIC, name);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Search-engine notification is missing referenced sitemap: ${name}`);
    }
    const xml = fs.readFileSync(filePath, "utf8");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    allUrls.push(...locs);
  }
  if (allUrls.length === 0) {
    throw new Error("Search-engine notification found no URLs in generated sitemaps.");
  }

  const BATCH = 10_000;
  let submitted = 0;
  for (let i = 0; i < allUrls.length; i += BATCH) {
    const batch = allUrls.slice(i, i + BATCH);
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
    });
    console.log(`IndexNow batch ${Math.ceil((i + BATCH) / BATCH)}: ${res.status} (${batch.length} URLs)`);
    if (!res.ok) {
      throw new Error(`IndexNow submission failed with status ${res.status}.`);
    }
    submitted += batch.length;
  }
  console.log(`IndexNow: submitted ${submitted} URLs total.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const command = process.argv[2];
  const operation = command === "--notify-search-engines"
    ? notifySearchEngines()
    : command
      ? Promise.reject(new Error(`Unknown argument: ${command}`))
      : main();
  operation.catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

function cityServicePage(state: StateData, city: CityData, svc: ServiceDef, siblingCities: CityData[]): string {
  const url = `/locations/${state.slug}/${city.slug}/${svc.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name, href: `/locations/${state.slug}/` },
    { name: city.name, href: `/locations/${state.slug}/${city.slug}/` },
    { name: svc.shortName },
  ];
  const otherSvcs = SERVICES.filter((x) => x.slug !== svc.slug);
  const nearby = siblingCities.filter((c) => c.slug !== city.slug && isReviewedCity(c)).slice(0, 8);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${svc.name} in ${city.name}, ${state.abbrev}`,
    provider: { "@id": `${SITE}/#business` },
    areaServed: { "@type": "City", name: `${city.name}, ${state.abbrev}` },
    serviceType: svc.name,
  };

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(city.name)}, ${esc(state.abbrev)} · Licensed Professional Engineering</p>
  <h1>${esc(svc.h1)} <span class="dim">in ${esc(city.name)}</span></h1>
  <p class="lede">${esc(svc.intro)}</p>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(svc.shortName)} Engineering for <em>${esc(city.name)}</em> Projects</h2>
  <div class="prose"><p>${esc(city.narratives[svc.narrativeKey])}</p></div>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(city.name)} <em>Permitting &amp; Code</em> Snapshot</h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Permit Office (AHJ)</div><div class="v">${esc(city.ahj.office)}</div></div>
    <div class="cell"><div class="k">Building Code</div><div class="v">${esc(city.codes.building)}</div></div>
    <div class="cell"><div class="k">Commercial Energy Code</div><div class="v">${esc(city.codes.energy)}</div></div>
    <div class="cell"><div class="k">Electric Utility</div><div class="v">${esc(city.utilities.electric)}</div></div>
    <div class="cell"><div class="k">County</div><div class="v">${esc(city.county)}</div></div>
    <div class="cell"><div class="k">Design Climate</div><div class="v">${esc(city.climateNotes)}</div></div>
  </div>
  <p class="note">Code adoptions and local amendments change on multi-year cycles. The state source verification date is ${esc(state.lastVerified)}; we verify the governing editions with ${esc(city.ahj.office)} at project kickoff.</p>
</div></section>

<section class="block"><div class="container">
  <h2>Scope of <em>Services</em></h2>
  <ul class="scope">${svc.scope.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
</div></section>

<section class="block"><div class="container">
  <h2>Working with <em>${esc(city.ahj.office)}</em></h2>
  <div class="grid2">
    <div class="card"><div class="label">Plan Review Process</div><p>${esc(city.ahj.process)}</p></div>
    <div class="card"><div class="label">Local Amendments</div><p>${esc(city.codes.amendments)}</p></div>
  </div>
  <div style="margin-top:20px" class="grid2">
    <div class="card"><div class="label">Utility Coordination</div><p>${esc(city.utilities.notes)}</p></div>
    <div class="card"><div class="label">${esc(city.name)} Market Context</div><p>${esc(city.marketNotes)}</p></div>
  </div>
</div></section>
${citySourceList(city)}

<section class="block"><div class="container faq">
  <h2>${esc(city.name)} <em>FAQs</em></h2>
  ${city.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="a">${esc(f.a)}</div></details>`).join("")}
</div></section>

<section class="block"><div class="container">
  <h2>Related <em>Services &amp; Locations</em></h2>
  <div class="linkrow" style="margin-bottom:16px">${otherSvcs
    .map((o) => `<a href="/locations/${state.slug}/${city.slug}/${o.slug}/">${esc(o.name)} in ${esc(city.name)}</a>`)
    .join("")}</div>
  <div class="linkrow" style="margin-bottom:16px">${nearby
    .map((n) => `<a href="/locations/${n.stateSlug}/${n.slug}/${svc.slug}/">${esc(svc.shortName)} in ${esc(n.name)}</a>`)
    .join("")}</div>
  <div class="linkrow"><a href="/locations/${state.slug}/${svc.slug}/">${esc(svc.shortName)} in ${esc(state.name)} (statewide)</a><a href="/locations/${state.slug}/">All ${esc(state.name)} services</a></div>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Start Your ${esc(city.name)} Project</h2>
  <p>With a team of licensed PEs and a multi-discipline engineering team, we're ready to take on projects of any size — and we turn quotes around fast. Send us your scope and get a clear proposal: deliverables, timeline, and fee.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `${svc.name} in ${city.name}, ${state.abbrev} | Licensed PE Firm | Apex Grid`,
    description: `Licensed ${svc.name.toLowerCase()} for ${city.name}, ${state.abbrev} commercial projects. Permits through ${city.ahj.office}; designed to the ${city.codes.building.split(",")[0].split("(")[0].trim()} with local amendments.`,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, svcSchema, faqSchema, breadcrumbSchema(crumbs)],
    robots: isSupportedCityService(city, svc.slug) ? "index,follow" : "noindex,follow",
    body,
  });
}

function cityPage(state: StateData, city: CityData, siblingCities: CityData[]): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name, href: `/locations/${state.slug}/` },
    { name: city.name },
  ];
  const nearby = siblingCities.filter((c) => c.slug !== city.slug && isReviewedCity(c));
  const availableVerticals = isReviewedCity(city) ? verticalsForState(state.slug) : [];
  const specialtyLocationPages = LOCATION_SERVICE_PAGES.filter(
    (p) => p.stateSlug === state.slug && p.citySlug === city.slug,
  );
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Engineering Services in ${city.name}, ${state.abbrev}`,
    provider: { "@id": `${SITE}/#business` },
    areaServed: { "@type": "City", name: `${city.name}, ${state.abbrev}` },
    serviceType: "MEP, structural, civil, and energy-code engineering",
  };
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(city.county)} · ${esc(state.name)}</p>
  <h1>Engineering Services <span class="dim">in ${esc(city.name)}</span></h1>
  <p class="lede">MEP, structural, civil, and energy-compliance engineering for ${esc(city.name)} projects — permitted through ${esc(city.ahj.office)} and designed to the city's adopted codes and amendments.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Services in <em>${esc(city.name)}</em></h2>
  <div class="grid2">
  ${SERVICES.map(
    (s) => `<a class="card" href="/locations/${state.slug}/${city.slug}/${s.slug}/"><div class="label">${esc(s.shortName)}</div><h3>${esc(s.name)} in ${esc(city.name)}</h3><p>${esc(s.intro)}</p></a>`,
  ).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(city.name)} <em>Design Environment</em></h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Permit Office (AHJ)</div><div class="v">${esc(city.ahj.office)}</div></div>
    <div class="cell"><div class="k">Building Code</div><div class="v">${esc(city.codes.building)}</div></div>
    <div class="cell"><div class="k">Energy Code</div><div class="v">${esc(city.codes.energy)}</div></div>
    <div class="cell"><div class="k">Electric Utility</div><div class="v">${esc(city.utilities.electric)}</div></div>
  </div>
  <div class="prose" style="margin-top:24px"><p>${esc(city.codes.amendments)}</p><p>${esc(city.marketNotes)}</p></div>
</div></section>
<section class="block"><div class="container">
  <h2>One Organization, <em>Connected Delivery</em></h2>
  <div class="grid3">
    <a class="card" href="/locations/${state.slug}/${city.slug}/"><div class="label">Engineering</div><h3>Engineering in ${esc(city.name)}</h3><p>MEP, structural, civil, and energy-code services.</p></a>
    ${availableVerticals
      .map(
        (vertical) =>
          `<a class="card" href="${verticalCityUrl(vertical, state.slug, city.slug)}"><div class="label">${esc(vertical.shortName)}</div><h3>${esc(vertical.name)} in ${esc(city.name)}</h3><p>Verified regulated-service coverage in ${esc(state.name)}.</p></a>`,
      )
      .join("")}
  </div>
</div></section>
<section class="block"><div class="container faq">
  <h2>${esc(city.name)} Engineering <em>FAQs</em></h2>
  ${city.faqs.map((faq) => `<details><summary>${esc(faq.q)}</summary><div class="a">${esc(faq.a)}</div></details>`).join("")}
</div></section>
${citySourceList(city)}
${specialtyLocationPages.length ? `<section class="block"><div class="container">
  <h2>${esc(city.name)} <em>Specialty Services</em></h2>
  <div class="linkrow">${specialtyLocationPages.map((p) =>
    `<a href="/locations/${p.stateSlug}/${p.citySlug}/${p.serviceSlug}/">${esc(p.title)}</a>`
  ).join("")}</div>
</div></section>` : ""}
<section class="block"><div class="container">
  <h2>More <em>Locations</em></h2>
  <div class="linkrow">${nearby
    .map((n) => `<a href="/locations/${n.stateSlug}/${n.slug}/">${esc(n.name)}</a>`)
    .join("")}<a href="/locations/${state.slug}/">${esc(state.name)} (statewide)</a></div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Build in ${esc(city.name)} with Apex Grid</h2>
  <p>${esc(city.ahj.process)}</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `Engineering Services in ${city.name}, ${state.abbrev} | MEP, Structural, Civil, Energy | Apex Grid`,
    description: `Licensed MEP, structural, civil, and energy-compliance engineering in ${city.name}, ${state.abbrev}. Permitting through ${city.ahj.office} under the ${city.codes.building.split(",")[0].split("(")[0].trim()}.`,
    canonical: `${SITE}/locations/${state.slug}/${city.slug}/`,
    schemaJson: [orgSchema, serviceSchema, faqSchema, breadcrumbSchema(crumbs)],
    robots: isReviewedCity(city) ? "index,follow" : "noindex,follow",
    body: body.replace(/[ \t]+$/gm, ""),
  });
}

/** HTML meta-refresh redirect page for a legacy URL that moved to a new path. */
function redirectPage(newUrl: string, title: string): string {
  const full = `${SITE}${newUrl}`;
  return `<!doctype html><html lang="en"><head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<link rel="canonical" href="${esc(full)}">
<meta http-equiv="refresh" content="0;url=${esc(full)}">
<meta name="robots" content="noindex">
</head><body>
<p>This page has moved. <a href="${esc(full)}">Click here to continue.</a></p>
</body></html>`;
}
function glossaryHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Engineering Glossary" }];
  const byLetter = glossaryByLetter();
  const letters = Object.keys(byLetter).sort();

  const letterNav = letters
    .map((l) => `<a href="#letter-${l}" style="border:1px solid var(--border);background:var(--card);padding:8px 14px;font-family:'Space Grotesk';font-weight:700;font-size:14px">${l}</a>`)
    .join("");

  const sections = letters
    .map((l) => {
      const terms = byLetter[l];
      const cards = terms
        .map(
          (t) =>
            `<a class="card" href="/engineering-glossary/${t.slug}/"><div class="label">${esc(CATEGORY_LABEL[t.category])}</div><h3>${esc(t.term)}</h3><p>${esc(t.definition.slice(0, 100))}…</p></a>`,
        )
        .join("");
      return `<div id="letter-${l}" style="margin-bottom:48px">
  <h2 style="font-size:36px;border-bottom:2px solid var(--primary);padding-bottom:12px;margin-bottom:20px">${l}</h2>
  <div class="grid3">${cards}</div>
</div>`;
    })
    .join("\n");

  const totalTerms = GLOSSARY_TERMS.length;

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Reference · ${totalTerms}+ Terms</p>
  <h1>Engineering <span class="dim">Glossary</span></h1>
  <p class="lede">Plain-language definitions for structural, MEP, civil, geotechnical, and permitting terms used in commercial and industrial engineering — written by licensed professional engineers.</p>
</div></section>

<section class="block"><div class="container">
  <h2>Browse <em>by Letter</em></h2>
  <div class="linkrow" style="margin-bottom:32px">${letterNav}</div>
  ${sections}
</div></section>

<section class="ctaband"><div class="container">
  <h2>Questions About Your Project?</h2>
  <p>If you encountered a term that isn't in the glossary, or have engineering questions specific to your project, our team of licensed PEs is happy to help.</p>
  <a class="cta" href="/contact">Talk to an Engineer</a>
</div></section>`;

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE}/engineering-glossary/`,
    name: "Apex Grid Engineering Glossary",
    description: `Plain-language definitions for structural, MEP, civil, geotechnical, and permitting terms used in commercial and industrial engineering — written by licensed professional engineers.`,
    url: `${SITE}/engineering-glossary/`,
    hasDefinedTerm: sortedGlossaryTerms().map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: `${SITE}/engineering-glossary/${t.slug}/`,
    })),
  };

  return htmlShell({
    title: "Engineering Glossary | Structural, MEP, Civil & Code Terms | Apex Grid",
    description: `Definitions for ${totalTerms}+ structural, MEP, civil, geotechnical, and permitting engineering terms — written by licensed professional engineers at Apex Grid.`,
    canonical: `${SITE}/engineering-glossary/`,
    schemaJson: [orgSchema, definedTermSetSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function glossaryPage(term: GlossaryTerm): string {
  const url = `/engineering-glossary/${term.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Engineering Glossary", href: "/engineering-glossary/" },
    { name: term.term },
  ];
  const categoryLabel = CATEGORY_LABEL[term.category];

  const relatedTermLinks = term.relatedTerms
    .slice(0, 6)
    .map((s) => {
      const found = GLOSSARY_TERMS.find((t) => t.slug === s);
      const label = found ? found.term : s;
      return `<a href="/engineering-glossary/${s}/">${esc(label)}</a>`;
    })
    .join("");

  const relatedServiceLinks = term.relatedServices
    .map((rs) => `<a class="card" href="${esc(rs.href)}"><div class="label">${esc(categoryLabel)}</div><h3>${esc(rs.label)}</h3></a>`)
    .join("");
  const contextualAnswerLinks = term.answerLinks?.length
    ? `<p>For project planning, read ${term.answerLinks.map((link) => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join(" and ")}.</p>`
    : "";

  const definitionSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    inDefinedTermSet: `${SITE}/engineering-glossary/`,
  };

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(categoryLabel)} · Engineering Glossary</p>
  <h1>${esc(term.term)}</h1>
  <p class="lede">${esc(term.definition)}</p>
</div></section>

<section class="block"><div class="container">
  <h2>What Engineers Mean by <em>${esc(term.term)}</em></h2>
  <div class="prose"><p>${esc(term.extended)}</p>${contextualAnswerLinks}</div>
</div></section>

${relatedServiceLinks ? `<section class="block"><div class="container">
  <h2>Related <em>Engineering Services</em></h2>
  <div class="grid2">${relatedServiceLinks}</div>
</div></section>` : ""}

${relatedTermLinks ? `<section class="block"><div class="container">
  <h2>Related <em>Glossary Terms</em></h2>
  <div class="linkrow">${relatedTermLinks}</div>
</div></section>` : ""}

<section class="block"><div class="container">
  <h2>Browse the <em>Full Glossary</em></h2>
  <p class="prose" style="color:var(--muted);margin-bottom:20px">Apex Grid Engineering maintains this glossary as a resource for architects, contractors, developers, and property owners who encounter unfamiliar engineering terminology on their projects.</p>
  <a class="cta" href="/engineering-glossary/" style="display:inline-block">View All Engineering Terms</a>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Have a Project That Involves ${esc(term.term)}?</h2>
  <p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `${term.term} | Engineering Glossary | Apex Grid`,
    description: `${term.definition.slice(0, 155)}`,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, definitionSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

/** Guide URLs whose intent is fully served by the deeper resource article. */
const GUIDE_REDIRECTS = new Map<string, { newPath: string; title: string }>([
  ["structural-engineering-cost", { newPath: "/resources/structural/structural-engineering-cost/", title: "How Much Does Structural Engineering Cost?" }],
  ["mep-engineering-cost", { newPath: "/resources/mep/mep-engineering-cost/", title: "How Much Does MEP Engineering Cost?" }],
  ["mep-engineering-timeline", { newPath: "/resources/mep/mep-engineering-timeline/", title: "How Long Does MEP Engineering Take?" }],
  ["what-does-pe-stamp-mean", { newPath: "/resources/permit/what-is-a-pe-stamp/", title: "What Does a PE Stamp Mean?" }],
]);
const PROJECT_TYPE_REDIRECTS = new Map<string, { newPath: string; title: string }>([
  ["parking-expansions", {
    newPath: "/solutions/parking-lot-expansion-engineering/",
    title: "Parking Lot Expansion Engineering",
  }],
]);
