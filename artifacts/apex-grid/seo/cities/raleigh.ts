import type { CityData } from "../types";

export const raleigh: CityData = {
  slug: "raleigh",
  name: "Raleigh",
  stateSlug: "north-carolina",
  county: "Wake County",
  ahj: {
    office: "City of Raleigh Development Services — Inspections",
    process: "Raleigh accepts commercial permit applications, plan sets, corrections, and inspections through its online permitting portal. Site-plan, zoning, stormwater, transportation, fire, and utility reviews may run as coordinated but distinct approvals, so a pre-submittal meeting is useful for larger or phased projects.",
  },
  codes: {
    building: "2024 North Carolina State Building Code, state-amended and enforced by Raleigh Inspections",
    energy: "2024 North Carolina Energy Conservation Code, state-amended and IECC-derived",
    amendments: "Raleigh uses North Carolina's statewide building-code family rather than a separate municipal technical code. The Raleigh Unified Development Ordinance, watershed protection, tree-conservation, stormwater, and site-plan standards add local design constraints.",
  },
  utilities: {
    electric: "Duke Energy Progress",
    notes: "Duke Energy Progress coordinates commercial service, capacity, and distributed-generation interconnection. Raleigh owns and operates water, wastewater, and reclaimed-water systems; availability, capacity fees, and extensions should be confirmed during site planning.",
  },
  climateNotes: "Raleigh is humid Piedmont climate zone 3A, with long cooling and dehumidification seasons, intense thunderstorms, occasional winter freezes, and clay-rich residual soils over weathered rock. Neuse River watershed requirements and rolling terrain materially affect drainage and grading.",
  marketNotes: "Raleigh's market is anchored by state government, higher education, healthcare, Research Triangle technology and life-sciences growth, and expanding multifamily, office, and advanced-manufacturing development. Greenfield growth and redevelopment both face infrastructure, watershed, tree, and stormwater constraints.",
  narratives: {
    mep: "Raleigh MEP design must handle humid 3A latent loads, shoulder-season moisture, and severe thunderstorms while supporting research, healthcare, technology, and state-institution programs. Duke Energy Progress service capacity is coordinated early for high electrical loads, and Raleigh water and sewer requirements are checked alongside fire-flow needs. We confirm the effective North Carolina energy-code edition with Raleigh Inspections rather than assuming an unamended national IECC.",
    structural: "Raleigh structural work combines the state-amended code with Piedmont residual clays, weathered rock, variable fills, and rolling sites. Geotechnical findings govern bearing, settlement, retaining, slabs, and excavation; wind and thunderstorm uplift still require a complete load path, while institutional and laboratory additions may need vibration review. The current North Carolina code and project-specific site class establish the defensible design basis.",
    civil: "Raleigh civil design starts with the Unified Development Ordinance, Neuse watershed protections, tree-conservation requirements, and stormwater criteria. Clay soils and concentrated summer rainfall affect infiltration, erosion control, outfalls, and water-quality BMP sizing, while rolling grades can make accessible routes and utility extensions difficult. We coordinate Raleigh Water, stormwater, fire access, and right-of-way requirements before fixing the building footprint.",
    energy: "Raleigh commercial energy compliance follows the state-amended 2024 North Carolina Energy Conservation Code. In humid 3A, solar-control glazing, airtightness, efficient cooling, lighting controls, and humidity-aware ventilation work together; research and healthcare ventilation must be modeled honestly rather than hidden in generic assumptions. Energy calculations are coordinated with Duke Energy Progress service loads and Raleigh's review path.",
  },
  faqs: [
    { q: "Who issues commercial permits in Raleigh?", a: "City of Raleigh Development Services and Inspections administers commercial building permits and inspections through the city's online process. Site, zoning, stormwater, fire, transportation, and utility approvals may be separate tracks." },
    { q: "Which codes apply to Raleigh commercial work?", a: "Raleigh enforces the state-amended 2024 North Carolina State Building Code and 2024 North Carolina Energy Conservation Code. Its UDO, stormwater, watershed, tree, and utility standards add local site obligations." },
    { q: "What should a Raleigh site team check first?", a: "Screen Neuse watershed and stormwater requirements, tree conservation, clay soils, rolling grades, and Raleigh Water capacity early. Those constraints can change impervious area, BMP footprints, utility routing, and the feasible building envelope." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 90, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://raleighnc.gov/permits"],
      codes: ["https://www.ncosfm.gov/codes"],
      amendments: ["https://udo.raleighnc.gov/"],
      utilities: ["https://www.duke-energy.com/business", "https://raleighnc.gov/water"],
      climate: ["https://www.weather.gov/rah/"],
      market: ["https://raleigh-wake.org/business"],
    },
  },
};