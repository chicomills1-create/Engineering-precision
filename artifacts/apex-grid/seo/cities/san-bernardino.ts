import type { CityData } from "../types";

export const sanBernardino: CityData = {
  slug: "san-bernardino",
  name: "San Bernardino",
  stateSlug: "california",
  county: "San Bernardino County",
  ahj: {
    office: "City of San Bernardino Community Development Department",
    process:
      "The City publishes an online-permit route and a development-code portal for projects in city limits. Commercial work can require coordinated building, planning, fire, public-works, grading, and utility review; confirm the application path, entitlement status, and any separate site or right-of-way permits with the City before a complete submittal.",
  },
  codes: {
    building: "2025 California Building Standards Code (Title 24), including the 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with City of San Bernardino amendments where applicable",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with applicable City amendments and CALGreen measures; no separate San Bernardino reach provision is asserted here",
    amendments:
      "The California Building Standards Code is the statewide baseline, while San Bernardino's Development Code and local ordinances govern zoning, site development, and other municipal requirements. The City's published Development Code and current permit guidance should control the local amendment and process check for a particular project; do not substitute a neighboring Inland Empire jurisdiction's code package.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) is the principal electric utility for San Bernardino; water service varies by parcel and may involve the City or San Bernardino Municipal Water Department",
    notes:
      "SCE service capacity, transformer location, protection, and distributed-generation interconnection should be confirmed early for logistics, industrial, EV-charging, and electrified-building loads. Water and sewer availability, pressure, fire flow, and connection requirements must be verified with the serving water agency rather than inferred from city limits.",
  },
  climateNotes:
    "San Bernardino is an inland Southern California valley city with hot, dry summers, cooler winter nights, and Santa Ana wind and wildfire-smoke episodes. The foothill-to-valley setting makes air quality, solar gain, heat-island exposure, seismic design, and site-specific drainage and slope or flood screening important for commercial work.",
  marketNotes:
    "San Bernardino's commercial market is shaped by Inland Empire logistics and distribution, the I-215 and I-10 transportation corridors, healthcare and education, airport-related activity, and infill or adaptive-reuse development. Large warehouses and industrial conversions bring high electrical service, truck-court, fire-flow, stormwater, and rooftop-equipment coordination needs; foothill and older urban parcels can add grading, seismic, and existing-utility constraints.",
  narratives: {
    mep:
      "San Bernardino MEP design starts with hot inland cooling loads, solar exposure, and the operating realities of warehouse, distribution, healthcare, and mixed-use programs. High-bay facilities need ventilation and destratification decisions tied to actual storage and occupancy, while wildfire smoke and Santa Ana wind conditions make filtration, outside-air sequences, and equipment protection operational concerns. SCE capacity, service configuration, EV charging, solar, and storage should be coordinated before the electrical one-line is fixed, and the serving water agency must confirm domestic and fire-service capacity.",
    structural:
      "San Bernardino structural work follows California's seismic provisions in a city between the San Bernardino Mountains and the Inland Empire logistics basin. A geotechnical investigation should inform site class, liquefaction or settlement screening, expansive soils, and any foothill slope or retaining condition rather than relying on a generic regional detail. Distribution buildings add long-span diaphragm and collector demands, rack and impact loads, rooftop-unit anchorage, and special-inspection coordination; older buildings and adaptive reuse also need a careful existing-condition and seismic-load-path review.",
    civil:
      "San Bernardino civil design has to connect logistics circulation and infill constraints with foothill runoff, urban drainage, and utility capacity. We screen FEMA mapping and off-site flow paths, establish finished-floor and truck-court grades, and reserve space for California stormwater treatment before the building footprint is locked. City development-code requirements, public improvements, right-of-way work, fire access, and the serving water and sewer agency's connection criteria are coordinated as separate but interdependent approvals.",
    energy:
      "San Bernardino commercial energy compliance uses California Title 24 Part 6 rather than an IECC or COMcheck workflow. In the hot inland climate, low-solar-gain glazing, roof reflectance and insulation, efficient high-ambient cooling, lighting controls, and demand-aware operation often dominate the design tradeoffs. We build the Title 24 model around real warehouse, refrigeration, healthcare, or tenant-improvement schedules, then coordinate SCE service, EV charging, photovoltaic, and storage assumptions so the compliance documents and utility design describe the same project.",
  },
  faqs: [
    {
      q: "Which agency reviews a commercial building in San Bernardino?",
      a: "The City of San Bernardino Community Development Department is the local starting point for projects inside city limits, using the City's online-permit and development-code resources. Planning, fire, public works, grading, and the serving water agency may have additional reviews; unincorporated county parcels use a different AHJ.",
    },
    {
      q: "What energy code should a San Bernardino commercial project use?",
      a: "For permits subject to the current cycle, the project must address the 2025 California Energy Code, Title 24 Part 6, effective January 1, 2026, plus applicable CALGreen measures and local requirements. Title 24 documentation is not the same as an IECC COMcheck package; City amendments should be confirmed before permit submittal.",
    },
    {
      q: "What should an industrial or warehouse project verify first?",
      a: "Confirm the parcel's zoning and development-code path, SCE electric capacity and service route, water and fire-flow availability, truck and fire access, stormwater and flood conditions, and geotechnical constraints. Those items can change the site plan before building, structural, and Title 24 documents are finalized.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 60, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.sanbernardino.gov/801/Online-Permits"],
      codes: ["https://www.dgs.ca.gov/BSC/Codes", "https://www.hcd.ca.gov/building-standards", "https://www.energy.ca.gov/rules-and-regulations/building-energy-efficiency"],
      amendments: ["https://www.sanbernardino.gov/659/Development-Code"],
      utilities: ["https://www.sce.com/business", "https://www.sbmwd.org/"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.sanbernardino.gov/248/Development-Projects"],
    },
  },
};