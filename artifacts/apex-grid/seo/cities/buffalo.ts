import type { CityData } from "../types";

export const buffalo: CityData = {
  slug: "buffalo",
  name: "Buffalo",
  stateSlug: "new-york",
  county: "Erie County",
  ahj: {
    office: "City of Buffalo Division of Permit and Inspection Services",
    process:
      "The Division of Permit and Inspection Services administers City of Buffalo building permits, plan review, and inspections. Commercial applications can require coordinated zoning, fire, preservation, sewer, and engineering review; applicants should establish the applicable Buffalo Green Code land-use approvals and New York State code documentation before filing construction plans.",
  },
  codes: {
    building:
      "2020 Building Code of New York State (Uniform Code), enforced by the City of Buffalo",
    energy:
      "2020 Energy Conservation Construction Code of New York State (ECCCNYS)",
    amendments:
      "Buffalo enforces the statewide Uniform Code outside the separate New York City code regime, together with local administrative and property-maintenance provisions. Buffalo Green Code requirements govern zoning and development review; landmark or historic-district approvals are separate from building-code compliance.",
  },
  utilities: {
    electric: "National Grid provides electric and natural-gas distribution service in Buffalo",
    notes:
      "National Grid service upgrades and distributed-generation applications require utility coordination. Buffalo Water provides water service, and the Buffalo Sewer Authority operates wastewater and combined-sewer infrastructure; water, sewer, and storm connections should be checked with the respective utility agencies during site planning.",
  },
  climateNotes:
    "Buffalo is a cold, humid climate-zone 5A city on Lake Erie. Lake-effect snow, snow drifting, freeze-thaw cycles, winter heating demand, wind exposure near the waterfront, and intense rainfall on a combined-sewer system all affect building and site design.",
  marketNotes:
    "Buffalo’s work includes medical-campus and higher-education investment, adaptive reuse of historic industrial buildings, waterfront redevelopment, advanced manufacturing, and logistics. The Buffalo Niagara Medical Campus, institutional facilities, and older masonry and heavy-timber building stock create demand for complex renovation, utility-upgrade, and resilience work.",
  narratives: {
    mep:
      "Buffalo MEP engineering starts with a heating-dominated 5A climate: robust envelope coordination, freeze protection, winter outside-air control, heat recovery, and humidity management matter alongside summer cooling. National Grid service capacity and interconnection are considered early for electric heating, laboratory, medical, and adaptive-reuse load changes, while Buffalo Water and Sewer Authority interfaces shape water, sanitary, and fire-service decisions. We document the 2020 ECCCNYS energy path for the City’s review process and avoid treating an old masonry shell as if it had a modern air barrier.",
    structural:
      "Buffalo structural design must accommodate lake-effect snow, drifting at roof steps and parapets, ice, freeze-thaw deterioration, and Lake Erie wind exposure. In the city’s older industrial and commercial stock, masonry condition, corrosion, heavy-timber connections, floor capacity, and prior alterations require investigation before conversion or added loading. The 2020 New York State Building Code provides the code basis, while the geotechnical report and waterfront or fill conditions determine whether foundations, slabs, and below-grade waterproofing need more than conventional assumptions.",
    civil:
      "Civil design in Buffalo works within an urban combined-sewer context managed by the Buffalo Sewer Authority. Snowmelt, intense rainfall, legacy utilities, constrained rights-of-way, and waterfront or floodplain conditions can limit a conventional drainage concept, so we establish discharge, detention or green-infrastructure opportunities, and utility conflicts early. Buffalo Green Code review, City engineering requirements, and the state SPDES construction-stormwater process are coordinated with grading and access rather than deferred to final permitting.",
    energy:
      "Buffalo commercial energy compliance follows the 2020 ECCCNYS, based on the statewide New York framework, and can use the applicable prescriptive, performance, or ASHRAE path. In a 5A lake climate, continuous insulation, air-barrier continuity, high-performance fenestration, heat-recovery ventilation, and efficient heating strategies do more than satisfy paperwork: they protect comfort and manage winter peak demand. For adaptive reuse, we coordinate the energy analysis with moisture-safe enclosure upgrades and National Grid service realities rather than simply adding equipment to an unexamined envelope.",
  },
  faqs: [
    {
      q: "What building and energy codes apply in Buffalo?",
      a: "Buffalo enforces New York State’s 2020 Uniform Code, including the 2020 Building Code of New York State and 2020 ECCCNYS. Buffalo is outside New York City, so it does not use the separate NYC Construction Codes; local Buffalo administrative and land-use requirements still apply.",
    },
    {
      q: "Why do Buffalo roofs need careful snow design?",
      a: "Lake-effect snow, wind-driven drifting, roof elevation changes, parapets, and rooftop equipment can produce concentrated snow loads beyond a simple uniform-roof assumption. The structural design must use the adopted code’s site criteria and account for drift, sliding snow, and freeze-thaw durability.",
    },
    {
      q: "Who provides water and sewer service in Buffalo?",
      a: "Buffalo Water provides water service and the Buffalo Sewer Authority operates wastewater and combined-sewer infrastructure. Their service, connection, and drainage requirements should be coordinated with the site plan, alongside National Grid electric and gas service.",
    },
  ],
};