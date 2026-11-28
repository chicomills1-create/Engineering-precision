import type { CityData } from "../types";

export const saintLouis: CityData = {
  slug: "saint-louis",
  name: "St. Louis",
  stateSlug: "missouri",
  county: "Independent city",
  ahj: {
    office: "City of St. Louis Department of Public Safety, Building Division",
    process:
      "The Building Division's Permit Section administers building permits and plan review through the City's online permit services, with Fire Division, zoning, preservation, and other reviews added when applicable. Commercial projects may also require separate street, utility, or site approvals; owners should confirm whether a parcel lies in a historic district, floodplain, or redevelopment review area before relying on a building-permit path.",
  },
  codes: {
    building: "2018 International Building Code, adopted by the City of St. Louis with local amendments (Ordinance 70794)",
    energy: "2018 International Energy Conservation Code, commercial provisions, adopted by the City of St. Louis as part of the 2018 ICC suite (effective August 1, 2018); the city's Building Energy Performance Standards (Revised Code Chapter 25.71) additionally cover municipal, commercial, institutional, and multifamily buildings of 50,000 square feet or more",
    amendments:
      "St. Louis adopts and amends its own code set under Missouri's local-adoption system: the 2018 ICC suite (IBC per Ordinance 70794, IECC per Ordinance 70799) took effect August 1, 2018, and the city's building, existing-building, fire, mechanical, plumbing, and energy provisions should be read with the Title 25 ordinance text and Building Division administrative requirements. Ordinance 71063 additionally requires new residential, multifamily, and commercial construction to be solar-ready. Historic-district standards, zoning, and public-right-of-way rules are additional City controls.",
  },
  utilities: {
    electric: "Ameren Missouri",
    notes:
      "Ameren Missouri coordinates electric service upgrades and distributed-generation interconnection; large commercial loads should verify capacity, route, and meter or transformer requirements early. The City of St. Louis Water Division provides water service, and the Metropolitan St. Louis Sewer District provides regional sanitary and stormwater services.",
  },
  climateNotes:
    "St. Louis is in ASHRAE climate zone 4A, with hot humid summers, cold winters, thunderstorms, freeze-thaw cycles, and occasional snow and ice. Mississippi and Missouri River flooding, localized flash flooding, expansive or variable soils, loess bluffs, and legacy urban fill make site investigation and drainage planning consequential.",
  marketNotes:
    "St. Louis construction includes healthcare, higher education, research, manufacturing, logistics, and continuing rehabilitation of historic commercial and multifamily buildings. Major institutional districts and industrial river-and-rail corridors generate both complex adaptive-reuse projects and utility-intensive new facilities, while flood resilience and aging infrastructure remain persistent site constraints.",
  narratives: {
    mep:
      "St. Louis MEP design responds to a mixed-humid 4A climate: cooling and latent-load control are significant in summer, while winter heating and pipe-freeze protection remain real requirements. The City's 2018 IECC commercial baseline should be confirmed against the locally amended code, and legacy-building renovations require careful integration of new shafts, outside air, fire protection, and electrical distribution. Ameren Missouri service capacity and distributed-energy interconnection need early coordination for manufacturing, laboratories, and electrified retrofits. Water service through the City and sanitary or stormwater coordination with MSD should advance alongside—not after—the Building Division submission.",
    structural:
      "St. Louis structural work is ordinarily driven more by wind, snow, gravity, existing conditions, and soils than by high seismic demand, although the code-required seismic analysis still applies and New Madrid regional hazard is not ignored. Many urban projects begin with historic masonry, aging steel, undocumented alterations, or variable fill, making field investigation central to realistic strengthening and reuse plans. Loess-bluff, river-adjacent, and fill sites may have slope stability, settlement, groundwater, or flood issues that reshape foundations. The City's locally amended 2018 IBC establishes the permit basis, while special inspections and construction sequencing need to suit the actual structure.",
    civil:
      "Civil design in St. Louis pairs City right-of-way and development requirements with Metropolitan St. Louis Sewer District sanitary and stormwater criteria. Intense thunderstorms, combined-system constraints in older areas, creek and river flooding, and limited space on urban sites mean drainage and utility routing should be tested in concept design. City Water Division connections, MSD review, public-street permits, erosion control, and any floodplain requirements are coordinated as distinct tracks. On redevelopment sites, utility records and subsurface investigation are especially valuable before finalizing grades, pavements, and detention or treatment concepts.",
    energy:
      "Commercial energy documentation in St. Louis is based on the City's adopted and amended 2018 IECC commercial provisions, and buildings of 50,000 square feet or more must also meet the city's Building Energy Performance Standards (Revised Code Chapter 25.71); the project team should not assume that Missouri statewide practice or a newer national model code replaces the City code. In humid summers and cold winters, envelope continuity, solar-control glazing, sensible and latent cooling efficiency, lighting controls, and reliable heating distribution must work together. Existing masonry and historic assemblies deserve hygrothermal caution when insulation or air sealing is added, since an energy upgrade can create moisture risk if details are not coordinated. Ameren Missouri capacity and rooftop-solar interconnection should be assessed with the energy strategy early.",
  },
  faqs: [
    {
      q: "Which commercial codes apply in the City of St. Louis?",
      a: "The City has adopted the 2018 IBC (Ordinance 70794) and the 2018 IECC commercial provisions (Ordinance 70799), effective August 1, 2018, with local amendments, administered by its Building Division. Projects can also be subject to City fire, zoning, preservation, floodplain, and public-right-of-way requirements.",
    },
    {
      q: "Who provides electric, water, sewer, and stormwater service in St. Louis?",
      a: "Ameren Missouri provides electric distribution service. The City Water Division provides water, while the Metropolitan St. Louis Sewer District provides regional sanitary and stormwater services; each utility and any public-side work requires separate coordination.",
    },
    {
      q: "What site conditions commonly affect St. Louis projects?",
      a: "Hot-humid storms, river and localized flood exposure, freeze-thaw, variable fill, and loess or expansive-soil conditions can affect a project. Historic urban parcels also frequently need investigation of existing foundations, utilities, and drainage before design is finalized.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 87, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.stlouis-mo.gov/government/departments/public-safety/building/"],
      codes: ["https://library.municode.com/mo/st._louis/codes/code_of_ordinances?nodeId=TIT25BUCO_CH25.01BUCO"],
      amendments: ["https://stlouis-mo.gov/government/city-laws/upload/legislative/boardbills/boardbill/BB53-wd18.pdf"],
      utilities: ["https://www.ameren.com/economic-development/missouri", "https://www.stlwater.com/"],
      climate: ["https://www.weather.gov/lsx/"],
      market: ["https://www.gstl.org/"],
    },
  },
};