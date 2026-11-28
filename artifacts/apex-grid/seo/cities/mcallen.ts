import type { CityData } from "../types";

export const mcallen: CityData = {
  slug: "mcallen",
  name: "McAllen",
  stateSlug: "texas",
  county: "Hidalgo County",
  ahj: {
    office: "City of McAllen Building Permits & Inspections Department (311 North 15th Street)",
    process:
      "McAllen's Building Permits & Inspections Department runs plan review, permitting, and inspections inside city limits, with applications filed through the city's online permit portal or submitted electronically to the department. The commercial submittal follows the city's published checklist — recorded plat and site plan approval, civil, architectural, and engineered MEP and structural plans, COMcheck energy compliance reports with heating and cooling calculations, and Texas Accessibility Standards registration (EABPRJ number) for projects of $50,000 or more. Plan review fees run 18% of the permit fee, and the city asks applicants to allow 10 to 15 days for commercial plan review on a complete submittal.",
  },
  codes: {
    building: "2024 International Building Code with City of McAllen local amendments (City Code Chapter 22, Ordinance 2025-117), effective January 1, 2026",
    energy: "2024 International Energy Conservation Code as adopted by the City of McAllen, with COMcheck energy compliance reports required at submittal; Texas Building Energy Performance Standards (SECO) also apply",
    amendments:
      "McAllen replaced its prior 2018 ICC / 2017 NEC set wholesale: Ordinance 2025-117 adopted the 2024 ICC family and the 2023 NEC in Chapter 22, effective January 1, 2026, with local exceptions that include interior residential lighting-control changes, a commercial adult changing-table requirement, and municipal residential fire sprinkler provisions. Because Texas has no statewide building code, McAllen's adopted editions and amendments are its own and differ from neighboring Valley cities — a set documented to Edinburg's or Mission's editions will draw corrections here.",
  },
  utilities: {
    electric: "AEP Texas (American Electric Power)",
    notes:
      "AEP Texas delivers electricity in McAllen, so new commercial services and capacity work run through AEP's service process in the ERCOT market, and Texas Gas Service supplies natural gas. Water, wastewater, and stormwater are handled by the McAllen Public Utility, the city-owned utility board — so water capacity, taps, and drainage coordination stay inside a municipal utility rather than a private provider, and utility plans are a named element of the city's commercial submittal checklist.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) at the southern tip of Texas: extreme, long cooling seasons with design temperatures near 100°F, Gulf hurricane wind exposure tracking inland up the Rio Grande Valley, and intense convective rainfall with Rio Grande and flood-channel flooding. Cooling and dehumidification dominate energy design; heating is nearly incidental.",
  marketNotes:
    "McAllen is the commercial capital of the Rio Grande Valley: La Plaza Mall draws cross-border retail traffic from Reynosa and the wider Mexican market, the McAllen–Hidalgo and nearby Pharr international bridges anchor produce and maquiladora logistics, and healthcare (McAllen Medical Center, Rio Grande Regional Hospital), South Texas College, and McAllen International Airport round out the institutional base. Commercial work runs heavily to retail, medical, warehouse and cold-storage, and hospitality serving a binational trade economy.",
  narratives: {
    mep:
      "MEP design in McAllen now works to a brand-new code set: the 2024 ICC family and 2023 NEC adopted by Ordinance 2025-117, effective January 1, 2026 — a full edition jump from the 2018 set many Valley teams still carry. Energy compliance reports (COMcheck, with heating and cooling load calculations and a preliminary commissioning report) are a named checklist item, trade work follows Texas state licensing through TDLR and the TSBPE, and electric service coordination runs through AEP Texas while water and sewer sit with the McAllen Public Utility.",
    structural:
      "McAllen structural design is wind- and heat-driven: the 2024 IBC wind provisions reflect Gulf hurricane exposure tracking up the Rio Grande Valley, and the flat, low-lying terrain puts flood elevation and stormwater detention into the structural conversation for slab and foundation design. Seismic demand is minimal. The binational industrial market adds tilt-wall warehouse and cold-storage work where roof wind uplift and refrigeration loads, not gravity alone, size the structure.",
    civil:
      "Civil design in McAllen is drainage-first: the city is flat, sits in the Rio Grande floodplain environment, and manages stormwater through the McAllen Public Utility and Hidalgo County drainage systems, so detention and finished-floor elevation decisions come early. Site development and civil plans are a separate named element of the commercial submittal alongside the recorded plat, and utility plans for work outside the building are submitted at 11x17 with the initial package.",
    energy:
      "Energy compliance in McAllen is documented to the 2024 IECC as the city adopted it, with COMcheck reports and load calculations required in the commercial submittal — and the Texas Building Energy Performance Standards administered by SECO set the state floor beneath the local adoption. In zone 2A the compliance margin is decided almost entirely by cooling efficiency, envelope solar control, and dehumidification, and AEP Texas efficiency incentives give owners a rebate layer on top of code.",
  },
  faqs: [
    {
      q: "What building codes does McAllen enforce?",
      a: "The 2024 ICC family with local amendments — 2024 IBC, IRC, IEBC, IPC, IMC, IFGC, IFC, and IECC — plus the 2023 NEC, adopted in City Code Chapter 22 by Ordinance 2025-117 and effective January 1, 2026. That replaced the prior 2018 ICC / 2017 NEC set, so confirm the edition before designing; neighboring Valley cities enforce different sets.",
    },
    {
      q: "How long does commercial plan review take in McAllen?",
      a: "The city asks applicants to allow 10 to 15 days for commercial plan review on a complete submittal. Applications go through the online permit portal, plan review fees are 18% of the permit fee, and projects of $50,000 or more need a Texas Accessibility Standards registration number (EABPRJ) in the package.",
    },
    {
      q: "Who provides utilities in McAllen?",
      a: "AEP Texas delivers electricity and Texas Gas Service supplies natural gas. Water, wastewater, and stormwater are provided by the McAllen Public Utility, the city-owned utility, so water capacity and drainage coordination run through the MPU.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 50, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.mcallen.net/departments/permits/permits"],
      codes: ["https://www.mcallenpublicadjuster.com/local-building-codes/"],
      amendments: ["https://app.alliancepermitting.com/guides/texas/mcallen-building-permit"],
      utilities: ["https://database.aceee.org/city/mcallen-tx"],
      climate: ["https://database.aceee.org/city/mcallen-tx"],
      market: ["https://app.alliancepermitting.com/guides/texas/mcallen-building-permit"],
    },
  },
};
