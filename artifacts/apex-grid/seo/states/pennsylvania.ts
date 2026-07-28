import type { StateData } from "../types";

export const pennsylvania: StateData = {
  slug: "pennsylvania",
  name: "Pennsylvania",
  abbrev: "PA",
  buildingCode: {
    name: "Pennsylvania Uniform Construction Code (UCC) — statewide, referencing the 2018 I-Codes",
    baseCode: "2018 IBC with Pennsylvania amendments (34 Pa. Code Chapter 401 et seq.)",
    notes:
      "Pennsylvania's UCC applies statewide but adoption of newer I-Code editions runs on a lag through a Review and Advisory Council process — commercial provisions are currently on the 2018 I-Codes. A quirk that matters: municipalities can elect whether they enforce the code locally or defer to the state/Department of Labor & Industry (L&I), so who reviews your project depends on whether the town opted in.",
  },
  energyCode: {
    commercial: "2018 IECC / ASHRAE 90.1-2016 (as adopted under the UCC)",
    notes:
      "The commercial energy provisions follow the 2018 IECC with ASHRAE 90.1-2016 as an alternative path, consistent with Pennsylvania's I-Code adoption lag. Compliance is documented via COMcheck or whole-building modeling.",
    beyondCode:
      "Philadelphia enforces its own amendments and a Building Energy Performance Program with benchmarking and (for large buildings) tune-up requirements; Pittsburgh and Philadelphia both promote high-performance and 2030-District goals.",
  },
  climate: {
    zones: "4A across the southeast (Philadelphia) and much of the state; 5A through the north, west, and higher elevations; 6A in the northern-tier highlands",
    drivers: [
      "Cold, humid winters with substantial heating loads",
      "Lake-effect snow in the northwest (Erie region)",
      "Hot, humid summers requiring dehumidification downstate",
      "Freeze-thaw cycling and continuous-insulation detailing",
    ],
  },
  structural: {
    seismic: "Predominantly Seismic Design Category B statewide — low-to-moderate, though soft soils and essential facilities warrant detailing attention",
    wind: "Basic wind speeds generally 110–115 mph (Risk Category II), with limited coastal exposure",
    snow: "Ground snow loads roughly 25–30 psf in the southeast, climbing to 40–50+ psf in the northern tier and Laurel Highlands, with lake-effect belts near Erie running high",
    other: "Frost depths of 3–3.5 ft; abandoned coal-mine subsidence, karst/sinkhole terrain in the Lehigh Valley limestone belt, and expansive shale in places drive geotechnical scrutiny",
  },
  licensure: {
    board: "Pennsylvania State Registration Board for Professional Engineers, Land Surveyors and Geologists",
    notes:
      "Pennsylvania offers licensure by comity and accepts NCEES records; digital seals with authentication are accepted for electronic submittals. Design professionals must be registered before sealing UCC submissions.",
  },
  metros: ["Philadelphia", "Pittsburgh", "Allentown", "Harrisburg", "Erie", "Scranton"],
  permitting:
    "The UCC lets municipalities choose local enforcement or defer to L&I / a state-approved third-party agency, so the permitting authority — and turnaround — depends on the specific town. Philadelphia's Department of Licenses & Inspections runs its own robust code and review process with local amendments, and Pittsburgh (PLI) similarly has distinct procedures. Third-party plan-review agencies are widely used to accelerate commercial projects.",
  marketNotes:
    "Pennsylvania's construction market blends Philadelphia-region life sciences, healthcare, and multifamily; a booming Lehigh Valley and I-81 warehouse/logistics corridor; and Pittsburgh's healthcare, higher-ed, and advanced-manufacturing base. Adaptive reuse of older industrial and commercial stock is common, and natural-gas access from the Marcellus shale shapes fuel and industrial-facility decisions.",
  narratives: {
    mep:
      "MEP engineering in Pennsylvania spans Zone 4A downstate to 5A–6A in the north and west, so the same building type carries meaningfully different heating loads depending on where it lands — a distribution center outside Philadelphia and one near Scranton are not the same mechanical problem. We design to the 2018 IECC / ASHRAE 90.1-2016 adopted under the UCC, detail freeze protection and humidity control for the state's cold, damp winters and muggy summers, and account for the abundant, inexpensive Marcellus natural gas that still makes gas heating attractive for many owners even as electrification gains ground. Utility territory (PECO, PPL, Duquesne Light, and others) changes demand-charge economics and interconnection timelines. In Philadelphia we also design to local amendments and the city's benchmarking and building-tune-up program, which turns operational energy into a compliance issue, not just a design one.",
    structural:
      "Pennsylvania structural work is a geotechnical state as much as a loads state. Seismic is low (mostly SDC B) and wind is moderate, but the ground beneath is the story: the Lehigh Valley limestone belt brings karst and sinkhole risk that governs foundation type and requires careful subsurface investigation; former anthracite and bituminous coal fields carry mine-subsidence risk that can dictate whether you can build at all without grouting or relocation. Snow governs roofs across the northern tier and Laurel Highlands at 40–50+ psf, with lake-effect belts near Erie higher still and drift accumulation to design for. We design under the 2018 IBC as amended, detail 3–3.5 ft frost footings, and coordinate the geotechnical report closely — in this state the report frequently reshapes the structural scheme.",
    civil:
      "Civil and site engineering in Pennsylvania runs through the PA DEP and county conservation districts. Earth disturbance of an acre or more requires an NPDES construction stormwater permit and an E&S plan reviewed by the county conservation district, and post-construction stormwater management (PCSM) emphasizes infiltration and volume reduction — which collides directly with the state's karst geology, where uncontrolled infiltration can trigger sinkholes and demands geotechnical vetting of every basin. Municipal stormwater ordinances (many under Act 167 watershed plans) add local criteria. We design grading, storm systems, and utilities to those overlapping standards, and on the I-78/I-81 logistics corridors we resolve truck-court grading, large impervious-area management, and utility capacity early, since they usually control site yield.",
    energy:
      "Energy compliance in Pennsylvania follows the 2018 IECC / ASHRAE 90.1-2016 adopted under the statewide UCC, documented via COMcheck or whole-building modeling. In the mixed and cold-humid Zones 4A–6A, the envelope has to manage both winter heat loss and summer moisture, so continuous insulation, air-barrier continuity, and appropriate glazing all matter, while gas availability keeps combustion heating common even as heat pumps grow. Philadelphia is the key exception: beyond its local code amendments, the city's Building Energy Performance Program requires benchmarking and, for large buildings, periodic tune-ups, so operational energy becomes an ongoing obligation. We match documentation to the enforcing authority — whether a town, L&I, a third-party agency, or Philadelphia L&I — and flag the city-specific overlays up front.",
  },
  faqs: [
    {
      q: "Who reviews and approves my Pennsylvania building permit?",
      a: "It depends on the municipality. Under the UCC, towns can enforce the code locally, defer to the state (L&I), or use a state-approved third-party agency. Philadelphia and Pittsburgh run their own departments with local amendments. We confirm the enforcing authority and its process at kickoff, and third-party agencies are often used to speed commercial review.",
    },
    {
      q: "What building and energy code editions apply in Pennsylvania?",
      a: "Pennsylvania's UCC currently references the 2018 I-Codes for commercial work, with the energy provisions on the 2018 IECC / ASHRAE 90.1-2016. Adoption lags newer cycles because of the state's Review and Advisory Council process. Philadelphia layers on its own amendments and energy benchmarking requirements.",
    },
    {
      q: "Why is geotechnical investigation so important in Pennsylvania?",
      a: "Large areas face karst/sinkhole risk in the limestone belts (notably the Lehigh Valley) and mine-subsidence risk in former coal fields. Both can dictate foundation type or even site viability, and karst makes stormwater infiltration risky. We coordinate a thorough subsurface investigation before finalizing foundations and drainage.",
    },
    {
      q: "What stormwater requirements apply to Pennsylvania sites?",
      a: "Earth disturbance of an acre or more needs an NPDES permit with an E&S plan through the county conservation district, plus post-construction stormwater management emphasizing infiltration and volume reduction. Many watersheds have Act 167 plans with local criteria, and karst areas require careful geotechnical review of any infiltration.",
    },
  ],
};
