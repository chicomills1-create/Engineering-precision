import type { CityData } from "../types";

export const santaAna: CityData = {
  slug: "santa-ana",
  name: "Santa Ana",
  stateSlug: "california",
  county: "Orange County",
  ahj: {
    office: "City of Santa Ana Planning and Building Agency, Building Safety Division",
    process:
      "Santa Ana Building Safety administers building permits, electronic plan review, and inspections through the City's online permitting services. Commercial and redevelopment work can be routed with Planning, Public Works, Fire, and utility reviewers, and historic resources, downtown sites, or development projects may require land-use and site approvals before permit issuance.",
  },
  codes: {
    building: "2022 Santa Ana Building Code, based on the 2022 California Building Code (2021 IBC) with City of Santa Ana amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), with 2022 CALGreen mandatory measures",
    amendments:
      "Santa Ana Municipal Code Chapter 8 adopts the California code family with local amendments. Local administrative provisions, grading and stormwater review, fire requirements, and zoning or historic-resource conditions are checked alongside the California Building Code; confirm the current ordinance for the project's exact scope.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) provides electric service; the City of Santa Ana Public Works Agency provides water and sewer services",
    notes:
      "SCE is responsible for electric service design and distributed-energy interconnection. Santa Ana's municipal water and sewer systems require separate capacity and connection coordination, particularly for multifamily, healthcare, restaurant, and adaptive-reuse projects with significant domestic or process demands.",
  },
  climateNotes:
    "Santa Ana's warm, dry Orange County climate (generally ASHRAE 3B/California climate zone 8) has long cooling periods, Santa Ana wind events, drought, and periodic wildfire-smoke exposure. It is a high-seismic jurisdiction; local alluvial soils, groundwater, and Santa Ana River flood conditions should be evaluated by parcel.",
  marketNotes:
    "Santa Ana combines dense downtown and transit-oriented infill with county-government and civic facilities, healthcare, education, retail, multifamily, and conversion of older commercial and industrial buildings. The city’s built-out parcels make utility conflicts, constrained staging, parking/access, stormwater, and existing-building seismic and MEP upgrades common project issues.",
  narratives: {
    mep:
      "Santa Ana MEP design applies 2022 Title 24 to a warm inland Orange County climate while recognizing that dense infill and older buildings often constrain equipment yards, shafts, electrical rooms, and utility entries. Cooling, solar control, demand, and smoke-event filtration need to reflect actual multifamily, healthcare, restaurant, or civic schedules rather than a generic office profile. SCE manages electric capacity and interconnection, while the City provides water and sewer; electric-service upgrades and domestic/fire/wastewater demands should be aligned before a constrained site plan is fixed.",
    structural:
      "Santa Ana structural projects follow the 2022 CBC seismic provisions in a high-seismic basin setting. A parcel-specific geotechnical report establishes site class and addresses alluvial soils, groundwater, settlement, liquefaction where applicable, and foundation parameters before retrofit or new-building systems are selected. Downtown and adaptive-reuse work particularly benefits from early verification of existing diaphragms, masonry or concrete framing, load paths, and capacity for rooftop mechanical equipment, followed by a coordinated special-inspection program for Building Safety review.",
    civil:
      "Santa Ana civil engineering fits City stormwater, grading, access, and utility requirements into built-out urban sites where surface storage and public-right-of-way space are limited. We screen Santa Ana River flood conditions and local drainage and groundwater constraints before establishing finished floors or below-grade areas, then coordinate water and sewer connections with the City's Public Works Agency. Biotreatment, fire access, loading, ADA grades, and construction-phase drainage need to work together; off-site improvements and utility conflicts should be identified with City reviewers early.",
    energy:
      "Santa Ana energy compliance is based on the 2022 California Energy Code and CALGreen, with local amendments checked for the permit scope. The warm 3B climate makes envelope solar control, efficient cooling, lighting and HVAC controls, and realistic peak-load modeling important, while older-building retrofits need careful treatment of existing envelope and ventilation constraints. We coordinate solar, storage, EV charging, and all-electric capacity with SCE at the same time that Title 24 documents are developed, avoiding a late conflict between compliance assumptions and available service.",
  },
  faqs: [
    {
      q: "Who issues commercial building permits in Santa Ana?",
      a: "The City of Santa Ana Planning and Building Agency's Building Safety Division administers building permits, plan review, and inspections. Planning, Public Works, Fire, and utility review may be part of the approval path for commercial development and redevelopment.",
    },
    {
      q: "What commercial codes does Santa Ana enforce?",
      a: "Santa Ana enforces its locally amended 2022 code package based on the 2022 California Building Code, plus the 2022 California Energy Code and CALGreen. Grading, stormwater, fire, zoning, and historic-resource requirements can be additional project-specific layers.",
    },
    {
      q: "What utilities should be coordinated for a Santa Ana project?",
      a: "Southern California Edison provides electric service and manages service upgrades and interconnection. The City of Santa Ana Public Works Agency provides water and sewer services; both electric capacity and water/sewer connection conditions should be confirmed early on dense or high-demand projects.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 76, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.santa-ana.org/departments/planning-and-building-agency/"],
      codes: ["https://www.hcd.ca.gov/building-standards"],
      amendments: ["https://www.santa-ana.org/municipal-code/"],
      utilities: ["https://www.sce.com/business", "https://www.cityofsantaana.org/water"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.santa-ana.org/economic-development"],
    },
  },
};