import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getNextPhoenixPreparationTarget,
  getPreparationShortfall,
  getPreparationRemainingCapacity,
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
    { id: 1, companyName: "General Co", website: "https://general.example", contactEmail: "info@general.example", contactName: "Info", state: "AZ", fitScore: 100, needScore: 100 },
    { id: 2, companyName: "Personal Co", website: "https://personal.example", contactEmail: "alex@personal.example", contactName: "Alex Rivera", state: "CA", fitScore: 60, needScore: 60 },
  ]);
  assert.deepEqual(ordered.map((candidate) => candidate.id), [1, 2]);
});

test("personal contacts are prioritized before public inboxes within a state", () => {
  const ordered = prioritizePreparationCandidates([
    { id: 1, companyName: "General Co", website: "https://general.example", contactEmail: "info@general.example", contactName: "Info", state: "AZ", fitScore: 100, needScore: 100 },
    { id: 2, companyName: "Personal Co", website: "https://personal.example", contactEmail: "alex@personal.example", contactName: "Alex Rivera", state: "AZ", fitScore: 60, needScore: 60 },
  ]);
  assert.deepEqual(ordered.map((candidate) => candidate.id), [2, 1]);
});

test("preparation reserves 150 Personal and 50 Public slots and de-dupes identities", () => {
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
  assert.equal(selected.length, 200);
  assert.equal(selected.filter((candidate) =>
    candidate.contactEvidenceType === "official_publication"
  ).length, 50);
  assert.equal(selected.filter((candidate) =>
    candidate.contactEvidenceType !== "official_publication"
  ).length, 150);
});

test("shortfall and stale-run helpers support honest retry-safe runs", () => {
  assert.equal(getPreparationShortfall(199), 1);
  assert.equal(getPreparationShortfall(200), 0);
  const now = new Date("2026-08-29T15:00:00.000Z");
  assert.equal(isPreparationRunStale(new Date(now.getTime() - 30 * 60_000), now), true);
  assert.equal(isPreparationRunStale(new Date(now.getTime() - 29 * 60_000), now), false);
});

test("existing manually scheduled messages consume the same 200-message window", () => {
  assert.equal(getPreparationRemainingCapacity(100, 20), 80);
  assert.equal(getPreparationRemainingCapacity(0, 200), 0);
  assert.throws(() => getPreparationRemainingCapacity(199, 2), /exceeds the 200-message ceiling/);
});