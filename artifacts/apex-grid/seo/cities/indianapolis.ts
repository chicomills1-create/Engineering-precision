import type { CityData } from "../types";

export const indianapolis: CityData = {
  slug: "indianapolis",
  name: "Indianapolis",
  stateSlug: "indiana",
  county: "Marion County",
  ahj: {
    office: "City of Indianapolis Department of Business and Neighborhood Services (BNS)",
    process:
      "BNS administers Indianapolis/Marion County building permits and electronic permit activity through the city’s online services. Many commercial projects also require an Indiana Department of Homeland Security Construction Design Release through the state Plan Review process before local permitting, so state and local reviews must be sequenced; zoning, fire, drainage, and right-of-way approvals have their own reviewers.",
  },
  codes: {
    building: "Indiana Building Code (675 IAC 13), based on the 2012 IBC with Indiana amendments",
    energy: "Indiana Energy Conservation Code, using the state’s adopted ASHRAE 90.1-2007 / 2010-era IECC provisions with amendments",
    amendments:
      "Indianapolis enforces Indiana’s statewide commercial code framework rather than a locally adopted IBC cycle. The state Construction Design Release is distinct from the local permit and does not replace local zoning, fire, drainage, utility, or right-of-way approvals.",
  },
  utilities: {
    electric: "AES Indiana is the electric utility for Indianapolis",
    notes:
      "AES Indiana coordinates new commercial electric service and generation interconnection; high-load logistics, cold-storage, and manufacturing projects should establish service capacity early. Citizens Energy Group provides water, wastewater, and natural gas services in Indianapolis, with utility extension and connection requirements reviewed separately from BNS.",
  },
  climateNotes:
    "Indianapolis is climate zone 5A, with cold winters, humid summers, frequent freeze-thaw cycles, and severe thunderstorms. Flat terrain, clayey and alluvial soils, and the White River and tributary floodplain system make positive drainage, legal outlets, and floodplain screening central to site planning.",
  marketNotes:
    "Indianapolis remains a national distribution location, with warehouse, e-commerce, cold-storage, and manufacturing construction concentrated around the interstate beltway and Indianapolis International Airport. The metro’s life-sciences and pharmaceutical base, healthcare systems, and advanced-manufacturing investments add clean-process, reliability, and utility-capacity work beyond conventional logistics shells.",
  narratives: {
    mep:
      "Indianapolis MEP design must perform through a cold 5A winter and a humid summer, so heating, freeze protection, latent control, and outside-air strategy receive equal attention. AES Indiana capacity and service routing are established early for distribution, cold-storage, and manufacturing loads, while Citizens Energy Group water, wastewater, and gas requirements influence plant and utility-room layouts. Indiana’s statewide energy provisions use an older ASHRAE 90.1/IECC vintage, but a permit baseline is not an operating-cost target: high-bay lighting controls, destratification, envelope continuity, efficient heating, and controls are especially material in the city’s logistics stock. State Plan Review and BNS submittals are coordinated as one technical record.",
    structural:
      "In Indianapolis, structural design is usually a wind, snow, frost, and soil problem rather than a high-seismicity problem. The city is generally low seismic design category, but tornado and severe-storm exposure makes roof uplift, diaphragm connections, and continuous load paths important on large low-rise warehouses. Ground snow, drifting at parapets and rooftop equipment, and the roughly 30-to-36-inch frost environment shape roof and foundation details. Glacial and alluvial deposits, uncontrolled urban fill, and White River corridor groundwater require site-specific geotechnical direction before selecting shallow foundations, slabs, or pavement sections. The applicable Indiana Building Code and state Plan Review deliverable set the code basis.",
    civil:
      "Indianapolis civil packages are shaped by legal drainage as much as physical drainage. Indiana Rule 5 requires a construction stormwater permit and SWPPP for qualifying disturbance, while local stormwater requirements, Marion County drainage infrastructure, and floodplain review govern detention, release, and outlet design. Flat grades, clay soils, large truck courts, and the White River watershed make early hydraulic routing and elevation-setting vital for logistics development. We coordinate water and wastewater service with Citizens Energy Group and identify whether a regulated drain, public storm system, or floodplain constraint controls the feasible outlet before committing the site plan.",
    energy:
      "Energy compliance for Indianapolis commercial work follows Indiana’s state-adopted energy provisions, which reference an ASHRAE 90.1-2007 / 2010-era IECC framework with amendments; documentation must track the actual state and Plan Review requirements. That older minimum should not obscure Indianapolis’s 5A climate: air leakage, insulation continuity, glazing, heating efficiency, and lighting controls materially affect winter operation, while humid summers still require sound ventilation and dehumidification design. For high-bay logistics and life-sciences facilities, we model the operational load profile, process or refrigeration interfaces, and AES Indiana demand implications alongside the nominal code path.",
  },
  faqs: [
    {
      q: "Does an Indianapolis commercial project need both state and local review?",
      a: "Many commercial projects require an Indiana Department of Homeland Security Construction Design Release through statewide Plan Review and then a local BNS permit. The state release does not replace Indianapolis zoning, fire, drainage, utility, or right-of-way approvals, so the tracks should be planned together.",
    },
    {
      q: "Which utilities serve Indianapolis commercial sites?",
      a: "AES Indiana provides electric service. Citizens Energy Group provides water, wastewater, and natural gas in Indianapolis. Large services, utility extensions, and industrial or refrigeration loads should be discussed with the relevant utility early.",
    },
    {
      q: "What stormwater constraints matter on Indianapolis warehouse sites?",
      a: "Rule 5 requires a SWPPP and construction-stormwater permit for qualifying land disturbance. Flat grades, clay/alluvial soils, extensive truck-court pavement, local drainage infrastructure, and White River watershed floodplain conditions mean detention and a lawful outlet need to be resolved before the layout is fixed.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 90, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.indy.gov/activity/apply-for-a-building-permit"],
      codes: ["https://www.in.gov/dhs/boards-and-commissions/fpbsc-rules/"],
      amendments: ["https://www.indy.gov/activity/apply-for-a-building-permit"],
      utilities: ["https://www.aesindiana.com/", "https://www.indy.gov/activity/water-and-sewer-service"],
      climate: ["https://www.weather.gov/ind/"],
      market: ["https://www.indychamber.com/"],
    },
  },
};