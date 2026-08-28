import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useClerk, useUser } from '@clerk/react';
import { useQueryClient } from '@tanstack/react-query';
import {
  getListClientJobsQueryKey,
  useCreateClientJob,
  useListClientJobs,
  type ClientJobDocumentInput,
} from '@workspace/api-client-react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileUp,
  Loader2,
  LockKeyhole,
  X,
} from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePageMeta } from '@/lib/seo';

const SERVICES = [
  'Structural engineering',
  'MEP engineering',
  'Civil engineering',
  'Building assessment',
  'Architectural design',
  'General contracting',
];

type IntakeForm = {
  submitterName: string;
  submitterEmail: string;
  submitterPhone: string;
  companyName: string;
  projectType: string;
  projectLocation: string;
  scope: string;
  timeline: string;
  budgetContext: string;
};

const emptyForm: IntakeForm = {
  submitterName: '',
  submitterEmail: '',
  submitterPhone: '',
  companyName: '',
  projectType: '',
  projectLocation: '',
  scope: '',
  timeline: '',
  budgetContext: '',
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function ProjectIntake() {
  usePageMeta({
    title: 'Submit a Project | Apex Grid Engineering',
    description:
      'Submit plans, scope, schedule, and project details for review by Apex Grid Engineering.',
    path: '/submit-project',
  });
  const { isLoaded, isSignedIn, user } = useUser();
  const { redirectToSignIn } = useClerk();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<IntakeForm>(emptyForm);
  const [services, setServices] = useState<string[]>([]);
  const [documents, setDocuments] = useState<ClientJobDocumentInput[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const { data: priorJobs } = useListClientJobs({
    query: {
      queryKey: [...getListClientJobsQueryKey(), user?.id ?? 'signed-out'],
      enabled: Boolean(isLoaded && isSignedIn),
    },
  });
  const createJob = useCreateClientJob({
    mutation: {
      onSuccess: (job) => {
        setSubmittedId(job.id);
        void queryClient.invalidateQueries({ queryKey: getListClientJobsQueryKey() });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  });

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;
    setForm((current) => ({
      ...current,
      submitterName: current.submitterName || user.fullName || '',
      submitterEmail:
        current.submitterEmail || user.primaryEmailAddress?.emailAddress || '',
      companyName: current.companyName || priorJobs?.[0]?.companyName || '',
    }));
  }, [isLoaded, isSignedIn, priorJobs, user]);

  const update = (field: keyof IntakeForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    setUploadError('');
    try {
      const uploaded: ClientJobDocumentInput[] = [];
      for (const file of Array.from(files)) {
        const response = await fetch('/api/client/uploads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            'x-file-name': encodeURIComponent(file.name),
          },
          body: file,
        });
        const result = (await response.json()) as {
          objectPath?: string;
          name?: string;
          uploadToken?: string;
          error?: string;
        };
        if (!response.ok || !result.objectPath || !result.uploadToken) {
          throw new Error(result.error || `Could not upload ${file.name}`);
        }
        uploaded.push({
          objectPath: result.objectPath,
          name: result.name || file.name,
          uploadToken: result.uploadToken,
        });
      }
      setDocuments((current) => [...current, ...uploaded].slice(0, 20));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'File upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (services.length === 0 || uploading) return;
    createJob.mutate({
      data: {
        ...form,
        services: services.join(', '),
        documents,
      },
    });
  };

  if (submittedId) {
    return (
      <main className="min-h-[80vh] bg-background px-4 pb-24 pt-40">
        <div className="mx-auto max-w-2xl border border-primary/30 bg-card p-8 md:p-12">
          <CheckCircle2 className="mb-6 h-12 w-12 text-primary" />
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Project #{submittedId} received
          </p>
          <h1 className="mb-4 font-display text-4xl font-bold">Your project is in review.</h1>
          <p className="mb-8 leading-relaxed text-muted-foreground">
            Our team will review the scope and documents, then contact you if we
            need clarification. Typical initial response time is 12–24 hours.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            {isSignedIn ? (
              <Button asChild size="lg">
                <Link href="/client-portal">
                  View my projects <ArrowRight />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() =>
                  void redirectToSignIn()
                }
              >
                Sign in for future tracking <ArrowRight />
              </Button>
            )}
            <Button variant="outline" size="lg" onClick={() => {
              setSubmittedId(null);
              setForm(emptyForm);
              setServices([]);
              setDocuments([]);
            }}>
              Submit another project
            </Button>
          </div>
          {!isSignedIn && (
            <p className="mt-5 text-xs text-muted-foreground">
              This guest submission is confirmed by email. Sign in before your
              next submission to keep future projects together in the portal.
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background pb-24 pt-32 md:pt-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <aside>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              Client job portal
            </p>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight md:text-6xl">
              Bring us the project. We’ll map the path forward.
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Share the scope, site, schedule, and available documents. A licensed
              engineering lead will review the job before we discuss next steps.
            </p>
            <div className="space-y-4 border-t border-border pt-8 text-sm text-muted-foreground">
              {[
                'Structural, civil, MEP, assessment, and design coordination',
                'PDF, CAD, Revit, image, and office file uploads',
                'Private company-scoped project history when signed in',
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <LockKeyhole className="h-4 w-4 text-primary" />
                Returning client?
              </div>
              <p className="my-3 text-sm text-muted-foreground">
                Sign in to submit under your company and track every project.
              </p>
              {isLoaded && isSignedIn ? (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/client-portal">Open My Projects</Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    void redirectToSignIn()
                  }
                >
                  Sign in to client portal
                </Button>
              )}
            </div>
          </aside>

          <form onSubmit={submit} className="border border-border bg-card p-6 md:p-10">
            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                Project intake
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold">Tell us what you’re building.</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Required fields are marked with an asterisk.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Your name" required>
                <Input
                  required
                  value={form.submitterName}
                  disabled={Boolean(isSignedIn)}
                  onChange={(e) => update('submitterName', e.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="Work email" required>
                <Input
                  type="email"
                  required
                  value={form.submitterEmail}
                  disabled={Boolean(isSignedIn)}
                  onChange={(e) => update('submitterEmail', e.target.value)}
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone">
                <Input
                  type="tel"
                  value={form.submitterPhone}
                  onChange={(e) => update('submitterPhone', e.target.value)}
                  autoComplete="tel"
                />
              </Field>
              <Field label="Company">
                <Input
                  value={form.companyName}
                  required={Boolean(isSignedIn && !priorJobs?.length)}
                  disabled={Boolean(isSignedIn && priorJobs?.length)}
                  onChange={(e) => update('companyName', e.target.value)}
                  autoComplete="organization"
                />
              </Field>
              <Field label="Project type" required>
                <Input
                  required
                  placeholder="e.g. Tenant improvement"
                  value={form.projectType}
                  onChange={(e) => update('projectType', e.target.value)}
                />
              </Field>
              <Field label="Project location" required>
                <Input
                  required
                  placeholder="City, state or site address"
                  value={form.projectLocation}
                  onChange={(e) => update('projectLocation', e.target.value)}
                />
              </Field>
            </div>

            <fieldset className="mt-7">
              <legend className="mb-3 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
                Services needed <span className="text-primary">*</span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {SERVICES.map((service) => {
                  const selected = services.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        setServices((current) =>
                          selected
                            ? current.filter((item) => item !== service)
                            : [...current, service],
                        )
                      }
                      className={`flex min-h-11 items-center gap-3 border px-3 text-left text-sm transition-colors ${
                        selected
                          ? 'border-primary/60 bg-primary/10 text-foreground'
                          : 'border-border text-muted-foreground hover:border-primary/40'
                      }`}
                    >
                      <span className={`flex h-4 w-4 items-center justify-center border ${selected ? 'border-primary bg-primary' : 'border-border'}`}>
                        {selected && <Check className="h-3 w-3 text-white" />}
                      </span>
                      {service}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-6">
              <Field label="Scope and current need" required>
                <Textarea
                  required
                  rows={7}
                  placeholder="Describe the building, existing conditions, deliverables, jurisdiction, and the decision or milestone driving the work."
                  value={form.scope}
                  onChange={(e) => update('scope', e.target.value)}
                />
              </Field>
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Schedule or deadline">
                  <Textarea
                    rows={3}
                    placeholder="Permit date, bid date, opening date…"
                    value={form.timeline}
                    onChange={(e) => update('timeline', e.target.value)}
                  />
                </Field>
                <Field label="Budget context">
                  <Textarea
                    rows={3}
                    placeholder="Known range, fee target, or procurement limits"
                    value={form.budgetContext}
                    onChange={(e) => update('budgetContext', e.target.value)}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-7 border border-dashed border-border p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">Plans and supporting documents</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Up to 20 MB each. PDF, CAD, Revit, images, Office, or ZIP.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading || documents.length >= 20}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploading ? <Loader2 className="animate-spin" /> : <FileUp />}
                  {uploading ? 'Uploading…' : 'Add files'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff"
                  onChange={(e) => void uploadFiles(e.target.files)}
                />
              </div>
              {documents.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {documents.map((document) => (
                    <li key={document.objectPath} className="flex items-center justify-between bg-background px-3 py-2 text-sm">
                      <span className="truncate pr-4">{document.name}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${document.name}`}
                        onClick={() => setDocuments((current) => current.filter((item) => item.objectPath !== document.objectPath))}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {uploadError && <p className="mt-3 text-sm text-destructive">{uploadError}</p>}
            </div>

            {services.length === 0 && createJob.isError && (
              <p className="mt-5 text-sm text-destructive">Select at least one service.</p>
            )}
            {createJob.isError && services.length > 0 && (
              <p className="mt-5 text-sm text-destructive">
                {(createJob.error as { data?: { error?: string } })?.data?.error ||
                  'We could not submit this project. Please review the fields and try again.'}
              </p>
            )}
            <Button
              type="submit"
              size="lg"
              className="mt-7 w-full"
              disabled={createJob.isPending || uploading || services.length === 0}
            >
              {createJob.isPending ? (
                <>
                  <Loader2 className="animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  Submit project for review <ArrowRight />
                </>
              )}
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Your files stay private and are available only to your company and
              authorized Apex Grid team members.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}