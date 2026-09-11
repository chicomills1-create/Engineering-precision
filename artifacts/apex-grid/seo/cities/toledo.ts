import type { CityData } from "../types";

export const toledo: CityData = {
  slug: "toledo",
  name: "Toledo",
  stateSlug: "ohio",
  county: "Lucas County",
  ahj: {
    office: "City of Toledo Division of Building Inspection",
    process:
      "The Division of Building Inspection administers building permits and inspections, with applications and project records handled through the City's online permitting services. Commercial projects may also require zoning, fire, engineering, stormwater, water/sewer, and right-of-way coordination; a Toledo address should not be used to assume jurisdiction for surrounding Lucas County communities.",
  },
  codes: {
    building: "Ohio Building Code, 2024 edition (based on the 2021 International Building Code), enforced by the City of Toledo",
    energy: "Ohio Building Code commercial energy provisions, 2024 edition, based on the 2021 International Energy Conservation Code with Ohio amendments",
    amendments:
      "Ohio's building code is statewide, mandatory, and enforced by certified local departments including Toledo. City zoning, site-development, utility, floodplain, and right-of-way requirements run alongside the Ohio Building Code; the City code and current Building Inspection guidance control local administrative requirements.",
  },
  utilities: {
    electric: "Toledo Edison, a FirstEnergy electric distribution company, serves Toledo",
    notes:
      "Toledo Edison coordinates new electric service, extensions, and distributed generation. The City of Toledo Department of Public Utilities operates municipal water, sanitary sewer, and stormwater systems; large services, hydrants, and new connections need early capacity and routing review.",
  },
  climateNotes:
    "Toledo is in ASHRAE climate zone 5A, with cold Lake Erie-influenced winters, freeze-thaw cycles, snow and drifting, humid summers, and heavy-rainfall events. Lake Erie and the Maumee River create shoreline, riverine, and backwater flood considerations, while glacial soils and urban fill can constrain infiltration.",
  marketNotes:
    "Toledo's market includes advanced manufacturing and automotive supply chains, glass and materials expertise, healthcare and higher education, logistics on the I-75/I-90 corridor, and port-related activity on the Maumee River. Downtown reuse and industrial modernization often pair existing-conditions investigation with utility, environmental, and site-drainage coordination.",
  narratives: {
    mep:
      "Toledo MEP systems need to perform through a zone 5A winter as well as humid summers: heating capacity, pipe and sprinkler freeze protection, vestibules, humidity control, and outside-air sequences are operating requirements, not permit afterthoughts. The 2024 Ohio Building Code commercial energy provisions set the baseline, while Toledo Edison capacity and service routing should be screened early for manufacturing, cold storage, or process loads. City of Toledo water and sanitary connections are a parallel scope. We develop the equipment, controls, electrical distribution, and resilience strategy around the building's actual operations rather than applying a generic Great Lakes specification.",
    structural:
      "Toledo structural design centers on snow, drift, wind, frost, and existing conditions more than seismic demand. The 2024 Ohio Building Code analysis establishes the site-specific loads, while Lake Erie weather makes roof drainage, snow accumulation at elevation changes, uplift, and durable exterior details practical priorities. Glacial deposits, uncontrolled urban fill, and groundwater conditions require a geotechnical investigation before foundation, slab, pavement, or infiltration assumptions are fixed. For older downtown and industrial buildings, measured existing framing and masonry condition should inform load paths and alteration scope before a new use or rooftop equipment is promised.",
    civil:
      "Toledo civil design starts with the receiving system: a site can drain toward the Maumee River, Lake Erie, or an urban storm sewer where downstream capacity and tailwater matter. City Department of Public Utilities requirements shape water, sanitary, and stormwater connections, while floodplain mapping, grades, and erosion control must address intense rain and freeze-thaw exposure. Glacial soils and fill can make infiltration uncertain, so basin selection follows field data rather than a presumed green-infrastructure rate. Qualifying construction disturbance requires Ohio EPA construction-stormwater coverage and a SWPPP, coordinated with City site and right-of-way review.",
    energy:
      "Toledo commercial energy documentation follows the 2024 Ohio Building Code energy provisions based on the 2021 IECC, with applicable Ohio amendments. Cold-humid zone 5A rewards continuous insulation, a continuous air barrier, careful fenestration selection, efficient heating, heat recovery where appropriate, and controlled ventilation; each also reduces winter condensation and freeze risk. We reconcile those measures with lighting, process loads, and Toledo Edison service conditions in a single compliance package. For existing manufacturing or downtown buildings, envelope upgrades are sequenced with real wall, roof, and moisture conditions rather than modeled as new construction.",
  },
  faqs: [
    {
      q: "What building and energy codes apply in Toledo?",
      a: "Toledo enforces Ohio's statewide 2024 Ohio Building Code, based on the 2021 IBC. Its commercial energy provisions are based on the 2021 IECC with Ohio amendments. City zoning, utilities, site development, floodplain, and right-of-way requirements are separate local review layers.",
    },
    {
      q: "Who provides electric, water, and sewer service in Toledo?",
      a: "Toledo Edison provides electric distribution service. The City of Toledo Department of Public Utilities operates municipal water, sanitary sewer, and stormwater systems. Confirm capacity, extension, transformer, hydrant, and connection requirements for the specific site early in design.",
    },
    {
      q: "How do Lake Erie and the Maumee River affect Toledo design?",
      a: "They can affect winter weather, wind-driven rain, snow, and flooding, but exposure is parcel-specific. Riverine or shoreline flood mapping, storm-sewer tailwater, grades, and erosion control should be checked alongside geotechnical conditions rather than using a citywide flood assumption.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 74, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://toledo.oh.gov/services/building-inspection"],
      codes: ["https://com.ohio.gov/divisions-and-programs/industrial-compliance/building-code"],
      amendments: ["https://toledo.oh.gov/services/building-inspection"],
      utilities: ["https://www.firstenergycorp.com/toledoedison.html", "https://toledo.oh.gov/services/public-utilities"],
      climate: ["https://www.weather.gov/cle/"],
      market: ["https://toledochamber.com/"],
    },
  },
};