import type { CityData } from "../types";

export const desMoines: CityData = {
  slug: "des-moines",
  name: "Des Moines",
  stateSlug: "iowa",
  county: "Polk County",
  ahj: {
    office: "City of Des Moines Permit and Development Center",
    process:
      "The Permit and Development Center administers building and trade permits and accepts applications and plan material through the City's permitting process. Commercial work may require coordinated building, fire, zoning, site-plan, stormwater, and right-of-way review; applicants should resolve the applicable tracks and utility connections before treating the building permit as the only approval.",
  },
  codes: {
    building: "Des Moines Building Code, adopting the 2021 International Building Code with City amendments",
    energy: "Iowa Energy Conservation Code for commercial buildings, based on the 2021 IECC with Iowa amendments",
    amendments:
      "Des Moines adopts its construction codes by municipal ordinance and supplements the model building-code framework with local administrative, zoning, site-development, and right-of-way requirements. The City’s adopted-code and amendment materials, rather than a generic I-Code alone, control the permit submittal.",
  },
  utilities: {
    electric: "MidAmerican Energy Company provides electric service in Des Moines",
    notes:
      "MidAmerican Energy should be engaged early for new, upgraded, or high-demand electrical service and distributed-generation interconnection. Des Moines Water Works provides water; the City operates sanitary sewer and stormwater systems, making water, sewer, and drainage coordination separate but related tasks.",
  },
  climateNotes:
    "Des Moines is in the cold-humid 5A climate zone, with long heating seasons, humid summers, freeze-thaw cycling, severe thunderstorms, and tornado and derecho exposure. Des Moines River and Raccoon River floodplain conditions, alluvial soils near waterways, and glacial soils elsewhere make FEMA mapping, geotechnical work, and drainage evaluation site-specific necessities.",
  marketNotes:
    "The metro’s active work includes data centers and other power-intensive development, logistics and industrial facilities, healthcare and higher education, and office or mixed-use redevelopment. Insurance and financial-services employers remain an important local commercial base, while greenfield projects at the metro edge bring substantial utility and stormwater planning.",
  narratives: {
    mep:
      "Des Moines MEP design has to cover both a long 5A heating season and humid summer latent loads. Freeze protection, outside-air control, envelope interfaces, and dependable humidity control therefore belong in the basis of design rather than being added after equipment selection. MidAmerican Energy service capacity is an early decision for data-center, industrial, laboratory, and electrification-heavy programs; we align connected load, resilience strategy, service configuration, and the utility application before distribution is fixed. The Iowa commercial energy code establishes the compliance baseline, while Des Moines Water Works water service and City sewer requirements inform mechanical-room, fire-protection, and site-utility layouts in parallel.",
    structural:
      "Structural design in Des Moines is governed principally by snow, wind, frost, and soils rather than high seismic demand. Severe thunderstorm and derecho exposure calls for a continuous lateral and uplift load path, especially on broad low-rise roofs and open sites; roof snow and drifting still require code-specific analysis. Foundations need to account for frost, glacial soils, undocumented fill, and potentially variable groundwater or alluvial material near the Des Moines and Raccoon rivers. The City’s adopted 2021-IBC framework supplies the code basis, but a current geotechnical report and FEMA flood review determine whether conventional spread foundations, subgrade improvement, elevation, or flood-resistant detailing is appropriate.",
    civil:
      "Civil work in Des Moines starts with the City’s site, sewer, stormwater, and right-of-way requirements rather than an assumed detention template. Iowa DNR construction-stormwater coverage and a SWPPP apply when disturbance meets the state threshold, while City review addresses grading, storm connections, water and sanitary service, and public improvements. Flat to rolling terrain, tight glacial soils, freeze-thaw, and riverine flood exposure can limit infiltration and make finished-floor and overflow routing consequential. We reserve utility corridors and water-quality or detention space early, then coordinate Des Moines Water Works and City connection requirements before paving and building locations make a compliant solution difficult.",
    energy:
      "Commercial energy documentation in Des Moines follows Iowa’s adopted commercial energy code, based on the 2021 IECC with Iowa amendments, and should be reconciled with the City’s permit requirements. In cold-humid zone 5A, continuous insulation, a continuous air barrier, high-performance glazing, efficient heating, and controlled ventilation affect both compliance and condensation risk. For large process, data, healthcare, or institutional loads, we test lighting, envelope, HVAC, heat recovery, and controls as one operating system rather than trading away durable envelope performance for a narrow equipment credit. Coordinating the proposed electrical demand with MidAmerican Energy also makes the energy strategy more buildable.",
  },
  faqs: [
    {
      q: "Who reviews commercial permits in Des Moines?",
      a: "The City of Des Moines Permit and Development Center administers building and trade permitting. A commercial project can also need fire, zoning, site, stormwater, utility, and right-of-way review, so those requirements should be coordinated with the building submittal.",
    },
    {
      q: "Which building and energy codes apply in Des Moines?",
      a: "Des Moines adopts the 2021 IBC through its Building Code with City amendments. Commercial energy compliance follows Iowa’s Energy Conservation Code based on the 2021 IECC with Iowa amendments; the City's adopted-code materials govern the specific permit path.",
    },
    {
      q: "Who provides utilities, and what site risks matter?",
      a: "MidAmerican Energy provides electric service, Des Moines Water Works provides water, and the City manages sanitary sewer and stormwater systems. Cold winters, tight or variable soils, and Des Moines/Raccoon River floodplain conditions make early utility, geotechnical, and drainage coordination important.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 79, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.dsm.city/departments/development_services/permit_development_center/index.php"],
      codes: ["https://www.legis.iowa.gov/law/administrativeRules/rules?agency=661"],
      amendments: ["https://www.dsm.city/departments/development_services/permit_development_center/construction_codes.php"],
      utilities: ["https://www.midamericanenergy.com/business", "https://www.dsm.city/departments/public_works/water/index.php"],
      climate: ["https://www.weather.gov/dmx/"],
      market: ["https://www.dsmpartnership.com/"],
    },
  },
};