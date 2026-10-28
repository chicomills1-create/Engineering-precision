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
    mep: "Augusta MEP design starts with 3A humidity control and long cooling seasons, then adds the reliability and process requirements of medical, military-adjacent, technology, and manufacturing facilities. We verify whether Augusta Utilities or Georgia Power serves the parcel, confirm capacity and transformer requirements early, and coordinate the Georgia-amended energy-code documentation with the local building review. The workload is anchored by institutions that cannot tolerate downtime: the medical district's hospitals and clinics run around the clock, with emergency-power coverage and infection-control constraints shaping every renovation; Fort Eisenhower's cyber and training missions drive secure, cooling-dense facilities; and the Savannah River Site workforce sustains steady industrial and office demand across the river corridor. Hotel and event work peaks hard around the Masters tournament, so hospitality MEP is sized for surge occupancy rather than average days, and shutdowns and tie-ins are sequenced around occupied operations and documented before any system is taken offline. Humidity is the standing enemy: dedicated outdoor-air capacity, dehumidification, tight envelope coordination, and corrosion-aware material choices matter as much as tonnage in the 3A climate, especially in schools, hotels, and medical space. Every package is also checked against the parcel's flood and stormwater exposure before submittal, because a mechanical yard, electrical service entrance, or standby generator placed against the river corridor's drainage patterns becomes a redesign at the counter instead of a comment response.",
    structural: "Augusta structural work uses the Georgia-amended 2018 IBC, moderate inland wind, and generally low seismic demand, while the geotechnical report governs variable Piedmont and river-valley soils. Heavy rain, severe storms, floodplain elevations, rooftop equipment, and campus utility structures are coordinated into one continuous load and resilience strategy.",
    civil: "Civil design in Augusta must address intense rainfall, red-clay erosion, floodplain mapping, and local stormwater and utility requirements. We establish grading, detention, outfalls, erosion control, finished floors, fire flow, and water/wastewater extensions with Augusta reviewers before the building footprint is treated as final.",
    energy: "Augusta commercial energy compliance follows Georgia's amended 2015 IECC baseline, with ASHRAE 90.1 available as an alternate. In 3A, low-SHGC glazing, air sealing, shading, efficient part-load cooling, and dehumidification generally matter more than simply adding insulation; the selected path is reconciled across envelope, HVAC, and lighting.",
  },
  faqs: [
    { q: "What commercial building code applies in Augusta?", a: "Augusta-Richmond County enforces Georgia's State Minimum Standard Codes, including the 2018 IBC with Georgia amendments. Local zoning, site, floodplain, stormwater, and fire requirements remain additional reviews." },
    { q: "Which utility serves an Augusta commercial site?", a: "Augusta Utilities serves its electric, water, and wastewater territories, while Georgia Power serves portions of the broader region. Confirm the parcel provider and available capacity before sizing service or finalizing utility corridors." },
    { q: "What climate issue drives Augusta MEP design?", a: "The warm-humid 3A climate creates long cooling seasons and meaningful latent loads. Dehumidification, envelope air control, efficient part-load operation, and storm resilience should be coordinated rather than selected independently." },
    { q: "What drives MEP design for Augusta hospitals and secure facilities?", a: "Continuous operation. Hospital and secure-facility projects in Augusta are usually renovations inside occupied buildings, so the MEP scope is defined by phased shutdowns, emergency-power coverage, infection-control barriers, and documented tie-in sequences — designed and permitted before any system is taken offline." },
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