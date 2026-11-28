import type { CityData } from "../types";

export const columbia: CityData = {
  slug: "columbia",
  name: "Columbia",
  stateSlug: "missouri",
  county: "Boone County",
  ahj: {
    office: "City of Columbia Community Development Department, Building and Site Development Division",
    process:
      "Columbia runs permitting as a one-stop shop through Building and Site Development: all submittals go online through the Citizen Self Service (CSS) portal with electronic plan review (eReviews), and a complete package must arrive at one time from one source before review starts. The CSS system automatically pushes the submittal out to the reviewing agencies — Building Safety, Fire, and Columbia Water & Light among them — for concurrent review, and construction plan review must be complete before a permit issues. Permit applicants must hold a City of Columbia contractor license before issuance, and trade permits require city master-level licensure in the trade.",
  },
  codes: {
    building: "2024 International Building Code, adopted by the City of Columbia with local amendments at Code of Ordinances Chapter 6, Article II (§§6-16–6-17), including Appendices C, E, F, I, J, and N",
    energy: "2018 International Energy Conservation Code — Columbia retained the 2018 IECC within its 2024 I-code package, per the Building and Site Development Division's published code list",
    amendments:
      "Columbia's Chapter 6 amendments are substantive and published section-by-section: fences up to 8 feet are exempt from permit (raised from the model code), a building permit extension fee is set at 50% of the permit fee, applications must be accompanied by at least two sets of scaled construction documents, and the code's means-and-methods references are stricken from §101.2. The standout local fact is the split energy edition — the city moved the rest of the I-code family to 2024 (with the 2023 NEC) but kept energy compliance on the 2018 IECC, so a set documented to the 2024 IECC will draw corrections here.",
  },
  utilities: {
    electric: "Columbia Water & Light — the City of Columbia's municipal electric and water utility (Boone Electric Cooperative serves areas outside the city)",
    notes:
      "Columbia is a municipal-utility city: Columbia Water & Light is a routed reviewer on commercial permits, and the city's permitting guidance warns applicants to contact Water & Light about utility design and service as early as possible to avoid project delays — new electric services, upgrades, and relocations are city engineering work, not an investor-owned utility queue. Water and sewer are also city utilities, consolidating capacity, tap, and service design inside the same Community Development review. Boone Electric Cooperative territory begins outside the city service area, so the first utility step on edge-of-city sites is confirming which provider serves the parcel.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 4A (mixed-humid) in central Missouri: four-season design with cold winters, hot humid summers, and severe thunderstorm and tornado exposure. Snow load, frost depth, and wind all check the structure, and Boone County's karst limestone and clay soils make the geotechnical report a real design input rather than a formality.",
  marketNotes:
    "Columbia is mid-Missouri's education and healthcare hub: the University of Missouri flagship campus, MU Health Care's hospital system, and the Truman VA anchor institutional construction, while Shelter Insurance (headquartered in Columbia) and Veterans United Home Loans (also headquartered here) drive office demand. The commercial pipeline is medical, university-adjacent, student and multifamily housing, and retail along the I-70 and US-63 corridors — a steadier, institution-led market than its population alone suggests.",
  narratives: {
    mep:
      "MEP design in Columbia starts with the split code picture: systems are documented to the 2024 I-code package with the 2023 NEC, but energy compliance stays on the 2018 IECC the city retained — confirm the edition on the title block before plan review, because Building Safety reviews against its own published list. Columbia Water & Light is both the electric utility and a routed permit reviewer, and the city tells applicants plainly to engage Water & Light on service design early; trade permits additionally require city master licensure, which out-of-state teams must line up before issuance.",
    structural:
      "Structural design in Columbia is four-season design under the 2024 IBC with the city's Chapter 6 amendments: snow, wind, and frost all govern alongside gravity, and tornado exposure makes safe-room and storm-shelter questions live ones on institutional and assembly work. Boone County soils split between clay and karst limestone, so foundation design follows the geotechnical report closely. The city's amendments require at least two sets of scaled construction documents with the application, including the structural and special-inspection information.",
    civil:
      "Civil design in Columbia runs through Building and Site Development under the city's Unified Development Code, with construction plan review completed before any permit issues and outside-agency approvals — MoDOT, Missouri DNR, the Corps of Engineers where applicable — the developer's responsibility to coordinate. Stormwater design answers to the Hinkson Creek watershed's long-standing water-quality scrutiny, and Water & Light's role as a reviewing agency puts public utility design inside the same submittal rather than behind it.",
    energy:
      "Energy compliance in Columbia is the trap in the record: the city adopted the 2024 I-code family but kept the 2018 IECC as its energy code, so compliance documentation — COMcheck or the prescriptive path — must be run to 2018, not the 2024 edition a design team would default to. In zone 4A both heating and cooling seasons matter, and Columbia Water & Light's municipal efficiency programs give owners a local incentive layer once the code documentation is right.",
  },
  faqs: [
    {
      q: "What building codes does Columbia, MO enforce?",
      a: "The 2024 International Building Codes package — 2024 IBC (with Appendices C, E, F, I, J, and N), IRC, IFC, and IPC, plus the 2023 NEC — adopted with local amendments in Chapter 6 of the city code. The exception is energy: Columbia retained the 2018 IECC, per the Building and Site Development Division's published list.",
    },
    {
      q: "Who provides electric service in Columbia?",
      a: "Columbia Water & Light, the city's municipal utility, inside its service area; Boone Electric Cooperative serves surrounding areas. Water & Light is also a reviewer on commercial permits, and the city advises contacting it about service design as early as possible to avoid delays.",
    },
    {
      q: "How are permits filed in Columbia?",
      a: "Online through the Citizen Self Service (CSS) portal with electronic plan review. The full package must be submitted at one time from one source; CSS routes it to Building Safety, Fire, Columbia Water & Light, and other reviewers concurrently, and plan review must finish before a permit issues. Contractors must hold a City of Columbia license before issuance.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 46, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.como.gov/community-development/building-site-development/"],
      codes: ["https://www.como.gov/community-development/building-site-development/"],
      amendments: ["https://www.como.gov/archive/2025/12/2018-Article-II.-_-BUILDING-CODE.law_.edits_.11.10.25V3-1.pdf"],
      utilities: ["https://www.como.gov/archive/2021/11/Commercial-Development-Plan-Review-Help-Document-Nov-2021.pdf"],
      climate: ["https://oembed-dnr.mo.gov/energy/efficiency/codes-jurisdiction"],
      market: ["https://www.como.gov/community-development/building-site-development/"],
    },
  },
};
