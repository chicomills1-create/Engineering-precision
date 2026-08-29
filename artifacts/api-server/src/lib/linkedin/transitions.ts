export const linkedinActionStatuses = ["draft", "pending_review", "approved", "completed", "replied", "meeting_booked", "opportunity_created", "suppressed", "stopped"] as const;
export type LinkedinActionStatus = typeof linkedinActionStatuses[number];
const allowed: Record<LinkedinActionStatus, readonly LinkedinActionStatus[]> = {
  draft: ["pending_review", "suppressed", "stopped"], pending_review: ["approved", "suppressed", "stopped"],
  approved: ["completed", "replied", "meeting_booked", "opportunity_created", "suppressed", "stopped"],
  completed: [], replied: [], meeting_booked: [], opportunity_created: [], suppressed: [], stopped: [],
};
export function assertLinkedinTransition(from: LinkedinActionStatus, to: LinkedinActionStatus): void {
  if (!allowed[from].includes(to)) throw new Error(`Transition from ${from} to ${to} is not allowed`);
}
export function assertApprovalFields(input: { approvedCopy?: string | null; owner?: string | null; dueAt?: Date | null; legalBasisNote?: string | null; sourceUrl?: string | null }): void {
  if (!input.approvedCopy?.trim() || !input.owner?.trim() || !input.dueAt || !input.legalBasisNote?.trim() || !input.sourceUrl?.trim()) {
    throw new Error("Approval requires approvedCopy, owner, dueAt, sourceUrl/evidence, and legalBasisNote");
  }
}