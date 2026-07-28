import type { CityData } from "../types";

export const chicago: CityData = {
  slug: "chicago",
  name: "Chicago",
  stateSlug: "illinois",
  county: "Cook County",
  ahj: {
    office: "City of Chicago Department of Buildings",
    process:
      "Chicago runs permitting through the E-Plan electronic plan review system, with a Standard Plan Review track for larger commercial buildings and a Developer Services / Self-Certification Permit Program that lets a licensed Illinois architect self-certify code compliance for many qualifying projects to accelerate issuance. The Department of Buildings coordinates multi-agency review, and projects triggering zoning, landmarks, or utility easements pick up additional routing.",
  },
  codes: {
    building:
      "2019 Chicago Construction Codes (Chicago Building Code, Title 14B), harmonized with the 2018 IBC while retaining Chicago-specific provisions",
    energy:
      "Chicago Energy Conservation Code, based on the 2021 IECC / ASHRAE 90.1 with Chicago amendments",
    amendments:
      "Chicago historically used its own unique construction code and, in the 2019 update, aligned much of it with the 2018 IBC while keeping Chicago-specific requirements — including combustible-construction limits, high-rise provisions, and its own materials rules. The city enforces an Energy Benchmarking Ordinance for larger buildings, so confirm the current Chicago amendment package rather than assuming a plain IBC/IECC project.",
  },
  utilities: {
    electric:
      "Commonwealth Edison (ComEd), an Exelon company, is the delivery utility for Chicago and northern Illinois",
    notes:
      "ComEd handles distribution and new-service interconnection across the city, with commercial demand charges and service-upgrade lead times that reward right-sized services and load management; retail generation supply is deregulated in Illinois. The City of Chicago Department of Water Management provides water and sewer, and Peoples Gas serves natural gas in the city.",
  },
  climateNotes:
    "Chicago sits in ASHRAE climate zone 5A (cool-humid), with cold winters, hot-humid summers, large heating loads, significant ground snow, and lake-effect exposure along the shoreline; heating, freeze protection, and both winter design lows and summer humidity drive mechanical design.",
  marketNotes:
    "Chicago's construction market spans downtown high-rise office and residential, large industrial and logistics development in the metro fringe, healthcare and higher-education institutions, and adaptive reuse of the city's deep stock of older masonry and high-rise buildings. Cold-climate energy performance and the city's benchmarking ordinance shape retrofit demand, while high-rise and combustible-construction rules keep structural and life-safety engineering central to downtown projects.",
  narratives: {
    mep:
      "MEP design in Chicago is a cold-climate, high-humidity problem: climate zone 5A drives large heating loads, freeze protection for piping and outside-air systems, and summer dehumidification, all under the Chicago Energy Conservation Code based on the 2021 IECC with city amendments. We size heating plants for genuinely cold winter design temperatures, protect against freeze-ups on the coldest lake-effect days, and manage humidity in summer, while ComEd's demand-charge structure and service-upgrade lead times push us to right-size electrical services and plan interconnection early. For larger buildings, the city's Energy Benchmarking Ordinance means operational performance is publicly tracked, so we design efficiency in from the start.",
    structural:
      "Structural engineering in Chicago is a low-seismic but high-demand environment: Seismic Design Categories are generally low (typically A–B), so gravity, wind, and snow — not earthquakes — govern most designs, and ground snow loads plus drifting must be handled carefully in the 5A climate. Downtown high-rise work triggers the Chicago Building Code's high-rise and wind provisions, and the city's historic combustible-construction limits and materials rules still shape structural choices even after the 2019 alignment with the 2018 IBC. Deep foundations bearing on hardpan or rock are common given local soils, and special inspections route through the Department of Buildings.",
    civil:
      "Civil design in Chicago must satisfy the city's Stormwater Management Ordinance, which requires detention and green-infrastructure practices to reduce combined-sewer overflow into the system and ultimately the waterways — a real constraint that consumes site area on the flat urban terrain. Frost-depth foundations, deep frost protection for utilities, and coordination with the Department of Water Management for water and sewer capacity are routine in the 5A climate, and right-of-way work is coordinated with CDOT. We lay out detention and green stormwater infrastructure early, design to the city's frost and grading standards, and account for the combined-sewer context that drives Chicago's stormwater rules.",
    energy:
      "Energy compliance in Chicago follows the Chicago Energy Conservation Code (based on the 2021 IECC / ASHRAE 90.1 with amendments) in a cold, humid 5A climate where envelope performance, continuous insulation, air-tightness, and heating-plant efficiency drive results. COMcheck or performance-path documentation must target the Chicago edition and amendments, and for larger buildings the Energy Benchmarking Ordinance publicly tracks measured energy use, raising the bar on real-world performance. We coordinate envelope, mechanical, and lighting compliance as one package, address freeze protection and humidity control as part of the energy strategy, and resolve plan-check comments through the city's E-Plan workflow.",
  },
  faqs: [
    {
      q: "What building code does the City of Chicago enforce?",
      a: "Chicago enforces the 2019 Chicago Construction Codes, which harmonized much of the Chicago Building Code with the 2018 IBC while keeping Chicago-specific provisions — including combustible-construction limits, high-rise rules, and local materials requirements. It is not a plain IBC jurisdiction, so the city amendment package matters on every project.",
    },
    {
      q: "How does Chicago's Self-Certification permit program work?",
      a: "Chicago's Self-Certification Permit Program lets a qualified, licensed Illinois architect certify code compliance for many eligible projects, allowing faster permit issuance than full standard plan review. It does not waive code compliance — the city can audit — but for qualifying commercial scopes it can substantially compress the permitting schedule.",
    },
    {
      q: "What climate and structural loads govern Chicago design?",
      a: "Chicago is a cold-humid climate zone 5A city, so heating loads, ground snow and drift loads, wind, and frost-depth foundations govern more than seismic — which is low (generally SDC A–B). Downtown high-rises add the Chicago Building Code's high-rise and wind provisions, and deep foundations to hardpan or rock are common.",
    },
  ],
};
