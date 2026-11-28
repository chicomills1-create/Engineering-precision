import type { CityData } from "../types";

export const fairfield: CityData = {
  slug: "fairfield",
  name: "Fairfield",
  stateSlug: "california",
  county: "Solano County",
  ahj: {
    office: "City of Fairfield Community Development Department, Building Safety Division (1000 Webster Street, 2nd Floor)",
    process:
      "Fairfield's Building Safety Division reviews all new construction, improvements, and alterations in the city. Applications start by creating an account in the city's BUILD portal and attaching plans and documentation as unsecured PDFs; public kiosks in the Community Development lobby at City Hall support in-person filing. Under Municipal Code §5.1.4.3, fees must be paid and the contractor's license verified before the chief building official issues the permit, permits run one year with up to two one-year extensions, and the chapter carries expedited permit processes for small residential rooftop solar and for EV charging stations.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC), adopted by Ordinance No. 2025-10 in Chapter 5 of the Fairfield Municipal Code, effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6), with the 2025 California Green Building Standards Code (CALGreen, Title 24, Part 11); electrical work to the 2025 California Electrical Code (2023 NEC base)",
    amendments:
      "Ordinance No. 2025-10 repealed and replaced Fairfield's entire Chapter 5 (the Building and Housing Code), adopting the full 2025 Title 24 suite — including the new Part 7 California Wildland-Urban Interface Code — plus the 2024 International Property Maintenance Code, with local administrative amendments covering permits, inspections, certificates of occupancy, and appeals. Fairfield layers its own construction and demolition waste program on CALGreen at Municipal Code §9.460, requiring 65% diversion from landfill, and §5.1.4.5 lets the chief building official accept licensed-professional declarations in place of some special inspections.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E)",
    notes:
      "Pacific Gas and Electric provides electric and natural gas service in Fairfield, so new commercial services, panel upgrades, and transformer capacity run through PG&E's service-planning process. Water is a City of Fairfield utility treated at the North Bay Water Treatment Plant, and wastewater is handled by the Fairfield-Suisun Sewer District — a separate agency from the city — so a commercial project coordinates three utility parties (PG&E, city water, sewer district) alongside the Building Safety Division's permit review.",
  },
  climateNotes:
    "California Building Energy Climate Zone 12 (IECC zone 3, warm-dry trending inland) midway between the Bay Area and Sacramento: hot, dry summers with Delta breeze relief, mild wet winters, and moderate seismic demand from the regional fault system including the Green Valley and Cordelia faults in Solano County. The city's northern and eastern edges carry wildland-urban interface exposure, which is why the 2025 Title 24 adoption adds the Part 7 WUI Code.",
  marketNotes:
    "Fairfield is the Solano County seat, and its market is anchored by Travis Air Force Base — the city's largest employer at more than 13,000 personnel — plus County of Solano government, NorthBay Healthcare and Sutter Fairfield medical campuses, Partnership HealthPlan, and Jelly Belly Candy Company. Commercial work follows the I-80 corridor: logistics and industrial stock, medical office, retail around the Solano Town Center area, and steady base-support and public-sector construction tied to Travis and the county.",
  narratives: {
    mep:
      "MEP design in Fairfield is documented to the 2025 California codes adopted by Ordinance 2025-10: the 2025 California Mechanical and Plumbing Codes for systems work, the 2025 California Electrical Code (2023 NEC base) for power, and the 2025 Energy Code plus CALGreen for efficiency and commissioning. Service design runs through PG&E while the permit is filed through the city's BUILD portal, and medical work for the NorthBay and Sutter campuses adds OSHPD-adjacent scrutiny to otherwise standard commercial plan check.",
    structural:
      "Structural design in Fairfield is governed by the 2025 CBC with moderate seismic demand from Solano County's fault network — the Green Valley and Cordelia faults run through the county's western side — and Delta-influenced soils toward the Suisun Marsh edge that can require liquefaction and settlement attention. Wind is rarely controlling, but the 2025 adoption's new Wildland-Urban Interface Code (Title 24, Part 7) adds ignition-resistant construction requirements on the city's WUI-edge sites.",
    civil:
      "Civil design in Fairfield splits utility coordination three ways: city water from the North Bay Water Treatment Plant system, wastewater through the separate Fairfield-Suisun Sewer District, and PG&E for power and gas — early capacity confirmation with each is the schedule control. Low-lying areas toward Suisun Marsh drain through managed creek and storm systems, grading follows the CBC Appendix J framework the city administers, and CALGreen plus the city's §9.460 program require a 65% construction-waste diversion plan with the project.",
    energy:
      "Energy compliance in Fairfield is documented to the 2025 California Energy Code (Title 24, Part 6) for California Climate Zone 12, with CALGreen mandatory measures and the city's 65% construction and demolition diversion requirement layered on top. In this hot, dry inland-valley zone the margin is decided by cooling efficiency, envelope solar control, and economizer performance, while PG&E time-of-use rates reward load management the code minimum does not capture.",
  },
  faqs: [
    {
      q: "What building code does Fairfield, CA enforce?",
      a: "The 2025 California Building Standards Code (Title 24) — including the 2025 CBC based on the 2024 IBC — adopted by Ordinance No. 2025-10 as Chapter 5 of the Fairfield Municipal Code and effective January 1, 2026. The adoption also adds the new Title 24 Part 7 Wildland-Urban Interface Code and the 2024 International Property Maintenance Code.",
    },
    {
      q: "How do I submit a building permit application in Fairfield?",
      a: "Create an account in the city's BUILD portal and attach plans and documents as PDFs (they must not be secured or password-protected). Fees must be paid and the contractor's license verified before the chief building official issues the permit; permits are valid one year with up to two one-year extensions.",
    },
    {
      q: "Who provides utilities in Fairfield, CA?",
      a: "PG&E provides electricity and natural gas. Water is a City of Fairfield utility (North Bay Water Treatment Plant), and wastewater is handled by the Fairfield-Suisun Sewer District, a separate agency — so commercial projects coordinate three utility parties in addition to the city permit.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.fairfield.ca.gov/government/city-departments/community-development/building-safety/"],
      codes: ["https://eservices.fairfield.ca.gov/WebLink/DocView.aspx?dbid=0&id=99098&repo=SharedDocs"],
      amendments: ["https://eservices.fairfield.ca.gov/WebLink/DocView.aspx?dbid=0&id=99098&repo=SharedDocs"],
      utilities: ["https://www.fairfield.ca.gov/home/showpublisheddocument/12974/638892973523970000"],
      climate: ["https://eservices.fairfield.ca.gov/WebLink/DocView.aspx?dbid=0&id=99098&repo=SharedDocs"],
      market: ["https://www.fairfield.ca.gov/home/showpublisheddocument/3298/637547001758570000"],
    },
  },
};
