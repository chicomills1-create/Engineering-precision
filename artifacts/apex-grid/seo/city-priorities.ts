/** Candidate queue for city promotion. Once a city is approved, its CityData
 * research block becomes the authoritative score and evidence record. */
export interface CityPriority {
  stateSlug: string;
  citySlug: string;
  commercialOpportunity: number;
  searchConsoleImpressions: number;
  searchConsolePeriod: string;
  rationale: string;
}

export const CITY_PRIORITIES: CityPriority[] = [
  { stateSlug: "texas", citySlug: "dallas", commercialOpportunity: 95, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Large commercial, industrial, healthcare, and data-center market with city-specific permitting and utility coordination." },
  { stateSlug: "texas", citySlug: "houston", commercialOpportunity: 95, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Major industrial and commercial market with distinct flood, wind, energy, and permitting constraints." },
  { stateSlug: "california", citySlug: "los-angeles", commercialOpportunity: 94, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Large retrofit and commercial market with city amendments, seismic requirements, and municipal utility coordination." },
  { stateSlug: "arizona", citySlug: "phoenix", commercialOpportunity: 94, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "High-growth commercial and industrial market with extreme-heat design and split electric-utility territories." },
  { stateSlug: "texas", citySlug: "austin", commercialOpportunity: 92, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Fast-growing technology and commercial market with municipal utility and watershed-specific review." },
  { stateSlug: "georgia", citySlug: "atlanta", commercialOpportunity: 91, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Regional commercial hub with city-specific site, stormwater, permitting, and utility requirements." },
  { stateSlug: "illinois", citySlug: "chicago", commercialOpportunity: 91, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Dense commercial and existing-building market governed by Chicago-specific construction codes." },
  { stateSlug: "arizona", citySlug: "scottsdale", commercialOpportunity: 90, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Major commercial, hospitality, healthcare, mixed-use, and custom-residential market with distinct Scottsdale code amendments and SPUR permitting." },
  { stateSlug: "colorado", citySlug: "denver", commercialOpportunity: 89, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Active commercial market with high-altitude climate, local energy amendments, snow, and expansive-soil constraints." },
  { stateSlug: "colorado", citySlug: "aurora", commercialOpportunity: 84, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Healthcare, aerospace, airport logistics, and mixed-use growth with high-altitude climate, expansive soils, and Xcel service coordination." },
  { stateSlug: "colorado", citySlug: "colorado-springs", commercialOpportunity: 83, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Defense, aerospace, healthcare, advanced manufacturing, and logistics market with Pikes Peak code, altitude, terrain, and utility constraints." },
  { stateSlug: "arizona", citySlug: "tempe", commercialOpportunity: 89, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Dense university, office, multifamily, laboratory, technology, and adaptive-reuse market with distinct Tempe permitting and utility requirements." },
  { stateSlug: "north-carolina", citySlug: "charlotte", commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Regional banking and commercial hub with coordinated city-county permitting and utility review." },
  { stateSlug: "north-carolina", citySlug: "durham", commercialOpportunity: 86, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Life-sciences, university, healthcare, and research market with Falls Lake watershed, utility, and Piedmont site constraints." },
  { stateSlug: "north-carolina", citySlug: "greensboro", commercialOpportunity: 81, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Piedmont Triad manufacturing, logistics, aerospace, healthcare, and airport-area market with industrial utility and stormwater needs." },
  { stateSlug: "north-carolina", citySlug: "raleigh", commercialOpportunity: 90, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Research Triangle life-sciences, technology, government, healthcare, and advanced-manufacturing growth with watershed and utility constraints." },
  { stateSlug: "virginia", citySlug: "richmond", commercialOpportunity: 87, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "State-government, healthcare, higher-education, adaptive-reuse, logistics, and riverfront redevelopment market with flood and aging-infrastructure considerations." },
  { stateSlug: "florida", citySlug: "orlando", commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Tourism, healthcare, and mixed-use market with hurricane wind, flood, energy, and municipal utility constraints." },
  { stateSlug: "virginia", citySlug: "virginia-beach", commercialOpportunity: 85, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Hampton Roads defense, port, tourism, healthcare, and coastal redevelopment market with flood, wind, groundwater, and utility constraints." },
  { stateSlug: "arizona", citySlug: "glendale", commercialOpportunity: 87, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "West Valley commercial, industrial, healthcare, aviation, sports, entertainment, and mixed-use growth with city-specific review and utility requirements." },
  { stateSlug: "washington", citySlug: "spokane", commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Regional healthcare, higher-education, industrial, and infill market with a distinct municipal code and permitting environment." },
  { stateSlug: "tennessee", citySlug: "knoxville", commercialOpportunity: 80, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Growing East Tennessee commercial market supported by research, manufacturing, healthcare, and regional logistics." },
  { stateSlug: "georgia", citySlug: "savannah", commercialOpportunity: 79, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable", rationale: "Port-driven industrial and logistics growth plus hospitality, institutional, and coastal-resilience design demand." },
].sort((a, b) =>
  b.commercialOpportunity - a.commercialOpportunity ||
  b.searchConsoleImpressions - a.searchConsoleImpressions ||
  a.citySlug.localeCompare(b.citySlug)
);
