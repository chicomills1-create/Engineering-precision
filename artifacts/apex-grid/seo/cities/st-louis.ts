import type { CityData } from "../types";

export const stLouis: CityData = {
  slug: "st-louis",
  name: "St. Louis",
  stateSlug: "missouri",
  county: "Independent city (not within a county)",
  ahj: {
    office: "City of St. Louis Building Division, Department of Public Safety, 1200 Market Street, City Hall Room 426",
    process:
      "The Building Division issues commercial building permits and routes plans through its electronic permitting and plan-review process. Depending on scope and location, zoning, fire, cultural-resources, streets, and Metropolitan St. Louis Sewer District reviews can be separate prerequisites or parallel reviews; sealed construction documents must address the city’s adopted code and amendment package.",
  },
  codes: {
    building:
      "2018 International Building Code, adopted by the City of St. Louis with local amendments (Ordinance 70794)",
    energy:
      "2018 International Energy Conservation Code, commercial provisions, adopted by the City of St. Louis as part of the 2018 ICC suite (effective August 1, 2018); the city's Building Energy Performance Standards (Revised Code Chapter 25.71) additionally cover municipal, commercial, institutional, and multifamily buildings of 50,000 square feet or more",
    amendments:
      "St. Louis adopts and amends its own code set under Missouri’s local-adoption system: the 2018 ICC suite (IBC per Ordinance 70794, IECC per Ordinance 70799) took effect August 1, 2018, and the city’s building, existing-building, fire, mechanical, plumbing, and energy provisions should be read with the Title 25 ordinance text and Building Division administrative requirements. Ordinance 71063 additionally requires new residential, multifamily, and commercial construction to be solar-ready, and historic-district and preservation review can be independent of building-code review.",
  },
  utilities: {
    electric: "Ameren Missouri provides electric and natural-gas service in St. Louis",
    notes:
      "Ameren Missouri should be engaged early for new service, service upgrades, and distributed-generation interconnection. Metropolitan St. Louis Sewer District (MSD) provides regional wastewater and stormwater services, while the City’s Water Division operates potable-water distribution; utility and MSD requirements must be coordinated with the building permit.",
  },
  climateNotes:
    "St. Louis is in a mixed-humid 4A climate, with hot humid summers, cold winter weather, freeze-thaw exposure, severe thunderstorms, and tornado risk. The Mississippi and Missouri river confluence setting, local tributaries, and combined-sewer areas make floodplain screening and site runoff routing consequential.",
  marketNotes:
    "St. Louis construction includes health-care and university facilities, bioscience and geospatial/defense activity, industrial and logistics redevelopment, and rehabilitation of older commercial and warehouse stock. The region’s aging urban infrastructure and brownfield or river-adjacent sites make utility investigation, stormwater coordination, and existing-building surveys recurring early tasks.",
  narratives: {
    mep:
      "St. Louis MEP design has to carry both humid-summer latent load and winter heating and freeze-protection demand in climate zone 4A. Ameren Missouri service capacity, standby-power strategy, and distributed-generation interconnection belong in early discussions for laboratory, health-care, kitchen, and conversion projects, while Water Division and MSD interfaces shape domestic, fire, and sanitary concepts. We coordinate the locally adopted 2018 energy and trade-code package with the Building Division’s electronic review record, rather than assuming a Missouri-wide code path.",
    structural:
      "St. Louis structural work often begins with the existing condition: masonry bearing walls, heavy timber, older steel, undocumented alterations, and constrained urban access can govern reuse before a new framing concept does. The city’s 2018 IBC basis requires site-specific wind, snow, and seismic parameters; severe-storm uplift, roof drift, freeze-thaw deterioration, and Mississippi River corridor soils deserve as much attention as the modest regional seismic demand. Foundation selection and excavation support should follow geotechnical findings, especially on fill or alluvial sites, and be coordinated with Building Division review.",
    civil:
      "A St. Louis civil package must make urban drainage work with the MSD system, not merely move water to a property line. Combined-sewer areas, constrained outfalls, floodplain mapping, legacy utilities, and potentially contaminated redevelopment soils can limit infiltration and detention options. We establish drainage routes, grades, water and sewer connections, and any public-street work early, then coordinate MSD requirements, City Water Division interfaces, and the City’s permit paths before site geometry hardens.",
    energy:
      "Commercial energy compliance in St. Louis follows the city’s locally adopted 2018 IECC rather than a statewide Missouri energy code, and buildings of 50,000 square feet or more must also meet the city’s Building Energy Performance Standards. In a 4A mixed-humid climate, continuous insulation, air-barrier continuity, glazing solar control, efficient heating, and humidity-aware cooling must work together; masonry rehabilitation also needs condensation analysis, not just an added nominal R-value. We document envelope, lighting, HVAC, service-water-heating, and controls decisions for the city review path and align electrification or PV decisions with Ameren Missouri service and interconnection requirements.",
  },
  faqs: [
    {
      q: "What building and energy codes apply to commercial work in St. Louis?",
      a: "St. Louis locally adopts the 2018 IBC and commercial 2018 IECC, with city amendments. Missouri has no comprehensive statewide commercial code, so the City of St. Louis ordinance, current amendment package, and Building Division requirements—not a neighboring jurisdiction’s rules—govern the permit set.",
    },
    {
      q: "Who reviews a St. Louis commercial permit?",
      a: "The City of St. Louis Building Division is the building-permit AHJ. A project can also need zoning, fire, preservation, streets, MSD, and utility coordination, depending on its scope and site. Those reviews should be identified with the permit strategy rather than treated as post-permit work.",
    },
    {
      q: "Why is MSD coordination important for a St. Louis site?",
      a: "MSD manages regional wastewater and stormwater systems, and combined sewers, constrained outlets, floodplain conditions, and aging utilities are common site constraints. Detention, drainage routing, sewer connections, and public infrastructure interfaces should be resolved in the civil concept stage.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance", "electrical-engineering", "pe-stamping"],
    priority: { commercialOpportunity: 87, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.stlouis-mo.gov/government/departments/public-safety/building/index.cfm"],
      codes: ["https://library.municode.com/mo/st._louis/codes/code_of_ordinances?nodeId=TIT25BUCO_CH25.01BUCO"],
      amendments: ["https://stlouis-mo.gov/government/city-laws/upload/legislative/boardbills/boardbill/BB53-wd18.pdf"],
      utilities: ["https://www.ameren.com/-/media/missouri-site/files/environment/solar/qualifying-facilties-application.ashx", "https://msdprojectclear.org/what-we-do/"],
      climate: ["https://www.weather.gov/lsx/"],
      market: ["https://www.gstl.org/"],
    },
  },
};
