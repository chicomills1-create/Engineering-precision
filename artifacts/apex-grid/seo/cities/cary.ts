import type { CityData } from "../types";

export const cary: CityData = {
  slug: "cary",
  name: "Cary",
  stateSlug: "north-carolina",
  county: "Wake County",
  ahj: {
    office: "Town of Cary Inspections & Permits Department",
    process:
      "Cary runs its own Inspections & Permits Department at Town Hall, 316 North Academy Street — Wake County does not permit inside the town limits. Two intake paths decide the timeline: administrative permits needing no plan review file through Click2Gov and often issue within about a day, while anything requiring plan review files electronically through GeoCivix. Commercial submittals must open with a completed Building Code Summary (Appendix B) as the first sheet and a sealed Statement of Special Inspections where applicable; incomplete plans are not accepted. The Town offers a free Development Liaison Service, a paid Express Review lane, and the SPOT program, which expedites small projects such as additions under 500 square feet in typically 1 to 4 business days at no extra cost.",
  },
  codes: {
    building: "2018 North Carolina State Building Code (based on the 2015 International Building Code with North Carolina amendments)",
    energy: "2018 North Carolina Energy Conservation Code (based on the 2015 IECC with North Carolina amendments; ANSI/ASHRAE/IESNA 90.1 compliance path permitted)",
    amendments:
      "North Carolina's code is uniform statewide — Cary cannot adopt local building-code amendments, and the Town confirms the 2024 NC codes will not take effect until after March 1, 2027 (plans may voluntarily be submitted under the 2024 codes as an alternate method if the set says so clearly). Cary's local layer is its Land Development Ordinance plus site approvals layered onto the permit: floodplain, stream-buffer, and erosion-control approvals, and Wake County food-service review for restaurant projects.",
  },
  utilities: {
    electric: "Duke Energy Progress",
    notes:
      "Duke Energy Progress is Cary's regulated electric utility, and new commercial services and capacity work run through Duke's service process in one of the fastest-growing load territories in the Carolinas. Water and sewer are Town of Cary utilities — an unusually broad municipal service for a suburb — so taps, capacity, and utility extensions coordinate with the same town government that issues the permit, while natural gas is provided by Enbridge Gas North Carolina.",
  },
  climateNotes:
    "IECC climate zone 4 (mixed-humid) in the North Carolina Piedmont: hot, humid summers, mild winters with occasional ice events, and hurricane remnants that can drop extreme rainfall far inland. Design drivers are cooling and latent load, stormwater volume from high-intensity rain, and envelope moisture control rather than snow or seismic demand, both of which are minimal.",
  marketNotes:
    "Cary is a headquarters and technology town in the heart of the Research Triangle: SAS Institute — the world's largest privately held software company — is headquartered on its Cary campus, Epic Games is headquartered in Cary, and MetLife's global technology hub anchors the Weston corridor, with Research Triangle Park minutes away. WakeMed Cary Hospital, ABB, and a deep bench of clean-tech and smart-grid firms round out the base. Commercial work concentrates in corporate campus and office/lab reinvestment, medical facilities, and retail and multifamily development serving one of North Carolina's fastest-growing, highest-income suburbs.",
  narratives: {
    mep:
      "MEP design in Cary is documented to the 2018 North Carolina codes — the State Building Code and the 2018 NC Energy Conservation Code, with the ASHRAE 90.1 path available for commercial energy compliance. Submittals file electronically through GeoCivix with the Appendix B Building Code Summary as the first sheet, and the Town's Express Review and free Development Liaison lanes reward complete sets. Electric service is Duke Energy Progress, water and sewer are the Town's own utilities, and in zone 4 the mechanical design conversation is dominated by cooling capacity and humidity control.",
    structural:
      "Structural design in Cary under the 2018 NC State Building Code (2015 IBC basis) is a low-hazard discipline: minimal seismic and snow demand, with wind from inland hurricane remnants and the Piedmont's residual and partially weathered rock soils setting the real conditions. Foundation design follows the geotechnical profile — shallow rock is common enough in Wake County to change footing and utility-trench economics — and the existing building provisions carry the heavy corporate-campus renovation market.",
    civil:
      "Civil design in Cary is governed as much by the Town's Land Development Ordinance as by the building code: stream buffers, floodplain limits, and erosion control for land disturbance are separate approvals layered onto the building permit, and the Town's own water and sewer utilities set tap and extension requirements. High-intensity Piedmont rainfall makes stormwater detention and water-quality design the recurring civil effort on Cary's campus, retail, and multifamily sites.",
    energy:
      "Energy compliance in Cary is documented to the 2018 North Carolina Energy Conservation Code — the 2015 IECC with NC amendments — using either its prescriptive and performance sections or the ANSI/ASHRAE/IESNA 90.1 path, with NC-specific COMcheck accepted as documentation. Note the transition ahead: the 2024 NC codes do not take effect until after March 1, 2027, though Cary accepts voluntary submittals under them as an alternate method. In zone 4, cooling efficiency, duct sealing, and lighting controls set the compliance margin.",
  },
  faqs: [
    {
      q: "Who issues building permits in Cary, NC?",
      a: "The Town of Cary Inspections & Permits Department at Town Hall, 316 North Academy Street — Wake County does not permit inside Cary. No-plan-review permits file through Click2Gov; plan-review projects file electronically through GeoCivix.",
    },
    {
      q: "What building code does Cary enforce?",
      a: "The 2018 North Carolina State Building Code and 2018 NC Energy Conservation Code. The code is uniform statewide, so Cary has no local building-code amendments; the 2024 NC codes do not take effect until after March 1, 2027, though Cary accepts voluntary submittals under them as an alternate method.",
    },
    {
      q: "Who provides utilities in Cary?",
      a: "Duke Energy Progress provides electricity. Water and sewer are Town of Cary utilities, and natural gas is provided by Enbridge Gas North Carolina.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 58, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.carync.gov/services-publications/residential-permits-inspections/faq"],
      codes: ["https://www.carync.gov/home/showpublisheddocument/18384/639287845259000000"],
      amendments: ["https://codes.iccsafe.org/content/NCECC2018/chapter-4-ce-commercial-energy-efficiency"],
      utilities: ["https://www.caryeconomicdevelopment.com/key-industries/clean-technology/"],
      climate: ["https://codes.iccsafe.org/content/NCECC2018/chapter-4-ce-commercial-energy-efficiency"],
      market: ["https://www.caryeconomicdevelopment.com/key-industries/clean-technology/"],
    },
  },
};
