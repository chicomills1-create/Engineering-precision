import type { CityData } from "../types";

export const birmingham: CityData = {
  slug: "birmingham",
  name: "Birmingham",
  stateSlug: "alabama",
  county: "Jefferson County",
  ahj: {
    office: "City of Birmingham Department of Planning, Engineering and Permits",
    process:
      "The City of Birmingham Department of Planning, Engineering and Permits administers building permits and coordinates plan review for commercial construction. Zoning, fire, site/civil, public-works, and utility approvals may run in parallel, so a complete submission needs site access, drainage, and service assumptions resolved as well as building drawings.",
  },
  codes: {
    building: "City of Birmingham adopted 2015 International Building Code with local amendments",
    energy: "City of Birmingham adopted 2015 International Energy Conservation Code commercial provisions",
    amendments:
      "Alabama leaves commercial code adoption substantially to local jurisdictions, and Birmingham's adopted International Codes and municipal amendments govern rather than a universal statewide municipal edition. Local zoning, floodplain, grading, right-of-way, and fire requirements remain separate design constraints that must be confirmed with the City for the project address.",
  },
  utilities: {
    electric: "Alabama Power provides electric service in Birmingham",
    notes:
      "New commercial services, major load changes, and distributed generation require Alabama Power engineering and interconnection coordination. Birmingham Water Works Board provides water service, while the Jefferson County Environmental Services Department provides wastewater service; availability, extensions, and easements should be reviewed early.",
  },
  climateNotes:
    "Birmingham is in humid climate zone 3A, with long cooling seasons, high rainfall, severe thunderstorms and tornado exposure, and periodic winter freeze-thaw. Ridge-and-valley terrain, weathered rock, variable residual soils, and localized floodplains make grades, bearing, and drainage strongly site-dependent.",
  marketNotes:
    "Birmingham's pipeline is anchored by UAB and the medical district, outpatient and institutional work, downtown and neighborhood redevelopment, automotive and metals manufacturing, and logistics along the interstate network. Complex healthcare renovations and steep or constrained urban sites are common alongside suburban commercial construction.",
  narratives: {
    mep:
      "Birmingham MEP systems must manage humidity for most of the year while retaining credible heating and freeze-protection performance for winter events. Moisture-aware ventilation, cooling part-load control, condensate routing, and a continuous air barrier help healthcare, laboratory, and renovation work operate reliably in zone 3A. Alabama Power should be engaged when service loads, standby generation, or distributed generation are being defined, not after the electrical room is located; Birmingham Water Works and Jefferson County Environmental Services create parallel water and wastewater coordination. The City's adopted 2015 IECC establishes the commercial energy basis, so HVAC, lighting, and envelope selections are documented to that edition and reconciled with the actual utility infrastructure.",
    structural:
      "Birmingham structural engineering is shaped by severe-storm exposure, topography, and geotechnical variability. Seismic demand is generally low, but wind load paths, roof uplift, façade attachment, and ICC 500 storm-shelter considerations can be significant for schools and institutional occupancies in tornado country. Hillside sites can encounter weathered rock, residual soils, cuts, fills, and differential bearing; a geotechnical investigation should guide foundations, retaining systems, slope stability, and construction sequencing. Heavy rainfall also makes roof drainage, below-grade waterproofing, and erosion control practical structural coordination items. Design follows Birmingham's locally adopted 2015 IBC and amendments, with special inspections and existing-condition investigation matched to the project.",
    civil:
      "Birmingham civil design responds to rugged grades, intense rain, and older urban infrastructure. Grading, drainage, access, retaining, and utility work should be developed to the City of Birmingham's review requirements and the capacity of the receiving system, rather than assuming a flat-site detention solution. Floodplain locations require FEMA and local ordinance coordination; elsewhere, steep slopes and weathered soils can make erosion control and stable outfalls the critical issue. ADEM NPDES construction-stormwater coverage and a SWPPP apply to qualifying disturbances. We coordinate water with Birmingham Water Works, wastewater with Jefferson County Environmental Services, and any street or right-of-way work with the appropriate City reviewers before finalizing the civil permit package.",
    energy:
      "Birmingham enforces its locally adopted 2015 IECC commercial provisions, so the compliance package should be keyed to that edition rather than to Alabama's variable statewide references. In warm-humid zone 3A, solar-heat-gain control, shading, air sealing, efficient cooling, lighting controls, and moisture-capable operation have strong practical value; the modest winter season still supports continuous insulation and a robust thermal envelope. UAB-area healthcare and renovation work often combines high ventilation and operating-hour demands with constrained electrical infrastructure, which makes whole-building trade-offs more useful than isolated prescriptive choices. We align the selected compliance route with Alabama Power service assumptions and the City's permit submittal.",
  },
  faqs: [
    {
      q: "Who is the commercial permitting authority in Birmingham?",
      a: "The City of Birmingham Department of Planning, Engineering and Permits administers building permits and plan review. Zoning, fire, civil/site, utility, and right-of-way requirements can be related but separate approvals, so they should be coordinated with the building package.",
    },
    {
      q: "What building and energy codes apply in Birmingham?",
      a: "Birmingham has adopted the 2015 IBC and 2015 IECC commercial provisions with local amendments. Alabama does not impose one fully mandatory commercial code edition on every municipality, so project teams should confirm the current City amendments and any discipline-specific requirements with the AHJ.",
    },
    {
      q: "Which utilities serve a Birmingham commercial site?",
      a: "Alabama Power provides electricity, Birmingham Water Works Board provides water, and Jefferson County Environmental Services provides wastewater service. New services, capacity, extensions, easements, and distributed generation should be coordinated while the site and electrical layout are still flexible.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 78, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.birminghamal.gov/government/city-departments/pep/divisions-pep/permitting-inspection-division"],
      codes: ["https://www.birminghamal.gov/government/city-departments/pep/divisions-pep/permitting-inspection-division"],
      amendments: ["https://www.birminghamal.gov/government/city-departments/pep/divisions-pep/permitting-inspection-division"],
      utilities: ["https://www.alabamapower.com/business.html", "https://www.bwwb.org/"],
      climate: ["https://www.weather.gov/bmx/"],
      market: ["https://www.uab.edu/medicine/home/"],
    },
  },
};