import type { CityData } from "../types";

export const oxnard: CityData = {
  slug: "oxnard",
  name: "Oxnard",
  stateSlug: "california",
  county: "Ventura County",
  ahj: {
    office: "City of Oxnard Building & Engineering Division (Community Development Department)",
    process:
      "Oxnard's Building & Engineering Division plan-checks and permits construction inside the city under the California Building Code with city amendments, coordinating with Ventura County Fire Protection District for fire review. Title 24 documentation — energy, CALGreen, accessibility — is reviewed with the construction set, and coastal-zone projects add California Coastal Commission / local coastal program review on top of the city track.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2; based on the 2024 IBC), effective January 1, 2026, with City of Oxnard amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026",
    amendments:
      "Oxnard enforces Title 24 within a coastal-plain setting: much of the city sits on the Oxnard Plain near sea level with liquefaction-susceptible soils and high groundwater, the Ormond Beach and Channel Islands Harbor areas sit in the coastal zone with its additional permitting layer, and agricultural-urban interface rules (Ventura County's SOAR growth boundaries) shape where commercial development may go at all.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) provides electric service in Oxnard",
    notes:
      "SCE handles new commercial services and interconnections in Oxnard, including the substantial rooftop solar and cold-storage loads of the agricultural industry. The Ormond Beach area carries a power-sector history — legacy coastal generating stations have been retired or slated for retirement under California's once-through-cooling rules — and water is provided by the City of Oxnard, whose advanced water purification facility recycles water for groundwater replenishment, with gas from SoCalGas.",
  },
  climateNotes:
    "California climate zone 6 / IECC 3C (marine): one of the mildest climates in the U.S. — cool summers moderated by the Santa Barbara Channel, mild winters, and minimal heating or cooling extremes. Seismic demand is significant (the Ventura and Oak Ridge fault systems), and coastal flooding and liquefaction are the governing site hazards.",
  marketNotes:
    "Oxnard is Ventura County's largest city and an agricultural processing center — strawberries and coastal crops drive packing, cold storage, and food processing construction — alongside Naval Base Ventura County at Port Hueneme next door, the Port of Hueneme (a major auto and produce import port), Amazon logistics, and Channel Islands Harbor tourism and marine work.",
  narratives: {
    mep:
      "MEP design in Oxnard is Title 24 work in California's mildest load climate: the 2025 CBC and Energy Code govern, but zone 6 marine conditions mean small heating and cooling loads and ventilation-driven design, while the industrial work — cold storage and food processing — carries the heavy electrical and refrigeration scopes served by SCE. Coastal corrosion protection and liquefaction-aware utility connections are standard local details.",
    structural:
      "Oxnard structural design follows the 2025 CBC with significant seismic design categories from the Ventura fault system and the Oxnard Plain's liquefaction and lateral-spreading susceptibility — geotechnical investigation drives foundation selection on most commercial sites. Wind and snow are minor; seismic and soil behavior govern.",
    civil:
      "Civil design in Oxnard works on a flat coastal plain with high groundwater: drainage ties into Ventura County Watershed Protection systems and the Calleguas Creek and Santa Clara River watersheds, and coastal-zone sites add Local Coastal Program review. Agricultural land conversion at the urban edge is governed by SOAR boundaries, and the city's recycled-water system offers irrigation and some industrial supplies.",
    energy:
      "Energy compliance in Oxnard is documented to the 2025 California Energy Code (Title 24, Part 6) on state forms, where the marine climate makes the prescriptive envelope path comparatively forgiving and the real work is lighting, controls, and process refrigeration efficiency for the agricultural industry. SCE programs support cold-storage and processing efficiency measures.",
  },
  faqs: [
    {
      q: "Who provides electric service in Oxnard?",
      a: "Southern California Edison (SCE) provides electric service and interconnection in Oxnard. Water is the City of Oxnard (including its recycled-water program) and gas is SoCalGas.",
    },
    {
      q: "What building code applies in Oxnard?",
      a: "The 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with city amendments, and the 2025 California Energy Code (Part 6) — with coastal-zone projects adding Local Coastal Program review.",
    },
    {
      q: "What site hazard most affects Oxnard construction?",
      a: "Liquefaction. Much of the Oxnard Plain has liquefaction-susceptible soils and high groundwater in a significant seismic region, so geotechnical investigation drives foundation design; coastal flooding affects the harbor and beach districts.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 61, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.oxnard.org"],
      codes: ["https://www.dgs.ca.gov/BSC"],
      amendments: ["https://www.oxnard.org"],
      utilities: ["https://www.sce.com"],
      climate: ["https://www.weather.gov/lox/"],
      market: ["https://www.oxnard.org"],
    },
  },
};
