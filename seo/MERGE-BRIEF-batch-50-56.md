# MERGE BRIEF — SEO batches 50–56 → main → publish

READ THIS FILE FIRST. It survives chat compaction; the chat thread may not.

## What this is

Branch `seo-batch-hkhn-56` contains the complete, validated, cumulative SEO/AEO
answer-page batches 50–56 for apexgrideng.com. Merging THIS branch brings in all
seven batches at once. Do NOT merge the older per-batch branches individually.

- Tip before this file: `29fcbb60`
- Contents: 28 wave files, **672 unique answer pages**, 0 duplicate slugs.
- Every wave is registered in `seo/generate.ts` (imports + ALL_AEO_PAGES spreads
  + render loops) — verified before handoff.

## Pre-merge validation (already done by the site owner — spot-check, don't redo)

- `grep -c '^];'` on every wave file = exactly 1 (no orphaned array closers).
- All 28 waves + generate.ts pass esbuild: 29 passed, 0 failed.
- White-hat uniqueness spot checks passed (~0.34 first-field similarity).

## Steps (in order, stop and report if any step fails — do not skip)

1. `git checkout main && git pull && git merge --no-ff seo-batch-hkhn-56`
2. Run the full test suite. All tests must pass.
3. Run `seo:generate`. Confirm output = previous generated total + **672 pages**
   (was 34,384 generated pages at batch 49).
4. Confirm the new slugs are registered in the sitemap output.
5. Publish via Replit publish. Monitor the publish until it completes —
   watch for a stalled "Promote" phase and flag it early if it hangs.
6. Verify LIVE (build-green is NOT shipped):
   - Homepage, `/answers/`, and 3+ sampled new answer pages return 200.
   - Sitemap count increased by ~672 URLs.
   - Sampled page has correct canonical + schema markup.
   - Sampled mobile performance is acceptable.

## Constraints (standing, non-negotiable)

- No redesign. Touch only what this merge needs.
- Do not break anything that currently works.
- If anything looks risky, stop and report — do not improvise.

## Report back

Deployment ID, generated page total, live sitemap count, sampled 200s,
and anything that failed.
