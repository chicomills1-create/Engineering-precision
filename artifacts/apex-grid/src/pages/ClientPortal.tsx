import { useClerk, useUser } from '@clerk/react';
import { Link } from 'wouter';
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Download,
  FileText,
  FolderKanban,
  Loader2,
  LockKeyhole,
  LogOut,
  MapPin,
} from 'lucide-react';
import {
  ClientJobStatus,
  getListClientJobsQueryKey,
  useListClientJobs,
  type ClientJob,
} from '@workspace/api-client-react';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/lib/seo';

const statusLabel: Record<ClientJobStatus, string> = {
  submitted: 'Submitted',
  reviewing: 'In review',
  needs_information: 'Needs information',
  quoted: 'Quote ready',
  accepted: 'Accepted',
  declined: 'Closed',
};

const statusStyle: Record<ClientJobStatus, string> = {
  submitted: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  reviewing: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  needs_information: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
  quoted: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
  accepted: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  declined: 'border-border bg-secondary text-muted-foreground',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function JobCard({ job }: { job: ClientJob }) {
  return (
    <article className="border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Project #{job.id}
          </p>
          <h2 className="font-display text-2xl font-bold">{job.projectType}</h2>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" /> {job.projectLocation}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4 text-primary" /> Submitted {formatDate(job.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {job.archivedAt && (
            <span className="w-fit border border-border bg-secondary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Archived
            </span>
          )}
          <span className={`w-fit border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${statusStyle[job.status]}`}>
            {statusLabel[job.status]}
          </span>
        </div>
      </div>
      <div className="grid gap-6 pt-5 md:grid-cols-[1fr_0.8fr]">
        <div>
          <h3 className="mb-2 text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">Scope</h3>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">{job.scope}</p>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <span className="block text-xs text-muted-foreground">Services</span>
            <span>{job.services}</span>
          </div>
          {job.timeline && (
            <div>
              <span className="block text-xs text-muted-foreground">Schedule</span>
              <span>{job.timeline}</span>
            </div>
          )}
          {job.documents.length > 0 && (
            <div>
              <span className="mb-2 block text-xs text-muted-foreground">Documents</span>
              <div className="space-y-2">
                {job.documents.map((document) => (
                  <a
                    key={document.id}
                    href={document.downloadUrl}
                    className="flex items-center justify-between border border-border bg-background px-3 py-2 text-xs hover:border-primary/50"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <FileText className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{document.name}</span>
                    </span>
                    <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ClientPortal() {
  usePageMeta({
    title: 'My Projects | Apex Grid Engineering',
    description: 'Track engineering project submissions with Apex Grid Engineering.',
    path: '/client-portal',
  });
  const { isLoaded, isSignedIn, user } = useUser();
  const { redirectToSignIn, signOut } = useClerk();
  const { data: jobs, isLoading, error } = useListClientJobs({
    query: {
      queryKey: [...getListClientJobsQueryKey(), user?.id ?? 'signed-out'],
      enabled: Boolean(isLoaded && isSignedIn),
    },
  });
  const activeJobs = jobs?.filter((job) => !job.archivedAt) ?? [];
  const archivedJobs = jobs?.filter((job) => Boolean(job.archivedAt)) ?? [];

  if (!isLoaded) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-[78vh] bg-background px-4 pb-24 pt-40">
        <div className="mx-auto max-w-xl border border-border bg-card p-8 text-center md:p-12">
          <LockKeyhole className="mx-auto mb-5 h-10 w-10 text-primary" />
          <h1 className="font-display text-4xl font-bold">Client portal</h1>
          <p className="my-5 text-muted-foreground">
            Sign in to submit projects under your company and see their current status.
          </p>
          <Button
            size="lg"
            onClick={() =>
              void redirectToSignIn()
            }
          >
            Sign in <ArrowRight />
          </Button>
          <p className="mt-5 text-xs text-muted-foreground">
            First time here? You can create an account during sign-in.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] bg-background pb-24 pt-32 md:pt-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Client portal</p>
            <h1 className="font-display text-4xl font-bold md:text-5xl">My Projects</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {jobs?.[0]?.companyName && (
                <span className="inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  {jobs[0].companyName}
                </span>
              )}
              <span>{user?.primaryEmailAddress?.emailAddress}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/submit-project">
                Submit a project <ArrowRight />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => void signOut({ redirectUrl: '/' })}
            >
              <LogOut /> Sign out
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-primary" /> Loading projects…
          </div>
        )}
        {error && (
          <div className="border border-destructive/40 bg-destructive/10 p-6 text-sm">
            We couldn’t load your projects. Please refresh and try again.
          </div>
        )}
        {jobs?.length === 0 && (
          <div className="border border-border bg-card p-10 text-center md:p-16">
            <FolderKanban className="mx-auto mb-5 h-10 w-10 text-muted-foreground" />
            <h2 className="font-display text-2xl font-bold">No projects yet</h2>
            <p className="mx-auto my-4 max-w-md text-muted-foreground">
              Submit your first project to create your company workspace and start tracking review status.
            </p>
            <Button asChild>
              <Link href="/submit-project">Submit your first project</Link>
            </Button>
          </div>
        )}
        {jobs && jobs.length > 0 && (
          <div className="space-y-12">
            <section>
              <h2 className="mb-4 font-display text-2xl font-bold">Current projects</h2>
              {activeJobs.length > 0 ? (
                <div className="space-y-5">
                  {activeJobs.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              ) : (
                <p className="border border-border bg-card p-6 text-sm text-muted-foreground">
                  No current projects. Your past requests remain available below.
                </p>
              )}
            </section>
            {archivedJobs.length > 0 && (
              <section>
                <h2 className="mb-2 font-display text-2xl font-bold">Past requests</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  Archived requests and their private documents remain available for your records.
                </p>
                <div className="space-y-5">
                  {archivedJobs.map((job) => <JobCard key={job.id} job={job} />)}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}