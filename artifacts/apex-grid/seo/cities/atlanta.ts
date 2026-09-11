import type { CityData } from "../types";

export const atlanta: CityData = {
  slug: "atlanta",
  name: "Atlanta",
  stateSlug: "georgia",
  county: "Fulton County",
  ahj: {
    office: "City of Atlanta Department of City Planning, Office of Buildings",
    process:
      "Commercial plan review runs through the Atlanta ePlans / Accela Citizen Access online portal, where drawings are submitted, reviewed, and marked up electronically across building, site development, fire, and utility disciplines. The Office of Buildings routes large projects through concurrent multi-discipline review and offers pre-application and Special Administrative Permit (SAP) meetings for major developments. Site Development Permits are reviewed separately and often pace the overall schedule more than the building permit.",
  },
  codes: {
    building:
      "Georgia State Minimum Standard Codes (2018 IBC with Georgia amendments), enforced locally by the City of Atlanta Office of Buildings",
    energy:
      "Georgia State Minimum Standard Energy Code (2015 IECC with Georgia Supplements and Amendments), with ASHRAE 90.1 as an alternate commercial path",
    amendments:
      "Because Georgia's code is mandatory statewide, Atlanta cannot adopt a weaker edition, but the city layers on its own site, zoning, and stormwater ordinances that reshape projects — most notably the Post-Development Stormwater Management Ordinance and a strict tree-protection ordinance administered by the city arborist. Confirm current DCA amendment years, which update annually.",
  },
  utilities: {
    electric:
      "Georgia Power (a Southern Company utility) serves the City of Atlanta, with Georgia Power's downtown network feeding the high-density core",
    notes:
      "Georgia Power's commercial rates carry meaningful demand charges, and large new services — data centers, life-science labs, and towers — can face transformer and substation lead times, so we confirm available capacity early. Water and sewer are City of Atlanta Department of Watershed Management services, and combined-sewer areas in the older core add capacity-fee and inflow considerations.",
  },
  climateNotes:
    "Atlanta sits in ASHRAE climate zone 3A — humid subtropical — with long, muggy cooling seasons where latent load rivals sensible cooling, plus real (if mild) winter heating. The urban heat island across the dense core and interstate corridors keeps nights warm and pushes summer cooling demand above the surrounding Piedmont.",
  marketNotes:
    "Atlanta is the Southeast's dominant commercial construction market, driven by corporate relocations and headquarters, a large film-and-studio infrastructure buildout, one of the nation's biggest data-center corridors in the metro's periphery, and heavy healthcare, higher-education, and mixed-use activity along the BeltLine and Midtown. That volume keeps the Office of Buildings' review queues busy, which makes early site-development and stormwater coordination essential to schedule.",
  narratives: {
    mep:
      "MEP design in Atlanta answers first to a humid zone 3A climate where latent load runs long across muggy shoulder seasons, so we lead with dehumidification, tight pressurization, and vapor-aware envelope coordination rather than sizing on peak dry-bulb alone. The urban heat island across the Midtown and downtown core keeps nights warm, eroding night-flush hours other Piedmont sites still get. Electrically, Georgia Power serves the city with demand-charge-heavy commercial rates that reward load-shifting and honestly sized services, and downtown's high-rise pipeline can run into transformer and network-capacity lead times we confirm at schematic design. Because Georgia enforces an amended 2015 IECC statewide, our HVAC, lighting, and plumbing documentation targets that Georgia-amended edition through the Atlanta ePlans portal, with ASHRAE 90.1 as an alternate path.",
    structural:
      "Atlanta structural work is governed less by lateral events and more by what the Piedmont ground does. Seismic is low (generally SDC A–B) and wind is a moderate ~105-115 mph, so the geotechnical report is usually the governing document: Piedmont residual soils over weathered rock and pockets of expansive clay produce variable bearing that drives spread footings, drilled piers, or deepened foundations. On the dense infill sites the BeltLine and Midtown boom favors, we coordinate shoring, adjacent-structure protection, and tight foundation layouts early. Special-inspection programs are set up under the Georgia-amended 2018 IBC and administered through the City of Atlanta Office of Buildings, and heavy red-clay earthwork demands realistic moisture-control assumptions rather than optimistic ones.",
    civil:
      "Site engineering in Atlanta is dominated by stormwater and trees. The city's Post-Development Stormwater Management Ordinance requires runoff-reduction and water-quality treatment on erosive red-clay soils, and the strict tree-protection ordinance — enforced by the city arborist with recompense requirements — can reshape a site plan as much as the building envelope does. Grading and Site Development Permits route through the Atlanta ePlans portal and often pace the schedule, so we design detention, conveyance, and BMPs to the Georgia Stormwater Management Manual (the Blue Book) and city criteria in the first site-plan pass. Sites disturbing an acre or more require Georgia EPD NPDES construction stormwater coverage with a comprehensive erosion-control plan, and combined-sewer areas in the older core add capacity coordination with Watershed Management.",
    energy:
      "Atlanta enforces Georgia's statewide amended energy code — the 2015 IECC with Georgia supplements — so COMcheck or energy-model documentation must target that Georgia-amended edition, with ASHRAE 90.1 available as an alternate. In the warm, humid zone 3A climate, compliance economics favor blocking sun and moisture: low-SHGC glazing, exterior shading, and a well-sealed envelope pay back faster than piling on roof R-value, and dehumidification-capable cooling plants matter more than the climate file's economizer credit suggests once the heat island is accounted for. We reconcile envelope, mechanical, and lighting compliance as one package and resolve plan-check comments directly through the Atlanta ePlans review workflow rather than treating each trade in isolation.",
  },
  faqs: [
    {
      q: "What building code does the City of Atlanta enforce?",
      a: "Atlanta enforces the Georgia State Minimum Standard Codes — currently the 2018 IBC with annual Georgia amendments adopted by the Department of Community Affairs. The city administers and enforces the code through its Office of Buildings but cannot adopt a weaker edition, so the technical baseline is consistent statewide while local site, stormwater, and tree ordinances add city-specific requirements.",
    },
    {
      q: "How does plan review work with the City of Atlanta Office of Buildings?",
      a: "Commercial submittals go through the Atlanta ePlans / Accela online portal for electronic review across building, site, fire, and utility disciplines. Large projects can use pre-application and Special Administrative Permit meetings, and the separate Site Development Permit — driven by stormwater and tree requirements — frequently paces the overall schedule more than the building permit itself.",
    },
    {
      q: "How do Atlanta's stormwater and tree ordinances affect my site?",
      a: "Significantly. Atlanta's Post-Development Stormwater Management Ordinance requires runoff reduction and water-quality treatment on erosive red-clay soils, and the city's tree-protection ordinance, enforced by the arborist with recompense obligations, can consume developable area. We resolve BMP layout, detention, and tree impacts in the first site-plan pass because they directly shape the buildable footprint.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 91, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.atlantaga.gov/i-want-to/obtain-a-building-permit"],
      codes: ["https://www.atlantaga.gov/government/departments/city-planning/ordinances-regulations/construction-codes"],
      amendments: ["https://www.atlantaga.gov/government/departments/city-planning/ordinances-regulations/construction-codes"],
      utilities: ["https://www.georgiapower.com/business.html"],
      climate: ["https://www.weather.gov/ffc/"],
      market: ["https://www.investatlanta.com/"],
    },
  },
};
