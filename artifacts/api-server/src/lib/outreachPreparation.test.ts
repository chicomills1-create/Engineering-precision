import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getNextPhoenixPreparationTarget,
  getPreparationShortfall,
  getPreparationRemainingCapacity,
  getPreparationPersonalizationName,
  getLaneShortfalls,
  isPhoenixPreparationWindowOpen,
  isPreparationRunStale,
  prioritizePreparationCandidates,
  selectUniquePreparationCandidates,
  type PreparationCandidate,
} from "./outreachPreparation";

test("preparation always targets the following Phoenix day at 8 AM", () => {
  const target = getNextPhoenixPreparationTarget(new Date("2026-08-29T14:00:00.000Z"));
  assert.equal(target.targetDate, "2026-08-30");
  assert.equal(target.scheduledAt.toISOString(), "2026-08-30T15:00:00.000Z");
});

test("preparation does not stage the same Phoenix day before 8 AM", () => {
  const now = new Date("2026-08-29T12:00:00.000Z");
  const target = getNextPhoenixPreparationTarget(now);
  assert.equal(target.targetDate, "2026-08-30");
  assert.equal(isPhoenixPreparationWindowOpen(now), false);
  assert.equal(isPhoenixPreparationWindowOpen(new Date("2026-08-29T15:00:00.000Z")), true);
});

test("Arizona contacts are prioritized before California contacts", () => {
  const ordered = prioritizePreparationCandidates([
    { id: 1, companyName: "General Co", website: "https://general.example", contactEmail: "info@general.example", contactName: "Info", contactEvidenceType: "official_publication", state: "AZ", fitScore: 100, needScore: 100 },
    { id: 2, companyName: "Personal Co", website: "https://personal.example", contactEmail: "alex@personal.example", contactName: "Alex Rivera", state: "CA", fitScore: 60, needScore: 60 },
  ]);
  assert.deepEqual(ordered.map((candidate) => candidate.id), [1, 2]);
});

test("personal contacts are prioritized before public inboxes within a state", () => {
  const ordered = prioritizePreparationCandidates([
    { id: 1, companyName: "General Co", website: "https://general.example", contactEmail: "info@general.example", contactName: "Info", contactEvidenceType: "official_publication", state: "AZ", fitScore: 100, needScore: 100 },
    { id: 2, companyName: "Personal Co", website: "https://personal.example", contactEmail: "alex@personal.example", contactName: "Alex Rivera", state: "AZ", fitScore: 60, needScore: 60 },
  ]);
  assert.deepEqual(ordered.map((candidate) => candidate.id), [2, 1]);
});

test("public inbox preparation falls back to the company name without changing named personalization", () => {
  assert.equal(getPreparationPersonalizationName({
    companyName: "Public Company",
    contactEmail: "info@public.example",
    contactName: null,
    contactEvidenceType: "official_publication",
  }), "Public Company");
  assert.equal(getPreparationPersonalizationName({
    companyName: "Named Company",
    contactEmail: "alex@named.example",
    contactName: "Alex Rivera",
    contactEvidenceType: "findymail_verified",
  }), "Alex Rivera");
});

test("preparation reserves 100 Named and 100 Public regular slots and de-dupes identities", () => {
  const candidates: PreparationCandidate[] = Array.from({ length: 202 }, (_, index) => ({
    id: index,
    companyName: `Company ${index}`,
    website: `https://company-${index}.example`,
    contactEmail: `person-${index}@company-${index}.example`,
    contactName: `Person ${index}`,
    state: "AZ",
    fitScore: 80,
    needScore: 80,
  }));
  candidates.push({
    id: 999, companyName: "Duplicate email", website: "https://other.example",
    contactEmail: "person-0@company-0.example", contactName: "Other",
    state: "AZ", fitScore: 80, needScore: 80,
  });
  candidates.push(...Array.from({ length: 55 }, (_, index) => ({
    id: 2_000 + index,
    companyName: `Public Company ${index}`,
    website: `https://public-company-${index}.example`,
    contactEmail: `info@public-company-${index}.example`,
    contactName: "Public Office",
    contactEvidenceType: "official_publication" as const,
    state: "AZ",
    fitScore: 80,
    needScore: 80,
  })));
  const selected = selectUniquePreparationCandidates(candidates);
  assert.equal(selected.length, 155);
  assert.equal(selected.filter((candidate) =>
    candidate.contactEvidenceType === "official_publication"
  ).length, 55);
  assert.equal(selected.filter((candidate) =>
    candidate.contactEvidenceType !== "official_publication"
  ).length, 100);
});

test("shortfall and stale-run helpers support honest retry-safe runs", () => {
  assert.equal(getPreparationShortfall(199, 200), 1);
  assert.equal(getPreparationShortfall(200, 200), 0);
  const now = new Date("2026-08-29T15:00:00.000Z");
  assert.equal(isPreparationRunStale(new Date(now.getTime() - 20 * 60_000), now), true);
  assert.equal(isPreparationRunStale(new Date(now.getTime() - 19 * 60_000), now), false);
});

test("lane shortfall accounting never borrows an unfinished lane", () => {
  assert.deepEqual(
    getLaneShortfalls(
      { named: 100, public: 94, hotMarket: 100, hotLead: 81 },
      { named: 100, public: 100, hotMarket: 100, hotLead: 100 },
    ),
    { named: 0, public: 6, hotMarket: 0, hotLead: 19, total: 25 },
  );
});

test("existing manually scheduled messages consume the same 200-message regular window", () => {
  assert.equal(getPreparationRemainingCapacity(100, 20, 200), 80);
  assert.equal(getPreparationRemainingCapacity(0, 200, 200), 0);
  assert.throws(() => getPreparationRemainingCapacity(199, 2, 200), /exceeds the 200-message ceiling/);
});