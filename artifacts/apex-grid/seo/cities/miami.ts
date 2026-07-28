import type { CityData } from "../types";

export const miami: CityData = {
  slug: "miami",
  name: "Miami",
  stateSlug: "florida",
  county: "Miami-Dade County",
  ahj: {
    office: "City of Miami Building Department (within Miami-Dade County's High-Velocity Hurricane Zone)",
    process:
      "Commercial plan review runs through the City of Miami's iBuild online permitting portal, with electronic submittal and review across building, structural, mechanical, electrical, plumbing, and zoning disciplines. Because Miami sits in the High-Velocity Hurricane Zone, submittals must reference Miami-Dade County Product Control Notices of Acceptance (NOAs) for windborne-debris and roofing assemblies, and reviewers scrutinize wind and flood detailing closely. Private provider review is available to accelerate schedules on qualifying projects.",
  },
  codes: {
    building:
      "Florida Building Code, 8th Edition (2023), based on the 2021 IBC, with the High-Velocity Hurricane Zone (HVHZ) provisions mandatory in Miami-Dade County",
    energy:
      "Florida Building Code — Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 as an alternate commercial path",
    amendments:
      "The HVHZ chapter is the defining local layer: it requires enhanced wind-pressure design, mandatory windborne-debris (impact) protection or NOA-approved shutters on all openings, and Miami-Dade Product Control approval (NOA) for exterior components and roofing. The city and county also enforce strict flood-zone (FEMA/base-flood-elevation) and 40-year recertification requirements that shape existing-building work.",
  },
  utilities: {
    electric:
      "Florida Power & Light (FPL) serves the City of Miami and virtually all of Miami-Dade County",
    notes:
      "FPL commercial rates carry demand charges, and new large services in the dense urban core can require vault or network coordination and transformer lead times we confirm early. Electrical rooms and emergency/standby equipment are commonly designed above base flood elevation for surge resilience. Water and sewer are provided by Miami-Dade Water and Sewer Department (WASD), whose capacity and connection fees factor into site feasibility.",
  },
  climateNotes:
    "Miami sits in ASHRAE climate zone 1A — the hottest, most humid U.S. mainland zone — with dominant year-round latent cooling load, intense solar gain, corrosive coastal salt exposure, and hurricane and storm-surge risk that governs nearly every design decision.",
  marketNotes:
    "Miami is one of the nation's most active markets, driven by relentless in-migration, a finance-and-tech influx into Brickell and downtown, luxury high-rise residential and hospitality, and cruise-and-logistics activity at PortMiami. Sea-level-rise resilience, flood insurance pressures, and the county's 40-year recertification program shape both new construction and a large existing-building retrofit pipeline.",
  narratives: {
    mep:
      "MEP design in Miami is a moisture and resilience discipline before anything else. In climate zone 1A — the hottest, most humid mainland zone — latent load dominates year-round, so we lead with dehumidification, tight building pressurization, and vapor-aware envelope coordination because mold and corrosion are life-of-building failure modes, not edge cases. Coastal salt air drives corrosion-resistant equipment selection. Hurricane resilience shapes the electrical scope: standby power and electrical rooms are commonly elevated above FEMA base flood elevation, and equipment is protected from surge and wind, all consistent with the High-Velocity Hurricane Zone rules the City of Miami enforces. FPL serves the city with demand-charge rates and dense-core service constraints we confirm at schematic design, and our HVAC, lighting, and plumbing documentation targets the Florida energy code edition through the iBuild portal.",
    structural:
      "Miami structural design is defined almost entirely by wind, because the city falls within Miami-Dade County's High-Velocity Hurricane Zone — the nation's most stringent wind regime — while seismic is negligible (SDC A) and snow is zero. Ultimate design wind speeds run 170+ mph, and the FBC-HVHZ chapter mandates enhanced wind-pressure design, windborne-debris (impact) protection on all openings, continuous load paths, and Miami-Dade Product Control NOAs for exterior components and roofing. We detail roof uplift, cladding attachment, and connection continuity to survive design-level storms, and we set the structural datum by FEMA base flood elevation plus freeboard because surge is inseparable from wind. High water tables and limestone bearing conditions drive foundation choices, and the county's 40-year recertification program adds a steady structural-assessment workload on existing buildings.",
    civil:
      "Civil and site engineering in Miami is governed by water on flat, near-sea-level ground with a high water table sitting over porous limestone. Stormwater is often managed through exfiltration trenches, drainage wells, and detention permitted through the South Florida Water Management District (SFWMD) alongside City of Miami and Miami-Dade review — a regional permitting layer unique to Florida. We design grading and drainage to district and local criteria, integrate FEMA base-flood-elevation and freeboard requirements, and account for limited gravity conveyance and rising groundwater linked to sea-level rise. Sites disturbing an acre or more require FDEP NPDES construction stormwater coverage and a SWPPP. Coordination with Miami-Dade WASD for water and sewer capacity and the county's saltwater-intrusion and drainage-well rules shapes feasibility early.",
    energy:
      "Miami enforces the Florida Building Code — Energy Conservation, 8th Edition (2023), with ASHRAE 90.1 as an alternate, so COMcheck or whole-building energy-model documentation must target that edition. In the hot-humid zone 1A climate, compliance is about controlling solar heat gain and latent load rather than heating: low-SHGC and impact-rated glazing (which HVHZ already requires), tight air-sealing against humid infiltration, cool roofs under intense sun, and high-efficiency, dehumidification-capable cooling plants are the highest-leverage moves, while added wall insulation returns little. We reconcile envelope, mechanical, and lighting compliance as one package through the iBuild review workflow and always integrate the moisture-control detailing that both the code and the climate demand to prevent mold and envelope failure.",
  },
  faqs: [
    {
      q: "What building code applies to a City of Miami project?",
      a: "Miami enforces the Florida Building Code, 8th Edition (2023), based on the 2021 IBC, with the High-Velocity Hurricane Zone (HVHZ) provisions mandatory because the city is in Miami-Dade County. That means enhanced wind design, windborne-debris protection on all openings, and Miami-Dade Product Control NOAs for exterior components and roofing — among the most rigorous wind requirements in the nation.",
    },
    {
      q: "How does plan review work with the City of Miami Building Department?",
      a: "Commercial submittals go through the city's iBuild online portal for electronic review across building, structural, MEP, and zoning disciplines, with close scrutiny of HVHZ wind and FEMA flood detailing and required NOAs. Private provider review is available on qualifying projects to compress the schedule, which is common in Miami's high-volume market.",
    },
    {
      q: "How does flood and hurricane risk affect Miami site and building design?",
      a: "Heavily. Structural design targets 170+ mph HVHZ wind with impact protection and NOA-approved assemblies, and the structural and electrical datum is set to FEMA base flood elevation plus freeboard because surge is inseparable from wind. On the civil side, a high water table over limestone drives exfiltration and drainage-well systems permitted through SFWMD, and rising groundwater from sea-level rise increasingly shapes grading and drainage.",
    },
  ],
};
