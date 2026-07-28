/** Per-state data that drives the programmatic SEO pages.
 * Every field must be REAL, publicly verifiable regulatory/market data.
 * Never invent Apex-specific projects, clients, or testimonials.
 */
export interface StateData {
  slug: string; // kebab-case, e.g. "north-carolina"
  name: string; // "North Carolina"
  abbrev: string; // "NC"
  /** ISO date (YYYY-MM-DD) when the code/adoption facts were last verified against current sources.
   * Update whenever a quarterly review confirms or corrects the data. */
  lastVerified: string;
  /** Adopted commercial building code */
  buildingCode: {
    name: string; // e.g. "Florida Building Code, 8th Edition (2023)"
    baseCode: string; // e.g. "2021 IBC with state amendments"
    notes: string; // 1-2 sentences on adoption quirks (statewide vs local, amendment highlights)
  };
  energyCode: {
    commercial: string; // e.g. "2021 IECC" or "ASHRAE 90.1-2019" or "Title 24 Part 6 (2022)"
    notes: string; // adoption/stringency context
    beyondCode?: string; // stretch codes, city-level reach codes, benchmarking ordinances
  };
  climate: {
    zones: string; // ASHRAE/IECC climate zone(s), e.g. "2B (hot-dry) and 5B in high country"
    drivers: string[]; // 2-4 design drivers, e.g. "115°F design cooling temps", "monsoon dust"
  };
  structural: {
    seismic: string; // seismic design category landscape
    wind: string; // basic wind speeds / hurricane exposure
    snow: string; // ground snow loads
    other?: string; // expansive soils, frost depth, flood, wildfire, etc.
  };
  licensure: {
    board: string; // PE licensing board name
    notes: string; // comity/stamping notes, e.g. electronic seal rules
  };
  metros: string[]; // 3-6 major markets
  permitting: string; // 2-3 sentences on the AHJ/permitting landscape
  marketNotes: string; // 2-3 sentences of construction-market context (real trends)
  /** Unique editorial paragraph per service — the information-gain core of each page.
   * Must weave the state's actual code/climate/structural facts into service-specific guidance. */
  narratives: {
    mep: string;
    structural: string;
    civil: string;
    energy: string;
  };
  faqs: { q: string; a: string }[]; // 3-4 state-specific engineering FAQs with substantive answers
}
