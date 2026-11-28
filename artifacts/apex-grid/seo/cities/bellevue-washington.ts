import type { CityData } from "../types";

export const bellevue: CityData = {
  slug: "bellevue",
  name: "Bellevue",
  stateSlug: "washington",
  county: "King County",
  ahj: {
    office: "City of Bellevue Development Services Department — Permit Center, Bellevue City Hall (450 110th Ave. NE)",
    process:
      "Bellevue Development Services reviews commercial permits through MyBuildingPermit, the regional online portal shared by Eastside jurisdictions, with applications, plan review, and inspection scheduling all handled electronically. Building, structural, electrical, mechanical, and plumbing review runs through the department's Building Review section — notably, Bellevue issues its own electrical permits and sends its own inspectors, unlike most Washington cities that defer to state Labor & Industries. The city publishes permit dashboards and estimated review timelines, and larger projects typically add separate clearing and grading and utilities permits alongside the building permit.",
  },
  codes: {
    building: "2021 International Building Code as amended by the Washington State Building Code Council (WAC 51-50) and Bellevue City Code Chapter 23.10, effective March 15, 2024",
    energy: "2021 Washington State Energy Code — Commercial Provisions (WAC 51-11C), effective March 15, 2024",
    amendments:
      "Bellevue adopts the state-amended 2021 I-codes through Bellevue City Code Title 23, with local amendments in Chapter 23.10 layered on the Washington State amendments in WAC 51-50 — plans must show compliance with both the state and city amendment sets. The city's 2025 middle-housing amendments (implementing state HB 1110 and HB 1337) reshaped residential permit types, and the 2023 NEC governs electrical work through the end of 2026, when Washington moves to the 2026 edition.",
  },
  utilities: {
    electric: "Puget Sound Energy (PSE) provides electric and natural gas service throughout Bellevue",
    notes:
      "New commercial electric service, meter sets, and any disconnect/reconnect work are coordinated with Puget Sound Energy, which should be engaged early — PSE controls meter placement and service design on its side of the service point. Water, sewer, and stormwater are City of Bellevue Utilities services, so domestic water, side-sewer, and drainage approvals run through the same city hall as the building permit, while the electrical permit itself is issued and inspected by the city rather than Washington L&I.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 4C (marine) on the east shore of Lake Washington: mild wet winters, low cooling loads by national standards, and no significant snow design load at city elevations — but steep-slope neighborhoods around Cougar Mountain and Somerset, mapped critical areas, and Puget Sound seismic exposure (Cascadia and Seattle Fault scenarios) are the real design drivers.",
  marketNotes:
    "Bellevue is the Eastside's high-rise commercial core: a downtown office and residential tower market built around Amazon's multi-tower Bellevue campus, T-Mobile's Factoria headquarters, Expedia, Salesforce, and Meta's nearby Reality Labs, plus the Spring District and Wilburton redevelopment areas and the East Link light rail corridor. Work concentrates in office and lab tenant improvements, mixed-use towers, hospitality, and institutional projects for Overlake Medical Center and Bellevue College.",
  narratives: {
    mep:
      "MEP design in Bellevue is documented to the 2021 I-codes with Washington State and City of Bellevue amendments, and energy compliance runs under the 2021 Washington State Energy Code commercial provisions (WAC 51-11C) — among the most demanding commercial energy codes in the country, with total building performance and energy-credit requirements that shape mechanical system selection early. The city issues and inspects its own electrical permits through MyBuildingPermit, and Puget Sound Energy controls service and meter design, so utility coordination starts at schematic design, not at permit issuance.",
    structural:
      "Structural design in Bellevue is governed by the state-amended 2021 IBC and Puget Sound seismicity: site class, liquefaction potential near the Lake Washington and Lake Sammamish shorelines, and steep-slope critical areas around Cougar Mountain and Somerset frequently control foundation and lateral design. Downtown and Spring District towers add podium, transfer, and wind considerations, while the city's clearing and grading permit track runs parallel to structural review on sloped sites.",
    civil:
      "Civil design in Bellevue works within a mature, environmentally regulated city: stormwater must meet the city's surface water engineering standards with detention and water-quality treatment draining toward Lake Washington, Lake Sammamish, and the Kelsey Creek system, and critical-areas review is routine on sloped or stream-adjacent sites. City of Bellevue Utilities provides water, sewer, and storm service, so utility design is reviewed by the same Development Services department that issues the building permit.",
    energy:
      "Energy compliance in Bellevue follows the 2021 Washington State Energy Code commercial provisions (WAC 51-11C), which exceed the model IECC: envelope, mechanical, and lighting systems are documented through the code's prescriptive, energy-credit, or total building performance paths, and fossil-fuel and electric-resistance heating are heavily restricted. In marine zone 4C the compliance margin is won on heat-pump mechanical design, heat recovery, and lighting controls rather than cooling capacity.",
  },
  faqs: [
    {
      q: "Who provides electric service in Bellevue, WA?",
      a: "Puget Sound Energy (PSE) provides both electric and natural gas service in Bellevue. PSE sets meters and controls service design, while water, sewer, and stormwater are provided by City of Bellevue Utilities. Unusually for Washington, the electrical permit itself is issued and inspected by the City of Bellevue, not state Labor & Industries.",
    },
    {
      q: "What building and energy codes does Bellevue enforce?",
      a: "Bellevue enforces the 2021 I-codes as amended by Washington State (WAC 51-50) with additional City of Bellevue amendments in Bellevue City Code Chapter 23.10, effective March 15, 2024. Commercial energy compliance is under the 2021 Washington State Energy Code, WAC 51-11C, and electrical work follows the 2023 NEC through 2026.",
    },
    {
      q: "How are commercial permits filed in Bellevue?",
      a: "Applications, plan review, and inspection requests run through MyBuildingPermit, the regional portal Bellevue shares with other Eastside cities, administered by the Development Services Department's Permit Center at City Hall. Larger projects typically also need separate clearing and grading and utilities permits, and the city publishes dashboards with estimated review timelines.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 56, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://bellevuewa.gov/city-government/departments/development/contact-us"],
      codes: ["https://bellevuewa.gov/city-government/departments/development/codes-and-guidelines/building-fire-codes-and-guidelines", "https://sbcc.wa.gov/state-codes-regulations-guidelines"],
      amendments: ["https://bellevuewa.gov/city-government/departments/development/codes-and-guidelines/building-fire-codes-and-guidelines"],
      utilities: ["https://bellevuewa.gov/city-government/departments/development/contact-us"],
      climate: ["https://sbcc.wa.gov/state-codes-regulations-guidelines"],
      market: ["https://bellevuewa.gov/city-news/new-online-resources-provide-expanded-access-permitting-information"],
    },
  },
};
