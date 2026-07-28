import type { StateData } from "../types";

export const newJersey: StateData = {
  slug: "new-jersey",
  name: "New Jersey",
  abbrev: "NJ",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "New Jersey Uniform Construction Code (UCC) — statewide, adopting the 2021 I-Codes",
    baseCode: "2021 IBC with New Jersey amendments (N.J.A.C. 5:23)",
    notes:
      "New Jersey enforces a single statewide Uniform Construction Code administered under N.J.A.C. 5:23, with the state adopting the 2021 I-Codes for building, mechanical, plumbing, and related subcodes. Because the code is uniform statewide, the edition doesn't change between towns — but local plan-review capacity and DCA third-party agency use vary.",
  },
  energyCode: {
    commercial: "2021 IECC / ASHRAE 90.1-2019 (adopted as the NJ energy subcode)",
    notes:
      "New Jersey adopts the energy subcode statewide as part of the UCC. Commercial buildings may comply via the 2021 IECC or ASHRAE 90.1-2019, documented through COMcheck or whole-building performance modeling.",
    beyondCode:
      "New Jersey's Energy Master Plan and clean-energy programs (NJ Clean Energy Program incentives, building decarbonization initiatives) push above-code performance and electrification, particularly for state-funded and large commercial projects.",
  },
  climate: {
    zones: "4A across the entire state — a humid, mixed climate stretching from the Atlantic shore to the northwest highlands, which run somewhat colder",
    drivers: [
      "Cold, humid winters with meaningful heating loads",
      "Hot, humid summers driving dehumidification and cooling",
      "Coastal storm exposure and nor'easter-driven rain/wind along the shore",
      "Freeze-thaw cycling affecting envelopes and site work",
    ],
  },
  structural: {
    seismic: "Predominantly Seismic Design Category B, trending to C on soft or liquefiable soils in the Hackensack Meadowlands and along the coast",
    wind: "Basic wind speeds of roughly 115–125 mph at the Atlantic shore (Risk Category II), dropping to about 110–115 mph across the interior",
    snow: "Ground snow loads typically 25–30 psf, climbing toward 35–40+ psf in the northwest highlands (Sussex/Warren counties)",
    other: "Frost depth of ~36 in.; coastal flood zones (VE/AE) and post-Sandy elevation requirements govern shore foundations; soft Meadowlands soils demand deep foundations",
  },
  licensure: {
    board: "New Jersey State Board of Professional Engineers and Land Surveyors",
    notes:
      "New Jersey grants licensure by comity and accepts NCEES records; electronic/digital seals are recognized for permit submittals. The state's Uniform Construction Code process requires design professionals of record for the relevant subcodes.",
  },
  metros: ["Newark", "Jersey City", "Trenton", "Camden", "Edison", "Atlantic City"],
  permitting:
    "Permits are issued by municipal construction offices under the statewide UCC, but developers routinely use DCA-licensed private inspection/plan-review agencies to accelerate schedule. Coastal and freshwater wetlands projects trigger NJDEP CAFRA/Flood Hazard and Freshwater Wetlands permits that often drive the critical path more than the building permit itself.",
  marketNotes:
    "New Jersey's construction economy is anchored by warehouse and logistics development along the Turnpike and I-78/I-287 corridors serving the Port of New York and New Jersey, plus life-sciences and pharma facilities, multifamily near transit, and steady healthcare expansion. Land constraints and redevelopment of brownfields keep site engineering and remediation coordination central to most projects.",
  narratives: {
    mep:
      "MEP design in New Jersey works a humid Zone 4A climate that demands real attention to both heating and latent cooling — summers are muggy enough that dehumidification control, not just sensible capacity, decides comfort in offices, warehouses, and labs. We design to the 2021 IECC / ASHRAE 90.1-2019 energy subcode adopted statewide under the UCC, and we lean on the state's decarbonization push and NJ Clean Energy incentives when heat-pump and heat-recovery systems pencil out. Utility territory matters: PSE&G, JCP&L, and Atlantic City Electric carry different demand-charge and interconnection realities that shape electrical service sizing and any on-site generation or solar. For the logistics buildings that dominate the market, we tune ventilation, high-bay lighting controls, and future EV/electrification capacity so the base building doesn't have to be re-engineered when tenants arrive.",
    structural:
      "Structural engineering in New Jersey is defined less by big seismic and more by soils and water. The Hackensack Meadowlands and much of the Turnpike logistics corridor sit on soft, compressible, sometimes liquefiable soils that push projects toward driven piles or aggregate piers and can bump the seismic design category to C. Along the Atlantic shore, post-Sandy flood-elevation requirements and VE/AE zone loads drive foundation and first-floor design as hard as gravity loads do. Statewide we design under the 2021 IBC as amended, detail ~36-inch frost footings, and design roofs for 25–40+ psf ground snow with drift where the northwest highlands run colder. For the state's ubiquitous tilt-up and steel warehouse shells, we coordinate large slab-on-grade and dock-pit details with the geotechnical report early.",
    civil:
      "Civil and site work in New Jersey is dominated by NJDEP oversight. The state's stormwater rules (N.J.A.C. 7:8) now require green-infrastructure-based water-quality, quantity, and groundwater-recharge management, and major sites layer on Flood Hazard Area, Freshwater Wetlands, or coastal CAFRA permits that frequently set the project schedule. Much of the developable land is redevelopment of former industrial sites, so we coordinate grading and utility design with LSRP-led remediation, capping, and vapor-intrusion controls. We design to municipal standards under the UCC framework while satisfying county soil-conservation district erosion-control approval and NJDEP permitting. On the dense logistics corridors, truck-court grading, on-site detention/infiltration, and utility capacity are the make-or-break site constraints we resolve first.",
    energy:
      "New Jersey adopts the energy subcode statewide, so every commercial project complies with the 2021 IECC or ASHRAE 90.1-2019 — no jurisdiction-by-jurisdiction guessing. We document via COMcheck or, where trade-offs help, whole-building performance modeling. Because Zone 4A punishes a leaky or thermally weak shell in both winter and the humid summer, we lean hardest on airtight detailing, well-managed continuous insulation, and glazing tuned for solar control rather than raw U-value alone; on the mechanical side, the state's electrification agenda increasingly steers the compliant solution toward heat pumps paired with energy recovery. We also map projects against NJ Clean Energy Program incentives and the Energy Master Plan's above-code direction, so owners capture rebates rather than leave them on the table. For large and state-funded work, we model the path to well beyond minimum code.",
  },
  faqs: [
    {
      q: "Does New Jersey have a statewide building code?",
      a: "Yes. New Jersey enforces a single Uniform Construction Code under N.J.A.C. 5:23, currently based on the 2021 I-Codes with state amendments. The edition is the same statewide, so the main variability between towns is plan-review capacity and whether a private DCA-licensed agency is used to speed review.",
    },
    {
      q: "Which energy code must New Jersey commercial buildings meet?",
      a: "The statewide energy subcode adopts the 2021 IECC and ASHRAE 90.1-2019. Commercial projects can comply via either standard, documented through COMcheck or whole-building energy modeling. The state's Energy Master Plan and clean-energy incentives also encourage above-code, electrification-forward design.",
    },
    {
      q: "What environmental permits affect New Jersey site development?",
      a: "Beyond the local construction permit, NJDEP permits often control the schedule: Flood Hazard Area, Freshwater Wetlands, and coastal CAFRA approvals, plus stormwater management under N.J.A.C. 7:8 requiring green infrastructure. Redevelopment sites also involve LSRP-led remediation. We coordinate these tracks in parallel with design.",
    },
    {
      q: "What structural challenges are common in New Jersey?",
      a: "Soft, compressible soils in the Meadowlands and logistics corridors frequently require deep foundations and can raise the seismic design category to C. Along the shore, post-Sandy flood-elevation and VE/AE zone requirements drive foundation design. Statewide, we design ~36-inch frost footings and roofs for 25–40+ psf snow with drift.",
    },
  ],
};
