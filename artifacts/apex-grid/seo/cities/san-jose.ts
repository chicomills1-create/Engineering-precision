import type { CityData } from "../types";

export const sanJose: CityData = {
  slug: "san-jose",
  name: "San Jose",
  stateSlug: "california",
  county: "Santa Clara County",
  ahj: {
    office: "City of San José Planning, Building and Code Enforcement Department, Building Division",
    process:
      "San José's Building Division uses its online permit and plan-review services for applications, plan upload, fees, and status, with coordination among planning, public works, fire, and environmental services where required. Complex development can require planning entitlement and public-improvement approvals before or alongside building permits; a building permit is not a substitute for those separate approvals.",
  },
  codes: {
    building: "2022 California Building Standards Code (Title 24), including the 2022 California Building Code, with San José amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), supplemented by the San José Building Reach Code",
    amendments:
      "San José adopts local amendments to the California codes and its Building Reach Code, which advances electrification and electric-ready requirements beyond the statewide minimum for covered new construction and alterations. The precise reach-code trigger and exceptions must be checked against the current municipal code for the project's occupancy and scope.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E)",
    notes:
      "PG&E new-service and distributed-generation processes govern electrical capacity, transformer siting, and interconnection; Silicon Valley's high-density and high-load programs merit early utility screening. Water service is provided by the City of San José in much of the city and by other regulated providers in some areas, while the City operates the San José–Santa Clara Regional Wastewater Facility.",
  },
  climateNotes:
    "San José is largely a warm-dry California climate with long cooling seasons and limited rainfall, while heat waves and wildfire smoke increasingly influence HVAC and indoor-air-quality design. Strong Bay Area seismic hazard, fault rupture considerations near active faults, liquefaction in valley deposits, and localized creek flooding require parcel-specific geotechnical and hazard review.",
  marketNotes:
    "San José remains a center for technology campuses, R&D, semiconductor-related work, data-intensive facilities, and high-density multifamily and transit-oriented development. Office-market changes have increased reuse and tenant-improvement activity, while clean-tech, advanced manufacturing, and life-science programs continue to demand large electrical capacity and resilient MEP infrastructure.",
  narratives: {
    mep:
      "San José MEP work couples Title 24 with the City's electrification-oriented Reach Code and a climate where cooling, solar control, and summer electrical demand matter. PG&E capacity and service configuration are early design constraints for labs, advanced manufacturing, data-intensive tenants, and all-electric central plants. Wildfire-smoke events support robust filtration and controllable outside-air sequences, while seismic bracing and shutdown requirements must be integrated into equipment layouts. We coordinate the energy model, reach-code applicability, generator or battery strategy, and utility application with the Building Division submission rather than making electrification a late specification change.",
    structural:
      "Structural engineering in San José is decisively seismic. The Santa Clara Valley is influenced by nearby active faults, and many sites need careful evaluation of site class, liquefaction, lateral spreading, fault-related hazards, fill, and groundwater before selecting foundations and lateral systems. The 2022 California Building Code and local amendments govern the permit basis, with special inspections and nonstructural seismic coordination important for high-value technology and laboratory equipment. Dense infill projects also require early consideration of shoring, adjacent structures, and construction vibration rather than treating the building frame as an isolated scope.",
    civil:
      "San José civil plans coordinate local grading, stormwater, sanitary, water, and public-improvement requirements with the City's development review process. Dry summers do not eliminate drainage risk: the wet season, creek corridors, and localized flood hazards drive finished-floor elevations, treatment, conveyance, and erosion-control planning. Water service territory should be verified parcel by parcel, and sanitary capacity may involve coordination with the regional wastewater system. We protect site area for stormwater treatment, utilities, fire access, accessible routes, and frontage improvements before architectural and entitlement layouts harden.",
    energy:
      "Energy compliance in San José begins with the 2022 California Energy Code and then tests the current San José Building Reach Code for the project's scope. Efficient all-electric HVAC, heat-pump water heating where applicable, envelope and glazing performance, lighting controls, and solar/load-management decisions must be modeled as a coordinated system. In a warm, dry climate, reducing solar gains and managing cooling peaks can be as consequential as nominal equipment efficiency. PG&E service and interconnection coordination belongs beside the Title 24 documentation, particularly where electrification shifts a project onto a larger service.",
  },
  faqs: [
    {
      q: "Which building and energy codes apply in San José?",
      a: "San José enforces the 2022 California Building Standards Code with local amendments. Commercial energy work follows the 2022 California Energy Code, Title 24 Part 6, and covered work must also be evaluated under the City's Building Reach Code.",
    },
    {
      q: "Who provides electric, water, and wastewater service in San José?",
      a: "PG&E provides electric distribution service. The City provides water in much, but not all, of San José, so the provider must be verified by parcel; the City also operates the San José–Santa Clara Regional Wastewater Facility.",
    },
    {
      q: "What are the main structural site risks in San José?",
      a: "Bay Area seismic design is central, with active-fault, liquefaction, lateral-spreading, groundwater, and fill conditions varying significantly by location. A site-specific geotechnical report should inform the CBC seismic analysis, foundation design, and any excavation or shoring strategy.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 93, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement"],
      codes: ["https://www.hcd.ca.gov/building-standards"],
      amendments: ["https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-code"],
      utilities: ["https://www.sanjoseca.gov/your-government/departments-offices/energy", "https://www.pge.com/en/business.html"],
      climate: ["https://www.weather.gov/mtr/"],
      market: ["https://www.sanjoseca.gov/business-development"],
    },
  },
};