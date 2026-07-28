import type { StateData } from "../types";

export const wisconsin: StateData = {
  slug: "wisconsin",
  name: "Wisconsin",
  abbrev: "WI",
  buildingCode: {
    name: "Wisconsin Commercial Building Code (SPS 361–366) based on the IBC",
    baseCode: "IBC with Wisconsin amendments (SPS chapters), historically a 2015 IBC vintage",
    notes:
      "Wisconsin enforces a mandatory statewide commercial building code through the Department of Safety and Professional Services (SPS 361–366). The state has run behind the model cycle, so the referenced IBC edition should be confirmed with SPS. Wisconsin's code system is uniform statewide, which simplifies multi-jurisdiction work.",
  },
  energyCode: {
    commercial: "Wisconsin commercial energy code (SPS 363) referencing an IECC/ASHRAE 90.1 vintage adopted statewide",
    notes:
      "Wisconsin adopts its commercial energy provisions statewide through SPS 363, historically tracking an older IECC/ASHRAE 90.1 edition than the current model codes. Compliance is uniform statewide; the current reference standard should be verified with SPS and design targeted above the minimum given the cold climate.",
  },
  climate: {
    zones: "6A across most of the state; 7 in the far north; 5A in the far southeast near Milwaukee/Kenosha",
    drivers: [
      "Very cold winters with long heating seasons (zones 6A–7)",
      "Lake-effect and heavy snow, especially in the north",
      "Deep frost penetration governing foundations",
      "Humid summers requiring dehumidification",
    ],
  },
  structural: {
    seismic: "Very low seismicity statewide — predominantly Seismic Design Category A; seismic effectively never governs",
    wind: "Basic wind speeds generally around 105–115 mph (Risk Category II); shoreline and open-terrain exposure raise pressures",
    snow: "Ground snow loads are high — commonly 30–40+ psf in the south and higher in the north, requiring drift and unbalanced-load analysis",
    other: "Deep frost (often 48+ inches in the north) governs footing depth; expansive and soft soils appear regionally",
  },
  licensure: {
    board: "Wisconsin Department of Safety and Professional Services — Engineering Examining Board",
    notes: "Wisconsin grants licensure by reciprocity/comity for NCEES-record engineers; electronic seals and digital signatures are accepted for plan submittals under board rules.",
  },
  metros: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Appleton", "Eau Claire"],
  permitting:
    "Wisconsin's SPS administers statewide commercial plan review, and larger municipalities are delegated to review under the uniform state code. This uniformity means requirements are consistent from Milwaukee to Eau Claire; commercial projects typically require SPS or delegated-agency plan approval before local permits and inspections proceed.",
  marketNotes:
    "Wisconsin's construction market is anchored by advanced manufacturing, food and dairy processing, and healthcare, with notable large-scale industrial and data-center investment in the southeast near Kenosha/Racine. Madison sustains strong life-science, university, and mixed-use development, while Green Bay and the Fox Valley remain manufacturing-driven.",
  narratives: {
    mep:
      "Wisconsin sits deep in cold-climate territory — zones 6A across most of the state and 7 in the north — so mechanical design is heating-first. We evaluate condensing boilers, VRF, and cold-climate heat pumps sized for genuinely severe design temperatures, and we detail comprehensive freeze protection because Wisconsin winters are unforgiving to exposed piping and equipment. Humid summers still require real dehumidification, particularly in food and dairy processing facilities where moisture and temperature control are process-critical. Because the energy code is adopted statewide through SPS 363, our compliance documentation is uniform, but we design envelopes and heating plants above the older adopted minimum to control the high heating cost inherent to a zone 6A–7 climate. Electrically, the manufacturing and data-center growth in the southeast pushes service capacity and reliability, and we coordinate with utilities like We Energies and Alliant Energy on demand and standby-power strategy.",
    structural:
      "Structural engineering in Wisconsin is governed by snow and frost, not seismic — the state is effectively Seismic Design Category A everywhere, so lateral design centers on wind. Ground snow loads are high, commonly 30–40+ psf in the south and greater in the north, and drifting and unbalanced loads demand careful roof framing; snow is the load that most often controls Wisconsin roof design. Frost penetration is deep, often exceeding 48 inches in the north, so we set footings well below grade to prevent heave, and we detail for frost-protected shallow foundations where appropriate. Wind speeds around 105–115 mph, elevated by open-terrain and shoreline exposure, drive uplift resistance and continuous load paths. We design gravity and lateral systems to the statewide Wisconsin Commercial Building Code (SPS 361–366) and confirm the referenced IBC edition with SPS, since Wisconsin trails the model cycle.",
    civil:
      "Site engineering in Wisconsin works within the DNR's stormwater program under NR 216 and the technical standards of NR 151, which set post-construction total suspended solids reduction and infiltration targets that are more prescriptive than many states'. Construction sites disturbing an acre or more need NPDES permit coverage and an erosion-control plan, and post-construction practices must meet the NR 151 performance standards for water quality and, where feasible, infiltration. We design detention, bioretention, and infiltration practices to those standards, accounting for Wisconsin's tight soils, high groundwater, and deep frost, which limit infiltration in cold months. Municipal MS4 requirements layer on top in urban areas. Because the state performance standards are quantitative, we model TSS reduction and volume control early to size practices correctly and keep DNR and local review on track.",
    energy:
      "Wisconsin adopts commercial energy provisions statewide through SPS 363, historically on an older IECC/ASHRAE 90.1 vintage than the current model codes. That gives us a uniform, predictable compliance baseline, which we document through COMcheck or energy modeling, but the dated minimum means the real value is in exceeding it — and in a zone 6A–7 climate the payback is fast. Envelope performance is paramount here: continuous insulation, meticulous air-barrier continuity, and infiltration control drive the biggest energy reductions, followed by efficient heating plants and daylight-and-occupancy lighting controls. For the process-heavy manufacturing and food facilities common in Wisconsin, heat recovery and efficient process heating add further savings. We also identify Focus on Energy incentive programs — Wisconsin's statewide efficiency program — that reward above-code design and help offset first cost.",
  },
  faqs: [
    {
      q: "What commercial building code does Wisconsin enforce?",
      a: "Wisconsin enforces a uniform statewide Commercial Building Code (SPS 361–366) based on the IBC, administered by the Department of Safety and Professional Services. The state runs behind the model cycle, so we confirm the referenced IBC edition with SPS at project start.",
    },
    {
      q: "How is energy compliance handled in Wisconsin?",
      a: "Energy provisions are adopted statewide under SPS 363, historically on an older IECC/ASHRAE 90.1 vintage. We document compliance via COMcheck or energy modeling and typically design above the minimum, since envelope performance pays back quickly in Wisconsin's cold zone 6A–7 climate. Focus on Energy incentives support above-code design.",
    },
    {
      q: "How much snow load do Wisconsin structures carry?",
      a: "A lot — ground snow loads commonly run 30–40+ psf in the south and higher in the north, and drift and unbalanced-load analysis usually governs roof framing. Seismic is negligible (SDC A statewide), so structural effort centers on snow, wind uplift, and deep-frost foundations often below 48 inches.",
    },
    {
      q: "What stormwater standards apply to Wisconsin sites?",
      a: "Wisconsin's DNR enforces quantitative performance standards under NR 151 (TSS reduction and infiltration) plus NPDES permit coverage under NR 216 for sites disturbing an acre or more. We model water-quality and volume-control practices early, accounting for tight soils and deep frost that limit cold-season infiltration.",
    },
  ],
};
