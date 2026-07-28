import type { StateData } from "../types";

export const alaska: StateData = {
  slug: "alaska",
  name: "Alaska",
  abbrev: "AK",
  buildingCode: {
    name: "No mandatory statewide building code for general private construction — adoption and enforcement are local (Anchorage and other municipalities enforce recent IBC editions)",
    baseCode: "IBC with local amendments where adopted; the state applies codes to state-owned and certain public buildings",
    notes:
      "Alaska has no statewide building code mandate for general private construction; the state adopts codes for public and state-owned buildings and administers specific programs (fire/life-safety through the State Fire Marshal), while municipalities decide local adoption. The Municipality of Anchorage, Fairbanks, and Juneau enforce recent IBC editions with local amendments, but vast unorganized-borough areas have no local building code — so applicability and edition must be confirmed with the specific jurisdiction.",
  },
  energyCode: {
    commercial:
      "No statewide mandatory commercial energy code for private buildings; where adopted (e.g., Anchorage) codes reference recent IECC/ASHRAE 90.1 editions, and public/state buildings follow adopted energy standards",
    notes:
      "Commercial energy compliance is largely local or program-driven. State and publicly funded projects follow adopted energy standards, and AHFC (Alaska Housing Finance Corporation) programs promote high-performance building; private projects in unregulated areas rely on lender or owner standards.",
  },
  climate: {
    zones: "7 across much of the state (Anchorage, Fairbanks), reaching zone 8 (subarctic/arctic) in the far north around the North Slope; milder 6/7 in the Southeast panhandle and maritime coast",
    drivers: [
      "Extreme cold and one of the most heating-dominated climates in the U.S.",
      "Permafrost across much of the interior and north, driving specialized foundations",
      "Very short days and long heating seasons",
      "Seismic hazard among the highest in the nation",
    ],
  },
  structural: {
    seismic:
      "Among the most seismically active regions in the United States — much of southcentral and coastal Alaska is high-seismic (Seismic Design Category D and higher), with the 1964 Great Alaska Earthquake (M9.2) and the 2018 Anchorage earthquake defining the design reality",
    wind: "Basic wind speeds vary widely; the southeast panhandle and Aleutians see high maritime winds, while interior valleys are more sheltered — site-specific exposure matters",
    snow: "Ground snow loads are very high and highly local — commonly 40–70+ psf and far higher in mountain and maritime snow belts (Valdez and the southeast see extreme loads); snow frequently governs roof design",
    other: "Permafrost, seasonal frost heave, deep frost penetration, and volcanic/tsunami hazards along the coast dominate the geotechnical and site picture",
  },
  licensure: {
    board: "Alaska State Board of Registration for Architects, Engineers and Land Surveyors (AELS)",
    notes:
      "Alaska grants comity licensure to NCEES-record engineers and accepts digital signatures and electronic seals meeting the board's authentication rules; arctic-engineering competency is emphasized for cold-region work.",
  },
  metros: ["Anchorage", "Fairbanks", "Juneau", "Wasilla", "Sitka", "Kenai"],
  permitting:
    "Permitting varies enormously: the Municipality of Anchorage runs a full building department with high-seismic and cold-climate review, Fairbanks and Juneau enforce local codes, but large unorganized-borough regions have no local building code at all. Logistics — barge and air freight, short construction seasons, and remote-site access — are as decisive as regulatory review, and floodplain, coastal, and permafrost considerations frequently gate feasibility.",
  marketNotes:
    "Alaska's construction market is driven by oil and gas (North Slope and Cook Inlet), federal and military installations, fisheries and port infrastructure, healthcare, and tourism. The extreme climate, seismic hazard, and remote logistics make experienced cold-region engineering essential, and short building seasons put a premium on efficient, well-coordinated design.",
  narratives: {
    mep:
      "MEP engineering in Alaska is arctic engineering: with much of the state in climate zone 7 and the North Slope in zone 8, heating design, freeze protection, and reliable redundancy are life-safety issues, not comfort niceties. We design heating plants for prolonged extreme cold, protect every water line and coil against freezing, and specify heat-recovery ventilation because tempering subzero outdoor air without it is prohibitively costly. Remote and off-grid sites drive fuel-oil and district-heating strategies, robust generator backup, and systems that a small local crew can service through a long winter. Because most private construction has no statewide energy code, we design to Anchorage's adopted code where it applies, to AHFC high-performance standards on funded work, or to owner and lender standards elsewhere. Short construction seasons and barge/air freight logistics push us toward prefabrication and tightly coordinated mechanical rooms.",
    structural:
      "Alaska is the highest-seismic state we serve, and structural design here is dominated by earthquake demand: the 1964 M9.2 Great Alaska Earthquake remains one of the largest ever recorded, and the 2018 Anchorage event was a recent reminder that southcentral and coastal Alaska routinely require Seismic Design Category D-and-higher detailing. We design ductile lateral systems and coordinate closely with geotechnical engineers on liquefaction and slope stability. The second defining challenge is permafrost: across the interior and north, thaw-sensitive frozen ground demands specialized foundations — thermosyphons, adjustable/elevated foundations, thermal piles, and insulated gravel pads — to keep the ground frozen and prevent settlement. Snow loads are extreme and intensely local, exceeding 70 psf in maritime and mountain belts, so snow frequently governs roofs. We treat seismic, permafrost, and snow as co-equal governing constraints, confirming the AHJ and adopted code first.",
    civil:
      "Civil and site engineering in Alaska is defined by frozen ground, extreme cold, and logistics. On permafrost, we protect the thermal regime — insulated pads, elevated grades, and drainage that avoids thawing frozen soils — because thaw settlement can destroy a site. Stormwater and utility design contend with deep frost, freeze-up, and short thaw seasons, and coastal projects add tsunami, storm-surge, and erosion hazards to grading and outfall design. Where no local building code exists, floodplain management, coastal-zone rules, on-site wastewater, and access become the primary regulatory drivers, and permitting through state and federal agencies (including wetlands and ANILCA-related considerations) can dominate schedule. Remote-site logistics — barge windows, ice roads, air freight — shape material selection and construction sequencing as much as any code. We plan grading, drainage, and access around the thermal and seasonal realities from the start.",
    energy:
      "Alaska has no statewide mandatory energy code for general private construction, so commercial energy compliance is local or program-driven: Anchorage enforces an adopted code, state and publicly funded work follows adopted energy standards, and AHFC programs push high performance, while remote private projects default to lender or owner targets. Regardless of the regulatory path, the engineering answer in a zone 7/8 climate is emphatic — the envelope is everything. Super-insulated walls and roofs, continuous air barriers, thermal-break detailing, triple glazing, and heat-recovery ventilation are standard practice, because heating is the overwhelming annual load and every uncontrolled infiltration path costs dearly. We model to the applicable code or AHFC standard and design well beyond minimums, since in the Alaskan climate envelope investment and airtightness pay for themselves quickly in fuel savings and durability.",
  },
  faqs: [
    {
      q: "Does Alaska have a statewide building code?",
      a: "Not for general private construction. The state applies codes to state-owned and public buildings and runs fire/life-safety programs, but municipalities decide local adoption. Anchorage, Fairbanks, and Juneau enforce recent IBC editions with local amendments, while large unorganized-borough areas have no local building code. We confirm applicability and edition with the specific jurisdiction.",
    },
    {
      q: "How does seismic design affect projects in Alaska?",
      a: "Heavily. Alaska is among the most seismically active regions in the U.S.; the 1964 M9.2 earthquake and the 2018 Anchorage event define the design reality, and much of southcentral and coastal Alaska requires Seismic Design Category D-and-higher detailing with liquefaction and slope coordination. We treat seismic as a governing constraint alongside snow and permafrost.",
    },
    {
      q: "What foundation approaches work on permafrost?",
      a: "The goal is to preserve the frozen thermal regime and avoid thaw settlement. Common solutions include elevated or adjustable foundations, thermal (thermosyphon) piles, insulated gravel pads, and drainage designed to keep water away from frozen soils. The approach is driven by the geotechnical and thermal investigation, which we treat as the governing document for interior and northern sites.",
    },
    {
      q: "Is there an energy code for commercial buildings in Alaska?",
      a: "Only locally or by program. Anchorage enforces an adopted code, state and publicly funded projects follow adopted energy standards, and AHFC promotes high-performance construction; remote private projects often rely on lender or owner standards. In Alaska's zone 7/8 climate we design envelope-first regardless — super-insulation, airtightness, and heat recovery — because heating dominates annual energy use.",
    },
  ],
};
