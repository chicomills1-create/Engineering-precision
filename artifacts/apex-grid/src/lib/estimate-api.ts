import type { EstimateResult } from "@workspace/estimate-engine";
import type { ProposalPayload, UploadedDocument } from "./estimate-flow";

export type UploadResponse = {
  path?: string;
  objectPath?: string;
  name?: string;
  /** New contract name; uploadToken is accepted while older servers roll forward. */
  claimToken?: string;
  uploadToken?: string;
};
export type ProposalResponse = {
  estimateId: string;
  proposalId: number;
  pricing: EstimateResult;
  pdfUrl: string;
  notificationQueued: boolean;
};

async function jsonOrError<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function uploadEstimateDocument(file: File): Promise<UploadedDocument> {
  const response = await fetch("/api/client/uploads", {
    method: "POST",
    headers: { "Content-Type": file.type || "application/octet-stream", "x-file-name": encodeURIComponent(file.name) },
    body: file,
  });
  const result = await jsonOrError<UploadResponse>(response);
  const path = result.path || result.objectPath;
  const claimToken = result.claimToken || result.uploadToken;
  if (!path || !claimToken) throw new Error("Upload response did not include a file path and claim token.");
  return { path, name: result.name || file.name, claimToken };
}

export async function submitEstimateProposal(payload: ProposalPayload): Promise<ProposalResponse> {
  const response = await fetch("/api/estimates/proposals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return jsonOrError<ProposalResponse>(response);
}