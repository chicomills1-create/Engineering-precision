import { createHash } from "crypto";
import express, { Router, type IRouter, type Request, type Response } from "express";
import { and, eq, isNull } from "drizzle-orm";
import {
  clientJobDocumentsTable,
  clientJobUploadsTable,
  clientJobsTable,
  db,
} from "@workspace/db";
import {
  CreateEstimateProposalBody,
  CreateEstimateProposalResponse,
  GetEstimateParams,
  GetEstimateResponse,
} from "@workspace/api-zod";
import {
  calculateEstimate,
  type EstimateIntake,
} from "@workspace/estimate-engine";
import { getAuth } from "@clerk/express";
import { sendClientJobNotificationEmail } from "../lib/clientJobNotifications";
import {
  createEstimatePublicId,
  estimateFailureLogContext,
  writeEstimatePdf,
} from "../lib/estimateProposalHelpers";

const router: IRouter = Router();

class AttachmentClaimError extends Error {}
class IntakeValidationError extends Error {}

function hashClaimToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function requestId(req: Request): string {
  return String(req.id ?? req.headers["x-request-id"] ?? "unknown");
}

function errorCategory(error: unknown): string {
  if (error instanceof AttachmentClaimError) return "attachment_claim";
  if (error instanceof IntakeValidationError) return "intake_validation";
  if (error instanceof Error && /rule|version/i.test(error.message)) return "rule_version";
  if (error instanceof Error && /database|postgres|duplicate/i.test(error.message)) return "database";
  return "persistence";
}

function authUserId(req: Request): string | null {
  const auth = getAuth(req);
  return String(auth?.sessionClaims?.userId || auth?.userId || "") || null;
}

function publicSnapshot(estimate: string, snapshot: Record<string, unknown>) {
  return {
    estimateId: estimate,
    ruleVersion: snapshot.ruleVersion,
    intake: snapshot.intake,
    result: snapshot.result,
  };
}

function isPartnerProposal(
  intake: Partial<EstimateIntake>,
  partnerProfile: unknown,
): boolean {
  return Boolean(
    partnerProfile ||
    intake.partnerRoute ||
    intake.routingMode === "partner" ||
    intake.servicePath === "partner-routing" ||
    intake.path === "partner-routing",
  );
}

function normalizedIntake(data: {
  intake: Partial<EstimateIntake>;
  partner: boolean;
}): EstimateIntake {
  const rawDate = data.intake.requiredByDate as unknown;
  const intake = {
    ...data.intake,
    requiredByDate:
      rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : rawDate,
    schedule: data.intake.schedule ?? "standard",
    ...(data.partner
      ? {
          partnerRoute: true,
          routingMode: "partner" as const,
          servicePath: "partner-routing" as const,
          path: "partner-routing" as const,
        }
      : {}),
  };
  if (!data.partner) {
    const missing = ["state", "disciplines", "projectType", "calculationType"]
      .filter((key) => {
        const value = intake[key as keyof EstimateIntake];
        return value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
      });
    if (missing.length > 0) {
      throw new IntakeValidationError(`Direct estimate intake is missing required fields: ${missing.join(", ")}`);
    }
    if (!intake.sheetCount && !intake.sizeBand) {
      throw new IntakeValidationError("Direct estimate intake requires sheetCount or sizeBand");
    }
  }
  return intake as EstimateIntake;
}

function legacyJobFields(
  data: {
    intake: EstimateIntake;
    contact: { name: string; email: string; phone: string; company?: string };
    project: { city: string; projectName?: string; notes?: string };
    partnerProfile?: { disciplines: string[] };
    partner: boolean;
  },
) {
  const disciplines = data.partner
    ? data.partnerProfile?.disciplines ?? []
    : data.intake.disciplines ?? (data.intake.discipline ? [data.intake.discipline] : []);
  const services = data.partner
    ? `Partner routing${disciplines.length ? `: ${disciplines.join(", ")}` : ""}`
    : [data.intake.calculationType, disciplines.length ? `Disciplines: ${disciplines.join(", ")}` : null]
        .filter((value): value is string => Boolean(value))
        .join(" — ");
  return {
    submitterName: data.contact.name.trim(),
    submitterEmail: data.contact.email.trim().toLowerCase(),
    submitterPhone: data.contact.phone.trim(),
    companyName: data.contact.company?.trim() || null,
    projectType: data.partner ? "Partner routing lead" : String(data.intake.projectType),
    projectLocation: data.project.city.trim(),
    scope: data.project.notes?.trim() || data.project.projectName?.trim() || "Estimate proposal intake",
    timeline: data.intake.requiredByDate || `Schedule: ${data.intake.schedule ?? "standard"}`,
    budgetContext: null,
    services: services || "Engineering services to be confirmed",
  };
}

