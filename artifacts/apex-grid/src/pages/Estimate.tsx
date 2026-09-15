import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileText, Loader2, Upload, X } from "lucide-react";
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
  return text ? <p role="alert" className="mt-2 text-sm text-destructive">{text}</p> : null;
}
function Option({ checked, label, onChange, type = "radio", name }: { checked: boolean; label: string; onChange: () => void; type?: "radio" | "checkbox"; name?: string }) {
  return <label className={`flex min-h-12 items-center gap-3 border p-3 text-sm cursor-pointer ${checked ? "border-primary bg-primary/10" : "border-border bg-background hover:border-primary/50"}`}>
    <input type={type} name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-primary" /> <span>{label}</span>
  </label>;
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
  if (!path) return <PageShell faq={ESTIMATE_FAQ_SCHEMA}>
    <h1 ref={headingRef} tabIndex={-1} className="text-4xl md:text-5xl font-display font-bold focus:outline-none">Need Engineering Review, Calculations or a PE Stamp?</h1>
    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Choose the route that best describes your need. Every route begins with an independent scope review.</p>
    <div className="mt-10 grid gap-4 md:grid-cols-3">{PATHS.map((item) => <button key={item.value} onClick={() => choosePath(item.value)} className="text-left border border-border bg-card p-6 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"><h2 className="font-display text-xl font-bold">{item.title}</h2><p className="mt-3 text-sm text-muted-foreground">{item.meaning}</p><p className="mt-3 text-xs text-muted-foreground">{item.safe}</p><span className="mt-6 inline-flex text-xs font-mono uppercase tracking-widest text-primary">Start route <ArrowRight className="ml-2 h-4" /></span></button>)}</div>
    <div className="mt-5 border border-primary/30 bg-primary/10 p-6"><h2 className="font-display text-xl font-bold">B2B Partner Program</h2><p className="mt-2 text-sm text-muted-foreground">Best fit for:</p><ul className="mt-3 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">{PARTNER_BEST_FIT.map((item) => <li key={item}>• {item}</li>)}</ul><p className="mt-4 text-sm text-muted-foreground">Benefits include:</p><ul className="mt-3 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">{PARTNER_BENEFITS.map((item) => <li key={item}>• {item}</li>)}</ul><p className="mt-4 text-sm text-muted-foreground">Apex provides a dedicated workflow only: there is no auto-acceptance or blanket sealing. Terms follow after Apex approves the partner agreement.</p><button onClick={() => choosePath("partner-routing")} className="mt-4 border border-primary px-4 py-3 text-sm font-bold">Explore partner qualification</button></div>
  </PageShell>;

  if (proposal) return <PageShell faq={ESTIMATE_FAQ_SCHEMA}><h1 ref={headingRef} tabIndex={-1} className="text-4xl font-display font-bold focus:outline-none">Request received</h1><p className="mt-4 text-muted-foreground">Your engineer review request has been submitted.</p><div className="mt-8 border border-primary/30 bg-primary/10 p-6"><p className="font-mono text-sm">Estimate ID: <strong>{proposal.estimateId}</strong></p><p className="font-mono text-sm">Proposal ID: <strong>{proposal.proposalId}</strong></p>{proposal.pdfUrl && <a className="mt-5 inline-block border border-primary px-4 py-3 font-bold" href={proposal.pdfUrl} onClick={() => dispatchEstimateAnalytics({ name: "pdf-downloaded", payload: {} })} download>Download estimate PDF</a>}</div></PageShell>;

  const totalSteps = path === "partner-routing" ? 4 : 7;
  const currentStep = path === "partner-routing" ? partnerStep : directStep;
  if (result) return <PageShell faq={ESTIMATE_FAQ_SCHEMA}><button onClick={back} className="mb-6 inline-flex items-center text-sm text-muted-foreground"><ArrowLeft className="mr-2 h-4" /> Back and edit answers</button><h1 ref={headingRef} tabIndex={-1} className="text-4xl font-display font-bold focus:outline-none">Your planning range</h1><ResultPanel result={result} /><ContactPanel contact={contact} setContact={setContact} project={project} setProject={setProject} error={error} submitting={submitting} onSubmit={submitProposal} partner={path === "partner-routing"} /></PageShell>;

  return <PageShell faq={ESTIMATE_FAQ_SCHEMA}><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-mono uppercase tracking-widest text-primary">{pathTitle}</p><h1 ref={headingRef} tabIndex={-1} className="mt-2 text-3xl md:text-4xl font-display font-bold focus:outline-none">{path === "partner-routing" ? "Qualify for the partner program" : DIRECT_STEPS[directStep - 1]}</h1></div><span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span></div><div className="mt-5 h-2 bg-border" role="progressbar" aria-label={`${pathTitle} progress`} aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={currentStep}><div className="h-full bg-primary transition-all" style={{ width: `${currentStep / totalSteps * 100}%` }} /></div><p className="sr-only" aria-live="polite">Step {currentStep} of {totalSteps}: {path === "partner-routing" ? PARTNER_STEPS[partnerStep - 1] : DIRECT_STEPS[directStep - 1]}</p>
    <div ref={stepPanelRef} className="mt-8">{path === "partner-routing" ? <PartnerStep step={partnerStep} profile={partner} setProfile={setPartner} clearError={() => setError(null)} /> : <DirectStep step={directStep} intake={intake} update={updateIntake} unknownDate={unknownDate} setUnknownDate={setUnknownDate} files={documents} uploading={uploading} uploadError={uploadError} inputRef={fileInputRef} onFiles={handleFiles} removeFile={(pathToRemove) => { const retained = documents.filter((item) => item.path !== pathToRemove); setDocuments(retained); updateIntake({ uploadMetadata: { status: retained.length ? "uploaded" : "not-started", fileCount: retained.length, fileNames: retained.map((item) => item.name) } }); }} />}</div>
    {error && <FieldError text={error} />}
    <div className="mt-8 flex justify-between gap-3"><button onClick={back} disabled={currentStep === 1} className="inline-flex min-h-12 items-center border border-border px-5 font-bold disabled:opacity-40"><ArrowLeft className="mr-2 h-4" /> Back</button><button onClick={path === "partner-routing" ? nextPartner : nextDirect} className="inline-flex min-h-12 items-center bg-primary px-6 font-bold text-primary-foreground">{currentStep === totalSteps ? "See planning range" : "Continue"}<ArrowRight className="ml-2 h-4" /></button></div>
  </PageShell>;
}

