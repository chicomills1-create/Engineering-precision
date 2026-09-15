import type { CityData } from "../types";

export const siouxFalls: CityData = {
  slug: "sioux-falls",
  name: "Sioux Falls",
  stateSlug: "south-dakota",
  county: "Minnehaha County",
  ahj: {
    office: "City of Sioux Falls Planning and Development Services, Building Services",
    process:
      "Commercial permits are submitted through the City's permitting system for coordinated building review, with planning, fire, engineering, utilities, and other reviews added according to the scope and site. Pre-application coordination is useful for larger developments, and the permit address controls zoning, floodplain, access, grading, and public-improvement requirements.",
  },
  codes: {
    building:
      "2021 International Building Code as adopted by the City of Sioux Falls",
    energy:
      "2021 International Energy Conservation Code commercial provisions as adopted by the City of Sioux Falls",
    amendments:
      "Sioux Falls adopts local construction-code amendments and separate development standards in addition to the model codes. Zoning, fire, floodplain, stormwater, grading, access, and utility requirements can change the design basis, so the current City code and project-specific conditions should be confirmed at intake.",
  },
  utilities: {
    electric: "Xcel Energy provides electric service in Sioux Falls",
    notes:
      "The City of Sioux Falls provides municipal water and sanitary sewer service, with engineering and public-works requirements for connections, streets, and stormwater. Xcel capacity, transformer placement, and distributed-generation interconnection should be coordinated early for high-load commercial or industrial projects.",
  },
  climateNotes:
    "Sioux Falls has a cold 5A/6A transition climate with severe winter heating demand, hot summers, snow, freeze-thaw cycles, thunderstorms, hail, and occasional flooding along the Big Sioux River. Frost depth, expansive or moisture-sensitive soils, and stormwater detention are important site-design inputs.",
  marketNotes:
    "Sioux Falls is South Dakota's principal growth market, with healthcare, financial services, distribution, manufacturing, food processing, and commercial development expanding around established employment centers and major highways. Greenfield work must coordinate municipal utilities, transportation improvements, stormwater, and changing land-use context while redevelopment sites may require careful utility and grading verification.",
  narratives: {
    mep:
      "Sioux Falls MEP systems need to operate across cold winters and hot, stormy summers. We size heating and freeze protection for the cold design condition, use heat recovery and a controlled envelope to reduce ventilation losses, and coordinate Xcel electrical service with City water and sewer capacity before equipment selections harden. For manufacturing, healthcare, and distribution buildings, process and peak-demand loads deserve early utility review, while smoke, humidity, and economizer controls should be checked against the actual operating profile.",
    structural:
      "Sioux Falls structural design follows the City's adopted 2021 IBC basis and the practical demands of prairie snow, wind, hail, freeze-thaw, and variable soils. Roof drift at parapets and equipment, uplift continuity, and durable exterior detailing need explicit analysis. A geotechnical report should establish bearing, frost, moisture sensitivity, and any expansive-soil response before foundations, slabs, and pavements are selected; Big Sioux River floodplain conditions can additionally influence elevations and equipment locations.",
    civil:
      "Sioux Falls civil work coordinates Planning and Development Services with City engineering and public-works requirements for grading, stormwater, access, utilities, and public improvements. The Big Sioux River and local drainageways make floodplain screening and detention/conveyance decisions important, while cold weather governs utility burial, pavement, and construction sequencing. We verify water and sewer connection points and reserve corridors before site grading, rather than discovering conflicts after the building footprint is fixed.",
    energy:
      "Sioux Falls commercial projects use the City's adopted 2021 IECC commercial provisions, subject to current local amendments and the permit review. The cold climate rewards continuous insulation, air sealing, thermal-break control, efficient heating, and heat recovery; summer cooling and humidity control still matter for occupied and process spaces. We document the selected compliance path early and coordinate envelope, lighting, HVAC, and Xcel service assumptions in one model so code compliance remains consistent with the owner's load profile.",
  },
  faqs: [
    {
      q: "Which office is the AHJ for a Sioux Falls commercial project?",
      a: "The City of Sioux Falls Planning and Development Services department, through Building Services, is the primary commercial building-permit authority. Planning, fire, engineering, utilities, floodplain, and public-improvement reviews may also apply based on the project and address.",
    },
    {
      q: "What commercial building and energy codes apply in Sioux Falls?",
      a: "Sioux Falls has adopted the 2021 IBC and 2021 IECC commercial provisions, with local amendments and separate development standards. Confirm the current City code, amendments, and any site-specific zoning, floodplain, stormwater, and fire requirements at project intake.",
    },
    {
      q: "What should a site investigation address in Sioux Falls?",
      a: "The investigation should address frost and freeze-thaw, bearing and moisture-sensitive or expansive soils, groundwater, stormwater, and floodplain exposure near the Big Sioux River and drainageways. Those findings affect foundations, slabs, pavement, finished grades, utility depths, and detention design.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: [
      "mep-engineering",
      "structural-engineering",
      "civil-engineering",
      "energy-code-compliance",
    ],
    priority: {
      commercialOpportunity: 84,
      searchConsoleImpressions: 0,
      searchConsolePeriod: "unavailable",
    },
    sources: {
      ahj: ["https://www.siouxfalls.gov/government/departments/planning-and-development-services"],
      codes: ["https://www.siouxfalls.gov/government/departments/planning-and-development-services/building-services"],
      amendments: ["https://www.siouxfalls.gov/government/departments/planning-and-development-services/building-services"],
      utilities: ["https://www.xcelenergy.com/working_with_us/business"],
      climate: ["https://www.weather.gov/wrh/climate?wfo=fsd"],
      market: ["https://siouxfallsdevelopment.com/"],
    },
  },
};