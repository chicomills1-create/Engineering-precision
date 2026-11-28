import type { CityData } from "../types";

export const eugene: CityData = {
  slug: "eugene",
  name: "Eugene",
  stateSlug: "oregon",
  county: "Lane County",
  ahj: {
    office: "City of Eugene Planning & Development Department — Building & Permit Services",
    process:
      "Eugene files everything through its eBuild permit system: applications, drawings, and trade permits are submitted online, intake staff respond within about three business days, and each plan-review project is assigned a project coordinator who issues a Commitment Letter estimating the review time. The City publishes its actual medians — tenant infills ran a 16-day median review in 2025, new commercial buildings about 180 days — and runs a Commercial Express Permit program on Mondays and Wednesdays that can issue qualifying tenant infill and improvement permits the same day, with multi-discipline reviewers working the set live while the design professional stays available by phone.",
  },
  codes: {
    building: "2025 Oregon Structural Specialty Code (based on the 2024 International Building Code with Oregon amendments; effective October 1, 2025, mandatory April 1, 2026)",
    energy: "2025 Oregon Energy Efficiency Specialty Code (based on ASHRAE Standard 90.1-2022; effective January 1, 2025, mandatory July 1, 2025)",
    amendments:
      "Oregon's specialty codes are adopted by the state Building Codes Division and enforced uniformly — Eugene does not amend the technical codes locally. The city's own layer is administrative and land-use based: Eugene Code Chapter 8 vests code administration in the city manager, whose adopted technical-code rules govern where they conflict with a specialty code's administrative provisions, and Eugene's land use code, stormwater standards, and middle-housing and ADU rules shape what can be built where. Plans are reviewed under the code in effect on the date the application is accepted.",
  },
  utilities: {
    electric: "Eugene Water & Electric Board (EWEB) — Oregon's largest publicly owned utility",
    notes:
      "EWEB is a combined municipal utility: it provides electricity to roughly 100,000 customers and water to more than 60,000, drawing its water supply from the McKenzie River, so new services, capacity checks, and water connections are coordinated with a single publicly owned board rather than separate providers. Natural gas is NW Natural. Wastewater is handled regionally by the Metropolitan Wastewater Management Commission, the Eugene–Springfield–Lane County partnership, and Energy Trust of Oregon incentives layer on top of EWEB service for qualifying commercial efficiency work.",
  },
  climateNotes:
    "IECC climate zone 4C (marine) in the southern Willamette Valley: long, wet winters with persistent rain rather than deep cold, mild dry summers increasingly marked by wildfire smoke events, and Cascadia subduction seismic exposure that puts Eugene in high seismic design territory. Willamette and McKenzie river floodplains cross the metro, and moisture management — rain screens, drainage planes, and drying potential — is the standing envelope discipline.",
  marketNotes:
    "Eugene's market is anchored by institutions: PeaceHealth is Lane County's largest employer (about 5,600 employees, centered on Sacred Heart Medical Center), the University of Oregon and its Knight Campus for Accelerating Scientific Impact drive laboratory and campus construction, and Lane County, the Eugene School District, and Lane Community College round out the public base. Wood products remain a real industrial sector — Seneca Sawmill in Eugene and Rosboro's glulam expansion across the river in Springfield — and the former Hynix semiconductor plant in west Eugene is the metro's largest industrial redevelopment asset.",
  narratives: {
    mep:
      "MEP design in Eugene is documented to Oregon's statewide specialty codes — the 2025 OSSC and the 2025 OEESC (ASHRAE 90.1-2022) — filed through the City's eBuild system with a project coordinator assigned at intake. The utility picture is unusually simple: EWEB provides both electricity and water as a publicly owned utility, so service design has one counter. Qualifying tenant improvements can bypass the standard queue entirely through the Commercial Express Permit program's same-day multi-discipline review, which rewards complete, coordinated MEP sets.",
    structural:
      "Structural design in Eugene is governed by Cascadia seismic exposure under the 2025 Oregon Structural Specialty Code (2024 IBC basis): high seismic design categories, soft Willamette Valley soils in the river bottoms, and a building stock that mixes heavy-timber and glulam wood construction — the region's signature material — with campus, hospital, and industrial work. Snow loads are modest and wind is moderate; seismic detailing, moisture durability, and existing-building upgrades carry the design effort.",
    civil:
      "Civil design in Eugene works in a wet valley: sites drain toward the Willamette and McKenzie rivers, winter rain rather than snowmelt drives stormwater design, and the City applies its own stormwater and erosion-control standards through the eBuild review alongside land use. Wastewater capacity is regional through the Metropolitan Wastewater Management Commission, and floodplain parcels along both rivers require early elevation and compensatory-storage analysis.",
    energy:
      "Energy compliance in Eugene is documented to the 2025 Oregon Energy Efficiency Specialty Code, built on ASHRAE 90.1-2022 with Oregon amendments — Oregon was the first state to implement 90.1-2022 — including its energy-credit requirements. In zone 4C the compliance margin is won on heat-pump efficiency, envelope air sealing against a long damp heating season, and lighting controls, and Energy Trust of Oregon's New Buildings incentives reward designs that beat the code baseline.",
  },
  faqs: [
    {
      q: "How are building permits filed in Eugene, OR?",
      a: "Online through the City's eBuild system — filing there is mandatory. Building & Permit Services assigns a project coordinator who issues a Commitment Letter with a review estimate. Qualifying commercial tenant infill can use the Commercial Express Permit program (Mondays and Wednesdays) for same-day review and possible same-day issuance.",
    },
    {
      q: "What building code does Eugene enforce?",
      a: "Oregon's statewide specialty codes: the 2025 Oregon Structural Specialty Code (based on the 2024 IBC, mandatory April 1, 2026) and the 2025 Oregon Energy Efficiency Specialty Code (based on ASHRAE 90.1-2022). Eugene administers them under Eugene Code Chapter 8 but does not amend the technical codes locally.",
    },
    {
      q: "Who provides electric and water service in Eugene?",
      a: "The Eugene Water & Electric Board (EWEB), Oregon's largest publicly owned utility, provides both electricity (about 100,000 customers) and water (60,000-plus customers, sourced from the McKenzie River). Natural gas is NW Natural, and wastewater is handled by the Metropolitan Wastewater Management Commission.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 57, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.eugene-or.gov/863/Commercial-Express-Permits"],
      codes: ["https://www.oregon.gov/bcd/codes-stand/Pages/adopted-codes.aspx"],
      amendments: ["https://www.eugene-or.gov/DocumentCenter/View/1025/Codes-in-Effect-Form"],
      utilities: ["https://arcflashtraining.org/in-person-training/eugene-or/"],
      climate: ["https://www.oregon.gov/energy/energy-oregon/pages/energy-code.aspx"],
      market: ["https://www.nucamp.co/blog/coding-bootcamp-eugene-or-top-cybersecurity-employers-in-eugene-whos-hiring-and-what-they-look-for"],
    },
  },
};
