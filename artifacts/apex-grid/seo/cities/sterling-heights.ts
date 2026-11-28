import type { CityData } from "../types";

export const sterlingHeights: CityData = {
  slug: "sterling-heights",
  name: "Sterling Heights",
  stateSlug: "michigan",
  county: "Macomb County",
  ahj: {
    office: "City of Sterling Heights Building Department (Office of Building, 40555 Utica Road)",
    process:
      "Sterling Heights splits its intake by permit type: electrical, plumbing, mechanical, and roofing trade permits are applied for online, while structural permits — additions, decks, sheds, and new construction — are submitted in person or by mail with plan review. The Building Official reviews plans for conformance with the Michigan Building Code, the city zoning ordinance, and any approved site plan, and a separate zoning compliance permit is required whenever a use or change is regulated by the zoning ordinance. Michigan law (MCL 125.1511) puts the department on a clock: a permit application must be granted or denied within 10 business days, or 15 for an unusually complicated building, and silence past the deadline counts as a denial that can be appealed to the local construction board of appeals.",
  },
  codes: {
    building: "2021 Michigan Building Code (based on the 2021 International Building Code with Michigan amendments), effective April 2025, administered statewide by the LARA Bureau of Construction Codes",
    energy: "2021 Michigan Commercial Energy Code — the 2021 IECC commercial provisions and ASHRAE 90.1-2019, effective April 2025; Sterling Heights is in climate zone 5A",
    amendments:
      "Michigan's Stille-DeRossett-Hale Single State Construction Code Act makes the code uniform statewide — Sterling Heights enforces it but cannot write its own technical amendments. The local layer is the city's zoning ordinance (a zoning compliance permit accompanies regulated changes, and the Building Official checks plans against approved site plans), the 42-inch frost-depth footing requirement applied locally, and Michigan's staggered code calendar: the 2021 mechanical and plumbing codes and the 2023 NEC took effect in March 2024, a full year before the building and energy codes followed in April 2025.",
  },
  utilities: {
    electric: "DTE Energy (DTE Electric) — electric service; Consumers Energy — natural gas service",
    notes:
      "Sterling Heights splits its energy utilities: DTE Electric covers the entire city for electricity, while natural gas comes from Consumers Energy — confirm both at the address level before finalizing service design, because Macomb County's gas map changes by community. New and upgraded services are engineered separately with each utility. Water and sewer are City of Sterling Heights services supplied wholesale by the Great Lakes Water Authority (GLWA), with the city billing through its WaterSmart system — tap and capacity questions go to the city's public services team, and MISS DIG 811 notification is required at least three business days before excavation under Michigan Public Act 174.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) in southeast Michigan: heating-dominated design with a 42-inch frost depth for footings, significant snow loads, freeze-thaw cycling, and humid summers off Lake St. Clair. The Michigan energy code's zone 5A envelope — R-49 ceilings, R-20+5 walls, U-0.30 windows — is among the most demanding in the Midwest and drives both structure and mechanical sizing.",
  marketNotes:
    "Sterling Heights is Macomb County's industrial and defense city: General Dynamics Land Systems is headquartered here, Stellantis's Sterling Heights Assembly Plant builds the Ram 1500, and Ford's Sterling Axle and Van Dyke Transmission plants anchor the automotive supply chain along the M-59 and Van Dyke corridors, with the broader Detroit Arsenal defense cluster in neighboring Warren. Commercial demand runs on supplier plants and flex-industrial, defense and engineering offices, medical facilities, and retail redevelopment along Hall Road (M-59), one of Michigan's busiest commercial corridors.",
  narratives: {
    mep:
      "MEP design in Sterling Heights works on Michigan's staggered code calendar: the 2021 Michigan Mechanical and Plumbing Codes and the 2023 NEC took effect in March 2024, while the building and commercial energy codes followed in April 2025 — the NEC in force is newer than in most surrounding states and catches out-of-state teams. Trade permits file online, energy compliance runs through the 2021 IECC commercial provisions or ASHRAE 90.1-2019, and service design splits between DTE Electric for power and Consumers Energy for gas, two separate utility engineering tracks on every project.",
    structural:
      "Structural design in Sterling Heights follows the 2021 Michigan Building Code with a 42-inch frost depth, southeast Michigan snow loads, and freeze-thaw durability as the recurring drivers; seismic demand is low, so gravity, snow drift on large industrial roofs, and foundation frost protection control most designs. The building stock is heavily industrial and institutional — assembly plants, supplier facilities, and defense campuses — so existing-structure evaluation and heavy equipment foundations under the 2021 Michigan Rehabilitation Code are a steady share of the work.",
    civil:
      "Civil design in Sterling Heights works on flat glacial lake-plain terrain draining toward the Clinton River and Lake St. Clair: stormwater detention, flat grades, and high seasonal water tables shape site design, and the Building Official checks every permit against the zoning ordinance and any approved site plan, with a zoning compliance permit layered onto regulated changes. Water and sewer are city services on GLWA wholesale supply, and MISS DIG 811 notification at least three business days before digging is a statutory prerequisite, not a courtesy.",
    energy:
      "Energy compliance in Sterling Heights is documented to the 2021 Michigan Commercial Energy Code — the 2021 IECC commercial provisions or ASHRAE 90.1-2019 — which took effect in April 2025, a year after the trade codes. In climate zone 5A the prescriptive envelope is demanding (R-49 ceilings, R-20+5 cavity-plus-continuous walls, U-0.30 fenestration), heating loads dominate annual energy, and DTE and Consumers Energy efficiency programs give commercial owners an incentive layer on top of code for qualifying measures.",
  },
  faqs: [
    {
      q: "What building code does Sterling Heights, MI enforce?",
      a: "The 2021 Michigan Building Code, based on the 2021 IBC with Michigan amendments, effective April 2025. Michigan's construction code is uniform statewide under the Stille-DeRossett-Hale Act — the city enforces it but cannot amend it locally. The mechanical and plumbing codes (2021) and the 2023 NEC took effect earlier, in March 2024.",
    },
    {
      q: "How are permits filed in Sterling Heights?",
      a: "Trade permits — electrical, plumbing, mechanical, and roofing — are filed online. Structural permits such as additions and new construction are submitted in person or by mail to the Building Department at 40555 Utica Road and go through plan review. State law requires a decision within 10 business days (15 for unusually complicated buildings).",
    },
    {
      q: "Who provides utilities in Sterling Heights?",
      a: "DTE Energy provides electricity and Consumers Energy provides natural gas. Water and sewer are City of Sterling Heights services supplied wholesale by the Great Lakes Water Authority.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 49, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.doineedapermit.org/permits/room-addition/sterling-heights-mi"],
      codes: ["https://clearedtobuild.com/plan-check-corrections/mi/sterling-heights.html"],
      amendments: ["https://codelibrary.amlegal.com/codes/sterlingheights/latest/sterlinghts_mi/0-0-0-76351"],
      utilities: ["https://whoismyutility.com/michigan/county/macomb"],
      climate: ["https://www.weather.gov/dtx/"],
      market: ["https://www.mypriorityhome.com/local-resources/macomb-county-mi/"],
    },
  },
};
