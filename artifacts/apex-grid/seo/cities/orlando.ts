import type { CityData } from "../types";

export const orlando: CityData = {
  slug: "orlando",
  name: "Orlando",
  stateSlug: "florida",
  county: "Orange County",
  ahj: {
    office: "City of Orlando Permitting Services Division (Economic Development Department)",
    process:
      "Commercial plan review runs through the City of Orlando's online Accela Citizen Access / e-permitting system, with electronic submittal and multi-discipline review across building, structural, MEP, zoning, and engineering. Orlando is not in the High-Velocity Hurricane Zone, so it uses standard Florida Building Code wind provisions with Florida Product Approval rather than Miami-Dade NOAs. Private provider (private inspector/plan reviewer) service is available under Florida statute to accelerate qualifying projects, and larger developments run through concurrent development and engineering review.",
  },
  codes: {
    building:
      "Florida Building Code, 8th Edition (2023), based on the 2021 IBC with Florida amendments; standard (non-HVHZ) wind provisions apply",
    energy:
      "Florida Building Code — Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 as an alternate commercial path",
    amendments:
      "As a non-HVHZ jurisdiction, Orlando designs to standard FBC wind pressures with Florida Product Approval for components rather than Miami-Dade NOAs. Local layers that reshape design include City of Orlando and Orange County stormwater and floodplain ordinances, the city's Green Works / building-performance initiatives, and coordination with the regional water management district for master drainage.",
  },
  utilities: {
    electric:
      "Orlando Utilities Commission (OUC — 'The Reliable One'), a municipal utility, serves most of the City of Orlando; Duke Energy Florida serves adjacent portions of the metro",
    notes:
      "OUC is a municipal provider with its own commercial rate schedules, demand charges, and interconnection process, and OUC also provides chilled-water district cooling in parts of downtown that changes central-plant scope. New large services can carry transformer lead times we confirm early. OUC and Orange County Utilities provide water and reclaimed water, and reclaimed-water availability affects irrigation and site design.",
  },
  climateNotes:
    "Orlando sits inland in ASHRAE climate zone 2A — hot-humid with dominant latent cooling load, intense solar gain, and long cooling seasons — with hurricane and heavy-rainfall exposure but no coastal storm surge, and central-Florida karst/sinkhole potential in the surrounding terrain.",
  marketNotes:
    "Orlando's construction market is anchored by tourism and hospitality (theme parks, convention, and resort development around International Drive), strong in-migration and multifamily growth, healthcare and the Lake Nona Medical City / life-science cluster, and expanding logistics and higher-education activity. That pipeline keeps Permitting Services' review queues active, and stormwater/floodplain review often paces site schedules.",
  narratives: {
    mep:
      "MEP design in Orlando is a humidity discipline first: inland climate zone 2A carries dominant latent load through long cooling seasons, so we lead with dehumidification, tight pressurization, and vapor-aware envelope coordination to keep mold and corrosion out of tight envelopes. Hurricane resilience still shapes electrical scope — standby power and protected equipment — even without coastal surge. The serving utility matters early: much of the city is served by the municipal Orlando Utilities Commission, whose commercial demand charges and interconnection process differ from Duke Energy Florida next door, and OUC's downtown district chilled-water service can remove the central plant from a building's scope entirely. Because the Florida Building Code — Energy Conservation is a rigorous statewide code, our HVAC, lighting, and plumbing documentation targets that edition through the city's Accela e-permitting portal, with ASHRAE 90.1 as an alternate.",
    structural:
      "Orlando structural design is wind-driven but under standard Florida Building Code provisions, not the High-Velocity Hurricane Zone — the city is inland in Orange County, so we design to standard FBC wind pressures (roughly 140 mph ultimate) with Florida Product Approval for components rather than Miami-Dade NOAs, and windborne-debris protection is required by wind zone. Seismic is negligible (SDC A) and snow is zero. The defining subsurface variable is central-Florida karst: sinkhole and soft-ground potential over limestone can dictate deep foundations, ground improvement, or careful pond siting, so the geotechnical report governs foundation selection. High water tables further constrain below-grade construction. We reconcile the lateral system to the actual wind zone and let subsurface conditions set the foundations, all under the Florida-amended 2021 IBC basis.",
    civil:
      "Civil and site engineering in Orlando is defined by stormwater on flat, sandy, high-water-table terrain with real karst risk. Stormwater is commonly managed with wet-detention ponds and, where soils allow, exfiltration, permitted through the St. Johns River Water Management District (SJRWMD) or South Florida Water Management District depending on basin, alongside City of Orlando and Orange County review — the regional district layer is unique to Florida. We design grading and drainage to district and local criteria, integrate FEMA base-flood-elevation requirements, and site ponds carefully to avoid concentrating water over potential sinkhole features. Sites over an acre require FDEP NPDES construction stormwater coverage and a SWPPP. Reclaimed-water availability from OUC and Orange County shapes irrigation design, and master-drainage coordination often paces entitlement on large tourism and Lake Nona projects.",
    energy:
      "Orlando enforces the Florida Building Code — Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 as an alternate, so COMcheck or energy-model documentation must target that edition. In the hot-humid zone 2A climate, compliance centers on controlling solar heat gain and latent load rather than heating: low-SHGC glazing, exterior shading, cool roofs under intense sun, and high-efficiency, dehumidification-capable cooling plants are the highest-leverage moves, while added wall insulation returns little. Where OUC district chilled water serves a downtown building, plant efficiency shifts off-site and changes the compliance strategy. We reconcile envelope, mechanical, and lighting compliance as one package through the city's e-permitting workflow and integrate the moisture-control detailing the code and climate both demand.",
  },
  faqs: [
    {
      q: "Is Orlando in Florida's High-Velocity Hurricane Zone?",
      a: "No. Orlando is inland in Orange County, so it uses standard Florida Building Code wind provisions rather than the HVHZ rules that apply only in Miami-Dade and Broward. That means design to standard FBC wind pressures (about 140 mph ultimate) with Florida Product Approval for components instead of Miami-Dade NOAs, plus windborne-debris protection where the wind zone requires it.",
    },
    {
      q: "Which utility will serve my Orlando project?",
      a: "Most of the City of Orlando is served by the Orlando Utilities Commission (OUC), a municipal utility with its own commercial rates, demand charges, and interconnection process, while Duke Energy Florida serves adjacent parts of the metro. OUC also offers district chilled-water cooling in parts of downtown, which can remove the central cooling plant from a building's scope, so we confirm the serving utility during schematic design.",
    },
    {
      q: "How does central-Florida karst affect Orlando site and foundation design?",
      a: "It can be decisive. Sinkhole and soft-ground potential over limestone means the geotechnical report governs foundation selection — sometimes driving deep foundations or ground improvement — and it shapes stormwater pond siting so runoff is not concentrated over potential features. Combined with high water tables, karst is a central reason we coordinate structural and civil design with subsurface findings early.",
    },
  ],
};
