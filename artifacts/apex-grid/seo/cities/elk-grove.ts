import type { CityData } from "../types";

export const elkGrove: CityData = {
  slug: "elk-grove",
  name: "Elk Grove",
  stateSlug: "california",
  county: "Sacramento County",
  ahj: {
    office: "City of Elk Grove Building Division (Development Services)",
    process:
      "Elk Grove's Building Division, at City Hall, 8401 Laguna Palms Way, is the sole building authority inside the city — Sacramento County does not permit here. Applications run through the eTrakit portal and all plans and supporting documents are submitted electronically through the Building Division's Filedrop for electronic plan review, routed internally to the Building, Planning, and Development Engineering divisions plus outside agencies. The Division's published handouts set the expectation at a minimum of ten business days for a first plan review and seven business days for subsequent reviews, and fire review is separate: the Cosumnes Community Services District Fire Department enforces the California Fire Code in Elk Grove.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2 — based on the 2024 International Building Code), adopted by Ordinance 24-2025 effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6) — Climate Zone 12, with the 2025 CALGreen code (Part 11)",
    amendments:
      "Elk Grove adopted the 2025 California Building Standards Code essentially without amendment by Ordinance 24-2025 (November 12, 2025), so the local layer is narrow and specific: the City's published design criteria set Risk Category II wind speed at 93 mph in climate zone 12, its flood damage prevention chapter (EGMC 16.50) governs floodplain construction, and the fire code is adopted separately by the Cosumnes CSD Fire Department with localized amendments — including added sprinklers for new manufactured homes (CFC §903.2.8.1.1).",
  },
  utilities: {
    electric: "SMUD — Sacramento Municipal Utility District",
    notes:
      "SMUD, the nation's sixth-largest community-owned electric utility, serves all of Elk Grove with some of the lowest electricity rates in California, and its business development team actively supports new commercial load with rebates and incentives. PG&E provides natural gas. Water comes from the Sacramento County Water Agency, sewer collection and treatment from the Sacramento Area Sewer District (SacSewer), and fire protection from the Cosumnes Community Services District — so a commercial project coordinates four distinct utility and district counters alongside the City's Building Division.",
  },
  climateNotes:
    "Title 24 climate zone 12 in the southern Sacramento Valley: hot, dry summers with long cooling seasons, tule fog in winter, and cool-roof requirements on major roof replacements under the Energy Code. Flood is the standing civil and structural driver — the Cosumnes River and Morrison Creek systems cross the city's growth areas — while seismic demand is moderate and the City publishes a 93 mph Risk Category II design wind speed.",
  marketNotes:
    "Elk Grove is Sacramento County's largest suburb and one of California's fastest-growing master-planned cities, and its General Plan names Apple, Cardinal Health, Amazon, and Kubota among its major employers, alongside Elk Grove Unified — one of the state's largest school districts — the Cosumnes Community Services District, and Kaiser Permanente's South Sacramento medical center at the city's edge. Production housing and master-plan commercial centers dominate new construction, with medical office, logistics along the Highway 99 corridor, and civic work for a still-young city filling out the permit mix.",
  narratives: {
    mep:
      "MEP design in Elk Grove is documented to the 2025 Title 24 suite adopted by Ordinance 24-2025 — the 2025 California Building, Electrical, Mechanical, and Plumbing Codes — and filed electronically through the Building Division's Filedrop and eTrakit. The utility map is the local lesson: SMUD provides electricity at some of California's lowest rates, but water (Sacramento County Water Agency), sewer (SacSewer), gas (PG&E), and fire review (Cosumnes CSD Fire) each sit with a different agency, and energy compliance runs under the 2025 California Energy Code in climate zone 12.",
    structural:
      "Structural design in Elk Grove under the 2025 California Building Code works in a moderate-seismic, flood-influenced valley setting: the City publishes a 93 mph Risk Category II design wind speed, Sacramento Valley alluvial soils govern foundation design, and floodplain parcels near the Cosumnes River and Morrison Creek add elevation and flood-venting requirements. The dominant typologies — production housing, tilt-up and wood-frame commercial centers, and medical office — are detailed to Title 24's seismic and energy-driven envelope requirements.",
    civil:
      "Civil design in Elk Grove is flood-first: the Cosumnes River, Morrison Creek, and their tributaries cross the city's master-planned growth areas, the City's flood damage prevention chapter (EGMC 16.50) sets floodplain construction rules, and Sacramento County drainage standards shape detention design. Water service from the Sacramento County Water Agency and sewer from SacSewer are outside-agency approvals routed through the City's electronic plan review, so utility agency sign-offs belong on the critical path from the first submittal.",
    energy:
      "Energy compliance in Elk Grove is documented to the 2025 California Energy Code (Title 24, Part 6) in climate zone 12, with CALGreen mandatory measures on top. The zone 12 signature requirement is the cool roof: steep-sloped replacements covering more than half the roof must use CRRC-rated products meeting aged solar reflectance and emittance minimums. SMUD's commercial efficiency incentives reward beating the baseline, and in Elk Grove's hot, dry summers the compliance margin is set by cooling efficiency and envelope solar control.",
  },
  faqs: [
    {
      q: "What building code does Elk Grove, CA enforce?",
      a: "The 2025 California Building Standards Code (Title 24), adopted by Ordinance 24-2025 effective January 1, 2026 — the 2025 California Building Code (based on the 2024 IBC), Energy Code, and CALGreen among them. The City adopted the codes essentially without amendment; its published design criteria set Risk Category II wind at 93 mph in climate zone 12.",
    },
    {
      q: "How are building permits filed in Elk Grove?",
      a: "Through the City of Elk Grove Building Division: applications via the eTrakit portal and electronic plan submittal through the Building Division's Filedrop. Published handouts allow a minimum of ten business days for the first plan review and seven for subsequent reviews. Fire review is handled separately by the Cosumnes CSD Fire Department.",
    },
    {
      q: "Who provides utilities in Elk Grove?",
      a: "SMUD provides electricity, PG&E provides natural gas, the Sacramento County Water Agency provides water, and the Sacramento Area Sewer District (SacSewer) provides sewer service. Fire protection is the Cosumnes Community Services District.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 59, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://elkgrove.gov/production-homes-plan-submittal/residential-master-plans"],
      codes: ["https://elkgrove.gov/building-safety-inspection-permits/building-fees-codes-and-standards"],
      amendments: ["https://elkgrove.gov/ordinances/2025-ordinances"],
      utilities: ["https://economic.saccounty.gov/us/en/utility-providers.html"],
      climate: ["https://elkgrove.gov/building-safety-inspection-permits/building-fees-codes-and-standards"],
      market: ["https://sacjobs.com/jobs/sacramento-county/"],
    },
  },
};
