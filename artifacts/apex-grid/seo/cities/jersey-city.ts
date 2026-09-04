import type { CityData } from "../types";

export const jerseyCity: CityData = {
  slug: "jersey-city",
  name: "Jersey City",
  stateSlug: "new-jersey",
  county: "Hudson County",
  ahj: {
    office: "City of Jersey City Division of Construction Code Official",
    process: "The Division of Construction Code Official administers construction permits under New Jersey's Uniform Construction Code through the City's online permitting process. Zoning, planning-board or historic review, fire, Jersey City Municipal Utilities Authority coordination, and public-right-of-way approvals can be separate tracks; waterfront and flood-prone sites may also require NJDEP approvals.",
  },
  codes: {
    building: "New Jersey Uniform Construction Code, based on the 2021 IBC with New Jersey amendments (N.J.A.C. 5:23)",
    energy: "New Jersey energy subcode: 2021 IECC or ASHRAE 90.1-2019",
    amendments: "Jersey City enforces the statewide UCC rather than a different local technical building-code edition. Its zoning, redevelopment plans, flood-damage-prevention requirements, streetscape/right-of-way rules, and local utility requirements can materially change a project's approvals and site design.",
  },
  utilities: {
    electric: "Public Service Electric and Gas Company (PSE&G)",
    notes: "PSE&G supplies electric and gas service and coordinates new service, transformer/secondary capacity, and distributed-energy interconnection. The Jersey City Municipal Utilities Authority operates water and wastewater systems; utility connections must be coordinated with dense subsurface infrastructure and public-right-of-way work.",
  },
  climateNotes: "Jersey City is in mixed-humid climate zone 4A, with humid summers, winter freeze-thaw, nor'easters, and wind-driven rain. Hudson River waterfront and low-lying areas face coastal flood, storm-surge, and sea-level-rise exposure, while filled land and variable urban soils can require specialized foundation and groundwater investigation.",
  marketNotes: "Jersey City's construction market is defined by transit-oriented high-rise residential and office development, adaptive reuse, waterfront redevelopment, and logistics or infrastructure work tied to the Port of New York and New Jersey region. Tight sites, active rail and street networks, former industrial land, and flood-resilience needs make entitlement, remediation, utilities, and construction sequencing central to feasibility.",
  narratives: {
    mep: "Jersey City MEP design combines a 4A mixed-humid climate with the practical limits of high-rise and waterfront utility infrastructure. We coordinate PSE&G load letters, service location, secondary capacity, gas decisions, and any distributed-energy interconnection before equipment rooms and standby systems are fixed, while JCMUA water and sewer connections require an equally early plan. The statewide UCC energy subcode permits the 2021 IECC or ASHRAE 90.1-2019 path; for dense towers and reuse projects, that compliance work must fit actual shafts, risers, ventilation routes, and flood-resilient equipment elevations.",
    structural: "Jersey City structural design uses the 2021 IBC as amended through New Jersey's UCC, but the site investigation often controls the real solution. Filled waterfront ground, variable urban soils, high groundwater, and flood exposure can drive deep foundations, dewatering, corrosion protection, and elevated critical systems; wind loads are consequential for tall buildings on the Hudson. Dense party-line conditions also make underpinning, excavation support, neighbor protection, and construction monitoring fundamental design tasks rather than downstream means-and-methods assumptions.",
    civil: "Jersey City civil engineering coordinates local land-use and right-of-way processes with JCMUA infrastructure and NJDEP requirements. Combined-sewer areas, constrained streets, waterfront flood exposure, and limited open space make drainage, utility routing, and detention or green-infrastructure siting unusually interdependent. We screen Flood Hazard Area, waterfront, and former-industrial conditions early, then coordinate stormwater under New Jersey rules, soil-conservation erosion control, remediation interfaces, and the public improvements that a redevelopment plan may require.",
    energy: "Jersey City commercial energy compliance follows New Jersey's statewide energy subcode—2021 IECC or ASHRAE 90.1-2019—not a city-only energy code. In mixed-humid 4A conditions, airtight and continuously insulated façades, thermal-bridge control, solar-tuned glazing, heat recovery, and humidity control have to work together, particularly in high-rise envelopes. We coordinate the selected compliance path with PSE&G service capacity, electrification choices, lighting controls, and flood-resilient placement of electrical and mechanical systems, while treating NJ Clean Energy incentives as separate from permit compliance.",
  },
  faqs: [
    { q: "Which building and energy codes apply in Jersey City?", a: "Jersey City enforces New Jersey's statewide Uniform Construction Code, based on the 2021 IBC with state amendments. Commercial energy compliance uses the New Jersey energy subcode through the 2021 IECC or ASHRAE 90.1-2019 path." },
    { q: "Who provides electric, water, and sewer service in Jersey City?", a: "PSE&G provides electric and gas service. The Jersey City Municipal Utilities Authority operates water and wastewater systems; service, capacity, connection, and right-of-way coordination should begin early on dense redevelopment sites." },
    { q: "What makes Jersey City waterfront engineering different?", a: "Hudson River waterfront and low-lying sites can face coastal flood and storm-surge exposure, high groundwater, filled land, and variable soils. NJDEP flood or waterfront approvals, foundation investigation, resilient equipment elevation, and constrained utility routing can affect the critical path." },
  ],
};