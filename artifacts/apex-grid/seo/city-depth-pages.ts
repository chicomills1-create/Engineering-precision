/** Depth-wave composers (Wave 1): electrical-engineering and pe-stamping
 * narratives + FAQs for curated city children and state service pages.
 *
 * CityData/StateData carry hand-written narratives only for the original four
 * services (mep/structural/civil/energy). For the two depth services the
 * editorial is COMPOSED at generation time from the city's own researched
 * record — utility, energy code, amendments, AHJ, climate, market — and the
 * state's licensure / energy-code record. Nothing here invents facts: every
 * factual sentence is a source field verbatim, joined by lean connective
 * text, plus standing house copy (design + stamping only, no site visits;
 * review in responsible charge before sealing).
 *
 * Sufficiency gates replicate the Wave 1 census thresholds (CENSUS.md):
 * a composer returns "" (or [] for FAQs) when the record fails, so the
 * emission loop in generate.ts skips the page mechanically.
 */
import type { CityData, StateData } from "./types";
import { LEGACY_CURATED_CITY_KEYS } from "./legacy-curated-cities";

export const ELECTRICAL_SLUG = "electrical-engineering";
export const STAMPING_SLUG = "pe-stamping";
export const DEPTH_SERVICE_SLUGS: ReadonlySet<string> = new Set([ELECTRICAL_SLUG, STAMPING_SLUG]);

const len = (v: unknown): number => (typeof v === "string" ? v.trim().length : 0);
const hasPlaceholder = (v: unknown): boolean =>
  typeof v === "string" && /tbd|lorem|placeholder|xxx|todo/i.test(v);
/** Trim and normalize a source field into exactly one trailing period. */
const sent = (v: string): string => `${v.trim().replace(/\.+$/, "")}.`;

/** Verbatim replica of generate.ts isReviewedCity() — the composer module
 * cannot import from the generator script, and the census used this same
 * replication, so gate behavior stays identical across all three. */
