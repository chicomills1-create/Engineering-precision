import type { StateData } from "../types";

export const delaware: StateData = {
  slug: "delaware",
  name: "Delaware",
  abbrev: "DE",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Local adoption of the International Building Code — most jurisdictions on the 2018 IBC (New Castle County, Wilmington, and others)",
    baseCode: "2018 IBC with local amendments; no single statewide mandatory building code for all occupancies",
    notes:
      "Delaware has no comprehensive statewide building code covering all construction; counties (New Castle, Kent, Sussex) and municipalities adopt and enforce their own editions of the I-Codes, with most currently on the 2018 IBC. The Office of the State Fire Marshal enforces the statewide fire code and reviews life-safety for many commercial projects, so the governing building edition must be confirmed with the specific county or city.",
  },
  energyCode: {
    commercial: "2018 IECC / ASHRAE 90.1-2016 (Delaware energy code, adopted statewide by the Division of Energy & Climate)",
    notes:
      "Unlike the building code, Delaware adopts a statewide energy code administered through the Division of Energy & Climate, currently based on the 2018 IECC with ASHRAE 90.1-2016 as an alternative path. Compliance is documented via COMcheck or whole-building modeling.",
    beyondCode:
      "Delaware's energy-efficiency programs (Energize Delaware) and Green Energy Fund incentives support above-code performance and renewables; the state's climate plan encourages electrification.",
  },
  climate: {
    zones: "4A statewide — a humid, mixed-heating climate from the Wilmington/Piedmont north to the low, coastal Sussex County south",
    drivers: [
      "Hot, humid summers requiring dehumidification",
      "Cold winters with moderate heating loads",
      "Atlantic coastal and Delaware Bay storm/flood exposure",
      "Flat, low-lying coastal terrain with high water tables",
    ],
  },
  structural: {
    seismic: "Predominantly Seismic Design Category B, edging to C on soft Coastal Plain soils near the bay and coast",
    wind: "Basic wind speeds around 115–125 mph along the Atlantic coast and lower Delaware Bay (Risk Category II), easing to ~110–115 mph inland",
    snow: "Ground snow loads generally 20–25 psf statewide — among the lowest in the Northeast given the coastal, low-elevation setting",
    other: "Frost depth ~24–30 in.; soft, high-water-table Coastal Plain soils dominate the state, driving deep foundations and dewatering; extensive VE/AE coastal flood zones and sea-level-rise exposure",
  },
  licensure: {
    board: "Delaware Association of Professional Engineers (DAPE)",
    notes:
      "Delaware licenses PEs through the Delaware Association of Professional Engineers and accepts NCEES records for comity; digital seals are accepted for electronic submittals. Construction documents must be sealed by a Delaware-licensed PE for permit.",
  },
  metros: ["Wilmington", "Dover", "Newark", "Middletown", "Rehoboth Beach", "Georgetown"],
  permitting:
    "Building permits are issued at the county and municipal level (New Castle, Kent, and Sussex counties plus incorporated towns), each with its own adopted code edition, while the State Fire Marshal reviews life-safety for many commercial projects statewide. DNREC (the Department of Natural Resources and Environmental Control) administers stormwater, sediment/erosion control, wetlands, and the state's coastal and subaqueous-lands programs, and Sussex County's fast-growing coastal zone brings both booming demand and strict flood and stormwater review.",
  marketNotes:
    "Delaware's construction market blends Wilmington-area corporate, financial, and healthcare activity in the north; Dover government, healthcare, and the Delaware State University corridor in the center; and a booming Sussex County coastal market of resort, multifamily, retail, and retirement development in the south. Logistics and warehouse growth along I-95 and US-13 corridors add steady site-engineering demand.",
  narratives: {
    mep:
      "MEP engineering in Delaware works a humid mixed Zone 4A climate statewide, so systems must handle real summer latent loads — dehumidification control is central in offices, resort/hospitality, and healthcare buildings — while managing moderate winter heating. We design to the statewide 2018 IECC / ASHRAE 90.1-2016 energy code administered by the Division of Energy & Climate, and we use Energize Delaware and Green Energy Fund incentives to justify high-efficiency and heat-pump-forward systems where the economics work. Delmarva Power's demand-charge structure and interconnection process shape electrical service sizing and any solar or on-site generation. In the fast-growing Sussex coastal market we design hospitality and multifamily systems with an eye to salt-air durability and hurricane-season resilience, while Wilmington's corporate and healthcare stock brings tighter service coordination and redundancy needs. Because the building code is adopted locally, we confirm each county or town's process while relying on the uniform statewide energy code for compliance strategy.",
    structural:
      "Delaware structural work is dominated by soft Coastal Plain soils and flat, low-lying, high-water-table terrain — most of the state sits on the Atlantic Coastal Plain, so deep foundations, dewatering, and settlement control are recurring themes and the geotechnical report frequently governs the foundation scheme. Extensive VE/AE coastal flood zones along the Atlantic and Delaware Bay, plus sea-level-rise exposure in Sussex County, drive elevation and uplift detailing on waterfront work; coastal wind runs 115–125 mph. Seismic is low (mostly SDC B, edging to C on soft soils), and snow is among the lowest in the Northeast at 20–25 psf, so it rarely governs. We design under the locally adopted 2018 IBC, detail ~24–30-inch frost footings, and for the logistics and resort markets coordinate large slab-on-grade, dock, and elevated-structure details with the soft-soil subsurface conditions from the outset.",
    civil:
      "Civil and site engineering in Delaware runs through DNREC, which administers stormwater management, sediment and erosion control, wetlands, and coastal and subaqueous-lands programs. The Delaware Sediment and Stormwater Regulations emphasize runoff-reduction and green-technology practices, but the state's flat terrain, high water tables, and soft Coastal Plain soils complicate infiltration and often push design toward specialized detention, elevated systems, or extensive dewatering. Sussex County's booming coastal development faces strict flood-zone and stormwater review, and sea-level-rise and tidal-flooding considerations increasingly shape site grading and finished-floor elevations. We design grading, storm systems, and utilities to county/municipal and DNREC standards, manage the high groundwater and soft soils that define most Delaware sites, and coordinate flood-resilience measures on the coastal and bay-front parcels that drive much of the state's growth.",
    energy:
      "Energy compliance in Delaware benefits from a statewide energy code even though the building code is adopted locally: the Division of Energy & Climate enforces the 2018 IECC / ASHRAE 90.1-2016 statewide, documented via COMcheck or whole-building modeling. In Zone 4A the envelope must fight both summer humidity and winter heat loss, so continuous insulation, air-barrier continuity, and moderate-SHGC glazing all pull weight, while heat pumps and energy recovery increasingly define the efficient mechanical path. We map projects against Energize Delaware and Green Energy Fund incentives so owners capture available rebates and renewables support, and for the coastal hospitality and multifamily market we balance high-efficiency design against salt-air durability so the modeled performance survives the marine environment. Because the energy code is uniform statewide, we focus compliance strategy on performance rather than reconciling editions across jurisdictions.",
  },
  faqs: [
    {
      q: "Does Delaware have a statewide building code?",
      a: "Not a single comprehensive one. Delaware's counties (New Castle, Kent, Sussex) and municipalities adopt and enforce their own editions of the I-Codes — most currently the 2018 IBC — while the State Fire Marshal reviews life-safety statewide. We confirm the governing building edition with the specific county or town at kickoff.",
    },
    {
      q: "What energy code applies to Delaware commercial buildings?",
      a: "Delaware does adopt a statewide energy code, administered by the Division of Energy & Climate and currently based on the 2018 IECC with ASHRAE 90.1-2016 as an alternative path. Compliance is documented via COMcheck or modeling, and Energize Delaware incentives support above-code, heat-pump-forward design.",
    },
    {
      q: "What foundation challenges are common in Delaware?",
      a: "Most of Delaware sits on soft, high-water-table Atlantic Coastal Plain soils, so deep foundations, dewatering, and settlement control are common, and the geotechnical report often governs the foundation scheme. Coastal and bay VE/AE flood zones and sea-level-rise exposure drive elevation and uplift detailing on waterfront sites.",
    },
    {
      q: "What stormwater and coastal rules affect Delaware site development?",
      a: "DNREC administers stormwater, sediment/erosion control, wetlands, and coastal programs, with regulations emphasizing runoff reduction and green practices. Flat terrain, high water tables, and soft soils complicate infiltration, and fast-growing Sussex County faces strict flood-zone review with sea-level-rise considerations shaping site elevations.",
    },
  ],
};
