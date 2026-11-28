import type { CityData } from "../types";

export const gresham: CityData = {
  slug: "gresham",
  name: "Gresham",
  stateSlug: "oregon",
  county: "Multnomah County",
  ahj: {
    office: "City of Gresham Building Permits and Inspections, Permit Center (Gresham City Hall, 1333 NW Eastman Parkway)",
    process:
      "Gresham's Building Permits and Inspections division at the City Hall Permit Center issues building permits and performs plan review and inspections inside the city under Gresham Revised Code Article 10.05, which adopts the Oregon specialty codes locally. Projects that require plan review submit plans directly through the Permit Center, and the city points applicants to the State of Oregon Building Codes Division adopted-codes list and the Oregon Design Criteria Hub for the codes and the climatic and geographic design criteria in force. Because Oregon's codes are adopted at the state level and administered locally, the edition in force is set by the state's adoption calendar — including the 2025 OSSC phase-in running to April 1, 2026 — rather than by a city adoption ordinance.",
  },
  codes: {
    building: "2025 Oregon Structural Specialty Code (OSSC) — based on the 2024 International Building Code, International Fire Code, and International Existing Building Code, with Oregon amendments; administrative provisions mandatory October 1, 2025 and construction provisions in phase-in to mandatory April 1, 2026 (adopted locally at Gresham Revised Code §10.05.050)",
    energy: "2025 Oregon Energy Efficiency Specialty Code (OEESC) — Chapter 13 of the OSSC, based on ANSI/ASHRAE/IES Standard 90.1-2022 with Oregon amendments, effective January 1, 2025 and mandatory July 1, 2025",
    amendments:
      "Oregon bars most local technical amendments, so Gresham's local layer is in the Gresham Revised Code and Development Code rather than the building code itself: GRC Article 10.05 adopts the state specialty codes with local administration, appeals, and enforcement provisions (and provides that GRC provisions prevail on administration), and Development Code §4.1568 requires mixed-use, industrial, and office buildings in the Springwater Plan District to earn 3 points from a LEED-based green-building menu — a requirement checked at site plan and building permit review. The city also carries a local sprinkler rule for floating homes moored within six feet of a neighbor.",
  },
  utilities: {
    electric: "Portland General Electric (PGE)",
    notes:
      "Portland General Electric is Gresham's electric utility, so new commercial services, capacity upgrades, and interconnections run through PGE's service process — the city maintains a developer utility contact list that includes a named PGE service coordinator in Gresham. Water, wastewater, and stormwater are City of Gresham utilities, so capacity and connection review for those services sits with the city's engineering and operations staff, while natural gas is provided by NW Natural. Part of the city is also served by the Rockwood Water People's Utility District, so confirming the water provider by address matters on east-side parcels.",
  },
  climateNotes:
    "IECC climate zone 4C (marine) at the east end of the Portland metro: mild, wet winters with long heating seasons, warm dry summers, and Columbia River Gorge outflow winds that funnel damaging gusts into Gresham. Seismic demand is the controlling structural hazard — Seismic Design Category D under the OSSC, with Cascadia Subduction Zone risk behind it — and Johnson Creek and Sandy River floodplains cross the city.",
  marketNotes:
    "Gresham is the eastern anchor of the Portland metro and one of Oregon's largest cities, with a semiconductor and advanced-manufacturing base — Microchip Technology's Gresham fab and onsemi's Gresham wafer fab are signature employers — plus the Springwater industrial district, Legacy Mount Hood Medical Center, and large logistics and distribution stock along the I-84 corridor. Commercial work concentrates in industrial and cleanroom support, medical facilities, distribution, and redevelopment of the Rockwood and Civic Drive station areas on the MAX Blue Line.",
  narratives: {
    mep:
      "MEP design in Gresham is documented to Oregon's statewide specialty codes — the 2025 OSSC package with the Oregon Mechanical and Plumbing Specialty Codes and the state electrical code — while energy compliance runs through the 2025 OEESC (ASHRAE 90.1-2022). Electrical service coordination runs through Portland General Electric, and the city's developer utility contact list names the local PGE service coordinator, while water and sewer capacity sit with the City of Gresham. Semiconductor and industrial clients in the Springwater district add process and cleanroom MEP scope well beyond the base code review.",
    structural:
      "Structural design in Gresham is seismic-first: Seismic Design Category D detailing under the 2025 OSSC (2024 IBC base), with the Cascadia Subduction Zone setting the regional hazard and liquefiable alluvial soils near Johnson Creek and the Sandy River demanding careful geotechnical work. Columbia Gorge outflow winds check the envelope on the city's east side, and snow load is modest — the lateral system, anchorage, and nonstructural bracing carry the design, not gravity snow.",
    civil:
      "Civil design in Gresham is stormwater-first: a wet marine climate, Johnson Creek's floodplain, and Multnomah County drainage expectations make on-site stormwater management and erosion control the controlling site work, and wet-season earthwork is a standing schedule risk. Water, wastewater, and stormwater are City of Gresham utilities, so capacity review sits with city engineering, and Springwater Plan District projects must also document the Development Code's 3-point green-building requirement at site plan and permit review.",
    energy:
      "Energy compliance in Gresham is documented to the 2025 Oregon Energy Efficiency Specialty Code — Chapter 13 of the OSSC, built on ASHRAE 90.1-2022 with Oregon amendments and mandatory since July 1, 2025. Oregon adopts each new ASHRAE 90.1 edition as the first state in the nation, so the commercial bar here is the newest in the country; in zone 4C the margin is decided by heating-season envelope performance, energy credits under Section 11.5, and heat-pump mechanical selections.",
  },
  faqs: [
    {
      q: "What building code does Gresham, OR enforce?",
      a: "The Oregon Structural Specialty Code as adopted locally by Gresham Revised Code §10.05.050 — currently the 2025 OSSC, based on the 2024 IBC with Oregon amendments, in phase-in to mandatory April 1, 2026. Commercial energy work follows the 2025 Oregon Energy Efficiency Specialty Code (ASHRAE 90.1-2022), mandatory since July 1, 2025.",
    },
    {
      q: "Does Gresham have local building code amendments?",
      a: "Oregon adopts its codes at the state level, so Gresham's local layer is administrative and land-use based: GRC Article 10.05 governs local administration, appeals, and enforcement, and Development Code §4.1568 requires mixed-use, industrial, and office buildings in the Springwater Plan District to earn 3 points from a LEED-based green-building menu, checked at site plan and building permit review.",
    },
    {
      q: "Who provides electric, water, and sewer service in Gresham?",
      a: "Electricity comes from Portland General Electric (PGE) and natural gas from NW Natural. Water, wastewater, and stormwater are City of Gresham utilities, though parts of the city are served by the Rockwood Water People's Utility District, so the water provider should be confirmed by address.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 43, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.instapreview.co/or/gresham-building-code-review"],
      codes: ["https://www.oregon.gov/bcd/codes-stand/Documents/eo-energy-20-04-report.pdf"],
      amendments: ["https://www.greshamoregon.gov/globalassets/government/city-codes-and-policies/gresham-revised-code/gresham-revised-code-chapter-10.pdf?id=840", "https://cityrulelookup.com/blog/building-safety-rules-in-gresham-or"],
      utilities: ["https://www.greshamoregon.gov/globalassets/services/utilities/utility-contacts-for-construction-plans.pdf"],
      climate: ["https://smithenergycodes.com/codes/oregon/multnomah-county"],
      market: ["https://www.spestimate.com/oregon-construction-estimating-services/gresham/"],
    },
  },
};
