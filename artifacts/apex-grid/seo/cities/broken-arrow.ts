import type { CityData } from "../types";

export const brokenArrow: CityData = {
  slug: "broken-arrow",
  name: "Broken Arrow",
  stateSlug: "oklahoma",
  county: "Tulsa County",
  ahj: {
    office: "City of Broken Arrow Community Permitting and Licensing Division (City Hall, 220 S. First Street)",
    process:
      "Broken Arrow's Community Permitting and Licensing Division takes building, sign, and zoning applications and contractor license registrations at City Hall or online through the city's Citizen Self Service portal, while the separate Inspections division inspects every phase of construction and issues certificates of occupancy. The city is unusually strict on scope: permits are required for any type of structure built within the city, with no size exemption for sheds or accessory buildings. Trade work — electrical, plumbing, and mechanical — is permitted separately and performed by Construction Industries Board licensees, and the city spans the Tulsa–Wagoner county line, with the same city process applying on both sides.",
  },
  codes: {
    building: "2024 International Building Code, as amended by the State of Oklahoma (OUBCC, OAC Title 748 Chapter 20) and adopted by the City of Broken Arrow with city amendments in Chapter 6 of the City Code; electrical work under the 2023 National Electrical Code",
    energy: "No standalone IECC is adopted in Oklahoma; commercial energy compliance runs through Chapter 13 of the 2024 IBC as amended by the OUBCC (OAC 748:20-2-40), which references the 2006 IECC",
    amendments:
      "Oklahoma's codes are statewide minimums adopted by the Uniform Building Code Commission — the 2024 editions took effect September 14, 2026, replacing the 2018 set — and Broken Arrow moved with them: Ordinance 3955 (considered September 15, 2026) revised Chapter 6 of the City Code across the building, residential, electrical, plumbing, fuel gas, and mechanical codes, including tightened landscape-irrigation backflow prevention at Section 6-101. Accessibility follows whichever is more restrictive of the 2010 ADA Standards and the 2009 ANSI A117.1, per the city's adopted-code list.",
  },
  utilities: {
    electric: "Public Service Company of Oklahoma (PSO), an AEP company; natural gas from Oklahoma Natural Gas",
    notes:
      "PSO delivers electricity across Broken Arrow, so new commercial services, capacity checks, and interconnections run through PSO's service process, and Oklahoma Natural Gas serves gas loads. Water and sewer inside the city are Broken Arrow Municipal Authority utilities — the city treats Verdigris River/Lake Oologah basin water and runs its own wastewater system — while the Wagoner County side of the city is partly served by Wagoner County Rural Water District No. 4, so utility confirmation is address-specific near the county line.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 3A (warm-humid) in northeastern Oklahoma: hot summers (July average highs near 94°F), about 42 inches of annual precipitation, and one of the country's most active severe-weather profiles — NWS Tulsa records roughly 445 severe thunderstorm warnings for Tulsa County over 2016–2025, with tornado, large-hail, and straight-line wind exposure driving envelope and shelter design. Ground snow load is a modest 10 psf under the city's amended design-criteria table.",
  marketNotes:
    "Broken Arrow is Tulsa's largest suburb and one of Oklahoma's manufacturing anchors: Zeeco's world headquarters (industrial combustion), FlightSafety International's simulator manufacturing, and a deep base of aerospace, energy-equipment, and advanced manufacturing plants line the industrial corridors, alongside Blue Bell Creameries' Broken Arrow plant. Retail and mixed-use growth concentrates in the revitalized Rose District downtown and in new centers the city reports coming online in 2026–2027 — Adams Creek Town Center in the north and Hackberry Market in the south — with St. John Broken Arrow and Northeastern State University's Broken Arrow campus adding institutional work.",
  narratives: {
    mep:
      "MEP design in Broken Arrow works to a brand-new code set: the 2024 I-codes with Oklahoma's OUBCC amendments and the 2023 NEC, adopted into Chapter 6 of the City Code in September 2026 — a set drawn to the prior 2018 editions needs re-verification before submittal. Electrical service runs through PSO and gas through Oklahoma Natural Gas, and each trade is permitted separately to Construction Industries Board licensees. Commercial energy design follows the Oklahoma path — IBC Chapter 13 as amended, referencing the 2006 IECC — rather than a current IECC edition, which changes the compliance documentation reviewers expect.",
    structural:
      "Broken Arrow structural design is wind-first: Tulsa County's tornado and severe-thunderstorm record puts ASCE 7 wind loads, wind-borne debris judgment, and ICC 500 storm-shelter questions for schools and assembly uses ahead of seismic demand, which is modest (typically Seismic Design Category B). Snow is light at a 10 psf ground load, so roof design is governed by uplift and ponding rather than drift, and the city's manufacturing stock adds heavy floor, crane, and equipment-load design for industrial expansions.",
    civil:
      "Civil design in Broken Arrow must first answer which side of the Tulsa–Wagoner county line the site sits on: city water and sewer cover most of the city, but Wagoner County Rural Water District No. 4 serves part of the east side, and drainage runs to the Arkansas and Verdigris river systems through Adams Creek and its tributaries. The city's stormwater and floodplain management program reviews detention and floodplain encroachment, and the September 2026 code update tightened backflow prevention on irrigation connections to the city water system.",
    energy:
      "Energy compliance in Broken Arrow follows Oklahoma's distinctive route: the state has never adopted a standalone IECC for commercial work, so compliance is documented through Chapter 13 of the 2024 IBC as amended by the OUBCC, which points back to the 2006 IECC — a far older efficiency baseline than neighboring states enforce. In zone 3A the practical design drivers are therefore economic rather than code-driven: PSO demand charges, cooling loads across long hot summers, and envelope performance on the city's large industrial and retail floor plates.",
  },
  faqs: [
    {
      q: "What building codes does Broken Arrow, OK enforce?",
      a: "The 2024 International Codes as amended by the Oklahoma Uniform Building Code Commission — 2024 IBC, IRC, IFC, IMC, IPC, and IFGC — with the 2023 NEC, adopted into Chapter 6 of the City Code (Ordinance 3955, September 2026). The statewide 2024 editions took effect September 14, 2026, replacing the 2018 codes.",
    },
    {
      q: "Does Broken Arrow require a permit for a shed or small accessory building?",
      a: "Yes. The city requires permits for any type of structure built within the city limits and publishes no size exemption for sheds or accessory buildings — a structure a neighboring city might exempt still needs a Broken Arrow permit.",
    },
    {
      q: "Who provides electric, water, and sewer service in Broken Arrow?",
      a: "Electricity comes from Public Service Company of Oklahoma (PSO) and natural gas from Oklahoma Natural Gas. Water and sewer are City of Broken Arrow (Broken Arrow Municipal Authority) utilities for most addresses, though part of the Wagoner County side of the city is served by Wagoner County Rural Water District No. 4 — confirm by address.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 45, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://alliancepermitting.com/guides/oklahoma/broken-arrow-building-permit"],
      codes: ["https://oklahoma.gov/oubcc/codes-and-rules.html"],
      amendments: ["https://library.municode.com/ok/broken_arrow/codes/code_of_ordinances?nodeId=COOR_CH6BUBURE_ARTIII.5INRECOIR_S6-36ADCOOTRE"],
      utilities: ["https://utilitiesformyhome.com/utilities/oklahoma/broken-arrow/"],
      climate: ["https://weatheralertsmap.com/oklahoma/broken-arrow"],
      market: ["https://generalcontractorsbrokenarrow.com/services/mixed-use-construction"],
    },
  },
};
