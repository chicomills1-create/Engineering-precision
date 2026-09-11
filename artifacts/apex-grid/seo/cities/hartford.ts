import type { CityData } from "../types";

export const hartford: CityData = {
  slug: "hartford",
  name: "Hartford",
  stateSlug: "connecticut",
  county: "Hartford County",
  ahj: {
    office: "City of Hartford Department of Development Services, Licenses and Inspections",
    process:
      "Hartford’s Department of Development Services administers building and trade permitting and inspections through its Licenses and Inspections function. Commercial projects can require coordinated building, fire, zoning, planning, historic, utility, site, and public-right-of-way review; complete drawings should identify the relevant City approvals rather than assuming a building permit resolves all development work.",
  },
  codes: {
    building: "2022 Connecticut State Building Code, based on the 2021 IBC with Connecticut amendments",
    energy: "Connecticut State Energy Code: 2021 IECC or ASHRAE 90.1-2019 for commercial buildings",
    amendments:
      "Hartford enforces Connecticut’s uniform statewide construction code; local zoning, planning, historic-district, fire, utility, and right-of-way requirements are additional City review layers rather than a separate city building-code edition. Existing downtown and neighborhood buildings may need a code path that addresses the existing-building provisions as well as local development approvals.",
  },
  utilities: {
    electric: "Eversource provides electric distribution service in Hartford",
    notes:
      "Eversource should review new, upgraded, high-demand, or distributed-generation service before electrical infrastructure is fixed. The Metropolitan District Commission provides water and wastewater service in Hartford; City stormwater, street, and public-way requirements remain separate coordination tracks.",
  },
  climateNotes:
    "Hartford is in ASHRAE climate zone 5A, with cold humid winters, humid summers, snow, freeze-thaw, and severe-rain exposure. The Connecticut River floodplain and tributary flooding, high groundwater or alluvium near waterways, urban fill, and glacial soils elsewhere make FEMA flood review and site-specific geotechnical assessment consequential.",
  marketNotes:
    "Hartford’s active sectors include insurance and financial-services office modernization, healthcare, state and municipal facilities, higher education, multifamily development, and adaptive reuse of downtown and industrial properties. The region also supports aerospace and advanced-manufacturing work, while older urban sites commonly require utility, environmental, and existing-structure coordination.",
  narratives: {
    mep:
      "Hartford MEP work responds to a 5A climate with a substantial heating season, summer humidity, freeze exposure, and increasingly electrified building systems. We coordinate heating, heat recovery, ventilation, dehumidification, freeze protection, and envelope performance as one system, particularly for healthcare, public, and older office-building renovations. Eversource capacity and service configuration should be established early for major electrification, laboratory, data, and standby-power loads, while MDC water and wastewater connections shape mechanical, fire-protection, and civil decisions. The statewide 2021-IECC or ASHRAE 90.1-2019 energy path supplies a clear baseline, but City permitting still requires local development coordination.",
    structural:
      "Hartford structural design must account for snow, wind, frost, moderate seismicity, and subsurface variability rather than treating the city as a simple inland site. The Connecticut River floodplain makes FEMA flood elevation, hydrostatic effects, foundation selection, and equipment support important for affected sites; groundwater, alluvium, fill, and old foundations can materially change the geotechnical recommendation. Elsewhere, glacial soils and localized shallow rock warrant early investigation. The 2022 Connecticut State Building Code provides the structural baseline, while downtown adaptive reuse needs measured verification of existing masonry, steel, timber, and concrete before new loads or lateral interventions are designed.",
    civil:
      "Hartford civil engineering starts with City development review, MDC water and wastewater coordination, and the drainage realities of the Connecticut River watershed. Connecticut DEEP’s construction stormwater general permit applies where the state threshold is met, while municipal stormwater and public-way review govern local connections, grading, erosion controls, and improvements. Floodplain screening, high groundwater near waterways, freeze-thaw, urban fill, and constrained utility corridors can limit infiltration and require careful detention, water-quality, overflow, and finished-floor planning. We reserve viable utility and drainage routes early and coordinate roadway work with City reviewers before finalizing a compact redevelopment plan.",
    energy:
      "Hartford commercial energy compliance follows Connecticut’s statewide 2021 IECC or ASHRAE 90.1-2019 path, documented in the form appropriate to the project. In cold-humid zone 5A, continuous insulation, air-barrier continuity, window performance, thermal-bridge control, efficient heating, and heat-recovery ventilation influence both energy use and winter condensation resilience. Existing masonry and office-to-residential conversions need moisture-aware enclosure work rather than a blanket insulation detail. We integrate the envelope, HVAC, lighting, controls, Eversource electrical demand, and potential Energize CT incentives so the compliance strategy remains practical for Hartford’s renovation and institutional building types.",
  },
  faqs: [
    {
      q: "Who administers commercial permits in Hartford?",
      a: "Hartford’s Department of Development Services, through Licenses and Inspections, administers building and trade permitting. Commercial work can also require fire, zoning, planning, historic, utility, site, and public-right-of-way review.",
    },
    {
      q: "Which building and energy codes apply in Hartford?",
      a: "Hartford enforces the statewide 2022 Connecticut State Building Code, based on the 2021 IBC with state amendments. Commercial energy compliance follows the Connecticut State Energy Code using the 2021 IECC or ASHRAE 90.1-2019 path.",
    },
    {
      q: "Who provides Hartford utilities, and what site issues matter?",
      a: "Eversource provides electric distribution service, and the Metropolitan District Commission provides water and wastewater service. Connecticut River floodplain screening, groundwater, urban fill, glacial soils, and constrained urban utility corridors should be addressed early with City and utility coordination.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 74, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.hartfordct.gov/Government/Departments/Development-Services"],
      codes: ["https://portal.ct.gov/dcp/building-codes-and-standards"],
      amendments: ["https://www.hartfordct.gov/Government/Departments/Development-Services/Building-Inspections"],
      utilities: ["https://www.eversource.com/content/residential", "https://themdc.org/"],
      climate: ["https://www.fema.gov/flood-maps"],
      market: ["https://portal.ct.gov/DECD"]
    }
  },
};