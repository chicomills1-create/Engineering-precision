import type { CityData } from "../types";

export const providence: CityData = {
  slug: "providence",
  name: "Providence",
  stateSlug: "rhode-island",
  county: "Providence County",
  ahj: {
    office: "City of Providence Department of Inspections and Standards",
    process:
      "The Department of Inspections and Standards administers building and trade permits and inspections for Providence, with permit applications handled through the City’s online permitting services. Commercial projects can require building, fire, zoning, historic-district, utility, site, and public-right-of-way review, while waterfront work may also trigger state coastal approvals.",
  },
  codes: {
    building: "Rhode Island State Building Code SBC-1, based on the 2018 IBC with Rhode Island amendments",
    energy: "Rhode Island Energy Code SBC-8, based on the 2018 IECC and ASHRAE 90.1-2016",
    amendments:
      "Providence enforces Rhode Island’s uniform statewide code, while City zoning, historic-district, development, sewer, and right-of-way requirements affect the local approval path. Local requirements do not replace SBC-1; they must be coordinated alongside it, particularly in dense downtown and waterfront areas.",
  },
  utilities: {
    electric: "Rhode Island Energy provides electric distribution service in Providence",
    notes:
      "Rhode Island Energy should be engaged for new service, upgrades, and distributed-generation interconnection, especially where electrification changes demand. Providence Water provides drinking water, and the Narragansett Bay Commission provides wastewater service in Providence; City drainage and public-way work need parallel coordination.",
  },
  climateNotes:
    "Providence is a 5A cold-humid, Narragansett Bay city with cold winters, humid summers, nor’easter wind and rain, and coastal flood exposure. Bay-margin fill and organic soils, high groundwater, the Providence River floodplain, and salt-air corrosion can materially affect foundations, site drainage, and equipment durability.",
  marketNotes:
    "Providence construction includes healthcare and university work around Brown, RISD, and nearby institutional campuses; life-science growth; multifamily and downtown adaptive reuse; and redevelopment of former industrial land. The city’s dense older building stock and waterfront setting frequently put historic, utility, flood-resilience, and brownfield issues on the same project.",
  narratives: {
    mep:
      "Providence MEP design combines cold-humid 5A heating and dehumidification needs with a marine environment that affects equipment location and durability. Heat recovery, freeze protection, envelope coordination, humidity control, and corrosion-resistant selections are important for both new construction and older masonry or mill conversions. Rhode Island Energy service and interconnection discussions should begin before major electrification, laboratory, healthcare, or resilience loads are fixed. SBC-8 supplies the commercial energy path, while Providence Water and Narragansett Bay Commission connections require plumbing, fire-protection, and civil decisions to move together in constrained urban projects.",
    structural:
      "Providence structural design must address coastal wind, flood exposure, moderate seismicity, snow, frost, and challenging bay-margin soils in the actual site context. Where FEMA mapping identifies flood hazard, elevation, foundation, flood-damage-resistant-material, and equipment-support decisions cannot be deferred; soft fill, organic soils, and groundwater may require settlement and foundation solutions beyond a conventional spread footing. The statewide SBC-1 provides the code baseline, but older mill, masonry, and heavy-timber buildings need measured existing-condition investigation before new occupancies or rooftop loads are imposed. Salt-air exposure also informs connection and exterior-support durability near the bay.",
    civil:
      "Providence civil work starts with tight urban parcels, Narragansett Bay watershed conditions, and the overlap of City, state, and utility reviews. RIDEM administers construction stormwater requirements, and the Rhode Island Stormwater Design and Installation Standards Manual emphasizes runoff reduction, treatment, and low-impact development; coastal work can also require CRMC review. High groundwater, fill, constrained sewer capacity, and flood elevation can limit conventional infiltration and make underground detention, overflow routing, and utility sequencing central to feasibility. We coordinate Providence Water, Narragansett Bay Commission, City public-way requirements, and any coastal or wetlands review before finalizing grades and building placement.",
    energy:
      "Providence commercial energy compliance follows Rhode Island SBC-8, based on the 2018 IECC and ASHRAE 90.1-2016. A cold-humid coastal climate puts high value on air-barrier continuity, continuous insulation, moisture-aware renovation of older walls, efficient heating, heat recovery, and controlled outside air. For institutions, laboratories, multifamily, and adaptive reuse, we model the interaction of envelope, ventilation, lighting, controls, and electrified equipment rather than pursuing isolated trade credits. Rhode Island Energy efficiency offerings may inform above-code choices, but utility service capacity and salt-air equipment durability should be tested with the energy strategy.",
  },
  faqs: [
    {
      q: "Who administers commercial permits in Providence?",
      a: "Providence’s Department of Inspections and Standards administers building and trade permits. A project may also require fire, zoning, historic-district, utility, site, and right-of-way approvals, and waterfront work can add CRMC or other state review.",
    },
    {
      q: "Which codes apply to Providence commercial projects?",
      a: "Providence uses Rhode Island’s statewide SBC-1 building code, based on the 2018 IBC with state amendments, and SBC-8 energy code, based on the 2018 IECC and ASHRAE 90.1-2016. City development requirements are additional local approval requirements.",
    },
    {
      q: "Which utilities and hazards affect Providence projects?",
      a: "Rhode Island Energy provides electric service, Providence Water provides water, and the Narragansett Bay Commission provides wastewater service. Bay flooding, wind, groundwater, fill or organic soils, salt air, and dense utility conditions should be evaluated early.",
    },
  ],
};