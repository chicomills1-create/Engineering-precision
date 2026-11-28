import type { CityData } from "../types";

export const lakeland: CityData = {
  slug: "lakeland",
  name: "Lakeland",
  stateSlug: "florida",
  county: "Polk County",
  ahj: {
    office: "City of Lakeland Community & Economic Development Department, Building Inspection Division (Lakeland City Hall, 228 South Massachusetts Avenue)",
    process:
      "Lakeland's Building Inspection Division runs a fully digital two-system process: applications are filed in iMS, the city's integrated online permitting system that replaced eTrakit in January 2024 (apply, pay by eCheck or card, and schedule inspections there — no paper applications or plans are accepted), and plan review happens in ePlan (ProjectDox), mandatory since March 15, 2017 for all but the simplest homeowner projects. The iMS application triggers an ePlan invitation; reviewers mark up plans directly in ProjectDox, corrections resubmit with overlay comparison, and approved stamped plans release once fees are paid. Filing under the wrong record type closes the application and restarts the review clock, and the division also runs an Express Permitting lane for simple scopes.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023) — Building volume, based on the 2021 IBC with Florida amendments (city confirms the 8th Edition 2023 FBC, the 2020 NEC, and the 8th Edition 2023 Florida Fire Prevention Code as its codes in use)",
    energy: "Florida Building Code, Energy Conservation, 8th Edition (2023) — compliance documented on the FBC energy forms (e.g., Form 402-2023 for added living space) with the permit submittal",
    amendments:
      "Lakeland administers the statewide FBC with its local process written into city practice: digital-only submittal (iMS plus ePlan/ProjectDox since 2017, with electronically signed-and-sealed plans required from design professionals), Florida product approval numbers required for exterior materials in the submittal checklist, and city contractor registration on top of Florida licensure. State law layers on top — including SB 4-D milestone structural inspections for condominium and cooperative buildings three stories or taller at 30 years — which the division administers locally for Lakeland's aging condo stock.",
  },
  utilities: {
    electric: "Lakeland Electric — the city-owned municipal electric utility",
    notes:
      "Lakeland Electric is a city department and one of Florida's largest municipal utilities, so new commercial services, capacity, and interconnections run through the city utility rather than an investor-owned provider — and electric, water, wastewater, and solid waste combine on one city utility bill. Lakeland Water Utilities supplies water treated from Floridan aquifer wells (the T.B. Williams and C. Wayne Combee plants) and provides wastewater service, consolidating nearly all utility coordination inside City Hall; natural gas is TECO Peoples Gas.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) in Central Florida's lake country: long, humid cooling seasons, daily summer thunderstorms with Florida's highest lightning density, inland hurricane wind exposure under the FBC, and karst geology — sinkhole risk and a high water table over the Floridan aquifer shape foundation and dewatering design. Cooling and latent-load control dominate energy design.",
  marketNotes:
    "Lakeland is Polk County's largest city and the midpoint of the I-4 corridor between Tampa and Orlando. Publix Super Markets is headquartered here and is the area's largest employer across its corporate campus, IT, and distribution operations; Lakeland Regional Health, Amazon (fulfillment plus the Amazon Air hub at city-owned Lakeland Linder International Airport), Saddle Creek Logistics, and GEICO round out the anchor base, with Florida Polytechnic University and Florida Southern College adding institutional work. The construction market is logistics- and distribution-led, with medical expansion and downtown redevelopment behind it.",
  narratives: {
    mep:
      "MEP design in Lakeland is documented to the Florida Building Code, 8th Edition (2023), with electrical work to the 2020 NEC, and it is submitted digitally end-to-end: application in iMS, signed-and-sealed plans in ePlan/ProjectDox, energy forms (such as Form 402-2023) in the package. Service design runs through Lakeland Electric, the municipal utility, which simplifies coordination — one city counterparty for power, water, and sewer — while zone 2A latent loads make dehumidification and ventilation strategy a first-order design decision.",
    structural:
      "Structural design in Lakeland follows the FBC's wind provisions for inland Central Florida — lower ultimate wind speeds than the coast but full wind-borne debris and component-and-cladding discipline — over karst limestone geology where sinkhole investigation and grouting programs are a real line item. A high Floridan-aquifer water table affects foundations and underground utilities, and the state's SB 4-D milestone inspection regime adds structural assessment work for the city's older three-story-plus condominium stock.",
    civil:
      "Civil design in Lakeland is shaped by lakes and limestone: the city is threaded with named lakes and wetlands, stormwater must protect lake water quality, and karst conditions plus a high water table drive geotechnical scope, dewatering, and stormwater pond design. Water and wastewater are Lakeland Water Utilities services drawn from the Floridan aquifer, and most growth sites sit along the I-4 and Polk Parkway corridors where utility extensions and concurrency review set the schedule.",
    energy:
      "Energy compliance in Lakeland is documented to the Florida Building Code, Energy Conservation, 8th Edition (2023), with the required FBC energy forms signed into the ePlan submittal. In zone 2A the compliance margin is decided by cooling efficiency, latent-load control, and envelope performance under intense solar gain — and Lakeland Electric's municipal rate structures and commercial programs give owners a local incentive layer beyond the state code minimum.",
  },
  faqs: [
    {
      q: "What building codes does Lakeland, FL use?",
      a: "Per the Building Inspection Division, the codes in use are the Florida Building Code, 8th Edition (2023), the National Electrical Code 2020, and the Florida Fire Prevention Code, 8th Edition (2023). Energy compliance is documented to the FBC Energy Conservation volume, 8th Edition (2023).",
    },
    {
      q: "How are permits and plans submitted in Lakeland?",
      a: "Entirely online: applications, fees, and inspection scheduling run through the iMS permitting system (live since January 2024), and plans are reviewed in ePlan (ProjectDox), mandatory since 2017 — paper applications and plans are not accepted, and design professionals must sign and seal plans electronically. Filing under the wrong record type closes the application and restarts review.",
    },
    {
      q: "Who provides electric and water service in Lakeland?",
      a: "Lakeland Electric, the city-owned municipal utility, provides electricity, and Lakeland Water Utilities provides water (from Floridan aquifer wells) and wastewater — combined on one city utility bill. Natural gas is TECO Peoples Gas.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.lakelandgov.net/departments/community-economic-development/building-inspection/faqs/"],
      codes: ["https://www.lakelandgov.net/departments/community-economic-development/building-inspection/faqs/"],
      amendments: ["https://www.lakelandgov.net/departments/community-economic-development/building-inspection/forms-checklists/"],
      utilities: ["https://en.wikipedia.org/wiki/Lakeland,_Florida"],
      climate: ["https://www.floridabuilding.org/fbc/thecode/2023_Code_Development/2025_Supplement_to_the_8th_Edition-2023-FBC_Supplement_7.pdf"],
      market: ["https://en.wikipedia.org/wiki/Lakeland,_Florida"],
    },
  },
};
