import type { CityData } from "../types";

export const chandler: CityData = {
  slug: "chandler",
  name: "Chandler",
  stateSlug: "arizona",
  county: "Maricopa County",
  ahj: {
    office: "City of Chandler Development Services Department",
    process:
      "Chandler Development Services administers commercial permits, plan review, and inspections through the city's online permitting services. Building, planning, fire, engineering, and utility comments may run concurrently; complete site, utility, and fire-protection information helps prevent sequential corrections.",
  },
  codes: {
    building: "2018 International Building Code, adopted by the City of Chandler with local amendments",
    energy: "2018 International Energy Conservation Code, commercial provisions, adopted by the City of Chandler",
    amendments:
      "Chandler's adopted construction-code ordinance includes city amendments to its 2018 International Code package. A Chandler permit must use Chandler's current adopted codes and development requirements, not a neighboring East Valley jurisdiction's package.",
  },
  utilities: {
    electric: "Salt River Project (SRP) is the principal electric provider in Chandler; serving territory must be confirmed by parcel",
    notes:
      "SRP coordinates electric-service studies, meter and transformer requirements, and distributed-generation interconnection. City of Chandler Water and Wastewater provides municipal service in its service area; capacity, pressure, fire flow, reclaimed-water availability where applicable, and extensions should be established early.",
  },
  climateNotes:
    "Chandler is in hot-dry climate zone 2B, where extreme summer temperatures, solar gain, monsoon dust, short high-intensity storms, and microburst winds dominate. Desert alluvium, canals and washes, and mapped flood hazards make drainage and soil conditions parcel-specific.",
  marketNotes:
    "Chandler is a major East Valley employment center for semiconductor and advanced manufacturing, technology, aerospace, healthcare, offices, and mixed-use development. Large process and data loads, cooling demand, electric capacity, and municipal-water coordination are central early decisions for industrial and technology facilities.",
  narratives: {
    mep:
      "Chandler MEP design must meet hot-dry 2B cooling loads, intense roof and glazing solar exposure, and dusty monsoon conditions. High-ambient equipment performance, filtration, maintainable air intakes, and resilient controls are coordinated to Chandler's locally amended 2018 code package. SRP capacity, service voltage, fault duty, transformer siting, and interconnection need early confirmation for semiconductor-support, technology, and other large-load programs; city water pressure and fire flow complete the utility basis.",
    structural:
      "Chandler structural design combines 2018 IBC wind and seismic criteria with a project-specific geotechnical report. Alluvial desert ground can vary and may contain collapsible or expansive materials that affect slabs, foundations, pavement support, and underground utilities. Monsoon microbursts make roof uplift, parapet, screen, canopy, and rooftop-equipment anchorage important. Sites near canals, washes, or mapped flood hazards need elevation and drainage assumptions coordinated with the civil design.",
    civil:
      "Chandler civil design treats the dry landscape as a concentrated-runoff system. We evaluate washes, canals, street conveyance, FEMA mapping, finished floors, retention or detention, and off-site discharge under city engineering requirements, then coordinate water, wastewater, fire-flow, and possible reclaimed-water infrastructure with city utilities. Early utility confirmation is particularly important for high-demand industrial sites, where off-site capacity or extension work can set the development sequence.",
    energy:
      "Chandler commercial energy compliance follows the locally amended 2018 IECC. Low-SHGC glazing, cool roofs, envelope air control, high-ambient cooling efficiency, lighting controls, and load-management decisions are evaluated together in 2B rather than as isolated checklists. For high-process-load facilities, building-code documentation is coordinated with SRP service constraints and the city's water and wastewater capacity review so the energy strategy remains buildable.",
  },
  faqs: [
    { q: "What commercial codes does Chandler enforce?", a: "Chandler enforces its locally amended 2018 International Code package, including the 2018 IBC and commercial 2018 IECC. Development Services coordinates building review, with planning, fire, engineering, and utility requirements potentially reviewed in parallel." },
    { q: "Who provides electric and water service in Chandler?", a: "SRP is Chandler's principal electric provider, subject to parcel-specific territory confirmation. City of Chandler Water and Wastewater serves its municipal service area; confirm capacity, pressure, fire flow, reclaimed-water availability where relevant, and extension needs early." },
    { q: "What should high-load Chandler facilities coordinate first?", a: "High-load facilities should confirm SRP electric capacity, voltage, transformer siting, and interconnection alongside City of Chandler water, wastewater, and fire-flow capacity. Those infrastructure inputs can affect site layout, equipment selection, and phasing before permit drawings are finalized." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.chandleraz.gov/government/departments/development-services"],
      codes: ["https://www.chandleraz.gov/government/departments/development-services"],
      amendments: ["https://www.chandleraz.gov/government/departments/development-services"],
      utilities: ["https://www.srpnet.com/business"],
      climate: ["https://www.weather.gov/psr/"],
      market: ["https://www.chandleraz.gov/business"],
    },
  },
};