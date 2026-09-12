import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getCurrentPhoenixPreparationTarget,
  getNextPhoenixPreparationTarget,
} from "./outreachPreparation";
import {
  isBeforePhoenixEight,
  recoverCurrentPhoenixOutreach,
} from "./outreachPhoenixRecovery";

const beforeEight = new Date("2026-08-29T14:59:59.000Z");
const atEight = new Date("2026-08-29T15:00:00.000Z");

test("staging recovery targets today's Phoenix 08:00 window before the cutoff", () => {
  assert.equal(isBeforePhoenixEight(beforeEight), true);
  assert.deepEqual(getCurrentPhoenixPreparationTarget(beforeEight), {
    targetDate: "2026-08-29",
    scheduledAt: new Date("2026-08-29T15:00:00.000Z"),
  });
});

test("recovery refuses the current day at or after 08:00 Phoenix", async () => {
  const result = await recoverCurrentPhoenixOutreach({
    now: atEight,
    enabled: true,
  });
  assert.equal(result.state, "refused");
  assert.equal(result.targetDate, "2026-08-29");
});

test("ordinary preparation retains its following-day target", () => {
  const target = getNextPhoenixPreparationTarget(beforeEight);
  assert.equal(target.targetDate, "2026-08-30");
  assert.equal(target.scheduledAt.toISOString(), "2026-08-30T15:00:00.000Z");
});