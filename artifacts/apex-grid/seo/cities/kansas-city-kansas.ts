import type { CityData } from "../types";

export const kansasCity: CityData = {
  slug: "kansas-city",
  name: "Kansas City",
  stateSlug: "kansas",
  county: "Wyandotte County",
  ahj: {
    office: "Unified Government of Wyandotte County/Kansas City, Kansas — Building Inspection Division, Neighborhood Resource Center, 4953 State Avenue",
    process:
      "The Unified Government's Building Inspection Division permits construction across Kansas City, Kansas and most of Wyandotte County (Bonner Springs, Edwardsville, and Lake Quivira run their own). Applications are filed online through the NRC E-Link (Accela Citizen Access) portal — Building Inspection staff work remotely and in-person submittals are not received. General contractors and subcontractors must hold the Unified Government's business (occupational tax) license, and electrical, plumbing, and mechanical masters must hold a master license with Building Inspection before permits issue.",
  },
  codes: {
    building: "2018 International Building Code (Unified Government adopted code list, Chapter 8 of the Unified Government Code of Ordinances)",
    energy: "2018 International Energy Conservation Code (Unified Government adopted code list)",
    amendments:
      "Kansas has no statewide building code for private work, so the Unified Government's own adoption in Chapter 8 of its Code of Ordinances is the whole code framework — the published list pairs the 2018 I-codes with the 2018 Uniform Plumbing Code (not the IPC) and the 2017 NEC, with local amendments that delete the model codes' administrative chapters and substitute the Unified Government's own administration provisions in Section 8-25. Code editions here must never be assumed from Kansas City, Missouri across the river, which is a separate jurisdiction entirely.",
  },
  utilities: {
    electric: "Kansas City Board of Public Utilities (BPU) — the publicly owned municipal electric and water utility of the Unified Government",
    notes:
      "BPU is a not-for-profit, publicly owned utility governed by an elected board and operating as an administrative agency of the Unified Government: it provides both electric service (about 65,000 customers) and water (about 51,000 customers, from the Nearman Water Treatment Plant) across Kansas City, Kansas, and combines electric, water, wastewater, stormwater, and trash on one bill. New commercial services and water main work are coordinated with BPU engineering, and BPU's generation mix carries a large renewable share anchored by the Nearman Creek and Quindaro stations and wind purchases.",
  },
  climateNotes:
    "ASHRAE climate zone 4A (mixed-humid) at the confluence of the Kansas (Kaw) and Missouri Rivers: hot humid summers and cold winters with meaningful snow loads, severe thunderstorm and tornado exposure driving wind design, and extensive riverfront floodplain — the Argentine and Armourdale levee districts — making flood elevation a first-order site check.",
  marketNotes:
    "Kansas City, Kansas runs on logistics, health care, and manufacturing: General Motors' Fairfax Assembly plant, Amazon and other distribution operations along the I-70 and I-435 corridors, the University of Kansas Health System and KU Medical Center, and Providence Medical Center anchor demand. The Legends district in western Wyandotte County — Kansas Speedway, Children's Mercy Park, Nebraska Furniture Mart, and Legends Outlets — plus downtown and riverfront redevelopment keep commercial, industrial, and hospitality work flowing.",
  narratives: {
    mep:
      "MEP design in Kansas City, Kansas is documented to the Unified Government's locally adopted codes — the 2018 I-codes with the 2018 Uniform Plumbing Code and 2017 NEC — because Kansas adopts no statewide code for private work. Permits file through Accela Citizen Access with Building Inspection at the Neighborhood Resource Center, trade masters must be licensed with the division, and BPU — the municipal utility — controls both electric service and water, so service design and interconnection are coordinated with one public utility in climate zone 4A's heating-and-cooling swing.",
    structural:
      "Structural design in Kansas City, Kansas follows the 2018 IBC as locally adopted and amended by the Unified Government. Zone 4A brings real snow loads, severe thunderstorm and tornado-driven wind design, and low-to-moderate seismic demand. The defining site issue is the rivers: Kaw and Missouri River floodplains and the levee-protected Argentine and Armourdale districts govern finished-floor elevations and foundation choices on a large share of the industrial land, and riverfront alluvial soils demand geotechnical confirmation.",
    civil:
      "Civil design in Kansas City, Kansas works inside a consolidated city-county: the Unified Government handles permitting, zoning, and stormwater, while BPU supplies water and electric. Sites near the Kaw and Missouri Rivers require floodplain and levee-district verification before grading design, and the city's mature combined infrastructure in the older east side contrasts with greenfield logistics sites along I-435 — utility verification effort follows that split.",
    energy:
      "Energy compliance in Kansas City, Kansas is documented to the 2018 IECC as adopted by the Unified Government — with no state energy code backstop for private work, the local adoption is the entire requirement, and it lags the 2021 and 2024 editions many regional teams now default to. BPU's municipal rate structure and its large renewable generation share frame the operating-cost case, and in zone 4A both heating and cooling efficiency matter to the compliance margin.",
  },
  faqs: [
    {
      q: "Who issues building permits in Kansas City, Kansas?",
      a: "The Building Inspection Division of the Unified Government of Wyandotte County/Kansas City, Kansas, at the Neighborhood Resource Center, 4953 State Avenue. Applications are filed online through Accela Citizen Access (NRC E-Link); in-person submittals are not received. This is a separate jurisdiction from Kansas City, Missouri.",
    },
    {
      q: "What building code does Kansas City, Kansas enforce?",
      a: "The Unified Government's locally adopted list: the 2018 International Building, Residential, Mechanical, Fire, and Energy Conservation Codes, the 2018 Uniform Plumbing Code, and the 2017 NEC, adopted in Chapter 8 of the Unified Government Code of Ordinances. Kansas has no statewide building code for private construction.",
    },
    {
      q: "Who provides electric and water service in Kansas City, Kansas?",
      a: "The Kansas City Board of Public Utilities (BPU), the publicly owned municipal utility of the Unified Government, provides both electricity and water — and bills electric, water, wastewater, stormwater, and trash on one combined bill.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 53, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.wycokck.org/files/assets/public/v/1/neighborhood-resource-center/documents/private-demo-requirements.pdf"],
      codes: ["https://www.wycokck.org/files/assets/public/v/1/neighborhood-resource-center/documents/international-residential-code-irc.pdf"],
      amendments: ["https://www.wycokck.org/files/assets/public/v/1/neighborhood-resource-center/documents/international-residential-code-irc.pdf"],
      utilities: ["https://bpu.com/billing-rates/billing/understanding-bill/"],
      climate: ["https://www.weather.gov/eax/"],
      market: ["https://www.wycokck.org"],
    },
  },
};
