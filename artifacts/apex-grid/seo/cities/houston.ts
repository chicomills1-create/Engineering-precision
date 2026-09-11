import type { CityData } from "../types";

export const houston: CityData = {
  slug: "houston",
  name: "Houston",
  stateSlug: "texas",
  county: "Harris County",
  ahj: {
    office: "City of Houston Permitting Center (Houston Public Works)",
    process:
      "Commercial permits are submitted online through the Houston Permitting Center's e-permitting/e-plan review system, with in-person support at 1002 Washington Avenue. Houston has no zoning, so review centers on the construction code, life-safety, floodplain (Chapter 19), and drainage/infrastructure (Chapter 9) rather than land use; deed restrictions are enforced separately and are not part of the building permit.",
  },
  codes: {
    building: "2021 IBC, adopted as the Houston Construction Code (Code of Ordinances Chapter 10) with Houston amendments",
    energy: "2021 IECC with Houston amendments, adopted by Ord. No. 2023-907 and effective January 1, 2024",
    amendments:
      "Houston's amendments modernized the construction code to the 2021 IBC and 2021 IECC and, critically, its Chapter 19 floodplain ordinance requires new/substantially improved structures in the 500-year floodplain to be elevated to two feet above the 500-year flood elevation - stricter than the FEMA baseline. There is no zoning, but drainage and floodplain rules effectively govern site development.",
  },
  utilities: {
    electric: "CenterPoint Energy Houston Electric provides regulated wires/delivery service; Houston is in the ERCOT competitive-retail market, so the customer selects a retail electric provider while CenterPoint owns the meter and interconnection",
    notes:
      "Service upgrades, primary extensions, and transformer procurement run through CenterPoint and can carry long lead times for large loads, so we engage them at schematic design. Water and wastewater are City of Houston Public Works services inside city limits.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) with very high latent cooling loads, a long cooling season, and Gulf moisture that makes humidity control and dehumidification central to MEP design.",
  marketNotes:
    "Houston construction is anchored by the energy sector, Gulf Coast petrochemical and LNG expansion, the Texas Medical Center's continuous healthcare buildout, port-driven industrial/warehouse demand, and strong multifamily starts. Because there is no zoning, floodplain and drainage compliance - not land use - is the entitlement bottleneck that most often reshapes a project.",
  narratives: {
    mep:
      "MEP design in Houston is defined by climate zone 2A: a mild 95-96°F sensible design day but relentless Gulf humidity that drives high latent loads, so dedicated outside-air systems, dehumidification, and careful control of infiltration matter more than raw tonnage. Because Houston has no zoning, MEP review runs through the Houston Construction Code (2021 IBC) and the Houston Permitting Center's e-plan system alongside life-safety and floodplain review. Electrically, CenterPoint Energy Houston Electric owns the regulated delivery network within the ERCOT retail market; we confirm available capacity and transformer lead times early, and for flood-exposed sites we elevate service equipment above the Chapter 19 flood elevation rather than accepting ground-level gear.",
    structural:
      "Houston structural design contends with expansive Gulf Coast clays and a high water table, not seismic demand (Seismic Design Category A). Foundations follow the geotechnical report - typically drilled piers, structural slabs, or post-tensioned slabs with moisture-control detailing - and buoyancy/uplift can govern below-grade elements where groundwater is shallow. Basic inland wind speeds are moderate, but the city's flood history makes finished-floor elevation a structural constraint: Chapter 19 requires elevation to two feet above the 500-year flood elevation for new and substantially improved buildings. Special-inspection programs and structural submittals are set up under the Houston Construction Code and routed through the Permitting Center.",
    civil:
      "Civil work in Houston is fundamentally a drainage problem on flat, poorly draining terrain. The city's Infrastructure Design Manual Chapter 9 sets stringent detention requirements (tightened in 2021), and the Chapter 19 floodplain ordinance requires elevation to two feet above the 500-year flood level - a direct response to Harvey. Harris County Flood Control District criteria and, for larger tracts, MUD/utility-district coordination also apply. TCEQ construction general permit coverage and a SWPPP apply to disturbances over an acre. Because there is no zoning, detention volume, fill-mitigation, and finished-floor elevation are the constraints that most reshape a site plan, so we block them out in the first grading pass.",
    energy:
      "Houston adopted the 2021 IECC with local amendments effective January 1, 2024, so COMcheck or ASHRAE 90.1 modeling must target that exact edition. In hot-humid climate zone 2A the compliance economics reward low-SHGC glazing, aggressive envelope air-sealing to limit humid-air infiltration, and right-sized high-efficiency cooling with real dehumidification capacity - added wall and roof insulation return less than solar-heat-gain and latent-load control. We coordinate envelope, mechanical, and lighting compliance as one package and resolve plan-check comments through the Houston Permitting Center's e-plan review workflow.",
  },
  faqs: [
    {
      q: "Does Houston have zoning, and how does that affect permitting?",
      a: "No - Houston famously has no zoning. Commercial review centers on the Houston Construction Code, life-safety, and especially the Chapter 19 floodplain and Chapter 9 drainage rules rather than land use. Private deed restrictions are enforced separately and are not part of the building permit, so drainage and floodplain compliance become the real entitlement gate.",
    },
    {
      q: "What are Houston's floodplain elevation requirements?",
      a: "Under the Chapter 19 floodplain ordinance updated after Hurricane Harvey, new and substantially improved structures in the 500-year (0.2% annual chance) floodplain must be elevated to two feet above the 500-year flood elevation - notably stricter than the FEMA 100-year baseline. This drives finished-floor elevation, fill/detention, and grading decisions early.",
    },
    {
      q: "Who provides electric service for a Houston commercial project?",
      a: "CenterPoint Energy Houston Electric owns the regulated wires and handles the meter, service upgrades, and interconnection, while Houston is in the ERCOT competitive-retail market where you choose a retail electric provider for supply. We coordinate capacity and transformer lead times with CenterPoint at schematic design.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 95, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.houstonpermittingcenter.org/"],
      codes: ["https://www.houstonpermittingcenter.org/houston-code-archive"],
      amendments: ["https://www.houstonpermittingcenter.org/construction-code-modernization/code-amendment"],
      utilities: ["https://www.centerpointenergy.com/en-us/business"],
      climate: ["https://www.weather.gov/hgx/"],
      market: ["https://www.houstontx.gov/ecodev/"],
    },
  },
};
