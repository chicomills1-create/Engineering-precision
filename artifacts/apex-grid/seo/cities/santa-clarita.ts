import type { CityData } from "../types";

export const santaClarita: CityData = {
  slug: "santa-clarita",
  name: "Santa Clarita",
  stateSlug: "california",
  county: "Los Angeles County",
  ahj: {
    office: "City of Santa Clarita Building & Safety Division (Community Development Department)",
    process:
      "Santa Clarita runs its own Building & Safety Division for plan check and permits inside the city, applying the California Building Code with city amendments, while Los Angeles County departments handle many fire, public works, and unincorporated-area functions around the valley. Commercial submittals go through the city's permit center and online services, and California's Title 24 documentation — structural, energy, and CALGreen — is reviewed as one package, so the energy and accessibility documentation must be complete at first submittal, not supplemented later.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2; based on the 2024 IBC), effective January 1, 2026, with City of Santa Clarita amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026 — California's own energy code; there is no COMcheck path",
    amendments:
      "Santa Clarita amends the CBC locally, and the valley's hazards drive the significant ones: the city sits between the San Gabriel and Santa Susana fault systems with high seismic design categories, Very High Fire Hazard Severity Zones wrap the wildland edges, and local amendments and fire-district requirements address hillside construction, fire sprinklers, and defensible construction. CALGreen (Title 24, Part 11) applies as part of the same submittal.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) serves Santa Clarita",
    notes:
      "SCE handles new commercial services and interconnections in the Santa Clarita Valley, where Public Safety Power Shutoffs (PSPS) during Santa Ana wind events are a design consideration for backup power and life-safety systems on the wildland edge. Rooftop solar and storage interconnect under SCE's current Rule 21 and net billing tariff. Water is Santa Clarita Valley Water Agency (SCV Water), and gas is SoCalGas.",
  },
  climateNotes:
    "California climate zone 9 / IECC 3B (hot-dry): an inland valley with summer highs routinely above 100°F, cool nights, Santa Ana wind events, and wildfire smoke and ember exposure at the foothill edges. Seismic demand is high — the 1994 Northridge earthquake damaged the valley heavily — and hillsides add slope and drainage constraints.",
  marketNotes:
    "Santa Clarita's construction market is driven by film and television production (a large and growing studio campus inventory in the valley), Valencia's master-planned industrial and office parks, medical growth around Henry Mayo Newhall Hospital, Six Flags Magic Mountain tourism, and steady master-planned residential-commercial development. Logistics and studio soundstage work are the fastest-moving commercial segments.",
  narratives: {
    mep:
      "MEP design in Santa Clarita is Title 24 design: the 2025 CBC and 2025 Energy Code (Part 6) govern, with energy documentation produced on California's own compliance forms rather than COMcheck. SCE service coordination sets the electrical basis, PSPS outage exposure on the wildland edge makes standby power and life-safety continuity a real design input, and zone 9 cooling loads with large diurnal swings reward economizers and thermal mass strategies the energy code credits.",
    structural:
      "Santa Clarita structural design is seismic design: high Seismic Design Categories near the San Andreas and San Gabriel fault systems, with the 1994 Northridge earthquake as the local performance benchmark. Hillside construction, retaining systems, and Very High Fire Hazard Severity Zone construction requirements layer onto the 2025 CBC, and special inspection and structural observation programs are enforced through the city's Building & Safety review.",
    civil:
      "Civil design in Santa Clarita works in a valley draining to the Santa Clara River, with Los Angeles County flood control infrastructure, hillside grading ordinances, and wildland-edge drainage and debris considerations. SCV Water coordination governs water service for new development, and master-planned Valencia districts carry their own recorded infrastructure standards that site design must match.",
    energy:
      "Energy compliance in Santa Clarita is documented to the 2025 California Energy Code (Title 24, Part 6) using the performance or prescriptive paths on state compliance forms — California runs its own code and software ecosystem, and out-of-state COMcheck documentation is not accepted. Solar and storage readiness, heat-pump provisions, and CALGreen measures are part of the same Title 24 package the city plan-checks.",
  },
  faqs: [
    {
      q: "What energy code applies in Santa Clarita?",
      a: "The 2025 California Energy Code (Title 24, Part 6), effective January 1, 2026. California enforces its own energy code statewide — compliance is documented on California forms and software, not COMcheck.",
    },
    {
      q: "Who provides electric service in Santa Clarita?",
      a: "Southern California Edison (SCE). New services and solar/storage interconnections run through SCE, and its Public Safety Power Shutoff program during Santa Ana winds is a design input for backup power at wildland-edge sites.",
    },
    {
      q: "What hazards most affect Santa Clarita building design?",
      a: "Earthquakes and wildfire. The valley sits in a high seismic design category near major fault systems, and Very High Fire Hazard Severity Zones wrap its foothill edges, adding fire-construction and hillside requirements to the CBC basis.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 69, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.santa-clarita.com"],
      codes: ["https://www.dgs.ca.gov/BSC"],
      amendments: ["https://www.santa-clarita.com"],
      utilities: ["https://www.sce.com"],
      climate: ["https://www.weather.gov/lox/"],
      market: ["https://www.santa-clarita.com"],
    },
  },
};
