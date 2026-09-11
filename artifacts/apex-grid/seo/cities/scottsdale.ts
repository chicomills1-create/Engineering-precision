import type { CityData } from "../types";

export const scottsdale: CityData = {
  slug: "scottsdale",
  name: "Scottsdale",
  stateSlug: "arizona",
  county: "Maricopa County",
  ahj: {
    office: "City of Scottsdale Planning & Development Services / Permit Services",
    process:
      "Commercial applications are submitted through the Scottsdale SPUR portal, where applicants upload plans, pay fees, track review comments, receive permits, and schedule inspections. The City publishes review targets after administrative completeness review—not guarantees—including 10 business days for tenant improvements, 15 for most other plans, and 20 for XLT commercial or multifamily projects.",
  },
  codes: {
    building: "2021 International Building Code (IBC) with City of Scottsdale amendments",
    energy: "2021 International Energy Conservation Code (IECC), including commercial provisions, with City of Scottsdale amendments",
    amendments:
      "Scottsdale publishes its 2022 amendment package for the 2021 IBC, IMC, IPC, and IECC, plus amendments to the 2020 NEC. The package changes local administration and referenced-code coordination; the IECC adoption includes appendices CB and RB. Confirm project-specific applicability of the City's green-construction materials with Permit Services.",
  },
  utilities: {
    electric:
      "Arizona Public Service (APS) is the principal electric utility serving Scottsdale; the serving utility and available capacity must be confirmed for the parcel.",
    notes:
      "Scottsdale Water provides municipal water and sewer service. Verify water, sewer, meter, transformer, interconnection, and any off-site improvement requirements early; this record does not assert parcel-specific capacity or utility lead times.",
  },
  climateNotes:
    "Scottsdale is a hot-dry Sonoran Desert location generally associated with ASHRAE climate zone 2B: high summer cooling and solar loads, limited precipitation, and monsoon thunderstorms with wind, dust, and localized flooding. Exact design conditions and flood status are project- and parcel-specific.",
  marketNotes:
    "Scottsdale has substantial commercial activity in hospitality and resorts, healthcare and medical offices, technology and corporate offices, retail, mixed-use, and multifamily tenant improvements. The City's economic-development and open-data resources are useful starting points, but current pipeline volume and permit counts should be verified for each opportunity.",
  narratives: {
    mep:
      "Scottsdale MEP design must coordinate the City's amended 2021 IMC and IPC and 2020 NEC with the SPUR submittal, rather than a Phoenix code package. Hot-dry cooling, solar exposure, monsoon dust, and outdoor-air filtration influence equipment and controls; confirm APS service, demand, and capacity early and coordinate water and sewer requirements with Scottsdale Water.",
    structural:
      "Design to Scottsdale's amended 2021 IBC and the project's geotechnical report, resolving foundation conditions, roof uplift, and rooftop-equipment anchorage rather than relying on generic Valley assumptions. Heat, intense sun, and monsoon wind events make roof membranes, flashing, and attachments important; exact wind and seismic parameters must come from the adopted code and site-specific design.",
    civil:
      "Scottsdale civil work begins with parcel-specific grading, drainage, FEMA flood screening, and utility availability, then coordinates municipal water and sewer with Scottsdale Water. Reserve space for stormwater facilities, accessible routes, fire access, easements, and dust and erosion controls; confirm current City criteria and any project-specific conditions through SPUR.",
    energy:
      "Commercial projects use the 2021 IECC with Scottsdale amendments, supported by City forms for commercial compliance, envelope verification, lighting controls, and mechanical commissioning. In 2B conditions, low-SHGC glazing, reflective roofs, efficient high-ambient cooling, controls, and commissioning are practical priorities; verify whether any project-specific green-construction requirement applies.",
  },
  faqs: [
    {
      q: "Which codes apply to a commercial project in Scottsdale?",
      a:
        "The City publishes 2021 IBC, IMC, IPC, and IECC editions with Scottsdale amendments, along with a 2020 NEC amendment package. Confirm the effective code package and amendment applicability with Permit Services for the specific project.",
    },
    {
      q: "How are Scottsdale commercial permits submitted?",
      a:
        "Applications, plans, fees, review comments, permits, and inspections are managed through the City's SPUR portal. Published review times are targets after administrative completeness review, not guaranteed approval or permit dates.",
    },
    {
      q: "Who provides Scottsdale electric, water, and sewer service?",
      a:
        "APS is the principal electric provider and Scottsdale Water provides municipal water and sewer, but service, capacity, meters, and improvement obligations are parcel-specific. Confirm them before finalizing loads or a civil layout.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    priority: {
      commercialOpportunity: 90,
      searchConsoleImpressions: 0,
      searchConsolePeriod: "unavailable",
    },
    sources: {
      ahj: [
        "https://www.scottsdaleaz.gov/planning-development/scottsdale-spur",
        "https://www.scottsdaleaz.gov/planning-development/plan-review-services",
        "https://www.scottsdaleaz.gov/planning-development/permit-services",
      ],
      codes: [
        "https://www.scottsdaleaz.gov/codes-and-ordinances/building-codes",
        "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/building-codes/2021-international-building-code-(ibc)-amendments.pdf?sfvrsn=f4e28874_2",
        "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/building-codes/2021-international-mechanical-code-(imc)-amendments.pdf?sfvrsn=125f33ae_2",
        "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/building-codes/2021-international-plumbing-code-(ipc)-amendments.pdf?sfvrsn=ae75c74a_2",
        "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/building-codes/2020-national-electrical-code-(nec)-amendments.pdf?sfvrsn=45932118_2",
      ],
      amendments: [
        "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/building-codes/2021-international-energy-conservation-code-(iecc)-amendments.pdf?sfvrsn=270ee599_2",
        "https://www.scottsdaleaz.gov/docs/default-source/scottsdaleaz/codes---ordinances/building-codes/igcc/2021-igcc-development-review-checklist.pdf?sfvrsn=2e4c6d3c_12",
      ],
      utilities: [
        "https://www.scottsdaleaz.gov/utilities",
        "https://www.scottsdaleaz.gov/water",
        "https://www.aps.com/en/Business/Service-Plans/Service-Area-Maps",
      ],
      climate: [
        "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/city/time-series",
        "https://gis-fema.hub.arcgis.com/maps/ae38b6f94eaf4abf97f986fa01921e13/about",
        "https://www.scottsdaleaz.gov/stormwater",
      ],
      market: [
        "https://www.choosescottsdale.com/",
        "https://data.scottsdaleaz.gov/",
      ],
    },
  },
};