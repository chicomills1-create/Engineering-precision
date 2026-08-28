import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CLIENT_JOB_UPLOAD_RETENTION_DAYS,
  getClientJobUploadCleanupCutoff,
  isAbandonedClientJobUpload,
} from "./clientJobUploadCleanup";

const now = new Date("2026-08-28T12:00:00.000Z");
const cutoff = getClientJobUploadCleanupCutoff(now);

test("uses a documented seven-day retention window", () => {
  assert.equal(CLIENT_JOB_UPLOAD_RETENTION_DAYS, 7);
  assert.equal(cutoff.toISOString(), "2026-08-21T12:00:00.000Z");
});

test("only old uploads with no claim can be abandoned", () => {
  const base = {
    createdAt: new Date("2026-08-20T12:00:00.000Z"),
    claimedAt: null,
    claimedJobId: null,
  };

  assert.equal(isAbandonedClientJobUpload(base, cutoff), true);
  assert.equal(
    isAbandonedClientJobUpload(
      { ...base, createdAt: new Date("2026-08-21T12:00:00.000Z") },
      cutoff,
    ),
    false,
  );
  assert.equal(
    isAbandonedClientJobUpload(
      { ...base, claimedAt: new Date("2026-08-20T12:01:00.000Z") },
      cutoff,
    ),
    false,
  );
  assert.equal(
    isAbandonedClientJobUpload({ ...base, claimedJobId: 42 }, cutoff),
    false,
  );
});