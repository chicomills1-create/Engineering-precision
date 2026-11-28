import type { CityData } from "../types";

export const gainesville: CityData = {
  slug: "gainesville",
  name: "Gainesville",
  stateSlug: "florida",
  county: "Alachua County",
  ahj: {
    office: "City of Gainesville Building Division, Department of Sustainable Development (Thomas Center Building B, 306 NE 6th Avenue)",
    process:
      "Gainesville's Building Division takes applications online through PermitGNV (the city's Citizenserve portal), by email, by mail, or in person; email and mail filings are entered into PermitGNV by staff and a city permit expeditor contacts the applicant with fees due. When plan review is required, the applicant receives a ProjectDox link for electronic plan upload — construction documents go to ProjectDox, not PermitGNV. Building, plumbing, and electrical permits are filed as separate records and reviewed in parallel, and the division runs a formal private provider program under Florida's alternative plan review and inspection statute for schedule-critical projects. Owner-builders must appear in person to sign the application and statutory affidavits.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023) — Building volume, effective December 31, 2023, with the 2020 NEC and the Florida Fire Prevention Code, 8th Edition",
    energy: "Florida Building Code, Energy Conservation, 8th Edition (2023)",
    amendments:
      "Florida's code is genuinely statewide, so Gainesville designs to the FBC 8th Edition rather than a local code; the city's local layer is procedural. Its commercial checklist requires a separate permit for every sub-trade and separate plan reviews for fire, hood, cooler/freezer, pool/spa, generator, accessory structure, and sign work, grease traps need Gainesville Regional Utilities water/wastewater engineering approval evidenced in the set, and University of Florida campus construction is enforced by the university's own building code office, not the city.",
  },
  utilities: {
    electric: "Gainesville Regional Utilities (GRU) — the city-owned municipal utility",
    notes:
      "GRU is a municipally owned, multi-service utility — electric, natural gas, water, wastewater, and telecommunications — so a Gainesville commercial project coordinates nearly all utility work with one city-owned provider, including GRU engineering approval of grease traps and service sizing. GRU owns its generation fleet, and its electric rates and capacity planning are set locally rather than by an investor-owned utility. Note that GRU gas serves only parts of the city; some areas are electric-only, so gas availability must be confirmed by address before designing gas service.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) in north-central Florida: a long, humid cooling season, intense convective rainfall, and hurricane-influenced wind design under the FBC — Gainesville is inland of both coasts, so it sits outside the High-Velocity Hurricane Zone, but wind-borne debris and flood design still apply, and low-lying areas along Hogtown Creek and the city's sinkhole-prone karst terrain add flood and geotechnical drivers.",
  marketNotes:
    "Gainesville's market orbits the University of Florida — one of the nation's largest universities — and UF Health Shands, the region's academic medical center, with Santa Fe College and a growing innovation district (Innovation Square and the UF Innovate hub) feeding lab, office, and student-housing construction. State and county government, healthcare expansion, and student-oriented multifamily dominate the commercial pipeline, while the surrounding Alachua County growth pushes retail and logistics toward the I-75 corridor.",
  narratives: {
    mep:
      "MEP design in Gainesville is documented to the Florida Building Code 8th Edition — Mechanical, Plumbing, and Fuel Gas volumes — with electrical work to the 2020 NEC, and the permit structure shapes the work: every sub-trade takes its own permit record in PermitGNV, plans are reviewed electronically in ProjectDox, and fire, hood, and generator work each take separate plan reviews. Utility coordination is unusually consolidated because GRU is the city-owned provider for electric, gas, water, and wastewater — but GRU gas does not reach every address, so service availability checks come before equipment selection.",
    structural:
      "Gainesville structural design is governed by the FBC 8th Edition wind provisions: inland Alachua County is outside the High-Velocity Hurricane Zone, but hurricane-season storms tracking across the peninsula still set ultimate wind speeds and component-and-cladding pressures, and wind-borne debris protection applies where triggered. The geotechnical signature is karst — limestone terrain with sinkhole potential — so foundation design follows the geotechnical report closely, and flood design applies along Hogtown Creek and the city's low-lying basins.",
    civil:
      "Civil design in Gainesville works within a university city built over karst: stormwater design must manage intense Florida rainfall while protecting the Floridan aquifer, and retention and water-quality treatment are scrutinized because so much of the city drains toward sinkholes and creek systems. Site work that went through the city's Development Review takes a separate site work permit processed through ProjectDox, GRU handles water and wastewater capacity as the municipal utility, and food-service projects need GRU grease-trap approval documented in the building set.",
    energy:
      "Energy compliance in Gainesville is documented to the Florida Building Code, Energy Conservation, 8th Edition (2023), using the state's prescriptive or performance paths with the required compliance forms in the submittal. In zone 2A the margin is won on cooling efficiency, dehumidification, and envelope solar control, and because GRU is a municipal utility, owners can layer GRU's local efficiency programs onto code compliance rather than dealing with an investor-owned utility's program menu.",
  },
  faqs: [
    {
      q: "How do I apply for a building permit in Gainesville, FL?",
      a: "Online through PermitGNV, the city's Citizenserve portal — or by email, mail, or in person at the Building Division (Thomas Center Building B, 306 NE 6th Avenue). If plan review is required, you receive a ProjectDox link to upload construction documents; each sub-trade takes its own permit, and a private provider option exists under Florida law for plan review and inspections.",
    },
    {
      q: "What building code does Gainesville enforce?",
      a: "The Florida Building Code, 8th Edition (2023) — all volumes including Building, Energy Conservation, Plumbing, Mechanical, and Accessibility — effective December 31, 2023, with the 2020 NEC and the 8th Edition Florida Fire Prevention Code. The code is statewide; Gainesville's local layer is procedural, including separate trade permits and separate reviews for fire, hood, generator, and sign work.",
    },
    {
      q: "Who provides utilities in Gainesville?",
      a: "Gainesville Regional Utilities (GRU), the city-owned municipal utility, provides electric, natural gas, water, wastewater, and telecommunications service. GRU engineering must approve grease traps for food-service projects, and GRU gas reaches only parts of the city, so confirm gas availability by address.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 50, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.gainesvillefl.gov/Government-Pages/Government/Departments/Sustainable-Development/Building-Division"],
      codes: ["https://www.gainesvillefl.gov/Government-Pages/Government/Departments/Sustainable-Development/Building-Division"],
      amendments: ["https://gainesville.prelive.opencities.com/files/assets/public/v/3/sustainable-development/building-inspection/documents/commercial-building-checklist.pdf"],
      utilities: ["https://www.doineedapermit.org/permits/kitchen-remodel/gainesville-fl"],
      climate: ["https://www.floridabuilding.org/c/default.aspx"],
      market: ["https://alliancepermitting.com/guides/florida/gainesville-building-permit"],
    },
  },
};
