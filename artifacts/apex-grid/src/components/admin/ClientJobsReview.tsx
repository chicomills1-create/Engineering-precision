import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  ClientJobStatus,
  getListClientJobsForReviewQueryKey,
  useListClientJobsForReview,
  useUpdateClientJob,
  type ClientJob,
} from '@workspace/api-client-react';
import {
  CalendarClock,
  Download,
  FileText,
  FolderKanban,
  Mail,
  MapPin,
  Phone,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const statuses = [
  ClientJobStatus.submitted,
  ClientJobStatus.reviewing,
  ClientJobStatus.needs_information,
  ClientJobStatus.quoted,
  ClientJobStatus.accepted,
  ClientJobStatus.declined,
] as const;

const statusLabels: Record<ClientJobStatus, string> = {
  submitted: 'Submitted',
  reviewing: 'Reviewing',
  needs_information: 'Needs info',
  quoted: 'Quoted',
  accepted: 'Accepted',
  declined: 'Closed',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function ReviewCard({ job }: { job: ClientJob }) {
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState(job.internalNotes || '');
  const updateJob = useUpdateClientJob({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: getListClientJobsForReviewQueryKey(),
        });
      },
    },
  });

  return (
    <article className="border border-border bg-card p-6 rounded-[2px]">
      <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            Client job #{job.id}
          </p>
          <h3 className="font-display text-xl font-semibold text-white">
            {job.projectType}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {job.companyName || 'Independent client'} · {job.submitterName}
          </p>
        </div>
        <time className="text-xs text-muted-foreground">{formatDate(job.createdAt)}</time>
      </div>

      <div className="grid gap-6 py-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href={`mailto:${job.submitterEmail}`} className="inline-flex items-center gap-1.5 text-primary hover:underline">
              <Mail className="h-4 w-4" /> {job.submitterEmail}
            </a>
            {job.submitterPhone && (
              <a href={`tel:${job.submitterPhone}`} className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
                <Phone className="h-4 w-4" /> {job.submitterPhone}
              </a>
            )}
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" /> {job.projectLocation}
            </span>
          </div>
          <h4 className="mb-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">Scope</h4>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">{job.scope}</p>
        </div>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Services</dt>
            <dd>{job.services}</dd>
          </div>
          {job.timeline && (
            <div>
              <dt className="flex items-center gap-1 text-xs text-muted-foreground"><CalendarClock className="h-3.5 w-3.5" /> Schedule</dt>
              <dd>{job.timeline}</dd>
            </div>
          )}
          {job.budgetContext && (
            <div>
              <dt className="text-xs text-muted-foreground">Budget context</dt>
              <dd>{job.budgetContext}</dd>
            </div>
          )}
          {job.documents.length > 0 && (
            <div>
              <dt className="mb-2 text-xs text-muted-foreground">Documents</dt>
              <dd className="space-y-2">
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
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="border-t border-border pt-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              disabled={updateJob.isPending || status === job.status}
              onClick={() => updateJob.mutate({ id: job.id, data: { status } })}
              className={`border px-2.5 py-1.5 text-[11px] uppercase tracking-wider transition-colors ${
                status === job.status
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {statusLabels[status]}
            </button>
          ))}
        </div>
        <label className="block">
          <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Internal notes
          </span>
          <Textarea
            rows={3}
            value={notes}
            placeholder="Coordination notes, next action, or review context. Clients cannot see this."
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>
        <div className="mt-3 flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            disabled={updateJob.isPending || notes === (job.internalNotes || '')}
            onClick={() =>
              updateJob.mutate({
                id: job.id,
                data: { internalNotes: notes || null },
              })
            }
          >
            <Save /> Save note
          </Button>
          {updateJob.isError && <span className="text-xs text-destructive">Update failed. Try again.</span>}
        </div>
      </div>
    </article>
  );
}

export function ClientJobsReview() {
  const { data: jobs, isLoading, error } = useListClientJobsForReview();

  return (
    <section className="container mx-auto px-4 pb-16 md:px-8">
      <div className="mb-6">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">Client portal</p>
        <h2 className="font-display text-2xl font-bold md:text-3xl">Submitted Projects</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Review guest and company-linked jobs, documents, status, and next actions.
        </p>
      </div>
      {isLoading && <p className="text-muted-foreground">Loading client projects…</p>}
      {error && (
        <div className="border border-destructive/50 bg-destructive/10 p-6 text-sm">
          Failed to load client projects. Please refresh and try again.
        </div>
      )}
      {jobs?.length === 0 && (
        <div className="border border-border bg-card p-10 text-center">
          <FolderKanban className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">No client portal projects yet.</p>
        </div>
      )}
      {jobs && jobs.length > 0 && (
        <div className="space-y-4">
          {jobs.map((job) => <ReviewCard key={job.id} job={job} />)}
        </div>
      )}
    </section>
  );
}