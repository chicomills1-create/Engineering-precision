import type { StateData } from "../types";

export const newMexico: StateData = {
  slug: "new-mexico",
  name: "New Mexico",
  abbrev: "NM",
  buildingCode: {
    name: "New Mexico Commercial Building Code (state-adopted IBC with New Mexico amendments)",
    baseCode: "2021 IBC with New Mexico amendments (2015 IBC base in some prior cycles)",
    notes:
      "New Mexico enforces a statewide code through the Construction Industries Division (CID) of the Regulation and Licensing Department, with certified home-rule municipalities such as Albuquerque and Santa Fe administering their own code enforcement under the state framework. The governing edition should be confirmed with CID or the certified local jurisdiction.",
  },
  energyCode: {
    commercial: "2021 IECC-based New Mexico Energy Conservation Code (statewide, with amendments)",
    notes:
      "New Mexico adopts a statewide energy code administered by CID, historically among the more progressive in the region. Certified municipalities may enforce locally; COMcheck documentation should target the adopted edition and New Mexico amendments.",
    beyondCode: "New Mexico's climate goals and PNM commercial efficiency programs incentivize above-code performance; Santa Fe has pursued its own sustainability initiatives.",
  },
  climate: {
    zones: "3B–4B across the desert south and central corridor (Las Cruces, Albuquerque); 5B in the northern mountains and higher elevations around Santa Fe/Taos",
    drivers: [
      "Hot-dry summers with intense solar radiation",
      "Very low humidity favoring evaporative cooling statewide",
      "High-elevation heating loads in the north",
      "Large diurnal temperature swings enabling economizer and night-flush cooling",
    ],
  },
  structural: {
    seismic: "Moderate — SDC C common in the central Rio Grande rift corridor; the Socorro-Albuquerque area has notable seismicity relative to the surrounding region",
    wind: "Basic wind speeds generally 105–115 mph (Risk Category II); open high-desert exposure drives gust attention",
    snow: "Negligible in the desert south; northern mountain ground snow loads climb with elevation and govern roofs around Santa Fe, Taos, and the Sangre de Cristos",
    other: "Expansive and collapsible soils in parts of the Rio Grande valley; caliche and arroyo flash-flood hazards affect siting",
  },
  licensure: {
    board: "New Mexico Board of Licensure for Professional Engineers and Professional Surveyors",
    notes: "New Mexico offers comity licensure for qualified NCEES-record engineers and accepts electronic seals for digital plan submittals.",
  },
  metros: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell", "Farmington"],
  permitting:
    "New Mexico permitting runs through the state Construction Industries Division except in certified home-rule jurisdictions like Albuquerque, Bernalillo County, and Santa Fe that administer their own enforcement. Arroyo flash-flood hydrology and AMAFCA (Albuquerque Metropolitan Arroyo Flood Control Authority) criteria shape site drainage in the metro, and terrain drives site design in the north.",
  marketNotes:
    "New Mexico's construction market is driven by federal research and defense (Sandia and Los Alamos national labs, Kirtland and Holloman), a fast-growing film and studio sector, data centers around Los Lunas, and healthcare and higher-education work. Renewable-energy investment and southern-tier logistics near the border add to steady engineering demand.",
  narratives: {
    mep:
      "MEP design across New Mexico takes full advantage of the state's defining climate trait — extremely low humidity — which makes evaporative and indirect-evaporative cooling genuinely competitive with conventional refrigeration on many building types, cutting both energy and peak demand. In the hot-dry desert south and central corridor we design to intense solar and high summer design temperatures, while the northern mountains around Santa Fe and Taos carry real heating loads at elevation, and we apply altitude corrections to combustion and equipment capacity there. Large diurnal swings statewide support economizer and night-flush strategies. We document mechanical, lighting, and controls compliance to New Mexico's statewide energy code administered by CID, coordinate with PNM on commercial efficiency incentives, and design electrical services that increasingly serve the data-center and studio growth around Albuquerque and Los Lunas.",
    structural:
      "Structural engineering in New Mexico centers on the Rio Grande rift, which gives the central corridor around Albuquerque and Socorro moderate seismicity — commonly SDC C — higher than casual assumptions about the desert Southwest would suggest, so we detail lateral systems accordingly. Foundation design frequently contends with expansive and collapsible soils and hard caliche layers in the Rio Grande valley, with mitigation driven by the geotechnical report. Wind on open high-desert sites and northern-mountain snow loads that grow with elevation round out the load picture; roofs around Santa Fe, Taos, and the Sangre de Cristos are snow-governed while the desert south is not. Because New Mexico adopts a statewide code with certified local enforcement, we confirm the governing IBC edition with CID or the home-rule jurisdiction and detail to the actual site loads.",
    civil:
      "Civil engineering in New Mexico is dominated by arroyo hydrology: intense, short-duration desert storms produce flash flooding through arroyos and dry washes, so in the Albuquerque metro we design to AMAFCA criteria and elsewhere to CID and local standards, resolving detention, conveyance, and floodplain compliance early. Water scarcity and the low-infiltration desert soils shape grading and drainage strategy, and dust and erosion control matter on any meaningful disturbance. We design detention facilities, storm-drain systems, utility connections, and ADA-compliant grading to each jurisdiction's published standards, and manage SWPPP documentation under the construction stormwater permit. In the mountainous north, steep terrain and seasonal snowmelt change the drainage calculus, so we tailor the approach to the specific regional hydrology.",
    energy:
      "New Mexico adopts a statewide energy code administered by CID, historically among the more progressive in the Mountain West and now based on a recent IECC edition with state amendments. We run COMcheck against the adopted edition and New Mexico amendments, choosing the compliance path that best fits the project. In the state's hot-dry, high-solar climate zones, the biggest levers are envelope and glazing — low-SHGC glass and cool roofs — combined with the efficient evaporative and economizer cooling the dry climate rewards. Northern high-elevation projects shift emphasis toward envelope insulation and efficient heating. We help clients pair compliance with PNM commercial efficiency incentives and evaluate on-site solar, which the state's abundant sunshine makes especially productive.",
  },
  faqs: [
    {
      q: "Does New Mexico have a statewide building code?",
      a: "Yes. New Mexico enforces a statewide code through the Construction Industries Division, based on a recent IBC edition with state amendments. Certified home-rule jurisdictions like Albuquerque and Santa Fe administer their own enforcement under that framework, so we confirm the governing edition with CID or the local jurisdiction.",
    },
    {
      q: "What energy code applies to commercial buildings in New Mexico?",
      a: "New Mexico adopts a statewide energy conservation code based on a recent IECC edition with amendments, administered by CID and historically progressive for the region. We document compliance with COMcheck against the adopted edition, and can pair the design with PNM commercial efficiency incentives.",
    },
    {
      q: "Is seismic design a factor in New Mexico?",
      a: "Yes, more than many expect. The central Rio Grande rift corridor around Albuquerque and Socorro carries moderate seismicity, commonly Seismic Design Category C, so lateral detailing must reflect real seismic demand rather than treating the desert as seismically inactive.",
    },
    {
      q: "How does stormwater design work in the Albuquerque area?",
      a: "Site drainage in the metro must comply with AMAFCA (Albuquerque Metropolitan Arroyo Flood Control Authority) criteria, which address the region's flash-flood arroyo hydrology through detention, conveyance, and floodplain rules. These facilities should be sized during preliminary site layout, with erosion and dust control on earth-disturbing work.",
    },
  ],
};
