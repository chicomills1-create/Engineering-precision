import type { CityData } from "../types";

export const cincinnati: CityData = {
  slug: "cincinnati",
  name: "Cincinnati",
  stateSlug: "ohio",
  county: "Hamilton County",
  ahj: {
    office: "City of Cincinnati Department of Buildings and Inspections",
    process:
      "The Department of Buildings and Inspections administers building, trade, and related permits through the City’s online systems. Commercial work can also require zoning, fire, historic-conservation, Metropolitan Sewer District, Greater Cincinnati Water Works, and public-right-of-way review, so those approvals should be scoped with the primary permit.",
  },
  codes: {
    building: "Ohio Building Code, 2024 edition (based on the 2021 IBC), enforced by the City of Cincinnati",
    energy: "Ohio Building Code commercial energy provisions based on the 2021 IECC; ASHRAE 90.1 is an alternate compliance path",
    amendments:
      "Cincinnati enforces Ohio's mandatory statewide commercial building code through its certified department. City zoning and historic review, plus MSD, water, fire, and right-of-way standards, are local requirements that can change project layout and sequencing without replacing the OBC.",
  },
  utilities: {
    electric: "Duke Energy Ohio provides electric distribution service",
    notes:
      "Duke Energy Ohio should be engaged for service additions, upgrades, and distributed-generation interconnection. Greater Cincinnati Water Works provides water, and the Metropolitan Sewer District of Greater Cincinnati administers wastewater and stormwater services in the City.",
  },
  climateNotes:
    "Cincinnati is in ASHRAE climate zone 4A, with hot-humid summers, winter freeze-thaw, severe thunderstorms, and Ohio River flood exposure. Steep hillsides, loess and residual soils, fill, and ravines can make slope stability, retaining systems, and drainage defining constraints.",
  marketNotes:
    "Cincinnati has active healthcare, university, advanced-manufacturing, consumer-products, logistics, and urban infill sectors. The Ohio River corridor and established neighborhoods create a mix of industrial redevelopment and hillside or historic retrofit work, while the broader region supports airport- and highway-oriented distribution development.",
  narratives: {
    mep:
      "Cincinnati MEP design addresses a humid 4A climate with real summer latent loads, winter freeze protection, and storm-resilient electrical planning. Duke Energy Ohio service capacity and interconnection are early decisions for electrified central plants, advanced manufacturing, and high-density redevelopment; GCWW and MSD utility connections should be coordinated with mechanical and site routing. The 2024 Ohio Building Code incorporates 2021-IECC commercial energy provisions, with ASHRAE 90.1 as an alternate path. In older urban buildings, investigations of incoming power, water service, drainage elevations, equipment paths, and risers keep the design grounded in constructible existing conditions.",
    structural:
      "Cincinnati structural decisions frequently turn on terrain and existing conditions as much as conventional gravity and lateral loads. The Ohio Building Code provides the 2021-IBC-based basis; seismic demand is generally low, while wind, roof snow, frost, and thunderstorm uplift still require complete load-path detailing. Hillside properties merit a project-specific geotechnical investigation for residual soils, colluvium, groundwater, slope stability, retaining walls, and foundation recommendations. Near the Ohio River and its tributaries, flood screening and elevation decisions come before finalizing foundations. Historic masonry and dense infill also require measured investigation of existing walls, party conditions, and adjacent foundations.",
    civil:
      "Cincinnati civil design must respect terrain, watershed, and urban utility realities. MSD review guides sanitary and stormwater connections, while GCWW water facilities and City right-of-way standards affect routing; qualifying land disturbance also needs Ohio EPA construction-stormwater coverage and a SWPPP. Ravines, steep grades, shallow rock or variable soils, and Ohio River floodplain conditions can constrain grading, retaining, outfalls, and feasible stormwater practices. We reserve room for conveyance and water-quality measures early and resolve utility crossings and downstream acceptance before a hillside or redevelopment layout becomes difficult to revise.",
    energy:
      "Cincinnati commercial energy compliance is governed by the Ohio Building Code’s 2021-IECC provisions, with ASHRAE 90.1 as an accepted alternative. In mixed-humid zone 4A, a continuous air barrier, rain-managed enclosure, moisture-aware insulation, solar-control glazing, efficient lighting, and humidity-capable ventilation provide meaningful year-round value. For adaptive reuse, improving an old masonry or mixed façade requires attention to moisture transport as well as nominal R-value. We coordinate energy documentation with actual HVAC, plug/process loads, and Duke Energy Ohio service strategy so electrification or heat-recovery choices remain feasible at the building scale.",
  },
  faqs: [
    {
      q: "Who reviews commercial permits in Cincinnati?",
      a: "Cincinnati Department of Buildings and Inspections administers construction permits. Zoning, fire, historic-conservation, GCWW, MSD, and right-of-way approvals may be required in addition to the building permit.",
    },
    {
      q: "What commercial code and energy code apply in Cincinnati?",
      a: "The City enforces Ohio's 2024 Building Code, based on the 2021 IBC. Its commercial energy provisions are based on the 2021 IECC, with ASHRAE 90.1 available as an alternate path.",
    },
    {
      q: "What site risks are distinctive in Cincinnati?",
      a: "Hillsides, ravines, variable residual soils, retaining needs, and Ohio River flood exposure can materially affect foundations and drainage. MSD stormwater and sewer review, GCWW water coordination, and Ohio EPA construction-stormwater requirements should be addressed early.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cincinnati-oh.gov/building-inspections/"],
      codes: ["https://com.ohio.gov/divisions-and-programs/industrial-compliance/building-code"],
      amendments: ["https://library.municode.com/oh/cincinnati/codes/code_of_ordinances"],
      utilities: ["https://www.duke-energy.com/home/products/electric/ohio", "https://www.cincinnati-oh.gov/water/"],
      climate: ["https://www.weather.gov/iln/"],
      market: ["https://choosecincy.com/"],
    },
  },
};