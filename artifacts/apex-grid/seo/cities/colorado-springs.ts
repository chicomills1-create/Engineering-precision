import type { CityData } from "../types";

export const coloradoSprings: CityData = {
  slug: "colorado-springs",
  name: "Colorado Springs",
  stateSlug: "colorado",
  county: "El Paso County",
  ahj: {
    office: "Pikes Peak Regional Building Department (PPRBD)",
    process:
      "PPRBD is the building-permit authority for Colorado Springs and accepts commercial applications, plans, corrections, and inspection activity through its online customer portal. Development approval also involves City of Colorado Springs Planning and Community Development, Fire Department, Colorado Springs Utilities, and city engineering; applicants should separate land-use/site approvals from the PPRBD building permit rather than assuming one review clears both.",
  },
  codes: {
    building: "2023 Pikes Peak Regional Building Code, based on the 2021 International Codes with regional amendments",
    energy: "2021 IECC commercial provisions, as adopted and amended in the 2023 Pikes Peak Regional Building Code",
    amendments:
      "PPRBD's regional amendments govern the City of Colorado Springs and differ from Denver and Aurora home-rule packages. The regional code incorporates local climatic and administrative provisions; city fire, land-development, drainage, and utility standards remain separate approvals.",
  },
  utilities: {
    electric: "Colorado Springs Utilities provides electric, natural gas, water, and wastewater service within its service territory",
    notes:
      "A single municipal utility coordinates electric service and water/wastewater, but new large loads still require capacity, service-design, and extension review. Its electric rates include demand components for many commercial customers, making load profile and service sizing consequential.",
  },
  climateNotes:
    "At roughly 6,000 feet on the Front Range, Colorado Springs is cold-dry climate zone 5B with high solar exposure, large daily temperature swings, winter snow and freeze-thaw, hail, and downslope/high-wind events. Wildland-urban-interface and post-wildfire drainage concerns are real on foothill and west-side sites.",
  marketNotes:
    "The local market is anchored by the U.S. Air Force Academy, Peterson and Schriever Space Force Bases, Fort Carson, aerospace and defense contractors, healthcare, tourism, and growing advanced-manufacturing and logistics activity. These sectors create demand for secure facilities, labs, medical work, and industrial buildings rather than a Denver-style urban high-rise mix.",
  narratives: {
    mep:
      "Colorado Springs MEP work balances cold, dry 5B winters with intense high-altitude summer sun and a large diurnal swing. That profile rewards heat recovery, tight ductwork, carefully protected plumbing, and economizer strategies, while altitude must be accounted for in air-cooled equipment and combustion-appliance capacity. PPRBD reviews the amended 2021-code basis, and Colorado Springs Utilities should be involved early for an electric-service load study and water/fire-flow feasibility—especially for defense-adjacent, healthcare, or advanced-manufacturing facilities with resilient loads.",
    structural:
      "Structural design in Colorado Springs is a snow, wind, soil, and terrain problem before it is a high-seismic problem. Ground snow loads, drifting at roof steps, hail-resistant roof assemblies, and Front Range wind exposure require disciplined roof and rooftop-equipment detailing. Expansive claystone and variable foothill geology can affect foundations and slabs, while hillside sites add slope stability and wildfire exposure. PPRBD's 2023 regional code is the building review basis; city grading and fire-access requirements must be coordinated separately.",
    civil:
      "Colorado Springs civil work starts with topography and runoff. Foothill parcels, burn-scar drainage, and intense summer storms can create concentrated flows that need to be analyzed under the city's Drainage Criteria Manual rather than handled as simple parking-lot detention. Freeze-thaw affects pavement and utility details, and grading must coordinate with city development-review, floodplain, fire-access, and Colorado Springs Utilities extension requirements. Detention, water-quality, and snow-storage space should be protected early on constrained sites.",
    energy:
      "The Pikes Peak Regional code uses the commercial 2021 IECC with regional amendments, not Denver's separate energy code. In high-elevation 5B, a continuous thermal and air barrier, roof insulation, high-performance glazing, heat recovery, and efficient electrified or hybrid heating make a durable compliance strategy; large temperature swings can make economizer controls productive when commissioned correctly. We document envelope, lighting, and mechanical compliance to PPRBD's edition and coordinate electrification capacity with Colorado Springs Utilities before a design path is locked.",
  },
  faqs: [
    {
      q: "Who issues commercial building permits in Colorado Springs?",
      a: "The Pikes Peak Regional Building Department issues Colorado Springs building permits and administers inspections. City planning, engineering, fire, drainage, and Colorado Springs Utilities reviews can still be required, so a building permit is not a substitute for site or land-development approval.",
    },
    {
      q: "What code does PPRBD use for Colorado Springs projects?",
      a: "PPRBD enforces the 2023 Pikes Peak Regional Building Code, based on the 2021 International Codes with regional amendments; its commercial energy provisions are based on the 2021 IECC. Denver and Aurora administer different local packages.",
    },
    {
      q: "Does Colorado Springs Utilities provide both power and water?",
      a: "Colorado Springs Utilities provides electric, natural gas, water, and wastewater in its service territory. For commercial work, confirm service territory, water/fire-flow capacity, electrical load, and any extension requirements early in design.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 83, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.pprbd.org/"],
      codes: ["https://www.pprbd.org/CodeAdoption"],
      amendments: ["https://www.pprbd.org/CodeAdoption"],
      utilities: ["https://www.csu.org/business/economic-development"],
      climate: ["https://www.weather.gov/pub/"],
      market: ["https://coloradosprings.gov/economicdevelopment"],
    },
  },
};