import type { CityData } from "../types";

export const memphis: CityData = {
  slug: "memphis",
  name: "Memphis",
  stateSlug: "tennessee",
  county: "Shelby County",
  ahj: {
    office: "City of Memphis Division of Planning and Development, Office of Construction Code Enforcement",
    process:
      "Memphis commercial permits and plan review are administered through the Division of Planning and Development's Office of Construction Code Enforcement, using the city's online permitting and plan-review process. Building, fire, zoning, site, and floodplain requirements can involve separate reviews, so applicants should coordinate development approvals and utility information before submitting final construction documents.",
  },
  codes: {
    building: "Memphis and Shelby County 2018 International Building Code with locally adopted amendments",
    energy: "Memphis and Shelby County 2018 International Energy Conservation Code commercial provisions, with ASHRAE 90.1-2016 as an alternate path",
    amendments:
      "Memphis is a local code jurisdiction and does not merely rely on Tennessee's default statewide code; the City and Shelby County adopted the 2018 International Codes with local amendments. Local zoning, floodplain, drainage, and fire requirements remain separate reviews and can affect the permit set.",
  },
  utilities: {
    electric: "Memphis Light, Gas and Water (MLGW), a TVA power distributor, provides electric, gas, and water service",
    notes:
      "MLGW service applications, load information, and any distributed-generation interconnection should be coordinated for commercial work, particularly for large logistics or manufacturing loads. Sewer and drainage infrastructure is administered by the City of Memphis, and available capacity and easements should be verified during site planning.",
  },
  climateNotes:
    "Memphis is in hot-humid climate zone 3A, with long cooling seasons, high rainfall, Mississippi River flood exposure, and severe thunderstorms. It also lies within the New Madrid seismic region; loess bluffs, alluvial soils, erosion, and variable groundwater require location-specific geotechnical evaluation.",
  marketNotes:
    "Memphis remains a major air-cargo, rail, trucking, and distribution market centered on FedEx and the airport, while healthcare and research around St. Jude and the medical district remain important. Regional automotive and battery investment, including West Tennessee's BlueOval City supply chain, adds industrial and logistics demand to the metropolitan market.",
  narratives: {
    mep:
      "Memphis MEP design combines hot-humid zone 3A cooling and dehumidification with a logistics and manufacturing load profile that can be electrically intensive. MLGW distributes TVA power and provides gas and water, so service capacity, transformer configuration, backup-power assumptions, and any distributed-generation interconnection should be addressed at schematic design rather than treated as a permit afterthought. HVAC systems need sensible and latent capacity, ventilation controls, and freeze protection for winter events; warehouse, medical, and process spaces then add their own pressurization and resilience needs. The locally adopted 2018 IECC or ASHRAE 90.1-2016 alternate provides the commercial compliance basis, while City sewer and drainage coordination informs equipment and utility-room placement.",
    structural:
      "Memphis has a materially different structural profile from much of Tennessee because New Madrid seismicity is a core design input. Site-specific seismic parameters, ductile lateral detailing, collector and diaphragm design, nonstructural anchorage, and drift compatibility need to be established under the locally adopted 2018 IBC before the lateral system is fixed. Wind and severe thunderstorms still require robust roof and cladding load paths, and Mississippi floodplain exposure can establish floor and equipment elevations. The bluffs and river plain also present loess, alluvium, erosion, settlement, and groundwater variability; borings and a geotechnical report guide slope, pavement, slab, and foundation decisions for both industrial greenfields and redevelopment.",
    civil:
      "Memphis civil work must reconcile heavy rain with the Mississippi River and tributary floodplain landscape. City drainage and sewer review, floodplain requirements, and the actual downstream system capacity shape detention, conveyance, grading, and outfall choices; finished floors and critical utilities may be constrained by flood hazard. Loess soils can be erosion-prone, while flat alluvial sites may have shallow groundwater and limited infiltration reliability. Tennessee construction general-permit coverage and a SWPPP apply to qualifying land disturbance. We reserve utility and drainage corridors early on distribution and industrial sites, then coordinate street access, service extensions, and easements with City reviewers and MLGW.",
    energy:
      "Memphis commercial energy compliance follows the locally adopted 2018 IECC, with ASHRAE 90.1-2016 available as an alternate, rather than an assumed later state edition. The hot-humid climate rewards low-SHGC glazing, shading, air-barrier continuity, lighting controls, high-efficiency cooling, and systems that can remove moisture at part load. For very large warehouse or process buildings, envelope area, destratification, ventilation, lighting power, and MLGW/TVA demand characteristics should be considered together instead of checking isolated equipment efficiencies. We use the selected code path to coordinate envelope, mechanical, and lighting information for Construction Code Enforcement review while retaining the electrical and resilience allowances the operating use requires.",
  },
  faqs: [
    {
      q: "Which building code does Memphis enforce?",
      a: "Memphis and Shelby County enforce the locally adopted 2018 International Building Code with local amendments. The commercial energy baseline is the locally adopted 2018 IECC, and ASHRAE 90.1-2016 is an alternate compliance path.",
    },
    {
      q: "Does seismic design matter for a Memphis project?",
      a: "Yes. Memphis is within the New Madrid seismic region, so site-specific seismic parameters, lateral-system ductility, drift, and nonstructural anchorage should be determined early. This is substantially more consequential than in Middle or East Tennessee.",
    },
    {
      q: "Who provides utilities in Memphis?",
      a: "Memphis Light, Gas and Water provides electric, gas, and water service and distributes TVA power. The City manages sewer and drainage infrastructure. Large service loads, interconnection requests, utility easements, and downstream capacity should be coordinated during design.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 86, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.memphistn.gov/government/the-division-of-planning-and-development"],
      codes: ["https://www.memphistn.gov/government/office-of-construction-code-enforcement"],
      amendments: ["https://www.memphistn.gov/government/office-of-construction-code-enforcement"],
      utilities: ["https://www.mlgw.com/commercial"],
      climate: ["https://www.weather.gov/meg/"],
      market: ["https://www.memphistn.gov/government/economic-development"],
    },
  },
};