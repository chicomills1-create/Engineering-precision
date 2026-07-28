import type { StateData } from "../types";

export const northCarolina: StateData = {
  slug: "north-carolina",
  name: "North Carolina",
  abbrev: "NC",
  buildingCode: {
    name: "North Carolina State Building Code (NC Building Code), maintained by the NC Building Code Council",
    baseCode: "IBC-derived with extensive North Carolina amendments; the state develops its own edition on its own cycle rather than adopting an I-Code year wholesale",
    notes:
      "North Carolina enforces a single statewide code developed and amended by the NC Building Code Council, so it does not simply track a given IBC year — the state maintains its own edition with significant North Carolina-specific amendments. The code cycle has been subject to legislative changes affecting update timing, so the governing edition and any recently enacted amendments should be verified with the NC Department of Insurance / Office of State Fire Marshal for each project.",
  },
  energyCode: {
    commercial:
      "North Carolina Energy Conservation Code (a state-amended edition derived from the IECC with ASHRAE 90.1 as a referenced alternate for commercial buildings)",
    notes:
      "The energy code is part of the statewide NC code family and applies uniformly. North Carolina's energy code has historically lagged the newest IECC editions due to state amendment and legislative timing, so we confirm the currently effective edition rather than assuming the latest IECC.",
  },
  climate: {
    zones: "3A across the Piedmont and coastal plain (Charlotte, Raleigh, Wilmington), 4A in the western foothills, and 5A in the high mountains around Asheville and the Blue Ridge",
    drivers: [
      "Humid mixed climate with strong cooling and dehumidification loads",
      "Hurricane and tropical-storm exposure along the coast",
      "Cold mountain winters and snow in the western high country",
      "Latent-load management across a humid 3A/4A envelope",
    ],
  },
  structural: {
    seismic:
      "Mostly Seismic Design Category B, rising to C on soft coastal-plain and Piedmont soils — moderate but real, and detailing matters for essential facilities and taller structures",
    wind: "Basic wind speeds reach roughly 140–150+ mph on the Outer Banks and immediate coast (hurricane-prone region with wind-borne-debris requirements), tapering to ~115 mph in the Piedmont and lower in the mountains",
    snow: "Ground snow loads are near-negligible on the coast, rising to 15–25 psf in the Piedmont and 25–40+ psf in the mountains where snow can govern roofs",
    other: "Coastal flood and storm-surge zones govern barrier-island and sound-side foundations; expansive Piedmont clays and shrink-swell soils appear inland",
  },
  licensure: {
    board: "North Carolina Board of Examiners for Engineers and Surveyors (NCBELS)",
    notes:
      "North Carolina grants comity licensure to qualified NCEES-record engineers and accepts digital signatures and electronic seals meeting the board's rules for electronically submitted documents.",
  },
  metros: ["Charlotte", "Raleigh", "Durham", "Greensboro", "Winston-Salem", "Wilmington", "Asheville"],
  permitting:
    "North Carolina's statewide code makes technical requirements consistent, but review speed and local amendments vary between the booming Research Triangle and Charlotte metro departments and smaller coastal and mountain jurisdictions. Coastal counties add CAMA (Coastal Area Management Act) permitting for development in the coastal zone, and stormwater rules tighten for projects draining to sensitive or nutrient-sensitive waters.",
  marketNotes:
    "North Carolina is one of the fastest-growing states in the country, with the Research Triangle attracting life-sciences, semiconductor, and tech investment, and Charlotte anchoring a major banking and mixed-use market. Coastal tourism and retirement growth drive Wilmington and the coast, while the western region blends tourism, healthcare, and light manufacturing.",
  narratives: {
    mep:
      "Mechanical design across most of North Carolina answers to a humid 3A climate where latent load rivals sensible cooling, so we engineer for dehumidification and moisture control — long, muggy shoulder seasons will defeat equipment sized only for peak dry-bulb temperature and invite mold in tight envelopes. The statewide NC Energy Conservation Code keeps commercial documentation consistent from the coast to Asheville, but because the state amends and often lags the newest IECC, we confirm the effective edition before running COMcheck or an ASHRAE 90.1 model. The Research Triangle's life-science and semiconductor boom drives demanding MEP work — clean spaces, lab exhaust, redundancy, and heavy electrical service — and Duke Energy's rate structure shapes how we stage service and demand management. In the mountains around Asheville, the climate flips toward heating, and we design ventilation and freeze protection to match.",
    structural:
      "North Carolina structural design spans three regimes on one statewide code. On the Outer Banks and immediate coast, hurricane wind speeds of 140–150+ mph and wind-borne-debris requirements dominate the lateral system, and storm-surge and flood zones drive elevated, pile-supported foundations. Inland, the Piedmont brings expansive shrink-swell clays that make the geotechnical report the governing document for foundation selection, plus Seismic Design Category B–C detailing that we do not treat as an afterthought. In the western high country, ground snow loads of 25–40+ psf can control roof framing. Because North Carolina writes its own amended code rather than adopting a stock IBC year, we design to the current NC edition specifically and verify recent Building Code Council amendments — the details differ from a plain IBC project.",
    civil:
      "Site engineering in North Carolina is shaped by aggressive stormwater regulation and, on the coast, by CAMA. The state's stormwater program layers water-quality treatment on top of quantity control, and requirements tighten sharply for sites draining to nutrient-sensitive waters like the Neuse, Tar-Pamlico, and Jordan/Falls Lake watersheds — nutrient-load reduction can reshape a site plan and demand engineered BMPs such as bioretention and wet ponds. Coastal projects add Coastal Area Management Act permitting and storm-surge/flood considerations that govern grading and outfall design on barrier islands and sound-side lots. In the fast-growing Triangle and Charlotte metros we coordinate erosion-and-sediment control and dense-site grading to keep pace with high-volume local review, resolving stormwater layout early because BMP footprints directly cost developable area.",
    energy:
      "North Carolina's commercial energy code is the state-amended NC Energy Conservation Code — IECC-derived with ASHRAE 90.1 as a referenced alternate — and because the state develops its own edition on its own legislative cycle, it has historically trailed the newest IECC. We confirm the currently effective edition first, then choose the compliance path. Across the 3A/4A Piedmont and coastal plain, the biggest levers are cooling-plant right-sizing, low-SHGC glazing, and humidity control, because envelope moisture and latent load drive both comfort and energy in this climate more than raw insulation thickness. In the 5A mountains around Asheville the calculus shifts toward heating efficiency and continuous insulation. We document compliance with COMcheck or a 90.1 energy model matched to the project's trade-offs and the AHJ's expectations.",
  },
  faqs: [
    {
      q: "Which building code does North Carolina use?",
      a: "North Carolina enforces its own statewide code developed by the NC Building Code Council. It is IBC-derived but heavily amended and maintained on the state's own cycle, so it does not simply track a specific IBC year. We verify the currently effective edition and recent amendments with the NC Office of State Fire Marshal for every project.",
    },
    {
      q: "What energy code applies to commercial buildings in North Carolina?",
      a: "The North Carolina Energy Conservation Code, a state-amended IECC-derived code with ASHRAE 90.1 available as a referenced alternate. Because North Carolina amends and often lags the newest IECC, we confirm the effective edition before running compliance rather than assuming the latest national model code.",
    },
    {
      q: "How do wind loads differ between the North Carolina coast and inland?",
      a: "Dramatically. The Outer Banks and immediate coast are a hurricane-prone region with basic wind speeds around 140–150+ mph and wind-borne-debris requirements, driving impact-rated openings and pile foundations. The Piedmont runs closer to 115 mph, and the mountains lower still. We design the lateral system to the actual site wind speed and exposure rather than a one-size number.",
    },
    {
      q: "What stormwater rules should I expect on a North Carolina site?",
      a: "North Carolina's stormwater program requires both quantity control and water-quality treatment, and requirements tighten for sites draining to nutrient-sensitive watersheds like the Neuse, Tar-Pamlico, or Jordan/Falls Lake, where nutrient-load reduction demands engineered BMPs. Coastal sites also trigger CAMA permitting. We resolve BMP layout early because it directly affects developable area.",
    },
  ],
};
