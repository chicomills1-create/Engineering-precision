import { useState, useMemo } from 'react';
import { Show } from '@clerk/react';
import { Redirect, Link } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileSearch,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const apiBase = import.meta.env.VITE_API_BASE_URL ?? '/api';

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
const CATEGORIES = ['all', 'core', 'services', 'industries', 'solutions', 'resources', 'locations'] as const;
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

function SeoStatusTable() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [search, setSearch] = useState('');
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['seo-status'] });
    },
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
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-[70vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Admin</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">SEO Status</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sitemap coverage and indexing health across all pages
          </p>
        </div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 h-10 px-4 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 rounded-[2px] transition-colors self-start md:self-auto"
        >
          ← Leads &amp; Subscribers
        </Link>
      </div>

      {/* Stats bar */}
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
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
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">{label}</p>
              <p className={`font-display text-2xl font-bold ${danger ? 'text-amber-400' : ''}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-6">
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
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Filter by URL…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full h-9 pl-8 pr-8 bg-card border border-border rounded-[2px] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60"
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
            <FileSearch className="w-3.5 h-3.5" />
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
        <div className="flex items-center gap-3 text-muted-foreground py-16">
          <FileSearch className="w-5 h-5 animate-pulse" />
          <span>Parsing sitemap files…</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="border border-destructive/50 bg-destructive/10 p-6 rounded-[2px] text-sm">
          Failed to load SEO status. Please refresh and try again.
        </div>
      )}

      {/* Results */}
      {data && (
        <>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
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
              <p className="text-muted-foreground">No URLs match the current filters.</p>
            </div>
          ) : (
            <div className="border border-border bg-card rounded-[2px] overflow-x-auto">
              <table className="w-full text-sm min-w-[820px]">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="text-left px-4 py-3 font-medium">URL</th>
                    <th className="text-left px-4 py-3 font-medium w-28">Category</th>
                    <th className="text-left px-4 py-3 font-medium w-20">Priority</th>
                    <th className="text-left px-4 py-3 font-medium w-28">Last Modified</th>
                    <th className="text-left px-4 py-3 font-medium w-24">Static File</th>
                    <th className="text-left px-4 py-3 font-medium w-28">Robots</th>
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
                          <span className="text-xs text-emerald-400">✓ yes</span>
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
                          <span className="text-xs text-emerald-400">✓ Allowed</span>
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
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
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
            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage(currentPage - 1)}
                className="h-9 px-4 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 rounded-[2px] transition-colors disabled:opacity-40 disabled:cursor-default"
              >
                ← Previous
              </button>
              <span className="text-xs text-muted-foreground">
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

export default function AdminSeo() {
  return (
    <>
      <Show when="signed-in">
        <SeoStatusTable />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}
