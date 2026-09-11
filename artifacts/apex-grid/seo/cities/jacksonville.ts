import type { CityData } from "../types";

export const jacksonville: CityData = {
  slug: "jacksonville",
  name: "Jacksonville",
  stateSlug: "florida",
  county: "Duval County",
  ahj: {
    office: "City of Jacksonville Building Inspection Division, Neighborhoods Department",
    process:
      "The Building Inspection Division accepts commercial permit and plan-review work through its online permitting system and coordinates building, fire, zoning, site, and concurrency reviews. A consolidated city-county government covers most of Duval County, but Atlantic Beach, Jacksonville Beach, and Neptune Beach remain separate municipal jurisdictions; parcel location and flood-zone information should be established before a submittal.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023), including the Florida Building Code—Building",
    energy: "Florida Building Code—Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 as an alternative compliance path for commercial buildings",
    amendments:
      "Jacksonville enforces the statewide Florida Building Code and its local administrative process. The city is outside the Miami-Dade/Broward High-Velocity Hurricane Zone, but Florida product approval, wind design, and windborne-debris requirements still apply; floodplain development also requires local review under Jacksonville's floodplain-management regulations.",
  },
  utilities: {
    electric: "JEA, Jacksonville's community-owned utility, provides electric service in most of the city",
    notes:
      "JEA also provides water and wastewater service in much of its service territory and administers electric service requests and distributed-generation interconnection. Large-load capacity, service routing, and transformer requirements need utility coordination; a site near a service boundary may have a different water or electric provider.",
  },
  climateNotes:
    "Jacksonville is a hot-humid ASHRAE climate zone 2A market with long cooling and dehumidification seasons, intense rainfall, tropical-cyclone wind exposure, and no snow load. Its Atlantic coast and the St. Johns River create distinct storm-surge, tidal, riverine, and rainfall-flood exposures that must be mapped parcel by parcel.",
  marketNotes:
    "Jacksonville's active development base includes port and logistics facilities tied to JAXPORT and the I-95/I-10/I-295 network, healthcare and institutional work, multifamily, and industrial development. Downtown and riverfront redevelopment add urban infill work, while the port, wetlands, floodplain, and utility capacity reviews make early civil and agency coordination consequential.",
  narratives: {
    mep:
      "Jacksonville MEP design starts with humidity control in climate zone 2A: outside-air treatment, building pressurization, condensate management, and vapor-aware envelope interfaces are as important as peak sensible cooling. The 8th Edition Florida Building Code—Energy Conservation and its commercial alternative path set the compliance framework, while hurricane exposure argues for protected equipment locations, robust rooftop anchorage, and a deliberate emergency-power strategy where the program requires it. JEA serves most city projects with both electric and water/wastewater service; we identify the actual service territory, available capacity, and routing constraints during early utility coordination rather than assuming a generic Florida utility arrangement.",
    structural:
      "Jacksonville is a non-HVHZ Florida market, but it is emphatically wind-driven rather than seismic-driven. Structural systems, roof zones, cladding pressures, openings, and rooftop equipment anchorage are designed under the 8th Edition Florida Building Code wind provisions and matched to the site's ultimate design wind speed, exposure, risk category, and windborne-debris status; Florida Product Approval is part of the component conversation. Flat coastal and river-adjacent sites can also have shallow groundwater, soft or variable deposits, and flood elevation constraints. The geotechnical investigation and FEMA/local flood data therefore inform foundation selection, finished-floor elevation, and lateral detailing together.",
    civil:
      "Civil design in Jacksonville is watershed-specific. A parcel can drain toward the tidal St. Johns River, an Atlantic coastal basin, or a local creek and wetland system, so FEMA flood mapping, city floodplain review, stormwater attenuation/treatment, and outfall tailwater conditions cannot be treated as interchangeable. Heavy subtropical rainfall and tidal backwater affect grades and conveyance, while coastal sites can introduce storm surge and erosion constraints. We coordinate site drainage, access, utilities, wetland/floodplain limits, and JEA water/sewer availability with the City of Jacksonville; Florida's NPDES construction general permit and SWPPP requirements apply to qualifying land disturbance.",
    energy:
      "The applicable commercial energy code is the Florida Building Code—Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 available as an alternate path. In Jacksonville's hot-humid 2A climate, the high-value package is low solar-gain glazing, continuous air and moisture control, efficient cooling with latent-load capability, and lighting controls—not a cold-climate insulation recipe. We document envelope, lighting, HVAC, and service-water-heating measures as one compliance story for Building Inspection review, while considering JEA rate structure and the real electrical-service configuration early enough to avoid a late equipment or service redesign.",
  },
  faqs: [
    {
      q: "Does Jacksonville use Miami-Dade high-velocity hurricane-zone rules?",
      a: "No. Jacksonville is not in the High-Velocity Hurricane Zone, which is limited to Miami-Dade and Broward counties. It still uses the Florida Building Code's wind provisions, applicable windborne-debris protection, and Florida Product Approval requirements; the design wind speed and exposure must be selected for the actual Duval County site.",
    },
    {
      q: "Who provides electric, water, and sewer service in Jacksonville?",
      a: "JEA provides electric service and, in much of its territory, water and wastewater service. Because service boundaries and existing capacity vary, the project team should obtain a utility availability/service review for the specific parcel and coordinate large electric loads, transformers, and extensions directly with JEA.",
    },
    {
      q: "How do the St. Johns River and coast affect a Jacksonville site?",
      a: "They create different flood mechanisms: tidal and riverine flooding along the St. Johns, storm surge and coastal hazards nearer the Atlantic, and intense rainfall throughout the city. FEMA mapping, local floodplain requirements, outfall tailwater, and finished-floor elevations must be evaluated for the parcel rather than relying on a citywide assumption.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 86, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.jacksonville.gov/Departments/Planning-and-Development/Building-and-Inspection"],
      codes: ["https://www.jacksonville.gov/Departments/Planning-and-Development/Building-and-Inspection/Building-Codes"],
      amendments: ["https://www.jacksonville.gov/Departments/Planning-and-Development/Building-and-Inspection/Building-Codes"],
      utilities: ["https://www.jea.com/Business_Accounts/"],
      climate: ["https://www.weather.gov/jax/"],
      market: ["https://www.jaxusa.org/"],
    },
  },
};