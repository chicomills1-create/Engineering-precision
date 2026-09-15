import type { CityData } from "../types";

export const lasVegas: CityData = {
  slug: "las-vegas",
  name: "Las Vegas",
  stateSlug: "nevada",
  county: "Clark County",
  ahj: {
    office: "City of Las Vegas Department of Building & Safety (the Las Vegas Strip itself lies in unincorporated Clark County under the Clark County Department of Building & Fire Prevention)",
    process:
      "City of Las Vegas review runs through an online permitting portal with published commercial review timelines and expedited options; much of the recognizable resort corridor is actually in unincorporated Clark County, which administers its own review and inspection program. Confirming the correct AHJ up front matters, because the Strip, Henderson, North Las Vegas, and the City of Las Vegas are separate jurisdictions with different portals and amendment packages.",
  },
  codes: {
    building: "2018 IBC with Southern Nevada and City of Las Vegas amendments",
    energy: "2018 IECC with Nevada/Southern Nevada amendments",
    amendments:
      "Southern Nevada jurisdictions coordinate a regional amendment package (the Southern Nevada Building Officials / SNBO matrix), so the City of Las Vegas, Clark County, Henderson, and North Las Vegas share a common base with jurisdiction-specific overlays. High-rise, assembly, and gaming occupancies draw additional fire and life-safety scrutiny, and resort/casino projects frequently trigger enhanced egress and smoke-control review.",
  },
  utilities: {
    electric: "NV Energy (Nevada Power Company) serves the Las Vegas Valley",
    notes:
      "NV Energy applies commercial demand charges and offers time-of-use and demand-response structures; large new services and data-center-scale loads can carry long transformer and interconnection lead times. Water is supplied by the Las Vegas Valley Water District, and the region's severe Colorado River / Lake Mead shortage drives aggressive conservation and turf-restriction rules that shape site and landscape design.",
  },
  climateNotes:
    "ASHRAE climate zone 3B, hot-dry, with summer design temperatures around 108–110°F, very low humidity, high solar gain, and a strong urban heat island across the valley; short but intense monsoon-season flash floods are a real design driver despite the arid annual rainfall.",
  marketNotes:
    "Las Vegas construction is driven by the resort/gaming and hospitality sector, sports and entertainment venues, a fast-growing warehouse and logistics market along the I-15 corridor, and expanding data-center and advanced-manufacturing development. Tourism-linked capital projects and master-planned residential growth in the valley keep MEP, structural, and civil demand high.",
  narratives: {
    mep:
      "MEP design in Las Vegas targets a 3B hot-dry, high-solar climate with roughly 108–110°F design temperatures and very low humidity, so cooling plant sizing, condenser derates, and dust filtration dominate the load story. Resort, gaming, and assembly occupancies bring heavy ventilation, smoke-control, and redundancy requirements, and NV Energy's commercial demand charges reward load-shifting and right-sized services. Because the Strip corridor is in unincorporated Clark County while adjacent parcels may be City of Las Vegas, we confirm the AHJ and serving-transformer availability early — interconnection and transformer lead times for large resort or data-center loads can control the schedule.",
    structural:
      "Las Vegas structural design contends with meaningful seismic demand for the desert Southwest — the valley sits near active fault systems and generally falls in the higher end of SDC C, occasionally D on softer sites — so lateral systems and drift are real design constraints, not afterthoughts. Geotechnical reports routinely flag collapsible and gypsiferous soils plus caliche layers that affect foundation type and excavation. High-rise resort and casino towers add wind, dynamic, and podium-transfer complexity, and special-inspection programs run on the AHJ's forms, whether that is City of Las Vegas Building & Safety or Clark County.",
    civil:
      "Civil work in the Las Vegas Valley is shaped by flash-flood hydrology: despite arid annual rainfall, short high-intensity storms drive detention and conveyance design, and projects coordinate with the Clark County Regional Flood Control District and its master-planned facilities. The region's Colorado River shortage makes water conservation central — the Las Vegas Valley Water District and SNWA enforce turf restrictions and drought-tolerant landscape rules that directly shape site and irrigation plans. Grading, drainage, and floodplain packages route through the applicable jurisdiction's portal, so we confirm whether a site is City of Las Vegas or unincorporated Clark County before setting the civil approach.",
    energy:
      "Las Vegas enforces the 2018 IECC with Southern Nevada amendments, so COMcheck documentation targets that edition under the regional SNBO matrix. In climate zone 3B, high solar gain makes low-SHGC glazing, external shading, and cool roofs the highest-value envelope moves, while the arid climate gives economizers and evaporative strategies genuine payback that the load calculations should capture. Resort and gaming projects layer demanding lighting and plug loads onto the compliance path, so we coordinate envelope, mechanical, and lighting compliance as one package and reconcile it with NV Energy demand-management incentives.",
  },
  faqs: [
    {
      q: "Is my Las Vegas project reviewed by the City or by Clark County?",
      a: "It depends on the parcel. Much of the famous Strip corridor is in unincorporated Clark County under its Department of Building & Fire Prevention, while other areas fall under the City of Las Vegas Department of Building & Safety. Henderson and North Las Vegas are separate jurisdictions again, each with its own portal, so we confirm the AHJ before submittal.",
    },
    {
      q: "How does seismic design factor into Las Vegas buildings?",
      a: "The valley sits near active fault systems and generally falls at the higher end of Seismic Design Category C, sometimes D on softer soils, so lateral systems and drift limits are genuine constraints. Collapsible soils and caliche also influence foundation design, which is why the geotechnical report drives early structural decisions.",
    },
    {
      q: "What water and stormwater rules affect Las Vegas site design?",
      a: "The Colorado River/Lake Mead shortage drives strict conservation and turf-restriction rules from the Las Vegas Valley Water District and SNWA that shape landscape and irrigation design. Despite the arid climate, intense flash floods require detention and conveyance coordinated with the Clark County Regional Flood Control District.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 95, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.clarkcountynv.gov/government/departments/building___fire_prevention/index.php", "https://www.lasvegasnevada.gov/Government/Departments/Building-Safety"],
      codes: ["https://www.clarkcountynv.gov/government/departments/building___fire_prevention/how-do-i"],
      amendments: ["https://www.clarkcountynv.gov/government/departments/building___fire_prevention/how-do-i"],
      utilities: ["https://www.nvenergy.com/account-services/business"],
      climate: ["https://www.weather.gov/vef/"],
      market: ["https://www.lvgea.org/"],
    },
  },
};
