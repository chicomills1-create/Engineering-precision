import type { CityData } from "../types";

export const macon: CityData = {
  slug: "macon", name: "Macon", stateSlug: "georgia", county: "Bibb County",
  ahj: {
    office: "Macon-Bibb County Planning and Zoning Commission and Building and Permitting",
    process: "Macon-Bibb County coordinates development, building, site, and inspection approvals through its local departments. Commercial applicants should verify the current permit checklist, zoning status, and whether separate site, erosion-control, floodplain, or fire reviews are required before a complete submittal.",
  },
  codes: {
    building: "Georgia State Minimum Standard Codes, including the 2018 IBC with Georgia amendments, enforced by Macon-Bibb County",
    energy: "Georgia State Minimum Standard Energy Code, based on the 2015 IECC with Georgia supplements and amendments; ASHRAE 90.1 alternate path",
    amendments: "Georgia's state code controls the commercial technical baseline. Macon-Bibb County separately administers zoning, local development, stormwater, floodplain, fire, and erosion-control requirements that can change site design.",
  },
  utilities: {
    electric: "Macon Water Authority and Georgia Power serve different utility functions and territories; confirm the electric provider for the parcel",
    notes: "Macon Water Authority provides water and wastewater service in its system. Commercial and industrial projects should verify water pressure, fire flow, sewer capacity, easements, and electric-service requirements with the responsible providers early.",
  },
  climateNotes: "Macon lies in ASHRAE climate zone 3A, with hot humid summers, substantial latent cooling, heavy rainfall, severe thunderstorms, and mild but real winter heating. Piedmont red clay, rolling terrain, and Ocmulgee River flood exposure make site drainage and geotechnical findings project-specific.",
  marketNotes: "Macon-Bibb County supports healthcare and education, advanced manufacturing, food and distribution, logistics along I-16/I-75, and downtown and corridor redevelopment. These uses create demand for adaptable MEP systems, reliable utilities, and civil packages that handle redevelopment constraints as well as greenfield grading.",
  narratives: {
    mep: "Macon MEP design responds to 3A humidity and long cooling seasons while allowing for winter heating, freeze protection, and the process or distribution loads common to the region. We confirm the parcel's electric territory and Macon Water Authority capacity early, then document HVAC, lighting, and service decisions against Georgia's amended statewide energy code.",
    structural: "Macon structures use Georgia's amended 2018 IBC with generally low seismic demand and inland wind, but foundations are governed by the geotechnical report for Piedmont red clay, weathered rock, fill, and variable bearing. Severe-storm roof anchorage, flood elevations near the Ocmulgee corridor, and existing-building conditions are coordinated in the load path.",
    civil: "Macon civil design addresses rolling terrain, erosive red clay, intense rainfall, floodplain mapping, and local stormwater and erosion-control review. We establish detention, conveyance, finished floors, access, fire flow, and Macon Water Authority connections before site constraints force redesign.",
    energy: "Commercial projects in Macon use Georgia's amended 2015 IECC baseline, with ASHRAE 90.1 as an alternate. Low-SHGC glazing, shading, air sealing, efficient humidity-capable cooling, and lighting controls are evaluated as one package so the compliance path also fits the building's operating load.",
  },
  faqs: [
    { q: "Who reviews a commercial permit in Macon?", a: "Macon-Bibb County local planning, zoning, building, and permitting functions coordinate the review, with separate site, fire, stormwater, erosion, or floodplain approvals where applicable. Confirm the current checklist for the parcel and use." },
    { q: "What energy code applies to Macon commercial buildings?", a: "Georgia's State Minimum Standard Energy Code applies statewide: an amended 2015 IECC baseline with ASHRAE 90.1 available as an alternate commercial path. The local reviewer administers the state requirements." },
    { q: "What site conditions should a Macon project investigate?", a: "Red-clay and variable Piedmont soils, intense rainfall, rolling grades, and Ocmulgee River flood exposure can affect foundations, grading, detention, and finished-floor elevations. Resolve geotechnical and drainage information before fixing the footprint." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 74, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.maconbibb.us/planning-zoning/"],
      codes: ["https://dca.georgia.gov/community-assistance/construction-codes/current-state-minimum-codes-construction"],
      amendments: ["https://www.maconbibb.us/planning-zoning/"],
      utilities: ["https://www.maconwater.org/"],
      climate: ["https://www.weather.gov/ffc/"],
      market: ["https://www.maconga.org/"],
    },
  },
};