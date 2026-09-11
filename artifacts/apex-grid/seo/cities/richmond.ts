import type { CityData } from "../types";

export const richmond: CityData = {
  slug: "richmond",
  name: "Richmond",
  stateSlug: "virginia",
  county: "City of Richmond",
  ahj: {
    office: "City of Richmond Department of Planning and Development Review — Building Inspections",
    process: "Richmond processes commercial building permits and plan review through its online permitting system, with zoning, fire, planning, public works, and utility reviews coordinated as applicable. Larger downtown, adaptive-reuse, and site-development projects benefit from pre-application coordination because building review and land-disturbance approvals are distinct.",
  },
  codes: {
    building: "2021 Virginia Uniform Statewide Building Code (USBC), including the 2021 Virginia Construction Code",
    energy: "2021 Virginia Energy Conservation Code, part of the 2021 USBC; ASHRAE 90.1-2019 is an alternate path",
    amendments: "Richmond must apply the statewide USBC and cannot adopt local technical building-code amendments. The city zoning ordinance, floodplain and stormwater requirements, Chesapeake Bay Preservation Act, and historic-district review can add substantial project-specific constraints.",
  },
  utilities: {
    electric: "Dominion Energy Virginia",
    notes: "Dominion Energy coordinates commercial electric service and interconnection. Richmond DPU provides water, wastewater, and stormwater services; aging urban utilities, capacity, and connection requirements should be confirmed during due diligence.",
  },
  climateNotes: "Richmond is humid mixed climate zone 4A, with warm humid summers, meaningful winter heating, intense thunderstorms, and occasional tropical-storm rainfall. James River tributaries, urban floodplains, clayey Piedmont soils, and heat-island conditions influence site and envelope design.",
  marketNotes: "Richmond combines state-government, healthcare, higher-education, financial-services, advanced-manufacturing, logistics, and adaptive-reuse markets. Downtown and riverfront redevelopment coexist with suburban growth, while historic fabric, flood resilience, and aging infrastructure affect project feasibility.",
  narratives: {
    mep: "Richmond MEP design balances 4A heating and cooling with latent control through humid shoulder seasons, urban heat-island effects, and severe-rain resilience. Dominion service capacity is checked early for electrification and high-density redevelopment, while Richmond DPU water and sewer constraints can affect downtown phasing. The statewide Virginia Energy Conservation Code creates a consistent permit baseline, but existing-building conditions often drive the real coordination effort.",
    structural: "Richmond structural design follows the 2021 USBC while accounting for Piedmont clay, variable urban fill, weathered rock, and floodplain elevation near the James and its tributaries. Seismic demand is generally modest but site class and occupancy still matter; adaptive-reuse projects require careful verification of existing framing, altered loads, and vibration. Flood-resistant detailing and corrosion-aware materials can be decisive on river-adjacent work.",
    civil: "Richmond civil engineering coordinates city stormwater, Virginia stormwater quality requirements, Chesapeake Bay nutrient goals, floodplain mapping, and constrained urban utilities. Existing combined or aging infrastructure, steep urban grades, and James River tributaries make outfall and capacity checks essential. Historic streets, rights-of-way, and redevelopment footprints leave little room for detention, so BMP and utility layouts begin with due diligence.",
    energy: "Richmond commercial energy compliance uses the statewide 2021 Virginia Energy Conservation Code, with ASHRAE 90.1-2019 as an alternate path. A 4A strategy combines air-barrier continuity, solar control, efficient heating and cooling, and dehumidification-aware ventilation; adaptive reuse adds existing-envelope and equipment constraints. We coordinate COMcheck or 90.1 documentation with Dominion service assumptions and the actual occupancy loads.",
  },
  faqs: [
    { q: "Which building code applies in Richmond?", a: "Richmond enforces Virginia's statewide 2021 USBC and Virginia Construction Code. Local zoning, floodplain, stormwater, Chesapeake Bay, and historic-district reviews remain important, but the city cannot create a separate technical building code." },
    { q: "Who provides Richmond commercial utilities?", a: "Dominion Energy Virginia provides electric service, while Richmond's Department of Public Utilities provides water, wastewater, and stormwater services. Capacity, connection, and existing-infrastructure conditions should be verified for each site." },
    { q: "How do flood and redevelopment conditions affect Richmond design?", a: "James River tributaries, mapped floodplains, urban drainage, clay and fill, and constrained rights-of-way can affect finished grades, outfalls, foundations, and detention. Adaptive-reuse projects also need existing-structure and utility investigations before loads are finalized." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 87, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.rva.gov/planning-development-review"],
      codes: ["https://www.dhcd.virginia.gov/virginia-uniform-statewide-building-code"],
      amendments: ["https://www.rva.gov/planning-development-review"],
      utilities: ["https://www.dominionenergy.com/virginia/start-stop-service", "https://www.rva.gov/public-utilities"],
      climate: ["https://www.weather.gov/akq/"],
      market: ["https://www.grpva.com/"],
    },
  },
};