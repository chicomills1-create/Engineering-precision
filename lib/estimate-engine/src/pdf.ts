import type { EstimateResult } from "./types.js";

export type PdfSummaryModel = {
  title: string;
  servicePath: EstimateResult["servicePath"];
  coverage: EstimateResult["coverage"];
  fee: EstimateResult["fee"];
  turnaround: EstimateResult["turnaround"];
  eligibilityLanguage: string;
  assumptions: string[];
  missingItems: string[];
  perDisciplinePrices: Array<{
    discipline: EstimateResult["perDisciplinePrices"][number]["discipline"];
    fee: EstimateResult["perDisciplinePrices"][number]["fee"];
  }>;
  ruleVersion: string;
  highValue: boolean;
};

export function createPdfSummaryModel(result: EstimateResult): PdfSummaryModel {
  return {
    title: "Engineering estimate summary",
    servicePath: result.servicePath,
    coverage: result.coverage,
    fee: { ...result.fee },
    turnaround: { ...result.turnaround },
    eligibilityLanguage: result.eligibilityLanguage,
    assumptions: [...result.assumptions],
    missingItems: [...result.missingItems],
    perDisciplinePrices: result.perDisciplinePrices.map((price) => ({
      discipline: price.discipline,
      fee: { ...price.fee },
    })),
    ruleVersion: result.ruleVersion,
    highValue: result.highValue,
  };
}

function amount(value: number | null): string {
  return value === null ? "Unavailable" : value.toLocaleString("en-US");
}

/** Pure, PDF-safe text; browser rendering can wrap this string without recalculating. */
export function generatePdfSummaryText(result: EstimateResult): string {
  const model = createPdfSummaryModel(result);
  const lines = [
    model.title,
    `Service path: ${model.servicePath}`,
    `Coverage: ${model.coverage}`,
    `Fee range: ${amount(model.fee.low)} - ${amount(model.fee.high)} (mid ${amount(model.fee.mid)})`,
    `Turnaround: ${model.turnaround.label}`,
    `Rule version: ${model.ruleVersion}`,
    model.eligibilityLanguage,
    ...model.perDisciplinePrices.map((price) =>
      `Discipline ${price.discipline}: ${amount(price.fee.low)} - ${amount(price.fee.high)} (mid ${amount(price.fee.mid)})`,
    ),
    ...model.assumptions.map((assumption) => `Assumption: ${assumption}`),
    ...model.missingItems.map((item) => `Missing: ${item}`),
  ];
  return lines.join("\n");
}

export const buildPdfSummary = createPdfSummaryModel;
export const buildPdfSummaryModel = createPdfSummaryModel;