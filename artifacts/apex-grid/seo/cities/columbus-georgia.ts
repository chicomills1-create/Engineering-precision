import type { CityData } from "../types";

export const columbusGeorgia: CityData = {
  slug: "columbus",
  name: "Columbus",
  stateSlug: "georgia",
  county: "Muscogee County",
  ahj: {
    office: "Columbus Consolidated Government Inspections & Code Department",
    process:
      "Columbus and Muscogee County operate as a consolidated government, so one Inspections & Code Department reviews plans and issues permits across the city-county under Georgia's State Minimum Standard Codes. Commercial submittals coordinate building, fire, and site reviews within the consolidated government, and Georgia law requires state-licensed design professionals' seals on commercial drawings, checked at intake.",
  },
  codes: {
    building: "Georgia State Minimum Standard Building Code (2018 IBC with Georgia amendments, adopted statewide by the Department of Community Affairs)",
    energy: "Georgia State Minimum Standard Energy Code — 2015 IECC with Georgia Supplements and Amendments (ASHRAE 90.1 as an alternate compliance path)",
    amendments:
      "Georgia's codes are mandatory state minimums: Columbus enforces the IBC with Georgia's state amendments and supplements, and local jurisdictions may amend only within the state's approval framework. The energy code's Georgia supplements adjust the 2015 IECC for Georgia climate conditions, so compliance documentation must run the Georgia edition rather than the base IECC.",
  },
  utilities: {
    electric: "Georgia Power Company serves Columbus",
    notes:
      "Georgia Power, a Southern Company utility, provides electric service and handles new commercial connections and interconnections in Columbus, including the large institutional loads around Fort Moore and the medical centers. The consolidated government itself operates combined utilities functions for water through Columbus Water Works, and natural gas is provided by Liberty Utilities in the Columbus area — a less common provider arrangement in Georgia.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (warm-humid) at the Fall Line on the Chattahoochee River: long hot humid summers, mild winters, and severe thunderstorm and tornado exposure. The Fall Line's geology — Piedmont rock meeting coastal plain sands — changes soils across the city, and river flooding affects the downtown and riverfront districts.",
  marketNotes:
    "Columbus is anchored by Fort Moore (the former Fort Benning), one of the Army's largest installations and the Maneuver Center of Excellence, whose soldiers, families, and contractors drive housing, medical, and commercial construction. Aflac is headquartered here, Global Payments/TSYS anchors a payments-technology cluster, Piedmont Columbus Regional anchors healthcare, and Kia's West Point plant up the I-85 corridor feeds regional supplier growth.",
  narratives: {
    mep:
      "MEP design in Columbus is documented to Georgia's State Minimum Standard Codes — the 2018 IBC with Georgia amendments and the Georgia-supplemented 2015 IECC for energy — with Georgia Power service coordination for the Fort Moore–driven institutional and multifamily load growth. Zone 3A heat and humidity size the cooling and dehumidification systems, and Fall Line soils and riverfront flood conditions reach into equipment placement and below-grade design.",
    structural:
      "Columbus structural design follows the Georgia-amended IBC with low seismic demand and wind and tornado-aware detailing for the Chattahoochee Valley's storm exposure. The Fall Line runs through the city, so foundation conditions change from Piedmont rock in the north to coastal plain sands in the south within a single market — geotechnical verification is never a formality here.",
    civil:
      "Civil design in Columbus runs through the consolidated government's site review, with stormwater draining to the Chattahoochee River — whose whitewater course through downtown is the centerpiece of the riverfront redevelopment — and Columbus Water Works coordination for water and sewer. Fort Moore adjacency and the I-185 corridor shape the largest site programs, and riverfront parcels add floodplain and erosion-control layers.",
    energy:
      "Energy compliance in Columbus is documented to the Georgia State Minimum Standard Energy Code — the 2015 IECC with Georgia Supplements and Amendments, or the ASHRAE 90.1 alternate path — run against the Georgia edition, not the base code. Georgia Power incentive programs support beyond-code measures for the institutional and industrial loads around Fort Moore and the payments cluster.",
  },
  faqs: [
    {
      q: "Who provides electric service in Columbus, GA?",
      a: "Georgia Power Company provides electric service in Columbus, including new commercial connections. Water is Columbus Water Works, and natural gas is Liberty Utilities in the Columbus area.",
    },
    {
      q: "What building code applies in Columbus?",
      a: "Georgia's State Minimum Standard Codes: the 2018 IBC with Georgia amendments for building, and the 2015 IECC with Georgia Supplements and Amendments for energy — enforced by the Columbus Consolidated Government's Inspections & Code Department.",
    },
    {
      q: "What drives Columbus's construction market?",
      a: "Fort Moore (formerly Fort Benning) above all — plus Aflac's headquarters, the Global Payments/TSYS payments cluster, Piedmont Columbus Regional healthcare, and regional growth tied to Kia's West Point plant corridor.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 65, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.columbusga.gov"],
      codes: ["https://www.dca.georgia.gov"],
      amendments: ["https://www.columbusga.gov"],
      utilities: ["https://www.georgiapower.com"],
      climate: ["https://www.weather.gov/ffc/"],
      market: ["https://www.columbusga.gov"],
    },
  },
};
