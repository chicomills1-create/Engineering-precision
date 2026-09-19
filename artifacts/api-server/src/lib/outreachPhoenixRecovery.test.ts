import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getCurrentPhoenixPreparationTarget,
  getNextPhoenixPreparationTarget,
} from "./outreachPreparation";
import {
  isBeforePhoenixEightPm,
  recoverCurrentPhoenixOutreach,
} from "./outreachPhoenixRecovery";

const beforeEightPm = new Date("2026-08-30T02:59:59.000Z");
const atEightPm = new Date("2026-08-30T03:00:00.000Z");

test("staging recovery targets today's Phoenix 20:00 window before the cutoff", () => {
  assert.equal(isBeforePhoenixEightPm(beforeEightPm), true);
  assert.deepEqual(getCurrentPhoenixPreparationTarget(beforeEightPm), {
    targetDate: "2026-08-29",
    scheduledAt: new Date("2026-08-30T03:00:00.000Z"),
  });
});

test("recovery refuses the current day at or after 20:00 Phoenix", async () => {
  const result = await recoverCurrentPhoenixOutreach({
    now: atEightPm,
    enabled: true,
  });
  assert.equal(result.state, "refused");
  assert.equal(result.targetDate, "2026-08-29");
});

test("ordinary preparation retains its following-day target", () => {
  const target = getNextPhoenixPreparationTarget(beforeEightPm);
  assert.equal(target.targetDate, "2026-08-30");
  assert.equal(target.scheduledAt.toISOString(), "2026-08-31T03:00:00.000Z");
});