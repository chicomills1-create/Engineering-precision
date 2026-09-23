import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calculator, Check, Download, FileCheck, Loader2, Stamp, Upload, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_URL, usePageMeta } from "@/lib/seo";
import {
  type CalculationType,
  type Discipline,
  type EstimateIntake,
  type ProjectType,
  type ServicePath,
  type SizeBand,
} from "@workspace/estimate-engine";
import {
  assembleProposalPayload,
  defaultAttribution,
  dispatchEstimateAnalytics,
  validateEstimateFile,
  type ContactDetails,
  type UploadedDocument,
} from "@/lib/estimate-flow";
import { submitEstimateProposal, uploadEstimateDocument, type ProposalResponse } from "@/lib/estimate-api";
import { FLAT_RATES, SQFT_RATES, getStateMultiplier, type SqftProjectType } from "@/lib/estimate-pricing";

/**
 * Simplified tap-tap-tap estimator.
 *
 * 3 taps -> ballpark price + turnaround -> lead capture -> confirmation.
 * Ballpark numbers come from the simple $/sqft ranges in estimate-pricing.ts
 * (competitive-leaning: low to typical, never inflated). The full proposal
 * still flows through POST /api/estimates/proposals with a valid intake.
 */

const RULE_VERSION = "phase9-r1-placeholder-v1";

const PAGE_META = {
  title: "How Much Will Your Design Cost? | Apex Grid Engineering",
  description: "Get an instant ballpark price for PE stamping, engineering calculations, or both. Three taps, honest numbers, fast turnaround.",
  path: "/estimate",
};

const ESTIMATE_FAQS = [
  { question: "How much will my design cost?", answer: "Tap through three quick questions and you'll see an instant ballpark range plus our typical turnaround. Final pricing is confirmed after we review your project." },
  { question: "Is the ballpark price binding?", answer: "No — it's a planning number to get you started. We've been known to beat competitor pricing, and your final quote comes after a quick review of your plans." },
  { question: "How fast is the turnaround?", answer: "PE stamp reviews typically run 5–10 business days; full calculations 10–20 business days. Upload your plans with your estimate and we'll confirm a date." },
];
const ESTIMATE_FAQ_SCHEMA = {
  "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_URL}/estimate#faq`,
  mainEntity: ESTIMATE_FAQS.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
};

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

/* ------------------------------- tap options ------------------------------ */

type Need = Exclude<ServicePath, "partner-routing">;

const NEEDS: Array<{ value: Need; title: string; subtitle: string; icon: typeof Stamp }> = [
  { value: "pe-review-sealing", title: "PE Stamp", subtitle: "Need your design stamped?", icon: Stamp },
  { value: "engineering-calculations", title: "Calculations", subtitle: "Need calculations done?", icon: Calculator },
  { value: "calculations-stamped-drawings", title: "Both", subtitle: "Need calculations done and stamped?", icon: FileCheck },
];

const PROJECT_TYPES: Array<{ value: ProjectType; label: string }> = [
  { value: "New commercial building (office/retail/mixed-use)", label: "New Commercial" },
  { value: "Tenant improvement / remodel", label: "Tenant Improvement / Remodel" },
  { value: "Industrial / warehouse", label: "Industrial / Warehouse" },
  { value: "Restaurant / food service", label: "Restaurant / Food Service" },
  { value: "Healthcare / medical", label: "Healthcare / Medical" },
  { value: "ADU / residential", label: "ADU / Residential" },
  { value: "Title 24 energy compliance only", label: "Title 24" },
  { value: "Plan-check corrections", label: "Plan-Check Corrections" },
];

const SQFT_SIZES: Array<{ label: string; midpoint: number }> = [
  { label: "Under 5,000 sq ft", midpoint: 2500 },
  { label: "5,000 – 20,000 sq ft", midpoint: 12500 },
  { label: "20,000 – 50,000 sq ft", midpoint: 35000 },
  { label: "50,000 – 100,000 sq ft", midpoint: 75000 },
  { label: "Over 100,000 sq ft", midpoint: 150000 },
];

const FLAT_TYPES: ProjectType[] = ["ADU / residential", "Title 24 energy compliance only", "Plan-check corrections"];

