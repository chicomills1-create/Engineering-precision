import type { StateData } from "../types";

export const hawaii: StateData = {
  slug: "hawaii",
  name: "Hawaii",
  abbrev: "HI",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Hawaii State Building Code (based on the 2018 IBC), adopted and administered by each county",
    baseCode: "2018 IBC with state and county amendments",
    notes:
      "Hawaii establishes a State Building Code (built on the 2018 IBC) through the State Building Code Council, but the four counties — Honolulu, Hawaii, Maui, and Kauai — adopt and enforce it with their own amendments and on their own schedules. As a result the effective edition and local amendments vary by county, so the governing code must be confirmed with the specific county building department.",
  },
  energyCode: {
    commercial:
      "Hawaii Energy Conservation Code (based on the IECC, adopted through the State Building Code and county process) with ASHRAE 90.1 available as a referenced alternate",
    notes:
      "The energy code is adopted through the state/county code process, so the effective edition varies by county. Hawaii's uniquely high electricity costs make energy performance a strong economic driver well beyond code minimums.",
    beyondCode:
      "Hawaii has aggressive clean-energy goals (a statutory target of 100% renewable electricity by 2045) that shape utility programs, solar/PV integration, and demand-side incentives influencing commercial design.",
  },
  climate: {
    zones: "1A (very hot, humid) across most coastal and lowland areas; higher-elevation zones on the Big Island and Maui volcanoes reach cool and even alpine conditions (up to zones 3–4 and colder on the summits)",
    drivers: [
      "Hot, humid tropical climate with year-round cooling and dehumidification",
      "Persistent salt-laden marine air driving corrosion protection",
      "Trade winds enabling natural ventilation strategies",
      "Extreme microclimate variation from sea level to volcanic summits",
    ],
  },
  structural: {
    seismic:
      "Elevated seismic hazard, especially on the Big Island (Hawaii County) where volcanic and tectonic activity drives higher Seismic Design Categories; Oahu and the other islands are moderate but not negligible",
    wind: "Hurricane and high-trade-wind exposure — design wind speeds are high (Hawaii is a hurricane-prone region), and wind uplift and wind-borne considerations govern roofs and cladding",
    snow: "Negligible except on the highest volcanic summits (Mauna Kea, Mauna Loa, Haleakala) where it is irrelevant to virtually all construction",
    other: "Volcanic hazards (lava flow zones, ashfall, vog) on the Big Island, tsunami inundation zones along all coasts, expansive and organic soils, and high water tables in coastal areas",
  },
  licensure: {
    board: "Hawaii Board of Professional Engineers, Architects, Surveyors and Landscape Architects (within DCCA)",
    notes:
      "Hawaii licenses engineers by comity and recognizes NCEES records; the board accepts electronic seals and digital signatures meeting its authentication requirements for electronic submittals.",
  },
  metros: ["Honolulu", "Pearl City", "Hilo", "Kailua-Kona", "Kahului", "Lihue"],
  permitting:
    "Permitting is county-administered and can be lengthy — Honolulu in particular is known for extended plan-review timelines. Coastal projects trigger Special Management Area (SMA) review under the Coastal Zone Management program, tsunami-zone and shoreline setback rules apply along the coasts, and Big Island projects must account for lava-flow hazard zoning. Logistics and material import add cost and schedule pressure.",
  marketNotes:
    "Hawaii's construction market is driven by tourism and hospitality, military and federal installations (heavily concentrated on Oahu), healthcare, and a chronically tight housing market. High construction and energy costs, island logistics, and strong renewable-energy policy shape nearly every commercial project.",
  narratives: {
    mep:
      "MEP engineering in Hawaii is a hot-humid tropical discipline where cooling and dehumidification run year-round, but the state's uniquely high electricity costs make energy efficiency an economic imperative far beyond code — every kilowatt-hour is expensive, so right-sized, high-efficiency cooling and aggressive controls pay back fast. We design for latent-load management and mold prevention in persistent humidity, and we exploit reliable trade winds with natural and mixed-mode ventilation where building type allows. Salt-laden marine air is relentless, so we specify corrosion-resistant equipment, coatings, and coil treatments as a baseline, not an upgrade. Because the energy code is adopted county-by-county, we confirm the effective edition per county and then design past it, integrating rooftop PV and demand management in line with Hawaii's 100%-renewable-by-2045 policy and the utility programs that support it. Island logistics reward equipment selections that local crews can maintain.",
    structural:
      "Structural design in Hawaii balances wind, seismic, and volcanic realities that differ sharply by island. Hawaii is a hurricane-prone region, so high design wind speeds and uplift govern roofs and cladding statewide, and we detail connections and load paths accordingly. Seismic hazard is elevated — especially on the Big Island, where volcanic and tectonic activity pushes higher Seismic Design Categories — so we design ductile systems and coordinate with geotechnical engineers on site-specific ground motion. Along every coastline, tsunami inundation zones influence occupancy, egress, and foundation strategy, and Big Island sites must respect lava-flow hazard zoning. Corrosion is a structural concern too: marine air attacks exposed steel and connectors, so we specify appropriate galvanizing, stainless, or coatings. We confirm the county's adopted code and amendments first, since the four counties administer the State Building Code independently.",
    civil:
      "Civil engineering in Hawaii is shaped by coasts, tropical rainfall, and county-specific regulation. Coastal sites trigger Special Management Area (SMA) review under the Coastal Zone Management program, plus shoreline setbacks and tsunami-zone rules that govern grading and finished elevations. Intense tropical downpours and steep volcanic terrain drive stormwater design toward robust conveyance and water-quality treatment, and NPDES construction stormwater permitting applies to regulated disturbances; erosion control matters greatly on erodible volcanic and organic soils. On the Big Island, lava-flow hazard zones and young volcanic substrates complicate infiltration, foundations, and utility routing. High water tables and reef-adjacent water quality push us toward careful treatment before discharge. Because material import and island logistics are expensive, we design efficient earthwork and reuse on-site material where feasible, and we resolve SMA and stormwater constraints early since they strongly affect developable area.",
    energy:
      "Hawaii's commercial energy code — the IECC-based Hawaii Energy Conservation Code with ASHRAE 90.1 as a referenced alternate — is adopted through the state and county process, so the effective edition varies by county and must be confirmed. But code is only the floor here: Hawaii has the highest electricity prices in the nation and a statutory goal of 100% renewable electricity by 2045, so energy performance is driven by economics and policy as much as compliance. In the 1A tropical climate the biggest levers are cooling efficiency, low-SHGC glazing, shading, trade-wind-driven ventilation, and tight controls, since cooling dominates the load. We integrate rooftop PV, battery storage, and demand management aligned with utility programs, and we model compliance with COMcheck or a 90.1 energy model while designing well beyond minimum to cut the operating cost that owners feel acutely in Hawaii.",
  },
  faqs: [
    {
      q: "Which building code applies to my Hawaii project?",
      a: "Hawaii has a State Building Code based on the 2018 IBC, but the four counties — Honolulu, Hawaii, Maui, and Kauai — adopt and enforce it with their own amendments and schedules. So the effective edition and local amendments vary by county. We confirm the governing code with the specific county building department at project start.",
    },
    {
      q: "How does Hawaii's energy code and energy cost affect design?",
      a: "The Hawaii Energy Conservation Code (IECC-based, with ASHRAE 90.1 as an alternate) is adopted county-by-county, so the edition varies. More importantly, Hawaii has the nation's highest electricity prices and a 100%-renewable-by-2045 goal, so we design well beyond code — high-efficiency cooling, shading, PV, and controls — because operating cost and policy drive far more than the code minimum.",
    },
    {
      q: "What wind and seismic loads govern in Hawaii?",
      a: "Hawaii is a hurricane-prone region, so high design wind speeds and uplift govern roofs and cladding statewide. Seismic hazard is elevated too, especially on the Big Island where volcanic and tectonic activity drives higher Seismic Design Categories. We design ductile lateral systems and robust wind connections, and we coordinate site-specific seismic with the geotechnical engineer.",
    },
    {
      q: "What site and permitting hurdles are unique to Hawaii?",
      a: "Coastal projects trigger Special Management Area (SMA) review, shoreline setbacks, and tsunami-zone rules; Big Island sites must account for lava-flow hazard zoning; and corrosion from salt air is pervasive. County permitting (Honolulu especially) can be lengthy, and island logistics raise cost and schedule. We resolve SMA, stormwater, and hazard constraints early because they strongly affect feasibility and developable area.",
    },
  ],
};
