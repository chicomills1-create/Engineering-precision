import type { CityData } from "../types";

export const hollywood: CityData = {
  slug: "hollywood",
  name: "Hollywood",
  stateSlug: "florida",
  county: "Broward County",
  ahj: {
    office: "City of Hollywood Building Division — Development Services Hub, City Hall, 2600 Hollywood Boulevard",
    process:
      "Hollywood's Building Division takes applications and plans electronically through its ePermits system and the Accela Citizen Access portal, using the Broward County Uniform Permit Application, with sub-permits required for each trade and for roofing and all openings. Through ePermitsOneStop, associated Broward County approvals — environmental review, transportation concurrency, and surface water management — are submitted in the same flow. The city also runs an Express Permitting Service with guaranteed same-day plan review for select residential permit types submitted in its published weekly window, and a recorded Notice of Commencement is required before the first inspection on work over the statutory threshold.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023) — statewide code, including the High-Velocity Hurricane Zone provisions for Broward County",
    energy: "Florida Building Code, Energy Conservation, 8th Edition (2023)",
    amendments:
      "Florida's code is statewide and cannot be locally amended except through the state process, but Hollywood sits in the High-Velocity Hurricane Zone — Broward and Miami-Dade are the only HVHZ counties — so the FBC's HVHZ chapters govern roofing, openings, and product approvals: every window, door, shutter, and roofing system needs a current Miami-Dade Notice of Acceptance or Florida Product Approval identified and stamped by the engineer of record. Local process additions include a city tree removal permit from the Engineering Division for all properties and Broward County environmental and concurrency approvals routed through ePermitsOneStop.",
  },
  utilities: {
    electric: "Florida Power & Light (FPL) — investor-owned electric service across Hollywood and Broward County",
    notes:
      "FPL is the electric utility for essentially all of Broward County, so new services, relocations, and undergrounding requests run through FPL's service process — there is no municipal electric utility in Hollywood. Water and sewer are the opposite: the City of Hollywood Department of Public Utilities provides both, operating the Southern Regional Wastewater Treatment Plant, so taps and capacity are coordinated with the city. Note that roughly 15,000 Hollywood households remain on septic rather than city sewer, and the city is evaluating a large sewer-conversion program — sewer availability must be confirmed by address.",
  },
  climateNotes:
    "ASHRAE climate zone 1A (very hot-humid) on the Broward coast: Hollywood is inside the High-Velocity Hurricane Zone, with FBC ultimate design wind speed contours of 150–160 mph (Risk Category II) crossing the city, year-round cooling and dehumidification loads, intense rainfall, and coastal flood and storm-surge exposure that puts flood elevation at the center of site design.",
  marketNotes:
    "Hollywood's market is hospitality, healthcare, and coastal redevelopment: Memorial Healthcare System's Memorial Regional Hospital anchors the medical sector, the Seminole Hard Rock Hotel & Casino with its Guitar Hotel draws regional hospitality investment on the reservation at the city's western edge, and the Diplomat and Margaritaville resorts anchor Hollywood Beach. Downtown Hollywood and the Young Circle arts district are in an active redevelopment cycle, and the city's stormwater master plan and beach resilience programs generate sustained civil and building work.",
  narratives: {
    mep:
      "MEP design in Hollywood is documented to the Florida Building Code, 8th Edition (2023), including its Energy Conservation volume, and filed electronically with the Building Division through ePermits and Accela using the Broward County Uniform Permit Application. FPL controls electric service while the city's own Public Utilities department controls water and sewer — and with roughly 15,000 homes still on septic, sewer availability is an address-level question. In climate zone 1A, mechanical design is a year-round cooling and latent-load problem, with corrosion protection for coastal air on every exterior component.",
    structural:
      "Structural design in Hollywood is governed by the High-Velocity Hurricane Zone chapters of the Florida Building Code: ultimate design wind speeds run 150–160 mph across the city, and every opening and roofing product must carry a Miami-Dade Notice of Acceptance or Florida Product Approval stamped by the engineer of record. Special inspector requirements attach to reinforced masonry and piling work, a signed and sealed geotechnical report supports foundation design in the coastal sands and limestone, and flood elevation and scour shape the lowest floors near the Intracoastal and the beach.",
    civil:
      "Civil design in Hollywood coordinates three layers: the city's Public Utilities department for water and sewer (including whether a parcel is on city sewer or among the roughly 15,000 septic households), Broward County environmental review and surface water management approval routed through ePermitsOneStop, and drainage district approval where a site falls in the South Broward Drainage District. The city's stormwater master plan, high water table, and tidal flooding make discharge and finished-floor decisions central to every site plan.",
    energy:
      "Energy compliance in Hollywood is documented to the Florida Building Code, Energy Conservation, 8th Edition (2023), with energy calculations and Manual J heat loads in the submittal package. In zone 1A the compliance margin is decided by cooling efficiency, dehumidification, and envelope solar gain control; FPL's commercial programs layer incentives on top. HVHZ product approval requirements mean glazing choices must satisfy the energy model and carry Miami-Dade NOA or Florida Product Approval at the same time.",
  },
  faqs: [
    {
      q: "What building code does Hollywood, FL enforce?",
      a: "The Florida Building Code, 8th Edition (2023) — the statewide code — including its High-Velocity Hurricane Zone provisions, because Broward County is one of only two HVHZ counties in Florida. Openings and roofing products need a Miami-Dade Notice of Acceptance or Florida Product Approval.",
    },
    {
      q: "How are permits filed in Hollywood, FL?",
      a: "Electronically, through the Building Division's ePermits system and Accela Citizen Access, on the Broward County Uniform Permit Application, with separate sub-permits for each trade. Broward County environmental, concurrency, and surface water approvals route through ePermitsOneStop, and select residential permits qualify for the Express Permitting Service's same-day review window.",
    },
    {
      q: "Who provides electric, water, and sewer service in Hollywood, FL?",
      a: "Florida Power & Light provides electricity across Broward County. Water and sewer come from the City of Hollywood Department of Public Utilities, which operates the Southern Regional Wastewater Treatment Plant — though roughly 15,000 households remain on septic, so confirm sewer availability by address.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 52, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.hollywoodfl.org/DocumentCenter/View/22116/COH-New-Residential-Construction-Checklist-9-18-23"],
      codes: ["https://www.hollywoodfl.org/DocumentCenter/View/22116/COH-New-Residential-Construction-Checklist-9-18-23"],
      amendments: ["https://www.hollywoodfl.org/DocumentCenter/View/22116/COH-New-Residential-Construction-Checklist-9-18-23"],
      utilities: ["https://www.fpl.com", "https://www.hollywoodfl.org"],
      climate: ["https://www.weather.gov/mfl/"],
      market: ["https://www.hollywoodfl.org"],
    },
  },
};
