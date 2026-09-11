import assert from "node:assert/strict";
import test from "node:test";
import { cityEvidenceSlot } from "./cityEvidenceScheduler";

test("does not claim the week before Monday 09:00 Phoenix", () => {
  assert.equal(cityEvidenceSlot(new Date("2026-09-14T15:59:59.000Z")), null);
});

test("uses Monday's date as the durable slot after the deadline", () => {
  assert.equal(cityEvidenceSlot(new Date("2026-09-20T23:59:59.000Z")), "2026-09-14");
});