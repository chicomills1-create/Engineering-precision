import type { CityData } from "../types";

export const hayward: CityData = {
  slug: "hayward",
  name: "Hayward",
  stateSlug: "california",
  county: "Alameda County",
  ahj: {
    office: "City of Hayward Building Division, Development Services Department",
    process:
      "Hayward's Building Division at City Hall, 777 B Street, runs a concurrent plan check: once an application is submitted to the Permit Center, the city distributes plans to all reviewing departments at the same time and collects the comments, rather than routing the applicant department to department. Most standard permits — reroofs, water heaters, window replacements, minor electrical and non-structural remodels — issue over the counter, same day or within 24 hours. Permits issue only to the property owner or to an appropriately licensed contractor holding a City of Hayward business license, and plan-check applications are abandoned after 365 days if not approved.",
  },
  codes: {
    building: "2022 California Building Code (Title 24, Part 2, based on the 2021 IBC) with Hayward local amendments, Hayward Municipal Code Chapter 9, Article 1; the city adopted the 2025 Title 24 edition for effect January 1, 2026",
    energy: "2022 California Energy Code (Title 24, Part 6) for California Climate Zone 3, plus Hayward's local Reach Code and Green Building Ordinance requirements",
    amendments:
      "Hayward layers two local energy ordinances on top of Title 24: the Reach Code, adopted in 2020, prohibits natural gas in newly constructed homes and expands CALGreen EV-charging infrastructure requirements, and the Private Development Green Building Ordinance requires GreenPoint Rated certification for new residential construction and requires new commercial buildings to beat Title 24 energy standards by 15 percent before a Certificate of Occupancy issues. The city's published design criteria set Seismic Design Category D, E, or F per ASCE 7, a 110 mph basic wind speed, no snow load, and a 1.5 inch/hour rainfall rate, and its amended fire code requires automatic sprinklers in new construction of 5,000 square feet or more, over two stories, or with ceilings above 15 feet.",
  },
  utilities: {
    electric: "Ava Community Energy (formerly East Bay Community Energy) is the default electricity generation provider in Hayward, delivered over Pacific Gas and Electric (PG&E) transmission and distribution; PG&E also provides natural gas service",
    notes:
      "Commercial electric coordination in Hayward is two-layered: Ava Community Energy supplies generation by default (customers may opt out to PG&E), while PG&E owns the wires, meters, service connections, and interconnection process and issues the single combined bill. Water and sewer are City of Hayward services — the city buys water from the San Francisco Hetch Hetchy Regional Water System — with East Bay Municipal Utility District serving some addresses and Oro Loma Sanitary District covering sewer in portions of the city, so water and sewer providers should be confirmed by address.",
  },
  climateNotes:
    "East Bay marine-influenced climate (California Climate Zone 3; ASHRAE 3C, warm-marine): mild temperatures, minimal cooling and heating extremes, and no snow load. The dominant design driver is seismic — Hayward sits directly on the Hayward Fault with published Seismic Design Categories D through F — alongside a 110 mph basic wind speed.",
  marketNotes:
    "Hayward is the East Bay's industrial workhorse: a large stock of warehouse, manufacturing, and food-production buildings along the I-880 corridor, Gillig's bus manufacturing plant, and a growing biotech and advanced-manufacturing presence, with downtown and South Hayward BART-area redevelopment adding multifamily and mixed-use work. Commercial projects concentrate in industrial re-tenanting and expansion, cold storage and food facilities, and transit-oriented development, all priced below Oakland and Fremont alternatives across Alameda County.",
  narratives: {
    mep:
      "MEP design in Hayward must satisfy two energy layers at once: the 2022 Title 24 Part 6 code for Climate Zone 3 and the city's own Reach Code and Green Building Ordinance, which require new commercial buildings to beat Title 24 by 15 percent and expand EV-charging infrastructure beyond CALGreen. Electric service is Ava Community Energy generation delivered over PG&E wires, so interconnection runs through PG&E while supply defaults to Ava. The Building Division's concurrent plan check means the complete MEP set is reviewed by all departments simultaneously.",
    structural:
      "Structural design in Hayward is seismic design: the Hayward Fault runs through the city, the Building Division publishes Seismic Design Category D, E, or F per ASCE 7, and Hayward's local CBC amendments include technical changes made specifically for its seismic zone. Wind is set at 110 mph basic speed with no snow load, and Bay-margin soft soils on the western industrial flats make liquefaction evaluation a standard geotechnical item.",
    civil:
      "Civil design in Hayward works with city water and sewer as the default — Hayward's water comes from the Hetch Hetchy system — but EBMUD water and Oro Loma Sanitary District sewer serve portions of the city, so providers are confirmed by address before connection design. Stormwater design uses the city's published 1.5 inch/hour rainfall rate, grading must respect fault-zone and soft-soil conditions on the Bay flats, and concurrent plan check routes civil drawings to Public Works at the same time as the building set.",
    energy:
      "Energy compliance in Hayward is the most layered in this set: the 2022 California Energy Code (Title 24, Part 6, Climate Zone 3) is the floor, the Reach Code pushes new construction toward all-electric design and expanded EV charging, and the Green Building Ordinance requires new commercial buildings to exceed Title 24 by 15 percent before occupancy. The 2025 Title 24 edition takes effect January 1, 2026 under the city's adoption, so filing date and the local reach requirements both belong in the compliance plan from day one.",
  },
  faqs: [
    {
      q: "What extra energy rules does Hayward impose beyond Title 24?",
      a: "Two: the Reach Code prohibits natural gas in new homes and expands EV-charging requirements, and the Green Building Ordinance requires new commercial buildings to beat Title 24 energy standards by 15 percent (and GreenPoint Rated certification for new residential) before a Certificate of Occupancy issues.",
    },
    {
      q: "Who provides electric service in Hayward, CA?",
      a: "Ava Community Energy is the default generation provider, delivered over PG&E's transmission and distribution system; PG&E handles connections, interconnection, metering, and billing, and also provides natural gas. Water and sewer are primarily City of Hayward services using Hetch Hetchy water.",
    },
    {
      q: "How does plan check work in Hayward?",
      a: "Concurrently: the Building Division distributes the submitted set to all reviewing departments at the same time and collects their comments. Most minor permits issue over the counter within 24 hours, and permits issue only to owners or licensed contractors holding a City of Hayward business license.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 53, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://haywarddev.prod.acquia-sites.com/sites/default/files/documents/000-Current-Codes-Permit-Process-211007.pdf"],
      codes: ["https://hayward.legistar1.com/hayward/attachments/9660550e-550c-47b8-aab4-156958a724b6.pdf"],
      amendments: ["https://cityrulelookup.com/blog/building-safety-rules-in-hayward-ca"],
      utilities: ["https://avaenergy.org/wp-content/uploads/2026/05/C4.-CAC-Orientation-2026-Final.pdf"],
      climate: ["https://haywarddev.prod.acquia-sites.com/sites/default/files/documents/000-Current-Codes-Permit-Process-211007.pdf"],
      market: ["https://factrail.ai/organizations/hayward-california"],
    },
  },
};
