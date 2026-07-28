/**
 * Shared logic for the quarterly state-data review.
 *
 * Loads every state file, validates lastVerified, and computes which entries
 * are stale (not verified within STALE_MONTHS). Used by both the console
 * report (review-report.ts) and the email notifier (review-email.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StateData } from "./types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const STALE_MONTHS = 9;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface ReviewRow {
  state: string;
  buildingCode: string;
  energyCode: string;
  lastVerified: string;
  ageDays: number;
  stale: boolean;
}

export interface ReviewResult {
  generatedAt: Date;
  rows: ReviewRow[];
  stale: ReviewRow[];
}

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

export async function buildReviewReport(now = new Date()): Promise<ReviewResult> {
  const states = await loadStates();

  const staleCutoff = new Date(now);
  staleCutoff.setMonth(staleCutoff.getMonth() - STALE_MONTHS);

  const rows: ReviewRow[] = states.map((s) => {
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

  return { generatedAt: now, rows, stale: rows.filter((r) => r.stale) };
}
