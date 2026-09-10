import type { CityData } from "../types";

export const savannah: CityData = {
  slug: "savannah", name: "Savannah", stateSlug: "georgia", county: "Chatham County",
  ahj: { office: "City of Savannah Development Services", process: "Development Services reviews building and site-development permits within city jurisdiction. Commercial renovations require water and sewer approval before permit issuance, and applicants can use published checklists and building-plan-review meetings to resolve submittal issues." },
  codes: { building: "Georgia State Minimum Standard Codes as enforced by the City of Savannah", energy: "Georgia State Minimum Standard Energy Code", amendments: "Savannah applies Georgia's mandatory minimum codes with city administrative and floodplain requirements. Since January 1, 2025, new and substantially improved buildings in mapped or localized special flood-hazard areas must meet the city's two-foot freeboard requirement." },
  utilities: { electric: "Georgia Power", notes: "Georgia Power serves electric loads in Savannah; city water and sewer approval is a permit prerequisite for commercial renovations. Large industrial and port-related projects should begin capacity and service coordination early." },
  climateNotes: "Savannah's hot-humid coastal climate combines high latent loads, wind and rain exposure, corrosive salt air, and significant flood risk. Moisture control, elevated equipment, drainage, and resilient envelopes are core design concerns.",
  marketNotes: "The Port of Savannah supports major logistics, warehouse, manufacturing, and infrastructure investment, while tourism, healthcare, and historic-building reinvestment sustain a diverse construction pipeline. Coastal and historic contexts add approval and resilience complexity.",
  narratives: {
    mep: "Savannah MEP design prioritizes latent-load control, corrosion resistance, wind-driven rain, and flood-aware equipment placement. We coordinate Georgia Power service and city water/sewer approval early, especially for logistics and adaptive-reuse projects.",
    structural: "Savannah structural design must integrate Georgia's adopted code, coastal wind exposure, flood elevations, corrosion, and the city's freeboard rule where applicable. Existing historic structures require careful field verification and compatible strengthening details.",
    civil: "Civil work in Savannah is shaped by flat terrain, high groundwater, tidal and rainfall flooding, water/sewer approvals, and site-development permitting. Drainage and finished-floor strategy should be established before architectural grades are fixed.",
    energy: "Savannah energy compliance cannot sacrifice humidity control to reduce modeled consumption. Integrated envelope, glazing, lighting, ventilation, and part-load HVAC decisions are essential in the hot-humid coastal climate.",
  },
  faqs: [
    { q: "Who issues commercial building permits in Savannah?", a: "City of Savannah Development Services handles building and site-development permits inside city jurisdiction and publishes permit checklists and code information." },
    { q: "Does Savannah have a local flood-elevation requirement?", a: "Yes. The city states that permits submitted from January 1, 2025 for new or substantially improved buildings in applicable special flood-hazard areas must provide two feet of freeboard." },
    { q: "Is water and sewer approval required for Savannah commercial renovations?", a: "The city's permit guidance states that commercial renovations need the required water and sewer approval form before the building permit can be issued." },
  ],
  research: {
    lastVerified: "2026-09-10", reviewStatus: "approved", reviewedBy: "Apex Grid SEO research",
    priority: { commercialOpportunity: 79, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.savannahga.gov/375/Development-Services-Department"],
      codes: ["https://savannahga.gov/379/Permits-for-Construction"],
      amendments: ["https://www.savannahga.gov/375/Development-Services-Department"],
      utilities: ["https://www.georgiapower.com/business.html"],
      climate: ["https://www.weather.gov/chs/"],
      market: ["https://seda.org/"],
    },
  },
};