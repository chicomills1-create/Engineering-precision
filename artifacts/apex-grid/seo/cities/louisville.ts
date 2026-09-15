import type { CityData } from "../types";

export const louisville: CityData = {
  slug: "louisville",
  name: "Louisville",
  stateSlug: "kentucky",
  county: "Jefferson County (Louisville Metro)",
  ahj: {
    office: "Louisville Metro Department of Codes and Regulations, Office of Construction Review",
    process:
      "Louisville Metro's Office of Construction Review administers commercial construction permits and electronic plan review through the city's online permitting services. Building review is coordinated with zoning, fire, public works, MSD sewer/drainage, and utility work as applicable; applicants should resolve land-development and floodplain questions before relying on a building-permit submittal alone.",
  },
  codes: {
    building: "2024 Kentucky Building Code, based on the 2018 International Building Code, enforced by Louisville Metro",
    energy: "Kentucky Energy Code commercial provisions based on the 2021 IECC, with ASHRAE 90.1 as an alternate compliance path",
    amendments:
      "Kentucky's mini/maxi code structure makes the Kentucky Building Code a mandatory statewide minimum, so Louisville Metro cannot replace it with a weaker local code. Louisville Metro zoning, MSD drainage and sewer requirements, floodplain rules along the Ohio River, and public-right-of-way requirements are distinct local layers.",
  },
  utilities: {
    electric: "Louisville Gas and Electric (LG&E) provides electric and natural-gas service in Louisville",
    notes:
      "LG&E requires service and distributed-generation coordination for new or expanded commercial loads; service layout and capacity discussions belong early in design. Louisville Water provides potable water, while the Louisville and Jefferson County Metropolitan Sewer District (MSD) administers wastewater, drainage, and stormwater infrastructure.",
  },
  climateNotes:
    "Louisville is in ASHRAE climate zone 4A, with humid summers, winter heating and freeze-thaw exposure, and Ohio River floodplain risk. Alluvial soils, variable fill on redevelopment sites, and localized karst/limestone conditions make borings and infiltration assumptions site-specific.",
  marketNotes:
    "Louisville's active sectors include airport and logistics development associated with UPS Worldport, Ford and supplier manufacturing, bourbon production and visitor facilities, healthcare, and downtown infill. River, rail, interstate, and airport access make utility-intensive warehouse and industrial work a recurring part of the local pipeline.",
  narratives: {
    mep:
      "Louisville MEP design has to serve both humid cooling weather and real winter heating in zone 4A. HVAC selections address latent control, heating capacity, freeze protection, and shoulder-season controls instead of optimizing for only one season. LG&E service configuration and capacity must be resolved early for airport-logistics, manufacturing, healthcare, and distillery-related loads, and any on-site generation follows the utility's interconnection process. Louisville Water connections and MSD sanitary and stormwater infrastructure are parallel coordination tracks, especially on older urban or river-adjacent sites. The Kentucky Energy Code's 2021-IECC commercial baseline, with the ASHRAE 90.1 alternate, informs the envelope, lighting, and mechanical documentation submitted through Louisville Metro's review process.",
    structural:
      "Louisville structural design is driven chiefly by gravity, wind, snow, flood exposure, and ground conditions; seismic demand is lower than in western Kentucky but still must be established from site-specific code parameters. The Ohio River floodplain can set the lowest-floor and equipment datum, while freeze-thaw weather and roof snow/drift inform exterior and roof detailing. Alluvial deposits near the river, redevelopment fill, and variable limestone or karst conditions elsewhere mean a geotechnical report should guide bearing, settlement, groundwater, and foundation choices. The 2024 Kentucky Building Code provides a consistent code base, while infill, adaptive-reuse, and industrial additions require careful existing-structure and special-inspection coordination with Louisville Metro.",
    civil:
      "Louisville civil engineering begins with MSD's drainage and sewer requirements and the site's relationship to the Ohio River floodplain. Detention, conveyance, water-quality controls, and sewer connections must work with the available public system rather than simply meeting a generic runoff calculation. Variable soils and potential karst make infiltration and underground storage a geotechnical decision, and floodplain constraints can shape grading, compensatory storage, and finished-floor elevations. Kentucky construction-stormwater coverage and a SWPPP are required for qualifying disturbance. We coordinate access, grading, utility corridors, and any public-right-of-way work with Louisville Metro and MSD early, which is especially important on constrained logistics and urban redevelopment parcels.",
    energy:
      "Louisville commercial energy documentation follows Kentucky's 2021-IECC-based Energy Code, or the applicable ASHRAE 90.1 alternative, within the statewide mini/maxi code structure. Zone 4A rewards a balanced package: continuous insulation and air-barrier continuity lower winter heating loss, while low solar gain, efficient cooling, and humidity control improve summer operation. For large distribution, manufacturing, and healthcare facilities, lighting controls, ventilation strategy, plant part-load performance, and LG&E demand profile matter as much as the nominal envelope values. We coordinate those items into COMcheck or a performance-model path and reconcile them with actual electrical service and resilient equipment choices before review.",
  },
  faqs: [
    {
      q: "Who handles commercial permits in Louisville?",
      a: "Louisville Metro Department of Codes and Regulations, Office of Construction Review administers commercial construction permits and plan review. Zoning, fire, public works, MSD drainage/sewer, utility, and floodplain issues can be separate but coordinated parts of a complete project approval.",
    },
    {
      q: "What codes apply to Louisville commercial construction?",
      a: "Louisville Metro enforces the 2024 Kentucky Building Code, based on the 2018 IBC, and Kentucky's 2021-IECC-based commercial energy provisions. Kentucky's mini/maxi structure supplies a mandatory statewide minimum, with ASHRAE 90.1 available as an energy-code alternative.",
    },
    {
      q: "Which utilities should be involved early?",
      a: "LG&E should be involved for electric, gas, and distributed-generation service planning; Louisville Water provides potable water; and MSD manages wastewater, drainage, and stormwater infrastructure. Large loads, new connections, and older-system capacity should be addressed during layout rather than after permit submission.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 84, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://louisvilleky.gov/government/construction-review"],
      codes: ["https://dhbc.ky.gov/newstatic_info.aspx?static_id=297"],
      amendments: ["https://dhbc.ky.gov/newstatic_info.aspx?static_id=297"],
      utilities: ["https://lge-ku.com/business", "https://louisvillewater.com/"],
      climate: ["https://www.weather.gov/lmk/"],
      market: ["https://louisvilleky.gov/government/economic-development"],
    },
  },
};