router.post("/estimates/proposals", express.json(), async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateEstimateProposalBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const partner = isPartnerProposal(data.intake as Partial<EstimateIntake>, data.partnerProfile);
  const version = data.ruleVersion;
  const id = createEstimatePublicId();
  try {
    // The only fee values used below are produced by the server-side engine.
    const intake = normalizedIntake({ intake: data.intake as Partial<EstimateIntake>, partner });
    const result = calculateEstimate(intake, { ruleVersion: version });
    const userId = authUserId(req);
    const snapshot = {
      intake: result.inputSnapshot,
      result,
      ruleVersion: result.ruleVersion,
      factorBreakdown: result.factorBreakdown,
      perDisciplinePrices: result.perDisciplinePrices,
      assumptions: result.assumptions,
      attribution: data.attribution ?? null,
      partnerProfile: data.partnerProfile ?? null,
      // The customer-facing quoted ballpark the customer actually saw on
      // screen. This is what the proposal PDF and notifications must show.
      customerQuote: data.ballpark ?? null,
    } as Record<string, unknown>;
    const legacy = legacyJobFields({
      intake,
      contact: data.contact,
      project: data.project,
      partnerProfile: data.partnerProfile,
      partner,
    });

    const created = await db.transaction(async (tx) => {
      const [job] = await tx.insert(clientJobsTable).values({
        ...legacy,
        status: "submitted",
        estimateId: id,
        estimateSnapshot: snapshot,
        pricingRuleVersion: result.ruleVersion,
        routingMode: intake.routingMode ?? (result.servicePath === "partner-routing" ? "partner" : "direct"),
        requiredByDate: intake.requiredByDate ?? null,
        servicePath: result.servicePath,
        schedule: intake.schedule,
      }).returning();
      if (!job) throw new Error("proposal insert returned no row");

      const documents = [];
      for (const document of data.documents ?? []) {
        const [claimed] = await tx.update(clientJobUploadsTable).set({
          claimedAt: new Date(),
          claimedJobId: job.id,
        }).where(and(
          eq(clientJobUploadsTable.objectPath, document.path),
          eq(clientJobUploadsTable.claimTokenHash, hashClaimToken(document.claimToken)),
          isNull(clientJobUploadsTable.claimedAt),
          userId ? eq(clientJobUploadsTable.uploaderClerkUserId, userId) : isNull(clientJobUploadsTable.uploaderClerkUserId),
        )).returning({ id: clientJobUploadsTable.id });
        if (!claimed) throw new AttachmentClaimError("An upload is invalid or has already been used.");
        documents.push({ jobId: job.id, name: document.name.trim(), objectPath: document.path });
      }
      const savedDocuments = documents.length
        ? await tx.insert(clientJobDocumentsTable).values(documents).returning()
        : [];
      return { job, documents: savedDocuments };
    });

    void (async () => {
      let sendResult: "success" | "failure" = "failure";
      try {
        const notification = await sendClientJobNotificationEmail(created.job, created.documents);
        sendResult = notification.ok ? "success" : "failure";
      } catch {
        sendResult = "failure";
      }
      req.log.info(
        { estimateId: id, recipient: process.env.LEAD_NOTIFY_EMAIL ?? null, sendResult },
        "Estimate proposal notification dispatch",
      );
    })();
    const response = {
      estimateId: id,
      proposalId: created.job.id,
      pricing: result,
      pdfUrl: `/api/estimates/${id}/pdf`,
      notificationQueued: true,
    };
    res.status(201).json(CreateEstimateProposalResponse.parse(response));
  } catch (error) {
    req.log.error(
      estimateFailureLogContext(requestId(req), id, errorCategory(error)),
      "Estimate proposal persistence failed",
    );
    if (error instanceof AttachmentClaimError) {
      res.status(400).json({ error: error.message });
      return;
    }
    if (error instanceof IntakeValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Unable to save the estimate proposal." });
  }
});

