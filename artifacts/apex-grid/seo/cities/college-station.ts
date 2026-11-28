import type { CityData } from "../types";

export const collegeStation: CityData = {
  slug: "college-station",
  name: "College Station",
  stateSlug: "texas",
  county: "Brazos County",
  ahj: {
    office: "City of College Station Planning & Development Services, Building Division, 1101 Texas Avenue",
    process:
      "College Station's Building Division, inside Planning & Development Services at City Hall, reviews commercial applications, site plans, and construction documents for code and planning/zoning compliance before a permit issues, with applications, status, and inspections handled through the city's eTRAKiT portal. All contractors must be registered with the City of College Station before pulling permits — a step out-of-town teams miss — and site civil work across the Bryan–College Station area is drawn to the two cities' shared Unified Design Guidelines, technical specifications, and standard construction details, so a Bryan-standard civil set is not automatically a College Station set.",
  },
  codes: {
    building: "2021 International Building Code with City of College Station local amendments (adopted 2022 with the 2021 I-code family and the 2020 NEC)",
    energy: "2021 International Energy Conservation Code with local amendments; Texas state energy requirements through SECO also apply to public and institutional work",
    amendments:
      "College Station adopted the full 2021 I-code family — IBC, IRC, IPC, IMC, IFGC, IECC, and IPMC — each with its own published local amendment package, alongside the 2020 NEC, through its Construction Board of Adjustment and Appeals process in 2022. Site development is further governed locally by the Bryan–College Station Unified Design Guidelines for infrastructure, utilities, fire access, and hydrant placement, which function as a second amendment layer every civil and fire-protection set must satisfy.",
  },
  utilities: {
    electric: "College Station Utilities (CSU) — the city-owned electric utility",
    notes:
      "College Station runs its own municipal utilities end to end: College Station Utilities provides electric service (buying wholesale power and delivering over the city system), water, and wastewater, so new commercial services, capacity checks, and utility extensions are coordinated inside city government alongside the permit rather than with an investor-owned utility. That consolidation speeds answers but puts CSU standards and the Unified Design Guidelines at the center of service design. Natural gas in the area is Atmos Energy. Neighboring Bryan has its own municipal utility (BTU), and the two systems' territories meet at the city line — confirm the parcel's city before assuming the provider.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) in the Brazos Valley: long, humid cooling seasons with design temperatures in the upper 90s, heavy convective rainfall and flash-flood exposure along the Brazos River tributaries, and episodic winter freezes. Expansive Gulf Coast clays underlie much of the city, and seismic demand is negligible — moisture movement and stormwater, not earthquakes, drive the engineering.",
  marketNotes:
    "College Station is a single-anchor market: Texas A&M University — one of the largest universities in the nation, with roughly 79,000 students — plus the Texas A&M University System and the RELLIS Campus drive student housing, research, lab, and hospitality construction, and Fujifilm Diosynth Biotechnologies' biologics campus anchors a growing life-sciences sector. Baylor Scott & White and St. Joseph Health serve the medical market, and the Northgate entertainment district and Century Square mixed-use development feed retail and restaurant work — nearly every commercial pipeline in the city traces back to enrollment and the university's capital program.",
  narratives: {
    mep:
      "MEP design in College Station starts with the utility: College Station Utilities is the city's own electric, water, and wastewater provider, so service sizing and extensions are engineered to CSU standards inside the same city government that issues the permit. Codes are the 2021 I-codes with local amendments and the 2020 NEC, energy compliance documents to the 2021 IECC, and in zone 2A the design fight is cooling capacity and humidity control for student housing, lab, and medical loads. Contractors must be city-registered before permits issue, and Texas A&M-area institutional work may also carry SECO state energy requirements.",
    structural:
      "Structural design in College Station is governed by expansive Gulf Coast clay: foundation design follows the geotechnical report, with drilled piers, post-tension slabs, and moisture conditioning used to ride seasonal shrink-swell, while the 2021 IBC wind provisions for inland Texas shape the envelope against severe thunderstorms. Seismic demand is negligible, so gravity, uplift, and soil movement control — and the fast-track student housing market adds schedule pressure to get foundation packages released early.",
    civil:
      "Civil design in College Station is drawn to the Bryan–College Station Unified Design Guidelines — the shared manual for streets, utilities, drainage, fire access, and hydrant placement that both cities enforce — on top of the city's own development standards. Sites drain toward Brazos River tributaries with heavy convective rainfall, so detention and floodplain checks come early; water, sewer, and electric extensions all run through College Station Utilities, and university-adjacent projects must also thread Texas A&M's growth on the main campus and RELLIS.",
    energy:
      "Energy compliance in College Station is documented to the 2021 IECC with local amendments, with COMcheck the standard commercial documentation route. In zone 2A the compliance margin is decided by cooling efficiency, dehumidification, and duct sealing, and CSU's municipal rate structure changes the payback math versus investor-owned territory. Public and university-system buildings can additionally fall under Texas SECO energy standards, which should be confirmed at project kickoff rather than at submittal.",
  },
  faqs: [
    {
      q: "What building code does College Station enforce?",
      a: "The 2021 I-code family with City of College Station local amendments — 2021 IBC, IRC, IPC, IMC, IFGC, IECC, and IPMC — adopted in 2022 alongside the 2020 NEC. Site infrastructure must also meet the Bryan–College Station Unified Design Guidelines.",
    },
    {
      q: "Who provides electric, water, and sewer service in College Station?",
      a: "College Station Utilities (CSU), the city-owned utility, provides electric, water, and wastewater service, so service design and capacity are coordinated inside city government with the permit. Natural gas is Atmos Energy. Bryan next door has its own municipal utility (BTU), so confirm the parcel's city.",
    },
    {
      q: "Do contractors need to register with the City of College Station?",
      a: "Yes. All contractors must be registered in the City of College Station before permits are issued, in addition to holding any required Texas state trade licenses. Applications, permit status, and inspections run through the city's eTRAKiT portal under Planning & Development Services.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 45, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cstx.gov/living-here/building-and-renovating/building-permits/single-family-dwellingduplex/"],
      codes: ["https://opendoc.cstx.gov/ScanGIS/edoc/1658937/03222022 -  Agenda Packet - Construction Board of Adjustments.pdf?dbid=0&repo=DOCUMENT-SERVER"],
      amendments: ["https://www.bryantx.gov/fire/fire-protection-systems-permits-inspections/"],
      utilities: ["https://www.cstx.gov/living-here/building-and-renovating/building-permits/single-family-dwellingduplex/"],
      climate: ["https://www.cstx.gov/living-here/building-and-renovating/building-permits/single-family-dwellingduplex/"],
      market: ["https://www.bryantx.gov/fire/fire-protection-systems-permits-inspections/"],
    },
  },
};
