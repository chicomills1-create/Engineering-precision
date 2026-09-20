# MERGE BRIEF — SEO batch 58 → main → publish

READ THIS FILE FIRST. It survives chat compaction; the chat thread may not.

## What this is

Branch `seo-batch-hshv-58` contains the complete, validated SEO/AEO answer-page
batch 58 for apexgrideng.com, built on top of `seo-batch-hohr-57` (batches ≤57).

- Base: `seo-batch-hohr-57` @ 225eab0f (224 wave files, batches ≤57)
- Contents: 4 new wave files, **96 unique answer pages**, 0 duplicate slugs:
  - `wave-hs-answer-pages.ts` — Heartland Engineering (24 pages: tornado saferooms, expansive clay, grain elevators, frost depth, karst, lake-effect snow…)
  - `wave-ht-answer-pages.ts` — Gulf Industrial Engineering (24 pages: refinery blast design, LNG terminals, pipe racks, electrical classification, salt domes…)
  - `wave-hu-answer-pages.ts` — Northeast Historic Urban Engineering (24 pages: brownstones, NYC FISP, rowhouses, fieldstone foundations, subway-adjacent work…)
  - `wave-hv-answer-pages.ts` — Southeast Growth Engineering (24 pages: logistics warehouses, karst, red clay, New Madrid seismic, port expansion…)
- Every wave is registered in `artifacts/apex-grid/seo/generate.ts`
  (imports + ALL_AEO_PAGES spreads + render loops) — verified before handoff.

## Pre-merge validation (already done by the site owner — spot-check, don't redo)

- `grep -c '^];'` on every wave file = exactly 1 (no orphaned array closers).
- All 4 waves pass esbuild: 4 passed, 0 failed.
- generate.ts wiring verified: imports + spreads + 4 render loops present;
  esbuild shows only the 3 pre-existing `../src/...` resolve warnings that the
  unmodified file also produces — 0 new errors from this batch.
- 96 slugs unique within batch and against all 5,476 existing live /answers/
  slugs (checked against the live sitemap) — 0 collisions.
- White-hat uniqueness check passed: 0 identical sentences between the two
  closest pages (hospital-MEP pair), char-level similarity 0.133 — shared
  vocabulary only, genuinely unique prose. No doorway pages, no spun duplicates.
- Jurisdiction-intent angle woven in where natural (city vs unincorporated county
  permitting, plan-check portals, submittal paths). No PE claims, no invented
  code section numbers, no permit-approval promises.

## Steps (in order, stop and report if any step fails — do not skip)

1. `git checkout main && git pull && git merge --no-ff seo-batch-hshv-58`
2. Run the full test suite. All tests must pass.
3. Run `seo:generate`. Confirm output = previous generated total + **96 pages**
   (was 35,152 generated pages after batch 57).
4. Confirm the new slugs are registered in the sitemap output.
5. Publish via Replit publish. Monitor the publish until it completes —
   watch for a stalled "Promote" phase and flag it early if it hangs.
6. Verify LIVE (build-green is NOT shipped):
   - Homepage, `/answers/`, and 3+ sampled new answer pages return 200.
   - Sitemap count increased by ~96 URLs (was 34,787).
   - Sampled page has correct canonical + schema markup.
   - Sampled mobile performance is acceptable.

## Sample pages to verify live

- `/answers/oklahoma-tornado-saferoom-design/`
- `/answers/houston-refinery-blast-resistant-design/`
- `/answers/boston-brownstone-structural-renovation/`
- `/answers/memphis-distribution-center-seismic-design/`

## Constraints (standing, non-negotiable)

- No redesign. Touch only what this merge needs.
- Do not break anything that currently works.
- Do NOT trigger any outreach/email jobs.
- If anything looks risky, stop and report — do not improvise.

## Report back

Deployment ID, generated page total, live sitemap count, sampled 200s,
and anything that failed.
