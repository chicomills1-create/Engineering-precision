import type { StateData } from "../types";

export const oregon: StateData = {
  slug: "oregon",
  name: "Oregon",
  abbrev: "OR",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Oregon Structural Specialty Code (OSSC), 2022 edition",
    baseCode: "2021 IBC with extensive Oregon amendments",
    notes:
      "Oregon enforces a mandatory statewide code through the Building Codes Division (BCD); local jurisdictions cannot amend it, giving Oregon one of the most uniform code environments in the country. The OSSC is updated on the state's own cycle from the IBC base.",
  },
  energyCode: {
    commercial: "Oregon Energy Efficiency Specialty Code (OEESC), based on ASHRAE 90.1 / IECC with aggressive state amendments",
    notes:
      "Oregon adopts its own statewide commercial energy code (OEESC) rather than the IECC verbatim, and it is among the most stringent in the nation. Compliance is documented against the OEESC edition in force, not a plain COMcheck IECC run.",
    beyondCode: "Oregon's Reach Code offers an optional above-code path, and Energy Trust of Oregon provides substantial commercial incentives; Portland has pursued benchmarking and energy-performance policies.",
  },
  climate: {
    zones: "4C (marine) west of the Cascades (Portland, Eugene, Salem); 5B and colder in Bend and the high desert east of the Cascades",
    drivers: [
      "Mild, wet marine climate west of the Cascades with modest cooling loads",
      "Heavy rainfall driving stormwater and moisture/envelope detailing",
      "Cold, dry high-desert climate east of the Cascades",
      "Growing summer peak-cooling needs and wildfire-smoke filtration",
    ],
  },
  structural: {
    seismic: "High along the coast and Willamette Valley due to the Cascadia Subduction Zone — SDC D common west of the Cascades, with essential-facility and resilience focus",
    wind: "Basic wind speeds generally 95–110 mph inland, higher on the exposed Pacific coast",
    snow: "Modest in the Willamette Valley; substantial in the Cascades and high desert, with mountain and Bend-area loads governing roofs",
    other: "Liquefaction and deep soft soils in the Willamette Valley and Portland basin; coastal tsunami-inundation zones limit siting of critical facilities",
  },
  licensure: {
    board: "Oregon State Board of Examiners for Engineering and Land Surveying (OSBEELS)",
    notes: "Oregon licenses PEs by comity for qualified out-of-state applicants and accepts electronic seals; the state applies specific rules on seal and signature requirements for digital submittals.",
  },
  metros: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Bend"],
  permitting:
    "Oregon's uniform statewide code makes plan review consistent across jurisdictions, though metro Portland and Washington County (Hillsboro's Silicon Forest) run high-volume review. Stormwater is a defining permitting issue — Portland's on-site infiltration and green-infrastructure requirements are among the strictest in the country — and Cascadia seismic detailing is expected on essential facilities.",
  marketNotes:
    "Oregon's construction market is anchored by the semiconductor and high-tech cluster in Washington County (Intel and the Silicon Forest), data centers in the Columbia River corridor near The Dalles and Hermiston, and steady Portland-metro commercial and institutional work. Fast-growing Bend adds high-desert development, and mass-timber construction is a notable regional strength.",
  narratives: {
    mep:
      "Oregon MEP design divides at the Cascades. West of the range, the mild, wet marine climate keeps cooling loads modest, so we lean on economizers, heat recovery, and — increasingly — heat pumps that suit both the climate and Oregon's aggressive decarbonization posture; moisture management and ventilation to control the damp are as important as raw capacity. East of the Cascades, Bend and the high desert impose real heating loads and dry-climate opportunities. Across the state we design to the Oregon Energy Efficiency Specialty Code, one of the nation's most demanding, and coordinate with Energy Trust of Oregon incentives that meaningfully improve project economics. Wildfire-smoke events now drive enhanced filtration on both sides of the range, and the semiconductor and data-center growth in the Silicon Forest and Columbia corridor pushes large, redundant electrical and cooling infrastructure that we coordinate closely with utilities.",
    structural:
      "Structural engineering in western Oregon is dominated by the Cascadia Subduction Zone, which subjects the coast and Willamette Valley to high seismic demand — SDC D is common — and to long-duration ground motion that drives resilience-focused detailing on essential facilities. We coordinate with geotechnical engineers on liquefaction and the deep, soft soils of the Portland basin and Willamette Valley, and account for coastal tsunami-inundation zones that restrict siting of critical buildings. Oregon is also a national leader in mass timber, and we detail cross-laminated-timber and glulam systems for both gravity and, increasingly, lateral resistance. East of the Cascades, snow loads in Bend and the mountains govern roof framing. Because the statewide OSSC cannot be locally amended, the governing edition is consistent, letting us standardize seismic detailing across jurisdictions.",
    civil:
      "Civil and site engineering in Oregon is defined by stormwater. West of the Cascades, heavy rainfall combined with some of the strictest on-site management rules in the country — Portland's infiltration and green-infrastructure requirements in particular — mean bioretention, vegetated facilities, and infiltration testing shape site layout from the outset. We design stormwater treatment and flow-control facilities, grading, utility connections, and ADA-compliant paving to each jurisdiction's standards and to Oregon's construction stormwater permit. Land-use planning under Oregon's statewide goals and urban growth boundaries adds an entitlement layer unfamiliar to many out-of-state developers. East of the Cascades, the high-desert hydrology and drywell-based drainage in the Bend area change the approach entirely, so we tailor stormwater strategy to the specific regional conditions rather than applying a single template.",
    energy:
      "Oregon does not use a plain IECC — it enforces the Oregon Energy Efficiency Specialty Code (OEESC), a statewide, ASHRAE 90.1-based code among the most stringent in the nation, so a generic COMcheck run against the IECC is not compliance here. We document against the OEESC edition in force, and can pursue the optional Oregon Reach Code for projects targeting above-code performance. In the marine climate west of the Cascades, the levers differ from most of the country: reducing plug and lighting loads, heat recovery, and efficient heat-pump heating matter more than fighting cooling, while high-desert eastern projects prioritize envelope insulation. We pair compliance with Energy Trust of Oregon commercial incentives, which are substantial enough to reshape equipment and envelope decisions in the client's favor.",
  },
  faqs: [
    {
      q: "What building code applies to Oregon commercial projects?",
      a: "The Oregon Structural Specialty Code (OSSC), a mandatory statewide code based on the 2021 IBC with Oregon amendments. Local jurisdictions cannot amend it, so the governing edition is uniform statewide — one of the most consistent code environments in the country.",
    },
    {
      q: "Does Oregon use the IECC for commercial energy compliance?",
      a: "Not directly. Oregon enforces its own Oregon Energy Efficiency Specialty Code (OEESC), based on ASHRAE 90.1 with aggressive state amendments and among the most stringent in the nation. Compliance is documented against the OEESC, not a plain IECC COMcheck, and Energy Trust of Oregon incentives are available.",
    },
    {
      q: "How does the Cascadia Subduction Zone affect structural design in Oregon?",
      a: "West of the Cascades, the Cascadia Subduction Zone drives high seismic demand — Seismic Design Category D is common — plus long-duration ground motion and liquefaction concerns in the soft Willamette Valley and Portland basin soils. Essential facilities get resilience-focused detailing, and coastal sites face tsunami-inundation siting limits.",
    },
    {
      q: "Why is stormwater such a big issue for Oregon site design?",
      a: "West of the Cascades, heavy rainfall combined with strict on-site management rules — Portland's infiltration and green-infrastructure requirements are among the toughest anywhere — means bioretention and infiltration facilities shape site layout early. We design these facilities and infiltration testing at the preliminary stage to protect developable area.",
    },
  ],
};
