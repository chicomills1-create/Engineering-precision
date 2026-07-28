import type { StateData } from "../types";

export const alabama: StateData = {
  slug: "alabama",
  name: "Alabama",
  abbrev: "AL",
  buildingCode: {
    name: "Locally adopted International Building Code (2015 IBC is the state-referenced edition; many jurisdictions on 2015/2018/2021)",
    baseCode: "IBC with local adoption; the state references a base edition but municipalities adopt their own",
    notes:
      "Alabama has no fully mandatory statewide commercial building code for all construction; the state references an IBC edition (the 2015 IBC has been the state baseline), and municipalities adopt and amend their own editions. Coastal Baldwin and Mobile counties enforce stronger wind provisions. The governing edition must be confirmed with the specific AHJ.",
  },
  energyCode: {
    commercial: "2015 IECC has been the state-referenced commercial energy baseline; some jurisdictions enforce more recent editions or ASHRAE 90.1",
    notes:
      "The Alabama Energy and Residential Codes Board has referenced the IECC for commercial construction, with the 2015 IECC as a longstanding baseline. Enforcement is administered locally, so documentation must match the edition the permitting jurisdiction enforces.",
  },
  climate: {
    zones: "2A (hot-humid) on the Gulf Coast, 3A across most of the state, edging toward 4A in the far north",
    drivers: [
      "High humidity and latent cooling loads statewide",
      "Hurricane and tropical-storm exposure on the Gulf Coast",
      "Tornado and severe-storm risk across the interior",
      "Real winter heating loads in the northern counties",
    ],
  },
  structural: {
    seismic: "Low to moderate — generally Seismic Design Category A–B, with modestly elevated hazard in the far north near the eastern Tennessee seismic zone",
    wind: "Hurricane-governed on the coast (Baldwin and Mobile counties) at 130–150+ mph with windborne-debris requirements; ~105–115 mph inland with strong tornado-shelter demand",
    snow: "Low ground snow loads, generally 5 psf or less across most of the state",
    other: "Expansive soils in the Black Belt region and karst/sinkhole conditions in parts of the north drive foundation and geotechnical attention",
  },
  licensure: {
    board: "Alabama Board of Licensure for Professional Engineers and Land Surveyors (BELS)",
    notes: "Alabama offers licensure by comity for NCEES-record engineers and requires a Certificate of Authorization for firms. Electronic seals are accepted per board rules.",
  },
  metros: ["Birmingham", "Huntsville", "Mobile", "Montgomery", "Tuscaloosa", "Auburn"],
  permitting:
    "Permitting is jurisdiction-driven: Huntsville's aerospace-fueled boom and Birmingham's healthcare and commercial core run active plan-review programs, while the Gulf Coast counties enforce robust wind and flood provisions. Coastal projects add FEMA elevation and windstorm detailing, and the governing code edition should be confirmed jurisdiction by jurisdiction.",
  marketNotes:
    "Alabama's construction market is led by Huntsville — one of the fastest-growing metros in the South, anchored by aerospace, defense, and Redstone Arsenal — plus automotive manufacturing statewide, Birmingham's healthcare sector, and Gulf Coast tourism and port activity. Advanced manufacturing and data centers are increasingly prominent.",
  narratives: {
    mep:
      "MEP engineering in Alabama works across a humid climate that stretches from the Gulf Coast's zone 2A to the milder-but-still-humid zone 3A/4A of the north, so dehumidification and moisture control anchor mechanical design nearly everywhere. We size cooling for high latent loads, detail vapor control to prevent condensation, and — in the northern counties — account for genuine winter heating that Gulf-facing designers can overlook. Huntsville's aerospace-and-defense growth means a lot of our work is high-tech, lab, and mission-critical space where clean power, standby generation, and precise environmental control drive the electrical and mechanical scope. On the coast, storm resilience adds elevated electrical rooms and surge-hardened equipment. Because commercial energy adoption is administered locally off a state-referenced IECC baseline, we confirm the enforced edition and document HVAC, lighting, and plumbing accordingly. Across Alabama, humidity management and reliable power tend to be the defining MEP challenges.",
    structural:
      "Alabama structural design pivots on location. The Gulf Coast counties of Mobile and Baldwin enforce hurricane-grade wind — 130–150+ mph with windborne-debris protection — while the interior faces tornado and severe-storm exposure that supports ICC 500 storm-shelter demand for schools and institutional buildings. Seismic is generally low (SDC A–B), though the far north sees a modest bump from eastern-Tennessee seismic influence. Below grade, two regional soil hazards shape foundations: the expansive clays of the Black Belt through central Alabama and the karst/sinkhole conditions in parts of the north, where subsurface voids can dictate deep or grouted foundations. We let the geotechnical report drive the foundation system and set the lateral design by whether a project faces hurricane wind, tornado-shelter requirements, or the low-seismic inland baseline — three distinct starting points within one state.",
    civil:
      "Civil and site engineering in Alabama contends with heavy rainfall, variable soils, and — in the north — karst terrain that can complicate everything from detention siting to utility routing. We design stormwater detention and conveyance to each jurisdiction's local criteria, sized for the region's intense storm events, and integrate FEMA floodplain requirements on affected sites. Sites disturbing an acre or more require ADEM construction stormwater (NPDES) permit coverage and a SWPPP, with erosion control tuned to Alabama's downpour-driven runoff. In the Black Belt, expansive soils affect pavement and utility trench design; in karst areas of the north, we coordinate closely with geotechnical findings to avoid siting infiltration or detention over potential voids. On the Gulf Coast, drainage design accounts for high tailwater and surge. The consistent approach is designing site infrastructure to the specific local manual and subsurface conditions.",
    energy:
      "Commercial energy compliance in Alabama is administered locally off a state-referenced IECC baseline (long anchored on the 2015 IECC), so we confirm the enforced edition before selecting a compliance path, using ASHRAE 90.1 as an alternate where the AHJ accepts it. Across Alabama's humid climate, the highest-value strategies emphasize solar-heat-gain and infiltration control — low-SHGC glazing and tight air-sealing outperform simply adding insulation in the hot-humid south, while the northern counties justify more envelope investment against their real heating loads. For Huntsville's tech and lab facilities, mechanical efficiency and right-sized systems dominate the energy picture. We prepare COMcheck or whole-building energy modeling matched to the enforced edition and coordinate envelope, mechanical, and lighting compliance as one package, with the moisture-control detailing this climate requires.",
  },
  faqs: [
    {
      q: "Does Alabama have a statewide building code?",
      a: "Not a fully mandatory one for all commercial construction. The state references an IBC edition (the 2015 IBC has been the baseline), but municipalities adopt and amend their own editions, and coastal counties enforce stronger wind provisions. We confirm the governing code with the specific jurisdiction.",
    },
    {
      q: "What wind requirements apply on the Alabama Gulf Coast?",
      a: "Baldwin and Mobile counties enforce hurricane-grade design with basic wind speeds of roughly 130–150+ mph and windborne-debris protection. Inland projects design to about 105–115 mph, and many incorporate ICC 500 storm shelters given tornado exposure.",
    },
    {
      q: "Which energy code applies to Alabama commercial projects?",
      a: "Alabama references the IECC for commercial construction, with the 2015 IECC as a longstanding baseline, administered locally. Some jurisdictions enforce more recent editions or accept ASHRAE 90.1. We match COMcheck or energy-model documentation to the enforced edition.",
    },
    {
      q: "How do karst and expansive soils affect Alabama foundations?",
      a: "Both drive geotechnical attention. The Black Belt's expansive clays require foundation systems that manage swell and shrink, while karst/sinkhole conditions in parts of the north can require deep or grouted foundations to bridge subsurface voids — always designed to the project geotechnical report.",
    },
  ],
};
