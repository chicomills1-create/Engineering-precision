import type { CityData } from "../types";

export const marietta: CityData = {
  slug: "marietta",
  name: "Marietta",
  stateSlug: "georgia",
  county: "Cobb County",
  ahj: {
    office: "City of Marietta Development Services, Building Inspection Division (inside city limits); Cobb County Community Development Agency (unincorporated Cobb County)",
    process:
      "The first permitting question in Marietta is which jurisdiction the parcel sits in. Inside the city limits, the City of Marietta Development Services runs the process — building plans are submitted online through the city's Sages system, the Building Inspection Division reviews for code conformance, and the city's Engineering Division reviews site plans against the City Code, the Georgia Erosion and Sedimentation Act, and NPDES requirements. A large share of addresses with a Marietta mailing address are actually unincorporated Cobb County, where the Cobb County Community Development Agency at 1150 Powder Springs Street reviews plans with multi-agency sign-offs that can include the Cobb County Fire Marshal. Commercial work in either jurisdiction requires complete, sealed construction documents, and confirming the governing jurisdiction from the parcel record — not the mailing address — is the first step of design.",
  },
  codes: {
    building:
      "Georgia State Minimum Standard Codes (2024 IBC with Georgia amendments, the mandatory statewide edition effective January 1, 2026), enforced locally by the City of Marietta or Cobb County depending on the parcel",
    energy:
      "Georgia State Minimum Standard Energy Code (2015 IECC with Georgia Supplements and Amendments — the edition Georgia retained when the 2024 I-codes were adopted), with ASHRAE 90.1 as an alternate commercial path",
    amendments:
      "Because Georgia's code is mandatory statewide, neither Marietta nor Cobb County can adopt a weaker edition, but each layers on its own zoning, site, and stormwater requirements — the city through its own development standards and historic-district overlays around Marietta Square, the county through the Cobb County Code and its stormwater management ordinance. Confirm current DCA amendment years, which update annually.",
  },
  utilities: {
    electric:
      "Marietta Power & Water, the City of Marietta's community-owned municipal utility, inside the city; Georgia Power and Cobb EMC serve surrounding unincorporated Cobb County",
    notes:
      "Marietta Power & Water is one of the largest municipal electric utilities in Georgia, serving more than 45,000 electric customers, and it also provides the city's water and sewer service. Outside the city limits, water and sewer run through the Cobb County Water System and electric service splits between Georgia Power and Cobb EMC territory. Utility coordination follows the same city/county line as permitting, so we confirm the serving utility, available capacity, and tap requirements against the parcel's actual jurisdiction at project kickoff; Georgia Power commercial accounts carry meaningful demand charges where it is the provider.",
  },
  climateNotes:
    "Marietta sits in ASHRAE climate zone 3A — humid subtropical — in the Piedmont foothills northwest of Atlanta at roughly 1,100 feet of elevation. Summers are long and humid with latent load rivaling sensible cooling, and the elevation buys slightly cooler nights than the Atlanta core; winters are mild with occasional ice events rather than sustained deep cold.",
  marketNotes:
    "Marietta anchors Cobb County, metro Atlanta's second commercial core. Lockheed Martin's Marietta plant and adjacent Dobbins Air Reserve Base anchor a deep defense and aerospace cluster; Wellstar Kennestone Hospital anchors a major healthcare district; and the Cumberland district at the county's southern edge — The Battery Atlanta and the I-75/I-285 interchange — drives continuous mixed-use, office, and hospitality work. Historic Marietta Square, the I-75 and US-41 industrial corridors, and steady infill across East Cobb keep tenant-improvement and mid-size commercial volume high, split between the city's queue and the county's.",
  narratives: {
    mep:
      "MEP design in Marietta answers first to a humid zone 3A climate where latent load runs long across muggy shoulder seasons, so we lead with dehumidification, tight pressurization, and vapor-aware envelope coordination rather than sizing on peak dry-bulb alone. The local variable other Georgia markets don't have is the utility map: inside the city, Marietta Power & Water is a municipal provider with its own service and metering practices, while unincorporated Cobb projects land in Georgia Power or Cobb EMC territory, where demand-charge-heavy commercial rates reward load-shifting and honestly sized services. Our HVAC, lighting, and plumbing documentation targets Georgia's amended 2015 IECC energy edition with ASHRAE 90.1 as the alternate path, and we sequence the submittal to the reviewer who actually holds the parcel — the city's Building Inspection Division through the Sages system, or Cobb County Community Development with its multi-agency sign-offs.",
    structural:
      "Marietta structural work is governed less by lateral events and more by what the Piedmont ground does. Seismic demand is low (generally SDC A–B) and wind is a moderate ~105-115 mph, so the geotechnical report is usually the governing document: Piedmont residual soils over weathered rock, with pockets of expansive clay, produce variable bearing that drives spread footings, drilled piers, or deepened foundations. The county's mature commercial corridors add existing-building work — Lockheed- and Dobbins-adjacent industrial buildings, Kennestone-area medical facilities, and Cumberland mixed-use — where field verification of older structures matters as much as new-design calculations. Special-inspection programs are set up under the Georgia-amended IBC and administered through the City of Marietta or Cobb County, depending on the parcel.",
    civil:
      "Site engineering in Marietta starts with jurisdiction, because the city and the county run different site reviews on the same streets. Inside the city, the Engineering Division reviews site plans against the City Code, the Georgia Erosion and Sedimentation Act, and NPDES requirements; in unincorporated Cobb, the county's development review applies its own stormwater and erosion-control standards. Both sit on erosive Piedmont red clay, so detention, water-quality treatment, and erosion control are designed to the Georgia Stormwater Management Manual (the Blue Book) in the first site-plan pass. Sites disturbing an acre or more require Georgia EPD NPDES construction stormwater coverage with a comprehensive erosion-control plan, and older corridors add capacity coordination with Marietta Power & Water or the Cobb County Water System.",
    energy:
      "Marietta projects comply with Georgia's statewide amended energy code — the 2015 IECC with Georgia supplements, the edition Georgia retained when the 2024 I-codes were adopted — so COMcheck or energy-model documentation targets that Georgia-amended edition, with ASHRAE 90.1 available as an alternate. In the warm, humid zone 3A climate, compliance economics favor blocking sun and moisture: low-SHGC glazing, exterior shading, and a well-sealed envelope pay back faster than piling on roof R-value, and dehumidification-capable cooling plants matter more than peak-efficiency ratings suggest. We reconcile envelope, mechanical, and lighting compliance as one package and resolve plan-check comments through the reviewing office — city or county — rather than treating each trade in isolation.",
  },
  faqs: [
    {
      q: "Who issues building permits in Marietta — the city or Cobb County?",
      a: "It depends on the parcel, not the mailing address. Inside the city limits, the City of Marietta Development Services (Building Inspection Division) permits and inspects the work, with plans submitted online through the city's Sages system. Much of what carries a Marietta address is unincorporated Cobb County, where the Cobb County Community Development Agency reviews and permits instead. We confirm the governing jurisdiction from the parcel record before design, because it decides the reviewer, the portal, and the local ordinance set.",
    },
    {
      q: "What building code does Marietta enforce?",
      a: "Marietta and Cobb County both enforce the Georgia State Minimum Standard Codes — the 2024 IBC with Georgia amendments, the mandatory statewide edition effective January 1, 2026, adopted by the Department of Community Affairs. Neither jurisdiction can adopt a weaker edition, so the technical baseline is consistent statewide, while city and county zoning, site, and stormwater ordinances add jurisdiction-specific requirements. Energy compliance runs under Georgia's amended 2015 IECC, which the state retained.",
    },
    {
      q: "Who provides electric and water service in Marietta?",
      a: "Inside the city, Marietta Power & Water — the city's community-owned utility and one of the largest municipal electric utilities in Georgia, with more than 45,000 electric customers — provides electric, water, and sewer service. In unincorporated Cobb County, electric service is Georgia Power or Cobb EMC depending on territory, and water and sewer run through the Cobb County Water System. We confirm the serving utility and capacity against the parcel at kickoff, since it affects service sizing, metering, and tap coordination.",
    },
  ],
  research: {
    lastVerified: "2026-10-27", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 84, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.mariettaga.gov/382/Building-Inspections"],
      codes: ["https://dca.georgia.gov/scac"],
      amendments: ["https://dca.georgia.gov/scac"],
      utilities: ["https://www.mariettaga.gov/1503/Power-Water"],
      climate: ["https://www.weather.gov/ffc/"],
      market: ["https://www.mariettaga.gov/DocumentCenter/View/18147/Business-Development-Guide_2025-FINAL"],
    },
  },
};
