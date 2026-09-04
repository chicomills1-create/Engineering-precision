import type { CityData } from "../types";

export const oakland: CityData = {
  slug: "oakland",
  name: "Oakland",
  stateSlug: "california",
  county: "Alameda County",
  ahj: {
    office: "City of Oakland Planning & Building Department, Bureau of Building",
    process: "Oakland accepts permit applications and electronic plan sets through its Online Permit Center/Accela system, with coordinated review by building, planning, fire, public works, and environmental reviewers as applicable. Larger, complex, or entitlement-driven proposals benefit from pre-application discussion because zoning, design review, public improvements, and CEQA can run alongside building plan check.",
  },
  codes: {
    building: "2022 Oakland Building Construction Code, based on the 2022 California Building Code (Title 24, Part 2) with Oakland amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), including Oakland's local energy reach-code amendments",
    amendments: "Oakland's 2022 reach code requires most new construction to be all-electric, with limited exceptions, and local green-building provisions supplement statewide CALGreen. The city also has seismic retrofit requirements for certain existing soft-story residential buildings; project teams must use the Oakland code package rather than relying only on statewide Title 24.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E)",
    notes: "PG&E provides electric and gas service and administers new service and distributed-generation interconnection. East Bay Municipal Utility District (EBMUD) supplies water and the City of Oakland operates the sanitary sewer collection system; service upgrades in built-out corridors need early capacity and trenching coordination.",
  },
  climateNotes: "Oakland's bay-influenced climate is mild and dry in summer, but bay fog, salt air, winter rain, and episodic heat and wildfire smoke affect enclosure and MEP decisions. High seismic hazard, liquefaction in Bay-margin fill, landslide-prone hillsides, and sea-level-rise exposure at the estuary and port are core design constraints.",
  marketNotes: "Oakland combines Port of Oakland logistics and industrial facilities, multifamily and mixed-use infill, downtown office repositioning, healthcare, and adaptive reuse of older commercial and warehouse buildings. The city’s all-electric policy and Bay Area seismic, environmental, and utility constraints make early feasibility work more valuable than a generic California template.",
  narratives: {
    mep: "Oakland MEP design begins with the 2022 Title 24 Energy Code and the city's all-electric reach code, so heat-pump HVAC and water heating, electrical distribution, and realistic PG&E service capacity are concept-stage questions. The temperate bay climate supports efficient low-load systems and economizer opportunities, while heat events and wildfire smoke demand cooling resilience, filtration, and controllable outdoor-air modes. We coordinate water demand with EBMUD and model Title 24 in approved software rather than treating COMcheck as a California compliance path.",
    structural: "Oakland is a high-seismic Bay Area jurisdiction: the Hayward Fault is immediately east of the city, and Bay-margin fill can create liquefaction and settlement risk while hillside sites bring landslide and slope-stability issues. The 2022 Oakland Building Construction Code applies California's high-seismic provisions with city amendments, so lateral systems, diaphragm and collector detailing, nonstructural anchorage, and geotechnical recommendations are developed as one package. Existing warehouse and masonry conversion work needs field verification before seismic upgrade scope is assumed.",
    civil: "Oakland civil design has to resolve post-construction stormwater treatment under the city's Stormwater Management Requirements and Alameda Countywide Clean Water Program framework, often on dense parcels with shallow utilities. Bay-margin sites add rising groundwater, tidal flooding, and sea-level-rise considerations; hillside sites instead confront steep grading and erosion control. We reserve LID treatment footprint, coordinate EBMUD water and city sewer connections, and align frontage or right-of-way work with Oakland Public Works before submitting the building package.",
    energy: "Oakland energy compliance is a Title 24 performance or prescriptive exercise using approved California software, augmented by the city's all-electric reach code and CALGreen—not an IECC or COMcheck project. Mild coastal conditions reward envelope, glazing, lighting, heat-pump, and controls trade-offs, but the electrical design must accommodate electric space and water heating and PG&E service realities. We also separate permit compliance from Oakland's Building Energy Benchmarking Ordinance obligations for covered existing commercial and multifamily buildings.",
  },
  faqs: [
    { q: "Does Oakland require all-electric new commercial buildings?", a: "Oakland's local energy reach code requires most new construction to be all-electric, with limited exceptions. That makes heat-pump HVAC and water heating, electrical capacity, and PG&E service planning early design decisions in addition to meeting the 2022 California Energy Code." },
    { q: "What makes structural design in Oakland different?", a: "Oakland sits beside the Hayward Fault in a high-seismic region. Bay-margin fill can be liquefiable and settlement-prone, while Oakland Hills sites can have slope-stability issues; the lateral system, foundations, and geotechnical recommendations must therefore be coordinated early under the 2022 Oakland Building Construction Code." },
    { q: "Which utilities serve Oakland projects?", a: "PG&E provides electric and gas service and handles interconnection, EBMUD provides water, and the City of Oakland operates the sanitary sewer collection system. Capacity, service upgrades, and congested street utility work should be checked early, especially for all-electric projects." },
  ],
};