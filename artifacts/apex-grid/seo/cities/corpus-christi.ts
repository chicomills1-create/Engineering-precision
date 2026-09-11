import type { CityData } from "../types";

export const corpusChristi: CityData = {
  slug: "corpus-christi",
  name: "Corpus Christi",
  stateSlug: "texas",
  county: "Nueces County",
  ahj: {
    office: "City of Corpus Christi Development Services Department, Building Permits and Inspections Division",
    process:
      "Corpus Christi Development Services administers building permits, plan review, and inspections through its online permitting tools and coordinates commercial work with planning, engineering, fire, and utility review as needed. Coastal, floodplain, port-adjacent, and subdivision work can require separate site-development and external-agency approvals in addition to the building permit.",
  },
  codes: {
    building: "2021 International Building Code, adopted by the City of Corpus Christi with local amendments",
    energy: "2021 International Energy Conservation Code, commercial provisions, as adopted by the City of Corpus Christi",
    amendments:
      "Corpus Christi's construction-code ordinances adopt the I-Code family with local administrative and technical amendments. Flood-damage prevention, windstorm, fire, grading, and public-infrastructure requirements can govern the site as much as the base IBC; the current city ordinance and Development Services guidance control.",
  },
  utilities: {
    electric: "AEP Texas provides electric delivery service; Corpus Christi Water provides municipal water and wastewater service",
    notes:
      "AEP Texas is the regulated delivery utility for service extensions, meters, and interconnection in the ERCOT market, while customers select a retail electric provider for energy supply. Corpus Christi Water capacity, service routing, and industrial or process discharge conditions should be checked early for port, manufacturing, and large commercial work.",
  },
  climateNotes:
    "Corpus Christi is a hot-humid Gulf Coast city (ASHRAE 2A) exposed to hurricane wind, wind-driven rain, storm surge, coastal flooding, salt-laden air, extreme heat, and heavy rainfall. Hurricane evacuation and FEMA flood conditions are parcel-specific essentials, not just insurance questions.",
  marketNotes:
    "The Port of Corpus Christi, petrochemical and refining facilities, LNG-related development, offshore-energy support, logistics, healthcare, and tourism support a market with heavy industrial and waterfront infrastructure needs. Industrial construction must account for corrosion, hazardous-process interfaces, heavy-haul circulation, utility demand, and coastal resilience alongside normal commercial permitting.",
  narratives: {
    mep:
      "Corpus Christi MEP design is governed by hot-humid latent loads, hurricane continuity planning, and corrosive coastal exposure as much as by the City's 2021 IECC baseline. Equipment selections need to address wind-driven rain, outdoor-air dehumidification, salt-air corrosion, and safe shutdown or recovery after severe weather. AEP Texas handles delivery infrastructure and interconnection in the ERCOT market, while Corpus Christi Water controls municipal water and wastewater; industrial, port, and process projects should establish electric capacity and discharge assumptions before major equipment is committed.",
    structural:
      "Corpus Christi structural design applies the City's adopted 2021 IBC package in a hurricane-prone coastal environment. ASCE wind design, components-and-cladding pressures, continuous load paths, opening protection where required, and anchorage for rooftop and industrial equipment deserve early coordination with the architectural enclosure. Flood zone, storm-surge, geotechnical, and corrosion conditions can change foundation elevation, material protection, and equipment support design; a coastal site should not rely on inland Texas details.",
    civil:
      "Corpus Christi civil work begins with drainage, FEMA flood and coastal-storm-surge screening, and finished-floor strategy before site geometry is fixed. Heavy rainfall, flat terrain, and tidal or outfall constraints require positive grading, resilient conveyance, and properly located treatment or detention features, while port and industrial sites also need truck circulation and utility corridors. We coordinate City development review, Corpus Christi Water connections, and applicable floodplain requirements early; waterfront work may bring state or federal coastal permitting beyond the City process.",
    energy:
      "Corpus Christi commercial energy compliance uses the adopted 2021 IECC, but the design response should prioritize humidity control, solar gain, air leakage, and resilient operation in climate zone 2A. Efficient cooling equipment and controls must be evaluated at Gulf Coast outdoor-air conditions, not only nominal dry-bulb performance, and exterior equipment needs a corrosion and wind-resistance strategy. Load management, on-site generation, and storage concepts are coordinated with AEP Texas delivery requirements and ERCOT retail-supply assumptions before the permit electrical design is locked.",
  },
  faqs: [
    {
      q: "Which office issues building permits in Corpus Christi?",
      a: "The City of Corpus Christi Development Services Department, Building Permits and Inspections Division administers building permits and inspections. Commercial projects can also involve planning, engineering, fire, utility, floodplain, and port or coastal reviews depending on scope and location.",
    },
    {
      q: "Who provides electricity and water in Corpus Christi?",
      a: "AEP Texas provides regulated electric delivery service, while the customer chooses a retail electricity provider in ERCOT. Corpus Christi Water provides municipal water and wastewater service; high-demand or industrial projects should confirm both utility conditions early.",
    },
    {
      q: "What coastal hazards should a Corpus Christi project address?",
      a: "Projects should evaluate hurricane wind, wind-driven rain, storm surge, FEMA flood exposure, heavy rainfall, salt-air corrosion, and extreme heat. Site-specific flood and geotechnical information informs finished floors, drainage, structural load paths, material protection, and critical-equipment placement.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.corpuschristitx.gov/government/departments/development-services"],
      codes: ["https://www.corpuschristitx.gov/government/departments/development-services/building-permits"],
      amendments: ["https://library.municode.com/tx/corpus_christi/codes/code_of_ordinances"],
      utilities: ["https://www.aeptexas.com/", "https://www.corpuschristitx.gov/government/departments/water"],
      climate: ["https://www.weather.gov/crp/"],
      market: ["https://portofcc.com/"],
    },
  },
};