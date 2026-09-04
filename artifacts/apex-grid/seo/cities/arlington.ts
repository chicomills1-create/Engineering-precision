import type { CityData } from "../types";

export const arlington: CityData = {
  slug: "arlington",
  name: "Arlington",
  stateSlug: "texas",
  county: "Tarrant County",
  ahj: {
    office: "City of Arlington Community Development and Planning Department — Building Inspections",
    process:
      "Arlington Building Inspections administers commercial permits, plan review, and inspections through the city's online permitting system. Commercial projects may require coordinated zoning, engineering, fire, and public-works review; the city offers predevelopment and development-review resources, so site constraints and utility needs should be resolved before a permit set is submitted.",
  },
  codes: {
    building: "2021 International Building Code, adopted by the City of Arlington with local amendments",
    energy: "2021 International Energy Conservation Code commercial provisions, the Texas statewide minimum energy code",
    amendments:
      "Arlington adopts and amends its construction codes locally, including the building, fire, mechanical, plumbing, and electrical packages. Its amendments and administrative process are not interchangeable with Fort Worth or Dallas requirements, even though all are in the same metro area.",
  },
  utilities: {
    electric: "Oncor Electric Delivery provides regulated electric delivery service; Arlington is in ERCOT's competitive retail market",
    notes:
      "A commercial customer selects a retail electric provider, while Oncor handles the wires, meter, new service, and interconnection. City of Arlington Water Utilities provides water and sanitary sewer service in its service area; confirm fire-flow, pressure, and extension requirements for the parcel.",
  },
  climateNotes:
    "Arlington is warm-humid climate zone 3A, with long hot cooling seasons, severe thunderstorms, hail, tornado and straight-line-wind exposure, and periodic hard freezes. Blackland Prairie and Grand Prairie soils can be expansive, and flash-flood/drainage design is important in the Trinity River basin.",
  marketNotes:
    "Arlington's construction economy is distinctively anchored by entertainment and sports venues, the University of Texas at Arlington, healthcare, automotive/advanced manufacturing, and infill hospitality, retail, and multifamily work between Dallas and Fort Worth. DFW industrial and logistics demand also reaches the city's highway-connected sites.",
  narratives: {
    mep:
      "Arlington MEP design is for a hot, humid 3A summer with storm-driven outages and occasional severe freezes—not just a nominal North Texas cooling load. Right-sized cooling, latent-load control, protected exterior piping, and tested freeze protection are central, especially in hotel, venue, and healthcare work. The city's locally amended 2021 code package controls permit review. Electrically, Oncor, rather than the chosen retail provider, must validate fault duty, service configuration, meter placement, and transformer timing, while Arlington Water Utilities confirms domestic, fire, and sewer capacity.",
    structural:
      "Arlington structures must handle North Texas wind and hail exposure as well as variable expansive soils. The foundation solution follows the site geotechnical report and commonly needs moisture-management detailing, post-tensioned slabs, drilled piers, or stiffened grade beams where shrink-swell movement is material. Tornadic winds are not a conventional code design load, but severe thunderstorm wind, roof uplift, façade attachment, and rooftop equipment anchorage deserve disciplined detailing. The 2021 IBC is locally amended and special inspections are administered through Arlington's process.",
    civil:
      "Arlington civil work combines dense urban infill with fast storm runoff. Grading, detention, public-drainage connections, and floodplain constraints must follow City of Arlington engineering and stormwater requirements; on-site features should be reserved before parking and building footprints consume the site. Expansive soils affect pavement and utility trench detailing, while City Water Utilities review water, wastewater, and fire-flow capacity. For disturbed sites of one acre or more, the Texas construction general permit requires SWPPP coverage in addition to city approvals.",
    energy:
      "Arlington applies the commercial 2021 IECC, Texas's statewide minimum energy code, alongside its local construction-code amendments. In warm-humid 3A, low-SHGC glazing, airtightness, efficient cooling with appropriate latent control, and lighting controls generally carry more value than prescriptive insulation alone. We coordinate the envelope, HVAC, and lighting compliance documents with the Arlington permit package, then review electric demand characteristics with Oncor early because the wire utility governs the physical service even in a competitive ERCOT market.",
  },
  faqs: [
    {
      q: "What building code does Arlington, Texas use?",
      a: "Arlington enforces a locally amended 2021 International Building Code package, with the 2021 IECC commercial provisions as its energy-code baseline. Fort Worth and Dallas have their own ordinances and amendments, so their permit sets should not be assumed to apply in Arlington.",
    },
    {
      q: "Who handles electric service for an Arlington commercial building?",
      a: "Oncor Electric Delivery handles the wires, meter, new service, and interconnection. Arlington is in ERCOT's competitive retail market, so the owner separately chooses the retail energy provider; capacity and transformer coordination still belong with Oncor.",
    },
    {
      q: "How do Arlington soils affect commercial foundations?",
      a: "Expansive North Texas soils can cause seasonal shrink-swell movement. A project geotechnical report determines the solution, which may include a post-tensioned slab, drilled piers, grade beams, void forms, and drainage/moisture-control detailing.",
    },
  ],
};