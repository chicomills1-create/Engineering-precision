/**
 * Quarterly state-data review report.
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
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StateData } from "./types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadStates(): Promise<StateData[]> {
  const dir = path.join(__dirname, "states");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
  const all: StateData[] = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    all.push(Object.values(mod)[0] as StateData);
  }
  return all.sort((a, b) => a.name.localeCompare(b.name));
}

const states = await loadStates();

const STALE_MONTHS = 9;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const now = new Date();
const staleCutoff = new Date(now);
staleCutoff.setMonth(staleCutoff.getMonth() - STALE_MONTHS);

interface Row {
  state: string;
  buildingCode: string;
  energyCode: string;
  lastVerified: string;
  ageDays: number;
  stale: boolean;
}

const rows: Row[] = states.map((s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s.lastVerified)) {
    throw new Error(`${s.slug}: lastVerified must be YYYY-MM-DD, got "${s.lastVerified}"`);
  }
  const verified = new Date(s.lastVerified + "T00:00:00Z");
  if (Number.isNaN(verified.getTime())) {
    throw new Error(`${s.slug}: invalid lastVerified date "${s.lastVerified}"`);
  }
  return {
    state: s.name,
    buildingCode: s.buildingCode.baseCode,
    energyCode: s.energyCode.commercial,
    lastVerified: s.lastVerified,
    ageDays: Math.floor((now.getTime() - verified.getTime()) / MS_PER_DAY),
    stale: verified < staleCutoff,
  };
});

rows.sort((a, b) => b.ageDays - a.ageDays || a.state.localeCompare(b.state));

const stale = rows.filter((r) => r.stale);

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
