import type { CityData } from "../types";

export const winstonSalem: CityData = {
  slug: "winston-salem",
  name: "Winston-Salem",
  stateSlug: "north-carolina",
  county: "Forsyth County",
  ahj: {
    office: "City of Winston-Salem Inspections Division (Winston-Salem / Forsyth County inspections services)",
    process:
      "Building and trade permits inside Winston-Salem run through the city's Inspections Division under the North Carolina State Building Code, with plan review and field inspections handled locally and permit applications filed through the city's online services. North Carolina is unusual in that the state code is developed by the NC Building Code Council on its own cycle, and licensed-design-professional seals are required on commercial drawings under state law — reviewers verify the NC-licensed engineer or architect of record as part of intake.",
  },
  codes: {
    building: "North Carolina State Building Code (NC Building Code — IBC-derived with extensive North Carolina amendments, administered by the NC Building Code Council)",
    energy: "North Carolina Energy Conservation Code (the energy chapter of the NC State Building Code, IECC-derived with North Carolina amendments)",
    amendments:
      "North Carolina does not adopt an I-code year wholesale: the Building Code Council writes a state code with extensive NC amendments, and local governments may not amend it. Winston-Salem's local layer is its unified development ordinances and the Inspections Division's process — plus the practical reality that Duke Energy Carolinas interconnection approval (Permission to Operate for distributed generation) runs on a separate track from city permits and gates energization.",
  },
  utilities: {
    electric: "Duke Energy Carolinas serves Winston-Salem and Forsyth County",
    notes:
      "Duke Energy Carolinas — one of Duke's two North Carolina operating companies — runs new-service construction and all distributed-generation interconnection in Winston-Salem; its legacy full-retail net metering closed to new solar customers in 2023, so PV and storage designs are documented to Duke's current net-metering successor tariffs and interconnection standards. Piedmont Natural Gas (a Duke Energy company) provides gas service, keeping both fuel coordinations inside one utility family.",
  },
  climateNotes:
    "ASHRAE climate zone 4A (mixed-humid) in the western Piedmont foothills: four-season weather with hot humid summers, cold snaps and ice storms in winter, and severe-thunderstorm and remnant-hurricane rainfall events. Snow loads are modest but ice accretion on structures and rooftop equipment is a recurring design case.",
  marketNotes:
    "Winston-Salem's construction market is anchored by healthcare — Atrium Health Wake Forest Baptist and Novant Health Forsyth Medical Center — Wake Forest University, and the downtown Innovation Quarter biotech district built into former R.J. Reynolds tobacco plants. Hanesbrands and the legacy textile/tobacco industrial stock drive adaptive reuse, while logistics growth follows the I-40 and US-52 corridors.",
  narratives: {
    mep:
      "MEP design in Winston-Salem is documented to the North Carolina State Building Code and NC Energy Conservation Code — state-written codes that differ from the base I-codes in ways a national template misses. Duke Energy Carolinas service and interconnection rules shape the electrical scope, including current net-metering successor tariffs for rooftop solar, and Piedmont Natural Gas coordination covers the gas scope, so both utilities sit inside one corporate family but run separate processes.",
    structural:
      "Structural design in Winston-Salem follows the NC Building Code's IBC-derived provisions with North Carolina amendments, low seismic demand, and Piedmont wind and ice considerations. The signature local work is adaptive reuse: early-1900s tobacco and textile industrial buildings downtown carry heavy-timber and masonry structures whose evaluation and reinforcement follow the NC Existing Building Code provisions.",
    civil:
      "Civil design in Winston-Salem works through the city's unified development ordinances, with stormwater and erosion control enforced in a foothills watershed draining to the Yadkin River system. Rolling Piedmont topography makes grading and retaining design routine, and Innovation Quarter and hospital-campus expansions add utility-capacity coordination with the city-county utility commission to the standard site package.",
    energy:
      "Energy compliance in Winston-Salem is documented to the North Carolina Energy Conservation Code, whose commercial provisions are IECC-derived but state-amended — compliance runs are made against the NC edition, not a generic IECC. Duke Energy Carolinas incentive and demand-response programs support beyond-code measures for the healthcare and university loads that anchor the market.",
  },
  faqs: [
    {
      q: "Who provides electric service in Winston-Salem?",
      a: "Duke Energy Carolinas serves Winston-Salem and Forsyth County, including new-service construction and solar interconnection. Gas service is Piedmont Natural Gas, also a Duke Energy company.",
    },
    {
      q: "Is North Carolina's building code just the IBC?",
      a: "No. The NC Building Code Council develops the North Carolina State Building Code on its own cycle — IBC-derived but with extensive state amendments — and local governments cannot amend it. Compliance documentation must target the NC edition.",
    },
    {
      q: "What changed for rooftop solar interconnection in Winston-Salem?",
      a: "Duke Energy Carolinas closed its legacy 1:1 retail net metering to new residential solar customers in 2023. New systems interconnect under Duke's successor tariffs and still need Duke's Permission to Operate after city permits and inspection.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 68, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofws.org"],
      codes: ["https://www.ncosfm.gov"],
      amendments: ["https://www.cityofws.org"],
      utilities: ["https://www.duke-energy.com"],
      climate: ["https://www.weather.gov/rah/"],
      market: ["https://www.cityofws.org"],
    },
  },
};
