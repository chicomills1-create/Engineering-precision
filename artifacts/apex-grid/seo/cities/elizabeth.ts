import type { CityData } from "../types";

export const elizabeth: CityData = {
  slug: "elizabeth",
  name: "Elizabeth",
  stateSlug: "new-jersey",
  county: "Union County",
  ahj: {
    office: "City of Elizabeth Bureau of Construction (Room 401, City Hall, 50 Winfield Scott Plaza)",
    process:
      "Elizabeth's Bureau of Construction is the local enforcing agency for the New Jersey Uniform Construction Code: the Construction Official and the building, electrical, plumbing, and fire subcode officials each review their sections of the state UCC permit jacket. A zoning permit under Chapter 17.08 of the city's Land Development Code comes first, before the construction permit is filed. Application and subcode technical-section forms are city PDFs, inspection requests run online through GovPilot, and New Jersey's UCC gives the agency a 20-business-day plan-review clock once an application is complete.",
  },
  codes: {
    building: "International Building Code/2024, New Jersey edition (Building Subcode, N.J.A.C. 5:23-3.14), adopted August 17, 2026 with a six-month grace period ending February 17, 2027 during which the prior 2021-based subcodes may still be used",
    energy: "New Jersey Energy Subcode (N.J.A.C. 5:23-3.18): ASHRAE 90.1-2022 for commercial buildings; International Energy Conservation Code/2024 for low-rise residential",
    amendments:
      "New Jersey law does not allow municipalities to amend the technical subcodes — the UCC is uniform statewide — so Elizabeth's local layer is procedural: the zoning permit required by Land Development Code Chapter 17.08, the municipal fee schedule in Chapter 17.52, floodplain review for the city's extensive Arthur Kill and Elizabeth River flood zones, and annual rent-control registration for multiple dwellings through the Bureau of Rent Control.",
  },
  utilities: {
    electric: "PSE&G (Public Service Electric and Gas) — electric delivery and supply",
    notes:
      "PSE&G delivers electricity in Elizabeth, while natural gas territory is split between Elizabethtown Gas and PSE&G — confirm the gas provider by address before designing the service. New or upgraded commercial electric service is engineered with PSE&G, and New Jersey's retail-choice market lets owners shop supply while PSE&G keeps the wires. Water is supplied through the City of Elizabeth's water system drawing on New Jersey American Water sources, and sewer service is municipal, so tap and capacity questions run through city hall rather than a regional authority.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 4A (mixed-humid) on the Newark Bay waterfront: cold winters with a 36-inch frost depth, hot humid summers, and nor'easter and hurricane-driven coastal flooding — much of the port and eastern Elizabeth sits in mapped flood zones, so flood elevation and freeboard drive foundation and first-floor design.",
  marketNotes:
    "Elizabeth is New Jersey's fourth-largest city and a freight city first: the Elizabeth-Port Authority Marine Terminal (Maher Terminals and APM Terminals) is among the busiest container terminals on the East Coast, part of Newark Liberty International Airport lies inside city limits, and logistics and transportation employ roughly 13% of residents. Trinitas Regional Medical Center is the largest single employer, The Mills at Jersey Gardens anchors retail, and transit-oriented multifamily is building out around the Midtown NJ Transit station on the Northeast Corridor.",
  narratives: {
    mep:
      "MEP design in Elizabeth is documented to the New Jersey UCC subcodes — the 2024 IBC New Jersey edition for building work, the 2023 NEC for electrical, and ASHRAE 90.1-2022 for commercial energy compliance. Electric service is PSE&G territory, but gas service splits between Elizabethtown Gas and PSE&G by address, so the service design starts with a territory check. Each subcode official reviews their own technical section of the permit jacket, which means coordinated, discipline-complete submittals matter more than in single-reviewer cities.",
    structural:
      "Structural design in Elizabeth works under the 2024 IBC New Jersey edition with a 36-inch frost depth, ASCE 7 wind exposure shaped by the Newark Bay waterfront, and flood-zone construction requirements across the port-side and Elizabeth River districts — elevated first floors, flood vents, and breakaway or flood-resistant detailing where the map requires them. The Rehabilitation Subcode (N.J.A.C. 5:23-6) governs the city's large stock of older industrial and multifamily buildings and rewards teams that classify the work category correctly at filing.",
    civil:
      "Civil work in Elizabeth is dominated by flat, low waterfront land: stormwater, grading, and floodplain compliance tie into systems draining to the Elizabeth River and Arthur Kill, and the zoning permit under Land Development Code Chapter 17.08 must clear before construction permitting starts. Port, warehouse, and intermodal sites add heavy truck pavement sections and Port Authority coordination near the marine terminal, while infill multifamily near the Midtown station works on tight urban lots with established city water and sewer.",
    energy:
      "Commercial energy compliance in Elizabeth runs through the New Jersey Energy Subcode: ASHRAE 90.1-2022 is the commercial path (IECC/2024 covers low-rise residential). In zone 4A the margin is decided by envelope performance through humid summers and real winters, plus ventilation control in warehouse and logistics buildings with high air-change loads. PSE&G's New Jersey energy-efficiency programs add a utility incentive layer for qualifying commercial retrofits and equipment upgrades.",
  },
  faqs: [
    {
      q: "What building code does Elizabeth, NJ enforce?",
      a: "The New Jersey Uniform Construction Code, enforced locally by the Bureau of Construction. The current Building Subcode is the International Building Code/2024, New Jersey edition, adopted August 17, 2026; a grace period through February 17, 2027 allows use of the prior 2021-based subcodes.",
    },
    {
      q: "Who provides electric and gas service in Elizabeth?",
      a: "PSE&G provides electric service. Natural gas territory is split between Elizabethtown Gas and PSE&G depending on the address, so verify the gas provider for the specific site before finalizing service design.",
    },
    {
      q: "What local approval is needed before a construction permit in Elizabeth?",
      a: "A zoning permit under Chapter 17.08 of the Elizabeth Land Development Code must be in hand first. The technical codes themselves are the state's uniform UCC — Elizabeth cannot amend them locally — but the city controls zoning sign-off, its fee schedule, and floodplain review.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 50, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://elizabethnj.org/194/Construction"],
      codes: ["https://www.nj.gov/dca/codes/codreg/current.shtml"],
      amendments: ["https://alliancepermitting.com/guides/new-jersey/elizabeth-building-permit"],
      utilities: ["https://www.nj.gov/bpu/assistance/utility/"],
      climate: ["https://www.weather.gov/phi/"],
      market: ["https://beta.eda.gov/sites/default/files/2022-09/The_Greater_Newark_Smart_Port_Regional.pdf"],
    },
  },
};
