import type { CityData } from "../types";

export const leagueCity: CityData = {
  slug: "league-city",
  name: "League City",
  stateSlug: "texas",
  county: "Galveston County",
  ahj: {
    office: "City of League City Building Department (500 W. Walker Street)",
    process:
      "League City's Building Department runs permitting through its Online Permit Portal: applicants register, submit the application with one consolidated PDF of the full plan set uploaded in the attachments, track status, request inspections, and pay fees in the portal, and the department emails when the permit is ready for payment after confirming the contractor's registration is current. Contractors register through the same portal — $150 annually, with proof of insurance naming the City of League City as certificate holder (minimum $250,000 coverage), though MEP contractors are exempt from the fee except when doing general-contractor work. All plans must state compliance with the city's adopted codes including the ultimate design wind speed and Texas Department of Insurance (TDI) windstorm requirements.",
  },
  codes: {
    building: "2021 International Building Code (adopted by Ordinance 2022-06, effective May 1, 2022; electrical work under the 2023 National Electrical Code)",
    energy: "2021 International Energy Conservation Code (city-adopted as the 2021 International Energy Code); the Texas state energy code administered through SECO also applies to commercial construction",
    amendments:
      "League City's local amendments in Ordinance 2022-06 are wind-driven: amended IRC R907.1 requires a permit for every residential roof replacement and a TDI report certifying compliance with windstorm specifications, and amended R905.7/R905.8 prohibit wood shingles and shakes on new residential construction. The split-edition trap is real here — since April 1, 2026, TDI windstorm certificates (WPI-8) are measured against the 2024 IRC under 28 TAC 5.4013 while the city permit itself is still judged against the 2021 codes. In 2025 the city repealed its local electrical amendments (Ordinance 2025-10), adopting the 2023 NEC clean.",
  },
  utilities: {
    electric: "Texas-New Mexico Power (TNMP) delivers electricity to most of League City in the deregulated ERCOT retail market (customers choose a retail provider); natural gas from CenterPoint Energy",
    notes:
      "Electric delivery in most of League City is Texas-New Mexico Power — not CenterPoint, which serves neighboring Webster and the Houston side — so new commercial services and capacity run through TNMP's builder process while the owner separately shops retail supply; some pockets toward the Harris County line are CenterPoint, so the delivery utility is worth confirming by address before design. CenterPoint Energy provides natural gas distribution across the city. Water and sewer are City of League City utilities, with the city drawing surface water through the Gulf Coast Water Authority system — and in Galveston County, TDI windstorm certification applies to utility equipment anchoring and interconnection details, not just the building shell.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) on the upper Texas Gulf Coast: hurricane and tropical-storm exposure with TDI windstorm certification territory-wide, storm surge and Clear Creek flooding, extreme heat and humidity driving year-round cooling and latent loads, and expansive Gulf Coast clays that move foundations seasonally. Hurricane Beryl's 2024 landfall near the region is the standing resilience case for envelope and backup-power design.",
  marketNotes:
    "League City is the residential and commercial engine of the Houston–Clear Lake corridor: NASA's Johnson Space Center sits minutes away in Clear Lake and its contractor ecosystem fills office and flex space along the Gulf Freeway (I-45), UTMB's League City campus and Houston Methodist Clear Lake anchor a growing medical sector, and master-planned growth keeps retail, hospitality, and mixed-use centers rising along I-45, FM 646, and League City Parkway. The South Shore Harbour waterfront district and the city's position between Houston and Galveston add marina, entertainment, and tourism work to the pipeline.",
  narratives: {
    mep:
      "MEP design in League City starts with two verifications out-of-area teams miss: the delivery utility is Texas-New Mexico Power for most addresses (CenterPoint only in pockets toward Harris County), with retail supply shopped separately in the ERCOT market, and every plan set must state the ultimate design wind speed and TDI compliance. The enforced set is the 2021 I-codes under Ordinance 2022-06 with the 2023 NEC adopted clean in 2025. In zone 2A, latent-load control dominates mechanical design, and Galveston County's windstorm regime reaches into MEP scope — rooftop equipment anchoring and generator installations carry WPI-8 windstorm paperwork that must start before installation, not after.",
    structural:
      "League City structural design is hurricane design: the 2021 IBC wind provisions applied with TDI windstorm certification (WPI-8) across Galveston County, where the certificate is now judged against the 2024 IRC while the city permit runs on the 2021 codes — both editions belong in the design narrative. Foundations contend with expansive Gulf Coast clay, typically drilled piers or post-tension systems, and flood design follows Clear Creek and coastal surge mapping, with finished-floor and equipment elevation set by the flood zone before layout begins.",
    civil:
      "Civil design in League City is drainage design: Clear Creek and its tributaries cross the city, large areas sit in mapped floodplains, and detention, impervious-cover calculations (the city requires an impervious coverage worksheet in the permit package), and finished-floor elevation drive site layout. Water and sewer are city utilities supplied through the Gulf Coast Water Authority system, and development follows the city's Unified Development Code — on Gulf Freeway corridor sites, TxDOT access and TNMP easement coordination run in parallel with the city review.",
    energy:
      "Energy compliance in League City is documented to the 2021 IECC as adopted by the city, with the Texas state energy code through SECO applying to commercial work alongside. In zone 2A the margin is decided by cooling efficiency, latent-load control, and envelope solar gain across a nearly year-round cooling season — and the post-Beryl market has added an economic layer the code does not capture: backup generation, demand management, and resilience measures that owners now price into League City projects as standard scope.",
  },
  faqs: [
    {
      q: "What building codes does League City, TX enforce?",
      a: "The 2021 International Codes adopted by Ordinance 2022-06 — 2021 IBC, IRC, IMC, IPC, IFGC, IECC, and IFC — with the 2023 National Electrical Code (adopted without local amendments in 2025). All plans must reference the adopted codes and state the ultimate design wind speed and TDI windstorm compliance.",
    },
    {
      q: "Who delivers electricity in League City?",
      a: "Texas-New Mexico Power (TNMP) delivers power to most of League City — poles, wires, meters, and new services — while customers choose a retail electric provider in the deregulated ERCOT market. Some pockets toward the Harris County line are CenterPoint Energy delivery territory, so confirm by address. CenterPoint provides the city's natural gas.",
    },
    {
      q: "Why do League City projects involve two different code editions?",
      a: "The city permit is judged against the 2021 I-codes it adopted in Ordinance 2022-06, but since April 1, 2026, Texas Department of Insurance windstorm certificates (WPI-8) are measured against the 2024 IRC under 28 TAC 5.4013. The permit set and the windstorm certificate are deliberately documented to different editions — designing only to one will stall the other.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 43, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.leaguecitytx.gov/47/Building"],
      codes: ["https://www.leaguecitytx.gov/47/Building"],
      amendments: ["https://roofexperts.com/roofing-league-city-tx/"],
      utilities: ["https://mackeyservicestx.com/local/utilities"],
      climate: ["https://mackeyservicestx.com/local"],
      market: ["https://leaguecitytx.gov/4648/Applications"],
    },
  },
};
