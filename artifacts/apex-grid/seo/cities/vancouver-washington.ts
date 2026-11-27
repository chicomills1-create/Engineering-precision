import type { CityData } from "../types";

export const vancouverWashington: CityData = {
  slug: "vancouver",
  name: "Vancouver",
  stateSlug: "washington",
  county: "Clark County",
  ahj: {
    office: "City of Vancouver Community Development Department — Building Services / Permit Center",
    process:
      "Vancouver's Permit Center administers plan review and permits under the Washington State Building Code, coordinating fire review with the Vancouver Fire Department and site review with Public Works. Washington's code is adopted at the state level with State Building Code Council amendments, so Vancouver's reviewers apply a statewide text — but the city's waterfront and downtown programs add local development standards, and unincorporated Clark County runs a parallel county program across the city line.",
  },
  codes: {
    building: "Washington State Building Code (2021 IBC with Washington State amendments adopted by the State Building Code Council)",
    energy: "Washington State Energy Code — Commercial (WSEC-C), 2021 edition, Washington's heavily amended above-IECC energy code",
    amendments:
      "Washington amends the I-codes at the state level, and its commercial energy code is among the most stringent in the nation: the 2021 WSEC-C pushes heat-pump space and water heating, tight energy budgets, and energy metering and reporting that go well beyond the base IECC. Vancouver's local layer includes its waterfront redevelopment standards and the practical fact that the Portland, Oregon market across the Columbia River runs on an entirely different code and tax regime.",
  },
  utilities: {
    electric: "Clark Public Utilities — the publicly owned Clark County PUD — provides electric service in Vancouver",
    notes:
      "Clark Public Utilities, a customer-owned public utility district, provides electric (and water) service across Clark County including Vancouver, with some of the lowest electric rates in the nation from Columbia River hydro — a genuine siting factor for energy-intensive users choosing the Washington side of the Portland metro. New commercial services and interconnections are coordinated with the PUD locally; natural gas is NW Natural.",
  },
  climateNotes:
    "ASHRAE climate zone 4C (marine) on the Columbia River: mild wet winters with long heating seasons and persistent rain, warm dry summers, low snow, and moderate seismic demand from the Cascadia subduction zone and Portland Hills faults. Atmospheric-river flood events affect the Columbia and Burnt Bridge Creek lowlands.",
  marketNotes:
    "Vancouver is the Washington anchor of the Portland metro: the Columbia River waterfront redevelopment (the Waterfront Vancouver mixed-use district), PeaceHealth Southwest Medical Center, HP and tech operations with Washington-side tax advantages, the Port of Vancouver USA (a major Columbia River port), and steady migration of Portland-metro growth across the Interstate Bridge drive commercial and multifamily construction.",
  narratives: {
    mep:
      "MEP design in Vancouver is documented to the Washington State Building Code and the 2021 WSEC-C — an energy code that effectively requires heat-pump-led mechanical design and detailed energy metering for commercial work. Clark Public Utilities' low hydro rates change operating economics versus the Oregon side, and zone 4C's long damp heating season makes envelope moisture management and heat recovery the mechanical center of gravity.",
    structural:
      "Vancouver structural design follows the 2021 IBC with Washington amendments in a Cascadia seismic environment: subduction-zone and crustal fault sources set significant seismic design categories, and Columbia River alluvium adds liquefaction susceptibility along the waterfront districts. Snow is light and wind moderate, so seismic and soil behavior govern most designs.",
    civil:
      "Civil design in Vancouver manages Columbia River and Burnt Bridge Creek drainage under city and state stormwater rules written for salmon-bearing waters — water-quality treatment is stringent across western Washington. Waterfront sites add floodplain, shoreline (Shoreline Management Act), and port coordination, and Clark Public Utilities water service coordination joins the standard utility package.",
    energy:
      "Energy compliance in Vancouver is documented to the Washington State Energy Code (WSEC-C 2021), whose total building performance and prescriptive paths demand substantially more than the base IECC — heat pumps, efficient service water heating, and commissioning and metering are effectively baseline. Clark PUD's low rates and incentive programs shape the beyond-code calculation for energy-intensive tenants.",
  },
  faqs: [
    {
      q: "Who provides electric service in Vancouver, WA?",
      a: "Clark Public Utilities, the customer-owned Clark County public utility district, provides electric service at some of the nation's lowest (hydro-based) rates, plus water service in much of the county. Gas is NW Natural.",
    },
    {
      q: "What building and energy codes apply in Vancouver?",
      a: "The Washington State Building Code (2021 IBC with state amendments) and the Washington State Energy Code — Commercial, 2021 edition (WSEC-C), one of the most stringent energy codes in the U.S., with heat-pump and metering requirements beyond the base IECC.",
    },
    {
      q: "How does Vancouver relate to the Portland market?",
      a: "Vancouver is the Washington-side anchor of the Portland metro, across the Columbia River — sharing the labor and logistics market but running on Washington codes, Washington's energy code, and a different tax regime, which is itself a siting driver.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 66, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofvancouver.us"],
      codes: ["https://www.sbcc.wa.gov"],
      amendments: ["https://www.cityofvancouver.us"],
      utilities: ["https://www.clarkpublicutilities.com"],
      climate: ["https://www.weather.gov/pqr/"],
      market: ["https://www.cityofvancouver.us"],
    },
  },
};
