import type { CityData } from "../types";

export const columbus: CityData = {
  slug: "columbus",
  name: "Columbus",
  stateSlug: "ohio",
  county: "Franklin County",
  ahj: {
    office: "City of Columbus Department of Building and Zoning Services",
    process:
      "Columbus accepts building applications, drawings, payments, and permit-status activity through its online permitting services; commercial work is routed for building, zoning, fire, utilities, and site-related review as applicable. The city enforces the statewide Ohio Building Code, while zoning clearance, right-of-way work, and utility connections are separate City review tracks that should be coordinated before a complete submittal.",
  },
  codes: {
    building: "Ohio Building Code, 2024 edition (based on the 2021 IBC), enforced by the City of Columbus",
    energy: "Ohio Building Code commercial energy provisions based on the 2021 IECC; ASHRAE 90.1 is an alternate compliance path",
    amendments:
      "Columbus applies the mandatory statewide Ohio Building Code through its certified building department; local zoning, fire, utility, and site-development requirements remain project-specific. Downtown and campus projects commonly add historic-district, downtown-design, utility, or public-right-of-way coordination rather than a substitute city building-code edition.",
  },
  utilities: {
    electric: "AEP Ohio is the electric distribution utility for Columbus",
    notes:
      "AEP Ohio new-service and distributed-generation requests require utility coordination; large loads should be screened for feeder and transformer capacity early. The City of Columbus Department of Public Utilities provides water and sanitary/stormwater services, and Columbia Gas of Ohio serves natural gas in much of the city.",
  },
  climateNotes:
    "Columbus is in ASHRAE climate zone 5A (cool-humid): cold, freeze-thaw winters and humid summers make heating, pipe freeze protection, moisture control, snow drift, and rain-driven drainage practical design inputs. Central Ohio's glacial tills and clays can drain poorly, so a site-specific geotechnical and infiltration evaluation is consequential.",
  marketNotes:
    "Central Ohio's construction pipeline includes the Intel semiconductor campus and associated supplier ecosystem in the New Albany/Licking County area, major hyperscale data-center development, and continuing logistics investment along the I-70/I-71 corridors. Columbus also has durable healthcare, university, research, and downtown mixed-use demand, creating both greenfield utility-capacity work and complex urban retrofit work.",
  narratives: {
    mep:
      "Columbus MEP work combines climate-zone-5A heating and freeze-protection needs with humid-summer ventilation and dehumidification. AEP Ohio service capacity is a front-end decision for data-intensive, laboratory, and advanced-manufacturing loads, not simply a late electrical application; we establish load, redundancy, generator, and utility-service assumptions alongside the owner’s process requirements. The Ohio Building Code’s 2021-IECC energy provisions govern the commercial baseline, while City water and sanitary connections need parallel coordination. For healthcare, research, and data-center-adjacent facilities, the mechanical sequence, humidity control, standby power, and plant phasing are developed as an operating system rather than isolated permit sheets.",
    structural:
      "Columbus structural design is principally governed by gravity, wind, snow, and frost rather than high seismic demand; Ohio sites are typically low seismic design category, but the site-specific code analysis still controls. Roof snow and drift, wind uplift during severe thunderstorms, and foundations below frost depth require deliberate detailing in the 5A climate. Glacial till, clay, variable fill, and localized high groundwater make a geotechnical report central to slab, pavement, and foundation recommendations. The statewide 2024 Ohio Building Code supplies the structural code basis, while dense downtown, campus, and adaptive-reuse projects also require careful existing-condition investigation and City special-inspection coordination.",
    civil:
      "Civil engineering in Columbus starts with the City’s stormwater and utility review, not a generic detention sketch. The City of Columbus Stormwater Drainage Manual and Department of Public Utilities connection requirements shape drainage, water, and sanitary design; Ohio EPA construction-stormwater coverage and a SWPPP apply to qualifying land disturbance. On the city’s flat-to-rolling, clay-influenced sites, freeze-thaw, limited infiltration, and downstream capacity can affect grading and basin selection. We reserve conveyance, water-quality, and utility corridors early, then coordinate any street, curb, or right-of-way work with the City’s transportation and utility reviewers.",
    energy:
      "Commercial energy documentation in Columbus is prepared to the Ohio Building Code’s 2021-IECC provisions, or the permitted ASHRAE 90.1 alternate path, rather than an assumed city-only energy code. In cold-humid zone 5A, continuous insulation, air-barrier continuity, high-performance fenestration, efficient heating, and controlled outside air have outsized impact on winter energy and condensation risk. For high-load data, research, and healthcare facilities, we reconcile envelope and lighting compliance with real cooling, ventilation, resilience, and AEP Ohio service constraints. That integrated approach produces a permit-ready compliance package while avoiding the false economy of designing only to a minimum code line item.",
  },
  faqs: [
    {
      q: "Which building and energy codes apply to a commercial project in Columbus?",
      a: "Columbus enforces Ohio’s mandatory 2024 Ohio Building Code, based on the 2021 IBC. Its commercial energy provisions are based on the 2021 IECC, with ASHRAE 90.1 available as an alternate path; zoning, fire, utility, and site requirements are reviewed separately by the City.",
    },
    {
      q: "Who provides electric and water service in Columbus?",
      a: "AEP Ohio provides electric distribution service. The City of Columbus Department of Public Utilities provides municipal water and sanitary/stormwater services. Large new electrical loads and new utility connections need early capacity and routing coordination rather than waiting for permit issuance.",
    },
    {
      q: "What makes Columbus site and foundation design different?",
      a: "Cold winters bring frost and freeze-thaw exposure, while glacial clays and till can limit infiltration and create variable bearing or groundwater conditions. Columbus drainage and utility review, the City Stormwater Drainage Manual, and Ohio EPA construction-stormwater requirements should be addressed with geotechnical information early in layout.",
    },
  ],
};