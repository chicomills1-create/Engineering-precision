import type { CityData } from "../types";

export const santaFe: CityData = {
  slug: "santa-fe",
  name: "Santa Fe",
  stateSlug: "new-mexico",
  county: "Santa Fe County",
  ahj: {
    office: "City of Santa Fe Land Use Department, Building and Development Services",
    process:
      "Commercial building applications are submitted through the city's online permitting system and are routed for building, zoning, fire, and utility reviews as applicable. Larger or unusual projects should confirm a pre-application meeting and separate land-use, historic-district, or right-of-way approvals with the city.",
  },
  codes: {
    building: "2021 New Mexico Commercial Building Code (2021 IBC with New Mexico amendments)",
    energy: "2021 New Mexico Energy Conservation Code (2021 IECC with New Mexico amendments)",
    amendments:
      "Santa Fe enforces the New Mexico statewide construction codes, with local land-use, historic-district, development-standard, and administrative requirements that remain separate from the state building code. Projects in the city's historic districts need the applicable Historic District Review Board approval in addition to building review.",
  },
  utilities: {
    electric: "Public Service Company of New Mexico (PNM)",
    notes:
      "PNM handles electric service and distributed-generation interconnection; the City of Santa Fe provides municipal water and wastewater service in its service area. Confirm service capacity and water-meter requirements early because high-desert sites can have significant utility and water-conservation constraints.",
  },
  climateNotes:
    "Santa Fe is a high-elevation cold-dry climate (ASHRAE 5B), with intense solar exposure, large diurnal swings, summer monsoon storms, freeze conditions, and wildfire exposure in the surrounding interface.",
  marketNotes:
    "The market combines public and institutional work, healthcare, hospitality, housing, and adaptive reuse in a city with substantial historic character. Water conservation, visual compatibility, and wildfire and drainage considerations often shape feasibility as much as the building permit.",
  narratives: {
    mep:
      "Santa Fe MEP design must balance 5B winter heating and freeze protection with intense high-altitude solar gain and dry summer air. We coordinate PNM service and interconnection early, pair efficient heat pumps or other code-compliant systems with envelope and shading decisions, and confirm city water-meter and conservation requirements before equipment schedules harden. Historic-district review can also constrain rooftop equipment visibility and penetrations.",
    structural:
      "Structural design in Santa Fe starts with the 2021 New Mexico code and a site-specific geotechnical report, then accounts for high-desert wind, occasional snow, expansive or variable soils, and wildfire exposure where relevant. Historic adobe and masonry buildings require measured existing-condition work before additions or rooftop equipment are designed. Local historic review may affect visible structural interventions even when the state code governs the engineering.",
    civil:
      "Civil packages in Santa Fe must resolve grading and stormwater for intense monsoon bursts, water and wastewater capacity, dust control, and access on constrained or historic parcels. We coordinate municipal utility requirements with the Land Use Department and identify floodplain or arroyo constraints before laying out detention, drainage, and fire access. Water-conservation measures are a practical site-planning issue in this high-desert market.",
    energy:
      "Energy compliance uses New Mexico's 2021 IECC-based commercial energy code, not an assumed generic western code. In 5B, airtight envelopes, solar control, efficient heating, and commissioning protect against both winter nights and high-altitude summer sun; the compliance model should also capture PNM service and electrification implications. Historic-district visibility constraints are addressed alongside, rather than after, the energy design.",
  },
  faqs: [
    { q: "Who reviews a commercial permit in Santa Fe?", a: "The City of Santa Fe Land Use Department and Building and Development Services coordinate building, zoning, and related reviews. Historic-district, fire, utility, and right-of-way approvals can be separate prerequisites depending on the site and scope." },
    { q: "What energy code applies to Santa Fe commercial work?", a: "The New Mexico statewide commercial code is the 2021 New Mexico Energy Conservation Code, based on the 2021 IECC with state amendments. Confirm the edition and any project-specific local land-use requirements with the city at application." },
    { q: "What climate issues should engineers address?", a: "High elevation, cold-dry winters, intense sun, monsoon drainage, freeze conditions, and nearby wildfire exposure all matter. A geotechnical report, current flood or drainage review, and early utility coordination are more reliable than applying a generic desert-city design assumption." },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 67, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://santafenm.gov/land-use"],
      codes: ["https://www.rld.nm.gov/construction-industries/"],
      amendments: ["https://santafenm.gov/land-use/historic-preservation"],
      utilities: ["https://www.pnm.com/business", "https://santafenm.gov/public-utilities/water"],
      climate: ["https://www.weather.gov/wrh/climate?wfo=abq"],
      market: ["https://edd.newmexico.gov/"],
    },
  },
};