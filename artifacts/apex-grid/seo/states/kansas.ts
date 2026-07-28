import type { StateData } from "../types";

export const kansas: StateData = {
  slug: "kansas",
  name: "Kansas",
  abbrev: "KS",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "No statewide commercial building code — local adoption of the IBC",
    baseCode: "IBC with local amendments; editions vary by jurisdiction",
    notes:
      "Kansas has no comprehensive statewide building code; cities and counties adopt the IBC on their own cycles, and some rural areas have limited or no adopted code. The Wichita, Kansas City (Johnson/Wyandotte County), and Topeka metros enforce recent IBC editions with amendments. The governing edition must be confirmed with the specific AHJ before design.",
  },
  energyCode: {
    commercial: "Varies by jurisdiction — no statewide energy code; larger cities enforce IECC editions locally",
    notes:
      "With no statewide energy code, commercial energy compliance in Kansas is a city-by-city question. COMcheck runs must target the exact IECC edition the permitting jurisdiction enforces; some rural jurisdictions have no adopted energy code.",
  },
  climate: {
    zones: "4A across most of the state; edging toward 5A in the northwest and 3A in the far south",
    drivers: [
      "Hot, humid summers in the east; hotter, drier conditions in the west",
      "Cold winters with moderate heating loads",
      "Extreme wind and among the highest tornado frequencies in the country",
      "Large diurnal and seasonal temperature swings, especially in the west",
    ],
  },
  structural: {
    seismic: "Very low seismicity statewide — Seismic Design Category A–B; historically low, though induced seismicity in south-central Kansas has drawn attention, seismic rarely governs",
    wind: "Basic wind speeds generally around 105–120 mph (Risk Category II); Kansas sits in the heart of Tornado Alley, making wind uplift and lateral robustness a primary design driver",
    snow: "Ground snow loads commonly around 15–20 psf, higher in the northwest",
    other: "Frost depths of roughly 30–36 inches govern footings; expansive clays are widespread and require geotechnical coordination",
  },
  licensure: {
    board: "Kansas State Board of Technical Professions",
    notes: "Kansas grants licensure by comity/endorsement for NCEES-record engineers; electronic seals and digital signatures are accepted for plan submittals under board rules.",
  },
  metros: ["Wichita", "Overland Park", "Kansas City (KS)", "Topeka", "Olathe", "Lawrence"],
  permitting:
    "Kansas permitting is local: Johnson County suburbs (Overland Park, Olathe), Wichita, and Topeka run structured commercial review with their own amendments and editions, while rural jurisdictions vary widely and some have minimal review. Confirming the governing code, edition, and energy requirements with the specific AHJ is the essential first step on any Kansas project.",
  marketNotes:
    "Kansas' construction market is anchored by aerospace and advanced manufacturing in Wichita (a global aviation hub), logistics and corporate development in the Johnson County/Kansas City suburbs, and agricultural processing and wind-energy infrastructure statewide. Data-center and distribution growth is expanding along the eastern corridors.",
  narratives: {
    mep:
      "Kansas spans a real climate gradient — humid zone 4A in the east, drier and hotter toward the southwest — so our mechanical designs adapt to where the project sits. Eastern Kansas needs strong summer dehumidification and cooling with efficient winter heating, while western projects can lean harder on economizer and evaporative strategies in the drier air. Winter demand is moderate but genuine, so condensing boilers, VRF, and heat pumps get weighed on their merits, with freeze protection detailed accordingly. Wichita's aerospace and advanced-manufacturing base adds process ventilation, compressed-air, and high-bay conditioning requirements that reach well past ordinary comfort work. We work with Evergy on service capacity and demand management, and because Kansas leaves energy adoption to individual jurisdictions, our compliance path is set project by project — we pin down the applicable IECC edition with the AHJ before any modeling, given how much larger cities and rural counties diverge.",
    structural:
      "Wind is the defining structural driver in Kansas — the state sits in the heart of Tornado Alley, and while code design cannot economically resist a direct tornado strike, the frequency of severe straight-line winds and high design wind speeds (often 105–120 mph) makes uplift resistance, continuous load paths, and robust connections central to how we detail every roof and lateral system. Seismic demand is very low (SDC A–B) and seldom controls, though induced seismicity in south-central Kansas keeps the subject relevant for sensitive facilities. Snow loads on the ground are light — roughly 15–20 psf — and footings extend below the 30-to-36-inch frost line. The state's pervasive expansive clays put geotechnical coordination front and center, since soil-movement potential frequently dictates foundation type and slab detailing. With no code adopted at the state level, we pin the governing IBC edition to the AHJ and engineer to that basis.",
    civil:
      "Site engineering in Kansas works under the KDHE-administered NPDES stormwater program, which triggers construction permit coverage and a SWPPP once a site disturbs an acre or more of ground. Detention and water-quality obligations after construction are a local matter: the Johnson County/Kansas City metro imposes detention and increasingly stringent water-quality rules that eat into buildable area, while Wichita and Topeka apply their own standards. Our basins, bioretention, and conveyance are sized to whichever local standard governs, factoring in the expansive clays that hamper infiltration and basin lining, the flat-to-rolling terrain, and the cloudburst convective storms that spike peak runoff. Frost and freeze-thaw shape pavement and utility choices. On the distribution and manufacturing sites central to Kansas, we lay out grading and detention to shed large impervious areas efficiently while satisfying each jurisdiction's water-quality and release-rate limits.",
    energy:
      "Because Kansas sets no energy code statewide, commercial compliance becomes a mapping problem: larger cities run their own IECC editions on separate schedules, while some rural jurisdictions enforce none. We document against whatever edition the permitting authority actually uses and steer clients away from the costly mistake of designing to a cycle that doesn't apply. Across the zone 4A territory that covers most of the state, heating and cooling matter about equally, so we tune insulation, air tightness, and glazing SHGC as one package and size mechanical plants for that balanced load. Toward the drier west, solar-heat-gain control and cooling strategy gain weight. We also surface Evergy incentives for above-code performance, which can recover first cost where the local minimum is thin or missing.",
  },
  faqs: [
    {
      q: "Which building code applies to my Kansas project?",
      a: "It depends on the city or county issuing the permit — Kansas has no statewide commercial building code. Wichita, the Johnson County suburbs, and Topeka enforce recent IBC editions with amendments, while rural areas vary. We confirm the governing code and edition with the AHJ at project kickoff.",
    },
    {
      q: "Does Kansas require commercial energy code compliance?",
      a: "Only where the local jurisdiction has adopted an energy code. Larger Kansas cities enforce IECC editions locally; some rural jurisdictions have none. Compliance documentation, typically COMcheck, must match the specific edition your permitting city enforces.",
    },
    {
      q: "How does tornado risk affect structural design in Kansas?",
      a: "Code design can't economically resist a direct tornado strike, but Kansas' high wind speeds and frequent severe winds make uplift resistance, continuous load paths, and robust connections central to our detailing. Seismic is very low (SDC A–B), so wind, plus expansive-soil foundations, governs structural design.",
    },
    {
      q: "What stormwater rules apply to Kansas site development?",
      a: "KDHE administers the NPDES construction stormwater permit for sites disturbing an acre or more, with a SWPPP required. Post-construction detention and water-quality criteria are set locally — the Kansas City metro and Wichita each have their own standards. We design to the governing local rules and account for expansive clays.",
    },
  ],
};
