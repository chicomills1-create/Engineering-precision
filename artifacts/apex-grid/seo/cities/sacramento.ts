import type { CityData } from "../types";

export const sacramento: CityData = {
  slug: "sacramento",
  name: "Sacramento",
  stateSlug: "california",
  county: "Sacramento County",
  ahj: {
    office: "City of Sacramento Community Development Department, Building Division",
    process:
      "The Building Division uses the City's online permitting and electronic-plan-review services for commercial applications, routing plans to building, fire, planning, public works, and utilities as the scope requires. Applicants should establish whether a project is a building-only permit or needs planning and public-improvement approvals, because those parallel reviews control the overall entitlement-to-permit sequence.",
  },
  codes: {
    building: "2022 Sacramento City Building Code, based on the 2022 California Building Code (2021 IBC) with local amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), with 2022 CALGreen and City of Sacramento local energy/reach-code provisions",
    amendments:
      "Sacramento City Code adopts the California Building Standards Code with local amendments. City green-building and electrification provisions, stormwater design standards, and floodplain rules can add requirements beyond the base CBC/Title 24 path; applicability should be verified for the parcel and permit valuation.",
  },
  utilities: {
    electric: "Sacramento Municipal Utility District (SMUD); City of Sacramento Department of Utilities provides water, wastewater, and stormwater services in much of the city",
    notes:
      "SMUD is a community-owned electric utility with its own service-planning, interconnection, rate, and electrification programs, distinct from PG&E territories outside its service area. The Department of Utilities' water, sewer, drainage, and recycled-water coordination is an early civil constraint, particularly for larger infill and industrial sites.",
  },
  climateNotes:
    "Sacramento's inland Mediterranean climate (ASHRAE 3B/California climate zone 12) has hot, dry summers, cool wet winters, and a large diurnal swing that supports nighttime cooling strategies. River and levee flood risk, wildfire smoke, extreme heat, and potentially liquefiable river-adjacent soils are key site-specific hazards.",
  marketNotes:
    "As California's capital, Sacramento has sustained public-sector, courthouse and institutional work alongside healthcare, higher education, multifamily infill, logistics, and food-related distribution. Downtown and rail-corridor development often meets older utilities and floodplain constraints, while the broader region continues to add industrial and warehouse space.",
  narratives: {
    mep:
      "Sacramento MEP design balances hot zone-12 cooling peaks with cool nights that can support economizer or night-flush operation when smoke conditions permit. Government, healthcare, and higher-education occupancies often make resilience, controls, ventilation, and phased renovation more important than a standard speculative-office template. SMUD's locally administered service and electrification programs should be considered with the project one-line from early design, while Department of Utilities capacity and meter placement need coordination for campus, multifamily, and process-water projects.",
    structural:
      "Sacramento projects follow the 2022 CBC seismic provisions, but the geotechnical question is highly location-dependent: river-adjacent alluvium, fills, and a high groundwater table can drive liquefaction, settlement, and lateral-spread analysis. Flood and levee exposure also affect finished-floor and critical-equipment decisions. For civic renovations and older downtown structures, we investigate the existing lateral system and diaphragm before adding rooftop equipment or changing occupancy; Building Division review and special-inspection requirements are then integrated into the electronic permit package.",
    civil:
      "Civil engineering in Sacramento is inseparable from the Sacramento and American River floodplain and the City's drainage standards. We coordinate grading, finished floors, stormwater treatment/detention, and utility layout early so floodplain constraints do not become a late architectural compromise. The Department of Utilities governs water, wastewater, and stormwater connections, while public-frontage and street work needs City engineering coordination; for large parcels, recycled-water availability and irrigation demand deserve evaluation alongside domestic and fire service.",
    energy:
      "Sacramento energy analysis uses 2022 Title 24 and CALGreen while checking the City's local reach-code provisions and SMUD's current electrification landscape. The hot-dry zone rewards exterior shading, low solar-heat-gain glazing, efficient heat pumps, heat recovery where appropriate, lighting controls, and demand management; cool nights can reduce plant energy only when air quality allows outdoor-air strategies. We align the Title 24 model with actual operating schedules and SMUD service/interconnection assumptions so solar, storage, EV charging, and electrical capacity are designed as one system.",
  },
  faqs: [
    {
      q: "Who reviews commercial building permits in Sacramento?",
      a: "The City of Sacramento Community Development Department's Building Division is the building-permit authority and uses the City's online permit and electronic-plan-review process. Commercial projects can also be routed to Planning, Fire, Public Works, and the Department of Utilities, depending on their site and scope.",
    },
    {
      q: "Is SMUD or PG&E the electric utility in Sacramento?",
      a: "SMUD serves the City of Sacramento and is the electric utility for most city projects; it has its own new-service and interconnection process. PG&E serves many surrounding Northern California areas, so utility territory should be verified from the project address rather than assumed from the regional market.",
    },
    {
      q: "Do Sacramento projects need floodplain analysis?",
      a: "Many do, particularly near the Sacramento and American Rivers or behind levee systems. FEMA mapping, City floodplain requirements, site elevations, and the geotechnical report inform finished-floor, drainage, utility, and critical-equipment decisions; flood risk should be screened before the site plan is fixed.",
    },
  ],
};