import type { StateData } from "../types";

export const nebraska: StateData = {
  slug: "nebraska",
  name: "Nebraska",
  abbrev: "NE",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Nebraska State Building Code based on the IBC (default statewide; local jurisdictions may adopt and amend)",
    baseCode: "IBC adopted as the State Building Code; local adoption and enforcement vary",
    notes:
      "Nebraska adopts a State Building Code based on the IBC that serves as the statewide standard, but enforcement is largely local — cities and counties administer and may amend it, and enforcement is limited in some unincorporated areas. Omaha and Lincoln enforce recent IBC editions with amendments. The governing edition and enforcement scope should be confirmed with the AHJ.",
  },
  energyCode: {
    commercial: "Nebraska Energy Code based on the IECC (adopted statewide, historically tracking a 2018 IECC vintage) with ASHRAE 90.1 as an alternate path",
    notes:
      "Nebraska adopts a statewide energy code based on the IECC, giving a uniform commercial baseline even where building-code enforcement is local. The current adopted edition should be verified with the State Energy Office, and design targeted above the minimum given the cold climate.",
  },
  climate: {
    zones: "5A across the east and central state; 5B (drier) in the west; edging toward 6A in the far north",
    drivers: [
      "Cold, continental winters with long heating seasons",
      "Hot summers — humid in the east, drier in the west",
      "Large diurnal and seasonal temperature swings, especially in the west",
      "High wind, hail, and tornado exposure across the plains",
    ],
  },
  structural: {
    seismic: "Very low seismicity statewide — Seismic Design Category A; seismic effectively never governs",
    wind: "Basic wind speeds generally around 105–115 mph (Risk Category II); open-plains exposure and frequent severe storms drive uplift and lateral robustness",
    snow: "Ground snow loads commonly around 20–30 psf, higher in the north and Panhandle, with drift analysis on larger roofs",
    other: "Frost depths of roughly 42 inches govern footings; expansive clays in the east and collapsible loess soils require geotechnical coordination",
  },
  licensure: {
    board: "Nebraska Board of Engineers and Architects",
    notes: "Nebraska grants licensure by comity for NCEES-record engineers; electronic seals and digital signatures are accepted for plan submittals under board rules.",
  },
  metros: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney", "Fremont"],
  permitting:
    "Nebraska's State Building Code provides a baseline, but enforcement is local: Omaha and Lincoln run structured commercial review with their own amendments and editions, while smaller and rural jurisdictions vary and some have limited enforcement. The statewide energy code applies broadly, but building-code edition and review process should be confirmed with the specific AHJ.",
  marketNotes:
    "Nebraska's construction market is anchored by data centers (drawn to Omaha and eastern Nebraska by reliable, low-cost public power), agricultural processing, insurance and finance in Omaha, and logistics along the I-80 corridor. Healthcare and higher-education construction remain steady in the Omaha and Lincoln metros.",
  narratives: {
    mep:
      "Nebraska's continental climate — cold winters and hot summers across zones 5A in the east and 5B in the drier west — shapes a mechanical strategy that is heating-forward but adaptable. With substantial winter demand, we weigh cold-climate heat pumps, VRF, and condensing boilers against one another, detailing thorough freeze protection, then tailor the summer side — full cooling and dehumidification in the humid east, or economizer and evaporative approaches out in the drier west. Nebraska's standout MEP story is its data-center boom: reliable, low-cost power from public utilities like OPPD and the Nebraska Public Power District has drawn large hyperscale and colocation projects, and these facilities drive some of the region's largest cooling and electrical loads, demanding careful redundancy, service sizing, and utility coordination. Because Nebraska adopts a statewide energy code, our mechanical and lighting compliance is uniform even where building-code enforcement is local, though we design above the minimum to control heating cost.",
    structural:
      "Structural engineering in Nebraska is governed by wind, snow, and soils rather than seismic — the state is Seismic Design Category A throughout, so seismic effectively never controls. Wind leads the lateral picture: open-plains exposure, design speeds around 105–115 mph, and a steady diet of severe storms and tornadoes push us to detail strong hold-downs, unbroken load paths, and stout connections. Ground snow runs 20–30 psf, climbing in the north and Panhandle, so drift analysis earns its place on larger roofs. Footings sit below the roughly 42-inch frost line. Nebraska's soils reward attention — eastern expansive clays and widespread collapsible loess make foundation and slab design a soils-report exercise, and we coordinate the geotechnical findings closely. Gravity and lateral systems are engineered to the applicable IBC edition, with the governing code and enforcement scope confirmed against the AHJ.",
    civil:
      "Nebraska site work falls under the NDEE-administered NPDES construction stormwater program, which mandates permit coverage and a pollution-prevention plan once disturbance reaches an acre. The post-construction rules are a local call, with Omaha and Lincoln imposing detention and steadily tightening water-quality standards — and Omaha's combined-sewer-overflow program has spurred stormwater-control investment that reshapes site design across older neighborhoods. Our basins, bioretention, and conveyance are engineered to the controlling local standard, weighing the expansive clays and collapsible loess that frustrate infiltration and basin design, the rolling terrain, and the intense convective storms that drive peak flows. Deep frost and freeze-thaw dictate pavement sections and utility burial. On the large data-center and distribution sites fueling Nebraska's growth, we arrange grading and detention to carry big impervious areas while clearing the local water-quality and release-rate thresholds.",
    energy:
      "Nebraska adopts a statewide commercial energy code based on the IECC, with ASHRAE 90.1 as an alternate path — giving us a uniform compliance baseline even though building-code enforcement is largely local. Compliance is documented through COMcheck or energy modeling tied to the adopted edition, and across Nebraska's cold 5A/5B climate we push clients past the minimum because the envelope earns its cost back fast. The biggest returns come from continuous insulation, a well-sealed air barrier, and infiltration control, then from high-efficiency heating plants paired with daylight and occupancy lighting controls; out in the drier west, cooling strategy and solar-heat-gain control take on more importance. For the state's data centers, mechanical efficiency and heat-recovery strategy dominate operating cost. We also identify public-power incentive programs from OPPD and NPPD that reward above-code performance, helping offset first cost on Nebraska's heating-dominated buildings.",
  },
  faqs: [
    {
      q: "Does Nebraska have a statewide building code?",
      a: "Nebraska adopts a State Building Code based on the IBC that serves as the statewide standard, but enforcement is largely local — cities and counties administer and may amend it, and some rural areas have limited enforcement. We confirm the governing edition and enforcement scope with the AHJ.",
    },
    {
      q: "Which energy code applies to Nebraska commercial buildings?",
      a: "Nebraska adopts a statewide energy code based on the IECC (with ASHRAE 90.1 as an alternate path), giving a uniform commercial baseline even where building-code enforcement is local. We document compliance with COMcheck or energy modeling and design above the minimum given the cold climate.",
    },
    {
      q: "What structural loads govern in Nebraska?",
      a: "Wind, snow, and soils — not seismic, which is negligible (SDC A statewide). Open-plains wind exposure drives uplift and load-path detailing, ground snow loads run 20–30 psf with drift analysis, footings sit below ~42-inch frost, and expansive clays and collapsible loess make foundations geotechnically driven.",
    },
    {
      q: "What stormwater rules apply to Nebraska site development?",
      a: "The NDEE administers the NPDES construction stormwater permit for sites disturbing an acre or more, requiring a SWPPP. Post-construction detention and water-quality criteria are local — Omaha (with its combined-sewer-overflow program) and Lincoln have their own standards. We design to local rules and account for expansive/loess soils.",
    },
  ],
};
