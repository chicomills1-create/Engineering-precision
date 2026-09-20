# OUTREACH AUTO-IMPORT BRIEF

## Goal
Eliminate the manual portal CSV import. The owner currently must hand-import
contact CSVs in /admin. After this change, the assistant drops CSVs on a known
origin branch and the server imports them automatically before the nightly run.
Zero owner action, every day.

## Design
- **Inbox:** origin branch `outreach-auto-import-inbox`, folder `inbox/` at the
  branch root. CSV files only.
- The assistant pushes files named `apex-auto-YYYY-MM-DD-HHMM.csv` using the
  exact import contract: header must be exactly
  `day,lane,company,contact_name,title,email,website,city,state,segment,project_signal,source_url`
  with `lane=verified` on every row.
- New scheduled step `autoImportInbox()` runs nightly at **19:00
  America/Phoenix** (one hour before the 20:00 send):
  1. `git fetch origin outreach-auto-import-inbox` (read-only; never push).
  2. List `inbox/*.csv` on the fetched ref.
  3. For each file, read content via `git show FETCH_HEAD:inbox/<file>`
     (no checkout, no working-tree changes).
  4. Validate the exact header; skip non-matching files (log and continue).
  5. Run the existing `importRecoveredFindyMailInventory(csvText)` — it is
     idempotent (batch SHA-256) and already enforces
     suppression / bounce / prior-recipient / domain-mismatch rules.
     Re-processing an unchanged file is a safe no-op.
  6. Log per file: rows processed, new imported, duplicates skipped.
- The nightly report includes the auto-import summary line.
- Never delete or move inbox files (idempotency makes cleanup unnecessary and
  the files are the audit trail).
- This step performs no sends and no staging changes. Read + import only.

## Step 0 — do first, report before building
Verify read access to origin: run `git ls-remote origin` in the workspace.
If origin reads fail, STOP and report immediately — do not build. The entire
drop-point design depends on origin being readable from the workspace.

## Tests
- Header validation rejects a malformed CSV without touching the database.
- Idempotency: importing the same fixture file twice adds zero new rows the
  second time.
- A valid new fixture file imports end-to-end through the real import
  function (small fixture, then clean it up).
- Scheduler wiring: the 19:00 Phoenix job is registered (test the schedule
  registration, not the wall-clock wait).

## Constraints
- Full test suite (currently 252: 239 API + 13 estimate engine) + typecheck
  must pass. Merge to main and publish.
- No production SQL outside the existing import function.
- No sends or staging runs during verification.
- Do not touch the 20:00 runner's logic; this is a separate pre-step.
