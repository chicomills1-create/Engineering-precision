import type { CityData } from "../types";

export const arvada: CityData = {
  slug: "arvada",
  name: "Arvada",
  stateSlug: "colorado",
  county: "Jefferson County",
  ahj: {
    office: "City of Arvada Building Inspection Division, Community and Economic Development Department",
    process:
      "Arvada's application and plan review process is completely electronic through the city's eTRAKiT portal at arvadapermits.org — contractors sign in with their City of Arvada license (AEC) number, upload plans, pay fees, and schedule inspections there, and permits are no longer processed over the counter. Planning reviews the site plan first, then the set routes to the Building Safety Division's plans examiners. The city publishes that major projects such as new commercial buildings take 4 to 6 weeks for the first plan review, while permits needing no plan review typically issue within three business days of a complete application.",
  },
  codes: {
    building: "2024 International Building Code, as adopted by the City of Arvada effective July 1, 2026, with city amendments (part of the 2024 I-code family adoption)",
    energy: "Colorado Model Low Energy Carbon Code, based on the 2024 International Energy Conservation Code, adopted by Arvada effective July 1, 2026, including the state-mandated EV-ready, electric-ready, and solar-ready provisions; the 2023 National Electrical Code remains Arvada's electrical code pending state implementation of the 2026 NEC",
    amendments:
      "Arvada's July 1, 2026 adoption is a full local package: the 2024 I-codes, a new Arvada Wildfire Resiliency Code — the city's first wildfire code, adding structural hardening and defensible-space requirements in wildland-urban interface areas — and the Colorado Model Low Energy Carbon Code, which replaces IRC Chapter 11 energy provisions and drops the 2024 IECC's on-site renewable mandate. Designers working from a pre-2026 Arvada set (2021 I-codes) will be designing to a superseded cycle.",
  },
  utilities: {
    electric: "Xcel Energy (Public Service Company of Colorado) — electric and natural gas service (GE) in Arvada per Xcel's communities-served list",
    notes:
      "Xcel Energy provides both electricity and natural gas across Arvada, so new commercial services, capacity, and interconnections run through Xcel's builder/developer service process and its assigned design representatives, and Xcel verifies city permits and inspections before connecting service. Water and sewer are City of Arvada utilities — the city supplies drinking water sourced in part from Standley Lake — so water capacity, sewer connection, and stormwater review sit inside City Hall alongside the building permit, while electric and gas stay with Xcel.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5B (cool-dry) on the Front Range foothills at roughly 5,400 feet: cold winters with meaningful snow loads, intense high-altitude solar gain, large diurnal swings, and some of the nation's most damaging hail exposure. The western edge of the city carries wildland-urban interface fire risk — the driver behind Arvada's new Wildfire Resiliency Code — and expansive foothills soils appear on western sites.",
  marketNotes:
    "Arvada is a mature first-ring Denver suburb in a redevelopment and infill cycle: a revitalized Olde Town around its commuter-rail station, the Ralston Creek redevelopment corridor, the large Candelas master-planned community in the northwest, and established industrial and flex stock along the I-76 and Wadsworth corridors. Commercial work skews to retail and medical re-tenanting, mixed-use infill near transit, and industrial/flex expansion rather than raw greenfield development.",
  narratives: {
    mep:
      "MEP design in Arvada is documented to a code set that changed on July 1, 2026: the 2024 I-codes for mechanical and plumbing work, the Colorado Model Low Energy Carbon Code (2024 IECC base) for energy, and — easy to miss — the 2023 NEC, which Arvada retains until Colorado implements the 2026 edition. Service design runs through Xcel Energy for both electric and gas, while the permit routes electronically through eTRAKiT, Planning first and Building Safety second, so utility service sizing should start before the 4-to-6-week first review clock does.",
    structural:
      "Arvada structural design balances Front Range snow loads and high-altitude wind against foothills geology: western sites can carry expansive soils and sloping terrain, and properties in mapped wildland-urban interface areas now pick up hardening requirements under the city's 2026 Wildfire Resiliency Code. Seismic demand is low, so snow drift at parapets and rooftop equipment, hail-resistant roofing assemblies, and soil movement control most commercial designs under the 2024 IBC.",
    civil:
      "Civil design in Arvada works through the city's own water, sewer, and stormwater systems: drainage ties into established Front Range watersheds draining toward Ralston Creek and Clear Creek, and grading on foothills-edge sites must respect WUI defensible-space and erosion conditions. Because most commercial work is redevelopment of platted, serviced land, utility verification with the City of Arvada and Xcel service routing carry more schedule weight than raw site development.",
    energy:
      "Energy compliance in Arvada is documented to the Colorado Model Low Energy Carbon Code, based on the 2024 IECC, which the city adopted to meet Colorado's minimum mandates for EV-ready, electric-ready, and solar-ready construction. In zone 5B the compliance margin is decided by envelope performance through cold winters, control of high-altitude solar gain, and heating efficiency — and the LECC's removal of the 2024 IECC on-site renewable requirement changes the performance-path math designers may expect from the base code.",
  },
  faqs: [
    {
      q: "What building codes does Arvada enforce?",
      a: "Effective July 1, 2026, Arvada enforces the 2024 I-code family (2024 IBC, IRC, IFC, IEBC, IPC, IMC, IFGC) with city amendments, the Colorado Model Low Energy Carbon Code based on the 2024 IECC, and a new Arvada Wildfire Resiliency Code. The electrical code remains the 2023 NEC until Colorado implements the 2026 NEC.",
    },
    {
      q: "How do I apply for a commercial building permit in Arvada?",
      a: "Entirely online through the eTRAKiT portal at arvadapermits.org — Arvada no longer processes permits over the counter. Contractors sign in with their City of Arvada AEC license number. Planning reviews the site plan first, then Building Safety reviews the plans; the city puts the first review for major commercial projects at 4 to 6 weeks.",
    },
    {
      q: "Who provides utilities in Arvada, CO?",
      a: "Xcel Energy provides electric and natural gas service. Water and sewer are City of Arvada municipal utilities, so water capacity and sewer connection are coordinated with the city while electric and gas service design runs through Xcel's builder process.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 45, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.arvadaco.gov/m/faq?cat=24"],
      codes: ["https://www.arvadaco.gov/1446/For-Builders-Detailed-changes-coming-in-"],
      amendments: ["https://www.arvadaco.gov/1461/Building-Code-Adoption-Significant-Chang"],
      utilities: ["https://www.xcelenergy.com/staticfiles/xe/PDF/CO_Communities_Served.pdf"],
      climate: ["https://www.arvadaco.gov/1461/Building-Code-Adoption-Significant-Chang"],
      market: ["https://www.arvadaco.gov/419/Residential-Exterior"],
    },
  },
};
