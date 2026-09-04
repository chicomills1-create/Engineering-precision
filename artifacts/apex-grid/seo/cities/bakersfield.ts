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
    building: "2022 California Building Code, adopted by the City of Bakersfield with local amendments",
    energy: "2022 California Energy Code (Title 24, Part 6)",
    amendments:
      "California's 2022 Building Standards Code became effective January 1, 2023, and Bakersfield adopts local amendments through its municipal code and ordinance process. Projects also comply with the 2022 California Green Building Standards Code (CALGreen); local fire, grading, and water requirements are separate from the statewide CBC.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E) provides electric and natural-gas service in Bakersfield",
    notes:
      "PG&E controls new electric service and generation interconnection; capacity, transformer configuration, and interconnection timing should be confirmed for large industrial or electrified facilities. City of Bakersfield Water Resources provides municipal water and wastewater where city service is available; agricultural, private, and district supplies occur around the urban edge.",
  },
  climateNotes:
    "Bakersfield's San Joaquin Valley setting is hot-dry (IECC/ASHRAE 3B) with very hot summers, high cooling and solar loads, winter inversions, and persistent ozone/particulate air-quality constraints. The region also has meaningful seismic exposure and flood risk along the Kern River and local drainage channels.",
  marketNotes:
    "Bakersfield construction is tied to energy and oilfield services, agriculture and food processing, warehousing/logistics on the CA-99 and I-5 corridors, healthcare, and renewable-energy development in Kern County. Industrial projects need to account for air-quality permitting and high process/electrical loads, while solar and storage activity is a regional market factor.",
  narratives: {
    mep:
      "Bakersfield MEP design deals with sustained valley heat, strong solar gain, and air quality that makes outdoor-air treatment more nuanced than a generic dry-climate design. High-efficiency cooling, maintainable filtration, pressure relationships for food or industrial uses, and realistic high-ambient equipment selections are central. The City reviews the 2022 California code cycle, while PG&E must confirm service capacity and distributed-generation interconnection early for process loads, electrification, or solar/storage; City Water Resources capacity is a parallel issue where municipal water and sewer serve the parcel.",
    structural:
      "Bakersfield structural design is governed by the 2022 CBC's California seismic provisions, with site-specific geotechnical characterization essential in the alluvial San Joaquin Valley. Seismic lateral systems, equipment anchorage, and special inspection cannot be treated as optional even for low-rise industrial work. Expansive or variable soils, high summer roof temperatures, and flood exposure near the Kern River or mapped channels affect foundation, roof, and elevation decisions. Building Division review is paired with fire and grading coordination for the actual site.",
    civil:
      "Civil design in Bakersfield must address both scarce-water conditions and episodic flood risk. Local grading and drainage review needs to account for Kern River and channel mapping, off-site flow paths, and the city's standards for public improvements; a dry site can still receive damaging concentrated runoff in a storm. Water and wastewater availability should be verified with City of Bakersfield Water Resources rather than assumed from a nearby main, and industrial/food-processing sites may need early coordination on process discharge and air-quality agency requirements.",
    energy:
      "Bakersfield commercial energy compliance is California Title 24 Part 6, 2022—not IECC COMcheck. The Title 24 performance model captures the tradeoffs among glazing, cool roofs, lighting controls, HVAC efficiency, and required solar-ready or photovoltaic measures where applicable, alongside 2022 CALGreen. In hot-dry 3B, solar control, roof performance, efficient cooling, and demand-aware controls are especially valuable. We coordinate the model with City plan review and PG&E's service/interconnection path so code documentation and utility scope are consistent.",
  },
  faqs: [
    {
      q: "What energy code applies to commercial buildings in Bakersfield?",
      a: "Bakersfield uses the 2022 California Energy Code, Title 24 Part 6, together with the 2022 CALGreen code. Compliance is generally demonstrated with California Title 24 documentation and modeling rather than a generic IECC COMcheck.",
    },
    {
      q: "Who provides electric service in Bakersfield?",
      a: "PG&E provides electric service in Bakersfield. Large services, solar/storage, or electrified process equipment should be discussed with PG&E early because service capacity, transformer design, and interconnection are utility-controlled.",
    },
    {
      q: "Are seismic requirements important for Bakersfield low-rise projects?",
      a: "Yes. Bakersfield is subject to California Building Code seismic design requirements, and the actual seismic parameters and foundation approach depend on the site geotechnical investigation. Low-rise construction still needs a code-compliant lateral system, anchorage, and required special inspections.",
    },
  ],
};