import type { CityData } from "../types";

export const highPoint: CityData = {
  slug: "high-point",
  name: "High Point",
  stateSlug: "north-carolina",
  county: "Guilford County",
  ahj: {
    office: "City of High Point Inspections Division, Development Services Center (211 S. Hamilton Street)",
    process:
      "High Point's Inspections Division issues the building permit everywhere inside the corporate limits — notably, the city spans four counties (Guilford, Davidson, Forsyth, and Randolph), and the city permit, not a county permit, governs in all four. Permits are submitted online through Accela Citizen Access to the Development Services Center, and plan review checks structural, electrical, plumbing, mechanical, energy, and accessibility compliance, with major projects also routed to engineering, public services, and transportation review. Most projects need only one combined permit, a separate zoning permit covers work outside the State Building Code's scope, and under state law a construction permit expires six months after issuance if work has not actually commenced.",
  },
  codes: {
    building: "2018 North Carolina State Building Code: Building Code (based on the 2015 International Building Code with North Carolina amendments) — the statewide code administered by the NC Building Code Council",
    energy: "2018 North Carolina Energy Conservation Code (based on the 2015 IECC with North Carolina amendments)",
    amendments:
      "North Carolina law (G.S. 143-138(e)) makes the State Building Code uniform statewide and denies cities any general local amendment power — High Point may adopt only its own fire prevention code and floodplain regulations. The local layer is therefore administrative and geographic: the city's Development Ordinance and zoning permits, its floodplain ordinance, and the four-county footprint, which changes the register of deeds, the health department, and even the IECC climate zone at the margins (Guilford and Forsyth are zone 4A; the Davidson and Randolph slivers are 3A) without changing the code itself.",
  },
  utilities: {
    electric: "City of High Point Electric Utilities Department — the city-owned municipal electric utility (founded 1893, roughly 44,000 customers); Duke Energy Carolinas serves areas outside the city system",
    notes:
      "High Point is one of North Carolina's public-power cities: its own Electric Utilities Department — about 700 miles of circuits and 14 substations — delivers electricity to most of the city, so new commercial services, capacity, and interconnection run through the city utility, which also runs local energy-efficiency rebate programs; Duke Energy Carolinas serves only pockets outside the city system. Water and sewer are also City of High Point utilities, so a single city customer-service line (336-883-3111) handles electric, water, and sewer accounts and 24-hour utility emergencies — utility coordination for a High Point project is almost entirely a city-hall exercise.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 4A (mixed-humid) in the North Carolina Piedmont (the small Davidson and Randolph County portions of the city fall in zone 3A): hot humid summers, mild winters with a shallow 12-inch frost line, a 20 psf roof live load standard, and a 115 mph ultimate design wind speed applied across all four counties. Piedmont clay soils in the western part of the city contrast with sandier soils to the east, and termite protection is required statewide with no exemption.",
  marketNotes:
    "High Point is the furniture capital of the world: the High Point Market — the largest home-furnishings trade show anywhere — fills over 11 million square feet of showroom space downtown twice a year and drives a permanent economy of showroom build-outs, warehouse and logistics space, and hospitality work. Thomas Built Buses, one of North America's largest school-bus manufacturers, is headquartered and builds in High Point, High Point University is a fast-growing private university reshaping its surrounding corridors, and Guilford Technical Community College and the regional medical sector add steady institutional work.",
  narratives: {
    mep:
      "MEP design in High Point is documented to the 2018 North Carolina code family — the state building, mechanical, plumbing, and fuel gas codes with NC amendments, and the state electrical code — a full generation behind the current I-codes, so details carried from other states need re-verification. The distinctive local fact is the utility: the city's own Electric Utilities Department sets service capacity and runs interconnection, and water and sewer are city utilities too, so MEP coordination happens almost entirely inside city government. Showroom and warehouse work for the furniture market dominates the load profiles — high-bay lighting, seasonal showroom conditioning, and large dock and logistics loads.",
    structural:
      "High Point structural design follows the 2018 NC Building Code: a 115 mph ultimate design wind speed uniform across the city's four counties, a 20 psf roof live load, and modest seismic demand, with the 12-inch frost line keeping foundation depths shallow by northern standards. Soil conditions split the city — Piedmont clays to the west, sandier and more stable soils to the east — so foundation design follows the site investigation rather than a citywide presumption. The existing stock of downtown showroom buildings, much of it converted industrial space, generates steady existing-building and change-of-occupancy structural work.",
    civil:
      "Civil design in High Point must first fix the county: the city crosses Guilford, Davidson, Forsyth, and Randolph counties, and while the city issues the building permit in all four, the county line still decides the register of deeds, the health department for septic, and at the margins the climate zone. Inside the city, the Development Ordinance governs site, subdivision, and zoning permits, drainage runs toward the Deep River and its tributaries, and city water and sewer extensions are reviewed by the same municipal government that issues the permit.",
    energy:
      "Energy compliance in High Point is documented to the 2018 North Carolina Energy Conservation Code — the state's own code, based on the 2015 IECC with North Carolina amendments — for a city that sits in climate zone 4A in its Guilford County majority. The compliance margin is balanced between cooling and heating seasons, and the city's municipal electric utility layers its own commercial efficiency rebates on top of code, which matters most on the showroom and warehouse stock where lighting and high-bay conditioning dominate the energy budget.",
  },
  faqs: [
    {
      q: "What building code does High Point, NC enforce?",
      a: "The North Carolina State Building Code — principally the 2018 NC Building Code (based on the 2015 IBC with state amendments) and the 2018 NC Energy Conservation Code. The code is uniform statewide by law; High Point cannot amend it locally beyond a fire prevention code and floodplain regulations.",
    },
    {
      q: "Who provides electric service in High Point?",
      a: "The City of High Point's own Electric Utilities Department — a municipal utility founded in 1893 with about 700 miles of circuits serving roughly 44,000 customers. Duke Energy Carolinas serves only areas outside the city system. Water and sewer are also city utilities, and one city line (336-883-3111) handles all three.",
    },
    {
      q: "High Point spans four counties — whose permit do I need?",
      a: "The city's. Inside the corporate limits, the City of High Point Inspections Division issues the building permit in Guilford, Davidson, Forsyth, and Randolph counties alike, through the Development Services Center's Accela portal. The county line still matters for deeds, septic permitting, and climate zone at the margins, but not for the building permit itself.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.buildhighpoint.com/2978/Permits-Required"],
      codes: ["https://northcarolinabarndominiumpros.com/areas/high-point/"],
      amendments: ["https://northcarolinabarndominiumpros.com/areas/high-point/"],
      utilities: ["https://highpointtoday.com/power-outages/"],
      climate: ["https://northcarolinabarndominiumpros.com/areas/high-point/"],
      market: ["https://www.buildhighpoint.com/2978/Permits-Required"],
    },
  },
};
