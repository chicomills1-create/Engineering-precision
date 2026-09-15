export const PROJECT_TYPES = [
  "New commercial building (office/retail/mixed-use)",
  "Tenant improvement / remodel",
  "Industrial / warehouse",
  "Restaurant / food service",
  "Healthcare / medical",
  "ADU / residential",
  "PE stamp & plan review only",
  "Title 24 energy compliance only",
  "Plan-check corrections",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const DISCIPLINES = [
  "civil",
  "structural",
  "mechanical",
  "electrical",
  "plumbing",
  "fire-protection",
  "energy",
] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export const SERVICE_PATHS = [
  "pe-review-sealing",
  "engineering-calculations",
  "calculations-stamped-drawings",
  "partner-routing",
] as const;
export type ServicePath = (typeof SERVICE_PATHS)[number];

export const SIZE_BANDS = ["small", "medium", "large", "very-large"] as const;
export type SizeBand = (typeof SIZE_BANDS)[number];

export const SCHEDULES = ["standard", "rush", "emergency"] as const;
export type Schedule = (typeof SCHEDULES)[number];

export const COMPLEXITY_LEVELS = ["low", "medium", "high", "unknown"] as const;
export type ComplexityLevel = (typeof COMPLEXITY_LEVELS)[number];
export type ComplexityInput = ComplexityLevel | number;

export type CalculationType =
  | "design"
  | "load"
  | "code-compliance"
  | "as-built"
  | "permit-set"
  | "other";

export type UploadMetadata = {
  status?: "not-started" | "uploaded" | "failed";
  fileCount?: number;
  totalBytes?: number;
  fileNames?: string[];
  failureCode?: string;
};

export type ComplexityInputs = {
  existing?: ComplexityInput;
  floors?: ComplexityInput;
  system?: ComplexityInput;
  documentation?: ComplexityInput;
  jurisdiction?: ComplexityInput;
};

export type EstimateIntake = {
  /** Direct estimates require these fields; partner leads may omit them. */
  state?: string;
  disciplines?: Discipline[];
  /** Singular alias is accepted to make integrations less error-prone. */
  discipline?: Discipline;
  projectType?: ProjectType;
  sheetCount?: number;
  sizeBand?: SizeBand;
  calculationType?: CalculationType;
  uploadMetadata?: UploadMetadata;
  requiredByDate?: string;
  siteVisit?: boolean;
  existing?: ComplexityInput;
  floors?: ComplexityInput;
  system?: ComplexityInput;
  documentation?: ComplexityInput;
  jurisdiction?: ComplexityInput;
  complexity?: ComplexityInputs;
  schedule?: Schedule;
  corrections?: boolean;
  coordination?: boolean;
  reviewScope?: string;
  unknownInputs?: string[];
  unknownFlags?: string[];
  uncertainFlags?: string[];
  uncertain?: boolean;
  /** Explicit partner lead intent always avoids a binding estimate. */
  partnerRoute?: boolean;
  routingMode?: "direct" | "partner";
  servicePath?: ServicePath;
  path?: ServicePath;
};

export type MoneyRange = {
  low: number;
  mid: number;
  high: number;
};

export type NullableMoneyRange = {
  low: number | null;
  mid: number | null;
  high: number | null;
};

export type Coverage = "eligible" | "review-required" | "partner-route" | "unavailable";

export type FactorBreakdown = {
  base: { low: number; mid: number; high: number };
  complexity: {
    existing: { low: number; high: number; known: boolean };
    floors: { low: number; high: number; known: boolean };
    system: { low: number; high: number; known: boolean };
    documentation: { low: number; high: number; known: boolean };
    jurisdiction: { low: number; high: number; known: boolean };
    unknownWidening: { low: number; mid: number; high: number };
    combined: { low: number; mid: number; high: number };
  };
  schedule: { low: number; mid: number; high: number };
  services: {
    calculations: number;
    siteVisit: number;
    corrections: number;
    coordination: number;
    total: number;
  };
  reviewService: { reviewScope: number; calculations: number; total: number };
  stamp: { low: number; mid: number; high: number };
  eligibleReviewTotal: { low: number; mid: number; high: number };
  subtotals: { low: number; mid: number; high: number };
};

export function failedUploadMetadata(failureCode: string): UploadMetadata {
  return { status: "failed", failureCode };
}

export type DisciplineEstimate = {
  discipline: Discipline;
  fee: NullableMoneyRange;
  breakdown: FactorBreakdown;
  /** Unrounded internal totals; callers should use fee. */
  rawTotals?: { low: number; mid: number; high: number };
};

export type EstimateResult = {
  fee: NullableMoneyRange;
  turnaround: { lowDays: number | null; highDays: number | null; label: string };
  coverage: Coverage;
  eligibilityLanguage: string;
  assumptions: string[];
  missingItems: string[];
  perDisciplinePrices: DisciplineEstimate[];
  factorBreakdown: FactorBreakdown | null;
  /** Alias useful to callers that use the shorter name. */
  breakdown: FactorBreakdown | null;
  ruleVersion: string;
  inputSnapshot: Readonly<EstimateIntake>;
  rushAlert: boolean;
  highValue: boolean;
  servicePath: ServicePath;
  bindingPrice: boolean;
};