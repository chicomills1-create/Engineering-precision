/** Research queue for city promotion. Scores rank commercial opportunity first,
 * then observed Search Console demand. Keep candidates here even before their
 * CityData research is approved so selection remains auditable and repeatable. */
export interface CityPriority {
  stateSlug: string;
  citySlug: string;
  commercialOpportunity: number;
  searchConsoleImpressions: number;
  searchConsolePeriod: string;
  rationale: string;
}

export const CITY_PRIORITIES: CityPriority[] = [
  { stateSlug: "washington", citySlug: "spokane", commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Regional healthcare, higher-education, industrial, and infill market with a distinct municipal code and permitting environment." },
  { stateSlug: "tennessee", citySlug: "knoxville", commercialOpportunity: 80, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Growing East Tennessee commercial market supported by research, manufacturing, healthcare, and regional logistics." },
  { stateSlug: "georgia", citySlug: "savannah", commercialOpportunity: 79, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Port-driven industrial and logistics growth plus hospitality, institutional, and coastal-resilience design demand." },
].sort((a, b) =>
  b.commercialOpportunity - a.commercialOpportunity ||
  b.searchConsoleImpressions - a.searchConsoleImpressions ||
  a.citySlug.localeCompare(b.citySlug)
);