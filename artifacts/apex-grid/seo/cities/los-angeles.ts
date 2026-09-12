import type { CityData } from "../types";

export const losAngeles: CityData = {
  slug: "los-angeles",
  name: "Los Angeles",
  stateSlug: "california",
  county: "Los Angeles County",
  ahj: {
    office: "City of Los Angeles Department of Building and Safety (LADBS)",
    process:
      "LADBS uses its online services for permit applications, plan-check cases, corrections, and inspections; eligible projects can use electronic plan review and the department's expedited plan-check service. The permit path can also require Planning, Fire, Public Works, and utility approvals, so the project address and scope should be screened before a complete submittal is assembled.",
  },
  codes: {
    building:
      "2025 California Building Standards Code (Title 24), effective January 1, 2026, as locally adopted and amended in the Los Angeles Municipal Code and administered by LADBS",
    energy:
      "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, as enforced by LADBS with locally applicable CALGreen and Los Angeles green-building requirements",
    amendments:
      "LADBS publishes Los Angeles amendments and directs applicants to the Los Angeles Municipal Code rather than a plain state model code. Seismic retrofit ordinances, hillside and grading rules, accessibility, fire/life-safety, and project-specific green-building provisions can change the design and review path; the current LADBS amendment package controls.",
  },
  utilities: {
    electric:
      "Los Angeles Department of Water and Power (LADWP), the municipal electric and water utility inside the City of Los Angeles; neighboring jurisdictions may instead be served by Southern California Edison",
    notes:
      "LADWP's commercial-service and interconnection processes govern new electric services, distributed generation, and water coordination in the city; LA Sanitation and Environment handles municipal sewer functions. Confirm available capacity, service voltage, transformer location, water/sewer requirements, and any solar or storage process with the respective agencies before fixing a large load.",
  },
  climateNotes:
    "Los Angeles has strong coastal-to-inland microclimates: marine-influenced areas have mild summers, while the San Fernando and San Gabriel valleys run hotter. Long dry periods, winter storm runoff, Santa Ana winds, coastal salt exposure, wildfire smoke, and high seismic hazard all need site-specific treatment rather than a single citywide HVAC or enclosure assumption.",
  marketNotes:
    "The city's commercial work includes multifamily and mixed-use infill, entertainment and studio facilities, healthcare and institutional campuses, adaptive reuse, and older-building retrofit. LADBS seismic ordinances create a continuing retrofit market, while hillside parcels and dense public-right-of-way interfaces add entitlement, grading, and utility coordination to many projects.",
  narratives: {
    mep:
      "Los Angeles MEP design starts with the applicable Title 24, Part 6 compliance path and the LADBS local package, not an out-of-state IECC template. Coastal projects need corrosion-aware equipment and controls; hotter valley sites need realistic cooling and ventilation design, and wildfire-smoke operation makes filtration and controllable outdoor air important. Because LADWP is the city electric and water utility, we verify service capacity, voltage, transformer space, water demand, and distributed-generation requirements early instead of applying Southern California Edison assumptions to a Los Angeles address.",
    structural:
      "Los Angeles structural work is governed by a high-seismic setting in which site soil, fault proximity, building age, and irregularity can materially change the lateral design. LADBS local amendments and its mandatory retrofit programs for covered soft-story wood-frame and non-ductile-concrete buildings make existing-building screening a real project milestone. Hillside sites add retaining, grading, and slope-stability coordination, while equipment anchorage and special inspection must be coordinated with the architectural and MEP packages before plan check.",
    civil:
      "Los Angeles civil design must reserve space for the City's stormwater and Low Impact Development requirements, which can require capture, infiltration, treatment, or reuse before runoff reaches the municipal system. Hillside grading, haul routes, slope stability, flood and debris-flow screening, and Bureau of Engineering right-of-way work can all affect the site plan. We coordinate LADWP water and LA Sanitation sewer information with grading, fire access, and LID geometry early because those systems compete for limited urban and hillside space.",
    energy:
      "Los Angeles energy compliance is a California Title 24, Part 6 modeling and documentation exercise with locally applicable CALGreen and Los Angeles green-building layers; it is not a COMcheck-only workflow. The right strategy differs by microclimate: shading, glazing, envelope air control, and efficient cooling matter at hot inland sites, while marine sites can benefit from right-sized systems and carefully controlled economizer operation. We connect the compliance model to LADWP electric service, solar, storage, and electrification constraints so the modeled design can actually be served.",
  },
  faqs: [
    {
      q: "Which code edition applies to my Los Angeles permit?",
      a: "For projects submitted under the current cycle, LADBS enforces the 2025 California Building Standards Code and 2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with Los Angeles amendments. The LADBS code documents still control project-specific exceptions, phased permits, and local requirements.",
    },
    {
      q: "Could a Los Angeles alteration require seismic-retrofit work?",
      a: "It can. Los Angeles has mandatory retrofit ordinances for covered soft-story wood-frame and non-ductile-concrete buildings, in addition to ordinary code-triggered structural work. A records and field evaluation by the design team determines whether the building and proposed scope fall within a specific ordinance.",
    },
    {
      q: "Who provides electric and water service inside Los Angeles?",
      a: "LADWP provides municipal electric and water service within the City of Los Angeles. The serving utility must still be confirmed for the parcel, especially near city boundaries; LADWP should be engaged early for new service, capacity, transformer, water, solar, and storage questions.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 94, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://dbs.lacity.gov/"],
      codes: ["https://www.bsc.ca.gov/Codes.aspx", "https://www.hcd.ca.gov/building-standards", "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards", "https://dbs.lacity.gov/forms-and-publications?cats=193"],
      amendments: ["https://dbs.lacity.gov/los-angeles-city-code-documents"],
      utilities: ["https://www.ladwp.com/commercial-services", "https://www.lacitysan.org/"],
      climate: ["https://www.weather.gov/lox/"],
      market: ["https://ewdd.lacity.gov/"],
    },
  },
};