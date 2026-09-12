import type { CityData } from "../types";

export const oakland: CityData = {
  slug: "oakland",
  name: "Oakland",
  stateSlug: "california",
  county: "Alameda County",
  ahj: {
    office: "City of Oakland Planning & Building Department, Bureau of Building",
    process:
      "Oakland's Planning & Building Department provides building-code, permit, inspection, and plan-check services through its One-Stop Permit Center and online services. Building review may run alongside Planning, Fire, Public Works, environmental, and utility work; larger infill, industrial, and entitlement-driven projects benefit from confirming those parallel requirements before submittal.",
  },
  codes: {
    building:
      "2025 California Building Standards Code (Title 24), effective January 1, 2026, with Oakland amendments and local administrative requirements",
    energy:
      "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with applicable Oakland reach-code and green-building requirements",
    amendments:
      "Oakland's Building Codes page identifies the 2025 California code adoption and publishes Oakland amendments and code bulletins. Local all-electric, green-building, seismic-retrofit, stormwater, zoning, and existing-building requirements must be checked separately rather than substituting a statewide-only analysis.",
  },
  utilities: {
    electric:
      "Pacific Gas and Electric Company (PG&E) provides electric service and interconnection; East Bay Municipal Utility District (EBMUD) supplies water, while Oakland manages local sanitary-sewer functions",
    notes:
      "PG&E service upgrades, transformer space, and distributed-generation interconnection should be established before an all-electric or industrial load is fixed. EBMUD water and fire-flow information, Oakland sewer and right-of-way requirements, and congested existing utilities need early civil coordination.",
  },
  climateNotes:
    "Oakland has a mild, bay-influenced climate with dry summers, winter rain, fog and wind, and occasional inland heat. Bay-margin fill brings liquefaction, settlement, tidal and groundwater concerns; Oakland Hills parcels add landslide and slope-stability issues, while wildfire smoke and seismic exposure affect enclosure and MEP resilience.",
  marketNotes:
    "Oakland combines Port of Oakland logistics and industrial facilities with multifamily and mixed-use infill, healthcare, adaptive reuse, downtown office repositioning, and older warehouse conversion. Seismic, environmental, utility, and local electrification requirements make feasibility and existing-condition verification especially important on constrained East Bay sites.",
  narratives: {
    mep:
      "Oakland MEP design must coordinate the current Title 24, Part 6 cycle with Oakland's locally applicable reach-code and electrification requirements. The bay climate supports right-sized systems and economizer opportunities, but wildfire smoke, heat events, and industrial or laboratory ventilation can change filtration, outdoor-air, and controls decisions. We confirm PG&E service capacity, transformer and interconnection requirements, and EBMUD water demand early so electric space and water heating do not create an unplanned utility or equipment-room constraint.",
    structural:
      "Oakland is a high-seismic Bay Area jurisdiction next to the Hayward Fault, with Bay-margin fill that can be liquefiable or settlement-prone and hillsides that can require slope-stability work. The locally amended California code package, geotechnical report, and existing-building survey must be treated as one design basis. Warehouse and masonry conversions need field verification of diaphragms, collectors, foundations, and connections before new occupancy loads or retrofit scope are assumed.",
    civil:
      "Oakland civil design has to fit stormwater treatment, access, utilities, and public improvements onto often small or previously developed parcels. Bay-margin sites require screening for tidal flooding, groundwater, settlement, and sea-level-rise resilience; hillside sites instead bring steep grading and erosion-control demands. We reserve the stormwater-management footprint, coordinate EBMUD water and Oakland sewer connections, and resolve Public Works frontage or right-of-way work before the building plan consumes that space.",
    energy:
      "Oakland energy compliance uses the applicable California Title 24, Part 6 method plus Oakland's current local reach-code and green-building requirements; it is not an IECC or COMcheck-only project. Mild conditions favor envelope, glazing, lighting controls, heat pumps, and right-sized HVAC, but an all-electric building still needs realistic PG&E service and load-management planning. We also separate permit compliance from Oakland's requirements for covered existing-building benchmarking and operations so the owner receives a usable long-term energy plan.",
  },
  faqs: [
    {
      q: "What code cycle does Oakland identify for current permits?",
      a: "Oakland's Building Codes page identifies the 2025 California Building Standards Code and 2025 California Energy Code (Title 24, Part 6) as taking effect January 1, 2026, with Oakland amendments and local materials. The City's current code bulletins control project-specific reach-code and administrative requirements.",
    },
    {
      q: "Does Oakland's local code affect an all-electric commercial design?",
      a: "Yes. Oakland publishes local reach-code and green-building requirements in addition to the state Title 24 baseline, and the applicable project type and exceptions matter. Confirm the current Oakland amendment package, then size electrical service, heat-pump equipment, water heating, EV charging, and PG&E infrastructure together.",
    },
    {
      q: "What site conditions deserve early Oakland investigation?",
      a: "Bay-margin fill and waterfront parcels should be screened for liquefaction, settlement, groundwater, tidal flooding, and sea-level-rise exposure. Oakland Hills parcels need slope and landslide review, while every site needs seismic, stormwater, existing-utility, and EBMUD water-capacity coordination.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.oaklandca.gov/Planning-Building"],
      codes: ["https://www.bsc.ca.gov/Codes.aspx", "https://www.hcd.ca.gov/building-standards", "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards", "https://www.oaklandca.gov/Planning-Building/Building-Construction-Permits-Inspections/Building-Codes"],
      amendments: ["https://www.oaklandca.gov/Planning-Building/Building-Construction-Permits-Inspections/Building-Codes"],
      utilities: ["https://www.pge.com/en/business-resources.html", "https://www.ebmud.com/"],
      climate: ["https://www.weather.gov/mtr/"],
      market: ["https://www.oaklandca.gov/Government/Departments/Economic-Workforce-Development"],
    },
  },
};