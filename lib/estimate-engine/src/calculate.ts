import {
  DISCIPLINES,
  PROJECT_TYPES,
  SERVICE_PATHS,
  SIZE_BANDS,
  type ComplexityInput,
  type Discipline,
  type EstimateIntake,
  type FactorBreakdown,
  type ServicePath,
  type SizeBand,
  type EstimateResult,
  type DisciplineEstimate,
} from "./types.js";
import {
  ESTIMATE_PRICING_CONFIG,
  getPricingConfig,
  RULE_VERSION,
} from "./config.js";

type CalculateOptions = { ruleVersion?: string; version?: string };

const US_STATES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV",
  "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN",
  "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
]);

function moneyNull(): { low: null; mid: null; high: null } {
  return { low: null, mid: null, high: null };
}

function snapshot(input: EstimateIntake): Readonly<EstimateIntake> {
  return JSON.parse(JSON.stringify(input)) as Readonly<EstimateIntake>;
}

function pathFor(input: EstimateIntake): ServicePath {
  if (input.routingMode === "partner" || input.partnerRoute) return "partner-routing";
  const requested = input.servicePath ?? input.path;
  return requested && SERVICE_PATHS.includes(requested) ? requested : "engineering-calculations";
}

function disciplinesFor(input: EstimateIntake): Discipline[] {
  const values = input.disciplines?.length ? input.disciplines : input.discipline ? [input.discipline] : [];
  return [...new Set(values)];
}

function sizeFor(input: EstimateIntake): SizeBand | null {
  if (input.sizeBand && SIZE_BANDS.includes(input.sizeBand)) return input.sizeBand;
  const count = input.sheetCount;
  if (typeof count !== "number" || !Number.isFinite(count) || count <= 0) return null;
  if (count <= 10) return "small";
  if (count <= 30) return "medium";
  if (count <= 75) return "large";
  return "very-large";
}

function complexityValue(input: EstimateIntake, name: keyof NonNullable<EstimateIntake["complexity"]>): ComplexityInput {
  return input.complexity?.[name] ?? input[name] ?? "unknown";
}

function factor(level: ComplexityInput, config: typeof ESTIMATE_PRICING_CONFIG["complexityFactors"]) {
  if (typeof level === "number") {
    if (Number.isFinite(level) && level > 0) return { low: level, high: level, known: true };
    return { low: config.unknown.low, high: config.unknown.high, known: false };
  }
  if (level === "unknown") return { low: config.unknown.low, high: config.unknown.high, known: false };
  const value = config[level as "low" | "medium" | "high"];
  return { low: value, high: value, known: true };
}

function roundRange(low: number, mid: number, high: number, minimumFee: number): { low: number; mid: number; high: number } {
  return {
    low: Math.max(minimumFee, Math.round(low)),
    mid: Math.max(minimumFee, Math.round(mid)),
    high: Math.max(minimumFee, Math.round(high)),
  };
}

function noPriceResult(
  input: EstimateIntake,
  servicePath: ServicePath,
  coverage: "partner-route" | "unavailable",
  ruleVersion: string,
  missingItems: string[],
  language: string,
): EstimateResult {
  return {
    fee: moneyNull(),
    turnaround: { lowDays: null, highDays: null, label: "To be confirmed" },
    coverage,
    eligibilityLanguage: language,
    assumptions: ["No binding price is provided for this intake."],
    missingItems,
    perDisciplinePrices: [],
    factorBreakdown: null,
    breakdown: null,
    ruleVersion,
    inputSnapshot: snapshot(input),
    rushAlert: input.schedule === "rush" || input.schedule === "emergency",
    highValue: false,
    servicePath,
    bindingPrice: false,
  };
}

function languageFor(path: ServicePath, coverage: EstimateResult["coverage"]): string {
  if (path === "partner-routing" || coverage === "partner-route") {
    return "This scope routes to operations for partner follow-up; no promise or binding price is supplied, and this never implies permit approval.";
  }
  if (coverage === "review-required") {
    const peLanguage =
      path === "pe-review-sealing" || path === "calculations-stamped-drawings"
        ? " A licensed PE controls whether sealing is appropriate."
        : "";
    return `Coverage depends on project details; review is required.${peLanguage} This never implies permit approval.`;
  }
  if (path === "pe-review-sealing" || path === "calculations-stamped-drawings") {
    return "Apex can likely support this scope. A licensed PE controls whether sealing is appropriate; this never implies permit approval.";
  }
  return "Apex can likely support this scope. This never implies permit approval.";
}

