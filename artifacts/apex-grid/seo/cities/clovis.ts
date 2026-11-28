import type { CityData } from "../types";

export const clovis: CityData = {
  slug: "clovis",
  name: "Clovis",
  stateSlug: "california",
  county: "Fresno County",
  ahj: {
    office: "City of Clovis Building Division, Planning and Development Services Department, 1033 Fifth Street",
    process:
      "Clovis's Building Division — created under Title 8 of the Clovis Municipal Code — takes applications through the city's CSS (EnerGov) portal, and electronic plan submittal through the portal is mandatory for dwelling and ADU work and the standard path for commercial projects. Submittals follow the division's published project-specific checklists, fire sprinkler plans must be approved by the City of Clovis Fire Department, and landscaping/WELO plans route to the Engineering Division for approval before the building permit issues — the city expressly warns applicants to start other departments' approvals (Planning, Engineering) early. Building permits are valid for one year from issuance or last inspection.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC), enforced by the Building Division under Title 8 of the Clovis Municipal Code, effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6) — Clovis sits in California Climate Zone 13 — with CALGreen (Title 24, Part 11) mandatory measures",
    amendments:
      "Clovis administers Title 24 with city amendments under its own buildings-and-construction title of the municipal code, and its published submittal standards add local process requirements on top of the state code: fire sprinkler plans are approved by the city Fire Department as part of the permit package, and a WELO landscaping plan must clear the Engineering Division before permit issuance where irrigation is in scope. The city's growth-area development standards and impact-fee programs in its master-planned expansion areas (Loma Vista, Harlan Ranch) shape commercial site design on the northern and eastern edges.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E)",
    notes:
      "PG&E delivers electricity and natural gas in Clovis, so new commercial services, capacity upgrades, and interconnections run through PG&E's service-planning process — a schedule driver in the city's fast-growing northern expansion areas where distribution infrastructure is still being extended. Water, sewer, and refuse are City of Clovis utilities billed through the city's utility billing system, so water capacity and sewer connection review sit with the same city departments that review the site plan. Fire protection is the city's own Fire Department, which approves sprinkler plans inside the building permit package.",
  },
  climateNotes:
    "ASHRAE climate zone 3B / California Climate Zone 13 (hot-dry) on the San Joaquin Valley floor: very hot summers with design temperatures over 100°F, mild winters with dense tule fog, and poor air quality days that push ventilation and filtration design. Seismic demand is moderate — the valley floor is distant from the Coast Range and Sierra faults — so cooling load, not structure, is the dominant design driver; expansive valley soils appear on the eastern alluvial fan.",
  marketNotes:
    "Clovis is one of the faster-growing cities in the San Joaquin Valley, a Fresno suburb of about 129,000 built on master-planned expansion — Loma Vista and Harlan Ranch — and the drawing power of the Clovis Unified School District. Community Medical Centers' Clovis campus anchors a growing medical district, Old Town Clovis holds the historic retail core, and agriculture and food processing across Fresno County feed industrial and cold-storage demand. Commercial work skews to new retail and medical construction in the growth areas plus tenant work in the established Herndon Avenue corridor.",
  narratives: {
    mep:
      "MEP design in Clovis is a Title 24 exercise dominated by cooling: the 2025 California Energy Code in Climate Zone 13 sets aggressive envelope and mechanical-efficiency requirements for a valley city where design temperatures exceed 100°F, CALGreen adds mandatory measures, and electrical work documents to the 2025 California Electrical Code. Service coordination runs through PG&E for both electric and gas, fire sprinkler plans are approved by the Clovis Fire Department as part of the permit package, and submittals move through the city's CSS portal against the Building Division's published checklists.",
    structural:
      "Structural design in Clovis under the 2025 CBC is one of California's lighter seismic assignments — the San Joaquin Valley floor sits away from the active Coast Range faults — so gravity, wind, and the long-span roofs of retail and warehouse work control most designs. Eastern-edge sites on the Sierra alluvial fan can carry expansive soils that drive foundation design, and the city's one-year permit validity clock means structural packages for phased master-planned projects must be sequenced against expiration.",
    civil:
      "Civil design in Clovis is growth-frontier work: new commercial sites in Loma Vista, Harlan Ranch, and the northern expansion areas tie into infrastructure still being built out under the city's development standards, while established areas drain toward Fresno County flood control channels and detention basins. The Engineering Division reviews WELO landscaping and irrigation plans before the building permit issues, water and sewer are city utilities reviewed in the same department family, and PG&E service extensions for new load are the recurring schedule risk on greenfield commercial sites.",
    energy:
      "Energy compliance in Clovis is documented to the 2025 California Energy Code (Title 24, Part 6) in Climate Zone 13 with CALGreen mandatory measures — among the most cooling-dominated compliance exercises in the state. The margin is won on high-efficiency cooling, envelope solar control, and lighting power density, and the city's submittal checklists require the energy documentation (calculations or prescriptive forms keyed to Zone 13) in the package at first submittal. PG&E time-of-use rates reward load-shifting for the retail and cold-storage loads common in the local market.",
  },
  faqs: [
    {
      q: "What building code does Clovis enforce?",
      a: "The 2025 California Building Standards Code — the 2025 CBC (Title 24, Part 2, based on the 2024 IBC) and companion California codes — enforced by the Building Division under Title 8 of the Clovis Municipal Code, effective January 1, 2026. Energy compliance uses the 2025 California Energy Code for Climate Zone 13, plus CALGreen.",
    },
    {
      q: "How are permits filed in Clovis, and what else must clear first?",
      a: "Applications and electronic plans go through the city's CSS (EnerGov) portal. Two approvals ride along with the building permit: fire sprinkler plans must be approved by the City of Clovis Fire Department, and a WELO landscaping plan — where irrigation is in scope — must be approved by the Engineering Division before the building permit issues. Permits are valid one year from issuance or last inspection.",
    },
    {
      q: "Who provides electric, water, and sewer service in Clovis?",
      a: "PG&E provides electricity and natural gas, so new services and capacity run through PG&E's process. Water, sewer, and refuse are City of Clovis utilities, and fire protection is the city's own Fire Department — which also approves sprinkler plans within the permit package.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 45, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.jaspector.com/permits/california/fresno/clovis/"],
      codes: ["https://cms2.revize.com/revize/clovis/documents/Services/Planning Development/Building/Single Family Dwelling Minimum Submittal Requirements 2025.pdf?t=202601061636080&t=202601061636080"],
      amendments: ["https://alliancepermitting.com/guides/california/clovis-building-permit"],
      utilities: ["https://alliancepermitting.com/guides/california/clovis-building-permit"],
      climate: ["https://cms2.revize.com/revize/clovis/documents/Services/Planning Development/Building/Single Family Dwelling Minimum Submittal Requirements 2025.pdf?t=202601061636080&t=202601061636080"],
      market: ["https://alliancepermitting.com/guides/california/clovis-building-permit"],
    },
  },
};
