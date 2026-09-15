export const SQFT_PROJECT_TYPES = [
  "New commercial building (office/retail/mixed-use)",
  "Tenant improvement / remodel",
  "Industrial / warehouse",
  "Restaurant / food service",
  "Healthcare / medical",
] as const;

export type SqftProjectType = typeof SQFT_PROJECT_TYPES[number];

export const ESTIMATE_PROJECT_TYPES = [
  ...SQFT_PROJECT_TYPES,
  "ADU / residential",
  "PE stamp & plan review only",
  "Title 24 energy compliance only",
  "Plan-check corrections",
] as const;

export type EstimateProjectType = typeof ESTIMATE_PROJECT_TYPES[number];

export const ESTIMATE_FEE_SOURCE_NOTE =
  "Mid-line design-fee assumptions from published 2025–2026 U.S. market data provided by the owner.";

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
] as const;

export const SQFT_RATES: Record<SqftProjectType, { low: number, high: number, headline: number }> = {
  "New commercial building (office/retail/mixed-use)": { low: 1.75, high: 3.25, headline: 2.25 },
  "Tenant improvement / remodel": { low: 1.25, high: 2.50, headline: 1.65 },
  "Industrial / warehouse": { low: 0.90, high: 1.75, headline: 1.20 },
  "Restaurant / food service": { low: 2.00, high: 3.75, headline: 2.60 },
  "Healthcare / medical": { low: 2.50, high: 4.50, headline: 3.15 },
};

export const FLAT_RATES = {
  "ADU / residential": { headline: 5000, low: 3500, high: 8000 },
  "Title 24 energy compliance only": { headline: 1650, low: 1000, high: 3000 },
};

export function getStateMultiplier(state: string): number {
  if (state === "CA") return 1.3;
  if (["NY", "WA", "HI"].includes(state)) return 1.2;
  return 1.0;
}

export type EstimateResult = {
  type: "sqft" | "flat" | "pe" | "custom";
  headline?: number;
  low?: number;
  high?: number;
  message: string;
  assumptions: string;
  calcBreakdown: string;
};

export function calculateEstimate(data: {
  projectType: EstimateProjectType;
  peBasis?: SqftProjectType;
  squareFootage: number;
  state: string;
}): EstimateResult {
  const multiplier = getStateMultiplier(data.state);
  
  if (data.projectType === "Plan-check corrections") {
    return {
      type: "custom",
      message: "Custom quote — typical $1,500–$5,000",
      assumptions: `${ESTIMATE_FEE_SOURCE_NOTE} No automatic calculation or state multiplier is applied to plan-check corrections.`,
      calcBreakdown: "Applied rates: Custom quote — typical $1,500–$5,000\nState multiplier: Not applied\nComputed range: Custom quote — typical $1,500–$5,000"
    };
  }

  if (data.projectType === "ADU / residential" || data.projectType === "Title 24 energy compliance only") {
    const rates = FLAT_RATES[data.projectType as keyof typeof FLAT_RATES];
    return {
      type: "flat",
      headline: rates.headline,
      low: rates.low,
      high: rates.high,
      message: `$${rates.low.toLocaleString()} - $${rates.high.toLocaleString()}`,
      assumptions: `${ESTIMATE_FEE_SOURCE_NOTE} Flat-fee range: $${rates.low.toLocaleString()}–$${rates.high.toLocaleString()}; typical figure: $${rates.headline.toLocaleString()}. Square footage and state multiplier are not applied.`,
      calcBreakdown: `Applied rates: Flat-fee basis\nState multiplier: Not applied\nHeadline estimate: $${rates.headline.toLocaleString()}\nComputed range: $${rates.low.toLocaleString()} - $${rates.high.toLocaleString()}`
    };
  }

  if (data.projectType === "PE stamp & plan review only") {
    if (!data.peBasis) throw new Error("PE basis required");
    const rates = SQFT_RATES[data.peBasis];
    const rawRef = data.squareFootage * rates.headline * multiplier;
    const reference = Math.max(1500, rawRef);
    
    const low = Math.max(500, reference * 0.10);
    const high = Math.max(500, reference * 0.20);
    const headline = Math.max(500, reference * 0.12);
    
    return {
      type: "pe",
      headline: Math.round(headline),
      low: Math.round(low),
      high: Math.round(high),
      message: `$${Math.round(low).toLocaleString()} - $${Math.round(high).toLocaleString()}`,
      assumptions: `${ESTIMATE_FEE_SOURCE_NOTE} Reference basis: ${data.peBasis} at $${rates.headline.toFixed(2)}/sqft × ${multiplier.toFixed(1)} state multiplier = $${Math.round(reference).toLocaleString()} reference fee. PE range: 10%–20% of reference; typical figure: 12%.`,
      calcBreakdown: `Reference basis: ${data.peBasis}\nApplied reference rate: $${rates.headline.toFixed(2)} / sqft\nState multiplier: ${multiplier.toFixed(1)}\nReference fee: $${Math.round(reference).toLocaleString()}\nHeadline estimate (12%): $${Math.round(headline).toLocaleString()}\nComputed range (10%-20%): $${Math.round(low).toLocaleString()} - $${Math.round(high).toLocaleString()}`
    };
  }

  // Sqft types
  const rates = SQFT_RATES[data.projectType as SqftProjectType];
  const low = Math.max(1500, data.squareFootage * rates.low * multiplier);
  const headline = Math.max(1500, data.squareFootage * rates.headline * multiplier);
  const high = Math.max(1500, data.squareFootage * rates.high * multiplier);

  return {
    type: "sqft",
    headline: Math.round(headline),
    low: Math.round(low),
    high: Math.round(high),
    message: `$${Math.round(low).toLocaleString()} - $${Math.round(high).toLocaleString()}`,
    assumptions: `${ESTIMATE_FEE_SOURCE_NOTE} Applied range: $${rates.low.toFixed(2)}–$${rates.high.toFixed(2)}/sqft; typical rate: $${rates.headline.toFixed(2)}/sqft; state multiplier: ${multiplier.toFixed(1)}.`,
    calcBreakdown: `Applied rates: $${rates.low.toFixed(2)} - $${rates.high.toFixed(2)} / sqft\nHeadline rate: $${rates.headline.toFixed(2)} / sqft\nState multiplier: ${multiplier.toFixed(1)}\nHeadline estimate: $${Math.round(headline).toLocaleString()}\nComputed range: $${Math.round(low).toLocaleString()} - $${Math.round(high).toLocaleString()}`
  };
}
