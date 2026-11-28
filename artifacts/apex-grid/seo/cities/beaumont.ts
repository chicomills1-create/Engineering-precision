import type { CityData } from "../types";

export const beaumont: CityData = {
  slug: "beaumont",
  name: "Beaumont",
  stateSlug: "texas",
  county: "Jefferson County",
  ahj: {
    office: "City of Beaumont Building Codes Department (Community Development)",
    process:
      "Beaumont's Building Codes Department handles plan review, permit issuance, and inspections inside the city limits, with applications and inspection scheduling running through the city's online City Works portal. Applicants apply for the component permits — new construction, grading, driveway, water, and sewer — and upload one clean PDF of the plans under each permit. The city publishes a commercial plan design guide intended to be used during design so submittals meet minimum requirements before review rather than discovering them in corrections. Alongside the city permit, the Texas Department of Insurance windstorm process runs in parallel for Jefferson County projects and is not satisfied by the city permit.",
  },
  codes: {
    building: "2021 International Building Code (City of Beaumont adopted codes, Ordinance 24-011, with local amendments), with the 2020 National Electrical Code and 2021 International Energy Conservation Code in the adopted package",
    energy: "2021 International Energy Conservation Code, with proof of energy code compliance (REScheck/COMcheck reporting and the city's IECC compliance worksheet) required in the submittal; Texas state energy requirements through SECO also apply",
    amendments:
      "Beaumont's defining local layer is windstorm: Jefferson County is one of Texas's 14 first-tier designated catastrophe counties, so new construction, additions, and reroofs must comply with ICC 600-2020 (Standard for Residential Construction in High-Wind Regions) and the Texas Windstorm Inspection Program, with inspections by a qualified engineer — and new commercial buildings and additions require the ICC 600-2020 compliance form signed and sealed by a structural engineer. All of the city's adopted codes carry local amendments in Chapter 8 of the Beaumont Code of Ordinances.",
  },
  utilities: {
    electric: "Entergy Texas — a regulated investor-owned utility operating in the MISO grid (Beaumont is not in ERCOT)",
    notes:
      "Beaumont is unusual in Texas: electricity comes from Entergy Texas, a regulated utility in the MISO grid, not the deregulated ERCOT market, so new commercial services and interconnections follow Entergy Texas's tariff and service process rather than a retail-provider choice. Entergy has invested heavily in coastal grid hardening since Hurricanes Rita and Ike. Water and sewer are City of Beaumont utilities, applied for as component permits alongside the building permit in the city's portal.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) on the upper Texas Gulf Coast: Beaumont receives some of the highest rainfall in Texas (roughly 60 inches a year), with extreme humidity driving latent cooling loads, hurricane and tropical-storm wind and flood exposure on flat coastal-plain terrain along the Neches River, and expansive clay soils that punish shallow foundations. Design temperatures sit in the mid-90s with very high design dew points.",
  marketNotes:
    "Beaumont anchors the Golden Triangle petrochemical corridor with Port Arthur and Orange: the ExxonMobil Beaumont refinery and chemical complex is the area's largest private employer, joined by Goodyear and DuPont chemical plants in the extraterritorial jurisdiction, the Port of Beaumont (one of the nation's largest seaports by tonnage), Lamar University, and two hospital systems — Baptist Hospitals of Southeast Texas and CHRISTUS St. Elizabeth. Commercial work concentrates in industrial support, port and logistics, healthcare, and university construction.",
  narratives: {
    mep:
      "MEP design in Beaumont is documented to the city's adopted 2021 code package — 2021 IBC and IECC with the 2020 NEC — with energy compliance proof (check reporting plus the city's IECC worksheet) in the submittal. Electrical service runs through Entergy Texas, a regulated MISO utility rather than the ERCOT market, and in zone 2A the mechanical design is a latent-load problem first: extreme Gulf humidity and roughly 60 inches of annual rain drive dehumidification, corrosion protection, and condensate detailing on every commercial system.",
    structural:
      "Structural design in Beaumont carries two overlays most Texas cities do not: as a first-tier catastrophe county, Jefferson County projects must satisfy ICC 600-2020 high-wind construction and the Texas Windstorm Inspection Program, with engineer inspections during construction and, for commercial buildings, a sealed ICC 600 compliance form. Below grade, expansive coastal clays and a high water table on flat Neches River terrain make the geotechnical report and deep foundations the controlling documents, with hurricane wind and flood loads shaping the envelope.",
    civil:
      "Civil design in Beaumont is drainage-first: roughly 60 inches of annual rainfall on flat coastal-plain ground means detention, outfall capacity, and flood elevation drive site layout before anything else. Water and sewer are City of Beaumont utilities applied for as component permits in the same portal as the building permit, and port, refinery, and industrial sites in the extraterritorial jurisdiction add county and industrial-district coordination on top of the city review.",
    energy:
      "Energy compliance in Beaumont is documented to the 2021 IECC, with the city requiring proof of compliance — energy check reporting and its IECC compliance worksheet — as part of the submittal package, and Texas SECO requirements layering on for public projects. In climate zone 2A the margin is decided by cooling efficiency and moisture control, and Entergy Texas's regulated efficiency programs give commercial owners a local rebate path that ERCOT-market cities handle differently.",
  },
  faqs: [
    {
      q: "What building codes has Beaumont, TX adopted?",
      a: "The 2021 I-code package with local amendments (Ordinance 24-011): 2021 IBC, 2021 IRC, 2021 IECC, 2021 International Fuel Gas Code, and the 2020 NEC, among others. All of the city's codes carry local amendments in Chapter 8 of the Code of Ordinances.",
    },
    {
      q: "What is the windstorm requirement for construction in Beaumont?",
      a: "Jefferson County is a first-tier Texas catastrophe county. New construction, additions, and reroofs must comply with ICC 600-2020 and the Texas Windstorm Inspection Program, with inspections by a qualified engineer; new commercial buildings and additions require the ICC 600-2020 form signed and sealed by a structural engineer. The TDI windstorm process runs alongside — and is not satisfied by — the city permit.",
    },
    {
      q: "Who provides electric service in Beaumont, TX?",
      a: "Entergy Texas, a regulated investor-owned utility in the MISO grid. Unlike most of Texas, Beaumont is not in the deregulated ERCOT market, so commercial services follow Entergy Texas's tariff process. Water and sewer are City of Beaumont utilities.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 43, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.beaumonttexas.gov/DocumentCenter/View/4043/Residential-New-Construction-Checklist", "https://alliancepermitting.com/guides/texas/beaumont-building-permit"],
      codes: ["https://www.beaumonttexas.gov/DocumentCenter/View/4043/Residential-New-Construction-Checklist"],
      amendments: ["https://ecode360.com/38653931", "https://alliancepermitting.com/guides/texas/beaumont-building-permit"],
      utilities: ["https://choiceenergynetwork.com/texas-market/city/beaumont"],
      climate: ["https://choiceenergynetwork.com/texas-market/city/beaumont"],
      market: ["https://en.wikipedia.org/wiki/Beaumont,_Texas"],
    },
  },
};
