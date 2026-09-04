import type { CityData } from "../types";

export const longBeach: CityData = {
  slug: "long-beach",
  name: "Long Beach",
  stateSlug: "california",
  county: "Los Angeles County",
  ahj: {
    office: "City of Long Beach Development Services Department, Building and Safety Bureau",
    process:
      "Long Beach Development Services accepts permit applications and plan-review materials through its online LBDS portal and routes commercial plans among Building and Safety, Planning, Fire, Public Works, and other reviewers. Project scope determines whether the work can use a streamlined permit path or requires full plan check; coastal, port-adjacent, and historic sites can add agency approvals before permit issuance.",
  },
  codes: {
    building: "2022 Long Beach Building Code, based on the 2022 California Building Code (2021 IBC) with City of Long Beach amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), enforced with 2022 CALGreen mandatory measures and local green-building provisions",
    amendments:
      "Long Beach Municipal Code Title 18 adopts the California codes with local amendments. Coastal-zone, seismic, grading, floodplain, and local green-building provisions can be site-specific additions; port-related facilities may also face separate fire, harbor, air-quality, and public-works requirements.",
  },
  utilities: {
    electric: "Southern California Edison (SCE); Long Beach Utilities Department provides municipal natural gas and water service, with sewer service managed by City Public Works",
    notes:
      "SCE handles electric service design and distributed-energy interconnection, while the City separately operates gas and water utilities—an important split for central-plant conversions and new all-electric capacity. Large waterfront, industrial, and multifamily projects should verify utility corridors, capacity, and transformer lead times early.",
  },
  climateNotes:
    "Long Beach has a mild marine ASHRAE 3B climate, but ocean exposure brings salt-air corrosion, coastal humidity, and wind-driven weather. The city remains a high-seismic Los Angeles Basin jurisdiction; liquefaction, coastal flooding/sea-level rise, and petroleum-field subsidence history warrant parcel-specific geotechnical and civil screening.",
  marketNotes:
    "Long Beach's market combines Port of Long Beach logistics and industrial facilities with healthcare, higher education, multifamily infill, hospitality, and adaptive reuse. Waterfront and port-adjacent work layers heavy vehicle circulation, air-quality, utility, and resilience issues onto the standard Southern California permit process.",
  narratives: {
    mep:
      "Long Beach MEP design uses the mild marine climate for efficient heat-pump, economizer, and load-management strategies, while protecting outdoor equipment and electrical gear from salt-laden air. Port logistics, cold storage, hospitality, healthcare, and multifamily programs have very different ventilation and power profiles, so generic coastal-office assumptions are not adequate. SCE owns the electric-service and interconnection path, whereas Long Beach Utilities supplies gas and water; that split is essential when evaluating electrification, domestic hot water, and transformer capacity.",
    structural:
      "Long Beach structural work follows the 2022 CBC seismic provisions in the seismically active Los Angeles Basin, with geotechnical investigation setting the foundation and lateral-design basis. Near the coast and on historic fills, liquefaction, settlement, groundwater, and potential lateral spreading can govern as much as the superstructure. Existing industrial, waterfront, and adaptive-reuse buildings require a clear assessment of diaphragms, collector paths, and equipment anchorage, and Building and Safety plan review should be paired with the required special-inspection program.",
    civil:
      "Civil design in Long Beach must fit stormwater treatment, access, and utility work into tightly developed coastal and industrial parcels. We screen FEMA flood information, coastal exposure, sea-level-rise planning, and geotechnical groundwater conditions before locking finished floors or below-grade spaces, then coordinate stormwater and public-right-of-way work with City departments. At port-adjacent sites, truck movements, fire access, drainage, and utility corridors require early layout discipline; water is coordinated with Long Beach Utilities and sanitary service with the City's sewer system.",
    energy:
      "Long Beach commercial energy compliance is based on 2022 Title 24 and CALGreen, with local provisions checked against the exact project scope. The temperate coastal climate generally shifts emphasis from peak cooling to envelope, glazing, ventilation, domestic hot water, controls, and corrosion-resilient equipment, though warehouses and port-related operations can have large process loads. We model actual schedules, coordinate solar/storage and EV capacity with SCE interconnection, and account for the City's separate gas utility when comparing all-electric and mixed-fuel retrofit options.",
  },
  faqs: [
    {
      q: "Which agency issues building permits in Long Beach?",
      a: "The City of Long Beach Development Services Department, Building and Safety Bureau administers building permits and plan review through the City's LBDS online process. Depending on scope, Planning, Fire, Public Works, and coastal or harbor agencies may review the project as well.",
    },
    {
      q: "Who supplies electricity, gas, and water in Long Beach?",
      a: "Southern California Edison provides electricity. The City of Long Beach Utilities Department provides municipal natural gas and water, while City Public Works manages sewer service. That divided utility responsibility should be mapped early for a major service upgrade or electrification project.",
    },
    {
      q: "What hazards should a Long Beach building site evaluate?",
      a: "Long Beach is a high-seismic California jurisdiction, and some coastal or fill sites also have liquefaction, high groundwater, coastal-flood, and sea-level-rise considerations. A site-specific geotechnical report and flood/coastal screening guide foundation, finished-floor, drainage, and critical-equipment design.",
    },
  ],
};