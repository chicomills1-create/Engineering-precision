import type { CityData } from "../types";

export const wichita: CityData = {
  slug: "wichita",
  name: "Wichita",
  stateSlug: "kansas",
  county: "Sedgwick County",
  ahj: {
    office: "City of Wichita Metropolitan Area Building and Construction Department",
    process:
      "Wichita accepts permit applications and plan-review materials through its online permit services and coordinates building review with planning, fire, public works, and utilities when applicable. Commercial development can require separate zoning, site-plan, access, and utility approvals, so the building permit package should be coordinated with the applicable City review path.",
  },
  codes: {
    building: "Wichita/Sedgwick County 2018 International Building Code with locally adopted amendments",
    energy: "2018 International Energy Conservation Code with Wichita/Sedgwick County amendments",
    amendments:
      "Kansas does not impose one statewide commercial building-code edition; the City of Wichita and Sedgwick County adoption and amendment package controls within their respective jurisdictions. City zoning, fire, floodplain, access, and stormwater requirements are separate from the I-Code permit review and remain parcel- and scope-specific.",
  },
  utilities: {
    electric: "Evergy Kansas Central provides electric service; the City of Wichita provides water and sewer service",
    notes:
      "Evergy should be engaged for new service, generation interconnection, and significant aviation, manufacturing, refrigeration, or data loads. Wichita's Public Works & Utilities requirements govern municipal water and sanitary-sewer connections; Kansas Gas Service is the natural-gas utility in Wichita.",
  },
  climateNotes:
    "Wichita is in mixed-humid climate zone 4A, with hot, humid summers, winter freeze-thaw, severe thunderstorms, hail, and tornado exposure. Wind-resilient roof and cladding detailing, drainage for intense rain, and site-specific expansive-clay or alluvial-soil investigation are recurring design concerns.",
  marketNotes:
    "Wichita is a major U.S. aerospace-manufacturing center, led by aircraft production, maintenance, and its supplier network, with related advanced manufacturing and defense work. The regional economy also supports healthcare, education, food processing, logistics, and redevelopment, creating demand for both production facilities and complex renovations.",
  narratives: {
    mep:
      "Wichita MEP design has to cover hot, humid cooling conditions, winter heating and freeze protection, and severe-weather resilience rather than optimizing for a single season. Aerospace production, hangar, machining, and food-processing programs can bring concentrated process, ventilation, compressed-air, and electrical loads; Evergy Kansas Central capacity and service routing therefore belong in early load planning. The locally adopted 2018 IECC supplies the commercial baseline, while City water and sewer connections shape process-water, fire-service, and sanitary decisions. Generator, fuel, and controls strategies should reflect the owner’s actual continuity needs rather than an assumed office profile.",
    structural:
      "Wichita's low seismicity does not eliminate structural risk: wind, tornado-related uplift, hail exposure, snow, drift, and gravity loads frequently govern roofs and exterior assemblies. Long-span hangars, manufacturing bays, and warehouse roofs need a continuous load path from roof deck and equipment curbs through diaphragms, frames, and foundations. Sedgwick County soils can include expansive clays, alluvium, and variable fill, so the geotechnical report should set bearing, slab, pavement, and drainage recommendations. The Wichita/Sedgwick County 2018 IBC amendment package is the local code basis, with special inspections coordinated into the permit record.",
    civil:
      "Wichita civil design starts with the City’s drainage, utility, and access requirements and the site’s relation to the Arkansas River and local tributary floodplains. Intense thunderstorms make positive grading, inlet capacity, conveyance, and detention/water-quality measures early land-planning decisions, not a final civil overlay. City water and sewer connections, public-street work, and easements are coordinated with Public Works & Utilities, while Kansas construction-stormwater permit coverage and a SWPPP apply to qualifying disturbance. On industrial and aviation sites, truck circulation, aircraft-side constraints, and expansive soils can further limit the land available for drainage infrastructure.",
    energy:
      "Commercial energy compliance in Wichita is prepared to the locally adopted 2018 IECC and amendments, not a presumed statewide Kansas commercial code. Mixed-humid 4A design rewards a balanced envelope, air sealing, solar control, efficient cooling, humidity control, and dependable winter heating; controls need to reflect shift-based manufacturing or hangar schedules when those are present. We align lighting, mechanical, and envelope documentation with the City permit path and test major electrification or process-load choices against Evergy service conditions. That avoids treating energy compliance as disconnected from the reliability and ventilation needs of Wichita industrial facilities.",
  },
  faqs: [
    {
      q: "Which commercial codes apply in Wichita?",
      a: "Wichita and Sedgwick County enforce locally adopted 2018 I-Codes, including the 2018 IBC and 2018 IECC, with local amendments. Kansas has no single statewide commercial code, so the exact city or county jurisdiction and amendment package must be verified for the project address.",
    },
    {
      q: "Who provides electric, water, and sewer service in Wichita?",
      a: "Evergy Kansas Central provides electricity, while the City of Wichita provides municipal water and sewer service. Major new loads, distributed generation, and new utility connections need early utility coordination; Kansas Gas Service supplies natural gas in Wichita.",
    },
    {
      q: "What hazards drive Wichita building and site design?",
      a: "Severe thunderstorms, hail, tornado exposure, intense rainfall, freeze-thaw, and variable clay or alluvial soils are common inputs. Wind load paths, roof and equipment anchorage, drainage, floodplain screening, and geotechnical recommendations should be resolved before a site plan is fixed.",
    },
  ],
};