import type { StateData } from "../types";

export const louisiana: StateData = {
  slug: "louisiana",
  name: "Louisiana",
  abbrev: "LA",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Louisiana State Uniform Construction Code (LSUCC), based on the 2021 IBC",
    baseCode: "2021 IBC with Louisiana amendments (statewide via the LSUCC Council)",
    notes:
      "Louisiana adopted a mandatory statewide construction code (LSUCC) after Hurricanes Katrina and Rita, administered by the Louisiana State Uniform Construction Code Council. The code moved to the 2021 IBC base, so the governing edition is comparatively uniform statewide, though local jurisdictions handle enforcement and inspection.",
  },
  energyCode: {
    commercial: "2021 IECC / ASHRAE 90.1-2019 (adopted as part of the LSUCC commercial provisions)",
    notes:
      "Commercial energy provisions follow the IECC edition incorporated into the LSUCC, with ASHRAE 90.1 as an alternate compliance path. Statewide adoption creates a consistent commercial baseline across parishes.",
  },
  climate: {
    zones: "2A (hot-humid) across the southern parishes and New Orleans; 3A in the north",
    drivers: [
      "Extreme humidity and latent cooling loads year-round",
      "Hurricane and Gulf storm-surge exposure",
      "High water table and near-sea-level flood elevations",
      "Mold and moisture management as a life-of-building concern",
    ],
  },
  structural: {
    seismic: "Very low seismicity — Seismic Design Category A across most of the state; seismic rarely governs",
    wind: "Hurricane-driven design is the controlling load: coastal and southern parishes see basic wind speeds of 130–150+ mph with strict windborne-debris and wind-borne pressure requirements",
    snow: "Negligible ground snow loads statewide",
    other: "Widespread flood/FEMA base-flood-elevation requirements, soft compressible soils and high water tables driving deep foundations, and subsidence across the coastal zone",
  },
  licensure: {
    board: "Louisiana Professional Engineering and Land Surveying Board (LAPELS)",
    notes: "Louisiana grants licensure by comity for qualified out-of-state PEs and requires a Certificate of Authorization for firms. Digital seals are accepted on electronic submittals per board rules.",
  },
  metros: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles", "Metairie"],
  permitting:
    "The statewide LSUCC gives Louisiana a more predictable code baseline than home-rule states, but parish and municipal offices administer plan review, and coastal projects layer in floodplain management, elevation certificates, and — in New Orleans — historic-district and drainage constraints. Hurricane-recovery experience has made local reviewers demanding on wind and flood detailing.",
  marketNotes:
    "Louisiana's construction market is shaped by Gulf Coast industry — LNG export terminals, petrochemical plants along the river corridor, and port infrastructure — plus healthcare, higher education, and ongoing hurricane-resilience rebuilding. Insurance and elevation requirements heavily influence coastal commercial feasibility.",
  narratives: {
    mep:
      "In Louisiana, MEP design is dominated by moisture. In the hot-humid climate zone 2A that covers New Orleans and the southern parishes, latent load frequently exceeds sensible load, so dehumidification is a first-order design decision, not an afterthought — we specify systems that pull humidity down and hold building pressurization positive to keep humid outdoor air from driving mold and envelope decay. Continuous mechanical dehumidification, tight duct sealing, and careful condensate management are baseline. The other Louisiana reality is storm resilience: standby power, elevated or hardened electrical rooms above base flood elevation, and equipment placement that survives surge and wind are routine on coastal projects. Because commercial energy provisions follow the IECC edition in the LSUCC with ASHRAE 90.1 as an alternate, our documentation matches that adopted baseline. The combination of extreme humidity and hurricane exposure makes Louisiana MEP unlike design almost anywhere else in the country.",
    structural:
      "Structural engineering in Louisiana is a wind-and-water problem in which seismic barely registers. Most of the state sits in Seismic Design Category A, so lateral design is governed by hurricane wind — coastal and southern parishes design to 130–150+ mph with rigorous windborne-debris protection, continuous load paths, and roof-uplift detailing that reflect hard lessons from Katrina, Rita, Laura, and Ida. Below grade, the challenge is the ground itself: soft, compressible delta soils, high water tables, and ongoing coastal subsidence mean shallow foundations rarely work for anything substantial. We routinely design driven piles or auger-cast piles, coordinated with a geotechnical report that anticipates settlement and buoyancy. Flood elevation drives the whole structural datum, so lowest-floor and equipment elevations are set to base flood elevation plus freeboard. The design mindset is survivability: the frame must resist a hurricane while sitting on soils that want to move.",
    civil:
      "Civil engineering in Louisiana is a fight against water on every front — from above, from the Gulf, and from below. Much of the developed state lies at or near sea level behind levees and pump systems, so drainage design must account for the fact that gravity conveyance often gives way to pumped systems, and finished-floor elevations are set by FEMA base flood elevation plus local freeboard. In New Orleans especially, subsidence and a high water table complicate grading, utility depth, and detention. We design stormwater and site grading to parish criteria while integrating flood mitigation, and coordinate LDEQ construction stormwater permitting and SWPPP requirements for disturbances over an acre. Soft soils also shape pavement and underground utility design, frequently requiring subgrade improvement. The governing question on nearly every Louisiana site is not where the water goes, but how it gets there when the ground is flat and wet.",
    energy:
      "Louisiana folds its commercial energy requirements into the statewide LSUCC, following the adopted IECC edition (aligned with the 2021 IECC / ASHRAE 90.1-2019 provisions) with ASHRAE 90.1 available as an alternate compliance path. The statewide structure means the enforced energy baseline is consistent parish to parish, which simplifies compliance planning. In the hot-humid Gulf climate, the highest-value strategies are aggressive control of latent load and solar heat gain: low-SHGC glazing, continuous air-sealing to stop humid infiltration, and right-sized, dehumidification-capable cooling plants return far more than piling on roof insulation. We prepare COMcheck or whole-building energy models against the adopted edition and coordinate envelope, mechanical, and lighting compliance together — with special attention to the moisture-control detailing that both the energy code and Louisiana's climate demand.",
  },
  faqs: [
    {
      q: "Does Louisiana have a statewide building code?",
      a: "Yes. The Louisiana State Uniform Construction Code (LSUCC), adopted after Hurricanes Katrina and Rita, sets a mandatory statewide baseline built on the 2021 IBC with amendments. Parishes and municipalities administer plan review and inspection, but the code edition is consistent statewide.",
    },
    {
      q: "What wind loads govern Louisiana commercial design?",
      a: "Hurricane wind governs lateral design across the state. Coastal and southern parishes design to basic wind speeds of roughly 130–150+ mph with strict windborne-debris protection and continuous load-path detailing; seismic is minimal since most of Louisiana is Seismic Design Category A.",
    },
    {
      q: "Do I need deep foundations for a Louisiana project?",
      a: "Often, yes. Soft compressible delta soils, high water tables, and coastal subsidence mean many commercial buildings require driven or auger-cast piles rather than shallow foundations, designed to the project geotechnical report to control settlement and buoyancy.",
    },
    {
      q: "How does flood elevation affect building design in Louisiana?",
      a: "Significantly. FEMA base flood elevation plus local freeboard sets the lowest-floor and equipment elevations on most sites. We elevate or harden electrical and mechanical equipment, design pumped drainage where gravity conveyance is impractical, and set the structural datum to survive surge and flooding.",
    },
  ],
};