function oneDiscipline(
  discipline: Discipline,
  input: EstimateIntake,
  size: SizeBand,
  config: typeof ESTIMATE_PRICING_CONFIG,
  path: ServicePath,
  unknown: boolean,
): DisciplineEstimate {
  const card = config.baseRateCard[discipline][input.projectType as (typeof PROJECT_TYPES)[number]][size];
  const base = { low: card, mid: card, high: card };
  const names = ["existing", "floors", "system", "documentation", "jurisdiction"] as const;
  const factors = Object.fromEntries(names.map((name) => [name, factor(complexityValue(input, name), config.complexityFactors)])) as Record<
    (typeof names)[number],
    { low: number; high: number; known: boolean }
  >;
  const complexityLow = names.reduce((value, name) => value * factors[name].low, 1);
  const complexityHigh = names.reduce((value, name) => value * factors[name].high, 1);
  const unknownWidening = unknown ? config.unknownWidening : { low: 1, mid: 1, high: 1 };
  const complexity = {
    low: complexityLow * unknownWidening.low,
    mid: ((complexityLow + complexityHigh) / 2) * unknownWidening.mid,
    high: complexityHigh * unknownWidening.high,
  };
  const schedule = config.scheduleMultipliers[input.schedule as keyof typeof config.scheduleMultipliers];
  const calculations = config.serviceFees.calculations;
  const siteVisit = input.siteVisit ? config.serviceFees.siteVisit : 0;
  const corrections = input.corrections ? config.serviceFees.corrections : 0;
  const coordination = input.coordination ? config.serviceFees.coordination : 0;
  const servicesTotal = calculations + siteVisit + corrections + coordination;
  const reviewScope = config.serviceFees.reviewScope;
  const reviewTotal = reviewScope + calculations;
  const preStamp = {
    low: base.low * complexity.low * schedule + servicesTotal + reviewTotal,
    mid: base.mid * complexity.mid * schedule + servicesTotal + reviewTotal,
    high: base.high * complexity.high * schedule + servicesTotal + reviewTotal,
  };
  const stamped = path === "pe-review-sealing" || path === "calculations-stamped-drawings";
  const stamp = stamped
    ? {
        low: Math.min(config.stamp.max, Math.max(config.stamp.min, preStamp.low * config.stamp.rateLow)),
        mid: Math.min(config.stamp.max, Math.max(config.stamp.min, preStamp.mid * config.stamp.rateMid)),
        high: Math.min(config.stamp.max, Math.max(config.stamp.min, preStamp.high * config.stamp.rateHigh)),
      }
    : { low: 0, mid: 0, high: 0 };
  const totals = roundRange(preStamp.low + stamp.low, preStamp.mid + stamp.mid, preStamp.high + stamp.high, config.minimumFee);
  const breakdown: FactorBreakdown = {
    base,
    complexity: {
      existing: factors.existing,
      floors: factors.floors,
      system: factors.system,
      documentation: factors.documentation,
      jurisdiction: factors.jurisdiction,
      unknownWidening,
      combined: complexity,
    },
    schedule: { low: schedule, mid: schedule, high: schedule },
    services: { calculations, siteVisit, corrections, coordination, total: servicesTotal },
    reviewService: { reviewScope, calculations, total: reviewTotal },
    stamp,
    eligibleReviewTotal: preStamp,
    subtotals: totals,
  };
  return {
    discipline,
    fee: totals,
    breakdown,
    rawTotals: {
      low: Math.max(config.minimumFee, preStamp.low + stamp.low),
      mid: Math.max(config.minimumFee, preStamp.mid + stamp.mid),
      high: Math.max(config.minimumFee, preStamp.high + stamp.high),
    },
  };
}

