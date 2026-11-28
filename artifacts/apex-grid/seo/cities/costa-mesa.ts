import type { CityData } from "../types";

export const costaMesa: CityData = {
  slug: "costa-mesa",
  name: "Costa Mesa",
  stateSlug: "california",
  county: "Orange County",
  ahj: {
    office: "City of Costa Mesa Economic and Development Services Department, Building Safety Division (City Hall, 77 Fair Drive, 2nd floor)",
    process:
      "All Costa Mesa applications are submitted through TESSA, the city's Tyler EnerGov online portal — plans upload as PDFs, fees are invoiced and paid in the portal, and inspections are scheduled there as well. A building technician is assigned to coordinate each project through completeness review and plan check, with corrections and rechecks handled electronically; the building plan check fee is 65% of the building permit fee, and an accelerated plan check lane is offered for an added consultant and administrative charge. Limited-scope work can qualify for Insta-Permits, which the city says can often issue in 20 minutes or less once standard forms are uploaded.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC), as adopted by the City of Costa Mesa effective January 1, 2026, with local amendments in Title 5 of the Costa Mesa Municipal Code",
    energy: "2025 California Energy Code (Title 24, Part 6), with CALGreen (Title 24, Part 11) mandatory measures",
    amendments:
      "Costa Mesa adopts the California Building Standards Code in Title 5 of its Municipal Code with local amendments, adopts the Orange County Grading and Excavation Code for grading work, and imposes its own construction-and-demolition waste diversion requirements on permitted projects on top of CALGreen. Sewer lateral work is a separate permit track through the Costa Mesa Sanitary District, not City Hall.",
  },
  utilities: {
    electric: "Southern California Edison (SCE)",
    notes:
      "Southern California Edison delivers electricity in Costa Mesa, so new commercial services, panel upgrades, and transformer capacity run through SCE's service-planning process. Water is not a city utility: the independent Mesa Water District supplies Costa Mesa from 100% local groundwater, while the Costa Mesa Sanitary District runs the local sewer collection system and passes wastewater to Orange County Sanitation (OC San) for treatment — so a commercial project coordinates three separate utility agencies in addition to the building permit.",
  },
  climateNotes:
    "California Energy Commission climate zone 6 / ASHRAE zone 3C (warm-marine) on the coastal Orange County plain: mild temperatures with marine-layer cooling, so Title 24 compliance is driven more by lighting, envelope solar control, and ventilation than by heating or heavy cooling plant. Seismic demand is the controlling structural climate fact — the Newport-Inglewood fault zone runs through the area and designs carry Seismic Design Category D detailing.",
  marketNotes:
    "Costa Mesa's commercial market is anchored by South Coast Plaza — one of the highest-grossing retail centers in the United States — and the Segerstrom Center for the Arts district, plus the OC Fair & Event Center and a substantial light-industrial and creative-office stock along the SR-55 and Harbor Boulevard corridors and around John Wayne Airport. Much of the private work is retail and restaurant tenant improvement, hotel and mixed-use redevelopment, and industrial flex conversion rather than greenfield construction.",
  narratives: {
    mep:
      "MEP design in Costa Mesa is documented to the 2025 California codes: the Energy Code (Title 24, Part 6) governs envelope, lighting, and mechanical efficiency, the 2025 California Electrical Code (2023 NEC base) governs distribution, and CALGreen adds mandatory measures. Service coordination runs through Southern California Edison while the permit runs through Building Safety in TESSA, and sewer laterals take a second track with the Costa Mesa Sanitary District — sequencing those two agencies early keeps a tenant improvement from stalling at issuance.",
    structural:
      "Structural design in Costa Mesa is seismic-first: Seismic Design Category D detailing under the 2025 CBC, with the Newport-Inglewood fault zone crossing the city setting the hazard level for both new work and seismic evaluation of the city's large mid-century commercial stock. Wind demand is modest on the coastal plain, so lateral design is governed by earthquake forces and the anchorage and bracing of nonstructural components that Title 24 enforces strictly in retail and assembly occupancies.",
    civil:
      "Civil design in Costa Mesa works in a fully built-out city: grading follows the Orange County Grading and Excavation Code as adopted by the city, stormwater compliance runs under Orange County's MS4 program with low-impact-development requirements, and utility coordination splits three ways — Mesa Water District for water, the Costa Mesa Sanitary District for sewer collection, and OC San for treatment. Existing-condition verification and lateral capacity checks carry more weight here than new trunk infrastructure.",
    energy:
      "Energy compliance in Costa Mesa is documented to the 2025 California Energy Code with CALGreen mandatory measures, using the state's prescriptive or performance paths and the required compliance forms in the TESSA submittal. In CEC climate zone 6 the marine climate keeps cooling loads moderate, so the compliance margin is usually decided by lighting power density, controls, and envelope solar gain — and SCE's time-of-use commercial rates reward designs that shift load off the late-afternoon peak.",
  },
  faqs: [
    {
      q: "What building code does Costa Mesa enforce?",
      a: "Costa Mesa enforces the 2025 California Building Standards Code — the 2025 CBC (Title 24, Part 2, based on the 2024 IBC) and companion California codes — adopted effective January 1, 2026, with local amendments in Title 5 of the Costa Mesa Municipal Code. Energy work is documented to the 2025 California Energy Code (Title 24, Part 6) plus CALGreen.",
    },
    {
      q: "How are permits submitted in Costa Mesa?",
      a: "All applications go through TESSA, the city's online permit portal: plans upload as PDFs, fees are paid in the portal, and inspections are scheduled there. The building plan check fee is 65% of the permit fee, an accelerated plan check lane is available for an added charge, and limited scopes can qualify for Insta-Permits that can issue in about 20 minutes.",
    },
    {
      q: "Who provides water, sewer, and electric service in Costa Mesa?",
      a: "Electricity comes from Southern California Edison. Water comes from the Mesa Water District, an independent special district supplying 100% local groundwater. Sewer collection is run by the Costa Mesa Sanitary District, with treatment by Orange County Sanitation — neither water nor sewer is a City of Costa Mesa utility.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 43, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.jaspector.com/permits/california/orange/costa-mesa/"],
      codes: ["https://www.jaspector.com/permits/california/orange/costa-mesa/"],
      amendments: ["https://costamesa.legistar1.com/costamesa/attachments/b53b0fc8-f6a8-4567-9154-0e9fba4e67fe.pdf"],
      utilities: ["https://www.costamesaca.gov/home/showpublisheddocument/62700/639094304952130000"],
      climate: ["https://alliancepermitting.com/guides/california/costa-mesa-building-permit"],
      market: ["https://alliancepermitting.com/guides/california/costa-mesa-building-permit"],
    },
  },
};
