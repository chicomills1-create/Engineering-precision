import type { CityData } from "../types";

export const lancaster: CityData = {
  slug: "lancaster",
  name: "Lancaster",
  stateSlug: "california",
  county: "Los Angeles County",
  ahj: {
    office: "City of Lancaster Building & Safety Division, Development Services",
    process:
      "Lancaster's Building & Safety Division at 44933 Fern Avenue issues permits and plan-checks all building plans for code compliance, routing approved plans internally to Community Development and the Utility Services Division. Most permit requests, fee payments, and inspections run online through the Accela Citizen Access (ACA) Portal — including all residential, solar, water-heater, MEP, and sign permits — while combination commercial permits (new buildings, additions, tenant improvements) still start with the standard Building & Safety Permit Application before being made available in ACA for status tracking and document upload. Plan check engineers issue a correction list after initial review, and applicants must make a separate submittal to the Los Angeles County Fire Department (661-949-6319) for the codes it enforces — a parallel county track outside the city portal.",
  },
  codes: {
    building: "2025 California Building Code as amended and adopted as the Lancaster Codes for Buildings and Construction (Ordinance No. 1139, effective January 1, 2026); previously the 2022 California codes under Ordinance No. 1094",
    energy: "2025 California Energy Code (Title 24, Part 6), California climate zone 14, as amended by Ordinance No. 1139",
    amendments:
      "Ordinance No. 1139 (adopted October 28, 2025) repealed Ordinance 1094 and rewrote Title 15 of the Lancaster Municipal Code, adopting the 2025 California Building, Residential, Electrical, Mechanical, Plumbing, Energy, Historical, Fire, Green Building Standards, Existing Building, and Referenced Standards codes with Lancaster amendments — while maintaining the 2026 Los Angeles County Fire Code for fire enforcement. The city's published structural criteria are Antelope Valley-specific: wind Exposure C at 95 mph for Risk Category II (90/100/105 mph for Categories I/III/IV), non-reducible 20 psf roof live load, 3 inches-per-hour rainfall intensity, and Seismic Design Category D.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) owns distribution and delivers electricity; Lancaster Energy (the city's community choice aggregator, formerly Lancaster Choice Energy) is the default generation provider",
    notes:
      "Lancaster pioneered municipal energy choice in California: Lancaster Energy supplies default generation while SCE maintains the wires, meters, and service connections, so new commercial services are engineered with SCE and billed generation through the city program unless the customer opts out. Water service splits by address between Los Angeles County Waterworks District 40 and the Quartz Hill Water District, and natural gas comes from Southern California Gas Company — the serving water district must be confirmed by address, as it changes sewer and water coordination on site work.",
  },
  climateNotes:
    "California Energy Commission climate zone 14 and ASHRAE zone 4B in the high-desert Antelope Valley: triple-digit summer heat, freezing winter nights, extreme diurnal swings, persistent wind (city criteria set Exposure C at 95 mph for Risk Category II), Seismic Design Category D, and some of California's strongest solar resource — the design problem is simultaneous heat, cold, wind, and seismic demand.",
  marketNotes:
    "Lancaster's market rides the Antelope Valley aerospace economy: Edwards Air Force Base and NASA Armstrong to the northeast and Air Force Plant 42 in neighboring Palmdale (Northrop Grumman, Lockheed Martin Skunk Works) drive defense-contractor and supplier demand, BYD operates its electric bus manufacturing plant in Lancaster, Antelope Valley Hospital anchors healthcare, and utility-scale solar development across the desert adds industrial and energy construction. Commercial work concentrates in aerospace support, logistics along the SR-14 corridor, healthcare, retail on Lancaster Boulevard, and renewable-energy facilities.",
  narratives: {
    mep:
      "MEP design in Lancaster is documented to the 2025 Title 24 package under Ordinance 1139, plan-checked by city engineers with a formal correction-list cycle, and split at the meter: SCE engineers the service connection while Lancaster Energy supplies default generation. High-desert climate zone 14 loads — 100°F-plus afternoons and freezing nights — size equipment for both extremes, and the separate Los Angeles County Fire Department submittal for fire systems must be sequenced in parallel with the city ACA track, not after it.",
    structural:
      "Lancaster structural design is governed by the city's published Antelope Valley criteria under the 2025 CBC: Seismic Design Category D near the San Andreas fault, wind Exposure C at 95 mph ultimate for Risk Category II, non-reducible 20 psf roof live load, and 3 in/hr rainfall intensity for drainage design. Desert soils, large diurnal thermal movement, and the region's tilt-up logistics and aerospace industrial stock make lateral design and roof drainage the recurring review items.",
    civil:
      "Civil design in Lancaster starts with the water-district question — LA County Waterworks District 40 or Quartz Hill Water District, by address — layered over desert hydrology: Amargosa Creek and ephemeral washes, intense short-duration storms against the city's 3 in/hr design intensity, and grading that must manage wind-blown sand and dust control. Utility Services Division routing inside the city review, frontage work on wide desert arterials, and solar-field civil packages are the common scopes.",
    energy:
      "Energy compliance in Lancaster follows the 2025 California Energy Code (Title 24, Part 6) in CEC climate zone 14, where the margin is decided by cooling efficiency, envelope performance under extreme diurnal swing, and — uniquely — the generation side: Lancaster Energy's default supply and the Antelope Valley's exceptional solar resource make on-site PV and storage economics a first-order design decision for commercial projects, not an add-on.",
  },
  faqs: [
    {
      q: "What building code does Lancaster, CA enforce?",
      a: "Effective January 1, 2026, Lancaster enforces the 2025 California codes as amended by Ordinance No. 1139 (the Lancaster Codes for Buildings and Construction), replacing the 2022 codes under Ordinance 1094. City design criteria include climate zone 14, Seismic Design Category D, and Exposure C wind at 95 mph for Risk Category II.",
    },
    {
      q: "How do commercial permits work in Lancaster?",
      a: "Most permits run through the Accela Citizen Access Portal, but combination commercial permits (new buildings, additions, tenant improvements) start with the standard Building & Safety Permit Application and are then tracked in ACA. Fire code review requires a separate submittal to the Los Angeles County Fire Department.",
    },
    {
      q: "Who provides electric and water service in Lancaster, CA?",
      a: "SCE delivers electricity and Lancaster Energy (the city's community choice aggregator) provides default generation. Water is provided by Los Angeles County Waterworks District 40 or the Quartz Hill Water District depending on the address, and natural gas by Southern California Gas Company.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 57, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityoflancasterca.org/our-city/departments-services/development-services/city-engineering/building-and-safety"],
      codes: ["https://www.cityoflancasterca.org/home/showpublisheddocument/47029/639015646551370000"],
      amendments: ["https://www.cityoflancasterca.org/our-city/departments-services/development-services/city-engineering/building-and-safety/plan-check"],
      utilities: ["https://www.cityoflancasterca.org/our-city/departments-services/development-services/city-engineering/building-and-safety"],
      climate: ["https://www.weather.gov/lox/"],
      market: ["https://www.cityoflancasterca.org/our-city/departments-services/development-services/city-engineering/building-and-safety/plan-check"],
    },
  },
};
