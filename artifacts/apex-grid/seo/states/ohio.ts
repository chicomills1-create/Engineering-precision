import type { StateData } from "../types";

export const ohio: StateData = {
  slug: "ohio",
  name: "Ohio",
  abbrev: "OH",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Ohio Building Code (OBC) — 2024 edition based on the 2021 IBC",
    baseCode: "2021 IBC with Ohio amendments",
    notes:
      "Ohio enforces a statewide, mandatory commercial building code administered by the Board of Building Standards; local jurisdictions and certified building departments enforce it uniformly. One- through three-family dwellings fall under the separate Residential Code of Ohio, so commercial and mixed-use work is governed by the OBC.",
  },
  energyCode: {
    commercial: "2021 IECC (as incorporated into the Ohio Building Code, with ASHRAE 90.1 as an alternate compliance path)",
    notes:
      "Because energy provisions are folded into the statewide OBC, commercial energy compliance is uniform across Ohio jurisdictions — no city-by-city guessing. Projects may comply via the IECC prescriptive/performance paths or ASHRAE 90.1.",
  },
  climate: {
    zones: "5A (cold-humid) across most of the state; the northern lakeshore and higher elevations trend colder within 5A",
    drivers: [
      "Cold, humid winters demanding robust envelope and heating design",
      "Lake-effect snow and moisture along the northern tier",
      "Significant heating-degree-days favoring high-efficiency boilers and heat pumps",
      "Humid summers requiring careful dehumidification and condensation control",
    ],
  },
  structural: {
    seismic: "Predominantly Seismic Design Category A–B statewide; slightly elevated near the Lake Erie/Anna seismic zone in western Ohio, but rarely governing",
    wind: "Basic wind speeds generally around 105–115 mph (Risk Category II); occasional derecho and tornado exposure informs roof and connection detailing",
    snow: "Ground snow loads commonly 20–25 psf in central/southern Ohio, rising along the snowbelt near Cleveland and Ashtabula",
    other: "Frost depths of roughly 30–36 inches drive footing depth; expansive clays and high water tables appear in parts of the state",
  },
  licensure: {
    board: "Ohio State Board of Registration for Professional Engineers and Surveyors",
    notes: "Ohio offers licensure by comity for engineers with an NCEES record; digital signatures and electronic seals are accepted for plan submittals when they meet board rules.",
  },
  metros: ["Columbus", "Cleveland", "Cincinnati", "Dayton", "Toledo", "Akron"],
  permitting:
    "Ohio's certified local building departments enforce the OBC, but a state-level Industrial Compliance division reviews certain projects and plan approvals. Larger cities like Columbus and Cincinnati run structured commercial plan review; the statewide code baseline keeps requirements consistent even as review timelines vary by department.",
  marketNotes:
    "Central Ohio is one of the Midwest's hottest development corridors, anchored by large semiconductor and data-center investment east of Columbus, along with warehouse and advanced-manufacturing growth. Healthcare, higher-education, and logistics construction remain steady across the Cleveland, Cincinnati, and Dayton metros.",
  narratives: {
    mep:
      "Ohio's climate zone 5A puts winter heating and shoulder-season humidity control at the center of every mechanical design we deliver. Heating-degree-days are high, so we weigh condensing boilers, VRF, and cold-climate heat pumps against demand-charge structures from utilities like AEP Ohio and Duke Energy, and we design dehumidification that keeps humid Ohio summers from becoming a mold and comfort problem. Because energy requirements live inside the statewide Ohio Building Code, our compliance documentation is consistent across jurisdictions — a real advantage over home-rule states. On the electrical side, the data-center and semiconductor buildout east of Columbus has raised the bar on service capacity, redundancy, and coordination with the utility, and we size distribution and standby systems with that growth trajectory in mind. Plumbing and gas design follow the OBC-referenced standards, with freeze protection detailed for exposed piping given Ohio's 30-plus-inch frost depths.",
    structural:
      "Structural engineering in Ohio is a gravity-and-envelope story more than a seismic one: most of the state sits in Seismic Design Category A or B, though the Anna–western Ohio seismic zone earns a closer look for essential facilities. What governs day to day is snow and frost. Ground snow loads climb sharply in the Cleveland–Ashtabula snowbelt, where lake-effect accumulation and drifting drive roof framing, and we detail footings below the roughly 30-to-36-inch frost line to prevent heave. Wind speeds around 105–115 mph are routine, but Ohio's exposure to derechos and tornadoes makes us disciplined about uplift resistance and continuous load paths. Foundations frequently contend with soft lacustrine clays near the lake and expansive soils elsewhere, so we coordinate closely with the geotechnical report. All of this is designed to the statewide OBC built on the 2021 IBC, which keeps the load basis uniform from Toledo to Cincinnati.",
    civil:
      "Site engineering in Ohio runs through the state's stormwater and EPA framework. Construction sites disturbing one or more acres require coverage under the Ohio EPA Construction General Permit, with a SWPPP and post-construction water-quality practices, and many municipal MS4 communities layer their own detention and water-quality volume requirements on top. We design detention basins, bioretention, and conveyance to meet both the municipal criteria and the state permit, and we plan grading around Ohio's freeze-thaw cycles and often-flat, poorly draining clay soils. Frost, high groundwater, and combined-sewer constraints in older cities like Cleveland and Columbus shape utility routing and detention strategy, so we resolve outfall and connection points early. Erosion and sediment control is not an afterthought in Ohio's rainy climate — we document it thoroughly to keep inspections and agency reviews on schedule.",
    energy:
      "Ohio makes energy compliance refreshingly predictable: the energy provisions are embedded in the statewide Ohio Building Code based on the 2021 IECC, so we design to a single known baseline rather than chasing local adoptions. We document compliance through the IECC prescriptive or performance path, or via ASHRAE 90.1 where it better fits a project, and run COMcheck or full energy models accordingly. In climate zone 5A, the highest-leverage moves are envelope-driven — continuous insulation, air-barrier continuity, and controlling infiltration matter more here than in mild climates because heating loads dominate. We pair that envelope discipline with efficient heating plants and daylight-and-occupancy lighting controls, and we look for utility incentive programs that can offset the cost of exceeding code on Ohio's high-heating-load buildings.",
  },
  faqs: [
    {
      q: "Which building code applies to commercial projects in Ohio?",
      a: "The Ohio Building Code, currently the 2024 edition based on the 2021 IBC, applies statewide to commercial and multi-family construction. Enforcement is handled by certified local building departments and the state's Industrial Compliance division, but the code baseline is uniform across Ohio.",
    },
    {
      q: "How is commercial energy code compliance handled in Ohio?",
      a: "Energy requirements are incorporated into the statewide Ohio Building Code based on the 2021 IECC, with ASHRAE 90.1 available as an alternate path. We document compliance with COMcheck or energy modeling, focusing on envelope continuity and efficient heating since Ohio sits in cold climate zone 5A.",
    },
    {
      q: "What structural loads govern design in Ohio?",
      a: "Snow and frost usually govern. Ground snow loads rise in the Cleveland-area snowbelt, and footings are set below the roughly 30-to-36-inch frost depth. Seismic demand is low (mostly SDC A–B), and wind speeds around 105–115 mph plus derecho/tornado exposure drive uplift detailing.",
    },
    {
      q: "What stormwater rules apply to Ohio site development?",
      a: "Sites disturbing an acre or more need coverage under the Ohio EPA Construction General Permit with a SWPPP and post-construction water-quality controls. Many MS4 municipalities add their own detention and water-quality volume requirements, so we design to both the state permit and local criteria.",
    },
  ],
};
