import assert from "node:assert/strict";
import test from "node:test";
import { buildOutreachHotLeads, prioritizeHotLeadCandidates } from "./outreachHotLeads";

test("hot leads deduplicate persisted engagement events and rank clicks before opens", () => {
  const leads = buildOutreachHotLeads([
    { prospectId: 2, companyName: "Opened Co", contactName: null, contactEmail: "open@example.com", city: "Phoenix", state: "AZ", campaignName: "Spring", eventId: 21, eventType: "open", occurredAt: new Date("2025-01-03T12:00:00Z") },
    { prospectId: 1, companyName: "Clicked Co", contactName: "Avery", contactEmail: "click@example.com", city: "Mesa", state: "AZ", campaignName: "Spring", eventId: 11, eventType: "open", occurredAt: new Date("2025-01-01T12:00:00Z") },
    { prospectId: 1, companyName: "Clicked Co", contactName: "Avery", contactEmail: "click@example.com", city: "Mesa", state: "AZ", campaignName: "Spring", eventId: 12, eventType: "click", occurredAt: new Date("2025-01-02T12:00:00Z") },
    { prospectId: 1, companyName: "Clicked Co", contactName: "Avery", contactEmail: "click@example.com", city: "Mesa", state: "AZ", campaignName: "Spring", eventId: 12, eventType: "click", occurredAt: new Date("2025-01-02T12:00:00Z") },
  ]);

  assert.equal(leads.length, 2);
  assert.deepEqual(leads.map((lead) => lead.prospectId), [1, 2]);
  assert.deepEqual(leads[0], {
    prospectId: 1,
    companyName: "Clicked Co",
    contactName: "Avery",
    contactEmail: "click@example.com",
    location: "Mesa, AZ",
    campaignName: "Spring",
    openCount: 1,
    clickCount: 1,
    firstEngagedAt: "2025-01-01T12:00:00.000Z",
    latestEngagedAt: "2025-01-02T12:00:00.000Z",
    qualification: "clicked",
  });
  assert.equal(leads[1]?.qualification, "opened");
});

test("September hot-lead preparation prioritizes newest records before strength", () => {
  const base = {
    website: null,
    contactEmail: "lead@example.com",
    contactName: "Lead",
    contactTitle: "Principal",
    state: "AZ",
    fitScore: 80,
    needScore: 80,
    leadScore: 10,
    leadStatus: "hot",
  } as const;
  const ordered = prioritizeHotLeadCandidates([
    { ...base, id: 1, companyName: "Older", createdAt: new Date("2026-09-02T12:00:00Z") },
    { ...base, id: 2, companyName: "Newest", leadScore: 1, createdAt: new Date("2026-09-05T12:00:00Z") },
  ]);
  assert.deepEqual(ordered.map((lead) => lead.id), [2, 1]);
});