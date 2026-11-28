import type { CityData } from "../types";

export const abilene: CityData = {
  slug: "abilene",
  name: "Abilene",
  stateSlug: "texas",
  county: "Taylor County",
  ahj: {
    office: "City of Abilene Building Inspections Division, Planning and Development Services Department",
    process:
      "Abilene's Building Inspections Division administers permits and plan review for commercial and residential work under the city's adopted 2021 I-codes, with permit fees set by City Council ordinance and published in the city fee schedule. The division is the enforcement agency named throughout the city's code amendment pamphlets — the Building Official heads the division, appeals go to the Board of Building Standards, and a stop-work order carries a $200 release fee. General and roofing contractors must file a $75,000 surety bond with the Building Official before engaging in construction work in the city, a local step that sits on top of Texas trade licensing.",
  },
  codes: {
    building: "2021 International Building Code, adopted by Ordinance 03-2023 as part of the city's move to the 2021 International Codes, with City of Abilene local amendments",
    energy: "2021 International Energy Conservation Code with City of Abilene amendments (the IRC energy chapter is deleted and energy compliance is routed to the 2021 IECC)",
    amendments:
      "Abilene publishes full amendment pamphlets for each adopted code, and its 2021 IECC amendments materially loosen the model code in climate zone 3: ceiling insulation drops to R-38, wood-frame walls to R-13, slab insulation is deleted, window SHGC relaxes to 0.30, and air-leakage compliance can be shown by a visual inspection checklist instead of a blower-door test. The IRC amendments delete the residential energy chapter entirely and point to the IECC. Contractors should also note the $75,000 surety bond requirement and the $200 stop-work release fee in the local amendments.",
  },
  utilities: {
    electric: "AEP Texas (American Electric Power) — the regulated transmission and distribution utility for Abilene, in the deregulated ERCOT retail market",
    notes:
      "AEP Texas owns the wires in Abilene, so new commercial services, capacity, and meter work run through AEP's service process while the customer separately chooses a retail electric provider in the ERCOT market. Water and wastewater are City of Abilene utilities, supplied from the city's West Texas reservoir system, so tap and capacity review stay with the city. In a drought-prone region, water availability and the city's water-supply planning are standing considerations on large new services in a way they are not in wetter Texas metros.",
  },
  climateNotes:
    "IECC climate zone 3B (hot-dry) in West Texas: extreme summer heat with design temperatures over 100°F, low humidity, high wind exposure across open terrain, and episodic severe freezes. Rainfall is scarce and intense when it comes, so drainage design is flash-flood driven; expansive and caliche soils are common across Taylor County.",
  marketNotes:
    "Abilene is the West Texas regional hub for Taylor County, anchored by Dyess Air Force Base — home of the B-1B Lancer and a B-21 Raider beddown mission — Hendrick Health's regional hospital system, three universities (Abilene Christian, Hardin-Simmons, and McMurry) plus a Texas Tech University Health Sciences Center campus, and First Financial Bankshares, headquartered downtown. Commercial work clusters in healthcare, education, base-support construction, and retail and industrial space along the I-20 and Winters Freeway corridors.",
  narratives: {
    mep:
      "MEP design in Abilene is documented to the 2021 I-codes the city adopted by Ordinance 03-2023, with each trade code carrying the city's own amendment pamphlet. Electrical service coordination runs through AEP Texas as the wires utility in a retail-choice market, and energy documentation follows the city's amended 2021 IECC — whose relaxed envelope values change the mechanical sizing conversation versus the unamended code. The local administrative layer matters too: the $75,000 contractor surety bond and Board of Building Standards appeals are Abilene specifics, not Texas defaults.",
    structural:
      "Structural design in Abilene is governed by West Texas wind across open terrain and by soils that split between expansive clays and caliche: foundation design follows the geotechnical report, and the 2021 IBC wind provisions shape the envelope against severe thunderstorm gusts. Heat is the other structural-adjacent driver — materials, curing, and expansion detailing all plan around sustained 100°F-plus summers. Seismic demand is minimal, so gravity, uplift, and soil behavior control most designs.",
    civil:
      "Civil design in Abilene works in a water-scarce, flash-flood landscape: drainage design is driven by intense short-duration storms on dry ground, detention and conveyance are sized for the cloudburst rather than the average rain, and city water and wastewater capacity review runs through the City of Abilene's own utility system. Site standards follow the city's development ordinances, and on Dyess-adjacent and corridor sites, access and frontage coordination with TxDOT facilities is a recurring scope item.",
    energy:
      "Energy compliance in Abilene must be run to the city's amended 2021 IECC, not the model code: the local amendments cut ceiling insulation to R-38 and walls to R-13, delete slab insulation, relax SHGC to 0.30, and allow air-leakage compliance by visual checklist instead of testing. A COMcheck run with unamended zone 3 values will overstate the requirement — and a set documented to a neighboring Texas city's amendments will still be wrong here. Texas SECO state requirements form the floor beneath the local amendments.",
  },
  faqs: [
    {
      q: "What building codes does Abilene, TX enforce?",
      a: "The 2021 International Codes, adopted by Ordinance 03-2023 — 2021 IBC, IRC, IMC, and IECC, each with City of Abilene amendment pamphlets. The IRC's energy chapter is deleted; energy compliance runs through the amended 2021 IECC for both residential and commercial work.",
    },
    {
      q: "How do Abilene's energy amendments differ from the model 2021 IECC?",
      a: "They loosen it: R-38 ceilings instead of R-49, R-13 wood-frame walls, no slab insulation, window SHGC of 0.30 instead of 0.25, and air-leakage compliance by visual inspection checklist rather than a mandatory blower-door test. Document compliance to the city's pamphlet, not the unamended code.",
    },
    {
      q: "Who provides electric, water, and sewer service in Abilene?",
      a: "AEP Texas is the wires utility for electricity (customers choose a retail provider in the ERCOT market), and the City of Abilene provides water and wastewater from its West Texas reservoir system. Contractors should also note the city's $75,000 surety bond requirement filed with the Building Official.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 46, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.abilenetx.gov/DocumentCenter/View/3229/2021-International-Residential-Building-Code-PDF?bidId="],
      codes: ["https://rhoeflow.pro/research/texas/abilene/energy-code-by-year"],
      amendments: ["https://www.abilenetx.gov/DocumentCenter/View/3227/2021-International-Mechanical-Code-PDF?bidId="],
      utilities: ["https://www.abilenetx.gov/DocumentCenter/View/20717/2021-International-Property-Maintenance-Code-PDF"],
      climate: ["https://rhoeflow.pro/research/texas/abilene/energy-code-by-year"],
      market: ["https://www.abilenetx.gov/DocumentCenter/View/3229/2021-International-Residential-Building-Code-PDF?bidId="],
    },
  },
};
