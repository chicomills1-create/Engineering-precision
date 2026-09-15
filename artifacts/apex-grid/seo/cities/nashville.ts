import type { CityData } from "../types";

export const nashville: CityData = {
  slug: "nashville",
  name: "Nashville",
  stateSlug: "tennessee",
  county: "Davidson County (Metro Nashville)",
  ahj: {
    office: "Metropolitan Government of Nashville and Davidson County — Department of Codes and Building Safety (Metro Codes)",
    process:
      "Nashville and Davidson County operate under a consolidated Metro government, so Metro Codes is the single AHJ for the county. Commercial plan review and permitting run through Metro's online portal (the ePermits / eplans system), with electronic submittal and multi-discipline review. Metro Codes publishes review timelines and offers pre-application and larger-project coordination; site plans and stormwater review are handled alongside building permits, and Metro Water Services reviews the stormwater and grading package separately from the building set.",
  },
  codes: {
    building:
      "Nashville-adopted International Building Code edition administered by Metro Codes (Metro adopts and amends its own local edition rather than defaulting to the statewide 2018 IBC baseline)",
    energy:
      "Nashville-adopted IECC commercial energy code administered by Metro Codes, with ASHRAE 90.1 as an alternate compliance path",
    amendments:
      "Because Nashville runs its own building department, it adopts and amends its own code edition and does not simply default to Tennessee's statewide 2018 IBC minimum — so we verify the exact edition and local amendments Metro Codes currently enforces for each project. Local layers that reshape design include Metro's stormwater management regulations, floodplain ordinances tied to the Cumberland River corridor, and the Metro zoning/overlay framework.",
  },
  utilities: {
    electric:
      "Nashville Electric Service (NES), a public utility that distributes TVA-generated power throughout Davidson County",
    notes:
      "NES is a public distributor of Tennessee Valley Authority power, with its own commercial rate schedules and demand charges shaped by TVA wholesale rates and interconnection requirements. Large new services can carry transformer lead times we confirm early. Metro Water Services provides water, sewer, and stormwater, and its capacity, connection fees, and combined-sewer areas in the older urban core factor into site feasibility.",
  },
  climateNotes:
    "Nashville sits in Middle Tennessee in ASHRAE climate zone 4A — a genuine four-season climate with humid summers demanding latent-load management and real winter heating loads — over karst limestone terrain with sinkhole potential and Cumberland River-corridor flood exposure.",
  marketNotes:
    "Nashville is among the South's hottest construction markets, driven by a healthcare-industry cluster (hospital systems and HCA headquarters), a booming hospitality and entertainment sector downtown, sustained corporate relocations (including major tech and financial campuses), and heavy multifamily and mixed-use growth. That pace has stretched Metro Codes' review capacity, making early stormwater and floodplain coordination essential to schedule.",
  narratives: {
    mep:
      "MEP design in Nashville serves a true four-season zone 4A climate — humid summers that demand latent-load management and genuinely cold winters that demand heating capacity and freeze protection — so we size for a balanced load profile rather than a single dominant season. The healthcare and hospitality boom means much of the work is large, systems-intensive space (hospitals, hotels, towers) where redundancy, right-sized electrical service, and efficient large-volume HVAC drive performance and compliance. Nashville Electric Service distributes TVA power with demand-charge commercial rates and interconnection requirements we confirm at schematic design, and large services can carry transformer lead times. Because Metro Codes adopts and amends its own IECC edition rather than defaulting to Tennessee's statewide baseline, we confirm the effective edition before running COMcheck or an ASHRAE 90.1 model and file through Metro's ePermits portal.",
    structural:
      "Nashville structural design is a karst-and-flood problem more than a seismic one. Middle Tennessee sits well east of the New Madrid influence that governs Memphis, so seismic is comparatively low (around SDC B), and wind runs a moderate ~105-115 mph with tornado and severe-storm exposure that supports storm-shelter demand for schools and institutional projects. The defining subsurface variable is karst limestone: sinkholes, solution cavities, and pinnacled rock produce variable bearing that can dictate deep or grouted foundations and careful pond siting, so the geotechnical report governs foundation selection. Cumberland River-corridor flood exposure sets the structural and equipment datum on low-lying sites. Because Metro Codes adopts its own amended edition, we design to the current Nashville code specifically and set up special inspections administered by Metro Codes rather than a generic statewide checklist.",
    civil:
      "Civil and site engineering in Nashville has to reckon with karst geology and Cumberland River flooding alongside conventional stormwater performance. Across Davidson County, sinkholes and subsurface drainage can complicate detention siting and infiltration, so we coordinate closely with geotechnical findings to avoid concentrating runoff over potential voids. We design detention and conveyance to Metro's stormwater management regulations, sized for Middle Tennessee's heavy rainfall and cloudburst runoff, and integrate the floodplain ordinances tied to the Cumberland corridor — floodplain review can govern grading, fill, and finished-floor elevations. Metro Water Services reviews the stormwater and grading package separately from the building set, so we resolve BMP layout early. Sites disturbing an acre or more require TDEC construction stormwater (CGP) coverage and a SWPPP, with erosion control shaped around the rolling karst topography.",
    energy:
      "Nashville's commercial energy code is a Metro-adopted IECC edition administered by Metro Codes, with ASHRAE 90.1 as an alternate — and because Nashville runs its own department rather than defaulting to Tennessee's statewide 2018 IECC minimum, we confirm the exact edition Metro enforces before choosing a compliance path. Sitting in zone 4A, the climate pulls in two directions: winters cold enough to justify a well-insulated, airtight shell, summers humid enough that cooling efficiency and moisture control cannot be an afterthought. On the large healthcare and hospitality footprints driving the boom, the biggest wins come from airtight envelopes over big volumes and cooling plants sized to the real load. We reconcile envelope U-factors, lighting power density, and equipment efficiencies with COMcheck or a performance model and file through Metro's ePermits workflow.",
  },
  faqs: [
    {
      q: "Who is the building authority in Nashville?",
      a: "Nashville and Davidson County operate under a consolidated Metro government, so the Metropolitan Department of Codes and Building Safety (Metro Codes) is the single AHJ for the entire county. Commercial plan review and permitting run through Metro's online ePermits portal, with stormwater and grading reviewed separately by Metro Water Services alongside the building set.",
    },
    {
      q: "Does Nashville use the Tennessee statewide building code?",
      a: "Not by default. Because Nashville runs its own Metro Codes department, it adopts and amends its own code edition rather than defaulting to Tennessee's statewide 2018 IBC/IECC minimum, which applies mainly where local governments have not adopted their own. We verify the exact building and energy code editions and local amendments Metro Codes currently enforces for each project.",
    },
    {
      q: "How do karst and flooding affect Nashville site and foundation design?",
      a: "Both are central. Middle Tennessee's karst limestone produces sinkholes and solution cavities that can require deep or grouted foundations and careful stormwater siting to avoid concentrating runoff over voids, so the geotechnical report governs foundation choices. Along the Cumberland River corridor, Metro's floodplain ordinances can control grading, fill, and finished-floor and equipment elevations, which we integrate early with the structural and civil design.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 93, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.nashville.gov/departments/codes"],
      codes: ["https://www.nashville.gov/departments/codes/codes-administration"],
      amendments: ["https://www.nashville.gov/departments/codes/codes-administration"],
      utilities: ["https://www.nespower.com/"],
      climate: ["https://www.weather.gov/ohx/"],
      market: ["https://www.nashville.gov/departments/mayor/economic-opportunity"],
    },
  },
};
