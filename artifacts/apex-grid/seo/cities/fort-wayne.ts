import type { CityData } from "../types";

export const fortWayne: CityData = {
  slug: "fort-wayne",
  name: "Fort Wayne",
  stateSlug: "indiana",
  county: "Allen County",
  ahj: {
    office: "City of Fort Wayne Community Development Division, Building Department",
    process:
      "The Building Department administers local permits, plan review, and inspections through the City’s permitting process. Many commercial projects also require an Indiana Department of Homeland Security Construction Design Release through state Plan Review; zoning, fire, engineering, utility, and right-of-way approvals remain coordinated but distinct local tracks.",
  },
  codes: {
    building:
      "Indiana Building Code (675 IAC 13), based on the 2012 International Building Code with Indiana amendments",
    energy:
      "Indiana Energy Conservation Code, using the state-adopted ASHRAE 90.1-2007 / 2010-era IECC framework with amendments",
    amendments:
      "Fort Wayne enforces Indiana’s statewide commercial-code framework rather than a separately adopted local IBC cycle. A state Construction Design Release does not replace City approvals for land use, fire review, drainage, utilities, public improvements, or inspections.",
  },
  utilities: {
    electric: "Indiana Michigan Power (I&M) provides electric service in Fort Wayne",
    notes:
      "I&M should review capacity, service routing, and distributed-generation interconnection early for high-load industrial, cold-storage, or electrification projects. City Utilities provides water and wastewater service, and Northern Indiana Public Service Company (NIPSCO) provides natural gas; extensions and connection requirements are coordinated separately from the building permit.",
  },
  climateNotes:
    "Fort Wayne is in cold, humid climate zone 5A, with winter heating demand, freeze-thaw cycles, humid summers, thunderstorms, and tornado exposure. The St. Marys, St. Joseph, and Maumee rivers and their tributaries make floodplain screening, legal drainage, and careful finished-floor elevations important.",
  marketNotes:
    "Fort Wayne’s economy supports advanced manufacturing, defense and aerospace supply chains, logistics, health care, and higher education, alongside industrial redevelopment and greenfield growth. Large manufacturing and distribution sites place particular pressure on electric-service planning, truck circulation, drainage, and reliable water and wastewater capacity.",
  narratives: {
    mep:
      "Fort Wayne MEP design responds to 5A winter heating and freeze-protection demand as well as humid-summer ventilation and latent loads. I&M capacity is investigated early for manufacturing, warehouse, refrigeration, and electrification loads, while City Utilities water and wastewater and NIPSCO gas availability influence central-plant and process concepts. Indiana’s state energy framework is older than current model codes, but high-bay lighting controls, destratification, air sealing, efficient heating, and practical controls still materially affect operating cost; the state Plan Review and City Building Department packages must stay aligned.",
    structural:
      "Fort Wayne structural projects are typically governed by gravity, wind, snow, frost, and soil rather than high seismic demand, but severe-storm and tornado exposure makes roof uplift, equipment anchorage, diaphragms, and continuous load paths important. Snow accumulation and drifting, freeze-thaw durability, and the local frost environment shape roof and foundation detailing. Alluvial deposits near the three rivers, variable fill, groundwater, and clay soils require geotechnical direction before finalizing slabs, shallow foundations, retaining systems, or pavement sections under the Indiana Building Code.",
    civil:
      "Fort Wayne civil engineering begins with the three-rivers watershed and a workable legal outlet. Indiana Rule 5 requires a construction stormwater permit and SWPPP for qualifying disturbance, while the City’s drainage, floodplain, utility, and public-improvement requirements determine detention, release, and connection details. Flat to gently rolling grades, large truck courts, river and tributary floodplains, and City Utilities service corridors make early grading and hydraulic routing essential. We coordinate site drainage, water and wastewater extensions, access, and right-of-way work before the development plan is locked.",
    energy:
      "Fort Wayne commercial projects use Indiana’s state-adopted energy provisions, based on an ASHRAE 90.1-2007 / 2010-era IECC framework with amendments, with documentation matched to the applicable state review requirements. That baseline does not reduce the value of cold-climate enclosure design: continuous insulation, air-barrier continuity, high-performance glazing, efficient heating, ventilation controls, and heat recovery can reduce winter peaks and improve comfort. For industrial and distribution programs, we evaluate process, refrigeration, high-bay lighting, and I&M electric-service implications alongside code compliance.",
  },
  faqs: [
    {
      q: "Does a Fort Wayne commercial project need Indiana state plan review?",
      a: "Many commercial projects need an Indiana Department of Homeland Security Construction Design Release through state Plan Review before or alongside local permitting. The City of Fort Wayne Building Department still administers local permits and inspections, and local zoning, fire, drainage, utility, and right-of-way approvals are separate.",
    },
    {
      q: "Which utilities serve Fort Wayne commercial sites?",
      a: "Indiana Michigan Power provides electricity; City Utilities provides water and wastewater; and NIPSCO provides natural gas. Exact capacity, territory, routing, extension, and interconnection requirements should be confirmed with each provider for the parcel.",
    },
    {
      q: "What stormwater issues matter on a Fort Wayne site?",
      a: "Rule 5 governs qualifying construction disturbance, while City drainage and floodplain requirements govern the finished site. The St. Marys, St. Joseph, and Maumee river system, flat grades, truck-court runoff, and the available legal outlet make detention and hydraulic routing early design decisions.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 76, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityoffortwayne.org/publicworks/engineering.html"],
      codes: ["https://www.in.gov/dhs/fire-and-building-safety/code-enforcement/indiana-building-codes/"],
      amendments: ["https://www.in.gov/dhs/fire-and-building-safety/code-enforcement/indiana-building-codes/"],
      utilities: ["https://www.indianamichiganpower.com/", "https://www.cityoffortwayne.org/utilities.html"],
      climate: ["https://www.weather.gov/iwx/"],
      market: ["https://www.greaterfortwayneinc.com/"],
    },
  },
};