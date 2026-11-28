import type { CityData } from "../types";

export const aurora: CityData = {
  slug: "aurora",
  name: "Aurora",
  stateSlug: "illinois",
  county: "Kane County",
  ahj: {
    office: "City of Aurora Division of Building and Permits (Development Services Department)",
    process:
      "Aurora's Division of Building and Permits runs commercial permitting through the City's eTRAKiT online portal, with project-type application packages (foundation-only, structural shell, improved shell, tenant build-out) that spell out exactly which drawings and documents each scope requires. Civil engineering drawings are submitted separately — two complete sets to the City of Aurora Engineering Department at 44 E. Downer Place — so site and building reviews proceed on parallel tracks. Contractors must be licensed and registered with the City before permit issuance (not at submittal), and sprinklers, alarms, signage, and hoods each take their own additional permits.",
  },
  codes: {
    building: "2024 International Building Code with City of Aurora amendments (Aurora Code of Ordinances §12-16, adopted by Ordinance O25-082)",
    energy: "Illinois Energy Conservation Code — the 2021 IECC with Illinois amendments, effective statewide January 1, 2024, and enforced by Aurora as the current State of Illinois Energy Conservation Code",
    amendments:
      "Aurora's adoption ordinance (§12-16) takes the 2024 I-code series — IBC, IMC, IFGC, IRC, IPC, IEBC, IFC, and ISPSC with specified appendix chapters — plus the 2023 National Electrical Code as amended by Aurora Code §§12-31 and 12-32. Two state substitutions matter on every set: broad references to the IPC are replaced by the current Illinois Plumbing Code, and the current Illinois Accessibility Code applies statewide. The City's commercial packages also carry a 42-inch frost-depth footing standard for the Chicago corridor.",
  },
  utilities: {
    electric: "ComEd (Commonwealth Edison, an Exelon company)",
    notes:
      "Aurora is ComEd delivery territory: ComEd owns the wires and new-service process, while Illinois's deregulated market lets commercial customers choose their generation supplier. ComEd's Energy Efficiency Program is an active design input here — its incentives are routinely reserved for lighting, HVAC, and EV-charging work in Aurora's manufacturing, healthcare, and logistics buildings, and local electrical contractors pull City of Aurora electrical permits against reserved incentive funds. City water and sewer are municipal services reviewed alongside the building permit through Development Services and the Engineering Department.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) in the Fox Valley: cold winters with a 42-inch frost depth, lake-influenced snow, and hot, humid summers. The Fox River bisects the city — Stolp Island downtown sits in the river itself — so floodplain parcels and riverfront sites carry real design weight, and freeze protection and snow load shape envelopes and structures.",
  marketNotes:
    "Aurora is Illinois's second-largest city and the Fox Valley's historic manufacturing center, today anchored by healthcare (Rush Copley Medical Center and Prime Healthcare Mercy Medical Center), Caterpillar's long-standing Aurora plant, and the I-88 technology and logistics corridor shared with Naperville. Downtown is in an active reinvestment cycle around the Paramount Theatre, RiverEdge Park, and the Hollywood Casino Aurora, and the Far East Side continues to add master-planned residential and supporting commercial work. Renovation of the city's deep stock of industrial and historic buildings is a steady share of the permit mix.",
  narratives: {
    mep:
      "MEP design in Aurora is documented to the City's 2024 I-code adoption with the 2023 NEC as locally amended — and to two Illinois substitutions that catch out-of-state teams: plumbing is designed to the Illinois Plumbing Code, not the IPC the I-codes reference, and energy compliance runs under the Illinois Energy Conservation Code (2021 IECC with Illinois amendments). Electric service is ComEd delivery with competitive supply choice, and ComEd efficiency incentives are worth designing to on lighting and HVAC packages. Trade contractors must be licensed and City-registered before the permit issues.",
    structural:
      "Structural design in Aurora is a zone 5A winter discipline: 42-inch frost depth at footings, snow load, and freeze-thaw on masonry and envelope systems, all under the 2024 IBC as amended by the City. The Fox River divides the building stock — heavy historic industrial and mill construction on the east side, riverfront and Stolp Island structures downtown, and newer tilt-up and steel logistics buildings along I-88 — so existing-structure evaluation is as common as new design.",
    civil:
      "Civil design in Aurora runs on its own track: the City requires civil engineering drawings submitted separately to the Engineering Department at 44 E. Downer Place, apart from the building package filed with Building and Permits. Sites work around the Fox River and its floodplain through the middle of the city, established combined-era infrastructure in the older districts, and detention and stormwater standards sized for Chicago-corridor rainfall and snowmelt.",
    energy:
      "Energy compliance in Aurora is documented to the Illinois Energy Conservation Code — the 2021 IECC with Illinois amendments, in force statewide since January 1, 2024 — rather than to a locally adopted IECC edition. In zone 5A the prescriptive tables are demanding on roofs (R-30 continuous insulation above deck) and the compliance margin is set by heating-season envelope performance, air sealing, and lighting controls, with ComEd's efficiency incentives available to buy down the cost of beating code.",
  },
  faqs: [
    {
      q: "What building code does Aurora, IL enforce?",
      a: "The 2024 International Code Council series with City of Aurora amendments (Code of Ordinances §12-16, Ordinance O25-082) — 2024 IBC, IMC, IFGC, IRC, IEBC, IFC, and ISPSC — plus the 2023 NEC as amended locally. Plumbing is designed to the Illinois Plumbing Code, which replaces IPC references, and energy compliance follows the Illinois Energy Conservation Code (2021 IECC with Illinois amendments).",
    },
    {
      q: "How are commercial permits filed in Aurora?",
      a: "Through the Division of Building and Permits' eTRAKiT portal, using the City's project-type packages (foundation, shell, tenant build-out). Civil drawings go separately to the Engineering Department at 44 E. Downer Place, and contractors must be licensed and registered with the City before issuance.",
    },
    {
      q: "Who provides electric service in Aurora, IL?",
      a: "ComEd (Commonwealth Edison) is the delivery utility; Illinois customers may choose a competitive generation supplier. ComEd's Energy Efficiency Program offers incentives commonly used on Aurora commercial lighting, HVAC, and EV projects.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 58, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.aurora.il.us/files/sharedassets/mainsite/v/1/development-services/documents/permits/commercial/2026-app-updates/commercial-shell_foundation.pdf"],
      codes: ["https://s3-us-west-2.amazonaws.com/municipalcodeonline.com-new/aurora-il/ordinances/documents/1767891263_O25-082.pdf"],
      amendments: ["https://s3-us-west-2.amazonaws.com/municipalcodeonline.com-new/aurora-il/ordinances/documents/1767891263_O25-082.pdf"],
      utilities: ["https://www.leaderlights.com/locations/aurora"],
      climate: ["https://smartenergy.illinois.edu/energy-code/illinois-energy-conservation-code/"],
      market: ["https://en.wikipedia.org/wiki/Aurora,_IL"],
    },
  },
};