const TURNAROUND: Record<Need, string> = {
  "pe-review-sealing": "5–10 business days",
  "engineering-calculations": "10–20 business days",
  "calculations-stamped-drawings": "10–20 business days",
};

/* ------------------------- internal server mappings ------------------------ */
/* The visitor never sees these — they keep the proposal API happy. */

const DISCIPLINES_FOR: Record<ProjectType, Discipline[]> = {
  "New commercial building (office/retail/mixed-use)": ["structural", "mechanical", "electrical", "plumbing"],
  "Tenant improvement / remodel": ["mechanical", "electrical", "plumbing"],
  "Industrial / warehouse": ["structural", "mechanical", "electrical"],
  "Restaurant / food service": ["mechanical", "electrical", "plumbing"],
  "Healthcare / medical": ["structural", "mechanical", "electrical", "plumbing"],
  "ADU / residential": ["structural", "mechanical", "electrical", "plumbing"],
  "PE stamp & plan review only": ["structural", "mechanical", "electrical", "plumbing"],
  "Title 24 energy compliance only": ["energy"],
  "Plan-check corrections": ["structural", "mechanical", "electrical", "plumbing"],
};

const CALC_FOR: Record<Need, CalculationType> = {
  "pe-review-sealing": "code-compliance",
  "engineering-calculations": "design",
  "calculations-stamped-drawings": "permit-set",
};

function sizeBandFor(sqft: number | null, projectType: ProjectType): SizeBand {
  if (projectType === "ADU / residential" || projectType === "Title 24 energy compliance only") return "small";
  if (projectType === "Plan-check corrections") return "medium";
  const f = sqft ?? 10000;
  if (f < 5000) return "small";
  if (f < 20000) return "medium";
  if (f < 100000) return "large";
  return "very-large";
}

/* ------------------------------ ballpark math ------------------------------ */
/* Competitive-leaning: low to typical. Never inflated — the goal is to get
   people in the door, not to maximize the number. */

type Ballpark = { low: number; high: number } | { custom: string };

function isCustom(b: Ballpark): b is { custom: string } {
  return "custom" in b;
}

function computeBallpark(need: Need, projectType: ProjectType, sqft: number | null, state: string): Ballpark {
  const mult = getStateMultiplier(state);

  if (projectType === "Plan-check corrections") {
    return { custom: "Typical $1,500–$5,000" };
  }
  if (projectType === "ADU / residential") {
    const r = FLAT_RATES["ADU / residential"];
    return { low: r.low, high: r.headline };
  }
  if (projectType === "Title 24 energy compliance only") {
    const r = FLAT_RATES["Title 24 energy compliance only"];
    return { low: r.low, high: r.headline };
  }

  const rates = SQFT_RATES[projectType as SqftProjectType];
  const feet = sqft ?? 10000;

  if (need === "pe-review-sealing") {
    const reference = Math.max(1500, feet * rates.headline * mult);
    return {
      low: Math.max(500, Math.round(reference * 0.10)),
      high: Math.max(500, Math.round(reference * 0.12)),
    };
  }
  return {
    low: Math.max(1500, Math.round(feet * rates.low * mult)),
    high: Math.max(1500, Math.round(feet * rates.headline * mult)),
  };
}

const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

/* --------------------------------- UI bits --------------------------------- */

