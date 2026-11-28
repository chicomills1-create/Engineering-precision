import type { CityData } from "../types";

export const jackson: CityData = {
  slug: "jackson",
  name: "Jackson",
  stateSlug: "mississippi",
  county: "Hinds County",
  ahj: {
    office: "City of Jackson Office of Code Services, Building Permits Division (Department of Planning and Development)",
    process:
      "Jackson's Building Permits Division, in the Office of Code Services at 200 South President Street, handles application intake and review, permit and certificate-of-occupancy issuance, and inspections for the capital city. Applications are filed through the city's OpenGov online portal — the online system replaced the old in-person paper process in November 2020 — and zoning and historic-district design review sit in the same Department of Planning and Development, so projects in Jackson's historic districts clear design review alongside the building permit. The city publishes no standard plan-review turnaround, so schedules should be confirmed with the division at intake.",
  },
  codes: {
    building: "2018 International Building Code with City of Jackson amendments (City Code §26-60), part of the adopted 2018 ICC family",
    energy: "2012 International Energy Conservation Code, as adopted by the City of Jackson at City Code §26-561",
    amendments:
      "Jackson adopts the 2018 IBC, IRC, IMC, IPC, IFGC, IFC, and IPMC with local amendments, while the 2018 IEBC and the 2017 NEC are adopted without amendments (City Code §26-60). A signature local change deletes IRC Section R313, removing the one- and two-family sprinkler mandate, and downtown's Old Capitol Green Mixed Use District layers the OCG Sustainable Design Guidelines on top of the base codes. Mississippi is a local-option state inland, so Jackson's adopted set — not a statewide code — controls.",
  },
  utilities: {
    electric: "Entergy Mississippi",
    notes:
      "Entergy Mississippi delivers electricity in Jackson, so new commercial services and capacity requests run through Entergy's service process. Water and sewer are the city's long-running infrastructure story: the municipal water system — drawn from the Pearl River and the Ross Barnett Reservoir — and the sewer system are operated by JXN Water, the third-party administrator installed after the 2022 water crisis, and capacity, tap, and backflow questions should be verified with JXN Water early because legacy system condition drives project feasibility here more than in most capitals.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 3A (hot-humid) in central Mississippi: long, humid cooling seasons, severe thunderstorms and tornado exposure, and Pearl River flood risk on the city's east side. Winter design temperatures are mild, but the February 2021 freeze that crippled the water system is the standing resilience reference for freeze protection of plumbing and fire lines.",
  marketNotes:
    "Jackson is Mississippi's capital and its government, healthcare, and education anchor: state government downtown, the University of Mississippi Medical Center, Jackson State University, and Baptist and St. Dominic health systems drive institutional construction, while the metro's industrial growth — Nissan's Canton plant and Amazon's Madison County facilities — sits just north in Madison County. In-city commercial work is dominated by institutional projects, public facilities, and renovation of an aging commercial stock, with water and sewer infrastructure investment a market in itself.",
  narratives: {
    mep:
      "MEP design in Jackson works to an older, stable code set: the 2018 ICC family with city amendments, the 2017 NEC adopted without amendments, and the 2012 IECC for energy. The defining local condition is utility condition rather than code edition — Entergy Mississippi handles electric service, but water and sewer capacity run through JXN Water, the third-party administrator operating the systems after the 2022 crisis, so verifying tap availability and system pressure belongs at schematic design, not at permit submittal through the OpenGov portal.",
    structural:
      "Jackson structural design is shaped by Yazoo clay — the highly expansive soil formation underlying much of the city that swells and shrinks with moisture cycles and punishes shallow foundations. Deep foundations or moisture-controlled foundation systems are the norm for commercial work, and the 2018 IBC wind provisions address the region's severe-thunderstorm and tornado exposure. Seismic demand is modest but not zero, with the New Madrid zone influencing Mississippi design practice, and Pearl River floodplain sites add elevation and flood-vent requirements.",
    civil:
      "Civil design in Jackson is drainage- and infrastructure-led: sites drain toward the Pearl River, whose flooding is the city's defining civil risk, and stormwater design must respect a storm system under active rehabilitation. Water and sewer connections run through JXN Water, and the age of the legacy distribution and collection systems means existing-condition verification — actual main locations, sizes, and condition — carries unusual weight. Erosion control and detention on Yazoo clay sites need geotechnical input from the start.",
    energy:
      "Energy compliance in Jackson is documented to the 2012 IECC, the edition the city adopted at §26-561 — notably older than the 2018 building code it sits beside, so a set documented to a newer IECC needs to be re-based before submittal. In zone 3A the compliance work is cooling and humidity: envelope solar control, right-sized cooling with dedicated dehumidification, and duct sealing decide both compliance and occupant comfort, and Entergy Mississippi's commercial efficiency programs can offset upgrade costs.",
  },
  faqs: [
    {
      q: "What building codes does Jackson, MS enforce?",
      a: "The 2018 ICC family with local amendments — 2018 IBC, IRC, IMC, IPC, IFGC, IFC, and IPMC under City Code §26-60 — plus the 2018 IEBC and 2017 NEC without amendments, and the 2012 IECC for energy under §26-561. One local amendment deletes IRC R313, so one- and two-family homes carry no sprinkler mandate.",
    },
    {
      q: "How do I apply for a building permit in Jackson?",
      a: "Through the City of Jackson's OpenGov online portal, administered by the Building Permits Division of the Office of Code Services (Department of Planning and Development) at 200 South President Street. The division reviews applications, issues permits and certificates of occupancy, and performs inspections; historic-district projects also clear design review in the same department.",
    },
    {
      q: "Who provides electric and water service in Jackson?",
      a: "Entergy Mississippi provides electric service. Water and sewer are city systems operated by JXN Water, the third-party administrator installed after the 2022 water crisis — verify capacity and tap availability with JXN Water early in design.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 52, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://jacksonms.gov/government/city-departments/planning-and-development/office-of-code-services/building-permits/"],
      codes: ["https://jacksonms.gov/government/city-departments/planning-and-development/office-of-code-services/building-permits/"],
      amendments: ["https://library.municode.com/ms/jackson/codes/code_of_ordinances?nodeId=COOR_CH26BUBURE_ARTIVBUCO_S26-60AD"],
      utilities: ["https://alliancepermitting.com/guides/mississippi/jackson-building-permit"],
      climate: ["https://www.instapreview.co/ms/jackson-building-code-review"],
      market: ["https://alliancepermitting.com/guides/mississippi/jackson-building-permit"],
    },
  },
};
