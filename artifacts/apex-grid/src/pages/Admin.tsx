import { useState } from 'react';
import { Show, useUser } from '@clerk/react';
import { Redirect } from 'wouter';
import { useQueryClient } from '@tanstack/react-query';
import {
  useListLeads,
  useListSubscribers,
  useDeleteLead,
  useUpdateLead,
  useDeleteSubscriber,
  getListLeadsQueryKey,
  getListSubscribersQueryKey,
  LeadStatus,
} from '@workspace/api-client-react';
import { Download, Inbox, Mail, Phone, ShieldAlert, Trash2, Users } from 'lucide-react';
import { AdminNav } from '@/components/layout/AdminNav';
import { ClientJobsReview } from '@/components/admin/ClientJobsReview';

const STATUSES = [LeadStatus.new, LeadStatus.contacted, LeadStatus.closed] as const;

const statusStyles: Record<LeadStatus, string> = {
  new: 'bg-primary/15 text-primary border-primary/40',
  contacted: 'bg-amber-500/10 text-amber-400 border-amber-500/40',
  closed: 'bg-muted text-muted-foreground border-border',
};

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function StatusControl({ leadId, status }: { leadId: number; status: LeadStatus }) {
  const queryClient = useQueryClient();
  const updateLead = useUpdateLead({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
      },
    },
  });

  return (
    <div className="flex items-center gap-1">
      {STATUSES.map((s) => (
        <button
          key={s}
          type="button"
          disabled={updateLead.isPending || s === status}
          onClick={() => updateLead.mutate({ id: leadId, data: { status: s } })}
          className={`text-xs px-2.5 py-1 border rounded-[2px] uppercase tracking-wider transition-colors disabled:cursor-default ${
            s === status
              ? statusStyles[s]
              : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

function LeadsList() {
  const { data: leads, isLoading, error } = useListLeads();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<LeadStatus | 'all'>('all');
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const deleteLead = useDeleteLead({
    mutation: {
      onSuccess: () => {
        setDeleteError(null);
        void queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
      },
      onError: () => {
        setDeleteError('Unable to delete that inquiry. Please try again.');
      },
    },
  });

  const filteredLeads = leads?.filter((lead) => filter === 'all' || lead.status === filter);

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Employee Portal</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Jobs, inquiries & workspace</h1>
          {user && (
            <p className="text-sm text-muted-foreground mt-2">
              Your personal operations dashboard · signed in as {user.primaryEmailAddress?.emailAddress ?? user.fullName}
            </p>
          )}
        </div>
      </div>
      
      <AdminNav />

      {isLoading && (
        <p className="text-muted-foreground">Loading inquiries…</p>
      )}

      {error && (error as { status?: number }).status === 403 && (
        <div className="border border-destructive/50 bg-destructive/10 p-8 rounded-[2px]">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            <div>
              <h2 className="font-display font-semibold text-lg mb-1">Access denied</h2>
              <p className="text-sm text-muted-foreground">
                Your account isn't authorized to view inquiries. This page is
                limited to approved team members. If you believe this is a
                mistake, contact the site administrator.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (error as { status?: number }).status !== 403 && (
        <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-[2px] text-sm">
          Failed to load inquiries. Please refresh and try again.
        </div>
      )}

      {deleteError && (
        <div className="border border-destructive/50 bg-destructive/10 p-4 rounded-[2px] text-sm mb-4" role="alert">
          {deleteError}
        </div>
      )}

      {leads && leads.length === 0 && (
        <div className="border border-border bg-card p-12 rounded-[2px] text-center">
          <Inbox className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No inquiries yet. New contact form submissions will appear here.</p>
        </div>
      )}

      {leads && leads.length > 0 && filteredLeads && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {filteredLeads.length} {filteredLeads.length === 1 ? 'inquiry' : 'inquiries'}
              {filter !== 'all' && ` (${filter})`}
            </p>
            <div className="flex items-center gap-1">
              {(['all', ...STATUSES] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 border rounded-[2px] uppercase tracking-wider transition-colors ${
                    filter === f
                      ? 'border-primary/60 text-primary bg-primary/10'
                      : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {filteredLeads.length === 0 && (
            <div className="border border-border bg-card p-8 rounded-[2px] text-center text-sm text-muted-foreground">
              No {filter} inquiries.
            </div>
          )}
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="border border-border bg-card p-6 rounded-[2px]">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                <div>
                  <h2 className="font-display font-semibold text-lg text-white">{lead.name}</h2>
                  {lead.company && (
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  )}
                </div>
                <time className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(lead.createdAt)}
                </time>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-4">
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {lead.email}
                  </a>
                )}
                {lead.projectType === "callback-request" && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-primary">
                    Callback ASAP
                  </span>
                )}
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {lead.phone}
                  </a>
                )}
              </div>

              {(lead.projectType || lead.services) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {lead.projectType && (
                    <span className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-[2px] uppercase tracking-wider">
                      {lead.projectType}
                    </span>
                  )}
                  {lead.services?.split(',').map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 border border-primary/40 text-primary rounded-[2px]"
                    >
                      {s.trim()}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap mb-4">
                {lead.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusControl leadId={lead.id} status={lead.status} />
                <button
                  type="button"
                  disabled={deleteLead.isPending}
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete the inquiry from ${lead.name}? This cannot be undone.`,
                      )
                    ) {
                      deleteLead.mutate({ id: lead.id });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                  aria-label={`Delete inquiry from ${lead.name}`}
                  title="Delete inquiry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SubscribersSection() {
  const { data: subscribers, isLoading, error } = useListSubscribers();
  const queryClient = useQueryClient();
  const deleteSubscriber = useDeleteSubscriber({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: getListSubscribersQueryKey() });
      },
    },
  });

  const exportCsv = () => {
    if (!subscribers) return;
    const rows = [
      ['email', 'signed_up'],
      ...subscribers.map((s) => [s.email, new Date(s.createdAt).toISOString()]),
    ];
    const csv = rows
      .map((row) => row.map((v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Newsletter</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold">Subscribers</h2>
        </div>
        {subscribers && subscribers.length > 0 && (
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-2 h-10 px-4 border border-primary/50 text-sm text-primary hover:bg-primary/10 rounded-[2px] transition-colors self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      {isLoading && <p className="text-muted-foreground">Loading subscribers…</p>}

      {error && (
        <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-[2px] text-sm">
          Failed to load subscribers. Please refresh and try again.
        </div>
      )}

      {subscribers && subscribers.length === 0 && (
        <div className="border border-border bg-card p-10 rounded-[2px] text-center">
          <Users className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            No subscribers yet. Newsletter signups from the Resources page will appear here.
          </p>
        </div>
      )}

      {subscribers && subscribers.length > 0 && (
        <div className="border border-border bg-card rounded-[2px]">
          <div className="px-6 py-3 border-b border-border text-sm text-muted-foreground">
            {subscribers.length} {subscribers.length === 1 ? 'subscriber' : 'subscribers'}
          </div>
          <ul className="divide-y divide-border">
            {subscribers.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-4 px-6 py-3">
                <a
                  href={`mailto:${s.email}`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline truncate"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {s.email}
                </a>
                <div className="flex items-center gap-4 shrink-0">
                  <time className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(s.createdAt)}
                  </time>
                  <button
                    type="button"
                    disabled={deleteSubscriber.isPending}
                    onClick={() => {
                      if (window.confirm(`Remove ${s.email} from the subscriber list?`)) {
                        deleteSubscriber.mutate({ id: s.id });
                      }
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                    aria-label={`Remove ${s.email}`}
                    title="Remove subscriber"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default function Admin() {
  return (
    <>
      <Show when="signed-in">
        <LeadsList />
        <ClientJobsReview />
        <SubscribersSection />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}
