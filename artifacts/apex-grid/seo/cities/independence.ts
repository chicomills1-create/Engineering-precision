import type { CityData } from "../types";

export const independence: CityData = {
  slug: "independence",
  name: "Independence",
  stateSlug: "missouri",
  county: "Jackson County",
  ahj: {
    office: "City of Independence Community Development Department, Building Inspections Division (Independence Municipal Commons, 20201 East Jackson Drive)",
    process:
      "Independence's Building Inspections Division, within Community Development at the Municipal Commons, issues building, plumbing, and electrical permits and performs code inspections for all new residential and commercial construction. A complete submittal pairs the permit application and fee with a plot plan and the construction drawings the division requires, and no occupancy is allowed until the division's final inspection confirms compliance with the approved plans and a certificate of occupancy issues. The city also publishes an expedited plan review option, and it gates issuance on credentials: general and trade contractors must hold both a city contractor's license and a business license before the permit issues.",
  },
  codes: {
    building: "2024 International Building Code, as adopted and amended in Chapter 4 of the Independence City Code (2024 I-code family adoption, effective January 1, 2025)",
    energy: "2024 International Energy Conservation Code provisions as adopted and amended through Chapter 4 of the Independence City Code — the city's 2024 adoption carries its own energy-code amendments, including revisions to the residential energy chapter (IRC Chapter 11 tables retained in part, wood-frame wall R-value amended to R-13 in climate zone 4); electrical work to the 2023 National Electrical Code",
    amendments:
      "Independence writes real local amendments into Chapter 4: the 2024 IRC adoption deletes Section R309 (no automatic fire sprinkler mandate for new one- and two-family homes), amends Table R301.2(1) with local climatic criteria including a 20 psf ground snow load, rewrites permit-exemption and fee sections, and trims IRC Chapter 11 energy provisions rather than adopting them whole. The city also suspended its New Construction License Surcharge by Ordinance 18939 (2018), a moratorium still in effect — but the dual contractor-license plus business-license requirement remains a hard gate to issuance.",
  },
  utilities: {
    electric: "Independence Power & Light (IPL) — the city-owned municipal electric utility; Evergy serves some Jackson County fringe areas",
    notes:
      "Independence is a public-power city: Independence Power & Light, municipally owned since 1901, serves more than 50,000 customers, so new commercial services, capacity checks, and service changes run through the city utility — and IPL requires the city electrical inspector's approval of new or altered wiring before service is provided, tying the utility release directly to the permit. Water and sewer are also City of Independence utilities, drawn from Missouri River alluvial wells, and natural gas is Spire, which consolidates most utility coordination inside city departments.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 4A (mixed-humid) in western Missouri: hot, humid summers and cold winters, a locally amended ground snow load of 20 psf, severe-thunderstorm and tornado exposure, and freeze-thaw cycling. Design temperatures run from single digits in winter to the mid-90s in summer, so both heating plant and cooling/dehumidification capacity are genuinely sized, not nominal.",
  marketNotes:
    "Independence is Kansas City's largest Missouri-side suburb, anchored by Centerpoint Medical Center, Northrop Grumman's operations tied to the Lake City Army Ammunition Plant area, GEHA, the Independence School District, and Unilever's local plant, with the Harry S. Truman presidential sites driving heritage tourism around Independence Square. Commercial work concentrates along the I-70 and US-40 corridors — logistics and light industrial, medical office, retail re-tenanting, and public/institutional projects for the city and school district.",
  narratives: {
    mep:
      "MEP design in Independence starts with the utility: Independence Power & Light is the city's own municipal utility, service sizing runs through IPL, and IPL will not energize new or altered wiring until the city electrical inspector approves it — so electrical design to the 2023 NEC and inspection sequencing are one conversation, not two. Mechanical and plumbing work is documented to the city's 2024 I-code adoption in Chapter 4, and every contractor on the job needs both a city contractor's license and a business license before the permit issues.",
    structural:
      "Structural design in Independence is governed by the 2024 IBC with the city's own climatic table: a 20 psf ground snow load, tornado-aware detailing for a severe-storm corridor, and freeze-depth foundations for zone 4A winters. Seismic demand is modest but real in eastern Jackson County, and the city's large stock of mid-century commercial and industrial buildings means existing-structure evaluation and change-of-occupancy work under the adopted existing building provisions is a steady share of practice.",
    civil:
      "Civil design in Independence works within a fully built, city-serviced grid: water and sewer are municipal systems sourced from Missouri River alluvial wells, stormwater drains toward the Little Blue and Missouri River watersheds, and site work must satisfy the plot-plan and drainage expectations of the Building Inspections Division at the Municipal Commons. Redevelopment parcels dominate, so utility verification, easements from older plats, and street frontage conditions on the Truman Road and I-70 corridors carry the design risk.",
    energy:
      "Energy compliance in Independence follows the city's 2024 adoption with its own amendments — Independence trimmed and revised the residential energy chapter rather than adopting it whole (including an amended R-13 wood-frame wall value in climate zone 4), so compliance documentation must be built to the Independence text of Chapter 4, not the stock 2024 IECC. In zone 4A both heating and cooling loads matter, and IPL's municipal rates and programs frame the owner's payback case for above-code measures.",
  },
  faqs: [
    {
      q: "What building codes does Independence, MO enforce?",
      a: "The 2024 I-code family as adopted and amended in Chapter 4 of the Independence City Code, effective January 1, 2025 — including the 2024 IBC and 2024 IPC, with electrical work to the 2023 NEC. Local amendments delete the IRC's R309 residential sprinkler mandate and set a 20 psf ground snow load in the city's climatic criteria table.",
    },
    {
      q: "Who provides electric service in Independence, MO?",
      a: "Independence Power & Light (IPL), the city-owned municipal utility founded in 1901, serves most of the city; Evergy serves some Jackson County fringe areas. IPL requires the city electrical inspector's approval before providing service to new or altered wiring. City utilities also provide water and sewer, and Spire provides natural gas.",
    },
    {
      q: "What does a contractor need before an Independence permit issues?",
      a: "Both a City of Independence contractor's license and a business license — the city gates permit issuance on the two credentials together. The long-standing New Construction License Surcharge, by contrast, has been suspended under a 2018 council moratorium (Ordinance 18939) that remains in effect.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 45, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.independencemo.gov/government/city-departments/community-development/building-inspections-division"],
      codes: ["https://www.independencemo.gov/sites/default/files/2025-03/2024%20IRC%20Residential%20Code%20Amendments.pdf"],
      amendments: ["https://www.independencemo.gov/sites/default/files/2025-03/2024%20IRC%20Residential%20Code%20Amendments.pdf"],
      utilities: ["https://utilitiesformyhome.com/utilities/missouri/independence/"],
      climate: ["https://www.independencemo.gov/sites/default/files/2025-03/2024%20IRC%20Residential%20Code%20Amendments.pdf"],
      market: ["https://en.wikipedia.org/wiki/Indep_mo"],
    },
  },
};
