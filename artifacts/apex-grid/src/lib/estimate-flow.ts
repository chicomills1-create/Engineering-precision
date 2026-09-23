import {
  buildAnalyticsEvent,
  type AnalyticsEvent,
  type Discipline,
  type EstimateIntake,
  type ServicePath,
} from "@workspace/estimate-engine";

export type UploadedDocument = {
  path: string;
  name: string;
  claimToken: string;
};

export type ContactDetails = {
  name: string;
  email: string;
  phone: string;
  company?: string;
};

export type Attribution = {
  source: string;
  medium: string;
  campaign: string;
  landingPath: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export type BallparkQuote = {
  low?: number;
  high?: number;
  /** For project types quoted as a fixed text range instead of computed numbers. */
  custom?: string;
  /** Human-readable summary of the selections that produced the quote. */
  summary?: string;
};

export type ProposalPayload = {
  ruleVersion: string;
  intake: EstimateIntake | PartnerRoutingIntake;
  contact: ContactDetails;
  project: { city: string; projectName?: string; notes?: string };
  attribution: Attribution;
  documents: UploadedDocument[];
  partnerProfile?: PartnerProfile;
  /** The customer-facing ballpark the customer actually saw on screen. */
  ballpark?: BallparkQuote;
};

export type PartnerProfile = {
  volume: string;
  states: string[];
  disciplines: Discipline[];
  workflow: string;
  agreement: boolean;
};

export const MAX_ESTIMATE_UPLOAD_BYTES = 20 * 1024 * 1024;
export const ESTIMATE_UPLOAD_EXTENSIONS = [
  "pdf", "dwg", "dxf", "rvt", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "zip", "jpg", "jpeg", "png", "tif", "tiff",
] as const;

export function validateEstimateFile(file: Pick<File, "name" | "size">): string | null {
  const extension = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() : "";
  if (!extension || !ESTIMATE_UPLOAD_EXTENSIONS.includes(extension as (typeof ESTIMATE_UPLOAD_EXTENSIONS)[number])) {
    return "File type not accepted. Upload PDFs, images, CAD files, or office documents.";
  }
  if (file.size <= 0) return "The selected file is empty.";
  if (file.size > MAX_ESTIMATE_UPLOAD_BYTES) return "File exceeds the 20 MB upload limit.";
  return null;
}

/** Partner leads intentionally carry no direct-project facts. */
export type PartnerRoutingIntake = {
  routingMode: "partner";
  partnerRoute: true;
  servicePath: "partner-routing";
  path: "partner-routing";
};

export function resultCta(partner: boolean): "Submit for engineer review" | "Request Formal Proposal" {
  return partner ? "Request Formal Proposal" : "Submit for engineer review";
}

export function buildPartnerRoutingIntake(): PartnerRoutingIntake {
  return {
    routingMode: "partner",
    partnerRoute: true,
    servicePath: "partner-routing",
    path: "partner-routing",
  };
}

export type ScheduleClassification = {
  schedule: EstimateIntake["schedule"];
  reviewRequired: boolean;
  label: "standard" | "rush" | "review-required";
};

/** Date-only classification keeps the same answer on server and client. */
export function classifySchedule(requiredByDate?: string, today = new Date()): ScheduleClassification {
  if (!requiredByDate) return { schedule: "standard", reviewRequired: true, label: "review-required" };
  const requested = new Date(`${requiredByDate}T12:00:00`);
  if (Number.isNaN(requested.getTime())) return { schedule: "standard", reviewRequired: true, label: "review-required" };
  const start = new Date(today);
  start.setHours(12, 0, 0, 0);
  const days = Math.ceil((requested.getTime() - start.getTime()) / 86_400_000);
  if (days <= 3) return { schedule: "emergency", reviewRequired: true, label: "review-required" };
  if (days <= 10) return { schedule: "rush", reviewRequired: false, label: "rush" };
  return { schedule: "standard", reviewRequired: false, label: "standard" };
}

export function sizeFromSheets(sheetCount: number | undefined): EstimateIntake["sizeBand"] {
  if (!sheetCount || sheetCount < 1) return undefined;
  if (sheetCount <= 10) return "small";
  if (sheetCount <= 30) return "medium";
  if (sheetCount <= 75) return "large";
  return "very-large";
}

export function validateDirectStep(step: number, intake: Partial<EstimateIntake>): string | null {
  if (step === 1 && !intake.state) return "Select a project state.";
  if (step === 2 && (!intake.disciplines?.length || intake.disciplines.length === 0)) return "Select at least one discipline.";
  if (step === 3 && (!intake.sheetCount || intake.sheetCount < 1)) return "Enter the drawing sheet count.";
  if (step === 4 && !intake.calculationType) return "Select a calculation type.";
  if (step === 5 && !intake.projectType) return "Select a project type.";
  if (step === 7 && !intake.requiredByDate) return "Select a required-by date, or choose date unknown.";
  return null;
}

export function validatePartnerStep(step: number, profile: Partial<PartnerProfile>): string | null {
  if (step === 1 && !profile.volume) return "Select a volume profile.";
  if (step === 2 && (!profile.states?.length || !profile.disciplines?.length)) return "Select at least one state and discipline.";
  if (step === 3 && !profile.workflow) return "Tell us about your workflow.";
  if (step === 4 && !profile.agreement) return "Please acknowledge the partner agreement.";
  return null;
}

export function defaultAttribution(location: Pick<Location, "pathname" | "search">, referrer = ""): Attribution {
  const params = new URLSearchParams(location.search);
  const value = (key: string) => params.get(key) || undefined;
  return {
    source: value("utm_source") || (referrer ? "referral" : "direct"),
    medium: value("utm_medium") || "website",
    campaign: value("utm_campaign") || "estimate",
    landingPath: `${location.pathname}${location.search}`,
    referrer: referrer || undefined,
    utm_source: value("utm_source"),
    utm_medium: value("utm_medium"),
    utm_campaign: value("utm_campaign"),
    utm_term: value("utm_term"),
    utm_content: value("utm_content"),
  };
}

export function assembleProposalPayload(args: {
  ruleVersion: string;
  intake: EstimateIntake | PartnerRoutingIntake;
  contact: ContactDetails;
  city: string;
  projectName?: string;
  notes?: string;
  attribution: Attribution;
  documents: UploadedDocument[];
  partnerProfile?: PartnerProfile;
  ballpark?: BallparkQuote;
}): ProposalPayload {
  return {
    ruleVersion: args.ruleVersion,
    intake: args.intake,
    contact: args.contact,
    project: { city: args.city, projectName: args.projectName || undefined, notes: args.notes || undefined },
    attribution: args.attribution,
    documents: args.documents,
    partnerProfile: args.partnerProfile,
    ballpark: args.ballpark,
  };
}

export function dispatchEstimateAnalytics(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const safe = buildAnalyticsEvent(event.name, event.payload);
  window.dispatchEvent(new CustomEvent(safe.name, { detail: safe }));
  const dataLayer = (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
  if (dataLayer) dataLayer.push({ event: safe.name, ...safe.payload });
}

export { buildAnalyticsEvent };