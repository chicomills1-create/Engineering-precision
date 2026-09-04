import type { CityData } from "../types";

export const newark: CityData = {
  slug: "newark",
  name: "Newark",
  stateSlug: "new-jersey",
  county: "Essex County",
  ahj: {
    office: "City of Newark Department of Engineering, Division of Inspections and Enforcement",
    process:
      "Newark administers local permit intake and inspections under the New Jersey Uniform Construction Code, using its online Citizen Self Service tools for permit activity. Building work can also need Zoning, Planning Board, Historic Preservation, Fire, Engineering, and utility coordination; applicants should establish land-use and site approvals before relying on a building-permit-only schedule.",
  },
  codes: {
    building: "New Jersey Uniform Construction Code, using the 2021 IBC-based building subcode as adopted by the State, administered by Newark",
    energy: "New Jersey Uniform Construction Code energy subcode based on the 2021 International Energy Conservation Code, commercial provisions",
    amendments:
      "Newark administers the statewide Uniform Construction Code rather than a separate citywide building-code edition. Local zoning, site-plan, flood-hazard, historic-district, and public-right-of-way requirements can add approvals, while State UCC amendments and the locally adopted administrative process govern construction-code review.",
  },
  utilities: {
    electric: "Public Service Electric and Gas Company (PSE&G) provides electric and gas service; the City of Newark Department of Water and Sewer Utilities provides water and sewer service",
    notes:
      "PSE&G coordinates electric/gas service applications, capacity, metering, and distributed-generation interconnection. Newark Water and Sewer Utilities must be engaged for new, enlarged, or altered water and sewer connections; dense urban utility conflicts and combined-sewer conditions make early utility investigation important.",
  },
  climateNotes:
    "Newark is in mixed-humid climate zone 4A, with winter heating, summer humidity, freeze-thaw exposure, heavy rainfall, and urban heat-island effects. Low-lying areas near the Passaic River and Newark Bay need FEMA flood and storm-surge screening, while former industrial sites can require environmental due diligence.",
  marketNotes:
    "Newark's market is shaped by Newark Liberty International Airport, Port Newark–Elizabeth logistics, rail and highway access, healthcare, universities, multifamily, and redevelopment of former industrial parcels. Dense urban infill and adaptive reuse combine constrained staging, aging utilities, environmental investigation, and flood-resilience questions with high-demand logistics and institutional programs.",
  narratives: {
    mep:
      "Newark MEP design works through the State UCC energy subcode in a 4A climate that requires credible winter heating, summer latent control, and freeze protection. Existing-building and urban-infill projects need verified utility rooms, risers, steam or gas conditions where present, and realistic electrical capacity—not generic tenant-fit-out assumptions. PSE&G handles electric and gas service and interconnection, while Newark's municipal water and sewer utility controls connections; coordinating those separate paths early is especially important for electrification, medical, warehouse, and multifamily loads.",
    structural:
      "Newark structural design follows the New Jersey Uniform Construction Code and should begin with verified existing conditions on the City's large stock of industrial, masonry, and adaptive-reuse buildings. Winter weather, wind, snow, and seismic provisions all apply, but foundation uncertainty, contaminated fill, groundwater, and flood exposure can be equally decisive on former industrial or waterfront parcels. Additions, roof equipment, change-of-use loads, and façade interventions need an explicit existing-structure assessment, with special inspections and construction sequencing coordinated through the local permit process.",
    civil:
      "Newark civil engineering must fit drainage, water and sewer work, fire access, and construction staging into constrained urban blocks served by aging and crowded infrastructure. We screen Passaic River and Newark Bay flood exposure, FEMA mapping, and site environmental history before committing to below-grade space or finished-floor elevations, then coordinate connection capacity with Newark Water and Sewer Utilities. Site-plan, zoning, streets, and utility approvals may move on different tracks, so stormwater controls and off-site work should be coordinated with City Engineering early.",
    energy:
      "Newark energy compliance uses New Jersey's UCC energy subcode based on the 2021 IECC commercial provisions. In the mixed-humid climate, enclosure continuity, thermal-bridge control, air sealing, efficient heating and cooling, and humidity management need to be evaluated together, particularly in masonry retrofit work. PSE&G service capacity and the building's actual operating loads guide electrification and solar decisions; permit energy compliance should be documented separately from any longer-term emissions or resilience goals the owner may set.",
  },
  faqs: [
    {
      q: "What building code applies in Newark?",
      a: "Newark administers New Jersey's statewide Uniform Construction Code, including the State's 2021 IBC-based building subcode and 2021 IECC-based commercial energy subcode. City zoning, site-plan, flood, historic, and right-of-way approvals can add requirements beyond UCC plan review.",
    },
    {
      q: "Who handles building permits in Newark?",
      a: "The City of Newark Department of Engineering, Division of Inspections and Enforcement administers local construction permits and inspections under the UCC. Depending on the project, Zoning, Planning, Fire, Engineering, Historic Preservation, and utilities may also have review roles.",
    },
    {
      q: "Which utilities serve Newark commercial buildings?",
      a: "PSE&G provides electric and gas service. The City of Newark Department of Water and Sewer Utilities provides municipal water and sewer service, and both utility paths should be checked early for an upgrade, redevelopment, or high-load project.",
    },
  ],
};