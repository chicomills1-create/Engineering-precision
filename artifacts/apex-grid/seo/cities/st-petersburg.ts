import type { CityData } from "../types";

export const stPetersburg: CityData = {
  slug: "st-petersburg",
  name: "St. Petersburg",
  stateSlug: "florida",
  county: "Pinellas County",
  ahj: {
    office: "City of St. Petersburg Building Official / Building Permitting",
    process:
      "The City of St. Petersburg receives permit applications and plan documents through its online permitting services and routes commercial work through building, zoning, engineering, fire, and utility review as applicable. Work in the public right-of-way, on waterfront parcels, or in flood-prone areas can require parallel City engineering and floodplain review; the City limits are not the same as unincorporated Pinellas County or neighboring beach municipalities.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023), including the Florida Building Code—Building",
    energy: "Florida Building Code—Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 as an alternate commercial compliance path",
    amendments:
      "St. Petersburg enforces the statewide Florida Building Code through its local permitting and administrative process. Pinellas County is outside the Miami-Dade/Broward High-Velocity Hurricane Zone, but Florida wind design, windborne-debris protection where applicable, and Florida Product Approval remain material; the City's floodplain-management requirements add parcel-specific elevation and flood-damage-prevention review.",
  },
  utilities: {
    electric: "Duke Energy Florida provides electric distribution service in St. Petersburg",
    notes:
      "The City of St. Petersburg provides water, wastewater, and reclaimed-water service within its service areas. Duke Energy Florida handles new electric service and distributed-generation interconnection; available capacity, transformer location, and routing should be established with the serving utility, while City utility availability and reclaimed-water conditions inform site planning.",
  },
  climateNotes:
    "St. Petersburg is a hot-humid ASHRAE climate zone 2A city on the Pinellas Peninsula. Long latent-cooling seasons, salt-air corrosion, intense rainfall, tropical-cyclone wind, and coastal storm-surge exposure combine with low, flat terrain and a high water table; flood risk differs sharply between a Tampa Bay, Boca Ciega Bay, or inland parcel.",
  marketNotes:
    "The city has an active mix of downtown and waterfront mixed-use redevelopment, multifamily and hospitality work, healthcare, and marine-oriented commerce. St. Petersburg's Innovation District—anchored by health, research, education, and marine-science institutions—supports institutional and lab-adjacent demand, while waterfront resiliency, constrained urban utility corridors, and floodplain review shape project feasibility.",
  narratives: {
    mep:
      "St. Petersburg MEP design begins with the hot-humid 2A moisture load: dedicated outside-air treatment, pressure control, condensate drainage, and vapor-aware envelope interfaces protect interiors through a long cooling season. Salt-laden coastal air favors durable equipment and enclosure locations, while hurricane exposure calls for code-compliant anchorage and a considered standby-power strategy. The Florida Building Code—Energy Conservation, 8th Edition establishes the commercial baseline, but electrical design must also fit Duke Energy Florida's actual service configuration and the City's water, wastewater, or reclaimed-water availability. We coordinate those utility facts with the Building Official's electronic review package rather than treating a peninsula site as an interchangeable inland Florida project.",
    structural:
      "St. Petersburg is outside the HVHZ but remains a wind- and flood-driven structural market. The Florida Building Code's standard wind provisions govern the actual site wind speed, exposure, risk category, roof zones, cladding pressures, and rooftop-equipment anchorage; applicable openings and exterior components require the corresponding Florida approvals. On low coastal ground, finished-floor elevation and continuous load path must be coordinated with FEMA mapping and City floodplain review, not added after foundations are selected. High groundwater, variable coastal fill, and potentially soft nearshore deposits make the geotechnical investigation important to foundation, below-grade, and corrosion decisions, while seismic and snow demand are minor.",
    civil:
      "Civil design in St. Petersburg must distinguish tidal from rainfall flooding. A Tampa Bay or Boca Ciega Bay outfall can experience surge and tidal tailwater, while inland basins can be governed by short-duration heavy rainfall and limited relief on flat ground. We coordinate City drainage, utility, right-of-way, and floodplain requirements with finished-floor elevations, grading, stormwater treatment and storage, and City water/wastewater or reclaimed-water service. Coastal work also needs a clear jurisdictional screen for shoreline, seawall, and state or federal environmental permits. Florida's NPDES construction general permit and SWPPP requirements apply to qualifying land disturbance.",
    energy:
      "Commercial energy compliance in St. Petersburg follows the Florida Building Code—Energy Conservation, 8th Edition (2023), or the allowed ASHRAE 90.1 path. In hot-humid zone 2A, low-solar-gain glazing, exterior shading, air-barrier continuity, efficient cooling, lighting controls, and latent-load capability do more than a cold-climate insulation recipe; they also reduce humid infiltration and condensation risk. We reconcile envelope, HVAC, lighting, and service-water-heating documentation into one permit narrative for the City, then test practical electrical choices against Duke Energy Florida service and demand conditions. Resilience equipment is located and anchored with the site's mapped flood and wind exposure in view.",
  },
  faqs: [
    {
      q: "Does St. Petersburg use Miami-Dade High-Velocity Hurricane Zone rules?",
      a: "No. St. Petersburg is in Pinellas County, outside the HVHZ, which is limited to Miami-Dade and Broward counties. It still uses the Florida Building Code's wind provisions, applicable windborne-debris protection, and Florida Product Approval requirements; wind speed, exposure, and flood conditions must be selected for the individual site.",
    },
    {
      q: "Who provides utilities to a St. Petersburg commercial project?",
      a: "Duke Energy Florida provides electric distribution service. The City of St. Petersburg provides water, wastewater, and reclaimed water within its service areas. Confirm service territory, capacity, extension needs, and reclaimed-water availability for the parcel before finalizing electrical and civil layouts.",
    },
    {
      q: "Why is flood analysis site-specific in St. Petersburg?",
      a: "The city has both Tampa Bay and Boca Ciega Bay waterfront exposure plus inland rainfall flooding. Tidal tailwater and storm surge affect coastal outfalls and building elevations differently from an inland drainage basin, so FEMA mapping, City floodplain review, grades, and outfall conditions must be evaluated parcel by parcel.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.stpete.org/business/building_permitting/building_permits.php"],
      codes: ["https://www.stpete.org/business/building_permitting/building_permits.php"],
      amendments: ["https://www.stpete.org/business/building_permitting/building_permits.php"],
      utilities: ["https://www.stpete.org/connect_with_us/directories/water_resources.php"],
      climate: ["https://www.weather.gov/tbw/"],
      market: ["https://www.stpete.org/business/economic_development/index.php"],
    },
  },
};