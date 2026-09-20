# MERGE BRIEF — SEO batch 57 → main → publish

READ THIS FILE FIRST. It survives chat compaction; the chat thread may not.

## What this is

Branch `seo-batch-hohr-57` contains the complete, validated SEO/AEO answer-page
batch 57 for apexgrideng.com, built on top of `seo-batch-hkhn-56` (batches 50–56).

- Base: `seo-batch-hkhn-56` @ 6b3c8749 (220 wave files, batches ≤56)
- Contents: 4 new wave files, **96 unique answer pages**, 0 duplicate slugs:
  - `wave-ho-answer-pages.ts` — Mountain & Resort Engineering (24 pages)
  - `wave-hp-answer-pages.ts` — Coastal & Hurricane Engineering (24 pages)
  - `wave-hq-answer-pages.ts` — Desert Southwest Engineering (24 pages)
  - `wave-hr-answer-pages.ts` — Pacific Northwest Engineering (24 pages)
- Every wave is registered in `artifacts/apex-grid/seo/generate.ts`
  (imports + ALL_AEO_PAGES spreads + render loops) — verified before handoff.

## Pre-merge validation (already done by the site owner — spot-check, don't redo)

- `grep -c '^];'` on every wave file = exactly 1 (no orphaned array closers).
- All 4 waves + generate.ts pass esbuild: 5 passed, 0 failed.
- 96 slugs unique within batch and against all 5,380 existing /answers/ slugs
  (checked against the live sitemap) — 0 collisions.
- White-hat uniqueness spot check passed (max sampled answer Jaccard 0.20).
- Jurisdiction-intent angle woven in where natural (city vs unincorporated county
  permitting, plan-check portals, submittal paths). No PE claims, no invented
  code section numbers, no permit-approval promises.

## Steps (in order, stop and report if any step fails — do not skip)

1. `git checkout main && git pull && git merge --no-ff seo-batch-hohr-57`
2. Run the full test suite. All tests must pass.
3. Run `seo:generate`. Confirm output = previous generated total + **96 pages**
   (was 35,056 generated pages after batches 50–56).
4. Confirm the new slugs are registered in the sitemap output.
5. Publish via Replit publish. Monitor the publish until it completes —
   watch for a stalled "Promote" phase and flag it early if it hangs.
6. Verify LIVE (build-green is NOT shipped):
   - Homepage, `/answers/`, and 3+ sampled new answer pages return 200.
   - Sitemap count increased by ~96 URLs.
   - Sampled page has correct canonical + schema markup.
   - Sampled mobile performance is acceptable.

## Constraints (standing, non-negotiable)

- No redesign. Touch only what this merge needs.
- Do not break anything that currently works.
- Do NOT trigger any outreach/email jobs.
- If anything looks risky, stop and report — do not improvise.

## Report back

Deployment ID, generated page total, live sitemap count, sampled 200s,
and anything that failed.
