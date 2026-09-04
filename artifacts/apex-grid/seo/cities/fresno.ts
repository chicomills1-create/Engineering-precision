import type { CityData } from "../types";

export const fresno: CityData = {
  slug: "fresno",
  name: "Fresno",
  stateSlug: "california",
  county: "Fresno County",
  ahj: {
    office: "City of Fresno Planning and Development Department, Building and Safety Services Division",
    process:
      "Fresno Building and Safety accepts applications, plan review, and permit activity through the City's online permitting services, with electronic submittal for qualifying plans and full multi-discipline review for commercial work. Planning entitlement, public works, fire, and building review may run together for development projects, while straightforward permits may use a simpler counter or online path.",
  },
  codes: {
    building: "2022 Fresno Building Code, based on the 2022 California Building Code (2021 IBC) with City of Fresno amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), enforced with 2022 CALGreen mandatory measures",
    amendments:
      "Fresno adopts the California model codes through its municipal code with local administrative and technical amendments. Grading, stormwater, fire access, and San Joaquin Valley Air Pollution Control District rules can materially affect industrial, food-processing, and logistics sites in addition to the building-code permit.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E); the City of Fresno Department of Public Utilities provides municipal water, wastewater, and solid-waste services",
    notes:
      "PG&E service design and generation interconnection should be initiated early for cold storage, process, and high-capacity warehouse loads. The City's water and wastewater systems are central to food-processing and industrial projects, where fixture demand, process discharge, and reclaimed-water opportunities need early utility discussion.",
  },
  climateNotes:
    "Fresno's hot-dry Central Valley climate (ASHRAE 3B/California climate zone 13) produces long, very hot summers and high cooling peaks, with winter tule fog and periodic wildfire smoke. Extreme heat, drought, poor summer air quality, and alluvial-soil seismic considerations drive more design decisions than coastal moisture.",
  marketNotes:
    "Fresno is a Central Valley hub for agricultural processing, cold storage, warehousing and distribution, healthcare, education, and expanding multifamily development. Food and logistics facilities bring refrigeration, process water, truck circulation, air-permit, and high-electric-load issues that differ sharply from a conventional office project.",
  narratives: {
    mep:
      "Fresno MEP systems must survive sustained hot-dry summer design conditions, not just meet a nominal Title 24 worksheet. We size cooling, condenser, and electrical infrastructure for high ambient temperatures, use evaporative or air-side strategies only where water, outdoor-air quality, and the occupancy allow, and provide smoke-event filtration controls for wildfire periods. PG&E coordination is especially important for refrigeration, cold storage, food processing, and warehouse charging loads; City utility capacity and wastewater characteristics belong in the first process conversation.",
    structural:
      "Although Fresno is inland, the 2022 CBC still requires seismic design, with site-specific alluvial soils and groundwater conditions informing foundation and lateral assumptions. Large single-story warehouses, cold storage buildings, rack-supported systems, and rooftop refrigeration equipment need a coordinated load path and special-inspection plan rather than a generic tilt-up detail. Building and Safety review also intersects with fire and industrial-process requirements, so equipment anchorage, high-piled storage, and expansion-joint details should be settled before permit resubmittal.",
    civil:
      "Fresno civil engineering has to reconcile hardscape-heavy logistics sites with local stormwater requirements, scarce water, and intense heat. We preserve room for treatment BMPs, truck turning, fire access, and detention while coordinating domestic, fire, process-water, and sewer demands with the Department of Public Utilities. Agricultural and industrial projects also need early grading and discharge analysis: process wastewater or cooling blowdown cannot be assumed to fit an ordinary commercial sewer connection, and dust control and air-district obligations can shape construction phasing.",
    energy:
      "The 2022 California Energy Code is demanding in Fresno because zone 13 cooling loads make envelope, solar control, efficient cooling equipment, lighting, and controls economically visible as well as code-critical. Title 24 modeling should use the true refrigeration, kitchen, process, or warehouse schedules instead of masking them as generic office loads. On-site solar, storage, and demand management can help address PG&E peak-period costs, but their service and interconnection design must be coordinated with the project electrical one-line from schematic design.",
  },
  faqs: [
    {
      q: "What code does Fresno use for commercial buildings?",
      a: "Fresno enforces its locally amended 2022 Fresno Building Code, based on the 2022 California Building Code, along with the 2022 California Energy Code and CALGreen. A commercial project may also require Fire, Planning, Public Works, and air-district approvals depending on scope.",
    },
    {
      q: "Who provides water and electricity in Fresno?",
      a: "PG&E provides electric service, while the City of Fresno Department of Public Utilities provides municipal water and wastewater services. Cold storage, food processing, and other high-load projects should verify both PG&E capacity and City water/sewer conditions early.",
    },
    {
      q: "How does Fresno's heat affect commercial HVAC design?",
      a: "Fresno has long hot, dry summers with high cooling peaks, so equipment high-ambient performance, solar heat gain, electrical demand, and controls are core design issues. Wildfire smoke and local air-quality conditions also support filtration and outdoor-air operating modes that a mild-climate design may not need.",
    },
  ],
};