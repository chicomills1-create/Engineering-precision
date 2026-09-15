import type { CityData } from "../types";

export const portland: CityData = {
  slug: "portland",
  name: "Portland",
  stateSlug: "oregon",
  county: "Multnomah County",
  ahj: {
    office: "City of Portland Bureau of Development Services",
    process:
      "The Bureau of Development Services accepts commercial permit applications and plans through DevHub and routes complete projects through building, life-safety, zoning, site, and utility review as applicable. Early Assistance meetings are available for projects with significant land-use, site, or infrastructure questions; building permits do not replace Bureau of Environmental Services, Portland Water Bureau, transportation, or land-use approvals.",
  },
  codes: {
    building: "2022 Oregon Structural Specialty Code (OSSC), enforced by the City of Portland",
    energy: "2022 Oregon Energy Efficiency Specialty Code (OEESC) for commercial buildings",
    amendments:
      "Oregon's specialty codes are statewide mandatory codes, so Portland does not substitute a separate local commercial building-code edition. Portland's locally adopted zoning code, Title 17 public-works requirements, stormwater rules, and development-review conditions can materially change site and infrastructure design.",
  },
  utilities: {
    electric: "Portland General Electric (PGE) is the electric distribution utility for most of Portland",
    notes:
      "PGE requires new-service and distributed-generation applicants to coordinate service design and interconnection; capacity, transformer location, and electrical-room access should be resolved early for large loads. Portland Water Bureau supplies water, while the Bureau of Environmental Services administers sanitary and stormwater systems.",
  },
  climateNotes:
    "Portland is in ASHRAE climate zone 4C, a cool marine climate with a long wet season, increasing summer heat events, and episodic wildfire smoke. Cascadia seismic risk, soft and liquefiable alluvial soils in parts of the Portland Basin, and intense winter rainfall make geotechnical, moisture, and drainage investigation site-specific necessities.",
  marketNotes:
    "Portland-area work includes central-city adaptive reuse and multifamily, healthcare and education facilities, and industrial and logistics development along the Columbia Corridor. The wider metro's semiconductor and advanced-manufacturing activity in Washington County, together with Portland's mass-timber ecosystem and decarbonization policies, sustains demand for complex utility, energy, and retrofit work.",
  narratives: {
    mep:
      "Portland MEP design starts with the 2022 OEESC and a 4C marine climate: heating efficiency, envelope coordination, heat recovery, wet-weather moisture control, and smoke-resilient ventilation often matter as much as peak cooling. Growing heat waves still require a credible cooling and electrical-load strategy rather than reliance on historic mild summers. PGE service design is a front-end item for laboratories, industrial tenants, and electrified central plants, while Portland Water Bureau and Bureau of Environmental Services connections proceed on their own tracks. We coordinate those utility assumptions with DevHub permit review and with equipment access, seismic restraint, and operational phasing.",
    structural:
      "Portland structural design addresses Cascadia Subduction Zone shaking as well as gravity loading. Seismic Design Category D is common, and long-duration motion, liquefaction potential, soft basin soils, and waterfront or fill conditions make the geotechnical report fundamental to the lateral system and foundation concept. The OSSC provides a uniform statewide structural basis, but existing-building investigations, special inspection, and BDS review still need project-specific documentation. Wet winters also make durable roof drainage and moisture-protected connections important, while mass timber or hybrid systems require careful fire, acoustical, vibration, and connection coordination.",
    civil:
      "Civil work in Portland is shaped by the City's Stormwater Management Manual and the Bureau of Environmental Services' connection and source-control requirements, not only by a detention calculation. Infiltration testing, soil limitations, groundwater, and winter rainfall determine whether green streets, planters, infiltration facilities, or other flow-control and treatment approaches fit the parcel. Water connections coordinate with Portland Water Bureau, and work in streets or sidewalks requires Portland Bureau of Transportation review. We reserve space for utilities, stormwater, accessible routes, and construction access at the first layout, then coordinate erosion and sediment controls with Oregon's construction-stormwater requirements.",
    energy:
      "Commercial energy compliance in Portland is documented to the 2022 OEESC, Oregon's statewide code, rather than a generic IECC worksheet. In the cool, damp marine climate, continuous insulation, air-barrier continuity, controlled ventilation, heat recovery, efficient heat-pump systems, and lighting controls work together to manage both energy and condensation risk. Portland's energy and climate policies, plus PGE service and distributed-energy coordination, make early load modeling especially valuable for electrification or solar-ready decisions. The compliance package should be coordinated with architectural details and MEP schedules before BDS review, not treated as a late permit attachment.",
  },
  faqs: [
    {
      q: "Which commercial building and energy codes apply in Portland?",
      a: "Portland enforces Oregon's mandatory 2022 Oregon Structural Specialty Code and 2022 Oregon Energy Efficiency Specialty Code. The City also reviews local zoning, stormwater, public-works, and utility requirements, which are separate from the statewide specialty-code baseline.",
    },
    {
      q: "Who coordinates electric, water, sewer, and stormwater service for a Portland project?",
      a: "PGE coordinates electric service and distributed-generation interconnection for most city projects. Portland Water Bureau manages water service, and the Bureau of Environmental Services manages sanitary and stormwater systems; each connection and public-infrastructure component needs its own early coordination.",
    },
    {
      q: "What site risks should be assessed early in Portland?",
      a: "A Portland site should be screened for Cascadia seismic effects, liquefaction or soft alluvial soils, groundwater, winter-rain drainage, and—in appropriate locations—flood exposure. The City's Stormwater Management Manual and site-specific infiltration testing can affect usable area and grading from the outset.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 88, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.portland.gov/bds/permit-review-process"],
      codes: ["https://www.oregon.gov/bcd/codes-stand/pages/adopted-codes.aspx"],
      amendments: ["https://www.portland.gov/so/group/762"],
      utilities: ["https://portlandgeneral.com/business", "https://www.portland.gov/water", "https://www.portland.gov/bes"],
      climate: ["https://www.weather.gov/wrh/climate?wfo=pqr"],
      market: ["https://prosperportland.us/"],
    },
  },
};