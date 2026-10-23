import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calculator, Check, FileCheck, Loader2, Stamp, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_URL, usePageMeta } from "@/lib/seo";
import {
  dispatchEstimateAnalytics,
  validateEstimateFile,
  type UploadedDocument,
} from "@/lib/estimate-flow";
import { uploadEstimateDocument } from "@/lib/estimate-api";
import { getFirstTouchValue } from "@/lib/firstTouch";

/**
 * /estimate — one simple request screen (contact simplification, 2026-10-22).
 *
 * This page used to run a multi-tap wizard that computed an instant
 * "ballpark" price client-side and filed a priced proposal through
 * POST /api/estimates/proposals. The ballpark is gone — from this screen,
 * from the endpoint's direct path, and from the PDF. A submission is now
 * just a lead (POST /api/leads, source "estimate"): contact details, where
 * the project is, what they need done, when they need it, and any plans
 * they want to attach. An engineer reviews it and replies with a written
 * scope and fee.
 *
 * The partner-routing flow (J-1) does not live on this page and is
 * untouched: it still posts full intakes to /api/estimates/proposals,
 * where the priced path stands.
 */

const PAGE_META = {
  title: "Get an Engineering Quote | Apex Grid Engineering",
  description: "Tell us what you need — an engineer will review your project and reply with a written scope and fee. PE stamping, engineering calculations, or both.",
  path: "/estimate",
};

const ESTIMATE_FAQS = [
  { question: "How much will my design cost?", answer: "An engineer reviews every project and replies with a written scope and fee. Real pricing comes from your actual plans — send them with your request and the number you get back is the number we work to." },
  { question: "What happens after I send this?", answer: "Your request lands with our engineering team the moment you submit it. We review your project — and your plans, if you attached them — and reply with a written scope and fee. No automated ballpark numbers." },
  { question: "How fast is the turnaround?", answer: "PE stamp reviews come back in 12 to 24 hours — our engineers stamp fast. Full engineering calculations are scoped to your project — upload your plans with your request and we'll confirm a delivery date." },
];
const ESTIMATE_FAQ_SCHEMA = {
  "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_URL}/estimate#faq`,
  mainEntity: ESTIMATE_FAQS.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
};

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

type Need = "pe-review-sealing" | "engineering-calculations" | "calculations-stamped-drawings";

const NEEDS: Array<{ value: Need; title: string; subtitle: string; icon: typeof Stamp }> = [
  { value: "pe-review-sealing", title: "PE Stamp", subtitle: "Need your design stamped?", icon: Stamp },
  { value: "engineering-calculations", title: "Calculations", subtitle: "Need calculations done?", icon: Calculator },
  { value: "calculations-stamped-drawings", title: "Both", subtitle: "Need calculations done and stamped?", icon: FileCheck },
];

const inputClass =
  "mt-2 w-full border border-border bg-card p-4 text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";
const labelClass = "block text-sm font-medium text-muted-foreground";

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 pb-24 pt-28 md:pt-32 relative">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.05),transparent_50%)]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ESTIMATE_FAQ_SCHEMA).replace(/</g, "\\u003c") }} />
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

