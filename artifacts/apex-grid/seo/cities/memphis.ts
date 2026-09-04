import type { CityData } from "../types";

export const memphis: CityData = {
  slug: "memphis",
  name: "Memphis",
  stateSlug: "tennessee",
  county: "Shelby County",
  ahj: {
    office: "City of Memphis Division of Planning and Development, Office of Construction Code Enforcement",
    process:
      "Construction Code Enforcement administers commercial permits, plan review, and inspections, with applications and status handled through the city’s online permitting tools. Building, fire, zoning, site, and utility reviews may be concurrent; work in flood-prone areas or within a historic district needs the associated review path identified before submittal.",
  },
  codes: {
    building: "2018 International Building Code, adopted by the City of Memphis with local amendments",
    energy: "2018 International Energy Conservation Code / ASHRAE 90.1-2016 commercial compliance path",
    amendments:
      "Memphis administers the Tennessee statewide commercial baseline through its own adopted codes and local administrative amendments. West Tennessee’s New Madrid seismic hazard is a design-basis issue under the IBC, not a local amendment that can be handled as a late structural note.",
  },
  utilities: {
    electric: "Memphis Light, Gas and Water (MLGW) provides electric, natural-gas, water, and wastewater utility services in its service territory",
    notes:
      "MLGW coordinates new electric, gas, water, and sewer service; large-load capacity, service routing, and transformer or meter requirements should be confirmed before a logistics or industrial building is fully laid out. The utility is supplied electrically by TVA, which also affects large-customer power planning.",
  },
  climateNotes:
    "Memphis is in hot-humid climate zone 3A, with long cooling seasons, high summer moisture, heavy rain, occasional freezes, severe thunderstorms, and Mississippi River floodplain exposure. It is also in the New Madrid seismic region, so seismic parameters are materially higher than in much of the Southeast.",
  marketNotes:
    "Memphis is a global freight hub centered on FedEx’s World Hub at Memphis International Airport, the Mississippi River port, major railroads, and I-40/I-55/I-69 corridors. Logistics and warehouse development, healthcare and education, advanced manufacturing, and redevelopment in established urban areas make utility capacity, brownfield/site history, and coordinated review recurring project issues.",
  narratives: {
    mep:
      "Memphis MEP systems carry both a high latent cooling load and a winter freeze obligation. In climate zone 3A, ventilation, dehumidification, envelope leakage, and cooling-plant controls must be coordinated rather than solved by oversizing air conditioning. MLGW supplies all four core utilities in its territory and is therefore a central early coordination point for the large electrical, gas-fired process, fire-flow, and sewer demands common to freight and manufacturing facilities. We compile the 2018 IECC or ASHRAE 90.1-2016 compliance package with the Office of Construction Code Enforcement while placing critical equipment and distribution for flooding and operational continuity where the program requires it.",
    structural:
      "Memphis is not a generic low-seismic Southern market. New Madrid hazard can place commercial buildings in higher seismic design categories than peer cities, making the site-specific mapped parameters, lateral system, diaphragm/load-path connections, drift, and nonstructural anchorage central decisions under the locally adopted 2018 IBC. Wind, tornadoes, and heavy rain remain important, but ordinary code wind design is not tornado-shelter design; ICC 500 refuge is a separate owner and occupancy decision. Loess bluffs, alluvial soils, and variable groundwater mean foundation selection follows a geotechnical investigation, particularly near the Mississippi corridor.",
    civil:
      "Memphis civil work must connect a site to a river-city drainage system. Mississippi River and tributary floodplain mapping, local drainage review, existing urban utilities, and erosion control shape the plan before detention is sized. On a large logistics tract, we coordinate grading and truck circulation with outfall feasibility and MLGW water/sewer capacity; on infill, we investigate existing combined or aging infrastructure rather than assuming a greenfield connection. Tennessee construction-stormwater permit coverage and a SWPPP apply at one acre or more, and the city’s floodplain and site requirements govern any work in mapped hazard areas.",
    energy:
      "Memphis uses the 2018 IECC commercial baseline, with ASHRAE 90.1-2016 available as an alternate compliance path. The best energy moves in humid 3A are low-SHGC glazing, a continuous air barrier, dedicated latent-load control, efficient cooling, and lighting controls—while insulation and freeze protection still matter for winter events. We reconcile those choices with MLGW service capacity and TVA-supplied electric demand, especially for distribution buildings whose plug, conveyor, refrigeration, or automation loads can overwhelm a simple whole-building assumption. Documentation is matched to the city-enforced edition before plan review.",
  },
  faqs: [
    {
      q: "Which office permits commercial construction in Memphis?",
      a: "The City of Memphis Division of Planning and Development’s Office of Construction Code Enforcement administers commercial permits, plan review, and inspections. Zoning, fire, site, floodplain, and utility reviews may also apply, so the complete review path should be established before submitting.",
    },
    {
      q: "Is seismic design important for Memphis commercial buildings?",
      a: "Yes. Memphis is influenced by the New Madrid seismic zone, and site-specific IBC seismic parameters can produce substantially greater seismic demand than in many Southern cities. The lateral system and nonstructural anchorage should be established early from the project location and risk category.",
    },
    {
      q: "Who provides electric and water service in Memphis?",
      a: "MLGW provides electric, natural gas, water, and wastewater service in its territory, with TVA supplying MLGW’s electricity. Engage MLGW early for large-load capacity, service routing, transformer or meter requirements, and water/sewer availability.",
    },
  ],
};