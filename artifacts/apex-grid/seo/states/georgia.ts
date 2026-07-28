import type { StateData } from "../types";

export const georgia: StateData = {
  slug: "georgia",
  name: "Georgia",
  abbrev: "GA",
  buildingCode: {
    name: "Georgia State Minimum Standard Codes (International Building Code with Georgia amendments)",
    baseCode: "2018 IBC with Georgia state amendments (adopted statewide by DCA)",
    notes:
      "Georgia enforces a mandatory statewide code — the Georgia State Minimum Standard Codes, adopted and amended by the Department of Community Affairs — currently built on the 2018 IBC with annual Georgia amendments. Local governments enforce and administer the code but cannot adopt a weaker edition, giving Georgia a uniform commercial baseline.",
  },
  energyCode: {
    commercial: "Georgia State Minimum Standard Energy Code — the 2015 IECC with Georgia Supplements and Amendments (Georgia-amended, with ASHRAE 90.1 as an alternate path)",
    notes:
      "Georgia adopts an amended IECC as its statewide energy code (the 2015 IECC with substantial Georgia supplements), applied uniformly by DCA. ASHRAE 90.1 remains an accepted alternate compliance path for commercial buildings.",
  },
  climate: {
    zones: "2A (hot-humid) in the south, 3A across the middle including Atlanta, 4A in the north Georgia mountains",
    drivers: [
      "High humidity and latent cooling loads across the state",
      "Long cooling seasons in the Atlanta metro and south",
      "Hurricane and tropical exposure on the coast (Savannah)",
      "Real winter heating loads in the north Georgia mountains",
    ],
  },
  structural: {
    seismic: "Low to moderate — generally Seismic Design Category A–B, with modestly elevated hazard in the north near the eastern-Tennessee seismic influence",
    wind: "Hurricane-influenced on the coast (Chatham/Savannah) at 120–140+ mph; ~105–115 mph inland",
    snow: "Low ground snow loads across most of the state; modest loads in the north Georgia mountains",
    other: "Piedmont residual soils and expansive clays affect foundations; coastal flood/FEMA elevation requirements around Savannah; heavy rainfall and erosion-prone red clay",
  },
  licensure: {
    board: "Georgia State Board of Registration for Professional Engineers and Land Surveyors",
    notes: "Georgia grants licensure by comity for NCEES-record engineers and requires a Certificate of Authorization for firms. Electronic seals are accepted per board rules.",
  },
  metros: ["Atlanta", "Savannah", "Augusta", "Columbus", "Macon", "Athens"],
  permitting:
    "Georgia's mandatory statewide code makes the governing edition predictable, but the Atlanta metro's many jurisdictions each run their own plan review, and coastal Savannah adds windstorm and FEMA floodplain requirements. Metro Atlanta's growth has stretched review capacity, and stormwater/tree-ordinance compliance is a recurring focus in local site review.",
  marketNotes:
    "Georgia's construction market is powered by metro Atlanta — corporate relocations, film-industry infrastructure, healthcare, and one of the nation's largest data-center corridors — plus the fast-growing Port of Savannah driving massive logistics and industrial development. EV and battery manufacturing megaprojects add significant statewide demand.",
  narratives: {
    mep:
      "MEP engineering in Georgia spans a wide humidity-and-temperature range, from the hot-humid zone 2A of the south to the cooler zone 4A of the north Georgia mountains, but latent-load management is the common thread nearly everywhere. We prioritize dehumidification and vapor-aware envelope coordination in Atlanta's long cooling seasons and the humid south, while the northern mountains justify more heating capacity and freeze protection. Georgia's booming data-center corridor shapes a large share of our work — extreme cooling density, redundant power, and high-reliability mechanical systems drive those designs, and right-sized electrical service against Georgia Power's rate structures matters to operating cost. Because Georgia adopts an amended IECC statewide, our HVAC, lighting, and plumbing documentation targets that Georgia-amended edition with ASHRAE 90.1 as an alternate path. The statewide code uniformity simplifies compliance even as the climate varies from Savannah to the Blue Ridge.",
    structural:
      "Georgia structural design ranges from coastal hurricane exposure to Piedmont soil challenges. On the coast around Savannah, wind climbs to 120–140+ mph with windborne-debris and FEMA flood-elevation requirements, while inland projects design to a more moderate ~110 mph. Seismic is generally low (SDC A–B), with a slight northern bump from eastern-Tennessee influence. The bigger structural variable across the populous Piedmont is the ground: residual soils and expansive clays over weathered bedrock produce variable bearing and require foundation systems — spread footings, drilled piers, or deepened elements — driven by the geotechnical report. The heavy red-clay soils also complicate earthwork moisture control. We set the lateral design by coastal-versus-inland exposure and let subsurface conditions govern foundations, tuning each project to the Georgia-amended code that applies uniformly statewide.",
    civil:
      "Civil and site engineering in Georgia is dominated by stormwater and erosion control on erosive red-clay soils. The state's Erosion and Sedimentation Control program and the Georgia Stormwater Management Manual (the 'Blue Book') set demanding standards, and metro-Atlanta jurisdictions layer on water-quality, detention, and tree-protection ordinances that can reshape a site plan. We design detention and conveyance to the applicable local criteria and Blue Book methodology, sized for Georgia's intense rainfall, and integrate FEMA floodplain and coastal requirements around Savannah. Sites disturbing an acre or more require Georgia EPD construction stormwater (NPDES) permit coverage and a comprehensive erosion-control plan — erosion control is enforced aggressively here given the red clay's tendency to move. For the port-driven logistics and data-center megaprojects, large-site grading, detention, and heavy-utility design are central to entitlement.",
    energy:
      "Georgia enforces a statewide amended energy code — the Georgia State Minimum Standard Energy Code, built on the IECC with substantial Georgia supplements — applied uniformly by DCA, with ASHRAE 90.1 offered as an alternate route. Because DCA sets one baseline for the whole state, a project's compliance target does not shift from county to county. Georgia's warm, humid climate steers the design toward blocking the sun and the moisture: shading and low-SHGC glazing, plus a well-sealed envelope, pay back faster than piling on roof R-value across the south and metro Atlanta, whereas the north Georgia mountains earn back thicker insulation through their genuine winter demand. Cooling optimization is the whole game for the state's vast data-center fleet, where plant efficiency swamps every other line item. Our compliance filings — COMcheck or a full energy model, whichever the project warrants — are built against the Georgia-amended edition, with envelope, HVAC, and lighting reconciled together rather than reviewed in isolation.",
  },
  faqs: [
    {
      q: "Does Georgia have a statewide building code?",
      a: "Yes. The Georgia State Minimum Standard Codes, adopted and amended by the Department of Community Affairs, apply statewide — currently built on the 2018 IBC with Georgia amendments. Local governments enforce the code but cannot adopt a weaker edition, giving Georgia a uniform commercial baseline.",
    },
    {
      q: "Which energy code applies to Georgia commercial buildings?",
      a: "Georgia enforces the Georgia State Minimum Standard Energy Code — an amended IECC (built on the 2015 IECC with substantial Georgia supplements) — applied uniformly statewide, with ASHRAE 90.1 as an accepted alternate path. We match COMcheck or energy-model documentation to that Georgia-amended edition.",
    },
    {
      q: "How strict is erosion and stormwater control in Georgia?",
      a: "Very. Georgia's Erosion and Sedimentation Control program and the Georgia Stormwater Management Manual ('Blue Book') set demanding standards, enforced aggressively given the erosive red-clay soils. Sites over an acre require Georgia EPD NPDES construction stormwater coverage with a comprehensive erosion-control plan.",
    },
    {
      q: "What structural loads govern coastal Georgia projects?",
      a: "Around Savannah and coastal Chatham County, hurricane-influenced wind of roughly 120–140+ mph governs lateral design, along with windborne-debris and FEMA flood-elevation requirements. Inland projects design to about 105–115 mph, with seismic generally low statewide (SDC A–B).",
    },
  ],
};
