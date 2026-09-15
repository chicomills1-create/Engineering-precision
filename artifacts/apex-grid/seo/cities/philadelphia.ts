import type { CityData } from "../types";

export const philadelphia: CityData = {
  slug: "philadelphia",
  name: "Philadelphia",
  stateSlug: "pennsylvania",
  county: "Philadelphia County",
  ahj: {
    office: "City of Philadelphia Department of Licenses and Inspections (L&I)",
    process:
      "L&I receives commercial permit applications, plans, and reviews through the eCLIPSE portal. Straightforward scopes may qualify for an EZ Permit, while work requiring zoning, building, fire, historic, streets, or utility review follows the relevant additional path; a licensed design professional submits sealed construction documents where the code requires them.",
  },
  codes: {
    building:
      "Philadelphia Building Construction and Occupancy Code, Title 4, adopting the 2018 International Codes with Philadelphia amendments",
    energy:
      "Philadelphia Energy Conservation Code, based on the 2018 IECC with Philadelphia amendments",
    amendments:
      "Philadelphia administers its own Title 4 code amendments within Pennsylvania’s Uniform Construction Code framework. The city has a separate Existing Buildings Code, and its energy and green-building requirements should be checked with the currently adopted Philadelphia code set rather than assumed from a neighboring Pennsylvania municipality.",
  },
  utilities: {
    electric: "PECO delivers electricity and natural gas in Philadelphia",
    notes:
      "PECO new-service, load, and distributed-generation interconnection requirements should be started early for electrification or capacity upgrades. Philadelphia Water Department operates the city water, sewer, and stormwater systems; PWD stormwater requirements and Green City, Clean Waters practices are central to development and redevelopment sites.",
  },
  climateNotes:
    "Philadelphia lies in climate zone 4A (mixed-humid), with hot-humid summers, cold winters, freeze-thaw cycling, and meaningful snow and wind loads. Tidal reaches of the Delaware and Schuylkill, combined sewers, and low-lying neighborhoods add flood and intense-rainfall risk to urban drainage design.",
  marketNotes:
    "Philadelphia’s market mixes university and health-system expansion, multifamily and mixed-use infill, logistics and industrial redevelopment, and renovation of rowhouse, warehouse, and former manufacturing buildings. Adaptive reuse and building decarbonization are recurring needs, while the city’s combined-sewer and stormwater program makes site engineering important even on compact urban parcels.",
  narratives: {
    mep:
      "Philadelphia MEP design balances winter heating and freeze protection with humid-summer sensible and latent loads in a 4A climate, often in buildings being converted from industrial, warehouse, or older commercial use. PECO capacity and interconnection coordination belongs at the start of electrification, kitchen, lab, or service-upgrade scopes. We prepare the mechanical, electrical, plumbing, and energy package to Philadelphia’s locally amended 2018 code set and coordinate fire-protection and L&I eCLIPSE review requirements with the architectural filing.",
    structural:
      "Philadelphia structural work routinely starts with an existing-building survey: party walls, unreinforced masonry, heavy timber, aging steel, and limited access can control a reuse or vertical-addition concept. L&I applies Title 4 and its Existing Buildings Code, while snow, wind, freeze-thaw deterioration, and the city’s relatively low but nonzero seismic demand inform the design. Excavation beside rowhouses, underpinning, façade stabilization, and special inspections need practical sequencing as well as calculations.",
    civil:
      "Civil design in Philadelphia must make stormwater performance fit on dense redevelopment parcels. Philadelphia Water Department’s stormwater requirements and Green City, Clean Waters program favor infiltration, detention, and greened infrastructure where feasible, but existing utilities, contaminated fill, high groundwater, and combined sewers must be investigated first. We coordinate water and sewer connections, streets work, grading, and floodplain constraints with PWD and the appropriate city review paths rather than treating a compact site as drainage-free.",
    energy:
      "Philadelphia’s Energy Conservation Code is based on the 2018 IECC with local amendments, so the compliance package must be Philadelphia-specific. In climate zone 4A, insulation continuity, air leakage control, glazing selection, efficient heating, and humidity-aware cooling all matter; in masonry retrofits, interior insulation requires condensation and durability analysis rather than a nominal R-value alone. We align envelope, lighting, HVAC, and controls documentation with L&I’s submission process and the project’s existing-building strategy.",
  },
  faqs: [
    {
      q: "What code does Philadelphia L&I enforce for commercial work?",
      a: "L&I enforces Philadelphia Title 4, the Building Construction and Occupancy Code, which adopts the 2018 International Codes with Philadelphia amendments within the Pennsylvania UCC framework. Philadelphia also has an Existing Buildings Code, so renovation and change-of-occupancy scopes need to be evaluated under the city’s applicable existing-building provisions.",
    },
    {
      q: "How are commercial plans submitted in Philadelphia?",
      a: "Commercial permits and plans are submitted through L&I’s eCLIPSE portal. Some limited scopes can use an EZ Permit, but projects that need plans, zoning, fire, historic, streets, or utility review follow the applicable additional review path. Eligibility should be confirmed before using an EZ Permit route.",
    },
    {
      q: "Why is stormwater engineering important on a small Philadelphia site?",
      a: "Philadelphia Water Department regulates stormwater and operates a combined sewer system in much of the city. Its Green City, Clean Waters approach relies on detention, infiltration, and greened infrastructure where conditions allow. Small infill sites still need to account for runoff, utility conflicts, soil and groundwater conditions, and potentially flood exposure near the Delaware and Schuylkill.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 96, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.phila.gov/departments/department-of-licenses-and-inspections/"],
      codes: ["https://codelibrary.amlegal.com/codes/philadelphia/latest/philadelphia_pa/0-0-0-267468"],
      amendments: ["https://codelibrary.amlegal.com/codes/philadelphia/latest/philadelphia_pa/0-0-0-267468"],
      utilities: ["https://www.peco.com/Business", "https://www.phila.gov/departments/philadelphia-water-department/"],
      climate: ["https://www.fema.gov/flood-maps"],
      market: ["https://www.phila.gov/departments/department-of-commerce/"]
    }
  },
};