import type { CityData } from "../types";

export const reno: CityData = {
  slug: "reno",
  name: "Reno",
  stateSlug: "nevada",
  county: "Washoe County",
  ahj: {
    office: "City of Reno Development Services Department, Building and Safety Division",
    process:
      "Reno accepts permit applications, plan sets, corrections, and inspection requests through its online Development Services system. City review is separate from Washoe County's program outside the city limits; projects with grading, floodplain, or utility work also coordinate with Reno Engineering/Public Works and the applicable regional agencies.",
  },
  codes: {
    building: "2018 International Building Code, as adopted by the City of Reno with local amendments",
    energy: "2018 International Energy Conservation Code, as adopted by the City of Reno",
    amendments:
      "Reno publishes its locally adopted construction codes and amendments rather than using the Southern Nevada Building Officials package. The permit path must also account for the City fire code, accessibility provisions, special inspections, and locally administered grading and floodplain requirements.",
  },
  utilities: {
    electric: "NV Energy serves electric and natural-gas customers in Reno",
    notes:
      "Truckee Meadows Water Authority supplies most municipal water in the Reno-Sparks area, while the Truckee Meadows Water Reclamation Facility provides regional wastewater treatment. New large loads should be discussed with NV Energy early; electrical service design, transformer location, and utility review are separate from the building permit.",
  },
  climateNotes:
    "Reno's high-desert setting is in IECC/ASHRAE climate zone 5B: hot, dry, sunny summers give way to cold winter nights, freeze exposure, and snow. The Sierra rain shadow does not eliminate flood risk—Truckee River flooding, alluvial fans, and short intense storms remain important site constraints.",
  marketNotes:
    "Reno's market combines downtown and university-area redevelopment with healthcare, distribution, and advanced-manufacturing demand across the Truckee Meadows. The larger Reno-Sparks industrial ecosystem connects to the Tahoe-Reno Industrial Center east of Sparks, while infill sites in Reno often require more deliberate utility, access, and floodplain coordination than greenfield industrial parcels.",
  narratives: {
    mep:
      "Reno MEP work is fundamentally different from Las Vegas work: climate zone 5B brings meaningful heating, freeze-protection, humidification, and snow-melt exposure alongside hot, low-humidity summer afternoons. NV Energy service coordination belongs at schematic design for warehouse, manufacturing, and healthcare loads, while water and sanitary layouts must reconcile Truckee Meadows Water Authority and regional reclamation requirements. We organize mechanical, electrical, plumbing, fire-protection, and City of Reno plan-review documentation around the adopted 2018 codes rather than assuming Southern Nevada amendments apply.",
    structural:
      "Western Nevada is a seismically active Basin-and-Range setting, and Reno projects commonly require Seismic Design Category D analysis once site class and risk category are established. The Sierra-front environment also makes elevation-specific snow loads, drifting, cold-weather roof drainage, and wind exposure material design inputs. We use the geotechnical report to address variable alluvial soils, potentially liquefiable deposits near waterways, and slope conditions, then coordinate the special-inspection program with Reno Building and Safety.",
    civil:
      "Reno civil design starts with where runoff goes: Truckee River floodplain mapping, tributary drainageways, alluvial-fan flow paths, and the City’s drainage criteria can constrain finished floor, detention, and access. High-desert soils and winter freeze/thaw affect paving and utility details, while redevelopment can expose tight grades and legacy utilities. We coordinate grading, storm drainage, erosion controls, water service with TMWA, and sanitary connection with the City/regional system before a Development Services submittal.",
    energy:
      "Reno’s 2018 IECC compliance package should reflect a cold-dry 5B envelope, not a generic Nevada cooling profile. Continuous insulation, thermal-bridge control, air sealing, high-performance glazing, and heat-recovery choices can reduce both winter heating and large day-to-night swings; daylighting and solar control still matter in Reno’s clear sky. We align COMcheck inputs, equipment efficiencies, lighting controls, and the City of Reno’s adopted edition so the energy documents agree with the mechanical and architectural sheets.",
  },
  faqs: [
    {
      q: "Is Reno permitted by Washoe County or the City of Reno?",
      a: "Parcels inside Reno are reviewed by the City of Reno Development Services Department. Washoe County administers building permits in unincorporated county areas, so a Truckee Meadows mailing address alone is not enough to identify the AHJ. Jurisdiction should be confirmed before code analysis and submittal.",
    },
    {
      q: "What climate and snow issues affect a Reno commercial building?",
      a: "Reno is a cold, dry climate-zone 5B market with winter freeze exposure, snow, and large diurnal swings. Roof snow loading is site- and elevation-specific, while mechanical and plumbing designs need credible freeze protection and heating-load calculations rather than southern Nevada assumptions.",
    },
    {
      q: "Does a Reno site need flood analysis even though the climate is dry?",
      a: "Often, yes. The Truckee River, tributary channels, alluvial fans, and intense storm events create floodplain and drainage constraints in portions of Reno. Early civil due diligence should check FEMA mapping and City drainage/floodplain requirements before fixing grades or building elevation.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 84, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.reno.gov/government/departments/development-services"],
      codes: ["https://www.reno.gov/government/departments/development-services/building-and-safety"],
      amendments: ["https://www.reno.gov/government/departments/development-services/building-and-safety"],
      utilities: ["https://www.nvenergy.com/account-services/business"],
      climate: ["https://www.weather.gov/rev/"],
      market: ["https://www.edawn.org/"],
    },
  },
};