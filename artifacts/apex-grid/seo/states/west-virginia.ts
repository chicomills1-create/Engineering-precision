import type { StateData } from "../types";

export const westVirginia: StateData = {
  slug: "west-virginia",
  name: "West Virginia",
  abbrev: "WV",
  buildingCode: {
    name: "West Virginia State Building Code, based on the 2015 I-Codes (adopted by the State Fire Commission)",
    baseCode: "2015 IBC with West Virginia amendments",
    notes:
      "West Virginia's State Fire Commission adopts a statewide model code, but local adoption is not universal — municipalities and counties choose whether to adopt and enforce the State Building Code, and many rural areas have limited or no local building-permit administration. The state has historically run on the 2015 I-Codes, so the governing edition and whether any code is locally enforced must be confirmed with the specific jurisdiction.",
  },
  energyCode: {
    commercial:
      "2015 IECC (as adopted within the State Building Code); ASHRAE 90.1-2013 available as the referenced alternate for commercial buildings",
    notes:
      "Energy provisions travel with the State Building Code, so they apply where that code is locally adopted and enforced. In jurisdictions without active enforcement, energy compliance may be driven by lender, federal, or utility program requirements rather than a local permit.",
  },
  climate: {
    zones: "5A across most of the state, with 4A in the lower Ohio and Kanawha valleys and 6A along the highest Allegheny ridges",
    drivers: [
      "Cold, humid winters with heating-dominated loads",
      "High-elevation mountain snow and freeze-thaw cycling",
      "Complex terrain and orographic precipitation",
      "Continuous insulation and air-sealing for a 5A/6A envelope",
    ],
  },
  structural: {
    seismic:
      "Predominantly Seismic Design Category B, with pockets edging toward the eastern Panhandle where the Central Virginia and Appalachian seismicity has modest influence — detailing is straightforward but not zero",
    wind: "Basic wind speeds around 105–115 mph (Risk Category II); ridge-top and exposed-terrain sites see elevated exposure and local wind acceleration",
    snow: "Ground snow loads range from roughly 25–30 psf in the valleys to 40–60+ psf in the Allegheny highlands, where snow typically governs roof design",
    other: "Steep terrain, landslide-prone colluvial soils, karst limestone in the eastern counties, and abandoned mine subsidence are the dominant geotechnical risks",
  },
  licensure: {
    board: "West Virginia State Board of Registration for Professional Engineers",
    notes:
      "West Virginia licenses engineers by comity and recognizes NCEES records; the board permits electronic seals and digital signatures that meet its authentication standards for electronic submittals.",
  },
  metros: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling", "Martinsburg"],
  permitting:
    "Permitting is highly localized: larger cities such as Charleston, Morgantown, and Huntington run active building departments, while many rural counties administer little or no local building code, deferring instead to state fire-marshal review and floodplain rules. Floodplain management is a recurring gatekeeper given the state's steep valleys and flash-flood history, and site access on mountainous parcels often dictates feasibility.",
  marketNotes:
    "West Virginia's construction market is anchored by energy — legacy coal, expanding natural-gas and Marcellus/Utica midstream infrastructure, and emerging petrochemical interest along the Ohio River. Morgantown's university-driven growth, healthcare expansion, and the fast-growing Eastern Panhandle (a DC-commuter and data-center-adjacent market) round out demand.",
  narratives: {
    mep:
      "MEP design in West Virginia starts from a heating-dominated 5A/6A climate, so we weight envelope-driven load reduction, freeze protection of piping and coils, and robust winter ventilation over the cooling-first thinking that suits the Sun Belt. Because the State Building Code — and the 2015 IECC energy provisions within it — is adopted locally rather than universally, we confirm at kickoff whether the jurisdiction actively enforces an energy code or whether lender and federal requirements set the bar instead. The state's terrain and dispersed utilities matter: propane and fuel-oil heating remain common outside gas-served corridors, and Appalachian Power and Mon Power service reliability shapes backup-power and electrical design for critical facilities. In the Morgantown and Eastern Panhandle growth markets we design to modern efficiency targets, while rural and industrial energy-sector projects demand rugged, serviceable systems suited to remote sites.",
    structural:
      "West Virginia is the most geotechnically demanding state we serve in the mid-Atlantic, and structural design here begins below grade: steep colluvial slopes are landslide-prone, the eastern counties sit on karst limestone with sinkhole and void risk, and legacy underground mining raises the specter of subsidence. We treat the geotechnical investigation as the governing document and design foundations — drilled piers, mat foundations, or ground improvement — accordingly. Above grade, most sites fall in Seismic Design Category B, but the Allegheny highlands drive ground snow loads of 40–60+ psf that commonly control roof framing, and exposed ridge-top parcels see wind acceleration that raises effective uplift. We coordinate to the 2015 I-Codes as adopted and confirm whether the locality enforces the State Building Code at all before finalizing the design basis.",
    civil:
      "Civil and site engineering in West Virginia is a topography problem first. Steep, narrow valleys mean cut-and-fill, retaining structures, and slope stability often dominate the site budget, and flash-flood history makes floodplain management a central permitting gate even where general building enforcement is light. We design stormwater systems that respect fast, high-volume runoff on constrained slopes, and we coordinate erosion-and-sediment control under WVDEP's construction stormwater program (the NPDES general permit) for disturbances at or above the regulated threshold. Karst terrain in the eastern counties demands careful handling of infiltration and detention to avoid destabilizing voids, and access-road and grading design frequently determines whether a mountainous parcel is buildable at all. We plan these constraints early rather than discovering them in review.",
    energy:
      "West Virginia's commercial energy requirements ride inside the State Building Code — the 2015 IECC with ASHRAE 90.1-2013 as the referenced alternate — but the practical picture depends entirely on whether the specific jurisdiction has adopted and enforces that code. Where it applies, we run COMcheck or 90.1 compliance tuned to the cold 5A/6A climate, where continuous insulation, aggressive air-sealing, and heating-plant efficiency deliver the biggest returns and window U-factor matters more than solar heat gain. Where local enforcement is absent, energy design is often driven instead by lender underwriting, federal grant conditions, or utility incentive programs, and we help owners hit those thresholds. Either way, the engineering answer in this climate is envelope-first, because reducing heating demand pays back faster than oversizing mechanical equipment.",
  },
  faqs: [
    {
      q: "Does West Virginia enforce a building code everywhere?",
      a: "No. The State Fire Commission adopts a statewide model code (historically based on the 2015 I-Codes), but adoption and enforcement are local — larger cities like Charleston, Morgantown, and Huntington run active departments, while many rural counties administer little or no local building code. We confirm at kickoff whether and which code the jurisdiction enforces.",
    },
    {
      q: "What energy code applies to commercial projects in West Virginia?",
      a: "Where the State Building Code is locally enforced, energy compliance follows the 2015 IECC with ASHRAE 90.1-2013 as the referenced alternate. In jurisdictions without active enforcement, energy requirements are often set instead by lenders, federal programs, or utility incentives. We identify which applies before establishing the design basis.",
    },
    {
      q: "What geotechnical risks should I plan for in West Virginia?",
      a: "The big three are slope instability on steep colluvial terrain, karst limestone (sinkholes and voids) in the eastern counties, and subsidence over abandoned mine workings. Foundation design here is driven by the geotechnical report — often requiring drilled piers, mats, or ground improvement — so we treat that investigation as the governing document.",
    },
    {
      q: "How does snow load affect roof design in the mountains?",
      a: "Significantly. Valley sites see roughly 25–30 psf ground snow, but the Allegheny highlands run 40–60+ psf, which commonly governs roof framing. Ridge-top and exposed sites also face wind acceleration, so we evaluate both snow and wind for high-elevation projects rather than assuming a single controlling load.",
    },
  ],
};
