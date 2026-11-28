import type { CityData } from "../types";

export const carlsbad: CityData = {
  slug: "carlsbad",
  name: "Carlsbad",
  stateSlug: "california",
  county: "San Diego County",
  ahj: {
    office: "City of Carlsbad Community Development Department, Building Division (Faraday Center)",
    process:
      "Carlsbad's Building Division at the Faraday Center runs plan check before any building permit issues: submittals — by the Carlsbad Online Permit Portal (Customer Self Service), email, or in person — are routed to the various city divisions for concurrent review, corrections are returned to the applicant, and the cycle repeats until the set is clean, with city guidance putting first plan-review comments at commonly 2–3 weeks for many projects. Simple no-plan-check residential permits are issued directly through the CSS portal. The municipal code puts a hard clock on the process: plan check extends one year from submittal (CMC 18.04.035), and a review not completed in that year expires, requiring a fresh plan set and a new plan review fee.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC), adopted by the City of Carlsbad with local amendments in Carlsbad Municipal Code Chapter 18.04 (Ordinance No. CS-498), effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6), with CALGreen (Title 24, Part 11) mandatory measures and Carlsbad's own Energy Conservation Regulations at CMC Chapter 18.30",
    amendments:
      "Carlsbad adopts Title 24 by reference across CMC Title 18 — building (18.04), mechanical (18.10), electrical (18.12), plumbing (18.16), green building (18.21) — most recently through Ordinance No. CS-498 for the 2025 editions, with local amendments justified on climatic, geologic, and topographic findings. Two chapters go beyond the state pattern: CMC 18.18 is a standalone Solar Energy Code (also adopting the 2024 Uniform Solar, Hydronics, and Geothermal Code), and CMC 18.30 carries the city's own Energy Conservation Regulations. Coastal-zone parcels add Coastal Commission/local coastal program review, and the city's Habitat Management Plan areas add biological review on top of the building permit.",
  },
  utilities: {
    electric: "San Diego Gas & Electric (SDG&E)",
    notes:
      "SDG&E delivers electricity and natural gas in Carlsbad, so new commercial services, transformer capacity, and interconnections run through SDG&E's service-planning process and its time-of-use commercial rate structures. Water is the Carlsbad Municipal Water District — a city subsidiary district blending imported San Diego County Water Authority supply with local desalination from the Claude 'Bud' Lewis Carlsbad Desalination Plant — and sewer is a City of Carlsbad utility discharging to the Encina wastewater facility, so water and sewer capacity review sits with the city alongside the building permit.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 3C (warm-marine) on the North San Diego County coast: mild temperatures year-round, marine layer, and minimal heating load — but high seismic demand near the Rose Canyon fault system (Seismic Design Category D), coastal corrosion exposure, lagoon and coastal flood considerations, and wildland-urban interface fire severity zones on the city's eastern edges.",
  marketNotes:
    "Carlsbad's commercial market mixes tourism, life sciences, and corporate campuses: LEGOLAND California and the Omni La Costa resort anchor hospitality, a dense life-sciences and biotech cluster (including Thermo Fisher Scientific operations) fills the Palomar Airport Road corridor, the golf industry has a long-standing Carlsbad footprint, and Carlsbad Premium Outlets and The Forum drive retail work. Much of the private pipeline is lab, office, hospitality, and tenant-improvement work in master-planned business parks rather than raw greenfield construction.",
  narratives: {
    mep:
      "MEP design in Carlsbad is documented to the 2025 California codes — Energy Code, Mechanical Code, Plumbing Code, and the 2025 California Electrical Code (2023 NEC base) — as locally amended in CMC Title 18, with CALGreen mandatory measures in the set. Two Carlsbad chapters change the design conversation: the standalone Solar Energy Code (CMC 18.18) and the city's Energy Conservation Regulations (CMC 18.30) layer local expectations onto Title 24 Part 6, and service coordination runs through SDG&E while lab and life-science projects in the Palomar corridor add process exhaust, lab gas, and commissioning scope that standard office submittals never carry.",
    structural:
      "Structural design in Carlsbad is governed by the 2025 CBC at Seismic Design Category D — the Rose Canyon fault system sets the hazard — with coastal exposure driving corrosion protection for concrete and steel near the lagoons and shoreline. Eastern parcels in high fire severity zones pull the California Wildland-Urban Interface Code into the envelope design, and the city's habitat and coastal overlays can reshape a site's buildable footprint before structural design begins, so geotechnical and entitlement checks belong at schematic design.",
    civil:
      "Civil design in Carlsbad answers to three geographies: the coastal zone, where the local coastal program adds review; the lagoon system (Agua Hedionda, Batiquitos, Buena Vista), where stormwater and habitat protections tighten discharge design; and the Habitat Management Plan areas that cover much of the city's remaining open space. Grading and drainage follow the city's standards under the regional MS4 permit, and water and sewer capacity are confirmed with the Carlsbad Municipal Water District and the city sewer utility inside the same development review as the building permit.",
    energy:
      "Energy compliance in Carlsbad is documented to the 2025 California Energy Code (Title 24, Part 6) with CALGreen mandatory measures — and then checked against Carlsbad's own Energy Conservation Regulations at CMC 18.30 and its Solar Energy Code at CMC 18.18, which adopts the 2024 Uniform Solar, Hydronics, and Geothermal Code. In mild zone 3C the compliance margin is decided by lighting, controls, and cooling efficiency rather than heating, and SDG&E's time-of-use rates reward the load-shifting and on-site solar designs the local chapters encourage.",
  },
  faqs: [
    {
      q: "What building code does Carlsbad, CA enforce?",
      a: "The 2025 California Building Standards Code — the 2025 CBC (Title 24, Part 2, based on the 2024 IBC) and companion California codes — adopted with local amendments across Carlsbad Municipal Code Title 18 by Ordinance No. CS-498, effective January 1, 2026. Energy work follows the 2025 California Energy Code plus CALGreen and the city's own Energy Conservation Regulations (CMC 18.30).",
    },
    {
      q: "How long is a Carlsbad plan check valid?",
      a: "One year from the date of submittal, under CMC 18.04.035. If review is not completed within that year the application expires and a new set of plans must be submitted with payment for the subsequent plan review. The city commonly returns first plan-review comments in about 2–3 weeks for many project types.",
    },
    {
      q: "Who provides utilities in Carlsbad, CA?",
      a: "San Diego Gas & Electric provides electric and natural gas service. Water comes from the Carlsbad Municipal Water District — including desalinated supply from the Carlsbad Desalination Plant — and sewer is a City of Carlsbad utility, so water and sewer capacity are reviewed with the city.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 43, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.carlsbadca.gov/departments/community-development/building/permitting"],
      codes: ["https://records.carlsbadca.gov/WebLink/ElectronicFile.aspx?docid=10637640&dbid=0&repo=CityOfCarlsbad&pdfView=true"],
      amendments: ["https://records.carlsbadca.gov/WebLink/ElectronicFile.aspx?docid=10637640&dbid=0&repo=CityOfCarlsbad&pdfView=true"],
      utilities: ["https://alliancepermitting.com/guides/california/carlsbad-building-permit"],
      climate: ["https://alliancepermitting.com/guides/california/carlsbad-building-permit"],
      market: ["https://alliancepermitting.com/guides/california/carlsbad-building-permit"],
    },
  },
};
