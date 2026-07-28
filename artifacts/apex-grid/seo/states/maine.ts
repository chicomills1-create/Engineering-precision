import type { StateData } from "../types";

export const maine: StateData = {
  slug: "maine",
  name: "Maine",
  abbrev: "ME",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Maine Uniform Building and Energy Code (MUBEC) — statewide framework, based on the 2015 I-Codes",
    baseCode: "2015 IBC with Maine amendments (MUBEC, adopted by the Bureau of Building Codes and Standards / BBCS)",
    notes:
      "Maine's MUBEC is a statewide code (currently based on the 2015 I-Codes) but its mandatory enforcement historically applied only to municipalities above a population threshold; smaller towns may not enforce it locally even though the standard governs. As a result, whether a local code officer reviews your project depends on the town's size and whether it has adopted enforcement.",
  },
  energyCode: {
    commercial: "Maine commercial energy code within MUBEC (based on the IECC / ASHRAE 90.1 as adopted by BBCS)",
    notes:
      "The energy provisions are bundled into MUBEC statewide and reference the adopted IECC/ASHRAE 90.1 editions. Commercial compliance is documented via COMcheck or whole-building modeling.",
    beyondCode:
      "Efficiency Maine programs strongly incentivize heat pumps and above-code performance — Maine has been a national leader in cold-climate heat-pump adoption — and the state's climate plan pushes electrification.",
  },
  climate: {
    zones: "6A across most of the state; 5A along the southern coast; approaching 7 in the far north (Aroostook County)",
    drivers: [
      "Long, severe winters with very high heating loads",
      "Heavy snow, especially in the interior and north",
      "Coastal storm and nor'easter exposure with salt air",
      "Deep frost and hard-freeze detailing",
    ],
  },
  structural: {
    seismic: "Seismic Design Category B — low, with basic detailing on soft soils and essential buildings",
    wind: "Basic wind speeds generally 110–120 mph, higher along the exposed coast (Risk Category II)",
    snow: "Ground snow loads high and variable — commonly 50–70+ psf, with far-northern and interior areas exceeding 90–100 psf; snow typically governs roof design",
    other: "Deep frost (4–6 ft in the north); coastal VE/AE flood zones and salt-air corrosion; marine clay ('Presumpscot formation') along the coast can be soft and drive deep foundations",
  },
  licensure: {
    board: "Maine Board of Licensure for Professional Engineers",
    notes:
      "Maine grants licensure by comity and accepts NCEES records; digital seals are accepted for electronic submittals. Commercial construction documents must be sealed by a Maine-licensed PE.",
  },
  metros: ["Portland", "Lewiston", "Bangor", "Augusta", "Biddeford", "Brunswick"],
  permitting:
    "Because MUBEC enforcement is tied to municipal population and local adoption, review authority ranges from full code offices in Portland and Bangor to little or no local inspection in small towns. Shoreland zoning is a statewide Maine feature that heavily constrains development near water bodies, and Maine DEP administers stormwater and Site Location of Development ('Site Law') permits for larger projects, along with Natural Resources Protection Act reviews for wetlands and waterways.",
  marketNotes:
    "Maine's construction market centers on Portland-area healthcare, life sciences, and multifamily growth; Bangor and Augusta institutional and government work; a strong tourism, hospitality, and marine/boatbuilding sector along the coast; and forest-products and food-processing industry statewide. Aging building stock, an emphasis on heat-pump electrification, and coastal-resilience concerns shape much of the engineering demand.",
  narratives: {
    mep:
      "MEP engineering in Maine is heating-dominated across a Zone 6A climate (near 7 in Aroostook County), so heating capacity, freeze protection, and envelope performance drive the mechanical design while cooling is a shorter-season concern. Maine has been a national leader in cold-climate heat pumps, and Efficiency Maine incentives make electrified heating a mainstream compliant strategy — we design heat-pump and heat-recovery systems that hold capacity at Maine design temperatures, with backup and defrost strategies that account for severe cold. Freeze protection on outdoor-air paths, hydronic loops, and sprinkler lines is essential. Along the coast, salt-air corrosion protection for rooftop and shoreline equipment is a real specification issue. Central Maine Power and Versant territories and rural service constraints shape electrical design, and for Portland's healthcare and life-science buildings we deliver the demanding ventilation and redundancy those occupancies require. Because enforcement varies by town, we confirm the AHJ's review process up front.",
    structural:
      "Maine structural work is a snow-frost-and-coastal-soil problem. Snow typically governs roofs: ground snow loads run 50–70+ psf across much of the state and exceed 90–100 psf in the interior and far north, so drift, sliding snow, and rain-on-snow accumulation demand careful analysis. Deep frost — 4 to 6 ft in the north — drives footing depth. Along the coast, the soft marine clay of the Presumpscot formation can require deep foundations and settlement control, while VE/AE flood zones and 110–120+ mph coastal wind govern waterfront design. Seismic is low (SDC B). We design under the 2015 IBC as adopted in MUBEC, coordinate the geotechnical report closely for frost-susceptible and marine-clay soils, and in Maine's abundant older mill and downtown stock assess existing heavy-timber and masonry capacity before adding loads.",
    civil:
      "Civil and site engineering in Maine is shaped by strong water-resource protection. Statewide Shoreland Zoning tightly constrains development near lakes, rivers, streams, and the coast, and the Maine DEP administers the Natural Resources Protection Act (wetlands and waterways), the stormwater permit, and — for large projects — Site Location of Development ('Site Law') review, which can control the schedule. Stormwater design follows the Maine DEP stormwater standards emphasizing water-quality treatment and channel protection, tempered by cold-climate infiltration limits. We design grading, drainage, and utilities for deep frost cover and soft coastal marine clay, address coastal-resilience and sea-level-rise considerations on waterfront sites, and on rural parcels handle on-site water and wastewater. Because building enforcement is uneven across towns, we align the civil permitting with whatever local review the municipality provides.",
    energy:
      "Energy compliance in Maine follows the IECC / ASHRAE 90.1 editions adopted within MUBEC, documented via COMcheck or whole-building modeling. In a Zone 6A (near-7) climate the envelope drives everything: continuous insulation, aggressive air-sealing, thermal-bridge control, and high-performance glazing determine operating cost far more than mechanical tweaks. Maine's standout feature is its leadership in cold-climate heat pumps — backed by strong Efficiency Maine incentives and the state's climate plan — so electrified heating with heat recovery is a routine, well-supported compliant path here. We frequently model above minimum code because the incentives and the severe climate both reward it, and we specify equipment rated to hold capacity at Maine's low design temperatures so the modeled savings actually materialize through a real Maine winter.",
  },
  faqs: [
    {
      q: "Does Maine have a statewide building code?",
      a: "Maine has a statewide code framework, the Maine Uniform Building and Energy Code (MUBEC), currently based on the 2015 I-Codes. Mandatory local enforcement has historically been tied to municipal population, so larger towns have code offices while some small towns have little or no local inspection. We confirm the reviewing authority per project.",
    },
    {
      q: "What energy code applies to Maine commercial buildings?",
      a: "Maine's energy provisions are bundled into MUBEC and reference adopted IECC / ASHRAE 90.1 editions, documented through COMcheck or modeling. Maine is a national leader in cold-climate heat pumps, and Efficiency Maine incentives strongly support electrified, above-code design.",
    },
    {
      q: "How does snow drive structural design in Maine?",
      a: "Heavily. Ground snow loads run 50–70+ psf across much of Maine and exceed 90–100 psf in the interior and far north, so snow — including drift and rain-on-snow — usually governs roof design. We also design deep (4–6 ft in the north) frost footings.",
    },
    {
      q: "What water-resource permits affect Maine site development?",
      a: "Statewide Shoreland Zoning tightly limits development near water bodies, and Maine DEP administers the Natural Resources Protection Act (wetlands/waterways), stormwater permits, and Site Location of Development ('Site Law') review for large projects — often the critical-path approvals. Soft coastal marine clay also affects foundations and drainage.",
    },
  ],
};
