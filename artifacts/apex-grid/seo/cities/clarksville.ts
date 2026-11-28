import type { CityData } from "../types";

export const clarksville: CityData = {
  slug: "clarksville",
  name: "Clarksville",
  stateSlug: "tennessee",
  county: "Montgomery County",
  ahj: {
    office: "City of Clarksville Building and Codes Department",
    process:
      "Clarksville's Building and Codes Department at 100 South Spring Street enforces the city's adopted codes and issues building, electrical, and gas permits through its online Self-Service Portal, with plan review required for commercial and multi-family work over $1,000 in valuation. Permit fees for non-single-family work run on a valuation scale starting at a $15 minimum, and the city reserves the right to require a detailed cost breakdown when a submitted valuation falls below 75 percent of the ICC Building Valuation Table. Reinspection fees apply from the second reinspection onward.",
  },
  codes: {
    building: "2018 International Building Code, including Appendices C, D, and F (adopted effective January 1, 2021), with the 2017 National Electrical Code",
    energy: "2018 International Energy Conservation Code",
    amendments:
      "Clarksville adopts the 2018 IBC by reference in Official Code Section 4-201 under Tennessee Code Annotated Sections 6-54-501 et seq., including Appendices C, D, and F but excluding all other appendices, and separately adopts the 2009 ICC A117.1 accessibility standard. Local amendments insert the city's name, delete IBC Section 3412 entirely, set flood-date references for Section 1612.3 (June 15, 1984, and June 29, 2001 for Lower Meadowbrook), and impose a $50-per-day civil fine under amended Section 114.4.",
  },
  utilities: {
    electric: "CDE Lightband — the City of Clarksville's municipal electric and broadband utility — inside the city; Cumberland Electric Membership Corporation serves much of the surrounding county",
    notes:
      "Clarksville is a municipal-utility city: CDE Lightband, a city department distributing TVA power, handles electric service and also sells broadband, while Clarksville Gas & Water — another city department — provides water, sewer, and natural gas from service centers on Cunningham Lane and Madison Street. New commercial services therefore coordinate with two city utilities rather than investor-owned providers, and addresses outside the city limits shift electric service to Cumberland Electric Membership Corporation.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 4A (mixed-humid) in the Cumberland River valley of northern Middle Tennessee: hot humid summers, real winter freezes, severe-thunderstorm and tornado exposure, and riverine flooding along the Cumberland and its tributaries — the flood dates written into the city's own IBC amendments reflect that history.",
  marketNotes:
    "Clarksville is one of Tennessee's fastest-growing cities, driven by Fort Campbell — the Army post straddling the Kentucky line whose soldiers and families anchor housing and retail demand — plus Austin Peay State University and an industrial base that includes Hankook Tire's plant, LG Electronics, and Google's data center in Montgomery County. Commercial work concentrates in retail and medical corridors along Wilma Rudolph Boulevard and Fort Campbell Boulevard, multi-family, and industrial expansion.",
  narratives: {
    mep:
      "MEP design in Clarksville is documented to the 2018 I-codes with the 2017 NEC, enforced by the city Building and Codes Department through its Self-Service Portal. The utility picture is municipal on both sides: CDE Lightband for electric service and Clarksville Gas & Water for gas, water, and sewer, so service applications, capacity checks, and meter coordination all run through city departments — a simpler map than most Tennessee cities, provided the team confirms whether the address sits inside CDE territory or Cumberland Electric's county service area.",
    structural:
      "Clarksville structural design under the 2018 IBC balances zone 4A wind and severe-storm exposure against Cumberland River floodplain constraints — the city's local amendments hard-code its flood insurance dates into Section 1612.3, a reminder that flood elevation drives many sites. Seismic demand is moderate but real in the New Madrid influence zone, and rapid-growth subdivisions and industrial buildings alike sit on the area's limestone and clay soils.",
    civil:
      "Civil design in Clarksville is growth infrastructure: new subdivisions, retail pads, and industrial sites tying into city water and sewer run by Clarksville Gas & Water, with stormwater design shaped by the Cumberland River and tributaries such as the Red River and West Fork Creek. Floodplain documentation and detention for intense mixed-humid storm events carry weight in review, and county-line sites near Fort Campbell add federal-neighbor coordination.",
    energy:
      "Energy compliance in Clarksville is documented to the 2018 IECC in climate zone 4A, where the design margin is split between humid-summer cooling and dehumidification loads and genuine winter heating. CDE Lightband's municipal rates and TVA-supplied power frame the operating-cost case for envelope and heat-pump decisions, and the city's valuation-based plan review expects the energy documentation in the commercial package.",
  },
  faqs: [
    {
      q: "Who provides electric service in Clarksville, TN?",
      a: "CDE Lightband, the City of Clarksville's municipal utility, provides electric service (and broadband) inside the city, distributing TVA power. Cumberland Electric Membership Corporation serves much of Montgomery County outside the city.",
    },
    {
      q: "What building code edition does Clarksville enforce?",
      a: "Clarksville enforces the 2018 International Building Code (Appendices C, D, and F), effective January 1, 2021, along with the 2018 IECC, 2018 IFC/IMC/IPC/IFGC, and the 2017 NEC, per the Building and Codes Department's published adopted-code list.",
    },
    {
      q: "Who provides water, sewer, and natural gas in Clarksville?",
      a: "Clarksville Gas & Water, a City of Clarksville department, provides water, sewer, and natural gas service, with customer service centers at 111 Cunningham Lane and 2215 Madison Street.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 57, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.clarksvilletn.gov/1242/Current-Adopted-Codes"],
      codes: ["https://www.clarksvilletn.gov/1242/Current-Adopted-Codes"],
      amendments: ["https://cityrulelookup.com/cities/clarksville-tn/building-safety"],
      utilities: ["https://clarksvillejournal.com/moving-here/"],
      climate: ["https://www.weather.gov/ohx/"],
      market: ["https://www.clarksvilletn.gov/1242/Current-Adopted-Codes"],
    },
  },
};
