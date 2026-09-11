import type { CityData } from "../types";

export const sanFrancisco: CityData = {
  slug: "san-francisco",
  name: "San Francisco",
  stateSlug: "california",
  county: "City and County of San Francisco",
  ahj: {
    office: "San Francisco Department of Building Inspection (DBI)",
    process:
      "DBI accepts permit applications through its online Permit and Project Tracking System, with electronic plan review for eligible projects and coordinated review by building, fire, planning, public works, and other city agencies as needed. Complex new construction and major alterations commonly require multiple review cycles; permit type, Planning approvals, and DBI intake requirements determine the path.",
  },
  codes: {
    building: "2022 San Francisco Building Code, based on the 2022 California Building Code (2021 IBC) with extensive local amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), supplemented by San Francisco green-building and all-electric new-construction requirements",
    amendments:
      "The San Francisco Building Code contains substantial local seismic, fire-safety, existing-building, and administrative amendments. The San Francisco Environment Code's green-building provisions and all-electric new-construction rules apply in addition to state Title 24; the Soft Story Program separately governs mandatory retrofit compliance for covered wood-frame buildings.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E), with CleanPowerSF as the City's community-choice electricity program; San Francisco Public Utilities Commission (SFPUC) provides municipal water and wastewater service",
    notes:
      "PG&E controls electric service design and interconnection even when CleanPowerSF supplies generation, so service upgrades and solar/storage schedules stay with PG&E. SFPUC water, sewer, and stormwater requirements are particularly consequential on dense parcels and for projects using alternative water sources.",
  },
  climateNotes:
    "San Francisco's cool marine ASHRAE 3C climate has low conventional cooling demand, persistent fog and wind exposure, and localized microclimates. Seismic shaking, liquefaction in fill areas, sea-level-rise and coastal-flood exposure, and salt-air corrosion are more consequential hazards than summer heat.",
  marketNotes:
    "The city's construction work is dominated by seismic retrofit, historic rehabilitation, tenant improvement, healthcare and institutional modernization, life-science conversion, and dense multifamily or mixed-use infill. Constrained sites, existing utilities, transit interfaces, and a large stock of older buildings make alteration sequencing as important as new-build design.",
  narratives: {
    mep:
      "San Francisco MEP design starts with a cool marine climate but cannot assume a simple low-load project: labs, healthcare, commercial kitchens, and dense tenant improvements can be ventilation- and process-dominated. We use the long economizer season where outdoor-air quality permits, detail coastal-corrosion protection, and evaluate smoke-event filtration rather than oversizing cooling plant for rare heat. New all-electric requirements and PG&E's service process make electrical capacity, induction or heat-pump selection, and interconnection coordination early DBI-submittal decisions; SFPUC water constraints also matter for cooling and process-water concepts.",
    structural:
      "DBI structural review operates in one of the country's most demanding seismic jurisdictions under the locally amended 2022 San Francisco Building Code. Site history matters: Bay fill and waterfront areas can require liquefaction and lateral-spread mitigation, while hillside parcels introduce slope and retaining-wall issues. Existing-building work must distinguish voluntary alterations from mandated Soft Story Program obligations, and historic or masonry structures need an explicit evaluation of diaphragms, connections, and compatible strengthening before architectural layouts are fixed.",
    civil:
      "San Francisco civil work is shaped by very small parcels, steep grades, combined-sewer infrastructure, and SFPUC stormwater controls. We lay out detention, treatment, and green-infrastructure measures with the earliest site plan because they compete with loading, accessible routes, and utility rooms; projects may also need Public Works street-improvement coordination. Along the waterfront and in low-lying fill areas, finished-floor, drainage, and utility decisions should consider current flood information and long-term sea-level-rise resilience rather than relying on a generic Bay Area detail.",
    energy:
      "Energy strategy combines 2022 Title 24 modeling with San Francisco's green-building and all-electric new-construction requirements. The 3C marine climate favors a tight envelope, high-performance glazing, heat pumps, heat recovery, daylighting, and controls over a cooling-heavy solution, although occupancies with large internal loads still need careful plant analysis. We coordinate the compliance model with PG&E service capacity and CleanPowerSF's generation context, while SFPUC requirements can make non-potable or water-reuse concepts relevant on larger projects.",
  },
  faqs: [
    {
      q: "Which department reviews building permits in San Francisco?",
      a: "The San Francisco Department of Building Inspection (DBI) is the building-permit authority. DBI uses its online Permit and Project Tracking System and coordinates required reviews with agencies such as Planning, Fire, Public Works, and SFPUC; the routing depends on the scope and site.",
    },
    {
      q: "Are new San Francisco buildings required to be all-electric?",
      a: "San Francisco's local green-building rules require all-electric new construction for many covered projects, subject to defined scope and exception provisions. That local rule sits alongside the 2022 California Energy Code, so the applicable ordinance and utility-service implications should be confirmed before mechanical systems are selected.",
    },
    {
      q: "What is the San Francisco Soft Story Program?",
      a: "It is the City's mandatory seismic retrofit program for certain older wood-frame multi-unit residential buildings with soft, weak, or open-front conditions. It is separate from ordinary voluntary improvement design; DBI records and the building's construction and occupancy determine whether a property is covered.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 95, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.sf.gov/departments--department-building-inspection"],
      codes: ["https://www.hcd.ca.gov/building-standards"],
      amendments: ["https://www.sf.gov/information--building-codes"],
      utilities: ["https://www.pge.com/en/business.html", "https://www.sfpuc.gov/"],
      climate: ["https://www.weather.gov/mtr/"],
      market: ["https://sf.gov/departments/office-economic-and-workforce-development"],
    },
  },
};