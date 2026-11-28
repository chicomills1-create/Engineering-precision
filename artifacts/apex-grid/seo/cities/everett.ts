import type { CityData } from "../types";

export const everett: CityData = {
  slug: "everett",
  name: "Everett",
  stateSlug: "washington",
  county: "Snohomish County",
  ahj: {
    office: "City of Everett Permit Services, Public Works Department (Everett Municipal Building, 2930 Wetmore Avenue)",
    process:
      "Everett Permit Services takes commercial applications online through the city's eTRAKiT Online Permitting Portal: applicants create an account, select the permit type, and upload against the city's published submittal checklists for building, site-work, and separate trade permits (electrical, mechanical, plumbing, fire alarm, and fire suppression are each their own permit). Plan review adds 75% of the building permit fee, and the city — not Washington L&I — issues electrical permits and performs electrical inspections inside city limits, a distinction out-of-area teams routinely get wrong.",
  },
  codes: {
    building: "2021 International Building Code (IBC) with Washington State amendments (WAC 51-50), as published in the City of Everett adopted construction codes list",
    energy: "2021 Washington State Energy Code — Commercial provisions (WSEC-C, WAC 51-11C)",
    amendments:
      "Washington's code is statewide-amended, and Everett's published list layers the 2021 I-codes with the WAC amendments, the 2023 NEC (WAC 296-46B), and the 2021 Uniform Plumbing Code rather than the IPC. City-specific ordinances add teeth: the Automatic Fire Detection & Suppression Systems Ordinance No. 1902-92 and the Grease Control Ordinance No. 3071-08 both shape commercial submittals, and Everett Municipal Code Chapter 16.05 adds a local administrative article to the NEC for the city's own electrical permitting program.",
  },
  utilities: {
    electric: "Snohomish County Public Utility District (Snohomish PUD) — the public utility district serving Everett and all of Snohomish County",
    notes:
      "Snohomish PUD is a publicly owned utility, so new commercial services, capacity checks, and interconnections run through PUD engineering rather than an investor-owned utility, and the PUD partners with the city on programs such as transit electrification and community solar in south Everett. Water and sewer are City of Everett utilities — the city operates its own water supply and wastewater systems — while natural gas comes from Cascade Natural Gas, so a commercial project coordinates electric with the county PUD and wet utilities inside city hall.",
  },
  climateNotes:
    "IECC/ASHRAE climate zone 4C (marine) on Puget Sound: mild, wet winters with roughly 36 inches of annual rain concentrated October through March, the Puget Sound Convergence Zone dropping heavier rain and wind on Everett than on Seattle, and dry summers. Seismic demand is the structural driver — Cascadia subduction and the South Whidbey Island fault zone — with liquefaction-prone waterfront and river-delta soils along Port Gardner Bay and the Snohomish River.",
  marketNotes:
    "Everett is Snohomish County's seat and an aerospace and defense city: Boeing's Everett factory at Paine Field — the widebody plant building 767/KC-46 and 777 family aircraft — is the region's anchor employer, alongside Naval Station Everett, the Port of Everett's working waterfront and Smith Island industrial land, Providence Regional Medical Center Everett, and Funko's headquarters downtown. Commercial work concentrates in aerospace supplier and industrial buildings, waterfront and downtown redevelopment, medical facilities, and multifamily around Everett Station.",
  narratives: {
    mep:
      "MEP design in Everett runs on Washington's own code set: the 2021 Washington State Energy Code commercial provisions are among the strictest in the country, with fossil-fuel restrictions and heat-pump requirements that shape mechanical selection from the first load calculation, and plumbing is documented to the 2021 Uniform Plumbing Code, not the IPC. Electrical permits come from the City of Everett itself under EMC 16.05 and the 2023 NEC, while service sizing and interconnection run through Snohomish PUD engineering — two separate authorities that must be sequenced, not conflated.",
    structural:
      "Structural design in Everett is seismic-first: zone 4C marine weather is gentle, but Cascadia subduction-zone and South Whidbey Island fault hazard, combined with liquefiable delta and waterfront fill soils along the Snohomish River and Port Gardner Bay, drives foundation and lateral design under the 2021 IBC with Washington amendments. Convergence Zone wind-driven rain also makes envelope detailing and corrosion protection real design inputs for the city's industrial and waterfront stock.",
    civil:
      "Civil design in Everett works to the City of Everett Design and Construction Standards and Specifications for Development (DCSS) and the city's Stormwater Management Manual, in a city where most drainage ultimately reaches the Snohomish River delta or Port Gardner Bay. Site-work permits cover all civil work outside the building envelope, water and sewer services are city utilities permitted separately, and the Grease Control Ordinance adds a pretreatment layer for food-service tenants that civil and plumbing must coordinate early.",
    energy:
      "Energy compliance in Everett is documented to the 2021 Washington State Energy Code — Commercial (WAC 51-11C), a performance-driven code with total building performance and prescriptive paths, on-site renewable and load-management credits, and effective restrictions that push commercial HVAC toward heat pumps. In zone 4C the compliance margin is decided by envelope performance in a long, damp heating season and by ventilation energy in mild summers, and Snohomish PUD's conservation programs add a utility incentive layer on top of code.",
  },
  faqs: [
    {
      q: "Who provides electric service in Everett, WA?",
      a: "Snohomish County Public Utility District (Snohomish PUD), the publicly owned utility serving Everett and all of Snohomish County. New commercial services and interconnections run through PUD engineering. Water and sewer are City of Everett utilities, and natural gas is Cascade Natural Gas.",
    },
    {
      q: "What building and energy codes does Everett enforce?",
      a: "Everett's published construction code list is the 2021 I-codes with Washington State amendments — 2021 IBC (WAC 51-50), 2021 Uniform Plumbing Code, and the 2023 NEC — effective under the Washington State Building Code. Energy work is documented to the 2021 Washington State Energy Code, commercial provisions (WAC 51-11C).",
    },
    {
      q: "Does Everett issue its own electrical permits?",
      a: "Yes. Everett is one of the Washington cities that issue their own electrical permits and perform their own inspections through City Permit Services under Everett Municipal Code Chapter 16.05 — inside city limits you do not buy the electrical permit from Washington L&I. Applications run through the city's eTRAKiT portal.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.everettwa.gov/DocumentCenter/View/38446/How-to-Apply-for-a-Construction-Permit-PDF?bidId="],
      codes: ["https://www.everettwa.gov/DocumentCenter/View/17439"],
      amendments: ["https://www.everettwa.gov/DocumentCenter/View/17439"],
      utilities: ["https://www.bnsf.com/bnsf-resources/pdf/ship-with-bnsf/rail-development/bnsf-premier-one-sheet-everett.pdf"],
      climate: ["https://usclimatedata.com/climate/everett/washington/united-states/uswa0647"],
      market: ["https://www.everettwa.gov/DocumentCenter/View/31750/State-of-Everett-2022"],
    },
  },
};
