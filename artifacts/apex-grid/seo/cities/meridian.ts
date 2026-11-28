import type { CityData } from "../types";

export const meridian: CityData = {
  slug: "meridian",
  name: "Meridian",
  stateSlug: "idaho",
  county: "Ada County",
  ahj: {
    office: "City of Meridian Building Services, Development Services Division of the Community Development Department (33 E. Broadway Avenue)",
    process:
      "Meridian Building Services handles structural, fire, electrical, mechanical, and plumbing permits for residential, commercial, and industrial projects — application, plan review, issuance, and field inspection — with applications filed electronically through the Accela Citizen Access Portal and plan documents managed in ProjectDox. Planning, the Meridian Fire Department, Public Works, and the Ada County Highway District (ACHD) review alongside Building Services depending on scope, and right-of-way work needs ACHD approval. Idaho Code §39-4117 now sets the clock: the city must notify a commercial applicant of any missing information within 20 business days, and the city publishes current processing expectations in its Community Development timeline spreadsheet.",
  },
  codes: {
    building: "2018 International Building Code with Idaho state and City of Meridian local amendments (Meridian City Code Title 10, Chapter 1)",
    energy: "2018 International Energy Conservation Code with Idaho amendments, as adopted at Meridian City Code §10-1-4",
    amendments:
      "Meridian's adopting ordinance for the 2018 code family rewrote MCC Title 10 with section-by-section local amendments: §10-1-2 amends the IBC, §10-1-3 the residential code, and §10-1-4 replaces the IECC amendments outright. The companion trade adoptions are the 2017 Idaho State Plumbing Code and the 2017 NEC. Development standards — zoning, site design, and application process — sit separately in the city's Unified Development Code, and grading plans for commercial work must be stamped by an Idaho-licensed engineer with a soils report attached.",
  },
  utilities: {
    electric: "Idaho Power",
    notes:
      "Idaho Power delivers electricity in Meridian, so new commercial services and capacity upgrades run through Idaho Power's service process in a fast-growing system. Water and sewer are City of Meridian utilities — Public Works operates the city's water system and wastewater treatment — so utility capacity and connection review happen inside the same city hall as the building permit. Natural gas is Intermountain Gas. Irrigation is a separate Treasure Valley system: parcels with pressurized irrigation and canal easements answer to the Nampa & Meridian Irrigation District as well as the city, a coordination step greenfield teams routinely miss.",
  },
  climateNotes:
    "IECC climate zone 5B (cold-dry) on the Snake River Plain at roughly 2,600 feet: cold winters with a 24-inch design frost depth, hot dry summers, and strong diurnal swings. Seismic demand is moderate for Idaho, snow load and frost protection drive foundation and roof design, and expansive clay soils appear in many neighborhoods, triggering geotechnical reports on foundation work.",
  marketNotes:
    "Meridian is Idaho's second-largest city and one of its fastest-growing, the suburban core of the Boise metro's west side. Anchors include Scentsy headquarters, Blue Cross of Idaho headquarters, St. Luke's Meridian Medical Center, and the West Ada School District, with The Village at Meridian as the regional retail centerpiece and Ten Mile and Eagle Road corridors adding medical, office, and logistics space. The pipeline is heavily greenfield — subdivisions, schools, medical campuses, and corridor commercial — alongside constant tenant finish-out.",
  narratives: {
    mep:
      "MEP design in Meridian is documented to the 2018 code family as locally amended — 2018 IMC and IFGC, the 2017 Idaho State Plumbing Code, and the 2017 NEC — with Building Services running all trade permits through Accela. Electrical service planning runs through Idaho Power while water and sewer capacity sit with the city, so the two utility conversations run in parallel from schematic design. In zone 5B, heating load, frost protection on plumbing, and summer cooling all size the systems; Idaho Code §39-4117's 20-business-day commercial completeness clock rewards a complete first submittal.",
    structural:
      "Structural design in Meridian works to the 2018 IBC with Idaho amendments: a 24-inch frost depth sets footing bearing, ground snow load and drift check the roof, and moderate seismic demand is handled with standard detailing. Expansive clay pockets across the city mean the geotechnical report drives foundation selection, and the city's design standards require an Idaho PE-stamped grading plan with a soils report for commercial site work — retaining walls over four feet, or any height with surcharge, need a building permit and engineered design.",
    civil:
      "Civil design in Meridian is a multi-agency exercise: the city's Unified Development Code governs site standards, Public Works takes water, sewer, and storm systems, ACHD controls the roads and any right-of-way work, and the Nampa & Meridian Irrigation District reviews anything touching canals or pressurized irrigation easements. Construction drawings for public improvements are submitted electronically with the final plat, and in a city still converting farmland, irrigation-company sign-off is as schedule-critical as the building permit itself.",
    energy:
      "Energy compliance in Meridian is documented to the 2018 IECC with the city's replacement amendments at MCC §10-1-4, typically proven with COMcheck on commercial work. Zone 5B makes the envelope the story: winter heating and air sealing set the margin, with summer cooling close behind. Idaho Power's efficiency programs add a utility incentive layer for commercial customers, but the permit set must first satisfy the city's amended code, which does not track the newest IECC editions used in neighboring states.",
  },
  faqs: [
    {
      q: "What building code edition does Meridian, ID enforce?",
      a: "The 2018 I-codes with Idaho and local amendments: the 2018 IBC, 2018 IECC, 2018 IMC/IFGC, and 2018 IFC under Meridian City Code Title 10, with the 2017 Idaho State Plumbing Code and the 2017 NEC for the trades. MCC §10-1-4 carries the city's own replacement amendments to the energy code.",
    },
    {
      q: "How are permits filed and reviewed in Meridian?",
      a: "Through the Accela Citizen Access Portal, with plan documents in ProjectDox. Building Services runs the building and trade permits while Planning, Fire, Public Works, and ACHD review in parallel by scope. Under Idaho Code §39-4117 the city must flag an incomplete commercial application within 20 business days.",
    },
    {
      q: "Who provides utilities in Meridian?",
      a: "Idaho Power for electricity, Intermountain Gas for natural gas, and the City of Meridian for water and sewer. Irrigation is separate — the Nampa & Meridian Irrigation District controls canals and pressurized irrigation easements, and its approval can be required alongside the city permit.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 48, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://alliancepermitting.com/guides/idaho/meridian-building-permit"],
      codes: ["https://mccmeetingspublic.blob.core.usgovcloudapi.net/meridianid-meet-24770dca0d5240d9902d2b1fb8ed95f4/ITEM-Attachment-001-b009b823c20f454eba93bcbe17784a0f.pdf"],
      amendments: ["https://mccmeetingspublic.blob.core.usgovcloudapi.net/meridianid-meet-24770dca0d5240d9902d2b1fb8ed95f4/ITEM-Attachment-001-b009b823c20f454eba93bcbe17784a0f.pdf"],
      utilities: ["https://reporting.meridiancity.org/public-works/water/backflow/"],
      climate: ["https://legislature.idaho.gov/statutesrules/idstat/Title39/T39CH41/SECT39-4117/"],
      market: ["https://citizensportal.meridiancity.org/residents/report-construction-concerns/"],
    },
  },
};
