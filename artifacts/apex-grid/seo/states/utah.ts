import type { StateData } from "../types";

export const utah: StateData = {
  slug: "utah",
  name: "Utah",
  abbrev: "UT",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "State-adopted International Building Code (2021 IBC with Utah amendments)",
    baseCode: "2021 IBC with statewide Utah amendments",
    notes:
      "Utah adopts a statewide building code through the Uniform Building Code Commission and the legislature, so the base edition is consistent across jurisdictions. Local governments have limited amendment authority, giving Utah a more uniform code landscape than most Mountain West states.",
  },
  energyCode: {
    commercial: "2021 IECC / ASHRAE 90.1-2019 (as amended by the state)",
    notes:
      "Utah adopts the commercial energy provisions statewide with legislative amendments; the ASHRAE 90.1 path is available as an alternative to the IECC. COMcheck documentation should confirm the exact adopted edition and Utah amendments.",
    beyondCode: "Utility programs from Rocky Mountain Power (wattsmart) provide commercial incentives for above-code efficiency; Salt Lake City has pursued municipal sustainability and benchmarking initiatives.",
  },
  climate: {
    zones: "5B across the Wasatch Front (Salt Lake City, Provo, Ogden); 6B in the mountains and 3B–4B in the southern desert around St. George",
    drivers: [
      "Cold winters with significant heating loads on the Wasatch Front",
      "Hot-dry summers with large diurnal swings",
      "Wintertime inversions and air-quality pressure affecting ventilation strategy",
      "Southern Utah desert cooling loads around St. George",
    ],
  },
  structural: {
    seismic: "High along the Wasatch Fault — SDC D common across the populous Wasatch Front, with essential-facility scrutiny and unreinforced-masonry retrofit concerns",
    wind: "Basic wind speeds generally 105–115 mph (Risk Category II); canyon-mouth and exposed sites see higher local gusts",
    snow: "Substantial — valley floor ground snow loads and steep mountain-town loads that can exceed 100+ psf govern roof design at elevation",
    other: "Collapsible and expansive soils, plus liquefaction potential in Wasatch Front valley sediments near Great Salt Lake",
  },
  licensure: {
    board: "Utah Division of Professional Licensing (DOPL) — Professional Engineers and Land Surveyors Board",
    notes: "Utah offers licensure by endorsement for qualified out-of-state PEs and accepts electronic seals for digital plan submittals.",
  },
  metros: ["Salt Lake City", "Provo", "Ogden", "West Valley City", "Lehi", "St. George"],
  permitting:
    "Wasatch Front cities along the fast-growing Silicon Slopes corridor (Lehi, Draper, Salt Lake City) run active but generally efficient plan review, with seismic and geotechnical documentation expected. Local drainage and grading standards, plus Utah's water-scarcity focus, shape site permitting; St. George and Washington County govern the rapidly growing southern market.",
  marketNotes:
    "Utah is one of the fastest-growing states in the country, led by the Silicon Slopes tech corridor between Salt Lake City and Provo, major data-center and warehouse development, and healthcare and higher-education expansion. Sustained population growth and industrial investment keep MEP, structural, and civil demand elevated across the Wasatch Front.",
  narratives: {
    mep:
      "MEP engineering in Utah must balance cold Wasatch Front winters against hot-dry summers, so our mechanical systems handle real heating loads and freeze protection while still managing large summer cooling and wide diurnal swings. Wintertime valley inversions and Utah's persistent air-quality concerns push us toward high-efficiency, low-emission heating and careful outdoor-air strategies, while the dry climate opens the door to economizer operation for much of the shoulder season. On the growing Silicon Slopes campuses and data-center projects, electrical service capacity and redundancy dominate, and we coordinate early with Rocky Mountain Power whose wattsmart incentives reward right-sized, efficient designs. Southern Utah projects around St. George flip the priority to desert cooling. Across the state we document mechanical and lighting compliance to Utah's statewide-adopted energy code, using the ASHRAE 90.1 or IECC path as the project warrants.",
    structural:
      "Utah structural engineering is defined by the Wasatch Fault: the populous Wasatch Front sits in Seismic Design Category D, and we detail ductile lateral systems while coordinating with geotechnical engineers on liquefaction potential in the soft valley sediments near Great Salt Lake. Unreinforced-masonry buildings across older downtowns keep seismic retrofit work active. Snow is the other governing load — valley loads are meaningful and mountain-town roofs at ski-resort elevations can carry well over 100 psf, so we combine high snow with moderate-to-high seismic demand in the same analysis. Because Utah adopts a statewide code, the governing IBC edition is consistent, which lets us standardize detailing, but collapsible and expansive soils still require foundation systems driven by the project geotechnical report.",
    civil:
      "Civil and site engineering in Utah is increasingly shaped by water scarcity and rapid Wasatch Front growth. Municipal drainage standards require detention and water-quality treatment, and secondary (irrigation) water systems common along the Wasatch Front add a layer of utility coordination unfamiliar to out-of-state teams. Snowmelt and canyon-mouth flows create seasonal hydrology that must be captured in grading and storm-drain design. We design site grading, detention basins, utility connections, and ADA-compliant paving to each city's published standards, and coordinate erosion control and SWPPP documentation for the state's construction stormwater permit. In the booming southern desert around St. George, flash-flood hydrology and steep terrain change the drainage calculus entirely, so we tailor stormwater strategy to the specific regional conditions.",
    energy:
      "Utah's statewide energy provisions deliver a more uniform baseline than most of the Mountain West, and they let a project comply through either the IECC or the ASHRAE 90.1 path as the legislature has amended them. Compliance documentation runs through COMcheck tied to the specific adopted edition and Utah's amendments, and we select whichever route — prescriptive, trade-off, or full performance modeling — gives the project the most headroom. Across the state's cold, dry zones, the strongest returns come from a tight, well-insulated envelope and high-performance glazing that blunt the long heating season, backed by condensing or heat-pump heating and exhaust-air heat recovery. Where the numbers support it, we thread in Rocky Mountain Power's wattsmart commercial rebates so the added envelope and equipment cost is offset by incentives on top of the lower annual energy bill.",
  },
  faqs: [
    {
      q: "Does Utah have a statewide building code?",
      a: "Yes. Utah adopts a statewide code through the Uniform Building Code Commission and legislature, currently based on the 2021 IBC with Utah amendments, with only limited local amendment authority. This makes the governing edition more consistent across jurisdictions than in most neighboring states.",
    },
    {
      q: "What energy code applies to commercial buildings in Utah?",
      a: "Utah adopts commercial energy provisions statewide (the IECC with an ASHRAE 90.1 alternative path, as amended). We document compliance with COMcheck against the exact adopted edition and choose the prescriptive, trade-off, or performance path that best suits the project.",
    },
    {
      q: "How significant is seismic design in Utah?",
      a: "Very significant along the Wasatch Front, which sits astride the Wasatch Fault in Seismic Design Category D. High-seismic detailing, liquefaction evaluation in valley sediments, and unreinforced-masonry retrofit concerns are all routine parts of structural design there.",
    },
    {
      q: "What snow loads should I expect for a Utah project?",
      a: "It depends heavily on elevation. Wasatch Front valley floors carry meaningful ground snow loads, while mountain and ski-town sites can exceed 100 psf and govern roof framing. We use the jurisdiction's adopted ground snow load and combine it with seismic demand in the structural analysis.",
    },
  ],
};
