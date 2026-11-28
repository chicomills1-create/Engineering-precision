import type { CityData } from "../types";

export const berkeley: CityData = {
  slug: "berkeley",
  name: "Berkeley",
  stateSlug: "california",
  county: "Alameda County",
  ahj: {
    office: "City of Berkeley Planning and Development Department, Building and Safety Division — Permit Service Center (1947 Center Street, 3rd Floor)",
    process:
      "Berkeley's Permit Service Center is a one-stop counter for building, electrical, mechanical, plumbing, fire, and some public works permits, open Monday through Thursday with Friday service remote. Building permits (other than zoning permits) can be filed digitally through the city's Permits Online / Accela portal with a registered account; in-person submittals require an appointment and documents in PDF format on a USB drive — the center does not accept paper printouts. Plan check ranges from roughly 30-minute over-the-counter review for minor work to several weeks for full commercial sets, and resubmittals, revisions, and deferred submittals upload against the same permit record.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC), adopted by Ordinance No. 7,988-N.S. in Berkeley Municipal Code Chapter 19.28, effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6) as adopted in BMC Chapter 19.36, with the Berkeley Green Code (BMC Chapter 19.37) adopting CALGreen with local amendments; electrical work to the 2025 California Electrical Code (Title 24, Part 3)",
    amendments:
      "Berkeley's Ordinance No. 7,988-N.S. (November 18, 2025) carries forward a deep local amendment set: more stringent structural and existing-building repair standards, Exterior Elevated Elements (E3) inspection provisions for balconies and decks, CBC Appendix J grading and Appendix Q emergency housing, a plumbing-code requirement for motion-activated gas shut-off valves, and adoption of CBC Appendix H for signs. The city is separately developing a Single Source Energy Margin reach code for the 2025 Energy and CALGreen codes — as of the December 2025 staff memo Berkeley has no adopted energy reach code for new buildings, so do not design to one yet.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E) for delivery, with Ava Community Energy as the community-choice electricity generation provider",
    notes:
      "PG&E delivers electricity and provides natural gas in Berkeley, with Ava Community Energy supplying generation for most accounts — new services and capacity run through PG&E's building and renovation process. Water is East Bay Municipal Utility District (EBMUD), a regional agency, while sewer collection is the City of Berkeley's system (with private sewer lateral compliance enforced at property transfer and major remodels) — so a commercial project coordinates PG&E, EBMUD, and the city sewer program in parallel with the Permit Service Center review.",
  },
  climateNotes:
    "ASHRAE climate zone 3C (warm-marine) / California Energy Climate Zone 3 on the East Bay shore: mild, fog-influenced summers and wet winters, with the Hayward Fault running along the base of the Berkeley Hills — Seismic Design Category D/E conditions and soft-story and hillside hazards dominate structural risk. The hills carry wildland-urban interface fire exposure, and Title 24 envelope design is driven by heating-season and moisture control more than cooling.",
  marketNotes:
    "Berkeley's commercial market is university- and research-driven: UC Berkeley and Lawrence Berkeley National Laboratory anchor demand, Bayer's West Berkeley biomanufacturing campus leads a growing life-science cluster along the I-80 frontage, and downtown, Fourth Street, and Telegraph Avenue retail districts generate steady tenant-improvement work. Much of the private pipeline is lab and R&D fit-out, institutional expansion, multifamily infill near BART stations, and seismic retrofit of the city's older commercial stock.",
  narratives: {
    mep:
      "MEP design in Berkeley is documented to the 2025 California codes adopted in BMC Title 19 — mechanical, plumbing, and electrical volumes with Berkeley amendments, including the city's motion-activated gas shut-off valve requirement that out-of-town plumbing designers routinely miss. Energy work follows the 2025 California Energy Code and the Berkeley Green Code (CALGreen as locally amended), service coordination runs through PG&E with Ava Community Energy as generation provider, and lab-heavy West Berkeley fit-outs add process and ventilation loads that must be sized into the Title 24 documentation from the start.",
    structural:
      "Berkeley structural design is seismic-first: the Hayward Fault crosses the city's eastern edge, design is to Seismic Design Category D or E under the 2025 CBC, and Berkeley's local amendments impose more stringent structural standards and existing-building repair triggers than the state baseline. The city's Exterior Elevated Elements (E3) provisions govern balcony and deck inspection and repair, soft-story and unreinforced masonry stock adds retrofit scope, and hillside sites combine slope, grading under CBC Appendix J, and WUI fire exposure.",
    civil:
      "Civil design in Berkeley must thread three utility systems — EBMUD water, city sewer collection with its private sewer lateral compliance program, and PG&E power and gas — through a dense, fully built street grid. Grading follows the locally adopted CBC Appendix J, stormwater must meet Bay Area municipal regional permit requirements, and hillside projects add drainage and slope-stability documentation that the Permit Service Center routes alongside the building set.",
    energy:
      "Energy compliance in Berkeley is documented to the 2025 California Energy Code (Title 24, Part 6) with CALGreen mandatory measures as adopted in the Berkeley Green Code, BMC Chapter 19.37. The city is actively developing a Single Source Energy Margin reach code, but staff confirmed in December 2025 that no local reach code exceeding the state model code is yet adopted for new buildings — the live design question is the state's 2025 code plus Berkeley's existing-building electrification policy context, not a phantom reach-code margin.",
  },
  faqs: [
    {
      q: "What building codes does Berkeley enforce?",
      a: "The 2025 California Building Standards Code with Berkeley local amendments, adopted by Ordinance No. 7,988-N.S. (November 18, 2025) in Berkeley Municipal Code Chapters 19.28–19.37 and effective January 1, 2026 — including the 2025 CBC (2024 IBC base), the 2025 California Energy Code, and CALGreen as the Berkeley Green Code.",
    },
    {
      q: "What local Berkeley amendments most affect design?",
      a: "More stringent structural and existing-building repair standards, Exterior Elevated Elements (E3) balcony/deck provisions, CBC Appendix J grading, and a plumbing requirement for motion-activated gas shut-off valves. Berkeley is developing a Single Margin energy reach code, but as of December 2025 none is adopted for new buildings.",
    },
    {
      q: "Who provides utilities in Berkeley, CA?",
      a: "PG&E delivers electricity and natural gas, with Ava Community Energy as the community-choice generation provider. Water is EBMUD, and sewer collection is the City of Berkeley's system, which enforces private sewer lateral compliance on transfers and major remodels.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 45, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://berkeleyca.gov/construction-development/permits-design-parameters/permit-process/permit-service-center?ref=berkeleyscanner.com"],
      codes: ["https://berkeleyca.gov/sites/default/files/documents/2025-11-18%20Item%2028%20Adoption%20of%20Berkeley%20Building%20Codes%2C%20including%20Local%20Amend.pdf"],
      amendments: ["https://berkeleyca.gov/sites/default/files/documents/2025-11-18%20Item%2028%20Adoption%20of%20Berkeley%20Building%20Codes%2C%20including%20Local%20Amend.pdf"],
      utilities: ["https://www.matthewsmithrealty.com/local/alameda-berkeley"],
      climate: ["https://www.jaspector.com/permits/california/alameda/berkeley/"],
      market: ["https://www.jaspector.com/permits/california/alameda/berkeley/"],
    },
  },
};
