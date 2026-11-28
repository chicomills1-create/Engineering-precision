import type { CityData } from "../types";

export const coralSprings: CityData = {
  slug: "coral-springs",
  name: "Coral Springs",
  stateSlug: "florida",
  county: "Broward County",
  ahj: {
    office: "City of Coral Springs Building Department (City Hall, 9500 West Sample Road)",
    process:
      "Coral Springs permits three ways: online through the eTRAKiT portal (apply, pay, track reviews, and schedule inspections), at the One-Stop-Shop counter in City Hall, or through a 24/7 drop box — with one format rule: digitally signed and sealed documents must go through the online portal, not the counter. The city publishes its review clocks: building permits for additions and alterations are typically issued within 15 business days when the package is correct, and small miscellaneous permits within seven. Since February 1, 2025 inspections are scheduled only online, never by phone, and Florida's private provider program is administered locally for owners who elect third-party plan review and inspections.",
  },
  codes: {
    building: "Florida Building Code, 2023 (8th Edition) — Broward County lies in the High-Velocity Hurricane Zone, so the HVHZ provisions of the FBC apply; the next FBC edition takes effect December 31, 2026",
    energy: "Florida Building Code, Energy Conservation, 2023 (8th Edition)",
    amendments:
      "The FBC is statewide, but Broward County's layer is real: all work files on the Broward County Uniform Building Permit Application (the November 14, 2025 revision is mandatory — no earlier version is accepted), Coral Springs adds its own supplemental forms such as the roofing Zoning Addendum, and the city enforces FBC 110.13 pre-storm site-securing rules with a $500 civil penalty once a Hurricane Watch is declared. The city also administers Broward's Building Safety Inspection Program — structural and electrical recertification inspections at 25 years and every 10 years after.",
  },
  utilities: {
    electric: "Florida Power & Light (FPL)",
    notes:
      "FPL is the electric utility across Coral Springs, so service sizing, undergrounding, and interconnection run through FPL's builder and commercial service process. Water and sewer are the unusual part: four separate districts serve the city from the Biscayne Aquifer — the City of Coral Springs Water District, the Coral Springs Improvement District, the North Springs Improvement District, and Royal Water Works — and which district serves a parcel is address-specific, so utility capacity and tap coordination start with identifying the right district before design development.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 1A (very hot-humid) in the High-Velocity Hurricane Zone: design wind speeds at the top of the national scale, wind-borne debris protection for all openings, intense rainfall and a high water table, and year-round cooling and dehumidification loads. Flood zones along the C-14 canal and the city's canal network add finished-floor and floodplain requirements.",
  marketNotes:
    "Coral Springs is northwest Broward's master-planned suburb, and its commercial market is steady rather than speculative: the Corporate Park of Coral Springs hosts Fiserv (First Data) and Alliance Entertainment operations, Broward Health Coral Springs anchors medical work, Coral Square mall and The Walk downtown district drive retail renovation, and the Sawgrass Expressway (SR 869) corridor carries logistics and flex-industrial demand. The recurring project types are medical and office fit-outs, retail re-tenanting, school and municipal work, and hurricane-hardening retrofits — impact glazing, roofing, and recertification repairs — across a 1970s–1990s building stock.",
  narratives: {
    mep:
      "MEP design in Coral Springs is documented to the 2023 Florida Building Code, including its Energy Conservation volume, and the mechanical design is a latent-load problem: zone 1A humidity means dedicated dehumidification and careful ventilation control decide comfort and mold risk, not just sensible cooling capacity. Electric service runs through FPL, while the four-district water map makes the plumbing service design address-specific. Submittals ride the Broward County Uniform Application through eTRAKiT, and digitally sealed documents can only be filed online.",
    structural:
      "Structural design in Coral Springs is HVHZ design: the High-Velocity Hurricane Zone provisions of the 2023 FBC set wind pressures, product approvals (Miami-Dade NOA or Florida Product Approval) for every exterior component, and impact protection for glazing and doors. There is effectively no frost or snow case and minimal seismic demand — wind uplift, debris impact, and water intrusion are the whole structural story, and the city's Building Safety Inspection Program keeps engineers evaluating the existing condo and commercial stock on a 25-year recertification cycle.",
    civil:
      "Civil design in Coral Springs works on flat, canal-drained land over the Biscayne Aquifer: stormwater management ties into the South Florida Water Management District's canal system, finished floors sit above a high water table, and flood-zone parcels carry elevation requirements. The threshold civil question is which of the four water districts serves the site — City Water District, Coral Springs Improvement District, North Springs Improvement District, or Royal Water Works — because capacity letters, taps, and fire flow all come from that district, not from a single city utility.",
    energy:
      "Energy compliance follows the Florida Building Code, Energy Conservation, 2023 edition, demonstrated through the state's compliance software and forms at submittal. In zone 1A the margin is decided by cooling and dehumidification efficiency, envelope solar control, and duct performance; FPL's commercial programs add an incentive layer for qualifying efficiency measures. Because a new FBC edition takes effect December 31, 2026, projects filing late in 2026 should confirm which edition their application date locks in.",
  },
  faqs: [
    {
      q: "What building code does Coral Springs, FL enforce?",
      a: "The Florida Building Code, 2023 (8th Edition), with Broward County's High-Velocity Hurricane Zone provisions — the strictest wind and product-approval regime in the state. A new FBC edition takes effect December 31, 2026.",
    },
    {
      q: "How do I file a permit in Coral Springs?",
      a: "Online through eTRAKiT, at the One-Stop-Shop in City Hall, or via the 24/7 drop box — but digitally signed and sealed documents must be filed online. Applications use the Broward County Uniform Building Permit Application (November 14, 2025 revision only), and since February 2025 inspections are scheduled online, not by phone.",
    },
    {
      q: "Who provides water service in Coral Springs?",
      a: "It depends on the address — four districts divide the city: the City of Coral Springs Water District, Coral Springs Improvement District, North Springs Improvement District, and Royal Water Works, all drawing on the Biscayne Aquifer. FPL provides electric service citywide.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 49, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.coralsprings.gov/Government/Departments/Building?lang_update=639312649170699370", "https://www.coralsprings.gov/Government/Departments/Building/Online-Permitting-eTrakit/FAQs"],
      codes: ["https://www.coralsprings.gov/Government/Departments/Building?lang_update=639312649170699370"],
      amendments: ["https://alliancepermitting.com/guides/florida/coral-springs-building-permit"],
      utilities: ["https://coralspringsnow.com/moving-here/"],
      climate: ["https://www.weather.gov/mfl/"],
      market: ["https://alliancepermitting.com/guides/florida/coral-springs-building-permit"],
    },
  },
};
