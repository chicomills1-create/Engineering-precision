import assert from "node:assert/strict";
import test from "node:test";
import { getNextPhoenixDailyRunnerDeadline } from "./outreachDailyProcessScheduler";

test("schedules exact Phoenix primary and recovery deadlines with same-evening restart recovery", () => {
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(new Date("2026-09-05T14:00:00.000Z")),
    { slot: "2026-09-05T20:00", deadline: new Date("2026-09-06T03:00:00.000Z") },
  );
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(new Date("2026-09-06T03:05:00.000Z")),
    { slot: "2026-09-05T20:00", deadline: new Date("2026-09-06T03:05:00.000Z") },
  );
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(
      new Date("2026-09-06T03:12:00.000Z"),
      "2026-09-05T20:00",
    ),
    { slot: "2026-09-05T20:30", deadline: new Date("2026-09-06T03:30:00.000Z") },
  );
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(new Date("2026-09-06T03:35:00.000Z")),
    { slot: "2026-09-05T20:30", deadline: new Date("2026-09-06T03:35:00.000Z") },
  );
  assert.deepEqual(
    getNextPhoenixDailyRunnerDeadline(new Date("2026-09-06T04:05:00.000Z")),
    { slot: "2026-09-06T20:00", deadline: new Date("2026-09-07T03:00:00.000Z") },
  );
});
