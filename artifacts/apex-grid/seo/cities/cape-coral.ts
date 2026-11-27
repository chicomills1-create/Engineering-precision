import type { CityData } from "../types";

export const capeCoral: CityData = {
  slug: "cape-coral",
  name: "Cape Coral",
  stateSlug: "florida",
  county: "Lee County",
  ahj: {
    office: "City of Cape Coral Development Services Department — Building Division",
    process:
      "Cape Coral's Building Division reviews permits under the Florida Building Code through the city's online permitting services, in a city where residential volume is enormous — Cape Coral has ranked among the fastest-growing large cities in the U.S. Commercial review coordinates with Lee County and state tracks for environmental and utility permits, and Florida's private-provider option (statutory alternative plan review and inspection) is available and commonly used to manage timelines.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023) — 2021 IBC with extensive Florida amendments, mandatory statewide",
    energy: "Florida Building Code — Energy Conservation, 8th Edition (2023), Florida's IECC-based commercial energy code",
    amendments:
      "The Florida Building Code is mandatory statewide and Cape Coral cannot weaken it; the local signature is hurricane practice. Cape Coral sits in a hurricane-prone region with wind speeds and windborne-debris requirements under the FBC, extensive AE and VE flood zones across its canal waterfront, and post-Hurricane Ian (2022) enforcement attention on flood elevation, product approvals, and substantial-improvement determinations for the city's huge existing housing stock.",
  },
  utilities: {
    electric: "LCEC (Lee County Electric Cooperative) serves Cape Coral",
    notes:
      "LCEC, a not-for-profit electric cooperative, provides distribution service in Cape Coral (buying wholesale power, historically from Duke Energy Florida/FPL arrangements), and new commercial services and interconnections are coordinated with LCEC locally. The city itself provides water, irrigation, and sewer through Cape Coral Utilities — notable because much of the city was built on wells and septic, and the long-running utilities extension program keeps converting neighborhoods to central service, a recurring civil and plumbing scope.",
  },
  climateNotes:
    "ASHRAE climate zone 2A (hot-humid) on the Gulf Coast: severe cooling and dehumidification loads, hurricane wind and storm-surge exposure (Ian made landfall at Cayo Costa in 2022 with catastrophic surge in Lee County), and intense rainfall on a flat, canal-drained landscape at low elevation.",
  marketNotes:
    "Cape Coral is a pre-platted canal city of more than 400 miles of canals — the most of any city in the world — whose construction market is residential-led growth, medical expansion (Cape Coral Hospital / Lee Health), retail along Pine Island Road and Del Prado Boulevard, and a long post-Ian rebuild and elevation cycle. Commercial work follows the rooftops: healthcare, retail, marinas, and municipal facilities.",
  narratives: {
    mep:
      "MEP design in Cape Coral is documented to the Florida Building Code, 8th Edition (2023), including its Energy Conservation volume, in zone 2A where latent loads and corrosion protection for coastal air shape every system choice. LCEC coordinates commercial electric service locally, standby power is a standard design conversation after Hurricane Ian's extended outages, and the city's utilities extension program adds water and sewer conversion scopes across older neighborhoods.",
    structural:
      "Cape Coral structural design is hurricane design under the FBC: high basic wind speeds, windborne-debris protection, and Florida product approvals for envelope components, with flood-load and freeboard requirements across the canal city's AE and coastal flood zones. Post-Ian substantial-improvement and elevation work on the existing stock is a structural specialty of this market.",
    civil:
      "Civil design in Cape Coral is drainage on a pre-platted canal grid: sites discharge toward the canal system and the Caloosahatchee River under city and South Florida Water Management District environmental resource permits, and much of the city lies in mapped floodplain. The utilities extension program — converting well-and-septic neighborhoods to city water, irrigation, and sewer — is a standing civil program unique to this city's history.",
    energy:
      "Energy compliance in Cape Coral runs under the Florida Building Code — Energy Conservation (8th Edition, 2023), documented with Florida's forms and software paths. In zone 2A the compliance margin is decided by dehumidification, duct location and sealing, and envelope solar control, and LCEC programs support efficiency measures for its cooperative members.",
  },
  faqs: [
    {
      q: "Who provides electric service in Cape Coral?",
      a: "LCEC (Lee County Electric Cooperative), a not-for-profit cooperative, distributes electricity in Cape Coral. Water, irrigation water, and sewer are provided by the City of Cape Coral's own utilities.",
    },
    {
      q: "What building code applies in Cape Coral?",
      a: "The Florida Building Code, 8th Edition (2023) — mandatory statewide, based on the 2021 IBC with Florida amendments — including the FBC Energy Conservation volume for commercial energy compliance.",
    },
    {
      q: "How did Hurricane Ian change Cape Coral construction?",
      a: "Ian's 2022 landfall in Lee County drove a multi-year rebuild: flood-elevation enforcement, substantial-improvement determinations, product-approval scrutiny, and standby-power expectations now shape both new commercial work and renovation of the existing stock.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 65, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.capecoral.gov"],
      codes: ["https://www.floridabuilding.org"],
      amendments: ["https://www.capecoral.gov"],
      utilities: ["https://www.lcec.net"],
      climate: ["https://www.weather.gov/tbw/"],
      market: ["https://www.capecoral.gov"],
    },
  },
};
