import type { Coverage, ServicePath } from "./types.js";

export const ANALYTICS_EVENT_NAMES = [
  "started",
  "path-selected",
  "step-completed",
  "result-viewed",
  "pdf-downloaded",
  "proposal-submitted",
  "partner-submitted",
  "upload-failed",
] as const;
export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number];
export type AnalyticsPayload = Readonly<Record<string, string | number | boolean | null>>;
export type AnalyticsEvent = { name: AnalyticsEventName; payload: AnalyticsPayload };

const SAFE_PAYLOAD_KEYS = new Set(["path", "step", "coverage", "failureCode", "ruleVersion", "highValue"]);

function event(name: AnalyticsEventName, payload: AnalyticsPayload = {}): AnalyticsEvent {
  const safePayload: Record<string, string | number | boolean | null> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (SAFE_PAYLOAD_KEYS.has(key)) safePayload[key] = value;
  }
  return { name, payload: safePayload };
}

export const buildStartedEvent = () => event("started");
export const buildPathSelectedEvent = (path: ServicePath) => event("path-selected", { path });
export const buildStepCompletedEvent = (step: string) => event("step-completed", { step });
export const buildResultViewedEvent = (coverage: Coverage) => event("result-viewed", { coverage });
export const buildPdfDownloadedEvent = () => event("pdf-downloaded");
export const buildProposalSubmittedEvent = () => event("proposal-submitted");
export const buildPartnerSubmittedEvent = () => event("partner-submitted");
export const buildUploadFailedEvent = (failureCode?: string) =>
  event("upload-failed", failureCode ? { failureCode } : {});

export function buildAnalyticsEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}): AnalyticsEvent {
  return event(name, payload);
}