import type { CityData } from "../types";

export const lakewood: CityData = {
  slug: "lakewood",
  name: "Lakewood",
  stateSlug: "colorado",
  county: "Jefferson County",
  ahj: {
    office: "City of Lakewood Public Works Department — Permits, Civic Center North, 470 S. Allison Parkway",
    process:
      "All Lakewood permit applications are submitted electronically through the city's eTRAKiT portal — paper submittals are not accepted — with the plan check fee collected before review begins and fees paid through the same system. Inspections are requested through eTRAKiT, and requests logged by 7 a.m. are typically performed the same day. Some small residential scopes can be reviewed while you wait at the permit counter, but commercial work and new construction go through full plan review against the city's published Codes and Loads handout.",
  },
  codes: {
    building: "2021 International Building Code (City of Lakewood adopted codes, Ordinance O-2023-10, Lakewood Municipal Code Title 14)",
    energy: "2021 International Energy Conservation Code (City of Lakewood adopted codes)",
    amendments:
      "Lakewood's local amendments live in Title 14 of the Lakewood Municipal Code and include a city-published design-loads table that splits wind design at Kipling Street (10,000 West Block), a 36-inch frost depth, and a 30 psf non-reducible minimum ground snow load. A local amendment adds IBC Section 3009, requiring State of Colorado permits and certificates of inspection for elevators and other conveyances except those inside a dwelling unit.",
  },
  utilities: {
    electric: "Xcel Energy (electric and natural gas service across most of Lakewood)",
    notes:
      "Xcel Energy is the incumbent electric and gas utility for Lakewood, so new commercial services, service upgrades, and interconnection requests run through Xcel's builder services process and its Colorado tariffs — early capacity checks matter for electrification-heavy designs. Water service in Lakewood is fragmented among Denver Water and numerous independent water and sanitation districts depending on the parcel, so the serving district must be confirmed by address before civil design begins; sewer is likewise district-based rather than a single city utility.",
  },
  climateNotes:
    "IECC climate zone 5B (cool-dry) on the Front Range foothills: the city's own loads table sets a 30 psf non-reducible ground snow load and 36-inch frost depth, wind design changes east versus west of Kipling Street, and expansive bentonite clay soils across much of the city drive foundation design. High-plains sun, hail, and large diurnal temperature swings shape envelope and roofing choices.",
  marketNotes:
    "Lakewood is Denver's largest suburb and home to the Denver Federal Center — one of the largest federal campuses outside Washington, D.C. — plus St. Anthony Hospital, Terumo Blood and Cell Technologies' headquarters, and Jefferson County government and schools. Commercial work concentrates in the Belmar mixed-use redevelopment of the old Villa Italia mall, the Colorado Mills retail district, Union Boulevard corridor offices, and ongoing federal and healthcare facility renovation.",
  narratives: {
    mep:
      "MEP design in Lakewood is documented to the 2021 I-codes with the 2023 NEC, submitted electronically through the city's eTRAKiT portal to Public Works — Permits at Civic Center North. Xcel Energy supplies both electricity and natural gas, so service sizing, electrification loads, and any distributed generation interconnection are coordinated with one utility, while the 2021 IECC in climate zone 5B puts the compliance margin on envelope performance and heating efficiency through Front Range winters.",
    structural:
      "Structural design in Lakewood follows the city's published Codes and Loads: a 30 psf non-reducible minimum ground snow load, footings carried 36 inches down against frost, and wind speeds that change at the Kipling Street dividing line as foothills wind effects increase to the west. Expansive bentonite clays underlie much of the city, so geotechnical investigation and drilled-pier or structurally supported foundations are routine, and seismic demand is low but not zero.",
    civil:
      "Civil design in Lakewood must first answer a utility question most Colorado suburbs do not pose: water and sewer are served by Denver Water and a patchwork of independent districts, not one city utility, so the serving district is confirmed by address before design. Drainage ties into Jefferson County and Mile High Flood District criteria along Bear Creek and Clear Creek tributaries, and the city's construction and demolition waste recycling standards add a waste management plan to covered projects.",
    energy:
      "Energy compliance in Lakewood is documented to the 2021 IECC for climate zone 5B, where winter heating loads and large day-night temperature swings dominate the model. Xcel Energy's Colorado demand-side programs and rebates layer on top of code compliance for commercial projects, and the city's sustainability push — including its C&D waste recycling standards — makes early energy and materials planning part of the permit package rather than an afterthought.",
  },
  faqs: [
    {
      q: "How are building permits submitted in Lakewood, CO?",
      a: "Electronically, through the city's eTRAKiT portal — Lakewood does not accept paper permit applications. The plan check fee is collected before review begins, fees are paid in eTRAKiT, and inspections are also requested through eTRAKiT, with requests made by 7 a.m. typically performed the same day.",
    },
    {
      q: "What building code edition does Lakewood enforce?",
      a: "The 2021 I-code family — 2021 IBC, IRC, IPC, IMC, IFGC, IECC, IEBC and IFC — with the 2023 NEC, adopted by Ordinance O-2023-10 into Title 14 of the Lakewood Municipal Code, which also carries the city's local amendments and design-loads table.",
    },
    {
      q: "Who provides electric service in Lakewood, CO?",
      a: "Xcel Energy provides electric and natural gas service across most of Lakewood. Water and sewer are different: they are served by Denver Water and numerous independent water and sanitation districts depending on the parcel, so confirm the serving district by address.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 53, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.lakewoodco.gov/files/assets/public/v/5/public-works/pdfs/engineering/2024-codes-and-loads.pdf"],
      codes: ["https://www.lakewoodco.gov/files/assets/public/v/5/public-works/pdfs/engineering/2024-codes-and-loads.pdf"],
      amendments: ["https://www.lakewoodco.gov/files/assets/public/v/5/public-works/pdfs/engineering/2024-codes-and-loads.pdf"],
      utilities: ["https://www.xcelenergy.com"],
      climate: ["https://www.weather.gov/bou/"],
      market: ["https://www.lakewoodco.gov"],
    },
  },
};
