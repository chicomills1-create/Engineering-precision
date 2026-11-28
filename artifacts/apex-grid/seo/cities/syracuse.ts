import type { CityData } from "../types";

export const syracuse: CityData = {
  slug: "syracuse",
  name: "Syracuse",
  stateSlug: "new-york",
  county: "Onondaga County",
  ahj: {
    office: "City of Syracuse Central Permit Office, Division of Code Enforcement (One Park Place, 300 South State Street)",
    process:
      "Syracuse's Central Permit Office coordinates all construction permitting for the city, with separate submission workflows for 1–2 family residential and for commercial work (which includes mixed-use and buildings with three or more units). Applications are filed through the city's online application portal — construction permits migrated to it in 2025 — with document upload, status tracking, and electronic fee payment. Smaller projects needing no additional reviews can receive same-day over-the-counter approval; applications requiring plan check average 2–4 weeks by the city's published figures. Trade and fire-prevention permits are separate, and plumbing permits are obtained through Onondaga County, not the city — a routing step out-of-town teams routinely miss.",
  },
  codes: {
    building: "2025 New York State Uniform Fire Prevention and Building Code (Uniform Code), enforced by the City of Syracuse Division of Code Enforcement",
    energy: "2025 Energy Conservation Construction Code of New York State",
    amendments:
      "New York builds on one statewide code: Syracuse enforces the Uniform Code through its Division of Code Enforcement with amendments adopted by local law, and any local standard stricter than the Uniform Code requires State Code Council approval. The city's distinctive local layers are administrative and housing-focused — plumbing permits run through Onondaga County rather than city hall, and permits are paired with the city's rental registry and lead-safety enforcement, which weigh heavily on renovation of Syracuse's older building stock.",
  },
  utilities: {
    electric: "National Grid",
    notes:
      "National Grid delivers electricity and natural gas in Syracuse, so new commercial services and capacity upgrades run through National Grid's connection process — increasingly important as Micron-driven load growth reshapes Onondaga County's grid planning. Water is a city utility supplied by the City of Syracuse Department of Water from Skaneateles Lake, one of the few unfiltered surface-water supplies in the country, and sewer service is provided by Onondaga County's Department of Water Environment Protection, splitting utility coordination between city hall and the county.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) with a lake-effect signature: Syracuse is one of the snowiest major cities in the US, averaging roughly 127 inches a year off Lake Ontario, which drives high ground and roof snow loads, drift design, and freeze-thaw envelope detailing. Summers are mild-humid, heating dominates energy design, and seismic demand is low.",
  marketNotes:
    "Syracuse's market is being reshaped by Micron Technology's planned semiconductor megafab in Clay, just north of the city — one of the largest industrial investments in US history — which is pulling supplier, housing, and infrastructure work across Onondaga County. Layered on that are the I-81 viaduct replacement, Syracuse University and SUNY Upstate Medical University institutional work, and downtown and Inner Harbor redevelopment, making the pipeline a mix of industrial support, healthcare, education, and multifamily housing.",
  narratives: {
    mep:
      "MEP design in Syracuse is documented to the 2025 Uniform Code and the 2025 Energy Conservation Construction Code of New York State, with electrical work under the NEC as referenced by the state code. The local trap is jurisdictional: the city takes building, trade, and fire-prevention permits through its Central Permit Office and online portal, but plumbing permits are issued by Onondaga County — so the plumbing package follows a different counter, fee, and inspection chain than the rest of the MEP set. National Grid service sizing should start early given county-wide load growth from the semiconductor build-out.",
    structural:
      "Syracuse structural design is a snow-load practice: lake-effect storms off Lake Ontario produce some of the highest ground snow loads of any US metro, and roof design must carry drift accumulation at parapets, roof steps, and adjacent taller structures — the failure mode that governs low-slope commercial roofs here. The 2025 Uniform Code frames wind and snow design, seismic demand is low, and the city's deep stock of older masonry commercial and industrial buildings adds existing-structure evaluation and snow-load re-checks on change of occupancy.",
    civil:
      "Civil design in Syracuse works in a fully built legacy city: combined and separated sewer areas tie into Onondaga County's system, stormwater design must handle both intense summer rain and spring snowmelt volumes, and frost depth and freeze-thaw cycles govern pavement and utility burial design. The I-81 viaduct replacement and Micron-driven growth in the northern suburbs are resetting traffic and utility corridors, while in-city work is mostly infill, so existing-condition and easement verification carries the schedule risk.",
    energy:
      "Energy compliance in Syracuse is documented to the 2025 Energy Conservation Construction Code of New York State, which took effect alongside the 2025 Uniform Code. In zone 5A the margin is decided by envelope performance — air sealing, continuous insulation, and glazing ratios against a long heating season — and by heating-system efficiency, while the state code's electrification direction for new construction (whose all-electric provisions have been the subject of litigation and suspension orders) must be confirmed project-by-project at design start.",
  },
  faqs: [
    {
      q: "Who issues plumbing permits in Syracuse, NY?",
      a: "Onondaga County — not the City of Syracuse. The city's Central Permit Office handles building, trade, and fire-prevention permits, but plumbing permits follow the county's separate process, fee, and inspection chain.",
    },
    {
      q: "What building code does Syracuse enforce?",
      a: "The New York State Uniform Fire Prevention and Building Code — the 2025 Uniform Code — enforced locally by the Division of Code Enforcement, with energy work documented to the 2025 Energy Conservation Construction Code of New York State. Local amendments are adopted by local law, and stricter-than-code local standards need State Code Council approval.",
    },
    {
      q: "How long does plan review take in Syracuse?",
      a: "By the city's published figures, smaller projects that need no additional reviews can be approved same-day over the counter, while applications requiring plan check average 2–4 weeks. Applications are filed through the city's online portal, and issued projects have one year to complete the work.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 52, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://alliancepermitting.com/guides/new-york/syracuse-building-permit"],
      codes: ["https://dos.ny.gov/node/24971"],
      amendments: ["https://alliancepermitting.com/guides/new-york/syracuse-building-permit"],
      utilities: ["https://alliancepermitting.com/guides/new-york/syracuse-building-permit"],
      climate: ["https://zoning.buildingclub.info/new-york/syracuse/building-permits"],
      market: ["https://alliancepermitting.com/guides/new-york/syracuse-building-permit"],
    },
  },
};
