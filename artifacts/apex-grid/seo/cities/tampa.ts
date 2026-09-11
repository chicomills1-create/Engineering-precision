import type { CityData } from "../types";

export const tampa: CityData = {
  slug: "tampa",
  name: "Tampa",
  stateSlug: "florida",
  county: "Hillsborough County",
  ahj: {
    office: "City of Tampa Construction Services Division",
    process:
      "Commercial permits are submitted through the City of Tampa's online permitting system for coordinated building, trade, site, and zoning review. Projects in the city also coordinate Hillsborough County and regional stormwater, floodplain, transportation, and utility requirements where those authorities apply; private-provider plan review is available where authorized by Florida law.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023), based on the 2021 IBC; standard (non-HVHZ) wind provisions apply",
    energy: "Florida Building Code — Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 as an alternate commercial path",
    amendments:
      "Tampa is outside the Miami-Dade/Broward High-Velocity Hurricane Zone, so standard Florida wind provisions and Florida Product Approval apply. City and county floodplain, stormwater, tree, transportation, and site-development requirements add local design constraints, particularly around Tampa Bay and the Hillsborough River.",
  },
  utilities: {
    electric: "Tampa Electric (TECO), a P.U.C.-regulated investor-owned utility, serves the City of Tampa",
    notes:
      "TECO commercial service, demand charges, transformer availability, and distributed-generation interconnection should be confirmed during early electrical design. Tampa Water Department provides municipal water, wastewater, and reclaimed-water services in its service area; capacity and fire-flow availability are parcel-specific.",
  },
  climateNotes:
    "Tampa is in ASHRAE climate zone 2A (hot-humid), with long latent-cooling seasons, intense solar gain, heavy rainfall, hurricane wind, and coastal/tidal flood exposure. High groundwater and flat terrain make finished-floor elevations, corrosion resistance, and moisture control central design inputs.",
  marketNotes:
    "Tampa's commercial pipeline spans downtown and Westshore office, multifamily and mixed-use redevelopment, healthcare and higher education, port and industrial logistics, and the I-4 corridor. Tampa Bay's growth increases demand for resilient infill and industrial facilities, while floodplain, stormwater, and utility-capacity review can govern site feasibility.",
  narratives: {
    mep:
      "Tampa MEP design starts with hot-humid climate zone 2A: latent load, infiltration, and condensate management are as important as sensible cooling. We coordinate tight envelopes, dehumidification, corrosion-resistant equipment near Tampa Bay, and protected electrical equipment for hurricane and flood conditions. Tampa Electric service territory means TECO commercial demand charges, transformer lead times, and interconnection requirements belong in early load studies; Tampa Water Department water, wastewater, and reclaimed-water capacity also affects plumbing and site planning. Documentation targets the 2023 Florida Building Code through Tampa's online permit process.",
    structural:
      "Tampa structural design is governed by hurricane wind, flood, and wet ground rather than seismic or snow. As a non-HVHZ city, Tampa uses standard Florida Building Code wind provisions and Florida Product Approval, but exposure, windborne-debris protection, roof uplift, and continuous load paths remain critical. FEMA flood elevations and local freeboard set the structural datum for many waterfront and low-lying parcels, while high groundwater and variable coastal soils make the geotechnical report decisive for shallow versus deep foundations. Tampa's seismic demand is negligible, but corrosion detailing and durable connections matter in the marine environment.",
    civil:
      "Tampa civil work must resolve drainage on flat terrain with intense rainfall, high groundwater, and tidal tailwater. City and Hillsborough County stormwater criteria, FEMA floodplain mapping, and Southwest Florida Water Management District (SWFWMD) permitting can all affect detention, conveyance, outfalls, and finished grades. We coordinate reclaimed-water availability with Tampa Water Department, protect water quality during construction under Florida's NPDES program, and account for coastal surge and riverine flooding rather than treating a site as simply inland. Early flood and stormwater modeling prevents drainage infrastructure from consuming an otherwise constrained infill layout.",
    energy:
      "Tampa commercial projects comply with the Florida Building Code — Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 available as an alternate path. In hot-humid 2A conditions, low-SHGC glazing, solar control, air sealing, efficient cooling, and dedicated humidity management generally outperform heating-oriented measures. TECO demand charges make peak-load reduction and right-sized services financially relevant, while lighting controls, efficient fans, and heat-recovery strategies support both code compliance and operating cost. We reconcile envelope, mechanical, and lighting documentation for Tampa's electronic review and verify that flood and moisture details do not undermine the efficient envelope.",
  },
  faqs: [
    {
      q: "Is Tampa in Florida's High-Velocity Hurricane Zone?",
      a: "No. Tampa is in Hillsborough County, outside the HVHZ counties of Miami-Dade and Broward. Standard Florida Building Code wind provisions still require site-specific wind speed, exposure, windborne-debris protection where applicable, and Florida Product Approval for covered components.",
    },
    {
      q: "Which utilities serve a Tampa commercial project?",
      a: "Tampa Electric (TECO) serves the City of Tampa's electric territory, while the Tampa Water Department provides municipal water, wastewater, and reclaimed-water service in its service area. Confirm parcel-specific capacity, fire flow, transformer needs, demand charges, and interconnection requirements before finalizing the design.",
    },
    {
      q: "What stormwater authorities affect Tampa development?",
      a: "City of Tampa and Hillsborough County requirements combine with FEMA floodplain criteria and, where applicable, Southwest Florida Water Management District permitting. Tidal tailwater, Tampa Bay and Hillsborough River flooding, high groundwater, and intense rainfall make outfall and finished-floor analysis site-specific.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 91, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.tampa.gov/construction-services"],
      codes: ["https://www.tampa.gov/construction-services"],
      amendments: ["https://www.tampa.gov/development-coordination"],
      utilities: ["https://www.tampaelectric.com/business/"],
      climate: ["https://www.weather.gov/tbw/"],
      market: ["https://www.tampabayedc.com/"],
    },
  },
};