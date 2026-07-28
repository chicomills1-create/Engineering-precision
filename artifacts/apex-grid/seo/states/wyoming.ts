import type { StateData } from "../types";

export const wyoming: StateData = {
  slug: "wyoming",
  name: "Wyoming",
  abbrev: "WY",
  buildingCode: {
    name: "Local adoption of the International Building Code (no statewide mandatory commercial building code)",
    baseCode: "IBC with local amendments; editions vary by jurisdiction",
    notes:
      "Wyoming has no statewide mandatory building code — cities and counties adopt (or decline to adopt) their own IBC editions. Cheyenne, Casper, and other municipalities enforce the IBC with local amendments, while some rural counties have limited or no adopted code, so the governing edition must be confirmed with the specific AHJ.",
  },
  energyCode: {
    commercial: "Varies by jurisdiction — no statewide energy code; municipalities that adopt building codes typically reference an IECC edition",
    notes:
      "With no statewide energy code, commercial energy compliance in Wyoming is a jurisdiction-by-jurisdiction question. Where an energy code applies, COMcheck runs must target the exact IECC edition the permitting municipality has adopted; some rural areas have none.",
    beyondCode: "Rocky Mountain Power (wattsmart) and other utilities offer commercial efficiency incentives; formal stretch codes are essentially absent given the home-rule landscape.",
  },
  climate: {
    zones: "6B across much of the state (Cheyenne, Casper, Laramie); 7 at higher elevations and in the coldest basins",
    drivers: [
      "Severe cold winters with dominant heating loads and sub-zero design temperatures",
      "Extreme wind — Wyoming is among the windiest states in the nation",
      "High elevation affecting combustion and equipment capacity statewide",
      "Short, dry summers with modest cooling loads",
    ],
  },
  structural: {
    seismic: "Generally low to moderate — SDC B across much of the state, rising near the northwest (Yellowstone/Teton region) where seismicity is higher",
    wind: "Very high — among the strongest sustained winds in the country, with basic wind speeds frequently 115–140+ mph in exposed corridors (notably the I-80 corridor)",
    snow: "Substantial and elevation-driven — plains and basin loads are meaningful and mountain/resort loads (Jackson/Teton area) can far exceed 100 psf",
    other: "Deep frost penetration and freeze-thaw drive foundation embedment; expansive/bentonite soils occur across much of the state",
  },
  licensure: {
    board: "Wyoming Board of Professional Engineers and Professional Land Surveyors",
    notes: "Wyoming offers comity licensure for qualified out-of-state PEs and accepts electronic seals for digital plan submittals.",
  },
  metros: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs", "Jackson"],
  permitting:
    "Wyoming permitting is highly localized: incorporated cities like Cheyenne and Casper run their own review while many rural counties have minimal or no building-code enforcement, so the reviewing authority and requirements vary dramatically by location. Wind design documentation is a recurring plan-review focus, and many sites rely on on-site septic and wells requiring state/county health coordination.",
  marketNotes:
    "Wyoming's construction market is tied to energy (oil, gas, coal, and growing wind and renewable development), with activity concentrated around Gillette, Casper, and the Cheyenne data-center and logistics corridor near F.E. Warren and the I-80/I-25 crossroads. The resort economy around Jackson Hole drives high-end commercial and civil work in a demanding mountain environment.",
  narratives: {
    mep:
      "Wyoming MEP design is shaped by two extremes: bitter cold and relentless wind. Sub-zero winter design temperatures make heating capacity, freeze protection, and redundancy the dominant mechanical concerns, while the state's high elevation — Cheyenne and Laramie sit well above 6,000 feet — requires altitude corrections to combustion equipment, cooling capacity, and pressurization across virtually every project. With short, arid summers, cooling demand stays light and economizer cycles cover most of it. Wyoming's extreme wind also affects MEP: intake and exhaust placement, louver and equipment wind loading, and infiltration control all demand attention that milder climates don't. We engage Rocky Mountain Power early on available service capacity and its commercial rebate offerings, and because Wyoming sets no statewide energy code, we pin down each jurisdiction's adopted mechanical and energy editions before documenting compliance to whatever the permitting authority actually enforces.",
    structural:
      "Structural engineering in Wyoming is a wind-and-snow discipline. The state is among the windiest in the nation — the I-80 corridor sees some of the strongest sustained winds anywhere — so basic wind speeds run high and roof-uplift, cladding-pressure, and lateral detailing get first-order attention on every project. Snow loads are substantial on the plains and severe in the mountains, with Jackson/Teton-area roofs carrying well over 100 psf, so we detail for drift and unbalanced loading. Seismic is generally low to moderate (SDC B) across most of the state but rises toward the seismically active Yellowstone/Teton northwest, where we detail to the elevated hazard. The deep frost line sets minimum footing depth, and the bentonite-rich, expansive soils found across much of Wyoming push foundation selection back onto the geotechnical report. With no statewide code, we confirm the governing IBC edition and load criteria with each jurisdiction.",
    civil:
      "Civil and site engineering in Wyoming blends severe-cold and high-wind realities with a highly localized regulatory landscape. The frost line sits deep here, so it dictates how far down utilities and footings must go, freeze-thaw shapes the pavement section, and wind-driven snow forces us to think about drifting patterns when we set grades and building placement. Because many jurisdictions — particularly rural counties — have minimal code enforcement, the reviewing authority and drainage standards vary widely, and many sites depend on on-site septic and private wells requiring state and county health-department coordination. Floodplain constraints and wildfire-interface concerns factor into siting in the mountains and river valleys. Our team lays out grading, detention and treatment basins, utility service, and accessible parking and paths to whatever standards the local authority publishes, then carries the project through SWPPP documentation under Wyoming's construction stormwater permit.",
    energy:
      "Because Wyoming leaves energy code adoption to local governments, the first step is figuring out which code — if any — actually applies: municipalities that adopt building codes generally reference an IECC edition, while some rural areas enforce nothing at all. Where a code is in force, we build the COMcheck submittal to the precise edition the permitting municipality has adopted and guard against the common error of documenting to the wrong cycle. Code or no code, the climate makes efficiency worthwhile — in Wyoming's cold, high-elevation zones (largely 6B, with 7 at elevation), a heavily insulated, meticulously air-sealed envelope that resists the extreme wind-driven infiltration, paired with high-performance glazing, is the surest hedge against the punishing heating season. Where a project qualifies, Rocky Mountain Power wattsmart rebates let those above-code envelope and equipment upgrades pay for themselves through incentives layered on top of the heating savings.",
  },
  faqs: [
    {
      q: "Which building code applies to my Wyoming project?",
      a: "It depends entirely on the jurisdiction — Wyoming has no statewide mandatory building code. Cities like Cheyenne and Casper adopt the IBC with local amendments, while some rural counties enforce little or no code. We confirm the reviewing authority and governing edition with the specific AHJ before design.",
    },
    {
      q: "Does Wyoming require commercial energy code compliance?",
      a: "Only where the local jurisdiction has adopted an energy code. Municipalities that adopt building codes typically reference an IECC edition, but some rural areas have none. Where compliance applies, we document it with COMcheck matched to the exact adopted edition; regardless, the cold, windy climate makes an efficient envelope strongly worthwhile.",
    },
    {
      q: "How does wind affect design in Wyoming?",
      a: "Enormously. Wyoming is among the windiest states, with the I-80 corridor seeing some of the strongest sustained winds in the country. Basic wind speeds run high, so roof-uplift, cladding-pressure, and lateral detailing dominate structural design, and MEP intake/exhaust and equipment wind loading require added attention.",
    },
    {
      q: "What foundation and site considerations matter most in Wyoming?",
      a: "Deep frost penetration governs foundation embedment and utility burial depth, and bentonite/expansive soils across much of the state require geotechnically driven foundation systems. High elevation also requires altitude corrections in MEP design, and many sites rely on on-site septic and wells requiring health-department coordination.",
    },
  ],
};
