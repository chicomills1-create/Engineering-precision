import type { CityData } from "../types";

export const pittsburgh: CityData = {
  slug: "pittsburgh",
  name: "Pittsburgh",
  stateSlug: "pennsylvania",
  county: "Allegheny County",
  ahj: {
    office: "City of Pittsburgh Department of Permits, Licenses, and Inspections (PLI)",
    process:
      "PLI accepts applications and plan-review materials through the OneStopPGH permitting portal and coordinates reviews for building, zoning, fire, and related city approvals. The City is the building-code AHJ inside its limits, while Allegheny County agencies retain separate roles including county health regulation and plumbing oversight; projects outside Pittsburgh are governed by their own municipal code officials.",
  },
  codes: {
    building:
      "Pennsylvania Uniform Construction Code based on the 2018 International Codes, as adopted and administered by the City of Pittsburgh",
    energy:
      "Pennsylvania Uniform Construction Code energy provisions based on the 2018 IECC, as adopted and administered by the City of Pittsburgh",
    amendments:
      "Pittsburgh administers the statewide UCC through PLI and local ordinances; it is not a standalone countywide building department. Existing-building scopes use the UCC’s adopted existing-building provisions, and design teams must also account for PLI’s zoning, site, and permit procedures plus county health/plumbing requirements where applicable.",
  },
  utilities: {
    electric: "Duquesne Light Company delivers electricity in the City of Pittsburgh",
    notes:
      "Duquesne Light service and interconnection coordination is important for capacity upgrades and electrification; Peoples Gas supplies natural gas. Pittsburgh Water operates city water and wastewater services, while the Allegheny County Sanitary Authority (ALCOSAN) provides regional wastewater conveyance and treatment.",
  },
  climateNotes:
    "Pittsburgh is climate zone 5A (cool-humid), with cold winters, snow, freeze-thaw exposure, and humid summers. Its steep terrain, three-river setting, landslide-prone slopes, and riverine floodplains make grading, retaining, subsurface water, and flood resilience far more site-specific than a flat-city code summary suggests.",
  marketNotes:
    "Pittsburgh construction is anchored by healthcare, universities and research, robotics and advanced manufacturing, downtown reuse, and neighborhood redevelopment. The market’s distinctive engineering challenge is adaptation of industrial-era and hillside building stock: constrained sites, bridges and retaining structures, aging utilities, and flood or slope conditions often drive scope before a new building system is selected.",
  narratives: {
    mep:
      "Pittsburgh MEP engineering is a 5A cold-climate retrofit problem as often as it is a new-build problem. Heating capacity, freeze protection, humid-summer ventilation, and durable controls need to fit older institutional, industrial, and downtown buildings, while Duquesne Light service capacity and interconnection should be tested early for electrification. We coordinate PLI’s UCC review package with Peoples Gas and Pittsburgh Water interfaces, preserving workable access and phasing in occupied facilities rather than assuming utility space is available.",
    structural:
      "Pittsburgh structural design has to respect terrain and existing infrastructure. Steep parcels can require geotechnical investigation, retaining systems, slope-stability analysis, and foundations that respond to variable fill, rock, and groundwater; river-adjacent sites add flood considerations. In the city’s former industrial and masonry building stock, field verification, rehabilitation of deteriorated members, change-of-use loads, and construction sequencing are essential. PLI administers the UCC inside Pittsburgh, while snow, wind, and modest seismic demand remain part of the governing load analysis.",
    civil:
      "Civil work in Pittsburgh is defined by topography and water. We lay out grading, retaining, accessible routes, utility connections, and stormwater controls around steep slopes rather than forcing a flat-site template, then evaluate FEMA river floodplains and localized drainage. Pittsburgh Water and ALCOSAN system interfaces, public-way work, and erosion/sediment controls need early coordination; where a site discharges to a combined system or crosses a hillside, downstream capacity and constructability can control the viable development footprint.",
    energy:
      "Pittsburgh follows Pennsylvania’s UCC energy provisions based on the 2018 IECC, but cold-humid 5A conditions make enclosure continuity, air sealing, thermal bridges, heating efficiency, and freeze-resilient equipment locations critical to actual performance. Existing masonry, industrial windows, and irregular rooflines call for moisture-safe retrofit details, not a generic insulation schedule. We coordinate envelope, mechanical, lighting, and controls documentation with PLI’s permit path and evaluate electric-service capacity before committing a retrofit to electrified heating.",
  },
  faqs: [
    {
      q: "Is Allegheny County the building-code authority for a Pittsburgh project?",
      a: "Inside the City of Pittsburgh, PLI administers building permits and the Pennsylvania Uniform Construction Code. Allegheny County has separate public-health and plumbing-related responsibilities, and municipalities elsewhere in the county have their own code officials. The project address therefore matters before selecting the permit portal or code reviewer.",
    },
    {
      q: "What site conditions most affect Pittsburgh civil and structural design?",
      a: "Pittsburgh’s steep hillsides, variable fill and rock, groundwater, retaining needs, and three-river floodplain setting can be decisive. A geotechnical investigation, slope-stability review where warranted, FEMA flood mapping, stormwater routing, and constructible utility access should be established early, especially for hillside or river-adjacent redevelopment.",
    },
    {
      q: "What energy code applies to Pittsburgh commercial projects?",
      a: "Pittsburgh administers Pennsylvania’s Uniform Construction Code, whose current commercial energy provisions are based on the 2018 IECC. The compliance approach must be coordinated with PLI’s locally administered permit process. In the city’s cold-humid climate, a renovation also needs moisture-safe enclosure details and an early check of Duquesne Light capacity if electrification is planned.",
    },
  ],
};