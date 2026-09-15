import type { CityData } from "../types";

export const newark: CityData = {
  slug: "newark",
  name: "Newark",
  stateSlug: "new-jersey",
  county: "Essex County",
  ahj: {
    office:
      "City of Newark Department of Engineering, Division of Inspections and Enforcement",
    process:
      "Newark's Division of Inspections and Enforcement administers construction permits and inspections, with applications and project records handled through the City's permitting process. Commercial work may also require zoning, planning-board, historic-preservation, fire, health, water/sewer, and public-right-of-way review; a complete approval strategy identifies those City tracks with the building submission.",
  },
  codes: {
    building:
      "New Jersey Uniform Construction Code (N.J.A.C. 5:23), using the 2021 I-Codes with New Jersey amendments",
    energy:
      "New Jersey Uniform Construction Code energy subcode based on the 2021 IECC; ASHRAE 90.1-2019 is an alternate commercial compliance path",
    amendments:
      "Newark enforces the statewide Uniform Construction Code rather than a separate City building-code edition. Local zoning, land-development, historic-preservation, fire, water/sewer, and right-of-way requirements remain consequential amendments to the practical permit path, particularly in dense redevelopment areas.",
  },
  utilities: {
    electric: "Public Service Electric and Gas Company (PSE&G) provides electric distribution service",
    notes:
      "PSE&G should review new electric service, service upgrades, and distributed-generation interconnection early for high-load, transit-oriented, or electrified projects. Newark's Department of Water and Sewer Utilities administers municipal water and sewer service; regional wastewater treatment and combined-sewer conditions add coordination needs.",
  },
  climateNotes:
    "Newark is in ASHRAE climate zone 4A, with humid summers, winter freeze-thaw, intense rainfall, and tidal/riverine flood exposure along the Passaic River and Newark Bay watershed. Low-lying fill, high groundwater, soft alluvial deposits, legacy industrial conditions, and combined sewers make geotechnical and drainage investigation important on redevelopment sites.",
  marketNotes:
    "Newark's active sectors include airport and port-related logistics, warehousing, multifamily and mixed-use redevelopment, healthcare and education, transit-oriented development, and industrial modernization. Newark Liberty International Airport, Port Newark/Elizabeth's regional freight ecosystem, and the city's extensive older building stock create projects with demanding utility, environmental, staging, and resilience constraints.",
  narratives: {
    mep:
      "Newark MEP design begins with humid-zone-4A moisture control, winter freeze protection, and the realities of dense existing infrastructure. The New Jersey Uniform Construction Code's energy subcode is based on the 2021 IECC, with ASHRAE 90.1-2019 available as an alternate commercial path, but a code form does not resolve airport-adjacent, logistics, or adaptive-reuse electrical needs. PSE&G service capacity, metering, and interconnection are early design inputs for electrified HVAC, cold storage, manufacturing, and resilient power systems. Water and sewer routing must also advance with Newark's utility review, particularly where old services, combined sewers, or limited equipment-room space make late changes costly.",
    structural:
      "Newark structural design is shaped by site conditions, flood resilience, wind, snow, and existing construction more often than by high seismic demand, though the code-required seismic classification remains project-specific. Passaic River and Newark Bay flood screening, alluvial soils, fill, groundwater, and remnants of industrial structures can govern foundation, slab, shoring, and elevation decisions. The statewide 2021-I-Code-based Uniform Construction Code supplies the structural basis; close urban sites add adjacent foundations, party walls, railroad or utility constraints, and staged demolition. Freeze-thaw and wind-driven rain influence façade durability, while rooftop equipment and solar additions require a verified existing roof load path.",
    civil:
      "Civil engineering in Newark works at the intersection of City water/sewer approval, combined-sewer infrastructure, New Jersey stormwater rules, and a constrained urban watershed. New Jersey's Stormwater Management rules and construction-stormwater requirements apply where their thresholds are met, while tidal backwater, intense rainfall, low relief, groundwater, and contaminated or filled land can limit conventional infiltration and gravity drainage. We establish flood elevations, utility ownership, sewer capacity, outfall conditions, and public-right-of-way needs before locking a site plan. For port- and airport-influenced redevelopment, utility conflicts, truck circulation, environmental due diligence, and resilient grading deserve equal attention.",
    energy:
      "Newark commercial energy documentation follows the New Jersey Uniform Construction Code energy subcode based on the 2021 IECC, or ASHRAE 90.1-2019 where that path better fits the building. In mixed-humid zone 4A, continuous insulation, air-barrier continuity, moisture-managed wall and roof assemblies, solar-control glazing, efficient lighting, and humidity-capable outside-air systems are practical performance measures. For warehouses, multifamily buildings, and conversions, energy modeling can reconcile envelope choices with real ventilation, domestic-hot-water, process, and electrification loads. We coordinate those decisions with PSE&G service strategy so the energy design is both permit-ready and operationally feasible.",
  },
  faqs: [
    {
      q: "Who issues commercial building permits in Newark?",
      a: "Newark's Department of Engineering, Division of Inspections and Enforcement administers construction permits and inspections. Depending on the property and scope, zoning, planning, fire, historic-preservation, water/sewer, health, and right-of-way approvals may also be needed.",
    },
    {
      q: "What building and energy codes apply to Newark commercial work?",
      a: "Newark enforces New Jersey's statewide Uniform Construction Code, which uses the 2021 I-Codes with New Jersey amendments. The commercial energy subcode is based on the 2021 IECC, and ASHRAE 90.1-2019 is an alternate compliance path.",
    },
    {
      q: "Why should flood, sewer, and utility capacity be screened early in Newark?",
      a: "Passaic River and Newark Bay watershed flooding, combined-sewer conditions, intense rain, groundwater, fill, and old utilities can change drainage and foundation options. PSE&G service planning and Newark water/sewer coordination should proceed before the building and site layouts are finalized.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 87, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.newarknj.gov/departments/engineering"],
      codes: ["https://www.nj.gov/dca/codes/codreg/"],
      amendments: ["https://www.newarknj.gov/257/Division-of-Planning-Zoning"],
      utilities: ["https://www.pseg.com/", "https://water.newarknj.gov/about"],
      climate: ["https://www.fema.gov/flood-maps"],
      market: ["https://www.newarknj.gov/172/Economic-Housing-Development"]
    }
  },
};