import type { CityData } from "../types";

export const greensboro: CityData = {
  slug: "greensboro",
  name: "Greensboro",
  stateSlug: "north-carolina",
  county: "Guilford County",
  ahj: {
    office: "City of Greensboro Planning Department, Development Services / Inspections",
    process: "Greensboro's Development Services and Inspections functions administer building-permit and trade-review activity through the City's online permitting portal. Planning, engineering, fire, water resources, and erosion-control approvals can be separate review tracks; larger or unusual proposals benefit from confirming the development-review path before submitting construction documents.",
  },
  codes: {
    building: "2024 North Carolina State Building Code, state-amended and enforced by the City of Greensboro",
    energy: "2024 North Carolina Energy Conservation Code, state-amended and IECC-derived",
    amendments: "Greensboro enforces North Carolina's statewide, amended code family rather than a standalone city building-code edition. The City's Land Development Ordinance, watershed and stormwater rules, erosion-control requirements, and utility standards add local site obligations that must be coordinated with the building permit.",
  },
  utilities: {
    electric: "Duke Energy",
    notes: "Duke Energy provides electric service in Greensboro and coordinates new service and distributed-generation interconnection. The City of Greensboro Water Resources Department provides water and wastewater service; water, sewer, stormwater, and street/right-of-way work require City coordination.",
  },
  climateNotes: "Greensboro's Piedmont location is in humid climate zone 3A, with long cooling and dehumidification seasons, thunderstorms, and winter freeze-thaw. Residual soils over weathered rock, clayey subsoils, and drainage to the Cape Fear and Yadkin-Pee Dee basins make infiltration and erosion control site-dependent.",
  marketNotes: "Greensboro sits in the Piedmont Triad's manufacturing and logistics economy, with aerospace, transportation equipment, warehousing, healthcare, higher education, and airport-area development supporting construction. The nearby Toyota Battery manufacturing investment and the Triad's interstate and rail connections reinforce demand for industrial facilities and supporting infrastructure.",
  narratives: {
    mep: "Greensboro MEP design addresses a humid 3A Piedmont climate where latent load, outside-air control, and shoulder-season dehumidification matter as much as peak cooling capacity. Duke Energy service capacity and interconnection are early decisions for industrial, logistics, and airport-area loads, while City Water Resources connections run in parallel. We prepare the commercial energy approach to the effective North Carolina Energy Conservation Code and confirm applicable state amendments with the AHJ rather than assuming an unamended national IECC applies.",
    structural: "Greensboro structural design is shaped by Piedmont residual soils, weathered rock, clay, wind, and modest seismic demand rather than coastal hurricane loading. A geotechnical investigation informs bearing, settlement, slab, retaining, and pavement decisions where soil profiles can vary across a site; severe-thunderstorm uplift and roof drainage deserve equally deliberate detailing. The 2024 North Carolina State Building Code is the governing statewide framework, while industrial and logistics buildings require load paths and slab systems suited to actual racking, vehicle, and process demands.",
    civil: "Greensboro civil work coordinates the City's Land Development Ordinance, Water Resources utility requirements, stormwater review, and erosion-control process before the layout is fixed. Clayey Piedmont soils and erosive construction conditions can limit infiltration and make grading, conveyance, water-quality treatment, and temporary stabilization interdependent. We establish water and sewer capacity, storm outfall, truck circulation, and right-of-way needs early, particularly for large industrial or logistics sites where utility corridors and stormwater footprints compete for usable area.",
    energy: "Commercial energy design in Greensboro follows the effective state-amended 2024 North Carolina Energy Conservation Code, with the precise compliance edition and amendments confirmed through the City. In humid zone 3A, low-SHGC glazing, solar control, efficient cooling, lighting controls, airtightness, and humidity-aware ventilation work as a system; insulation alone does not solve moisture risk. We coordinate those permit calculations with Duke Energy service assumptions and the operational loads of manufacturing, warehouse, healthcare, or institutional spaces.",
  },
  faqs: [
    { q: "Who reviews commercial building permits in Greensboro?", a: "The City of Greensboro's Development Services and Inspections functions administer building and trade permitting through the City's online process. Planning, engineering, fire, water resources, erosion-control, and right-of-way approvals may be separate tracks." },
    { q: "Which codes apply to commercial projects in Greensboro?", a: "Greensboro enforces the state-amended 2024 North Carolina State Building Code and the 2024 North Carolina Energy Conservation Code. The City Land Development Ordinance, stormwater rules, utility standards, and erosion-control requirements add local site requirements." },
    { q: "What utility and site issues should be addressed early?", a: "Duke Energy electric service and City Water Resources water and wastewater capacity should be screened during planning. Piedmont clays, variable residual soils, erosion risk, and stormwater treatment needs can materially affect grading and developable area." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 81, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.greensboro-nc.gov/departments/engineering-inspections"],
      codes: ["https://www.ncosfm.gov/codes"],
      amendments: ["https://www.greensboro-nc.gov/departments/planning/ordinances"],
      utilities: ["https://www.duke-energy.com/business"],
      climate: ["https://www.weather.gov/rah/"],
      market: ["https://www.greensboro.org/economic-development"],
    },
  },
};