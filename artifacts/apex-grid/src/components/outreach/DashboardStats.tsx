import { useGetOutreachDashboard } from '@workspace/api-client-react';

export function DashboardStats() {
  const { data: stats, isLoading } = useGetOutreachDashboard();

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8" data-testid="outreach-dashboard-loading">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border border-border bg-card p-4 rounded-[2px] animate-pulse h-[84px]" />
        ))}
      </div>
    );
  }

  const items = [
    { label: 'Prospects', value: stats.prospects },
    { label: 'Campaigns', value: stats.campaigns },
    { label: 'Total Messages', value: stats.messages },
    { label: 'Sent Today', value: stats.sentToday },
    { label: 'Replies', value: stats.replies },
  ];

  return (
    <div className="space-y-3 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3" data-testid="outreach-dashboard-stats">
        {items.map((item) => (
          <div key={item.label} className="border border-border bg-card p-4 rounded-[2px]" data-testid={`stat-${item.label.toLowerCase().replace(' ', '-')}`}>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">{item.label}</p>
            <p className="font-display text-2xl font-bold" data-testid={`stat-value-${item.label.toLowerCase().replace(' ', '-')}`}>{item.value.toLocaleString()}</p>
          </div>
        ))}
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
          {stats.automationReady ? 'Automatic follow-ups armed.' : 'Controlled manual sending is active.'}
        </span>{' '}
        {!stats.automationReady && (
          <span>
            Automatic follow-ups stay off until production safety checks and reply-stop signals are verified.
          </span>
        )}
        <span className="ml-2 text-xs opacity-75">
          Admin allowlist: {stats.adminAllowlistReady ? 'ready' : 'not configured'} ·{' '}
          Production URL: {stats.productionConfigReady ? 'ready' : 'not configured'} ·{' '}
          SendGrid delivery path: {stats.sendgridDeliveryPathReady ? 'verified' : 'not verified'} ·{' '}
          Delivery events: {stats.deliveryEventsReady ? 'ready' : 'not configured'} ·{' '}
          Reply stop: {stats.replyWebhookReady ? 'ready' : 'manual only'} ·{' '}
          Automation flag: {stats.automationEnabled ? 'on' : 'off'}
        </span>
      </div>
    </div>
  );
}
