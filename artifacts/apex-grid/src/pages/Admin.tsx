import { Show, useClerk, useUser } from '@clerk/react';
import { Redirect } from 'wouter';
import { useListLeads } from '@workspace/api-client-react';
import { Inbox, LogOut, Mail, Phone } from 'lucide-react';

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

function LeadsList() {
  const { data: leads, isLoading, error } = useListLeads();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Admin</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">Project Inquiries</h1>
          {user && (
            <p className="text-sm text-muted-foreground mt-2">
              Signed in as {user.primaryEmailAddress?.emailAddress ?? user.fullName}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: basePath || '/' })}
          className="inline-flex items-center gap-2 h-10 px-4 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 rounded-[2px] transition-colors self-start md:self-auto"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      {isLoading && (
        <p className="text-muted-foreground">Loading inquiries…</p>
      )}

      {error && (
        <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-[2px] text-sm">
          Failed to load inquiries. Please refresh and try again.
        </div>
      )}

      {leads && leads.length === 0 && (
        <div className="border border-border bg-card p-12 rounded-[2px] text-center">
          <Inbox className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No inquiries yet. New contact form submissions will appear here.</p>
        </div>
      )}

      {leads && leads.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {leads.length} {leads.length === 1 ? 'inquiry' : 'inquiries'}
          </p>
          {leads.map((lead) => (
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
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {lead.email}
                </a>
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

              <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">
                {lead.message}
              </p>
            </div>
          ))}
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
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}