export default function Estimate() {
  usePageMeta(PAGE_META);
  const [need, setNeed] = useState<Need | null>(null);
  const [details, setDetails] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("AZ");
  const [whenNeeded, setWhenNeeded] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const formLoadedAt = useRef<number>(Date.now());
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [uploading, setUploading] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  /* Preselect the need when a referring page links in with ?need=<need-value>
     (e.g. homepage problem cards). Invalid values are ignored. */
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("need");
    if (param && NEEDS.some((n) => n.value === param)) {
      setNeed(param as Need);
    }
  }, []);

  async function handleFiles(files: FileList | File[]) {
    const incoming = Array.from(files).slice(0, Math.max(0, 10 - documents.length));
    for (const file of incoming) {
      const clientValidationError = validateEstimateFile(file);
      if (clientValidationError) {
        setUploadError(`${file.name}: ${clientValidationError}`);
        continue;
      }
      setUploading((current) => [...current, file.name]);
      try {
        const uploaded = await uploadEstimateDocument(file);
        setDocuments((current) => [...current, uploaded]);
      } catch {
        setUploadError(`Could not upload ${file.name}. Please try again.`);
      } finally {
        setUploading((current) => current.filter((n) => n !== file.name));
      }
    }
  }

  async function submitRequest() {
    if (!need) {
      setError("Tell us what you need — tap one of the options above.");
      return;
    }
    if (!name.trim() || !email.trim() || !phone.trim() || !city.trim()) {
      setError("Name, email, phone, and project city are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const needTitle = NEEDS.find((n) => n.value === need)?.title ?? "Engineering";
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim() || undefined,
          services: need,
          message: details.trim() || `${needTitle} — details to be confirmed on review.`,
          projectLocation: `${city.trim()}, ${state}`,
          whenNeeded: whenNeeded.trim() || undefined,
          attachments: documents.map((d) => d.path),
          source: "estimate",
          landingPath: `${window.location.pathname}${window.location.search}`,
          referrer: document.referrer || undefined,
          gclid: getFirstTouchValue("gclid") || undefined,
          website,
          _ts: formLoadedAt.current,
        }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `Request failed (${response.status})`);
      }
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "lead_submit_success" });
      dispatchEstimateAnalytics({ name: "proposal-submitted", payload: {} });
      setSent(true);
      headingRef.current?.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <PageShell>
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
            Request received
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Request received — an engineer will review your project and reply with a written scope and fee.
          </p>
          {documents.length > 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              Attached: {documents.map((d) => d.name).join(", ")}
            </p>
          )}
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <h1 ref={headingRef} tabIndex={-1} className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight focus:outline-none">
        What do you need?
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Tell us what you need and where the project is. An engineer reviews every request and replies with a written scope and fee.
      </p>

      {/* What they need done */}
      <div className="mt-10 grid gap-4" role="group" aria-label="What do you need?">
        {NEEDS.map((item) => {
          const Icon = item.icon;
          const selected = need === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setNeed(item.value)}
              className={`w-full text-left border p-6 md:p-7 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                selected ? "border-primary bg-primary/[0.06]" : "border-border bg-card hover:border-primary/60"
              }`}
              style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-display text-2xl font-bold">{item.title}</div>
                  <div className="mt-1 text-base text-muted-foreground">{item.subtitle}</div>
                </div>
                {selected && <Check className="h-6 w-6 text-primary shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <label htmlFor="est-details" className={labelClass}>What do you need done? (optional)</label>
        <textarea
          id="est-details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          placeholder="Project type, size, timeline — anything we should know."
          className={inputClass}
        />
      </div>

      {/* Project location + when */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="est-city" className={labelClass}>Project city *</label>
          <input id="est-city" type="text" value={city} onChange={(e) => setCity(e.target.value)}
            className={inputClass} autoComplete="address-level2" placeholder="e.g. Phoenix" />
        </div>
        <div>
          <label htmlFor="est-state" className={labelClass}>Project state *</label>
          <select id="est-state" value={state} onChange={(e) => setState(e.target.value)} className={inputClass}>
            {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="est-when" className={labelClass}>When do you need it? (optional)</label>
        <input id="est-when" type="text" value={whenNeeded} onChange={(e) => setWhenNeeded(e.target.value)}
          className={inputClass} placeholder="e.g. By October 30, or ASAP" />
      </div>

      {/* Contact details */}
      <div className="mt-10 grid gap-4">
        <div>
          <label htmlFor="est-name" className={labelClass}>Full name *</label>
          <input id="est-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            className={inputClass} autoComplete="name" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="est-email" className={labelClass}>Email *</label>
            <input id="est-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className={inputClass} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="est-phone" className={labelClass}>Phone *</label>
            <input id="est-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              className={inputClass} autoComplete="tel" />
          </div>
        </div>
        <div>
          <label htmlFor="est-company" className={labelClass}>Company (optional)</label>
          <input id="est-company" type="text" value={company} onChange={(e) => setCompany(e.target.value)}
            className={inputClass} autoComplete="organization" />
        </div>
      </div>

      {/* Optional plans upload */}
      <div className="mt-8 border border-dashed border-border p-6">
        <div className="flex items-start gap-4">
          <Upload className="h-6 w-6 text-primary shrink-0 mt-1" />
          <div className="flex-1">
            <div className="font-display text-lg font-bold">Have plans or a PDF?</div>
            <p className="mt-1 text-sm text-muted-foreground">Attach them now — your scope and fee will be based on your actual plans.</p>
            <input ref={fileInput} type="file" multiple className="hidden"
              accept=".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff"
              onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ""; }} />
            <button type="button" onClick={() => fileInput.current?.click()}
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
                    <button type="button" onClick={() => setDocuments(documents.filter((x) => x.claimToken !== d.claimToken))}
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

      {/* Anti-spam honeypot (2026-10-22) — invisible to people,
          filled by form scrapers; the server drops filled submissions. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website (optional)
          <input id="est-website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && <p className="mt-6 text-sm text-red-500">{error}</p>}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={submitRequest}
        disabled={submitting}
        className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-primary px-10 py-5 font-display text-xl font-bold text-primary-foreground disabled:opacity-60"
        style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}
      >
        {submitting ? <><Loader2 className="h-6 w-6 animate-spin" /> Sending…</> : <>Send my request <ArrowRight className="h-6 w-6" /></>}
      </motion.button>
    </PageShell>
  );
}
