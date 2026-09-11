import type { CityData } from "../types";

export const charlotte: CityData = {
  slug: "charlotte",
  name: "Charlotte",
  stateSlug: "north-carolina",
  county: "Mecklenburg County",
  ahj: {
    office: "Mecklenburg County Code Enforcement (Land Use and Environmental Services Agency), which administers building permits for the City of Charlotte",
    process:
      "Building permitting for Charlotte is handled at the county level by Mecklenburg County Code Enforcement, with commercial plan review and permitting through its online portal (the county's e-permitting / Accela-based system and the POSSE/plan-review tools). Site and land-development review runs separately through the City of Charlotte's Land Development division. The county publishes review timelines and offers Commercial Plan Review Express and appointment-based options; large projects benefit from pre-submittal coordination between city land development and county building review.",
  },
  codes: {
    building:
      "North Carolina State Building Code (IBC-derived, developed and amended by the NC Building Code Council), enforced by Mecklenburg County Code Enforcement",
    energy:
      "North Carolina Energy Conservation Code (state-amended, IECC-derived), with ASHRAE 90.1 as a referenced alternate for commercial buildings",
    amendments:
      "North Carolina writes its own amended statewide code on its own cycle rather than adopting a stock IBC year, and legislative changes have affected update timing — so the governing edition and recent NC Building Code Council amendments should be verified for each project. Locally, the City of Charlotte's Unified Development Ordinance (UDO), tree ordinance, and Post-Construction Stormwater (PCSO) rules add site requirements that reshape design.",
  },
  utilities: {
    electric:
      "Duke Energy Carolinas serves the City of Charlotte and Mecklenburg County (Charlotte is Duke Energy's corporate headquarters)",
    notes:
      "Duke Energy Carolinas commercial rates carry demand charges, and large new services — the uptown tower pipeline, data centers, and manufacturing — can face transformer and substation lead times we confirm early. Charlotte Water (a City of Charlotte utility) provides water and sewer countywide, and its capacity fees and sanitary-sewer availability factor into site feasibility.",
  },
  climateNotes:
    "Charlotte sits in the Piedmont in ASHRAE climate zone 3A — humid subtropical — with long, muggy cooling seasons where latent load rivals sensible cooling, plus mild but real winter heating. The dense uptown core adds an urban heat-island effect that keeps summer nights warm.",
  marketNotes:
    "Charlotte is a major banking and financial-services hub with a heavy uptown high-rise and mixed-use pipeline, growing life-science, corporate-relocation, and advanced-manufacturing activity, and one of the Southeast's active data-center and logistics corridors in the surrounding region. Strong in-migration drives multifamily and healthcare construction, keeping county building review and city land-development queues busy.",
  narratives: {
    mep:
      "MEP design in Charlotte answers to a humid Piedmont zone 3A climate where latent load rivals sensible cooling across long, muggy shoulder seasons — designs sized only for peak dry-bulb invite mold in tight envelopes — so we prioritize dehumidification and vapor-aware envelope coordination. Uptown's heat island keeps nights warm and trims free-cooling hours. Duke Energy Carolinas, headquartered in Charlotte, serves the city with demand-charge-heavy commercial rates that reward load-shifting and honestly sized services, and the uptown tower and data-center pipeline can run into transformer lead times we confirm at schematic design. Because North Carolina develops and often lags its own amended energy code, we confirm the effective NC Energy Conservation Code edition before running COMcheck or an ASHRAE 90.1 model, and we file through Mecklenburg County Code Enforcement's plan-review system.",
    structural:
      "Charlotte structural design is a Piedmont soils problem more than a lateral-load one. Seismic is moderate (generally SDC B, rising to C on softer soils) and inland wind runs about 115 mph, so the geotechnical report typically governs: Piedmont residual soils over weathered rock, with pockets of expansive shrink-swell clay, produce variable bearing that drives spread footings, drilled piers, or deepened foundations. On the dense uptown infill sites the high-rise pipeline favors, we coordinate shoring and adjacent-structure protection early. Critically, North Carolina writes its own amended code rather than adopting a stock IBC year, so we design to the current NC edition specifically, verify recent Building Code Council amendments, and set up special-inspection programs administered by Mecklenburg County Code Enforcement rather than a generic IBC checklist.",
    civil:
      "Site engineering in Charlotte is shaped by aggressive local stormwater regulation on erosive Piedmont clay. The City of Charlotte's Post-Construction Stormwater Ordinance (PCSO) layers water-quality treatment and runoff-volume control on top of quantity control, and requirements tighten in the water-supply watersheds around Mountain Island Lake and Lake Wylie that feed the region's drinking water — driving engineered BMPs such as bioretention, wet ponds, and buffers. The city's UDO and tree ordinance add buffer and canopy requirements that can reshape a site plan. Site and land-development review runs through City of Charlotte Land Development while building permits go through Mecklenburg County, so we coordinate both tracks and resolve BMP layout early because footprints directly cost developable area. Sites over an acre require NCDEQ NPDES construction stormwater coverage and erosion-and-sediment control.",
    energy:
      "Charlotte's commercial energy code is the state-amended NC Energy Conservation Code — IECC-derived with ASHRAE 90.1 as a referenced alternate — and because North Carolina develops its own edition on its own legislative cycle, it has historically trailed the newest IECC. We confirm the currently effective edition first, then choose the compliance path. In the humid Piedmont zone 3A, the biggest levers are cooling-plant right-sizing, low-SHGC glazing, and humidity control, since latent load and envelope moisture drive comfort and energy more than raw insulation thickness. The uptown heat island further trims economizer value. We document compliance with COMcheck or a 90.1 energy model matched to the trade-offs and file it through Mecklenburg County Code Enforcement, reconciling envelope, mechanical, and lighting together.",
  },
  faqs: [
    {
      q: "Who issues building permits for projects in Charlotte?",
      a: "Building permits and commercial plan review for the City of Charlotte are handled at the county level by Mecklenburg County Code Enforcement through its online e-permitting system. Site and land-development review runs separately through the City of Charlotte's Land Development division, so schedule-critical projects coordinate both the county building track and the city site track from the start.",
    },
    {
      q: "Which building and energy codes apply in Charlotte?",
      a: "Charlotte enforces the North Carolina State Building Code, an IBC-derived code developed and amended by the NC Building Code Council on the state's own cycle rather than a stock IBC year, plus the state-amended NC Energy Conservation Code with ASHRAE 90.1 as a referenced alternate. Because North Carolina amends and often lags the newest national editions, we verify the currently effective edition and recent amendments for every project.",
    },
    {
      q: "What stormwater rules should I expect on a Charlotte site?",
      a: "The City of Charlotte's Post-Construction Stormwater Ordinance requires water-quality treatment and runoff-volume control on top of quantity control, with tighter standards in the water-supply watersheds around Mountain Island Lake and Lake Wylie. Combined with UDO tree and buffer requirements and NCDEQ NPDES construction coverage for sites over an acre, BMP footprints can materially reduce developable area, so we resolve stormwater layout early.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering"],
    priority: { commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://code.mecknc.gov/"],
      codes: ["https://www.ncosfm.gov/codes"],
      amendments: ["https://code.mecknc.gov/"],
      utilities: ["https://www.duke-energy.com/business"],
      climate: ["https://www.weather.gov/gsp/"],
      market: ["https://charlotteregion.com/"],
    },
  },
};
