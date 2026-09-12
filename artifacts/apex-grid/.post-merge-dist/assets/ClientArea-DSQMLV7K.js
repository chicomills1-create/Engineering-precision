import { r as reactExports, j as jsxRuntimeExports } from "./react-vendor-CIiUSU2n.js";
import { u as useUser, a as useClerk, B as Button, C as ClerkProvider, b as basePath, c as clerkAppearance, d as clerkProxyUrl, e as clerkPubKey, f as ClerkQueryClientCacheInvalidator, s as stripBase } from "./ClerkArea-C7yP48Fu.js";
import { u as usePageMeta, a as useQueryClient, b as useListClientJobs, g as getListClientJobsQueryKey, c as useCreateClientJob, L as Link, I as Input, T as Textarea, d as useLocation } from "./index-CL-hdYp9.js";
import { e as CircleCheck, A as ArrowRight, o as Check, t as LockKeyhole, q as LoaderCircle, u as FileUp, X, b as Building2, v as LogOut, w as FolderKanban, x as MapPin, y as CalendarClock, g as FileText, s as Download } from "./icons-BnVxio9v.js";
import "./radix-CbiqOXaX.js";
import "./motion-DjUGJx9x.js";
const SERVICES = [
  "Structural engineering",
  "MEP engineering",
  "Civil engineering",
  "Building assessment",
  "Architectural design",
  "General contracting"
];
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = /* @__PURE__ */ new Set([
  "pdf",
  "dwg",
  "dxf",
  "rvt",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "zip",
  "jpg",
  "jpeg",
  "png",
  "tif",
  "tiff"
]);
const emptyForm = {
  submitterName: "",
  submitterEmail: "",
  submitterPhone: "",
  companyName: "",
  projectType: "",
  projectLocation: "",
  scope: "",
  timeline: "",
  budgetContext: ""
};
function Field({
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-2 block text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: " *" })
    ] }),
    children
  ] });
}
function ProjectIntake() {
  usePageMeta({
    title: "Submit a Project | Apex Grid Engineering",
    description: "Submit plans, scope, schedule, and project details for review by Apex Grid Engineering.",
    path: "/submit-project"
  });
  const { isLoaded, isSignedIn, user } = useUser();
  const { redirectToSignIn } = useClerk();
  const queryClient = useQueryClient();
  const fileInputRef = reactExports.useRef(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [services, setServices] = reactExports.useState([]);
  const [documents, setDocuments] = reactExports.useState([]);
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadError, setUploadError] = reactExports.useState("");
  const [submittedId, setSubmittedId] = reactExports.useState(null);
  const { data: priorJobs } = useListClientJobs({
    query: {
      queryKey: [...getListClientJobsQueryKey(), user?.id ?? "signed-out"],
      enabled: Boolean(isLoaded && isSignedIn)
    }
  });
  const createJob = useCreateClientJob({
    mutation: {
      onSuccess: (job) => {
        setSubmittedId(job.id);
        void queryClient.invalidateQueries({ queryKey: getListClientJobsQueryKey() });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });
  reactExports.useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    setForm((current) => ({
      ...current,
      submitterName: current.submitterName || user.fullName || "",
      submitterEmail: current.submitterEmail || user.primaryEmailAddress?.emailAddress || "",
      companyName: current.companyName || priorJobs?.[0]?.companyName || ""
    }));
  }, [isLoaded, isSignedIn, priorJobs, user]);
  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };
  const uploadFiles = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    setUploadError("");
    try {
      const uploaded = [];
      for (const file of Array.from(files)) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "";
        if (!ALLOWED_FILE_EXTENSIONS.has(extension)) {
          throw new Error(`${file.name} is not supported. Use PDF, DWG, DXF, Revit, image, Office, or ZIP files.`);
        }
        if (file.size > MAX_FILE_BYTES) {
          throw new Error(`${file.name} exceeds the 20 MB per-file limit.`);
        }
        const response = await fetch("/api/client/uploads", {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            "x-file-name": encodeURIComponent(file.name)
          },
          body: file
        });
        const result = await response.json();
        if (!response.ok || !result.objectPath || !result.uploadToken) {
          throw new Error(result.error || `Could not upload ${file.name}`);
        }
        uploaded.push({
          objectPath: result.objectPath,
          name: result.name || file.name,
          uploadToken: result.uploadToken
        });
      }
      setDocuments((current) => [...current, ...uploaded].slice(0, 20));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "File upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const submit = (event) => {
    event.preventDefault();
    if (services.length === 0 || uploading) return;
    createJob.mutate({
      data: {
        ...form,
        services: services.join(", "),
        documents
      }
    });
  };
  if (submittedId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-[80vh] bg-background px-4 pb-24 pt-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl border border-primary/30 bg-card p-8 md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mb-6 h-12 w-12 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary", children: [
        "Project #",
        submittedId,
        " received"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 font-display text-4xl font-bold", children: "Your project is in review." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 leading-relaxed text-muted-foreground", children: "Our team will review the scope and documents, then contact you if we need clarification. Typical initial response time is 12–24 hours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
        isSignedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { href: "/client-portal", children: [
          "View my projects ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            onClick: () => void redirectToSignIn(),
            children: [
              "Sign in for future tracking ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "lg", onClick: () => {
          setSubmittedId(null);
          setForm(emptyForm);
          setServices([]);
          setDocuments([]);
        }, children: "Submit another project" })
      ] }),
      !isSignedIn && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-muted-foreground", children: "This guest submission is confirmed by email. Sign in before your next submission to keep future projects together in the portal." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "bg-background pb-24 pt-32 md:pt-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary", children: "Client job portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 font-display text-5xl font-bold leading-tight md:text-6xl", children: "Bring us the project. We’ll map the path forward." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-lg leading-relaxed text-muted-foreground", children: "Share the scope, site, schedule, and available documents. A licensed engineering lead will review the job before we discuss next steps." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 border-t border-border pt-8 text-sm text-muted-foreground", children: [
        "Structural, civil, MEP, assessment, and design coordination",
        "PDF, CAD, Revit, image, and office file uploads",
        "Private company-scoped project history when signed in"
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
      ] }, item)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "h-4 w-4 text-primary" }),
          "Returning client?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "my-3 text-sm text-muted-foreground", children: "Sign in to submit under your company and track every project." }),
        isLoaded && isSignedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/client-portal", children: "Open My Projects" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: () => void redirectToSignIn(),
            children: "Sign in to client portal"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "border border-border bg-card p-6 md:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.2em] text-primary", children: "Project intake" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-3xl font-bold", children: "Tell us what you’re building." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Required fields are marked with an asterisk." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your name", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            value: form.submitterName,
            disabled: Boolean(isSignedIn),
            onChange: (e) => update("submitterName", e.target.value),
            autoComplete: "name"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Work email", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "email",
            required: true,
            value: form.submitterEmail,
            disabled: Boolean(isSignedIn),
            onChange: (e) => update("submitterEmail", e.target.value),
            autoComplete: "email"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "tel",
            value: form.submitterPhone,
            onChange: (e) => update("submitterPhone", e.target.value),
            autoComplete: "tel"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Company", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.companyName,
            required: Boolean(isSignedIn && !priorJobs?.length),
            disabled: Boolean(isSignedIn && priorJobs?.length),
            onChange: (e) => update("companyName", e.target.value),
            autoComplete: "organization"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project type", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            placeholder: "e.g. Tenant improvement",
            value: form.projectType,
            onChange: (e) => update("projectType", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project location", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            required: true,
            placeholder: "City, state or site address",
            value: form.projectLocation,
            onChange: (e) => update("projectLocation", e.target.value)
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "mt-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("legend", { className: "mb-3 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground", children: [
          "Services needed ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "*" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 sm:grid-cols-2", children: SERVICES.map((service) => {
          const selected = services.includes(service);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "aria-pressed": selected,
              onClick: () => setServices(
                (current) => selected ? current.filter((item) => item !== service) : [...current, service]
              ),
              className: `flex min-h-11 items-center gap-3 border px-3 text-left text-sm transition-colors ${selected ? "border-primary/60 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-primary/40"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-4 w-4 items-center justify-center border ${selected ? "border-primary bg-primary" : "border-border"}`, children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-white" }) }),
                service
              ]
            },
            service
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project scope or description", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            required: true,
            rows: 7,
            placeholder: "Describe the building, existing conditions, deliverables, jurisdiction, and the decision or milestone driving the work.",
            value: form.scope,
            onChange: (e) => update("scope", e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Schedule or deadline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              rows: 3,
              placeholder: "Permit date, bid date, opening date…",
              value: form.timeline,
              onChange: (e) => update("timeline", e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Budget context", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              rows: 3,
              placeholder: "Known range, fee target, or procurement limits",
              value: form.budgetContext,
              onChange: (e) => update("budgetContext", e.target.value)
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 border border-dashed border-border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Plans and supporting documents" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Up to 20 MB each. Architectural plans and project files: PDF, DWG, DXF, Revit (.rvt), images, Office, or ZIP." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              disabled: uploading || documents.length >= 20,
              onClick: () => fileInputRef.current?.click(),
              children: [
                uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, {}),
                uploading ? "Uploading…" : "Add files"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              multiple: true,
              className: "hidden",
              accept: ".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff",
              onChange: (e) => void uploadFiles(e.target.files)
            }
          )
        ] }),
        documents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2", children: documents.map((document) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate pr-4", children: document.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": `Remove ${document.name}`,
              onClick: () => setDocuments((current) => current.filter((item) => item.objectPath !== document.objectPath)),
              className: "text-muted-foreground hover:text-primary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
            }
          )
        ] }, document.objectPath)) }),
        uploadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-destructive", children: uploadError })
      ] }),
      services.length === 0 && createJob.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm text-destructive", children: "Select at least one service." }),
      createJob.isError && services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm text-destructive", children: createJob.error?.data?.error || "We could not submit this project. Please review the fields and try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          size: "lg",
          className: "mt-7 w-full",
          disabled: createJob.isPending || uploading || services.length === 0,
          children: createJob.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }),
            " Submitting…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Submit project for review ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: "Your files stay private and are available only to your company and authorized Apex Grid team members." })
    ] })
  ] }) }) });
}
const statusLabel = {
  submitted: "Submitted",
  reviewing: "In review",
  needs_information: "Needs information",
  quoted: "Quote ready",
  accepted: "Accepted",
  declined: "Closed"
};
const statusStyle = {
  submitted: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  reviewing: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  needs_information: "border-orange-500/40 bg-orange-500/10 text-orange-300",
  quoted: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  accepted: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  declined: "border-border bg-secondary text-muted-foreground"
};
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function JobCard({ job }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "border border-border bg-card p-6 md:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-start md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: [
          "Project #",
          job.id
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: job.projectType }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
            " ",
            job.projectLocation
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-4 w-4 text-primary" }),
            " Submitted ",
            formatDate(job.createdAt)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        job.archivedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-fit border border-border bg-secondary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Archived" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-fit border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${statusStyle[job.status]}`, children: statusLabel[job.status] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 pt-5 md:grid-cols-[1fr_0.8fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground", children: "Scope" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground/85", children: job.scope })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: job.services })
        ] }),
        job.timeline && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground", children: "Schedule" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: job.timeline })
        ] }),
        job.documents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-xs text-muted-foreground", children: "Documents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: job.documents.map((document) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: document.downloadUrl,
              className: "flex items-center justify-between border border-border bg-background px-3 py-2 text-xs hover:border-primary/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 shrink-0 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: document.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
              ]
            },
            document.id
          )) })
        ] })
      ] })
    ] })
  ] });
}
function ClientPortal() {
  usePageMeta({
    title: "My Projects | Apex Grid Engineering",
    description: "Track engineering project submissions with Apex Grid Engineering.",
    path: "/client-portal"
  });
  const { isLoaded, isSignedIn, user } = useUser();
  const { redirectToSignIn, signOut } = useClerk();
  const { data: jobs, isLoading, error } = useListClientJobs({
    query: {
      queryKey: [...getListClientJobsQueryKey(), user?.id ?? "signed-out"],
      enabled: Boolean(isLoaded && isSignedIn)
    }
  });
  const activeJobs = jobs?.filter((job) => !job.archivedAt) ?? [];
  const archivedJobs = jobs?.filter((job) => Boolean(job.archivedAt)) ?? [];
  if (!isLoaded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[70vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-7 w-7 animate-spin text-primary" }) });
  }
  if (!isSignedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-[78vh] bg-background px-4 pb-24 pt-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl border border-border bg-card p-8 text-center md:p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { className: "mx-auto mb-5 h-10 w-10 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold", children: "Client portal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "my-5 text-muted-foreground", children: "Sign in to submit projects under your company and see their current status." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          onClick: () => void redirectToSignIn(),
          children: [
            "Sign in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-xs text-muted-foreground", children: "First time here? You can create an account during sign-in." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-[80vh] bg-background pb-24 pt-32 md:pt-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary", children: "Client portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold md:text-5xl", children: "My Projects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground", children: [
          jobs?.[0]?.companyName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary" }),
            jobs[0].companyName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user?.primaryEmailAddress?.emailAddress })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { href: "/submit-project", children: [
          "Submit a project ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "lg",
            onClick: () => void signOut({ redirectUrl: "/" }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, {}),
              " Sign out"
            ]
          }
        )
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }),
      " Loading projects…"
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-destructive/40 bg-destructive/10 p-6 text-sm", children: "We couldn’t load your projects. Please refresh and try again." }),
    jobs?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-10 text-center md:p-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FolderKanban, { className: "mx-auto mb-5 h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold", children: "No projects yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto my-4 max-w-md text-muted-foreground", children: "Submit your first project to create your company workspace and start tracking review status." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/submit-project", children: "Submit your first project" }) })
    ] }),
    jobs && jobs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-2xl font-bold", children: "Current projects" }),
        activeJobs.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: activeJobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job }, job.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "border border-border bg-card p-6 text-sm text-muted-foreground", children: "No current projects. Your past requests remain available below." })
      ] }),
      archivedJobs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 font-display text-2xl font-bold", children: "Past requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm text-muted-foreground", children: "Archived requests and their private documents remain available for your records." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: archivedJobs.map((job) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job }, job.id)) })
      ] })
    ] })
  ] }) });
}
function ClientArea({ page }) {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ClerkProvider,
    {
      publishableKey: clerkPubKey,
      proxyUrl: clerkProxyUrl,
      appearance: clerkAppearance,
      signInUrl: `${basePath}/sign-in`,
      signUpUrl: `${basePath}/sign-up`,
      routerPush: (to) => setLocation(stripBase(to)),
      routerReplace: (to) => setLocation(stripBase(to), { replace: true }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClerkQueryClientCacheInvalidator, {}),
        page === "submit" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectIntake, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClientPortal, {})
      ]
    }
  );
}
export {
  ClientArea as default
};
