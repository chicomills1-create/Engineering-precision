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

/** Per-city data for metro-level SEO pages. Everything must be REAL, publicly
 * verifiable — AHJ/permit office names, adopted code editions, local amendments,
 * utilities, and market context specific to THIS city (never recycled state copy).
 */
export interface CityData {
  slug: string; // kebab-case, e.g. "phoenix"
  name: string; // "Phoenix"
  stateSlug: string; // must match a StateData.slug, e.g. "arizona"
  county: string; // "Maricopa County"
  /** Authority Having Jurisdiction — the actual permit office */
  ahj: {
    office: string; // e.g. "City of Phoenix Planning & Development Department"
    process: string; // 2-3 sentences on how plan review actually works here (portals, self-cert, timelines)
  };
  codes: {
    building: string; // exact adopted edition, e.g. "2018 IBC (Phoenix Building Construction Code)"
    energy: string; // exact adopted commercial energy code edition
    amendments: string; // 1-3 sentences on notable LOCAL amendments that change design
  };
  utilities: {
    electric: string; // serving electric utility (or utilities), e.g. "APS and SRP (territory line runs through the metro)"
    notes: string; // 1-2 sentences: interconnection, demand charges, service lead times, water/sewer provider if notable
  };
  climateNotes: string; // 1-2 sentences of city-specific design-climate context
  marketNotes: string; // 2-3 sentences of REAL construction-market context for this city
  /** Unique per-service editorial paragraph — the information-gain core.
   * Must weave the city's actual AHJ, amendment, utility, and climate facts in. */
  narratives: {
    mep: string;
    structural: string;
    civil: string;
    energy: string;
  };
  faqs: { q: string; a: string }[]; // 3 city-specific FAQs with substantive answers
  /** Required for newly promoted cities. Older curated records are grandfathered
   * until their next quarterly review, but any record with research metadata must
   * pass the complete source/review gate before it can be indexed. */
  research?: {
    lastVerified: string;
    reviewStatus: "draft" | "approved";
    reviewedBy: string;
    /** City/service canonical owners approved for indexation. Other generated
     * city/service combinations remain live but noindex,follow. */
    supportedServiceSlugs?: Array<"mep-engineering" | "structural-engineering" | "civil-engineering" | "energy-code-compliance" | "energy-compliance">;
    priority: {
      commercialOpportunity: number; // 0-100, documented market-opportunity score
      searchConsoleImpressions: number; // latest available page impressions; 0 is valid
      searchConsolePeriod: string; // YYYY-MM-DD/YYYY-MM-DD or "unavailable"
    };
    sources: {
      ahj: string[];
      codes: string[];
      amendments: string[];
      utilities: string[];
      climate: string[];
      market: string[];
    };
  };
}
