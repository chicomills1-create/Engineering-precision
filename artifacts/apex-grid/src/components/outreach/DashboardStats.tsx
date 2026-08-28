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
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8" data-testid="outreach-dashboard-stats">
      {items.map((item) => (
        <div key={item.label} className="border border-border bg-card p-4 rounded-[2px]" data-testid={`stat-${item.label.toLowerCase().replace(' ', '-')}`}>
          <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">{item.label}</p>
          <p className="font-display text-2xl font-bold" data-testid={`stat-value-${item.label.toLowerCase().replace(' ', '-')}`}>{item.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