function DirectStep({ step, intake, update, unknownDate, setUnknownDate, files, uploading, uploadError, inputRef, onFiles, removeFile }: { step: number; intake: Partial<EstimateIntake>; update: (value: Partial<EstimateIntake>) => void; unknownDate: boolean; setUnknownDate: (value: boolean) => void; files: UploadedDocument[]; uploading: string[]; uploadError: string | null; inputRef: React.RefObject<HTMLInputElement | null>; onFiles: (files: FileList | File[]) => void; removeFile: (path: string) => void }) {
  if (step === 1) return <fieldset><legend className="mb-4 text-lg font-bold">Where is the project?</legend><select aria-label="Project state" value={intake.state || ""} onChange={(event) => update({ state: event.target.value })} className="h-14 w-full border border-border bg-background px-3"><option value="">Select state</option>{US_STATES.map((state) => <option key={state}>{state}</option>)}</select></fieldset>;
  if (step === 2) return <fieldset><legend className="mb-4 text-lg font-bold">Which disciplines are needed?</legend><div className="grid gap-3 sm:grid-cols-2">{DISCIPLINES.map((discipline) => <Option key={discipline} type="checkbox" label={DISCIPLINE_LABELS[discipline]} checked={Boolean(intake.disciplines?.includes(discipline))} onChange={() => update({ disciplines: intake.disciplines?.includes(discipline) ? intake.disciplines.filter((item) => item !== discipline) : [...(intake.disciplines || []), discipline] })} />)}</div><label className="mt-5 flex items-center gap-3 text-sm"><input type="checkbox" checked={Boolean(intake.siteVisit)} onChange={(event) => update({ siteVisit: event.target.checked })} className="accent-primary" /> Site visit may be needed</label></fieldset>;
  if (step === 3) return <fieldset><legend className="mb-4 text-lg font-bold">How many drawing sheets?</legend><input aria-label="Drawing sheet count" type="number" min="1" value={intake.sheetCount || ""} onChange={(event) => update({ sheetCount: Number(event.target.value) || undefined, sizeBand: sizeFromSheets(Number(event.target.value)) })} className="h-14 w-full border border-border bg-background px-3" /><p className="mt-2 text-sm text-muted-foreground">An approximate count is fine. We use it as a size band, not as a promise of scope.</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{(["existing", "floors", "system", "documentation", "jurisdiction"] as const).map((name) => <label key={name} className="text-sm font-semibold">{name === "existing" ? "Existing conditions" : name[0].toUpperCase() + name.slice(1)}<select aria-label={name} value={String(intake.complexity?.[name] || "unknown")} onChange={(event) => update({ complexity: { ...(intake.complexity || {}), [name]: event.target.value as "low" | "medium" | "high" | "unknown" } })} className="mt-2 h-12 w-full border border-border bg-background px-2 font-normal"><option value="unknown">Unknown</option><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label>)}</div></fieldset>;
  if (step === 4) return <fieldset><legend className="mb-4 text-lg font-bold">What calculation work is needed?</legend><div className="grid gap-3 sm:grid-cols-2">{CALC_TYPES.map((item) => <Option key={item.value} label={item.label} checked={intake.calculationType === item.value} onChange={() => update({ calculationType: item.value })} />)}</div></fieldset>;
  if (step === 5) return <fieldset><legend className="mb-4 text-lg font-bold">What is the project type?</legend><div className="grid gap-3">{PROJECT_TYPES.map((item) => <Option key={item} label={item} checked={intake.projectType === item} onChange={() => update({ projectType: item })} />)}</div></fieldset>;
  if (step === 6) return <fieldset><legend className="mb-4 text-lg font-bold">Upload drawings</legend><p className="mb-4 text-sm text-muted-foreground">Up to 20 files, 20 MB each. PDFs, images, CAD, and office documents are accepted. Drawings help the engineer confirm scope; they are not read by AI.</p><input ref={inputRef} type="file" multiple accept=".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff" onChange={(event) => event.target.files && onFiles(event.target.files)} className="block w-full text-sm" /><button type="button" onClick={() => inputRef.current?.click()} className="mt-4 inline-flex items-center border border-border px-4 py-3 text-sm"><Upload className="mr-2 h-4" /> Choose drawings</button>{uploadError && <p role="alert" className="mt-3 text-sm text-destructive">{uploadError}</p>}<div className="mt-4 space-y-2">{uploading.map((name) => <p key={name} className="text-sm"><Loader2 className="mr-2 inline h-4 animate-spin" />Uploading {name}</p>)}{files.map((file) => <p key={file.path} className="flex items-center gap-2 text-sm"><FileText className="h-4" />{file.name}<button type="button" aria-label={`Remove ${file.name}`} onClick={() => removeFile(file.path)}><X className="h-4" /></button></p>)}</div></fieldset>;
  return <fieldset><legend className="mb-4 text-lg font-bold">When are the deliverables required?</legend><input aria-label="Required-by date" type="date" disabled={unknownDate} value={intake.requiredByDate || ""} onChange={(event) => { setUnknownDate(false); update({ requiredByDate: event.target.value }); }} className="h-14 w-full border border-border bg-background px-3" /><label className="mt-5 flex items-center gap-3 text-sm"><input type="checkbox" checked={unknownDate} onChange={(event) => { setUnknownDate(event.target.checked); update({ requiredByDate: undefined, uncertain: event.target.checked }); }} className="accent-primary" /> Date is not known yet (engineer review required)</label><p className="mt-3 text-sm text-muted-foreground">Dates within three days are review-required; dates within ten days are rush.</p></fieldset>;
}

