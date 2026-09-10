import type { CityData } from "../types";

export const knoxville: CityData = {
  slug: "knoxville", name: "Knoxville", stateSlug: "tennessee", county: "Knox County",
  ahj: { office: "City of Knoxville Plans Review and Inspections", process: "Commercial construction documents are submitted through Knoxville's permitting system for coordinated code review. Published policies and determinations document local interpretations, so teams should resolve unusual code questions before a complete permit submission." },
  codes: { building: "2018 International Building Code with City of Knoxville amendments", energy: "2018 International Energy Conservation Code", amendments: "Knoxville publishes adopted construction codes plus policy statements and building-official determinations that guide local interpretation. The current code list and policy library should be checked for project-specific requirements." },
  utilities: { electric: "Knoxville Utilities Board (KUB)", notes: "KUB provides electric, natural gas, water, wastewater, and fiber services across its service area. Commercial projects should coordinate service availability, utility conflicts, and capacity early." },
  climateNotes: "Knoxville's humid mixed climate brings hot, humid summers, cool winters, heavy rainfall, and freeze-thaw cycles. Moisture control, condensate management, drainage, and realistic heating and cooling design conditions are important.",
  marketNotes: "Knoxville's commercial base spans healthcare, university and research activity, advanced manufacturing, hospitality, and regional distribution. Population and employment growth continue to support infill, adaptive reuse, and greenfield development.",
  narratives: {
    mep: "Knoxville MEP systems need dependable humidity control in summer and efficient heating through a real winter season. We coordinate multi-utility service requirements with KUB and align permit documents with Knoxville's published code interpretations.",
    structural: "Knoxville structural work must address the city's adopted IBC, local determinations, variable ridge-and-valley sites, and project geotechnical conditions. Complete special-inspection and deferred-submittal schedules reduce review friction.",
    civil: "Knoxville civil design starts with steep or rolling terrain, intense rainfall, drainage, erosion control, and KUB utility coordination. Early confirmation of city versus county jurisdiction prevents the wrong standards from entering the site package.",
    energy: "Commercial energy compliance in Knoxville uses the adopted IECC while balancing humidity control and mixed-climate envelope performance. Coordinated mechanical, lighting, and envelope decisions usually outperform discipline-by-discipline compliance fixes.",
  },
  faqs: [
    { q: "Which office reviews commercial permits in Knoxville?", a: "The City of Knoxville Plans Review and Inspections function coordinates commercial construction review and publishes its adopted codes and policy determinations online." },
    { q: "What energy code applies in Knoxville?", a: "Knoxville's published construction-code list identifies the adopted IECC edition. Verify the live city list before permit submission because adoption cycles change." },
    { q: "Who provides utilities in Knoxville?", a: "KUB is the principal local provider for electric service and also operates gas, water, wastewater, and fiber systems within its respective service territories." },
  ],
  research: {
    lastVerified: "2026-09-10", reviewStatus: "approved", reviewedBy: "Apex Grid SEO research",
    priority: { commercialOpportunity: 80, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://permits.knoxvilletn.gov/"],
      codes: ["https://permits.knoxvilletn.gov/Codes-Requests/Construction-Codes"],
      amendments: ["https://permits.knoxvilletn.gov/Policies-Fast-Facts/Policy-Statements-and-Determinations"],
      utilities: ["https://www.kub.org/"],
      climate: ["https://www.weather.gov/mrx/"],
      market: ["https://www.knoxvilletn.gov/government/city_departments_offices/housing_and_neighborhood_development/economic_development"],
    },
  },
};