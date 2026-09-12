import type { CityData } from "../types";

export const bakersfield: CityData = {
  slug: "bakersfield",
  name: "Bakersfield",
  stateSlug: "california",
  county: "Kern County",
  ahj: {
    office: "City of Bakersfield Development Services Department — Building Division",
    process:
      "The Building Division administers building permits and plan review, while Planning, Public Works/Engineering, Fire, and utility agencies may review a commercial site in parallel. Bakersfield provides online permit and plan-review access; applicants should confirm whether the work is inside city limits because unincorporated Kern County is a different AHJ.",
  },
  codes: {
    building: "2025 California Building Standards Code (Title 24), including the 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with City of Bakersfield amendments where applicable",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026, with applicable City amendments and CALGreen measures; no separate Bakersfield reach provision is asserted here",
    amendments:
      "Bakersfield's municipal code and ordinance process supplies local amendments and administrative requirements alongside the California Building Standards Code. Projects also address applicable CALGreen measures; local fire, grading, and water requirements are separate from the statewide CBC and should be checked for the parcel and scope.",
  },
  utilities: {
    electric: "Bakersfield Public Utilities (BPU) supplies municipal electric service in its service area; PG&E serves natural gas and utility territory must be confirmed by parcel",
    notes:
      "BPU service capacity, transformer configuration, and generation-interconnection requirements should be confirmed early for large industrial or electrified facilities; PG&E gas service and other providers may apply at a particular parcel. BPU water service and wastewater arrangements should also be confirmed where city service is available, while agricultural, private, and district supplies occur around the urban edge.",
  },
  climateNotes:
    "Bakersfield's San Joaquin Valley setting is hot-dry (IECC/ASHRAE 3B) with very hot summers, high cooling and solar loads, winter inversions, and persistent ozone/particulate air-quality constraints. The region also has meaningful seismic exposure and flood risk along the Kern River and local drainage channels.",
  marketNotes:
    "Bakersfield construction is tied to energy and oilfield services, agriculture and food processing, warehousing/logistics on the CA-99 and I-5 corridors, healthcare, and renewable-energy development in Kern County. Industrial projects need to account for air-quality permitting and high process/electrical loads, while solar and storage activity is a regional market factor.",
  narratives: {
    mep:
      "Bakersfield MEP design deals with sustained valley heat, strong solar gain, and air quality that makes outdoor-air treatment more nuanced than a generic dry-climate design. High-efficiency cooling, maintainable filtration, pressure relationships for food or industrial uses, and realistic high-ambient equipment selections are central. The City reviews the locally adopted California code cycle, while BPU must confirm service capacity and distributed-generation interconnection early for process loads, electrification, or solar/storage; City Water Resources capacity is a parallel issue where municipal water and sewer serve the parcel.",
    structural:
      "Bakersfield structural design is governed by the locally adopted CBC's California seismic provisions, with site-specific geotechnical characterization essential in the alluvial San Joaquin Valley. Seismic lateral systems, equipment anchorage, and special inspection cannot be treated as optional even for low-rise industrial work. Expansive or variable soils, high summer roof temperatures, and flood exposure near the Kern River or mapped channels affect foundation, roof, and elevation decisions. Building Division review is paired with fire and grading coordination for the actual site.",
    civil:
      "Civil design in Bakersfield must address both scarce-water conditions and episodic flood risk. Local grading and drainage review needs to account for Kern River and channel mapping, off-site flow paths, and the city's standards for public improvements; a dry site can still receive damaging concentrated runoff in a storm. Water and wastewater availability should be verified with BPU rather than assumed from a nearby main, and industrial/food-processing sites may need early coordination on process discharge and air-quality agency requirements.",
    energy:
      "Bakersfield commercial energy compliance is California Title 24 Part 6—not IECC COMcheck. The Title 24 performance model captures the tradeoffs among glazing, cool roofs, lighting controls, HVAC efficiency, and required solar-ready or photovoltaic measures where applicable, alongside applicable CALGreen measures. In hot-dry 3B, solar control, roof performance, efficient cooling, and demand-aware controls are especially valuable. We coordinate the model with City plan review and BPU's service/interconnection path so code documentation and utility scope are consistent.",
  },
  faqs: [
    {
      q: "What energy code applies to commercial buildings in Bakersfield?",
      a: "For permits subject to the current cycle, Bakersfield uses the 2025 California Energy Code, Title 24 Part 6, effective January 1, 2026, together with applicable CALGreen measures. Compliance is generally demonstrated with California Title 24 documentation and modeling rather than a generic IECC COMcheck; City amendments should be confirmed with the Building Division.",
    },
    {
      q: "Who provides electric service in Bakersfield?",
      a: "BPU provides municipal electric service in its Bakersfield service area; utility territory should be verified for the parcel. Large services, solar/storage, or electrified process equipment should be discussed with BPU early because service capacity, transformer design, and interconnection are utility-controlled.",
    },
    {
      q: "Are seismic requirements important for Bakersfield low-rise projects?",
      a: "Yes. Bakersfield is subject to California Building Code seismic design requirements, and the actual seismic parameters and foundation approach depend on the site geotechnical investigation. Low-rise construction still needs a code-compliant lateral system, anchorage, and required special inspections.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 62, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.bakersfieldcity.us/building-division"],
      codes: ["https://www.dgs.ca.gov/BSC/Codes", "https://www.hcd.ca.gov/building-standards", "https://www.energy.ca.gov/rules-and-regulations/building-energy-efficiency"],
      amendments: ["https://library.municode.com/ca/bakersfield/codes/code_of_ordinances"],
      utilities: ["https://www.bpu.com/", "https://www.pge.com/en/business-resources.html"],
      climate: ["https://www.weather.gov/hnx/"],
      market: ["https://www.bakersfieldcity.us/155/Economic-Development"],
    },
  },
};