import type { CityData } from "../types";

export const sacramento: CityData = {
  slug: "sacramento",
  name: "Sacramento",
  stateSlug: "california",
  county: "Sacramento County",
  ahj: {
    office: "City of Sacramento Community Development Department, Building Division",
    process:
      "The Building Division accepts permit applications and plan-review materials through its Electronic Plan Review process, with project routing to planning, fire, public works, and utilities when those scopes apply. Building permits, encroachment permits, grading, and utility work have distinct City review requirements, so applicants should coordinate entitlement and off-site scope before submitting a complete commercial package.",
  },
  codes: {
    building: "2025 California Building Standards Code (Title 24), including the 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with City of Sacramento amendments where applicable",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with applicable City amendments and CALGreen measures; no separate Sacramento reach provision is asserted here",
    amendments:
      "Sacramento's Building Division enforces the California Building Standards Code and publishes the City's adopted building-code and amendment information. The statewide Title 24 energy and CALGreen requirements remain the commercial baseline; City planning, floodplain, grading, and public-works standards apply in parallel and should be checked for the parcel and project scope.",
  },
  utilities: {
    electric: "Sacramento Municipal Utility District (SMUD)",
    notes:
      "SMUD handles electric-service design and solar or storage interconnection; high-load projects should confirm available capacity, service routing, and equipment siting before finalizing the electrical design. The City of Sacramento Department of Utilities provides water, wastewater, and drainage services in its service area.",
  },
  climateNotes:
    "Sacramento's hot-dry summer and cool, wet winter climate (ASHRAE 3B) produces substantial cooling and irrigation demands, with wildfire-smoke episodes affecting outdoor-air design. The Sacramento and American Rivers create floodplain and high-groundwater considerations, while young alluvial soils and regional seismicity warrant site-specific geotechnical evaluation.",
  marketNotes:
    "Sacramento's market is supported by state-government facilities, healthcare, higher education, logistics, and infill housing, with industrial and distribution activity concentrated along regional freeway and rail corridors. Downtown infill and River District redevelopment coexist with greenfield utility and drainage work in growth areas; flood resilience and summer electrical peaks are recurring project constraints.",
  narratives: {
    mep:
      "Sacramento MEP design uses the currently adopted California Energy Code in a hot-dry climate where cooling, solar gain, economizer operation, and summer peak demand are major design questions. SMUD service capacity, rate structure, and solar or storage interconnection should be discussed during schematic design for high-load commercial, healthcare, and industrial programs. Smoke events make filtration, outside-air sequences, and maintainable pressure relationships operational issues, not merely code notes. We coordinate Title 24 energy modeling, CALGreen requirements, standby-power assumptions, and City utility connections with the Building Division's electronic review package.",
    structural:
      "Sacramento structural design follows the locally adopted California Building Code seismic provisions even though the Central Valley's shaking demand is generally lower than many coastal California locations. Site response, liquefaction screening, groundwater, undocumented fill, and settlement of young alluvial deposits remain geotechnical decisions that can govern foundations and slabs. River-adjacent sites also need flood-design coordination with civil and architectural teams. Local amendments and Building Division review do not remove the need for a code-specific seismic and special-inspection program, particularly for essential, high-occupancy, or industrial facilities.",
    civil:
      "Sacramento civil design must reconcile City grading, drainage, water, wastewater, and right-of-way requirements with Central Valley flood conditions. The Department of Utilities' drainage and utility criteria, public-works encroachment requirements, and applicable floodplain rules should shape elevations, utility corridors, and stormwater facilities before the footprint is fixed. Hot dry summers make landscape-water design consequential, while the wet season drives erosion control and discharge planning. For qualifying disturbance, California construction-stormwater coverage and a SWPPP add a state track alongside City permits.",
    energy:
      "Sacramento commercial energy compliance is governed by the currently adopted California Energy Code, Title 24 Part 6, with applicable CALGreen requirements. The hot-dry climate rewards exterior shading, high-performance glazing, efficient cooling, lighting controls, and early solar and load-management analysis. We use the Title 24 model to test the actual envelope and HVAC approach, then coordinate electrical capacity and interconnection with SMUD instead of assuming photovoltaic or battery scope can be added after permit drawings are complete. That approach supports both Building Division review and summer operating performance.",
  },
  faqs: [
    {
      q: "What code edition applies to commercial projects in Sacramento?",
      a: "For permits subject to the current cycle, Sacramento applies the 2025 California Building Standards Code, including the 2025 California Building Code, effective January 1, 2026, with local amendments where applicable. Commercial energy compliance is under the 2025 California Energy Code, Title 24 Part 6, plus applicable CALGreen measures; confirm project-specific amendments with Building Division before submittal.",
    },
    {
      q: "Who provides electric and municipal utility service in Sacramento?",
      a: "SMUD provides electric service and processes distributed-energy interconnection. The City Department of Utilities provides water, wastewater, and drainage within its service area; confirm service-area and connection details for the individual parcel early.",
    },
    {
      q: "Why do flood and soils matter for Sacramento commercial sites?",
      a: "The Sacramento and American River system creates floodplain and groundwater issues on some parcels, while alluvial soils, settlement, and liquefaction screening can affect foundation and drainage design. City drainage and floodplain review should be coordinated with the geotechnical investigation.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 83, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofsacramento.gov/community-development/building"],
      codes: ["https://www.dgs.ca.gov/BSC/Codes", "https://www.hcd.ca.gov/building-standards", "https://www.energy.ca.gov/rules-and-regulations/building-energy-efficiency"],
      amendments: ["https://www.cityofsacramento.gov/community-development/building/building-codes"],
      utilities: ["https://www.smud.org/Business-Solutions-and-Rebates", "https://www.cityofsacramento.gov/utilities"],
      climate: ["https://www.weather.gov/sto/"],
      market: ["https://www.cityofsacramento.gov/edd/business/grow-here/development-projects"],
    },
  },
};