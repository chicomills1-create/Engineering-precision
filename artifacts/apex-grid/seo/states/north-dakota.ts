import type { StateData } from "../types";

export const northDakota: StateData = {
  slug: "north-dakota",
  name: "North Dakota",
  abbrev: "ND",
  buildingCode: {
    name: "North Dakota State Building Code, based on the 2018 IBC",
    baseCode: "2018 IBC with North Dakota amendments",
    notes:
      "North Dakota adopts a statewide State Building Code (built on the 2018 IBC) that sets the baseline, but enforcement authority rests with local jurisdictions — and not every rural county or township maintains an active building-permit office. Cities such as Fargo, Bismarck, and Grand Forks run full building departments, while some rural areas administer little local enforcement, so the AHJ and effective edition should be confirmed per project.",
  },
  energyCode: {
    commercial:
      "2018 IECC (as adopted within the State Building Code), with ASHRAE 90.1-2016 available as the referenced alternate for commercial buildings",
    notes:
      "Energy provisions accompany the State Building Code and apply where that code is locally enforced. In jurisdictions without active enforcement, energy compliance is often driven by lender, federal, or utility program requirements rather than a local permit.",
  },
  climate: {
    zones: "6A across most of the state, edging into 7 (very cold) in the far north — one of the coldest design climates in the lower 48",
    drivers: [
      "Extreme cold with design temperatures well below 0°F",
      "Very high heating loads and freeze protection throughout",
      "Deep frost penetration driving foundation depth",
      "High wind on open prairie combining with cold for severe wind-chill and drifting snow",
    ],
  },
  structural: {
    seismic:
      "Seismic Design Category A across essentially the entire state — seismic rarely governs; gravity, snow, and wind control design",
    wind: "Basic wind speeds around 105–115 mph (Risk Category II) with wide-open prairie exposure that raises effective wind pressures and drives snow drifting",
    snow: "Ground snow loads commonly run 40–60+ psf and frequently govern roof design; drifting on the open prairie is a major design consideration",
    other: "Deep frost depth (often 4–5+ ft) requires deep footings or frost-protected shallow foundations; expansive Fargo-area lakebed clays and high groundwater complicate foundations in the Red River Valley",
  },
  licensure: {
    board: "North Dakota State Board of Registration for Professional Engineers and Land Surveyors",
    notes:
      "North Dakota grants comity licensure to NCEES-record engineers and accepts digital signatures and electronic seals meeting the board's authentication rules for electronic submittals.",
  },
  metros: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo", "Williston"],
  permitting:
    "Permitting is concentrated in the cities — Fargo, Bismarck, Grand Forks, Minot, and the Bakken-driven Williston area run active departments — while many rural jurisdictions administer limited or no local building code. Red River Valley flooding is a defining permitting and design constraint around Fargo and Grand Forks, and site access and utilities can dictate feasibility in the sparsely served west.",
  marketNotes:
    "North Dakota's economy runs on energy and agriculture: the Bakken oil play sustains industrial, workforce, and infrastructure construction in the northwest, while Fargo anchors healthcare, tech, and agribusiness growth. Cold-climate warehousing, agricultural processing, and energy-sector facilities are recurring building types.",
  narratives: {
    mep:
      "MEP design in North Dakota is governed by extreme cold — design temperatures well below zero and one of the harshest heating climates in the lower 48 — so every mechanical decision starts with heating capacity, freeze protection, and preventing frozen coils, pipes, and condensate lines. We route and insulate to keep water out of exterior walls and unconditioned spaces, size heating plants for prolonged deep-cold events rather than average winters, and design ventilation with energy recovery because tempering frigid outdoor air is otherwise punishing. Where the State Building Code's 2018 IECC energy provisions are locally enforced we document compliance accordingly; where enforcement is light, lender and utility requirements often set the bar. The Bakken's industrial and workforce facilities demand rugged, serviceable systems, and open-prairie utility service and cold-weather generator/backup design factor into electrical planning for critical buildings.",
    structural:
      "Structural engineering here is a snow-and-frost problem, not a seismic one — essentially the whole state is Seismic Design Category A, so gravity loads dominate. Ground snow loads of 40–60+ psf routinely govern roof framing, and open-prairie wind drives serious drift accumulation that we address with drift-load analysis at parapets, steps, and rooftop obstructions. Frost penetration of 4–5+ feet forces deep footings or frost-protected shallow foundation systems to prevent heave. The Red River Valley around Fargo adds a distinct challenge: soft, expansive glacial-lakebed clays and high groundwater make the geotechnical report the governing document, often calling for deep foundations or ground improvement. We design to the 2018 IBC as adopted, confirm the local AHJ, and treat snow drifting and frost as the controlling design realities.",
    civil:
      "Civil engineering in North Dakota is shaped by cold, flat terrain and, in the Red River Valley, by chronic flooding — the Red River flows north and is notorious for spring flood events, so floodplain management and flood-protection grading are central to any Fargo or Grand Forks site. On flat valley terrain with high groundwater, stormwater design relies on detention and controlled conveyance rather than infiltration, and frost affects the design of storm and utility depths. We coordinate erosion-and-sediment control under the state's NPDES construction stormwater program and design grading that manages snowmelt and drifting as well as rainfall. In the Bakken west, rapid industrial development, gravel-road access, and dispersed utilities dominate site feasibility. Across the state we set finished grades and outfalls with frost, snowmelt, and flood elevation as first-order constraints.",
    energy:
      "North Dakota's commercial energy code — the 2018 IECC with ASHRAE 90.1-2016 as the referenced alternate, embedded in the State Building Code — applies where the local jurisdiction actively enforces the code; elsewhere, lender, federal, or utility program requirements typically govern. In this extreme 6A/7 climate the engineering answer is unambiguous: the envelope wins. Continuous insulation, meticulous air-sealing, thermal-break detailing, low-U-factor glazing, and energy-recovery ventilation deliver far more than any mechanical oversizing, because heating demand dominates the annual energy profile and cold air infiltration is the enemy. We run COMcheck or a 90.1 model tuned to heating-dominated trade-offs, and we design well past the minimum where owners, lenders, or utility incentives reward efficiency — in a climate this cold, envelope investment pays back quickly.",
  },
  faqs: [
    {
      q: "Does North Dakota enforce a statewide building code?",
      a: "North Dakota adopts a statewide State Building Code based on the 2018 IBC, but enforcement is local. Cities like Fargo, Bismarck, and Grand Forks run active building departments, while some rural counties and townships administer little or no local enforcement. We confirm the AHJ and effective edition for each project.",
    },
    {
      q: "What controls roof design in North Dakota?",
      a: "Snow, not seismic. Ground snow loads commonly run 40–60+ psf, and open-prairie wind causes significant drifting, so we perform drift-load analysis at parapets, roof steps, and rooftop equipment. Nearly the entire state is Seismic Design Category A, so gravity and snow loads govern rather than earthquake forces.",
    },
    {
      q: "How deep do foundations need to go for frost?",
      a: "Frost penetration often reaches 4–5+ feet, so footings must extend below the frost line or use a frost-protected shallow foundation system to prevent heave. In the Red River Valley around Fargo, soft expansive lakebed clays and high groundwater frequently require deep foundations or ground improvement per the geotechnical report.",
    },
    {
      q: "How does Red River Valley flooding affect my site?",
      a: "Significantly. The Red River flows north and is prone to major spring flooding, so floodplain management, flood-protection grading, and finished-floor elevation are central design decisions around Fargo and Grand Forks. On the flat valley terrain with high groundwater, we rely on detention and controlled conveyance rather than infiltration for stormwater.",
    },
  ],
};
