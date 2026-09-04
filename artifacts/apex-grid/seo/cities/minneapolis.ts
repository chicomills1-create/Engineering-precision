import type { CityData } from "../types";

export const minneapolis: CityData = {
  slug: "minneapolis",
  name: "Minneapolis",
  stateSlug: "minnesota",
  county: "Hennepin County",
  ahj: {
    office: "City of Minneapolis Community Planning & Economic Development (CPED), Construction Code Services",
    process: "CPED accepts commercial permit applications and electronic plans through the City's ePermits system and coordinates building review with zoning, fire, public works, and utility requirements. Complex commercial and development proposals can use preliminary development review; separate Public Works approvals apply to site, sewer, water, and right-of-way work.",
  },
  codes: {
    building: "2020 Minnesota State Building Code, based on the 2018 IBC, with Minneapolis ordinances and amendments",
    energy: "2020 Minnesota Commercial Energy Code, based on ASHRAE 90.1-2019 with Minnesota amendments",
    amendments: "Minneapolis enforces the state building-code framework with local administrative and ordinance provisions. The city's Truth in Sale of Housing program is residential, while commercial owners should separately account for Minneapolis Building Energy Benchmarking and the city's emissions-reduction policy work; neither replaces energy-code compliance at permit.",
  },
  utilities: {
    electric: "Xcel Energy",
    notes: "Xcel Energy serves electricity and gas in Minneapolis and coordinates new service and distributed-energy interconnection. Minneapolis Public Works provides water and sanitary sewer and reviews stormwater and right-of-way connections; downtown and redevelopment sites require early utility-location and capacity coordination.",
  },
  climateNotes: "Minneapolis is in a severe cold 6A climate, with long heating seasons, large temperature swings, wind, heavy snow, deep frost, and humid summers. Mississippi River floodplain conditions, high groundwater in some areas, clay soils, and snowmelt drainage materially affect site and foundation work.",
  marketNotes: "Minneapolis construction is sustained by healthcare and medical-device facilities, corporate headquarters, higher education, multifamily infill, public infrastructure, food and industrial users, and redevelopment of older downtown and riverfront buildings. Cold-climate retrofit, district-energy interfaces, and building-performance expectations are recurring considerations rather than niche issues.",
  narratives: {
    mep: "Minneapolis MEP systems are sized for a real 6A winter: freeze protection, dependable heating, energy recovery, humidification or condensation control where required, and resilient sequences matter before summer cooling is considered. The 2020 Minnesota Commercial Energy Code is the permit baseline; we coordinate Xcel electric service, gas decisions, electrification capacity, and any distributed-energy interconnection early. In dense renovations, existing steam, hydronic, electrical, and shaft constraints deserve field validation before a high-performance replacement plant is promised.",
    structural: "Minneapolis structural work is driven by snow, drift, wind, and frost rather than seismic. Under the 2020 Minnesota State Building Code, roof geometry and adjacent height changes can make drift and unbalanced snow govern, while foundation and slab details must deal with deep frost, frost heave, variable fill, clay, and groundwater. Riverfront or low-lying sites also need floodplain review; on existing-building additions we verify old framing and roof capacity before placing new mechanical equipment.",
    civil: "Minneapolis civil design coordinates CPED permitting with Public Works site, water, sewer, stormwater, and right-of-way processes. The city's Stormwater Management Program emphasizes volume reduction and water quality, but cold climate, tight soils, frost, and snow storage constrain how infiltration and bioretention perform in practice. We reserve room for treatment, snowmelt routing, and utilities early and evaluate Mississippi floodplain or high-groundwater limits before assuming an underground or infiltrating solution is feasible.",
    energy: "Commercial energy design in Minneapolis follows the 2020 Minnesota Commercial Energy Code, based on ASHRAE 90.1-2019 with state amendments. In climate zone 6A, air-barrier continuity, continuous insulation, thermal-bridge control, high-performance glazing, and energy recovery have exceptional value because winter losses and condensation risk are so high. We use modeling or the applicable compliance path to coordinate envelope, lighting, and plant choices, then distinguish that permit deliverable from Minneapolis benchmarking obligations for covered buildings and Xcel incentive opportunities.",
  },
  faqs: [
    { q: "What commercial building and energy codes apply in Minneapolis?", a: "Minneapolis applies the 2020 Minnesota State Building Code, based on the 2018 IBC, and the 2020 Minnesota Commercial Energy Code, based on ASHRAE 90.1-2019 with Minnesota amendments. CPED administers building permits, while local site, utility, and ordinance reviews can run in parallel." },
    { q: "What loads control structural design in Minneapolis?", a: "Snow, drift, wind, and frost commonly control. Heavy snow and unbalanced drifts can govern roofs, while deep frost, frost heave, clay, fill, and groundwater influence foundations and slabs. Seismic demand is generally low, but riverfront sites can add floodplain requirements." },
    { q: "Who provides utilities in Minneapolis?", a: "Xcel Energy provides electric and gas service and coordinates interconnection. Minneapolis Public Works provides water and sanitary sewer and reviews stormwater and right-of-way work. Capacity and utility congestion should be addressed early on downtown and redevelopment projects." },
  ],
};