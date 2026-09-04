import type { CityData } from "../types";

export const newOrleans: CityData = {
  slug: "new-orleans",
  name: "New Orleans",
  stateSlug: "louisiana",
  county: "Orleans Parish",
  ahj: {
    office: "City of New Orleans Department of Safety and Permits",
    process:
      "Safety and Permits accepts permit applications and plan documents through its One Stop for Permits and Licenses portal. Commercial work can require coordinated building, zoning, fire, historic-district, floodplain, public-works, and drainage review; the Department of Public Works separately administers right-of-way and drainage-related approvals where applicable.",
  },
  codes: {
    building: "Louisiana State Uniform Construction Code, based on the 2021 International Building Code, enforced by the City of New Orleans",
    energy: "Louisiana State Uniform Construction Code commercial energy provisions based on the 2021 IECC; ASHRAE 90.1-2019 is an alternate compliance path",
    amendments:
      "New Orleans enforces the statewide LSUCC rather than a substitute municipal building-code edition, but its zoning, Historic District Landmarks Commission controls, flood-damage-prevention ordinance, and drainage/right-of-way requirements materially affect design. FEMA flood-zone data and the City's floodplain requirements can control finished-floor and equipment elevations.",
  },
  utilities: {
    electric: "Entergy New Orleans provides electric and gas service within the city",
    notes:
      "New electric service, large load additions, and distributed generation require Entergy New Orleans coordination and its interconnection process. The Sewerage and Water Board of New Orleans provides water, sanitary sewer, and drainage services; its pumped drainage system and utility availability should be evaluated alongside site layout.",
  },
  climateNotes:
    "New Orleans is hot-humid ASHRAE climate zone 2A, with long latent cooling seasons, intense rainfall, tropical-cyclone exposure, and a very high water table. Low elevations behind levees, subsidence, and FEMA flood hazards make flood-resilient datums, drainage, and foundation investigation central rather than secondary design tasks.",
  marketNotes:
    "Local construction demand spans Port NOLA and river/rail logistics, healthcare and research around the downtown medical district, hospitality and convention-related renovations, and resilient repair or elevation work. Historic neighborhoods and the French Quarter add preservation review and constrained urban utility conditions to otherwise conventional commercial projects.",
  narratives: {
    mep:
      "New Orleans MEP design starts with moisture and continuity of service. In climate zone 2A, cooling equipment must manage large latent loads, maintain sensible building pressurization, and dispose of condensate reliably; envelope leakage can become a mold and durability issue as well as an energy issue. Entergy New Orleans service capacity, standby generation, and any distributed-generation interconnection should be discussed while loads are being set, particularly for medical, hotel, and port-support uses. Electrical rooms, generators, and mechanical equipment need elevations and anchorage consistent with the project's flood exposure, while water and sewer routing must be coordinated with the Sewerage and Water Board. The LSUCC's 2021-IECC commercial provisions establish the compliance baseline, but resilient operation during heat, rain, and storm events drives the engineering decisions.",
    structural:
      "Structural work in New Orleans is governed by wind, flood, and soil behavior rather than high seismic demand. Hurricane wind design requires a continuous load path, roof-uplift detailing, protected openings where required, and durable equipment anchorage. Deltaic soils are often soft and compressible, with groundwater near grade and potential long-term settlement; a project-specific geotechnical report is therefore essential to foundation selection, buoyancy evaluation, slabs, and pavement support. FEMA flood elevations and local floodplain rules establish a structural datum that affects the lowest floor, flood openings, and equipment platforms. In historic or dense blocks, existing-condition investigation and adjacent-property protection add to that primary wind-and-water design problem.",
    civil:
      "Civil design in New Orleans cannot assume that a site will drain by gravity. The city is low, flat, and served by the Sewerage and Water Board's pumping and drainage system, so finished grades, discharge points, and allowable connections must be coordinated early with the applicable City and S&WB review requirements. Floodplain compliance can limit fill and set finished-floor elevations, while high groundwater complicates excavation, utility construction, and underground detention. Louisiana construction-stormwater permit coverage and a SWPPP apply to qualifying land disturbance. We lay out drainage, utility corridors, access, and any public-right-of-way work with the One Stop permit process in view, leaving room for the site constraints that historic districts and narrow urban parcels impose.",
    energy:
      "Commercial energy compliance in New Orleans is documented to the LSUCC provisions based on the 2021 IECC, or to the permitted ASHRAE 90.1-2019 alternative; it is not a separate city-only energy code. In hot-humid zone 2A, low solar-heat-gain glazing, exterior shading, air-barrier continuity, efficient cooling, and deliberate humidity control work together. A high nominal insulation value alone does not address humid-air infiltration or oversized cooling equipment cycling without dehumidifying. We reconcile envelope, lighting, service loads, and HVAC controls before electronic submittal to Safety and Permits, then coordinate resilient equipment locations with the floodplain design rather than treating energy documentation as independent of storm exposure.",
  },
  faqs: [
    {
      q: "Who reviews commercial permits in New Orleans?",
      a: "The City of New Orleans Department of Safety and Permits is the building AHJ and uses the One Stop for Permits and Licenses portal. Depending on the site, zoning, fire, historic-district, floodplain, drainage, public-works, and utility reviews are coordinated alongside the building permit.",
    },
    {
      q: "Which commercial codes apply in New Orleans?",
      a: "New Orleans enforces Louisiana's State Uniform Construction Code, based on the 2021 IBC. Commercial energy provisions are based on the 2021 IECC, with ASHRAE 90.1-2019 available as an alternate route; local floodplain, zoning, historic, and drainage rules remain additional requirements.",
    },
    {
      q: "Why are flood elevation and geotechnical work so important here?",
      a: "New Orleans has low elevations, a high water table, soft deltaic soils, subsidence, and FEMA flood hazards. Floodplain rules can establish floor and equipment elevations, while the geotechnical report informs settlement, buoyancy, foundations, slabs, pavement, and excavation planning.",
    },
  ],
};