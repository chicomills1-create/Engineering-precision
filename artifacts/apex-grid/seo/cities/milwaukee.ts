import type { CityData } from "../types";

export const milwaukee: CityData = {
  slug: "milwaukee",
  name: "Milwaukee",
  stateSlug: "wisconsin",
  county: "Milwaukee County",
  ahj: {
    office: "City of Milwaukee Department of Neighborhood Services (DNS), Commercial Code Enforcement",
    process:
      "DNS Commercial Code Enforcement administers City of Milwaukee building permits, plan examination, and inspections; commercial submissions use the city’s online permit and ePlans workflow where required. Wisconsin’s statewide commercial code applies, while zoning, historic-preservation, fire, sanitary-sewer, and stormwater approvals can add city or agency reviews to the permit path.",
  },
  codes: {
    building: "Wisconsin Commercial Building Code, SPS 361–366 (statewide code based on the 2015 IBC), administered locally by Milwaukee DNS",
    energy: "Wisconsin Commercial Energy Code, SPS 363, using the statewide adopted commercial energy provisions",
    amendments:
      "Milwaukee enforces the statewide Wisconsin commercial code through DNS rather than substituting a separate local IBC edition. Local land-use, historic-preservation, sewerage, and site requirements still govern project feasibility, and designers should use the currently published SPS text and city submittal requirements.",
  },
  utilities: {
    electric: "We Energies provides electric and natural-gas service; the Milwaukee Water Works supplies drinking water and the Milwaukee Metropolitan Sewerage District (MMSD) provides regional wastewater and stormwater management",
    notes:
      "We Energies should review capacity, service configuration, and generation interconnection early for high-demand facilities. City sewer connections operate within MMSD’s regional system, so private site design must align with city connection requirements and MMSD stormwater rules.",
  },
  climateNotes:
    "Milwaukee’s Lake Michigan shoreline moderates some temperature extremes but brings lake-effect snow, cold wind, freeze-thaw cycling, and wind exposure. It is climate zone 6A: heating, snow drift, deep frost, and condensation control dominate, while humid summer periods still need moisture management.",
  marketNotes:
    "Milwaukee’s market includes advanced manufacturing, water technology, food and beverage, healthcare, higher education, distribution, and redevelopment of industrial and riverfront parcels. Adaptive reuse and dense infill frequently encounter historic-review, existing-utility, contaminated-soil, and stormwater constraints that do not appear on suburban greenfield schedules.",
  narratives: {
    mep:
      "Milwaukee MEP design is heating- and freeze-protection-led in climate zone 6A, but Lake Michigan humidity means the summer moisture strategy cannot be omitted. We detail air-barrier continuity, combustion/venting and condensate arrangements, equipment clearances, and protected piping for a real winter climate, then evaluate heat recovery and electrification against peak demand and the owner’s operational profile. We Energies capacity and service configuration are established early, while Milwaukee Water Works and MMSD coordination anchors domestic, fire, sanitary, and stormwater concepts. DNS reviews against Wisconsin’s SPS commercial framework, so code documentation follows the statewide text rather than an assumed current-model I-Code.",
    structural:
      "Milwaukee structural design is driven by snow, wind, frost, and existing-building investigation—not seismic. Lake-effect snowfall and drifting require roof zones, parapets, step conditions, and unbalanced snow to be analyzed under the Wisconsin Commercial Building Code; shoreline and open-terrain exposure can elevate wind pressures and rooftop-equipment anchorage. Footings and slabs are detailed for deep frost and freeze-thaw durability. In the city’s brick industrial building stock, a field survey of masonry, timber, corrosion, and prior alterations is as important as the new frame calculation, and special inspection is coordinated with DNS.",
    civil:
      "Milwaukee site engineering works inside a Great Lakes water-quality system. MMSD’s stormwater rules, city sewer connection requirements, and Wisconsin NR 151/NR 216 performance and construction-permit requirements shape detention, infiltration, treatment, and erosion-control design. High groundwater, tight urban parcels, contaminated fill, and frost can make nominal infiltration practices infeasible, so we test soils and select maintainable detention, bioretention, or conveyance instead of promising infiltration that will not perform. We also screen redevelopment sites for existing combined-sewer and utility conflicts before finalizing grading or basement elevations.",
    energy:
      "SPS 363 provides Milwaukee’s statewide commercial energy baseline, but a 6A climate rewards going beyond it. Continuous insulation, a durable air barrier, thermal-bridge control, high-performance glazing, heat recovery, and efficient heating systems reduce the long heating season and control condensation risk. We document the applicable SPS path for DNS review and test design alternatives through COMcheck or modeling as appropriate, then coordinate electrical demand, service upgrades, and any PV or storage proposal with We Energies. On adaptive reuse, envelope improvements are balanced against moisture behavior and historic-fabric constraints rather than prescribed in isolation.",
  },
  faqs: [
    {
      q: "What commercial building code applies in Milwaukee?",
      a: "Milwaukee DNS administers the statewide Wisconsin Commercial Building Code, SPS 361–366, which is based on the 2015 IBC with Wisconsin amendments. Use the current SPS text and DNS commercial submittal requirements; zoning and site approvals are separate city processes.",
    },
    {
      q: "Which utilities serve Milwaukee commercial buildings?",
      a: "We Energies provides electric and natural-gas service. Milwaukee Water Works supplies drinking water, and MMSD operates the regional wastewater and stormwater system. Capacity, connections, and site stormwater requirements should be coordinated early with the appropriate utility or agency.",
    },
    {
      q: "What structural conditions matter most in Milwaukee?",
      a: "Snow drift and unbalanced snow, Lake Michigan wind exposure, deep frost, and freeze-thaw durability generally govern more than seismicity. Existing masonry and timber conditions are an added critical investigation item for the city’s many adaptive-reuse projects.",
    },
  ],
};