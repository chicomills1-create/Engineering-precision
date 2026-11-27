import type { CityData } from "../types";

export const chesapeake: CityData = {
  slug: "chesapeake",
  name: "Chesapeake",
  stateSlug: "virginia",
  county: "City of Chesapeake (independent city)",
  ahj: {
    office: "City of Chesapeake Department of Development & Permits",
    process:
      "Chesapeake is an independent city, so permitting is entirely municipal: the Department of Development & Permits takes applications through its online Accela/eBUILD portal and reviews building, trades, and site plans under the Virginia USBC. A Chesapeake-specific sequencing rule shapes electrical work — any electrical permit involving a new or changed service must carry a Dominion Energy Work Request Number on the application before the permit can issue, so the utility request starts before, not after, the city submittal.",
  },
  codes: {
    building: "Virginia Uniform Statewide Building Code (USBC), 2021 edition (2021 IBC with Virginia amendments)",
    energy: "Virginia USBC energy provisions (2021 IECC-based commercial energy requirements as adopted in the 2021 Virginia USBC)",
    amendments:
      "Virginia's USBC is mandatory and uniform statewide — Chesapeake cannot amend the technical code locally. The city's distinctive layer is environmental and procedural: the Chesapeake Bay Preservation Ordinance overlays Resource Protection Areas across much of this low, water-laced city, the Dominion Work Request Number is required on service-change electrical permits, and floodplain management rules apply broadly across the Elizabeth River and Intracoastal Waterway frontage.",
  },
  utilities: {
    electric: "Dominion Energy Virginia serves Chesapeake",
    notes:
      "Dominion Energy handles new commercial services through its construction/work-request process, and the city's permit cannot issue for service work until Dominion's seven-digit Work Request Number is on the application — an interconnection step built into permitting itself. Dominion is simultaneously rebuilding major 500 kV transmission through Chesapeake (the Yadkin-Fentress project) to carry Coastal Virginia Offshore Wind power, and large logistics and data-center loads in the Greenbrier and South Norfolk corridors should confirm capacity early.",
  },
  climateNotes:
    "ASHRAE climate zone 4A (mixed-humid) at the coast: hot humid summers, mild winters, and hurricane and nor'easter exposure with wind-driven rain and tidal flooding as the governing hazards. Much of Chesapeake sits at low elevation between the Elizabeth River, the Dismal Swamp, and the Intracoastal Waterway, so flood elevation and stormwater design dominate site engineering.",
  marketNotes:
    "Chesapeake is Hampton Roads' suburban-industrial engine: logistics and warehouse development along the I-64 and Bainbridge corridors, Dollar Tree's headquarters and distribution operations in Greenbrier, defense and shipyard-support contractors tied to Naval Station Norfolk and the Portsmouth yards, medical growth around Chesapeake Regional, and steady retail and multifamily infill in Greenbrier and Great Bridge.",
  narratives: {
    mep:
      "MEP design in Chesapeake is documented to the 2021 Virginia USBC, uniform statewide, and sequenced around the city's Dominion Energy rule: electrical permits for new or changed services need Dominion's Work Request Number on the application, so service design and utility coordination lead the permit package. Zone 4A humidity drives latent-load and ventilation design for the logistics, medical, and retail stock the city builds, and coastal corrosion protection matters for exterior equipment within the tidal corridors.",
    structural:
      "Structural design in Chesapeake follows the 2021 USBC with hurricane-region wind speeds, windborne-debris considerations near the coast, and flood-load design across the city's extensive low-lying terrain. Soils are coastal plain sands and soft clays with a high water table, so shallow foundations are the exception on larger commercial work and deep foundations or ground improvement are routine.",
    civil:
      "Civil engineering in Chesapeake is water management: Chesapeake Bay Preservation Areas, tidal floodplain, and a high water table shape every site plan, and stormwater quantity and quality requirements are enforced through the city's development and permits review. The Great Dismal Swamp edge, the Elizabeth River branches, and the Intracoastal Waterway divide the city into drainage districts where discharge options are constrained from the first grading pass.",
    energy:
      "Energy compliance in Chesapeake is documented under the 2021 Virginia USBC's IECC-based commercial provisions, with COMcheck or the ASHRAE 90.1 path run against the Virginia amendments rather than the base IECC. The compliance story in zone 4A coastal humidity is envelope air sealing and latent control as much as insulation, and Dominion Energy incentive programs can support beyond-code measures on larger commercial projects.",
  },
  faqs: [
    {
      q: "Why does a Chesapeake electrical permit need a Dominion Work Request Number?",
      a: "At Dominion Energy's request, the Department of Development & Permits requires the seven-digit Dominion Work Request Number on any electrical permit application involving a new or changed electrical service, so utility and city processes start together instead of sequentially.",
    },
    {
      q: "What building code applies in Chesapeake?",
      a: "The Virginia Uniform Statewide Building Code (USBC), 2021 edition — 2021 IBC with Virginia amendments. It is mandatory and uniform statewide; Chesapeake's local layer is its Bay Preservation, floodplain, and permitting rules, not technical code amendments.",
    },
    {
      q: "What environmental overlay most affects Chesapeake site design?",
      a: "The Chesapeake Bay Preservation Ordinance. Resource Protection and Resource Management Areas cover much of the city's river, creek, and wetland frontage and constrain clearing, grading, and stormwater design on affected parcels.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 70, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofchesapeake.net/330/Procedures-for-Electrical-Permit"],
      codes: ["https://www.dhcd.virginia.gov"],
      amendments: ["https://www.cityofchesapeake.net"],
      utilities: ["https://www.dominionenergy.com/about/delivering-energy/electric-projects/power-line-projects/yadkin-fentress"],
      climate: ["https://www.weather.gov/akq/"],
      market: ["https://www.cityofchesapeake.net"],
    },
  },
};
