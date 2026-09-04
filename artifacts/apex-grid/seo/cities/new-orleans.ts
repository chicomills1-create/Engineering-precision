import type { CityData } from "../types";

export const newOrleans: CityData = {
  slug: "new-orleans",
  name: "New Orleans",
  stateSlug: "louisiana",
  county: "Orleans Parish",
  ahj: {
    office: "City of New Orleans Department of Safety and Permits",
    process:
      "Safety and Permits administers building permits and plan review through the City's One Stop for Permits and Licenses and routes applications to other City reviewers as the scope requires. Zoning, Historic District Landmarks Commission, fire, public works, sewerage and water, and coastal/flood requirements can run alongside the building permit, so entitlement and permit scopes must be sequenced together.",
  },
  codes: {
    building: "Louisiana State Uniform Construction Code: 2021 International Building Code with Louisiana amendments, enforced by New Orleans",
    energy: "Louisiana State Uniform Construction Code commercial energy provisions: 2021 International Energy Conservation Code with Louisiana amendments",
    amendments:
      "New Orleans enforces the statewide Louisiana State Uniform Construction Code and its state amendments, along with City code requirements. The Comprehensive Zoning Ordinance, historic-district rules, flood-damage-prevention requirements, and local drainage and utility approvals can add substantial project-specific obligations.",
  },
  utilities: {
    electric: "Entergy New Orleans provides electric and natural-gas service; the Sewerage & Water Board of New Orleans provides water, sewerage, and drainage services",
    notes:
      "Entergy New Orleans handles new electric service and distributed-energy interconnection; large hospitality, healthcare, port, and resilience loads warrant early capacity and service-location discussions. Sewerage & Water Board water, sewer, and drainage infrastructure is a parallel site-design constraint, particularly on low-elevation and redevelopment parcels.",
  },
  climateNotes:
    "New Orleans is hot-humid (ASHRAE 2A), with long cooling and dehumidification seasons, heavy rainfall, hurricane wind exposure, and extreme heat. Much of the city is low lying and protected by a drainage and levee system, making flood elevation, subsidence, groundwater, and corrosion central design inputs.",
  marketNotes:
    "New Orleans supports port and maritime activity, tourism and hospitality, healthcare, higher education, cultural institutions, and energy-related operations. Hotel renovation, medical and university work, industrial waterfront facilities, and neighborhood redevelopment commonly require adaptation to historic fabric, low elevations, and aging infrastructure.",
  narratives: {
    mep:
      "New Orleans MEP design prioritizes humidity control, latent capacity, corrosion resistance, and storm resilience in a 2A hot-humid climate. Hotels, hospitals, kitchens, port facilities, and historic renovations need ventilation and domestic-hot-water strategies matched to actual operations, not a generic warm-climate template. Entergy New Orleans service and resilience assumptions are developed early for major electrical loads, while Sewerage & Water Board connections shape water, sewer, and drainage coordination. The 2021 IECC-based Louisiana energy provisions establish the compliance baseline, but moisture-safe enclosure and controls remain just as important to dependable performance.",
    structural:
      "New Orleans structural design pairs hurricane wind and flood exposure with soft alluvial soils, high groundwater, settlement, and subsidence considerations. Foundation selection, pile behavior where needed, finished-floor elevations, and the load path for roofs, cladding, and rooftop equipment should follow the geotechnical, flood, and wind criteria for the exact parcel. Existing historic buildings require careful evaluation of masonry, wood framing, diaphragms, and connections before alteration or added equipment. The 2021 IBC-based Louisiana code path is supplemented by City floodplain and historic-district review where applicable.",
    civil:
      "Civil engineering in New Orleans is organized around drainage in a low-elevation, pumped system rather than assuming gravity discharge is readily available. We screen FEMA flood information, finished-floor constraints, existing grades, subsurface conditions, and drainage outfalls before committing the site plan, then coordinate water, sewerage, and drainage with the Sewerage & Water Board. Heavy rainfall, high groundwater, and limited relief can shape detention, paving, utility elevations, and construction sequencing. Public-right-of-way, zoning, and historic-district constraints are coordinated with the City's permit path, while Louisiana construction-stormwater coverage applies to qualifying disturbance.",
    energy:
      "New Orleans commercial energy compliance follows Louisiana's 2021 IECC-based provisions and amendments, with the City’s permit and local requirements checked for the site. In hot-humid 2A, exterior shading, low-solar-gain glazing, a continuous air barrier, efficient cooling, dedicated dehumidification, and carefully commissioned controls reduce moisture risk as well as energy use. We model occupancy, kitchen, hospitality, healthcare, and process loads as they will operate, then coordinate solar, storage, and generator choices with Entergy New Orleans. A resilient energy strategy also needs flood elevation and equipment-location decisions made with civil and structural teams.",
  },
  faqs: [
    {
      q: "Who issues commercial building permits in New Orleans?",
      a: "The City of New Orleans Department of Safety and Permits administers permits and plan review through One Stop for Permits and Licenses. Zoning, fire, historic-district, public works, and Sewerage & Water Board review may also apply depending on the project.",
    },
    {
      q: "Which codes apply to commercial work in New Orleans?",
      a: "New Orleans enforces Louisiana's State Uniform Construction Code, including the 2021 IBC and 2021 IECC with Louisiana amendments. City zoning, flood-damage-prevention, historic-district, drainage, and utility requirements are additional project-specific approvals.",
    },
    {
      q: "What drives flood and drainage design in New Orleans?",
      a: "Low elevations, high groundwater, intense rainfall, subsidence, FEMA flood mapping, and the City's pumped drainage system make parcel-specific flood and drainage analysis essential. Finished floors, utility elevations, foundation approach, paving, and critical-equipment locations should be coordinated early.",
    },
  ],
};