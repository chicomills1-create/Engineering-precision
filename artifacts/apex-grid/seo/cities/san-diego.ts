import type { CityData } from "../types";

export const sanDiego: CityData = {
  slug: "san-diego",
  name: "San Diego",
  stateSlug: "california",
  county: "San Diego County",
  ahj: {
    office: "City of San Diego Development Services Department (DSD)",
    process:
      "DSD publishes permits, codes, application guidance, and review-status resources through its Development Services site and OpenDSD portal. Eligible scopes may use quicker-processing options such as self-certification or over-the-counter review, while larger commercial work receives full multi-discipline review and may also need Planning, Fire-Rescue, Public Utilities, and right-of-way approvals.",
  },
  codes: {
    building:
      "2025 California Building Standards Code (Title 24), effective for projects submitted on or after January 1, 2026, with City of San Diego local amendments in the Municipal Code and Land Development Code",
    energy:
      "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with applicable San Diego amendments and CALGreen requirements",
    amendments:
      "DSD publishes local amendments to the 2025 California Building Standards Code and identifies the 2025 code as effective for projects submitted on or after January 1, 2026. San Diego's Land Development Code, stormwater standards, brush-management and wildland-urban-interface rules, coastal overlays, and grading requirements can add parcel-specific obligations.",
  },
  utilities: {
    electric:
      "San Diego Gas & Electric (SDG&E) delivers electric service; community-choice providers may supply generation, while the City of San Diego Public Utilities Department provides water and wastewater service",
    notes:
      "SDG&E handles new electric service and distributed-generation interconnection, so service capacity, transformer space, demand charges, and schedule should be confirmed early. Public Utilities water and sewer capacity, meters, and extensions should be coordinated with the civil and fire-flow design.",
  },
  climateNotes:
    "San Diego is predominantly a mild marine Southern California climate with warmer inland conditions, long dry periods, occasional intense winter rain, coastal salt exposure, and Santa Ana wind events. High seismic hazard, liquefaction-prone areas, steep slopes, and wildland-urban-interface fire exposure vary substantially by parcel.",
  marketNotes:
    "San Diego's commercial market is anchored by life sciences and biotechnology around Torrey Pines and UTC, defense and Navy-related work, healthcare, higher education, tourism, and transit-oriented multifamily. Laboratories and cleanrooms create intensive MEP and reliability needs, while coastal, hillside, brush-management, and stormwater constraints make early site feasibility important.",
  narratives: {
    mep:
      "San Diego MEP design pairs the current Title 24 and DSD code package with a mild marine climate that can support right-sized systems and useful economizer hours. Life-science, healthcare, and defense programs can nevertheless be ventilation-, exhaust-, redundancy-, and process-load dominated, so outdoor-air, pressure relationships, emergency power, and equipment heat rejection need program-specific analysis. We verify SDG&E service capacity, transformer and interconnection requirements, and water demand early, especially where electrification or laboratory loads could outgrow an existing service.",
    structural:
      "San Diego structural design must account for high seismic demand, active fault systems including the Rose Canyon system, and site-specific soil conditions. The current DSD code materials point to the locally amended 2025 California code cycle; the geotechnical report then drives liquefaction, settlement, slope, and foundation decisions. Coastal corrosion, hillside retaining, equipment anchorage, and special-inspection planning should be coordinated with architecture and MEP before the OpenDSD submittal.",
    civil:
      "San Diego civil design is strongly shaped by the City's stormwater standards and development-project BMP requirements, which can require meaningful on-site treatment or retention area. Coastal Zone review, steep-hillside grading, brush-management setbacks, flood screening, and right-of-way work change the site plan by location. We lay out stormwater, fire access, SDG&E corridors, and Public Utilities water and sewer connections together rather than leaving BMP and utility space to the end of building design.",
    energy:
      "For projects submitted under the current cycle, San Diego energy compliance uses the 2025 California Energy Code, Title 24 Part 6, with CALGreen and applicable local requirements. Mild coastal conditions favor efficient envelopes, glazing, heat pumps, controls, and carefully modeled schedules, while inland sites require more attention to cooling peaks. SDG&E service capacity, demand management, solar/storage interconnection, and the project's electrification strategy belong in the same early design conversation as the Title 24 model.",
  },
  faqs: [
    {
      q: "What California code cycle does San Diego currently use?",
      a: "DSD identifies the 2025 California Building Standards Code and local amendments as effective for projects submitted on or after January 1, 2026. The permit submission date and project-specific DSD materials control, and Title 24 Part 6 is the corresponding California energy-code framework.",
    },
    {
      q: "Can a San Diego project use self-certification or quicker processing?",
      a: "Some eligible scopes can use DSD quicker-processing options, including self-certification or over-the-counter review. Eligibility does not remove code, zoning, fire, stormwater, or utility obligations; DSD's current program guidance should be checked before relying on a shortened review path.",
    },
    {
      q: "Which utility decisions should happen before a large San Diego load is designed?",
      a: "Confirm SDG&E service voltage and capacity, transformer location, interconnection requirements, and the applicable generation or demand-charge arrangement. Coordinate those findings with City Public Utilities water and sewer capacity, especially for laboratories, healthcare, all-electric buildings, EV charging, and other high-load uses.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 91, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.sandiego.gov/development-services"],
      codes: ["https://www.bsc.ca.gov/Codes.aspx", "https://www.hcd.ca.gov/building-standards", "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards", "https://www.sandiego.gov/development-services/codes-regulations"],
      amendments: ["https://www.sandiego.gov/development-services/codes-regulations"],
      utilities: ["https://www.sdge.com/business", "https://www.sandiego.gov/public-utilities"],
      climate: ["https://www.weather.gov/sgx/"],
      market: ["https://www.sandiego.gov/economic-development"],
    },
  },
};