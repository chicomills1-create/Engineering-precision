import type { StateData } from "../types";

export const iowa: StateData = {
  slug: "iowa",
  name: "Iowa",
  abbrev: "IA",
  buildingCode: {
    name: "Iowa State Building Code based on the IBC (applies to state-owned and certain buildings; local adoption elsewhere)",
    baseCode: "IBC with Iowa amendments; adoption reach varies by jurisdiction",
    notes:
      "Iowa's State Building Code (administered by the State Fire Marshal / Iowa DPS) is mandatory for state-owned buildings and certain occupancies and serves as the default where local governments have not adopted their own code. Many cities and counties adopt the IBC locally, so the governing edition must be confirmed with the specific AHJ, particularly outside the larger metros.",
  },
  energyCode: {
    commercial: "Iowa Energy Code based on the 2012 IECC / ASHRAE 90.1-2010 with state amendments (adopted statewide)",
    notes:
      "Iowa adopts a statewide commercial energy code, historically tracking an older IECC/ASHRAE 90.1 vintage than the current model codes. Compliance is uniform statewide, but the older baseline should be verified and design targeted above it given the cold climate.",
  },
  climate: {
    zones: "5A across most of the state; edging toward 6A in the far north",
    drivers: [
      "Cold, continental winters with long heating seasons",
      "Hot, humid summers requiring dehumidification and latent-load control",
      "Large seasonal temperature swings",
      "Severe-storm, derecho, and tornado exposure across the state",
    ],
  },
  structural: {
    seismic: "Very low seismicity statewide — Seismic Design Category A; seismic effectively never governs",
    wind: "Basic wind speeds generally around 105–115 mph (Risk Category II); Iowa's 2020 derecho underscored the importance of uplift and lateral robustness in open terrain",
    snow: "Ground snow loads commonly around 25–30 psf, higher in the north, with drift analysis on larger roofs",
    other: "Frost depths of roughly 42–48 inches govern footings; expansive clays and loess soils require geotechnical coordination",
  },
  licensure: {
    board: "Iowa Engineering and Land Surveying Examining Board",
    notes: "Iowa grants licensure by comity for NCEES-record engineers; electronic seals and digital signatures are accepted for plan submittals under board rules.",
  },
  metros: ["Des Moines", "Cedar Rapids", "Davenport", "Iowa City", "Sioux City", "Ames"],
  permitting:
    "Permitting in Iowa is largely local: cities and counties that have adopted the IBC run their own review and inspections, while the State Fire Marshal reviews certain occupancies and state buildings. Des Moines and Cedar Rapids maintain structured commercial review; because adoption and editions vary outside the metros, confirming the governing code with the AHJ is essential.",
  marketNotes:
    "Iowa's construction market is anchored by agricultural processing, biofuels, advanced manufacturing, and a fast-growing data-center sector drawn by low-cost power and land. Des Moines' insurance and financial-services base sustains commercial and healthcare development, while Cedar Rapids and the Corridor add manufacturing and institutional work.",
  narratives: {
    mep:
      "Iowa's continental climate — cold winters, hot and humid summers, all near climate zone 5A — means our mechanical designs must handle a wide operating range. Heating loads are significant, so we evaluate condensing boilers, VRF, and cold-climate heat pumps and detail freeze protection, while summer dehumidification gets explicit attention to control the state's high summer humidity. Iowa's agricultural-processing and biofuels facilities bring process ventilation, high-bay heating, and combustion-air demands that go well beyond typical comfort design, and its booming data-center sector drives some of the largest cooling and electrical loads in the state. We coordinate closely with utilities like MidAmerican Energy and Alliant Energy on service capacity, redundancy, and demand strategy — Iowa's abundant wind generation and competitive power rates are a big reason data centers locate here. Because the energy code is adopted statewide, our compliance documentation is uniform, though we design above the older adopted vintage to control operating cost.",
    structural:
      "Iowa structural design is a gravity, snow, and wind exercise — seismic is negligible (SDC A statewide). What Iowa taught the industry in August 2020 is that wind here is not just about peak speed: the derecho that swept through Cedar Rapids delivered sustained straight-line winds that failed structures across a wide area, and we design with that lesson in mind, emphasizing continuous load paths, robust connections, and uplift resistance in open terrain. Ground snow loads run around 25–30 psf and higher in the north, with drift analysis on larger roofs. Frost penetration of roughly 42–48 inches governs footing depth, and Iowa's expansive clays and collapsible loess soils make geotechnical coordination essential for foundations. We design gravity and lateral systems to the applicable IBC edition and confirm the governing code with the AHJ, since adoption reach varies across Iowa's jurisdictions.",
    civil:
      "Site engineering in Iowa runs through the DNR's NPDES General Permit No. 2 for construction stormwater, required for sites disturbing an acre or more, with a pollution-prevention plan and erosion controls. Post-construction stormwater management and water-quality requirements are enforced by local governments and, in the metros, adopted stormwater standards that often follow the Iowa Stormwater Management Manual. We design detention, bioretention, and conveyance to those standards, accounting for Iowa's flat-to-rolling terrain, tight clay and loess soils, and agricultural drainage tile that frequently crosses development sites and must be managed or rerouted. Freeze-thaw and deep frost affect pavement and utility design. For the large data-center and processing sites driving Iowa's market, we plan grading and detention to handle sizeable impervious areas while meeting state and local water-quality volumes.",
    energy:
      "Iowa's commercial energy code is adopted statewide but tracks an older IECC/ASHRAE 90.1 vintage than the current model codes, giving us a uniform if dated compliance baseline. We document compliance through COMcheck or energy modeling against the adopted edition, but the older minimum means real savings come from designing above it — and in climate zone 5A the envelope-driven payback is quick. Continuous insulation, air-barrier continuity, and infiltration control are the highest-value measures, followed by efficient heating plants and daylight-and-occupancy lighting. For Iowa's process-heavy agricultural and manufacturing facilities, heat recovery and efficient process heating add substantial savings. We also identify MidAmerican and Alliant efficiency-program incentives that reward above-code performance, which helps offset first cost on heating-dominated Iowa buildings.",
  },
  faqs: [
    {
      q: "Does Iowa have a statewide building code?",
      a: "Iowa's State Building Code is mandatory for state-owned buildings and certain occupancies and serves as the default where local governments haven't adopted their own. Many cities and counties adopt the IBC locally, so we confirm the governing edition with the specific AHJ, especially outside the metros.",
    },
    {
      q: "Which energy code applies to Iowa commercial buildings?",
      a: "Iowa adopts a statewide commercial energy code, historically on an older IECC/ASHRAE 90.1 vintage. We document compliance with COMcheck or energy modeling and typically design above the dated minimum, since envelope performance pays back quickly in Iowa's cold zone 5A climate.",
    },
    {
      q: "How does the 2020 derecho affect structural design in Iowa?",
      a: "It reinforced that Iowa's wind risk includes prolonged straight-line winds, not just peak gusts. We emphasize continuous load paths, robust connections, and uplift resistance in open terrain. Seismic is negligible (SDC A), so wind and snow, plus deep-frost foundations, govern structural design.",
    },
    {
      q: "What stormwater rules apply to Iowa site development?",
      a: "The Iowa DNR's NPDES General Permit No. 2 covers construction sites disturbing an acre or more, and local governments enforce post-construction standards often based on the Iowa Stormwater Management Manual. We also manage agricultural drainage tile that commonly crosses Iowa development sites.",
    },
  ],
};
