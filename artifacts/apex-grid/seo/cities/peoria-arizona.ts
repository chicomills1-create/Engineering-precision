import type { CityData } from "../types";

export const peoriaArizona: CityData = {
  slug: "peoria",
  name: "Peoria",
  stateSlug: "arizona",
  county: "Maricopa County",
  ahj: {
    office: "City of Peoria Development and Engineering Department — Building Safety",
    process:
      "Peoria's Building Safety function, within its Development and Engineering Department, reviews plans and issues permits under the city's adopted I-code editions with Peoria amendments, with electronic plan submittal standard for commercial work. Review coordinates with Peoria Fire-Medical and the city's engineering reviewers, and projects in the city's northern growth areas (Vistancia and the Lake Pleasant corridor) also sequence civil infrastructure approvals with the same department.",
  },
  codes: {
    building: "International Building Code as adopted by the City of Peoria with local amendments (Arizona cities adopt their own editions; most West Valley jurisdictions enforce 2018 IBC-based sets)",
    energy: "International Energy Conservation Code as adopted by the City of Peoria (2018 IECC-based in the West Valley pattern, with city amendments)",
    amendments:
      "Arizona has no statewide building code, so Peoria's adopted editions and amendments govern — and they differ from Phoenix's and Glendale's sets across the same metro. Peoria's practical amendment layer is desert practice: extreme-heat envelope and shading expectations, water-conservation plumbing fixtures in an arid city, and hillside and desert-preservation standards in the northern foothill districts.",
  },
  utilities: {
    electric: "Arizona Public Service (APS) provides electric service in Peoria",
    notes:
      "APS, Arizona's largest electric utility, handles new services and interconnections in Peoria, where rooftop solar penetration is among the highest in the nation and APS's solar and demand-charge structures shape commercial PV and storage design. New growth in Vistancia and along the Loop 303 corridor requires early APS capacity coordination. Natural gas is Southwest Gas, and water is the City of Peoria's own utility, drawing on CAP and Salt River Project supplies.",
  },
  climateNotes:
    "ASHRAE climate zone 2B (hot-dry) in the Sonoran Desert's northwest Valley: extreme summer heat (110°F+ design days), mild winters, monsoon thunderstorms with dust storms and flash flooding, and intense solar gain. Water scarcity and heat resilience are standing design inputs, and desert washes cross the northern districts.",
  marketNotes:
    "Peoria is a high-growth West Valley city: the Peoria Sports Complex (the first spring-training facility shared by two teams — Padres and Mariners) anchors the P83 entertainment district, Banner and Abrazo healthcare facilities serve a fast-growing population, TSMC's north Phoenix fab complex just east is pulling supplier and housing growth across the northwest Valley, and Vistancia and Loop 303 master-planned development keep residential-commercial construction at volume.",
  narratives: {
    mep:
      "MEP design in Peoria is documented to the city's adopted I-codes and IECC edition, in zone 2B where extreme-heat cooling design, APS demand charges, and rooftop solar economics define the electrical and mechanical scope. Southwest Gas coordination covers heating and process gas, city water conservation requirements reach into plumbing fixture selection, and monsoon-driven humidity spikes — brief but real — test latent capacity in a nominally dry-climate design.",
    structural:
      "Peoria structural design follows the city's adopted IBC edition with low seismic demand, monsoon wind and microburst loads, and desert soils ranging from caliche hardpan to expansive pockets and wash-adjacent alluvium. Hillside districts in the north add slope and retaining design, and heat itself is a material consideration for exterior systems and rooftop equipment anchorage.",
    civil:
      "Civil design in Peoria is desert hydrology: FEMA and local washes cross the northern growth areas, detention and wash-crossing design follow city and Maricopa County Flood Control standards, and dust control is a permit condition during construction. City water infrastructure — CAP-fed — extends with each Vistancia and Loop 303 phase, making utility phasing part of the civil scope.",
    energy:
      "Energy compliance in Peoria is documented to the IECC edition the city has adopted, with APS programs and Arizona's solar resource making PV-plus-controls the standard beyond-code package. In zone 2B the compliance margin is won on envelope solar control, high-efficiency cooling, and duct sealing — and APS demand charges reward load management as much as raw efficiency.",
  },
  faqs: [
    {
      q: "Who provides electric service in Peoria, AZ?",
      a: "Arizona Public Service (APS) provides electric service in Peoria, including interconnection for the rooftop solar the Valley is known for. Gas is Southwest Gas; water is the City of Peoria's utility.",
    },
    {
      q: "What building code applies in Peoria?",
      a: "The IBC and IECC editions adopted by the City of Peoria with local amendments — Arizona has no statewide code, and Peoria's set differs from Phoenix's, so confirm the editions with Building Safety.",
    },
    {
      q: "What drives Peoria's construction market?",
      a: "Northwest Valley growth: Vistancia and Loop 303 master-planned development, the Peoria Sports Complex/P83 entertainment district, healthcare expansion, and supplier and housing demand from TSMC's north Phoenix fabs nearby.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 67, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.peoriaaz.gov"],
      codes: ["https://www.peoriaaz.gov"],
      amendments: ["https://www.peoriaaz.gov"],
      utilities: ["https://www.aps.com"],
      climate: ["https://www.weather.gov/psr/"],
      market: ["https://www.peoriaaz.gov"],
    },
  },
};
