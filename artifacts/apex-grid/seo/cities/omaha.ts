import type { CityData } from "../types";

export const omaha: CityData = {
  slug: "omaha",
  name: "Omaha",
  stateSlug: "nebraska",
  county: "Douglas County",
  ahj: {
    office: "City of Omaha Planning Department, Permits and Inspections Division",
    process:
      "Omaha Permits and Inspections administers commercial building permits, plan review, and inspections through the city’s online permit services. Building review is coordinated with planning, public works, fire, and utility requirements as needed; projects in floodplain areas or with public infrastructure work require the corresponding engineering and floodplain review before permits can be finalized.",
  },
  codes: {
    building: "2018 International Building Code, adopted by the City of Omaha with local amendments",
    energy: "2018 International Energy Conservation Code, commercial provisions, adopted by the City of Omaha",
    amendments:
      "Omaha administers a locally adopted 2018 I-Code package with city amendments, even though Nebraska supplies a statewide baseline. Building-code review is distinct from city public-works, access, drainage, and floodplain requirements, which can control a development schedule on large sites.",
  },
  utilities: {
    electric: "Omaha Public Power District (OPPD) provides public electric service; Metropolitan Utilities District (M.U.D.) provides natural gas and water service in Omaha",
    notes:
      "OPPD should be engaged for load studies, service location, substation/feeder capacity, and distributed-generation interconnection. M.U.D. water and gas main availability, fire-flow, pressure, and extension requirements are key early inputs; sanitary and stormwater connections are coordinated with City Public Works.",
  },
  climateNotes:
    "Omaha is climate zone 5A, with cold winters, hot humid summers, severe thunderstorms, hail, tornado exposure, and substantial freeze-thaw cycling. Missouri River floodplain conditions, rolling loess bluffs, and local drainageways make site-specific geotechnical and floodplain analysis essential.",
  marketNotes:
    "Omaha’s construction economy includes data centers and other large power users, finance and insurance offices, healthcare, higher education, logistics along I-80 and Eppley air-cargo corridors, and redevelopment in the downtown riverfront and urban core. Public power makes early electrical-capacity conversations especially important for data-intensive and advanced-manufacturing programs.",
  narratives: {
    mep:
      "Omaha MEP design must span a cold 5A winter, humid summer cooling, and severe-weather operation. Freeze protection, heating-plant selection, humidification or dehumidification where the program warrants it, and resilient controls are integrated with—not appended to—the 2018 IECC compliance package. OPPD’s public-power network is a major advantage for the city’s large-load economy, but available capacity, service voltage, routing, and lead time remain site-specific; we establish them during schematic design. M.U.D. water, gas, pressure, and fire-flow data likewise inform equipment, fire protection, and domestic-water decisions before the permit set is fixed.",
    structural:
      "Omaha structures are designed around plains wind, snow, hail, frost, and soils rather than a seismic-dominated lateral system. The locally adopted 2018 IBC requires the site-specific wind speed, exposure, roof-zone pressure, cladding, and rooftop-equipment anchorage to be established; ordinary code wind resistance is distinct from an owner-selected ICC 500 tornado refuge. A geotechnical report is central on Omaha’s loess bluffs and variable alluvial ground, where erosion, settlement, slope stability, or moisture-sensitive soils can govern foundation and retaining strategy. Snow drift, freeze-thaw exposure, and roughly 42-inch frost depth inform roof, footing, and exterior detailing.",
    civil:
      "Omaha civil engineering starts with topography and receiving waters. Steep loess terrain can accelerate erosion and constrain grading, while the Missouri River and mapped tributary floodplains trigger floodplain elevation and no-rise considerations. We coordinate access, paving, public infrastructure, detention, water/sewer connections, and outfall feasibility with City Public Works and Permits and Inspections, then design the SWPPP and erosion controls required by Nebraska’s NPDES construction-stormwater program for disturbances of one acre or more. In older districts, combined-sewer or legacy-utility constraints are verified before promising an infiltration or basement strategy.",
    energy:
      "Omaha’s commercial 2018 IECC compliance is a balanced climate-zone 5A problem: continuous insulation, a reliable air barrier, high-performance glazing, heating efficiency, and cooling/dehumidification controls all earn their place. We select prescriptive COMcheck or whole-building modeling based on the actual envelope, lighting, process, and data loads, and submit a coordinated package to the city’s review workflow. For data centers and other high-load facilities, code minimums are only the start—OPPD capacity, cooling-water or air-side strategy, redundancy, and electrical distribution losses should be evaluated alongside the building model. M.U.D. gas and water availability can change the feasible HVAC path.",
  },
  faqs: [
    {
      q: "What commercial codes does Omaha enforce?",
      a: "Omaha enforces a locally adopted 2018 I-Code package, including the 2018 IBC and commercial 2018 IECC, with city amendments. The City of Omaha Planning Department’s Permits and Inspections Division administers review; public-works, floodplain, and site requirements are separate approvals.",
    },
    {
      q: "Who provides electric, gas, and water service in Omaha?",
      a: "OPPD provides electric service, and M.U.D. provides natural gas and water service in Omaha. City Public Works coordinates sanitary and stormwater connections. Confirm capacity, pressure, routing, extensions, and interconnection requirements for the exact site early in design.",
    },
    {
      q: "What site hazards should Omaha developments evaluate?",
      a: "Projects should evaluate Missouri River and tributary floodplain mapping, intense storm runoff, erosion on loess terrain, variable soils, deep frost, wind, hail, and tornado exposure. A geotechnical investigation and early drainage/outfall study are fundamental, especially on sloped or river-adjacent sites.",
    },
  ],
};