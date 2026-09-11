import type { CityData } from "../types";

export const virginiaBeach: CityData = {
  slug: "virginia-beach",
  name: "Virginia Beach",
  stateSlug: "virginia",
  county: "City of Virginia Beach",
  ahj: {
    office: "City of Virginia Beach Department of Planning and Community Development, Permits & Inspections",
    process: "Permits & Inspections accepts applications, plans, comments, and inspections through the city's Accela Citizen Access portal. Commercial work is reviewed under the statewide USBC and may be routed to zoning, fire, public works, and stormwater reviewers; pre-application coordination is important for coastal, floodplain, and larger site-development work.",
  },
  codes: {
    building: "2021 Virginia Uniform Statewide Building Code (USBC), including the 2021 Virginia Construction Code",
    energy: "2021 Virginia Energy Conservation Code, part of the 2021 USBC; ASHRAE 90.1-2019 is an alternate path",
    amendments: "Virginia Beach enforces the statewide USBC, so it cannot adopt its own technical building-code amendments. Local zoning, floodplain management, Chesapeake Bay Preservation Area, stormwater, and site-plan requirements are consequential overlays and are reviewed separately from the building-code baseline.",
  },
  utilities: {
    electric: "Dominion Energy Virginia",
    notes: "Dominion Energy Virginia coordinates electric service and distributed-generation interconnection. The City of Virginia Beach Department of Public Utilities provides water and sanitary sewer, while Public Works reviews drainage and stormwater; coastal service and finished-grade decisions should be coordinated before final utility design.",
  },
  climateNotes: "Virginia Beach's coastal 4A setting is hot and humid, with salt-air corrosion, hurricane and nor'easter wind/rain, recurrent tidal flooding, and a high groundwater table. FEMA flood zones and Coastal A Zone conditions are practical building and site constraints near the ocean, Back Bay, Lynnhaven, and tidal tributaries.",
  marketNotes: "The market is shaped by tourism and hospitality at the oceanfront, Naval Air Station Oceana and the broader Hampton Roads defense economy, port- and logistics-related work, healthcare, and steady residential and mixed-use development. Resilience upgrades, flood mitigation, and redevelopment on flat, utility-constrained coastal land are recurring project conditions.",
  narratives: {
    mep: "Virginia Beach MEP design works in a humid coastal 4A climate where latent control, corrosion-resistant outdoor equipment, wind-driven rain detailing, and reliable cooling matter as much as nominal tonnage. The 2021 Virginia Energy Conservation Code is the permit baseline, while Dominion service capacity and interconnection affect electric heat-pump, hospitality, and defense-adjacent load strategies. We coordinate water and sewer with City Public Utilities and protect exterior equipment and emergency systems from flood elevation and salt-air exposure.",
    structural: "Structural design in Virginia Beach is governed by coastal wind, flood elevation, and geotechnical conditions more often than seismic. The uniform 2021 USBC establishes the code basis, but hurricane and nor'easter pressures, high groundwater, soft Coastal Plain soils, scour, and Coastal A/VE flood-zone detailing can determine the foundation and lateral approach. We set design flood elevation and flood-damage-resistant material limits with the local floodplain review before committing to a ground-floor occupancy or equipment layout.",
    civil: "Virginia Beach civil engineering is a water-management exercise on a flat coastal plain. Local stormwater review operates with Virginia's Stormwater Management Program and Chesapeake Bay Preservation Area requirements; tidal tailwater, shallow groundwater, floodplain storage, and phosphorus-control measures can limit conventional detention and infiltration. We coordinate drainage outfalls, finished grades, utilities, and flood-resilient access with Public Works and Public Utilities while preserving required resource-protection buffers.",
    energy: "Energy compliance uses the 2021 Virginia Energy Conservation Code or its ASHRAE 90.1-2019 alternate path, not a city-specific reach code. In Virginia Beach, the durable solution balances envelope air sealing and solar control with humidity-safe ventilation, dehumidification, and corrosion-resilient equipment. We model the envelope, lighting, and mechanical trades together, then check Dominion electrical service and backup-power implications early for coastal facilities that need dependable operation during severe-weather events.",
  },
  faqs: [
    { q: "What code does Virginia Beach use for commercial construction?", a: "Virginia Beach enforces the statewide 2021 Virginia Uniform Statewide Building Code, including the Virginia Construction Code. The city cannot change technical USBC requirements locally, but its floodplain, Chesapeake Bay Preservation Area, zoning, stormwater, and site-plan rules add separate local review." },
    { q: "Do Virginia Beach projects need coastal flood design?", a: "Many do. Sites near the ocean, Back Bay, Lynnhaven, and tidal tributaries may be in FEMA flood zones or Coastal A Zones. Design flood elevation, flood-damage-resistant materials, high groundwater, scour, access, and exterior-equipment elevation should be resolved with the city's floodplain review at the outset." },
    { q: "Who provides utilities in Virginia Beach?", a: "Dominion Energy Virginia provides electric service and handles interconnection. The City of Virginia Beach Department of Public Utilities provides water and sanitary sewer, while Public Works reviews drainage and stormwater, so electrical capacity and coastal utility elevations need early coordination." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 85, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.vbgov.com/government/departments/planning/permits-inspections"],
      codes: ["https://www.dhcd.virginia.gov/virginia-uniform-statewide-building-code"],
      amendments: ["https://www.vbgov.com/government/departments/public-works/storm-water"],
      utilities: ["https://www.dominionenergy.com/virginia/start-stop-service"],
      climate: ["https://www.weather.gov/akq/"],
      market: ["https://www.virginiachamber.com/economic-development/"],
    },
  },
};