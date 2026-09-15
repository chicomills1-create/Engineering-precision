import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileText, Loader2, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_URL, usePageMeta } from "@/lib/seo";
import {
  DISCIPLINES,
  PROJECT_TYPES,
  calculateEstimate,
  type CalculationType,
  type Discipline,
  type EstimateIntake,
  type EstimateResult,
  type ServicePath,
} from "@workspace/estimate-engine";
import {
  assembleProposalPayload,
  buildPartnerRoutingIntake,
  classifySchedule,
  defaultAttribution,
  dispatchEstimateAnalytics,
  resultCta,
  sizeFromSheets,
  validateEstimateFile,
  validateDirectStep,
  validatePartnerStep,
  type ContactDetails,
  type PartnerProfile,
  type UploadedDocument,
} from "@/lib/estimate-flow";
import { submitEstimateProposal, uploadEstimateDocument, type ProposalResponse } from "@/lib/estimate-api";

const PAGE_META = {
  title: "Instant Ballpark Estimator | Apex Grid Engineering",
  description: "Get an instant, non-binding ballpark estimate for your engineering project. Preconstruction intake for MEP, Structural, Civil, and more.",
  path: "/estimate",
};

const ESTIMATE_FAQS = [
  { question: "How does the instant engineering estimator work?", answer: "The estimator uses the project type, approximate area, and location you provide to produce a preliminary, non-binding planning range. It is an early budgeting tool, not a proposal, construction estimate, permit-fee quote, or guarantee of final scope." },
  { question: "What affects MEP engineering fees?", answer: "MEP engineering effort depends on the building use and size, system complexity, existing-condition information, equipment selections, utility requirements, coordination needs, energy-code scope, permit deliverables, schedule, and the quality of the starting documents." },
  { question: "What affects structural engineering fees?", answer: "Structural fees depend on the structural system, loads, building configuration, existing conditions, available drawings, site observations, calculations, connection or foundation scope, coordination, and the documents required by the authority having jurisdiction." },
  { question: "How quickly will I receive the ballpark estimate?", answer: "The estimator displays a preliminary result after you provide the requested project information. A final proposal takes longer because the team must review the actual scope, available records, jurisdiction, disciplines, deliverables, and schedule." },
  { question: "Is the estimator result a final engineering proposal?", answer: "No. The result is a non-binding ballpark for early planning. Apex Grid confirms project-specific scope, professional responsibility, licensing, assumptions, exclusions, availability, and final fees before any engagement begins." },
];
const ESTIMATE_FAQ_SCHEMA = {
  "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_URL}/estimate#faq`,
  mainEntity: ESTIMATE_FAQS.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
};
const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const CALC_TYPES: Array<{ value: CalculationType; label: string }> = [
  { value: "design", label: "Design calculations" }, { value: "load", label: "Load calculations" },
  { value: "code-compliance", label: "Code compliance" }, { value: "as-built", label: "As-built documentation" },
  { value: "permit-set", label: "Permit set" }, { value: "other", label: "Other / not sure" },
];
const DISCIPLINE_LABELS: Record<Discipline, string> = { civil: "Civil", structural: "Structural", mechanical: "Mechanical", electrical: "Electrical", plumbing: "Plumbing", "fire-protection": "Fire protection", energy: "Energy" };
export const PATHS: Array<{ value: ServicePath; title: string; meaning: string; safe: string }> = [
  { value: "pe-review-sealing", title: "PE Review & Sealing", meaning: "I have drawings or calculations that need an independent PE review and may need a professional seal.", safe: "A licensed PE independently decides whether sealing is appropriate under the applicable state rules; no permit approval is implied." },
  { value: "engineering-calculations", title: "Engineering Calculations", meaning: "I need engineering calculations or analysis to support my project.", safe: "Calculations are independently reviewed as needed and do not imply sealing or permit approval; state rules control." },
  { value: "calculations-stamped-drawings", title: "Calculations + Stamped Drawings", meaning: "I need calculations and drawings prepared for review by an appropriately licensed PE.", safe: "Any sealing decision is made by the responsible licensed PE after independent review under applicable state rules; it is not a permit-approval guarantee." },
];
const DIRECT_STEPS = ["State", "Discipline", "Sheets", "Calculation type", "Project type", "Upload drawings", "Required-by date"];
const PARTNER_STEPS = ["Volume profile", "States + disciplines", "Workflow review", "Partner agreement"];
export const PARTNER_BEST_FIT = [
  "Electrical contractors",
  "Solar/energy firms",
  "Architects/design firms",
  "Equipment manufacturers",
  "Sign companies",
  "Multi-state contractors",
] as const;
export const PARTNER_BENEFITS = [
  "Dedicated contact",
  "Pre-negotiated pricing",
  "Priority turnaround",
  "Multi-state PE coverage",
  "Calc/review/seal workflows",
  "Monthly tracking",
] as const;

