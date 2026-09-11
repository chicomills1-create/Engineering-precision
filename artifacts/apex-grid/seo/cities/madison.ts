import type { CityData } from "../types";

export const madison: CityData = {
  slug: "madison",
  name: "Madison",
  stateSlug: "wisconsin",
  county: "Dane County",
  ahj: {
    office: "City of Madison Building Inspection Division",
    process:
      "Madison Building Inspection administers commercial permits, plan review, and inspections through its online permitting services. State commercial-code review is coordinated locally, while zoning, urban design, fire protection, erosion control, stormwater, and public-works approvals can be additional city review paths.",
  },
  codes: {
    building: "Wisconsin Commercial Building Code, SPS 361–366 (statewide code based on the 2015 IBC), administered by the City of Madison",
    energy: "Wisconsin Commercial Energy Code, SPS 363, using Wisconsin's statewide commercial energy provisions",
    amendments:
      "Madison administers Wisconsin's statewide commercial building code rather than a separate locally chosen IBC edition. Local zoning, urban-design, lake-shore, erosion-control, stormwater, and public-works requirements remain independent project constraints.",
  },
  utilities: {
    electric: "Madison Gas and Electric (MGE) provides electric and natural-gas service in much of Madison; the City of Madison Water Utility provides water and the City Engineering Division operates the sanitary sewer and stormwater systems",
    notes:
      "Confirm MGE territory, service capacity, transformer configuration, and generation interconnection for the parcel. City water, sanitary, and stormwater coordination should establish pressure, fire flow, lake/watershed discharge constraints, and any required extensions before final site design.",
  },
  climateNotes:
    "Madison is climate zone 6A, with cold winters, substantial snow, deep frost, freeze-thaw cycling, and humid summers. The city sits between Lakes Mendota, Monona, and Waubesa watersheds; lake levels, urban runoff, shoreline conditions, and wet soils can constrain individual sites.",
  marketNotes:
    "Madison's construction activity is anchored by the University of Wisconsin–Madison, state government, healthcare and research, biotechnology, software, and growing east-side and suburban mixed-use development. Campus-adjacent and infill projects commonly face constrained sites, existing utilities, and lake-watershed stormwater obligations.",
  narratives: {
    mep:
      "Madison MEP design is heating-, snow-, and freeze-protection-led in climate zone 6A, with summer humidity still requiring deliberate ventilation and moisture control. The Wisconsin commercial code supplies the building and energy baseline, administered by Madison Building Inspection. MGE's capacity, service configuration, and distributed-generation process are established early, while city water pressure and fire flow inform heating-plant, domestic-water, and fire-protection options on dense or campus-adjacent sites.",
    structural:
      "Madison structures are detailed for snow accumulation and drift, cold-weather durability, frost, wind, and the actual geotechnical conditions rather than a seismic-dominated lateral system. Glacial soils, fill, high groundwater, and wet-site conditions can change foundation, excavation, and dewatering assumptions substantially across the city. The statewide Wisconsin commercial code governs structural review, while constrained infill work needs careful coordination of demolition, adjacent foundations, and public-right-of-way impacts.",
    civil:
      "Madison civil design is shaped by a lake-centered watershed rather than just lot-line drainage. We coordinate grading, stormwater treatment and detention, erosion control, sanitary and water connections, and public improvements with City Engineering, testing the plan against receiving-water and mapped floodplain conditions. Winter construction, shallow groundwater, and constrained urban utility corridors can affect both constructability and sequencing; qualifying disturbance also needs Wisconsin construction-stormwater compliance.",
    energy:
      "Madison commercial energy work follows Wisconsin's statewide commercial energy provisions in SPS 363. In 6A, continuity of insulation and air barriers, condensation control, glazing selection, heat recovery where appropriate, efficient heating, and realistic snow-season operations matter as much as nominal equipment efficiency. We coordinate the compliance documentation with the city's permit workflow and assess electrification or on-site generation against MGE service and interconnection requirements.",
  },
  faqs: [
    { q: "What commercial building code applies in Madison?", a: "Madison administers Wisconsin's statewide Commercial Building Code, SPS 361–366, rather than a separately adopted city IBC edition. Building Inspection handles local permit review, while zoning, fire, stormwater, erosion-control, and public-works approvals may be separate." },
    { q: "Who provides utilities for Madison commercial buildings?", a: "MGE provides electric and gas service in much of Madison; City of Madison Water Utility provides water, and city engineering operates sanitary sewer and stormwater systems. Confirm territory and site-specific capacity, pressure, fire flow, and connection needs early." },
    { q: "Why is stormwater planning important in Madison?", a: "Madison's sites drain to a connected lake watershed, so runoff quality, detention, erosion control, lake or floodplain conditions, and public-system capacity can shape the layout. Early City Engineering coordination is especially valuable for infill and lake-adjacent properties." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 80, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofmadison.com/development-services-center"],
      codes: ["https://dsps.wi.gov/Pages/Programs/CommercialBuildings/Default.aspx"],
      amendments: ["https://library.municode.com/wi/madison/codes/code_of_ordinances"],
      utilities: ["https://www.mge.com/", "https://www.cityofmadison.com/water"],
      climate: ["https://www.weather.gov/mkx/"],
      market: ["https://madisonregion.org/"],
    },
  },
};