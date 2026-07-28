import type { StateData } from "../types";

export const vermont: StateData = {
  slug: "vermont",
  name: "Vermont",
  abbrev: "VT",
  buildingCode: {
    name: "Vermont Fire and Building Safety Code — statewide for commercial (public) buildings, based on the 2015 IBC/NFPA framework",
    baseCode: "2015 IBC (as referenced in the state Fire and Building Safety Code) with Vermont amendments",
    notes:
      "Vermont has no statewide residential building code, but commercial and public buildings are regulated by the Division of Fire Safety through the Vermont Fire and Building Safety Code, which references the IBC and NFPA standards. Because there are no local building departments in most towns, the state Division of Fire Safety is typically the reviewing and permitting authority for commercial projects.",
  },
  energyCode: {
    commercial: "Vermont Commercial Building Energy Standards (CBES), based on ASHRAE 90.1 / IECC and updated on a state cycle",
    notes:
      "Vermont maintains its own Commercial Building Energy Standards (CBES), a mandatory statewide standard aligned with recent ASHRAE 90.1 / IECC editions. Compliance is self-certified with the state and can follow prescriptive or performance paths.",
    beyondCode:
      "Vermont's climate goals and Efficiency Vermont programs strongly incentivize above-code, high-performance, and electrified buildings; the state updates CBES on a regular cycle toward higher stringency.",
  },
  climate: {
    zones: "6A across most of the state; 5A in the Champlain Valley lowlands; approaching 7 at the highest mountain elevations",
    drivers: [
      "Severe, long, cold winters with very high heating loads",
      "Heavy snow accumulation in the Green Mountains",
      "Deep frost and hard-freeze detailing",
      "Short cooling season — heating and envelope dominate design",
    ],
  },
  structural: {
    seismic: "Seismic Design Category B — low, though far-northern soft-soil sites warrant basic detailing",
    wind: "Basic wind speeds generally 110–115 mph (Risk Category II); terrain and elevation drive local exposure",
    snow: "Ground snow loads are high and elevation-driven — commonly 50–70+ psf in valleys and well above 100 psf at mountain elevations; snow almost always governs roof design",
    other: "Deep frost (4–5+ ft) requires substantial footing depth; riverine flooding (as in Tropical Storm Irene) drives floodplain design; frost heave and mountain-slope stability are recurring concerns",
  },
  licensure: {
    board: "Vermont Board of Professional Engineering (Office of Professional Regulation)",
    notes:
      "Vermont grants licensure by endorsement and accepts NCEES records; digital seals are accepted for electronic submittals. Commercial construction documents must be sealed by a Vermont-licensed PE for the state Fire Safety permit.",
  },
  metros: ["Burlington", "South Burlington", "Rutland", "Montpelier", "Barre", "Brattleboro"],
  permitting:
    "Because most Vermont towns have no local building department, the state Division of Fire Safety is usually the plan-review and permitting authority for commercial buildings — a centralized process distinct from most states. Larger projects also face Act 250 land-use review, a Vermont-specific environmental permit that can significantly affect schedule, plus state stormwater and wetlands permits through the Agency of Natural Resources.",
  marketNotes:
    "Vermont's construction market is small and driven by healthcare, higher education (UVM, colleges), tourism and ski-resort development, food/beverage production, and municipal and affordable-housing projects. High-performance and net-zero construction is unusually mainstream here given the state's climate goals, and rural sites make on-site water, wastewater, and stormwater engineering central to most projects.",
  narratives: {
    mep:
      "MEP engineering in Vermont is heating, heating, and more heating: Zone 6A (approaching 7 in the mountains) with long, severe winters means heating plants, freeze protection, and envelope performance dominate, and the cooling season is short enough that it's often a secondary concern. We design to the Vermont Commercial Building Energy Standards (CBES) — a mandatory statewide standard aligned with recent ASHRAE 90.1 / IECC editions — and align systems with Efficiency Vermont incentives and the state's aggressive climate goals, which make cold-climate heat pumps, heat recovery, and high-performance envelopes the norm rather than the exception. Freeze protection on outdoor air intakes, hydronic loops, and sprinkler systems is not optional at Vermont design temperatures. Electric utility realities (Green Mountain Power and others) and rural service limitations shape electrical design and any renewable integration, and for the state's healthcare and campus work we deliver demanding ventilation with the redundancy those occupancies require.",
    structural:
      "Vermont structural work is a snow-and-frost regime. Snow almost always governs roofs: valley ground snow loads of 50–70+ psf climb well above 100 psf at mountain elevations, and drift, sliding snow off steep roofs, and rain-on-snow all demand careful accumulation analysis — ski-country and mountain sites are their own design category. Deep frost (4–5+ ft) drives substantial footing depths and frost-protected shallow foundation detailing where used. Seismic is low (SDC B), and wind is moderate, but riverine flooding is a serious factor: Tropical Storm Irene showed how valley and floodplain sites must be elevated and detailed for scour. We design under the IBC as referenced by the state Fire and Building Safety Code, coordinate the geotechnical report for frost-susceptible and mountain-slope soils, and pay particular attention to heavy-timber and existing-building capacity in the state's older stock.",
    civil:
      "Civil and site engineering in Vermont is defined by rural conditions and strong environmental oversight. The state's Act 250 land-use review is a Vermont-specific permit that can control the schedule of larger projects, and the Agency of Natural Resources administers stormwater, wetlands, and — critically for rural sites — potable water supply and wastewater permits, since many parcels rely on on-site wells and septic. Stormwater must meet the Vermont Stormwater Management Manual, which emphasizes green infrastructure, channel protection, and phosphorus reduction in the Lake Champlain basin, where TMDL requirements are stringent. We design grading, drainage, and utilities for deep frost cover and steep terrain, manage riverine floodplain constraints learned hard from Irene, and coordinate the on-site water/wastewater engineering that rural Vermont projects almost always require.",
    energy:
      "Energy compliance in Vermont means the state's own Commercial Building Energy Standards (CBES), a mandatory statewide standard aligned with recent ASHRAE 90.1 / IECC editions and self-certified with the state. In a Zone 6A (near-7) climate, the envelope is everything: continuous insulation, aggressive air-sealing, thermal-bridge-free detailing, and high-performance triple-or-tuned glazing carry the load, and heating-system efficiency drives energy cost. Cold-climate heat pumps and heat recovery are now standard compliant strategies, reinforced by Efficiency Vermont incentives and the state's climate commitments. We frequently model well beyond minimum code because Vermont owners — and the market — expect near-net-zero performance, and because CBES tightens on a regular cycle. Getting the envelope and heating plant right at design time is far cheaper than retrofitting for Vermont winters later.",
  },
  faqs: [
    {
      q: "Who permits commercial buildings in Vermont?",
      a: "In most of Vermont there are no local building departments, so the state Division of Fire Safety is typically the plan-review and permitting authority for commercial and public buildings under the Vermont Fire and Building Safety Code (which references the IBC and NFPA standards). Larger projects also require Act 250 land-use review.",
    },
    {
      q: "What energy standard applies to Vermont commercial construction?",
      a: "Vermont has its own mandatory statewide Commercial Building Energy Standards (CBES), aligned with recent ASHRAE 90.1 / IECC editions and self-certified with the state. Given the severe climate and state goals, most projects target well above minimum performance, supported by Efficiency Vermont incentives.",
    },
    {
      q: "How much does snow drive structural design in Vermont?",
      a: "A great deal. Valley ground snow loads run 50–70+ psf and climb well above 100 psf at mountain elevations, so snow — including drift, sliding snow, and rain-on-snow — almost always governs roof design. We also design deep (4–5+ ft) frost footings and account for riverine flood exposure.",
    },
    {
      q: "What site permits are unique to Vermont?",
      a: "Act 250 is Vermont's signature land-use review and can significantly affect the schedule for larger projects. Rural sites usually also need state potable water and wastewater permits for wells and septic, plus stormwater permits meeting the Vermont manual — with strict phosphorus-reduction rules in the Lake Champlain basin.",
    },
  ],
};
