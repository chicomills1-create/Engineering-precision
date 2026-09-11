import type { CityData } from "../types";

export const grandRapids: CityData = {
  slug: "grand-rapids",
  name: "Grand Rapids",
  stateSlug: "michigan",
  county: "Kent County",
  ahj: {
    office: "City of Grand Rapids Development Center",
    process:
      "The Development Center coordinates permit applications and plan review for building, trade, zoning, and development activity, with online permitting services available through the City. Commercial projects can be routed to building, fire, planning, engineering, and historic-preservation review; work in the public way and utility connections require their own City coordination.",
  },
  codes: {
    building: "Michigan Building Code, 2021 edition (based on the 2021 IBC), enforced by the City of Grand Rapids",
    energy: "Michigan Uniform Energy Code based on the 2021 IECC; ASHRAE 90.1-2019 is an alternate compliance path",
    amendments:
      "Grand Rapids enforces Michigan’s statewide construction-code baseline while applying City zoning, site-development, historic-preservation, and public-infrastructure requirements. Downtown and neighborhood redevelopment can also require review under local development and historic-district rules, which are separate from the statewide building-code edition.",
  },
  utilities: {
    electric: "Consumers Energy provides electric distribution service in Grand Rapids",
    notes:
      "Consumers Energy new-service, capacity, and distributed-generation requests should be coordinated before major electrical loads or equipment locations are fixed. The City of Grand Rapids provides water and wastewater service; its Engineering Department requirements govern many public-water, sewer, and right-of-way connections.",
  },
  climateNotes:
    "Grand Rapids is in ASHRAE climate zone 5A and experiences cold winters, humid summers, freeze-thaw, and lake-effect-influenced snow. Glacial till, variable groundwater, the Grand River floodplain, and localized urban fill make subsurface and floodplain findings important to both foundations and site drainage.",
  marketNotes:
    "Grand Rapids has active healthcare, higher-education, life-science, advanced-manufacturing, and downtown mixed-use work, alongside warehouse and logistics development in the broader west Michigan market. Medical Mile and adaptive reuse of older commercial and industrial buildings create different infrastructure and existing-condition challenges than greenfield manufacturing sites.",
  narratives: {
    mep:
      "Grand Rapids MEP planning responds to a 5A climate with a long heating season, real snow and freeze exposure, and humid summer ventilation loads. We develop heating, heat-recovery, freeze-protection, and humidity-control assumptions together, particularly for healthcare, laboratory, and adaptive-reuse work where operations cannot be treated as a typical office load. Consumers Energy capacity and service configuration need early attention for electrified heating, manufacturing equipment, resilient power, or solar interconnection. The Michigan Uniform Energy Code provides the commercial compliance path, while City water and wastewater connections must be coordinated with mechanical, fire-protection, and civil layouts rather than left to a late utility application.",
    structural:
      "Grand Rapids structural design is usually a snow, wind, frost, and soil problem, with low seismic demand not eliminating the need for a site-specific code analysis. Lake-effect-influenced snow, drift at roof steps, wind uplift, and winter durability affect roof and enclosure support decisions. Glacial soils, variable groundwater, riverine alluvium, and redevelopment fill can change foundation and slab recommendations, so a geotechnical report is central to the structural concept. The statewide 2021 Michigan Building Code establishes the structural baseline; on older downtown, warehouse, and medical-campus buildings, field verification of existing framing, masonry, and load paths is equally important.",
    civil:
      "Grand Rapids civil design must work with the Grand River watershed and the City’s development, engineering, water, and wastewater requirements. Michigan Part 91 soil-erosion controls and the state construction-stormwater program apply where their thresholds are met; City review also determines how public infrastructure, grading, access, and drainage are accepted. Snowmelt, freeze-thaw, groundwater, and floodplain screening affect conveyance, pavement, utility depth, and the feasibility of infiltration. We establish outfall conditions, water-quality practices, utility corridors, and any public-right-of-way work early, which is especially important on compact redevelopment parcels and river-adjacent sites.",
    energy:
      "Grand Rapids commercial energy compliance uses the Michigan Uniform Energy Code based on the 2021 IECC, or the ASHRAE 90.1-2019 alternate path, as applicable to the project. Zone 5A rewards a durable enclosure: continuous insulation, air-barrier continuity, thermal-bridge control, high-performance fenestration, and ventilation heat recovery reduce both heating energy and winter condensation risk. We evaluate those measures with lighting, controls, electrified heating, and process loads for the actual use rather than relying on a form-only exercise. For projects pursuing utility incentives or distributed energy, energy analysis and Consumers Energy service planning should advance together.",
  },
  faqs: [
    {
      q: "Which office handles commercial permitting in Grand Rapids?",
      a: "The City of Grand Rapids Development Center coordinates permit and development review. Building work may also involve fire, planning, engineering, historic-preservation, utility, or right-of-way review depending on the site and scope.",
    },
    {
      q: "Which codes govern commercial construction in Grand Rapids?",
      a: "Grand Rapids enforces Michigan’s statewide 2021 Michigan Building Code, based on the 2021 IBC. Commercial energy work follows the Michigan Uniform Energy Code based on the 2021 IECC, with ASHRAE 90.1-2019 available as an alternate path.",
    },
    {
      q: "What utility and site issues should be resolved early?",
      a: "Consumers Energy electric capacity and interconnection need early review for large or electrified loads. City water and wastewater connections, Grand River floodplain screening, groundwater, glacial soils, and applicable erosion and construction-stormwater controls should shape the site plan early.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 78, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.grandrapidsmi.gov/Government/Departments/Community-Development/Development-Center"],
      codes: ["https://www.michigan.gov/lara/bureau-list/bcc/rules-and-codes"],
      amendments: ["https://www.grandrapidsmi.gov/Government/Departments/Community-Development"],
      utilities: ["https://www.consumersenergy.com/business", "https://www.grandrapidsmi.gov/Government/Departments/Public-Works/Water-Sewer"],
      climate: ["https://www.weather.gov/grr/"],
      market: ["https://www.rightplace.org/"],
    },
  },
};