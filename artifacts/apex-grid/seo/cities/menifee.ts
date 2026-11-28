import type { CityData } from "../types";

export const menifee: CityData = {
  slug: "menifee",
  name: "Menifee",
  stateSlug: "california",
  county: "Riverside County",
  ahj: {
    office: "City of Menifee Building & Safety Department (29844 Haun Road)",
    process:
      "All Menifee submittals — including Fast-Track permits — go through the Menifee Permit Portal, with plan review fees due at the time of submittal. Fast-Track permits (city-standard walls, HVAC and water heaters, reroofs, minor plumbing and electrical work, demolition) are typically processed within two business days with no plan review. Plan reviews are processed in the order received and routed to the appropriate internal departments, with an estimated turnaround of 14 business days for the first review and 10 business days for subsequent reviews. Before a building permit issues, the applicant must obtain clearances from Planning, Engineering, Fire, the applicable water district, and Environmental Health where applicable, and contractors pulling permits need a City of Menifee business license.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC), as enforced by the City of Menifee with the Menifee Municipal Code",
    energy: "2025 California Energy Code (Title 24, Part 6), with CALGreen (Title 24, Part 11) mandatory measures and the California Wildland-Urban Interface Code (Title 24, Part 7) where applicable",
    amendments:
      "Menifee enforces the 2025 Title 24 suite together with the Menifee Municipal Code, and its published submittal handouts fix the local package: one combined digital set of fully dimensioned structural, architectural, plumbing, mechanical, and electrical plans at a minimum 24\" x 36\" digital equivalent, with the cover sheet carrying the 2025 Title 24 and 2025 Energy Code data for the building. City-standard details govern the Fast-Track scopes such as block and retaining walls.",
  },
  utilities: {
    electric: "Southern California Edison (SCE)",
    notes:
      "Southern California Edison delivers electricity in Menifee, so new commercial services and capacity upgrades run through SCE's service-planning process. Water and sewer are not city utilities: the Eastern Municipal Water District (EMWD) provides potable water and sewer service across Menifee from a blend of groundwater, recycled water, and imported State Water Project and Metropolitan Water District supplies — EMWD clearance is one of the approvals that must be in hand before the city issues a building permit.",
  },
  climateNotes:
    "California Energy Commission climate zone 10 / ASHRAE zone 3B (warm-dry) in inland southwestern Riverside County: hot summers well above the coastal plain, Santa Ana wind events, and high seismic demand near the San Jacinto fault zone, putting most commercial work in Seismic Design Category D. Title 24 envelope and cool-roof performance is driven by summer cooling load, and wildland-urban interface provisions apply at the city's brush-covered edges.",
  marketNotes:
    "Menifee is one of the fastest-growing cities in the Inland Empire — incorporated only in 2008 and grown past 115,000 residents — so the commercial pipeline is dominated by new retail centers along Newport Road and the I-215 corridor, medical office growth around Menifee Global Medical Center, and the Mt. San Jacinto College Menifee Valley Campus, the city's largest employer alongside the Menifee Union School District. A Costco store and distribution facility filed applications with the city in 2026, and much of the remaining work is first-generation tenant improvement in new centers rather than renovation.",
  narratives: {
    mep:
      "MEP design in Menifee is documented to the 2025 California codes: the Energy Code governs envelope, lighting, and mechanical efficiency for a hot inland climate, the tenant improvement handout calls out Title 24 multi-level lighting switching and automatic shut-off explicitly, and electrical work follows the 2025 California Electrical Code (2023 NEC base). Service coordination runs through Southern California Edison, water and sewer clearance through EMWD, and both clearances must be in hand before Building & Safety will issue the permit.",
    structural:
      "Structural design in Menifee is seismic-first under the 2025 CBC: the San Jacinto fault zone crosses southwestern Riverside County, most commercial work designs to Seismic Design Category D, and Santa Ana wind events check the envelope and rooftop equipment anchorage. Soils across the young city's subdivisions vary from alluvium to expansive clays, and the city's Fast-Track path only covers retaining walls built exactly to city standard details — anything beyond the standard needs engineered design.",
    civil:
      "Civil design in Menifee is greenfield-flavored even inside a young city: drainage ties into the San Jacinto River watershed under the Romoland/Homeland Master Drainage Plan and Riverside County Flood Control standards, and EMWD — not the city — reviews water and sewer capacity and issues its own clearance before permit issuance. Because so much of Menifee is still converting from rural parcels to subdivisions and centers, grading, drainage, and utility extension design carry more weight than on infill work in older cities.",
    energy:
      "Energy compliance in Menifee is documented to the 2025 California Energy Code with CALGreen mandatory measures, with the compliance forms carried in the combined digital submittal set. In CEC climate zone 10 the summer cooling peak decides the margin — envelope solar control, high-efficiency cooling, and lighting controls do the work — and SCE's time-of-use rates plus the city's own history of buying and LED-retrofitting its streetlights show the local emphasis on demand-side measures.",
  },
  faqs: [
    {
      q: "What building code does Menifee enforce?",
      a: "Menifee enforces the 2025 California Code of Regulations, Title 24 — the 2025 CBC (based on the 2024 IBC), the 2025 California Energy Code, CALGreen, and the California Wildland-Urban Interface Code — together with the Menifee Municipal Code, per the city's current submittal handouts.",
    },
    {
      q: "How long does plan review take in Menifee?",
      a: "The city estimates 14 business days for a first plan review and 10 business days for subsequent reviews, processed in the order received through the Menifee Permit Portal. Fast-Track permits for standard scopes (HVAC, reroofs, minor electrical and plumbing, city-standard walls, demolition) typically process within two business days with no plan review.",
    },
    {
      q: "Who provides water, sewer, and electric service in Menifee?",
      a: "Electricity comes from Southern California Edison. Water and sewer come from the Eastern Municipal Water District (EMWD), not the city — and EMWD clearance is one of the approvals that must be obtained before the City of Menifee issues a building permit.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://Www.cityofmenifee.us/DocumentCenter/View/6559/Submittal-Requirements-for-Tenant-Improvement-Alterations-and-Additions-?bidId="],
      codes: ["https://Www.cityofmenifee.us/DocumentCenter/View/6559/Submittal-Requirements-for-Tenant-Improvement-Alterations-and-Additions-?bidId="],
      amendments: ["https://cityofmenifee.us/DocumentCenter/View/6556/Submittal-Requirements-for-New-Residential-Dwellings-?bidId"],
      utilities: ["https://www.cityofmenifee.us/DocumentCenter/View/23086/Categorical-Exemption"],
      climate: ["https://alliancepermitting.com/guides/california/menifee-building-permit"],
      market: ["https://www.homes.com/local-guide/menifee-ca/"],
    },
  },
};
