import type { StateData } from "../types";

export const rhodeIsland: StateData = {
  slug: "rhode-island",
  name: "Rhode Island",
  abbrev: "RI",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Rhode Island State Building Code (SBC-1) — statewide, based on the 2018 I-Codes",
    baseCode: "2018 IBC with Rhode Island amendments",
    notes:
      "Rhode Island enforces a single statewide building code administered by the State Building Code Commission; the commercial building code (SBC-1) is based on the 2018 IBC with state amendments. The code is uniform in every city and town, so the governing edition does not change between jurisdictions.",
  },
  energyCode: {
    commercial: "2018 IECC / ASHRAE 90.1-2016 (adopted as the Rhode Island energy code, SBC-8)",
    notes:
      "The commercial energy code is part of the statewide SBC series. Projects may follow either the 2018 IECC or ASHRAE 90.1-2016, with compliance shown through COMcheck or a whole-building performance model.",
    beyondCode:
      "Rhode Island's Act on Climate and aggressive renewable/efficiency programs (RI Energy incentives, Renewable Energy Growth) drive electrification and above-code performance on many commercial and public projects.",
  },
  climate: {
    zones: "5A statewide, with the coastal south and Narragansett Bay areas at the milder end of the cold-humid range",
    drivers: [
      "Cold, humid winters with substantial heating loads",
      "Coastal nor'easter wind and storm surge on Narragansett Bay and the ocean shore",
      "Humid summers requiring dehumidification",
      "Salt-air corrosion exposure on coastal equipment and structures",
    ],
  },
  structural: {
    seismic: "Seismic Design Category B, trending to C on soft bay-margin soils — moderate, with detailing attention for essential facilities",
    wind: "Basic wind speeds around 125–135 mph along the ocean and bay shoreline (Risk Category II), easing inland to ~115–120 mph",
    snow: "Ground snow loads generally 25–35 psf, among the lower New England values given the coastal moderation",
    other: "Frost depth ~3.5 ft; extensive VE/AE coastal flood zones and hurricane surge exposure; soft organic and bay-margin soils drive deep foundations near the water",
  },
  licensure: {
    board: "Rhode Island Board of Registration for Professional Engineers",
    notes:
      "Rhode Island grants licensure by comity and accepts NCEES records; digital seals with authentication are accepted for electronic submittals. Construction documents must be sealed by an RI-licensed PE for permit.",
  },
  metros: ["Providence", "Warwick", "Cranston", "Pawtucket", "Newport", "Woonsocket"],
  permitting:
    "Local building officials enforce the uniform statewide code, so procedures vary from small towns to Providence's more formal review. Coastal projects fall under CRMC (Coastal Resources Management Council) jurisdiction, which is a significant and Rhode-Island-specific approval track, and RIDEM regulates freshwater wetlands and stormwater. The state's small size means agency relationships and coordination move quickly relative to larger states.",
  marketNotes:
    "Rhode Island's construction market centers on Providence's healthcare, higher-education (Brown, URI, RISD), and life-science growth; Newport's tourism, defense, and marine sectors; and steady multifamily and adaptive reuse of the state's dense older mill and downtown stock. Offshore wind (Block Island and successor projects) has added marine and grid-interconnection engineering activity.",
  narratives: {
    mep:
      "MEP engineering in Rhode Island works a cold, humid Zone 5A climate moderated by Narragansett Bay, so heating loads are real but slightly softer than interior New England, while coastal humidity keeps dehumidification in focus. Our mechanical basis is the statewide 2018 IECC / ASHRAE 90.1-2016 energy code, and we shape the strategy around the state's Act on Climate together with RI Energy efficiency incentives, both of which reward heat pumps and heat/energy recovery. Salt air is a genuine design factor: rooftop and shoreline equipment needs corrosion-resistant coatings and hardware to survive the marine environment. Because the code is uniform statewide, our energy work focuses on performance and utility economics rather than edition-hunting. In Providence's healthcare and life-science buildings we design demanding lab and clinical ventilation with redundancy; in the adaptive-reuse mill stock we thread modern MEP systems through masonry and heavy-timber structures with limited chase space.",
    structural:
      "Rhode Island structural work is a coastal, moderate-seismic problem. Seismic is SDC B (trending to C on soft bay-margin soils), enough to warrant lateral detailing on essential and taller buildings. The defining challenge is the shore: ocean and bay wind speeds of 125–135 mph combine with extensive VE/AE flood zones and hurricane surge, so waterfront foundations, elevation, and uplift detailing govern much of the coastal work. Soft organic and bay-margin soils near Providence and along the shore frequently require deep foundations and settlement control. Snow is relatively modest at 25–35 psf thanks to coastal moderation. Designing under the SBC-1 (2018 IBC as amended), we set ~3.5 ft frost footings and, given how much of the state's work is mill reuse, run a careful check of the existing masonry and heavy-timber framing before we ask it to carry any new load.",
    civil:
      "Civil and site engineering in Rhode Island is dominated by coastal and water resources. The Coastal Resources Management Council (CRMC) holds broad, Rhode-Island-specific jurisdiction over shoreline development, and its approval is frequently the critical-path item for any project near the bay or ocean. RIDEM regulates freshwater wetlands and administers the construction stormwater general permit, with the Rhode Island Stormwater Design and Installation Standards Manual emphasizing low-impact development and water-quality treatment. Grading, storm systems, and utilities get laid out to satisfy municipal, RIDEM, and — where it applies — CRMC criteria at once, working around the ~3.5 ft frost depth and soft coastal soils, while the state's many brownfield and mill-redevelopment parcels add remediation and capping to the coordination list. In compact Providence-area parcels, underground detention and tight utility coordination usually determine site feasibility.",
    energy:
      "Rhode Island's energy path is the statewide SBC-8, which references the 2018 IECC and ASHRAE 90.1-2016, with compliance shown through COMcheck runs or a whole-building energy model. Because the code is uniform in every town, we concentrate on performance and on aligning with the state's Act on Climate trajectory rather than reconciling different editions. Against Rhode Island's cold, humid winters, the Zone 5A envelope leans on tight air-sealing, well-detailed continuous insulation, and strong glazing to hold performance, and the efficient mechanical answer increasingly runs through heat pumps and energy recovery — a shift that RI Energy incentives and the state's electrification goals only accelerate. For larger commercial, institutional, and public projects we model above minimum code to capture incentives and to hedge against tightening requirements, and we account for salt-air durability so that high-efficiency coastal equipment actually lasts.",
  },
  faqs: [
    {
      q: "Which building code is enforced in Rhode Island?",
      a: "Rhode Island enforces a single statewide code — the State Building Code (SBC-1) based on the 2018 IBC with state amendments — administered by the State Building Code Commission. It is uniform in every city and town, so the edition does not change between jurisdictions.",
    },
    {
      q: "Which energy code governs commercial construction in Rhode Island?",
      a: "The statewide energy code (SBC-8) references the 2018 IECC and ASHRAE 90.1-2016, and a project may comply under either — demonstrated with COMcheck or a whole-building model. The state's Act on Climate and RI Energy incentives push electrification and above-code performance.",
    },
    {
      q: "What is CRMC and when does it affect my project?",
      a: "The Coastal Resources Management Council has broad, Rhode-Island-specific jurisdiction over development near the shoreline, coastal wetlands, and Narragansett Bay. If your site is anywhere near the coast, CRMC approval is often the critical-path permit, so we address it early alongside RIDEM stormwater and wetlands review.",
    },
    {
      q: "What loads govern structural design on the Rhode Island coast?",
      a: "Coastal wind speeds of 125–135 mph combine with extensive VE/AE flood zones and hurricane surge, so waterfront foundations, flood elevation, and uplift detailing often govern. Soft bay-margin soils frequently require deep foundations. Snow is relatively modest at 25–35 psf, and seismic is SDC B trending to C on soft soils.",
    },
  ],
};
