import type { CityData } from "../types";

export const lexington: CityData = {
  slug: "lexington-fayette-urban-county",
  name: "Lexington",
  stateSlug: "kentucky",
  county: "Fayette County",
  ahj: {
    office: "Lexington-Fayette Urban County Government (LFUCG) Division of Building Inspection",
    process:
      "Because Lexington and Fayette County operate as one merged urban-county government, there is no city-versus-county split: LFUCG Building Inspection at 101 E. Vine Street reviews plans and issues permits countywide through the Accela online portal (lexingtonky.gov/permits), and contractors must be registered with the division before permits issue. Building, HVAC and fire reviews run through LFUCG, while electrical inspections are performed by the contracted Commonwealth Inspection Bureau and plumbing permits run through the state plumbing inspector — three tracks a complete submittal has to sequence from the start.",
  },
  codes: {
    building: "2018 Kentucky Building Code (2015 IBC with Kentucky amendments) — Kentucky's mandatory statewide mini/maxi code",
    energy: "2012 International Energy Conservation Code for commercial buildings, as incorporated through the Kentucky Building Code (2009 IECC applies to residential)",
    amendments:
      "Kentucky's building code is a statewide mini/maxi code: LFUCG may not add local technical amendments to the Kentucky Building Code, so Lexington's local layer is procedural rather than technical — contractor registration, the LFUCG zoning ordinance and development-plan review, the LFUCG Storm Water Manual, and separate fence and retaining-wall permits. The electrical code enforced is the 2023 NFPA 70 (NEC), notably newer than the base I-code cycle.",
  },
  utilities: {
    electric: "Kentucky Utilities Company (KU, an LG&E and KU Energy / PPL company) serves Lexington",
    notes:
      "KU is the regulated electric provider across Fayette County, and new commercial services and service upgrades are coordinated with KU's construction and interconnection process alongside the LFUCG electrical permit and Commonwealth Inspection Bureau inspection. Natural gas is Columbia Gas of Kentucky, and water is Kentucky American Water — whose Richmond Road treatment facilities are a major local industrial customer class alongside the university and hospital loads.",
  },
  climateNotes:
    "ASHRAE climate zone 4A (mixed-humid): hot humid summers, genuinely cold winters with moderate snow, and a long shoulder season. Lexington sits on the Inner Bluegrass limestone plateau, where karst features and sinkholes are a real site-design consideration and the diurnal swing rewards economizer operation.",
  marketNotes:
    "Lexington construction is anchored by the University of Kentucky and UK HealthCare's expanding medical campus, the equine industry (Keeneland and the Horse Capital of the World's farm and veterinary infrastructure), Toyota's Georgetown plant supply chain just north, and a growing downtown and distillery-district commercial stock. Healthcare, higher-education, and equine/agricultural facilities dominate the institutional pipeline.",
  narratives: {
    mep:
      "MEP design in Lexington works inside Kentucky's statewide mini/maxi code — the 2018 Kentucky Building Code with the 2012 IECC for commercial energy compliance — so the compliance basis is fixed by Frankfort, while LFUCG's Accela review, the Commonwealth Inspection Bureau's electrical inspections, and the state plumbing track set the schedule. Kentucky Utilities service sizing and demand charges shape electrical distribution for the hospital, university, and equine-facility loads that dominate the market, and zone 4A mixed-humid conditions drive both heating plant and dehumidification design.",
    structural:
      "Lexington structural design is governed by the Kentucky Building Code (2015 IBC base) with low seismic demand and moderate snow and wind. The defining local condition is Bluegrass karst: limestone bedrock, sinkholes, and solution features make the geotechnical report decisive for foundations across Fayette County, and agricultural and equine structures bring their own occupancy and load patterns to the same code basis.",
    civil:
      "Civil design in Lexington runs through LFUCG's development-plan process and the LFUCG Storm Water Manual, with detention and water-quality requirements applied countywide by the merged government. Karst drainage is the signature issue — sinkholes and closed basins change how stormwater may be detained and discharged — and Kentucky American Water and LFUCG sewer capacity coordination belong in the first site pass.",
    energy:
      "Commercial energy compliance in Lexington is documented to the 2012 IECC as incorporated in the Kentucky Building Code — an older edition than most peer cities enforce, so compliance documentation must target that edition and the ASHRAE 90.1 path it references, not a current model code. UK HealthCare and university benchmarking pressure pushes many private projects beyond code minimums even though the enforced floor is the 2012 edition.",
  },
  faqs: [
    {
      q: "Can Lexington amend the building code locally?",
      a: "No. Kentucky's building code is a statewide mini/maxi code — the 2018 Kentucky Building Code (2015 IBC with Kentucky amendments) applies uniformly, and LFUCG's local layer is procedural: contractor registration, zoning and development-plan review, and its storm water manual.",
    },
    {
      q: "Who performs electrical inspections in Lexington?",
      a: "Electrical inspections are handled by the contracted Commonwealth Inspection Bureau, not LFUCG staff, while plumbing permits run through the state plumbing inspector. Building, HVAC, and fire reviews run through LFUCG Building Inspection via the Accela portal.",
    },
    {
      q: "Who provides electric service in Lexington, KY?",
      a: "Kentucky Utilities Company (KU) is the regulated electric utility for Lexington and Fayette County. New services and upgrades are coordinated with KU alongside the LFUCG permitting track.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 72, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.lexingtonky.gov/working/building-permits"],
      codes: ["https://www.lexingtonky.gov/working/current-building-codes"],
      amendments: ["https://www.lexingtonky.gov/working/current-building-codes"],
      utilities: ["https://lge-ku.com"],
      climate: ["https://www.weather.gov/lmk/"],
      market: ["https://www.lexingtonky.gov"],
    },
  },
};
