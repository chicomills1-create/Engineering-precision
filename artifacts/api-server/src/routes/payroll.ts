import { Router, type IRouter } from "express";
import { asc, eq, inArray } from "drizzle-orm";
import {
  clientJobsTable,
  db,
  jobPayrollEntriesTable,
  jobPayrollInstallmentsTable,
  jobPayrollPlansTable,
} from "@workspace/db";
import {
  CreatePayrollEntryBody,
  CreatePayrollEntryParams,
  CreatePayrollEntryResponse,
  CreatePayrollPlanBody,
  CreatePayrollPlanResponse,
  ListPayrollPlansResponse,
  UpdatePayrollInstallmentBody,
  UpdatePayrollInstallmentParams,
  UpdatePayrollInstallmentResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

type PlanRow = typeof jobPayrollPlansTable.$inferSelect;
type EntryRow = typeof jobPayrollEntriesTable.$inferSelect;
type InstallmentRow = typeof jobPayrollInstallmentsTable.$inferSelect;
type JobRow = typeof clientJobsTable.$inferSelect;

const money = (value: string | null | undefined): number => Number(value ?? 0);
const entryTotal = (entry: EntryRow, plan: PlanRow): number =>
  entry.compensationType === "percentage"
    ? Number((money(plan.contractRevenue) * money(entry.percentage) / 100).toFixed(2))
    : money(entry.agreedTotal);

function serializePlan(
  plan: PlanRow,
  job: JobRow,
  entries: EntryRow[],
  installments: InstallmentRow[],
) {
  const serializedEntries = entries.map((entry) => {
    const totalAmount = entryTotal(entry, plan);
    return {
      ...entry,
      agreedTotal: entry.agreedTotal == null ? null : money(entry.agreedTotal),
      percentage: entry.percentage == null ? null : money(entry.percentage),
      totalAmount,
      installments: installments
        .filter((installment) => installment.entryId === entry.id)
        .map((installment) => ({
          ...installment,
          percentage: money(installment.percentage),
          amount: Number((totalAmount * money(installment.percentage) / 100).toFixed(2)),
          dueAt: installment.dueAt?.toISOString() ?? null,
          paidAt: installment.paidAt?.toISOString() ?? null,
          createdAt: installment.createdAt.toISOString(),
        })),
      createdAt: entry.createdAt.toISOString(),
      updatedAt: entry.updatedAt.toISOString(),
    };
  });
  const allocatedTotal = serializedEntries.reduce((sum, entry) => sum + entry.totalAmount, 0);
  return {
    ...plan,
    jobTitle: `${job.projectType} — ${job.projectLocation}`,
    clientName: job.companyName || job.submitterName,
    contractRevenue: money(plan.contractRevenue),
    entries: serializedEntries,
    allocatedTotal: Number(allocatedTotal.toFixed(2)),
    remainingRevenue: Number((money(plan.contractRevenue) - allocatedTotal).toFixed(2)),
    createdAt: plan.createdAt.toISOString(),
    updatedAt: plan.updatedAt.toISOString(),
  };
}

async function loadPlans(planId?: number) {
  const plans = planId
    ? await db.select().from(jobPayrollPlansTable).where(eq(jobPayrollPlansTable.id, planId))
    : await db.select().from(jobPayrollPlansTable).orderBy(asc(jobPayrollPlansTable.createdAt));
  if (!plans.length) return [];
  const jobs = await db.select().from(clientJobsTable).where(inArray(clientJobsTable.id, plans.map((plan) => plan.jobId)));
  const entries = await db.select().from(jobPayrollEntriesTable).where(inArray(jobPayrollEntriesTable.planId, plans.map((plan) => plan.id)));
  const installments = entries.length
    ? await db.select().from(jobPayrollInstallmentsTable)
      .where(inArray(jobPayrollInstallmentsTable.entryId, entries.map((entry) => entry.id)))
      .orderBy(asc(jobPayrollInstallmentsTable.installmentNumber))
    : [];
  const jobsById = new Map(jobs.map((job) => [job.id, job]));
  return plans.flatMap((plan) => {
    const job = jobsById.get(plan.jobId);
    return job ? [serializePlan(plan, job, entries.filter((entry) => entry.planId === plan.id), installments)] : [];
  });
}

router.get("/payroll/plans", requireAuth, async (_req, res): Promise<void> => {
  res.json(ListPayrollPlansResponse.parse(await loadPlans()));
});

router.post("/payroll/plans", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreatePayrollPlanBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [job] = await db.select({ id: clientJobsTable.id }).from(clientJobsTable)
    .where(eq(clientJobsTable.id, parsed.data.jobId)).limit(1);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  const [plan] = await db.insert(jobPayrollPlansTable).values({
    jobId: parsed.data.jobId,
    contractRevenue: parsed.data.contractRevenue.toFixed(2),
    status: parsed.data.status ?? "draft",
    notes: parsed.data.notes?.trim() || null,
  }).returning();
  const [result] = await loadPlans(plan!.id);
  res.status(201).json(CreatePayrollPlanResponse.parse(result));
});