export function calculateEstimate(
  input: EstimateIntake,
  options: CalculateOptions | string = {},
): EstimateResult {
  const ruleVersion = typeof options === "string" ? options : options.ruleVersion ?? options.version ?? RULE_VERSION;
  const config = getPricingConfig(ruleVersion);
  const servicePath = pathFor(input);
  if (servicePath === "partner-routing") {
    return noPriceResult(input, servicePath, "partner-route", ruleVersion, [], languageFor(servicePath, "partner-route"));
  }
  const state = input.state?.toUpperCase() ?? "";
  if (state === "AK") {
    return noPriceResult(input, servicePath, "unavailable", ruleVersion, ["Alaska is currently unavailable for this estimate."], "This scope is not currently offered in Alaska; no price is provided; this never implies permit approval.");
  }
  const disciplines = disciplinesFor(input);
  if (!US_STATES.has(state)) {
    return noPriceResult(input, servicePath, "unavailable", ruleVersion, ["A valid US state is required."], "This scope is not currently offered until a supported jurisdiction is supplied; no price is provided; this never implies permit approval.");
  }
  if (!input.projectType || !PROJECT_TYPES.includes(input.projectType) || !disciplines.length || disciplines.some((discipline) => !DISCIPLINES.includes(discipline))) {
    return noPriceResult(input, servicePath, "unavailable", ruleVersion, ["A supported project type and one or more disciplines are required."], "This scope is not currently offered for this combination; no price is provided; this never implies permit approval.");
  }
  if (!input.calculationType || !config.supportedCalculationTypes.includes(input.calculationType as (typeof config.supportedCalculationTypes)[number])) {
    return noPriceResult(input, servicePath, "unavailable", ruleVersion, ["Calculation type is not supported."], "This scope is not currently offered for this calculation type; no price is provided; this never implies permit approval.");
  }
  const size = sizeFor(input);
  if (!size) {
    return noPriceResult(input, servicePath, "unavailable", ruleVersion, ["Sheet count or size band is required."], "This scope is not currently offered until sheet count or size band is supplied; no price is provided; this never implies permit approval.");
  }
  const complexityNames = ["existing", "floors", "system", "documentation", "jurisdiction"] as const;
  const hasUnknownComplexity = complexityNames.some((name) => complexityValue(input, name) === "unknown");
  const unknown = Boolean(input.uncertain || input.unknownInputs?.length || input.unknownFlags?.length || input.uncertainFlags?.length || hasUnknownComplexity);
  const uploadFailed = input.uploadMetadata?.status === "failed";
  const missingItems: string[] = [];
  if (!input.uploadMetadata || input.uploadMetadata.status === "not-started") missingItems.push("Relevant drawings or documentation");
  if (uploadFailed) missingItems.push("A successful upload (the prior upload failed)");
  if (!input.requiredByDate) missingItems.push("Required-by date");
  const coverage: EstimateResult["coverage"] = unknown || uploadFailed || missingItems.length > 0 ? "review-required" : "eligible";
  const prices = disciplines.map((discipline) => oneDiscipline(discipline, input, size, config, servicePath, unknown));
  const total = prices.reduce(
    (sum, price) => ({
      low: sum.low + (price.rawTotals?.low ?? 0),
      mid: sum.mid + (price.rawTotals?.mid ?? 0),
      high: sum.high + (price.rawTotals?.high ?? 0),
    }),
    { low: 0, mid: 0, high: 0 },
  );
  const fee = roundRange(total.low, total.mid, total.high, config.minimumFee);
  const first = prices[0]?.breakdown ?? null;
  const turnaround = config.turnaroundDays[input.schedule as keyof typeof config.turnaroundDays];
  return {
    fee,
    turnaround: { lowDays: turnaround.low, highDays: turnaround.high, label: `${turnaround.low}-${turnaround.high} business days` },
    coverage,
    eligibilityLanguage: languageFor(servicePath, coverage),
    assumptions: [
      config.notice,
      `Base rate uses the ${size} sheet-size band for each selected discipline.`,
      unknown ? "Unknown or uncertain inputs widen the range and require review; they never lower the estimate." : "Inputs were treated as known for this planning range.",
    ],
    missingItems,
    perDisciplinePrices: prices,
    factorBreakdown: first,
    breakdown: first,
    ruleVersion,
    inputSnapshot: snapshot(input),
    rushAlert: input.schedule === "rush" || input.schedule === "emergency",
    highValue: fee.mid >= config.highValueThreshold,
    servicePath,
    bindingPrice: false,
  };
}

export { ESTIMATE_PRICING_CONFIG, PROJECT_TYPES, DISCIPLINES };
export const calculate = calculateEstimate;