const blankIntake = (): Partial<EstimateIntake> => ({
  state: "", disciplines: [], projectType: undefined, calculationType: undefined, sheetCount: undefined,
  uploadMetadata: { status: "not-started", fileCount: 0, fileNames: [] }, siteVisit: false,
  complexity: { existing: "unknown", floors: "unknown", system: "unknown", documentation: "unknown", jurisdiction: "unknown" },
});

function FieldError({ text }: { text: string | null }) {
  return text ? (
    <div className="mt-6 flex items-start gap-3 rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-destructive">
      <X className="mt-0.5 h-5 w-5 shrink-0" />
      <p role="alert" className="text-sm font-medium">{text}</p>
    </div>
  ) : null;
}

function Option({ checked, label, onChange, type = "radio", name }: { checked: boolean; label: string; onChange: () => void; type?: "radio" | "checkbox"; name?: string }) {
  return (
    <label className={`group relative flex min-h-[4.5rem] w-full cursor-pointer items-center justify-between border p-4 transition-all duration-300 ease-out hover:border-primary/50 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background ${checked ? "border-primary bg-primary/10" : "border-border bg-card shadow-sm hover:bg-white/[0.02]"}`} style={{ boxShadow: checked ? '0 0 20px hsl(var(--primary) / 0.1)' : 'none' }}>
      <div className="flex items-center gap-4">
        <div className={`flex h-5 w-5 items-center justify-center border transition-colors ${type === "radio" ? "rounded-full" : "rounded-sm"} ${checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40 bg-transparent group-hover:border-muted-foreground"}`}>
          {checked && <Check className="h-3 w-3 stroke-[3]" />}
        </div>
        <span className={`text-base font-medium transition-colors ${checked ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
          {label}
        </span>
      </div>
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

function PageShell({ children, faq }: { children: React.ReactNode; faq: object }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 pb-24 pt-32 relative">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent_50%)]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-4xl relative z-10">
        {children}
        <section className="mt-32 border-t border-border/50 pt-16" aria-labelledby="estimate-faq-heading">
          <h2 id="estimate-faq-heading" className="font-display text-2xl uppercase tracking-widest text-muted-foreground">Frequently Asked Questions</h2>
          <div className="mt-8 grid gap-2">
            {ESTIMATE_FAQS.map((item) => (
              <div key={item.question} className="border border-border/50 bg-secondary/10 p-6 transition-colors hover:bg-secondary/20">
                <h3 className="font-display text-lg font-bold text-foreground">{item.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Estimate() {
  usePageMeta(PAGE_META);
  const [path, setPath] = useState<ServicePath | null>(null);
  const [directStep, setDirectStep] = useState(1);
  const [partnerStep, setPartnerStep] = useState(1);
  const [intake, setIntake] = useState<Partial<EstimateIntake>>(blankIntake);
  const [partner, setPartner] = useState<Partial<PartnerProfile>>({ states: [], disciplines: [], agreement: false });
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [uploading, setUploading] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [contact, setContact] = useState<ContactDetails>({ name: "", email: "", phone: "", company: "" });
  const [project, setProject] = useState({ city: "", projectName: "", notes: "" });
  const [proposal, setProposal] = useState<ProposalResponse | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [unknownDate, setUnknownDate] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stepPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { dispatchEstimateAnalytics({ name: "started", payload: {} }); }, []);
  useEffect(() => { headingRef.current?.focus(); }, [directStep, partnerStep, result, path]);
  useEffect(() => {
    if (!error) return;
    const focusTimer = window.setTimeout(() => {
      stepPanelRef.current?.querySelector<HTMLElement>("input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])")?.focus();
    }, 50);
    return () => window.clearTimeout(focusTimer);
  }, [error]);
  useEffect(() => { setError(null); }, [partner]);
  useEffect(() => {
    if (result) dispatchEstimateAnalytics({ name: "result-viewed", payload: { coverage: result.coverage } });
  }, [result]);

  const workingIntake = useMemo(() => {
    const classified = classifySchedule(unknownDate ? undefined : intake.requiredByDate);
    return { ...intake, state: intake.state || "", disciplines: intake.disciplines || [], schedule: classified.schedule, servicePath: path || "engineering-calculations", path: path || "engineering-calculations", partnerRoute: path === "partner-routing", routingMode: path === "partner-routing" ? "partner" : "direct" } as EstimateIntake;
  }, [intake, path, unknownDate]);
  const liveResult = result || (path && path !== "partner-routing" && workingIntake.state && (workingIntake.disciplines?.length ?? 0) > 0 && workingIntake.projectType && workingIntake.sheetCount && workingIntake.calculationType ? calculateEstimate(workingIntake) : null);

  function choosePath(next: ServicePath) {
    setPath(next); setError(null); setResult(null);
    dispatchEstimateAnalytics({ name: "path-selected", payload: { path: next } });
  }
  function updateIntake(values: Partial<EstimateIntake>) { setIntake((current) => ({ ...current, ...values })); setError(null); setResult(null); }
  function focusFirstStepControl() {
    window.setTimeout(() => {
      stepPanelRef.current?.querySelector<HTMLElement>("input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])")?.focus();
    }, 50);
  }
  function nextDirect() {
    const message = directStep === 7 && unknownDate ? null : validateDirectStep(directStep, intake);
    if (message) { setError(message); focusFirstStepControl(); return; }
    dispatchEstimateAnalytics({ name: "step-completed", payload: { step: String(directStep) } });
    if (directStep < 7) setDirectStep((value) => value + 1);
    else setResult(calculateEstimate(workingIntake));
  }
  function nextPartner() {
    const message = validatePartnerStep(partnerStep, partner);
    if (message) { setError(message); focusFirstStepControl(); return; }
    dispatchEstimateAnalytics({ name: "step-completed", payload: { step: `partner-${partnerStep}` } });
    if (partnerStep < 4) setPartnerStep((value) => value + 1);
    else setResult(calculateEstimate(buildPartnerRoutingIntake() as EstimateIntake));
  }
  function back() {
    if (result) { setResult(null); return; }
    if (path === "partner-routing") setPartnerStep((value) => Math.max(1, value - 1));
    else setDirectStep((value) => Math.max(1, value - 1));
  }
  async function handleFiles(files: FileList | File[]) {
    const incoming = Array.from(files).slice(0, Math.max(0, 20 - documents.length));
    const retained = [...documents];
    for (const file of incoming) {
      const clientValidationError = validateEstimateFile(file);
      if (clientValidationError) {
        setUploadError(`${file.name}: ${clientValidationError}`);
        dispatchEstimateAnalytics({ name: "upload-failed", payload: { failureCode: "client-validation" } });
        updateIntake({ uploadMetadata: { status: "failed", failureCode: "client-validation", fileCount: retained.length, fileNames: retained.map((item) => item.name) } });
        continue;
      }
      setUploading((current) => [...current, file.name]);
      try {
        const uploaded = await uploadEstimateDocument(file);
        retained.push(uploaded);
        setDocuments((current) => [...current, uploaded]);
        updateIntake({ uploadMetadata: { status: "uploaded", fileCount: retained.length, fileNames: retained.map((item) => item.name) } });
      } catch {
        const failureCode = "upload-failed";
        setUploadError(`Could not upload ${file.name}. Your answers are preserved; please try again.`);
        dispatchEstimateAnalytics({ name: "upload-failed", payload: { failureCode } });
        updateIntake({ uploadMetadata: { status: "failed", failureCode, fileCount: retained.length, fileNames: retained.map((item) => item.name) } });
      } finally { setUploading((current) => current.filter((name) => name !== file.name)); }
    }
  }
  async function submitProposal() {
    if (!contact.name || !contact.email || !contact.phone || !project.city) { setError("Name, email, phone, and project city are required."); return; }
    setSubmitting(true); setError(null);
    try {
      const proposalIntake = path === "partner-routing" ? buildPartnerRoutingIntake() : workingIntake;
      const response = await submitEstimateProposal(assembleProposalPayload({
        ruleVersion: (liveResult || result)?.ruleVersion || "unknown", intake: proposalIntake, contact,
        city: project.city, projectName: project.projectName, notes: project.notes,
        attribution: defaultAttribution(window.location, document.referrer), documents,
        partnerProfile: path === "partner-routing" ? partner as PartnerProfile : undefined,
      }));
      setProposal(response);
      dispatchEstimateAnalytics({ name: path === "partner-routing" ? "partner-submitted" : "proposal-submitted", payload: {} });
    } catch (submissionError) { setError(submissionError instanceof Error ? submissionError.message : "Submission failed. Your answers are preserved."); }
    finally { setSubmitting(false); }
  }

  const pathTitle = path === "partner-routing" ? "Partner qualification" : "Project intake";

  if (!path) return (
    <PageShell faq={ESTIMATE_FAQ_SCHEMA}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <h1 ref={headingRef} tabIndex={-1} className="text-4xl md:text-6xl font-display font-bold focus:outline-none tracking-tight leading-tight">
          Need Engineering Review, Calculations or a PE Stamp?
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Choose the route that best describes your need. Every route begins with an independent scope review.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PATHS.map((item, i) => (
            <motion.button
              key={item.value}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => choosePath(item.value)}
              className="group relative flex flex-col items-start text-left border border-border bg-card p-8 transition-all duration-500 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary hover:-translate-y-1"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{item.meaning}</p>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground border-t border-border/50 pt-4">{item.safe}</p>
              <span className="mt-8 inline-flex items-center text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Start route <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="mt-8 border border-primary/20 bg-primary/[0.03] p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-grid-primary opacity-20" />
          <div className="relative z-10">
            <h2 className="font-display text-2xl font-bold">B2B Partner Program</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-8 border-t border-primary/10 pt-8">
              <div>
                <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">Best fit for:</p>
                <ul className="grid gap-2.5 text-sm text-foreground/80">
                  {PARTNER_BEST_FIT.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">Benefits include:</p>
                <ul className="grid gap-2.5 text-sm text-foreground/80">
                  {PARTNER_BENEFITS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 text-sm text-muted-foreground border-l-2 border-primary/30 pl-4 py-1 italic">
              Apex provides a dedicated workflow only: there is no auto-acceptance or blanket sealing. Terms follow after Apex approves the partner agreement.
            </p>
            <button
              onClick={() => choosePath("partner-routing")}
              className="mt-8 inline-flex h-14 items-center justify-center border-2 border-primary bg-transparent px-8 text-sm font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
            >
              Explore partner qualification
            </button>
          </div>
        </motion.div>
      </motion.div>
    </PageShell>
  );

  if (proposal) return (
    <PageShell faq={ESTIMATE_FAQ_SCHEMA}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center mt-12">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20" style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.2)' }}>
          <Check className="h-10 w-10 stroke-[3]" />
        </div>
        <h1 ref={headingRef} tabIndex={-1} className="text-5xl md:text-6xl font-display font-bold focus:outline-none tracking-tight">Request received</h1>
        <p className="mt-6 text-xl text-muted-foreground leading-relaxed">Your engineer review request has been submitted.</p>

        <div className="mt-12 border border-border/50 bg-secondary/10 p-8 md:p-10 text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white opacity-5" />
          <div className="relative z-10">
            <div className="flex flex-col gap-4 border-b border-border/50 pb-8 mb-8">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Estimate ID</p>
                <p className="font-mono text-lg font-medium text-foreground">{proposal.estimateId}</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Proposal ID</p>
                <p className="font-mono text-lg font-medium text-foreground">{proposal.proposalId}</p>
              </div>
            </div>

            {proposal.pdfUrl && (
              <a
                className="inline-flex h-14 w-full items-center justify-center border-2 border-primary bg-transparent px-8 text-sm font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
                href={proposal.pdfUrl}
                onClick={() => dispatchEstimateAnalytics({ name: "pdf-downloaded", payload: {} })}
                download
              >
                <FileText className="mr-3 h-5 w-5" />
                Download estimate PDF
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </PageShell>
  );

  const totalSteps = path === "partner-routing" ? 4 : 7;
  const currentStep = path === "partner-routing" ? partnerStep : directStep;
  const stepTitle = path === "partner-routing" ? PARTNER_STEPS[partnerStep - 1] : DIRECT_STEPS[directStep - 1];

  if (result) return (
    <PageShell faq={ESTIMATE_FAQ_SCHEMA}>
      <div className="max-w-4xl mx-auto">
        <button onClick={back} className="mb-10 group inline-flex items-center text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-secondary/20 transition-colors group-hover:border-foreground/30 group-hover:bg-secondary/40">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back and edit answers
        </button>
        <h1 ref={headingRef} tabIndex={-1} className="text-4xl md:text-5xl font-display font-bold focus:outline-none tracking-tight">Your planning range</h1>
        <ResultPanel result={result} />
        <ContactPanel contact={contact} setContact={setContact} project={project} setProject={setProject} error={error} submitting={submitting} onSubmit={submitProposal} partner={path === "partner-routing"} />
      </div>
    </PageShell>
  );

  return (
    <PageShell faq={ESTIMATE_FAQ_SCHEMA}>
      <div className="mb-12">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-primary flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 bg-primary rounded-full animate-pulse" />
              {pathTitle}
            </p>
            <h1 ref={headingRef} tabIndex={-1} className="mt-4 text-3xl md:text-5xl font-display font-bold focus:outline-none tracking-tight">
              {path === "partner-routing" ? "Qualify for the partner program" : stepTitle}
            </h1>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-4xl font-display font-light text-muted-foreground/30">
              {String(currentStep).padStart(2, '0')}
              <span className="text-xl">/{String(totalSteps).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        <div className="h-1.5 w-full overflow-hidden bg-secondary/50 rounded-full" role="progressbar" aria-label={`${pathTitle} progress`} aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={currentStep}>
          <motion.div
            className="h-full bg-primary"
            initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <p className="sr-only" aria-live="polite">Step {currentStep} of {totalSteps}: {stepTitle}</p>
      </div>

      <div ref={stepPanelRef} className="relative min-h-[400px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${path}-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {path === "partner-routing" ? (
              <PartnerStep step={partnerStep} profile={partner} setProfile={setPartner} clearError={() => setError(null)} />
            ) : (
              <DirectStep step={directStep} intake={intake} update={updateIntake} unknownDate={unknownDate} setUnknownDate={setUnknownDate} files={documents} uploading={uploading} uploadError={uploadError} inputRef={fileInputRef} onFiles={handleFiles} removeFile={(pathToRemove) => { const retained = documents.filter((item) => item.path !== pathToRemove); setDocuments(retained); updateIntake({ uploadMetadata: { status: retained.length ? "uploaded" : "not-started", fileCount: retained.length, fileNames: retained.map((item) => item.name) } }); }} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && <FieldError text={error} />}

      <div className="mt-12 flex flex-col-reverse sm:flex-row justify-between gap-4 border-t border-border/50 pt-8">
        <button
          onClick={back}
          disabled={currentStep === 1}
          className="inline-flex h-14 items-center justify-center border border-border bg-transparent px-8 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-40"
        >
          <ArrowLeft className="mr-3 h-4 w-4" /> Back
        </button>
        <button
          onClick={path === "partner-routing" ? nextPartner : nextDirect}
          className="inline-flex h-14 items-center justify-center bg-primary px-10 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
          style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }}
        >
          {currentStep === totalSteps ? "See planning range" : "Continue"}
          <ArrowRight className="ml-3 h-4 w-4" />
        </button>
      </div>
    </PageShell>
  );
}

function DirectStep({ step, intake, update, unknownDate, setUnknownDate, files, uploading, uploadError, inputRef, onFiles, removeFile }: { step: number; intake: Partial<EstimateIntake>; update: (value: Partial<EstimateIntake>) => void; unknownDate: boolean; setUnknownDate: (value: boolean) => void; files: UploadedDocument[]; uploading: string[]; uploadError: string | null; inputRef: React.RefObject<HTMLInputElement | null>; onFiles: (files: FileList | File[]) => void; removeFile: (path: string) => void }) {
  const inputClasses = "h-16 w-full border border-border/50 bg-secondary/30 px-5 text-lg transition-all focus:border-primary focus:bg-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary text-foreground";

  if (step === 1) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">Where is the project?</legend>
      <div className="relative">
        <select aria-label="Project state" value={intake.state || ""} onChange={(event) => update({ state: event.target.value })} className={`${inputClasses} appearance-none pr-12 cursor-pointer`}>
          <option value="">Select state</option>
          {US_STATES.map((state) => <option key={state} value={state}>{state}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-muted-foreground">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </fieldset>
  );

  if (step === 2) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">Which disciplines are needed?</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        {DISCIPLINES.map((discipline) => (
          <Option
            key={discipline}
            type="checkbox"
            label={DISCIPLINE_LABELS[discipline]}
            checked={Boolean(intake.disciplines?.includes(discipline))}
            onChange={() => update({ disciplines: intake.disciplines?.includes(discipline) ? intake.disciplines.filter((item) => item !== discipline) : [...(intake.disciplines || []), discipline] })}
          />
        ))}
      </div>
      <div className="mt-8 border-t border-border/50 pt-6">
        <label className="group inline-flex items-center gap-4 cursor-pointer">
          <div className={`flex h-6 w-6 items-center justify-center border transition-colors ${intake.siteVisit ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card group-hover:border-primary/50"}`}>
            {intake.siteVisit && <Check className="h-4 w-4 stroke-[3]" />}
          </div>
          <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">Site visit may be needed</span>
          <input type="checkbox" checked={Boolean(intake.siteVisit)} onChange={(event) => update({ siteVisit: event.target.checked })} className="sr-only" />
        </label>
      </div>
    </fieldset>
  );

  if (step === 3) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">How many drawing sheets?</legend>
      <div className="max-w-md">
        <input aria-label="Drawing sheet count" type="number" min="1" value={intake.sheetCount || ""} onChange={(event) => update({ sheetCount: Number(event.target.value) || undefined, sizeBand: sizeFromSheets(Number(event.target.value)) })} className={inputClasses} />
        <p className="mt-4 text-sm text-muted-foreground italic border-l-2 border-border pl-3">An approximate count is fine. We use it as a size band, not as a promise of scope.</p>
      </div>
      <div className="mt-10 pt-8 border-t border-border/50">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {(["existing", "floors", "system", "documentation", "jurisdiction"] as const).map((name) => (
            <label key={name} className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {name === "existing" ? "Existing conditions" : name[0].toUpperCase() + name.slice(1)}
              </span>
              <div className="relative">
                <select aria-label={name} value={String(intake.complexity?.[name] || "unknown")} onChange={(event) => update({ complexity: { ...(intake.complexity || {}), [name]: event.target.value as "low" | "medium" | "high" | "unknown" } })} className="h-12 w-full appearance-none border border-border/50 bg-secondary/20 px-4 text-sm transition-all focus:border-primary focus:bg-secondary/40 focus:outline-none pr-10 cursor-pointer text-foreground">
                  <option value="unknown">Unknown</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </fieldset>
  );

  if (step === 4) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">What calculation work is needed?</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        {CALC_TYPES.map((item) => <Option key={item.value} label={item.label} checked={intake.calculationType === item.value} onChange={() => update({ calculationType: item.value })} />)}
      </div>
    </fieldset>
  );

  if (step === 5) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">What is the project type?</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        {PROJECT_TYPES.map((item) => <Option key={item} label={item} checked={intake.projectType === item} onChange={() => update({ projectType: item })} />)}
      </div>
    </fieldset>
  );

  if (step === 6) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">Upload drawings</legend>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/50 pl-4">
        Up to 20 files, 20 MB each. PDFs, images, CAD, and office documents are accepted. Drawings help the engineer confirm scope; they are not read by AI.
      </p>

      <div className="group relative rounded-lg border-2 border-dashed border-border/50 bg-secondary/10 p-10 text-center transition-all hover:border-primary/50 hover:bg-secondary/20 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background">
        <input ref={inputRef} type="file" multiple accept=".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff" onChange={(event) => event.target.files && onFiles(event.target.files)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" aria-label="Upload files" />
        <div className="pointer-events-none flex flex-col items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/50 group-hover:bg-primary/10">
            <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div>
            <span className="inline-flex items-center border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors group-hover:border-primary/50">
              <Upload className="mr-2 h-4 w-4" /> Choose drawings
            </span>
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="mt-6 flex items-start gap-3 rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          <X className="mt-0.5 h-5 w-5 shrink-0" />
          <p role="alert" className="text-sm font-medium">{uploadError}</p>
        </div>
      )}

      {(uploading.length > 0 || files.length > 0) && (
        <div className="mt-8 space-y-3">
          {uploading.map((name) => (
            <div key={name} className="flex items-center gap-4 rounded-sm border border-border bg-card p-4">
              <Loader2 className="h-5 w-5 animate-spin text-primary shrink-0" />
              <p className="text-sm font-medium truncate flex-1">Uploading {name}</p>
            </div>
          ))}
          {files.map((file) => (
            <div key={file.path} className="group flex items-center justify-between gap-4 rounded-sm border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-card/50">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-secondary/50 text-muted-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium truncate" title={file.name}>{file.name}</p>
              </div>
              <button type="button" aria-label={`Remove ${file.name}`} onClick={() => removeFile(file.path)} className="shrink-0 p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );

  return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">When are the deliverables required?</legend>
      <div className="max-w-md">
        <div className="relative">
          <input aria-label="Required-by date" type="date" disabled={unknownDate} value={intake.requiredByDate || ""} onChange={(event) => { setUnknownDate(false); update({ requiredByDate: event.target.value }); }} className={`${inputClasses} ${unknownDate ? 'opacity-40' : ''} [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:hover:opacity-100`} />
        </div>

        <label className="group mt-6 inline-flex items-center gap-4 cursor-pointer">
          <div className={`flex h-6 w-6 items-center justify-center border transition-colors ${unknownDate ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card group-hover:border-primary/50"}`}>
            {unknownDate && <Check className="h-4 w-4 stroke-[3]" />}
          </div>
          <span className={`text-base transition-colors ${unknownDate ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>Date is not known yet (engineer review required)</span>
          <input type="checkbox" checked={unknownDate} onChange={(event) => { setUnknownDate(event.target.checked); update({ requiredByDate: undefined, uncertain: event.target.checked }); }} className="sr-only" />
        </label>

        <p className="mt-8 text-sm text-muted-foreground italic border-l-2 border-border pl-3">
          Dates within three days are review-required; dates within ten days are rush.
        </p>
      </div>
    </fieldset>
  );
}

function PartnerStep({ step, profile, setProfile, clearError }: { step: number; profile: Partial<PartnerProfile>; setProfile: React.Dispatch<React.SetStateAction<Partial<PartnerProfile>>>; clearError: () => void }) {
  if (step === 1) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">What volume profile fits?</legend>
      <div className="grid gap-4 sm:grid-cols-3">
        {["Occasional projects", "Monthly recurring work", "High-volume program"].map((value) => (
          <Option key={value} name="partner-volume" label={value} checked={profile.volume === value} onChange={() => { clearError(); setProfile((current) => ({ ...current, volume: value })); }} />
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 border-t border-border/50 pt-8">
        <div className="bg-secondary/10 p-6 border border-border/30">
          <p className="text-xs font-mono uppercase tracking-widest text-foreground mb-4">Best fit for:</p>
          <ul className="grid gap-2.5 text-sm text-muted-foreground">
            {PARTNER_BEST_FIT.map((item) => <li key={item} className="flex gap-3"><Check className="h-4 w-4 text-primary shrink-0 opacity-70" />{item}</li>)}
          </ul>
        </div>
        <div className="bg-secondary/10 p-6 border border-border/30">
          <p className="text-xs font-mono uppercase tracking-widest text-foreground mb-4">Benefits:</p>
          <ul className="grid gap-2.5 text-sm text-muted-foreground">
            {PARTNER_BENEFITS.map((item) => <li key={item} className="flex gap-3"><Check className="h-4 w-4 text-primary shrink-0 opacity-70" />{item}</li>)}
          </ul>
        </div>
      </div>
    </fieldset>
  );

  if (step === 2) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">Which states and disciplines do you need?</legend>

      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <label className="mb-4 block text-xs font-mono uppercase tracking-widest text-foreground">States</label>
          <select multiple aria-label="Partner states" value={profile.states || []} onChange={(event) => { clearError(); setProfile((current) => ({ ...current, states: Array.from(event.target.selectedOptions, (option) => option.value) })); }} className="h-64 w-full border border-border/50 bg-secondary/20 p-3 text-base focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
            {US_STATES.map((state) => <option key={state} value={state} className="p-2 hover:bg-primary/20 checked:bg-primary/20 checked:text-primary">{state}</option>)}
          </select>
        </div>

        <div className="md:col-span-7">
          <label className="mb-4 block text-xs font-mono uppercase tracking-widest text-foreground">Disciplines</label>
          <div className="grid gap-3 sm:grid-cols-2">
            {DISCIPLINES.map((discipline) => (
              <Option key={discipline} type="checkbox" label={DISCIPLINE_LABELS[discipline]} checked={Boolean(profile.disciplines?.includes(discipline))} onChange={() => { clearError(); setProfile((current) => ({ ...current, disciplines: current.disciplines?.includes(discipline) ? current.disciplines.filter((item) => item !== discipline) : [...(current.disciplines || []), discipline] })); }} />
            ))}
          </div>
        </div>
      </div>
    </fieldset>
  );

  if (step === 3) return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">How should workflow review work?</legend>
      <div className="grid gap-4 flex-col">
        {["Review our current handoff process", "Create a coordinated intake workflow", "Discuss both"].map((value) => (
          <Option key={value} name="partner-workflow" label={value} checked={profile.workflow === value} onChange={() => { clearError(); setProfile((current) => ({ ...current, workflow: value })); }} />
        ))}
      </div>
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/50 pl-4 bg-secondary/10 p-4">
        Benefits can include clearer intake requirements, consistent scope review, and faster routing to the right engineer.
      </p>
    </fieldset>
  );

  return (
    <fieldset className="w-full">
      <legend className="mb-6 text-xl font-display font-medium text-muted-foreground">Partner agreement</legend>

      <div className="mb-8 border border-amber-500/30 bg-amber-500/10 p-6 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
        <p className="text-sm leading-relaxed text-amber-200/90 font-medium">
          This is a dedicated workflow only, not auto-acceptance. There is no blanket sealing or automatic permit approval; terms follow after Apex approves the agreement.
        </p>
      </div>

      <label className="group relative flex cursor-pointer items-start gap-5 border border-border/50 bg-secondary/20 p-6 transition-all hover:border-primary/50 hover:bg-secondary/30">
        <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border transition-colors ${profile.agreement ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card group-hover:border-primary/50"}`}>
          {profile.agreement && <Check className="h-4 w-4 stroke-[3]" />}
        </div>
        <span className="text-base text-foreground/90 leading-relaxed font-medium">
          I understand Apex approval is required for each engagement and that agreement terms follow that approval.
        </span>
        <input type="checkbox" checked={Boolean(profile.agreement)} onChange={(event) => { clearError(); setProfile((current) => ({ ...current, agreement: event.target.checked })); }} className="sr-only" />
      </label>
    </fieldset>
  );
}

function ResultPanel({ result }: { result: EstimateResult }) {
  const hasPrice = result.coverage === "eligible" || result.coverage === "review-required";
  const money = (value: number | null) => value === null ? "Unavailable" : `$${value.toLocaleString("en-US")}`;
  const breakdown = result.factorBreakdown;
  const factorRows = breakdown ? [
    ["Base", money(breakdown.base.low)],
    ["Existing conditions", `${breakdown.complexity.existing.low}–${breakdown.complexity.existing.high}`],
    ["Floors", `${breakdown.complexity.floors.low}–${breakdown.complexity.floors.high}`],
    ["Systems", `${breakdown.complexity.system.low}–${breakdown.complexity.system.high}`],
    ["Documentation", `${breakdown.complexity.documentation.low}–${breakdown.complexity.documentation.high}`],
    ["Jurisdiction", `${breakdown.complexity.jurisdiction.low}–${breakdown.complexity.jurisdiction.high}`],
    ["Schedule multiplier", String(breakdown.schedule.mid)],
    ["Service additions", money(breakdown.services.total)],
    ["Review service", money(breakdown.reviewService.total)],
    ["Stamp allowance (if selected)", money(breakdown.stamp.mid)],
  ] : [];

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-12 overflow-hidden border border-border bg-card shadow-2xl relative" aria-live="polite">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="p-8 md:p-12 relative z-10 border-b border-border/50">
        <p className="text-xs font-mono uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-primary animate-pulse" />
          Placeholder planning range — non-authoritative
        </p>

        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground">
          {hasPrice ? `${money(result.fee.low)} – ${money(result.fee.high)}` : "Pricing unavailable"}
        </h2>

        {result.rushAlert && (
          <div className="mt-8 border border-amber-400/50 bg-amber-400/10 p-4 text-sm font-medium text-amber-300 flex items-start gap-3">
            <svg className="h-5 w-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            Rush schedule alert: this timeline requires engineer review.
          </div>
        )}

        <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">{result.eligibilityLanguage}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 bg-secondary/20 p-6 border border-border/50">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 border-b border-border/50 pb-2">Turnaround</h3>
            <p className="text-lg font-medium text-foreground">{result.turnaround.label}</p>
          </div>
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 border-b border-border/50 pb-2">Coverage</h3>
            <p className="text-lg font-medium text-foreground">{result.coverage}</p>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 bg-secondary/10">
        <h3 className="font-display text-2xl font-bold text-foreground">Per-discipline planning ranges</h3>
        <ul className="mt-6 grid gap-4">
          {result.perDisciplinePrices.map((item) => (
            <li key={item.discipline} className="flex justify-between items-center gap-4 bg-card border border-border/50 p-4 hover:border-primary/30 transition-colors">
              <span className="font-medium text-foreground">{DISCIPLINE_LABELS[item.discipline]}</span>
              <span className="font-mono text-muted-foreground">{money(item.fee.low)} – {money(item.fee.high)}</span>
            </li>
          ))}
        </ul>

        <details className="mt-10 group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between border-b border-border pb-4 font-display text-xl font-bold text-foreground hover:text-primary transition-colors">
            How this range was calculated
            <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </summary>
          <div className="mt-6 grid gap-2 text-sm text-muted-foreground font-mono bg-card border border-border/50 p-6">
            {factorRows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-border/30 py-2 last:border-0">
                <span>{label}</span>
                <span className="text-foreground">{value}</span>
              </div>
            ))}
            <p className="mt-4 pt-4 border-t border-border/50 text-xs text-primary/80 italic font-sans">Unknown inputs widen the range; they never lower the estimate.</p>
          </div>
        </details>

        <div className="mt-10 bg-card border border-border/50 p-6">
          <ul className="space-y-3 text-sm text-foreground/80">
            {result.assumptions.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary opacity-50 mt-1">•</span> {item}
              </li>
            ))}
            {result.missingItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-amber-300">
                <span className="opacity-50 mt-1">•</span> Missing: {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 border-l-2 border-primary/50 pl-4 py-1 text-xs text-muted-foreground italic max-w-3xl">
          A licensed PE decides whether review or sealing is appropriate. This is not permit approval and does not guarantee acceptance by any authority.
        </p>
      </div>
    </motion.section>
  );
}

function ContactPanel({ contact, setContact, project, setProject, error, submitting, onSubmit, partner }: { contact: ContactDetails; setContact: React.Dispatch<React.SetStateAction<ContactDetails>>; project: { city: string; projectName: string; notes: string }; setProject: React.Dispatch<React.SetStateAction<{ city: string; projectName: string; notes: string }>>; error: string | null; submitting: boolean; onSubmit: () => void; partner: boolean }) {
  const cta = resultCta(partner);
  const inputClasses = "h-14 w-full border border-border/50 bg-secondary/30 px-4 text-base transition-all focus:border-primary focus:bg-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary text-foreground";

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 border border-border bg-card p-8 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-5" />
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">{cta}</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl border-l-2 border-primary/50 pl-4">
          A planning result is not a proposal. Share contact and project details so an engineer can review scope.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {(["name", "email", "phone", "company"] as const).map((field) => (
            <label key={field} className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {field === "name" ? "Name" : field[0].toUpperCase() + field.slice(1)}
                {field !== "company" && <span className="text-primary ml-1">*</span>}
              </span>
              <input
                required={field !== "company"}
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                value={contact[field] || ""}
                onChange={(event) => setContact((current) => ({ ...current, [field]: event.target.value }))}
                className={inputClasses}
              />
            </label>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 pt-6 border-t border-border/50">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project city <span className="text-primary ml-1">*</span></span>
            <input required value={project.city} onChange={(event) => setProject((current) => ({ ...current, city: event.target.value }))} className={inputClasses} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project name</span>
            <input value={project.projectName} onChange={(event) => setProject((current) => ({ ...current, projectName: event.target.value }))} className={inputClasses} />
          </label>
        </div>

        <label className="mt-6 flex flex-col gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Notes</span>
          <textarea value={project.notes} onChange={(event) => setProject((current) => ({ ...current, notes: event.target.value }))} className={`${inputClasses} min-h-[120px] py-4 resize-y`} />
        </label>

        {error && (
          <div className="mt-8 flex items-start gap-3 rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-destructive">
            <X className="mt-0.5 h-5 w-5 shrink-0" />
            <p role="alert" className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="mt-10 flex justify-end">
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="inline-flex h-16 w-full sm:w-auto min-w-[280px] items-center justify-center bg-primary px-8 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]"
            style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }}
          >
            {submitting ? (
              <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> Submitting…</>
            ) : (
              <>{cta} <ArrowRight className="ml-3 h-5 w-5" /></>
            )}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
