import type { CityData } from "../types";

export const losAngeles: CityData = {
  slug: "los-angeles",
  name: "Los Angeles",
  stateSlug: "california",
  county: "Los Angeles County",
  ahj: {
    office: "City of Los Angeles Department of Building and Safety (LADBS)",
    process:
      "Plan check runs through LADBS's online services, with permits handled in the ePlanLA/e-permit system and case-based electronic plan review. LADBS offers a Plan Check and Inspection (PCIS) workflow plus an Expedited Plan Check program where staff work overtime on a fee basis to shorten turnaround. Larger or complex buildings route through the Metro or Valley development services centers, and structural review is exacting given the seismic setting.",
  },
  codes: {
    building:
      "2023 Los Angeles City Building Code (Title 22, based on the 2022 California Building Code / 2021 IBC) with city amendments",
    energy:
      "2022 California Energy Code (Title 24, Part 6), enforced with the 2022 CALGreen mandatory measures",
    amendments:
      "Los Angeles adds significant seismic amendments — mandatory retrofit ordinances for soft-story wood-frame and non-ductile concrete buildings, plus local grading and hillside provisions in the LA City Building Code. The city's own Green Building Code and building electrification-leaning ordinances go beyond the state baseline, so confirm the current LADBS amendment package rather than assuming plain CBC.",
  },
  utilities: {
    electric:
      "Los Angeles Department of Water and Power (LADWP) — a municipal utility serving the city, distinct from Southern California Edison in surrounding jurisdictions",
    notes:
      "LADWP handles both power and water inside city limits, so service planning, new-service applications, and interconnection all go through one municipal agency; large new services can carry meaningful transformer and design lead times. Time-of-use commercial rates reward load-shifting, and LADWP's Feed-in Tariff and net-metering rules shape on-site solar economics.",
  },
  climateNotes:
    "Los Angeles spans ASHRAE climate zones 3B near the coast and pushes hotter inland, with mild coastal design temperatures, a strong marine influence, and long cooling-favorable shoulder seasons; coastal corrosion and inland heat both drive equipment selection depending on where in the city a site sits.",
  marketNotes:
    "Los Angeles construction is driven by dense mixed-use and multifamily infill, entertainment and studio/soundstage expansion, healthcare and institutional work, and adaptive reuse of older commercial stock. The city's mandatory seismic retrofit ordinances have generated a sustained pipeline of soft-story and non-ductile concrete upgrade projects, and hillside development adds grading and geotechnical complexity across large parts of the city.",
  narratives: {
    mep:
      "MEP design in Los Angeles works to Title 24, Part 6 (2022) alongside the LA City amendments, and the coastal-to-inland spread means the same firm may design for a mild marine 3B site one month and a hot inland valley the next. We select coastal equipment for salt-air corrosion resistance and inland equipment for higher ambient loads, and we lean on LA's long economizer-favorable shoulder seasons where the climate genuinely supports it. Electrically, everything inside city limits interconnects through LADWP as a single municipal power-and-water agency, so we confirm service capacity, TOU demand structures, and realistic transformer lead times with LADWP early rather than assuming Edison's processes apply.",
    structural:
      "Structural engineering is the defining discipline in Los Angeles: the site sits in a high-seismic region with Seismic Design Categories commonly D through F depending on soils and proximity to active faults, and near-fault directivity governs many downtown and Westside sites. LADBS enforces the 2022 CBC seismic provisions plus the city's mandatory retrofit ordinances for soft-story wood-frame and non-ductile concrete buildings, so both new design and existing-building upgrades demand rigorous lateral analysis. Hillside sites add grading and slope-stability requirements, and LADBS structural plan check is thorough, with special-inspection programs administered through the department's own forms.",
    civil:
      "Civil and site work in Los Angeles must satisfy the city's stormwater and Low Impact Development (LID) requirements, which push on-site infiltration, capture, and reuse to manage runoff to the MS4 system and ultimately the ocean. Hillside grading ordinances, haul-route approvals, and slope-stability review shape site layout across the city's many hilly neighborhoods, and B-permit work in the public right-of-way is coordinated with LA's Bureau of Engineering. We plan grading, drainage, and LID footprints early because they consume developable area, and we coordinate LADWP water and sewer capacity as part of the entitlement and permit sequence.",
    energy:
      "Energy compliance in Los Angeles targets the 2022 California Energy Code (Title 24, Part 6) with the 2022 CALGreen mandatory measures, a stringency well above the IECC baselines used in many other states. Compliance is demonstrated through Title 24 energy modeling rather than simple COMcheck prescriptive paths, and LA's own green building provisions layer additional requirements on top. In the mild coastal 3B zone, envelope and glazing performance plus efficient, right-sized HVAC drive compliance, while inland sites lean harder on cooling efficiency; on-site solar and electrification economics run through LADWP's municipal rate and interconnection rules, which we factor into the compliance strategy from schematic design.",
  },
  faqs: [
    {
      q: "What building code does the City of Los Angeles enforce?",
      a: "LADBS enforces the Los Angeles City Building Code, based on the 2022 California Building Code (itself built on the 2021 IBC) with substantial city amendments — including mandatory seismic retrofit provisions and hillside grading rules — plus the California Energy Code and CALGreen. It is materially stricter than a plain IBC jurisdiction.",
    },
    {
      q: "Does my Los Angeles building need a seismic retrofit?",
      a: "Possibly. LA has mandatory retrofit ordinances covering soft-story wood-frame apartment buildings and non-ductile concrete structures, with compliance deadlines enforced by LADBS. Whether a specific building is affected depends on its structural type, age, and use, which a structural evaluation confirms before design.",
    },
    {
      q: "Who provides utility service for projects inside the City of Los Angeles?",
      a: "The Los Angeles Department of Water and Power (LADWP), a municipal utility, provides both electricity and water inside city limits — not Southern California Edison, which serves many surrounding jurisdictions. Because one agency handles power and water, we coordinate new service, capacity, and interconnection with LADWP early in design.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 94, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://dbs.lacity.gov/"],
      codes: ["https://dbs.lacity.gov/forms-and-publications?cats=193"],
      amendments: ["https://dbs.lacity.gov/los-angeles-city-code-documents"],
      utilities: ["https://www.ladwp.com/commercial-services"],
      climate: ["https://www.weather.gov/lox/"],
      market: ["https://ewdd.lacity.gov/"],
    },
  },
};
