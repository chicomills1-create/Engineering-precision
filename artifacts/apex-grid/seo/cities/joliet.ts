import type { CityData } from "../types";

export const joliet: CityData = {
  slug: "joliet",
  name: "Joliet",
  stateSlug: "illinois",
  county: "Will County",
  ahj: {
    office: "City of Joliet Building & Inspectional Services Division, Community Development Department (Joliet City Hall, 150 W. Jefferson St.)",
    process:
      "Joliet's Building & Inspectional Services Division issues all building, electrical, plumbing, and HVAC permits for the city — permits are not issued over the counter; applications come in by email or drop box, and commercial and larger projects are invited into the city's ProjectDox electronic plan review system (applications start with an email to the e-plans administrator, followed by plan upload and tracked review). Plumbing, heating, and electrical are separate permits filed alongside the building permit, and where a contractor performs the work, the contractor — not the owner — must pull the permit under Code Section 8-36. All contractors must have current registration on file with the city before a permit issues, and fees are invoiced by email once review approves the permit.",
  },
  codes: {
    building: "2015 International Building Code with City of Joliet local amendments (Code of Ordinances Chapter 8, Article II)",
    energy: "Illinois Energy Conservation Code — 2024 International Energy Conservation Code with Illinois amendments (71 Ill. Adm. Code 600), mandatory statewide for permits from November 30, 2025; ASHRAE 90.1-2022 is the alternate commercial compliance path",
    amendments:
      "Joliet enforces an older, stable code set than its fast-growing neighbors — the 2015 I-codes with the 2014 NEC and the Illinois State Plumbing Code, codified with local amendments throughout Chapter 8 of the Code of Ordinances, including a full local replacement of IBC Sections 101–116 (administration), red EXIT-sign graphics, and deepened footing requirements in amended Section 1809.7. The statewide Illinois Energy Conservation Code, not the city's 2015-era package, is what governs energy design.",
  },
  utilities: {
    electric: "Commonwealth Edison (ComEd) provides electric delivery service in Joliet; Nicor Gas provides natural gas",
    notes:
      "Electric service design and interconnection run through ComEd's commercial service process, separate from city review. Water and sewer are the story in Joliet: the City Department of Public Utilities still draws from 26 deep and shallow wells in a depleting aquifer, and the city is a founding member of the Grand Prairie Water Commission building a Lake Michigan supply from Chicago for delivery around 2030 — with roughly $85 million a year in water-main replacement underway to cut system water loss below the 10% threshold the new supply requires. New services and taps are coordinated with Public Utilities alongside the building permit.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) in the Des Plaines River valley: cold winters with 42-inch-class frost depth practice in the Chicago region, ground snow loads, hot humid summers, and riverine flood exposure along the Des Plaines River and Hickory Creek. Heavy logistics buildings dominate new construction, so snow drift at parapets and dock doors is a recurring design check.",
  marketNotes:
    "Joliet is one of North America's great logistics hubs: the CenterPoint Intermodal Center and the I-55/I-80 crossroads support millions of square feet of warehouse and distribution space for operators including Amazon and IKEA, alongside the ExxonMobil Joliet Refinery, two casino resorts (Harrah's Joliet and Hollywood Casino), Ascension Saint Joseph – Joliet hospital, and the University of St. Francis. Commercial work is weighted toward industrial, warehouse, and cold-storage construction, with steady retail and institutional infill.",
  narratives: {
    mep:
      "MEP design in Joliet is documented to the city's 2015 I-code package with the 2014 NEC — editions many regional teams no longer carry — while energy design jumps ahead to the statewide 2024 IECC-based Illinois Energy Conservation Code. Trade permits (electrical, plumbing, HVAC) are separate permits filed with the building permit, the contractor of record must pull them, and commercial plan review runs through ProjectDox after an emailed application. ComEd service design proceeds on its own track, so electrical service coordination should start before the city review closes.",
    structural:
      "Structural design in Joliet follows the 2015 IBC as amended by Chapter 8 of the city code, including Joliet's own deepened footing amendment in Section 1809.7 and the region's 42-inch-class frost practice. The dominant building type — very large, low-slope logistics warehouses — makes ground snow, parapet and dock-door drift, and wind uplift on wide-open suburban sites the controlling checks, with tilt-wall and precast systems the local norm. Des Plaines River valley sites add floodplain and poor-soil verification to the geotechnical scope.",
    civil:
      "Civil design in Joliet works through two city tracks: Building & Inspectional Services for the permit, and the Department of Public Utilities for street grades, drainage, stormwater detention, and water and sewer availability — checked before the building permit advances. The city's aquifer-to-Lake-Michigan transition means water-main and service standards are actively tightening, and IEPA permits can apply to larger water and sewer connections. Intermodal-corridor sites add heavy-duty pavement and truck-court drainage design to the standard detention scope.",
    energy:
      "Energy compliance in Joliet is a split picture: the building itself is reviewed under the 2015 I-codes, but energy design must meet the Illinois Energy Conservation Code — the 2024 IECC with Illinois amendments, mandatory statewide since November 30, 2025 — documented by COMcheck or the ASHRAE 90.1-2022 path. For the warehouse stock that dominates Joliet construction, the compliance margin turns on envelope, dock-area infiltration control, and high-efficiency lighting and controls across very large floor plates.",
  },
  faqs: [
    {
      q: "Who provides electric service in Joliet, IL?",
      a: "Commonwealth Edison (ComEd) delivers electricity in Joliet and Nicor Gas provides natural gas. Water and sewer are City of Joliet Department of Public Utilities services — the city is transitioning from its well aquifer to a Lake Michigan supply through the Grand Prairie Water Commission, expected around 2030.",
    },
    {
      q: "What building codes does Joliet enforce?",
      a: "Joliet enforces the 2015 I-codes with local amendments in Chapter 8 of its Code of Ordinances — 2015 IBC, IRC, IFC, IMC, and IFGC, the 2014 NEC, and the Illinois State Plumbing Code. Energy design is the exception: it follows the statewide Illinois Energy Conservation Code (2024 IECC with Illinois amendments), not the 2015-era local package.",
    },
    {
      q: "How does commercial plan review work in Joliet?",
      a: "Applications are submitted by email or drop box — Joliet does not issue permits over the counter. Commercial and complex projects are invited into ProjectDox for electronic plan review, trade permits are filed separately alongside the building permit, and if a contractor performs the work the contractor must pull the permit (Code Sec. 8-36). Contractors must be registered with the city before any permit issues.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 50, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://govcodex.com/blog/joliet-building-permit-guide"],
      codes: ["https://library.municode.com/il/joliet/codes/code_of_ordinances?nodeId=COOR_CH8BUCOPRMA_ARTIIBUCO_DIV1ADCO"],
      amendments: ["https://library.municode.com/il/joliet/codes/code_of_ordinances?nodeId=COOR_CH8BUCOPRMA_ARTIIBUCO_DIV1ADCO"],
      utilities: ["https://www.rethinkwaterjoliet.org/about"],
      climate: ["https://cdb.illinois.gov/business/codes/illinois-energy-codes/illinois-energy-conservation-code.html"],
      market: ["https://www.joliet.gov/files/assets/city/v/1/public-utilities/documents/sejsd/sejsd-welcome-guide-85x11.pdf"],
    },
  },
};
