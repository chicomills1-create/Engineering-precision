import { useGetGrowthDashboard, GrowthPipelineItem, GrowthPipelineItemEntityType } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Building2, Network, UserPlus, Search, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function GrowthOverviewTab() {
  const { data: dashboard, isLoading, isError } = useGetGrowthDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-[2px]" />)}
        </div>
        <Skeleton className="h-[400px] rounded-[2px]" />
      </div>
    );
  }

  if (isError || !dashboard) {
    return (
      <Card className="rounded-[2px]">
        <CardContent className="py-12 text-center text-muted-foreground flex flex-col items-center">
          <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
          <p>Failed to load growth dashboard.</p>
        </CardContent>
      </Card>
    );
  }

  const { pipeline, dueNextActions, stageCounts, totals } = dashboard;

  const EntityIcon = ({ type, className = "h-4 w-4" }: { type: GrowthPipelineItemEntityType, className?: string }) => {
    switch (type) {
      case 'lead': return <UserPlus className={className} />;
      case 'referral_partner': return <Network className={className} />;
      case 'public_opportunity': return <Search className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  const getStageColor = (stage: string) => {
    const s = stage.toLowerCase();
    if (s.includes('won') || s.includes('active')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (s.includes('lost') || s.includes('former')) return 'bg-muted text-muted-foreground border-border';
    if (s.includes('proposal') || s.includes('qualified')) return 'bg-primary/10 text-primary border-primary/20';
    return 'bg-secondary text-secondary-foreground border-border';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-[2px] bg-card/50" data-testid="kpi-public">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Total Opportunities
              <Search className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold" data-testid="text-totals-public">{totals.opportunities || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Sourced from public review</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2px] bg-card/50" data-testid="kpi-referral">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Referral Network
              <Network className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold" data-testid="text-totals-referral">{totals.partners || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Active & prospective partners</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2px] bg-card/50" data-testid="kpi-lead">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              Direct Inquiries
              <UserPlus className="h-4 w-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold" data-testid="text-totals-lead">{totals.inquiries || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Client leads & RFPs</p>
          </CardContent>
        </Card>
        <Card className="rounded-[2px] border-primary/20 bg-primary/5" data-testid="kpi-due">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary flex items-center justify-between">
              Due Actions
              <AlertTriangle className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold text-primary" data-testid="text-totals-due">{dueNextActions.length}</div>
            <p className="text-xs text-primary/80 mt-1">Tasks requiring attention today</p>
          </CardContent>
        </Card>
      </div>

      {dueNextActions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-display font-bold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Priority Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dueNextActions.map(action => (
              <Card key={`${action.entityType}-${action.id}`} className="rounded-[2px] border-primary/20 bg-card">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                        <EntityIcon type={action.entityType} className="h-3 w-3" />
                        {action.entityType.replace('_', ' ')}
                      </div>
                      {action.nextActionAt && (
                        <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-[2px] font-mono">
                          Due: {format(new Date(action.nextActionAt), 'MMM d')}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-lg leading-tight mb-1">{action.title}</h4>
                    <p className="text-sm text-foreground/80 font-medium mb-3 border-l-2 border-primary/50 pl-2">
                      {action.nextAction}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-display font-bold">Unified Pipeline</h3>
        <Card className="rounded-[2px] overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Opportunity</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                  <th className="px-4 py-3 font-medium">Next Action</th>
                  <th className="px-4 py-3 font-medium text-right">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pipeline.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="h-10 w-10 text-muted mb-4" />
                        <p>No active pipeline items.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pipeline.map(item => (
                    <tr key={`${item.entityType}-${item.id}`} className="hover:bg-secondary/30 transition-colors group" data-testid={`row-pipeline-${item.entityType}-${item.id}`}>
                      <td className="px-4 py-4 align-top">
                        <div className="flex gap-3">
                          <div className="mt-1 flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors">
                            <EntityIcon type={item.entityType} />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{item.title}</div>
                            {item.subtitle && <div className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</div>}
                            <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider opacity-70">
                              Source: {item.source}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <Badge variant="outline" className={`rounded-[2px] capitalize font-mono text-[10px] ${getStageColor(item.stage)}`}>
                          {item.stage.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 align-top">
                        {item.nextAction ? (
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{item.nextAction}</span>
                            {item.nextActionAt && (
                              <span className="text-xs text-muted-foreground font-mono mt-1 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {format(new Date(item.nextActionAt), 'MMM d, yyyy')}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">None scheduled</span>
                        )}
                      </td>
                      <td className="px-4 py-4 align-top text-right whitespace-nowrap">
                        <div className="flex flex-col items-end">
                          <span className="font-mono text-foreground/80">{Math.floor(item.responseAgeHours / 24)}d</span>
                          <span className="text-[10px] text-muted-foreground mt-1 tracking-wider uppercase">Active</span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
