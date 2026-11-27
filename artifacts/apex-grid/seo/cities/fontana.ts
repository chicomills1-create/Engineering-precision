import type { CityData } from "../types";

export const fontana: CityData = {
  slug: "fontana",
  name: "Fontana",
  stateSlug: "california",
  county: "San Bernardino County",
  ahj: {
    office: "City of Fontana Building & Safety Division (Development Services)",
    process:
      "Fontana's Building & Safety Division plan-checks commercial work under the California Building Code with city amendments, coordinating with San Bernardino County Fire for fire review on industrial occupancies. The city's permit operation is built for warehouse volume — Fontana is one of the Inland Empire's core logistics cities — and Title 24 energy, CALGreen, and accessibility documentation is checked with the construction set at submittal.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2; based on the 2024 IBC), effective January 1, 2026, with City of Fontana amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026",
    amendments:
      "Fontana's local conditions shape its amendment and enforcement emphasis: the city sits at the mouth of Cajon Pass where Santa Ana (foehn) winds funnel through with extreme gusts, lies near the San Andreas and San Jacinto fault zones with high seismic categories, and enforces warehouse-specific standards — including the Inland Empire's indirect source and truck-related requirements administered through the South Coast AQMD — that reach into site and building design for logistics projects.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) serves Fontana",
    notes:
      "SCE provides electric service and interconnection in Fontana, where warehouse rooftop solar is a defining load case: very large PV arrays, battery storage, and EV fleet charging for logistics operators interconnect under SCE Rule 21 and the net billing tariff, and service capacity for new industrial parks should be confirmed early given regional queue volumes. Water is Fontana Water Company (a San Gabriel Valley Water Company division), and gas is SoCalGas.",
  },
  climateNotes:
    "California climate zone 10 / IECC 3B (hot-dry): hot inland summers, mild winters, and extreme Santa Ana wind events descending through Cajon Pass. Seismic demand is high near the San Andreas and San Jacinto faults; air quality is among the nation's most challenged, with ozone and diesel particulate burdens that shape industrial regulation.",
  marketNotes:
    "Fontana is a logistics and manufacturing heavyweight: millions of square feet of distribution centers along I-10 and I-15, Kaiser Permanente's Fontana Medical Center, steel heritage from the historic Kaiser Steel site (now the Auto Club Speedway / California Speedway area and industrial redevelopment), and Amazon and national 3PL operations. Warehouse, cold storage, and manufacturing construction dominate the commercial pipeline.",
  narratives: {
    mep:
      "MEP design in Fontana is warehouse-scale Title 24 work under the 2025 CBC and Energy Code: high-bay lighting and controls, ESFR-ready coordination, rooftop solar and storage interconnecting with SCE, and EV charging for fleet and employee loads. Zone 10 cooling design, AQMD-driven electrification pressure on truck-serving facilities, and standby power for cold storage define the mechanical and electrical scope.",
    structural:
      "Fontana structural design follows the 2025 CBC in a high seismic category near the San Andreas and San Jacinto faults, with Cajon Pass Santa Ana wind gusts as a genuine envelope and rooftop-equipment design case. The dominant typology — large tilt-up concrete logistics buildings — brings panel anchorage, diaphragm, and dock-equipment engineering to the front of every industrial set.",
    civil:
      "Civil design in Fontana supports industrial mega-sites: truck courts and circulation, San Bernardino County flood control channels draining the alluvial fan from the San Gabriel foothills, and water-quality management plans under the Santa Ana Regional Board's MS4 permit. Alluvial soils and debris-flow history at the mountain front shape grading and drainage at the city's northern edge.",
    energy:
      "Energy compliance in Fontana is documented to the 2025 California Energy Code (Title 24, Part 6) on state forms. Warehouses carry their own Part 6 requirements — skylighting/daylighting, high-bay controls, and solar readiness — and Fontana's huge roof areas make PV-plus-storage the standard beyond-code conversation with SCE interconnection built into the schedule.",
  },
  faqs: [
    {
      q: "Who provides electric service in Fontana?",
      a: "Southern California Edison (SCE). Warehouse rooftop solar, storage, and fleet EV charging interconnect with SCE under Rule 21 and the net billing tariff — confirm service capacity early for new industrial parks.",
    },
    {
      q: "What building code applies in Fontana?",
      a: "The 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with City of Fontana amendments, and the 2025 California Energy Code (Part 6) for energy compliance.",
    },
    {
      q: "What natural hazards shape Fontana design?",
      a: "Earthquakes (San Andreas and San Jacinto fault proximity, high seismic categories) and extreme Santa Ana winds funneled through Cajon Pass, plus alluvial-fan flooding and debris flows at the foothill edge.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 67, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.fontanaca.gov"],
      codes: ["https://www.dgs.ca.gov/BSC"],
      amendments: ["https://www.fontanaca.gov"],
      utilities: ["https://www.sce.com"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.fontanaca.gov"],
    },
  },
};
