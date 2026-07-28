import type { StateData } from "../types";

export const indiana: StateData = {
  slug: "indiana",
  name: "Indiana",
  abbrev: "IN",
  buildingCode: {
    name: "Indiana Building Code (675 IAC 13) based on the 2012 IBC with amendments",
    baseCode: "2012 IBC with extensive Indiana amendments",
    notes:
      "Indiana enforces a mandatory statewide commercial code adopted by the Fire Prevention and Building Safety Commission and administered through the state Plan Review process. The commercial code has been based on the 2012 IBC with heavy amendments; Indiana runs well behind the model cycle, so the exact adopted edition and any updates should be confirmed at project start.",
  },
  energyCode: {
    commercial: "Indiana Energy Conservation Code based on ASHRAE 90.1-2007 / 2010-era IECC provisions with state amendments",
    notes:
      "Indiana's adopted commercial energy code is notably older than the current model codes, referencing an ASHRAE 90.1 vintage several cycles back. Because it is state-adopted, compliance is uniform, but designers should verify the current reference standard with the state and design above it where practical.",
  },
  climate: {
    zones: "5A across most of the state, transitioning toward 4A in the far south near the Ohio River",
    drivers: [
      "Cold, humid winters with substantial heating loads",
      "Humid summers requiring dehumidification and latent-load control",
      "Tornado and severe-storm exposure across the state",
      "Freeze-thaw cycling affecting envelope and site design",
    ],
  },
  structural: {
    seismic: "Low across most of Indiana (SDC A–B), but southwestern Indiana near the Wabash Valley and New Madrid seismic zones can reach SDC C or higher and requires real seismic detailing",
    wind: "Basic wind speeds generally around 105–115 mph (Risk Category II); high tornado frequency drives attention to uplift and continuous load paths",
    snow: "Ground snow loads commonly around 20 psf in central/southern Indiana, somewhat higher in the north near Lake Michigan",
    other: "Frost depths of roughly 30–36 inches govern footings; soft alluvial soils along river corridors require geotechnical coordination",
  },
  licensure: {
    board: "Indiana Professional Licensing Agency — State Board of Registration for Professional Engineers",
    notes: "Indiana grants licensure by endorsement/comity for NCEES-record engineers; electronic seals and digital signatures are accepted for plan submittals under board rules.",
  },
  metros: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel", "Bloomington"],
  permitting:
    "Indiana operates a statewide Plan Review through the Department of Homeland Security for many commercial projects, issuing a Construction Design Release before local permits proceed. Local building departments then handle inspections; Indianapolis and other larger cities run their own commercial review, so both the state release and local permitting must be sequenced.",
  marketNotes:
    "Indiana's central location makes it a national logistics and warehouse hub, with heavy distribution and e-commerce fulfillment construction around Indianapolis and along the interstate corridors. Advanced manufacturing, EV-supply-chain investment, life sciences, and pharmaceutical facilities add strong industrial demand statewide.",
  narratives: {
    mep:
      "Mechanical design in Indiana balances a cold, humid winter against a muggy summer, with the whole state near climate zone 5A (softening to 4A near the Ohio River). Heating loads are significant, so we evaluate high-efficiency boilers, VRF, and cold-climate heat pumps, while summer dehumidification gets explicit attention to avoid comfort and moisture problems. Indiana's role as a logistics and manufacturing powerhouse means we design a lot of large warehouse and industrial shells, where ventilation, high-bay heating, and destratification strategies matter as much as comfort cooling. Electrically, distribution-center and advanced-manufacturing loads push service sizing and coordination with utilities like Duke Energy, AES Indiana, and NIPSCO. Because the energy code is adopted statewide — albeit on an older ASHRAE 90.1 vintage — our compliance documentation is uniform, but we routinely design envelopes and equipment beyond the dated minimum to control operating cost.",
    structural:
      "Indiana structural design is mostly a gravity-and-wind exercise, with one important exception: southwestern Indiana sits near the Wabash Valley and New Madrid seismic zones, where design categories can climb to SDC C or beyond and seismic detailing genuinely governs. Elsewhere the state is low-seismicity (SDC A–B), so wind and snow drive lateral and roof design. Indiana's high tornado frequency makes us rigorous about roof uplift, connection capacity, and continuous load paths even where wind speeds are moderate. Ground snow loads are modest in the central and southern regions and higher near Lake Michigan, and we set footings below the roughly 30-to-36-inch frost line. Along river corridors, soft alluvial soils require careful foundation design coordinated with the geotechnical report. We design to the statewide Indiana Building Code — based on the 2012 IBC with amendments — and confirm the governing edition given Indiana's lag behind the model cycle.",
    civil:
      "Site engineering in Indiana is dominated by stormwater rule 327 IAC 15-5 (Rule 5), the state's construction stormwater program, which requires a permit and stormwater pollution prevention plan for sites disturbing an acre or more. Post-construction water-quality and detention requirements are enforced through local MS4 communities and county drainage boards, so we design detention basins and water-quality practices to satisfy both Rule 5 and local criteria. Indiana's flat terrain and clay soils create drainage challenges, and county surveyors and drainage boards hold authority over regulated drains and legal outlets — resolving the legal drain outlet early is essential. For the large warehouse and distribution sites that define Indiana's market, we plan grading, truck-court drainage, and detention to move big impervious areas efficiently while meeting state and local water-quality volumes.",
    energy:
      "Indiana's commercial energy code is state-adopted but older than most of the country, referencing an ASHRAE 90.1 / IECC vintage from around 2007–2010 with amendments. That gives us a uniform statewide compliance baseline, which we document through COMcheck or energy modeling, but the dated minimum means real savings come from designing above it. In climate zone 5A, envelope performance — continuous insulation, air-barrier continuity, and infiltration control — is the highest-value lever, followed by efficient heating plants and lighting controls. For the warehouse and manufacturing buildings central to Indiana's economy, high-bay lighting controls and efficient process heating drive the biggest operating-cost reductions. We also identify utility incentive programs that reward exceeding code, which helps justify above-minimum design on heating-dominated Indiana projects.",
  },
  faqs: [
    {
      q: "Do Indiana commercial projects need a state plan review?",
      a: "Yes for many projects. Indiana's Department of Homeland Security issues a Construction Design Release through statewide Plan Review before local permitting proceeds. Local building departments then handle inspections, so state release and local permits must be sequenced together.",
    },
    {
      q: "Which building and energy codes apply in Indiana?",
      a: "Indiana enforces a statewide building code based on the 2012 IBC with amendments and an energy code referencing an older ASHRAE 90.1/IECC vintage. Indiana lags the model code cycle, so we confirm the current adopted editions with the state and AHJ at the outset.",
    },
    {
      q: "Is seismic design required in Indiana?",
      a: "It depends on location. Most of Indiana is low-seismicity (SDC A–B), but southwestern Indiana near the Wabash Valley and New Madrid zones can reach SDC C or higher, where seismic detailing genuinely governs. We evaluate seismic design category per site.",
    },
    {
      q: "What stormwater rules govern Indiana site development?",
      a: "Indiana's Rule 5 (327 IAC 15-5) requires a construction stormwater permit and SWPPP for sites disturbing an acre or more. Local MS4 communities and county drainage boards add detention and water-quality requirements, and the legal drain outlet must be secured early.",
    },
  ],
};