export function isReviewedCityData(city: CityData): boolean {
  if (!city.research) return LEGACY_CURATED_CITY_KEYS.has(`${city.stateSlug}/${city.slug}`);
  const sourceGroups = Object.values(city.research.sources ?? {}) as string[][];
  return (
    city.research.reviewStatus === "approved"
    && /^\d{4}-\d{2}-\d{2}$/.test(city.research.lastVerified)
    && (city.research.reviewedBy ?? "").trim().length > 0
    && city.research.priority?.commercialOpportunity >= 0
    && city.research.priority?.commercialOpportunity <= 100
    && sourceGroups.length > 0
    && sourceGroups.every((urls) => urls.length > 0 && urls.every((u) => /^https:\/\//.test(u)))
  );
}

/** Census electrical sufficiency: reviewed ∧ electric ≥3 ∧ utility notes ≥80
 * ∧ codes.energy ≥5 ∧ AHJ office ≥5 ∧ AHJ process ≥80 ∧ climateNotes ≥40
 * ∧ marketNotes ≥60 ∧ no placeholder markers. */
export function electricalCityOk(state: StateData, city: CityData): boolean {
  void state;
  return (
    isReviewedCityData(city)
    && len(city.utilities?.electric) >= 3
    && len(city.utilities?.notes) >= 80
    && len(city.codes?.energy) >= 5
    && len(city.ahj?.office) >= 5
    && len(city.ahj?.process) >= 80
    && len(city.climateNotes) >= 40
    && len(city.marketNotes) >= 60
    && !hasPlaceholder(city.utilities?.notes)
    && !hasPlaceholder(city.ahj?.process)
  );
}

/** Census stamping sufficiency: reviewed ∧ AHJ office ≥5 ∧ AHJ process ≥80
 * ∧ codes.building ≥5 ∧ state licensure.board ≥5 ∧ licensure.notes ≥40
 * ∧ no placeholder markers. */
export function stampingCityOk(state: StateData, city: CityData): boolean {
  return (
    isReviewedCityData(city)
    && len(city.ahj?.office) >= 5
    && len(city.ahj?.process) >= 80
    && len(city.codes?.building) >= 5
    && len(state.licensure?.board) >= 5
    && len(state.licensure?.notes) >= 40
    && !hasPlaceholder(city.ahj?.process)
  );
}

export function electricalStateOk(state: StateData): boolean {
  return len(state.energyCode?.commercial) >= 5 && len(state.energyCode?.notes) >= 40;
}

export function stampingStateOk(state: StateData): boolean {
  return len(state.licensure?.board) >= 5 && len(state.licensure?.notes) >= 40;
}

/** Scope bullets for the electrical-engineering ServiceDef — service-generic,
 * modeled on the existing four services' scope style. */
export const ELECTRICAL_SCOPE: string[] = [
  "Electrical load calculations and service sizing",
  "Power distribution design and one-line diagrams",
  "Panel schedules, feeder, and branch-circuit design",
  "Lighting design and controls (interior and site)",
  "Emergency, standby, and life-safety power systems",
  "Utility service coordination and interconnection documentation",
  "Energy-code compliance documentation for the electrical scope",
];

/** Scope bullets for the pe-stamping ServiceDef — mirrors the disciplines in
 * seo/stamping-service-pages.ts (structural / MEP / civil review-and-seal). */
export const STAMPING_SCOPE: string[] = [
  "Structural drawings and calculations — engineer-of-record review and seal",
  "MEP plan sets — review and seal, each discipline by a qualified engineer",
  "Civil and site drawings — review and seal for agency and permit submittal",
  "Scope definition and design-basis review before any seal is applied",
  "Plan-check correction responses on the sealed sheets",
  "Signed and sealed submittal packages prepared for the AHJ",
];

/** Electrical narrative for a curated city child, composed ONLY from
 * city.utilities.electric, city.utilities.notes, city.codes.energy,
 * city.codes.amendments, state.energyCode, state.climate, city.climateNotes,
 * city.marketNotes, and city.ahj.office. Paragraphs joined by "\n\n".
 * Returns "" when the census electrical thresholds fail. */
export function electricalNarrative(state: StateData, city: CityData): string {
  if (!electricalCityOk(state, city)) return "";
  const paragraphs: string[] = [
    `Electrical engineering in ${city.name}, ${state.abbrev} starts with the serving utility and the service conditions it sets. The electric utility picture in ${city.name}: ${sent(city.utilities.electric)} ${sent(city.utilities.notes)}`,
    `Energy performance is the second design input. The adopted commercial energy code in ${city.name} is ${sent(city.codes.energy)} Local amendments also bear on the electrical scope: ${sent(city.codes.amendments)}`,
    `At the state level, the commercial energy code in ${state.name} is ${sent(state.energyCode.commercial)} ${sent(state.energyCode.notes)}${state.energyCode.beyondCode ? ` Beyond baseline code: ${sent(state.energyCode.beyondCode)}` : ""}`,
    `${sent(city.climateNotes)} Statewide, ${state.name} spans ${sent(state.climate.zones)} The climate drivers that shape electrical design here are ${state.climate.drivers.join("; ")}.`,
    `${sent(city.marketNotes)} Permitting for the electrical scope runs through ${sent(city.ahj.office)} Apex Grid designs the electrical scope from your drawings, surveys, and project records — design and engineering only, with no site visits — and coordinates the set for that review.`,
  ];
  return paragraphs.join("\n\n");
}

/** PE-stamping narrative for a curated city child, composed ONLY from
 * state.licensure.board, state.licensure.notes, city.ahj.office,
 * city.ahj.process, city.codes.building, city.codes.amendments, and
 * city.county, plus standing house copy on responsible charge.
 * Returns "" when the census stamping thresholds fail. */
export function stampingNarrative(state: StateData, city: CityData): string {
  if (!stampingCityOk(state, city)) return "";
  const paragraphs: string[] = [
    `PE stamping in ${city.name}, ${state.abbrev} means a licensed engineer of record reviews the work in responsible charge before sealing — defining the scope, reviewing the design basis, and performing or verifying the engineering — and a seal is never applied to documents that cannot be verified to that standard. In ${state.name}, professional engineering licensure is regulated by the ${sent(state.licensure.board)} ${sent(state.licensure.notes)}`,
    `The local submittal runs through ${city.ahj.office} in ${sent(city.county)} ${sent(city.ahj.process)}`,
    `The sealed set is checked against the code adopted in ${city.name}: ${sent(city.codes.building)} Local amendments matter to what gets sealed: ${sent(city.codes.amendments)}`,
    `Apex Grid works from client-provided drawings, calculations, and records — design and stamping only, with no site visits — and the engineer of record responds to plan-check corrections on the sealed sheets. Statewide board requirements and the full stamping process for ${state.name} are covered on the state page linked below.`,
  ];
  return paragraphs.join("\n\n");
}

/** State-level electrical narrative, composed from StateData fields only.
 * Returns "" when the state thresholds fail. */
export function stateElectricalNarrative(state: StateData): string {
  if (!electricalStateOk(state)) return "";
  const paragraphs: string[] = [
    `Electrical engineering in ${state.name} is designed to the state's adopted commercial energy code: ${sent(state.energyCode.commercial)} ${sent(state.energyCode.notes)}${state.energyCode.beyondCode ? ` Beyond baseline code: ${sent(state.energyCode.beyondCode)}` : ""}`,
    `${state.name} spans ${sent(state.climate.zones)} The climate drivers that shape electrical design statewide are ${state.climate.drivers.join("; ")}. Service sizing, distribution, and lighting controls are engineered for those conditions and documented for the permitting jurisdiction.`,
    `${sent(state.marketNotes)} Key markets: ${state.metros.join(", ")}. Apex Grid designs the electrical scope from your drawings, surveys, and project records — design and engineering only, with no site visits.`,
  ];
  return paragraphs.join("\n\n");
}

/** State-level PE-stamping narrative, composed from StateData fields only.
 * Returns "" when the state thresholds fail. */
export function stateStampingNarrative(state: StateData): string {
  if (!stampingStateOk(state)) return "";
  const paragraphs: string[] = [
    `PE stamping in ${state.name} means a licensed engineer of record reviews the work in responsible charge before sealing — defining the scope, reviewing the design basis, and performing or verifying the engineering — and documents that cannot be verified to that standard are not sealed. Professional engineering licensure in ${state.name} is regulated by the ${sent(state.licensure.board)} ${sent(state.licensure.notes)}`,
    `The sealed set is prepared to the adopted building code: ${sent(state.buildingCode.name)} ${sent(state.buildingCode.notes)} ${sent(state.permitting)}`,
    `Apex Grid works from client-provided drawings, calculations, and records — design and stamping only, with no site visits — and the engineer of record responds to plan-check corrections on the sealed sheets.`,
  ];
  return paragraphs.join("\n\n");
}

/** Electrical FAQs for a curated city child — answers strictly from the same
 * fields the narrative composes from. Returns [] when thresholds fail. */
export function electricalFaqs(state: StateData, city: CityData): { q: string; a: string }[] {
  if (!electricalCityOk(state, city)) return [];
  return [
    {
      q: `Who provides electric service for commercial projects in ${city.name}?`,
      a: `${sent(city.utilities.electric)} ${sent(city.utilities.notes)}`,
    },
    {
      q: `What energy code applies to electrical design in ${city.name}?`,
      a: `The adopted commercial energy code in ${city.name} is ${sent(city.codes.energy)} At the state level, the commercial energy code in ${state.name} is ${sent(state.energyCode.commercial)} ${sent(state.energyCode.notes)}`,
    },
    {
      q: `How do local amendments affect electrical design in ${city.name}?`,
      a: sent(city.codes.amendments),
    },
    {
      q: `Does Apex Grid visit the site for electrical work in ${city.name}?`,
      a: `No. Apex Grid provides design and engineering only, working from client-provided drawings, surveys, and project records — no site visits. The electrical set is coordinated for permit review through ${sent(city.ahj.office)}`,
    },
  ];
}

/** PE-stamping FAQs for a curated city child — answers strictly from the same
 * fields the narrative composes from, plus standing responsible-charge copy.
 * Returns [] when thresholds fail. */
export function stampingFaqs(state: StateData, city: CityData): { q: string; a: string }[] {
  if (!stampingCityOk(state, city)) return [];
  return [
    {
      q: `Who regulates PE licensure in ${state.name}?`,
      a: `Professional engineering licensure in ${state.name} is regulated by the ${sent(state.licensure.board)} ${sent(state.licensure.notes)}`,
    },
    {
      q: `Where are stamped drawings submitted in ${city.name}?`,
      a: `Submittal runs through ${sent(city.ahj.office)} ${sent(city.ahj.process)}`,
    },
    {
      q: `What code must a sealed set in ${city.name} meet?`,
      a: `The sealed set is checked against the code adopted in ${city.name}: ${sent(city.codes.building)} ${sent(city.codes.amendments)}`,
    },
    {
      q: `What does responsible charge mean for a ${city.name} PE stamp?`,
      a: `The engineer of record defines the scope, reviews the design basis, and performs or verifies the engineering work before sealing. Documents that cannot be verified to responsible-charge standards are not sealed, and the engineer of record responds to plan-check corrections on the sealed sheets.`,
    },
  ];
}

/** Dispatcher used by generate.ts cityServicePage: composed narrative for a
 * depth slug, or null when the slug is not a depth service. */
export function depthNarrativeFor(slug: string, state: StateData, city: CityData): string | null {
  if (slug === ELECTRICAL_SLUG) return electricalNarrative(state, city);
  if (slug === STAMPING_SLUG) return stampingNarrative(state, city);
  return null;
}

/** Dispatcher used by generate.ts cityServicePage: composed FAQs for a depth
 * slug, or null when the slug is not a depth service. */
export function depthFaqsFor(slug: string, state: StateData, city: CityData): { q: string; a: string }[] | null {
  if (slug === ELECTRICAL_SLUG) return electricalFaqs(state, city);
  if (slug === STAMPING_SLUG) return stampingFaqs(state, city);
  return null;
}

/** Dispatcher used by generate.ts servicePage (state level). */
export function stateDepthNarrativeFor(slug: string, state: StateData): string | null {
  if (slug === ELECTRICAL_SLUG) return stateElectricalNarrative(state);
  if (slug === STAMPING_SLUG) return stateStampingNarrative(state);
  return null;
}
