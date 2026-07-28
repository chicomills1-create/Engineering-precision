import type { StateData } from "../types";

export const newYork: StateData = {
  slug: "new-york",
  name: "New York",
  abbrev: "NY",
  buildingCode: {
    name: "2020 Uniform Code (Building Code of New York State) — statewide, based on the 2018 I-Codes",
    baseCode: "2018 IBC with New York State amendments",
    notes:
      "New York State enforces a statewide Uniform Code (the 2020 editions of the Building, Fire, and related codes, built on the 2018 I-Codes) in every jurisdiction except New York City, which maintains its own NYC Construction Codes (the 2022 NYC codes derive from the 2015 IBC with extensive local modifications). The two regimes are genuinely different — a project in Yonkers and a project in Manhattan answer to different code books.",
  },
  energyCode: {
    commercial: "2020 Energy Conservation Construction Code of New York State (ECCCNYS), based on 2018 IECC / ASHRAE 90.1-2016",
    notes:
      "The statewide energy code applies outside NYC; New York City enforces the NYC Energy Conservation Code, which is generally more stringent. Compliance can follow the IECC prescriptive/performance paths or ASHRAE 90.1.",
    beyondCode:
      "New York offers the optional NYStretch Energy Code (NYStretch-2020) that municipalities may adopt for roughly 11% better performance, and NYC's Local Law 97 imposes carbon-emissions caps and steep penalties on large existing buildings.",
  },
  climate: {
    zones: "4A across the NYC metro, Long Island, and the Hudson Valley; 5A through central and western NY; 6A in the Adirondacks and North Country",
    drivers: [
      "Cold, humid winters driving heating and freeze protection",
      "Lake-effect snow across the Buffalo/Syracuse corridor",
      "Coastal humidity and hurricane-remnant rain on Long Island",
      "Heating-dominated envelope and continuous-insulation detailing",
    ],
  },
  structural: {
    seismic: "Mostly Seismic Design Category B, edging toward C on soft soils near NYC and along parts of the Hudson Valley — moderate but not negligible, and detailing matters for essential facilities",
    wind: "Basic wind speeds near 115–130 mph on Long Island and the coast (Risk Category II), tapering to ~110–115 mph inland",
    snow: "Ground snow loads range from ~20–30 psf downstate to 40–70+ psf upstate, with lake-effect belts and the Adirondacks running highest — often the governing roof load",
    other: "Frost depths of 3–4 ft require deep footings statewide; coastal flood zones (VE/AE) govern Long Island and lower Manhattan foundation design",
  },
  licensure: {
    board: "New York State Board for Engineering and Land Surveying (NYS Education Department, Office of the Professions)",
    notes:
      "New York licenses PEs through the State Education Department and accepts NCEES records for endorsement. Digitally authenticated electronic seals are permitted, and New York does not offer temporary or emergency licensure, so full state licensure is required before stamping.",
  },
  metros: ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany", "Long Island"],
  permitting:
    "Outside NYC, permits are issued by hundreds of individual towns, villages, and cities enforcing the statewide Uniform Code, so review timelines and local supplements vary widely. New York City is a category unto itself: the Department of Buildings runs a rigorous review with special-inspection and filing-representative requirements that add schedule and cost. Downstate SEQRA/environmental review can also gate larger site work.",
  marketNotes:
    "New York's construction market splits between a dense, high-rise, adaptive-reuse downstate economy and a value-driven upstate market anchored by healthcare, higher education, and advanced manufacturing (including the semiconductor investment near Malta and Syracuse). Decarbonization mandates — Local Law 97 and the state's Climate Act — are reshaping both new construction and retrofit demand.",
  narratives: {
    mep:
      "MEP engineering in New York is heating-dominated and, increasingly, electrification-driven. Outside New York City we design to the 2020 ECCCNYS with 2018-IECC envelope and system rules; inside the five boroughs we answer to the NYC Energy Conservation Code and the emissions ceilings of Local Law 97, which push large buildings off gas and toward heat pumps and heat recovery. We size heating plants to Zone 4A–6A design temperatures, detail freeze protection on outdoor air intakes and coils, and manage the humidity that comes with cold-climate winters and coastal summers. Con Edison's demand-charge and steam-district realities downstate, versus National Grid and NYSEG territory upstate, change the electrical and mechanical economics enough that we model both energy and utility cost before locking equipment. In NYC, filing coordination and special inspections shape the deliverable as much as the load calc.",
    structural:
      "Structural work in New York spans two worlds. Downstate, foundations contend with soft soils, high water tables, and coastal flood zones on Long Island and lower Manhattan, where VE/AE elevation requirements and scour drive design; seismic detailing quietly matters because soft sites can push otherwise-modest sites toward SDC C. Upstate, snow is the headline: lake-effect belts around Buffalo and Syracuse and the Adirondack high country carry ground snow loads of 40–70+ psf, with drift and sliding-snow accumulation that governs long-span roofs. We design to the 2020 Building Code of New York State (or the separate NYC Construction Codes in the city), detail 3–4 ft frost footings statewide, and coordinate the geotechnical report closely — the difference between spread footings and deep foundations often decides the budget.",
    civil:
      "Civil and site design in New York is shaped by the state's SPDES stormwater program and the NYSDEC Stormwater Management Design Manual, which pushes green infrastructure and runoff-reduction volume before conventional detention. Projects disturbing an acre or more need SPDES general-permit coverage and a SWPPP, and downstate MS4 communities layer on their own water-quality requirements. We design grading, storm systems, and utility connections to local town/village standards outside NYC and to DOB/DEP standards within the city, where combined-sewer constraints and detention-tank requirements are common. Frost, high groundwater on Long Island, and steep Hudson Valley grades all influence pipe cover, infiltration feasibility, and erosion control. Early coordination with the AHJ and, for large sites, SEQRA review keeps entitlement from stalling the schedule.",
    energy:
      "Energy compliance in New York is a tale of two codes. Outside New York City, commercial projects follow the 2020 ECCCNYS (2018 IECC / ASHRAE 90.1-2016), and we document via COMcheck or whole-building modeling, with the option to target NYStretch-2020 where a municipality has adopted it. Inside NYC, the NYC Energy Conservation Code is more stringent, and Local Law 97 adds hard carbon-intensity limits with escalating penalties that make electrification and envelope upgrades a financial issue, not just a code one. In heating-dominated Zones 4A–6A, continuous insulation, air-barrier continuity, and high-performance glazing carry the envelope, while heat-recovery ventilation and heat pumps increasingly define the compliant mechanical path. We match the documentation to the exact jurisdiction and, for large buildings, model the LL97 trajectory.",
  },
  faqs: [
    {
      q: "Which building code applies to my New York project?",
      a: "If your project is anywhere in New York State outside New York City, it follows the statewide Uniform Code (2020 editions based on the 2018 I-Codes). Projects within the five boroughs follow the separate NYC Construction Codes, which are based on the 2015 IBC with extensive local amendments. We confirm which regime and edition applies before design.",
    },
    {
      q: "How do commercial buildings comply with New York's energy code?",
      a: "Outside NYC, compliance follows the 2020 ECCCNYS (based on the 2018 IECC and ASHRAE 90.1-2016) via prescriptive, performance, or COMcheck documentation. NYC enforces its own, more stringent Energy Conservation Code, and large existing buildings also face Local Law 97 carbon caps. Some municipalities have adopted the optional NYStretch code for higher performance.",
    },
    {
      q: "What snow and wind loads govern structural design in New York?",
      a: "Snow usually governs roofs upstate: lake-effect belts near Buffalo and Syracuse and the Adirondacks carry ground snow loads of 40–70+ psf, with drift accumulation to design for. Coastal wind speeds on Long Island run around 115–130 mph. We design to the loads mapped for the specific site under the adopted code.",
    },
    {
      q: "What stormwater rules apply to New York site development?",
      a: "Projects disturbing an acre or more generally need SPDES general-permit coverage and a SWPPP, and the NYSDEC design manual prioritizes green infrastructure and runoff-reduction volume. MS4 communities downstate and NYC's combined-sewer constraints add local requirements we design around from the start.",
    },
  ],
};
