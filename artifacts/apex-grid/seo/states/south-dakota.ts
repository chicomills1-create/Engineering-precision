import type { StateData } from "../types";

export const southDakota: StateData = {
  slug: "south-dakota",
  name: "South Dakota",
  abbrev: "SD",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "No mandatory statewide building code — adoption and enforcement are local (many jurisdictions on the 2015 or 2018 IBC)",
    baseCode: "IBC with local amendments where adopted; no statewide mandate",
    notes:
      "South Dakota does not impose a mandatory statewide building code; the state adopts model codes primarily for state-owned buildings, and it is up to each municipality or county to adopt and enforce a code. Sioux Falls, Rapid City, and other larger cities enforce recent IBC editions with local amendments, while many rural areas have limited or no adopted building code — so the governing edition and whether any code applies must be confirmed with the specific AHJ.",
  },
  energyCode: {
    commercial:
      "No statewide mandatory commercial energy code; where local codes are adopted they commonly reference the 2015 or 2018 IECC with ASHRAE 90.1 as an alternate",
    notes:
      "Because there is no statewide mandate, commercial energy compliance is a jurisdiction-by-jurisdiction question. In cities with adopted codes we target the exact IECC edition enforced; elsewhere, lender, federal, or utility program requirements typically set the bar.",
  },
  climate: {
    zones: "6A across most of the state, with 5A in the far southeast around Sioux Falls and cold high-elevation conditions in the Black Hills",
    drivers: [
      "Very cold winters with high heating loads",
      "Deep frost penetration driving foundation depth",
      "Open-prairie wind driving snow drifting and elevated wind pressures",
      "Large diurnal and seasonal temperature swings favoring economizer strategies",
    ],
  },
  structural: {
    seismic:
      "Seismic Design Category A across essentially the entire state — seismic rarely governs; snow, wind, and gravity control design",
    wind: "Basic wind speeds around 105–120 mph (Risk Category II) with open-terrain prairie exposure that raises effective pressures and drives drifting",
    snow: "Ground snow loads run roughly 30–50+ psf across the plains and higher in the Black Hills; snow and drift frequently govern roof design",
    other: "Deep frost depth (often 3.5–5 ft) requires deep or frost-protected foundations; expansive Pierre shale and swelling clays are widespread and often govern foundation design",
  },
  licensure: {
    board: "South Dakota Board of Technical Professions",
    notes:
      "South Dakota grants comity licensure to NCEES-record engineers and accepts digital signatures and electronic seals meeting the board's authentication requirements for electronic submittals.",
  },
  metros: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown", "Pierre"],
  permitting:
    "With no statewide code mandate, permitting is entirely local: Sioux Falls and Rapid City run active building departments with modern IBC editions, while many rural counties administer little or no building code. Floodplain review, on-site wastewater rules, and access considerations often become the primary regulatory gates on rural and small-town sites.",
  marketNotes:
    "South Dakota's economy blends agriculture and agribusiness processing, a growing financial-services and healthcare sector in Sioux Falls, and tourism plus defense-adjacent activity around Rapid City and the Black Hills. Cold-climate warehousing, ag-processing plants, and healthcare facilities are recurring building types.",
  narratives: {
    mep:
      "MEP engineering in South Dakota is heating-driven and cold-climate-first: with 6A conditions over most of the state, we design mechanical systems around deep-winter heating capacity, freeze protection, and energy-recovery ventilation to temper frigid outdoor air economically. Because there is no statewide energy code, our first step is mapping the jurisdiction — Sioux Falls and Rapid City enforce recent IECC editions, while many rural areas have none — and we run COMcheck against the exact adopted edition or design to lender and utility standards where no code applies. The state's dry, high-diurnal-swing air rewards economizer strategies on warehouses and ag-processing shells, and we lean on that free cooling where hours allow. Agribusiness and food-processing facilities bring process cooling, ventilation, and heavy electrical loads that we coordinate with utility service capacity across a dispersed rural grid.",
    structural:
      "Structural design in South Dakota is a snow, frost, and expansive-soil discipline rather than a seismic one — nearly the entire state is Seismic Design Category A, so gravity and lateral wind/snow demands govern. Ground snow loads of 30–50+ psf and open-prairie drifting drive roof framing, and we perform drift analysis at parapets, roof steps, and equipment. What sets South Dakota apart geotechnically is the widespread Pierre shale and swelling clays: these highly expansive soils can heave foundations and slabs, so the geotechnical report is the governing document, often calling for deepened footings, void forms, or ground improvement. Deep frost (3.5–5 ft) requires foundations below the frost line or frost-protected shallow systems. With no statewide code, we confirm the local AHJ and adopted IBC edition before setting the design basis.",
    civil:
      "Civil engineering in South Dakota contends with cold-climate hydrology and expansive soils on a landscape that ranges from flat eastern plains to the rugged Black Hills. On flat prairie sites, stormwater design manages snowmelt and drift as much as rainfall, favoring detention and controlled conveyance, and frost governs the burial depth of storm and utility lines. Pierre shale and swelling clays complicate pavement and infiltration design, so we detail subgrade treatment and drainage to keep water away from expansive soils. Where no local building code exists, floodplain management, on-site wastewater (septic) design, and access roads often become the primary regulatory drivers on rural sites. We coordinate erosion-and-sediment control under the state's NPDES construction stormwater program and set grades with snowmelt, frost, and expansive-soil moisture control as leading concerns.",
    energy:
      "South Dakota has no statewide mandatory energy code, so commercial energy compliance is a jurisdiction-mapping exercise: Sioux Falls and Rapid City enforce versions of the 2015 or 2018 IECC (with ASHRAE 90.1 as an alternate), while much of the rural state has no adopted energy code at all. Where code applies we run COMcheck against the exact enforced edition; elsewhere, lender, federal, or utility incentive programs set the efficiency target. In this cold 6A climate the engineering logic is envelope-first — continuous insulation, air-sealing, thermal-break detailing, low-U glazing, and heat-recovery ventilation return far more than mechanical oversizing because heating dominates annual energy use. Even absent a mandate, we routinely design above any local floor, since envelope investment pays back fast in a climate this cold.",
  },
  faqs: [
    {
      q: "Does South Dakota have a statewide building code?",
      a: "No. South Dakota does not mandate a statewide building code — the state adopts model codes mainly for state-owned buildings, and it's up to each city or county to adopt and enforce a code. Sioux Falls and Rapid City enforce recent IBC editions with local amendments, while many rural areas have little or none. We confirm the governing code with the AHJ at kickoff.",
    },
    {
      q: "Is there an energy code for commercial buildings in South Dakota?",
      a: "Only where a local jurisdiction has adopted one. Cities with adopted codes typically reference the 2015 or 2018 IECC with ASHRAE 90.1 as an alternate; many rural areas have none. Where no code applies, energy requirements are usually driven by lenders, federal programs, or utility incentives. We map which applies before establishing the design.",
    },
    {
      q: "Why is expansive soil such a concern in South Dakota?",
      a: "Much of the state sits on Pierre shale and swelling clays, which are highly expansive and can heave foundations, slabs, and pavements as moisture changes. Foundation design here is governed by the geotechnical report and often requires deepened footings, void forms under grade beams, or ground improvement. We treat that investigation as the controlling document.",
    },
    {
      q: "What loads govern roof design in South Dakota?",
      a: "Snow and drift, not seismic. Ground snow loads run roughly 30–50+ psf across the plains and higher in the Black Hills, and open-prairie wind causes significant drifting, so we analyze drift loads at parapets, roof steps, and rooftop equipment. Nearly the entire state is Seismic Design Category A, so gravity and snow control the roof.",
    },
  ],
};