router.get("/estimates/:estimateId", async (req: Request, res: Response): Promise<void> => {
  const params = GetEstimateParams.safeParse(req.params);
  if (!params.success) {
    res.status(404).json({ error: "Estimate not found." });
    return;
  }
  const [job] = await db.select({
    estimateId: clientJobsTable.estimateId,
    estimateSnapshot: clientJobsTable.estimateSnapshot,
  }).from(clientJobsTable).where(eq(clientJobsTable.estimateId, params.data.estimateId));
  if (!job?.estimateId || !job.estimateSnapshot) {
    res.status(404).json({ error: "Estimate not found." });
    return;
  }
  res.json(GetEstimateResponse.parse(publicSnapshot(job.estimateId, job.estimateSnapshot as Record<string, unknown>)));
});

function usd(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Unavailable";
  return "$" + Math.round(value).toLocaleString("en-US");
}

type CustomerQuote = {
  low?: number;
  high?: number;
  custom?: string;
  summary?: string;
};

type ProposalJobRow = {
  estimateId: string | null;
  submitterName: string;
  submitterEmail: string;
  submitterPhone: string | null;
  companyName: string | null;
  projectType: string;
  projectLocation: string;
  servicePath: string | null;
  createdAt: Date | string | null;
};

function customerProposalBody(
  job: ProposalJobRow,
  quote: CustomerQuote | null,
  documentNames: string[],
  turnaroundLabel: string | null,
): string {
  const quoteLine =
    quote && (quote.low !== undefined || quote.high !== undefined)
      ? `Quoted ballpark: ${usd(quote.low)} – ${usd(quote.high)}`
      : quote?.custom
        ? `Quoted ballpark: ${quote.custom}`
        : null;
  const lines = [
    "Apex Grid Engineering",
    "Engineering estimate proposal",
    "",
    `Estimate ID: ${job.estimateId}`,
    `Date: ${job.createdAt instanceof Date ? job.createdAt.toISOString().slice(0, 10) : String(job.createdAt ?? "").slice(0, 10)}`,
    "",
    "Contact",
    `  Name: ${job.submitterName}`,
    `  Email: ${job.submitterEmail}`,
    job.submitterPhone ? `  Phone: ${job.submitterPhone}` : null,
    job.companyName ? `  Company: ${job.companyName}` : null,
    `  Project city: ${job.projectLocation}`,
    "",
    "Project",
    quote?.summary ? `  ${quote.summary}` : null,
    `  Project type: ${job.projectType}`,
    job.servicePath ? `  Service path: ${job.servicePath}` : null,
    "",
    "Quote",
    quoteLine,
    turnaroundLabel ? `  Typical turnaround: ${turnaroundLabel}` : null,
    ...(documentNames.length > 0
      ? ["", "Attached documents:", ...documentNames.map((name) => `  - ${name}`)]
      : []),
    "",
    "This ballpark is a planning number based on the project details above. Final pricing is confirmed after an engineer reviews your project. This estimate is not binding and never implies permit approval.",
  ].filter((line): line is string => line !== null);
  return lines.join("\n");
}

router.get("/estimates/:estimateId/pdf", async (req: Request, res: Response): Promise<void> => {
  const params = GetEstimateParams.safeParse(req.params);
  if (!params.success) {
    res.status(404).json({ error: "Estimate not found." });
    return;
  }
  const [job] = await db.select({
    id: clientJobsTable.id,
    estimateId: clientJobsTable.estimateId,
    estimateSnapshot: clientJobsTable.estimateSnapshot,
    submitterName: clientJobsTable.submitterName,
    submitterEmail: clientJobsTable.submitterEmail,
    submitterPhone: clientJobsTable.submitterPhone,
    companyName: clientJobsTable.companyName,
    projectType: clientJobsTable.projectType,
    projectLocation: clientJobsTable.projectLocation,
    servicePath: clientJobsTable.servicePath,
    createdAt: clientJobsTable.createdAt,
  }).from(clientJobsTable).where(eq(clientJobsTable.estimateId, params.data.estimateId));
  if (!job?.estimateId) {
    res.status(404).json({ error: "Estimate not found." });
    return;
  }
  const snapshot = (job.estimateSnapshot ?? {}) as Record<string, unknown>;
  const quote = (snapshot.customerQuote ?? null) as CustomerQuote | null;
  const savedResult = snapshot.result as { turnaround?: { label?: string } } | undefined;
  const documents = await db.select({ name: clientJobDocumentsTable.name })
    .from(clientJobDocumentsTable)
    .where(eq(clientJobDocumentsTable.jobId, job.id));
  const body = customerProposalBody(
    job,
    quote,
    documents.map((document) => document.name),
    savedResult?.turnaround?.label ?? null,
  );
  res.type("application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${job.estimateId}.pdf"`);
  res.send(writeEstimatePdf(body));
});

export default router;