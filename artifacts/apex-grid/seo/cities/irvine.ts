import type { CityData } from "../types";

export const irvine: CityData = {
  slug: "irvine",
  name: "Irvine",
  stateSlug: "california",
  county: "Orange County",
  ahj: {
    office: "City of Irvine Community Development Department, Building & Safety Division",
    process:
      "Irvine's Building & Safety Division uses the City's online permit portal for applications, plan submittals, review status, and inspections. Commercial development is coordinated with Planning, Public Works, and Orange County Fire Authority review as applicable; a project in a planned community or with an entitlement condition can have approvals beyond the building-plan check.",
  },
  codes: {
    building: "2025 California Building Standards Code (Title 24), effective January 1, 2026, with City of Irvine local amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with applicable CALGreen and Irvine green-building measures",
    amendments:
      "Irvine Municipal Code adopts the California code family with local amendments. City green-building requirements, grading and stormwater standards, and Orange County Fire Authority requirements are reviewed in addition to the state-code baseline; planned-community and zoning conditions remain project-specific, and the current municipal code controls the applicable cycle.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) provides electric service; Irvine Ranch Water District (IRWD) is the principal water, wastewater, and recycled-water provider",
    notes:
      "SCE controls electric service design and generation interconnection, while IRWD's separate potable-water, wastewater, and recycled-water systems affect domestic, fire, irrigation, and process-water layouts. Confirm the serving IRWD service area and SCE capacity early, especially for data, laboratory, EV, or all-electric loads.",
  },
  climateNotes:
    "Irvine has a warm, dry inland-coastal Orange County climate, with summer cooling, Santa Ana winds, periodic wildfire smoke, and water-supply stewardship as practical design drivers. Seismic design is significant across Orange County, while localized flood and geotechnical conditions vary by tract and drainage basin.",
  marketNotes:
    "Irvine's master-planned employment centers support technology, medical-device and life-science, healthcare, university, office, multifamily, and retail development. Campus-like sites can have constrained utility corridors and private development standards, while laboratory and data-heavy tenants raise electrical, ventilation, and backup-power requirements.",
  narratives: {
    mep:
      "Irvine MEP systems must align with the current Title 24 package while fitting technical and campus-style occupancies that can have much higher process, ventilation, and resilience loads than a conventional office. The warm dry climate supports efficient cooling and economizer analysis where outdoor-air quality permits, but Santa Ana heat and smoke events require defensible peak and filtration operating modes. SCE service capacity and interconnection are distinct from IRWD's potable, recycled-water, and wastewater coordination; that division matters when evaluating electrification, cooling-tower water, and laboratory process systems.",
    structural:
      "Irvine structural work uses the locally adopted California Building Standards Code seismic provisions and starts with a site-specific geotechnical basis rather than a uniform Orange County soil assumption. Seismic site class, settlement, slope or drainage-basin conditions, and the proposed building's equipment loads inform foundation and lateral design. In office-to-lab conversions and tenant improvements, verified existing framing, roof capacity, vibration criteria, and anchorage for new air handlers, generators, and process equipment should be resolved before the Building & Safety submittal and required special inspections.",
    civil:
      "Irvine civil engineering joins City grading and stormwater review with the practical constraints of master-planned streets, private utility easements, and IRWD water and recycled-water infrastructure. We locate biotreatment and detention features without compromising fire access or campus circulation, screen flood and geotechnical conditions before setting pad elevations, and coordinate potable, sewer, and irrigation connections with the correct IRWD system. Public Works and Orange County Fire Authority requirements should be aligned with Building & Safety review rather than treated as a later permit package.",
    energy:
      "Irvine energy design applies Title 24 Part 6 and applicable CALGreen requirements with City green-building provisions checked against the project scope. In Irvine's warm, dry Orange County climate, solar heat control, efficient cooling, lighting and HVAC controls, and real occupancy schedules are more useful than a generic coastal-office model—particularly for lab, medical-device, and data-intensive space. SCE interconnection and service sizing should be coordinated with solar, storage, EV charging, and electrified heating early, while IRWD recycled-water opportunities are evaluated separately from the electrical strategy.",
  },
  faqs: [
    {
      q: "Where are Irvine commercial plans submitted?",
      a: "The City of Irvine Community Development Department, Building & Safety Division accepts permit activity through the City's online portal. Depending on scope, Planning, Public Works, Orange County Fire Authority, and utility reviewers participate in the approval path.",
    },
    {
      q: "Who provides electricity and water in Irvine?",
      a: "Southern California Edison provides electricity. Irvine Ranch Water District is the principal provider of potable water, wastewater, and recycled water, so electric service and water/sewer planning proceed through separate agencies.",
    },
    {
      q: "What code cycle applies to Irvine commercial buildings?",
      a: "Irvine enforces the California Building Standards Code with local amendments, together with Title 24 Part 6 and applicable CALGreen measures. City amendments and project-specific planning, grading, stormwater, and fire requirements also need review; the current Irvine code materials determine the applicable cycle.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 84, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofirvine.org/community-development", "https://www.cityofirvine.org/work/online-building-planning-services"],
      codes: ["https://www.hcd.ca.gov/building-standards", "https://www.dgs.ca.gov/BSC/Codes", "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards"],
      amendments: ["https://www.cityofirvine.org/municipal-code", "https://www.cityofirvine.org/work/codes-licenses-permits"],
      utilities: ["https://www.sce.com/business", "https://www.irwd.com/"],
      climate: ["https://www.weather.gov/sgx/", "https://myhazards.caloes.ca.gov/"],
      market: ["https://www.cityofirvine.org/economic-development"],
    },
  },
};