function PartnerStep({ step, profile, setProfile, clearError }: { step: number; profile: Partial<PartnerProfile>; setProfile: React.Dispatch<React.SetStateAction<Partial<PartnerProfile>>>; clearError: () => void }) {
  if (step === 1) return <fieldset><legend className="mb-4 text-lg font-bold">What volume profile fits?</legend><div className="grid gap-3">{["Occasional projects", "Monthly recurring work", "High-volume program"].map((value) => <Option key={value} name="partner-volume" label={value} checked={profile.volume === value} onChange={() => { clearError(); setProfile((current) => ({ ...current, volume: value })); }} />)}</div><p className="mt-5 text-sm font-semibold">Best fit for:</p><ul className="mt-2 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">{PARTNER_BEST_FIT.map((item) => <li key={item}>• {item}</li>)}</ul><p className="mt-5 text-sm font-semibold">Benefits:</p><ul className="mt-2 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">{PARTNER_BENEFITS.map((item) => <li key={item}>• {item}</li>)}</ul></fieldset>;
  if (step === 2) return <fieldset><legend className="mb-4 text-lg font-bold">Which states and disciplines do you need?</legend><label className="mb-2 block text-sm font-semibold">States</label><select multiple aria-label="Partner states" value={profile.states || []} onChange={(event) => { clearError(); setProfile((current) => ({ ...current, states: Array.from(event.target.selectedOptions, (option) => option.value) })); }} className="h-32 w-full border border-border bg-background p-2">{US_STATES.map((state) => <option key={state}>{state}</option>)}</select><label className="mb-2 mt-5 block text-sm font-semibold">Disciplines</label><div className="grid gap-3 sm:grid-cols-2">{DISCIPLINES.map((discipline) => <Option key={discipline} type="checkbox" label={DISCIPLINE_LABELS[discipline]} checked={Boolean(profile.disciplines?.includes(discipline))} onChange={() => { clearError(); setProfile((current) => ({ ...current, disciplines: current.disciplines?.includes(discipline) ? current.disciplines.filter((item) => item !== discipline) : [...(current.disciplines || []), discipline] })); }} />)}</div></fieldset>;
  if (step === 3) return <fieldset><legend className="mb-4 text-lg font-bold">How should workflow review work?</legend><div className="grid gap-3">{["Review our current handoff process", "Create a coordinated intake workflow", "Discuss both"].map((value) => <Option key={value} name="partner-workflow" label={value} checked={profile.workflow === value} onChange={() => { clearError(); setProfile((current) => ({ ...current, workflow: value })); }} />)}</div><p className="mt-4 text-sm text-muted-foreground">Benefits can include clearer intake requirements, consistent scope review, and faster routing to the right engineer.</p></fieldset>;
  return <fieldset><legend className="mb-4 text-lg font-bold">Partner agreement</legend><p className="mb-4 text-sm text-muted-foreground">This is a dedicated workflow only, not auto-acceptance. There is no blanket sealing or automatic permit approval; terms follow after Apex approves the agreement.</p><label className="flex gap-3 text-sm"><input type="checkbox" checked={Boolean(profile.agreement)} onChange={(event) => { clearError(); setProfile((current) => ({ ...current, agreement: event.target.checked })); }} className="mt-1 accent-primary" /><span>I understand Apex approval is required for each engagement and that agreement terms follow that approval.</span></label></fieldset>;
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
  return <section className="mt-8 border border-border bg-card p-5 md:p-8" aria-live="polite"><p className="text-xs font-mono uppercase tracking-widest text-primary">Placeholder planning range — non-authoritative</p><h2 className="mt-3 text-3xl font-display font-bold">{hasPrice ? `${money(result.fee.low)} – ${money(result.fee.high)}` : "Pricing unavailable"}</h2>{result.rushAlert && <p role="alert" className="mt-3 border border-amber-300/50 bg-amber-300/10 p-3 text-sm text-amber-200">Rush schedule alert: this timeline requires engineer review.</p>}<p className="mt-2 text-muted-foreground">{result.eligibilityLanguage}</p><div className="mt-6 grid gap-5 sm:grid-cols-2"><div><h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Turnaround</h3><p className="mt-2">{result.turnaround.label}</p></div><div><h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Coverage</h3><p className="mt-2">{result.coverage}</p></div></div><h3 className="mt-8 font-bold">Per-discipline planning ranges</h3><ul className="mt-3 space-y-2 text-sm">{result.perDisciplinePrices.map((item) => <li key={item.discipline} className="flex justify-between gap-4 border-b border-border py-2"><span>{DISCIPLINE_LABELS[item.discipline]}</span><span>{money(item.fee.low)} – {money(item.fee.high)}</span></li>)}</ul><details className="mt-7"><summary className="cursor-pointer font-bold">How this range was calculated</summary><div className="mt-4 space-y-2 text-sm text-muted-foreground">{factorRows.map(([label, value]) => <p key={label} className="flex justify-between gap-4 border-b border-border/50 py-1"><span>{label}</span><span>{value}</span></p>)}<p>Unknown inputs widen the range; they never lower the estimate.</p></div></details><ul className="mt-6 space-y-2 text-sm text-muted-foreground">{result.assumptions.map((item) => <li key={item}>• {item}</li>)}{result.missingItems.map((item) => <li key={item} className="text-amber-300">Missing: {item}</li>)}</ul><p className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">A licensed PE decides whether review or sealing is appropriate. This is not permit approval and does not guarantee acceptance by any authority.</p></section>;
}

