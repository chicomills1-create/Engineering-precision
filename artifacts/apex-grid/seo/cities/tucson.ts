import type { CityData } from "../types";

export const tucson: CityData = {
  slug: "tucson",
  name: "Tucson",
  stateSlug: "arizona",
  county: "Pima County",
  ahj: {
    office: "City of Tucson Planning & Development Services Department (PDSD)",
    process:
      "Plan review runs through Tucson's online permitting portal (TDC Online / Accela), and PDSD publishes review-cycle timelines by project type with a paid expedited option for eligible commercial work. Larger sites often need concurrent review of zoning, engineering, and building packages, so early pre-submittal meetings with PDSD help sequence the reviews and avoid resubmittal loops.",
  },
  codes: {
    building: "2018 IBC with City of Tucson amendments (Tucson Building Code / Tucson-Pima County Outdoor Lighting Code applies citywide)",
    energy: "2018 IECC with local amendments",
    amendments:
      "Tucson is unusual for the Tucson-Pima County Outdoor Lighting Code, one of the strictest dark-sky ordinances in the country, which limits exterior lumens, shielding, and color temperature to protect nearby astronomical observatories. The city also enforces water-harvesting and commercial rainwater/greywater provisions that shape site and plumbing design beyond the base IPC.",
  },
  utilities: {
    electric: "Tucson Electric Power (TEP) serves the city; portions of the broader metro fall in Trico Electric Cooperative territory",
    notes:
      "TEP applies commercial demand charges and has published time-of-use and demand-response structures that reward load-shifting; new large services can carry meaningful transformer lead times. Water is provided by Tucson Water, whose conservation and reclaimed-water requirements often drive landscape and irrigation design.",
  },
  climateNotes:
    "ASHRAE climate zone 2B, hot-dry, with summer design temperatures in the 104–108°F range — a few degrees below Phoenix due to higher elevation (about 2,400 ft) — and a pronounced monsoon season bringing dust, microbursts, and intense short-duration rainfall.",
  marketNotes:
    "Tucson's construction market is anchored by the University of Arizona, Raytheon/RTX defense and aerospace manufacturing, Davis-Monthan Air Force Base, healthcare, and a growing logistics and semiconductor-adjacent industrial base along the I-10 corridor. Demand for lab, cleanroom, and advanced-manufacturing space keeps MEP and structural work steady.",
  narratives: {
    mep:
      "MEP design in Tucson works off a 2B hot-dry design point a few degrees milder than Phoenix thanks to the city's ~2,400-ft elevation, which restores some economizer and night-flush hours the Valley loses. Monsoon dust drives outside-air filtration upgrades, and Raytheon-adjacent lab and cleanroom work pushes precise pressurization and redundancy. The dark-sky Tucson-Pima County Outdoor Lighting Code directly constrains exterior lighting design — lumen caps, full-cutoff fixtures, and warm color temperatures — so site electrical and photometrics are coordinated early. We confirm whether the parcel is TEP or Trico territory before sizing services, since rate and interconnection paths differ.",
    structural:
      "Tucson structural design sits in a low-to-moderate seismic setting (generally SDC B–C), so foundations are governed less by lateral demand than by the geotechnical report — expansive and collapsible desert soils are common across the basin, and the 2018 IBC basis requires foundations designed to the project geotech. Monsoon microbursts drive roof-uplift and rooftop-equipment anchorage checks, and short-duration high winds warrant careful parapet and screen-wall detailing. Special-inspection programs are set up on City of Tucson PDSD forms, and lab or manufacturing tenants often add vibration-sensitive floor criteria to the structural scope.",
    civil:
      "Civil work in Tucson centers on the hot-dry hydrology of the Sonoran basin: the city enforces water-harvesting requirements that push commercial sites to capture and route stormwater into landscape rather than simply piping it off-site, and detention/retention is sized to local drainage criteria for intense monsoon bursts. Grading, drainage, and floodplain review coordinate with Pima County Regional Flood Control District where mapped washes cross a site. Plans route through PDSD's portal, and Tucson Water conservation and reclaimed-water rules frequently drive irrigation and landscape design, so we block out harvesting basins and detention in the first site-plan pass.",
    energy:
      "Tucson enforces the 2018 IECC with local amendments, so COMcheck documentation targets that edition rather than the 2021 cycle. In climate zone 2B the compliance economics favor cool roofs, low-SHGC glazing, and right-sized cooling plants over heavy wall insulation, and Tucson's elevation gives economizers a bit more real value than in Phoenix. The dark-sky lighting ordinance interacts with energy compliance because both cap and control exterior lighting, so we reconcile the Tucson-Pima County Outdoor Lighting Code limits with IECC lighting-power allowances as one coordinated exterior-lighting package.",
  },
  faqs: [
    {
      q: "How does Tucson's dark-sky lighting code affect commercial design?",
      a: "The Tucson-Pima County Outdoor Lighting Code is one of the strictest in the nation, protecting nearby observatories. It limits total exterior lumens, requires full-cutoff shielding, and restricts color temperature, so site lighting, canopy, and facade fixtures must be selected and aimed for compliance from schematic design onward.",
    },
    {
      q: "Which utility will serve my Tucson project, TEP or Trico?",
      a: "Inside the city, Tucson Electric Power typically serves the parcel, but parts of the surrounding metro fall in Trico Electric Cooperative territory. The serving utility affects demand-charge structures, rate options, and interconnection timelines, so we confirm it before sizing the electrical service.",
    },
    {
      q: "What stormwater rules apply to Tucson commercial sites?",
      a: "Tucson enforces water-harvesting requirements that direct site stormwater into landscape areas, alongside detention/retention sized for intense monsoon rainfall. Where mapped washes cross a site, review coordinates with the Pima County Regional Flood Control District, so harvesting basins and drainage should be laid out in the first site-plan pass.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.tucsonaz.gov/Departments/Planning-Development-Services"],
      codes: ["https://www.tucsonaz.gov/Departments/Planning-Development-Services/Building-Development"],
      amendments: ["https://www.tucsonaz.gov/Departments/Planning-Development-Services/Building-Development"],
      utilities: ["https://www.tep.com/business"],
      climate: ["https://www.weather.gov/twc/"],
      market: ["https://www.tucsonaz.gov/Departments/Economic-Development"],
    },
  },
};
