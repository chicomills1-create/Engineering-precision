import type { StateData } from "../types";

export const southCarolina: StateData = {
  slug: "south-carolina",
  name: "South Carolina",
  abbrev: "SC",
  buildingCode: {
    name: "South Carolina Building Codes (mandatory statewide minimum), based on the 2021 I-Codes",
    baseCode: "2021 IBC with South Carolina modifications",
    notes:
      "South Carolina sets a mandatory statewide minimum code through the SC Building Codes Council, and local jurisdictions must enforce at least that edition (the state moved to the 2021 I-Codes). Local governments may adopt more recent editions and limited amendments, so the governing edition should be confirmed with the specific municipality or county, particularly in the fast-growing coastal and Upstate markets.",
  },
  energyCode: {
    commercial:
      "2009 IECC as the statewide energy standard adopted by the Building Codes Council, with ASHRAE 90.1 available as a referenced alternate for commercial buildings",
    notes:
      "South Carolina's adopted energy code has historically trailed the building-code cycle — the state's statewide energy standard is notably older than its structural code — so commercial energy compliance is set by that adopted edition, not the newest IECC. We confirm the effective energy edition and any local upgrades at project start.",
  },
  climate: {
    zones: "3A across most of the state including Columbia, Charleston, and Greenville; a small 2A pocket along the far southern coast",
    drivers: [
      "Hot, humid summers with heavy cooling and latent loads",
      "Hurricane and tropical-storm exposure along the Lowcountry coast",
      "Mild winters with short heating seasons",
      "Aggressive dehumidification to protect envelopes and interiors",
    ],
  },
  structural: {
    seismic:
      "The Charleston region is the notable eastern seismic hotspot — the 1886 Charleston earthquake drives elevated seismic design (Seismic Design Category D on many Lowcountry soils), while the Upstate and Midlands are typically Category B–C",
    wind: "Basic wind speeds reach roughly 140–150+ mph on the immediate coast (hurricane-prone region with wind-borne-debris requirements), tapering to ~115 mph in the interior",
    snow: "Ground snow loads are negligible across nearly the entire state; snow rarely governs roof design outside brief anomalies",
    other: "Soft, liquefiable coastal-plain soils near Charleston, storm-surge and coastal flood zones, and expansive clays in parts of the Midlands",
  },
  licensure: {
    board: "South Carolina Board of Registration for Professional Engineers and Surveyors (part of LLR)",
    notes:
      "South Carolina licenses engineers by comity and recognizes NCEES records; the board permits digital signatures and electronic seals meeting its authentication requirements for electronic submittals.",
  },
  metros: ["Charleston", "Columbia", "Greenville", "Mount Pleasant", "Rock Hill", "Myrtle Beach"],
  permitting:
    "With a mandatory statewide minimum code, technical baselines are consistent, but adopted editions and review pace vary between the booming Charleston and Greenville-Spartanburg (Upstate) markets and smaller jurisdictions. Coastal counties add OCRM/DHEC coastal-zone review and stormwater permitting, and the Lowcountry's flood and surge exposure makes floodplain compliance a routine permitting gate.",
  marketNotes:
    "The Upstate is a major advanced-manufacturing corridor — automotive (BMW), aerospace, and tire production anchor the I-85 belt — while Charleston combines port logistics, aerospace (Boeing), and rapid residential growth. Myrtle Beach and the coast run tourism and retirement construction; the whole state ranks among the faster-growing in the Southeast.",
  narratives: {
    mep:
      "MEP engineering in South Carolina is a hot-humid, cooling-and-latent-load discipline: across the 3A climate, dehumidification is the make-or-break design goal, and systems sized only for peak sensible cooling leave Lowcountry buildings damp and mold-prone through long, muggy seasons. We engineer for humidity control, generous outdoor-air treatment, and condensate management as first-order concerns. Because South Carolina's adopted energy code trails its building code, we confirm the effective energy edition before running COMcheck or ASHRAE 90.1, and we typically design above the older adopted energy floor to meet owner and lender expectations. The Upstate's advanced-manufacturing plants demand rugged process-adjacent HVAC, compressed air, and heavy electrical service, while Charleston's port-logistics and aerospace facilities push large ventilation and power loads. Utility rate structures (Dominion Energy SC, Duke) inform how we stage electrical service and manage demand.",
    structural:
      "South Carolina is the eastern seismic exception every structural engineer should know: the 1886 Charleston earthquake — one of the largest in the eastern U.S. — drives Seismic Design Category D on much of the Lowcountry's soft, liquefiable soils, a regime far more demanding than the Category B most of the Southeast enjoys. We design Charleston-area structures with full seismic detailing and coordinate closely with geotechnical engineers on liquefaction mitigation and foundation systems. On the immediate coast, hurricane wind speeds of 140–150+ mph and wind-borne-debris rules govern the lateral system, and storm-surge/flood zones push foundations to elevated, pile-supported schemes. Inland in the Upstate and Midlands, seismic drops toward Category B–C and wind moderates, but expansive Midlands clays can control foundation design. Snow is a non-factor statewide, so wind and seismic — not snow — set the roof and lateral demands.",
    civil:
      "Civil engineering in the Lowcountry is dominated by water and flat, poorly draining terrain. Charleston-area sites contend with high water tables, tidal influence, and storm-surge flood zones, so stormwater design leans on detention, controlled outfalls, and careful finished-grade elevation rather than infiltration. Coastal development triggers DHEC/OCRM coastal-zone review alongside the state's stormwater permitting, and floodplain compliance is a routine gate. We design erosion-and-sediment control and stormwater BMPs to South Carolina's NPDES construction requirements and local standards, and we treat flood elevation as an early, governing decision on the coast. In the Upstate, steeper terrain shifts the emphasis toward grading, slope stability, and detention on constrained industrial and commercial sites along the I-85 corridor. Either way, stormwater footprint is resolved during preliminary layout.",
    energy:
      "South Carolina's statewide energy standard — historically the 2009 IECC with ASHRAE 90.1 as a referenced alternate — is notably older than its building code, so the first step in any commercial project is confirming the adopted energy edition and any local upgrades rather than assuming the newest IECC. In the state's hot-humid 3A climate, the highest-leverage moves are cooling-plant right-sizing, low-SHGC glazing, tight air-sealing, and dedicated dehumidification, because latent load and envelope moisture govern both energy use and comfort far more than winter heat loss. Even where the adopted floor is dated, we frequently design above it to satisfy owners, lenders, and utility incentive programs. We document compliance through COMcheck or a 90.1 energy model matched to the project's envelope and mechanical trade-offs.",
  },
  faqs: [
    {
      q: "Does South Carolina have a statewide building code?",
      a: "Yes — the SC Building Codes Council sets a mandatory statewide minimum, currently based on the 2021 I-Codes, that every jurisdiction must enforce. Local governments may adopt newer editions and limited amendments, so we confirm the governing edition with the specific city or county, especially in the fast-growing Charleston and Upstate markets.",
    },
    {
      q: "Why does South Carolina's energy code seem older than its building code?",
      a: "Because they're adopted on separate tracks. The statewide energy standard has historically trailed the building-code cycle (the adopted energy edition is notably older than the structural code), so commercial energy compliance is set by that adopted edition. We confirm the effective energy code at kickoff and often design above it to meet lender and owner expectations.",
    },
    {
      q: "Is seismic design really a concern in South Carolina?",
      a: "In the Charleston region, absolutely. The 1886 Charleston earthquake was among the largest in the eastern U.S., and much of the Lowcountry's soft, liquefiable soil is Seismic Design Category D — a demanding regime requiring full seismic detailing and liquefaction coordination. The Upstate and Midlands are typically Category B–C. We evaluate site class and location rather than assuming eastern seismicity is trivial.",
    },
    {
      q: "What governs foundation design on the South Carolina coast?",
      a: "Soft, often liquefiable coastal-plain soils combined with high water tables, storm surge, and flood-zone elevation requirements. Charleston-area foundations frequently need pile support and liquefaction mitigation, and flood elevation is an early governing decision. We coordinate the geotechnical report and flood mapping before setting the foundation scheme.",
    },
  ],
};
