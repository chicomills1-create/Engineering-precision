import type { CityData } from "../types";

export const akron: CityData = {
  slug: "akron",
  name: "Akron",
  stateSlug: "ohio",
  county: "Summit County",
  ahj: {
    office: "City of Akron Engineering Bureau, Plans and Permits — building permits issued by the Summit County Division of Building Standards",
    process:
      "Akron runs a split review that out-of-town teams routinely misread: plans are submitted to the City through its online Plan Review and Permit Portal in PDF format — one city submittal covers zoning, fire review, site plan, drainage, utilities, and right-of-way work, with city reviewers allowed approximately 14 business days — while the Summit County Division of Building Standards performs the building-code review (structure, mechanical, electrical, plumbing, and life safety) and issues the actual permit. Submit to both at once: the reviews run concurrently, but the County cannot issue until it receives the City's approval. The County targets about 14 calendar days for a first review (recently running closer to 20) and 7 days or less on resubmittals. All contractors, regardless of trade, must register with the City through the portal before permitted work.",
  },
  codes: {
    building: "2024 Ohio Building Code (based on the 2021 International Building Code with Ohio amendments, effective March 1, 2024)",
    energy: "2024 Ohio Building Code Chapter 13 — commercial energy compliance via the 2021 IECC or ASHRAE 90.1-2019, each with Ohio modifications",
    amendments:
      "Ohio's codes are adopted statewide by the Board of Building Standards, so Akron's local layer is procedural rather than technical: the City layers its own zoning, fire, site, and utility review on top of the County's code review, and since June 1, 2024 all contractor registration runs through the City's Plan Review and Permit Portal. Plans must be prepared by an Ohio-licensed design professional — the most common kickback the County reports is a set that is not.",
  },
  utilities: {
    electric: "Ohio Edison, a FirstEnergy company",
    notes:
      "Ohio Edison (FirstEnergy) is the distribution utility for Akron — fittingly, FirstEnergy is also headquartered in the city — and Ohio's deregulated market lets commercial customers choose a competitive generation supplier while Ohio Edison keeps delivery. New services and capacity work coordinate through FirstEnergy's service process. Water and sewer are City of Akron utilities, so tap, capacity, and site-utility approvals sit inside the same city review as zoning and drainage rather than with a separate district.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) in Northeast Ohio: lake-effect snow off Lake Erie, design frost depth around 32–36 inches with local practice running footings deeper against glacial-clay heave, and freeze-thaw cycling that punishes envelope and pavement details. Heating dominates the energy balance; snow load and winter construction conditions shape schedules.",
  marketNotes:
    "Akron is the former Rubber Capital still anchored by Goodyear's global headquarters and a nationally known polymer and advanced-materials cluster fed by the University of Akron. Healthcare is the largest employment block — Summa Health, Akron Children's Hospital, and Cleveland Clinic Akron General — alongside FirstEnergy's headquarters, Amazon's large Summit County footprint, and Akron Public Schools. Commercial work concentrates in hospital and campus expansion, industrial and polymer-plant reinvestment, and downtown and corridor redevelopment.",
  narratives: {
    mep:
      "MEP design in Akron is documented to the 2024 Ohio codes — the 2021 I-codes with Ohio amendments, the 2023 NEC, and energy compliance through OBC Chapter 13 via the 2021 IECC or ASHRAE 90.1-2019. The review path is the local lesson: the City of Akron reviews fire, site, and utility connections while Summit County Building Standards reviews the building and trade systems and issues the permit, and the two run concurrently only if the team files both at once. Electric service is Ohio Edison (FirstEnergy) distribution with competitive supply choice, and every trade contractor must be city-registered before work starts.",
    structural:
      "Structural design in Akron works against zone 5A winter: lake-effect snow loads, a frost depth in the 32–36-inch range with local practice pushing footings deeper, and glacial clays that move with moisture and freeze-thaw. The 2024 Ohio Building Code (2021 IBC basis) governs, seismic demand is low, and the city's stock of older industrial and masonry buildings makes existing-building evaluation and envelope freeze protection recurring parts of the work.",
    civil:
      "Civil design in Akron is reviewed by the City itself — drainage, utilities, and right-of-way work are inside the City's single Plans and Permits submittal even though the building permit issues from Summit County. Sites drain toward the Cuyahoga and Little Cuyahoga river systems, snowmelt and freeze-thaw drive storm and pavement design, and city water and sewer connections are coordinated through the same municipal review.",
    energy:
      "Energy compliance in Akron runs through Chapter 13 of the 2024 Ohio Building Code: the design team elects either the 2021 IECC or ASHRAE 90.1-2019, each as modified by Ohio. In zone 5A the compliance margin is set by heating-season envelope performance, air sealing against winter infiltration, and economizer and control strategies that still respect freeze protection — a different optimization than the cooling-led designs used across most of the Sun Belt.",
  },
  faqs: [
    {
      q: "Who issues building permits in Akron, OH?",
      a: "It is a two-office process. The City of Akron's Plans and Permits office reviews zoning, fire, site, drainage, and utilities through its online portal, while the Summit County Division of Building Standards performs the building-code review and issues the permit. File with both concurrently — the County cannot issue until the City approves.",
    },
    {
      q: "What building code does Akron enforce?",
      a: "The 2024 Ohio Building Code, based on the 2021 International Building Code with Ohio amendments and effective March 1, 2024, with the 2024 Ohio Mechanical and Plumbing Codes and the 2023 NEC. Commercial energy compliance runs through OBC Chapter 13 using the 2021 IECC or ASHRAE 90.1-2019.",
    },
    {
      q: "Who provides electric, water, and sewer service in Akron?",
      a: "Ohio Edison, a FirstEnergy company, delivers electricity (customers may choose a competitive generation supplier). Water and sewer are City of Akron utilities, coordinated through the City's own review process.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 60, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.developmentfinanceauthority.org/planning-permitting-101/"],
      codes: ["https://www.iccsafe.org/ohio/"],
      amendments: ["https://www.iccsafe.org/ohio/"],
      utilities: ["https://www.firstenergycorp.com/newsroom/news_articles/firstenergy-s-ohio-utilities-welcome-new-line-and-substation-gra.html"],
      climate: ["https://www.greenecountyohio.gov/141/Current-Building-Codes"],
      market: ["https://beta.bebop.ai/markets/companies-in-akron"],
    },
  },
};
