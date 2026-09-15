import type { CityData } from "../types";

export const milwaukee: CityData = {
  slug: "milwaukee",
  name: "Milwaukee",
  stateSlug: "wisconsin",
  county: "Milwaukee County",
  ahj: {
    office: "City of Milwaukee Department of Neighborhood Services (DNS), Development Center",
    process:
      "DNS administers building, trade, and occupancy permits through the Development Center and its online permit services. Commercial work may also require City Planning, Fire Department, Historic Preservation Commission, Department of Public Works, Milwaukee Water Works, and Milwaukee Metropolitan Sewerage District coordination.",
  },
  codes: {
    building: "Wisconsin Commercial Building Code, SPS 361–366 (statewide code based on the 2015 IBC), enforced by the City of Milwaukee",
    energy: "Wisconsin Commercial Energy Code, SPS 363, based on the 2015 IECC with Wisconsin amendments",
    amendments:
      "Milwaukee enforces Wisconsin's statewide commercial code through DNS and applies City administrative, zoning, fire, and site requirements. The uniform state code does not eliminate local review of historic properties, public infrastructure, water, sanitary sewer, stormwater, and development approvals.",
  },
  utilities: {
    electric: "We Energies provides electric distribution service",
    notes:
      "We Energies reviews new service, upgrades, and distributed-generation interconnection; large manufacturing or electrification loads need early capacity discussions. Milwaukee Water Works provides drinking water, while MMSD provides regional wastewater treatment and has stormwater-management roles alongside City DPW.",
  },
  climateNotes:
    "Milwaukee is in ASHRAE climate zone 6A, with long cold winters, deep frost, snow, Lake Michigan wind and moisture, and humid summers. Lakefront and riverine flood exposure, high groundwater, urban fill, and combined-sewer infrastructure can affect redevelopment and drainage feasibility.",
  marketNotes:
    "Milwaukee construction includes advanced manufacturing, water technology, food and beverage, healthcare, university facilities, downtown adaptive reuse, and harbor or riverfront redevelopment. Industrial legacy sites and historic building stock create recurring needs for environmental due diligence, utility modernization, and existing-structure investigation.",
  narratives: {
    mep:
      "Milwaukee MEP design is driven by a zone 6A heating climate: robust heating capacity, heat recovery, freeze protection, snow-season equipment access, and enclosure coordination are fundamental, while humid summers still need credible dehumidification. SPS 363 provides the statewide commercial energy baseline based on the 2015 IECC, but above-minimum enclosure and controls are often justified by the long heating season. We Energies service capacity and interconnection should be evaluated early for manufacturing, laboratory, and electrified central-plant loads. Milwaukee Water Works and MMSD coordination also affects domestic, process, sanitary, and site utility design, particularly in older industrial buildings where service conditions are uncertain.",
    structural:
      "Milwaukee structural design is a snow, frost, wind, and existing-conditions problem rather than a high-seismic problem. Wisconsin's SPS commercial code provides the framework, but lake-influenced snow and wind, drift at roof steps, uplift, and freeze-thaw durability need site- and geometry-specific analysis. Deep frost, fill, variable glacial soils, groundwater, prior foundations, and river or lake flood conditions support early geotechnical investigation on redevelopment parcels. Historic masonry and heavy industrial buildings also require measured assessment of load paths, roof capacity, corrosion, and equipment anchorage before new uses or rooftop systems are imposed.",
    civil:
      "Milwaukee civil work coordinates City DPW, Milwaukee Water Works, MMSD, and Wisconsin DNR requirements from the first layout. MMSD's stormwater rules and Wisconsin NR 151 performance standards shape runoff reduction, water quality, and infiltration planning, while NR 216 construction-stormwater coverage applies at the state threshold. Cold weather, tight soils, groundwater, old utilities, combined-sewer areas, and constrained urban parcels can limit infiltration and conventional detention. We screen floodplain and outfall conditions, preserve utility and green-infrastructure corridors, and resolve public-right-of-way work early instead of assuming that a downstream connection is available.",
    energy:
      "Milwaukee commercial energy compliance follows SPS 363, Wisconsin's statewide commercial energy code based on the 2015 IECC with state amendments. In zone 6A, air-barrier continuity, continuous insulation, condensation control, high-performance windows, efficient heating, heat recovery, and lighting controls have exceptional operational importance. State minimum compliance is only the starting point for a building with a long heating season, so energy modeling can test envelope and HVAC choices against real manufacturing, laboratory, or tenant loads. We align that analysis with We Energies service strategy and available efficiency-program opportunities without confusing incentives with a code-compliance path.",
  },
  faqs: [
    {
      q: "Which office issues commercial permits in Milwaukee?",
      a: "Milwaukee Department of Neighborhood Services administers building and trade permits through the Development Center. Planning, Fire, Historic Preservation, DPW, water, and MMSD reviews may be required depending on the project.",
    },
    {
      q: "What building and energy codes apply in Milwaukee?",
      a: "Milwaukee enforces Wisconsin's statewide Commercial Building Code in SPS 361–366, based on the 2015 IBC. Commercial energy compliance is under SPS 363, based on the 2015 IECC with Wisconsin amendments.",
    },
    {
      q: "Who coordinates electric, water, and stormwater service?",
      a: "We Energies provides electricity and should review major new loads and interconnection. Milwaukee Water Works provides drinking water; MMSD is central to regional wastewater and stormwater coordination, with City DPW and Wisconsin DNR requirements also affecting site work.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 86, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://city.milwaukee.gov/DNS"],
      codes: ["https://dsps.wi.gov/Pages/Programs/CommercialBuildings/Default.aspx"],
      amendments: ["https://city.milwaukee.gov/dns"],
      utilities: ["https://www.we-energies.com/", "https://city.milwaukee.gov/water"],
      climate: ["https://www.weather.gov/mkx/"],
      market: ["https://www.mmac.org/"],
    },
  },
};