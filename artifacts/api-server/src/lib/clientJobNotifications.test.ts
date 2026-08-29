import assert from "node:assert/strict";
import test from "node:test";
import type { ClientJob } from "@workspace/db";
import {
  buildClientJobNotificationPreview,
  buildClientJobStatusNotificationPayload,
  buildClientJobNotificationHtml,
  isClientNotificationStatus,
} from "./clientJobNotifications";

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