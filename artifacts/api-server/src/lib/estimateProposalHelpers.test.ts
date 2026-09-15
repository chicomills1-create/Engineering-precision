import assert from "node:assert/strict";
import test from "node:test";
import { CreateEstimateProposalResponse } from "@workspace/api-zod";
import { createEstimatePublicId, writeEstimatePdf } from "./estimateProposalHelpers";

test("estimate public IDs are opaque and contract-valid", () => {
  const id = createEstimatePublicId();
  assert.match(id, /^EST-[A-Z2-9]{16}$/);
  assert.equal(id.includes("0"), false);
  assert.equal(id.includes("1"), false);
});

test("deterministic estimate PDF has an application signature and saved summary text", () => {
  const first = writeEstimatePdf("Engineering estimate summary\nFee range: 100 - 200 (mid 150)");
  const second = writeEstimatePdf("Engineering estimate summary\nFee range: 100 - 200 (mid 150)");
  assert.equal(first.subarray(0, 8).toString("ascii"), "%PDF-1.4");
  assert.equal(first.toString("ascii").includes("Engineering estimate summary"), true);
  assert.equal(first.toString("ascii").includes("Fee range: 100 - 200"), true);
  assert.deepEqual(first, second);
});

test("OpenAPI-shaped proposal handoff keeps numeric proposal ID and saved result fields", () => {
  const response = CreateEstimateProposalResponse.parse({
    estimateId: "EST-ABCDEFGHJKLMNPQR",
    proposalId: 42,
    pricing: {
      fee: { low: 100, mid: 150, high: 200 },
      coverage: "eligible",
      ruleVersion: "phase9-r1-placeholder-v1",
    },
    pdfUrl: "/api/estimates/EST-ABCDEFGHJKLMNPQR/pdf",
    notificationQueued: true,
  });
  assert.equal(typeof response.proposalId, "number");
  assert.equal(response.pdfUrl, "/api/estimates/EST-ABCDEFGHJKLMNPQR/pdf");
  assert.equal(response.notificationQueued, true);
  assert.deepEqual(response.pricing.fee, { low: 100, mid: 150, high: 200 });
});