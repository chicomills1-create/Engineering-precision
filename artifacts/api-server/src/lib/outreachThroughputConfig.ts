const DEFAULT_DISCOVERY_DAILY_CAP = 400;
const DEFAULT_VERIFICATION_BATCH_CAP = 400;
const MAX_CONFIGURABLE_RESEARCH_CAP = 1_000;

function positiveBoundedInteger(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_CONFIGURABLE_RESEARCH_CAP) {
    return fallback;
  }
  return parsed;
}

export function getOutreachDiscoveryDailyCap(): number {
  return positiveBoundedInteger(
    process.env.OUTREACH_DISCOVERY_DAILY_CAP,
    DEFAULT_DISCOVERY_DAILY_CAP,
  );
}

export function getOutreachVerificationBatchCap(): number {
  return positiveBoundedInteger(
    process.env.OUTREACH_VERIFICATION_BATCH_CAP,
    DEFAULT_VERIFICATION_BATCH_CAP,
  );
}

export const OUTREACH_RESEARCH_CAP_MAXIMUM = MAX_CONFIGURABLE_RESEARCH_CAP;