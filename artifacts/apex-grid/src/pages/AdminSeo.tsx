import { useState, useMemo } from 'react';
import { Show } from '@clerk/react';
import { Redirect } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  Search,
  SlidersHorizontal,
  X,
  Activity,
  Globe,
  MousePointerClick,
  Eye,
  RefreshCw,
  Play
} from 'lucide-react';
import { AdminNav } from '@/components/layout/AdminNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  useGetSeoDashboard,
  useSyncSeoPerformance,
  useRunSeoAudit,
  useListSeoAuditIssues,
  getGetSeoDashboardQueryKey,
  getListSeoAuditIssuesQueryKey
} from '@workspace/api-client-react';

const apiBase = import.meta.env.VITE_API_BASE_URL ?? '/api';

// --- Shared Types & Utils for URL Inventory ---

interface SitemapEntry {
  url: string;
  path: string;
  sitemapFile: string;
  category: string;
  priority: string;
  lastmod: string;
  changefreq: string;
  hasTrailingSlash: boolean;
  hasStaticFile: boolean | null;
  softFourOhFourRisk: boolean;
  robotsBlocked: boolean;
  isHighPriority: boolean;
  gscVerdict: 'indexed' | 'not_indexed' | 'unknown';
  gscCoverageState: string | null;
  gscCheckedAt: string | null;
}

interface SeoStatusResponse {
  entries: SitemapEntry[];
  gsc: {
    configured: boolean;
    quotaExhausted: boolean;
    checkedCount: number;
  };
}

const CATEGORIES = [
  'all',
  'core',
  'services',
  'industries',
  'solutions',
  'resources',
  'locations',
  'architecture_locations',
  'general_contracting_locations',
  'other',
] as const;
type CategoryFilter = (typeof CATEGORIES)[number];
const PAGE_SIZE = 100;
const GSC_INSPECT_BASE = 'https://search.google.com/search-console/inspect?resource_id=sc-domain%3Aapexgrideng.com&id=';

function gscLink(url: string): string {
  return `${GSC_INSPECT_BASE}${encodeURIComponent(url)}`;
}

function GscBadge({ entry }: { entry: SitemapEntry }) {
  if (entry.gscVerdict === 'indexed') {
    return (
      <span
        className="inline-block text-xs px-2 py-0.5 border rounded-[2px] bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
        title={entry.gscCoverageState ?? undefined}
      >
        Indexed
      </span>
    );
  }
  if (entry.gscVerdict === 'not_indexed') {
    return (
      <span
        className="inline-block text-xs px-2 py-0.5 border rounded-[2px] bg-red-500/10 text-red-400 border-red-500/30"
        title={entry.gscCoverageState ?? undefined}
      >
        Not indexed
      </span>
    );
  }
  return (
    <span
      className="inline-block text-xs px-2 py-0.5 border rounded-[2px] bg-muted text-muted-foreground border-border"
      title="Not checked yet, or GSC quota exceeded"
    >
      Unknown
    </span>
  );
}

function PriorityBadge({ value }: { value: string }) {
  const num = parseFloat(value);
  const color =
    num >= 0.9
      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      : num >= 0.7
        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
        : 'bg-muted text-muted-foreground border-border';
  return (
    <span className={`inline-block text-xs px-2 py-0.5 border rounded-[2px] font-mono ${color}`}>
      {value}
    </span>
  );
}

function CategoryBadge({ value }: { value: string }) {
  const colors: Record<string, string> = {
    core: 'bg-primary/15 text-primary border-primary/30',
    services: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    industries: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    solutions: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    resources: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    locations: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
  };
  return (
    <span
      className={`inline-block text-xs px-2 py-0.5 border rounded-[2px] uppercase tracking-wider ${colors[value] ?? 'bg-muted text-muted-foreground border-border'}`}
    >
      {value}
    </span>
  );
}

// --- Tab Components ---

