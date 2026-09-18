import { useMemo, useState } from 'react';
import {
  useGetSeoDashboard,
  useGetSeoFunnel,
} from '@workspace/api-client-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  ClipboardList,
  DollarSign,
  Eye,
  Gauge,
  Info,
  MousePointerClick,
  Percent,
} from 'lucide-react';

// ── Formatting helpers ────────────────────────────────────────────────────────

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatMonth(ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  if (!y || !m) return ym;
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
    timeZone: 'UTC',
  });
}

function formatPeriodEnd(endDate: string): string {
  const parsed = new Date(`${endDate}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime())) return endDate;
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
    timeZone: 'UTC',
  });
}

// ── Profit projection presets ───────────────────────────────────────────────
// These are ILLUSTRATIVE EXAMPLES only — never forecasts. Jeremy supplies the
// real average fee / conversion / close rate; until then the calculator starts
// on the "Base" example so the math is visible.
const PRESETS = [
  { name: 'Conservative', fee: 5000, convPct: 0.5, closePct: 10 },
  { name: 'Base', fee: 8000, convPct: 1, closePct: 15 },
  { name: 'Strong', fee: 12000, convPct: 2, closePct: 20 },
] as const;

const trendConfig: ChartConfig = {
  clicks: { label: 'Clicks', color: '#60a5fa' },
  impressions: { label: 'Impressions', color: '#a78bfa' },
};

const funnelConfig: ChartConfig = {
  new: { label: 'New', color: '#60a5fa' },
  contacted: { label: 'Contacted', color: '#fbbf24' },
  won: { label: 'Won', color: '#34d399' },
  closed: { label: 'Closed (lost)', color: '#f87171' },
};

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className="border border-border bg-card p-4 rounded-[2px] flex items-start gap-4">
      <div className={`mt-1 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
        <p className="font-display text-2xl font-bold truncate">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export function ProfitTab() {
  const { data: dashboard, isLoading: dashLoading, error: dashError } = useGetSeoDashboard();
  const { data: funnel, isLoading: funnelLoading, error: funnelError } = useGetSeoFunnel();

  const [avgFee, setAvgFee] = useState<number>(8000);
  const [convPct, setConvPct] = useState<number>(1);
  const [closePct, setClosePct] = useState<number>(15);
  const [activePreset, setActivePreset] = useState<string | null>('Base');

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setAvgFee(preset.fee);
    setConvPct(preset.convPct);
    setClosePct(preset.closePct);
    setActivePreset(preset.name);
  };

  const onManual = (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setter(Number.isFinite(v) && v >= 0 ? v : 0);
    setActivePreset(null);
  };

  const derived = useMemo(() => {
    if (!dashboard || !funnel) return null;
    const siteRow = dashboard.performance.find(
      (p) => (p.dimension ?? '').toLowerCase() === 'site',
    );
    const clicks = siteRow?.clicks ?? 0;
    const impressions = siteRow?.impressions ?? 0;
    const position = siteRow?.position ? parseFloat(siteRow.position) : null;
    const ctr = impressions > 0 ? clicks / impressions : 0;

    const historyAsc = [...dashboard.performanceHistory].sort((a, b) =>
      a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0,
    );
    const latestHistory = historyAsc[historyAsc.length - 1];
    let periodDays = 180;
    if (latestHistory) {
      const days =
        Math.round(
          (Date.parse(`${latestHistory.endDate}T00:00:00Z`) -
            Date.parse(`${latestHistory.startDate}T00:00:00Z`)) /
            86400000,
        ) + 1;
      if (Number.isFinite(days) && days > 0) periodDays = days;
    }

    const trendData = historyAsc.map((p) => ({
      label: formatPeriodEnd(p.endDate),
      clicks: p.clicks ?? 0,
      impressions: p.impressions ?? 0,
    }));

    const funnelData = funnel.byMonth.map((m) => ({
      ...m,
      label: formatMonth(m.month),
    }));

    // ── Profit projection: live math on REAL inputs + user-supplied rates ──
    const monthlyClicks = periodDays > 0 ? (clicks * 30) / periodDays : 0;
    const monthlyEstimates = monthlyClicks * (convPct / 100);
    const monthlyWins = monthlyEstimates * (closePct / 100);
    const projectedRevenue = monthlyWins * avgFee;
    const scenario =
      projectedRevenue < 25000 ? 'Conservative' : projectedRevenue <= 250000 ? 'Base' : 'Strong';

    return {
      clicks,
      impressions,
      position,
      ctr,
      periodDays,
      trendData,
      funnelData,
      monthlyClicks,
      monthlyEstimates,
      monthlyWins,
      projectedRevenue,
      scenario,
    };
  }, [dashboard, funnel, avgFee, convPct, closePct]);

  if (dashLoading || funnelLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground border border-border bg-card rounded-[2px]">
        <Activity className="w-8 h-8 animate-pulse mb-4 text-primary/50" />
        <p className="text-sm">Loading traffic & profit data...</p>
      </div>
    );
  }

  if (dashError || funnelError || !dashboard || !funnel || !derived) {
    return (
      <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-[2px] text-sm">
        Failed to load traffic & profit data. Please refresh.
      </div>
    );
  }

  const winRatePct = funnel.totals.leads > 0 ? funnel.totals.winRate * 100 : 0;

  return (
    <div className="space-y-6">
      {/* KPI stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label="GSC Clicks (180d)"
          value={derived.clicks > 0 ? derived.clicks.toLocaleString() : '—'}
          icon={MousePointerClick}
          color="text-blue-400"
        />
        <StatCard
          label="GSC Impressions (180d)"
          value={derived.impressions > 0 ? derived.impressions.toLocaleString() : '—'}
          icon={Eye}
          color="text-purple-400"
        />
        <StatCard
          label="Avg Position"
          value={derived.position !== null ? derived.position.toFixed(1) : '—'}
          icon={Gauge}
          color="text-amber-400"
        />
        <StatCard
          label="CTR"
          value={`${(derived.ctr * 100).toFixed(1)}%`}
          icon={Percent}
          color="text-cyan-400"
        />
        <StatCard
          label="Estimate Requests"
          value={funnel.totals.organicLeads.toLocaleString()}
          sub={`${funnel.totals.leads.toLocaleString()} all sources`}
          icon={ClipboardList}
          color="text-emerald-400"
        />
        {/* Hero: projected monthly revenue */}
        <div className="col-span-2 md:col-span-3 xl:col-span-1 border border-primary/50 bg-primary/10 p-4 rounded-[2px] flex items-start gap-4">
          <div className="mt-1 text-primary">
            <DollarSign className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Projected Monthly Revenue
            </p>
            <p className="font-display text-2xl font-bold text-primary truncate">
              {usd.format(Math.round(derived.projectedRevenue))}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {derived.scenario} scenario · illustrative example, not a forecast
            </p>
          </div>
        </div>
      </div>

      {/* Traffic trend */}
      <div className="border border-border bg-card p-6 rounded-[2px]">
        <div className="mb-5">
          <h3 className="text-lg font-display font-bold">Traffic Trend</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Google Search Console clicks and impressions per reporting period (latest first
            stored, shown oldest → newest).
          </p>
        </div>
        {derived.trendData.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-[2px]">
            No reporting periods stored yet. Run “Sync Data” on the Dashboard tab.
          </div>
        ) : (
          <ChartContainer config={trendConfig} className="aspect-auto h-[320px] w-full">
            <AreaChart data={derived.trendData} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} />
              <YAxis yAxisId="clicks" tickLine={false} axisLine={false} tickMargin={8} width={52} />
              <YAxis
                yAxisId="impressions"
                orientation="right"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={64}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                yAxisId="impressions"
                type="monotone"
                dataKey="impressions"
                fill="var(--color-impressions)"
                stroke="var(--color-impressions)"
                fillOpacity={0.18}
                strokeWidth={2}
              />
              <Area
                yAxisId="clicks"
                type="monotone"
                dataKey="clicks"
                fill="var(--color-clicks)"
                stroke="var(--color-clicks)"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </div>

      {/* Estimate funnel by month */}
      <div className="border border-border bg-card p-6 rounded-[2px]">
        <div className="mb-5">
          <h3 className="text-lg font-display font-bold">Estimate Funnel by Month</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Estimate requests grouped by calendar month with status breakdown. “Won” counts
            won/closed-won statuses; “Closed” counts closed-lost.
          </p>
        </div>
        {derived.funnelData.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-[2px]">
            No estimate requests recorded yet.
          </div>
        ) : (
          <ChartContainer config={funnelConfig} className="aspect-auto h-[320px] w-full">
            <BarChart data={derived.funnelData} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={16} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={48} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="new" stackId="funnel" fill="var(--color-new)" />
              <Bar dataKey="contacted" stackId="funnel" fill="var(--color-contacted)" />
              <Bar dataKey="won" stackId="funnel" fill="var(--color-won)" />
              <Bar dataKey="closed" stackId="funnel" fill="var(--color-closed)" radius={[2, 2, 0, 0]} />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        )}
      </div>

      {/* Top converting topics */}
      <div className="border border-border bg-card p-6 rounded-[2px]">
        <div className="mb-5">
          <h3 className="text-lg font-display font-bold">Top Converting Topics</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Which site topics earn clicks — and which ones turn into estimate requests. Topics
            come from each landing page’s sitemap category; traffic is the latest Search
            Console period.
          </p>
        </div>
        {funnel.byTopic.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-[2px]">
            No topic data yet. Sync Search Console to populate traffic per topic.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground text-left">
                  <th className="pb-3 font-medium">Topic</th>
                  <th className="pb-3 font-medium text-right">Clicks</th>
                  <th className="pb-3 font-medium text-right">Impressions</th>
                  <th className="pb-3 font-medium text-right">Estimate requests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {funnel.byTopic.map((row) => (
                  <tr key={row.topic} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4 font-medium">{row.topic}</td>
                    <td className="py-3 text-right font-mono">{row.clicks.toLocaleString()}</td>
                    <td className="py-3 text-right font-mono text-muted-foreground">
                      {row.impressions.toLocaleString()}
                    </td>
                    <td className="py-3 text-right font-mono text-emerald-400">
                      {row.leads.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Profit projection calculator */}
      <div className="border border-border bg-card p-6 rounded-[2px]">
        <div className="mb-5">
          <h3 className="text-lg font-display font-bold">Profit Projection Calculator</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Live math on <span className="text-foreground">real</span> inputs — latest-period
            clicks, actual estimate requests, and your actual win rate — combined with the
            rates you supply below. Nothing here leaves this page.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Presets <span className="normal-case tracking-normal">(illustrative examples — not forecasts)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`h-9 px-4 border rounded-[2px] text-sm transition-colors ${
                      activePreset === preset.name
                        ? 'border-primary/60 text-primary bg-primary/10'
                        : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Average project fee ($)
              </span>
              <input
                type="number"
                min={0}
                value={avgFee}
                onChange={onManual(setAvgFee)}
                className="mt-2 w-full h-10 px-3 bg-card border border-border rounded-[2px] text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Click → estimate request conversion (%)
              </span>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={convPct}
                onChange={onManual(setConvPct)}
                className="mt-2 w-full h-10 px-3 bg-card border border-border rounded-[2px] text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Estimate → closed deal rate (%)
              </span>
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={closePct}
                onChange={onManual(setClosePct)}
                className="mt-2 w-full h-10 px-3 bg-card border border-border rounded-[2px] text-sm text-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
            </label>
          </div>

          <div className="border border-border/60 rounded-[2px] bg-muted/10 p-6 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Projected monthly revenue</p>
            <p className="font-display text-4xl font-bold text-primary mt-2">
              {usd.format(Math.round(derived.projectedRevenue))}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {derived.scenario} scenario
            </p>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Monthly clicks (from {derived.periodDays}d period)</dt>
                <dd className="font-mono">{Math.round(derived.monthlyClicks).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Monthly estimate requests</dt>
                <dd className="font-mono">{derived.monthlyEstimates.toFixed(1)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Monthly closed deals</dt>
                <dd className="font-mono">{derived.monthlyWins.toFixed(1)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border/60 pt-2">
                <dt className="text-muted-foreground">Actual estimate requests (CRM)</dt>
                <dd className="font-mono">{funnel.totals.leads.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Actual win rate (CRM)</dt>
                <dd className="font-mono">{winRatePct.toFixed(1)}%</dd>
              </div>
            </dl>
            <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Illustrative example only — not a forecast or prediction. Projection math runs
                entirely in your browser from real Search Console traffic and real CRM lead
                counts plus the rates you enter above.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
