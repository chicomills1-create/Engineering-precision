import type { CityData } from "../types";

export const bridgeport: CityData = {
  slug: "bridgeport",
  name: "Bridgeport",
  stateSlug: "connecticut",
  county: "Fairfield County",
  ahj: {
    office: "City of Bridgeport Building Department (45 Lyon Terrace, Room 222)",
    process:
      "Bridgeport's Building Department takes all permit applications online through the Park City Portal (selfservice.bridgeportct.gov) — documents must be uploaded as PDFs, and every building permit is paired with a zoning plan application through the Zoning Department in the same portal. The department handles building, electrical, plumbing, HVAC, fire protection, demolition, and sign permits, and solar applications carry two Bridgeport-specific attachments: the Connecticut Standardized Solar PV Permit Application Supplement and a Connecticut structural engineer's roof inspection report. One hard local gate: under Ordinance 15.08.020 the department cannot issue any permit for a property with delinquent property taxes or WPCA sewer user fees.",
  },
  codes: {
    building: "2022 Connecticut State Building Code (based on the 2021 International Building Code with Connecticut amendments), enforced statewide",
    energy: "2021 International Energy Conservation Code with Connecticut amendments, as adopted in the 2022 Connecticut State Building Code",
    amendments:
      "Connecticut runs a genuinely statewide code — the 2022 Connecticut State Building Code (2021 I-codes and 2020 NEC with state amendments) applies uniformly, so Bridgeport's local layer is administrative rather than technical: the Ordinance 15.08.020 bar on permits for tax- or WPCA-delinquent properties, a zoning plan required with every building permit, the 90-day demolition delay for historic buildings under Chapter 15.36, and a PE-stamped structural roof inspection report required with solar applications.",
  },
  utilities: {
    electric: "The United Illuminating Company (UI), an Avangrid utility, provides electric service in Bridgeport; Southern Connecticut Gas provides natural gas",
    notes:
      "UI controls service design and interconnection: grid-tied solar and storage file interconnection applications with UI (installers typically submit through PowerClerk), and systems cannot operate until UI issues Permission to Operate — new residential solar enrolls in Connecticut's Residential Renewable Energy Solutions program. Water is provided by Aquarion Water Company and sanitary sewer by the Bridgeport WPCA (Water Pollution Control Authority) — and WPCA account standing is not just a billing matter, since delinquent sewer fees legally block permit issuance under Ordinance 15.08.020.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) on the Long Island Sound shore: cold winters with coastal snow loads, nor'easters, and hurricane-season wind and storm-surge exposure along the Pequonnock River and harbor. Much of the older building stock sits in or near mapped flood zones, and freeze-thaw cycles punish aging masonry envelopes.",
  marketNotes:
    "Bridgeport is Connecticut's largest city and a legacy manufacturing port reinventing itself: healthcare anchors the market with Bridgeport Hospital (Yale New Haven Health) and St. Vincent's Medical Center (Hartford HealthCare), joined by the University of Bridgeport and Housatonic Community College. Redevelopment concentrates downtown and on the waterfront — Steelpointe Harbor's mixed-use build-out, the Hartford HealthCare Amphitheater, and Total Mortgage Arena — alongside industrial and warehouse work along the I-95 and Seaview Avenue corridors and constant reinvestment in a dense, aging multifamily stock.",
  narratives: {
    mep:
      "MEP design in Bridgeport is documented to the 2022 Connecticut State Building Code — 2021 I-codes and the 2020 NEC with state amendments — and filed through the Park City Portal with a companion zoning plan. Trade permits (electrical, plumbing, HVAC, fire protection) run through the Building Department, and UI interconnection governs anything that generates or stores power: solar needs UI's Permission to Operate, plus the city's PE-stamped roof inspection report and the state solar supplement at permit time. Before any of it, confirm the property is current on taxes and WPCA sewer fees — Ordinance 15.08.020 blocks permit issuance outright.",
    structural:
      "Structural design in Bridgeport follows the state-amended 2021 IBC: zone 5A snow and coastal wind loads, flood-zone foundations along the harbor and Pequonnock River, and seismic provisions above what most of the interior Northeast assumes. The city's building stock skews old — mill buildings, triple-deckers, and early steel-frame commercial blocks — so existing-structure evaluation, masonry assessment, and the 2022 code's existing-building provisions carry as much weight as new-construction design, and rooftop solar always starts with a Connecticut PE's roof inspection report.",
    civil:
      "Civil design in Bridgeport works in a fully built, combined-infrastructure coastal city: site work ties into WPCA sanitary and storm systems, Aquarion water service, and city street-excavation permits for right-of-way work (licensed, bonded contractors only, with a minimum one-week standard review). Waterfront and river-adjacent sites add floodplain, coastal, and environmental review, and Steelpointe-scale redevelopment adds utility-capacity verification with UI, Aquarion, and the WPCA as a front-end design task.",
    energy:
      "Energy compliance in Bridgeport follows the 2021 IECC with Connecticut amendments as adopted in the 2022 Connecticut State Building Code, documented through COMcheck or the ASHRAE 90.1 path. Energize CT programs layer utility incentives on top of code for qualifying efficiency measures, and in zone 5A the compliance margin is won on envelope air sealing and insulation in the city's aging stock, heating-system efficiency, and lighting controls — with UI's interconnection and incentive processes coordinated alongside the energy package.",
  },
  faqs: [
    {
      q: "Who provides electric service in Bridgeport, CT?",
      a: "The United Illuminating Company (UI), an Avangrid utility, provides electric service; Southern Connecticut Gas provides natural gas, Aquarion Water Company provides water, and the Bridgeport WPCA handles sewer. Grid-tied solar and storage need a UI interconnection approval and Permission to Operate.",
    },
    {
      q: "What building code does Bridgeport enforce?",
      a: "The 2022 Connecticut State Building Code, which is genuinely statewide: the 2021 I-codes and 2020 NEC with Connecticut amendments, including the 2021 IECC with state amendments for energy. Bridgeport's own rules are administrative — permits through the Park City Portal, a zoning plan with every building permit, and no permits for properties delinquent on taxes or WPCA sewer fees (Ordinance 15.08.020).",
    },
    {
      q: "How are permits filed in Bridgeport?",
      a: "Online only, through the Park City Portal, with all documents as PDFs. Every building permit pairs with a zoning plan application, solar applications additionally require the Connecticut Standardized Solar PV Permit Application Supplement and a PE-stamped structural roof inspection report, and the Building Department (45 Lyon Terrace, Room 222) cannot issue any permit until property taxes and WPCA sewer fees are current.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 48, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.bridgeportct.gov/government/departments/building-department/building-permit"],
      codes: ["https://www.solarpermitsolutions.com/blog/solar-permitting-in-connecticut"],
      amendments: ["https://www.solarpermitsolutions.com/solar-permit-requirements-in-bridgeport-ct"],
      utilities: ["https://www.solarpermitsolutions.com/solar-permit-requirements-in-bridgeport-ct"],
      climate: ["https://www.solarpermitsolutions.com/blog/solar-permitting-in-connecticut"],
      market: ["https://www.enhance-finance.com/starting-a-business-in-bridgeport-ct"],
    },
  },
};
