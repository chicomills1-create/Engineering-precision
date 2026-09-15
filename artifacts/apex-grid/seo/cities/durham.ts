import type { CityData } from "../types";

export const durham: CityData = {
  slug: "durham",
  name: "Durham",
  stateSlug: "north-carolina",
  county: "Durham County",
  ahj: {
    office: "City-County Inspections Department of Durham",
    process: "The City-County Inspections Department administers building permits and plan review for Durham through its online permitting system. City planning, stormwater, transportation/right-of-way, fire, and utility review can be independent tracks, and development in the Falls Lake watershed or near regulated streams requires early site due diligence.",
  },
  codes: {
    building: "2024 North Carolina State Building Code, state-amended and enforced by the City-County Inspections Department",
    energy: "2024 North Carolina Energy Conservation Code, state-amended and IECC-derived",
    amendments: "Durham applies the statewide North Carolina code family rather than a separate municipal building-code edition. The Unified Development Ordinance, stormwater requirements, watershed-protection overlay districts, and City utility standards add local requirements that can govern site yield and sequencing.",
  },
  utilities: {
    electric: "Duke Energy Progress",
    notes: "Duke Energy Progress serves electric customers in Durham and coordinates new service and distributed-energy interconnection. The City of Durham Department of Water Management provides water and sanitary sewer; extension, capacity, and public-infrastructure requirements should be tested during site planning.",
  },
  climateNotes: "Durham is in the humid Piedmont climate zone 3A, with long cooling and dehumidification seasons, heavy thunderstorms, and mild but real winter freeze events. Rolling topography, clay-rich residual soils, streams, and Falls Lake watershed protections can strongly influence grading, stormwater, and utility layout.",
  marketNotes: "Durham's construction market is shaped by Duke University and Duke Health, Research Triangle Park, life-sciences and biotechnology facilities, higher education, multifamily, and downtown reuse. Laboratory and research programs bring high ventilation, process, resilience, and utility-load demands, while greenfield sites face watershed and infrastructure constraints.",
  narratives: {
    mep: "Durham MEP design is often driven by laboratory, health-care, and research requirements layered on a humid 3A climate: outdoor-air volume, exhaust, humidity control, pressure relationships, and redundancy must be reconciled with energy performance. Duke Energy Progress service capacity and interconnection are established early for high-load research and process facilities, while City water and sewer demands are coordinated in parallel. The permit baseline is the effective North Carolina Energy Conservation Code, confirmed with the City-County Inspections Department rather than assumed from an unamended IECC.",
    structural: "Durham structural design pairs the state-amended North Carolina code with the physical realities of rolling Piedmont sites: residual clay soils, weathered rock, fills, and slopes can govern foundation and retaining strategy. Inland wind and modest seismic demand still require a complete lateral analysis, but the geotechnical report is critical to bearing, settlement, excavations, and slab performance. For laboratory or institutional additions, we verify existing framing and vibration-sensitive equipment criteria early instead of treating them as a late coordination issue.",
    civil: "Durham civil engineering begins with the UDO, City utility requirements, and watershed/stream constraints before optimizing a building footprint. Falls Lake watershed protections, riparian buffers, rolling grades, and clay soils can limit impervious cover, outfalls, and infiltration performance, while construction erosion control remains essential in intense rain. We coordinate water and sewer availability with the Department of Water Management, stormwater treatment and conveyance, access, and right-of-way work early so research-campus or infill layouts are based on achievable infrastructure.",
    energy: "Commercial energy compliance in Durham follows the effective state-amended 2024 North Carolina Energy Conservation Code. The humid 3A climate rewards solar-control glazing, continuous air and thermal control, efficient cooling, energy recovery where appropriate, and humidity-aware sequences; in lab and health-care spaces, the actual ventilation and exhaust program must be modeled honestly. We align the code path with Duke Energy Progress service capacity, lighting and controls, and research-process loads, separating a permit energy model from broader operational decarbonization decisions.",
  },
  faqs: [
    { q: "Who issues commercial building permits in Durham?", a: "The City-County Inspections Department administers Durham building permits and plan review through its online system. Planning, fire, stormwater, transportation, utility, and watershed reviews can be separate approvals." },
    { q: "What codes govern Durham commercial projects?", a: "Durham enforces the state-amended 2024 North Carolina State Building Code and 2024 North Carolina Energy Conservation Code. The Durham Unified Development Ordinance, watershed overlays, stormwater rules, and utility standards add local requirements." },
    { q: "Why are watershed and utilities important in Durham early design?", a: "Falls Lake watershed protections, riparian buffers, rolling terrain, clay soils, and stream crossings can constrain impervious area, grading, drainage, and outfalls. City water and sewer capacity or extension requirements should be evaluated before a research, lab, or multifamily layout is fixed." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 86, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.Durhamnc.gov/293/City-County-Building-Safety"],
      codes: ["https://www.ncosfm.gov/codes"],
      amendments: ["https://udo.durhamnc.gov/udo"],
      utilities: ["https://www.duke-energy.com/business"],
      climate: ["https://www.weather.gov/rah/"],
      market: ["https://durhamchamber.org/economic-development/"],
    },
  },
};