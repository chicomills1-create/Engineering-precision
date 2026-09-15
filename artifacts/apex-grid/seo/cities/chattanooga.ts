import type { CityData } from "../types";

export const chattanooga: CityData = {
  slug: "chattanooga", name: "Chattanooga", stateSlug: "tennessee", county: "Hamilton County",
  ahj: {
    office: "City of Chattanooga Land Development Office and Department of Development Services",
    process: "Chattanooga routes commercial development and building approvals through its local development and permitting functions, with plan review, zoning, site, fire, and utility requirements coordinated according to project scope. Confirm whether the address is in the city or unincorporated Hamilton County before selecting the review path.",
  },
  codes: {
    building: "2018 International Building Code with Tennessee and City of Chattanooga amendments",
    energy: "2018 International Energy Conservation Code commercial provisions, with ASHRAE 90.1-2016 alternate path",
    amendments: "Chattanooga administers local development and construction requirements alongside Tennessee's statewide commercial code baseline. Floodplain, stormwater, steep-slope, zoning, and hillside conditions can add design constraints beyond the building-code text.",
  },
  utilities: {
    electric: "EPB provides electric service in Chattanooga and operates a municipal fiber network",
    notes: "EPB coordinates electric service, distributed generation, and communications capacity; Tennessee-American Water and other providers serve water or wastewater functions by territory. Confirm each service boundary, fire flow, and extension requirement early.",
  },
  climateNotes: "Chattanooga is in humid mixed climate zone 4A, with hot humid summers, cool winters, heavy rainfall, severe storms, steep and rolling terrain, and Tennessee River flood exposure. Ridge-and-valley geology and karst conditions make geotechnical and drainage investigation important.",
  marketNotes: "Chattanooga's commercial market includes advanced manufacturing, automotive suppliers, logistics, healthcare, higher education, outdoor-tourism facilities, and downtown/infill redevelopment. The combination of industrial loads, constrained topography, and river corridors makes utility and civil coordination a recurring schedule driver.",
  narratives: {
    mep: "Chattanooga MEP systems must manage humid 4A summers and genuine winter heating while supporting manufacturing, healthcare, logistics, and technology loads. EPB service capacity, transformer placement, distributed generation, and communications are confirmed early, and the 2018 IECC or ASHRAE 90.1-2016 compliance path is coordinated with local plan review.",
    structural: "Chattanooga structural design uses the 2018 IBC basis with local amendments, moderate wind and low-to-moderate seismic demand, and a site-specific geotechnical report. Ridge-and-valley slopes, karst, variable rock, flood elevations, and severe-storm roof anchorage can govern foundations and lateral detailing more than a generic regional assumption.",
    civil: "Chattanooga civil engineering starts with heavy rainfall, steep or rolling grades, karst drainage, and Tennessee River floodplain mapping. We coordinate grading, erosion control, detention, outfalls, access, finished floors, and EPB/water utility corridors with the applicable city or county standards before the building plan is locked.",
    energy: "Chattanooga commercial energy compliance follows the 2018 IECC baseline, with ASHRAE 90.1-2016 as an alternate path. Zone 4A rewards a balanced envelope: airtight construction and insulation support winter loads, while solar control, efficient cooling, humidity management, and lighting controls address summer performance.",
  },
  faqs: [
    { q: "Which AHJ reviews my Chattanooga project?", a: "The address determines whether City of Chattanooga or unincorporated Hamilton County reviews the work. Confirm jurisdiction before applying because the development, zoning, site, and building review path can differ." },
    { q: "Who provides electric service in Chattanooga?", a: "EPB is the principal Chattanooga electric provider and also operates a municipal fiber network. Confirm capacity, transformer, distributed-generation, and communications requirements early for large commercial loads." },
    { q: "Do Chattanooga sites need geotechnical and flood review?", a: "They often do. Ridge-and-valley slopes, karst, heavy rainfall, and Tennessee River flood exposure can affect foundations, grading, detention, and finished floors; the project geotechnical report and current flood mapping should guide the design." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 81, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://chattanooga.gov/government/public-works-0"],
      codes: ["https://www.tn.gov/commerce/fire/codes-enforcement.html"],
      amendments: ["https://chattanooga.gov/government/public-works-0"],
      utilities: ["https://epb.com/"],
      climate: ["https://www.weather.gov/mrx/"],
      market: ["https://chattanoogachamber.com/"],
    },
  },
};