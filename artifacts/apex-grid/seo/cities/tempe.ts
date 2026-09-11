import type { CityData } from "../types";

export const tempe: CityData = {
  slug: "tempe",
  name: "Tempe",
  stateSlug: "arizona",
  county: "Maricopa County",
  ahj: {
    office:
      "City of Tempe Community Development Department, Development Services / Building Safety",
    process:
      "Commercial applicants submit construction documents through the City's permitting and plan-review process, then proceed through code review, permit issuance, inspections, and closeout. The applicable code path and any project-specific submittal requirements should be confirmed with Building Safety before filing; an online portal name, review SLA, and self-certification eligibility were not verified.",
  },
  codes: {
    building:
      "2024 ICC I-Codes (including IBC, IMC, and IPC) and 2023 NEC, adopted effective July 1, 2026; Tempe's transition notice allows 2018 or 2024 code submittals through December 31, 2026",
    energy:
      "2024 IECC adopted effective July 1, 2026, with 2018 or 2024 energy-code submittals allowed during Tempe's transition through December 31, 2026",
    amendments:
      "Tempe's local amendment package applies to the adopted codes, and the City's green-building guidance confirms Solar Ready provisions in the IECC. The same guidance describes EV-ready provisions as being pursued rather than confirming them as a universal adopted requirement; verify the ordinance and project-specific amendments with Building Safety.",
  },
  utilities: {
    electric: "Salt River Project (SRP), subject to parcel-level service confirmation",
    notes:
      "The City of Tempe provides municipal water and wastewater service within its service area. Confirm SRP capacity, service voltage, transformer and distributed-generation requirements, plus City meter, capacity, and sewer-connection requirements, for the actual parcel before design is fixed.",
  },
  climateNotes:
    "Tempe is in the hot-dry 2B climate region: high summer cooling loads, intense solar gain, low humidity, monsoon thunderstorms and dust, and urban-heat-island effects shape equipment, envelope, filtration, drainage, and floodplain decisions. FEMA mapping and geotechnical conditions are parcel-specific, particularly near washes and the Salt River.",
  marketNotes:
    "Tempe has a substantial commercial base tied to Arizona State University and its research and innovation ecosystem, the Novus Innovation Corridor, technology and professional offices, biotech and advanced services, multifamily, retail, hospitality, and corridor redevelopment. These sectors create varied MEP, energy, tenant-improvement, and site-engineering demand.",
  narratives: {
    mep:
      "Tempe MEP design starts with 2B peak cooling, solar gain, and high-ambient equipment performance; monsoon dust calls for maintainable outside-air filtration and protected intakes. Confirm SRP service conditions and demand-sensitive rate assumptions early, while City water and wastewater capacity and meter requirements remain parcel-specific. Coordinate the selected 2018 or 2024 transition path across HVAC, electrical, plumbing, and documentation.",
    structural:
      "Tempe structural design is shaped by extreme heat, monsoon outflow roof uplift, rooftop-equipment anchorage, and the project's geotechnical report more than by high seismic demand. Expansive or collapsible soils and alluvial variability can change foundation and slab details, while floodplain or wash mapping can affect elevation and foundation decisions. Use the code edition selected for the permit and document required inspections for the actual project.",
    civil:
      "Tempe civil design begins with parcel-specific drainage and floodplain review: FEMA-mapped Salt River and wash areas, City grading and stormwater criteria, ADA routes, dust and erosion controls, rights-of-way, and utility corridors can all change the site plan. Confirm retention or detention, fire access, SRP clearances, and City water and wastewater alignments before final civil documents.",
    energy:
      "Tempe's 2B conditions favor low-SHGC glazing, solar-control shading, cool roofs, efficient high-ambient cooling, and well-commissioned lighting controls. The energy path is date-sensitive: the City's notice makes the 2024 package effective July 1, 2026 while permitting 2018 or 2024 submittals through December 31, 2026. Select one path, run matching IECC or COMcheck documentation, and verify Solar Ready and other project-specific amendments with Building Safety.",
  },
  faqs: [
    {
      q: "Which code edition applies to a Tempe commercial project?",
      a:
        "Tempe's official notice adopts the 2024 ICC codes and 2023 NEC effective July 1, 2026, while allowing 2018 or 2024 submittals during the transition through December 31, 2026. Confirm the permitted path and filing date with Building Safety before design is locked.",
    },
    {
      q: "Who provides electric, water, and sewer service in Tempe?",
      a:
        "SRP is the electric utility, and the City of Tempe provides municipal water and wastewater in its service area. Service territory, capacity, meter, transformer, interconnection, and connection requirements must be confirmed for the individual parcel.",
    },
    {
      q: "What site conditions should a Tempe project investigate?",
      a:
        "Peak heat, solar gain, and monsoon dust affect building systems; drainage, floodplain and wash exposure, soils, and utility corridors affect site design. Check FEMA maps, City criteria, and the project geotechnical report rather than applying a citywide assumption.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    priority: {
      commercialOpportunity: 89,
      searchConsoleImpressions: 0,
      searchConsolePeriod: "unavailable",
    },
    sources: {
      ahj: [
        "https://www.tempe.gov/businesses/development-services",
      ],
      codes: [
        "https://www.tempe.gov/businesses/building-code",
        "https://codes.iccsafe.org/content/AZTEMPEBC2018P1",
        "https://library.municode.com/az/tempe/codes/city_code?nodeId=CH8BUBURE",
      ],
      amendments: [
        "https://www.tempe.gov/businesses/building-code",
        "https://library.municode.com/az/tempe/codes/city_code?nodeId=CH8BUBURE",
      ],
      utilities: [
        "https://www.srpnet.com/about/service-area-territory",
        "https://www.tempe.gov/government/municipal-utilities/water",
      ],
      climate: [
        "https://www.weather.gov/psr/",
        "https://www.ncei.noaa.gov/access/us-climate-normals/",
        "https://www.weather.gov/psr/heat",
        "https://gis-fema.hub.arcgis.com/maps/ae38b6f94eaf4abf97f986fa01921e13/about",
      ],
      market: [
        "https://www.tempe.gov/businesses/economic-development",
        "https://novusplace.com/",
        "https://research.asu.edu/",
      ],
    },
  },
};