function DashboardTab() {
  const { data: dashboard, isLoading, error } = useGetSeoDashboard();
  const syncPerf = useSyncSeoPerformance();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground border border-border bg-card rounded-[2px]">
        <Activity className="w-8 h-8 animate-pulse mb-4 text-primary/50" />
        <p className="text-sm">Loading dashboard data...</p>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-[2px] text-sm">
        Failed to load SEO dashboard. Please refresh.
      </div>
    );
  }

  const handleSync = () => {
    syncPerf.mutate({ data: {} }, {
      onSuccess: (res) => {
        if (res.availability === 'unconfigured') {
           toast({ title: 'Not Configured', description: 'Google Search Console is not configured.', variant: 'destructive' });
        } else if (!res.synced) {
           toast({ title: 'Sync Failed', description: res.error || 'Failed to sync data.', variant: 'destructive' });
        } else {
           toast({ title: 'Performance Synced', description: `Synced ${res.totals.pages} pages, ${res.totals.queries} queries, and ${res.totals.pageQueries} keyword-to-page pairs.` });
           void queryClient.invalidateQueries({ queryKey: getGetSeoDashboardQueryKey() });
        }
      },
      onError: (err) => {
        toast({ title: 'Error', description: err.message || 'An error occurred', variant: 'destructive' });
      }
    });
  };

  const pages = dashboard.performance.filter(p => p.dimension === 'PAGE' || p.dimension === 'page');
  const queries = dashboard.performance.filter(p => p.dimension === 'QUERY' || p.dimension === 'query');

  const totalClicksCalc = pages.reduce((sum, p) => sum + (p.clicks || 0), 0);
  const totalImpressionsCalc = pages.reduce((sum, p) => sum + (p.impressions || 0), 0);
  
  const totalsRow = dashboard.performance.find(p => p.dimension === 'site');
  const displayClicks = totalsRow?.clicks ?? totalClicksCalc;
  const displayImpressions = totalsRow?.impressions ?? totalImpressionsCalc;
  const totalInquiries = dashboard.organicAttribution.reduce((sum, a) => sum + (a.count || 0), 0);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total URLs', value: dashboard.inventory.totalUrls.toLocaleString(), icon: Globe, color: 'text-primary' },
          { label: 'Organic Inquiries', value: totalInquiries.toLocaleString(), icon: Activity, color: 'text-emerald-400' },
          { label: 'GSC Clicks (30d)', value: displayClicks > 0 ? displayClicks.toLocaleString() : '—', icon: MousePointerClick, color: 'text-blue-400' },
          { label: 'GSC Impressions', value: displayImpressions > 0 ? displayImpressions.toLocaleString() : '—', icon: Eye, color: 'text-purple-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="border border-border bg-card p-4 rounded-[2px] flex items-start gap-4">
            <div className={`mt-1 ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
              <p className="font-display text-2xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="border border-border bg-card p-6 rounded-[2px] flex flex-col">
          <h3 className="text-lg font-display font-bold mb-4">Sitemap Index</h3>
          <div className="space-y-3 flex-1">
             {Object.entries(dashboard.inventory.byCategory).map(([cat, count]) => (
                <div key={cat} className="flex justify-between items-center text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                  <span className="capitalize text-muted-foreground">{cat}</span>
                  <span className="font-mono bg-muted/50 px-2 py-0.5 rounded-[2px]">{count.toLocaleString()}</span>
                </div>
             ))}
          </div>
        </div>
        <div className="lg:col-span-2 border border-border bg-card p-6 rounded-[2px]">
          <h3 className="text-lg font-display font-bold mb-4">Organic Attribution</h3>
          {dashboard.organicAttribution.length === 0 ? (
             <div className="py-8 text-center text-muted-foreground text-sm border border-dashed border-border rounded-[2px]">
               No organic inquiry attributions recorded yet.
             </div>
          ) : (
             <div className="overflow-x-auto">
               <table className="w-full text-sm">
                 <thead>
                   <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground text-left">
                     <th className="pb-2 font-medium px-2">Source / Medium</th>
                     <th className="pb-2 font-medium px-2">Landing Page</th>
                     <th className="pb-2 font-medium px-2">Referrer / Campaign</th>
                     <th className="pb-2 font-medium text-right px-2">Inquiries</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border/50">
                   {dashboard.organicAttribution.map((attr, idx) => (
                     <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                       <td className="py-2 px-2 text-foreground/80">{attr.source || '(direct)'} / {attr.medium || '(none)'}</td>
                       <td className="py-2 px-2 font-mono text-xs text-muted-foreground">{attr.landingPath || '—'}</td>
                       <td className="py-2 px-2 text-muted-foreground">{attr.referrer || attr.campaign || '—'}</td>
                       <td className="py-2 px-2 text-right font-mono">{attr.count}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          )}
        </div>
      </div>

      {/* Keyword retention */}
      <div className="border border-border bg-card p-6 rounded-[2px]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="text-lg font-display font-bold">Keyword Coverage Protection</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Search Console queries mapped to their actual landing pages. Pages outside the current sitemap are held for review, not automatically discarded.
            </p>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              {dashboard.keywordRetention.protectedCount.toLocaleString()} protected
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              {dashboard.keywordRetention.reviewCount.toLocaleString()} review
            </span>
          </div>
        </div>

        {dashboard.keywordRetention.opportunities.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-[2px]">
            Sync Search Console to check whether any historical keyword traffic lands outside the protected sitemap.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="border border-amber-400/20 bg-amber-400/5 p-4 rounded-[2px]">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Clicks needing review</p>
                <p className="font-display text-2xl font-bold mt-1">{dashboard.keywordRetention.reviewClicks.toLocaleString()}</p>
              </div>
              <div className="border border-amber-400/20 bg-amber-400/5 p-4 rounded-[2px]">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Impressions needing review</p>
                <p className="font-display text-2xl font-bold mt-1">{dashboard.keywordRetention.reviewImpressions.toLocaleString()}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground text-left">
                    <th className="pb-3 font-medium">Query</th>
                    <th className="pb-3 font-medium">Landing page</th>
                    <th className="pb-3 font-medium text-right">Clicks</th>
                    <th className="pb-3 font-medium text-right">Impressions</th>
                    <th className="pb-3 font-medium text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {dashboard.keywordRetention.opportunities.map((item, index) => (
                    <tr key={`${item.page}-${item.query}-${index}`} className="hover:bg-white/[0.02]">
                      <td className="py-3 pr-4 font-medium">{item.query || '(query unavailable)'}</td>
                      <td className="py-3 pr-4 max-w-[360px] truncate font-mono text-xs text-muted-foreground" title={item.page}>{item.page || 'Unknown page'}</td>
                      <td className="py-3 text-right font-mono">{item.clicks.toLocaleString()}</td>
                      <td className="py-3 text-right font-mono text-muted-foreground">{item.impressions.toLocaleString()}</td>
                      <td className="py-3 text-right font-mono text-muted-foreground">{parseFloat(item.position).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Performance Section */}
      <div className="border border-border bg-card p-6 rounded-[2px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-display font-bold">Search Performance</h3>
             <p className="text-sm text-muted-foreground mt-1">Top pages and queries from Google Search Console (Last 180 Days)</p>
          </div>
          <button
            type="button"
            onClick={handleSync}
            disabled={syncPerf.isPending}
            className="inline-flex items-center gap-2 h-9 px-4 border border-border bg-transparent text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 rounded-[2px] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncPerf.isPending ? 'animate-spin' : ''}`} />
            {syncPerf.isPending ? 'Syncing...' : 'Sync Data'}
          </button>
        </div>
        
        {dashboard.performance.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-border rounded-[2px] flex flex-col items-center">
            <Activity className="w-8 h-8 text-muted-foreground mb-4 opacity-50" />
            <h4 className="text-sm font-medium mb-1">No Performance Data</h4>
            <p className="text-xs text-muted-foreground mb-4 max-w-sm">
              Your dashboard hasn't fetched recent data from Google Search Console, or GSC is not configured.
            </p>
            <button 
              type="button"
              onClick={handleSync} 
              disabled={syncPerf.isPending} 
              className="inline-flex items-center h-8 px-4 border border-primary/50 text-primary bg-primary/10 hover:bg-primary/20 rounded-[2px] text-xs transition-colors"
            >
              Sync Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-3">Top Pages</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr className="text-xs text-muted-foreground text-left">
                      <th className="pb-2 font-medium">Page</th>
                      <th className="pb-2 font-medium text-right">Clicks</th>
                      <th className="pb-2 font-medium text-right">Impr.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {pages.map((p, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-2 max-w-[200px] truncate text-xs font-mono text-foreground/80 group-hover:text-foreground" title={p.dimensionValue}>{p.dimensionValue}</td>
                        <td className="py-2 text-right font-mono">{p.clicks?.toLocaleString()}</td>
                        <td className="py-2 text-right font-mono text-muted-foreground">{p.impressions?.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2 mb-3">Top Queries</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[400px]">
                  <thead>
                    <tr className="text-xs text-muted-foreground text-left">
                      <th className="pb-2 font-medium">Query</th>
                      <th className="pb-2 font-medium text-right">Clicks</th>
                      <th className="pb-2 font-medium text-right">Impr.</th>
                      <th className="pb-2 font-medium text-right">Pos.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {queries.map((q, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 font-medium text-foreground/90">{q.dimensionValue}</td>
                        <td className="py-2 text-right font-mono">{q.clicks?.toLocaleString()}</td>
                        <td className="py-2 text-right font-mono text-muted-foreground">{q.impressions?.toLocaleString()}</td>
                        <td className="py-2 text-right font-mono text-muted-foreground">{q.position ? parseFloat(q.position).toFixed(1) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border border-border bg-card p-6 rounded-[2px]">
        <div className="mb-5">
          <h3 className="text-lg font-display font-bold">Performance Trend</h3>
          <p className="text-sm text-muted-foreground mt-1">The most recent Search Console reporting periods stored by Apex Grid.</p>
        </div>
        {dashboard.performanceHistory.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground border border-dashed border-border rounded-[2px]">
            Sync Search Console to begin a durable trend history.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground text-left">
                  <th className="pb-3 font-medium">Reporting period</th>
                  <th className="pb-3 font-medium text-right">Clicks</th>
                  <th className="pb-3 font-medium text-right">Impressions</th>
                  <th className="pb-3 font-medium text-right">CTR</th>
                  <th className="pb-3 font-medium text-right">Avg. position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {dashboard.performanceHistory.map((period) => {
                  const ctr = period.impressions > 0 ? period.clicks / period.impressions : 0;
                  return (
                    <tr key={`${period.startDate}-${period.endDate}`} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 font-mono text-xs">{period.startDate} — {period.endDate}</td>
                      <td className="py-3 text-right font-mono">{period.clicks.toLocaleString()}</td>
                      <td className="py-3 text-right font-mono">{period.impressions.toLocaleString()}</td>
                      <td className="py-3 text-right font-mono">{(ctr * 100).toFixed(1)}%</td>
                      <td className="py-3 text-right font-mono">{parseFloat(period.position).toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function AuditIssuesTab() {
  const [severity, setSeverity] = useState<string>('all');
  const { data: issues, isLoading, error } = useListSeoAuditIssues({ 
    severity: severity === 'all' ? undefined : severity 
  });
  const runAudit = useRunSeoAudit();
  const { data: dashboard } = useGetSeoDashboard();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleRunAudit = () => {
    runAudit.mutate(undefined, {
      onSuccess: (data) => {
        toast({ title: 'Audit Started', description: `Run ID: ${data.auditRunId}. This may take a few minutes.` });
        void queryClient.invalidateQueries({ queryKey: getGetSeoDashboardQueryKey() });
        void queryClient.invalidateQueries({ queryKey: getListSeoAuditIssuesQueryKey() });
      },
      onError: (err) => {
        toast({ title: 'Audit Failed', description: err.message || 'Could not start audit', variant: 'destructive' });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-card p-6 rounded-[2px]">
        <div>
          <h3 className="text-lg font-display font-bold">Technical SEO Audit</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Latest Run:{' '}
            {dashboard?.latestAudit?.status === 'completed' ? (
               <span className="text-emerald-400 font-medium">Completed</span>
            ) : dashboard?.latestAudit?.status === 'running' ? (
               <span className="text-amber-400 font-medium animate-pulse">Running...</span>
            ) : dashboard?.latestAudit?.status === 'failed' ? (
               <span className="text-red-400 font-medium">Failed</span>
            ) : (
               <span>Never</span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRunAudit}
          disabled={runAudit.isPending || dashboard?.latestAudit?.status === 'running'}
          className="inline-flex items-center gap-2 h-9 px-4 border border-primary/50 text-primary bg-primary/10 hover:bg-primary/20 rounded-[2px] transition-colors disabled:opacity-50 text-sm font-medium"
        >
          {runAudit.isPending || dashboard?.latestAudit?.status === 'running' ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          Run Full Audit
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-border pb-4">
         {['all', 'critical', 'warning', 'info'].map(sev => (
           <button
             key={sev}
             type="button"
             onClick={() => setSeverity(sev)}
             className={`h-8 px-3 rounded-[2px] text-xs font-medium uppercase tracking-wider transition-colors border ${
               severity === sev 
                 ? 'bg-primary/10 text-primary border-primary/50' 
                 : 'bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
             }`}
           >
             {sev}
           </button>
         ))}
      </div>

      {isLoading ? (
        <div className="py-16 flex flex-col items-center justify-center border border-border bg-card rounded-[2px] text-muted-foreground">
          <Activity className="w-6 h-6 animate-pulse mb-3" />
          <span className="text-sm">Loading audit issues...</span>
        </div>
      ) : error ? (
        <div className="p-6 border border-destructive/50 bg-destructive/10 rounded-[2px] text-sm text-destructive-foreground">
          Failed to load audit issues.
        </div>
      ) : !issues || issues.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-border bg-card rounded-[2px]">
          <CheckCircle2 className="w-8 h-8 text-emerald-500/50 mx-auto mb-3" />
          <h4 className="text-sm font-medium mb-1">No Issues Found</h4>
          <p className="text-xs text-muted-foreground">Your site is in good technical health for this filter.</p>
        </div>
      ) : (
        <div className="border border-border bg-card rounded-[2px] overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground text-left bg-muted/20">
                <th className="px-4 py-3 font-medium w-28">Severity</th>
                <th className="px-4 py-3 font-medium w-36">Category</th>
                <th className="px-4 py-3 font-medium">Issue / Message</th>
                <th className="px-4 py-3 font-medium">URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {issues.map((issue, idx) => (
                 <tr key={idx} className={`hover:bg-white/[0.02] transition-colors ${issue.severity === 'critical' ? 'bg-red-500/5' : issue.severity === 'warning' ? 'bg-amber-500/5' : ''}`}>
                  <td className="px-4 py-3">
                     {issue.severity === 'critical' ? (
                       <span className="inline-flex items-center gap-1.5 text-xs text-red-400 font-medium"><AlertTriangle className="w-3.5 h-3.5" /> Critical</span>
                    ) : issue.severity === 'warning' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-medium"><AlertTriangle className="w-3.5 h-3.5" /> Warning</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-blue-400 font-medium"><Activity className="w-3.5 h-3.5" /> Info</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">{issue.category.replace(/_/g, ' ')}</td>
                  <td className="px-4 py-3 text-foreground/90">{issue.message}</td>
                  <td className="px-4 py-3 text-xs font-mono max-w-[300px] truncate text-muted-foreground hover:text-foreground transition-colors" title={issue.url}>
                    {issue.url}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function UrlInventoryTab() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [search, setSearch] = useState('');
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: response, isLoading, error } = useQuery<SeoStatusResponse>({
    queryKey: ['seo-status'],
    queryFn: async () => {
      const res = await fetch(`${apiBase}/seo-status`, { credentials: 'include' });
      if (!res.ok) throw Object.assign(new Error('Failed'), { status: res.status });
      return res.json() as Promise<SeoStatusResponse>;
    },
  });

  const data = response?.entries;
  const gsc = response?.gsc;

  const inspectMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${apiBase}/seo-status/inspect`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 50 }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Batch check failed');
      }
      return res.json() as Promise<{ checked: number; quotaExhausted: boolean }>;
    },
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: ['seo-status'] });
      toast({ title: 'GSC Inspection Complete', description: `Checked ${res.checked} URLs.` });
    },
    onError: (err) => {
      toast({ title: 'Inspection Failed', description: err.message, variant: 'destructive' });
    }
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((e) => {
      if (category !== 'all' && e.category !== category) return false;
      if (flaggedOnly && !e.isHighPriority) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!e.url.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [data, category, search, flaggedOnly]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageSlice = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const flaggedCount = data?.filter((e) => e.softFourOhFourRisk).length ?? 0;
  const robotsBlockedCount = data?.filter((e) => e.robotsBlocked).length ?? 0;

  function handleCategoryChange(c: CategoryFilter) {
    setCategory(c);
    setPage(1);
  }

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  function handleFlaggedOnly(v: boolean) {
    setFlaggedOnly(v);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Total URLs', value: data.length.toLocaleString() },
            { label: 'With Static File', value: data.filter((e) => e.hasStaticFile).length.toLocaleString() },
            { label: 'Soft-404 Risk', value: flaggedCount.toLocaleString(), danger: flaggedCount > 0 },
            { label: 'Robots Blocked', value: robotsBlockedCount.toLocaleString(), danger: robotsBlockedCount > 0 },
            {
              label: 'GSC Indexed',
              value: `${data.filter((e) => e.gscVerdict === 'indexed').length.toLocaleString()} / ${(gsc?.checkedCount ?? 0).toLocaleString()} checked`,
            },
          ].map(({ label, value, danger }) => (
            <div key={label} className="border border-border bg-card p-4 rounded-[2px]">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
              <p className={`font-display text-xl font-bold ${danger ? 'text-amber-400' : ''}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col xl:flex-row xl:items-center gap-4">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleCategoryChange(c)}
              className={`text-xs px-3 py-1.5 border rounded-[2px] uppercase tracking-wider transition-colors ${
                category === c
                  ? 'border-primary/60 text-primary bg-primary/10'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
              }`}
            >
              {c}
              {c !== 'all' && data && (
                <span className="ml-1.5 opacity-60">
                  ({data.filter((e) => e.category === c).length.toLocaleString()})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search + GSC batch check + flagged toggle */}
        <div className="flex flex-col sm:flex-row gap-2 xl:ml-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by URL…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-9 pl-8 pr-8 bg-card border border-border rounded-[2px] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => inspectMutation.mutate()}
            disabled={inspectMutation.isPending || !gsc?.configured || gsc?.quotaExhausted}
            title={
              !gsc?.configured
                ? 'Google Search Console credentials are not configured'
                : gsc?.quotaExhausted
                  ? 'GSC API quota exceeded — try again later'
                  : 'Check the next 50 unchecked URLs against Google Search Console'
            }
            className="inline-flex items-center gap-2 h-9 px-3 border rounded-[2px] text-sm transition-colors whitespace-nowrap border-border text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-40 disabled:cursor-default"
          >
            {inspectMutation.isPending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileSearch className="w-3.5 h-3.5" />}
            {inspectMutation.isPending ? 'Checking…' : 'Check 50 in GSC'}
          </button>
          <button
            type="button"
            onClick={() => handleFlaggedOnly(!flaggedOnly)}
            className={`inline-flex items-center gap-2 h-9 px-3 border rounded-[2px] text-sm transition-colors whitespace-nowrap ${
              flaggedOnly
                ? 'border-amber-500/60 text-amber-400 bg-amber-500/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Issues only
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center gap-3 text-muted-foreground py-16 border border-border bg-card rounded-[2px]">
          <Activity className="w-5 h-5 animate-pulse" />
          <span className="text-sm">Parsing sitemap index...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-[2px] text-sm text-destructive-foreground">
          Failed to load URL inventory. Please refresh and try again.
        </div>
      )}

      {/* Results */}
      {data && (
        <>
          <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
            <span>
              {filtered.length.toLocaleString()} URL{filtered.length !== 1 ? 's' : ''}
              {category !== 'all' || search || flaggedOnly ? ' (filtered)' : ''}
            </span>
            {totalPages > 1 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="border border-border bg-card p-12 rounded-[2px] text-center">
              <SlidersHorizontal className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">No URLs match the current filters.</p>
            </div>
          ) : (
            <div className="border border-border bg-card rounded-[2px] overflow-x-auto">
              <table className="w-full text-sm min-w-[900px]">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground bg-muted/20">
                    <th className="text-left px-4 py-3 font-medium">URL</th>
                    <th className="text-left px-4 py-3 font-medium w-28">Category</th>
                    <th className="text-left px-4 py-3 font-medium w-20">Priority</th>
                    <th className="text-left px-4 py-3 font-medium w-28">Last Modified</th>
                    <th className="text-left px-4 py-3 font-medium w-24">Static File</th>
                    <th className="text-left px-4 py-3 font-medium w-24">Robots</th>
                    <th className="text-left px-4 py-3 font-medium w-28">GSC Index</th>
                    <th className="text-left px-4 py-3 font-medium w-20">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pageSlice.map((entry) => (
                    <tr
                      key={entry.url}
                      className={`hover:bg-white/[0.02] transition-colors ${
                        entry.robotsBlocked
                          ? 'bg-red-500/5'
                          : entry.softFourOhFourRisk
                            ? 'bg-amber-500/5'
                            : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-foreground/90 max-w-[380px]">
                        <div className="flex items-start gap-2">
                          {entry.robotsBlocked ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                          ) : entry.softFourOhFourRisk ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/50 shrink-0 mt-0.5" />
                          )}
                          <span className="break-all leading-relaxed">{entry.path}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <CategoryBadge value={entry.category} />
                      </td>
                      <td className="px-4 py-3">
                        <PriorityBadge value={entry.priority} />
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                        {entry.lastmod}
                      </td>
                      <td className="px-4 py-3">
                        {entry.hasStaticFile === true ? (
                          <span className="inline-flex items-center text-xs text-emerald-400"><CheckCircle2 className="w-3 h-3 mr-1" /> yes</span>
                        ) : entry.hasStaticFile === false ? (
                          <span className="text-xs text-muted-foreground">— no</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">?</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {entry.robotsBlocked ? (
                          <span className="inline-flex items-center gap-1 text-xs text-red-400 font-medium">
                            <AlertTriangle className="w-3 h-3" />
                            Blocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-xs text-emerald-400"><CheckCircle2 className="w-3 h-3 mr-1" /> Allowed</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <GscBadge entry={entry} />
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={gscLink(entry.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                          title="Open in GSC URL Inspection"
                        >
                          GSC
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
                className="h-9 px-4 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 rounded-[2px] transition-colors disabled:opacity-40 disabled:cursor-default"
              >
                ← Previous
              </button>
              <span className="text-xs text-muted-foreground font-medium">
                Showing {((currentPage - 1) * PAGE_SIZE + 1).toLocaleString()}–
                {Math.min(currentPage * PAGE_SIZE, filtered.length).toLocaleString()} of{' '}
                {filtered.length.toLocaleString()}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="h-9 px-4 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 rounded-[2px] transition-colors disabled:opacity-40 disabled:cursor-default"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// --- Main Page Component ---

function SeoDashboardPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2 font-medium">Admin</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">SEO & Growth</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Search console performance, technical audits, and sitemap coverage
          </p>
        </div>
      </div>
      
      <AdminNav />

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-8 bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 gap-6 overflow-x-auto flex-nowrap">
          <TabsTrigger 
            value="dashboard" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="issues" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Audit Issues
          </TabsTrigger>
          <TabsTrigger 
            value="inventory" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            URL Inventory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <DashboardTab />
        </TabsContent>
        <TabsContent value="issues" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <AuditIssuesTab />
        </TabsContent>
        <TabsContent value="inventory" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <UrlInventoryTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AdminSeo() {
  return (
    <>
      <Show when="signed-in">
        <SeoDashboardPage />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}
