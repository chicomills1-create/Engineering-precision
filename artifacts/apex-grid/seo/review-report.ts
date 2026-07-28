/**
 * Quarterly state-data review report (console).
 *
 * Lists each state's recorded building/energy code editions plus the
 * lastVerified date, and flags entries older than ~9 months so a quarterly
 * pass can spot-check them against current adoptions.
 *
 * Usage:
 *   pnpm --filter @workspace/apex-grid run seo:review
 *
 * After correcting any stale entries (and bumping lastVerified), regenerate
 * the static pages with:
 *   pnpm --filter @workspace/apex-grid run seo:generate
 *
 * For the automated quarterly email version, see review-email.ts.
 */
import { buildReviewReport, STALE_MONTHS } from "./review-core";

const { generatedAt: now, rows, stale } = await buildReviewReport();

console.log(`State code data review — ${now.toISOString().slice(0, 10)}`);
console.log(`${rows.length} states; flagging entries not verified in the last ${STALE_MONTHS} months\n`);

const pad = (v: string, w: number) => (v.length > w ? v.slice(0, w - 1) + "…" : v.padEnd(w));
console.log(
  pad("STATE", 16) + pad("VERIFIED", 12) + pad("AGE", 8) + pad("BUILDING CODE", 44) + "ENERGY CODE",
);
for (const r of rows) {
  const flag = r.stale ? "⚠ " : "  ";
  console.log(
    flag +
      pad(r.state, 14) +
      pad(r.lastVerified, 12) +
      pad(`${r.ageDays}d`, 8) +
      pad(r.buildingCode, 44) +
      r.energyCode,
  );
}

console.log("");
if (stale.length > 0) {
  console.log(`⚠ ${stale.length} state(s) need review: ${stale.map((r) => r.state).join(", ")}`);
  console.log(
    "Verify each against the current ICC adoption map / state code board, update the state file (including lastVerified), then run seo:generate.",
  );
  process.exitCode = 1;
} else {
  console.log("✓ All states verified within the last 9 months.");
}
