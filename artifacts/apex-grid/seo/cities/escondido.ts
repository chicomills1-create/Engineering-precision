import type { CityData } from "../types";

export const escondido: CityData = {
  slug: "escondido",
  name: "Escondido",
  stateSlug: "california",
  county: "San Diego County",
  ahj: {
    office: "City of Escondido Building Division, Development Services Department (City Hall, 201 N. Broadway)",
    process:
      "Escondido's Building Division accepts plans in electronic format only: portal-listed permit types — commercial and residential MEP trade permits, commercial tenant improvements, solar/PV, signs, and re-roofs — are submitted through the city's portal, while all other applications are emailed to the Building Division and, once accepted as complete, receive an upload link into ProjectDox, the city's electronic plan review system. The division publishes its own numbered submittal guidelines (Guideline 7 sets minimum acceptable plan submittals; Guidelines 24A/24B cover solar), states a plan review time of approximately 30 calendar days per review cycle on a complete set, and offers expedited review for residential rooftop solar. Plan check remains valid one year from submittal.",
  },
  codes: {
    building: "2025 California Building Code (California Code of Regulations, Title 24, Part 2, based on the 2024 IBC), adopted by Ordinance 2025-09 and effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026; CALGreen (Title 24, Part 11) also applies as adopted by the city",
    amendments:
      "Escondido's 2025 adoption (Ordinances 2025-09 and 2025-10) layers two significant local measures onto Title 24: adoption of the state's new Wildland-Urban Interface code for the city's extensive fire-hazard areas, and a local requirement for a technical report for battery energy storage systems at or above 600 kWh. The city adopts the CBC with Appendix Chapters C and I and the California Plumbing Code with Appendices A, D, and H, and excludes all CALGreen appendices.",
  },
  utilities: {
    electric: "San Diego Gas & Electric (SDG&E) provides electric and natural gas service in Escondido",
    notes:
      "SDG&E controls service design, meter placement, and interconnection — solar and storage projects coordinate SDG&E interconnection after city permit issuance, and the city's ADU submittal package even requires an SDG&E notification form up front, a sign of how early the utility enters Escondido projects. Water is a City of Escondido utility (the city treats local surface water from Lake Henshaw and Lake Wohlford at the Escondido–Vista treatment plant), and wastewater is also a city service, so water and sewer capacity checks run through City Hall while electric and gas run through SDG&E.",
  },
  climateNotes:
    "California Energy Commission climate zone 10 / ASHRAE zone 3B in inland North San Diego County: hot, dry summers with design temperatures near 100°F, mild winters, and Santa Ana wind events. Much of the city sits in or beside Very High Fire Hazard Severity Zones, and seismic design is governed by Southern California faulting — wildfire and heat, not cold, drive the envelope and site design.",
  marketNotes:
    "Escondido's commercial market is anchored by healthcare and regional retail: Palomar Medical Center Escondido is one of the largest hospital campuses in the county, the Escondido Auto Park and the Westfield North County retail corridor draw regional commercial work, and downtown's Grand Avenue is in an ongoing revitalization. The San Diego Zoo Safari Park in the San Pasqual Valley, Stone Brewing's headquarters presence, and a working avocado-and-citrus agricultural belt add hospitality, industrial, and ag-processing projects to the mix.",
  narratives: {
    mep:
      "MEP design in Escondido is documented to the 2025 Title 24 package — California Building, Electrical, Mechanical, and Plumbing Codes — with Title 24 energy documentation (Part 6) built into the plan set per the Building Division's Guideline 7 submittal checklist. Commercial tenant improvements and MEP trade permits go through the city portal and ProjectDox review at roughly 30 days per cycle, and SDG&E service and interconnection coordination runs on its own track. The city's local battery-storage amendment — a technical report for systems at or above 600 kWh — catches commercial storage designs that sail through neighboring jurisdictions.",
    structural:
      "Structural design in Escondido follows the 2025 California Building Code (2024 IBC base) under Southern California seismic demands, with site-specific geotechnical work complicated by the valley's mix of alluvium, decomposed granite, and hillside terrain. The 2025 adoption's Wildland-Urban Interface code changes exterior construction, vents, and materials for the many sites in mapped fire hazard zones, so the WUI determination belongs in the structural and architectural scope from day one.",
    civil:
      "Civil design in Escondido is reviewed across the Building, Planning, Fire, and Engineering departments — the city's own plot-plan guideline carries signature blocks for all four — with grading, drainage, and stormwater BMPs per the Engineering Department's standards for work draining toward Escondido Creek and the San Dieguito watershed. Water and sewer are city utilities, so capacity and connection design stay inside City Hall, while hillside and fire-zone sites add defensible-space and access requirements to the grading plan.",
    energy:
      "Energy compliance in Escondido is documented to the 2025 California Energy Code (Title 24, Part 6), with CALGreen measures layered on top — the Building Division's submittal checklist treats Title 24 energy documentation as a gating item for a complete plan set. In CEC climate zone 10 the compliance margin is won on cooling efficiency, envelope solar control, and — increasingly — rooftop PV and battery storage, which in Escondido also triggers the city's local technical-report requirement for storage systems of 600 kWh or more.",
  },
  faqs: [
    {
      q: "Who provides electric service in Escondido, CA?",
      a: "San Diego Gas & Electric (SDG&E) provides electric and natural gas service. SDG&E controls service design and interconnection, while water and wastewater are City of Escondido utilities. The city's permit process builds SDG&E coordination in early — even ADU submittals require an SDG&E notification form.",
    },
    {
      q: "What building codes does Escondido enforce?",
      a: "Escondido enforces the 2025 California Building Standards Code (Title 24), adopted by Ordinances 2025-09 and 2025-10 and effective January 1, 2026 — including the 2025 CBC, California Electrical, Mechanical, and Plumbing Codes, the 2025 Energy Code (Part 6), and CALGreen. Local amendments add the Wildland-Urban Interface code and a technical-report requirement for battery storage systems of 600 kWh or more.",
    },
    {
      q: "How long does plan review take in Escondido?",
      a: "The Building Division publishes approximately 30 calendar days per review cycle once a complete set of construction documents is received. Plans are electronic-only: listed permit types file through the city portal, other applications are emailed in and uploaded to ProjectDox once accepted, and residential rooftop solar has an expedited review path.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 50, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://fire.escondido.org/215/Building"],
      codes: ["https://ecode360.com/43254887"],
      amendments: ["https://citizenportal.ai/articles/7207155/California/San-Diego-County/Escondido/Escondido-council-adopts-2025-California-building-standards-adds-WUI-and-batterystorage-requirements"],
      utilities: ["https://police.escondido.org/DocumentCenter/View/549/ADU-Handout-and-Submittal-Checklist-PDF"],
      climate: ["https://ecode360.com/43254887"],
      market: ["https://www.escondido.gov/DocumentCenter/View/9209/16A---Site-Plan-85-x-11-PDF"],
    },
  },
};
