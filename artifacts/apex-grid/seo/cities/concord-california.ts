import type { CityData } from "../types";

export const concord: CityData = {
  slug: "concord",
  name: "Concord",
  stateSlug: "california",
  county: "Contra Costa County",
  ahj: {
    office: "City of Concord Building Division, Community Development Department — Permit Center (Building D), 1950 Parkside Drive",
    process:
      "Concord runs building, engineering, and planning applications electronically from submittal through issuance: the Virtual Permit Center (Accela) takes the application and PDF plan package, plan check and administrative fees are paid at submittal, and the Permit Center counter on Parkside Drive handles all three disciplines in one place without an appointment. The city's Permit Pal pre-application tool returns zoning information, the permits a project needs, and a fee estimate before anything is filed. Applicants must also file separately with outside agencies when the scope triggers them — the Contra Costa County Fire Protection District, County Health, and the Contra Costa County Sanitation District — and every contractor working in Concord needs a city business license. An application not approved within 12 months, or approved but not issued within 12 months, is null and void.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC) — the 2025 California Building Standards Code under Concord Municipal Code Title 15, with Contra Costa County Fire Protection District amendments including its 2025 California Fire Code and Wildland-Urban Interface Code amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), with CALGreen (Title 24, Part 11) mandatory measures",
    amendments:
      "Concord's code package (Municipal Code Title 15) incorporates the Contra Costa County Fire Protection District's local amendments — including its 2025 Fire Code and 2025 Wildland-Urban Interface Code amendments — so fire and WUI requirements in Concord are the fire district's, not a city fire department's, and hillside parcels near Mount Diablo face the district's WUI detailing. The city's development code and design guidelines add local site and design standards on top of Title 24, and Concord requires a city business license for every contractor as a permit condition.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E)",
    notes:
      "PG&E delivers electricity and natural gas in Concord, so new commercial services and capacity upgrades run through PG&E's service-planning process. Water comes from the Contra Costa Water District — wholesale treated water from the Contra Costa Canal system, retailed in much of the city through the district's City of Concord service arrangement — and wastewater is the Contra Costa County Sanitation District (Central San), which the city names as a separate agency applicants must file with directly. Fire protection is likewise external: the Contra Costa County Fire Protection District reviews fire systems and carries the local fire-code amendments.",
  },
  climateNotes:
    "ASHRAE climate zone 3C / California Climate Zone 12 (warm-dry inland) in the Diablo Valley: hot, dry summers with design temperatures in the upper 90s, mild winters, and Diablo wind events. Seismic demand is high — the Concord and Green Valley faults run through or beside the city and the Calaveras and Hayward faults are near — designing to Seismic Design Category D, and the Mount Diablo foothill edges fall in Fire Hazard Severity Zones under the fire district's WUI amendments.",
  marketNotes:
    "Concord is the largest city in Contra Costa County and an East Bay commercial center whose long-horizon prize is the Concord Naval Weapons Station reuse — thousands of acres of entitled redevelopment beside the North Concord BART station. John Muir Health's Concord medical campus, two BART stations, the Sunvalley mall district, Todos Santos Plaza downtown, and Buchanan Field Airport anchor current demand, and the US-680/I-242 corridor office and industrial stock generates steady tenant-improvement and repositioning work at East Bay price points below the I-680 corridor's southern cities.",
  narratives: {
    mep:
      "MEP design in Concord is documented to the 2025 California codes — Energy Code and CALGreen for efficiency, the 2025 California Electrical Code for power — with Title 24 energy documents and CALGreen materials in the PDF package at submittal through the Virtual Permit Center. The coordination map is regional, not municipal: PG&E for electric and gas service, the Contra Costa County Fire Protection District for sprinkler and alarm review under its own amended fire code, and Central San for sewer capacity — each a separate filing the applicant must initiate, which makes early agency sequencing the schedule discipline on Concord projects.",
    structural:
      "Structural design in Concord is seismic-first at Design Category D under the 2025 CBC: the Concord fault crosses the city, the Green Valley fault runs along its east side, and alluvial Diablo Valley soils over bay-margin deposits to the north add liquefaction screening on low sites. Foothill parcels near Mount Diablo add slope, retaining, and WUI construction requirements under the fire district's amendments, and the city's 1960s–1980s commercial stock means tenant work routinely evaluates older lateral systems against current detailing.",
    civil:
      "Civil design in Concord works across three external utilities — Contra Costa Water District for water, Central San (Contra Costa County Sanitation District) for sewer, and PG&E for power — each with its own application, while the city's Engineering Division reviews grading, drainage, and frontage work through the same Permit Center. Sites drain toward Pine Creek, Walnut Creek, and Suisun Bay, and the Naval Weapons Station reuse area and Buchanan Field environs carry their own master infrastructure plans, so utility capacity confirmation precedes site layout on the city's growth parcels.",
    energy:
      "Energy compliance in Concord is documented to the 2025 California Energy Code (Title 24, Part 6) with CALGreen mandatory measures, filed as part of the electronic submittal package. In Climate Zone 12 the margin is decided by cooling efficiency, envelope solar control, and lighting power density during long hot afternoons, and PG&E time-of-use rates reward load-shifting designs for the medical, retail, and office loads that dominate the local market. The fire district's WUI overlay on foothill sites can additionally constrain roofing and venting choices that interact with the energy model.",
  },
  faqs: [
    {
      q: "What building code does Concord enforce?",
      a: "The 2025 California Building Standards Code — the 2025 CBC (Title 24, Part 2, based on the 2024 IBC) and companion codes — under Concord Municipal Code Title 15, incorporating the Contra Costa County Fire Protection District's amendments, including its 2025 Fire Code and Wildland-Urban Interface Code amendments. Energy work follows the 2025 California Energy Code plus CALGreen.",
    },
    {
      q: "How are building permits processed in Concord?",
      a: "Electronically, end to end: applications and PDF plan packages go through the Virtual Permit Center (Accela) with plan check fees at submittal, and the Permit Center at 1950 Parkside Drive handles building, engineering, and planning at one counter. The Permit Pal tool gives zoning, permit, and fee information before filing. Fire District, County Health, and Central San filings are separate and are the applicant's responsibility; applications die if not approved or issued within 12 months.",
    },
    {
      q: "Who provides electric, water, and sewer service in Concord?",
      a: "PG&E provides electricity and natural gas. Water is Contra Costa Water District water, and wastewater is the Contra Costa County Sanitation District (Central San) — both separate agencies from the city. Fire protection and fire plan review belong to the Contra Costa County Fire Protection District, whose amendments form part of Concord's enforced code package.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 46, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofconcord.org/726/Frequently-Asked-Questions"],
      codes: ["https://www.jaspector.com/permits/california/contra-costa/concord/"],
      amendments: ["https://www.jaspector.com/permits/california/contra-costa/concord/"],
      utilities: ["https://alliancepermitting.com/guides/california/concord-building-permit"],
      climate: ["https://alliancepermitting.com/guides/california/concord-building-permit"],
      market: ["https://alliancepermitting.com/guides/california/concord-building-permit"],
    },
  },
};
