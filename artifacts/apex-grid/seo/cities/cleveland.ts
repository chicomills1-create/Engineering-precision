import type { CityData } from "../types";

export const cleveland: CityData = {
  slug: "cleveland",
  name: "Cleveland",
  stateSlug: "ohio",
  county: "Cuyahoga County",
  ahj: {
    office: "City of Cleveland Department of Building and Housing",
    process:
      "The Department of Building and Housing administers building permits and plan examination through Cleveland's online permitting services, with zoning, fire prevention, utilities, and right-of-way review involved where applicable. Projects must satisfy the statewide building code as well as City zoning, landmark, utility, and site approvals; lakefront, downtown, and institutional work can require additional coordination.",
  },
  codes: {
    building: "Ohio Building Code, 2024 edition (based on the 2021 IBC), enforced by the City of Cleveland",
    energy: "Ohio Building Code commercial energy provisions based on the 2021 IECC; ASHRAE 90.1 is an alternate compliance path",
    amendments:
      "Cleveland is a certified local building department enforcing Ohio's mandatory statewide code rather than a separate city building-code edition. Cleveland zoning, fire, landmark-district, utility, and public-right-of-way rules remain separate local approvals and can affect the permit sequence.",
  },
  utilities: {
    electric: "The Cleveland Electric Illuminating Company (FirstEnergy) provides electric distribution service; Cleveland Water provides water service",
    notes:
      "FirstEnergy service planning and interconnection should be addressed early for large medical, industrial, and electrification loads. Cleveland Water serves water customers in Cleveland and the region; the Northeast Ohio Regional Sewer District provides regional wastewater and stormwater management, while Dominion Energy Ohio serves natural gas.",
  },
  climateNotes:
    "Cleveland is in ASHRAE climate zone 5A, with cold, snowy winters, Lake Erie lake-effect snow, freeze-thaw cycling, and humid summers. Lakefront wind, high groundwater in some areas, aging fill, and Cuyahoga River or Lake Erie flood exposure call for site-specific investigation.",
  marketNotes:
    "Cleveland's economy is anchored by major healthcare and research institutions, advanced manufacturing, higher education, and a diversified industrial base. Downtown and neighborhood adaptive reuse, lakefront and riverfront reinvestment, and logistics and life-sciences development create both existing-building and utility-infrastructure work.",
  narratives: {
    mep:
      "Cleveland MEP systems are designed for a 5A climate: substantial winter heating and pipe-freeze risk, humid-summer ventilation and dehumidification, and snow-season reliability. Medical, research, manufacturing, and adaptive-reuse projects often need careful phasing, infection-control or process ventilation, and resilient electrical distribution. FirstEnergy capacity and Cleveland Water/NEORSD connections should be coordinated alongside the equipment layout, especially where an older building is being electrified or a service is enlarged. Commercial compliance follows Ohio’s 2021-IECC-based provisions, with the permitted ASHRAE 90.1 path evaluated against the program.",
    structural:
      "Cleveland structural work is generally governed by gravity, wind, snow, drift, frost, and existing-condition uncertainty more often than high seismic demand. Lake-effect snow and wind make roof geometry, drainage, drift, cladding, and rooftop-equipment supports important details. For older industrial and downtown buildings, masonry, corrosion, undocumented alterations, and diaphragm continuity require investigation before reuse loads or new mechanical equipment are assigned. A geotechnical evaluation addresses fill, groundwater, and river- or lake-adjacent soils; the 2024 Ohio Building Code is the structural code basis enforced by the City.",
    civil:
      "Cleveland civil design must connect local site work to Cleveland Water and the Northeast Ohio Regional Sewer District's regional wastewater and stormwater system. We evaluate grading, conveyance, detention/water quality, utility separation, and public-frontage work early, particularly on tight redevelopment parcels with legacy utilities. Lake Erie, the Cuyahoga River, tributaries, and high groundwater can affect flood screening, finished floors, and outlet design, while winter freeze-thaw affects pavement and drainage details. Ohio EPA construction-stormwater coverage and a SWPPP apply when disturbance meets the state threshold.",
    energy:
      "Cleveland commercial energy packages use the Ohio Building Code's 2021-IECC-based energy provisions or the allowed ASHRAE 90.1 alternative. In cold-humid zone 5A, continuous insulation, air-barrier continuity, high-performance glazing, efficient heating, heat recovery, and controlled outside air reduce both energy use and condensation risk. For hospitals, laboratories, and older-building retrofits, the model needs real ventilation, process, and occupancy schedules—not generic office assumptions. We also compare electrification and peak-load choices with FirstEnergy service capacity and the existing building's electrical distribution.",
  },
  faqs: [
    {
      q: "What building code does Cleveland enforce?",
      a: "Cleveland enforces Ohio's mandatory 2024 Ohio Building Code, based on the 2021 IBC. Commercial energy provisions are based on the 2021 IECC, with ASHRAE 90.1 available as an alternate path; local zoning, fire, landmark, utility, and site reviews remain separate.",
    },
    {
      q: "Which utilities should be coordinated for a Cleveland project?",
      a: "The Cleveland Electric Illuminating Company provides electric distribution, Cleveland Water provides water, and the Northeast Ohio Regional Sewer District manages regional wastewater and stormwater functions. Large new loads and redevelopment utility connections should be screened early with the applicable utility.",
    },
    {
      q: "What site conditions are common in Cleveland?",
      a: "Lake-effect snow, freeze-thaw, lakefront wind, aging urban fill, groundwater, and Lake Erie or Cuyahoga River flood exposure can affect design. A geotechnical report and flood screening inform foundations, pavement, finished floors, roof drainage, and utility routing.",
    },
  ],
};