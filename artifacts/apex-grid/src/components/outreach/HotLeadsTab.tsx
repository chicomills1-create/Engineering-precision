import {
  Flame,
  Mail,
  MousePointerClick,
  Building2,
  Eye,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  useListOutreachHotLeads,
  type OutreachHotLead,
} from '@workspace/api-client-react';
import {
  ResponsiveTable,
  ResponsiveTableBody,
  ResponsiveTableCell,
  ResponsiveTableContainer,
  ResponsiveTableHead,
  ResponsiveTableHeader,
  ResponsiveTableRow,
} from './ResponsiveTable';

const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}).format(new Date(value));

function QualificationBadge({ lead }: { lead: OutreachHotLead }) {
  const clicked = lead.qualification === 'clicked';
  return (
    <span className={`inline-flex items-center gap-1 rounded-[2px] border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
      clicked
        ? 'border-amber-500/30 bg-amber-500/10 text-amber-500'
        : 'border-primary/30 bg-primary/10 text-primary'
    }`}>
      {clicked ? <MousePointerClick className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
      {lead.qualification}
    </span>
  );
}

export function HotLeadsTab() {
  const { data: leads, isLoading, isError } = useListOutreachHotLeads();
  const [queueing, setQueueing] = useState(false);
  const [queueReport, setQueueReport] = useState<{
    cohortCount: number;
    created: number;
    skipped: number;
    skippedEmails: Array<{ email: string; reason: string }>;
  } | null>(null);
  const { toast } = useToast();

  async function queueSeptemberClickers() {
    setQueueing(true);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/outreach/hot-leads/september-clickers/enqueue`, {
        method: 'POST',
        credentials: 'include',
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Queue action failed');
      setQueueReport(result);
      toast({ title: 'Hot-lead follow-ups queued', description: `${result.created} created; ${result.skipped} skipped.` });
    } catch (error) {
      toast({ title: 'Nothing was queued', description: error instanceof Error ? error.message : 'The queue action failed.', variant: 'destructive' });
    } finally {
      setQueueing(false);
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse border border-border bg-card p-6" data-testid="hot-leads-loading">
        <div className="h-5 w-40 rounded bg-muted" />
        <div className="mt-6 space-y-3">
          <div className="h-16 rounded bg-muted/70" />
          <div className="h-16 rounded bg-muted/70" />
          <div className="h-16 rounded bg-muted/70" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border border-destructive/30 bg-destructive/5 p-8 text-center" data-testid="hot-leads-error">
        <Flame className="mx-auto mb-3 h-6 w-6 text-destructive" />
        <h2 className="font-display text-lg font-semibold">Hot leads are unavailable</h2>
        <p className="mt-1 text-sm text-muted-foreground">We couldn’t load tracked outreach engagement. Please try again.</p>
      </div>
    );
  }

  if (!leads?.length) {
    return (
      <div className="border border-border bg-card p-10 text-center" data-testid="hot-leads-empty">
        <Flame className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
        <h2 className="font-display text-lg font-semibold">No hot leads yet</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          Delivered first-touch emails that receive a tracked open or click will appear here. This view never sends follow-ups automatically.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-5" data-testid="tab-content-hot-leads">
      <div className="flex flex-col gap-3 border border-amber-500/25 bg-amber-500/5 p-5 sm:flex-row sm:items-start">
        <Flame className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
        <div className="flex-1">
          <h2 className="font-display text-lg font-semibold">Hot Leads</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {leads.length} delivered prospect{leads.length === 1 ? '' : 's'} with a tracked first-touch open or click. Clicks rank first, followed by the most recent engagement.
          </p>
        </div>
        <Button type="button" onClick={queueSeptemberClickers} disabled={queueing} data-testid="button-queue-september-clickers">
          <Flame className="mr-2 h-4 w-4" />
          {queueing ? 'Creating follow-ups…' : 'Queue All 110 Clicker Follow-Ups'}
        </Button>
      </div>
      {queueReport && (
        <div className="border border-border bg-card p-4 text-sm" data-testid="september-clicker-queue-report">
          <p className="font-semibold">{queueReport.created} follow-ups created; {queueReport.skipped} skipped</p>
          <p className="text-muted-foreground">Validated cohort: {queueReport.cohortCount} distinct clicker emails.</p>
          {queueReport.skippedEmails.length > 0 && (
            <ul className="mt-2 max-h-48 list-disc overflow-auto pl-5 text-xs text-muted-foreground">
              {queueReport.skippedEmails.map((item) => <li key={item.email}>{item.email}: {item.reason.replaceAll('_', ' ')}</li>)}
            </ul>
          )}
        </div>
      )}

      <ResponsiveTableContainer className="overflow-hidden border border-border bg-card">
        <ResponsiveTable>
          <ResponsiveTableHeader className="bg-muted/20">
            <ResponsiveTableRow className="hover:bg-transparent">
              <ResponsiveTableHead>Prospect</ResponsiveTableHead>
              <ResponsiveTableHead>Campaign</ResponsiveTableHead>
              <ResponsiveTableHead>Qualification</ResponsiveTableHead>
              <ResponsiveTableHead>Engagement</ResponsiveTableHead>
              <ResponsiveTableHead>First engaged</ResponsiveTableHead>
              <ResponsiveTableHead>Latest engaged</ResponsiveTableHead>
            </ResponsiveTableRow>
          </ResponsiveTableHeader>
          <ResponsiveTableBody>
            {leads.map((lead) => (
              <ResponsiveTableRow key={lead.prospectId}>
                <ResponsiveTableCell mobileLabel="Prospect">
                  <div className="min-w-0">
                    <p className="font-medium">{lead.companyName}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{lead.contactName || 'No contact name'} · {lead.location}</p>
                    {lead.contactEmail && (
                      <a className="mt-1 inline-flex max-w-full items-center gap-1 text-xs text-primary hover:underline" href={`mailto:${lead.contactEmail}`}>
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{lead.contactEmail}</span>
                      </a>
                    )}
                  </div>
                </ResponsiveTableCell>
                <ResponsiveTableCell mobileLabel="Campaign">
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    {lead.campaignName || 'No campaign'}
                  </span>
                </ResponsiveTableCell>
                <ResponsiveTableCell mobileLabel="Qualification"><QualificationBadge lead={lead} /></ResponsiveTableCell>
                <ResponsiveTableCell mobileLabel="Engagement">
                  <div className="flex gap-3 text-xs">
                    <span className="inline-flex items-center gap-1 text-muted-foreground"><Eye className="h-3.5 w-3.5" /> {lead.openCount} opens</span>
                    <span className="inline-flex items-center gap-1 text-amber-500"><MousePointerClick className="h-3.5 w-3.5" /> {lead.clickCount} clicks</span>
                  </div>
                </ResponsiveTableCell>
                <ResponsiveTableCell mobileLabel="First engaged" className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(lead.firstEngagedAt)}</ResponsiveTableCell>
                <ResponsiveTableCell mobileLabel="Latest engaged" className="whitespace-nowrap text-xs text-muted-foreground">{formatDate(lead.latestEngagedAt)}</ResponsiveTableCell>
              </ResponsiveTableRow>
            ))}
          </ResponsiveTableBody>
        </ResponsiveTable>
      </ResponsiveTableContainer>
    </section>
  );
}