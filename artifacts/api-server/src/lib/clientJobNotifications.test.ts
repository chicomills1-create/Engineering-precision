import assert from "node:assert/strict";
import test from "node:test";
import type { ClientJob, ClientJobDocument } from "@workspace/db";
import {
  buildEstimateProposalNotificationContent,
  buildClientJobNotificationPreview,
  buildClientJobStatusNotificationPayload,
  buildClientJobNotificationHtml,
  isClientNotificationStatus,
} from "./clientJobNotifications";
import { verifyDownloadToken } from "./downloadToken";
import { estimateFailureLogContext } from "./estimateProposalHelpers";

const job: ClientJob = {
  archivedAt: null,
  monthlyEmailOptIn: false,
  monthlyEmailOptedAt: null,
  id: 42,
  companyId: 7,
  membershipId: 9,
  submitterName: "Taylor Client",
  submitterEmail: "taylor@example.com",
  submitterPhone: "555-0100",
  companyName: "Example Development",
  projectType: "Tenant improvement",
  projectLocation: "Phoenix, AZ",
  scope: "Confidential scope details",
  timeline: "Next quarter",
  budgetContext: "Internal budget context",
  services: "Structural engineering",
  status: "reviewing",
  internalNotes: "Internal-only coordination note",
  statusNotificationStatus: null,
  statusNotificationError: null,
  statusNotificationSentAt: null,
  createdAt: new Date("2026-08-01T12:00:00Z"),
  updatedAt: new Date("2026-08-01T12:00:00Z"),
};

test("only client-facing review statuses can send notifications", () => {
  assert.equal(isClientNotificationStatus("needs_information"), true);
  assert.equal(isClientNotificationStatus("quoted"), true);
  assert.equal(isClientNotificationStatus("reviewing"), false);
  assert.equal(isClientNotificationStatus("accepted"), false);
});

test("needs-information preview is client-safe and returns to the signed-in portal", () => {
  const preview = buildClientJobNotificationPreview(job, "needs_information");

  assert.equal(preview.recipient, job.submitterEmail);
  assert.match(preview.subject, /needs information/i);
  assert.match(preview.body, /Needs information/);
  assert.match(preview.body, /\/client-portal/);
  assert.equal(preview.body.includes(job.internalNotes!), false);
  assert.equal(preview.body.includes(job.scope), false);
  assert.equal(preview.body.includes(job.budgetContext!), false);
});

test("quoted preview clearly identifies a ready quote", () => {
  const preview = buildClientJobNotificationPreview(job, "quoted");

  assert.match(preview.subject, /quote is ready/i);
  assert.match(preview.body, /Quote ready/);
  assert.match(preview.body, /sign in to your client portal/i);
});

test("client status payload uses configured reply mailbox and branded text-equivalent HTML", () => {
  const preview = buildClientJobNotificationPreview(job, "needs_information");
  const payload = buildClientJobStatusNotificationPayload(
    preview,
    "notifications@apexgrideng.com",
    "replies@apexgrideng.com",
  );

  assert.deepEqual(payload.reply_to, { email: "replies@apexgrideng.com", name: "Apex Grid Engineering" });
  assert.equal(payload.content[0]?.type, "text/plain");
  assert.equal(payload.content[1]?.type, "text/html");
  const html = buildClientJobNotificationHtml(preview);
  assert.match(html, /Needs information/);
  assert.match(html, /client-portal/);
  assert.doesNotMatch(html, /Unsubscribe/);
});

test("estimate handoff notification contains routing signals, saved breakdown, and every signed document link", () => {
  process.env.SESSION_SECRET = "estimate-notification-test-secret";
  process.env.PUBLIC_SITE_URL = "https://example.test";
  const estimateJob = {
    ...job,
    estimateId: "EST-ABCDEFGHJKLMNPQR",
    routingMode: "partner",
    servicePath: "partner-routing",
    schedule: "rush",
    estimateSnapshot: {
      partnerProfile: {
        states: ["CA", "AZ"],
        disciplines: ["structural"],
        volume: "Monthly recurring work",
        workflow: "Coordinated intake",
      },
      result: {
        coverage: "partner-route",
        highValue: true,
        eligibilityLanguage: "Partner routing lead; no binding price.",
        fee: { low: null, mid: null, high: null },
        turnaround: { label: "To be confirmed" },
        factorBreakdown: { complexity: { combined: { low: 1, mid: 1, high: 1 } } },
        perDisciplinePrices: [{ discipline: "structural", fee: { low: 100, mid: 150, high: 200 } }],
        assumptions: ["No binding price is provided for this intake."],
        missingItems: [],
      },
    },
  } as ClientJob;
  const documents = [
    { objectPath: "/objects/drawing-a.pdf", name: "drawing-a.pdf" },
    { objectPath: "/objects/model-b.rvt", name: "model-b.rvt" },
  ].map((document, index) => ({
    ...document,
    id: index + 1,
    jobId: job.id,
    createdAt: new Date("2026-01-01T00:00:00Z"),
  })) as ClientJobDocument[];
  const content = buildEstimateProposalNotificationContent(estimateJob, documents);

  assert.match(content.subject, /EST-ABCDEFGHJKLMNPQR/);
  assert.match(content.subject, /PARTNER ROUTE/);
  assert.match(content.subject, /RUSH/);
  assert.match(content.subject, /HIGH VALUE/);
  for (const document of documents) {
    const path = document.objectPath.replace(/^\/objects\//, "");
    const match = content.body.match(new RegExp(`${document.name}: https://example\\.test/api/storage/objects/${path}\\?token=([^\\s]+)`));
    assert.ok(match, `missing signed link for ${document.name}`);
    assert.equal(verifyDownloadToken(document.objectPath, decodeURIComponent(match[1]!)), true);
  }
  assert.match(content.body, /Factor breakdown:/);
  assert.match(content.body, /Per-discipline prices:.*structural/);
  assert.match(content.body, /Assumptions:/);
});

test("estimate failure log context contains only request/estimate IDs and category", () => {
  const context = estimateFailureLogContext("req-123", "EST-ABCDEFGHJKLMNPQR", "database");
  assert.deepEqual(context, {
    requestId: "req-123",
    estimateId: "EST-ABCDEFGHJKLMNPQR",
    errorCategory: "database",
  });
  assert.deepEqual(Object.keys(context).sort(), ["errorCategory", "estimateId", "requestId"]);
  assert.equal("email" in context, false);
  assert.equal("phone" in context, false);
  assert.equal("scope" in context, false);
  assert.equal("name" in context, false);
  assert.equal("snapshot" in context, false);
});