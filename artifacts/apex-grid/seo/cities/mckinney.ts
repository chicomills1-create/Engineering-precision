import type { CityData } from "../types";
export const mckinney: CityData = {
  slug: "mckinney", name: "McKinney", stateSlug: "texas", county: "Collin County",
  ahj: { office: "City of McKinney Development Services—Building Inspections", process: "Commercial applicants use McKinney's online permitting and plan-review services; building, fire, zoning, engineering, and utilities may review in parallel. A complete civil and site package is important for development in the city's rapidly growing edge areas." },
  codes: { building: "2021 International Building Code with City of McKinney amendments", energy: "2021 IECC commercial provisions (Texas SECO baseline)", amendments: "McKinney's local construction amendments and development regulations supplement the IBC, including fire, zoning, site, drainage, and administrative requirements. The city's adopted package must be used instead of a neighboring Collin County city's set." },
  utilities: { electric: "Oncor Electric Delivery", notes: "Oncor provides regulated delivery and handles service upgrades in the ERCOT market; McKinney supplies municipal water and wastewater, with capacity and impact-fee coordination important for new development." },
  climateNotes: "McKinney is climate zone 3A with hot humid summers, severe thunderstorm and hail risk, winter freezes, and highly expansive North Texas soils.",
  marketNotes: "McKinney's growth includes office, medical, advanced manufacturing, retail, multifamily, and residential-serving commercial development along US 75, SH 121, and the airport corridor. Greenfield sites make roadway, drainage, utility extension, and detention coordination central to schedule.",
  narratives: {
    mep: "McKinney MEP design sizes cooling and ventilation for zone 3A while protecting systems against winter freeze events and hail. Oncor capacity and municipal water/wastewater availability are checked early; equipment schedules follow McKinney's 2021-based amendments and not a generic DFW template.",
    structural: "McKinney's expansive clay requires a geotechnical-led foundation solution and moisture management. Low seismic demand leaves wind, roof uplift, hail exposure, and robust equipment anchorage as the practical structural priorities under the city's amended 2021 IBC.",
    civil: "Greenfield McKinney work depends on grading, detention, roadway access, and water/wastewater extension coordination. Civil documents address city drainage criteria, floodplain constraints, erosion controls, and TCEQ stormwater obligations before construction release.",
    energy: "McKinney commercial projects document the 2021 IECC baseline with COMcheck or an allowed ASHRAE 90.1 path. Solar control, airtight envelopes, efficient variable-speed cooling, and lighting controls address zone 3A loads and help manage growing utility demand."
  },
  faqs: [
    { q: "Which department is McKinney's commercial building AHJ?", a: "City of McKinney Development Services—Building Inspections handles commercial building permits, with fire, zoning, engineering, and utility reviews added according to the project." },
    { q: "Does McKinney use the same amendments as Dallas?", a: "No. McKinney has its own adopted construction and development requirements. The current McKinney code package and site criteria should be confirmed for each permit." },
    { q: "Why does civil coordination matter on McKinney greenfield projects?", a: "Fast growth often requires roadway access, detention, drainage, and utility extensions. Those approvals and water/wastewater capacity checks can control schedule independently of building plan review." }
  ],
  research: { lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review", supportedServiceSlugs: ["mep-engineering","structural-engineering","civil-engineering","energy-code-compliance"], priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" }, sources: {
    ahj: ["https://www.mckinneytexas.org/137/Building-Inspections"], codes: ["https://www.mckinneytexas.org/137/Building-Inspections"], amendments: ["https://www.mckinneytexas.org/DocumentCenter"], utilities: ["https://www.oncor.com/"], climate: ["https://www.weather.gov/fwd/"], market: ["https://www.mckinneytexas.org/"]
  }}
};