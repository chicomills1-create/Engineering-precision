import {
  DISCIPLINES,
  PROJECT_TYPES,
  SIZE_BANDS,
  type Discipline,
  type ProjectType,
  type SizeBand,
} from "./types.js";

/**
 * This is intentionally a governed placeholder configuration. It is not an
 * authoritative quote, contract, or promise of permit approval. Replacing a
 * value requires a new rule version and a registry entry.
 */
export const RULE_VERSION = "phase9-r1-placeholder-v1" as const;
export const ESTIMATE_RULE_VERSION = RULE_VERSION;
export const PLACEHOLDER_AUTHORITY = "placeholder-non-authoritative" as const;

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  }
  return value;
}

const DISCIPLINE_START: Record<Discipline, number> = {
  civil: 4200,
  structural: 4800,
  mechanical: 3900,
  electrical: 3600,
  plumbing: 3300,
  "fire-protection": 3700,
  energy: 2800,
};
const PROJECT_FACTOR: Record<ProjectType, number> = {
  "New commercial building (office/retail/mixed-use)": 1.3,
  "Tenant improvement / remodel": 1,
  "Industrial / warehouse": 1.15,
  "Restaurant / food service": 1.2,
  "Healthcare / medical": 1.45,
  "ADU / residential": 0.8,
  "PE stamp & plan review only": 0.65,
  "Title 24 energy compliance only": 0.55,
  "Plan-check corrections": 0.7,
};
const SIZE_FACTOR: Record<SizeBand, number> = {
  small: 0.7,
  medium: 1,
  large: 1.45,
  "very-large": 2.1,
};

type RateCard = {
  readonly [discipline in Discipline]: {
    readonly [projectType in ProjectType]: {
      readonly [sizeBand in SizeBand]: number;
    };
  };
};

function createRateCard(): RateCard {
  return Object.fromEntries(
    DISCIPLINES.map((discipline) => [
      discipline,
      Object.fromEntries(
        PROJECT_TYPES.map((projectType) => [
          projectType,
          Object.fromEntries(
            SIZE_BANDS.map((sizeBand) => [
              sizeBand,
              DISCIPLINE_START[discipline] * PROJECT_FACTOR[projectType] * SIZE_FACTOR[sizeBand],
            ]),
          ),
        ]),
      ),
    ]),
  ) as RateCard;
}

export const ESTIMATE_PRICING_CONFIG = deepFreeze({
  ruleVersion: RULE_VERSION,
  authority: PLACEHOLDER_AUTHORITY,
  isPlaceholder: true,
  isAuthoritative: false,
  notice:
    "Placeholder planning ranges only. A licensed PE controls any sealing decision; this estimate never implies permit approval.",
  baseRateCard: createRateCard(),
  complexityFactors: Object.freeze({
    low: 0.95,
    medium: 1,
    high: 1.2,
    // Unknown is never below the governed known-high factor (1.2).
    unknown: Object.freeze({ low: 1.2, high: 1.3 }),
  }),
  unknownWidening: Object.freeze({ low: 1.2, mid: 1.2, high: 1.2 }),
  scheduleMultipliers: Object.freeze({ standard: 1, rush: 1.25, emergency: 1.6 }),
  serviceFees: Object.freeze({
    calculations: 850,
    siteVisit: 650,
    corrections: 500,
    coordination: 400,
    reviewScope: 900,
  }),
  stamp: Object.freeze({
    rateLow: 0.1,
    rateMid: 0.12,
    rateHigh: 0.2,
    rate: 0.12,
    minimum: 500,
    maximum: 12000,
    min: 500,
    max: 12000,
  }),
  turnaroundDays: Object.freeze({
    standard: Object.freeze({ low: 10, high: 20 }),
    rush: Object.freeze({ low: 5, high: 10 }),
    emergency: Object.freeze({ low: 2, high: 5 }),
  }),
  highValueThreshold: 25000,
  minimumFee: 1,
  supportedCalculationTypes: [
    "design",
    "load",
    "code-compliance",
    "as-built",
    "permit-set",
    "other",
  ] as const,
} as const);

// Keep prior configurations in the registry so a saved estimate can always
// be recalculated with the rules that produced it.
export const PRICING_CONFIG_REGISTRY: Readonly<Record<string, typeof ESTIMATE_PRICING_CONFIG>> =
  Object.freeze({
    "phase9-r1-placeholder-v0": ESTIMATE_PRICING_CONFIG,
    [RULE_VERSION]: ESTIMATE_PRICING_CONFIG,
  });

export function getPricingConfig(version: string = RULE_VERSION): typeof ESTIMATE_PRICING_CONFIG {
  const config = PRICING_CONFIG_REGISTRY[version];
  if (!config) throw new Error(`Unknown estimate pricing rule version: ${version}`);
  return config;
}

export const PRICING_CONFIG = ESTIMATE_PRICING_CONFIG;
export const RATE_CARD = ESTIMATE_PRICING_CONFIG.baseRateCard;