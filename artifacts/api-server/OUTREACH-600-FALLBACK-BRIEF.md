# 600-Total Nightly Fallback — Execution Brief

## Owner order
Every night's 20:00 America/Phoenix initial send stages **600 total** sequence-1 messages.
Hot leads stage first (up to the configured hot-lead limit). Fresh verified backfills any
hot shortfall so the nightly total always reaches 600 when supply allows.
Sequence-2 follow-ups are unchanged and ride on top of the 600.

## Groundwork (verified against main — do not re-discover)
- Orchestration: `artifacts/api-server/src/lib/outreachDailyRunner.ts` → `runDailyOutreachOnce`.
  `prepareRegularOutreach()` and `prepareHotMarketOutreach()` run in parallel via
  `Promise.all`; `prepareHotLeadOutreach()` runs after. No reordering needed.
- Regular verified prep: `prepareNextPhoenixOutreach()` in
  `artifacts/api-server/src/lib/outreachPreparation.ts`. Verified cap =
  `getNamedHotMarketSharedLimit(laneConfig) + laneConfig.publicLimit` from the
  authoritative DB version-2 config row. Step 0 below: read the live row and confirm
  the current 500-unified-verified + 100-hot policy values before coding.
- Hot-lead prep: `prepareNextPhoenixHotLeadOutreach()` in
  `artifacts/api-server/src/lib/outreachHotLeads.ts`, cap = `hotLeadLimit` from
  `getAuthoritativeLaneConfig()`.
- Run-claim: `claimPreparationRun(targetDate, now, targetCount)` in
  `outreachPreparation.ts` (line 213) — idempotent per targetDate; a "completed" run
  with shortfall > 0 or a smaller targetCount can be recovered/extended (lines 213–249).
- The gap: when hot leads stage fewer than the hot limit (tonight: 0 available to send),
  nothing backfills — the night would total 500, not 600.

## Implementation
1. New exported constant `NIGHTLY_TOTAL_INITIAL_TARGET = 600` in
   `artifacts/api-server/src/lib/outreachSystemConfig.ts`.
2. New exported function `topUpVerifiedPreparation(scheduledAt: Date, needed: number)`
   in `outreachPreparation.ts`:
   - Reuses the exact eligibility filter of `prepareNextPhoenixOutreach` (status in
     approved/review, emailStatus verified, campaign active, not suppressed, no prior
     sequence-1 message, no sequence-1 claim, contact name present).
   - Reuses the same per-candidate transactional insert (advisory locks, in-transaction
     rechecks, approved subject/body builders, plus the follow-up message rows with
     scheduledAt null).
   - Stages up to `needed` additional sequence-1 messages; returns `{ prepared, shortfall }`.
   - Run-claim: call `claimPreparationRun(targetDate, now, 600)` first — it
     recovers/extends the day's run when a shortfall remains; if it returns undefined
     because the day's run already covers the target, proceed with the insert pass anyway.
3. In `runDailyOutreachOnce` (lib/outreachDailyRunner.ts), after `hotLeadPreparation`
   resolves:
   - Count ground truth: sequence-1 messages with `scheduledAt` in
     `[scheduledAt, scheduledAt + 24h)` and status in (approved, sending, sent, delivered).
   - `topUpNeeded = max(0, NIGHTLY_TOTAL_INITIAL_TARGET - windowCount)`; if > 0,
     `await topUpVerifiedPreparation(scheduledAt, topUpNeeded)`.
   - Add `topUpPrepared` / `topUpShortfall` to `DailyOutreachRunnerResult` (follow the
     `hotLeadPrepared` pattern) and surface them in the daily report
     (`sendDailyOutreachReport`) as a "Top-up verified" line.
4. Tests — new `artifacts/api-server/src/lib/outreachTopUp.test.ts`:
   - hot=100 + verified=500 → top-up 0.
   - hot=0 + verified=500 → top-up 100 (given supply).
   - hot=30 + verified=500 → top-up 70.
   - fresh supply short (need 100, only 40 eligible) → top-up 40, shortfall 60.
   - top-up never re-stages an already-staged prospect (idempotency across the three preps).
   Full suite + typecheck must pass. Do not modify existing tests except to extend
   result-type assertions they already cover.

## Verify (no sends)
- Merge → full tests + typecheck → publish.
- In production: confirm the DB version-2 lane config row values; confirm the 600
  constant is live.
- Do NOT trigger any send or staging run. Tonight's 20:00 run is the live proof; the
  21:30 SendGrid verification will confirm the count.

## Session priority (everything published well before 20:00 Phoenix tonight)
1. This 600-fallback (email — urgent, must be live before the 8pm send).
2. SEO batch-62 publish + verify (sitemap exactly 35,267 URLs; sample one new /answers/
   page: HTTP 200, self-canonical, Article+FAQPage+BreadcrumbList JSON-LD).
3. Progress-bar branch `portal-import-progress-bar` (head
   d17087ecc7fb15a3c8402f4f053ef2db2bc71002): follow
   `artifacts/apex-grid/portal/MERGE-BRIEF-import-progress-bar.md` exactly
   (merge → tests + typecheck → publish → CSV-upload bar test on /admin).
