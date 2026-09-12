import type { CityData } from "../types";

export const sanFrancisco: CityData = {
  slug: "san-francisco",
  name: "San Francisco",
  stateSlug: "california",
  county: "City and County of San Francisco",
  ahj: {
    office: "San Francisco Department of Building Inspection (DBI)",
    process:
      "DBI uses its Permit and Project Tracking System for permit records, applications, and review status; project routing can include Planning, Fire, Public Works, and other city agencies. Dense or alteration projects should confirm Planning and historic-resource requirements before the building submittal, while the scope and permit type determine whether electronic review and additional departmental review are available.",
  },
  codes: {
    building:
      "2025 California Building Standards Code (Title 24), effective January 1, 2026, as locally adopted and amended in the San Francisco Building Code and administered by DBI",
    energy:
      "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with San Francisco's locally applicable Environment Code, green-building, and all-electric requirements layered on the state baseline",
    amendments:
      "San Francisco amendments address seismic safety, fire/life safety, existing buildings, accessibility, and local administration. The City's green-building and all-electric rules, the Soft Story Program, and project-specific historic or site requirements are separate local checks; the current DBI and municipal-code materials govern instead of a generic California template.",
  },
  utilities: {
    electric:
      "Pacific Gas and Electric Company (PG&E) delivers electric service; CleanPowerSF is the City's community-choice electricity program, while the San Francisco Public Utilities Commission (SFPUC) supplies water and wastewater service",
    notes:
      "PG&E remains the electric-service and interconnection contact even where CleanPowerSF supplies generation. SFPUC water, sewer, stormwater, and alternative-water requirements need early coordination on small dense parcels, and PG&E capacity and transformer constraints should be tested before an all-electric load is fixed.",
  },
  climateNotes:
    "San Francisco's cool marine climate produces fog, wind, winter rain, and sharp neighborhood microclimates rather than a uniform city condition. Seismic shaking, liquefaction and lateral-spread potential in Bay fill, coastal flooding and sea-level-rise exposure, and salt-air corrosion often matter more than conventional cooling-peak design.",
  marketNotes:
    "San Francisco's commercial pipeline emphasizes seismic retrofit, historic rehabilitation, tenant improvement, healthcare and institutional modernization, life-science conversion, and dense multifamily or mixed-use infill. Constrained lots, older utilities, transit interfaces, and active occupied buildings make phasing and existing-condition verification central to design.",
  narratives: {
    mep:
      "San Francisco MEP design uses the applicable Title 24, Part 6 path plus local green-building and all-electric rules. The cool marine climate supports right-sized heat pumps, heat recovery, daylighting, and controlled economizer operation, but laboratories, healthcare, kitchens, and dense tenant improvements can be ventilation- and process-load dominated. We coordinate PG&E service capacity and interconnection, CleanPowerSF's generation context, and SFPUC water constraints early so electrification and process loads remain buildable on a constrained parcel.",
    structural:
      "DBI structural design starts with one of the nation's most demanding seismic environments and a careful distinction between new construction, voluntary alteration, and mandatory retrofit scope. Bay fill and waterfront sites may need liquefaction or lateral-spread mitigation; hillsides add retaining and slope stability. For older wood-frame, masonry, or historic buildings, field verification of diaphragms, collectors, connections, and compatible strengthening is required before a tenant-improvement layout can safely assume existing capacity.",
    civil:
      "San Francisco civil work is unusually space-constrained: steep grades, small lots, combined-sewer infrastructure, utility congestion, and SFPUC stormwater controls compete with access, loading, and building area. We establish treatment, detention, green-infrastructure, and utility corridors in the first site plan and coordinate Public Works frontage work where required. Waterfront and low-lying fill parcels also need current flood information and long-term sea-level-rise resilience considered in finished floors, drainage, and utility placement.",
    energy:
      "San Francisco energy design combines Title 24, Part 6 documentation with local green-building and all-electric requirements where the project is covered. In the marine climate, envelope airtightness, high-performance glazing, heat pumps, heat recovery, lighting controls, and realistic internal-load schedules usually outperform an oversized cooling plant. The energy model must be reconciled with PG&E electrical-service capacity and SFPUC water needs, particularly for labs, hospitality, healthcare, and major tenant improvements.",
  },
  faqs: [
    {
      q: "Which agency is the building AHJ in San Francisco?",
      a: "The San Francisco Department of Building Inspection is the building-permit authority. DBI's Permit and Project Tracking System supports permit and review-status work, while Planning, Fire, Public Works, and SFPUC may have parallel approvals depending on the project and site.",
    },
    {
      q: "Does every San Francisco project have to be all-electric?",
      a: "San Francisco has local all-electric and green-building requirements for covered new construction, with defined scope and exceptions. For projects under the current cycle, those requirements sit alongside the 2025 California Energy Code (Title 24, Part 6), effective January 1, 2026; the project type and current city ordinance determine the local scope.",
    },
    {
      q: "What should an older San Francisco building be screened for?",
      a: "Screen the building for seismic deficiencies, soft-story or open-front conditions, liquefaction and fill history, historic constraints, and existing utility capacity. The City's Soft Story Program covers defined older wood-frame residential buildings, but ordinary commercial alterations still require project-specific DBI and structural review.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 95, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.sf.gov/departments--department-building-inspection"],
      codes: ["https://www.bsc.ca.gov/Codes.aspx", "https://www.hcd.ca.gov/building-standards", "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards", "https://www.sf.gov/information--building-codes"],
      amendments: ["https://codelibrary.amlegal.com/codes/san_francisco/latest/overview"],
      utilities: ["https://www.pge.com/en/business-resources.html", "https://www.sfpuc.gov/"],
      climate: ["https://www.weather.gov/mtr/"],
      market: ["https://www.sf.gov/departments/office-economic-and-workforce-development"],
    },
  },
};