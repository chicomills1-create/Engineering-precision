import type { CityData } from "../types";

export const fullerton: CityData = {
  slug: "fullerton",
  name: "Fullerton",
  stateSlug: "california",
  county: "Orange County",
  ahj: {
    office: "City of Fullerton Building Division, Community and Economic Development Department (City Hall, 303 W. Commonwealth Ave.)",
    process:
      "Fullerton's Building Division, headed by the Building and Safety Manager as building official under Fullerton Municipal Code Title 14, administers plan review, permits, and inspections from City Hall. Inspections are scheduled through the Voice Permits IVR line, and California CSLB licensing is required for contractors. Title 24 compliance documentation — including HERS rater verification for covered HVAC and duct measures, filed through the HERS Registry — is part of the acceptance package, not a post-permit afterthought.",
  },
  codes: {
    building: "2025 California Building Code (24 CCR Part 2), adopted as the Fullerton Building Code at FMC Chapter 14.03 (Ordinance 3348)",
    energy: "2025 California Energy Code (Title 24, Part 6), Climate Zone 8 — including HERS rater verification for covered mechanical and duct measures",
    amendments:
      "Fullerton carries a full local amendment set at FMC Sections 14.03.020–14.03.230: added residential sprinkler provisions (CBC Sections 903.2.8.1.1/.2), roofing amendments to Table 1505.1 and Section 1505.1.2, a flood amendment at Section 1612.3, and extensive Appendix J grading additions covering protection of utilities, adjacent property, and storm water. The Building and Safety Manager is the named enforcement agency across the adopted codes.",
  },
  utilities: {
    electric: "Southern California Edison (SCE)",
    notes:
      "Southern California Edison provides electric service and Southern California Gas provides natural gas in Fullerton, so service upgrades and interconnections run on SCE timelines. Fullerton is unusually municipal on the wet side: the city's own water system serves about 32,000 connections (roughly 77% Orange County basin groundwater managed by the Orange County Water District and 23% Metropolitan Water District imports), the city bills water, sewer collection, and sanitation on one city utility account, and sewage treatment is by the Orange County Sanitation District, charged on the property tax bill.",
  },
  climateNotes:
    "Title 24 Climate Zone 8 in inland northern Orange County: a balanced Mediterranean climate with roughly equal heating and cooling degree days, hot summer afternoons, and Seismic Design Category D. Both cooling efficiency (SEER2) and heating efficiency matter to the energy model, and seismic detailing — not frost — drives foundation and connection design.",
  marketNotes:
    "Fullerton's construction market is anchored by education and healthcare: California State University, Fullerton (about 45,900 students) and Providence St. Jude Medical Center are the city's largest employers, followed by Fullerton College, Raytheon's Fullerton operations, and the school districts. Commercial work concentrates in campus and medical expansion and support facilities, downtown Fullerton's historic commercial core, and renovation of a mature housing and retail stock.",
  narratives: {
    mep:
      "MEP design in Fullerton is shaped by the 2025 California codes and Title 24 Climate Zone 8's balanced loads — cooling and heating efficiency both count. SCE provides the electric service, and Title 24's HERS rater requirement is the step out-of-state teams miss: covered duct sealing, refrigerant charge, and airflow measures must be verified by a registered HERS rater and filed in the HERS Registry before final sign-off.",
    structural:
      "Fullerton structural design works to the 2025 California Building Code in Seismic Design Category D, with the city's FMC Chapter 14.03 amendments — including its added sprinkler sections, roofing table changes, and flood provision at CBC 1612.3 — layered on top. Frost depth is not a design factor; seismic overturning, shear wall systems, and the extensive local Appendix J grading rules control foundations and site structures.",
    civil:
      "Civil design in Fullerton benefits from consolidated city utilities: city water (mostly Orange County basin groundwater), city sewer collection, and Orange County Sanitation District treatment. The local Appendix J grading amendments at FMC 14.03.150–14.03.230 add city-specific requirements for utility protection, adjacent-property protection, and storm water that must be reflected in grading plans from the first submittal.",
    energy:
      "Energy compliance in Fullerton is documented to the 2025 California Energy Code in Climate Zone 8 — prescriptive benchmarks include U-0.32 / SHGC-0.25 fenestration limits and R-30 ceiling insulation on residential-scale work, with performance modeling the usual commercial path. HERS verification closes the loop on mechanical measures, and CSUF's campus energy program makes efficiency expectations visible across the local market.",
  },
  faqs: [
    {
      q: "What building code does Fullerton enforce?",
      a: "The 2025 California Building Code (24 CCR Part 2), adopted as the Fullerton Building Code at FMC Chapter 14.03 by Ordinance 3348, with local amendments at FMC 14.03.020–14.03.230 covering sprinklers, roofing, flood, and Appendix J grading.",
    },
    {
      q: "What is the HERS rater requirement in Fullerton?",
      a: "Under Title 24, Part 6, covered HVAC and duct measures — duct sealing, refrigerant charge verification, airflow testing — must be verified by a California HERS rater who submits results to the HERS Registry. The building inspector cannot accept contractor self-certification for those measures.",
    },
    {
      q: "Who provides utilities in Fullerton?",
      a: "Southern California Edison (electric) and Southern California Gas (gas). Water is the City of Fullerton's own system — about 77% local groundwater and 23% Metropolitan Water District imports — with sewer collection by the city and treatment by the Orange County Sanitation District.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 51, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://codelibrary.amlegal.com/codes/fullerton/latest/fullerton_ca/0-0-0-19870"],
      codes: ["https://codelibrary.amlegal.com/codes/fullerton/latest/fullerton_ca/0-0-0-19870"],
      amendments: ["https://codelibrary.amlegal.com/codes/fullerton/latest/fullerton_ca/0-0-0-19870"],
      utilities: ["https://brokerfind.hcrealestateservices.com/brokerage/9394730416/"],
      climate: ["https://www.doineedapermit.org/permits/room-addition/fullerton-ca"],
      market: ["https://brokerfind.hcrealestateservices.com/brokerage/9394730416/"],
    },
  },
};
