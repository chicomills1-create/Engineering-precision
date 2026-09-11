import type { CityData } from "../types";

export const plano: CityData = {
  slug: "plano",
  name: "Plano",
  stateSlug: "texas",
  county: "Collin County",
  ahj: {
    office: "City of Plano Building Inspections Department",
    process:
      "Plano Building Inspections administers commercial permits, plan review, and inspections through the city's online permitting system. Building review is coordinated with planning, engineering, fire, and public-works requirements; complete civil, utility, and fire submittals help resolve parallel comments before permit issuance.",
  },
  codes: {
    building: "2021 International Building Code, adopted by the City of Plano with local amendments",
    energy: "2021 International Energy Conservation Code, commercial provisions, adopted by the City of Plano",
    amendments:
      "Plano's locally adopted construction-code ordinances amend the ICC model codes for Plano review. The city's amendments and administrative requirements are distinct from those of Dallas, Frisco, and other North Texas jurisdictions.",
  },
  utilities: {
    electric: "Oncor Electric Delivery provides regulated electric delivery service; Plano is in ERCOT's competitive retail-electric market",
    notes:
      "Customers select a retail electric provider while Oncor coordinates the wires, meter, new service, and interconnection. City of Plano Utilities provides water, wastewater, and drainage services in its service area; verify available capacity, pressure, fire flow, and any off-site improvements for the parcel.",
  },
  climateNotes:
    "Plano is in hot-humid climate zone 3A, with long cooling seasons, severe thunderstorms, hail, tornado and straight-line-wind exposure, occasional hard freezes, and intense rainfall. Blackland Prairie expansive clay is a recurring foundation, pavement, and utility-trench design constraint.",
  marketNotes:
    "Plano's office and corporate-campus base is joined by Legacy-area mixed use, healthcare, education, multifamily, retail, and high-value technology and telecom activity across Collin County. Continued infill and redevelopment make existing utilities, access, drainage, and electric-capacity verification material early design issues.",
  narratives: {
    mep:
      "Plano MEP design responds to a long humid cooling season, storm resilience, and periodic freezes. Sensible and latent cooling, air sealing, equipment anchorage, and exposed-pipe freeze protection are developed under Plano's locally amended 2021 code package. Oncor—not the selected retail provider—must confirm electrical service capacity, metering, routing, and interconnection; those constraints should be fixed early for data, office, and campus loads. City water pressure and fire-flow information informs domestic-water and fire-protection design.",
    structural:
      "Plano foundations are geotechnical-report driven because Blackland Prairie clay can shrink and swell substantially with moisture change. Post-tensioned slabs, drilled piers, grade beams, void spaces, and site moisture management are considered against actual soil conditions rather than selected by building type alone. Under the locally amended 2021 IBC, project wind exposure, roof uplift, cladding pressures, and rooftop-equipment anchorage still require careful design despite low regional seismic demand.",
    civil:
      "Plano civil work connects drainage, expansive-soil behavior, and public infrastructure. We establish downstream conveyance, detention and water-quality requirements, finished-floor elevations, access, and water/sewer availability with city engineering and utilities before the layout is locked. FEMA mapping and local floodplain constraints are checked where relevant, while a Texas construction general permit and SWPPP are required for qualifying disturbed acreage; utility trench and pavement details account for the site's expansive soils.",
    energy:
      "Plano commercial energy compliance uses the city's adopted 2021 IECC and amendment package. In 3A, low-SHGC glazing, envelope air control, efficient cooling, and humidity-aware controls commonly offer more value than an insulation-only approach. We coordinate lighting, envelope, and HVAC documentation as a single permit package, then align electrification, solar, or EV charging assumptions with Oncor's service and interconnection process before construction pricing.",
  },
  faqs: [
    { q: "What building and energy codes does Plano enforce?", a: "Plano enforces locally adopted 2021 International Codes, including the 2021 IBC and commercial 2021 IECC, with Plano amendments. Its code package should not be substituted with a neighboring DFW city's amendments." },
    { q: "Who handles electrical service for a Plano project?", a: "Oncor Electric Delivery handles regulated delivery facilities, meters, new service, and interconnection. Plano is in ERCOT's competitive market, so the customer separately chooses a retail electric provider for energy supply." },
    { q: "Why are soils important for Plano construction?", a: "Plano's Blackland Prairie clay can expand and shrink with seasonal moisture changes. Foundation, pavement, and utility-trench design should follow a project geotechnical report and a coordinated site moisture-management strategy." },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 91, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.plano.gov/119/Building-Inspections"],
      codes: ["https://www.plano.gov/120/Building-Codes"],
      amendments: ["https://www.plano.gov/120/Building-Codes"],
      utilities: ["https://www.oncor.com/", "https://www.plano.gov/858/Utilities"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://www.plano.gov/1170/Economic-Development"],
    },
  },
};