import type { CityData } from "../types";

export const fortWorth: CityData = {
  slug: "fort-worth",
  name: "Fort Worth",
  stateSlug: "texas",
  county: "Tarrant County",
  ahj: {
    office: "City of Fort Worth Development Services Department",
    process:
      "Fort Worth routes commercial permits, plan review, inspections, and development review through Development Services and its online permitting tools. Building permits often run alongside platting, zoning, engineering, and fire review; the city and surrounding Tarrant County municipalities are separate AHJs, so a Fort Worth address alone is not a permit-jurisdiction determination.",
  },
  codes: {
    building: "2021 International Building Code, adopted in the City of Fort Worth's construction code package with local amendments",
    energy: "2021 International Energy Conservation Code, commercial provisions, with Fort Worth amendments",
    amendments:
      "Fort Worth adopts and amends its own I-Code package, including local administrative, fire, mechanical, plumbing, and electrical provisions. Its 2021 base is not interchangeable with Dallas or other Metroplex city amendments, and the current city ordinance and Development Services bulletins control a submittal.",
  },
  utilities: {
    electric: "Oncor Electric Delivery provides the regulated electric delivery network; Fort Worth is in ERCOT's competitive retail-electric market",
    notes:
      "A commercial customer selects a retail electric provider for energy supply while Oncor handles delivery equipment, meters, service extensions, and distributed-generation interconnection. Fort Worth Water provides municipal water, wastewater, and stormwater services within its service area; large services require early capacity and extension coordination.",
  },
  climateNotes:
    "Fort Worth is in warm-humid climate zone 3A, with hot summers, severe thunderstorms, hail, occasional winter freezes, and strong convective winds. The western Metroplex transitions across variable geology, including expansive clay soils that make moisture variation and geotechnical recommendations central to foundation and pavement design.",
  marketNotes:
    "Fort Worth's construction market is supported by AllianceTexas and other logistics/industrial corridors, aviation and defense activity around Alliance and NAS JRB, healthcare, multifamily, and major westward residential and mixed-use growth. The scale of north and west Fort Worth growth puts utility extensions, drainage, transportation access, and development-review sequencing on the critical path for many sites.",
  narratives: {
    mep:
      "Fort Worth MEP work addresses long cooling seasons in climate zone 3A while retaining credible freeze-protection and winter-operability design for North Texas cold snaps. The city enforces its locally amended 2021 I-Code package, so equipment, ventilation, fuel-gas, plumbing, and electrical documents are checked against Fort Worth—not Dallas—requirements. Oncor owns the delivery system in the ERCOT retail market; we establish available fault duty, service voltage, transformer/site routing, and the owner's retail-supply assumptions early, while Fort Worth Water capacity and extension needs inform plumbing and fire-service routing.",
    structural:
      "North Texas soil movement is a primary Fort Worth structural issue. Expansive clays can shrink and swell as moisture changes, so the geotechnical report drives whether a project uses post-tensioned slabs, drilled piers, grade beams, void-form details, or another system, along with positive drainage and moisture-management measures. Seismic demand is generally low, but severe thunderstorms, hail, and roughly 105–115 mph basic-wind design conditions make roof uplift, cladding, canopies, and rooftop-equipment anchorage material design items. The local 2021 IBC amendment package and Fort Worth special-inspection requirements are coordinated in the permit set.",
    civil:
      "Fort Worth civil design joins drainage to growth infrastructure. Sites drain to tributaries of the Trinity River, and the city's development, floodplain, drainage, paving, and water/wastewater criteria shape detention, conveyance, access, and utility plans. Expansive clay affects pavement subgrades and trench restoration as well as foundations, so grading must prevent ponding against buildings and preserve the geotechnical moisture strategy. We coordinate platting and engineering review with Development Services and Fort Worth Water, account for FEMA floodplain constraints where applicable, and prepare SWPPP/NPDES coverage for qualifying construction disturbance.",
    energy:
      "Fort Worth's commercial baseline is the locally amended 2021 IECC. Zone 3A favors an integrated package of solar-control glazing, air sealing, efficient cooling, lighting controls, and systems that retain safe cold-weather operation rather than a one-season-only design. We select the prescriptive or modeled path against the exact Fort Worth package, reconcile envelope and mechanical tradeoffs before permit, and consider Oncor delivery capacity and ERCOT peak-demand exposure when evaluating electrification, load management, and on-site generation.",
  },
  faqs: [
    {
      q: "Does Fort Worth use the same code amendments as Dallas?",
      a: "No. Both cities use a 2021 I-Code base, but Fort Worth adopts and amends its own construction-code package. The Fort Worth ordinance, Development Services guidance, and the specific project's permit jurisdiction—not a neighboring city's code set—govern the design.",
    },
    {
      q: "Who handles electricity for a Fort Worth commercial building?",
      a: "Oncor Electric Delivery handles the regulated delivery system, meters, service extensions, and interconnection. Fort Worth is in ERCOT's competitive market, so the customer separately chooses a retail electric provider for energy supply; service capacity and transformer routing should be coordinated with Oncor early.",
    },
    {
      q: "Why is a geotechnical report important in Fort Worth?",
      a: "Expansive clay can move substantially as moisture changes, affecting slabs, piers, pavements, and buried utilities. The report establishes soil movement potential and design parameters, while civil grading and drainage must support the structural moisture-management recommendations.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 94, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.fortworthtexas.gov/departments/development-services"],
      codes: ["https://www.fortworthtexas.gov/departments/development-services/permits/codes"],
      amendments: ["https://www.fortworthtexas.gov/departments/development-services/permits/codes"],
      utilities: ["https://www.oncor.com/", "https://www.fortworthtexas.gov/departments/water"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://www.fortworthtexas.gov/departments/economic-development"],
    },
  },
};