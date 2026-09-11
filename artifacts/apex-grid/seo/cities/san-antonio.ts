import type { CityData } from "../types";

export const sanAntonio: CityData = {
  slug: "san-antonio",
  name: "San Antonio",
  stateSlug: "texas",
  county: "Bexar County",
  ahj: {
    office: "City of San Antonio Development Services Department (DSD)",
    process:
      "Commercial permits are submitted and tracked through the BuildSA online portal, where professionals link their licenses and upload plan sets for electronic review. DSD publishes information bulletins (such as the commercial energy submittal bulletin) that define required documentation, and once inspections are approved DSD notifies CPS Energy to release utilities to the site.",
  },
  codes: {
    building: "2024 IBC, adopted as part of City Code Chapter 10 (Building-Related Codes) with San Antonio amendments, effective May 1, 2025",
    energy: "2024 IECC with San Antonio amendments (City Code Chapter 10), effective May 1, 2025",
    amendments:
      "San Antonio prioritizes staying on the most current ICC editions and adopted the full 2024 code family (IBC/IECC and companion codes) by Ord. No. 2025-01-30-0075. Separate from the building code, development over the Edwards Aquifer recharge and contributing zones triggers Aquifer Protection and TCEQ water-quality requirements that shape site design on the city's north side.",
  },
  utilities: {
    electric: "CPS Energy, the municipally owned utility serving San Antonio and much of Bexar County (the nation's largest municipally owned electric and gas utility), so service, rates, interconnection, and demand charges all run through CPS Energy",
    notes:
      "Because CPS Energy is a city-owned utility, its commercial demand charges and interconnection process govern service planning; DSD coordinates the final utility release with CPS Energy after inspections. Water and wastewater are San Antonio Water System (SAWS).",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) with long, hot cooling seasons, 100°F+ design days, and Hill Country runoff along the Balcones Escarpment that drives flash-flood exposure on the north and west sides.",
  marketNotes:
    "San Antonio construction is driven by military and healthcare (Joint Base San Antonio and the South Texas Medical Center), a growing manufacturing and data-center base, tourism/hospitality downtown, and strong multifamily and industrial growth along the I-35 and US-281 corridors. Edwards Aquifer protection over the recharge zone is a defining site-development constraint for northern-sector projects.",
  narratives: {
    mep:
      "MEP design in San Antonio works to a hot-humid climate-zone-2A profile: a moderate sensible design day but significant latent load, so dehumidification, outside-air control, and tight envelopes matter alongside cooling tonnage. Under the newly adopted 2024 IBC and 2024 IECC in City Code Chapter 10, equipment schedules and energy documentation follow DSD's information bulletins and BuildSA electronic submittal requirements. Electrically, CPS Energy - the municipally owned utility - handles service, interconnection, and demand charges, so we engage it early for capacity and transformer lead times; because DSD coordinates the final utility release with CPS Energy after inspection, we align the electrical design and inspection sequence to avoid holding energization.",
    structural:
      "San Antonio structural design responds to a split geology: expansive Blackland-type clays on the south and east and shallow limestone over the Edwards formation on the north and west, so foundation type is geotechnical-report driven - drilled piers or footings to rock versus moisture-managed slabs on clay. Seismic demand is low (Seismic Design Category A-B) and inland wind speeds are moderate, so gravity loads, shrink-swell, and rooftop-equipment anchorage govern most low-rise work. Under the 2024 IBC adopted through Chapter 10, special-inspection programs and structural submittals are set up on the city's forms and tracked through the BuildSA portal.",
    civil:
      "Civil work in San Antonio is shaped by the Edwards Aquifer: development over the recharge and contributing zones triggers the city's Aquifer Protection requirements and a TCEQ Edwards Aquifer Protection Plan, adding water-quality treatment, impervious-cover management, and a separate approval track on the north side. Balcones Escarpment topography produces flashy runoff, so detention and channel design must reflect Hill Country hydrology. We design grading, detention, and water-quality to the City of San Antonio drainage criteria and coordinate SAWS water/wastewater capacity, running the site/civil and aquifer reviews in parallel with building review through BuildSA. TCEQ construction general permit coverage and a SWPPP apply to disturbances over an acre.",
    energy:
      "San Antonio enforces the 2024 IECC with local amendments under City Code Chapter 10, effective May 1, 2025, so COMcheck or ASHRAE 90.1 modeling must target that current edition - DSD's commercial energy information bulletin defines the required submittal package. In hot-humid climate zone 2A the compliance economics reward low-SHGC glazing, envelope air-sealing to limit humid-air infiltration, and right-sized high-efficiency cooling with real dehumidification, more than added roof insulation. We coordinate envelope, mechanical, and lighting compliance as one package and resolve plan-check comments through the BuildSA electronic review workflow.",
  },
  faqs: [
    {
      q: "What building and energy codes does San Antonio enforce?",
      a: "San Antonio adopted the 2024 IBC and 2024 IECC (and the companion 2024 ICC codes) as City Code Chapter 10 by Ord. No. 2025-01-30-0075, effective May 1, 2025. The city prioritizes staying current on ICC editions, so we match building and COMcheck/energy-model documentation to the 2024 edition.",
    },
    {
      q: "How do Edwards Aquifer rules affect development in San Antonio?",
      a: "Projects over the Edwards Aquifer recharge and contributing zones - largely the north and northwest - trigger the city's Aquifer Protection requirements and a TCEQ Edwards Aquifer Protection Plan, adding water-quality treatment, impervious-cover controls, and a separate review track. We plan these constraints into the site layout early and run the aquifer review in parallel with building review.",
    },
    {
      q: "Who provides electric service for a San Antonio commercial project?",
      a: "CPS Energy, the municipally owned utility (the largest of its kind in the U.S.), serves San Antonio and much of Bexar County, so rates, interconnection, and commercial demand charges all run through CPS Energy. Development Services coordinates the final utility release with CPS Energy after inspections, so we align the electrical design and inspection sequence accordingly.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 93, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.sa.gov/Directory/Departments/DSD"],
      codes: ["https://www.sa.gov/Directory/Departments/DSD/Construction-Codes"],
      amendments: ["https://www.sa.gov/Directory/Departments/DSD/Construction-Codes"],
      utilities: ["https://www.cpsenergy.com/", "https://www.saws.org/"],
      climate: ["https://www.weather.gov/ewx/"],
      market: ["https://www.sanantonio.gov/EDD"],
    },
  },
};
