import type { CityData } from "../types";

export const augusta: CityData = {
  slug: "augusta", name: "Augusta", stateSlug: "georgia", county: "Richmond County",
  ahj: {
    office: "Augusta-Richmond County Planning and Development Department, Building and Development Services",
    process: "Commercial permits are coordinated through Augusta-Richmond County's development and building-services functions, with building, site, fire, and utility comments addressed through the local submittal process. Confirm the current checklist and whether a project is inside consolidated Augusta-Richmond County jurisdiction before filing.",
  },
  codes: {
    building: "Georgia State Minimum Standard Codes, including the 2018 IBC with Georgia amendments, enforced by Augusta-Richmond County",
    energy: "Georgia State Minimum Standard Energy Code, based on the 2015 IECC with Georgia supplements and amendments; ASHRAE 90.1 alternate path",
    amendments: "Georgia's mandatory state code establishes the commercial baseline; Augusta-Richmond County adds local administrative, zoning, site, floodplain, and stormwater requirements. The parcel's flood zone and overlay status should be checked separately from the building-code analysis.",
  },
  utilities: {
    electric: "Augusta Utilities provides electric service in its service area; Georgia Power also serves portions of the region, so the parcel provider must be confirmed",
    notes: "Augusta Utilities coordinates water, wastewater, and electric service where available. Large industrial, medical, or campus projects should confirm capacity, fire flow, extension requirements, and utility easements before fixing site plans.",
  },
  climateNotes: "Augusta is in warm-humid ASHRAE climate zone 3A, with long cooling seasons, latent loads, intense rainfall, severe thunderstorms, and occasional river or creek flood exposure. Red-clay and alluvial soils make drainage and geotechnical conditions parcel-specific.",
  marketNotes: "Augusta's market combines the Savannah River Site and cybersecurity/technology activity, Fort Eisenhower-related development, healthcare and higher education, manufacturing, logistics, and medical expansion. Campus and industrial work makes utility capacity, site drainage, and reliable mechanical systems recurring early design issues.",
  narratives: {
    mep: "Augusta MEP design starts with 3A humidity control and long cooling seasons, then adds the reliability and process requirements of medical, military-adjacent, technology, and manufacturing facilities. We verify whether Augusta Utilities or Georgia Power serves the parcel, confirm capacity and transformer requirements early, and coordinate the Georgia-amended energy-code documentation with the local building review.",
    structural: "Augusta structural work uses the Georgia-amended 2018 IBC, moderate inland wind, and generally low seismic demand, while the geotechnical report governs variable Piedmont and river-valley soils. Heavy rain, severe storms, floodplain elevations, rooftop equipment, and campus utility structures are coordinated into one continuous load and resilience strategy.",
    civil: "Civil design in Augusta must address intense rainfall, red-clay erosion, floodplain mapping, and local stormwater and utility requirements. We establish grading, detention, outfalls, erosion control, finished floors, fire flow, and water/wastewater extensions with Augusta reviewers before the building footprint is treated as final.",
    energy: "Augusta commercial energy compliance follows Georgia's amended 2015 IECC baseline, with ASHRAE 90.1 available as an alternate. In 3A, low-SHGC glazing, air sealing, shading, efficient part-load cooling, and dehumidification generally matter more than simply adding insulation; the selected path is reconciled across envelope, HVAC, and lighting.",
  },
  faqs: [
    { q: "What commercial building code applies in Augusta?", a: "Augusta-Richmond County enforces Georgia's State Minimum Standard Codes, including the 2018 IBC with Georgia amendments. Local zoning, site, floodplain, stormwater, and fire requirements remain additional reviews." },
    { q: "Which utility serves an Augusta commercial site?", a: "Augusta Utilities serves its electric, water, and wastewater territories, while Georgia Power serves portions of the broader region. Confirm the parcel provider and available capacity before sizing service or finalizing utility corridors." },
    { q: "What climate issue drives Augusta MEP design?", a: "The warm-humid 3A climate creates long cooling seasons and meaningful latent loads. Dehumidification, envelope air control, efficient part-load operation, and storm resilience should be coordinated rather than selected independently." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 76, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.augustaga.gov/303/Planning-Development"],
      codes: ["https://www.augustaga.gov/190/Construction"],
      amendments: ["https://dca.georgia.gov/community-assistance/construction-codes/current-state-minimum-codes-construction"],
      utilities: ["https://www.augustaga.gov/3178/Utilities"],
      climate: ["https://www.weather.gov/cae/"],
      market: ["https://www.augustaga.gov/871/Economic-Development"],
    },
  },
};