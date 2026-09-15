import type { CityData } from "../types";

export const detroit: CityData = {
  slug: "detroit",
  name: "Detroit",
  stateSlug: "michigan",
  county: "Wayne County",
  ahj: {
    office: "City of Detroit Buildings, Safety Engineering, and Environmental Department (BSEED)",
    process:
      "BSEED administers building, trade, and related development permits for Detroit and provides online application and permit-status services. Commercial plans can be routed among building, fire, zoning, historic-district, and site reviewers; projects involving public infrastructure, the riverfront, or utility work also require separate coordination, so a complete submittal is broader than the building set.",
  },
  codes: {
    building: "Michigan Building Code, 2015 edition (based on the 2015 IBC), enforced by BSEED",
    energy: "Michigan Uniform Energy Code based on the 2015 IECC; ASHRAE 90.1-2013 is an alternate path",
    amendments:
      "Detroit enforces Michigan’s statewide construction-code baseline through BSEED. City zoning, historic-district review, fire review, and Detroit Water and Sewerage Department connection or drainage requirements can materially affect design even though the base building and energy codes are statewide.",
  },
  utilities: {
    electric: "DTE Electric serves Detroit",
    notes:
      "DTE Electric reviews new and upgraded electric services and distributed-generation interconnection; automotive, manufacturing, and high-reliability facilities need early capacity discussions. Detroit Water and Sewerage Department provides city water and sewer services, while the regional Great Lakes Water Authority operates the core water and wastewater system.",
  },
  climateNotes:
    "Detroit is in ASHRAE climate zone 5A, with a long heating season, humid summers, freeze-thaw exposure, and snow. Its Detroit River setting, legacy combined-sewer system, high groundwater in some areas, and urban fill on redevelopment parcels make drainage, subsurface investigation, and flood resilience central rather than routine.",
  marketNotes:
    "Detroit’s market combines redevelopment of legacy industrial and downtown properties with automotive and mobility investment, EV supply-chain activity, healthcare and university work, and riverfront and neighborhood reinvestment. Adaptive reuse often brings existing-structure, brownfield, utility, and combined-sewer constraints that differ sharply from a greenfield suburban project.",
  narratives: {
    mep:
      "Detroit MEP engineering starts with a heating-dominated 5A climate but cannot ignore summer humidity: robust envelope interfaces, freeze protection, ventilation controls, and dehumidification are all important in both reuse and new construction. DTE Electric service planning is a major early task for electrified vehicle, manufacturing, and high-reliability loads, while DWSD water and sewer connection requirements affect mechanical-room and site utility decisions. The Michigan Uniform Energy Code’s 2015-IECC baseline and ASHRAE 90.1-2013 alternate path guide compliance, but long heating seasons reward better air sealing, heat recovery, and plant controls. In older buildings, we verify existing electrical capacity, steam or hydronic conditions, and riser space before treating a retrofit like an empty shell.",
    structural:
      "Detroit is low seismicity, so snow, wind, frost, and existing conditions usually drive structural decisions rather than seismic detailing. Roof snow and drift, winter construction, wind uplift during severe weather, and freeze-thaw durability require care, particularly when adding rooftop equipment to older masonry, concrete, or steel buildings. Redevelopment sites can include undocumented fill, variable riverine or glacial soils, high groundwater, and prior foundations; a geotechnical and existing-conditions investigation is the basis for foundation, slab, and shoring choices. BSEED review applies the Michigan Building Code, while historic and adaptive-reuse work may require a thoughtful code path alongside the structural intervention.",
    civil:
      "Detroit civil design must account for the city’s combined-sewer legacy and Detroit River watershed rather than assuming unrestricted downstream capacity. DWSD drainage, water, and sewer requirements and the city’s stormwater-management expectations inform detention, green infrastructure, connection, and discharge planning; Michigan Part 91 soil-erosion permitting and NPDES coverage apply when their thresholds are met. High groundwater, urban fill, snowmelt, and flat urban grades can complicate infiltration and elevation decisions. We screen floodplain and outfall conditions, preserve room for water-quality practices, and coordinate roadway or utility work with the responsible City reviewers early in a redevelopment plan.",
    energy:
      "Detroit commercial energy compliance uses the Michigan Uniform Energy Code based on the 2015 IECC, or ASHRAE 90.1-2013 where applicable, with BSEED reviewing the permit set. In climate zone 5A, continuous insulation, air-barrier continuity, condensation control, high-performance fenestration, and heating-system efficiency are core compliance and resilience decisions. Existing masonry and industrial buildings need a hygrothermal-aware retrofit strategy: insulation or air sealing added without understanding moisture paths can create durability problems. We integrate the envelope, lighting, HVAC, and DTE Electric load strategy so a redevelopment improves year-round performance instead of merely producing a code form.",
  },
  faqs: [
    {
      q: "What department issues commercial permits in Detroit?",
      a: "Detroit’s Buildings, Safety Engineering, and Environmental Department (BSEED) administers building and trade permits. Commercial projects may also need zoning, fire, historic-district, utility, or site review, so the building permit is one part of the approval path.",
    },
    {
      q: "Which codes apply to Detroit commercial buildings?",
      a: "BSEED enforces the statewide Michigan Building Code, 2015 edition based on the 2015 IBC. Commercial energy compliance follows the Michigan Uniform Energy Code based on the 2015 IECC, with ASHRAE 90.1-2013 as an alternate path.",
    },
    {
      q: "Why is stormwater planning important for Detroit redevelopment?",
      a: "Detroit’s combined-sewer legacy, Detroit River watershed, flat grades, and locally high groundwater can limit conventional drainage assumptions. DWSD connection and drainage requirements, floodplain screening, green-infrastructure planning, and applicable Part 91/NPDES controls should be addressed before a redevelopment layout is locked.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://detroitmi.gov/departments/buildings-safety-engineering-and-environmental-department"],
      codes: ["https://michigan.gov/lara/bureau-list/bcc"],
      amendments: ["https://detroitmi.gov/departments/buildings-safety-engineering-and-environmental-department"],
      utilities: ["https://www.dteenergy.com/us/en/business.html", "https://detroitmi.gov/departments/detroit-water-and-sewerage-department"],
      climate: ["https://www.weather.gov/dtx/"],
      market: ["https://www.degc.org/"],
    },
  },
};