router.post("/payroll/plans/:id/entries", requireAuth, async (req, res): Promise<void> => {
  const params = CreatePayrollEntryParams.safeParse(req.params);
  const parsed = CreatePayrollEntryBody.safeParse(req.body);
  if (!params.success || !parsed.success) {
    res.status(400).json({ error: "Invalid payroll entry" });
    return;
  }
  const percentageTotal = parsed.data.installments.reduce((sum, installment) => sum + installment.percentage, 0);
  if (Math.abs(percentageTotal - 100) > 0.01) {
    res.status(400).json({ error: "Installment percentages must total 100%" });
    return;
  }
  if (parsed.data.compensationType === "fixed" && parsed.data.agreedTotal == null) {
    res.status(400).json({ error: "Fixed compensation requires an agreed total" });
    return;
  }
  if (parsed.data.compensationType === "percentage" && parsed.data.percentage == null) {
    res.status(400).json({ error: "Percentage compensation requires a job percentage" });
    return;
  }
  const [plan] = await db.select({ id: jobPayrollPlansTable.id }).from(jobPayrollPlansTable)
    .where(eq(jobPayrollPlansTable.id, params.data.id)).limit(1);
  if (!plan) {
    res.status(404).json({ error: "Payroll plan not found" });
    return;
  }
  await db.transaction(async (tx) => {
    const [entry] = await tx.insert(jobPayrollEntriesTable).values({
      planId: params.data.id,
      role: parsed.data.role,
      payeeName: parsed.data.payeeName.trim(),
      payeeEmail: parsed.data.payeeEmail?.trim().toLowerCase() || null,
      compensationType: parsed.data.compensationType,
      agreedTotal: parsed.data.compensationType === "fixed" ? parsed.data.agreedTotal!.toFixed(2) : null,
      percentage: parsed.data.compensationType === "percentage" ? parsed.data.percentage!.toFixed(2) : null,
      notes: parsed.data.notes?.trim() || null,
    }).returning();
    await tx.insert(jobPayrollInstallmentsTable).values(parsed.data.installments.map((installment, index) => ({
      entryId: entry!.id,
      installmentNumber: index + 1,
      label: installment.label.trim(),
      percentage: installment.percentage.toFixed(2),
      dueAt: installment.dueAt ? new Date(installment.dueAt) : null,
      status: "planned",
    })));
  });
  const [result] = await loadPlans(params.data.id);
  res.status(201).json(CreatePayrollEntryResponse.parse(result));
});

router.patch("/payroll/installments/:id", requireAuth, async (req, res): Promise<void> => {
  const params = UpdatePayrollInstallmentParams.safeParse(req.params);
  const parsed = UpdatePayrollInstallmentBody.safeParse(req.body);
  if (!params.success || !parsed.success) {
    res.status(400).json({ error: "Invalid installment update" });
    return;
  }
  const [installment] = await db.update(jobPayrollInstallmentsTable).set({
    status: parsed.data.status,
    paidAt: parsed.data.status === "paid" ? new Date() : null,
  }).where(eq(jobPayrollInstallmentsTable.id, params.data.id)).returning();
  if (!installment) {
    res.status(404).json({ error: "Installment not found" });
    return;
  }
  const [entry] = await db.select({ planId: jobPayrollEntriesTable.planId }).from(jobPayrollEntriesTable)
    .where(eq(jobPayrollEntriesTable.id, installment.entryId)).limit(1);
  const [result] = await loadPlans(entry!.planId);
  res.json(UpdatePayrollInstallmentResponse.parse(result));
});

export default router;