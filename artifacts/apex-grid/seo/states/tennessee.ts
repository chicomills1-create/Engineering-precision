import type { StateData } from "../types";

export const tennessee: StateData = {
  slug: "tennessee",
  name: "Tennessee",
  abbrev: "TN",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "2018 International Building Code adopted as the statewide commercial baseline by the State Fire Marshal's Office",
    baseCode: "2018 IBC with Tennessee amendments (statewide commercial minimum)",
    notes:
      "Tennessee's State Fire Marshal's Office adopts a statewide commercial building code — currently based on the 2018 IBC — that applies where local governments have not adopted their own. Larger cities like Nashville, Memphis, and Knoxville administer local building departments and may enforce their own adopted editions and amendments.",
  },
  energyCode: {
    commercial: "2018 IECC / ASHRAE 90.1-2016 as the statewide commercial energy baseline",
    notes:
      "The commercial energy code tracks the state-adopted IECC edition, with ASHRAE 90.1 as an accepted alternate path. Enforcement is administered locally alongside the building code.",
  },
  climate: {
    zones: "4A across most of the state, with 3A in the far southwest around Memphis",
    drivers: [
      "Genuine four-season climate with both cooling and heating loads",
      "Humid summers requiring latent-load management",
      "New Madrid seismic influence in West Tennessee",
      "Heavy rainfall and river-corridor flood exposure",
    ],
  },
  structural: {
    seismic: "Highly variable — the New Madrid Seismic Zone drives Seismic Design Category C–D in West Tennessee (including Memphis), dropping toward SDC B in the middle and east of the state",
    wind: "Basic wind speeds around 105–115 mph (Risk Category II); tornado and severe-storm exposure across the state",
    snow: "Low to moderate ground snow loads, generally 10–15 psf, higher in the eastern mountains",
    other: "Karst terrain and sinkholes across Middle and East Tennessee; expansive and variable soils; river-corridor flood exposure along the Mississippi, Cumberland, and Tennessee Rivers",
  },
  licensure: {
    board: "Tennessee Board of Architectural and Engineering Examiners",
    notes: "Tennessee grants licensure by comity for qualified out-of-state PEs and requires a Certificate of Authorization for firms. Electronic seals are accepted per board rules.",
  },
  metros: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville", "Murfreesboro"],
  permitting:
    "Tennessee's statewide code baseline provides predictability, but Nashville, Memphis, and Knoxville run active local building departments with their own review timelines and amendments. Nashville's sustained growth has stretched review capacity, while Memphis-area projects add New Madrid seismic scrutiny and Mississippi-corridor floodplain requirements.",
  marketNotes:
    "Tennessee is among the South's hottest construction markets — Nashville's healthcare, hospitality, and corporate-relocation boom; Memphis's global logistics hub anchored by FedEx; and a major automotive and battery-manufacturing wave including large EV plants. Data centers and advanced manufacturing add to strong statewide demand.",
  narratives: {
    mep:
      "MEP engineering in Tennessee serves a true four-season climate — most of the state sits in climate zone 4A, where designs must handle humid summers and genuinely cold winters with equal competence. We size heating and cooling for that balanced load profile, manage latent load through the humid months, and specify controls and freeze protection appropriate to the winter minimums. Nashville's healthcare and hospitality boom and Memphis's logistics engine mean much of our work is large, systems-intensive space — hospitals, hotels, and distribution facilities — where redundancy, right-sized electrical service, and efficient large-volume HVAC drive both performance and code compliance. Because Tennessee adopts the 2018 IECC statewide, our HVAC, lighting, and plumbing documentation matches that edition with ASHRAE 90.1-2016 as an alternate path. The balanced heating-and-cooling demand makes Tennessee MEP design more forgiving of neither season than the hot-humid states to its south.",
    structural:
      "Tennessee delivers one of the most location-dependent structural pictures in the country because of the New Madrid Seismic Zone. In West Tennessee — Memphis especially — seismic demand reaches Seismic Design Category C–D, making ductile detailing, drift control, and anchorage governing concerns; the same building type in Knoxville sits at a far lower SDC B. We evaluate site-specific seismic parameters before setting the lateral system, because the difference reshapes connections, bracing, and cost. Layered on top is karst terrain across Middle and East Tennessee, where sinkholes and subsurface voids can dictate deep or grouted foundations, and river-corridor flood exposure along the Mississippi, Cumberland, and Tennessee. Tornado and severe-storm risk supports storm-shelter demand for schools and institutional projects. We set each project's structural basis by its region — a Memphis, Nashville, and Knoxville site can be three distinct design problems.",
    civil:
      "Civil and site engineering in Tennessee has to reckon with karst geology alongside conventional stormwater performance. Across Middle and East Tennessee, sinkholes and subsurface drainage can complicate detention siting, infiltration design, and utility routing, so we coordinate closely with geotechnical findings to avoid concentrating water over potential voids. We design detention and conveyance to each city's local criteria — Nashville and Memphis publish their own stormwater manuals — sized for the region's heavy rainfall, and integrate floodplain requirements along the major river corridors. Sites disturbing an acre or more require TDEC construction stormwater (CGP) permit coverage and a SWPPP, with sediment and erosion measures shaped around the rolling topography and cloudburst runoff. Rapid growth around Nashville and Murfreesboro has pushed jurisdictions toward stricter water-quality and low-impact-development standards, which our grading and drainage packages reflect.",
    energy:
      "The statewide floor for commercial energy in Tennessee is the 2018 IECC, with ASHRAE 90.1-2016 available as a substitute path, so even though individual cities run their own review desks the target itself is fixed. Sitting in zone 4A, the state pulls compliance in two directions at once: winters cold enough to justify a well-insulated shell, summers humid enough that cooling efficiency and moisture control cannot be an afterthought. We select the documentation format — prescriptive COMcheck or a performance model — to fit the building, then square envelope U-factors against lighting power density and equipment efficiencies before anything goes to plan check. Hospitals, hotels, and distribution centers are the engines of Tennessee's building boom, and on those large footprints the biggest wins come from airtight envelopes over big volumes and cooling plants sized to the real load. When a client reaches for above-code performance or utility incentives, we lead with the numbers on return.",
  },
  faqs: [
    {
      q: "Does Tennessee have a statewide building code?",
      a: "Yes. The State Fire Marshal's Office adopts a statewide commercial baseline — currently based on the 2018 IBC — that applies where local governments have not adopted their own. Nashville, Memphis, and Knoxville administer local building departments and may enforce their own editions and amendments.",
    },
    {
      q: "Is seismic design required in Tennessee?",
      a: "It hinges on where the project sits. West Tennessee, Memphis included, falls under New Madrid influence and climbs into Seismic Design Category C–D, so the lateral system turns on ductility and tight drift limits. Middle and East Tennessee run considerably lower at about SDC B, so we establish the governing seismic parameters for the specific site before laying out the structure.",
    },
    {
      q: "Which energy code applies to Tennessee commercial buildings?",
      a: "The statewide baseline is the 2018 IECC, and ASHRAE 90.1-2016 serves as an accepted alternate route. Since review happens at the local level, we build the compliance package — a COMcheck filing or a full energy model — around whatever edition the permitting jurisdiction has on the books.",
    },
    {
      q: "How does karst terrain affect Tennessee site and foundation design?",
      a: "Significantly across Middle and East Tennessee. Sinkholes and subsurface voids can require deep or grouted foundations and careful stormwater siting to avoid concentrating water over potential voids. We coordinate structural and civil design with the project geotechnical report to manage karst risk.",
    },
  ],
};
