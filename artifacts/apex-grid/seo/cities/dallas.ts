import type { CityData } from "../types";

export const dallas: CityData = {
  slug: "dallas",
  name: "Dallas",
  stateSlug: "texas",
  county: "Dallas County",
  ahj: {
    office: "City of Dallas Development Services Department (Building Inspection)",
    process:
      "Commercial plan review is submitted electronically through the ProjectDox/POSSE-based online system, with intake and inspections coordinated through the Oak Cliff Municipal Center. Dallas runs concurrent-discipline review and offers an expedited/priority review option for qualifying projects; the city has publicly worked to shorten historically long commercial turnaround times, so early completeness checks matter.",
  },
  codes: {
    building: "2021 IBC, adopted as the Dallas Building Code (City Code Chapter 53) with city amendments, effective May 12, 2023",
    energy: "2021 IECC (state minimum via SECO), enforced as part of the Dallas construction code package",
    amendments:
      "Dallas carries a long list of Chapter 53 amendments to the 2021 IBC touching height/area, fire-protection triggers, and administrative provisions, and it enforces its own mechanical, plumbing, and electrical amendment packages. The amendment set differs from Fort Worth, Plano, and Irving even on the same 2021 base, so the governing package must be confirmed per jurisdiction.",
  },
  utilities: {
    electric: "Oncor Electric Delivery provides regulated wires/delivery service; Dallas sits in the ERCOT competitive-retail market, so the customer chooses a retail electric provider while Oncor handles the meter and interconnection",
    notes:
      "Interconnection, service upgrades, and transformer procurement run through Oncor and can carry long lead times for large services, so we engage them at schematic design. Water and wastewater are Dallas Water Utilities inside city limits.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 3A (warm-humid) with long cooling seasons, 100°F+ summer design days, and enough winter swing that Winter Storm Uri exposed the cost of un-winterized systems and undersized freeze protection.",
  marketNotes:
    "Dallas-Fort Worth is one of the nation's most active construction markets, driven by corporate relocations, a massive industrial/warehouse pipeline along the metroplex logistics corridors, data centers, healthcare, and dense multifamily and mixed-use development. That volume keeps commercial plan-review queues full, which is why complete first submittals and the priority-review path protect schedules.",
  narratives: {
    mep:
      "MEP design in Dallas works to a roughly 100°F cooling design day in climate zone 3A, where latent load is real but secondary to sensible cooling, so we size cooling plants tightly and design economizers that actually earn their keep in the shoulder seasons. The Dallas Building Code (2021 IBC, Chapter 53) carries city-specific mechanical, plumbing, and electrical amendments, so equipment schedules and gas-piping details are checked against the Dallas package rather than a generic IBC set. Electrically, service comes from Oncor's regulated delivery network inside the ERCOT retail market; we confirm available capacity and transformer lead times with Oncor early and design freeze protection that reflects the lesson of Winter Storm Uri.",
    structural:
      "Dallas structural design is dominated by the Blackland Prairie's highly expansive clays, not by seismic demand (Seismic Design Category A-B across the metroplex). Foundations follow the project geotechnical report - commonly post-tensioned slabs, drilled piers to competent strata, or grade beams on void forms with moisture-control detailing to manage shrink-swell. Basic wind speeds are moderate (roughly 105-115 mph), but rooftop-equipment anchorage and roof uplift still govern many low-rise roofs. Because the 2021 IBC is enforced through Dallas's Chapter 53 amendments, special-inspection programs and structural submittals are set up on the city's own forms and coordinated through its electronic review portal.",
    civil:
      "Site work in Dallas is a drainage and floodplain discipline. Much of the city drains toward the Trinity River corridor, and Dallas Water Utilities Stormwater Operations enforces floodplain-management and fill/rise rules that can reshape a site plan; the metroplex iSWM (integrated Stormwater Management) criteria guide detention and water-quality design. Expansive clays complicate pavement sections and utility trench design, and TCEQ construction general permit coverage with a SWPPP applies to disturbances over an acre. We design grading, detention, and utilities to the City of Dallas drainage and paving standards and coordinate water/wastewater capacity with Dallas Water Utilities during entitlement.",
    energy:
      "Dallas enforces the 2021 IECC as part of its construction-code package, matching the Texas SECO commercial baseline, so COMcheck or ASHRAE 90.1 modeling targets that exact edition. In climate zone 3A the highest-leverage moves are low-SHGC glazing, tight envelope air-sealing, and right-sized high-efficiency cooling - added roof insulation returns less than solar-heat-gain and infiltration control. We package envelope, mechanical, and lighting compliance together and resolve plan-check comments through the city's electronic review workflow, confirming the enforced edition before finalizing the approach because neighboring metroplex cities review on their own timelines.",
  },
  faqs: [
    {
      q: "What building code does the City of Dallas enforce?",
      a: "Dallas enforces the Dallas Building Code (City Code Chapter 53), based on the 2021 IBC with city amendments and effective May 12, 2023. Neighboring cities like Fort Worth, Plano, and Irving adopt their own amendment packages, so we confirm the governing set with the permitting city at kickoff.",
    },
    {
      q: "Who provides electric service for a commercial project in Dallas?",
      a: "Oncor Electric Delivery owns the regulated wires and handles meters, service upgrades, and interconnection, while Dallas sits in the ERCOT competitive-retail market where you choose a retail electric provider for energy supply. We coordinate capacity and transformer lead times with Oncor at schematic design.",
    },
    {
      q: "How do expansive soils affect foundation design in Dallas?",
      a: "Significantly. The Blackland Prairie clays are highly expansive, so foundation design follows the project geotechnical report - typically post-tensioned slabs, drilled piers, or grade beams on void forms with moisture-control detailing to manage seasonal shrink-swell movement.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 95, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/default.aspx"],
      codes: ["https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/construction_codes.aspx"],
      amendments: ["https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/construction_codes.aspx"],
      utilities: ["https://www.oncor.com/"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://www.dallasecodev.org/"],
    },
  },
};
