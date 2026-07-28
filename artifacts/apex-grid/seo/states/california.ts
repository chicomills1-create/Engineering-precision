import type { StateData } from "../types";

export const california: StateData = {
  slug: "california",
  name: "California",
  abbrev: "CA",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "2022 California Building Code (Title 24, Part 2)",
    baseCode: "2021 IBC with extensive California amendments",
    notes:
      "California enforces a statewide code through Title 24, published by the Building Standards Commission on a three-year cycle. The 2022 edition is in force statewide, with local jurisdictions permitted to adopt more stringent amendments based on local conditions.",
  },
  energyCode: {
    commercial: "Title 24, Part 6 (2022 California Energy Code)",
    notes:
      "California does not use IECC — it runs its own performance- and prescriptive-based Title 24 Part 6, among the most stringent energy codes in the nation. Compliance is demonstrated through certified software (e.g., approved performance-path tools), not COMcheck.",
    beyondCode:
      "The CALGreen (Title 24, Part 11) mandatory measures apply statewide, and dozens of cities have adopted all-electric or gas-limiting reach codes; benchmarking and building performance ordinances exist in San Francisco, Los Angeles, and beyond.",
  },
  climate: {
    zones: "IECC 3B/3C along the coast, 4B/4C inland, up to 6B–7 in the Sierra; California's own 16 climate zones drive Title 24",
    drivers: [
      "Extreme climate diversity — coastal marine to high desert to alpine",
      "Cooling-dominated Central Valley with 100°F+ summers",
      "Strict all-electric and demand-response utility pressures",
      "Wildfire smoke intrusion driving filtration in the WUI",
    ],
  },
  structural: {
    seismic: "Among the highest seismic demand in the U.S. — SDC D, E, and F common; near-fault sites require special detailing and ASCE 7 site-specific hazard analysis",
    wind: "Basic wind speeds generally 90–110 mph (Risk Category II); wind rarely governs except at exposed coastal and ridgeline sites",
    snow: "Negligible in lowlands; Sierra ground snow loads run from 50 psf to well over 200 psf at elevation and govern mountain roof design",
    other: "Liquefaction, landslide, and fault-rupture zones mapped under the Alquist-Priolo and Seismic Hazards Mapping Acts; expansive soils common statewide",
  },
  licensure: {
    board: "California Board for Professional Engineers, Land Surveyors, and Geologists (BPELSG)",
    notes:
      "California requires additional state-specific exams in seismic principles and engineering surveying for civil PE licensure, and issues separate structural engineer (SE) authority for certain buildings. Electronic seals are accepted; comity is available but not automatic.",
  },
  metros: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno"],
  permitting:
    "California permitting is layered: local building departments enforce Title 24, while CEQA environmental review and coastal, fire, and air-district agencies can add parallel tracks. Plan review timelines vary widely — large coastal cities can run long, while inland jurisdictions and third-party plan-check services move faster.",
  marketNotes:
    "California remains the largest construction market in the country, driven by life sciences and biotech, data centers in the Central Valley, warehouse and logistics in the Inland Empire, and mandated housing and school modernization. Electrification and seismic-resilience mandates are reshaping both new construction and retrofit work.",
  narratives: {
    mep:
      "MEP engineering in California is shaped first by Title 24 Part 6 and the wave of electrification reach codes — many jurisdictions now effectively prohibit new gas infrastructure, so we design heat-pump HVAC and heat-pump water heating as the default rather than the exception. The state's 16 climate zones mean a single design template fails: a coastal San Francisco office leans on economizers and minimal mechanical cooling, while a Fresno or Bakersfield project fights 100°F-plus loads with high-ambient equipment derates. We layer in demand-response controls to manage the utilities' punishing time-of-use and demand charges, and in wildfire-prone areas we specify enhanced filtration and dedicated smoke-event modes. Every mechanical, lighting, and controls decision is documented through certified Title 24 compliance software, and we coordinate early with utilities whose interconnection queues can outlast the design phase itself.",
    structural:
      "Structural engineering in California is a seismic discipline before anything else. Much of the state sits in SDC D, E, or even F, and near-fault sites demand site-specific ground-motion analysis under ASCE 7 rather than simple mapped values. We detail ductile lateral systems — special moment frames, buckling-restrained braces, concrete shear walls — and coordinate with geotechnical engineers on liquefaction, landslide, and Alquist-Priolo fault-rupture zones that can dictate where a building may even be placed. California's building-performance retrofit mandates, from soft-story ordinances to nonstructural anchorage requirements, keep existing-building work as active as new design. In the Sierra, the regime flips: ground snow loads climbing past 200 psf govern roof framing, and we combine high-snow and moderate-seismic demands in the same analysis.",
    civil:
      "Civil and site engineering in California runs headlong into some of the strictest stormwater and environmental regulation in the country. The statewide MS4 permits and regional water board requirements push low-impact development — bioretention, infiltration, and volume capture of the design storm — well beyond simple detention, and CEQA review can gate a project long before grading begins. We design site drainage, water-quality treatment, and utility connections to each municipality's published standards while coordinating with coastal commissions, fire agencies in the wildland-urban interface, and air districts on dust and grading. Post-construction stormwater management plans and SWPPP documentation are effectively mandatory on any meaningful disturbance, so we resolve treatment-basin footprints and infiltration feasibility during preliminary layout to protect developable area.",
    energy:
      "Energy compliance in California means Title 24 Part 6 — a code unlike any other, with no COMcheck and no IECC path. We demonstrate compliance through state-approved performance software, trading off envelope, mechanical, lighting, and increasingly on-site solar and battery storage that the code now requires for many building types. Because the 2022 edition and local reach codes push hard toward all-electric buildings, we treat heat-pump systems and demand-flexible controls as compliance tools, not afterthoughts. CALGreen mandatory measures add water-efficiency, commissioning, and material requirements on top of the energy code. In cooling-dominated inland zones we prioritize low-SHGC glazing and cool roofs, while coastal projects capture credit from natural ventilation and reduced mechanical cooling — the right strategy is entirely climate-zone specific.",
  },
  faqs: [
    {
      q: "Does California use the IECC for commercial energy compliance?",
      a: "No. California runs its own Title 24, Part 6 energy code, which is generally more stringent than the IECC and requires compliance through state-approved software rather than COMcheck. The 2022 edition applies statewide, and many cities layer on all-electric reach codes.",
    },
    {
      q: "What seismic design category applies to California commercial buildings?",
      a: "Most of California falls into Seismic Design Category D, with SDC E and F near major faults. High-seismic detailing and, for near-fault sites, site-specific ground-motion analysis under ASCE 7 are standard, and some projects sit within Alquist-Priolo fault-rupture zones with additional restrictions.",
    },
    {
      q: "Do I need to design an all-electric building in California?",
      a: "Increasingly, yes — many California jurisdictions have adopted reach codes that restrict or prohibit new natural gas infrastructure. Even where gas is allowed, the 2022 Title 24 code strongly favors heat-pump systems, so we typically design electrification-ready or fully electric mechanical systems.",
    },
    {
      q: "How does stormwater regulation affect a California site plan?",
      a: "California's MS4 and regional water board requirements mandate low-impact development — capturing and treating the design storm through infiltration or bioretention rather than simple detention. These treatment areas must be located during preliminary site layout because they consume developable land and interact with CEQA review.",
    },
  ],
};
