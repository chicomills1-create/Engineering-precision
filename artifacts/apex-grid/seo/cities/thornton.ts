import type { CityData } from "../types";

export const thornton: CityData = {
  slug: "thornton",
  name: "Thornton",
  stateSlug: "colorado",
  county: "Adams County",
  ahj: {
    office: "City of Thornton City Development Department — Building Division",
    process:
      "Building permits and plan review run through the City of Thornton's City Development Department, with applications and payments handled through the city's online CityView portal. Thornton adopted a fully reenacted Development Code (Chapter 18 of the city code) effective September 1, 2025, together with a new stormwater quality permitting program, so land-development applications, zoning terminology, and review sequencing now run under the new code. The city sits primarily in Adams County — with its northern growth edge reaching toward Weld County — but permitting is the city's own, and development review, building review, and inspections are coordinated through City Development rather than the county.",
  },
  codes: {
    building: "2024 International Building Code with Thornton local amendments (the city's adopted 2024 International Code package), enforced by the City of Thornton Building Division",
    energy: "2024 International Energy Conservation Code with Thornton amendments, including the Colorado Model Electric Ready and Solar Ready Code",
    amendments:
      "Thornton amends the I-codes locally and is phasing its adopted package in on the city's published schedule — July 1, 2026 for the ICC codes and August 1, 2026 for the 2026 NEC — with earlier applications able to proceed under the prior 2021-code basis. Local amendments include fire-code provisions such as in-building radio coverage for emergency responders. Because the edition in force turns on the application date, we confirm Thornton's governing code editions and local amendments with the Building Division at project kickoff.",
  },
  utilities: {
    electric: "Xcel Energy (Public Service Company of Colorado) serves Thornton",
    notes:
      "Xcel Energy applies commercial demand charges and offers time-of-use and demand-response programs; large new services and electrification-driven loads can carry meaningful transformer and interconnection lead times, so we confirm available capacity early. Water and sewer are City of Thornton municipal services — the city has invested heavily in water supply for its planned growth — and tap-fee and capacity requirements factor into project budgets and site planning on larger developments.",
  },
  climateNotes:
    "ASHRAE climate zone 5B, cold and dry, at roughly 5,350 feet of elevation on the northern Front Range: cold, snowy winters with meaningful ground snow load, hot dry summers, intense high-altitude solar gain, and a large diurnal temperature swing that makes free cooling and economizers valuable.",
  marketNotes:
    "Thornton is one of Colorado's largest and fastest-growing cities, ten miles north of downtown Denver on the I-25 corridor, with more than 1,400 acres of developable commercial land along I-25, three E-470 interchanges, RTD North Line (N Line) stations, and Denver International Airport about twenty minutes away. Retail and entertainment anchors along the corridor, healthcare campuses including North Suburban Medical Center and St. Anthony North, logistics and distribution employers such as Amazon, and roughly three million square feet of employment space under construction keep commercial volume high — and the city's own planning targets growth toward 250,000 residents.",
  narratives: {
    mep:
      "MEP design in Thornton balances cold-dry 5B winters against hot, high-solar summers at roughly 5,350 feet, where thin air derates air-cooled equipment and combustion appliances and the large diurnal swing makes economizers and night-flush genuinely valuable. Colorado's electric-ready and solar-ready requirements, carried in Thornton's adopted energy package, shape panel capacity, roof planning, and EV infrastructure from the first schematic pass rather than as retrofits. Compliance documentation runs through the City Development review in the CityView portal, and Xcel Energy demand charges reward load-shifting and honestly sized services. With millions of square feet of corridor employment space in motion, we confirm transformer availability early, since electrification and logistics loads can face long interconnection lead times along the north I-25 corridor.",
    structural:
      "Thornton structural design carries significant ground snow load with drift and unbalanced cases, and seismic demand is comparatively modest for the region (generally the lower seismic design categories), so gravity, snow, and wind usually govern the lateral story. The defining geotechnical issue is the same Front Range condition found across the north metro: expansive claystone bedrock and swelling soils that drive structural floor systems, void-form details, and deep or drilled-pier foundations to protect slabs. High-altitude wind and rooftop-equipment anchorage warrant attention on the corridor's large-footprint logistics and retail buildings, and special-inspection programs run under Thornton's adopted building code through the City Development Department.",
    civil:
      "Civil work in Thornton combines cold-climate site design — frost-depth foundations, snow storage, and de-icing — with a stormwater regime the city has just rebuilt: the reenacted Chapter 18 Development Code, effective September 1, 2025, arrived with a new stormwater quality permitting program, and drainage design answers to city criteria alongside Mile High Flood District (MHFD/UDFCD) standards for detention, water-quality capture, and full-spectrum drainage. Expansive Front Range soils affect subgrade, utility trenching, and pavement design, and water and tap coordination runs through the City of Thornton's municipal water utility. On the city's large greenfield corridor sites, we align grading, drainage, and stormwater quality features with both the new development code and MHFD standards in the first site-plan pass.",
    energy:
      "Thornton enforces its adopted 2024 IECC package with local amendments, including the Colorado Model Electric Ready and Solar Ready Code — so compliance documentation targets that edition, and electric-ready panel capacity, solar-ready roof provisions, and EV-ready parking are documented as part of the base design rather than value-engineered out. In cold-dry, high-solar 5B, the best moves are a tight high-performance envelope, heat recovery, electrified heat pumps, and economizers taking advantage of the diurnal swing, coordinated as one package with Xcel Energy incentives. Because the city is phasing its code package in on a published schedule, we confirm the edition in force for the project's application date at kickoff.",
  },
  faqs: [
    {
      q: "How do building permits and plan review work in Thornton?",
      a: "Permits run through the City of Thornton City Development Department, with applications and payments handled in the city's online CityView portal. Land development follows the city's reenacted Development Code (Chapter 18), effective September 1, 2025, which also introduced a new stormwater quality permitting program — so zoning terminology, application sequencing, and stormwater submittals follow the new code. Thornton permits its own work even though most of the city lies in Adams County; the county is not the reviewer.",
    },
    {
      q: "What building code does the City of Thornton enforce?",
      a: "Thornton has adopted the 2024 International Codes with local amendments — including the 2024 IBC and the 2024 IECC with the Colorado Model Electric Ready and Solar Ready Code — phased in on the city's published schedule (July 1, 2026 for the ICC codes, August 1, 2026 for the 2026 NEC), with earlier applications able to proceed under the prior 2021-code basis. Because the governing edition turns on the application date, we confirm the editions and local amendments with the Building Division at project kickoff.",
    },
    {
      q: "What should Thornton projects plan for on soils and snow?",
      a: "Two Front Range conditions govern most Thornton structural and civil design. Expansive claystone bedrock and swelling soils commonly push foundations to drilled piers or deep systems with structural floors and void forms, so the geotechnical report drives the foundation approach. Above grade, ground snow load with drift and unbalanced cases usually governs roof design, while seismic demand stays comparatively low — gravity, snow, and wind tell the structural story.",
    },
  ],
  research: {
    lastVerified: "2026-10-27", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.thorntonco.gov/business-development/city-development/building-permits-inspections?ID=25"],
      codes: ["https://www.thorntonco.gov/business-development/city-development/building-permits-inspections?ID=25"],
      amendments: ["https://www.thorntonco.gov/business-development/city-development/building-permits-inspections?ID=25"],
      utilities: ["https://co.my.xcelenergy.com/s/business"],
      climate: ["https://www.weather.gov/bou/"],
      market: ["https://businessinthornton.com/site-selection/data/"],
    },
  },
};
