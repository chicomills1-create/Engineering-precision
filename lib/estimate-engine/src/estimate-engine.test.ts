import assert from "node:assert/strict";
import test from "node:test";

import {
  ANALYTICS_EVENT_NAMES,
  DISCIPLINES,
  ESTIMATE_PRICING_CONFIG,
  PROJECT_TYPES,
  RULE_VERSION,
  buildUploadFailedEvent,
  calculateEstimate,
  createPdfSummaryModel,
  generatePdfSummaryText,
} from "./index.js";
import type { EstimateIntake } from "./types.js";

const base: EstimateIntake = {
  state: "CA",
  disciplines: ["structural"],
  projectType: PROJECT_TYPES[0],
  sheetCount: 24,
  calculationType: "design",
  uploadMetadata: { status: "uploaded", fileCount: 2 },
  requiredByDate: "2030-01-01",
  siteVisit: false,
  existing: "medium",
  floors: "medium",
  system: "medium",
  documentation: "medium",
  jurisdiction: "medium",
  schedule: "standard",
  corrections: false,
  coordination: false,
};

function estimate(overrides: Partial<EstimateIntake> = {}) {
  return calculateEstimate({ ...base, ...overrides });
}

test("preserves all nine exact project labels", () => {
  assert.deepEqual(PROJECT_TYPES, [
    "New commercial building (office/retail/mixed-use)",
    "Tenant improvement / remodel",
    "Industrial / warehouse",
    "Restaurant / food service",
    "Healthcare / medical",
    "ADU / residential",
    "PE stamp & plan review only",
    "Title 24 energy compliance only",
    "Plan-check corrections",
  ]);
});

test("prices all three direct paths with positive final fees", () => {
  for (const servicePath of ["pe-review-sealing", "engineering-calculations", "calculations-stamped-drawings"] as const) {
    const result = estimate({ servicePath });
    assert.equal(result.servicePath, servicePath);
    assert.ok(result.fee.low && result.fee.mid && result.fee.high);
    assert.ok(result.fee.low <= result.fee.mid && result.fee.mid <= result.fee.high);
  }
});

test("prices standard, rush, and uncertain fixtures for every discipline", () => {
  for (const discipline of DISCIPLINES) {
    const standard = estimate({ disciplines: [discipline], schedule: "standard" });
    const rush = estimate({ disciplines: [discipline], schedule: "rush" });
    const uncertain = estimate({
      disciplines: [discipline],
      schedule: "standard",
      uncertain: true,
      unknownInputs: ["documentation"],
      documentation: "unknown",
    });
    assert.equal(standard.coverage, "eligible");
    assert.equal(rush.rushAlert, true);
    assert.ok((rush.fee.mid ?? 0) > (standard.fee.mid ?? 0));
    assert.equal(uncertain.coverage, "review-required");
    assert.ok((uncertain.fee.low ?? 0) >= (standard.fee.low ?? 0));
    assert.ok((uncertain.fee.high ?? 0) >= (standard.fee.high ?? 0));
  }
});

test("supports standard, rush, emergency, multi-discipline, and high-value ranges", () => {
  const standard = estimate();
  const rush = estimate({ schedule: "rush" });
  const emergency = estimate({ schedule: "emergency" });
  const multi = estimate({ disciplines: ["civil", "structural", "electrical"] });
  const highValue = estimate({ disciplines: ["civil", "structural", "mechanical", "electrical", "plumbing", "fire-protection", "energy"], sizeBand: "very-large", sheetCount: 1000 });
  assert.ok(rush.fee.mid > standard.fee.mid);
  assert.ok(emergency.fee.mid > rush.fee.mid);
  assert.ok((multi.fee.mid ?? 0) > (standard.fee.mid ?? 0));
  assert.ok((highValue.fee.mid ?? 0) > ESTIMATE_PRICING_CONFIG.highValueThreshold);
  assert.equal(highValue.highValue, true);
  assert.equal(rush.rushAlert, true);
});

test("routes partner leads without a binding price", () => {
  const result = calculateEstimate({ routingMode: "partner" });
  assert.equal(result.coverage, "partner-route");
  assert.match(result.eligibilityLanguage, /routes to operations/i);
  assert.match(result.eligibilityLanguage, /no promise/i);
  assert.deepEqual(result.fee, { low: null, mid: null, high: null });
  assert.equal(result.bindingPrice, false);
});

test("partner routing does not require direct-estimate fields", () => {
  const result = calculateEstimate({ routingMode: "partner", partnerRoute: true });
  assert.equal(result.coverage, "partner-route");
  assert.equal(result.servicePath, "partner-routing");
  assert.deepEqual(result.fee, { low: null, mid: null, high: null });
});

