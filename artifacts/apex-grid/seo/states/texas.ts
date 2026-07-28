import type { StateData } from "../types";

export const texas: StateData = {
  slug: "texas",
  name: "Texas",
  abbrev: "TX",
  buildingCode: {
    name: "Locally adopted International Building Code (editions vary; many major cities on 2021 IBC, others on 2018 or 2015)",
    baseCode: "IBC with local amendments; no mandatory statewide commercial building code",
    notes:
      "Texas has no statewide commercial building code — adoption is left to municipalities and, for some construction, to the Texas Department of Licensing and Regulation. Houston, Dallas, San Antonio, and Austin each run their own code cycles and amendments, so the governing IBC edition must be confirmed with the specific city before design.",
  },
  energyCode: {
    commercial:
      "2021 IECC is the state minimum for commercial construction (State Energy Conservation Office adoption); some cities lag on an older edition and a few adopt more recent versions locally",
    notes:
      "Texas adopts the IECC statewide for commercial buildings through SECO, with the 2021 IECC as the current commercial baseline. ASHRAE 90.1 remains an accepted alternate compliance path. Local jurisdictions may enforce the current statewide edition on their own review timelines.",
    beyondCode:
      "Austin Energy Green Building and its local energy code amendments push commercial projects well beyond the state baseline; several cities offer green-building or solar-ready incentives.",
  },
  climate: {
    zones: "2A (hot-humid) across Houston/San Antonio, 3A in Dallas/Austin, 3B/4B in the west and Panhandle",
    drivers: [
      "High latent cooling loads and humidity control on the Gulf Coast",
      "Long cooling seasons with 100°F+ design temperatures statewide",
      "Winterization pressure after the 2021 grid failure (Winter Storm Uri)",
      "Wide climate spread from humid Gulf to arid West Texas",
    ],
  },
  structural: {
    seismic: "Predominantly Seismic Design Category A–B; low seismicity statewide, with modestly elevated hazard near West Texas induced-seismicity zones",
    wind: "Highest loads on the coast — the Gulf Coast Texas Department of Insurance windstorm (TWIA/TDI) region enforces stringent wind design at 130–150+ mph; inland speeds moderate to ~105–115 mph",
    snow: "Negligible ground snow loads statewide (generally 5 psf or less)",
    other: "Highly expansive clay soils (Blackland Prairie through Houston) drive foundation design; Gulf Coast flood/FEMA elevation requirements govern coastal sites",
  },
  licensure: {
    board: "Texas Board of Professional Engineers and Land Surveyors (TBPELS)",
    notes: "Texas offers licensure by reciprocity for qualified out-of-state PEs and requires firms to hold a Certificate of Registration. Digital/electronic seals are accepted on submittals per board rules.",
  },
  metros: ["Houston", "Dallas–Fort Worth", "San Antonio", "Austin", "El Paso", "Corpus Christi"],
  permitting:
    "Permitting varies dramatically by jurisdiction: Houston famously has no zoning but enforces strict floodplain and drainage criteria, while Dallas and Austin run structured plan-review with published amendment packages. Coastal counties add windstorm (TDI/TWIA) inspection and certification requirements that must be planned into the schedule.",
  marketNotes:
    "Texas leads the nation in construction volume, driven by relentless population growth, corporate relocations to DFW and Austin, Gulf Coast petrochemical and LNG expansion, and a booming data-center and semiconductor pipeline. Warehouse/industrial and multifamily starts remain strong across the major metros.",
  narratives: {
    mep:
      "MEP design in Texas is a humidity and reliability problem before it is a temperature problem. On the Gulf Coast — Houston, Corpus Christi, and the climate zone 2A belt — latent load often dominates, so we design dehumidification and reheat strategies that keep spaces comfortable without over-cooling, and we detail vapor control carefully because envelope condensation is a real failure mode in mixed-humid Texas. Winter Storm Uri reset expectations for electrical resilience: we increasingly specify freeze protection, standby power, and load-shed schemes so buildings ride through grid stress on the ERCOT system. Because the 2021 IECC is the commercial baseline, our HVAC and lighting designs carry compliance documentation matched to that edition, with ASHRAE 90.1 as an alternate path where a city prefers it. Equipment is sized to 100°F+ design days with the long cooling seasons that define nearly every Texas market.",
    structural:
      "The defining structural challenge in most of Texas is not the frame — it is the ground. The Blackland Prairie clays of Dallas–Austin–San Antonio and the coastal soils around Houston are among the most expansive in the country, so foundation systems (post-tensioned slabs, drilled piers, void forms under grade beams) are dictated by the geotechnical report and moisture regime as much as by the loads above. Seismic demand is low statewide (SDC A–B), which shifts lateral design toward wind. On the Gulf Coast, that wind is the governing event: the Texas Department of Insurance windstorm region requires design to 130–150+ mph with documented compliance and inspection before a windstorm certificate is issued. We tune connection detailing, roof uplift resistance, and cladding attachment to those coastal criteria while keeping inland projects efficient at their lower ~110 mph speeds.",
    civil:
      "Civil and site engineering in Texas is a drainage discipline. Houston's flat topography and repeated flood events (Harvey chief among them) mean Harris County and the City enforce demanding detention, fill-mitigation, and finished-floor elevation rules that can reshape a site plan entirely. Elsewhere, expansive clays complicate pavement and utility design, and each major city publishes its own drainage criteria manual — we design to the specific manual rather than a generic standard. Stormwater quality, TCEQ construction general permit coverage, and SWPPP documentation apply to sites over an acre statewide. Our grading, detention, and utility layouts are built around each jurisdiction's published criteria and the reality that in much of Texas, moving water off-site responsibly is the hardest part of the entitlement.",
    energy:
      "Texas gives commercial energy compliance a clear anchor that many states lack: the 2021 IECC is the statewide baseline adopted through the State Energy Conservation Office, with ASHRAE 90.1 available as an alternate path. That said, cities review on their own timelines, so we confirm the enforced edition before finalizing the compliance approach. In the hot-humid climate zone 2A of the Gulf Coast, the highest-leverage moves are low-SHGC glazing, tight envelope air-sealing to control latent infiltration, and right-sized, efficient cooling plants — added roof insulation returns less than aggressive solar-heat-gain and infiltration control. In Austin, we design to the city's stricter local energy amendments and Austin Energy Green Building expectations when a project pursues them. COMcheck or whole-building modeling is matched to the exact edition the AHJ enforces.",
  },
  faqs: [
    {
      q: "Is there a statewide building code in Texas?",
      a: "Not for commercial construction. Texas has no mandatory statewide commercial building code — each municipality adopts its own IBC edition and amendments. Major cities range across the 2015, 2018, and 2021 IBC, so we confirm the governing edition with the permitting city at kickoff.",
    },
    {
      q: "Which energy code applies to Texas commercial projects?",
      a: "The 2021 IECC is the commercial baseline adopted statewide through the State Energy Conservation Office, with ASHRAE 90.1 as an accepted alternate compliance path. Cities enforce on their own review schedules, and Austin applies stricter local amendments, so we match COMcheck or energy-model documentation to the enforced edition.",
    },
    {
      q: "Do I need special foundation engineering for expansive soils in Texas?",
      a: "Frequently, yes. The Blackland Prairie and Gulf Coast clays are highly expansive, and foundation design must follow the project geotechnical report — commonly post-tensioned slabs, drilled piers, or grade beams on void forms with moisture-control detailing.",
    },
    {
      q: "What are the wind design requirements on the Texas coast?",
      a: "The Texas Department of Insurance windstorm region (including TWIA-served counties) enforces stringent coastal wind design, typically 130–150+ mph, with inspection and windstorm certification required. Inland projects design to more moderate speeds around 105–115 mph.",
    },
  ],
};
