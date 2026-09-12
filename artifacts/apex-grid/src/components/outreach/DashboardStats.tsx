import { useGetOutreachDashboard } from '@workspace/api-client-react';

export function DashboardStats() {
  const { data: stats, isLoading } = useGetOutreachDashboard();

  if (isLoading || !stats) {
    return (
        <div className="flex flex-wrap gap-3 mb-8" data-testid="outreach-dashboard-loading">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex-1 min-w-[130px] border border-border bg-card p-4 rounded-[2px] animate-pulse h-[84px]" />
        ))}
      </div>
    );
  }

  const items = [
    { label: 'Monthly Target', value: stats.monthlyTarget },
    { label: 'Sent This Month', value: stats.sentThisMonth },
    { label: 'Remaining This Month', value: stats.remainingThisMonth },
    { label: 'Required Daily Pace', value: stats.requiredDailyPace },
    { label: 'Qualified Inventory', value: stats.qualifiedInventory },
    { label: 'Prospects', value: stats.prospects },
    { label: 'Upcoming Follow-ups', value: stats.upcomingFollowUps },
    { label: 'Stopped Sequences', value: stats.stoppedSequences },
    { label: 'Processed Today', value: stats.providerProcessedToday },
    { label: 'Delivered Today', value: stats.deliveredToday },
    { label: 'Bounced Today', value: stats.bouncedToday },
    { label: 'Ready Tomorrow', value: stats.nextPreparationPrepared },
    { label: 'Unresolved Today', value: stats.unresolvedToday },
    { label: 'Unread Replies', value: stats.unreadReplies },
  ];

  return (
    <div className="space-y-3 mb-8">
      <div className="border border-border bg-card p-4 rounded-[2px]" data-testid="outreach-campaign-progress">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Campaign progress</p>
        <p className="font-display text-2xl font-bold">{stats.sentThisMonth.toLocaleString()} / {stats.monthlyTarget.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{stats.monthlyPercentComplete.toFixed(1)}% complete · {stats.remainingThisMonth.toLocaleString()} remaining</p>
      </div>
      {stats.septemberLanes && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="september-lane-cards">
          {([
            ['Verified / Named', stats.septemberLanes.named],
            ['Public', stats.septemberLanes.public],
            ['Hit Market', stats.septemberLanes.hotMarket],
            ['September Hot Leads', stats.septemberLanes.hotLead],
          ] as const).map(([label, lane]) => (
            <div key={label} className="border border-border bg-card p-3 rounded-[2px]">
              <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
              <p className="font-display text-xl font-bold">{lane?.sent ?? 0} / {lane?.target ?? 0}</p>
              <p className="text-xs text-muted-foreground">{lane?.shortage ?? Math.max(0, (lane?.target ?? 0) - (lane?.sent ?? 0))} shortage</p>
            </div>
          ))}
          <div className="col-span-2 md:col-span-4 text-xs text-muted-foreground">Total Sent Today: {stats.septemberLanes.totalSent} / {stats.septemberLanes.totalTarget}</div>
        </div>
      )}
      <div className="flex flex-wrap gap-3" data-testid="outreach-dashboard-stats">
        {items.map((item) => (
          <div key={item.label} className="flex-1 min-w-[130px] border border-border bg-card p-4 rounded-[2px]" data-testid={`stat-${item.label.toLowerCase().replace(' ', '-')}`}>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1 whitespace-nowrap">{item.label}</p>
            <p className="font-display text-2xl font-bold" data-testid={`stat-value-${item.label.toLowerCase().replace(' ', '-')}`}>{item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div
        className={`border px-4 py-3 rounded-[2px] text-sm ${
          stats.providerProcessedToday === stats.todayTarget && stats.unresolvedToday === 0
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            : 'border-amber-500/30 bg-amber-500/10 text-amber-200'
        }`}
        data-testid="status-today-outreach-delivery"
      >
        <span className="font-medium">
          SendGrid evidence: {stats.providerProcessedToday} processed today.
        </span>{' '}
        <span>
          {stats.deliveredToday} delivered · {stats.bouncedToday} bounced · {stats.unresolvedToday} unresolved.
        </span>
      </div>
      <div
        className={`border px-4 py-3 rounded-[2px] text-sm ${
          stats.nextPreparationStatus === 'completed' && stats.nextPreparationShortfall === 0
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            : stats.nextPreparationStatus === 'failed'
              ? 'border-destructive/40 bg-destructive/10 text-destructive'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-200'
        }`}
        data-testid="status-next-outreach-preparation"
      >
        <span className="font-medium">
          {stats.nextPreparationPrepared} of {stats.nextPreparationTarget} prepared for {stats.nextPreparationDate}.
        </span>{' '}
        <span>
          {stats.nextPreparationStatus === 'not_started'
            ? 'Preparation starts only after today’s Phoenix send window.'
            : stats.nextPreparationStatus === 'pending'
               ? `Manual approvals are reserving tomorrow’s ${stats.todayTarget.toLocaleString()}-message window.`
            : stats.nextPreparationStatus === 'running'
              ? 'The preparation run is in progress.'
              : stats.nextPreparationStatus === 'failed'
                ? stats.nextPreparationError || 'Preparation needs attention.'
                : stats.nextPreparationShortfall > 0
                  ? `${stats.nextPreparationShortfall} safe contacts are still needed; no weak contacts were substituted.`
                  : 'Tomorrow’s batch is ready and cannot send today.'}
        </span>
      </div>
      <div
        className={`border px-4 py-3 rounded-[2px] text-sm ${
          stats.automationReady
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            : 'border-amber-500/30 bg-amber-500/10 text-amber-200'
        }`}
        data-testid="status-outreach-automation"
      >
        <span className="font-medium">
          {stats.automationReady ? 'Scheduled outreach is armed.' : 'Controlled manual sending is active.'}
        </span>{' '}
        {!stats.automationReady && (
          <span>
            Automatic follow-ups stay off until production safety checks and reply-stop signals are verified.
          </span>
        )}
        <span className="ml-2 text-[10px] opacity-75 hidden md:inline">
          Admin allowlist: {stats.adminAllowlistReady ? 'ready' : 'not configured'} ·{' '}
          Production URL: {stats.productionConfigReady ? 'ready' : 'not configured'} ·{' '}
          SendGrid delivery path: {stats.sendgridDeliveryPathReady ? 'verified' : 'not verified'} ·{' '}
          Delivery events: {stats.deliveryEventsReady ? 'ready' : 'not configured'} ·{' '}
          Reply stop: {stats.replyWebhookReady ? 'ready' : 'manual only'} ·{' '}
          Automation flag: {stats.automationEnabled ? 'on' : 'off'}
        </span>
      </div>
      <div
        className={`border px-4 py-3 rounded-[2px] text-sm ${
          stats.researchAutomationReady
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
            : 'border-muted bg-muted/20 text-muted-foreground'
        }`}
        data-testid="status-outreach-research-automation"
      >
        <span className="font-medium">
          {stats.researchAutomationReady
            ? 'The 8:00 AM Phoenix research worker is ready.'
            : 'Morning research is waiting for production enablement.'}
        </span>{' '}
        <span>
          {stats.automationReady
            ? ' Research creates review records; approved messages send automatically at their scheduled time.'
            : ' It only creates review records; approval and sending stay manual.'}
        </span>
      </div>
    </div>
  );
}
