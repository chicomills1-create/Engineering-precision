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

test("personal contacts are prioritized before public inboxes", () => {
  const ordered = prioritizePreparationCandidates([
    { id: 1, companyName: "General Co", website: "https://general.example", contactEmail: "info@general.example", contactName: "Info", state: "AZ", fitScore: 100, needScore: 100 },
    { id: 2, companyName: "Personal Co", website: "https://personal.example", contactEmail: "alex@personal.example", contactName: "Alex Rivera", state: "CA", fitScore: 60, needScore: 60 },
  ]);
  assert.deepEqual(ordered.map((candidate) => candidate.id), [2, 1]);
});

test("preparation selection caps at 150 and de-dupes email and company domain", () => {
  const candidates = Array.from({ length: 152 }, (_, index) => ({
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
  assert.equal(selectUniquePreparationCandidates(candidates).length, 150);
});

test("shortfall and stale-run helpers support honest retry-safe runs", () => {
  assert.equal(getPreparationShortfall(149), 1);
  assert.equal(getPreparationShortfall(150), 0);
  const now = new Date("2026-08-29T15:00:00.000Z");
  assert.equal(isPreparationRunStale(new Date(now.getTime() - 30 * 60_000), now), true);
  assert.equal(isPreparationRunStale(new Date(now.getTime() - 29 * 60_000), now), false);
});

test("existing manually scheduled messages consume the same 150-message window", () => {
  assert.equal(getPreparationRemainingCapacity(100, 20), 30);
  assert.equal(getPreparationRemainingCapacity(0, 150), 0);
  assert.throws(() => getPreparationRemainingCapacity(149, 2), /exceeds the 150-message ceiling/);
});