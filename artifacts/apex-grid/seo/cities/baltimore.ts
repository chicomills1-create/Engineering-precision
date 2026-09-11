import type { CityData } from "../types";

export const baltimore: CityData = {
  slug: "baltimore",
  name: "Baltimore",
  stateSlug: "maryland",
  county: "Baltimore City",
  ahj: {
    office: "Baltimore City Department of Housing and Community Development, Code Enforcement",
    process:
      "Baltimore City uses its OneStop permitting portal for applications, plan uploads, payments, and permit records. Commercial work can require coordinated building, fire, zoning, health, historic-preservation, right-of-way, and utility review; applicants should identify those tracks rather than treating the building permit as the sole approval.",
  },
  codes: {
    building: "Baltimore City Building Code adopting the 2021 International Building Code, with City amendments",
    energy: "Baltimore City Energy Conservation Code based on the 2021 IECC; ASHRAE 90.1-2019 is an alternate commercial compliance standard",
    amendments:
      "Baltimore City adopts Maryland's Building Performance Standards through its City code and adds local provisions and administrative procedures. The City also has a Building Energy Performance Standard for covered existing buildings, which is separate from new-construction energy-code review but important to acquisition and retrofit planning.",
  },
  utilities: {
    electric: "Baltimore Gas and Electric (BGE) provides electric distribution service",
    notes:
      "BGE should review new service, service upgrades, and distributed-energy interconnection early, particularly for electrified or high-load facilities. Baltimore City Department of Public Works operates water and wastewater systems; water, sewer, and storm-drain connections require City coordination.",
  },
  climateNotes:
    "Baltimore is in ASHRAE climate zone 4A, with humid summers, winter freeze-thaw cycles, intense rainfall, and Chesapeake Bay/Patapsco tidal-flood exposure. Redevelopment parcels may include urban fill, variable Coastal Plain soils, high groundwater, and legacy combined-sewer constraints.",
  marketNotes:
    "Baltimore construction spans port and logistics facilities, Johns Hopkins and University of Maryland medical and research investment, multifamily and mixed-use redevelopment, and institutional renovation. The Port of Baltimore and its industrial districts create heavy-utility and brownfield redevelopment work, while older downtown neighborhoods bring historic and existing-building constraints.",
  narratives: {
    mep:
      "Baltimore MEP design must handle a mixed-humid 4A climate: latent-load control and ventilation matter in summer, while freeze protection and resilient heating matter in winter. BGE capacity, metering, and interconnection discussions belong at concept design for laboratories, port-related facilities, and electrification-heavy retrofits. The City’s 2021-IECC-based energy code establishes the permit baseline, but the separate Baltimore Building Energy Performance Standard can influence long-term plant and envelope decisions for covered existing buildings. DPW water and wastewater connection requirements should advance with plumbing layouts, especially where an older building’s incoming services or sewer laterals are uncertain.",
    structural:
      "Baltimore structural work is shaped more by wind, flood exposure, durability, and subsurface conditions than by high seismic demand. Waterfront and low-lying sites need a current floodplain review, and site-specific geotechnical work is important where fill, soft Coastal Plain deposits, groundwater, or remnants of prior structures affect bearing and settlement. Freeze-thaw, rain, and salt exposure influence façade and parking details, while wind uplift and rooftop equipment anchorage remain code-critical. Under the City’s 2021-IBC-based code, adaptive reuse also begins with documenting existing masonry, steel, concrete, and foundation conditions rather than assuming modern load paths.",
    civil:
      "Civil engineering in Baltimore begins by mapping the actual drainage basin, combined or separate sewer context, and DPW connection pathway. Intense rainfall, tidal influences near the harbor and Patapsco, constrained urban rights-of-way, and shallow groundwater can make conventional infiltration or gravity outfalls impractical. Maryland erosion and sediment-control and stormwater requirements apply alongside City grading, storm-drain, water, sewer, and right-of-way review. On port-adjacent or redevelopment sites, early utility locating, environmental due diligence, flood screening, and space for water-quality practices prevent a site plan from relying on unavailable downstream capacity.",
    energy:
      "Commercial energy compliance in Baltimore follows the City’s 2021-IECC-based Energy Conservation Code or the ASHRAE 90.1-2019 alternate standard. In climate zone 4A, air-barrier continuity, moisture-aware insulation, solar-control glazing, efficient ventilation, and humidity control are integrated decisions rather than isolated COMcheck entries. For covered existing buildings, Baltimore’s Building Energy Performance Standard creates an operational-performance consideration beyond permit compliance. We therefore coordinate envelope, lighting, heat-pump or heating-plant loads, controls, and BGE service capacity so a renovation supports both the code submission and the building’s eventual energy obligations.",
  },
  faqs: [
    {
      q: "Who issues commercial permits in Baltimore?",
      a: "Baltimore City Department of Housing and Community Development Code Enforcement administers permits through OneStop. A commercial project may also require fire, zoning, historic-preservation, health, right-of-way, DPW utility, or other City review.",
    },
    {
      q: "Which building and energy codes apply in Baltimore?",
      a: "Baltimore City uses a Building Code adopting the 2021 IBC with City amendments and an Energy Conservation Code based on the 2021 IECC. ASHRAE 90.1-2019 is an alternate commercial energy compliance standard.",
    },
    {
      q: "What utility and site issues should be identified early?",
      a: "BGE service capacity and interconnection, plus DPW water, wastewater, and storm-drain connections, should be screened before the layout is fixed. Harbor-area flood exposure, combined-sewer constraints, fill, groundwater, and Maryland stormwater controls can materially change site design.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://dhcd.baltimorecity.gov/permits"],
      codes: ["https://dhcd.baltimorecity.gov/codes"],
      amendments: ["https://codes.baltimorecity.gov/"],
      utilities: ["https://www.bge.com/Services/Pages/StartStopMove.aspx", "https://publicworks.baltimorecity.gov/"],
      climate: ["https://www.fema.gov/flood-maps"],
      market: ["https://www.portofbaltimore.com/"]
    }
  },
};