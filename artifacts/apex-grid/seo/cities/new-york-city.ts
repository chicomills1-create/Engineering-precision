import type { CityData } from "../types";

export const newYorkCity: CityData = {
  slug: "new-york",
  name: "New York City",
  stateSlug: "new-york",
  county: "Five boroughs: New York, Kings, Queens, Bronx, and Richmond Counties",
  ahj: {
    office: "New York City Department of Buildings (DOB)",
    process:
      "DOB filings and plan-review workflows use DOB NOW: Build for many job types, with other DOB systems still used for specified filings. A project may also be subject to Department of City Planning zoning actions, Landmarks Preservation Commission review, Fire Department approval, Department of Environmental Protection sewer review, and Department of Transportation permits; the registered design professional must establish the applicable filing and agency path before submission.",
  },
  codes: {
    building: "2022 New York City Construction Codes (effective November 7, 2022)",
    energy: "2020 New York City Energy Conservation Code (NYCECC), as amended",
    amendments:
      "The NYC Construction Codes are locally enacted codes, not the unamended New York State code. The 2022 code cycle includes NYC-specific building, plumbing, mechanical, fuel-gas, and administrative provisions; alterations also use the NYC Existing Building Code, and Local Law 97 creates a separate emissions-cap compliance obligation for covered buildings.",
  },
  utilities: {
    electric: "Consolidated Edison (Con Edison) delivers electric and gas service in New York City",
    notes:
      "Con Edison service applications, load letters, transformer/secondary capacity, and distributed-energy interconnection must be coordinated with the utility; steam service is also available in parts of Manhattan. NYC Department of Environmental Protection operates the water and wastewater system, and large site connections or discharge changes require DEP coordination.",
  },
  climateNotes:
    "New York City is climate zone 4A (mixed-humid), with winter heating, summer humidity, wind-driven rain, and urban-heat-island effects. Coastal neighborhoods and waterfront sites face FEMA floodplain, coastal flood, storm-surge, and future sea-level-rise constraints that are materially different from inland borough sites.",
  marketNotes:
    "The city’s construction market combines major multifamily, healthcare, institutional, transit-adjacent, and high-rise work with an enormous stock of prewar and postwar buildings requiring conversion, façade, MEP, and energy upgrades. Local Law 97, façade safety obligations, constrained staging, and utility capacity make decarbonization and rehabilitation as significant as ground-up construction.",
  narratives: {
    mep:
      "NYC MEP design is shaped as much by existing conditions and utility constraints as by the 4A mixed-humid weather. We coordinate Con Edison load, service, and interconnection requirements early, evaluate whether a Manhattan steam district connection is relevant, and design winter heating, summer latent control, and smoke-control systems to the 2022 NYC codes. For covered properties, Local Law 97 means plant electrification, fuel choices, and controls need an operational-emissions analysis alongside NYCECC permit compliance.",
    structural:
      "Structural solutions in New York City must work through the 2022 NYC Construction Codes and the NYC Existing Building Code, not a generic state IBC assumption. Tower additions, façade repairs, transfer work, and change-of-use renovations require verified existing framing and foundations, while the city’s wind exposure, snow, and seismic provisions inform lateral and gravity design. Tight lot lines, neighbor protection, underpinning, sidewalk sheds, and special inspection obligations often determine the practical construction sequence in dense boroughs.",
    civil:
      "Civil engineering in NYC coordinates land use, DEP water and sewer infrastructure, and exceptionally constrained streets. We test sanitary and storm connections, detention or stormwater controls, and construction protection against DEP requirements early, then identify waterfront or flood-zone parcels that need FEMA and coastal-resilience design. In combined-sewer areas, managing peak runoff and avoiding conflicts with crowded subsurface utilities is a core site constraint, not an afterthought.",
    energy:
      "New York City energy work combines the 2020 NYCECC with a building-performance context that is unusually consequential: Local Law 97 sets emissions limits for covered buildings. In the mixed-humid climate, a high-performance enclosure must control winter heat loss, summer humidity, and thermal bridging without creating condensation risks in existing façades. We coordinate energy-code drawings and calculations with mechanical, lighting, and controls choices, then distinguish code compliance from the metered-emissions strategy a covered building will need.",
  },
  faqs: [
    {
      q: "Are New York City projects governed by New York State codes or NYC codes?",
      a: "Projects in the five boroughs are governed by the locally enacted NYC Construction Codes. The current 2022 NYC Construction Codes took effect on November 7, 2022, and NYC DOB administers them. The city has its own administrative, building, mechanical, plumbing, fuel-gas, and existing-building provisions, so a state-code-only analysis is not sufficient.",
    },
    {
      q: "How do NYCECC and Local Law 97 differ?",
      a: "The 2020 NYCECC is the energy code used for design and permit compliance. Local Law 97 is a separate operating-emissions law that sets annual emissions limits for covered buildings. A permitted alteration can comply with NYCECC yet still require a longer-term LL97 plan based on the building’s actual energy sources and operations.",
    },
    {
      q: "What additional approvals can affect an NYC DOB filing?",
      a: "The filing path depends on scope and location. Beyond DOB, zoning or land-use actions can involve City Planning, designated properties can require Landmarks Preservation Commission approval, fire-protection scopes can involve FDNY, and sewer or water connections can require DEP review. Waterfront and coastal flood-zone sites also need flood-resilient design and may involve additional state or federal permits.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 100, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.nyc.gov/site/buildings/index.page"],
      codes: ["https://www.nyc.gov/site/buildings/codes/2022-construction-codes.page"],
      amendments: ["https://www.nyc.gov/site/buildings/codes/2022-construction-codes.page", "https://www.nyc.gov/site/dep/environment/local-law-97.page"],
      utilities: ["https://www.coned.com/en/services-and-outages/service-management-page", "https://www.nyc.gov/site/dep/about/about-DEP.page"],
      climate: ["https://www.fema.gov/flood-maps"],
      market: ["https://www.nyc.gov/site/hpd/about/what-we-do.page"]
    }
  },
};