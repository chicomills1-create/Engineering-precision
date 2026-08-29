export type AttributionSourceType = "lead" | "referral_partner" | "public_opportunity";

export function validateAttributionPair(
  sourceType?: AttributionSourceType,
  sourceId?: number,
): string | null {
  if ((sourceType && !sourceId) || (!sourceType && sourceId)) {
    return "sourceType and sourceId must be provided together";
  }
  return null;
}

export function getReferralConversionDelta(previousStatus: string, nextStatus: string): -1 | 0 | 1 {
  if (previousStatus === nextStatus) return 0;
  if (nextStatus === "closed") return 1;
  if (previousStatus === "closed") return -1;
  return 0;
}