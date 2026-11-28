import type { CityData } from "../types";

export const athens: CityData = {
  slug: "athens",
  name: "Athens-Clarke County",
  stateSlug: "georgia",
  county: "Clarke County",
  ahj: {
    office: "Athens-Clarke County Building Permits & Inspections Department (Planning and Zoning Department administers Construction Plans Review)",
    process:
      "Commercial, multi-family, industrial, and institutional projects in Athens-Clarke County go through Construction Plans Review, administered by the Planning and Zoning Department: Building, Public Utilities, Transportation & Public Works, the Fire Marshal, and Building Inspections all review the same submittal simultaneously so permits can issue together. Since January 1, 2025, all Plans Review submittals — including revisions — are accepted only through the ACC Community Portal (Tyler EnerGov); paper is not accepted. Building plans hit a weekly Friday-noon deadline with a Plans Review meeting scheduled the Thursday 13 days later, while site plans run on a bi-weekly Friday cycle, and review fees are generated automatically in the portal at submittal.",
  },
  codes: {
    building: "2024 International Building Code with Georgia Amendments (Georgia State Minimum Standard Codes as locally adopted by Athens-Clarke County, effective January 1, 2026)",
    energy: "2015 International Energy Conservation Code with Georgia Supplements and Amendments (2020, 2022, and 2023) — Georgia's energy code did not advance with the 2024 I-code cycle; ASHRAE 90.1-2013 is the commercial alternative path",
    amendments:
      "Athens-Clarke County enforces the Georgia State Minimum Standard Codes — the 2024 I-codes with 2026 Georgia Amendments and the 2023 NEC with 2026 Georgia Amendments — and locally adopts DCA's permissive codes as well, including the 2018 International Existing Building Code and 2018 International Property Maintenance Code with Georgia Amendments. The split edition set is the local trap: structural and mechanical work documents to 2024 editions while energy compliance still documents to the 2015 IECC with Georgia supplements.",
  },
  utilities: {
    electric: "Georgia Power serves most of Athens-Clarke County; Walton EMC, Jackson EMC, and Rayle EMC serve portions of the county",
    notes:
      "Electric service in Athens is territorial: Georgia Power covers most of the city, with Walton EMC, Jackson EMC, and Rayle EMC in outlying parts of Clarke County, so the serving utility must be confirmed by address before service design begins. Water and sewer are unified-government utilities — the ACC Public Utilities Department serves more than 40,000 accounts, and its Engineering Division reviews new water and sewer development inside the same Plans Review routing as the building permit, which consolidates capacity questions into one submittal. Natural gas distribution is Atlanta Gas Light with retail supply from PSC-certified marketers.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 3A (warm-humid) in Georgia's Piedmont: long, humid cooling seasons with summer design temperatures in the mid-90s, mild winters with a shallow frost depth, and severe-thunderstorm and tornado exposure. Piedmont red clay soils and the North and Middle Oconee River corridors put floodplain and stormwater checks on low-lying sites, and seismic demand is low-to-moderate.",
  marketNotes:
    "Athens is a university-and-healthcare market: the University of Georgia — the state's flagship, with roughly 41,000 students — drives student housing, research, and campus-adjacent commercial work, while Piedmont Athens Regional and St. Mary's Health Care System anchor a regional medical sector. Caterpillar's Athens plant, a brewery and food-processing cluster, and a music-and-hospitality downtown economy round out demand, so the commercial pipeline skews to medical, institutional, multifamily, and adaptive reuse of the downtown and Normaltown stock rather than greenfield retail.",
  narratives: {
    mep:
      "MEP design in Athens-Clarke County starts with the edition split Georgia now enforces: mechanical and plumbing systems document to the 2024 IMC and IPC with Georgia Amendments and electrical work to the 2023 NEC with 2026 Georgia Amendments, while energy compliance still runs to the 2015 IECC with Georgia supplements — a combination out-of-state teams routinely get wrong. Service coordination depends on territory, since Georgia Power serves most of the city but three EMCs cover parts of the county, and the whole package routes through ACC's portal-only Construction Plans Review with the Fire Marshal at the same table.",
    structural:
      "Structural design in Athens works under the 2024 IBC with Georgia Amendments on Piedmont geology: residual red-clay soils over saprolite and rock make foundation conditions vary sharply across a site, so geotechnical investigation carries real weight. Wind design follows ASCE 7 for inland Georgia with severe-thunderstorm and tornado exposure, seismic demand is modest, and the large stock of older downtown masonry and mill buildings adds existing-structure evaluation under the locally adopted 2018 IEBC.",
    civil:
      "Civil design in Athens-Clarke County runs through the same Construction Plans Review as the building: Transportation & Public Works takes site, grading, and right-of-way work on a bi-weekly submittal cycle, and the Public Utilities Engineering Division reviews water and sewer extensions for new development. Sites drain toward the North and Middle Oconee Rivers, so floodplain limits, stream buffers, and stormwater detention under the unified government's ordinances shape layouts early, and ACC's separate stormwater utility fee follows impervious area.",
    energy:
      "Energy compliance in Athens is documented to the 2015 IECC with Georgia Supplements and Amendments (2020, 2022, 2023) — Georgia deliberately held the energy code at 2015 while advancing the other I-codes to 2024 — using COMcheck or the ASHRAE 90.1-2013 alternative for commercial work. In zone 3A the margin is decided by cooling efficiency, humidity control, and duct sealing, and Georgia Power's commercial efficiency programs add a utility incentive layer on top of code minimums.",
  },
  faqs: [
    {
      q: "What building code does Athens-Clarke County enforce?",
      a: "The Georgia State Minimum Standard Codes as locally adopted: the 2024 IBC, IMC, IPC, and IFGC with Georgia Amendments and the 2023 NEC with 2026 Georgia Amendments, effective January 1, 2026. Energy compliance is the exception — it still documents to the 2015 IECC with Georgia Supplements and Amendments.",
    },
    {
      q: "How are commercial plans reviewed in Athens-Clarke County?",
      a: "Through Construction Plans Review, administered by the Planning and Zoning Department. Submittals go only through the ACC Community Portal — no paper — and Building Inspections, Public Utilities, Transportation & Public Works, and the Fire Marshal review simultaneously. Building plans are due by Friday noon weekly, with a review meeting the Thursday 13 days after submittal.",
    },
    {
      q: "Who provides electric, water, and sewer service in Athens, GA?",
      a: "Georgia Power serves most of the city, with Walton EMC, Jackson EMC, and Rayle EMC covering parts of Clarke County — confirm by address. Water and sewer are Athens-Clarke County Public Utilities Department services, and its Engineering Division reviews new water and sewer development within Plans Review.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 47, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://accgov.com/10758/Construction-Plans-Review"],
      codes: ["https://accgov.com/4223/Locally-Adopted-Codes", "https://dca.georgia.gov/community-assistance/construction-codes/current-state-minimum-codes-construction"],
      amendments: ["https://accgov.com/4223/Locally-Adopted-Codes"],
      utilities: ["https://accgov.com/FAQ/Topic?mobile=ON&topic=44"],
      climate: ["https://dca.georgia.gov/community-assistance/construction-codes/current-state-minimum-codes-construction"],
      market: ["https://accgov.com/10758/Construction-Plans-Review"],
    },
  },
};
