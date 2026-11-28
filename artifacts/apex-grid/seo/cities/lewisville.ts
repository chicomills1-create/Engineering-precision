import type { CityData } from "../types";

export const lewisville: CityData = {
  slug: "lewisville",
  name: "Lewisville",
  stateSlug: "texas",
  county: "Denton County",
  ahj: {
    office: "City of Lewisville Building Services Division (Neighborhood and Inspection Services Department)",
    process:
      "Lewisville's Building Services Division takes commercial permit applications and contractor registrations through the MyGovernmentOnline (MGO Connect) portal, with commercial fees calculated on project valuation using the city's 2021 IBC square-foot construction cost table. Plan review runs through Building Services with fire and engineering review, and the city requires a Certificate of Occupancy for every non-residential occupancy — including a change of ownership, tenant, business name, or use — before a business may open. Work started before a permit issues draws an investigation fee equal to the permit fee under the adopted code.",
  },
  codes: {
    building: "2021 International Building Code, adopted at Lewisville City Code §4-26 with local amendments at §4-28 (2021 I-code family; 2020 NEC at §4-46)",
    energy: "2021 International Energy Conservation Code as adopted by the City of Lewisville; Texas state energy requirements administered through SECO also apply",
    amendments:
      "Lewisville adopted the 2021 I-codes in Chapter 4 of its city code with local amendments — §4-28 carries the local changes, including the fee schedule cross-reference to §2-201 and an investigation fee equal to the full permit fee for work begun without a permit. The 2020 NEC with Annex H is adopted at §4-46 (Ordinance 0614-23-ORD), and the 2021 IMC was adopted with local amendments by Ordinance 0616-23-ORD. Site and zoning standards sit in the city's Unified Development Code, adopted in 2022.",
  },
  utilities: {
    electric: "Texas-New Mexico Power (TNMP) delivers electricity across most of Lewisville, with Oncor Electric Delivery serving some addresses — a deregulated ERCOT market where the customer chooses a retail provider",
    notes:
      "Lewisville sits in the deregulated ERCOT market, and the delivery utility depends on the address: TNMP — headquartered in Lewisville — owns the wires across most of the city and Oncor serves the edges, so new commercial services, meter sets, and capacity upgrades start with the delivery utility's service process, not the retail provider on the bill. Natural gas is Atmos Energy (with CoServ gas in some areas). Water and wastewater are City of Lewisville utilities — the city purchases wholesale water from Dallas Water Utilities and the Upper Trinity Regional Water District — so tap and capacity review stays inside city hall.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (hot-humid) in southern Denton County: long cooling seasons with design temperatures in the upper 90s, severe thunderstorm and hail exposure, and episodic hard freezes. Expansive Blackland Prairie clays underlie much of the city, and sites near Lake Lewisville and the Elm Fork Trinity River carry floodplain constraints.",
  marketNotes:
    "Lewisville is a mature DFW suburb at the I-35E and SH-121 interchange, with a large logistics and distribution stock along the I-35E corridor, the Castle Hills master-planned community still building out, and an Old Town district in active redevelopment. Major employers include Orthofix, headquartered in Lewisville, Sysco North Texas, Lewisville ISD, and Medical City Lewisville. Most commercial work is tenant finish-out, warehouse and flex space, medical office, and retail redevelopment rather than raw greenfield.",
  narratives: {
    mep:
      "MEP design in Lewisville starts with the delivery-utility question: most addresses are TNMP wires with Oncor at the edges, and because the market is deregulated, service sizing and new-service coordination run through the delivery utility while the owner separately chooses a retail provider. The enforced set is the 2021 I-codes with the 2020 NEC as adopted at city code §4-46, energy compliance is documented to the adopted 2021 IECC, and a Certificate of Occupancy is required for every tenant or ownership change — so finish-out packages should be sequenced around the C of O, not just the building permit.",
    structural:
      "Structural design in Lewisville is governed by expansive Blackland Prairie clay: foundations follow the geotechnical report, typically drilled piers or post-tension systems that ride seasonal moisture movement, while the 2021 IBC wind provisions and North Texas hail exposure shape the envelope and roofing assembly. Seismic demand is minimal, so gravity, uplift, and soil movement control most designs, and sites near Lake Lewisville and the Elm Fork add floodplain elevation checks.",
    civil:
      "Civil design in Lewisville works under the city's Unified Development Code and engineering standards, with drainage draining toward Lake Lewisville and the Elm Fork Trinity River watershed. Because much of the city is built out, redevelopment sites carry the load: existing utility verification — city water and sewer, TNMP or Oncor electric, Atmos gas — detention retrofits, and the city's site plan and platting process through the UDC drive the civil scope more than raw grading does.",
    energy:
      "Energy compliance in Lewisville is documented to the 2021 IECC as locally adopted, with Texas SECO state requirements in the background; COMcheck is the standard commercial documentation path. In zone 3A the compliance margin is decided by cooling efficiency, envelope solar control, and duct sealing, and the split delivery-utility map (TNMP versus Oncor delivery charges) makes the owner's retail rate structure worth modeling alongside the code minimum.",
  },
  faqs: [
    {
      q: "Who provides electric service in Lewisville, TX?",
      a: "Delivery is split: Texas-New Mexico Power (TNMP) owns the wires across most of Lewisville and Oncor Electric Delivery serves some addresses. Lewisville is in the deregulated ERCOT market, so the customer chooses a retail electric provider, but new services and capacity work run through whichever delivery utility serves the address.",
    },
    {
      q: "What building code edition does Lewisville enforce?",
      a: "The 2021 I-codes: the 2021 IBC is adopted at City Code §4-26 with local amendments at §4-28, the 2021 IMC came in by Ordinance 0616-23-ORD, and the electrical code is the 2020 NEC with Annex H at §4-46. Commercial permit fees are calculated from the city's 2021 IBC construction cost table.",
    },
    {
      q: "When does Lewisville require a Certificate of Occupancy?",
      a: "For every non-residential occupancy — and not just new construction. A change of ownership, a change of tenant, a business name change, or a change of use each requires a Certificate of Occupancy from Building Services before the business may operate in the space.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 42, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityoflewisville.com/for-business/building-services/certificate-of-occupancy"],
      codes: ["https://library.municode.com/tx/lewisville/ordinances/code_of_ordinances?nodeId=1247258"],
      amendments: ["https://library.municode.com/tx/lewisville/ordinances/code_of_ordinances?nodeId=1247258"],
      utilities: ["https://www.easttexas.com/cities/lewisville/utilities/"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://www.cityoflewisville.com/about-lewisville/lewisville-2025/big-move-diverse-and-thriving-neighborhoods"],
    },
  },
};