function PageShell({ children, faq }: { children: React.ReactNode; faq: object }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 pb-24 pt-28 md:pt-32 relative">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent_50%)]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-3xl relative z-10">
        {children}
        <section className="mt-24 border-t border-border/50 pt-12" aria-labelledby="estimate-faq-heading">
          <h2 id="estimate-faq-heading" className="font-display text-xl uppercase tracking-widest text-muted-foreground">Frequently Asked Questions</h2>
          <div className="mt-6 grid gap-2">
            {ESTIMATE_FAQS.map((item) => (
              <div key={item.question} className="border border-border/50 bg-secondary/10 p-5">
                <h3 className="font-display text-base font-bold text-foreground">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function TapCard({ selected, onClick, children, className = "" }: { selected?: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`w-full text-left border p-6 md:p-7 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
        selected
          ? "border-primary bg-primary/[0.06]"
          : "border-border bg-card hover:border-primary/60"
      } ${className}`}
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
    >
      {children}
    </motion.button>
  );
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < current ? "bg-primary" : "bg-border"}`} />
      ))}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <ArrowLeft className="h-4 w-4" /> Back
    </button>
  );
}

/* --------------------------------- main ------------------------------------ */

export default function Estimate() {
  usePageMeta(PAGE_META);
  const [screen, setScreen] = useState(1);
  const [need, setNeed] = useState<Need | null>(null);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [sqft, setSqft] = useState<number | null>(null);
  const [state, setState] = useState("AZ");
  const [contact, setContact] = useState<ContactDetails>({ name: "", email: "", phone: "", company: "" });
  const [city, setCity] = useState("");
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [uploading, setUploading] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [proposal, setProposal] = useState<ProposalResponse | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const needsSize = projectType !== null && !FLAT_TYPES.includes(projectType);
  const ballpark: Ballpark | null =
    need && projectType && (!needsSize || sqft !== null)
      ? computeBallpark(need, projectType, sqft, state)
      : null;

  const goTo = (n: number) => {
    setError(null);
    setScreen(n);
    headingRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pickNeed = (value: Need) => {
    setNeed(value);
    dispatchEstimateAnalytics({ name: "step-completed", payload: { step: "need-selected" } });
    goTo(2);
  };

  const pickProjectType = (value: ProjectType) => {
    setProjectType(value);
    setSqft(null);
    dispatchEstimateAnalytics({ name: "step-completed", payload: { step: "type-selected" } });
    goTo(FLAT_TYPES.includes(value) ? 4 : 3);
  };

  const pickSize = (midpoint: number) => {
    setSqft(midpoint);
    dispatchEstimateAnalytics({ name: "step-completed", payload: { step: "size-selected" } });
    goTo(4);
  };

  async function handleFiles(files: FileList | File[]) {
    const incoming = Array.from(files).slice(0, Math.max(0, 10 - documents.length));
    const retained = [...documents];
    for (const file of incoming) {
      const clientValidationError = validateEstimateFile(file);
      if (clientValidationError) {
        setUploadError(`${file.name}: ${clientValidationError}`);
        continue;
      }
      setUploading((current) => [...current, file.name]);
      try {
        const uploaded = await uploadEstimateDocument(file);
        retained.push(uploaded);
        setDocuments((current) => [...current, uploaded]);
      } catch {
        setUploadError(`Could not upload ${file.name}. Please try again.`);
      } finally {
        setUploading((current) => current.filter((name) => name !== file.name));
      }
    }
  }

  async function submitProposal() {
    if (!contact.name.trim() || !contact.email.trim() || !contact.phone.trim() || !city.trim()) {
      setError("Name, email, phone, and project city are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!need || !projectType || !ballpark) {
      setError("Something's missing — please go back and complete each step.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const intake: EstimateIntake = {
        state,
        disciplines: DISCIPLINES_FOR[projectType],
        projectType,
        calculationType: CALC_FOR[need],
        sizeBand: sizeBandFor(sqft, projectType),
        servicePath: need,
        path: need,
        schedule: "standard",
        routingMode: "direct",
        uploadMetadata: documents.length
          ? { status: "uploaded", fileCount: documents.length, fileNames: documents.map((d) => d.name) }
          : { status: "not-started", fileCount: 0 },
      };
      const response = await submitEstimateProposal(assembleProposalPayload({
        ruleVersion: RULE_VERSION,
        intake,
        contact: { ...contact, name: contact.name.trim(), email: contact.email.trim(), phone: contact.phone.trim() },
        city: city.trim(),
        attribution: defaultAttribution(window.location, document.referrer),
        documents,
      }));
      setProposal(response);
      dispatchEstimateAnalytics({ name: "proposal-submitted", payload: {} });
      goTo(6);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const needLabel = NEEDS.find((n) => n.value === need);
  const typeLabel = PROJECT_TYPES.find((t) => t.value === projectType)?.label;
  const sizeLabel = SQFT_SIZES.find((s) => s.midpoint === sqft)?.label;

  return (
    <PageShell faq={ESTIMATE_FAQ_SCHEMA}>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* ------------------------------- Screen 1 ------------------------------- */}
          {screen === 1 && (
            <div>
              <StepDots current={1} total={3} />
              <h1 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight focus:outline-none">
                What do you need?
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">Tap one. Takes ten seconds.</p>
              <div className="mt-10 grid gap-4">
                {NEEDS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <TapCard key={item.value} onClick={() => pickNeed(item.value)}>
                      <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-display text-2xl font-bold">{item.title}</div>
                          <div className="mt-1 text-base text-muted-foreground">{item.subtitle}</div>
                        </div>
                        <ArrowRight className="h-6 w-6 text-primary shrink-0" />
                      </div>
                    </TapCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------- Screen 2 ------------------------------- */}
          {screen === 2 && (
            <div>
              <StepDots current={2} total={3} />
              <h1 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight focus:outline-none">
                What type of project?
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">Pick the closest match.</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {PROJECT_TYPES.map((item) => (
                  <TapCard key={item.value} selected={projectType === item.value} onClick={() => pickProjectType(item.value)} className="p-5 md:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-lg font-bold leading-snug">{item.label}</span>
                      {projectType === item.value && <Check className="h-5 w-5 text-primary shrink-0" />}
                    </div>
                  </TapCard>
                ))}
              </div>
              <div className="mt-8"><BackButton onClick={() => goTo(1)} /></div>
            </div>
          )}

          {/* ------------------------------- Screen 3 ------------------------------- */}
          {screen === 3 && needsSize && (
            <div>
              <StepDots current={3} total={3} />
              <h1 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight focus:outline-none">
                How big?
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">Rough square footage is fine.</p>
              <div className="mt-10 grid gap-3">
                {SQFT_SIZES.map((item) => (
                  <TapCard key={item.label} selected={sqft === item.midpoint} onClick={() => pickSize(item.midpoint)} className="p-5 md:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-xl font-bold">{item.label}</span>
                      {sqft === item.midpoint
                        ? <Check className="h-6 w-6 text-primary shrink-0" />
                        : <ArrowRight className="h-6 w-6 text-muted-foreground shrink-0" />}
                    </div>
                  </TapCard>
                ))}
              </div>
              <div className="mt-8">
                <label htmlFor="estimate-state" className="block text-sm font-medium text-muted-foreground">Project state</label>
                <select
                  id="estimate-state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-2 w-full max-w-xs border border-border bg-card p-4 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="mt-8"><BackButton onClick={() => goTo(2)} /></div>
            </div>
          )}

          {/* ------------------------------- Screen 4 ------------------------------- */}
          {screen === 4 && ballpark && (
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-muted-foreground">
                {needLabel?.title}{typeLabel ? ` · ${typeLabel}` : ""}{sizeLabel ? ` · ${sizeLabel}` : ""}
              </p>
              <h1 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-lg uppercase tracking-widest text-muted-foreground focus:outline-none">
                Your ballpark estimate
              </h1>
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 border border-primary/30 bg-primary/[0.04] p-10 md:p-14"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
              >
                <div className="font-display text-5xl md:text-7xl font-bold tracking-tight text-primary">
                  {isCustom(ballpark) ? ballpark.custom : `${fmt(ballpark.low)} – ${fmt(ballpark.high)}`}
                </div>
                <div className="mt-6 text-lg text-foreground/80">
                  Typical turnaround: <span className="font-bold text-foreground">{need ? TURNAROUND[need] : ""}</span>
                </div>
              </motion.div>
              <p className="mt-8 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Ballpark numbers — we've been known to beat competitor pricing.
              </p>
              <p className="mt-3 text-sm text-muted-foreground/70 max-w-xl mx-auto">
                Final pricing is confirmed after we review your project.
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => goTo(5)}
                className="mt-10 inline-flex items-center gap-3 bg-primary px-10 py-5 font-display text-xl font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}
              >
                Get this estimate <ArrowRight className="h-6 w-6" />
              </motion.button>
              <div className="mt-8 flex justify-center">
                <button onClick={() => goTo(needsSize ? 3 : 2)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="h-4 w-4" /> Change answers
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------- Screen 5 ------------------------------- */}
          {screen === 5 && (
            <div>
              <h1 ref={headingRef} tabIndex={-1} className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight focus:outline-none">
                Where should we send it?
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">Your estimate is ready — we just need to know where to send it.</p>

              <div className="mt-10 grid gap-4">
                <div>
                  <label htmlFor="est-name" className="block text-sm font-medium text-muted-foreground">Full name *</label>
                  <input id="est-name" type="text" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    className="mt-2 w-full border border-border bg-card p-4 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    autoComplete="name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="est-email" className="block text-sm font-medium text-muted-foreground">Email *</label>
                    <input id="est-email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="mt-2 w-full border border-border bg-card p-4 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="est-phone" className="block text-sm font-medium text-muted-foreground">Phone *</label>
                    <input id="est-phone" type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="mt-2 w-full border border-border bg-card p-4 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                      autoComplete="tel" />
                  </div>
                </div>
                <div>
                  <label htmlFor="est-city" className="block text-sm font-medium text-muted-foreground">Project city *</label>
                  <input id="est-city" type="text" value={city} onChange={(e) => setCity(e.target.value)}
                    className="mt-2 w-full border border-border bg-card p-4 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    autoComplete="address-level2" placeholder="e.g. Phoenix" />
                </div>
              </div>

              <div className="mt-8 border border-dashed border-border p-6">
                <div className="flex items-start gap-4">
                  <Upload className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="font-display text-lg font-bold">Have plans or a PDF?</div>
                    <p className="mt-1 text-sm text-muted-foreground">Upload them now and we'll turn this ballpark into a precise quote.</p>
                    <input ref={fileInput} type="file" multiple className="hidden"
                      accept=".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff"
                      onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ""; }} />
                    <button onClick={() => fileInput.current?.click()}
                      className="mt-4 inline-flex items-center gap-2 border border-primary/50 px-5 py-3 text-sm font-bold text-primary hover:bg-primary/5 transition-colors">
                      <Upload className="h-4 w-4" /> Choose files
                    </button>
                    {uploading.length > 0 && (
                      <p className="mt-3 text-sm text-muted-foreground inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Uploading {uploading.join(", ")}…
                      </p>
                    )}
                    {documents.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {documents.map((d) => (
                          <li key={d.claimToken} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" /> {d.name}
                            <button onClick={() => setDocuments(documents.filter((x) => x.claimToken !== d.claimToken))}
                              className="text-muted-foreground hover:text-foreground" aria-label={`Remove ${d.name}`}>
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {uploadError && <p className="mt-3 text-sm text-red-500">{uploadError}</p>}
                  </div>
                </div>
              </div>

              {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={submitProposal}
                disabled={submitting}
                className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-primary px-10 py-5 font-display text-xl font-bold text-primary-foreground disabled:opacity-60"
                style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}
              >
                {submitting ? <><Loader2 className="h-6 w-6 animate-spin" /> Sending…</> : <>Send my estimate <ArrowRight className="h-6 w-6" /></>}
              </motion.button>
              <div className="mt-6"><BackButton onClick={() => goTo(4)} /></div>
            </div>
          )}

          {/* ------------------------------- Screen 6 ------------------------------- */}
          {screen === 6 && proposal && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
              >
                <Check className="h-10 w-10 text-primary" />
              </motion.div>
              <h1 ref={headingRef} tabIndex={-1} className="mt-8 font-display text-4xl md:text-5xl font-bold tracking-tight focus:outline-none">
                Estimate received!
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Thanks,{" "}{contact.name.split(" ")[0] || "there"}. We'll review your project and be in touch shortly with next steps.
              </p>
              <div className="mt-8 inline-block border border-border bg-card px-8 py-5">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Estimate ID</div>
                <div className="mt-1 font-mono text-2xl font-bold">{proposal.estimateId}</div>
              </div>
              {proposal.pdfUrl && (
                <div className="mt-8">
                  <a href={proposal.pdfUrl} download
                    className="inline-flex items-center gap-3 border border-primary/50 px-8 py-4 font-display text-lg font-bold text-primary hover:bg-primary/5 transition-colors">
                    <Download className="h-5 w-5" /> Download estimate PDF
                  </a>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </PageShell>
  );
}
