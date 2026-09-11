import type { CityData } from "../types";

export const portStLucie: CityData = {
  slug: "port-st-lucie",
  name: "Port St. Lucie",
  stateSlug: "florida",
  county: "St. Lucie County",
  ahj: {
    office: "City of Port St. Lucie Building Department",
    process:
      "The City of Port St. Lucie Building Department administers permits, plan review, and inspections through the City's online permitting services. Commercial projects can require concurrent building, planning and zoning, engineering, fire, utility, and floodplain review; County and special-district approvals remain separate where a site lies outside City jurisdiction or relies on regional infrastructure.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023), including the Florida Building Code—Building",
    energy: "Florida Building Code—Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 as an alternate commercial compliance path",
    amendments:
      "Port St. Lucie enforces the statewide Florida Building Code through its local administrative and development-review process. St. Lucie County is outside the Miami-Dade/Broward High-Velocity Hurricane Zone, but standard Florida wind provisions, Florida Product Approval, applicable windborne-debris protection, and the City's floodplain-management review remain design inputs.",
  },
  utilities: {
    electric: "Florida Power & Light (FPL) provides electric service in Port St. Lucie",
    notes:
      "The City of Port St. Lucie Utilities Department provides water and wastewater service within its service area and operates reclaimed-water systems in portions of the city. FPL coordinates new electric service and distributed-generation interconnection; utility availability, pressure, capacity, extensions, and transformer routing should be checked for the individual parcel.",
  },
  climateNotes:
    "Port St. Lucie is a hot-humid ASHRAE climate zone 2A market with long cooling and dehumidification seasons, tropical-cyclone wind, intense rainfall, and no snow. Although much of the city is inland of the barrier island, the St. Lucie River and North Fork, canals, flat topography, shallow groundwater, and coastal-storm effects create parcel-specific flood and drainage exposure.",
  marketNotes:
    "Port St. Lucie's sustained population growth supports residential, multifamily, retail, healthcare, and civic construction, while Tradition's mixed-use and employment development adds medical, education, logistics, and light-industrial demand. Greenfield projects commonly depend on utility extensions, master drainage, transportation access, and coordination with City development review and the South Florida Water Management District.",
  narratives: {
    mep:
      "Port St. Lucie MEP design puts latent control at the center of a 2A hot-humid climate: outdoor-air treatment, pressure control, condensate management, and vapor-aware enclosure interfaces protect buildings during a long cooling season. The Florida Building Code—Energy Conservation, 8th Edition supplies the commercial framework, while storm resilience informs equipment anchorage, location, and any standby-power strategy. FPL's actual service capacity, voltage, and transformer routing are confirmed early, and City Utilities water, wastewater, and possible reclaimed-water service shape plumbing and irrigation coordination. That early utility screen is particularly important for growing greenfield districts where an adjacent main does not itself establish available capacity.",
    structural:
      "Port St. Lucie is a standard, non-HVHZ Florida wind market, not a low-hazard market. Structural design under the 8th Edition Florida Building Code selects the actual ultimate wind speed, exposure, risk category, roof zones, cladding pressures, and windborne-debris status, then anchors rooftop equipment and exterior systems accordingly with applicable Florida approvals. Flat terrain, high groundwater, and sandy or variable coastal-plain soils mean geotechnical findings influence slab, foundation, and below-grade decisions. FEMA flood data and City floodplain review set finished-floor and equipment-elevation constraints where river, canal, or rainfall flooding applies; seismic and snow loads are comparatively minor.",
    civil:
      "Civil design in Port St. Lucie follows the site's basin, not the broad label of inland Florida. The St. Lucie River/North Fork system, canal networks, flat grades, high groundwater, and intense rainfall affect outfall tailwater, stormwater storage, grading, and floodplain constraints. We coordinate City engineering and utility requirements with South Florida Water Management District permitting where applicable, reserve water, wastewater, and reclaimed-water corridors, and use field and groundwater data before relying on infiltration. Qualifying land disturbance requires FDEP NPDES construction-stormwater coverage and a SWPPP; wetland and floodplain constraints should be screened before site yield is fixed.",
    energy:
      "Port St. Lucie commercial energy compliance follows the Florida Building Code—Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 available as an alternative. In hot-humid zone 2A, low-SHGC fenestration, solar control, cool roofs, air-barrier continuity, lighting controls, and efficient dehumidification-capable cooling reduce both energy use and moisture risk; cold-climate insulation priorities do not translate directly. We document envelope, HVAC, lighting, and service-water-heating measures as one Building Department package and assess FPL service conditions before committing to electrification, generation, or high-load mechanical concepts. Equipment elevation and anchorage remain coordinated with the parcel's flood and wind exposure.",
  },
  faqs: [
    {
      q: "Is Port St. Lucie in Florida's High-Velocity Hurricane Zone?",
      a: "No. Port St. Lucie is in St. Lucie County, outside the HVHZ, which is limited to Miami-Dade and Broward counties. The Florida Building Code's standard wind provisions, applicable windborne-debris protection, and Florida Product Approval requirements still apply based on the specific site's wind exposure.",
    },
    {
      q: "Who provides electric, water, and wastewater service in Port St. Lucie?",
      a: "FPL provides electric service. The City of Port St. Lucie Utilities Department provides water and wastewater service within its service area and has reclaimed-water systems in portions of the city. Confirm availability, capacity, pressure, extensions, and the serving territory for the individual parcel.",
    },
    {
      q: "What flood and drainage issues should a Port St. Lucie project assess?",
      a: "Assess the parcel's FEMA mapping, City floodplain requirements, basin and canal or river outfall, tailwater, high groundwater, and stormwater-storage needs. River and canal conditions around the St. Lucie River/North Fork differ from interior rainfall flooding, so grading and finished-floor elevations cannot be set from a citywide assumption.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 74, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofpsl.com/government/departments/building-department"],
      codes: ["https://www.cityofpsl.com/government/departments/building-department/codes"],
      amendments: ["https://www.cityofpsl.com/government/departments/building-department/codes"],
      utilities: ["https://www.cityofpsl.com/government/departments/utilities"],
      climate: ["https://www.weather.gov/mlb/"],
      market: ["https://www.cityofpsl.com/government/departments/economic-development"],
    },
  },
};