import type { CityData } from "../types";

export const gilbert: CityData = {
  slug: "gilbert",
  name: "Gilbert",
  stateSlug: "arizona",
  county: "Maricopa County",
  ahj: {
    office: "Town of Gilbert Development Services Department",
    process:
      "Gilbert Development Services administers building permits, plan review, and inspections through the town's online permitting and plan-review services. Commercial work can receive coordinated planning, engineering, fire, building, and utility comments, so site, drainage, and utility information should accompany a complete digital submittal.",
  },
  codes: {
    building: "2021 International Building Code, adopted by the Town of Gilbert with local amendments",
    energy: "2021 International Energy Conservation Code, commercial provisions, adopted by the Town of Gilbert",
    amendments:
      "Gilbert adopts and amends its construction-code package locally. Its adopted-code ordinance and development requirements—not another East Valley city's code package—govern the address, with drainage and site-development requirements reviewed separately.",
  },
  utilities: {
    electric: "Salt River Project (SRP) is the principal electric provider in Gilbert; serving territory must be confirmed for the parcel",
    notes:
      "SRP coordinates new electric service, transformer and meter requirements, and distributed-generation interconnection. Town of Gilbert water and wastewater service is available within its service area; confirm main capacity, pressure, fire flow, and extension requirements for the proposed use.",
  },
  climateNotes:
    "Gilbert is in hot-dry climate zone 2B. Extreme summer heat and solar gain, monsoon dust, brief high-intensity rainfall, and microburst winds dominate building and site design; washes, canals, and mapped flood hazards require parcel-specific evaluation.",
  marketNotes:
    "Gilbert's market includes the Gilbert Regional Park and mixed-use growth areas, healthcare, education, professional services, retail, and East Valley industrial and technology supply-chain activity. High-load commercial and industrial programs need early SRP and municipal-water coordination in a region where heat and water planning are central.",
  narratives: {
    mep:
      "Gilbert MEP design begins with 2B high-ambient cooling and solar loads, while monsoon dust calls for maintainable outside-air intakes and filtration appropriate to the use. The town's locally amended 2021 codes set the permit basis. SRP service capacity, fault duty, transformer siting, and solar interconnection are confirmed in schematic design, while Gilbert water pressure and fire-flow data shape domestic, process, and fire-protection choices for heat-sensitive commercial programs.",
    structural:
      "Gilbert structural design combines the locally amended 2021 IBC with the project geotechnical report. Desert alluvium can include variable, collapsible, or expansive soils, making slab support, foundations, and utility backfill site-specific. Monsoon microbursts make roof uplift, parapets, screens, canopies, and rooftop-equipment anchorage consequential. Parcels near washes or mapped flood hazards require civil coordination of elevation, drainage, and potential scour assumptions rather than an isolated building design.",
    civil:
      "Gilbert civil engineering gives desert runoff a defined path. Short monsoon bursts can concentrate flow in streets, washes, and off-site conveyances, so grading, retention or detention, finished floors, and discharge are coordinated with town engineering standards and applicable FEMA mapping. We resolve water and wastewater availability, fire-flow needs, access, and off-site extension obligations early; those items can control the feasibility of East Valley commercial and industrial sites.",
    energy:
      "Gilbert commercial energy compliance is based on its locally amended 2021 IECC. In 2B, solar-heat-gain control, reflective roofs, air sealing, efficient high-ambient cooling, and right-sized lighting and controls form a practical whole-building strategy. We submit coordinated envelope, mechanical, and lighting documentation through Development Services and align solar or other distributed generation with SRP's actual interconnection requirements.",
  },
  faqs: [
    { q: "What commercial codes does Gilbert enforce?", a: "Gilbert enforces a locally adopted and amended 2021 International Code package, including the 2021 IBC and commercial 2021 IECC. Building, fire, engineering, planning, and utility requirements can all affect the permit path." },
    { q: "Who provides electric service in Gilbert?", a: "SRP is the principal electric provider in Gilbert, but the serving territory should be confirmed for the parcel. Engage SRP early for capacity, transformer location, metering, and solar interconnection." },
    { q: "How does monsoon weather affect Gilbert site design?", a: "Brief, intense monsoon storms can create concentrated runoff despite the dry climate. Early grading and drainage design should evaluate washes, streets, off-site conveyance, and FEMA flood hazards where mapped, alongside wind uplift for roofs and equipment." },
  ],
};