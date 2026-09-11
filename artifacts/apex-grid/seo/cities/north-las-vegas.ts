import type { CityData } from "../types";

export const northLasVegas: CityData = {
  slug: "north-las-vegas",
  name: "North Las Vegas",
  stateSlug: "nevada",
  county: "Clark County",
  ahj: {
    office: "City of North Las Vegas Land Development and Community Services Department, Building Safety Division",
    process:
      "North Las Vegas operates a separate building-permit, plan-review, and inspection program from Clark County, Las Vegas, and Henderson. Applicants use the City’s online permitting services and should coordinate building, fire, planning, utilities, and civil requirements as one City-specific entitlement and permit path.",
  },
  codes: {
    building: "2018 International Building Code with City of North Las Vegas and Southern Nevada amendments",
    energy: "2018 International Energy Conservation Code with Southern Nevada amendments",
    amendments:
      "North Las Vegas is part of the Southern Nevada Building Officials regional code environment, but local administrative procedures and municipal utility requirements still apply. Industrial occupancies, high-piled storage, hazardous materials, and fire access require early Building Safety and fire review rather than a generic warehouse submittal.",
  },
  utilities: {
    electric: "NV Energy (Nevada Power Company) serves North Las Vegas",
    notes:
      "The City’s Utilities Department provides municipal water and wastewater service and participates in the Southern Nevada Water Authority regional water system. Large industrial and logistics projects need early NV Energy and City utility coordination for service capacity, water/fire flow, sewer, and off-site extensions.",
  },
  climateNotes:
    "North Las Vegas is a hot-dry climate-zone 3B market with intense solar gain, very hot summer design conditions, and monsoon-driven flash-flood events. Open desert and northern-valley sites can have long utility runs, windblown dust, washes, and highly erodible disturbed ground.",
  marketNotes:
    "North Las Vegas is one of southern Nevada’s principal industrial and logistics markets, with large-format development around the Apex Industrial Park and freeway-oriented distribution corridors. Municipal growth also supports public facilities, retail, housing, and healthcare; the industrial pipeline makes power, fire-flow, truck circulation, and drainage capacity recurring engineering issues.",
  narratives: {
    mep:
      "North Las Vegas warehouses, distribution facilities, and industrial shells require more than a standard hot-dry HVAC calculation: high-bay stratification, loading-dock infiltration, process loads, smoke control where triggered, and 3B high-ambient condenser performance all matter. We coordinate NV Energy service needs and City water/fire-flow needs at the same time, since large services and pumps can affect site layout. The permit set is structured for North Las Vegas Building Safety and its adopted 2018 regional code framework.",
    structural:
      "For North Las Vegas industrial structures, long-span roof systems, rack-supported or high-piled storage interfaces, and seismic bracing deserve early coordination with the fire and operations concepts. Southern Nevada geotechnical investigations commonly address caliche, variable desert alluvium, and potential collapsible or gypsum-bearing soils; those findings guide grading, slab, and foundation decisions. Seismic and wind design remain code requirements even on low-rise buildings, and special inspections are coordinated with the City process.",
    civil:
      "Apex-area and northern-valley civil work often has a true greenfield scale: truck access, utility extensions, fire-flow, mass grading, dust control, detention, and downstream drainage must fit together. Flash-flood hydrology means washes and regional conveyance cannot be treated as dry land; Clark County Regional Flood Control District criteria may apply alongside North Las Vegas requirements. We test stormwater routes and utility phasing before committing the building pad and trailer circulation.",
    energy:
      "North Las Vegas commercial compliance uses the 2018 IECC with Southern Nevada amendments. For a large industrial roof area in 3B, cool-roof performance, skylight/daylighting design, lighting controls, low-SHGC glazing at office components, and right-sized cooling are consequential choices. We document those selections in COMcheck and reconcile them with the actual high-bay lighting, process equipment, and NV Energy service strategy rather than treating the energy form as a late standalone task.",
  },
  faqs: [
    {
      q: "Is North Las Vegas under the City of Las Vegas or Clark County building department?",
      a: "Neither for a parcel inside North Las Vegas. The City of North Las Vegas Building Safety Division is the AHJ, with its own permitting and inspection process. Clark County governs unincorporated land and the City of Las Vegas governs its own municipal boundaries.",
    },
    {
      q: "Why are utilities an early issue at Apex and other North Las Vegas industrial sites?",
      a: "Large, greenfield industrial sites can require long water, sewer, fire-flow, and electrical extensions. NV Energy capacity and City utility requirements should be coordinated while the site plan is still flexible, because easements, transformer/pad locations, pump needs, and truck circulation can compete for the same space.",
    },
    {
      q: "Do North Las Vegas industrial sites need stormwater design in the desert?",
      a: "Yes. Intense storms can create rapid runoff in washes and undeveloped basins. Detention, conveyance, finished-floor elevation, and regional flood-control coordination are central to site feasibility even where annual precipitation is low.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 89, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofnorthlasvegas.com/business/development-services"],
      codes: ["https://www.cityofnorthlasvegas.com/business/development-services/building-safety"],
      amendments: ["https://www.cityofnorthlasvegas.com/business/development-services/building-safety"],
      utilities: ["https://www.nvenergy.com/account-services/business"],
      climate: ["https://www.weather.gov/vef/"],
      market: ["https://www.cityofnorthlasvegas.com/business"],
    },
  },
};