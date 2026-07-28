import type { StateData } from "../types";

export const washington: StateData = {
  slug: "washington",
  name: "Washington",
  abbrev: "WA",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Washington State Building Code (2021 IBC as amended by the State Building Code Council)",
    baseCode: "2021 IBC with Washington State amendments",
    notes:
      "Washington adopts a mandatory statewide code through the State Building Code Council (SBCC). Local jurisdictions administer enforcement but generally cannot weaken the state code, giving a consistent base edition across the state.",
  },
  energyCode: {
    commercial: "Washington State Energy Code (WSEC-C), 2021 edition — a heavily amended, above-IECC state code",
    notes:
      "Washington enforces its own commercial energy code (WSEC-C) that is significantly more stringent than the base IECC and includes additional-efficiency-credit and emissions-reduction requirements. Compliance is documented against the WSEC-C, not a plain IECC run.",
    beyondCode: "The Clean Buildings Performance Standard (HB 1257) imposes energy-use-intensity targets on existing commercial buildings; Seattle maintains its own energy code and building tune-up/benchmarking programs.",
  },
  climate: {
    zones: "4C (marine) west of the Cascades (Seattle, Tacoma, Olympia); 5B and colder east of the Cascades (Spokane, Yakima)",
    drivers: [
      "Mild, wet marine climate west of the Cascades with modest cooling loads",
      "Heavy rainfall driving stormwater and building-envelope moisture detailing",
      "Cold, drier continental climate east of the Cascades",
      "Rising summer peak-cooling demand and wildfire-smoke filtration needs",
    ],
  },
  structural: {
    seismic: "High west of the Cascades from the Cascadia Subduction Zone and shallow crustal faults (e.g., Seattle Fault) — SDC D common, with liquefaction concern in Puget Sound lowlands",
    wind: "Basic wind speeds generally 95–110 mph inland, higher on the exposed coast",
    snow: "Modest in the Puget Sound lowlands; substantial in the Cascades and heavier east-slope/Spokane loads that govern roofs",
    other: "Deep soft soils and liquefaction in Puget Sound river deltas and fill; volcanic lahar hazard zones near Cascade volcanoes affect some siting",
  },
  licensure: {
    board: "Washington State Board of Registration for Professional Engineers and Land Surveyors",
    notes: "Washington licenses PEs by comity for qualified out-of-state applicants and accepts electronic seals for digital plan submittals.",
  },
  metros: ["Seattle", "Spokane", "Tacoma", "Bellevue", "Vancouver", "Everett"],
  permitting:
    "Seattle and Puget Sound jurisdictions run rigorous, sustainability-focused review with strict stormwater and seismic expectations, while eastern Washington (Spokane, Tri-Cities) can move faster. The Clean Buildings Performance Standard adds ongoing energy-performance obligations for larger existing buildings, and Ecology's stormwater manual heavily shapes site design.",
  marketNotes:
    "Washington's construction market is driven by the Puget Sound tech and life-science cluster, aerospace, and one of the nation's largest data-center corridors in Grant and Douglas counties (Quincy/Moses Lake), powered by cheap hydroelectricity. Warehouse and logistics growth and eastern-Washington agriculture-processing add to sustained MEP, structural, and civil demand.",
  narratives: {
    mep:
      "Washington MEP design is split by the Cascades and steered hard by state energy policy. West of the range, the mild marine climate keeps cooling modest, so we design economizer- and heat-recovery-based systems and increasingly all-electric heat-pump plants that satisfy the Washington State Energy Code and the state's decarbonization trajectory; controlling moisture and delivering good ventilation in the damp climate is as important as capacity. East of the Cascades, Spokane and the Columbia Basin impose genuine heating loads and drier-climate opportunities, and the region's massive data-center corridor — drawn by inexpensive hydroelectric power — needs high-capacity, fault-tolerant power and heat-rejection systems that we plan hand-in-hand with the serving utility. Wildfire-smoke events increasingly require enhanced filtration statewide. Every mechanical and lighting decision is documented against the WSEC-C, which is meaningfully more demanding than the base IECC.",
    structural:
      "Structural engineering west of the Cascades is a high-seismic discipline: the Cascadia Subduction Zone plus shallow crustal faults such as the Seattle Fault put much of Puget Sound in SDC D, and we detail ductile lateral systems while coordinating with geotechnical engineers on liquefaction in the region's soft river-delta soils and fill. Lahar hazard zones near Cascade volcanoes constrain some siting. Snow is generally modest in the lowlands but governs roofs in the Cascades and on the colder east slope around Spokane. Because the code base edition is set at the state level, our seismic detailing stays consistent from one jurisdiction to the next while we confirm the site-specific loads against the geotechnical report. Mass-timber and hybrid systems are increasingly common, and we detail them for both gravity and lateral demand in the region's seismic environment.",
    civil:
      "Civil and site engineering in Washington is shaped by heavy west-side rainfall and the Department of Ecology's stormwater manual, which drives low-impact development, flow control, and runoff-treatment requirements that are among the strictest in the country. In Puget Sound jurisdictions, infiltration feasibility, bioretention, and flow-control facilities heavily influence site layout and must be resolved during preliminary design, and Ecology's construction stormwater general permit governs erosion control. Critical-areas ordinances protecting wetlands, streams, and steep slopes add an entitlement layer. East of the Cascades, drier conditions and drywell-based drainage change the approach. Our scope spans runoff treatment and flow-control BMPs, site grading, wet and dry utility service, and accessible paving detailed to each jurisdiction's standards, with the strategy re-tuned to the very different hydrology on each side of the range.",
    energy:
      "Washington enforces the Washington State Energy Code (WSEC-C), not a plain IECC — it is significantly more stringent and layers in additional-efficiency-credit and emissions-reduction requirements, so generic COMcheck output does not demonstrate compliance. We document against the WSEC-C edition in force and select the additional-efficiency credits that best suit the project. The Clean Buildings Performance Standard extends energy-use-intensity targets to existing commercial buildings, so we advise on both new-construction compliance and existing-building performance. In the marine west-side climate, reducing plug, lighting, and ventilation loads and deploying efficient heat pumps matter more than fighting cooling; east-side projects emphasize envelope insulation. We also help clients capture utility incentives, particularly valuable in the low-cost-power data-center corridor.",
  },
  faqs: [
    {
      q: "What building code applies to Washington commercial projects?",
      a: "The Washington State Building Code, based on the 2021 IBC as amended by the State Building Code Council, applies statewide. Local jurisdictions administer enforcement but generally cannot weaken the state code, so the base edition is consistent across Washington.",
    },
    {
      q: "Does Washington use the IECC for commercial energy compliance?",
      a: "Not directly. Washington enforces its own Washington State Energy Code (WSEC-C), which is significantly more stringent than the base IECC and includes additional-efficiency-credit and emissions requirements. Compliance is documented against the WSEC-C, and larger existing buildings also face the Clean Buildings Performance Standard.",
    },
    {
      q: "How high is seismic demand in the Seattle area?",
      a: "High. Puget Sound faces both the Cascadia Subduction Zone and shallow crustal faults like the Seattle Fault, putting much of the region in Seismic Design Category D. We detail ductile lateral systems and coordinate liquefaction evaluation in the soft river-delta soils and fill common to the lowlands.",
    },
    {
      q: "What stormwater requirements affect a Washington site?",
      a: "West of the Cascades, the Department of Ecology stormwater manual drives strict low-impact development, flow control, and runoff-treatment requirements. Infiltration feasibility and bioretention facilities shape site layout and must be resolved during preliminary design, alongside critical-areas ordinances protecting wetlands and streams.",
    },
  ],
};
