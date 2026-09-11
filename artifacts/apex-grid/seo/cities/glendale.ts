import type { CityData } from "../types";

export const glendale: CityData = {
  slug: "glendale",
  name: "Glendale",
  stateSlug: "arizona",
  county: "Maricopa County",
  ahj: {
    office:
      "City of Glendale Development Services Department — Building Safety, Codes & Services",
    process:
      "Glendale routes most commercial and other non-listed plan submittals to electronic review by email at permits@glendaleaz.com; project-type portals are provided for solar, pools, signs/banners, and houses. A complete package uses the fillable permit application, a combined discipline-plan PDF, separate calculations/specifications/reports, digitally sealed drawings, and plan-review fee payment; tenant improvements should confirm use with Planning first.",
  },
  codes: {
    building: "2024 IBC (City of Glendale adopted building code)",
    energy: "2024 IECC (City of Glendale adopted commercial energy code)",
    amendments:
      "Glendale requires submitted drawings to show applicable City-adopted codes and amendments, but its public Building Codes page does not publish a consolidated amendment package. Confirm current local amendments and the electrical code edition directly with Building Safety before design; no Glendale NEC edition is claimed here.",
  },
  utilities: {
    electric:
      "Arizona Public Service (APS) generally serves Glendale electric territory; confirm the serving utility and capacity at the project parcel.",
    notes:
      "Glendale Water Services provides municipal water, wastewater collection/treatment, and stormwater programs. Commercial water customers have annual backflow-assembly inspection requirements, and non-residential wastewater dischargers must submit a Wastewater Discharge Questionnaire; verify service availability, capacity, and requirements for the specific parcel.",
  },
  climateNotes:
    "Glendale is in the Phoenix Valley's hot-dry 2B climate, with very high summer cooling demand and monsoon thunderstorms that can bring dust, lightning, and localized strong wind. Check FEMA's current map for parcel-specific flood exposure rather than treating every Glendale site as flood-prone.",
  marketNotes:
    "Glendale's official economic-development and airport materials document Glendale Municipal Airport and the Westgate/Glendale sports and entertainment district. Those anchors support aviation, sports and entertainment, hospitality, retail, industrial/logistics, and commercial tenant-improvement work, while project market demand and utility capacity remain parcel-specific.",
  narratives: {
    mep:
      "Glendale's 2024 IMC/IPC basis and hot-dry 2B climate make high-ambient cooling selection, condenser derating, monsoon-dust filtration, and heat-resilient controls early design decisions. Confirm APS service, available fault current, and transformer lead time before sizing a commercial service; coordinate Glendale Water Services backflow and any industrial wastewater requirements instead of assuming water and sewer capacity.",
    structural:
      "Use Glendale's 2024 IBC and the project geotechnical report to drive foundation and slab choices; Valley sites can contain expansive or collapsible soils, so generic foundation assumptions are not defensible. Design roof equipment anchorage and cladding for governing wind provisions and monsoon gust exposure, and coordinate digitally sealed sheets and special-inspection requirements with Glendale's electronic submittal checklist.",
    civil:
      "Glendale civil plans should resolve grading, ADA routes, utility connections, stormwater, and FEMA floodplain status at the parcel before the building package. Coordinate municipal water/sewer availability, commercial backflow, wastewater discharge obligations, and current Maricopa County dust-control requirements with the responsible agencies rather than assuming a building permit covers them.",
    energy:
      "Glendale's listed commercial basis is the 2024 IECC, so energy documentation must match that edition and any city amendment confirmed by the AHJ. In 2B, prioritize solar-control glazing, cool or reflective roofs, efficient high-ambient cooling, lighting controls, and realistic ventilation assumptions; verify Glendale's current energy compliance policy because the public code page does not publish a complete amendment package.",
  },
  faqs: [
    {
      q: "Which codes apply to commercial work in Glendale?",
      a: "Glendale's current Building Codes page lists the 2024 IBC, IMC, IPC, and IECC. The electrical edition and complete local amendment package are not separately published there, so confirm both with Glendale Building Safety before design.",
    },
    {
      q: "How are commercial plans submitted in Glendale?",
      a: "The city directs non-listed project types to email submission at permits@glendaleaz.com, with a fillable application, combined discipline-plan PDF, and separate calculations, specifications, and reports. Solar, pool, sign/banner, and house projects use the linked project portals; tenant improvements should confirm use with Planning first.",
    },
    {
      q: "Who provides Glendale electric, water, and sewer service?",
      a: "APS generally serves Glendale electric territory, while Glendale Water Services handles municipal water, wastewater, and stormwater programs. Confirm the parcel's actual providers, capacity, and connection requirements; commercial backflow and non-residential wastewater rules may apply.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    priority: {
      commercialOpportunity: 87,
      searchConsoleImpressions: 0,
      searchConsolePeriod: "unavailable",
    },
    sources: {
      ahj: [
        "https://www.glendaleaz.gov/Business/Building-Safety-Codes-Services/Building-Permits",
        "https://www.glendaleaz.gov/Business/Building-Safety-Codes-Services/Submit-Electronic-Plans",
        "https://www.glendaleaz.gov/Business/Building-Safety-Codes-Services/Contact-Information",
        "https://www.glendaleaz.gov/Business/Planning-Zoning",
      ],
      codes: [
        "https://www.glendaleaz.gov/Business/Building-Safety-Codes-Services/Building-Codes",
        "https://codes.iccsafe.org/content/IBC2024V2.0",
        "https://codes.iccsafe.org/content/IMC2024V2.0",
        "https://codes.iccsafe.org/content/IPC2024V2.0",
        "https://codes.iccsafe.org/content/IECC2024",
      ],
      amendments: [
        "https://www.glendaleaz.gov/Business/Building-Safety-Codes-Services/Building-Codes",
        "https://www.glendaleaz.gov/Business/Building-Safety-Codes-Services/Submit-Electronic-Plans",
      ],
      utilities: [
        "https://www.glendaleaz.gov/Community/City-Services/Water-Services",
        "https://www.glendaleaz.gov/Community/ApplyRegister-For/WaterSewerTrash-Services",
        "https://www.aps.com/en/Residential/Service-Plans/Service-Area-Maps",
      ],
      climate: [
        "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/city/time-series",
        "https://www.ashrae.org/technical-resources/bookstore/standards-62-1-62-2",
        "https://gis-fema.hub.arcgis.com/maps/ae38b6f94eaf4abf97f986fa01921e13/about",
        "https://www.maricopa.gov/1830/Air-Quality",
      ],
      market: [
        "https://www.glendaleaz.gov/Business/Economic-Development",
        "https://www.glendaleaz.gov/Business/Airport",
        "https://www.glendaleaz.gov/Business/Airport/About-the-Airport",
        "https://www.glendaleaz.gov/Business/Airport/Doing-business-at-GEU",
      ],
    },
  },
};