import type { CityData } from "../types";

export const sparks: CityData = {
  slug: "sparks",
  name: "Sparks",
  stateSlug: "nevada",
  county: "Washoe County",
  ahj: {
    office: "City of Sparks Community Services Agency, Building Division",
    process:
      "Sparks administers building permits, plan review, and inspections within its city limits through its own Building Division and online permitting services. It is distinct from the City of Reno and unincorporated Washoe County; development applications can also require City engineering, fire, utility, and Truckee Meadows regional-agency coordination.",
  },
  codes: {
    building: "2018 International Building Code, as adopted by the City of Sparks with local amendments",
    energy: "2018 International Energy Conservation Code, as adopted by the City of Sparks",
    amendments:
      "Sparks publishes locally adopted codes and administrative amendments; it does not use the Southern Nevada Building Officials amendment package. Building review is paired with local fire, grading, and utility requirements, particularly on industrial and expanding-edge sites.",
  },
  utilities: {
    electric: "NV Energy serves Sparks",
    notes:
      "Truckee Meadows Water Authority is the principal regional water provider, and the Truckee Meadows Water Reclamation Facility serves Reno, Sparks, and Washoe County wastewater customers. Large industrial users should establish NV Energy capacity and local water, sewer, and fire-service requirements before finalizing a site plan.",
  },
  climateNotes:
    "Sparks is a high-desert 5B climate with hot, dry summers, cold winters, freeze exposure, and snow that varies materially with elevation and storm pattern. The Truckee River corridor, foothill drainage, and alluvial soils mean that flood and geotechnical investigations remain important alongside snow and seismic design.",
  marketNotes:
    "Sparks is a core part of the Reno-Sparks logistics and advanced-manufacturing market, supported by Interstate 80, rail access, and proximity to the Tahoe-Reno Industrial Center and Storey County’s battery-manufacturing corridor. Local activity also includes industrial redevelopment, distribution, housing, retail, and the Legends/Scheels-area commercial district.",
  narratives: {
    mep:
      "Sparks MEP systems balance cold winter heating and freeze protection with hot, dry summer cooling in climate zone 5B. Industrial and distribution clients benefit from evaluating destratification, dock infiltration, economizer hours, heat recovery, and robust unit-heater or piping freeze strategies rather than copying a southern Nevada sequence. We coordinate NV Energy electrical service, TMWA water service, and the City of Sparks Building Division’s permit requirements early for high-load industrial and commercial sites.",
    structural:
      "Sparks sits in western Nevada’s active seismic region, where site class, liquefaction screening near river or basin deposits, and ductile lateral detailing can control structural schemes. Snow loads are not interchangeable across the Truckee Meadows: elevation, exposure, and roof geometry must be checked for the project site, including drifting at warehouse parapets and roof steps. Geotechnical guidance on alluvial soils, settlement, and ground-water conditions is integrated with the City’s special-inspection requirements.",
    civil:
      "Civil planning in Sparks must account for Truckee River and tributary drainage, short-duration runoff, and local floodplain constraints as well as cold-weather pavement and utility construction. On employment and industrial land, truck geometry, rail or freeway access, utility extension, fire flow, and detention often compete for area. We coordinate City grading and drainage review with TMWA and regional wastewater infrastructure, checking FEMA and local flood information before setting pads and access elevations.",
    energy:
      "Sparks energy documents use the City’s adopted 2018 IECC and should express a 5B high-desert building rather than a generic Nevada model. Air sealing, continuous insulation, thermal-break details, glazing U-factor and solar control, efficient heating, and controls for wide temperature swings all affect compliance and operating cost. We keep COMcheck, envelope schedules, lighting controls, and mechanical selections synchronized for City review, and assess NV Energy programs where the equipment scope is eligible.",
  },
  faqs: [
    {
      q: "Does Sparks use Reno or Washoe County building permits?",
      a: "The City of Sparks Building Division is the AHJ for projects inside Sparks. Reno and unincorporated Washoe County have separate building departments, so the governing boundary should be verified before preparing permit documents.",
    },
    {
      q: "Are seismic and snow both design issues in Sparks?",
      a: "Yes. Western Nevada has significant seismic hazard, and Sparks’ cold, elevated high-desert setting also requires site-specific snow-load evaluation. The geotechnical report, site class, roof geometry, and elevation are needed before selecting the lateral and gravity design criteria.",
    },
    {
      q: "Which water and wastewater agencies affect a Sparks project?",
      a: "Truckee Meadows Water Authority is the region’s principal water provider, and the Truckee Meadows Water Reclamation Facility serves the Reno-Sparks-Washoe County regional wastewater system. City permit and utility coordination should confirm available service, fire flow, sewer connection, and any extension requirements for the specific parcel.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 81, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofsparks.us/government/departments/community-services/building"],
      codes: ["https://www.cityofsparks.us/government/departments/community-services/building"],
      amendments: ["https://www.cityofsparks.us/government/departments/community-services/building"],
      utilities: ["https://www.nvenergy.com/account-services/business"],
      climate: ["https://www.weather.gov/rev/"],
      market: ["https://www.renoindustrial.com/"],
    },
  },
};