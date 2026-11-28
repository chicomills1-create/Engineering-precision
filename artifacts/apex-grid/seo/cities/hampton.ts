import type { CityData } from "../types";

export const hampton: CityData = {
  slug: "hampton",
  name: "Hampton",
  stateSlug: "virginia",
  county: "City of Hampton (independent city)",
  ahj: {
    office: "City of Hampton Development Services Center (Permits), Community Development Department (3rd Floor, 22 Lincoln St., Hampton, VA 23669)",
    process:
      "Hampton's Development Services Center issues building permits for work inside the independent city through the City of Hampton Online Permit & Inspection Center, which lets applicants apply for permits, upload plans and forms as PDFs, request inspections, check inspection status, and pay fees online 24 hours a day; completed forms may also be delivered to the Development Services Center on the 3rd floor of 22 Lincoln Street. Submittal alone does not validate a permit — city approval and payment of all required fees must precede issuance. Commercial submittals follow the city's published Commercial Plan Requirements, and Hampton Roads regional special inspection guidelines (2021 USBC edition) apply to special-inspection work. Planning and Zoning Administration is a separate division in the same building, so zoning questions and building questions have different reviewers.",
  },
  codes: {
    building: "2021 Virginia Uniform Statewide Building Code (USBC) — 2021 Virginia Construction Code, based on the 2021 IBC, in effect statewide since January 18, 2024",
    energy: "2021 Virginia Energy Conservation Code (part of the Virginia USBC, based on the 2021 IECC), Climate Zone 4A",
    amendments:
      "Virginia preempts local building codes: under Va. Code Section 36-98 no locality may adopt its own building code or technical amendments, so Hampton enforces the USBC exactly as the state publishes it. What varies locally is the non-code layer Hampton controls — its floodplain regulations adopted for the National Flood Insurance Program, zoning districts and overlays tied to Joint Base Langley-Eustis airfield operations (Langley AICUZ), Chesapeake Bay Preservation Area rules, and historic district review in areas such as Phoebus. Re-roofing and re-siding on residential homes no longer require a building permit in Hampton.",
  },
  utilities: {
    electric: "Dominion Energy Virginia",
    notes:
      "Dominion Energy Virginia provides electric service in Hampton and Virginia Natural Gas provides gas where available, so new services and upgrades are Dominion processes. Public water comes from Newport News Waterworks, the regional wholesaler serving the Peninsula, and wastewater treatment is regional through the Hampton Roads Sanitation District (HRSD), which bills based on water consumption — the same utilities NASA Langley Research Center documents for its Hampton campus. Flood-prone Peninsula sites should confirm water and sewer tap availability and any HRSD capacity requirements early in design.",
  },
  climateNotes:
    "IECC Climate Zone 4A (mixed-humid) on the Chesapeake Bay at the mouth of Hampton Roads: hot humid summers (design about 93°F), mild winters (design about 22°F, frost depth about 12 inches), and coastal wind exposure with hurricane and nor'easter storm surge. Extensive FEMA Special Flood Hazard Areas (Zones AE and VE) and recurrent tidal flooding under the city's Resilient Hampton program make flood elevation and freeboard central design inputs, not edge cases.",
  marketNotes:
    "Hampton's construction market is anchored by federal and institutional employers: NASA Langley Research Center, Joint Base Langley-Eustis, Hampton University, and the Sentara CarePlex Hospital and Hampton VA Medical Center healthcare base, with Fort Monroe redevelopment adding a long-running historic-adaptive-reuse program. Commercial work concentrates in federal and aerospace support facilities, healthcare, university projects, waterfront and downtown redevelopment, and resilience-driven retrofits across a flood-exposed building stock.",
  narratives: {
    mep:
      "MEP design in Hampton runs on Dominion Energy Virginia service under the 2021 Virginia USBC and its 2021 IECC-based energy code, in Climate Zone 4A where humidity control rivals temperature control. Federal-adjacent work — NASA Langley and Joint Base Langley-Eustis support facilities — carries owner standards above code minimums, and flood-zone parcels push mechanical and electrical equipment elevation into the first design conversation, with permit filing and inspections managed through the city's Online Permit & Inspection Center.",
    structural:
      "Structural design in Hampton is coastal design under the 2021 Virginia Construction Code: hurricane wind exposure, wind-borne debris considerations near the Bay, and FEMA flood zone requirements — elevation certificates, flood openings, and freeboard in AE and VE zones — that set finished floors before framing is designed. Frost depth is only about 12 inches; water, not cold, is the governing load case, and Hampton Roads regional special inspection guidelines (2021 USBC edition) govern special-inspection scope.",
    civil:
      "Civil design in Hampton is defined by the Chesapeake Bay: Chesapeake Bay Preservation Area rules, city floodplain regulations under the NFIP, and the Resilient Hampton program's living-shoreline and stormwater direction shape site plans across the city. Water is Newport News Waterworks and sewer treatment is HRSD regional, Langley AICUZ overlays constrain sites near the airfield, and historic districts such as Phoebus add review layers that belong in the schedule from day one.",
    energy:
      "Energy compliance in Hampton is documented to the 2021 Virginia Energy Conservation Code within the USBC, in Climate Zone 4A — a balanced heating and cooling profile where latent load control and envelope air sealing carry the margin. Because Virginia bars local code amendments, the energy target is uniform statewide; the Hampton-specific work is coordinating compliance with flood elevation of equipment and the resilience expectations the city applies in its flood-prone districts.",
  },
  faqs: [
    {
      q: "What building code does Hampton, VA enforce?",
      a: "The 2021 Virginia Uniform Statewide Building Code (2021 Virginia Construction Code, based on the 2021 IBC), in effect since January 18, 2024. Virginia law (Section 36-98) bars localities from adopting their own building codes or amendments, so Hampton enforces the state code as published.",
    },
    {
      q: "How are permits applied for in Hampton?",
      a: "Through the City of Hampton Online Permit & Inspection Center — apply, upload plans as PDFs, request inspections, and pay fees online — or by delivering completed forms to the Development Services Center, 3rd Floor, 22 Lincoln Street. A submittal is not a permit: city approval and full fee payment must come first.",
    },
    {
      q: "Who provides utilities in Hampton?",
      a: "Dominion Energy Virginia (electric), Virginia Natural Gas (gas, where available), Newport News Waterworks (public water), and the Hampton Roads Sanitation District, HRSD (regional wastewater treatment, billed on water consumption).",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 49, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.hampton.gov/2230/Residential"],
      codes: ["https://alliancepermitting.com/guides/virginia/hampton-building-permit"],
      amendments: ["https://alliancepermitting.com/guides/virginia/hampton-building-permit"],
      utilities: ["https://permanent.fdlp.gov/gpo57881/20150003786.pdf"],
      climate: ["https://www.doineedapermit.org/permits/room-addition/hampton-va"],
      market: ["https://alliancepermitting.com/guides/virginia/hampton-building-permit"],
    },
  },
};
