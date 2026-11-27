import type { CityData } from "../types";

export const morenoValley: CityData = {
  slug: "moreno-valley",
  name: "Moreno Valley",
  stateSlug: "california",
  county: "Riverside County",
  ahj: {
    office: "City of Moreno Valley Building & Safety Division (Community Development Department)",
    process:
      "Moreno Valley's Building & Safety Division plan-checks and permits work inside the city under the California Building Code with local amendments, with Riverside County Fire (CAL FIRE cooperative) handling fire review. The division processes a heavy logistics caseload — distribution centers around March Air Reserve Base and the SR-60 corridor — and Title 24 energy, CALGreen, and solar documentation is reviewed with the construction documents.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2; based on the 2024 IBC), effective January 1, 2026, with City of Moreno Valley amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026",
    amendments:
      "Moreno Valley enforces Title 24 with local amendments in a high-growth logistics setting. Warehouse projects also answer to the city's warehouse and good-neighbor design standards and South Coast AQMD's Warehouse Indirect Source Rule (WAIRE), which pushes truck-serving facilities toward solar, EV charging, and electrified yard equipment — requirements that land directly on the electrical design. Seismic categories are high near the San Jacinto fault zone at the city's edge.",
  },
  utilities: {
    electric: "Moreno Valley Utility (MVU) — the city-owned electric utility — serves much of the city, with Southern California Edison (SCE) serving remaining areas",
    notes:
      "Moreno Valley is unusual in the Inland Empire for owning its electric utility: MVU, a city department, provides retail electric service across much of the city's growth area and coordinates new industrial services locally, while SCE serves the balance. Which utility serves a parcel is a first-order design question — it sets interconnection rules, rates, and solar/storage treatment for the large warehouse roofs that dominate new construction. Water is Eastern Municipal Water District; gas is SoCalGas.",
  },
  climateNotes:
    "California climate zone 10 / IECC 3B (hot-dry): hot summers with design temperatures near or above 100°F, mild winters, and Santa Ana wind events. The San Jacinto fault zone runs along the city's eastern side, keeping seismic design categories high, and air quality under South Coast AQMD jurisdiction is a standing regulatory factor for industrial projects.",
  marketNotes:
    "Moreno Valley is one of the Inland Empire's principal logistics cities: Amazon fulfillment operations, Harbor Freight, Skechers' massive distribution campus, and Procter & Gamble anchor millions of square feet around March Air Reserve Base and the World Logistics Center area, while Kaiser Permanente and Riverside University Health System–Medical Center anchor healthcare. Warehouse and medical construction dominate the pipeline.",
  narratives: {
    mep:
      "MEP design in Moreno Valley starts by establishing which electric utility serves the parcel — city-owned Moreno Valley Utility across much of the growth area, SCE elsewhere — because service, interconnection, and solar treatment differ. Under the 2025 Title 24 codes, warehouse work adds AQMD WAIRE-driven solar, EV charging, and electrification scopes, and zone 10 cooling loads size the mechanical systems for the logistics and medical stock the city builds.",
    structural:
      "Moreno Valley structural design follows the 2025 CBC with high seismic categories from the San Jacinto fault zone, applied most often to large tilt-up logistics buildings and medical facilities. Panel anchorage, flexible diaphragm design, and rooftop solar support framing are recurring scopes, and Santa Ana wind gusts govern cladding and equipment anchorage.",
    civil:
      "Civil design in Moreno Valley supports industrial mega-parcels on the Perris Valley floor: drainage ties into Riverside County Flood Control systems, truck courts and circulation follow the city's warehouse design standards, and Eastern Municipal Water District coordination governs water and sewer service. March Air Reserve Base adjacency adds airfield land-use compatibility review for sites in its influence areas.",
    energy:
      "Energy compliance in Moreno Valley is documented to the 2025 California Energy Code (Title 24, Part 6) on state compliance forms. The WAIRE rule makes warehouse energy scope larger than the code minimum — rooftop PV, storage, and truck and employee EV charging are scored compliance obligations for many facilities, coordinated with MVU or SCE interconnection depending on the parcel.",
  },
  faqs: [
    {
      q: "Who provides electric service in Moreno Valley?",
      a: "Two utilities: Moreno Valley Utility (MVU), the city-owned utility, serves much of the city, and Southern California Edison serves the rest. Confirming which utility serves a parcel is a first step — interconnection and solar rules differ.",
    },
    {
      q: "What building code applies in Moreno Valley?",
      a: "The 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with city amendments, and the 2025 California Energy Code (Part 6) for energy compliance.",
    },
    {
      q: "What is the WAIRE rule and why does it affect Moreno Valley warehouses?",
      a: "South Coast AQMD's Warehouse Indirect Source Rule requires large warehouses to earn points for clean-truck and on-site measures — rooftop solar, EV charging, and electrified equipment — which puts energy and electrical scope directly into warehouse design and permitting.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 66, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.moval.org"],
      codes: ["https://www.dgs.ca.gov/BSC"],
      amendments: ["https://www.moval.org"],
      utilities: ["https://www.moval.org"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.moval.org"],
    },
  },
};
