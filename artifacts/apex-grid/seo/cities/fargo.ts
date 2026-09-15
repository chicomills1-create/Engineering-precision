import type { CityData } from "../types";

export const fargo: CityData = {
  slug: "fargo",
  name: "Fargo",
  stateSlug: "north-dakota",
  county: "Cass County",
  ahj: {
    office: "City of Fargo Inspections Department",
    process:
      "Commercial building permits are submitted through Fargo's permitting process for review by the Inspections Department, with planning, zoning, fire, engineering, and utility reviews added when applicable. The project address determines the required submittals and reviews; floodplain, access, and public-improvement questions should be resolved with the City before construction documents are finalized.",
  },
  codes: {
    building: "North Dakota State Building Code based on the 2018 International Building Code, as enforced by the City of Fargo",
    energy:
      "2018 International Energy Conservation Code commercial provisions under the North Dakota State Building Code",
    amendments:
      "Fargo applies the state code through its local inspections authority and layers local zoning, floodplain, subdivision, fire, and public-works requirements over the building-code review. Confirm any current Fargo amendments and project-specific floodplain requirements with the Inspections Department before setting the permit basis.",
  },
  utilities: {
    electric: "Xcel Energy (Northern States Power) provides electric service in Fargo",
    notes:
      "The City of Fargo provides municipal water and sanitary sewer service; stormwater and street-connection requirements are coordinated with Fargo Engineering and Public Works. Xcel service capacity, transformer locations, and any distributed-generation interconnection should be checked early for high-load commercial work.",
  },
  climateNotes:
    "Fargo is in the very cold ASHRAE 6A climate region, with prolonged subzero winter weather, deep frost, snow, strong prairie winds, and spring snowmelt. The flat Red River Valley and its floodplain make finished-floor elevation, groundwater, drainage, and floodplain review important site inputs.",
  marketNotes:
    "Fargo is the region's largest commercial center, with healthcare, higher education, technology, logistics, food and agricultural processing, and manufacturing activity. Development in the Fargo-Moorhead area crosses city boundaries, so utility capacity, transportation access, flood resilience, and coordination with neighboring jurisdictions can affect schedules.",
  narratives: {
    mep:
      "Fargo MEP design starts with the 6A winter: heating capacity, freeze protection, vestibules, pipe insulation, and condensate routing must remain reliable through prolonged subzero conditions. We coordinate Xcel electrical service and the City of Fargo water and sewer connections early, especially for manufacturing, healthcare, and logistics loads, then pair a tight envelope with heat recovery so ventilation air does not become an uncontrolled heating penalty. Fargo's local review also means fire, utility, and floodplain decisions need to stay aligned with the state-code permit set.",
    structural:
      "Fargo structural work is governed by cold, snow, wind, frost, and Red River Valley soils rather than high seismic demand. We use the adopted 2018 IBC basis, verify the current site snow and wind criteria, and analyze drift around parapets, steps, and rooftop equipment instead of relying on a uniform roof load. Deep frost and soft or compressible valley soils make the geotechnical report essential for foundations and slabs; floodplain elevations and groundwater can also affect the structural datum and equipment placement.",
    civil:
      "Civil design in Fargo must make the flat Red River Valley work during both intense summer rainfall and spring snowmelt. We coordinate Fargo Engineering and Public Works requirements for grading, stormwater, utilities, access, and public improvements, while screening FEMA floodplain mapping and finished-floor elevations before the site plan is fixed. High groundwater and limited infiltration can favor detention and controlled conveyance over assumed infiltration, and frost requires careful utility depths, pavement sections, and construction sequencing.",
    energy:
      "Fargo commercial energy documentation follows the 2018 IECC provisions in North Dakota's state building-code framework. In climate 6A, continuous insulation, air-barrier continuity, thermal bridges, low-U-factor glazing, and heat-recovery ventilation are the high-value decisions; efficient equipment cannot compensate for a leaky cold-climate envelope. We select the applicable code compliance path, coordinate it with the City's permit review, and model Xcel-served electrical loads early when electrification or process equipment could change service requirements.",
  },
  faqs: [
    {
      q: "Who reviews a commercial building permit in Fargo?",
      a: "The City of Fargo Inspections Department is the primary building-permit authority. Depending on the project, planning, zoning, fire, engineering, utilities, and floodplain reviews are also involved; the address and scope determine the required review path.",
    },
    {
      q: "What code and energy standard should a Fargo project use?",
      a: "Fargo enforces North Dakota's State Building Code, which is based on the 2018 IBC, including the 2018 IECC commercial provisions. Current local amendments and any project-specific floodplain or site requirements should be confirmed with the Inspections Department before design is finalized.",
    },
    {
      q: "Why are foundations and site drainage difficult in Fargo?",
      a: "Deep frost, high groundwater, and soft or compressible Red River Valley soils can affect foundations, slabs, utilities, and pavement. The Red River floodplain also makes flood elevations, grading, detention, and controlled conveyance important; a site-specific geotechnical investigation and current FEMA mapping should guide the design.",
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
      commercialOpportunity: 78,
      searchConsoleImpressions: 0,
      searchConsolePeriod: "unavailable",
    },
    sources: {
      ahj: ["https://fargond.gov/city-government/departments/inspections"],
      codes: ["https://www.commerce.nd.gov/community-services/building-codes"],
      amendments: ["https://fargond.gov/city-government/departments/inspections"],
      utilities: ["https://www.xcelenergy.com/working_with_us/business"],
      climate: ["https://www.weather.gov/fgf/climate"],
      market: ["https://www.fargomoorhead.org/"],
    },
  },
};