import type { CityData } from "../types";

export const denver: CityData = {
  slug: "denver",
  name: "Denver",
  stateSlug: "colorado",
  county: "City and County of Denver",
  ahj: {
    office: "Denver Community Planning & Development (CPD) — Development Services / Building Inspection",
    process:
      "Plan review runs through Denver's online permitting system (the E-Permits / Denver Development Services portal) with published commercial review timelines and an expedited option for qualifying projects. Denver reviews building, zoning, and fire concurrently on larger projects, and green-building and energy-code reviews are integrated into the commercial package, so early coordination with CPD helps sequence the reviews.",
  },
  codes: {
    building: "2021 Denver Building and Fire Code (based on the 2021 I-codes with Denver amendments)",
    energy: "2021 Denver Energy Code (based on the 2021 IECC with Denver amendments and a defined path toward net-zero-energy new construction)",
    amendments:
      "Denver adopts and amends the I-codes as a home-rule city, so the Denver Building and Fire Code differs from surrounding jurisdictions on the same base year. The city's Green Buildings Ordinance requires cool roofs plus solar, green roof, or energy/renewable alternatives on larger buildings, and Energize Denver benchmarking and performance requirements apply to existing commercial and multifamily buildings above size thresholds.",
  },
  utilities: {
    electric: "Xcel Energy (Public Service Company of Colorado) serves Denver",
    notes:
      "Xcel Energy applies commercial demand charges and offers time-of-use and demand-response programs; large new services and electrification-driven loads can carry meaningful transformer and interconnection lead times. Natural gas is also Xcel, and water is Denver Water, whose tap-fee and capacity requirements factor into project budgets and site planning.",
  },
  climateNotes:
    "ASHRAE climate zone 5B, cold and dry, at roughly 5,280 ft ('Mile High') elevation: cold snowy winters with significant ground snow load, hot dry summers, intense high-altitude solar gain, and a very large diurnal temperature swing that makes free cooling and economizers valuable.",
  marketNotes:
    "Denver construction is driven by aerospace and defense, healthcare and the Anschutz medical campus, life sciences, downtown and RiNo/River Mile mixed-use and multifamily development, data centers, and transit-oriented projects along the RTD lines. Sustainability policy — Energize Denver and the Green Buildings Ordinance — is a defining feature of the commercial market.",
  narratives: {
    mep:
      "MEP design in Denver balances cold-dry 5B winters against hot, high-solar summers at 5,280 ft, where thin air derates air-cooled equipment and combustion, and the large diurnal swing makes economizers and night-flush genuinely valuable. Denver's aggressive energy policy shapes system selection: the Denver Energy Code targets net-zero-ready new construction, and the Green Buildings Ordinance and Energize Denver push electrification, heat pumps, and low-emission design. Compliance runs through Denver's integrated commercial review, and Xcel Energy demand charges reward load-shifting. We confirm transformer availability early, since electrification and data-center loads can face long interconnection lead times along the Front Range.",
    structural:
      "Denver structural design carries significant ground snow load with drift and unbalanced cases, and seismic demand is comparatively modest for the region (generally the lower seismic design categories), so gravity, snow, and wind usually govern the lateral story. The defining geotechnical issue is expansive, steeply-dipping bedrock claystone across the Front Range — swelling soils that drive structural floor systems, void-form details, and deep or drilled-pier foundations to protect slabs. High-altitude wind and rooftop-equipment anchorage warrant attention, and special-inspection programs run under the Denver Building and Fire Code through Community Planning & Development, on the city's own forms rather than generic county paperwork.",
    civil:
      "Civil work in Denver combines cold-climate site design — frost-depth foundations, snow storage, and de-icing — with a demanding stormwater regime. The city and the Mile High Flood District (MHFD/UDFCD) criteria govern detention, water-quality capture, and full-spectrum drainage, and Denver enforces green-infrastructure and post-construction stormwater requirements that consume developable area. Expansive Front Range soils affect subgrade, utility trenching, and pavement design, and water/tap coordination runs through Denver Water. Because Denver is a home-rule city with its own code and sustainability overlays, we align grading, drainage, and green-infrastructure features with both CPD and MHFD standards in the first site-plan pass.",
    energy:
      "Denver enforces the 2021 Denver Energy Code, one of the most stringent in the country, with a defined trajectory toward net-zero-energy new construction — so COMcheck-style documentation targets that edition plus Denver amendments, not a generic 2021 IECC. The Green Buildings Ordinance requires cool roofs plus a solar, green-roof, or energy alternative on larger buildings, and Energize Denver imposes benchmarking and performance targets on existing buildings. In cold-dry, high-solar 5B, the best moves are a tight high-performance envelope, heat recovery, electrified heat pumps, and economizers, coordinated as one package with Xcel Energy incentives.",
  },
  faqs: [
    {
      q: "What makes Denver's energy code stricter than the base IECC?",
      a: "Denver, as a home-rule city, adopts the 2021 Denver Energy Code with amendments and a defined path toward net-zero-energy new construction. On top of it, the Green Buildings Ordinance requires cool roofs plus solar, green-roof, or energy alternatives on larger buildings, and Energize Denver sets benchmarking and performance targets for existing commercial and multifamily buildings.",
    },
    {
      q: "What geotechnical issue most affects Denver structural design?",
      a: "Expansive, steeply-dipping claystone bedrock across the Front Range is the defining hazard. Swelling soils can heave slabs and foundations, so projects commonly use structural floor systems, void forms, and drilled-pier or deep foundations designed to the project geotechnical report — even though seismic demand here is comparatively low.",
    },
    {
      q: "How does stormwater review work for Denver commercial sites?",
      a: "Denver applies its own criteria alongside the Mile High Flood District (MHFD/UDFCD) standards for detention, water-quality capture, and full-spectrum drainage, plus green-infrastructure and post-construction stormwater requirements. These consume developable area, so detention and water-quality features should be laid out in the first site-plan pass.",
    },
  ],
};
