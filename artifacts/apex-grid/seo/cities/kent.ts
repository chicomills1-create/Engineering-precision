import type { CityData } from "../types";

export const kent: CityData = {
  slug: "kent",
  name: "Kent",
  stateSlug: "washington",
  county: "King County",
  ahj: {
    office: "City of Kent Permit Center, Economic and Community Development Department (400 West Gowe Street)",
    process:
      "Kent routes building, engineering and utility, land use/environmental, and fire prevention permits through a single Permit Center, with electronic permit applications and online permit-status tracking through the plan review process. The city's signature step is the pre-application conference: applicants meet city staff early to surface applicable ordinances, site problems, and department requirements across building, engineering, fire, and land use before a formal submittal — a step that materially de-risks the large industrial and warehouse projects that dominate Kent Valley.",
  },
  codes: {
    building: "2021 International Building Code with Washington State amendments (WAC 51-50), adopted in Kent City Code Chapter 14.01, effective statewide March 15, 2024",
    energy: "2021 Washington State Energy Code — Commercial (WAC 51-11C), based on the 2021 IECC with Washington amendments that exceed the model code, including fossil-fuel and HVAC efficiency requirements",
    amendments:
      "Kent adopts the state code set by reference in City Code 14.01.010 — 2021 IBC, IEBC, IRC, IMC, the 2021 Uniform Plumbing Code (Washington uses the UPC, not the IPC), and the 2021 IECC as amended by WAC 51-11C/51-11R — and adds local amendments in 14.01.030 and following, including adopting IBC Appendices C, E, and J and local administrative provisions on permit expiration and extension. Where Kent's chapter conflicts with the state code, the Kent City Code governs to the extent RCW 19.27.040 allows.",
  },
  utilities: {
    electric: "Puget Sound Energy (PSE) — electric and natural gas service",
    notes:
      "Puget Sound Energy provides both electricity and natural gas in Kent, so one utility engineers the electric service, gas service, and any line extension for new commercial and industrial projects — engage PSE's new construction services early on warehouse and manufacturing loads, where service capacity sets the schedule. Water and sewer are City of Kent utilities: the city's Water Division operates the drinking water system and the Sewer Division maintains 211 miles of sewer pipe and seven pump stations, and the Permit Center issues certificates of water availability and fire-flow data that industrial projects need at feasibility.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 4C (marine) in the Green River valley: mild wet winters, low snow loads, and dry summers — but the design drivers are seismic and water. Kent sits in one of Washington's highest seismic hazard areas (Cascadia and Seattle Fault scenarios), and the valley floor carries Green River flood risk behind the Howard Hanson Dam system, with high water tables and liquefiable alluvial soils across the industrial valley.",
  marketNotes:
    "Kent Valley is one of the largest warehouse and manufacturing districts on the West Coast: Boeing's Kent space and defense operations, Blue Origin's headquarters, and Exotic Metals Forming anchor the aerospace cluster, while Amazon and a deep bench of third-party logistics firms fill millions of square feet of distribution space along the SR 167 and I-5 corridors. Commercial work runs on tilt-up warehouse construction and re-tenanting, aerospace and advanced-manufacturing facilities, cold storage, and data-support industrial — plus multifamily and mixed-use growth around Kent Station and the future Link light rail corridor.",
  narratives: {
    mep:
      "MEP design in Kent follows the 2021 Washington code set — IMC and the 2021 Uniform Plumbing Code with state amendments — and the energy code is the discipline's center of gravity: the 2021 Washington State Energy Code — Commercial is among the strictest in the nation, pushing all-electric HVAC strategies, heat-pump systems, and total system performance compliance that must be modeled, not prescriptively assumed. Puget Sound Energy engineers both the electric and gas services, and for Kent Valley warehouses the PSE service-capacity conversation belongs at schematic design, not at permit.",
    structural:
      "Structural design in Kent is seismic design on difficult ground: the 2021 IBC with Washington amendments, high spectral accelerations from Cascadia subduction and Seattle Fault scenarios, and valley-floor alluvium with real liquefaction potential that drives deep foundations or ground improvement for tilt-up industrial buildings. Snow and wind are modest by national standards, so the lateral system, the geotechnical report, and flood elevation relative to the Green River system control the structural narrative.",
    civil:
      "Civil work in Kent splits between the valley floor and the hills: valley industrial sites contend with Green River floodplain, high water tables, stormwater detention under Washington's stringent Puget Sound water-quality regime, and fish and wildlife habitat protections the city's Environmental division oversees. City of Kent water and sewer are the serving utilities, and water availability and fire-flow certification through the Permit Center is an early feasibility deliverable for any large-footprint project.",
    energy:
      "Energy compliance in Kent is documented to the 2021 Washington State Energy Code — Commercial (WAC 51-11C), which exceeds the 2021 IECC baseline with Washington amendments on HVAC efficiency, fossil-fuel restrictions, and on-site renewables or efficiency credits. Most commercial projects comply through the total building performance path with energy modeling, and in mild zone 4C the model is won on heat-pump performance, envelope airtightness, and lighting power — teams that treat the WSEC as a late-stage form exercise routinely fail their first review.",
  },
  faqs: [
    {
      q: "What building code does Kent, WA enforce?",
      a: "The Washington State Building Code as adopted in Kent City Code Chapter 14.01: the 2021 IBC, IMC, and IEBC with state amendments, the 2021 Uniform Plumbing Code (Washington uses the UPC, not the IPC), and the 2021 Washington State Energy Code, effective March 15, 2024.",
    },
    {
      q: "Who provides electric, gas, water, and sewer service in Kent?",
      a: "Puget Sound Energy provides both electricity and natural gas. The City of Kent provides drinking water and sanitary sewer service, and its Permit Center issues water availability and fire-flow information for new projects.",
    },
    {
      q: "What is a pre-application conference in Kent?",
      a: "The Permit Center's early meeting between an applicant and city staff to review a project in its initial stages — applicable ordinances, permit procedures, department requirements, and site problems across building, engineering, fire, and land use — before a formal permit submittal.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 50, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.kentwa.gov/pay-and-apply/research-the-kent-city-code"],
      codes: ["https://ecode360.com/51880182"],
      amendments: ["https://ecode360.com/51880182"],
      utilities: ["https://www.kentwa.gov/departments/public-works/sewer"],
      climate: ["https://www.weather.gov/sew/"],
      market: ["https://www.kentwa.gov/pay-and-apply/research-the-kent-city-code"],
    },
  },
};
