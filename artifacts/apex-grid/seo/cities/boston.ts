import type { CityData } from "../types";

export const boston: CityData = {
  slug: "boston",
  name: "Boston",
  stateSlug: "massachusetts",
  county: "Suffolk County",
  ahj: {
    office: "City of Boston Inspectional Services Department (ISD)",
    process:
      "Boston ISD accepts building-permit applications and design documents through its online permitting system; commercial work is routed for zoning, building, fire, and other agency reviews as applicable. Projects in historic districts, on the waterfront, or involving public ways can also require Boston Landmarks Commission, Boston Planning & Development Agency, Massachusetts Department of Environmental Protection, or other separate approvals.",
  },
  codes: {
    building:
      "10th edition Massachusetts State Building Code (780 CMR), incorporating the 2021 I-Codes with Massachusetts amendments",
    energy:
      "10th edition 780 CMR energy provisions, incorporating the 2021 IECC with Massachusetts amendments; Boston is a Specialized Energy Code community",
    amendments:
      "Boston enforces the statewide 10th-edition code rather than a separate municipal building code; 780 CMR 34 supplies the existing-building provisions. Its Specialized Energy Code adoption and BERDO 2.0 emissions rules are separate but consequential overlays for new construction, major renovation, and covered existing buildings.",
  },
  utilities: {
    electric: "Eversource Energy delivers electricity in Boston; National Grid supplies natural gas",
    notes:
      "Eversource coordinates new electric service and distributed-generation interconnection, while the Boston Water and Sewer Commission provides local water, sewer, and storm-drain service. Electrical-service capacity, gas policy, and street-opening coordination should be resolved early in dense downtown and neighborhood retrofit work.",
  },
  climateNotes:
    "Boston is in IECC/ASHRAE climate zone 5A (cool-humid): cold, snowy winters and humid summers put heating, freeze protection, air sealing, and moisture control at the center of envelope and MEP design. Coastal and low-lying parcels also need current FEMA flood mapping, sea-level-rise resilience, and storm-surge exposure evaluated.",
  marketNotes:
    "Boston's work is concentrated in life sciences, academic and hospital campuses, multifamily housing, and conversion or modernization of older commercial buildings. The city’s aging masonry, brownstone, and warehouse stock makes occupied renovation, utility upgrades, and existing-building-code analysis recurring engineering work, while BERDO 2.0 increases the importance of operational carbon planning for covered buildings.",
  narratives: {
    mep:
      "Boston MEP packages have to reconcile a 5A winter heating and freeze-protection load with humid-summer ventilation and dehumidification, often inside constrained occupied buildings. We coordinate electrical service and distributed-generation questions with Eversource, water and sewer interfaces with Boston Water and Sewer Commission, and the 10th-edition energy documentation with the Specialized Energy Code. For BERDO-covered buildings, electrification and plant-replacement decisions should be tested against the building’s operational-emissions obligations rather than treated as an isolated equipment swap.",
    structural:
      "Boston structural work is frequently existing-building work: masonry bearing walls, timber, steel, and historic fabric require field verification before new rooftop equipment, lab exhaust, transfer framing, or change-of-use loads are assumed. ISD reviews under 780 CMR, including its existing-building provisions, while dense parcels demand a deliberate approach to underpinning, excavation support, adjacent foundations, and special inspections. Snow and wind loads, frost effects, and coastal flood exposure can govern additions and waterfront work even where seismic demand is comparatively modest.",
    civil:
      "Boston civil design starts with a very urban drainage and access problem. Boston Water and Sewer Commission service, site-drainage, and stormwater requirements must fit within tight rights-of-way and utility congestion, while waterfront and low-lying sites require FEMA flood-zone and coastal-resilience review. We coordinate utility connections, grading, detention or water-quality measures, and construction access early; on regulated waterfront work, state Chapter 91 and wetlands approvals may be as material to the site plan as the ISD permit.",
    energy:
      "Energy compliance in Boston is not simply a generic 2021 IECC exercise: the 10th-edition Massachusetts code is supplemented by Boston’s Specialized Energy Code status, and BERDO 2.0 affects covered buildings after occupancy. In a cold-humid climate, continuous insulation, thermal-bridge control, air sealing, high-efficiency heating, and humidity-safe enclosure detailing need to work together. We assemble envelope, lighting, and mechanical compliance around the Massachusetts path while identifying when a renovation must also plan for measured building emissions.",
  },
  faqs: [
    {
      q: "Which building code does Boston ISD use for commercial permits?",
      a: "Boston ISD enforces the statewide 10th edition Massachusetts State Building Code, 780 CMR, which incorporates the 2021 I-Codes with Massachusetts amendments. Existing buildings are not evaluated as if they were new construction in every respect: 780 CMR 34 provides the Massachusetts existing-building provisions that are important for renovation and change-of-use scopes.",
    },
    {
      q: "Does Boston's Specialized Energy Code replace BERDO 2.0?",
      a: "No. The Specialized Energy Code is a design-and-permit code overlay adopted by the city, while BERDO 2.0 is Boston’s building-emissions performance ordinance for covered existing and new buildings. A project can need energy-code documentation at permit and, depending on building size and use, a longer-term BERDO compliance strategy after it is in service.",
    },
    {
      q: "What makes Boston waterfront and retrofit projects different?",
      a: "Low-lying and waterfront parcels can be subject to FEMA flood requirements, storm-surge and sea-level-rise resilience analysis, and potentially state wetlands or Chapter 91 review. Elsewhere, the dominant constraint is often the existing building: hidden conditions in historic masonry or timber construction, tight utility corridors, occupied tenants, and excavation beside neighboring foundations must be addressed before a conventional new-build solution is assumed.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 94, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.boston.gov/departments/inspectional-services"],
      codes: ["https://www.mass.gov/info-details/building-code"],
      amendments: ["https://www.boston.gov/departments/environment/berdo"],
      utilities: ["https://www.eversource.com/content/residential", "https://www.bwsc.org/"],
      climate: ["https://www.fema.gov/flood-maps"],
      market: ["https://www.mass.gov/orgs/massachusetts-life-sciences-center"]
    }
  },
};