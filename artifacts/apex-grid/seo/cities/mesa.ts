import type { CityData } from "../types";

export const mesa: CityData = {
  slug: "mesa",
  name: "Mesa",
  stateSlug: "arizona",
  county: "Maricopa County",
  ahj: {
    office: "City of Mesa Development Services Department",
    process:
      "Mesa accepts commercial permit applications, plans, corrections, and inspection requests in its Development Services customer portal. Building, planning, engineering, fire, and utility issues can be concurrent reviews; the city publishes permit-status and inspection information online, so a complete digital submittal and early site/utility coordination are important.",
  },
  codes: {
    building: "2021 International Building Code, adopted in Mesa City Code Title 4, Chapter 2 with local amendments",
    energy: "2021 International Energy Conservation Code (commercial provisions), with Mesa amendments",
    amendments:
      "Mesa's adopted-code ordinance amends the ICC family locally, including administrative and technical provisions; the city publishes the adopted codes and amendments through Development Services. Do not substitute Phoenix's 2018-based PBCC: Mesa's 2021 code package and amendment text govern a Mesa address.",
  },
  utilities: {
    electric: "Salt River Project (SRP) is the principal electric provider in Mesa; service territory must be confirmed by parcel, as APS serves portions of the broader East Valley",
    notes:
      "SRP coordinates new electric service, meters, and distributed-generation interconnection; service capacity and transformer lead time should be established before a large electric load is fixed. City of Mesa provides water and wastewater service in its service area, with capacity and extension requirements reviewed with the utility.",
  },
  climateNotes:
    "Mesa is in hot-dry ASHRAE climate zone 2B. Extreme summer cooling, intense solar gain, monsoon dust, short-duration cloudbursts, and microburst winds govern more of the design than winter heating; the Salt River and Superstition foothill setting also makes mapped flood hazards site-specific.",
  marketNotes:
    "Mesa's commercial pipeline is shaped by the Mesa Gateway area and Phoenix-Mesa Gateway Airport, aerospace and advanced manufacturing, healthcare and education campuses, and East Valley industrial/logistics development. The city is also part of the semiconductor supply-chain market extending across the Phoenix metro, where high electrical loads and water coordination need early attention.",
  narratives: {
    mep:
      "Mesa MEP design begins with a 2B hot-dry cooling profile: high ambient temperature and solar gain set plant and roof-equipment capacity, while monsoon dust supports robust outside-air filtration and maintainable intake locations. Mesa enforces its locally amended 2021 code package, so energy, mechanical, and electrical details should be coordinated to that edition rather than Phoenix's older PBCC basis. SRP is the usual serving utility, but its service confirmation, available fault duty, transformer location, and distributed-generation process belong in schematic design—especially for Mesa Gateway industrial and advanced-manufacturing loads.",
    structural:
      "For Mesa structures, the project geotechnical report often matters more than modest regional seismic demand: alluvial desert sites can contain expansive, collapsible, or variable soils that affect slab support, foundation selection, and utility backfill. Monsoon microbursts make roof uplift, parapets, screens, and rooftop-unit anchorage consequential even on low-rise work. The 2021 IBC with Mesa amendments supplies the review basis, while floodplain or wash-adjacent parcels need their structural elevations and scour assumptions coordinated with the civil drainage design.",
    civil:
      "Mesa civil design must make room for desert hydrology rather than treating the site as uniformly dry. Intense monsoon events can produce concentrated runoff in washes and streets, so grading, retention/detention, and finished-floor elevations are coordinated with Mesa engineering requirements and the applicable FEMA flood mapping. City water and wastewater availability, off-site extensions, and fire-flow demands should be resolved early; that is particularly important around Gateway-area industrial sites where service sizing can drive both the plan and the schedule.",
    energy:
      "Mesa commercial energy compliance is based on the locally amended 2021 IECC. In 2B, low solar-heat-gain glazing, reflective roof strategies, efficient high-ambient cooling equipment, and envelope air control usually provide more useful savings than simply adding wall insulation. We coordinate the compliance path with Mesa Development Services as a single envelope, lighting, and HVAC package, then align solar or other distributed generation with SRP's interconnection requirements instead of leaving utility review until construction.",
  },
  faqs: [
    {
      q: "What commercial building code does Mesa enforce?",
      a: "Mesa enforces its locally amended 2021 International Codes, including the 2021 IBC and commercial 2021 IECC, through City Code Title 4 and Development Services. Phoenix and Mesa do not share an amendment package, so a Phoenix code analysis should not be reused for a Mesa permit.",
    },
    {
      q: "Who provides electricity for a Mesa commercial project?",
      a: "SRP is the principal electric provider in Mesa, although the serving utility should always be confirmed for the parcel because APS serves parts of the wider East Valley. SRP should be engaged early for new service capacity, transformer placement, metering, and solar interconnection.",
    },
    {
      q: "What site constraint is most important in Mesa's monsoon season?",
      a: "Short, intense monsoon rainfall and microburst winds are the recurring constraints. A Mesa site needs early grading and drainage planning for concentrated runoff, wash or floodplain conditions where applicable, and roof/equipment anchorage that accounts for wind uplift.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 89, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.mesaaz.gov/government/departments/development-services"],
      codes: ["https://www.mesaaz.gov/government/departments/development-services/building-code"],
      amendments: ["https://www.mesaaz.gov/government/departments/development-services/building-code"],
      utilities: ["https://www.srpnet.com/business"],
      climate: ["https://www.weather.gov/psr/"],
      market: ["https://www.selectmesa.com/"],
    },
  },
};