import type { CityData } from "../types";

export const huntingtonBeach: CityData = {
  slug: "huntington-beach",
  name: "Huntington Beach",
  stateSlug: "california",
  county: "Orange County",
  ahj: {
    office: "City of Huntington Beach Community Development Department — Building & Safety",
    process:
      "Huntington Beach's Building & Safety function plan-checks and permits work inside the city under the California Building Code with city amendments, with Orange County Fire Authority providing fire service and review. Coastal-zone projects — much of the city's signature waterfront — add Local Coastal Program and potentially California Coastal Commission review, and Title 24 energy, CALGreen, and accessibility documentation is reviewed with the construction set.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2; based on the 2024 IBC), effective January 1, 2026, with City of Huntington Beach amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026",
    amendments:
      "Huntington Beach enforces Title 24 in a coastal setting with three local signatures: liquefaction and subsidence history in the Bolsa Chica and harbor areas (including legacy oil-field ground movement), coastal-zone permitting through its certified Local Coastal Program, and a long civic history around oil production — active and legacy wells and methane considerations appear in site due diligence in parts of the city.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) provides electric service in Huntington Beach",
    notes:
      "SCE handles new commercial services and interconnections in Huntington Beach, including rooftop solar under the net billing tariff. The city's power history is visible on its coast: the AES Huntington Beach generating station operates a modernized gas plant with battery storage on the former steam-plant site. Water is the City of Huntington Beach (with Orange County Water District groundwater), and gas is SoCalGas.",
  },
  climateNotes:
    "California climate zone 6 / IECC 3C (marine): mild coastal weather year-round — cool summers, mild winters, marine layer — with seismic demand from the Newport-Inglewood fault zone running through the city (the 1933 Long Beach earthquake source). Coastal flooding, tsunami inundation zones at the harbor and beach districts, and liquefaction are the site hazards.",
  marketNotes:
    "Huntington Beach — Surf City USA — builds on tourism and coastal commercial (the downtown and Pacific City districts, resort hotels on Pacific Coast Highway), Boeing's Huntington Beach campus (space and defense systems), healthcare around Hoag and community facilities, and oil-legacy industrial land in transition. Hospitality, mixed-use coastal redevelopment, and aerospace work lead the pipeline.",
  narratives: {
    mep:
      "MEP design in Huntington Beach is Title 24 work under the 2025 CBC and Energy Code in a marine climate with minimal thermal loads — ventilation, controls, and coastal corrosion protection carry the design, while SCE service coordination covers hospitality and aerospace loads. Legacy oil-field methane and coastal flood elevation reach into below-grade and equipment-placement decisions on affected sites.",
    structural:
      "Huntington Beach structural design follows the 2025 CBC with the Newport-Inglewood fault zone through the city — the source of the 1933 Long Beach earthquake — setting significant seismic categories, and Bolsa Chica-area liquefaction and subsidence shaping foundation practice. Coastal construction adds flood, tsunami-zone awareness at the harbor, and severe marine corrosion protection.",
    civil:
      "Civil design in Huntington Beach works on a coastal plain behind wetlands: drainage ties into Orange County Flood Control channels and the Bolsa Chica wetlands system, coastal-zone sites run through the Local Coastal Program, and legacy oil operations leave well locations and potential methane zones in the due-diligence record for parts of the city.",
    energy:
      "Energy compliance in Huntington Beach is documented to the 2025 California Energy Code (Title 24, Part 6) on state forms. The marine climate makes envelope compliance straightforward; the substantive work is lighting and controls for hospitality and retail, and solar-plus-storage economics under SCE's net billing tariff for the city's large low-rise commercial roofs.",
  },
  faqs: [
    {
      q: "Who provides electric service in Huntington Beach?",
      a: "Southern California Edison (SCE) provides electric service and solar interconnection. Water is the City of Huntington Beach and gas is SoCalGas; fire service is Orange County Fire Authority.",
    },
    {
      q: "What building code applies in Huntington Beach?",
      a: "The 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with city amendments, and the 2025 California Energy Code (Part 6). Coastal projects also go through the city's Local Coastal Program.",
    },
    {
      q: "What hazards shape Huntington Beach design?",
      a: "The Newport-Inglewood fault zone (1933 Long Beach earthquake), Bolsa Chica liquefaction and subsidence, coastal flooding and tsunami zones at the harbor — plus legacy oil-field wells and methane in site due diligence.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 63, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.huntingtonbeachca.gov"],
      codes: ["https://www.dgs.ca.gov/BSC"],
      amendments: ["https://www.huntingtonbeachca.gov"],
      utilities: ["https://www.sce.com"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.huntingtonbeachca.gov"],
    },
  },
};
