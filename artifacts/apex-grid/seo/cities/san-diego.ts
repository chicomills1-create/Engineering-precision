import type { CityData } from "../types";

export const sanDiego: CityData = {
  slug: "san-diego",
  name: "San Diego",
  stateSlug: "california",
  county: "San Diego County",
  ahj: {
    office: "City of San Diego Development Services Department (DSD)",
    process:
      "San Diego DSD runs plan review through its OpenDSD portal with electronic submittal and permitting. The city offers a Self-Certification program that lets licensed design professionals certify code compliance for eligible projects to shorten review, and an over-the-counter (OTC) path for simpler scopes. Complex commercial projects go through full plan check with multi-discipline routing, and DSD publishes review-cycle timelines that drive project scheduling.",
  },
  codes: {
    building:
      "2022 San Diego Municipal Code building regulations based on the 2022 California Building Code (2021 IBC) with local amendments",
    energy:
      "2022 California Energy Code (Title 24, Part 6), enforced with 2022 CALGreen mandatory measures",
    amendments:
      "San Diego adopts the state model codes with local amendments and has pursued a Climate Action Plan-driven Building Electrification push, encouraging or requiring all-electric readiness in new construction beyond the state baseline. Coastal zone, brush/wildland-urban-interface, and steep-hillside overlays add project-specific requirements, so confirm the current DSD amendment and overlay package for the parcel.",
  },
  utilities: {
    electric:
      "San Diego Gas & Electric (SDG&E) — the investor-owned utility serving the city and region, alongside community choice aggregators like San Diego Community Power for generation",
    notes:
      "SDG&E carries some of the highest commercial electricity rates in the country, so demand-charge management and right-sized services materially affect operating cost. New services and interconnection go through SDG&E's design and application process with real lead times, while the City of San Diego Public Utilities Department provides water and sewer.",
  },
  climateNotes:
    "San Diego sits mostly in ASHRAE climate zone 3B (California zone 7 near the coast, warmer inland) with an exceptionally mild marine climate, modest cooling loads, and long economizer-favorable shoulder seasons; coastal salt-air corrosion and inland wildland-interface heat are the two dominant site-specific drivers.",
  marketNotes:
    "San Diego's construction market is anchored by life sciences and biotech lab space (especially the Torrey Pines and UTC corridors), defense and Navy-related work, healthcare, higher education, and dense transit-oriented multifamily. Lab and cleanroom fit-outs drive heavy MEP demand, while coastal-zone and hillside constraints plus wildfire-interface requirements add entitlement and design complexity across much of the city.",
  narratives: {
    mep:
      "MEP design in San Diego benefits from one of the mildest climates in the country — a marine 3B zone with modest cooling loads and generous economizer hours — but the market skews toward lab and life-science space where ventilation, redundancy, and process loads dominate the design. We design outside-air and exhaust systems for lab safety, coordinate high-reliability power for research equipment, and exploit the mild climate for free cooling where the program allows. Electrically, SDG&E's high commercial rates make demand-charge management and correctly sized services worth real engineering attention, so we confirm SDG&E service capacity, interconnection timing, and rate structure early in design.",
    structural:
      "Structural work in San Diego is high-seismic: sites commonly fall in Seismic Design Category D, with the Rose Canyon fault zone and other active faults influencing near-fault design and fault-rupture setback considerations for some parcels. DSD enforces the 2022 CBC seismic provisions, and coastal soils, liquefaction-prone areas, and steep hillsides all funnel design decisions through the geotechnical report. Coastal corrosion drives detailing and material selection near the shoreline, and special-inspection programs are administered through the city's plan-check process — worth setting up alongside the OpenDSD submittal so structural review proceeds without rework.",
    civil:
      "Civil design in San Diego must meet the region's stringent stormwater standards, with the city's Storm Water Standards manual requiring on-site retention and treatment (Priority Development Project BMPs) that consume site area and should be laid out in the first grading pass. Coastal Zone permitting, steep-hillside grading rules, and wildland-urban-interface brush management overlays add layers depending on the parcel, and public-right-of-way work coordinates with city engineering. We design to city and regional standards, plan grading and drainage against the mild-but-flashy coastal storm regime, and coordinate water and sewer capacity with the Public Utilities Department early.",
    energy:
      "Energy compliance in San Diego targets the 2022 California Energy Code (Title 24, Part 6) with 2022 CALGreen, demonstrated through Title 24 modeling rather than a simple prescriptive checklist. The city's Climate Action Plan pushes building electrification and all-electric readiness beyond the state baseline, so we plan for electric-ready or all-electric systems where the program and ordinances point that way. In the mild 3B marine climate, envelope, glazing, and efficient right-sized HVAC drive compliance, and because SDG&E rates are so high, on-site solar and load management are usually strong economic moves that we coordinate with the compliance model and SDG&E interconnection from schematic design.",
  },
  faqs: [
    {
      q: "What is San Diego's Self-Certification program?",
      a: "The City of San Diego DSD allows licensed design professionals to self-certify code compliance for eligible project types, which can shorten plan review. It does not waive code requirements — DSD audits submittals — but for qualifying commercial scopes it compresses the schedule compared with full plan check.",
    },
    {
      q: "How does San Diego's high seismic risk affect my project?",
      a: "San Diego sites are typically Seismic Design Category D under the 2022 CBC, and the active Rose Canyon fault system means some parcels also face near-fault and fault-setback considerations. A geotechnical report drives foundation and lateral design, and DSD structural review is rigorous, so seismic design is central from the start.",
    },
    {
      q: "Why do San Diego energy and utility costs matter so much in design?",
      a: "SDG&E has among the highest commercial electricity rates in the country, so demand-charge management, right-sized services, and on-site solar have an outsized effect on operating cost. Combined with the city's Climate Action Plan electrification goals, this makes energy strategy a first-order design decision, not an afterthought.",
    },
  ],
};
