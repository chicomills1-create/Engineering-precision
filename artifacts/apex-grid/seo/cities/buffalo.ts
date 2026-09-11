import type { CityData } from "../types";

export const buffalo: CityData = {
  slug: "buffalo",
  name: "Buffalo",
  stateSlug: "new-york",
  county: "Erie County",
  ahj: {
    office: "City of Buffalo Department of Permit and Inspection Services",
    process:
      "The Department of Permit and Inspection Services administers building permits and inspections for Buffalo and provides online permit information and application services. Commercial work can require coordinated building, fire, zoning, preservation, sewer, and right-of-way review; a complete project must address the applicable City and state tracks, not only the building drawings.",
  },
  codes: {
    building: "2020 Building Code of New York State, based on the 2018 IBC, enforced by the City of Buffalo",
    energy: "2020 Energy Conservation Construction Code of New York State, based on the 2018 IECC and ASHRAE 90.1-2016",
    amendments:
      "Buffalo enforces the statewide Uniform Code outside the separate New York City code regime, with City administrative, zoning, fire, preservation, sewer, and public-right-of-way requirements layered on the permit process. Historic buildings and locally designated districts require preservation coordination in addition to the Uniform Code analysis.",
  },
  utilities: {
    electric: "National Grid provides electric distribution service in Buffalo",
    notes:
      "National Grid should review new or upgraded service and distributed-generation interconnection early, particularly for major electrification or industrial loads. Buffalo Water operates the City water system, while Buffalo Sewer Authority manages wastewater and stormwater infrastructure; their connection and drainage requirements are separate from electric service.",
  },
  climateNotes:
    "Buffalo’s 5A cold-humid climate is strongly shaped by Lake Erie: lake-effect snow, wind, freeze-thaw, and a long heating season are primary design inputs. Lake Erie shoreline and creek flood hazards, high groundwater in places, urban fill, and legacy industrial soils make FEMA flood review and site-specific geotechnical and environmental investigation essential.",
  marketNotes:
    "Active local sectors include healthcare and higher education around the Buffalo Niagara Medical Campus, advanced manufacturing, waterfront and downtown redevelopment, and rehabilitation of the region’s older industrial and commercial buildings. Public and private investment in adaptive reuse creates significant existing-structure, utility, brownfield, and historic-review coordination work.",
  narratives: {
    mep:
      "Buffalo MEP design begins with a heating-dominated 5A climate, lake-effect snow, and humid summers rather than a generic cold-weather template. Heating-plant reliability, freeze protection, ventilation heat recovery, snow-safe outdoor-air equipment, and humidity control all require deliberate coordination. National Grid electric capacity and interconnection are early decisions for electrified heating, medical, industrial, and resilient-power programs, while Buffalo Water and Buffalo Sewer Authority connections affect plumbing, fire protection, and site layouts. The 2020 ECCCNYS provides the energy baseline; in older masonry and industrial buildings, field verification of electrical capacity, piping, shafts, and moisture conditions should precede system selection.",
    structural:
      "Buffalo’s structural priorities are lake-effect snow, drifting, wind, frost, and existing conditions; seismic is not normally the leading design action but remains a code-calculated requirement. Roof steps, parapets, and adjacent taller walls deserve careful drift analysis, while Lake Erie storms drive uplift and enclosure-support detailing. Foundation concepts must respond to fill, variable groundwater, alluvial material, and possible legacy foundations or contamination on redevelopment sites. The 2020 Building Code of New York State establishes the code basis, but a current geotechnical report, FEMA flood review, and careful survey of existing masonry, timber, steel, or concrete are essential before finalizing a reuse or waterfront scheme.",
    civil:
      "Buffalo civil design has to account for the Lake Erie watershed, the City’s aging urban infrastructure, and separate Buffalo Sewer Authority review. New York’s SPDES construction-stormwater general permit and SWPPP requirements apply when land disturbance reaches the state threshold, while City requirements govern sewer connections, grading, and public-way work. Lake-effect snowmelt, high groundwater, flat grades, and constrained downstream capacity can limit infiltration and influence detention, overflow routing, and finished-floor elevations. We screen FEMA mapping, establish outfall and utility constraints early, and coordinate water, sewer, storm, erosion-control, and right-of-way approvals before a redevelopment layout is committed.",
    energy:
      "Buffalo commercial energy compliance follows the 2020 ECCCNYS, based on the 2018 IECC and ASHRAE 90.1-2016, using the path appropriate to the project. In a lake-influenced cold-humid climate, continuous insulation, air-barrier continuity, thermal-bridge management, high-performance windows, and heat-recovery ventilation address both heating energy and winter condensation risk. For historic or existing masonry construction, envelope improvements must be sequenced with moisture analysis so efficiency work does not create freeze-thaw or durability problems. We integrate HVAC, lighting, controls, envelope measures, and National Grid electrical-service assumptions so the compliance package supports a usable and resilient building.",
  },
  faqs: [
    {
      q: "Which department issues Buffalo commercial permits?",
      a: "The City of Buffalo Department of Permit and Inspection Services administers building permits and inspections. Depending on scope and location, commercial projects can also require fire, zoning, preservation, sewer, and public-right-of-way coordination.",
    },
    {
      q: "Which building and energy codes apply in Buffalo?",
      a: "Buffalo enforces New York State’s 2020 Building Code, based on the 2018 IBC, and the 2020 ECCCNYS, based on the 2018 IECC and ASHRAE 90.1-2016. City administrative and development requirements supplement those statewide codes.",
    },
    {
      q: "Why are snow, drainage, and existing conditions important in Buffalo?",
      a: "Lake-effect snow and wind drive roof and enclosure design, while snowmelt, Lake Erie and creek flood hazards, groundwater, and constrained urban sewers shape site drainage. Older and industrial sites can also contain fill, prior foundations, or environmental conditions that need investigation.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 76, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.buffalony.gov/277/Permit-Information"],
      codes: ["https://www.dos.ny.gov/DCEA/"],
      amendments: ["https://www.buffalony.gov/DocumentCenter/Index/"],
      utilities: ["https://www.nationalgridus.com/Upstate-NY-Home", "https://www.buffalony.gov/425/Water"],
      climate: ["https://www.fema.gov/flood-maps"],
      market: ["https://www.buffalony.gov/1118/Economic-Development"]
    }
  },
};