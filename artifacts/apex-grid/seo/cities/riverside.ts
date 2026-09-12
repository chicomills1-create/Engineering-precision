import type { CityData } from "../types";

export const riverside: CityData = {
  slug: "riverside",
  name: "Riverside",
  stateSlug: "california",
  county: "Riverside County",
  ahj: {
    office: "City of Riverside Community & Economic Development Department, Building & Safety Division",
    process:
      "Riverside Building & Safety accepts permit applications and plan-review documents through the City's electronic permitting system and routes commercial work to the applicable building, planning, fire, public-works, and utility reviewers. A development project can require entitlement, grading, and off-site improvement approvals in addition to the building permit, so the parcel's review path should be established before construction documents are finalized.",
  },
  codes: {
    building: "2025 California Building Standards Code (Title 24), effective January 1, 2026, with City of Riverside local amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with applicable CALGreen measures",
    amendments:
      "Riverside Municipal Code adopts the California code family with local amendments. Fire, grading, stormwater, water-efficient landscape, and wildland-urban-interface requirements can add site- and location-specific obligations beyond the state code; the current Building & Safety code materials control the applicable cycle and project scope.",
  },
  utilities: {
    electric: "Riverside Public Utilities (RPU) provides municipal electric, water, and wastewater services within its service area",
    notes:
      "RPU is the point of contact for electric-service planning and distributed-energy interconnection as well as water and wastewater service. High-load logistics, manufacturing, and all-electric projects should confirm available capacity, service routing, and any required main extensions with RPU during early design.",
  },
  climateNotes:
    "Riverside's inland Southern California setting is hot and dry, with sustained summer heat, Santa Ana wind events, drought, and episodic wildfire smoke. The city is in a high-seismic region; alluvial soils, liquefaction potential near waterways, and flood hazards require parcel-specific study.",
  marketNotes:
    "Riverside is part of the Inland Empire's major logistics and distribution economy, while healthcare, UC Riverside, public-sector facilities, multifamily, and industrial redevelopment are important local demand drivers. Large warehouses and industrial sites commonly pair high electric loads and truck circulation with drainage, air-quality, and utility-capacity constraints.",
  narratives: {
    mep:
      "Riverside MEP design starts with long, hot inland cooling seasons rather than the milder coastal assumptions used elsewhere in Southern California. Cooling, electrical demand, smoke-event filtration, and rooftop-equipment exposure are coordinated with the current Title 24 path for the actual warehouse, laboratory, healthcare, or institutional schedule. Because RPU is both the electric and water/wastewater utility in its service area, early service-load, transformer-location, domestic/fire-flow, and interconnection conversations can be coordinated with one municipal provider—without assuming capacity is available at a particular frontage.",
    structural:
      "Riverside structural design follows the locally adopted California Building Standards Code in a high-seismic Inland Empire setting. Site geotechnical work should establish seismic site class, alluvial-soil behavior, liquefaction or settlement exposure where relevant, and groundwater conditions before foundations and slabs are selected. For logistics buildings, tall storage, rack systems, rooftop units, and large canopies require an explicit gravity and lateral load path; wind and wildfire exposure also make roof attachment and equipment anchorage more than a standard detail.",
    civil:
      "Riverside civil plans must reserve workable space for stormwater treatment, detention where required, fire access, truck movements, and municipal utility connections on heat-exposed Inland Empire sites. We coordinate grading and drainage with City review, screen FEMA flood mapping and geotechnical conditions before setting finished floors, and align water, sewer, and electric corridors with RPU. Industrial and logistics projects also need early attention to pavement sections, loading courts, dust-control and construction stormwater obligations, and public-right-of-way improvements.",
    energy:
      "Riverside commercial energy compliance uses Title 24 Part 6 and applicable CALGreen measures, but a credible solution reflects the city's hot-dry cooling peaks and the building's real operating profile. Solar control, efficient cooling, envelope performance, lighting controls, and load flexibility are consequential for warehouses, institutional buildings, and electrified central plants. We coordinate Title 24 modeling with RPU service and interconnection discussions so solar, storage, EV charging, and electric heating capacity are evaluated as one electrical strategy rather than added after plan check.",
  },
  faqs: [
    {
      q: "Who reviews commercial building permits in Riverside?",
      a: "The City of Riverside Community & Economic Development Department's Building & Safety Division administers building permits and plan review. Commercial projects can also be routed to Planning, Fire, Public Works, and Riverside Public Utilities, particularly when they include development, grading, or utility work.",
    },
    {
      q: "Which utilities serve a Riverside commercial project?",
      a: "Within its service area, Riverside Public Utilities provides electricity, water, and wastewater service. Confirm the actual service area, available electric capacity, water/fire-flow conditions, and extension requirements early for a high-load or new-development project.",
    },
    {
      q: "What site hazards matter in Riverside?",
      a: "Riverside projects need high-seismic California code design and parcel-specific geotechnical evaluation. Depending on location, alluvial soils, liquefaction, flood exposure, wildfire smoke or wildland-urban-interface conditions, and extreme inland heat can affect foundations, drainage, exterior equipment, and resilience planning.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 73, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://riversideca.gov/cedd"],
      codes: ["https://www.hcd.ca.gov/building-standards", "https://www.dgs.ca.gov/BSC/Codes", "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards"],
      amendments: ["https://riversideca.gov/cedd/building-safety", "https://riversideca.gov/municode"],
      utilities: ["https://riversideca.gov/utilities", "https://www.sce.com/business"],
      climate: ["https://www.weather.gov/sgx/", "https://myhazards.caloes.ca.gov/"],
      market: ["https://riversideca.gov/cedd/economic-development", "https://riversideca.gov/cedd"],
    },
  },
};