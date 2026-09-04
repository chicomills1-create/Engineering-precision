import type { CityData } from "../types";

export const sanJose: CityData = {
  slug: "san-jose",
  name: "San Jose",
  stateSlug: "california",
  county: "Santa Clara County",
  ahj: {
    office: "City of San José Department of Planning, Building and Code Enforcement, Building Division",
    process:
      "San José accepts building-permit applications and electronic plans through its SJPermits portal; commercial work is routed through multi-discipline plan review and applicants respond to consolidated correction cycles online. The city also distinguishes projects requiring Planning approval from building-only scopes, so zoning and development-clearance status should be resolved before a full construction submittal.",
  },
  codes: {
    building: "2022 San José Building Code, based on the 2022 California Building Code (2021 IBC) with local amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), with 2022 CALGreen mandatory measures and San José reach-code provisions",
    amendments:
      "San José Municipal Code Title 17 adopts the California codes with local amendments. The city's reach code includes electrification and electric-readiness requirements for covered new construction, while green-building, stormwater, and Bay Area Air Quality Management District requirements can add separate project obligations.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E); San José Water and the City of San José Environmental Services Department are major water and wastewater agencies, depending on service area",
    notes:
      "PG&E reviews new electric service and distributed-generation interconnection, and its service-planning schedule should be confirmed early for large data, lab, and electrified loads. Water service is not citywide under one provider, while the City's Environmental Services Department operates the regional wastewater system and recycled-water program.",
  },
  climateNotes:
    "San José is in the warm-summer Santa Clara Valley (ASHRAE 3B/California climate zone 4): dry summers and cool nights support economizer and night-flush strategies, but heat waves increasingly set peak cooling and electrical-demand conditions. Bay Area seismicity, liquefaction-prone valley soils, and wildfire-smoke events are material design inputs.",
  marketNotes:
    "Silicon Valley demand centers on semiconductor, hardware, R&D, data-intensive office and laboratory fit-outs, alongside multifamily infill around transit and downtown. The city is also advancing major downtown mixed-use and BART-extension-related development, where utility capacity, groundwater, and transportation coordination can govern schedule.",
  narratives: {
    mep:
      "San José MEP work pairs Title 24 performance compliance and the city's electrification reach code with programs that often have unusually high process loads. For lab, hardware, and data-intensive space, we separate process and ventilation loads from base-building assumptions, use the valley's cool nights where economizer operation is appropriate, and provide filtration and smoke-response modes for wildfire events. PG&E service capacity and interconnection are early milestones for large electrified loads; water and sewer coordination must identify the actual serving water agency rather than assuming a single city utility.",
    structural:
      "San José structural design is controlled by the 2022 CBC seismic provisions in a high-seismic Santa Clara Valley setting, not by the area's otherwise benign wind climate. Site-specific geotechnical work is central because alluvial soils can bring liquefaction, settlement, and lateral-spread issues, particularly near waterways, while fault-related hazards remain relevant across the region. Building Division review and special-inspection documentation should be coordinated with the SJPermits submittal, and existing tilt-up, office, and industrial conversions deserve a deliberate lateral-system evaluation before new rooftop or equipment loads are added.",
    civil:
      "Civil design begins with the City's stormwater requirements and the Santa Clara Valley Urban Runoff Pollution Prevention Program framework, which require treatment and, for applicable regulated projects, runoff-flow-control measures. Downtown and transit-area projects must also account for constrained public right-of-way, utility conflicts, and floodplain or groundwater conditions. We reserve space for biotreatment, coordinate sanitary and recycled-water connections with Environmental Services and the serving water provider, and align off-site improvement drawings with the Building Division and Public Works sequence.",
    energy:
      "San José projects use the 2022 California Energy Code and CALGreen, with the city's reach-code electrification and electric-readiness rules checked at concept design rather than appended at permit. Modeling has to reflect the real internal loads of Silicon Valley occupancies; a nominal office model can misstate both compliance and transformer sizing for a lab or equipment-heavy tenant. The dry 3B climate rewards high-performance envelopes, daylighting, controls, and economizer hours, while PG&E rate design and interconnection timing make load flexibility, solar, and storage analysis useful alongside the Title 24 model.",
  },
  faqs: [
    {
      q: "Where are commercial plans submitted in San José?",
      a: "Commercial building applications and electronic plans are submitted through the City of San José Building Division's SJPermits system. The City routes the submittal for multi-discipline review; projects with planning or development-clearance requirements need those land-use issues addressed in parallel or before building permit issuance.",
    },
    {
      q: "Does San José require all-electric construction?",
      a: "San José's locally adopted reach code adds electrification and electric-readiness requirements for covered new construction beyond California's baseline Title 24 rules. Applicability and any exception depend on the occupancy and project scope, so the current Title 17 requirements should be checked before selecting central plant and service concepts.",
    },
    {
      q: "What seismic issues are common on San José sites?",
      a: "San José is a high-seismic CBC jurisdiction, and Santa Clara Valley alluvial soils can create liquefaction, settlement, and lateral-spread concerns. A site-specific geotechnical report informs foundation, lateral, and utility design; seismic review should not be treated as a standard office-buildout detail.",
    },
  ],
};