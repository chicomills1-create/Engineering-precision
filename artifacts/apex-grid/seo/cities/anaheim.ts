import type { CityData } from "../types";

export const anaheim: CityData = {
  slug: "anaheim",
  name: "Anaheim",
  stateSlug: "california",
  county: "Orange County",
  ahj: {
    office: "City of Anaheim Planning and Building Department, Building Division",
    process:
      "Anaheim's Planning and Building Department administers building permits and electronic plan review, coordinating with Planning, Fire & Rescue, Public Works, and utilities as the project requires. Commercial work may need separate planning entitlement, grading, public-improvement, fire, and utility approvals, particularly in resort, industrial, and infill areas.",
  },
  codes: {
    building: "2022 Anaheim Building Code, based on the 2022 California Building Code (2021 IBC) with City of Anaheim amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), with 2022 CALGreen mandatory measures",
    amendments:
      "Anaheim Municipal Code adopts the 2022 California Building Standards Code with local amendments. City fire, grading, stormwater, floodplain, zoning, and public-works requirements are reviewed in addition to the CBC and can affect the project-specific permit path.",
  },
  utilities: {
    electric: "Anaheim Public Utilities provides municipal electric and water service; Southern California Gas Company provides natural gas",
    notes:
      "Anaheim Public Utilities has its own electric service-planning, rate, and distributed-energy interconnection processes, separate from Southern California Edison territory elsewhere in Orange County. New service, solar/storage, EV charging, and major resort or industrial loads should be coordinated early; sewer service and storm drain coordination are handled through City public-works functions.",
  },
  climateNotes:
    "Anaheim has a warm, dry Southern California climate (ASHRAE 3B/California climate zone 8), with hot inland summer periods, Santa Ana wind events, and occasional intense winter rain. It is a seismic Southern California jurisdiction; alluvial soils, liquefaction potential, floodplain conditions near the Santa Ana River, and wildfire-smoke exposure require site-specific review.",
  marketNotes:
    "Anaheim's economy combines a nationally significant visitor, convention, hotel, and entertainment district with healthcare, education, food and beverage, and industrial/logistics activity. Resort-area renovation and expansion, infill multifamily, and warehouse or manufacturing work often face constrained sites, high utility loads, and demanding phasing around active operations.",
  narratives: {
    mep:
      "Anaheim MEP systems serve a climate with substantial cooling peaks and useful mild-season operation, while hotels, convention uses, entertainment, cold storage, and industrial facilities create very different ventilation and load profiles. Anaheim Public Utilities—not an assumed regional investor-owned utility—sets the electric service and interconnection path inside its territory, making early load, transformer, solar/storage, and EV planning important. The 2022 Title 24 and CALGreen baseline is coordinated with actual occupancy schedules, domestic-hot-water demand, and controls. Outdoor equipment, smoke-operation sequences, and emergency power also need to reflect Santa Ana winds and the program's continuity needs.",
    structural:
      "Anaheim structural design follows the 2022 CBC seismic provisions in the active Southern California region, with the geotechnical report setting site class, liquefaction, settlement, and foundation recommendations. Santa Ana wind events, seismic anchorage of nonstructural components, and roof equipment supports need an integrated lateral and MEP coordination strategy. Resort renovations and active entertainment venues require investigation of existing diaphragms, collectors, and irregularities before new loads or occupancy changes are introduced. City Building Division review and special-inspection requirements are then incorporated into the permit and construction plan.",
    civil:
      "Anaheim civil engineering combines constrained urban/resort circulation with stormwater treatment, grading, and utility coordination under City requirements. We screen FEMA flood information and Santa Ana River-area conditions, then reserve room for conveyance, water-quality measures, fire access, and utility corridors before paving and guest or truck circulation consume the site. Anaheim Public Utilities coordinates water and electric infrastructure; public street, sewer, and drainage work must be aligned with City public-works review. California construction general-permit coverage and a SWPPP apply when land disturbance reaches the state threshold.",
    energy:
      "Anaheim commercial energy compliance is based on the 2022 California Energy Code and mandatory 2022 CALGreen measures, with local amendments checked for the specific project. Hot inland afternoons reward exterior shading, low-solar-gain glazing, efficient heat pumps, lighting controls, demand management, and a well-integrated envelope, while hospitality and convention loads require realistic schedules in the Title 24 model. We coordinate photovoltaic, storage, electrification, and EV capacity with Anaheim Public Utilities' service and interconnection requirements. That keeps compliance, peak demand, and resilient operation connected instead of treating Title 24 as a stand-alone worksheet.",
  },
  faqs: [
    {
      q: "Who reviews commercial building permits in Anaheim?",
      a: "The City of Anaheim Planning and Building Department, Building Division administers building permits and plan review. Planning, Fire & Rescue, Public Works, and Anaheim Public Utilities may review zoning, fire, site, public-improvement, or utility elements in parallel.",
    },
    {
      q: "Which energy code applies in Anaheim?",
      a: "Anaheim enforces the 2022 California Energy Code, Title 24 Part 6, together with mandatory 2022 CALGreen measures and applicable City amendments. The building code is the 2022 Anaheim Building Code, based on the 2022 California Building Code.",
    },
    {
      q: "Is Anaheim Public Utilities the electric provider?",
      a: "Anaheim Public Utilities provides municipal electric service within its service territory, unlike many surrounding Orange County locations served by Southern California Edison. Confirm the project address and coordinate large service, solar, storage, or EV requests early with the utility.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 78, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.anaheim.net/668/Planning-Building"],
      codes: ["https://www.hcd.ca.gov/building-standards"],
      amendments: ["https://codelibrary.amlegal.com/codes/anaheim/latest/overview"],
      utilities: ["https://www.anaheim.net/422/Utilities"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.anaheim.net/1196/Economic-Development"],
    },
  },
};