function ContactPanel({ contact, setContact, project, setProject, error, submitting, onSubmit, partner }: { contact: ContactDetails; setContact: React.Dispatch<React.SetStateAction<ContactDetails>>; project: { city: string; projectName: string; notes: string }; setProject: React.Dispatch<React.SetStateAction<{ city: string; projectName: string; notes: string }>>; error: string | null; submitting: boolean; onSubmit: () => void; partner: boolean }) {
  const cta = resultCta(partner);
  return <section className="mt-8 border border-border bg-card p-5 md:p-8"><h2 className="text-2xl font-display font-bold">{cta}</h2><p className="mt-2 text-sm text-muted-foreground">A planning result is not a proposal. Share contact and project details so an engineer can review scope.</p><div className="mt-6 grid gap-4 sm:grid-cols-2">{(["name", "email", "phone", "company"] as const).map((field) => <label key={field} className="text-sm font-semibold">{field === "name" ? "Name" : field[0].toUpperCase() + field.slice(1)}{field !== "company" && " *"}<input required={field !== "company"} type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} value={contact[field] || ""} onChange={(event) => setContact((current) => ({ ...current, [field]: event.target.value }))} className="mt-2 h-12 w-full border border-border bg-background px-3 font-normal" /></label>)}</div><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold">Project city *<input required value={project.city} onChange={(event) => setProject((current) => ({ ...current, city: event.target.value }))} className="mt-2 h-12 w-full border border-border bg-background px-3 font-normal" /></label><label className="text-sm font-semibold">Project name<input value={project.projectName} onChange={(event) => setProject((current) => ({ ...current, projectName: event.target.value }))} className="mt-2 h-12 w-full border border-border bg-background px-3 font-normal" /></label></div><label className="mt-4 block text-sm font-semibold">Notes<textarea value={project.notes} onChange={(event) => setProject((current) => ({ ...current, notes: event.target.value }))} className="mt-2 min-h-24 w-full border border-border bg-background p-3 font-normal" /></label>{error && <FieldError text={error} />}<button onClick={onSubmit} disabled={submitting} className="mt-6 min-h-14 w-full bg-primary px-5 font-bold text-primary-foreground disabled:opacity-60">{submitting ? "Submitting…" : cta}</button></section>;
}

function PageShell({ children, faq }: { children: React.ReactNode; faq: object }) {
  return <main className="min-h-screen overflow-x-hidden bg-background px-4 pb-20 pt-28"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }} /><div className="mx-auto max-w-4xl">{children}<section className="mt-20 border-t border-border pt-12" aria-labelledby="estimate-faq-heading"><h2 id="estimate-faq-heading" className="font-display text-3xl font-bold">Frequently Asked Questions</h2><div className="mt-8 grid gap-px border border-border bg-border">{ESTIMATE_FAQS.map((item) => <div key={item.question} className="bg-card p-6"><h3 className="font-display text-xl font-semibold">{item.question}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p></div>)}</div></section></div></main>;
}