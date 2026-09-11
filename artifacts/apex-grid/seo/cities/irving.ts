import type { CityData } from "../types";
export const irving: CityData = {
  slug: "irving", name: "Irving", stateSlug: "texas", county: "Dallas County",
  ahj: { office: "City of Irving Building Inspection Division", process: "Commercial permits and plan documents are submitted through the City of Irving's online permitting system; Building Inspection coordinates building, fire, and trade review. Projects must also address zoning, site, and civil approvals before construction." },
  codes: { building: "2021 International Building Code with City of Irving amendments", energy: "2021 IECC commercial provisions (Texas SECO baseline)", amendments: "Irving adopts a municipal construction-code package rather than Dallas's amendments. Local fire, zoning, accessibility, and floodplain requirements are reviewed with the building permit." },
  utilities: { electric: "Oncor Electric Delivery", notes: "Oncor controls delivery service, meters, upgrades, and interconnection in ERCOT; Irving water and wastewater service is provided by the City of Irving." },
  climateNotes: "Irving is in IECC/ASHRAE climate zone 3A, with hot summers, substantial cooling demand, severe thunderstorm and hail exposure, and expansive North Texas clay soils.",
  marketNotes: "Las Colinas, the DFW Airport area, and the western Dallas employment corridor support office, hospitality, data-center, logistics, and mixed-use construction. Airport-adjacent height, noise, and transportation coordination can affect otherwise conventional commercial sites.",
  narratives: {
    mep: "Irving MEP layouts pair 3A humidity management with long high-load cooling seasons and Oncor service coordination. Equipment, smoke control, plumbing, and fire interfaces are checked against Irving's 2021-based package rather than Dallas assumptions, while airport-area projects require careful rooftop and utility planning.",
    structural: "Expansive clay and moderate wind, not high seismic demand, dominate Irving structural work. Geotechnical recommendations govern post-tensioned slabs, drilled piers, or grade beams; roof equipment anchorage and hail-resistant assemblies are coordinated with the 2021 IBC package.",
    civil: "Irving site engineering addresses clay-sensitive paving, detention, grading, and municipal water/wastewater capacity. Floodplain and drainage review, erosion controls, and TCEQ construction-stormwater coverage are resolved with the city before final civil documents.",
    energy: "Commercial compliance uses the 2021 IECC Texas baseline. In zone 3A, low-SHGC glazing, air sealing, efficient cooling, lighting controls, and properly documented COMcheck or ASHRAE 90.1 calculations provide more useful savings than treating insulation as the only lever."
  },
  faqs: [
    { q: "Who reviews commercial permits in Irving?", a: "The City of Irving Building Inspection Division is the building AHJ, with related fire, zoning, site, and civil reviews coordinated as applicable through the city permit process." },
    { q: "What energy code applies to Irving commercial work?", a: "The Texas commercial baseline is the 2021 IECC through SECO, subject to the edition and amendments enforced by the City of Irving at submittal. ASHRAE 90.1 may be used where the adopted code allows it." },
    { q: "What foundation issue is common in Irving?", a: "Expansive North Texas clay is common. A project geotechnical report should control the choice among post-tensioned slabs, drilled piers, and grade-beam systems and establish moisture and drainage detailing." }
  ],
  research: { lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review", supportedServiceSlugs: ["mep-engineering","structural-engineering","civil-engineering","energy-code-compliance"], priority: { commercialOpportunity: 84, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" }, sources: {
    ahj: ["https://www.cityofirving.org/150/Building-Inspection"], codes: ["https://www.cityofirving.org/150/Building-Inspection"], amendments: ["https://www.cityofirving.org/DocumentCenter"], utilities: ["https://www.oncor.com/"], climate: ["https://www.weather.gov/fwd/"], market: ["https://irvingtexas.com/"]
  }}
};