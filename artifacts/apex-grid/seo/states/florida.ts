import type { StateData } from "../types";

export const florida: StateData = {
  slug: "florida",
  name: "Florida",
  abbrev: "FL",
  buildingCode: {
    name: "Florida Building Code, 8th Edition (2023)",
    baseCode: "2021 IBC with extensive Florida amendments (mandatory statewide)",
    notes:
      "Florida enforces a strong, mandatory statewide code — the Florida Building Code, 8th Edition (2023), built on the 2021 IBC with extensive amendments — administered by the Florida Building Commission. It is among the most rigorous codes in the nation, with unique High-Velocity Hurricane Zone (HVHZ) provisions for Miami-Dade and Broward counties and product-approval requirements.",
  },
  energyCode: {
    commercial: "Florida Building Code — Energy Conservation (8th Edition, 2023), Florida's IECC-based commercial energy code",
    notes:
      "Florida maintains its own energy code as part of the Florida Building Code, derived from the IECC with Florida-specific provisions and applied uniformly statewide. ASHRAE 90.1 is available as an alternate compliance path for commercial buildings.",
    beyondCode: "Some jurisdictions and utilities offer above-code and solar/resilience incentives; the statewide code itself already sets a high hurricane-and-envelope bar.",
  },
  climate: {
    zones: "2A (hot-humid) across most of the peninsula, edging to 1A in the Florida Keys",
    drivers: [
      "Extreme year-round humidity and dominant latent cooling loads",
      "Hurricane and storm-surge exposure statewide",
      "Intense solar heat gain and long cooling seasons",
      "Mold, corrosion, and moisture management as life-of-building concerns",
    ],
  },
  structural: {
    seismic: "Negligible — Seismic Design Category A statewide; seismic effectively never governs",
    wind: "The dominant structural load: ultimate design wind speeds range from ~140 mph inland to 170+ mph in the High-Velocity Hurricane Zone (Miami-Dade/Broward), with mandatory windborne-debris protection and product approval (NOA/Florida Product Approval)",
    snow: "None",
    other: "Widespread FEMA flood/base-flood-elevation requirements, high water tables limiting below-grade construction, karst/sinkhole conditions in central Florida, and corrosive coastal salt exposure",
  },
  licensure: {
    board: "Florida Board of Professional Engineers (FBPE)",
    notes: "Florida grants licensure by endorsement for qualified out-of-state PEs and requires a Certificate of Authorization for firms. Digital signatures and seals are accepted on electronic submittals per board rules.",
  },
  metros: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "West Palm Beach"],
  permitting:
    "Florida's statewide code makes the edition predictable, but permitting rigor is high — especially in the High-Velocity Hurricane Zone (Miami-Dade and Broward), where products require Notice of Acceptance (NOA) or Florida Product Approval and reviewers scrutinize wind and flood detailing. Coastal and low-lying jurisdictions layer in FEMA elevation certificates, and threshold buildings trigger special-inspector requirements.",
  marketNotes:
    "Florida is one of the nation's most active construction markets, driven by relentless in-migration, tourism and hospitality, healthcare for a large retiree population, logistics and port expansion, and a booming residential and mixed-use pipeline across Miami, Orlando, Tampa, and Jacksonville. Hurricane resilience and insurance pressures shape nearly every commercial decision.",
  narratives: {
    mep:
      "MEP engineering in Florida is a humidity discipline first and everything else second. The peninsula sits in hot-humid climate zone 2A (1A in the Keys), where latent load dominates year-round, so dehumidification, tight building pressurization, and vapor-aware envelope coordination are non-negotiable — mold and corrosion are life-of-building failure modes here, not edge cases. We design cooling systems that pull humidity down and hold it there, specify corrosion-resistant equipment near the coast, and manage condensate aggressively. Hurricane resilience shapes the electrical scope: standby power, elevated electrical rooms above base flood elevation, and equipment protected from surge and wind are standard on Florida projects. Because the Florida Building Code — Energy Conservation is a rigorous statewide code with its own provisions, our HVAC, lighting, and plumbing documentation targets that edition, with ASHRAE 90.1 as an alternate path. Nowhere in the country makes moisture and storm resilience more central to mechanical and electrical design than Florida.",
    structural:
      "Florida structural design is defined almost entirely by wind — seismic is negligible statewide (SDC A) and snow is zero, so the hurricane is the governing event. Ultimate design wind speeds run from roughly 140 mph inland to 170+ mph in the High-Velocity Hurricane Zone covering Miami-Dade and Broward, where the Florida Building Code imposes the nation's most stringent requirements: mandatory windborne-debris protection, continuous load paths, and product approval (NOA or Florida Product Approval) for building components. We detail roof uplift, cladding attachment, and connection continuity to survive design-level storms, and we set the structural datum by FEMA base flood elevation plus freeboard because surge and flood are inseparable from wind here. High water tables and central-Florida karst/sinkhole conditions further constrain foundations, frequently driving deep foundations and geotechnical coordination. In Florida, the whole structural philosophy is survivability against a hurricane while sitting on wet, sometimes unstable ground.",
    civil:
      "Civil and site engineering in Florida is governed by water management on flat, low, wet terrain. High water tables and near-sea-level elevations mean stormwater is often managed through wet-detention ponds and exfiltration systems permitted through the regional Water Management Districts (SFWMD, SWFWMD, SJRWMD, and others) in addition to local review — a permitting layer unique to Florida. We design stormwater and grading to those district criteria plus local standards, integrate FEMA base-flood-elevation requirements, and account for the reality that gravity conveyance is limited when the ground is flat and the water table is high. Central-Florida karst adds sinkhole risk that shapes pond siting and infiltration design. Sites disturbing an acre or more require FDEP construction stormwater (NPDES) coverage and a SWPPP. The defining civil challenge is designing site drainage and flood resilience where there is very little elevation to work with.",
    energy:
      "Florida enforces its own rigorous statewide energy code — the Florida Building Code — Energy Conservation, derived from the IECC with Florida-specific provisions — applied uniformly, with ASHRAE 90.1 as an accepted alternate path. In the hot-humid climate that covers the entire state, energy compliance centers on controlling solar heat gain and latent load rather than heating: low-SHGC glazing, tight air-sealing against humid infiltration, and high-efficiency, dehumidification-capable cooling plants are the highest-leverage moves, while roof/wall insulation returns are secondary to solar and moisture control. Cool-roof and reflective strategies pay off under Florida's intense sun. We prepare COMcheck or whole-building energy modeling matched to the Florida energy code edition and coordinate envelope, mechanical, and lighting compliance together — always integrating the moisture-control detailing that both the code and the climate demand to prevent mold and envelope failure.",
  },
  faqs: [
    {
      q: "What building code applies to Florida projects?",
      a: "The Florida Building Code, 8th Edition (2023), built on the 2021 IBC with extensive Florida amendments, applies statewide as a mandatory code. Miami-Dade and Broward counties add the High-Velocity Hurricane Zone (HVHZ) provisions, among the most rigorous wind requirements in the nation.",
    },
    {
      q: "What are the wind design requirements in Florida?",
      a: "Wind is the dominant structural load. Ultimate design wind speeds range from about 140 mph inland to 170+ mph in the High-Velocity Hurricane Zone (Miami-Dade/Broward), with mandatory windborne-debris protection and product approval (NOA or Florida Product Approval) for building components. Seismic and snow effectively never govern.",
    },
    {
      q: "How does stormwater permitting work in Florida?",
      a: "Florida adds a regional Water Management District permitting layer on top of local review. Stormwater is commonly managed with wet-detention ponds and exfiltration systems permitted through districts like SFWMD, SWFWMD, or SJRWMD, plus FDEP NPDES construction coverage for sites over an acre, all shaped by high water tables and flat terrain.",
    },
    {
      q: "Which energy code applies to Florida commercial buildings?",
      a: "The Florida Building Code — Energy Conservation, an IECC-derived statewide energy code with Florida-specific provisions, applies uniformly, with ASHRAE 90.1 as an alternate path. In this hot-humid climate, compliance centers on solar-heat-gain and latent-load control, and we match COMcheck or energy-model documentation to the enforced edition.",
    },
  ],
};
