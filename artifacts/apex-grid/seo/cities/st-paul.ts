import type { CityData } from "../types";

export const stPaul: CityData = {
  slug: "st-paul",
  name: "St. Paul",
  stateSlug: "minnesota",
  county: "Ramsey County",
  ahj: {
    office: "City of Saint Paul Department of Safety and Inspections (DSI)",
    process: "DSI administers building permits and commercial plan review through the City's online permitting system. Site plans can also require review by Saint Paul Public Works, the applicable watershed district, zoning, fire, and—in designated areas—heritage preservation; utility and right-of-way approvals are coordinated separately from the building permit.",
  },
  codes: {
    building: "2020 Minnesota State Building Code, based on the 2018 IBC, with Minnesota and Saint Paul administrative amendments",
    energy: "2020 Minnesota Commercial Energy Code, based on ASHRAE 90.1-2019 with Minnesota amendments",
    amendments: "Saint Paul applies the mandatory Minnesota code framework through its local permitting and administrative ordinances. The City also has a commercial building energy benchmarking ordinance; benchmarking is an operating requirement for covered buildings and does not replace permit-time energy-code compliance.",
  },
  utilities: {
    electric: "Xcel Energy",
    notes: "Xcel Energy provides electric and natural-gas service and administers new-service and distributed-energy interconnection requests. Saint Paul Regional Water Services supplies water; Saint Paul Public Works manages sewer/stormwater infrastructure, with watershed-district requirements also applying by location.",
  },
  climateNotes: "St. Paul is in severe cold climate zone 6A, with long heating seasons, deep frost, heavy snow, freeze-thaw exposure, and humid summers. Mississippi River bluff and floodplain locations, variable urban fill, high groundwater, and clay soils can materially affect foundation and stormwater design.",
  marketNotes: "St. Paul's construction work includes state-government and institutional facilities, healthcare, higher education, multifamily and mixed-use infill, and renovation of historic downtown and riverfront buildings. Aging infrastructure, cold-climate retrofit work, and constrained urban parcels make existing conditions and utility coordination recurring project drivers.",
  narratives: {
    mep: "St. Paul MEP systems are designed around a genuine 6A winter: heating reliability, freeze protection, heat recovery, and condensation control are first-order decisions, not add-ons to summer cooling. We coordinate Xcel Energy electric and gas service, electrification capacity, and any distributed-energy interconnection with Saint Paul Regional Water Services and Public Works connections early. In historic and downtown renovations, field verification of existing electrical, hydronic, ventilation, and shaft conditions keeps a high-performance replacement plant from becoming an unbuildable permit concept.",
    structural: "St. Paul structural work is governed chiefly by snow, drift, wind, and frost under the 2020 Minnesota State Building Code; seismic demand is low. Roof steps and adjacent taller walls can make unbalanced snow and drift govern, while foundations must address deep frost, frost heave, clay, fill, and groundwater. Mississippi River bluff and floodplain sites add slope-stability or flood-resilience questions, and dense historic work needs verified existing masonry and framing before new rooftop equipment or additions are assigned loads.",
    civil: "Saint Paul civil design coordinates DSI review with Public Works water, sewer, stormwater, and right-of-way requirements and the applicable watershed district. Deep frost, tight soils, groundwater, and snow storage limit the real-world performance and maintenance of infiltration practices, while Mississippi River floodplain and bluff sites can constrain grading and outfalls. We establish utility corridors, snowmelt routing, treatment footprint, and erosion-control needs early rather than assuming a generic underground detention or infiltration solution will fit.",
    energy: "Saint Paul commercial energy documentation follows the 2020 Minnesota Commercial Energy Code, based on ASHRAE 90.1-2019 with state amendments. In climate zone 6A, airtightness, continuous insulation, thermal-bridge control, high-performance glazing, and energy recovery address both high heating energy and condensation risk. We coordinate envelope, lighting, controls, and heating-plant choices with Xcel service constraints, then distinguish permit compliance from Saint Paul's separate benchmarking obligations for covered buildings.",
  },
  faqs: [
    { q: "What building and energy codes apply in St. Paul?", a: "St. Paul applies the 2020 Minnesota State Building Code, based on the 2018 IBC, and the 2020 Minnesota Commercial Energy Code, based on ASHRAE 90.1-2019 with Minnesota amendments. DSI administers building permits, while local site and utility approvals can proceed separately." },
    { q: "Who provides utilities in St. Paul?", a: "Xcel Energy provides electric and natural-gas service. Saint Paul Regional Water Services provides water, while Saint Paul Public Works manages sewer and stormwater infrastructure; the applicable watershed district may add review requirements." },
    { q: "What structural conditions govern St. Paul projects?", a: "Snow, drift, wind, and deep frost commonly govern, with frost heave, clay, fill, and groundwater influencing foundations. Mississippi River bluff or floodplain locations can add slope-stability and flood-resilience requirements." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 83, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.stpaul.gov/departments/safety-inspections"],
      codes: ["https://www.dli.mn.gov/business/codes-and-laws/2020-minnesota-state-building-code"],
      amendments: ["https://www.stpaul.gov/departments/safety-inspections"],
      utilities: ["https://www.xcelenergy.com/", "https://www.stpaul.gov/departments/saint-paul-regional-water-services"],
      climate: ["https://www.weather.gov/mpx/"],
      market: ["https://www.stpaul.gov/departments/planning-and-economic-development"],
    },
  },
};