import type { CityData } from "../types";

export const anaheim: CityData = {
  slug: "anaheim",
  name: "Anaheim",
  stateSlug: "california",
  county: "Orange County",
  ahj: {
    office: "City of Anaheim Planning and Building Department, Building Division",
    process:
      "Anaheim's Planning and Building Department administers building permits and coordinates plan review with Planning, Fire & Rescue, Public Works, and utilities as required by the scope and site. Resort, convention, industrial, and infill work may also require planning entitlement, grading, public-improvement, fire, flood, and utility approvals, so the complete review path should be confirmed before submittal.",
  },
  codes: {
    building:
      "2025 California Building Standards Code (Title 24), effective January 1, 2026, as locally adopted and amended by the City of Anaheim",
    energy:
      "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, as enforced by Anaheim with applicable CALGreen and City amendments",
    amendments:
      "Anaheim's local code package can add fire, grading, stormwater, floodplain, zoning, public-works, and administrative requirements to the statewide California Building Standards Code. The project address and current City code materials control; do not assume that another Orange County jurisdiction's amendments apply.",
  },
  utilities: {
    electric:
      "Anaheim Public Utilities provides municipal electric and water service within its territory; Southern California Gas Company provides natural gas, and nearby Orange County parcels may have different electric service",
    notes:
      "Anaheim Public Utilities has its own new-service, rates, distributed-energy, and interconnection processes. Confirm service territory, available capacity, transformer and EV needs, solar/storage requirements, water, sewer, and storm-drain coordination early for resort, convention, industrial, and large tenant-improvement work.",
  },
  climateNotes:
    "Anaheim is a warm, dry inland Southern California city with hot summer periods, occasional Santa Ana winds, winter rain, and seismic exposure. Santa Ana River floodplain conditions, alluvial soils and localized liquefaction potential, wildfire smoke, and the parcel's relationship to coastal or inland microclimates require site-specific design.",
  marketNotes:
    "Anaheim's market combines the resort, hotel, convention, and entertainment district with healthcare, education, food and beverage, industrial, and logistics work. Renovation in active visitor facilities, infill multifamily, and warehouse or manufacturing projects often require phasing, high electrical and domestic-water capacity, constrained circulation, and careful coordination with existing operations.",
  narratives: {
    mep:
      "Anaheim MEP design begins with the applicable Title 24 Part 6 and CALGreen requirements, then tests the very different load profiles of hotels, convention facilities, entertainment venues, kitchens, cold storage, and industrial buildings. Hot inland afternoons support careful cooling-peak and envelope design, while active resort work requires phasing, noise, emergency power, controls, and domestic-hot-water continuity. Anaheim Public Utilities—not an assumed Southern California Edison process—must confirm electric service, transformer space, solar/storage, EV charging, and water capacity early.",
    structural:
      "Anaheim structural design uses the locally adopted California code package and a project geotechnical report to address seismic demand, alluvial soils, settlement, and any liquefaction or floodplain condition. Santa Ana winds make roof equipment, screens, canopies, and temporary works important, while resort renovations demand field verification of existing diaphragms, collectors, foundations, and irregularities before new occupancy or equipment loads are added. Special inspection and fire/life-safety coordination should be set up with the Building Division before construction documents are locked.",
    civil:
      "Anaheim civil design must keep stormwater, grading, fire access, utilities, and visitor or truck circulation workable on constrained resort and industrial sites. We screen FEMA flood information and Santa Ana River-area conditions, coordinate Anaheim Public Utilities water and electric corridors, and reserve space for City sewer, storm-drain, water-quality, and any public-works frontage requirements before paving and guest circulation consume the site. Construction-phase erosion and state stormwater obligations are then matched to the actual disturbance and schedule.",
    energy:
      "Anaheim energy compliance is a Title 24 Part 6 modeling and documentation exercise with the applicable CALGreen and Anaheim requirements, not a generic IECC checklist. Exterior shading, low-solar-gain glazing, efficient heat pumps, lighting controls, domestic-hot-water design, and realistic hotel or convention schedules can materially change the result. We reconcile the model with Anaheim Public Utilities' service and interconnection requirements so electrification, photovoltaics, storage, and EV charging are feasible at the planned occupancy and phasing.",
  },
  faqs: [
    {
      q: "Which code edition applies to an Anaheim commercial permit?",
      a: "For projects under the current cycle, Anaheim enforces the 2025 California Building Standards Code and 2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with City amendments. Confirm the project use, site overlays, and Anaheim materials for additional local requirements.",
    },
    {
      q: "Is Anaheim Public Utilities the electric provider for every nearby project?",
      a: "Anaheim Public Utilities provides municipal electric service within its service territory, but an address near the city boundary should be confirmed before design. Coordinate large loads, transformers, solar, storage, EV charging, water, and sewer with the serving utility and City departments early.",
    },
    {
      q: "What makes an Anaheim resort or convention renovation different?",
      a: "Active visitor facilities add phasing, emergency-power, domestic-hot-water, fire/life-safety, noise, and operational-continuity constraints to ordinary code compliance. Existing-condition surveys and an early Anaheim Planning, Building, Fire & Rescue, Public Works, and utility coordination plan reduce shutdown and rework risk.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 78, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.anaheim.net/490/Planning-Building"],
      codes: ["https://www.bsc.ca.gov/Codes.aspx", "https://www.hcd.ca.gov/building-standards", "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards", "https://codelibrary.amlegal.com/codes/anaheim/latest/overview"],
      amendments: ["https://codelibrary.amlegal.com/codes/anaheim/latest/overview"],
      utilities: ["https://www.anaheim.net/6099/Public-Utilities"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.anaheim.net/6280/Economic-Development"],
    },
  },
};