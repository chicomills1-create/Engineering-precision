import type { CityData } from "../types";

export const elgin: CityData = {
  slug: "elgin",
  name: "Elgin",
  stateSlug: "illinois",
  county: "Kane County",
  ahj: {
    office: "City of Elgin Community Development Department, Building & Development Services Division (150 Dexter Court)",
    process:
      "Elgin's Building & Development Services Division issues every building, electrical, plumbing, and mechanical permit inside city limits from the Community Development Department at 150 Dexter Court, with applications filed in person or by email. Smaller projects run on a quick-permit track the city targets at roughly 3–5 business days, while complex commercial projects go through standard plan review that can run up to about 15 business days. Zoning is reviewed under Title 19 of the Elgin Municipal Code, and properties in a designated historic district need a separate Certificate of Appropriateness from the Heritage Commission before the permit can issue — a sequencing step that catches downtown and east-side projects off guard.",
  },
  codes: {
    building: "2021 International Building Code, as adopted by the City of Elgin with local amendments at Elgin Municipal Code Chapter 16.04 (Ordinance No. G13-25), with the 2021 IMC/IFC/IEBC, the 2020 NEC, and the Illinois Plumbing Code",
    energy: "Illinois Energy Conservation Code — the statewide code administered by the Illinois Capital Development Board; the 2024 IECC as amended by Illinois went into effect November 30, 2025 (preceded by the 2021 IECC edition effective January 1, 2024)",
    amendments:
      "Elgin is a home-rule city and writes its own amendment chapters into Title 16 of its Municipal Code — Chapter 16.04 amends the 2021 IBC, Chapter 16.06 adopts the 2021 IEBC, and plumbing and mechanical work route through the Illinois Plumbing Code and Elgin Chapters 16.20/16.32 rather than the model IPC. Energy is the exception to home rule: the Illinois Energy Conservation Code is mandatory statewide and Elgin cannot weaken it. The historic-district Certificate of Appropriateness requirement is a second local layer with no counterpart in most Illinois suburbs.",
  },
  utilities: {
    electric: "ComEd (Commonwealth Edison, an Exelon company)",
    notes:
      "ComEd delivers electricity in Elgin, so new commercial services, capacity upgrades, and interconnections run through ComEd's service process, while energy supply itself is competitively shoppable in Illinois' deregulated market. Natural gas is Nicor Gas. Water and sewer are City of Elgin utilities drawing on the Fox River and groundwater wells — the city operates its own treatment and distribution — so tap capacity and connection fees are confirmed with the city's Public Works/utility staff during site design.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) in the Fox River valley of northeastern Illinois: cold winters with deep frost penetration and significant heating loads, hot humid summers, and Fox River floodplain along the downtown riverfront. Snow load and freeze protection drive structure and envelope; seismic demand is minimal.",
  marketNotes:
    "Elgin is a mature Fox Valley manufacturing city: a large industrial base along the Randall Road and I-90 (Jane Addams Tollway) corridors, the Grand Victoria Casino riverboat downtown, Advocate Sherman Hospital and Ascension Saint Joseph–Elgin anchoring healthcare, and Elgin Community College driving institutional work. Its extensive historic building stock — including designated historic districts — makes adaptive reuse, re-tenanting, and code-upgrade renovation a larger share of commercial work than in newer suburbs.",
  narratives: {
    mep:
      "MEP design in Elgin is documented to Elgin's amended 2021 code set — 2021 IMC, the Illinois Plumbing Code as locally amended (not the model IPC), and the 2020 NEC — so a set built to a neighboring suburb's IPC-based package will draw plumbing corrections here. Electrical service coordination runs through ComEd while gas design answers to Nicor tariffs, and energy documentation follows the statewide Illinois Energy Conservation Code regardless of the city's local amendments. Historic-district projects add the Heritage Commission's Certificate of Appropriateness ahead of permit issuance.",
    structural:
      "Structural design in Elgin follows the 2021 IBC as amended at Municipal Code Chapter 16.04, with zone 5A drivers: roof snow load, deep frost footings, and wind — seismic demand is negligible. The city's defining structural workload is its older stock: unreinforced masonry and heavy-timber mill and downtown buildings evaluated under the 2021 IEBC (adopted at Chapter 16.06), where change-of-occupancy and alteration triggers, not new-building provisions, decide the scope of structural upgrades.",
    civil:
      "Civil design in Elgin works between Title 19 zoning review and the Fox River: sites along the riverfront and its tributaries carry floodplain and stormwater detention obligations, and Kane County stormwater standards layer onto city review for larger developments. Water and sewer are city utilities, so main capacity, tap fees, and any required extensions are negotiated with the city during entitlement, and parcels on the city's Cook County edge can split jurisdiction in ways the site plan must resolve early.",
    energy:
      "Energy compliance in Elgin follows the Illinois Energy Conservation Code — the one code the city cannot amend — administered statewide by the Capital Development Board; the 2024 IECC as amended by Illinois took effect November 30, 2025, succeeding the 2021 edition. Documentation runs through the code's commercial compliance paths (COMcheck is the common vehicle), and in zone 5A the margin is decided by envelope performance through the heating season and air-barrier continuity in the city's many masonry retrofit projects.",
  },
  faqs: [
    {
      q: "What building codes does Elgin, IL enforce?",
      a: "The 2021 I-codes with local amendments in Title 16 of the Elgin Municipal Code — 2021 IBC (Chapter 16.04, Ordinance G13-25), 2021 IMC and IEBC, the 2020 NEC, and the Illinois Plumbing Code. Energy follows the statewide Illinois Energy Conservation Code (2024 IECC as amended, effective November 30, 2025), which the city cannot locally weaken.",
    },
    {
      q: "How long does permit review take in Elgin?",
      a: "The Building & Development Services Division targets roughly 3–5 business days for quick-permit projects and up to about 15 business days for complex projects in standard plan review. Projects in a designated historic district also need a Certificate of Appropriateness from the Heritage Commission before the permit issues.",
    },
    {
      q: "Who provides utilities in Elgin, IL?",
      a: "ComEd delivers electricity (supply is competitively shoppable in Illinois), Nicor Gas provides natural gas, and water and sewer are City of Elgin utilities sourced from the Fox River and groundwater wells.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 43, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://govcodex.com/blog/elgin-il-building-permit-guide"],
      codes: ["https://elginil.gov/DocumentCenter/View/827/Local-Building-Amendments?bidId"],
      amendments: ["https://elginil.gov/DocumentCenter/View/84915/Existing-Building-Code-Amendments"],
      utilities: ["https://govcodex.com/blog/elgin-il-building-permit-guide"],
      climate: ["https://govcodex.com/blog/elgin-il-building-permit-guide"],
      market: ["https://govcodex.com/blog/elgin-il-building-permit-guide"],
    },
  },
};
