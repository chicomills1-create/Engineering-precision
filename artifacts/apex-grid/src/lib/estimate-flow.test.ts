import assert from "node:assert/strict";
import test from "node:test";
import {
  assembleProposalPayload,
  buildPartnerRoutingIntake,
  classifySchedule,
  defaultAttribution,
  dispatchEstimateAnalytics,
  resultCta,
  validateEstimateFile,
  validateDirectStep,
  validatePartnerStep,
} from "./estimate-flow";
import type { ProposalResponse } from "./estimate-api";

test("classifies standard, rush, and review-required dates", () => {
  const today = new Date("2025-01-01T12:00:00");
  assert.equal(classifySchedule("2025-01-20", today).label, "standard");
  assert.equal(classifySchedule("2025-01-08", today).label, "rush");
  assert.equal(classifySchedule("2025-01-02", today).label, "review-required");
  assert.equal(classifySchedule(undefined, today).reviewRequired, true);
});

test("validation preserves answers while navigating", () => {
  const intake = { state: "AZ", disciplines: ["civil" as const], sheetCount: 12, calculationType: "design" as const, projectType: "ADU / residential" as const };
  assert.equal(validateDirectStep(1, intake), null);
  assert.equal(validateDirectStep(2, intake), null);
  assert.equal(validateDirectStep(7, intake), "Select a required-by date, or choose date unknown.");
  assert.equal(intake.state, "AZ");
});

test("partner qualification requires each of its four answers", () => {
  assert.match(validatePartnerStep(1, {}) || "", /volume/i);
  assert.match(validatePartnerStep(2, { volume: "Monthly recurring work" }) || "", /state/i);
  assert.match(validatePartnerStep(3, { volume: "Monthly recurring work", states: ["AZ"], disciplines: ["civil"] }) || "", /workflow/i);
  assert.equal(validatePartnerStep(4, { volume: "Monthly recurring work", states: ["AZ"], disciplines: ["civil"], workflow: "Discuss both", agreement: true }), null);
});

test("assembles the proposal contract and attribution without changing answers", () => {
  const intake = { state: "AZ", disciplines: ["civil" as const], projectType: "ADU / residential" as const, calculationType: "design" as const, schedule: "standard" as const };
  const payload = assembleProposalPayload({
    ruleVersion: "rules-test", intake, contact: { name: "A", email: "a@example.com", phone: "555" },
    city: "Mesa", attribution: defaultAttribution({ pathname: "/estimate", search: "?utm_source=test&utm_campaign=one" }),
    documents: [{ path: "/objects/a", name: "plans.pdf", claimToken: "claim-token-with-required-length" }],
  });
  assert.equal(payload.intake.state, "AZ");
  assert.equal(payload.attribution.source, "test");
  assert.equal(payload.attribution.landingPath, "/estimate?utm_source=test&utm_campaign=one");
  assert.equal(payload.documents[0].path, "/objects/a");
});

test("partner payload uses only partner-routing intake facts", () => {
  const intake = buildPartnerRoutingIntake();
  const payload = assembleProposalPayload({
    ruleVersion: "rules-test", intake, contact: { name: "A", email: "a@example.com", phone: "555" },
    city: "Mesa", attribution: defaultAttribution({ pathname: "/estimate", search: "" }), documents: [],
    partnerProfile: { volume: "Monthly recurring work", states: ["AZ"], disciplines: ["civil"], workflow: "Discuss both", agreement: true },
  });
  assert.equal(payload.intake.routingMode, "partner");
  assert.equal("projectType" in payload.intake, false);
  assert.equal("sheetCount" in payload.intake, false);
  assert.equal(payload.partnerProfile?.states[0], "AZ");
});

test("upload checks match server size and extension rules", () => {
  assert.equal(validateEstimateFile({ name: "plans.PDF", size: 1 }), null);
  assert.match(validateEstimateFile({ name: "plans.exe", size: 1 }) || "", /type/i);
  assert.match(validateEstimateFile({ name: "plans.pdf", size: 20 * 1024 * 1024 + 1 }) || "", /20 MB/i);
  assert.match(validateEstimateFile({ name: "plans.pdf", size: 0 }) || "", /empty/i);
});

test("proposal response typing keeps the numeric proposal ID contract", () => {
  const response: ProposalResponse = {
    estimateId: "EST-TEST",
    proposalId: 42,
    pricing: {} as ProposalResponse["pricing"],
    pdfUrl: "/api/estimates/EST-TEST/pdf",
    notificationQueued: true,
  };
  assert.equal(typeof response.proposalId, "number");
});

test("result CTA copy differentiates direct and partner review", () => {
  assert.equal(resultCta(false), "Submit for engineer review");
  assert.equal(resultCta(true), "Request Formal Proposal");
});

test("analytics dispatcher only emits PII-free event payloads", () => {
  const events: CustomEvent[] = [];
  const previousWindow = globalThis.window;
  Object.defineProperty(globalThis, "window", { configurable: true, value: { dispatchEvent: (event: CustomEvent) => events.push(event) } });
  dispatchEstimateAnalytics({ name: "proposal-submitted", payload: { email: "secret@example.com", path: "engineering-calculations" } });
  assert.equal((events[0].detail.payload as Record<string, unknown>).email, undefined);
  assert.equal((events[0].detail.payload as Record<string, unknown>).path, "engineering-calculations");
  Object.defineProperty(globalThis, "window", { configurable: true, value: previousWindow });
});