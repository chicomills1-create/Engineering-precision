import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  ClientJobStatus,
  getListClientMonthlySafeListQueryKey,
  getListClientJobsForReviewQueryKey,
  useListClientJobsForReview,
  usePreviewClientJobStatusNotification,
  useSendClientJobStatusNotification,
  useUpdateClientJob,
  type ClientJob,
} from '@workspace/api-client-react';
import {
  Archive,
  CalendarClock,
  Download,
  FileText,
  FolderKanban,
  Mail,
  MapPin,
  Phone,
  Save,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  const [notificationTarget, setNotificationTarget] = useState<ClientJobStatus | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const updateJob = useUpdateClientJob({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: getListClientJobsForReviewQueryKey(),
        });
        void queryClient.invalidateQueries({
          queryKey: getListClientMonthlySafeListQueryKey(),
        });
      },
    },
  });
  const preview = usePreviewClientJobStatusNotification();
  const sendNotification = useSendClientJobStatusNotification({
    mutation: {
      onSuccess: (updatedJob) => {
        void queryClient.invalidateQueries({
          queryKey: getListClientJobsForReviewQueryKey(),
        });
        if (updatedJob.statusNotificationStatus === 'failed') {
          setSendError(updatedJob.statusNotificationError || 'The email could not be sent.');
        } else {
          setNotificationTarget(null);
        }
      },
    },
  });

  const handleStatusChange = (status: ClientJobStatus) => {
    if (status === job.status || updateJob.isPending || sendNotification.isPending) return;
    if (status === ClientJobStatus.needs_information || status === ClientJobStatus.quoted) {
      setSendError(null);
      setNotificationTarget(status);
      preview.mutate({ id: job.id, data: { status } });
      return;
    }
    updateJob.mutate({ id: job.id, data: { status } });
  };

  const closeNotificationPreview = () => {
    if (!sendNotification.isPending) {
      setNotificationTarget(null);
      setSendError(null);
      preview.reset();
    }
  };

  return (
    <>
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
              onClick={() => handleStatusChange(status)}
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
        <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Monthly past-client email</p>
            <p className="text-xs text-muted-foreground">
              Explicitly opt this contact in only after confirming permission.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {job.archivedAt && (
              <Button
                size="sm"
                variant={job.monthlyEmailOptIn ? 'default' : 'outline'}
                disabled={updateJob.isPending}
                onClick={() => updateJob.mutate({
                  id: job.id,
                  data: { monthlyEmailOptIn: !job.monthlyEmailOptIn },
                })}
              >
                {job.monthlyEmailOptIn ? 'Opted in' : 'Opt in'}
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              disabled={updateJob.isPending}
              onClick={() => updateJob.mutate({
                id: job.id,
                data: { archived: !job.archivedAt },
              })}
            >
              {job.archivedAt ? <RotateCcw /> : <Archive />}
              {job.archivedAt ? 'Restore request' : 'Archive request'}
            </Button>
          </div>
        </div>
        {job.statusNotificationStatus && (
          <div
            className={`mt-4 border px-3 py-2 text-xs ${
              job.statusNotificationStatus === 'sent'
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                : 'border-destructive/40 bg-destructive/10 text-destructive'
            }`}
          >
            <strong>
              Status email {job.statusNotificationStatus === 'sent' ? 'sent' : 'failed'}.
            </strong>
            {job.statusNotificationSentAt && ` ${formatDate(job.statusNotificationSentAt)}`}
            {job.statusNotificationError && (
              <span className="mt-1 block">{job.statusNotificationError}</span>
            )}
          </div>
        )}
      </div>
      </article>

      <Dialog
        open={notificationTarget !== null}
        onOpenChange={(open) => !open && closeNotificationPreview()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview client status email</DialogTitle>
            <DialogDescription>
              Review the client-safe message before changing this project to{' '}
              {notificationTarget === ClientJobStatus.needs_information
                ? 'Needs information'
                : 'Quoted'}.
            </DialogDescription>
          </DialogHeader>
          {preview.isPending && <p className="text-sm text-muted-foreground">Loading preview…</p>}
          {preview.isError && (
            <p className="text-sm text-destructive">
              Could not load the preview. Close this window and try again.
            </p>
          )}
          {preview.data && (
            <div className="space-y-4 text-sm">
              <div className="border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">To</p>
                <p className="break-all">{preview.data.recipient}</p>
                <p className="mt-3 text-xs text-muted-foreground">Subject</p>
                <p>{preview.data.subject}</p>
              </div>
              <div className="max-h-64 overflow-y-auto whitespace-pre-wrap border border-border bg-background p-4 leading-relaxed">
                {preview.data.body}
              </div>
              <p className="text-xs text-muted-foreground">
                The email links to <span className="text-foreground">{preview.data.portalUrl}</span>{' '}
                and asks the client to sign in before viewing the portal.
              </p>
            </div>
          )}
          {sendError && (
            <p className="border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              Status changed, but the email failed: {sendError}
            </p>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              disabled={sendNotification.isPending}
              onClick={() => {
                if (notificationTarget) {
                  updateJob.mutate(
                    { id: job.id, data: { status: notificationTarget } },
                    { onSuccess: closeNotificationPreview },
                  );
                }
              }}
            >
              Change without emailing
            </Button>
            <Button
              disabled={
                !preview.data ||
                preview.isPending ||
                sendNotification.isPending ||
                updateJob.isPending
              }
              onClick={() => {
                if (notificationTarget) {
                  sendNotification.mutate({
                    id: job.id,
                    data: { status: notificationTarget },
                  });
                }
              }}
            >
              {sendNotification.isPending ? 'Sending…' : 'Confirm & send'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ClientJobsReview() {
  const { data: jobs, isLoading, error } = useListClientJobsForReview();
  const activeJobs = jobs?.filter((job) => !job.archivedAt) ?? [];
  const archivedJobs = jobs?.filter((job) => Boolean(job.archivedAt)) ?? [];

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
        <div className="space-y-10">
          <section>
            <h3 className="mb-4 font-display text-xl font-bold">Active requests ({activeJobs.length})</h3>
            {activeJobs.length > 0 ? (
              <div className="space-y-4">
                {activeJobs.map((job) => <ReviewCard key={job.id} job={job} />)}
              </div>
            ) : <p className="text-sm text-muted-foreground">No active requests.</p>}
          </section>
          <section>
            <h3 className="mb-2 font-display text-xl font-bold">Archived requests ({archivedJobs.length})</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Past requests remain available with their notes and private documents.
            </p>
            {archivedJobs.length > 0 ? (
              <div className="space-y-4">
                {archivedJobs.map((job) => <ReviewCard key={job.id} job={job} />)}
              </div>
            ) : <p className="text-sm text-muted-foreground">No archived requests.</p>}
          </section>
        </div>
      )}
    </section>
  );
}