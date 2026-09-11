import type { CityData } from "../types";

export const oklahomaCity: CityData = {
  slug: "oklahoma-city",
  name: "Oklahoma City",
  stateSlug: "oklahoma",
  county: "Oklahoma County",
  ahj: {
    office: "City of Oklahoma City Development Services Department, Development Center",
    process:
      "The Development Center is the city's intake point for commercial building permits, plan review, inspections, planning, and engineering coordination, using the city's online permitting and development tools. Fire, utilities, public works, zoning, and subdivision/site requirements may run in parallel; Oklahoma City extends into Canadian, Cleveland, and Pottawatomie counties, so jurisdiction and utility service must be confirmed from the parcel rather than the mailing address.",
  },
  codes: {
    building: "2018 International Building Code, as adopted by the City of Oklahoma City with local amendments",
    energy: "2018 International Energy Conservation Code, commercial provisions, as adopted by the City of Oklahoma City",
    amendments:
      "Oklahoma City enforces the statewide 2018 I-Code minimum through its own ordinances and local amendments; Development Services publishes the applicable code set and design criteria. The city is in a high-wind and tornado-prone region, so wind design, storm-shelter decisions, and local fire/building review require project-specific treatment rather than a generic low-wind IBC approach.",
  },
  utilities: {
    electric: "Oklahoma Gas & Electric (OG&E) serves most of Oklahoma City; Oklahoma City Utilities provides municipal water, wastewater, and solid-waste services in its service area",
    notes:
      "OG&E manages electric service requests and distributed-generation interconnection, while City Utilities extension, main, and capacity coordination affects water and sanitary design. Service territories and existing infrastructure vary across the unusually large city limits, so availability should be documented for the site.",
  },
  climateNotes:
    "Oklahoma City is generally climate zone 3A, with hot summers, humid spring conditions, occasional hard freezes, hail, severe thunderstorms, and a nationally significant tornado risk. Wind is a governing structural and envelope condition, while drought-to-downpour cycles on clay soils complicate drainage, pavements, and foundation performance.",
  marketNotes:
    "Oklahoma City's market includes aerospace and defense around Tinker Air Force Base, health care and research, downtown/Bricktown redevelopment, industrial and logistics work along I-35/I-40/I-44, and continued residential growth. The large municipal footprint and varied existing utility networks make access, extensions, stormwater, and coordinated Development Center review important early decisions.",
  narratives: {
    mep:
      "Oklahoma City MEP systems must operate through a broad weather range: high summer cooling, humid storm-season ventilation, and winter freeze events all matter. Under the city's 2018 IECC framework, we coordinate ventilation, controls, insulation, equipment clearances, and freeze protection as one permit package, while locating critical equipment and services for severe-weather resilience appropriate to the program. OG&E service capacity, voltage, routing, and interconnection are established early for large loads, and City Utilities water/sewer availability is checked before plumbing and fire-service concepts become fixed.",
    structural:
      "Oklahoma City structural design is severe-wind design in a real tornado and thunderstorm market, not an afterthought. The city-adopted 2018 IBC basis requires site-specific basic wind speed, exposure, risk category, roof-zone pressures, cladding, and rooftop-equipment anchorage; tornado-resistant safe rooms are a separate FEMA/ICC 500 decision when the owner or occupancy calls for them, not something assumed from ordinary code compliance. Seismic demand is generally low, but expansive clay and variable moisture can control slab, pier, grade-beam, and pavement details. A geotechnical investigation, drainage strategy, and robust continuous load path are therefore coordinated from schematic design.",
    civil:
      "Civil scope in Oklahoma City must handle fast, intense rainfall after dry periods, local creeks and floodplains, and clay subgrades that are sensitive to moisture. City drainage and public-works requirements, FEMA floodplain constraints, detention/outfall design, street access, and water/sewer extensions are developed with the Development Center and City Utilities; qualifying disturbance also triggers Oklahoma's construction stormwater general permit and a SWPPP. Grading is coordinated with the geotechnical moisture regime so roof and pavement runoff does not worsen shrink-swell movement at building edges.",
    energy:
      "Oklahoma City uses the commercial provisions of the 2018 IECC, so the compliance method is tied to that adopted edition rather than a newer national model by default. Climate zone 3A design benefits from solar-control glazing, air sealing, efficient cooling, lighting controls, and well-designed heating/freeze protection for winter events. We coordinate envelope, HVAC, lighting, and service-water-heating documents for Development Center review and evaluate large electrical loads with OG&E's service constraints and the owner's resilience/load-management objectives.",
  },
  faqs: [
    {
      q: "What codes does Oklahoma City use for commercial permits?",
      a: "Oklahoma City enforces the statewide 2018 International Building Code and 2018 International Energy Conservation Code minimum through its local ordinances and amendments. The Development Center's current published code information and the project-specific permit comments control, including the city's local administrative and trade-code requirements.",
    },
    {
      q: "Does ordinary code design provide tornado protection in Oklahoma City?",
      a: "Ordinary IBC wind design addresses prescribed straight-line wind loads and component/roof-zone pressures; it is not the same as a tornado shelter. When a project needs tornado refuge, the owner and design team should evaluate a purpose-designed safe room under ICC 500/FEMA guidance and coordinate it with the building program and AHJ.",
    },
    {
      q: "Which utilities should be involved early on an Oklahoma City project?",
      a: "OG&E should be engaged for electric capacity, routing, and interconnection, and Oklahoma City Utilities for water and wastewater availability, mains, and extensions. Because the city covers a very large area and crosses county lines, utility availability needs to be confirmed for the exact parcel.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 83, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.okc.gov/departments/development-services"],
      codes: ["https://www.okc.gov/departments/development-services/development-center/codes"],
      amendments: ["https://www.okc.gov/departments/development-services/development-center/codes"],
      utilities: ["https://www.oge.com/business", "https://www.okc.gov/utilities"],
      climate: ["https://www.weather.gov/oun/"],
      market: ["https://www.okcchamber.com/"],
    },
  },
};