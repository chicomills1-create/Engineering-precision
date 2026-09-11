import type { CityData } from "../types";

export const minneapolis: CityData = {
  slug: "minneapolis",
  name: "Minneapolis",
  stateSlug: "minnesota",
  county: "Hennepin County",
  ahj: {
    office: "City of Minneapolis Community Planning & Economic Development, Construction Code Services",
    process:
      "Construction Code Services accepts commercial permits and plan-review materials through the City's online permitting system and coordinates reviews with zoning, fire, public works, and environmental health as the project requires. Building permits are distinct from land-use, right-of-way, utility, and site approvals, so projects with demolition, public frontage, or development-review scope need parallel City coordination.",
  },
  codes: {
    building: "2020 Minnesota Building Code, based on the 2018 International Building Code, enforced by Minneapolis",
    energy: "2020 Minnesota Energy Code commercial provisions, based on ASHRAE 90.1-2016",
    amendments:
      "Minnesota's State Building Code is the baseline enforced in Minneapolis; the City cannot replace it with a separate commercial building-code edition. Minneapolis zoning, stormwater, right-of-way, and sustainability ordinances add local requirements, including the City's commercial benchmarking and energy-disclosure program for covered existing buildings.",
  },
  utilities: {
    electric: "Xcel Energy provides electric distribution service in Minneapolis",
    notes:
      "Xcel Energy coordinates new or upgraded electric service and distributed-energy interconnection; cold-climate electrification and large institutional loads warrant early capacity and service-location review. Minneapolis Public Works provides municipal water, sanitary sewer, and stormwater services.",
  },
  climateNotes:
    "Minneapolis is in ASHRAE climate zone 6A, with long, very cold winters, deep frost, snow and ice, humid summers, and intense convective rainfall. Glacial soils, variable fill, high groundwater in some areas, Mississippi River flood exposure, and freeze-thaw cycles make both geotechnical and drainage investigation important.",
  marketNotes:
    "The Minneapolis market is anchored by healthcare, higher education, corporate and institutional campuses, advanced manufacturing, and dense multifamily and mixed-use infill. Downtown office repositioning, adaptive reuse, and transit-oriented development create complex existing-building work, while public infrastructure and climate-resilience investments keep civil and utility scopes active.",
  narratives: {
    mep:
      "Minneapolis MEP design is cold-climate engineering first: the 2020 Minnesota Energy Code, winter ventilation energy, freeze protection, humidification or moisture control where required, and reliable heating distribution all deserve early attention. Xcel Energy service planning is important when electrifying heating or serving institutional and process loads, because demand and equipment location affect the whole electrical concept. Minneapolis Public Works water and sewer connections, combustion venting where retained, snow-melt loads where proposed, and equipment seismic restraint are coordinated with the electronic permit package. Summer humidity and storm-driven outages still support thoughtful cooling, drainage, and resilience decisions.",
    structural:
      "Minneapolis structural design is usually governed by snow, wind, gravity, and frost rather than high seismic demand, but the project-specific Minnesota Building Code analysis remains controlling. Roof snow accumulation and drift at elevation changes, ice dams, wind uplift, and cold-weather enclosure sequencing need to be reflected in details and construction assumptions. Foundations must account for frost depth, glacial soils, fill, groundwater, and settlement, especially on redevelopment parcels. Existing masonry, timber, and steel buildings common in the city also benefit from measured investigation before adaptive-reuse lateral, floor-loading, or façade decisions are set.",
    civil:
      "Civil planning in Minneapolis addresses Public Works requirements for water, sanitary, stormwater, streets, and frontage alongside City zoning and right-of-way approvals. Frozen ground and flat urban grades make positive drainage, utility depth and separation, snow-storage impacts, and spring runoff practical layout issues. Stormwater treatment and volume control need space before a constrained infill footprint is finalized, while Mississippi River and local flood considerations may affect finished-floor elevations. State construction-stormwater requirements and a SWPPP apply when disturbance meets Minnesota Pollution Control Agency thresholds.",
    energy:
      "Commercial energy compliance is prepared to the 2020 Minnesota Energy Code commercial provisions, which are based on ASHRAE 90.1-2016, not to a generic current IECC assumption. In climate zone 6A, air sealing, continuous insulation, thermal-bridge control, efficient heating, heat recovery, and lighting controls are critical to both code compliance and moisture-safe performance. Minneapolis's benchmarking and disclosure obligations can also matter for covered existing commercial buildings, so retrofit decisions should consider measured operations as well as permit compliance. We coordinate envelope details, HVAC loads, and Xcel service strategy before submitting construction documents.",
  },
  faqs: [
    {
      q: "What commercial building and energy codes does Minneapolis enforce?",
      a: "Minneapolis enforces the statewide 2020 Minnesota Building Code, based on the 2018 IBC. Commercial energy compliance follows the 2020 Minnesota Energy Code provisions based on ASHRAE 90.1-2016, with local zoning and site requirements reviewed separately.",
    },
    {
      q: "Who provides Minneapolis electric, water, and sewer service?",
      a: "Xcel Energy provides electric distribution service. Minneapolis Public Works provides municipal water, sanitary sewer, and stormwater services; service upgrades and public-side connections should be coordinated separately from the building-permit review.",
    },
    {
      q: "What drives Minneapolis foundation and envelope design?",
      a: "Very cold winters, deep frost, snow drift, ice, freeze-thaw cycling, and glacial or fill soils are major inputs. A geotechnical report and durable air-, vapor-, and water-control details are important for both structural reliability and energy performance.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.minneapolismn.gov/government/departments/community-planning-economic-development/permits/"],
      codes: ["https://www.dli.mn.gov/business/codes-and-laws/2020-minnesota-state-building-code"],
      amendments: ["https://www.minneapolismn.gov/government/departments/community-planning-economic-development/permits/"],
      utilities: ["https://www.xcelenergy.com/", "https://www.minneapolismn.gov/government/departments/public-works/surface-water-sewers/"],
      climate: ["https://www.weather.gov/mpx/"],
      market: ["https://www.greatermsp.org/"],
    },
  },
};