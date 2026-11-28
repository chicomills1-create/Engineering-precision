import type { CityData } from "../types";

export const downey: CityData = {
  slug: "downey",
  name: "Downey",
  stateSlug: "california",
  county: "Los Angeles County",
  ahj: {
    office: "City of Downey Community Development Department, Building and Safety Division (City Hall, 11111 Brookshire Avenue)",
    process:
      "Downey's Building and Safety Division is the sole building authority inside the city — permits do not go to LADBS or LA County — and applications are filed with the Building Official for plan check against Title 24 with Downey's municipal amendments. The city draws a firm line on who may pull permits: commercial, industrial, and multiple-residential permits are issued only to California-licensed contractors, with no owner-builder route, while the owner-builder path is reserved for an owner living in a single-family residence. Permits become void if work is not started within 12 months, and unstarted applications are abandoned 180 days after filing.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC), adopted by the City of Downey with local amendments in the Downey Municipal Code, effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6), with CALGreen (Title 24, Part 11) adopted at Downey Municipal Code §8985",
    amendments:
      "Downey adopts the California codes by reference chapter by chapter in its Municipal Code: §8985 adopts the 2025 CALGreen code with its mandatory measures applied to every new building, addition, and alteration, and §8301 adopts the 2025 California Plumbing Code as the Downey Plumbing Code including Appendices B, C, D, and K. In 2026 the city recast §8730 (Ordinance No. 26-1532) to adopt CBC Appendix J grading with local additions and amendments tailored to Downey's floodplain and grading conditions — grading is a locally amended discipline here, not a stock appendix.",
  },
  utilities: {
    electric: "Southern California Edison (SCE)",
    notes:
      "Southern California Edison delivers electricity in Downey, so new commercial services, panel upgrades, and solar interconnection run through SCE's service-planning process. Water and sewer are City of Downey utilities — the city operates its own groundwater well system (its capital program includes rehabilitation of multiple city wells) and its own sewer collection system — so water capacity, well-driven water quality considerations, and sewer connection review all sit inside City Hall alongside the building permit, while storm drains tie into the Los Angeles County Flood Control District system along the Rio Hondo and San Gabriel River channels.",
  },
  climateNotes:
    "California Title 24 Climate Zone 8 (ASHRAE 3B, warm-dry) in the southeast Los Angeles basin: hot summers, mild winters, and marine-layer mornings burning off to high cooling loads. Seismic Design Category D governs — Downey sits between the Whittier and Newport-Inglewood fault systems — and the Rio Hondo and San Gabriel River floodplains plus liquefaction-prone alluvium along those channels are the site-specific hazards the city's grading and floodplain rules address.",
  marketNotes:
    "Downey is a mature Gateway Cities suburb whose commercial market is anchored by healthcare and aerospace-legacy redevelopment: Kaiser Permanente's Downey Medical Center is the city's largest employer, joined by PIH Health Downey Hospital and the Rancho Los Amigos rehabilitation campus at the city's edge. The former North American Aviation/Rockwell aerospace plant site — where the Apollo program was built — is now Downey Landing and the Promenade at Downey retail centers plus the Columbia Memorial Space Center, and the steady work is medical expansion, retail re-tenanting, and industrial conversion of aerospace-era buildings along Firestone Boulevard and the I-5/I-605 corridors.",
  narratives: {
    mep:
      "MEP design in Downey is documented to the 2025 Title 24 suite with Downey's chapter-by-chapter adoptions: the 2025 California Plumbing Code as adopted at §8301 including Appendices B, C, D, and K, the 2025 California Electrical Code for electrical work, and CALGreen mandatory measures under §8985 on every permit. Service coordination runs through Southern California Edison, commercial permits can only be pulled by California-licensed contractors, and the city's large medical stock adds OSHPD-adjacent life-safety and emergency-power expectations that shape MEP scope from the first survey.",
    structural:
      "Structural design in Downey is seismic-first under the 2025 CBC: Seismic Design Category D detailing between the Whittier and Newport-Inglewood faults, on deep basin alluvium with liquefaction exposure along the Rio Hondo and San Gabriel River channels. The city's signature structural work is existing-building evaluation — aerospace-era industrial buildings at Downey Landing and mid-century commercial stock being converted to new occupancies under the California Existing Building Code, where legacy systems routinely need real upgrades rather than cosmetic ones.",
    civil:
      "Civil design in Downey works under the city's recast grading regulations: §8730 adopts CBC Appendix J with local amendments, so grading plans are reviewed against Downey's own floodplain and grading chapter, not the stock appendix. Sites drain toward the Rio Hondo and San Gabriel River channels in the LA County Flood Control District system, water and sewer are city utilities reviewed inside City Hall, and the built-out Gateway Cities context makes utility verification and existing-condition documentation the dominant civil risks on redevelopment parcels.",
    energy:
      "Energy compliance in Downey is documented to the 2025 California Energy Code (Title 24, Part 6) with CALGreen mandatory measures adopted at Municipal Code §8985, using the performance or prescriptive paths with the required compliance forms in the submittal. In Title 24 Climate Zone 8 the margin is decided by cooling efficiency, envelope solar control, and lighting power density, and SCE's time-of-use rate structure rewards the load management that the city's medical and retail buildings increasingly design in.",
  },
  faqs: [
    {
      q: "What building code does Downey enforce?",
      a: "The 2025 California Building Standards Code — the 2025 CBC (Title 24, Part 2, based on the 2024 IBC) and companion California codes — adopted with local amendments in the Downey Municipal Code, effective January 1, 2026. CALGreen is adopted at §8985 and the 2025 California Plumbing Code at §8301.",
    },
    {
      q: "Who can pull a commercial building permit in Downey?",
      a: "Only a California-licensed contractor. Downey issues commercial, industrial, and multiple-residential permits exclusively to licensed contractors — there is no owner-builder route for those projects. The owner-builder path is limited to an owner living in a single-family residence.",
    },
    {
      q: "Who provides electric, water, and sewer service in Downey?",
      a: "Electricity is Southern California Edison. Water and sewer are City of Downey utilities — the city runs its own groundwater well system and sewer collection — so capacity and connection review happen inside City Hall with the Building and Safety Division's process.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://alliancepermitting.com/guides/california/downey-building-permit"],
      codes: ["https://cityrulelookup.com/blog/building-safety-rules-in-downey-ca"],
      amendments: ["https://ecode360.com/DO4924/laws/LF2639517.pdf"],
      utilities: ["https://www.downeyca.org/home/showpublisheddocument/6906/637970155913170000"],
      climate: ["https://ecode360.com/DO4924/laws/LF2639517.pdf"],
      market: ["https://www.downeyca.org/home/showpublisheddocument/242/636977954840470000"],
    },
  },
};
