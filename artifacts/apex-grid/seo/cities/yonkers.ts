import type { CityData } from "../types";

export const yonkers: CityData = {
  slug: "yonkers",
  name: "Yonkers",
  stateSlug: "new-york",
  county: "Westchester County",
  ahj: {
    office: "City of Yonkers Department of Housing & Buildings",
    process:
      "Yonkers' Department of Housing & Buildings administers permits and plan review under the New York State Uniform Code, in a full-service city department that also handles housing code enforcement across a dense, older building stock. Commercial and multifamily submittals are reviewed for Uniform Code and Energy Code compliance locally, and New York requires drawings to be prepared and sealed by NY-licensed design professionals — the seal and license basis is verified at filing, with NYC-adjacent filing discipline but a Westchester process.",
  },
  codes: {
    building: "2020 Building Code of New York State (Uniform Code, based on the 2018 IBC with New York amendments)",
    energy: "2020 Energy Conservation Construction Code of New York State (ECCCNYS, based on 2018 IECC / ASHRAE 90.1-2016)",
    amendments:
      "New York's Uniform Code is statewide and Yonkers applies it as written, with the city's local layer in its housing and buildings administration and zoning. The distinctive compliance pressure is decarbonization: NYStretch Energy Code adoption applies in the region's jurisdictions and New York City's Local Law 97 benchmarking and carbon caps — while not Yonkers law — set the expectations of the metro's owners and lenders for large multifamily and commercial buildings, and Con Edison's gas constraints in Westchester have pushed new projects toward all-electric design.",
  },
  utilities: {
    electric: "Consolidated Edison (Con Edison) provides electric and natural gas service in Yonkers",
    notes:
      "Con Edison serves Yonkers for both electricity and gas, and its Westchester gas moratorium era (2019–2023) reshaped project design toward all-electric systems; new large services and electrification loads still require early Con Edison capacity coordination. Con Edison's demand charges and time-of-use structures are central to operating-cost design for the city's growing multifamily stock, and its steam system does not extend to Yonkers — heating is building-level. Water is City of Yonkers municipal water.",
  },
  climateNotes:
    "ASHRAE climate zone 4A (mixed-humid) on the Hudson River: cold winters with nor'easter snow, hot humid summers, and coastal storm and riverine flooding exposure along the Hudson and Bronx River edges. Snow loads and freeze protection are real design cases, unlike downstate's milder coastal strip.",
  marketNotes:
    "Yonkers is Westchester's largest city, in a development cycle driven by Hudson River waterfront multifamily redevelopment, the Ridge Hill retail center, Empire City Casino (MGM) expansion, St. John's Riverside and Montefiore healthcare work, and a major new film industry presence — Lionsgate Studios Yonkers and related production campuses have made the city a 'Hollywood on Hudson' production hub.",
  narratives: {
    mep:
      "MEP design in Yonkers is documented to the 2020 Uniform Code and ECCCNYS, in a Con Edison service territory where gas availability history and demand charges push multifamily and commercial projects toward all-electric, heat-pump design. Zone 4A heating loads, snow and freeze protection, and the retrofit of a dense pre-war building stock — much of it steam-heated — define the mechanical scope, while waterfront multifamily new construction drives the new-work pipeline.",
    structural:
      "Yonkers structural design follows the 2020 Building Code of New York State with Hudson Valley snow loads, moderate seismic provisions, and flood design along the Hudson and Bronx River frontage. The city's steep topography — Yonkers is built on hills above the Hudson — makes retaining structures and foundation work on sloped sites a recurring scope, and its older masonry and mill building stock drives existing-building evaluation work.",
    civil:
      "Civil design in Yonkers works in a fully built, hilly city: stormwater ties into combined and separated systems draining to the Hudson, Saw Mill, and Bronx rivers, with daylighting of the Saw Mill River downtown as the signature civic project. Waterfront sites add floodplain and state environmental review, and tight urban parcels make staging, shoring, and utility verification central to site design.",
    energy:
      "Energy compliance in Yonkers is documented to the 2020 ECCCNYS, with NYStretch provisions raising the bar in adopting jurisdictions and metro owners benchmarking against NYC Local Law 97 expectations even though that law stops at the city line. Con Edison incentive programs support electrification and envelope measures for the multifamily retrofits that dominate the existing-stock work.",
  },
  faqs: [
    {
      q: "Who provides electric and gas service in Yonkers?",
      a: "Consolidated Edison (Con Edison) provides both electric and natural gas service in Yonkers. Its Westchester gas constraints pushed many recent projects to all-electric design, and large new services need early Con Edison coordination.",
    },
    {
      q: "What building code applies in Yonkers?",
      a: "The 2020 Building Code of New York State (the Uniform Code, based on the 2018 IBC with state amendments) and the 2020 Energy Conservation Construction Code of New York State for energy compliance.",
    },
    {
      q: "Does NYC's Local Law 97 apply in Yonkers?",
      a: "No — Local Law 97 is New York City law and does not extend to Yonkers. But metro owners and lenders apply its benchmarking expectations across the region, and NYStretch energy provisions shape Yonkers-area compliance practice.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 68, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.yonkersny.gov"],
      codes: ["https://www.dos.ny.gov"],
      amendments: ["https://www.yonkersny.gov"],
      utilities: ["https://www.coned.com"],
      climate: ["https://www.weather.gov/okx/"],
      market: ["https://www.yonkersny.gov"],
    },
  },
};
