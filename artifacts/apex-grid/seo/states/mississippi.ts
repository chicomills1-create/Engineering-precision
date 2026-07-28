import type { StateData } from "../types";

export const mississippi: StateData = {
  slug: "mississippi",
  name: "Mississippi",
  abbrev: "MS",
  buildingCode: {
    name: "Locally adopted International Building Code (statewide minimum in coastal counties; editions vary elsewhere)",
    baseCode: "IBC with local adoption; statewide commercial baseline is limited, with mandatory codes concentrated in the coastal region",
    notes:
      "Mississippi has historically been a home-rule state for building codes, with the strongest mandatory requirements — including wind and flood provisions — concentrated in the six coastal counties after Hurricane Katrina. Inland, adoption and editions vary by municipality, so the governing IBC edition must be confirmed with the specific jurisdiction.",
  },
  energyCode: {
    commercial: "IECC-based commercial energy provisions where adopted locally; the state has referenced the 2018 IECC / ASHRAE 90.1 for public and state-funded buildings",
    notes:
      "Commercial energy code enforcement varies by jurisdiction. State-funded and public buildings follow adopted IECC provisions, while private commercial energy compliance depends on local adoption, so documentation must target the enforced edition.",
  },
  climate: {
    zones: "2A (hot-humid) along the Gulf Coast, 3A across the rest of the state",
    drivers: [
      "High humidity and latent cooling loads statewide",
      "Hurricane and Gulf storm-surge exposure on the coast",
      "Heavy rainfall and severe convective storms inland",
      "Expansive Yazoo clay in the central corridor",
    ],
  },
  structural: {
    seismic: "Elevated in the northwest — New Madrid Seismic Zone influence raises hazard toward Seismic Design Category C near the Mississippi River corner; low (SDC A–B) elsewhere",
    wind: "Hurricane-governed on the coast, with basic wind speeds of 130–150+ mph and strict windborne-debris requirements in the six coastal counties; ~105–115 mph inland",
    snow: "Negligible ground snow loads statewide",
    other: "Expansive Yazoo clay across central Mississippi drives foundation design; extensive Delta flood exposure and soft alluvial soils in the northwest",
  },
  licensure: {
    board: "Mississippi Board of Licensure for Professional Engineers and Surveyors (PEPLS)",
    notes: "Mississippi grants licensure by comity for qualified out-of-state PEs and requires a Certificate of Authority for firms. Electronic seals are accepted per board rules.",
  },
  metros: ["Jackson", "Gulfport", "Biloxi", "Hattiesburg", "Southaven", "Tupelo"],
  permitting:
    "Permitting is bifurcated: the six coastal counties enforce robust wind and flood provisions with formal plan review born of Katrina recovery, while many inland jurisdictions administer lighter or variable code programs. Coastal projects layer in FEMA elevation certificates and windstorm detailing; the governing code and energy edition should be confirmed jurisdiction by jurisdiction.",
  marketNotes:
    "Mississippi's construction market spans Gulf Coast tourism, gaming, and port/industrial work; healthcare and higher education around Jackson; and fast-growing logistics and residential development in DeSoto County within the Memphis metro. Advanced manufacturing and Gulf shipbuilding provide steady industrial demand.",
  narratives: {
    mep:
      "MEP design across Mississippi is governed by humidity — the entire state sits in hot-humid climate zones 2A and 3A, so latent cooling load and moisture control drive mechanical decisions from the coast to the north. We prioritize dehumidification, positive building pressurization, and vapor-aware envelope coordination because condensation and mold are chronic risks in this climate. On the Gulf Coast, storm resilience adds another layer: standby power, elevated electrical rooms above base flood elevation, and equipment placement that survives surge and hurricane wind are routine on coastal work. Because commercial energy adoption varies by jurisdiction, we confirm the enforced IECC edition before finalizing HVAC, lighting, and plumbing documentation, defaulting to the recent IECC/ASHRAE 90.1 provisions used for state and public buildings. The through-line for Mississippi MEP is that humidity, not peak temperature, is usually the hardest thing to design around.",
    structural:
      "Structural engineering in Mississippi splits along two very different hazard maps. On the Gulf Coast, hurricane wind rules: the six coastal counties enforce 130–150+ mph design with windborne-debris protection and continuous load paths, a direct legacy of Katrina. In the northwest corner, the New Madrid Seismic Zone raises seismic demand toward Seismic Design Category C, so projects near the Mississippi River need ductile detailing and drift control that most of the state can ignore. Between those extremes, the central corridor's Yazoo clay — some of the most expansive soil in the region — makes foundation design a geotechnical exercise, with post-tensioned slabs, drilled piers, and moisture-control detailing driven by the soils report. We set each project's structural basis by its location, because a coastal, a Delta, and a central-Mississippi site are three different design problems.",
    civil:
      "Civil and site engineering in Mississippi manages heavy rainfall, flat terrain, and difficult soils. The Delta and river corridors carry extensive FEMA flood exposure and soft alluvial soils, while central Mississippi's Yazoo clay complicates grading, pavement, and utility design well beyond drainage alone. We design detention and conveyance to local criteria sized for the region's intense storms, integrate floodplain and elevation requirements on affected sites, and coordinate MDEQ construction stormwater permitting and SWPPP documentation for disturbances over an acre. On the coast, drainage design must anticipate surge, high tailwater, and strict local standards. Because code and stormwater administration vary by jurisdiction, we confirm each city's or county's published criteria at the outset and design grading, drainage, and utilities to that specific standard rather than a generic template.",
    energy:
      "Energy compliance in Mississippi is a jurisdiction-mapping exercise, since commercial energy-code adoption varies locally and the strongest mandates apply to state-funded and public buildings. We confirm the enforced IECC edition before selecting a compliance path, defaulting to the recent IECC / ASHRAE 90.1 provisions where the AHJ has adopted them. In the hot-humid climate that covers the whole state, the highest-value strategies mirror the rest of the Gulf South: low-SHGC glazing, tight air-sealing to control humid infiltration, and right-sized, dehumidification-capable cooling plants return far more than a thicker roof assembly. Whether the deliverable is a COMcheck report or a full building-performance model, we tie it to whatever edition the AHJ actually enforces and treat envelope, mechanical, and lighting as a single coordinated submission — folding in the moisture-control detailing that Mississippi's climate insists on no matter which code cycle happens to be adopted.",
  },
  faqs: [
    {
      q: "Does Mississippi have a statewide building code?",
      a: "Not uniformly. The strongest mandatory provisions — including wind and flood requirements — apply in the six Gulf Coast counties after Hurricane Katrina. Inland adoption and IBC editions vary by municipality, so we confirm the governing code with the specific jurisdiction before design.",
    },
    {
      q: "What wind requirements apply on the Mississippi Gulf Coast?",
      a: "Along the six coastal counties, design ultimate wind speeds in the 130–150+ mph range govern, paired with mandatory windborne-debris protection and unbroken load paths from roof to foundation. Move inland and those speeds ease to roughly 105–115 mph.",
    },
    {
      q: "Is seismic design a concern anywhere in Mississippi?",
      a: "Yes, in the northwest. New Madrid Seismic Zone influence raises hazard toward Seismic Design Category C near the Mississippi River corner, requiring ductile detailing. Most of the rest of the state falls to a low SDC A–B baseline.",
    },
    {
      q: "How does Yazoo clay affect foundation design?",
      a: "Central Mississippi's Yazoo clay is highly expansive and drives foundation systems — commonly post-tensioned slabs, drilled piers, and moisture-control detailing — designed to the project geotechnical report to manage the swell-and-shrink cycles.",
    },
  ],
};
