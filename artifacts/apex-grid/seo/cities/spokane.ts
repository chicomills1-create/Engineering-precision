import type { CityData } from "../types";

export const spokane: CityData = {
  slug: "spokane", name: "Spokane", stateSlug: "washington", county: "Spokane County",
  ahj: { office: "City of Spokane Development Services", process: "Commercial applications are submitted to Development Services, which routes paid plan-review packages to the departments responsible for approval. Applicants can track permit status through the city's online permit system, and the city recommends early consultation for projects with special land-use or engineering requirements." },
  codes: { building: "2021 International Building Code with Washington State and City of Spokane amendments", energy: "2021 Washington State Energy Code, Commercial Provisions", amendments: "Spokane adopts local construction provisions through Title 17F of the municipal code in addition to Washington's statewide amendments. Project teams should check the current city code pages for administrative, fire, and discipline-specific local provisions before submittal." },
  utilities: { electric: "Avista Utilities", notes: "Avista provides electric service in Spokane and coordinates new commercial service and energy-efficiency programs. Water and wastewater connections inside city limits are coordinated with the City of Spokane." },
  climateNotes: "Spokane has a cold, seasonally dry inland climate with freezing winters, summer heat, and periodic wildfire smoke. Envelope, freeze protection, snow, outdoor-air filtration, and economizer sequences all need local-climate attention.",
  marketNotes: "Spokane functions as the commercial center for the Inland Northwest, with sustained healthcare, higher-education, manufacturing, warehouse, and downtown reinvestment activity. The mix creates demand for both new facilities and technically complex renovation work.",
  narratives: {
    mep: "Spokane MEP design must handle cold winter heating and freeze protection without overlooking hot, smoky summer conditions. We coordinate outdoor-air filtration and economizer controls with the serving Avista territory and document commercial energy compliance against the current Washington code.",
    structural: "Spokane structural design combines current IBC requirements with city amendments, winter snow demands, and site-specific seismic and geotechnical conditions. Early coordination with Development Services helps align special inspections and deferred submittals with the permit package.",
    civil: "Civil packages in Spokane require early alignment with city development standards, utility connection requirements, grading, drainage, and right-of-way review. Projects with shoreline, land-use, or commercial driveway permits need those parallel approvals identified before building-plan review.",
    energy: "The Washington State Energy Code is materially more stringent than a basic IECC path. Spokane projects benefit from integrated envelope, lighting, controls, and mechanical modeling, with Avista incentive coordination started before systems are fixed.",
  },
  faqs: [
    { q: "What building code does Spokane use for commercial projects?", a: "The city lists the 2021 IBC with Washington State and Spokane amendments among its current commercial codes. Teams should verify Title 17F and the city's current code page at project kickoff." },
    { q: "Who reviews commercial building permits in Spokane?", a: "City of Spokane Development Services receives commercial applications and routes complete plan sets to the departments involved in approval." },
    { q: "Which electric utility serves Spokane?", a: "Avista Utilities serves Spokane. New-service capacity, transformer timing, and available efficiency programs should be coordinated during design." },
  ],
  research: {
    lastVerified: "2026-09-10", reviewStatus: "approved", reviewedBy: "Apex Grid SEO research",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://my.spokanecity.org/business/commercial/permit-process"],
      codes: ["https://my.spokanecity.org/business/commercial/codes"],
      amendments: ["https://my.spokanecity.org/smc/?Section=17F"],
      utilities: ["https://www.myavista.com/"],
      climate: ["https://www.weather.gov/otx/"],
      market: ["https://my.spokanecity.org/economicdevelopment"],
    },
  },
};