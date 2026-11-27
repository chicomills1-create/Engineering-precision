import type { CityData } from "../types";

export const glendaleCalifornia: CityData = {
  slug: "glendale",
  name: "Glendale",
  stateSlug: "california",
  county: "Los Angeles County",
  ahj: {
    office: "City of Glendale Building & Safety Division (Community Development Department)",
    process:
      "Glendale's Building & Safety Division plan-checks and permits construction inside the city under the California Building Code with Glendale amendments, coordinating with Glendale Fire for fire review. The city runs a mature, high-volume permit operation for its dense downtown and hillside districts, and Title 24 energy, CALGreen, and accessibility documentation is reviewed as part of the construction set at submittal.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2; based on the 2024 IBC), effective January 1, 2026, with City of Glendale amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026",
    amendments:
      "Glendale's local layer is hillside and hazard practice: the Verdugo foothill districts carry hillside development standards, brush and Very High Fire Hazard considerations at the wildland edge, and debris-basin and flood-control infrastructure from Los Angeles County. The Sierra Madre and Verdugo fault systems keep seismic categories high, and the city's municipal utility (GWP) imposes its own service and solar interconnection standards distinct from SCE practice in neighboring cities.",
  },
  utilities: {
    electric: "Glendale Water & Power (GWP) — the city-owned utility — provides electric and water service in Glendale",
    notes:
      "Glendale is one of Los Angeles County's municipal-utility cities: GWP, a city department, provides electricity (including the Grayson Power Plant in-city) and water, so new commercial services, rooftop solar interconnection, and storage follow GWP's own rules and rates rather than SCE's — a first-order difference from neighboring Burbank (also municipal) and Los Angeles (DWP). GWP's solar and net-metering successor programs and its clean-energy transition plan shape PV design economics in the city.",
  },
  climateNotes:
    "California climate zone 9 / IECC 3B (hot-dry inland valley edge): hot summers at the San Fernando Valley's east end, mild winters, Santa Ana winds, and foothill brush-fire exposure. Seismic demand is high near the Sierra Madre and Verdugo faults, and hillside sites add slope, drainage, and debris-flow considerations.",
  marketNotes:
    "Glendale is an entertainment-industry and commercial hub: DreamWorks Animation's campus, Disney's Grand Central Creative Campus in the former airfield district, the Americana at Brand and Glendale Galleria retail anchors, Adventist Health Glendale, and a dense downtown office and multifamily stock. Animation/media, healthcare, retail, and multifamily construction lead the market.",
  narratives: {
    mep:
      "MEP design in Glendale is Title 24 work under the 2025 CBC and Energy Code, with a municipal-utility twist: Glendale Water & Power sets service, solar interconnection, and rate structures locally, so electrical design follows GWP standards rather than SCE or DWP practice used elsewhere in the county. Zone 9 cooling loads, hillside fire-zone requirements, and the media-campus and hospital loads that anchor demand shape the systems scope.",
    structural:
      "Glendale structural design follows the 2025 CBC in a high seismic environment — Sierra Madre and Verdugo fault proximity — with hillside foundation, retaining, and slope-stability work a recurring scope in the foothill districts. Brush-zone construction requirements and debris-basin adjacency layer onto hillside projects, and the downtown high-rise and campus stock brings its own podium and long-span typologies.",
    civil:
      "Civil design in Glendale works between the Verdugo foothills and the Los Angeles River plain: drainage ties into LA County flood control and debris basins below the hillsides, hillside grading follows the city's hillside standards, and GWP water coordination is part of the municipal package. Dense downtown sites add shoring, staging, and utility-verification weight.",
    energy:
      "Energy compliance in Glendale is documented to the 2025 California Energy Code (Title 24, Part 6) on state compliance forms. GWP's local solar programs and rates — not SCE's — determine PV and storage economics, and the city's own clean-energy commitments make municipal-utility coordination part of the energy scope from schematic design onward.",
  },
  faqs: [
    {
      q: "Who provides electric service in Glendale, CA?",
      a: "Glendale Water & Power (GWP), the city-owned utility, provides electric and water service in Glendale — including its own solar interconnection rules and rates, distinct from SCE and LADWP in neighboring cities.",
    },
    {
      q: "What building code applies in Glendale?",
      a: "The 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with City of Glendale amendments, and the 2025 California Energy Code (Part 6) for energy compliance.",
    },
    {
      q: "What industries drive Glendale construction?",
      a: "Entertainment and media — DreamWorks Animation and Disney's Grand Central Creative Campus — plus Adventist Health Glendale, the Americana at Brand/Galleria retail district, and dense downtown multifamily development.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 68, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.glendaleca.gov"],
      codes: ["https://www.dgs.ca.gov/BSC"],
      amendments: ["https://www.glendaleca.gov"],
      utilities: ["https://www.glendalewaterandpower.com"],
      climate: ["https://www.weather.gov/lox/"],
      market: ["https://www.glendaleca.gov"],
    },
  },
};
