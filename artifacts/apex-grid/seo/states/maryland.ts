import type { StateData } from "../types";

export const maryland: StateData = {
  slug: "maryland",
  name: "Maryland",
  abbrev: "MD",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Maryland Building Performance Standards (MBPS) — statewide baseline, based on the 2021 I-Codes",
    baseCode: "2021 IBC with Maryland amendments (adopted as the MBPS)",
    notes:
      "Maryland adopts the Maryland Building Performance Standards (MBPS) as a statewide minimum — currently the 2021 I-Codes — which every local jurisdiction must adopt and may amend within limits. Because counties and Baltimore City can add local amendments, the exact requirements vary by jurisdiction even though the baseline edition is uniform statewide.",
  },
  energyCode: {
    commercial: "2021 IECC / ASHRAE 90.1-2019 (adopted within the MBPS as the Maryland energy code)",
    notes:
      "Maryland folds the energy code into the MBPS statewide, currently the 2021 IECC with ASHRAE 90.1-2019 as an alternative path. Compliance is documented via COMcheck or whole-building modeling.",
    beyondCode:
      "Maryland's Climate Solutions Now Act sets aggressive decarbonization targets and a Building Energy Performance Standard (BEPS) with emissions limits for large existing buildings; Montgomery County has its own BEPS and reach-code initiatives, and Baltimore has building energy performance requirements.",
  },
  climate: {
    zones: "4A across most of the state (Baltimore/DC suburbs, Eastern Shore); 5A in the western Appalachian counties (Garrett/Allegany)",
    drivers: [
      "Hot, humid summers requiring dehumidification",
      "Cold winters with meaningful heating loads, colder in the west",
      "Coastal and Chesapeake Bay storm/flood exposure",
      "Humid mixed climate favoring balanced envelope and moisture control",
    ],
  },
  structural: {
    seismic: "Predominantly Seismic Design Category B, trending to C on soft Coastal Plain and bay-margin soils",
    wind: "Basic wind speeds around 115–120 mph along the Atlantic coast and lower bay (Risk Category II), easing to ~110–115 mph inland",
    snow: "Ground snow loads generally 25–30 psf statewide, rising to 40–50+ psf in the western mountains (Garrett County)",
    other: "Frost depth ~30–36 in.; expansive Marlboro clay and soft Coastal Plain soils in the DC/Baltimore corridor; extensive Chesapeake Bay and coastal VE/AE flood zones",
  },
  licensure: {
    board: "Maryland State Board for Professional Engineers",
    notes:
      "Maryland grants licensure by comity and accepts NCEES records; electronic/digital seals are accepted for permit submittals. Construction documents must be sealed by a Maryland-licensed PE.",
  },
  metros: ["Baltimore", "Columbia", "Silver Spring", "Frederick", "Annapolis", "Rockville"],
  permitting:
    "Counties and Baltimore City administer permits under the statewide MBPS with their own local amendments, so requirements and review timelines differ notably between, say, Montgomery County and the Eastern Shore. The Maryland Department of the Environment (MDE) drives stormwater and sediment/erosion control, and the state's Critical Area law imposes strict development limits within 1,000 feet of the Chesapeake and Atlantic Coastal Bays tidal waters — a major, Maryland-specific site constraint.",
  marketNotes:
    "Maryland's construction market is anchored by the federal and life-science economy — NIH, FDA, and the I-270 biotech corridor in Montgomery County, plus defense and cyber around Fort Meade — alongside the Port of Baltimore's logistics and warehouse growth, healthcare, higher education (Johns Hopkins, University of Maryland), and multifamily near transit. Data-center interest and the state's decarbonization mandates are reshaping demand toward highly serviced, high-performance buildings.",
  narratives: {
    mep:
      "MEP engineering in Maryland works a humid mixed climate — Zone 4A across the populous center and Eastern Shore, 5A in the western mountains — so systems must manage both real summer latent loads and meaningful winter heating, with dehumidification control central to comfort and moisture management. We design to the 2021 IECC / ASHRAE 90.1-2019 folded into the MBPS, and increasingly to Maryland's Building Energy Performance Standard and the Climate Solutions Now Act, which push large buildings toward electrification and hard emissions limits. Montgomery County adds its own BEPS and reach-code expectations, so the DC-corridor life-science and lab market carries both demanding process ventilation and aggressive carbon targets. Utility economics (BGE, Pepco, and others) shape electrical service and any on-site generation, and for the region's biotech and data-adjacent facilities we design robust redundancy, power quality, and future electrification capacity into the base building from schematic on.",
    structural:
      "Maryland structural work is a Coastal-Plain-soils-and-flood problem more than a seismic one. Seismic is mostly SDC B (trending to C on soft bay-margin and Coastal Plain soils), while the DC/Baltimore corridor's expansive Marlboro clay and soft alluvial soils frequently drive foundation type, settlement control, and slab detailing — the geotechnical report often reshapes the scheme. Extensive Chesapeake Bay and Atlantic coastal VE/AE flood zones govern waterfront foundations and elevation. Snow is modest (25–30 psf) except in the western mountains, where 40–50+ psf governs. Coastal wind runs 115–120 mph. We design under the 2021 IBC as adopted in the MBPS, detail ~30–36-inch frost footings, and for the port-driven warehouse and logistics market coordinate large slab-on-grade, dock, and equipment-anchorage details with the subsurface conditions early.",
    civil:
      "Civil and site engineering in Maryland is governed by two powerful state frameworks. The Maryland Department of the Environment enforces some of the nation's most demanding stormwater rules through the 2000 Maryland Stormwater Design Manual (as amended), which mandates environmental site design and runoff-volume management to the maximum extent practicable, plus rigorous sediment and erosion control. Layered on top is the Critical Area law, which sharply restricts impervious cover and development within 1,000 feet of Chesapeake and coastal tidal waters — a make-or-break constraint for waterfront sites. We design grading, storm systems, and utilities to county and MDE standards, manage expansive clay and soft Coastal Plain soils, and on redevelopment sites coordinate remediation. In the dense DC and Baltimore corridors, environmental site design practices and underground storage often determine how much of a parcel is actually buildable.",
    energy:
      "Energy compliance in Maryland follows the 2021 IECC / ASHRAE 90.1-2019 adopted within the MBPS statewide, documented via COMcheck or whole-building modeling — but the bigger story is decarbonization. The Climate Solutions Now Act and the state's Building Energy Performance Standard impose emissions limits on large existing buildings, and Montgomery County and Baltimore add their own BEPS-style requirements, so for large projects operational carbon becomes a long-term obligation, not just a permit checkbox. In Zone 4A, the envelope must fight summer humidity as well as winter heat loss, so continuous insulation, air-barrier continuity, and moderate-SHGC glazing all matter, while heat pumps and energy recovery increasingly define the compliant, future-proof mechanical path. We match documentation to the local jurisdiction's amendments and model the BEPS trajectory for buildings that will face it.",
  },
  faqs: [
    {
      q: "What building code applies to my Maryland project?",
      a: "Maryland sets a statewide minimum through the Maryland Building Performance Standards (MBPS), currently the 2021 I-Codes, which every jurisdiction must adopt. Counties and Baltimore City may add local amendments, so exact requirements vary by jurisdiction even though the baseline edition is uniform. We confirm local amendments at kickoff.",
    },
    {
      q: "How do commercial buildings comply with Maryland's energy requirements?",
      a: "The energy code is folded into the MBPS statewide — currently the 2021 IECC with ASHRAE 90.1-2019 — documented via COMcheck or modeling. Large buildings also face the state's Building Energy Performance Standard and Climate Solutions Now Act emissions limits, plus local BEPS rules in Montgomery County and Baltimore.",
    },
    {
      q: "What is Maryland's Critical Area law and does it affect my site?",
      a: "The Critical Area law strictly limits impervious cover and development within 1,000 feet of Chesapeake Bay and Atlantic Coastal Bays tidal waters. If your site is within that zone, it can sharply constrain buildable area and stormwater design, so we address it — alongside MDE stormwater and sediment control — at the earliest site-planning stage.",
    },
    {
      q: "What geotechnical and load conditions govern Maryland structures?",
      a: "The DC/Baltimore corridor has expansive Marlboro clay and soft Coastal Plain soils that often drive foundation design, and seismic can rise to SDC C on soft soils. Snow is modest (25–30 psf) except in the western mountains (40–50+ psf), coastal wind runs 115–120 mph, and Bay/coastal flood zones govern waterfront foundations.",
    },
  ],
};
