import type { CityData } from "../types";

export const fremont: CityData = {
  slug: "fremont",
  name: "Fremont",
  stateSlug: "california",
  county: "Alameda County",
  ahj: {
    office: "City of Fremont Community Development Department, Building & Safety Division",
    process:
      "Fremont's Community Development Department is the local building-permit authority and directs applicants through its Building & Safety permit, plan-review, and inspection process. Commercial work can also require Planning, Fire, Public Works, and utility coordination; zoning, subdivision, grading, and public-improvement approvals are separate checks rather than being assumed to follow automatically from a building permit.",
  },
  codes: {
    building:
      "2025 California Building Standards Code (Title 24), effective January 1, 2026, with City of Fremont local amendments",
    energy:
      "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with applicable CALGreen measures",
    amendments:
      "Fremont's municipal code and adopted local amendments supplement the California Building Standards Code. The current City Building Code page and the project scope control the applicable cycle, administrative requirements, and any local planning, fire, grading, or stormwater conditions; an older code-cycle checklist should not be carried forward without confirmation.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E)",
    notes:
      "PG&E handles electric service design, capacity, metering, and distributed-generation interconnection. Alameda County Water District supplies water in Fremont, while Union Sanitary District provides regional wastewater treatment and collection in its service area; territory, fire-flow, sewer capacity, and extension requirements should be confirmed by parcel.",
  },
  climateNotes:
    "Fremont's southern East Bay setting has a mild, dry-summer marine climate but also inland heat, winter rain, wildfire-smoke episodes, and bay-margin wind and flood exposure. The Hayward Fault and variable valley, bay-margin, and foothill soils make seismic, liquefaction, settlement, and slope conditions site-specific.",
  marketNotes:
    "Fremont's commercial market combines the Warm Springs Innovation District, advanced manufacturing and semiconductor-related activity, technology, healthcare, logistics, and residential or mixed-use growth. Industrial and laboratory users can create substantial electrical, ventilation, process-water, and loading demands, while established corridors make utility conflicts and phased construction common feasibility issues.",
  narratives: {
    mep:
      "Fremont MEP design starts with a mild East Bay baseline but checks inland summer peaks, wildfire-smoke filtration, and the operating profile of semiconductor, advanced-manufacturing, laboratory, healthcare, or warehouse space. PG&E service capacity and transformer or switchgear locations should be tested before an all-electric or process-heavy program is fixed. We coordinate Title 24 Part 6 modeling, outdoor-air and exhaust sequences, equipment anchorage, and PG&E service or interconnection requirements as one permit package rather than treating utility capacity as a late construction issue.",
    structural:
      "Fremont structural engineering is driven by Bay Area seismic demand and sharply varying site conditions between the bay margin, valley floor, and East Bay foothills. The geotechnical report should establish site class, liquefaction or lateral-spread potential, settlement, groundwater, and slope stability before foundations, retaining systems, and floor slabs are selected. Industrial buildings also need explicit load paths for racks, cranes, rooftop equipment, and vibration-sensitive process equipment, with nonstructural seismic restraint coordinated for the Building & Safety review.",
    civil:
      "Fremont civil design must fit stormwater treatment, grading, fire access, loading, and utility corridors into a city where industrial campuses, infill parcels, and foothill or bay-edge sites have very different constraints. We coordinate Alameda County Water District water and fire-flow requirements with Union Sanitary District sewer capacity, screen FEMA and local drainage conditions before setting finished floors, and reserve space for post-construction treatment and hydromodification measures. Public frontage and utility work should be resolved with Fremont reviewers before the architectural site plan loses flexibility.",
    energy:
      "Fremont energy compliance follows California's Title 24 Part 6 process and applicable CALGreen measures, using the current state-approved compliance approach rather than an IECC COMcheck assumption. In the East Bay climate, glazing and solar control, efficient heat-pump systems, lighting controls, ventilation scheduling, and realistic process loads all affect the result. PG&E service sizing, solar or storage interconnection, EV charging, and high-load manufacturing requirements should be modeled alongside the compliance documents so an apparent energy solution does not exceed available service.",
  },
  faqs: [
    {
      q: "Which office reviews a Fremont commercial building permit?",
      a: "The City of Fremont Community Development Department's Building & Safety Division administers building permits, plan review, and inspections. Depending on the scope, Planning, Fire, Public Works, Alameda County Water District, Union Sanitary District, and PG&E can have additional review or service requirements.",
    },
    {
      q: "Which utilities serve a Fremont commercial project?",
      a: "PG&E provides electric service. Alameda County Water District is the local water agency, and Union Sanitary District handles regional wastewater service in its service area. Confirm the parcel's water and sewer territory, capacity, fire-flow, and extension conditions before fixing utility plans.",
    },
    {
      q: "What code basis should a Fremont energy model use?",
      a: "Use the California Energy Code, Title 24 Part 6, and the current Fremont-adopted local code package for the permit and scope. California compliance is documented through the state's approved methods and software; a generic IECC or COMcheck analysis is not a substitute for Title 24 documentation.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 86, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: [
        "https://www.fremont.gov/government/departments/community-development/building-safety",
        "https://www.fremont.gov/government/departments/community-development/building-safety/permits",
      ],
      codes: [
        "https://www.hcd.ca.gov/building-standards",
        "https://www.fremont.gov/government/departments/community-development/building-safety/building-codes",
        "https://www.dgs.ca.gov/BSC/Codes",
        "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards",
      ],
      amendments: [
        "https://library.municode.com/ca/fremont/codes/code_of_ordinances",
        "https://www.fremont.gov/government/departments/community-development/building-safety/building-codes",
      ],
      utilities: [
        "https://www.pge.com/",
        "https://www.acwd.org/",
        "https://www.unionsanitary.com/",
      ],
      climate: [
        "https://www.weather.gov/mtr/",
        "https://www.usgs.gov/programs/earthquake-hazards/science/hayward-fault",
      ],
      market: [
        "https://www.fremont.gov/government/departments/economic-development",
        "https://www.fremont.gov/business",
      ],
    },
  },
};