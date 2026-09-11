import type { CityData } from "../types";
export const frisco: CityData = {
  slug: "frisco", name: "Frisco", stateSlug: "texas", county: "Collin and Denton Counties",
  ahj: { office: "City of Frisco Building Inspections", process: "Frisco accepts commercial permit applications and plan documents through its online permitting portal. Building, fire, engineering, zoning, and utility comments are coordinated by the city, while large developments also require detailed civil and infrastructure approvals." },
  codes: { building: "2021 International Building Code with City of Frisco amendments", energy: "2021 IECC commercial provisions (Texas SECO baseline)", amendments: "Frisco's adopted amendments and development standards supplement the IBC with local fire, site, drainage, zoning, and administrative provisions. They are distinct from neighboring Plano and McKinney packages." },
  utilities: { electric: "CoServ Electric and Oncor Electric Delivery (territory depends on site)", notes: "The serving electric territory must be confirmed by address before load and interconnection work; the City of Frisco provides water and wastewater in its service area." },
  climateNotes: "Frisco is climate zone 3A, with high summer cooling loads, humid shoulder seasons, hail and severe thunderstorms, occasional winter freezes, and expansive clay.",
  marketNotes: "The North Platinum Corridor, PGA Frisco area, Legacy-area employment, healthcare, sports, hospitality, and mixed-use projects make Frisco a high-volume commercial market. New districts frequently require infrastructure sequencing and utility-territory confirmation.",
  narratives: {
    mep: "Frisco MEP design begins by identifying whether CoServ or Oncor serves the parcel, then sizes electrical, HVAC, and plumbing systems for hot-humid zone 3A. City amendments, fire review, and new-district infrastructure are coordinated together so equipment and utility loads do not outpace available service.",
    structural: "Expansive clay and storm wind govern more often than seismic forces in Frisco. Foundation recommendations follow geotechnical data; roof uplift, hail exposure, and anchorage for rooftop equipment are detailed under Frisco's amended 2021 IBC.",
    civil: "Frisco civil packages integrate detention, floodplain, roadway, water, and sewer requirements with master-planned development phasing. Utility territory, easements, erosion controls, and TCEQ stormwater coverage are verified before site construction.",
    energy: "The 2021 IECC is the commercial baseline, with an allowed ASHRAE 90.1 route where applicable. Frisco's zone 3A priorities are solar-control glazing, airtight envelopes, efficient part-load cooling, controls, and clear compliance documentation."
  },
  faqs: [
    { q: "Which electric utility serves a Frisco project?", a: "CoServ Electric and Oncor Electric Delivery both serve portions of the area. Service territory is address-specific and should be confirmed before electrical load, transformer, or interconnection assumptions are finalized." },
    { q: "Who issues Frisco commercial building permits?", a: "City of Frisco Building Inspections is the building AHJ. Fire, zoning, engineering, and utility reviews apply according to the project and site." },
    { q: "What soil condition affects Frisco foundations?", a: "Expansive clay is common across North Texas. The project geotechnical report should establish foundation type, slab movement criteria, site drainage, and moisture-control measures." }
  ],
  research: { lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review", supportedServiceSlugs: ["mep-engineering","structural-engineering","civil-engineering","energy-code-compliance"], priority: { commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" }, sources: {
    ahj: ["https://www.friscotexas.gov/121/Building-Inspections"], codes: ["https://www.friscotexas.gov/121/Building-Inspections"], amendments: ["https://www.friscotexas.gov/DocumentCenter"], utilities: ["https://www.coserv.com/"], climate: ["https://www.weather.gov/fwd/"], market: ["https://www.friscotexas.gov/"]
  }}
};