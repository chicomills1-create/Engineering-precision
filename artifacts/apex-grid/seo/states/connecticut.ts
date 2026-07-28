import type { StateData } from "../types";

export const connecticut: StateData = {
  slug: "connecticut",
  name: "Connecticut",
  abbrev: "CT",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "2022 Connecticut State Building Code — statewide, based on the 2021 I-Codes",
    baseCode: "2021 IBC with Connecticut amendments",
    notes:
      "Connecticut enforces a single statewide building code administered by the Office of the State Building Inspector under the Department of Administrative Services; the 2022 edition is based on the 2021 I-Codes with state amendments. The code is uniform in every town, so the edition never changes between jurisdictions — only local review capacity does.",
  },
  energyCode: {
    commercial: "2021 IECC / ASHRAE 90.1-2019 (adopted as the Connecticut State Energy Code)",
    notes:
      "Connecticut adopts the energy code statewide in step with the building code. Commercial compliance follows the 2021 IECC or ASHRAE 90.1-2019, documented through COMcheck or whole-building performance modeling.",
    beyondCode:
      "Connecticut's decarbonization and energy-efficiency programs (Energize CT incentives, state clean-energy goals) push above-code performance and electrification, and the state has explored stretch-code provisions for high-performance construction.",
  },
  climate: {
    zones: "5A across most of the state; 4A along the Long Island Sound shoreline in the southwest",
    drivers: [
      "Cold, humid winters with meaningful heating loads",
      "Coastal storm and nor'easter exposure along Long Island Sound",
      "Humid summers requiring dehumidification",
      "Freeze-thaw cycling and cold-climate envelope detailing",
    ],
  },
  structural: {
    seismic: "Seismic Design Category B, trending toward C on soft coastal soils — moderate and worth detailing for essential and taller structures",
    wind: "Basic wind speeds around 120–130 mph along the Sound shoreline (Risk Category II), easing to ~110–115 mph inland",
    snow: "Ground snow loads generally 30–40 psf, rising toward 40–50+ psf in the northwest hills (Litchfield County)",
    other: "Frost depth ~42 in.; coastal VE/AE flood zones along the shoreline; glacial soils and shallow bedrock in places complicate foundations and blasting",
  },
  licensure: {
    board: "Connecticut State Board of Examiners for Professional Engineers and Land Surveyors",
    notes:
      "Connecticut grants licensure by comity and accepts NCEES records; digitally authenticated seals are accepted for electronic permit submittals. Documents must be sealed by a Connecticut-licensed PE for permit.",
  },
  metros: ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury", "Norwalk"],
  permitting:
    "Local building officials enforce the uniform statewide code, so review procedures — not code editions — vary from small towns to Stamford, Hartford, and New Haven. Coastal work triggers CT DEEP and local Coastal Area Management review, and inland-wetlands commissions (a Connecticut-specific layer separate from state wetlands) frequently gate site development. Stormwater is regulated under the DEEP MS4 and construction general permits.",
  marketNotes:
    "Connecticut's construction market is anchored by Fairfield County's corporate, financial, and multifamily activity in the New York commuter belt; life sciences and healthcare around New Haven and Yale; insurance and government downtown Hartford; and steady advanced-manufacturing and defense work (aerospace, submarines) statewide. Transit-oriented redevelopment and adaptive reuse of older mill and office stock are recurring themes.",
  narratives: {
    mep:
      "MEP design in Connecticut works a cold, humid Zone 5A climate (4A along the Sound), so heating loads and winter/summer humidity control both drive system selection. We design to the 2021 IECC / ASHRAE 90.1-2019 energy code adopted statewide, and we lean on Energize CT incentives and the state's decarbonization goals when heat pumps and heat/energy recovery pencil out against the region's high electricity prices. Utility economics are a real design input here: Eversource and United Illuminating demand charges and interconnection queues shape electrical service sizing and any solar or on-site generation. In Fairfield County's corporate and multifamily towers we manage tight service coordination and standby power; around New Haven's life-science and healthcare campuses we design demanding lab ventilation and redundancy. Because the code is uniform statewide, we focus energy strategy on performance rather than chasing edition differences town to town.",
    structural:
      "Connecticut structural work is a moderate-seismic, snow-and-soil problem. Seismic is SDC B (trending to C on soft coastal soils), enough that lateral detailing matters for taller and essential buildings, especially in Fairfield County high-rises. Snow governs many roofs at 30–40 psf, rising to 40–50+ psf in the Litchfield hills, with drift and rain-on-snow accumulation to design for. The state's glacial geology brings shallow bedrock and boulder-laden till in places — rock excavation and blasting affect foundation cost — while soft shoreline soils and VE/AE coastal flood zones drive foundations along the Sound. We design under the 2022 Connecticut State Building Code (2021 IBC as amended), detail ~42-inch frost footings, and coordinate the geotechnical report early, since bedrock depth and soil type frequently reshape the foundation scheme and budget.",
    civil:
      "Civil and site engineering in Connecticut runs through a distinctive two-tier wetlands system: in addition to state DEEP jurisdiction, each municipality has an Inland Wetlands and Watercourses commission whose approval is often the critical-path item on a site. Stormwater is regulated under DEEP's construction general permit and MS4 program, with the 2004 (as amended) Connecticut Stormwater Quality Manual driving water-quality treatment and low-impact-development approaches. Coastal projects add Coastal Area Management review. We design grading, storm systems, and utilities to municipal and DEEP standards, manage the state's ~42-inch frost depth and glacial soils, and on the many redevelopment and brownfield sites coordinate with remediation and Licensed Environmental Professional oversight. In dense Fairfield County parcels, underground detention and tight utility coordination usually govern site yield.",
    energy:
      "Energy compliance in Connecticut follows the 2021 IECC / ASHRAE 90.1-2019 adopted statewide, so — unlike home-rule states — the edition is the same in every town and we can focus on performance. We document via COMcheck or whole-building modeling depending on the trade-offs. In Zone 5A (4A on the shoreline), the envelope must control both winter heat loss and summer humidity, so continuous insulation, air-tightness, and high-performance glazing all carry weight, while heat pumps and energy recovery increasingly define the efficient mechanical path given the state's electrification agenda. We map projects against Energize CT incentives so owners capture available rebates, and for larger commercial and institutional work we model well above minimum code to align with the state's clean-energy goals and hedge against future stringency.",
  },
  faqs: [
    {
      q: "Does Connecticut have a statewide building code?",
      a: "Yes. Connecticut enforces a single statewide code — the 2022 Connecticut State Building Code, based on the 2021 I-Codes with state amendments — administered by the Office of the State Building Inspector. The edition is uniform in every town; only local review capacity and process differ.",
    },
    {
      q: "What energy code applies to Connecticut commercial buildings?",
      a: "The statewide energy code adopts the 2021 IECC and ASHRAE 90.1-2019. Commercial projects comply via either standard, documented through COMcheck or whole-building modeling. Energize CT incentives and the state's decarbonization goals encourage above-code, electrification-forward design.",
    },
    {
      q: "What is Connecticut's inland-wetlands review, and does it affect my site?",
      a: "Connecticut requires each municipality to have an Inland Wetlands and Watercourses commission whose approval is separate from — and often more limiting than — state DEEP review. If your site is near wetlands or watercourses, that local approval frequently controls the schedule, so we address it early alongside stormwater permitting.",
    },
    {
      q: "What structural loads govern in Connecticut?",
      a: "Snow governs many roofs at 30–40 psf, rising to 40–50+ psf in the northwest hills. Coastal wind along Long Island Sound reaches 120–130 mph. Seismic is SDC B, trending to C on soft coastal soils, so lateral detailing matters for taller buildings. Shallow bedrock and glacial till also affect foundations.",
    },
  ],
};
