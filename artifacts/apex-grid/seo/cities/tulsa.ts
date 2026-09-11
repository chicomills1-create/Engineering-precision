import type { CityData } from "../types";

export const tulsa: CityData = {
  slug: "tulsa",
  name: "Tulsa",
  stateSlug: "oklahoma",
  county: "Tulsa County",
  ahj: {
    office: "City of Tulsa Development Services, Permit Center",
    process:
      "Tulsa Development Services administers building permits, plan review, and inspections through its Permit Center and online permitting services. Commercial projects can require coordinated reviews by building, fire, engineering services, the Tulsa Planning Office, and utilities; applicants should establish zoning, floodplain, access, and water/sewer requirements before submitting a complete permit set.",
  },
  codes: {
    building: "2018 International Building Code, adopted by the City of Tulsa with local amendments",
    energy: "2018 International Energy Conservation Code, commercial provisions, adopted by the City of Tulsa",
    amendments:
      "Tulsa implements Oklahoma’s 2018 statewide I-Code minimum through its city code and local amendments. The city’s adopted building package is only one part of approval: Tulsa’s zoning, floodplain, engineering, and utility standards can add project-specific requirements, particularly in the Arkansas River and creek corridors.",
  },
  utilities: {
    electric: "Public Service Company of Oklahoma (PSO) provides electric distribution service; City of Tulsa Utilities provides municipal water and wastewater services in its service area",
    notes:
      "PSO handles new electric service, load capacity, and distributed-generation interconnection; capacity and equipment lead times should be checked for large industrial or data loads. Tulsa Utilities availability, water pressure/fire flow, sewer capacity, and extension needs should be coordinated alongside the civil concept.",
  },
  climateNotes:
    "Tulsa sits at the humid-to-drier transition in climate zone 3A, with hot summers, sharp cold snaps, high-intensity thunderstorms, hail, tornado risk, and occasional winter ice. The Arkansas River, Bird Creek, Mingo Creek, and other drainage corridors make floodplain and localized flash-flood analysis a core siting task.",
  marketNotes:
    "Tulsa’s construction sectors include aerospace and aviation, energy and energy-transition services, healthcare, higher education, advanced manufacturing, distribution, and downtown mixed-use redevelopment. The Tulsa Port of Catoosa and highway/rail connections support industrial logistics, while established urban sites often need careful utility and drainage coordination.",
  narratives: {
    mep:
      "Tulsa MEP design has to move smoothly between hot, humid cooling conditions and hard winter cold snaps. Under the city’s adopted 2018 IECC, we coordinate cooling, moisture control, ventilation, heating capacity, freeze protection, and lighting controls as one compliance package rather than treating seasonal extremes independently. PSO capacity, voltage, routing, and interconnection are established early for aerospace, manufacturing, and high-load programs; Tulsa Utilities water, sewer, and fire-flow information follows the site concept. Severe-weather resilience—such as generator-backed life-safety systems or critical-process distribution—is aligned with the owner’s continuity needs, not represented as automatic code compliance.",
    structural:
      "Tulsa structural work is first a severe-wind and tornado-market discipline. The 2018 IBC basis requires site-specific wind speed, exposure, roof-zone pressures, cladding attachment, and rooftop-equipment anchorage; an ICC 500/FEMA safe room is a separately programmed, debris-impact-resistant shelter, not the result of ordinary wind design. We also check mapped seismic parameters rather than relying on a historical low-hazard assumption, and use the geotechnical report to resolve expansive clays, variable bearing, and moisture movement. Hail-resistant roof and envelope selections, robust continuous load paths, and coordinated equipment anchorage are practical responses to the local hazard stack.",
    civil:
      "Tulsa civil design starts with drainage-path reconnaissance. Flashy thunderstorms can load the Arkansas River tributaries, Mingo Creek, Bird Creek, and local channels quickly, so FEMA mapping, city floodplain requirements, finished-floor elevations, safe overflow, and outfall capacity are examined before detention layout is committed. We coordinate Tulsa Engineering Services standards, street/access needs, water and sewer availability with Tulsa Utilities, and construction-stormwater coverage with Oklahoma DEQ for disturbances of one acre or more. Clay subgrades and drought-to-downpour cycles inform pavement, utility trench, and building-edge drainage details, especially on industrial sites with large impervious aprons.",
    energy:
      "Tulsa enforces the commercial 2018 IECC, with ASHRAE 90.1-2016 as an alternate path, so energy documentation is tied to that adopted edition rather than a newer model by default. Climate zone 3A favors low-SHGC glazing, air sealing, efficient cooling, moisture-aware ventilation, lighting controls, and enough envelope and heating performance for cold snaps. We test COMcheck versus whole-building modeling for projects with large process, hangar, warehouse, or plug loads, then coordinate the selected electrical strategy with PSO’s site-specific capacity and interconnection process. Above-code measures are evaluated for operating value and resilience, not simply added as claims.",
  },
  faqs: [
    {
      q: "Who issues commercial building permits in Tulsa?",
      a: "City of Tulsa Development Services administers commercial permits, plan review, and inspections through its Permit Center and online services. Building approval may run alongside fire, zoning, engineering, floodplain, access, and utility reviews, depending on the site and scope.",
    },
    {
      q: "Does a Tulsa building code permit provide tornado-shelter protection?",
      a: "No. Ordinary 2018 IBC wind design addresses prescribed building wind loads; it is not a tornado shelter. A project that needs tornado refuge should separately program and design an ICC 500/FEMA safe room for extreme wind and windborne-debris impact, then coordinate it with the AHJ.",
    },
    {
      q: "Which utilities should be contacted early for a Tulsa commercial project?",
      a: "PSO should be involved for electric capacity, service routing, and distributed-generation interconnection. City of Tulsa Utilities should confirm water pressure/fire flow, sewer capacity, and any extension requirements. Those site-specific answers should inform design before equipment and grading layouts are locked.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 81, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityoftulsa.org/government/departments/development-services/"],
      codes: ["https://www.cityoftulsa.org/government/departments/development-services/codes/"],
      amendments: ["https://www.cityoftulsa.org/government/departments/development-services/codes/"],
      utilities: ["https://www.psoklahoma.com/business", "https://www.cityoftulsa.org/government/departments/water-and-sewer/"],
      climate: ["https://www.weather.gov/tsa/"],
      market: ["https://www.tulsachamber.com/"],
    },
  },
};