test("does not price Alaska or unsupported combinations", () => {
  const alaska = estimate({ state: "AK" });
  assert.equal(alaska.coverage, "unavailable");
  assert.match(alaska.eligibilityLanguage, /This scope is not currently offered/i);
  assert.deepEqual(alaska.fee, { low: null, mid: null, high: null });
  const unsupported = calculateEstimate({ ...base, calculationType: "not-supported" as never });
  assert.equal(unsupported.coverage, "unavailable");
  assert.deepEqual(unsupported.fee, { low: null, mid: null, high: null });
});

test("marks missing documents and failed uploads as review-required", () => {
  const missing = estimate({ uploadMetadata: undefined, requiredByDate: undefined });
  assert.equal(missing.coverage, "review-required");
  assert.ok(missing.missingItems.length > 0);
  const failed = estimate({ uploadMetadata: { status: "failed", failureCode: "too-large" } });
  assert.equal(failed.coverage, "review-required");
  assert.ok(failed.missingItems.some((item) => /upload/i.test(item)));
  assert.equal(buildUploadFailedEvent("too-large").payload.failureCode, "too-large");
});

test("unknown and uncertain inputs widen but never lower a known estimate", () => {
  const known = estimate();
  const unknown = estimate({ existing: "unknown", uncertain: true, unknownInputs: ["existing"] });
  assert.ok((unknown.fee.low ?? 0) >= (known.fee.low ?? 0));
  assert.ok((unknown.fee.high ?? 0) >= (known.fee.high ?? 0));
  assert.equal(unknown.coverage, "review-required");
  const uncertainOnly = estimate({ uncertain: true });
  const knownHigh = estimate({ existing: "high" });
  assert.ok((uncertainOnly.fee.mid ?? 0) >= (knownHigh.fee.mid ?? 0));
});

test("unknown is governed above every known factor level for every complexity dimension", () => {
  const dimensions = ["existing", "floors", "system", "documentation", "jurisdiction"] as const;
  for (const dimension of dimensions) {
    const known = (["low", "medium", "high"] as const).map((level) => estimate({ [dimension]: level }));
    const unknown = estimate({ [dimension]: "unknown" });
    for (const knownResult of known) {
      assert.ok((unknown.fee.low ?? 0) >= (knownResult.fee.low ?? 0), `${dimension}: unknown low lowered`);
      assert.ok((unknown.fee.mid ?? 0) >= (knownResult.fee.mid ?? 0), `${dimension}: unknown mid lowered`);
      assert.ok((unknown.fee.high ?? 0) >= (knownResult.fee.high ?? 0), `${dimension}: unknown high lowered`);
    }
    assert.equal(unknown.coverage, "review-required");
  }
});

test("stamp configuration exposes the required band and PE language", () => {
  assert.equal(ESTIMATE_PRICING_CONFIG.stamp.rateLow, 0.1);
  assert.equal(ESTIMATE_PRICING_CONFIG.stamp.rateMid, 0.12);
  assert.equal(ESTIMATE_PRICING_CONFIG.stamp.rateHigh, 0.2);
  const stamped = estimate({ servicePath: "calculations-stamped-drawings" });
  assert.match(stamped.eligibilityLanguage, /licensed PE controls/i);
  assert.match(stamped.eligibilityLanguage, /permit approval/i);
});

test("old rule version, back/edit recalculation, and PDF summary remain reproducible", () => {
  const old = estimate();
  const oldAgain = calculateEstimate({ ...base }, { ruleVersion: "phase9-r1-placeholder-v0" });
  const oldThird = calculateEstimate({ ...base }, "phase9-r1-placeholder-v0");
  assert.deepEqual(old.fee, oldAgain.fee);
  assert.deepEqual(oldAgain.fee, oldThird.fee);
  const edited = estimate({ schedule: "rush" });
  assert.notDeepEqual(old.fee, edited.fee);
  assert.deepEqual(old.fee, estimate().fee);
  const model = createPdfSummaryModel(old);
  assert.deepEqual(model.fee, old.fee);
  const text = generatePdfSummaryText(old);
  const renderedMid = old.fee.mid.toLocaleString("en-US");
  assert.match(text, new RegExp(renderedMid.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal(old.ruleVersion, RULE_VERSION);
});

test("analytics event names are PII-free", () => {
  assert.deepEqual(ANALYTICS_EVENT_NAMES, [
    "started", "path-selected", "step-completed", "result-viewed",
    "pdf-downloaded", "proposal-submitted", "partner-submitted", "upload-failed",
  ]);
});