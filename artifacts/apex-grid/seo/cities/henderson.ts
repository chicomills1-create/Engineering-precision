import type { CityData } from "../types";

export const henderson: CityData = {
  slug: "henderson",
  name: "Henderson",
  stateSlug: "nevada",
  county: "Clark County",
  ahj: {
    office: "City of Henderson Community Development and Services Department, Building and Fire Safety",
    process:
      "Henderson uses its own online permitting and inspection process; it is not reviewed by Clark County or the City of Las Vegas. Building, fire, planning, and civil comments are coordinated through the City for sites within Henderson, while off-site drainage facilities may require separate Clark County Regional Flood Control District coordination.",
  },
  codes: {
    building: "2018 International Building Code with City of Henderson and Southern Nevada amendments",
    energy: "2018 International Energy Conservation Code with Southern Nevada amendments",
    amendments:
      "Henderson participates in the Southern Nevada Building Officials regional code-amendment framework, but its permit portal, local ordinances, and review authority remain distinct. Fire/life-safety, grading, drainage, and any planned-community requirements should be resolved with Henderson rather than assumed from a neighboring jurisdiction.",
  },
  utilities: {
    electric: "NV Energy (Nevada Power Company) serves Henderson",
    notes:
      "The City of Henderson provides water and wastewater services, drawing on Southern Nevada Water Authority regional supplies. NV Energy service extensions and transformer planning for large commercial loads proceed separately from City building approval; water-conservation and landscape rules are important in a Colorado River-dependent region.",
  },
  climateNotes:
    "Henderson shares the Las Vegas Valley’s 3B hot-dry climate, high solar exposure, very low humidity, and extreme summer cooling conditions. Its foothill and wash settings add flash-flood routing, steep-site grading, and erosion considerations despite low annual rainfall.",
  marketNotes:
    "Henderson’s development activity spans master-planned residential and mixed-use growth in west Henderson, healthcare and medical-office development around the St. Rose corridor, and industrial, distribution, and advanced-manufacturing activity near I-15 and Henderson Executive Airport. These different submarkets create very different service, drainage, and fire-protection demands.",
  narratives: {
    mep:
      "Henderson MEP design responds to 3B heat, solar gain, and low humidity with carefully derated outdoor equipment, low-SHGC envelope coordination, and dry-climate economizer or evaporative opportunities where the occupancy supports them. Medical, industrial, and airport-area projects can place large, coincident demands on NV Energy, so service capacity and transformer location are early coordination items. We prepare the mechanical, electrical, plumbing, and fire-protection package for Henderson Building and Fire Safety—not a Clark County submittal.",
    structural:
      "Henderson structures require site-specific seismic design and geotechnical direction; the southern Nevada seismic hazard is lower than Reno’s but remains consequential for lateral systems, essential facilities, and irregular buildings. Caliche, variable desert alluvium, and hillside cuts can drive excavation and foundation decisions. For foothill or wash-adjacent sites, we combine the geotechnical recommendations with retaining, drainage, and erosion concepts early enough to support Henderson’s grading and building reviews.",
    civil:
      "Civil engineering in Henderson is shaped by desert washes and fast runoff from short monsoon storms. Detention, overland relief, finished-floor elevation, and connections to master-planned flood-control facilities must be tested against City requirements and, where applicable, Clark County Regional Flood Control District criteria. Water-efficient planting and irrigation are practical site-design requirements in a Southern Nevada Water Authority supply area, not just an aesthetic choice.",
    energy:
      "Henderson applies the 2018 IECC through the regional Southern Nevada framework. In climate zone 3B, solar control, cool roofs, efficient cooling equipment, lighting controls, and demand-aware electrical design usually carry more value than a cold-climate insulation strategy. We coordinate COMcheck with the actual Henderson amendment path and with NV Energy’s applicable commercial offerings, keeping energy documentation consistent with the equipment and envelope actually shown for permit.",
  },
  faqs: [
    {
      q: "Does Henderson use Clark County permitting?",
      a: "No. A project within Henderson is reviewed by the City of Henderson’s Building and Fire Safety program through its own process. Clark County is the AHJ for unincorporated parcels, and the City of Las Vegas is another separate jurisdiction.",
    },
    {
      q: "What drives drainage design in Henderson?",
      a: "Low annual rainfall does not reduce the importance of drainage. Desert washes and short, high-intensity storms can require detention, conveyance, overland relief, and coordination with City and Regional Flood Control District facilities, especially near foothills and developing master-planned areas.",
    },
    {
      q: "Which utility issues should be addressed early for a Henderson commercial project?",
      a: "NV Energy electrical capacity and service configuration should be discussed early for large cooling, medical, industrial, or logistics loads. City water/wastewater availability and Southern Nevada’s conservation requirements also affect utility layout, irrigation, and site planning.",
    },
  ],
};