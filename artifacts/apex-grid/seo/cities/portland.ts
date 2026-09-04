import type { CityData } from "../types";

export const portland: CityData = {
  slug: "portland",
  name: "Portland",
  stateSlug: "oregon",
  county: "Multnomah County",
  ahj: {
    office: "City of Portland Bureau of Development Services (BDS)",
    process: "BDS accepts commercial permit applications, plans, fees, corrections, and status tracking in the Development Hub PDX electronic permitting system. Commercial projects receive coordinated bureau review; early assistance and pre-application conferences are available for projects with land-use, site, or infrastructure complexity.",
  },
  codes: {
    building: "2022 Oregon Structural Specialty Code (OSSC), as adopted by Portland City Code Title 24",
    energy: "2023 Oregon Energy Efficiency Specialty Code (OEESC)",
    amendments: "Oregon specialty codes are statewide and Portland may not amend their technical provisions. Portland does add locally administered zoning, Title 17 environmental overlay, transportation, sewer, and stormwater requirements; its commercial building energy-reporting policy applies to covered existing buildings.",
  },
  utilities: {
    electric: "Portland General Electric (PGE) serves most of Portland; Pacific Power serves limited areas",
    notes: "PGE coordinates new electric service and distributed-energy interconnection; commercial projects should verify territory and service capacity rather than assume a single citywide utility. The Portland Water Bureau supplies drinking water and the Bureau of Environmental Services operates sanitary and stormwater systems.",
  },
  climateNotes: "Portland's cool marine 4C climate brings long wet winters, modest historic cooling loads, and increasingly consequential summer heat and wildfire-smoke events. Cascadia seismic hazard, liquefiable riverplain soils, and the Willamette River floodplain are material constraints on site-specific projects.",
  marketNotes: "Portland construction includes dense multifamily and adaptive reuse, healthcare and higher education, industrial and logistics activity around the river and airport, and technology/manufacturing work in the broader Silicon Forest. The region is also a significant mass-timber market, while redevelopment frequently confronts brownfield, river, and constrained urban-utility conditions.",
  narratives: {
    mep: "Portland MEP design follows the 2023 OEESC in a wet 4C climate where heating efficiency, heat recovery, moisture control, and ventilation have traditionally mattered more than peak cooling. That is changing with hotter summers and wildfire smoke: we evaluate cooling resilience, economizer operation, filtration, and a smoke-event outside-air sequence rather than treating them as optional upgrades. PGE service capacity and interconnection are early design questions, while the Portland Water Bureau and Bureau of Environmental Services connections shape equipment water and drainage coordination.",
    structural: "Portland structural design is a Cascadia problem, not a low-seismic Northwest exception. The 2022 OSSC applies statewide, and the Portland Basin's soft alluvium, fills, and liquefaction potential can materially affect site class, foundations, and lateral-system selection; river-adjacent work also needs floodplain evaluation. We coordinate geotechnical findings before locking a mass-timber, steel, or concrete lateral scheme, then align special inspections and corrections with BDS's Development Hub PDX workflow.",
    civil: "Civil work in Portland begins with the Bureau of Environmental Services' Stormwater Management Manual, which requires on-site stormwater hierarchy analysis, source control, and project-specific flow-control or treatment measures. Infiltration testing, high groundwater, contaminated fill, and the city's environmental overlay zones can each limit a seemingly simple drainage concept. We reserve room for facilities during layout, coordinate water with the Portland Water Bureau, and address BDS land-use and right-of-way review before site utilities become a late permit issue.",
    energy: "Commercial energy compliance in Portland is against the 2023 OEESC, not a generic IECC COMcheck baseline. In marine 4C, high-performing envelopes, air-barrier continuity, heat recovery, efficient heat pumps, lighting controls, and sensible glazing trade-offs generally carry more value than oversized cooling equipment. We also distinguish permit compliance from Portland's existing-building energy-reporting obligations and test PGE rates, electrification loads, and Energy Trust incentive opportunities while the system concept can still change.",
  },
  faqs: [
    { q: "What commercial code does Portland BDS enforce?", a: "Portland BDS enforces Oregon's statewide 2022 Oregon Structural Specialty Code through City Code Title 24. The state code is mandatory and Portland cannot make technical specialty-code amendments, but local zoning, environmental overlay, stormwater, transportation, and utility requirements still require city review." },
    { q: "Does Portland use the IECC for commercial energy permits?", a: "No. Portland applies Oregon's 2023 Oregon Energy Efficiency Specialty Code. The OEESC is Oregon's own commercial code, so the compliance package must use its requirements rather than treating a plain IECC COMcheck as the governing standard." },
    { q: "What site constraints are especially important in Portland?", a: "Stormwater and subsurface conditions are early constraints. The Bureau of Environmental Services requires its stormwater-management process, while riverplain fill, soft soils, liquefaction potential, high groundwater, environmental overlays, and Willamette floodplain exposure can change foundations, drainage, and usable site area." },
  ],
};