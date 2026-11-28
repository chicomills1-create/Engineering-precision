import type { CityData } from "../types";

export const miamiGardens: CityData = {
  slug: "miami-gardens",
  name: "Miami Gardens",
  stateSlug: "florida",
  county: "Miami-Dade County",
  ahj: {
    office: "City of Miami Gardens Building Services Division, Development Services Department (City Hall, 18605 NW 27th Avenue)",
    process:
      "Miami Gardens' Building Services Division issues building, electrical, mechanical, and plumbing permits from City Hall, with applications filed through the Citizen Self Service (CSS) portal under Tyler EnerGov and documents following the city's Electronic Construction Document Submittal Requirements Checklist. A non-refundable up-front fee of 30% of the permit fee is due at application, with a 15% technology fee added. Commercial submittals need two sets of signed and sealed plans, energy calculations and heating/cooling load calculations, product approvals for envelope components, and — critically — proof of Miami-Dade County DERM approval for new buildings, nonresidential additions, interior commercial alterations, and commercial re-roofs before the city can finish its review. Inspections booked before 3:00 p.m. are performed the next business day.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023), Building — based on the 2021 IBC with Florida amendments, including the High-Velocity Hurricane Zone (HVHZ) provisions for Miami-Dade County",
    energy: "Florida Building Code, Energy Conservation, 8th Edition (2023) — based on the 2021 IECC, Climate Zone 1 (prescriptive glazed fenestration SHGC maximum 0.25); the city requires the energy calculations form and heating/cooling load calculations in the permit package",
    amendments:
      "Miami-Dade County is the core of the HVHZ, so Miami Gardens enforces the FBC's HVHZ sections: exterior products must carry Miami-Dade Notices of Acceptance (NOAs) or Florida Product Approvals covering HVHZ use, tested to TAS 201/202/203, and the Risk Category II design wind speed is 175 mph — the highest in Florida. At the county layer, Miami-Dade DERM environmental approval is a precondition for most commercial work, contractors must register with the city in addition to state or county licensure, and a recorded Notice of Commencement must be in place before the first inspection on larger jobs.",
  },
  utilities: {
    electric: "Florida Power & Light (FPL)",
    notes:
      "Florida Power & Light provides electric service in Miami Gardens under its franchise with the city, so new commercial services and capacity upgrades run through FPL's service-planning and storm-hardening regime in the HVHZ. Water and sewer are provided by the Miami-Dade Water and Sewer Department, not the city — so utility capacity, connection, and DERM environmental review for commercial projects sit at the county level, which is why county approvals sequence ahead of city permit issuance.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 1A (hot-humid) in northern Miami-Dade County: cooling and dehumidification run nearly year-round, and hurricane design controls the envelope — 175 mph Risk Category II design wind speed inside the HVHZ, the highest in the state. Intense convective rainfall on flat, low-lying terrain makes flood elevation and site drainage standing design inputs, and salt-laden air accelerates corrosion of exterior equipment.",
  marketNotes:
    "Miami Gardens' commercial market is defined by Hard Rock Stadium — home of the Miami Dolphins and the University of Miami Hurricanes, and host to the Formula 1 Miami Grand Prix and the Miami Open — which drives hospitality, event, and stadium-district construction, alongside Calder Casino, St. Thomas University, and Florida Memorial University. Retail and logistics corridors along NW 27th Avenue, the Palmetto Expressway, and the Golden Glades interchange generate steady re-tenanting and warehouse work, and the city's largely residential base produces continuous school, municipal, and neighborhood commercial projects.",
  narratives: {
    mep:
      "MEP design in Miami Gardens is documented to the Florida Building Code, 8th Edition (2023), and the permit package must carry the energy calculations form and heating/cooling load calculations the city expressly requires. Electrical service coordination runs through Florida Power & Light, but the schedule risk is county-level: Miami-Dade DERM approval is a precondition for new buildings, nonresidential additions, and interior commercial alterations, and water and sewer capacity sits with the Miami-Dade Water and Sewer Department — so MEP teams should start the county track before the city CSS filing, not after.",
    structural:
      "Structural design in Miami Gardens is the most demanding wind design in Florida: the city is inside the High-Velocity Hurricane Zone with a 175 mph Risk Category II design wind speed under the 8th Edition FBC's ASCE 7-22 maps. Every exterior product must carry a Miami-Dade NOA or an HVHZ-covering Florida Product Approval with large-missile impact testing (TAS 201/202/203), and product approvals are a required submittal element — an unapproved window or door schedule stops plan review. Flood elevation on flat, low terrain sets the ground floor.",
    civil:
      "Civil design in Miami Gardens works through the county as much as the city: Miami-Dade DERM approval covers new buildings, additions, commercial alterations, and demolition, and water and sewer are Miami-Dade Water and Sewer Department systems, so capacity and connection review happen at the county. On site, flat topography and intense rainfall make stormwater management and finished-floor elevation the controlling design work, and stadium-district and Palmetto corridor projects add event-traffic and access coordination.",
    energy:
      "Energy compliance in Miami Gardens is documented to the Florida Building Code, Energy Conservation, 8th Edition (2023) for Climate Zone 1, with the city's required energy calculations and load calculations filed in the permit package. In zone 1A the compliance margin is solar heat gain (SHGC 0.25 maximum on glazed fenestration) and cooling efficiency, complicated by HVHZ impact glazing — the specified Low-E impact units must satisfy the energy code and carry a Miami-Dade NOA at the same time.",
  },
  faqs: [
    {
      q: "What building code does Miami Gardens enforce?",
      a: "The Florida Building Code, 8th Edition (2023), including its Energy Conservation volume. Miami-Dade County is in the High-Velocity Hurricane Zone, so the FBC's HVHZ sections apply with a 175 mph Risk Category II design wind speed and Miami-Dade product-approval (NOA) requirements.",
    },
    {
      q: "What county approvals are needed before a Miami Gardens commercial permit?",
      a: "Proof of Miami-Dade County DERM approval is required for new buildings, additions to nonresidential buildings, interior commercial alterations, commercial re-roofs, commercial pools, land clearing, and demolition. Water and sewer capacity also sits with the Miami-Dade Water and Sewer Department, so county review sequences ahead of city issuance.",
    },
    {
      q: "How are permits filed in Miami Gardens?",
      a: "Through the city's Citizen Self Service (CSS) portal (Tyler EnerGov), following the Electronic Construction Document Submittal Requirements Checklist. A non-refundable 30% up-front fee is due at application plus a 15% technology fee, and inspections booked before 3:00 p.m. are performed the next business day.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 42, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://miamigardens-fl.gov/DocumentCenter/View/104/Building-FAQs-PDF", "https://alliancepermitting.com/guides/florida/miami-gardens-building-permit"],
      codes: ["https://permitplace.com/florida-2026-building-code-changes/"],
      amendments: ["https://miamigardens-fl.gov/DocumentCenter/View/104/Building-FAQs-PDF"],
      utilities: ["https://www.miamigardens-fl.gov/DocumentCenter/View/8233/CDMP---Intergovernmental-DataInventoryAnalysis"],
      climate: ["https://permitplace.com/florida-2026-building-code-changes/"],
      market: ["https://alliancepermitting.com/guides/florida/miami-gardens-building-permit"],
    },
  },
};
