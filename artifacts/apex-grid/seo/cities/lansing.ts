import type { CityData } from "../types";

export const lansing: CityData = {
  slug: "lansing",
  name: "Lansing",
  stateSlug: "michigan",
  county: "Ingham County",
  ahj: {
    office: "City of Lansing Building Safety Office, Economic Development & Planning Department (316 North Capitol Avenue, Suite C-1)",
    process:
      "Lansing's Building Safety Office reviews building plans for compliance with the Michigan Building Code and issues building, electrical, mechanical, plumbing, demolition, and sign permits for the city. Commercial plan review runs on a separate application from the building permit: the applicant submits a plan review application, two sets of signed and sealed construction documents including trades and the specification book, and the plan review fee, and staff typically issue the plan review letter in 10 to 15 business days; resubmittals typically turn in 3 to 5 days. Only after plan review approval — and site plan review approval, where required — can the applicant file for the building and trade permits. Permit applications run online through Access My Gov, all drawings must be combined into a single PDF (other file types are denied), and design professionals must be registered electronically with the city, with stamp, seal, and signature on file, before applying for plan review.",
  },
  codes: {
    building: "2021 Michigan Building Code (based on the 2021 International Building Code with Michigan amendments), effective April 9, 2025 — adopted statewide under the Stille-DeRossett-Hale Single State Construction Code Act and administered locally by the City of Lansing (Codified Ordinances §1420.01)",
    energy: "2021 Michigan Commercial Energy Code (Part 10a) — the 2021 IECC commercial provisions or ANSI/ASHRAE/IES 90.1-2019, with Michigan amendments, effective April 22, 2025",
    amendments:
      "Michigan is a single-state-code state: Lansing cannot locally amend the construction code, and §1420.01 of the Lansing Codified Ordinances provides that where city ordinances conflict with the Michigan Building Code, the state code controls. The Michigan-specific amendments live in the state rules themselves — including the 2023 NEC as adopted by Michigan's Part 8 electrical rules (newer than most neighboring states) and the Michigan Commercial Energy Code's mandatory solar-ready Appendix CB — so the local layer in Lansing is procedural (single-PDF submittal, design-professional registration, separate plan review application), not technical.",
  },
  utilities: {
    electric: "Lansing Board of Water & Light (BWL) — the City of Lansing's municipally owned electric and water utility",
    notes:
      "Lansing is served by its own municipal utility: the Board of Water & Light supplies electricity and water in the city, so new commercial services, capacity checks, and interconnections run through BWL rather than an investor-owned utility — a materially different process from the Consumers Energy and DTE territories that surround it in Ingham County. Natural gas inside Lansing is provided by Consumers Energy, splitting the utility coordination between a city-owned electric/water utility and an investor-owned gas utility on the same project.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) in mid-Michigan: heating-dominated design with deep frost penetration, significant ground snow load, lake-influenced winter weather off Lake Michigan, and hot, humid summer peaks that still size cooling. Freeze protection, snow drift at roof steps, and Grand River floodplain pockets are the recurring local design drivers.",
  marketNotes:
    "Lansing is Michigan's state capital, and state government is the market's backbone, layered with automotive manufacturing — GM's Lansing Delta Township and Grand River assembly plants and the LG Energy Solution battery plant — plus Michigan State University in adjacent East Lansing, University of Michigan Health-Sparrow, and headquarters operations for Auto-Owners Insurance and Jackson National Life. Commercial work concentrates in state facilities, auto and battery plant support, healthcare, university-adjacent development, and downtown office-to-residential conversion.",
  narratives: {
    mep:
      "MEP design in Lansing is documented to the statewide Michigan codes — the 2021 Michigan Mechanical and Plumbing Codes and Michigan's Part 8 electrical rules on the 2023 NEC, which is newer than the edition many out-of-state teams carry. Electrical and water service both run through the city-owned Board of Water & Light while natural gas comes from Consumers Energy, so service coordination splits across two utilities. The Building Safety Office's process rewards complete sets: plan review is a separate application with sealed documents and a 10-to-15-business-day letter, and drawings must arrive as a single combined PDF.",
    structural:
      "Structural design in Lansing follows the 2021 Michigan Building Code (2021 IBC with Michigan amendments), effective April 2025, under climate zone 5A criteria: ground snow load with drift at roof steps, deep frost depth for foundations, and wind design for severe Great Lakes thunderstorms. Seismic demand is low, so snow, frost, and gravity control most designs — and because Michigan law bars local code amendments, a set that complies with the state code in Lansing complies on the same terms anywhere in Michigan.",
    civil:
      "Civil design in Lansing works within a built-out capital city on the Grand River: floodplain pockets along the river and its tributaries, combined and separated sewer districts, and BWL water service all shape site design. Site plan review, where required, must be approved before the building permit can issue, and utility coordination splits between BWL (water) and Consumers Energy (gas) — with electric service also BWL — so early utility mapping matters more here than in single-utility cities.",
    energy:
      "Energy compliance in Lansing is documented to the 2021 Michigan Commercial Energy Code (Part 10a), effective April 2025: either the 2021 IECC commercial provisions or ASHRAE 90.1-2019, with Michigan amendments including the mandatory solar-ready Appendix CB. In heating-dominated zone 5A the margin is won on envelope performance and heating efficiency, and BWL's municipal efficiency programs give commercial owners a local incentive layer on top of the state code.",
  },
  faqs: [
    {
      q: "What building code does Lansing, MI enforce?",
      a: "The 2021 Michigan Building Code (2021 IBC with Michigan amendments), effective April 9, 2025, adopted statewide under the Stille-DeRossett-Hale Act and administered locally under Lansing Codified Ordinances §1420.01. Commercial energy work follows the 2021 Michigan Commercial Energy Code (2021 IECC or ASHRAE 90.1-2019), effective April 22, 2025.",
    },
    {
      q: "How does commercial plan review work in Lansing?",
      a: "Plan review is a separate application from the building permit: submit the plan review application, two sets of signed and sealed construction documents including trades and specifications, and the fee. Staff typically respond in 10 to 15 business days (resubmittals in 3 to 5). Drawings must be one combined PDF, and design professionals must be registered with the city, with stamp and seal on file, before applying.",
    },
    {
      q: "Who provides electric, water, and gas service in Lansing?",
      a: "The Lansing Board of Water & Light (BWL), the city-owned municipal utility, provides electricity and water in Lansing. Natural gas is provided by Consumers Energy, so commercial projects coordinate with both utilities.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 42, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://content.civicplus.com/api/assets/e3239f6a-f8fa-4f74-a1c4-e738525446d0"],
      codes: ["https://www.grossepointefarms.org/departments/building/commercial_and_residential_codes.php", "https://troymi.gov/departments/building_inspections/codes_currently_in_effect.php"],
      amendments: ["https://cityrulelookup.com/cities/lansing-mi/building-safety"],
      utilities: ["https://www.mypriorityhome.com/local-resources/ingham-county-mi/"],
      climate: ["https://www.energycodes.gov/status/states/michigan"],
      market: ["https://arcflashtraining.org/in-person-training/lansing-mi/"],
    },
  },
};
