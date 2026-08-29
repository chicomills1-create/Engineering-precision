export type LinkedinScoreInput = {
  role?: string | null; geography?: string | null; disciplineFit?: string | null;
  currentSignal?: { evidence?: string | null; observedAt?: Date | null } | null;
  confidence?: number | null;
};
export function scoreLinkedinFit(input: LinkedinScoreInput): { score: number; reasons: string[] } {
  const reasons: string[] = []; let score = 0;
  if (input.role?.trim()) { score += 20; reasons.push("Role is documented"); }
  if (input.geography?.trim()) { score += 15; reasons.push("Geography is documented"); }
  if (input.disciplineFit?.trim()) { score += 25; reasons.push("Discipline fit is documented"); }
  if (input.currentSignal?.evidence?.trim()) { score += 20; reasons.push("Current public signal is documented"); }
  if (typeof input.confidence === "number") { const points = Math.max(0, Math.min(20, Math.round(input.confidence / 5))); score += points; reasons.push(`Evidence confidence: ${input.confidence}`); }
  return { score, reasons };
}