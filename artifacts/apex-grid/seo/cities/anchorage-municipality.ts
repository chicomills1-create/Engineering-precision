import type { CityData } from "../types";

export const anchorage: CityData = {
  slug: "anchorage-municipality",
  name: "Anchorage",
  stateSlug: "alaska",
  county: "Municipality of Anchorage",
  ahj: {
    office: "Municipality of Anchorage Development Services Department — Building Safety",
    process:
      "Anchorage is a unified municipality, and its Development Services Department administers plan review and permits within the Anchorage Building Safety Service Area under Anchorage Municipal Code Title 23. Commercial submittals are reviewed against Title 23's locally amended codes, and Alaska law requires drawings for most commercial work to be prepared and stamped by Alaska-registered design professionals, so the registered-professional basis of the set is checked as part of review. Outside the service area, municipal permit requirements differ — confirming the parcel is inside the ABSSA is a first step.",
  },
  codes: {
    building: "International Building Code as adopted with local amendments in Anchorage Municipal Code Title 23 (Chapter 23.15)",
    energy: "International Energy Conservation Code as adopted in Anchorage Municipal Code Title 23 (Chapter 23.60), with Anchorage amendments for cold-climate construction",
    amendments:
      "Anchorage amends the model codes heavily for arctic and seismic conditions in Title 23: local amendments address frost-protected and permafrost-affected foundations, snow and roof-drift loads, high seismic design requirements, and cold-climate energy detailing. Anchorage adopts the Uniform Plumbing Code rather than the IPC, and the 2023 National Electrical Code in the current Title 23 framework — both departures from the ICC family used in most of the Lower 48.",
  },
  utilities: {
    electric: "Chugach Electric Association serves Anchorage (it acquired the municipal Anchorage Municipal Light & Power utility in 2020 and is now the city's principal electric utility)",
    notes:
      "Chugach Electric, a member-owned cooperative and the Railbelt's largest utility, handles new commercial services and interconnections in Anchorage; its generation mix leans on Cook Inlet natural gas, so gas-supply constraints are a live planning topic for large new loads. Natural gas distribution is ENSTAR Natural Gas Company, and municipal water and wastewater are Anchorage Water & Wastewater Utility (AWWU) — all three utility coordinations run on Alaska timelines, where winter construction windows compress schedules.",
  },
  climateNotes:
    "ASHRAE climate zone 7, maritime subarctic: long cold winters, ground snow loads among the highest of any U.S. metro, deep frost penetration, and short construction summers. Anchorage sits in one of the nation's highest seismic regions — the 2018 magnitude 7.0 earthquake is the recent design touchstone — so seismic detailing and snow govern most structural and envelope decisions.",
  marketNotes:
    "Anchorage construction is driven by Joint Base Elmendorf-Richardson and Alaska Command military work, the Port of Alaska (which handles most of the state's freight and is in a multi-year modernization program), healthcare anchored by Providence and Alaska Regional hospitals, Ted Stevens Anchorage International Airport cargo operations — consistently among the world's busiest cargo airports — and state government and oil-and-gas support offices.",
  narratives: {
    mep:
      "MEP design in Anchorage is cold-climate engineering first: zone 7 heating loads, freeze protection on every water-bearing system, and snow and ice management at intakes, vents, and rooftop equipment under Anchorage's Title 23 amendments to the IECC and mechanical code. Chugach Electric service coordination and ENSTAR gas availability set the fuel and service basis early, and the Uniform Plumbing Code — not the IPC — governs the plumbing scope, a distinction that catches Lower 48 templates.",
    structural:
      "Anchorage structural design carries some of the most demanding combined loading in the United States: high seismic design categories from the nearby subduction zone, proven by the 1964 and 2018 earthquakes, together with heavy ground snow and drift loads and deep frost. Foundations respond to glacial soils and discontinuous permafrost risk at the margins, and Title 23's local amendments — not a generic IBC read — set the detailing requirements reviewers check.",
    civil:
      "Civil work in Anchorage is scheduled around a short construction season and designed for freeze-thaw, frost heave, and snow storage. Municipal water and sewer run through AWWU, stormwater must manage spring breakup melt events, and grading and excavation are regulated under Title 23's own chapter. Sites near the coast and creeks add floodplain and high-groundwater conditions to the standard Title 21 land-use review.",
    energy:
      "Energy compliance in Anchorage follows the IECC as adopted and amended in Title 23 Chapter 23.60, where the design problem is heating-dominated: envelope performance, air sealing against stack effect and ice-dam formation, and heat-recovery ventilation sized for zone 7. AHFC's Building Energy Efficiency Standard influences financed residential work statewide, and Anchorage's amendments push commercial documentation toward cold-climate assemblies rather than base-code defaults.",
  },
  faqs: [
    {
      q: "Does Alaska have a statewide building code Anchorage follows?",
      a: "No — Alaska has no mandatory statewide building code for general private construction. Anchorage adopts and enforces its own code set in Anchorage Municipal Code Title 23, with extensive local amendments for seismic, snow, and cold-climate conditions.",
    },
    {
      q: "Who provides electric service in Anchorage?",
      a: "Chugach Electric Association is Anchorage's principal electric utility; it acquired the municipal utility, Anchorage Municipal Light & Power, in 2020. Natural gas is ENSTAR, and water/wastewater is the municipal AWWU.",
    },
    {
      q: "What plumbing code does Anchorage use?",
      a: "Anchorage adopts the Uniform Plumbing Code (UPC) in Title 23, not the International Plumbing Code used in most ICC jurisdictions — a material difference for plumbing design and review.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 74, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.muni.org/Departments/DevelopmentServices/Pages/default.aspx"],
      codes: ["https://www.muni.org"],
      amendments: ["https://www.muni.org"],
      utilities: ["https://www.chugachelectric.com"],
      climate: ["https://www.weather.gov/afg/"],
      market: ["https://www.muni.org"],
    },
  },
};
