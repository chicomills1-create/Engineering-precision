import type { CityData } from "../types";

export const cambridge: CityData = {
  slug: "cambridge",
  name: "Cambridge",
  stateSlug: "massachusetts",
  county: "Middlesex County",
  ahj: {
    office: "City of Cambridge Inspectional Services Department (ISD), 831 Massachusetts Avenue",
    process:
      "Cambridge's Inspectional Services Department issues building permits under Section 110 of the Massachusetts State Building Code (780 CMR) through the city's online permitting portal (OpenGov) — an application is not considered received until its invoice is issued and payment processed. State law gives the building official 30 days to act on a complete application (780 CMR 105.3.1), but the real schedule sits in the approvals stacked before and around the permit: zoning compliance review with the Community Development Department, Planning Board special permits for projects over 50,000 square feet, Cambridge Historical Commission approval for structures in historic or neighborhood conservation districts (and demolitions of buildings over 50 years old), and City Council approval for new or expanded curb cuts. Permits issue only to construction supervisors licensed by the city or the state.",
  },
  codes: {
    building: "Massachusetts State Building Code, 10th Edition (780 CMR), based on the 2021 International Building Code with Massachusetts amendments — the sole code in effect since the concurrency period ended June 30, 2025",
    energy: "Massachusetts Specialized Stretch Energy Code (225 CMR 23.00, Appendix CC for commercial), adopted by Cambridge effective July 1, 2023 — IECC 2021 with Massachusetts amendments plus the Specialized opt-in requirements; Cambridge's fossil-fuel-free ordinance for new construction and major renovations (effective March 22, 2024, with lab, hospital, and medical-office exemptions) layers on top",
    amendments:
      "Massachusetts law does not let cities amend 780 CMR — Cambridge's local layer is energy and land use, and it is unusually deep: the city was in the first wave to adopt the Specialized Stretch Code (July 1, 2023), joined the state fossil-fuel-free building pilot with a local ordinance effective March 22, 2024 requiring new buildings and major renovations to be fossil-fuel-free (labs, hospitals, and medical offices exempt), and its Building Energy Use Disclosure Ordinance (BEUDO), as amended in 2023, requires large existing buildings to reach net-zero emissions — non-residential buildings of 100,000+ square feet by 2035. Zoning, historic-district, and curb-cut approvals are the other Cambridge-specific gates.",
  },
  utilities: {
    electric: "Eversource (electric and natural gas delivery)",
    notes:
      "Eversource delivers electricity and natural gas in Cambridge, so new services and capacity run through Eversource's interconnection and service process — though Cambridge's fossil-fuel-free ordinance means most new projects design all-electric and use gas only within its exemptions. Water is the City of Cambridge Water Department, supplying the city's own reservoir system, and sewer collection is municipal with treatment through the Massachusetts Water Resources Authority (MWRA) — so capacity and backflow review sit with city departments while electric service design sits with Eversource. Kendall Square lab projects should start Eversource capacity conversations early; substation capacity is a known planning constraint in the district.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) on the Charles River: cold, snowy winters with significant ground snow loads and nor'easter exposure, warm humid summers, and riverine and stormwater flooding risk in low-lying districts such as Alewife and East Cambridge that the city's climate vulnerability assessments map in detail. Freeze-thaw, snow drift at the dense roofscape, and flood resilience drive envelope and structural design alongside the Specialized Code's thermal requirements.",
  marketNotes:
    "Cambridge is a global life-science and research market: Harvard University and MIT anchor the city, and Kendall Square — routinely called the most innovative square mile on the planet — concentrates biotech and pharmaceutical firms (Novartis's research institute in Technology Square among them), technology companies, and lab development at a density unmatched in the region. Commercial work is dominated by laboratory construction and fit-out, institutional expansion for the two universities, multifamily housing, and energy retrofits of large existing buildings driven by BEUDO's net-zero deadlines.",
  narratives: {
    mep:
      "MEP design in Cambridge is an energy-code-first discipline: the building code is the statewide 10th Edition 780 CMR (2021 IBC base), but mechanical and electrical design is governed in practice by the Specialized Stretch Code's Appendix CC and the city's fossil-fuel-free ordinance — new buildings and major renovations are all-electric or electric-ready, with labs, hospitals, and medical offices the named exemptions. Lab ventilation and process loads in Kendall Square dominate system sizing, Eversource capacity must be confirmed early, and ISD plan review runs on the state's 30-day decision clock once the application is complete and paid.",
    structural:
      "Structural design in Cambridge follows 780 CMR 10th Edition with Massachusetts amendments: zone 5A snow loads with serious drift conditions on a dense, parapet-heavy roofscape, low seismic demand, and — in the Alewife and East Cambridge lowlands — soft soils and high groundwater that push foundations toward deep systems and careful dewatering. Much of the work is inside existing masonry and mill-era structures, where the IEBC-based provisions of 780 CMR and Historical Commission review shape what alterations are even available.",
    civil:
      "Civil design in Cambridge works in a fully built Charles River city: municipal water from the city's own reservoir system, city sewer collection to MWRA treatment, and stormwater rules tightened by the city's climate vulnerability work in flood-prone Alewife and East Cambridge. New or expanded curb cuts need City Council approval before a building permit can issue, historic and neighborhood conservation districts add Historical Commission review, and projects over 50,000 square feet need a Planning Board special permit before ISD review begins in earnest.",
    energy:
      "Energy compliance in Cambridge is the strictest in this region by design: the Specialized Stretch Code (225 CMR 23.00 Appendix CC, IECC 2021 base with MA amendments) has applied since July 1, 2023, the fossil-fuel-free ordinance has required new construction and major renovations to go fossil-fuel-free since March 2024, and BEUDO's 2023 amendment puts large existing buildings on a net-zero trajectory — 100,000+ square foot non-residential buildings by 2035. Energy modeling is not a compliance formality here; it is the project's central design document, reviewed against both the Specialized Code and the city's disclosure regime.",
  },
  faqs: [
    {
      q: "What building code does Cambridge, MA enforce?",
      a: "The Massachusetts State Building Code, 10th Edition (780 CMR), based on the 2021 IBC with Massachusetts amendments — the only edition in effect since June 30, 2025. Massachusetts cities cannot amend 780 CMR locally; Cambridge's own layer is its energy codes, zoning, and historic-district approvals, administered by the Inspectional Services Department.",
    },
    {
      q: "What energy code applies to new commercial buildings in Cambridge?",
      a: "The Massachusetts Specialized Stretch Energy Code (225 CMR 23.00, Appendix CC), in effect in Cambridge since July 1, 2023, plus the city's fossil-fuel-free ordinance (effective March 22, 2024) requiring new buildings and major renovations to be fossil-fuel-free, with exemptions for labs, hospitals, and medical offices. Large existing buildings also face BEUDO net-zero deadlines.",
    },
    {
      q: "What approvals come before a Cambridge building permit?",
      a: "Zoning compliance (with a Planning Board special permit for projects over 50,000 sq ft), Cambridge Historical Commission approval in historic or neighborhood conservation districts and for demolitions of buildings over 50 years old, and City Council approval for new or expanded curb cuts. Applications are filed through the city's online portal and count as received only once the permit invoice is paid; the building official then has 30 days to act under 780 CMR 105.3.1.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 46, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cambridgema.gov/services/buildingpermits"],
      codes: ["https://www.mass.gov/handbook/tenth-edition-of-the-ma-state-building-code-780"],
      amendments: ["https://www.mass.gov/info-details/massachusetts-building-energy-codes"],
      utilities: ["https://www.thenewplace.com/boston-manchester/neighborhoods/"],
      climate: ["https://www.cambridgema.gov/CDD/Projects/Climate/~/media/13E112045F904992B0953849E9846011.ashx"],
      market: ["https://news.mit.edu/2002/biofacts-0508"],
    },
  },
};
