import assert from "node:assert/strict";
import test from "node:test";
import { getNextPhoenixDailyRunnerDeadline } from "./outreachDailyProcessScheduler";

test("schedules exact Phoenix primary and recovery deadlines with same-morning restart recovery", () => {
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(new Date("2026-09-05T14:00:00.000Z")),
    { slot: "2026-09-05T08:00", deadline: new Date("2026-09-05T15:00:00.000Z") },
  );
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(new Date("2026-09-05T15:05:00.000Z")),
    { slot: "2026-09-05T08:00", deadline: new Date("2026-09-05T15:05:00.000Z") },
  );
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(
      new Date("2026-09-05T15:12:00.000Z"),
      "2026-09-05T08:00",
    ),
    { slot: "2026-09-05T08:30", deadline: new Date("2026-09-05T15:30:00.000Z") },
  );
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(new Date("2026-09-05T15:35:00.000Z")),
    { slot: "2026-09-05T08:30", deadline: new Date("2026-09-05T15:35:00.000Z") },
  );
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(new Date("2026-09-05T16:05:00.000Z")),
    { slot: "2026-09-06T08:00", deadline: new Date("2026-09-06T15:00:00.000Z") },
  );
});