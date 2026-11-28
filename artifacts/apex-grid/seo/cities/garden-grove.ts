import type { CityData } from "../types";

export const gardenGrove: CityData = {
  slug: "garden-grove",
  name: "Garden Grove",
  stateSlug: "california",
  county: "Orange County",
  ahj: {
    office: "City of Garden Grove Community Development Department — Building & Safety Division",
    process:
      "Garden Grove's Building & Safety Division administers state and local building regulations under Title 18 of the Municipal Code, taking separate permit applications by category — building, electrical, mechanical, plumbing, fire, solar, reroof, demolition, walls, fences, retaining walls, patios, and accessory structures — with fees set on the city's valuation table (a $144.75 minimum for the first $2,000 of valuation in FY 2025-26, plus issuance fees of $64 for a single permit or $97 for a combination permit). Permits are required before construction, alteration, improvement, demolition, or repair of a building or structure, and the division publishes no standalone exemption handout — exemptions follow the adopted California codes as amended by Title 18.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2), adopted by Ordinance No. 2971 amending Title 18 of the Garden Grove Municipal Code, effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6) and 2025 California Green Building Standards Code (CALGreen, Title 24, Part 11)",
    amendments:
      "Ordinance No. 2971 (adopted November 12, 2025) adopts the full 2025 California Building Standards Code package by reference — Building, Residential, Electrical, Mechanical, Plumbing, Energy, Fire, Existing Building, Green Building Standards, and Referenced Standards codes — plus the 2024 International Property Maintenance Code and 2024 International Swimming Pool and Spa Code, continuing Garden Grove's existing local amendments in Title 18. The ordinance's findings ground its building-standard amendments in local climatic, geological, and topographical conditions under Health and Safety Code Sections 17958, 17958.5, and 17958.7; notably, its amendment to the state exemption list changes exactly one line, concerning fence heights.",
  },
  utilities: {
    electric: "Southern California Edison (SCE)",
    notes:
      "SCE provides electric service throughout Garden Grove, so new commercial services, panel and service upgrades, and interconnections run through SCE's service-planning process. Water is a City of Garden Grove municipal service and natural gas comes from Southern California Gas Company, splitting a typical commercial project between an investor-owned electric utility and city water coordination. Garden Grove's adopted electrical fee schedule prices services, panels, and outlets by item — there is no low-voltage or communications fee line — which matters when scoping permit costs for systems work.",
  },
  climateNotes:
    "California Energy Commission climate zone 8 and ASHRAE zone 3B in the Orange County coastal plain: mild marine-moderated temperatures with warm inland afternoons, high seismic demand from the Newport-Inglewood and Puente Hills fault systems, and — per the city's own adopted Safety Element — no high fire severity zones or wildland-urban interface areas within the city, an unusually clean wildfire profile for Southern California.",
  marketNotes:
    "Garden Grove's commercial market is tourism- and healthcare-weighted: the Harbor Boulevard resort corridor at the city's edge serves Disneyland-area visitors and includes the Great Wolf Lodge indoor waterpark resort, the Grove District and Garden Grove Boulevard (Koreatown) retail and restaurant corridors draw regional demand, and Garden Grove Hospital Medical Center anchors healthcare. Commercial work concentrates in hospitality, retail and restaurant re-tenanting, medical office, and redevelopment of the city's mature postwar commercial stock.",
  narratives: {
    mep:
      "MEP design in Garden Grove is documented to the 2025 Title 24 package adopted by Ordinance 2971 — among the earliest code cycles in this wave — with Building & Safety issuing separate permits by trade category rather than a single combined commercial permit, so MEP permit scoping and the city's itemized electrical fee schedule belong in the project budget from the start. SCE electric service and city water frame utility coordination, and hospitality and restaurant work along Harbor Boulevard and Garden Grove Boulevard adds grease, gas, and ventilation loads the base codes treat strictly.",
    structural:
      "Garden Grove structural design under the 2025 CBC is seismic-led: the Newport-Inglewood fault zone and Puente Hills thrust system put the city in high seismic demand, and its large stock of postwar commercial buildings brings soft-story, tilt-up anchorage, and unreinforced-construction evaluation into existing-building work. The city's flat coastal-plain topography removes the wildfire and hillside variables most Southern California jurisdictions impose — its Safety Element confirms no high fire severity zones inside the city.",
    civil:
      "Civil design in Garden Grove works on a built-out coastal plain: drainage ties into Orange County flood control channels, frontage and utility improvements run along wide resort and retail arterials, and city water service connections coordinate with the same Community Development Department that reviews the building permit. Because the city is essentially fully developed, most civil scope is redevelopment — parking, accessibility, stormwater quality retrofits, and utility verification on existing sites rather than greenfield grading.",
    energy:
      "Energy compliance in Garden Grove follows the 2025 California Energy Code (Title 24, Part 6) with CALGreen, in CEC climate zone 8, where mild coastal-plain weather makes lighting, controls, and kitchen and laundry process loads the deciding factors for the city's hospitality and restaurant stock. SCE service and rates frame the operating model, and the 2025 code cycle's electrification-ready requirements should be designed in from the first submittal rather than corrected in.",
  },
  faqs: [
    {
      q: "What building code does Garden Grove enforce?",
      a: "The 2025 California Building Standards Codes, adopted by Ordinance No. 2971 on November 12, 2025 and effective January 1, 2026 — including the 2025 CBC, Energy Code, and CALGreen — with local amendments in Title 18 of the Municipal Code, plus the 2024 International Property Maintenance Code.",
    },
    {
      q: "Who provides electric and water service in Garden Grove, CA?",
      a: "Southern California Edison provides electric service, the City of Garden Grove provides municipal water service, and Southern California Gas Company provides natural gas.",
    },
    {
      q: "How are building permits structured in Garden Grove?",
      a: "The Building & Safety Division issues separate permits by category — building, electrical, mechanical, plumbing, fire, solar, reroof, demolition, and site features — priced from the city's valuation table, with a $64 single-permit or $97 combination-permit issuance fee in FY 2025-26.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 56, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.jaspector.com/permits/california/orange/garden-grove/"],
      codes: ["https://agendasuite.org/iip/gardengrove/file/getfile/18146"],
      amendments: ["https://agendasuite.org/iip/gardengrove/file/getfile/18269"],
      utilities: ["https://www.jaspector.com/permits/california/orange/garden-grove/"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.jaspector.com/permits/california/orange/garden-grove/"],
    },
  },
};
