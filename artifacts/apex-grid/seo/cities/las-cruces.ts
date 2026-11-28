import type { CityData } from "../types";

export const lasCruces: CityData = {
  slug: "las-cruces",
  name: "Las Cruces",
  stateSlug: "new-mexico",
  county: "Doña Ana County",
  ahj: {
    office: "City of Las Cruces Community Development Department, Building Safety Division (Las Cruces Development Center)",
    process:
      "Las Cruces' Building Safety Division, within the Community Development Department, permits and inspects all construction inside the city limits under Chapter 30 of the Las Cruces Municipal Code and the Land Development Code; parcels outside the corporate limits fall to Doña Ana County instead — the first jurisdictional check on any Mesilla Valley project. Small projects such as fences and small sheds can clear over the counter, while additions, new structures, and electrical or HVAC work go to plan review, which the city typically turns in about 2–3 weeks for standard projects with 1–2 weeks on resubmittals. Reviewers enforce the city's amended climatic design table and require signed wind-load documentation for roof additions and attached structures — a submittal element out-of-state teams routinely omit.",
  },
  codes: {
    building: "2021 International Building Code as adopted by the State of New Mexico Construction Industries Division (14.7.2 NMAC) and by the City of Las Cruces with local amendments (Ordinance No. 3050, Chapter 30, Division 17 of the Las Cruces Municipal Code)",
    energy: "2018 International Energy Conservation Code as adopted through New Mexico rule 14.7.6 NMAC and listed in Las Cruces Land Development Code §30-721",
    amendments:
      "Las Cruces adopts the state Construction Industries Division's 2021 codes with its own amendments in Land Development Code §§30-721–30-722: the city's amended climatic design table sets a 5 psf ground snow load, 115 mph design wind speed, Seismic Design Category C, negligible weathering, a 6-inch frost line depth, and moderate-to-heavy termite exposure — figures far lighter on snow and frost than northern New Mexico but with real wind and seismic values. Locally, reviewers require footings to penetrate below the desert caliche layer or bear entirely above it, and the zoning code's xeriscape and impervious-cover limits shape site design.",
  },
  utilities: {
    electric: "El Paso Electric Company",
    notes:
      "El Paso Electric is the regulated electric utility for Las Cruces, so new commercial services, capacity upgrades, and interconnections run through its New Mexico service process. Unusually, the other three utilities are one city department: Las Cruces Utilities provides water (from Rio Grande wells and surface supply), wastewater, natural gas, and solid waste service, so a single utility coordination track inside city hall covers taps, capacity, and gas service for most commercial projects — a consolidation that simplifies sequencing compared with neighboring El Paso's split providers.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 3B (hot-dry) in the Mesilla Valley of the Chihuahuan Desert at roughly 3,900 feet: intense sun and summer heat, low humidity, a minimal 5 psf ground snow load and 6-inch frost line, but a 115 mph design wind speed and Seismic Design Category C. Soils are the local signature — hard caliche layers over expansive clays — and Rio Grande floodplain touches the valley floor west of the city.",
  marketNotes:
    "Las Cruces is New Mexico's second-largest city and one of its fastest-growing: New Mexico State University anchors institutional demand, White Sands Missile Range and the nearby Spaceport America drive defense and aerospace work, and Memorial Medical Center and MountainView Regional Medical Center anchor healthcare. The I-10/I-25 junction makes the city a logistics point between El Paso and Albuquerque, pecan and chile agriculture feeds food-processing industry in the Mesilla Valley, and steady retiree and Fort Bliss-driven growth keeps commercial and medical construction active.",
  narratives: {
    mep:
      "MEP design in Las Cruces is documented to the New Mexico Construction Industries Division's adopted code family — the 2021 codes as amended by the state rules (14.7 NMAC series) and the city's Chapter 30 amendments — with electrical work under the state-adopted NEC edition. In zone 3B, cooling design dominates, and high-desert altitude near 3,900 feet derates combustion and cooling equipment in ways sea-level schedules miss. Utility coordination is unusually simple: El Paso Electric for power, and Las Cruces Utilities — the city's own department — for gas, water, and sewer.",
    structural:
      "Structural design in Las Cruces follows the 2021 IBC through the city's amended climatic table in Land Development Code §30-722: 115 mph design wind and Seismic Design Category C do the lateral work, while snow (5 psf) and frost (6 inches) are nearly negligible. The controlling local condition is the ground itself — caliche layers one to four feet down over expansive clays — and the city requires footings to penetrate below the caliche or bear entirely above it, so the geotechnical report sets the foundation system before framing design begins. Wind-load documentation signed by the design professional is a checked submittal item for roof and attached-structure work.",
    civil:
      "Civil design in Las Cruces works in an arid, flash-flood regime: intense monsoon storms on desert soils drive detention and drainage design even though annual rainfall is low, and the zoning code's xeriscape standards and impervious-cover limits shape paving and landscape plans. Water, sewer, and gas all run through Las Cruces Utilities, so capacity and tap coordination happen inside city hall, and the city/county line matters — a parcel outside the corporate limits is Doña Ana County's jurisdiction with a different reviewer and fee structure.",
    energy:
      "Energy compliance in Las Cruces is documented to the 2018 IECC as adopted through New Mexico rule 14.7.6 NMAC and carried in Land Development Code §30-721 — an older energy edition than the 2021 building code it sits beside, a mismatch that must be caught on the title sheet. In hot-dry zone 3B the compliance margin is decided by cooling efficiency, envelope solar control, and duct performance, and the region's exceptional solar resource makes rooftop PV economics unusually strong under El Paso Electric's interconnection process.",
  },
  faqs: [
    {
      q: "What building codes does Las Cruces, NM enforce?",
      a: "The 2021 International Building Code and companion codes as adopted by the New Mexico Construction Industries Division and by the city (Ordinance No. 3050, Municipal Code Chapter 30) with local amendments — including the city's climatic design table (115 mph wind, Seismic Design Category C, 5 psf ground snow, 6-inch frost line). Commercial energy work follows the 2018 IECC as adopted through state rule 14.7.6 NMAC.",
    },
    {
      q: "Who issues building permits in Las Cruces?",
      a: "The City of Las Cruces Community Development Department's Building Safety Division, for property inside the city limits. Parcels outside the corporate limits are permitted by Doña Ana County instead, so confirm jurisdiction first. Standard plan review typically runs about 2–3 weeks, and signed wind-load documentation is required for roof additions and attached structures.",
    },
    {
      q: "Who provides utilities in Las Cruces?",
      a: "El Paso Electric provides electricity. Water, wastewater, natural gas, and solid waste are all provided by Las Cruces Utilities, the city's own utility department — so most utility coordination for a commercial project happens through one city office plus the electric utility.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 42, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://lascruces.civicweb.net/document/30962/AN%20ORDINANCE%20REPEALING%20AND%20REPLACING%20DIVISION%201.pdf?handle=E6BEE1BD5A3946F3A0486AD59B8C38EF"],
      codes: ["https://lascruces.civicweb.net/document/30962/AN%20ORDINANCE%20REPEALING%20AND%20REPLACING%20DIVISION%201.pdf?handle=E6BEE1BD5A3946F3A0486AD59B8C38EF"],
      amendments: ["https://newmexicobarndominiumpros.com/areas/las-cruces-nm/"],
      utilities: ["https://www.doineedapermit.org/permits/cities/las-cruces-nm"],
      climate: ["https://newmexicobarndominiumpros.com/areas/las-cruces-nm/"],
      market: ["https://www.siteplancreator.com/site-plans/las-cruces-nm"],
    },
  },
};
