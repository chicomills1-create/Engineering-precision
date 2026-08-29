import { useGetLinkedinDashboard } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Building, Activity, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

export function LinkedinDashboard() {
  const { data: dashboard, isLoading, error } = useGetLinkedinDashboard();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="p-4 mb-8 bg-destructive/10 text-destructive text-sm rounded-md">
        Failed to load LinkedIn dashboard metrics.
      </div>
    );
  }

  const people = dashboard.people ?? 0;
  const companies = dashboard.companies ?? 0;
  const actions = dashboard.actions ?? 0;
  const completedToday = dashboard.completedToday ?? 0;
  const contentItems = dashboard.contentItems ?? 0;
  const publishedToday = dashboard.publishedToday ?? 0;
  const provider = dashboard.provider ?? { name: 'Manual', capabilities: {} };
  const outcomes = dashboard.outcomeRollups ?? {};

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 mb-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{people}</div>
            <p className="text-xs text-muted-foreground mt-1">in research library</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{companies}</div>
            <p className="text-xs text-muted-foreground mt-1">in research library</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Actions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{actions}</div>
            <p className="text-xs text-muted-foreground mt-1">in approval queue</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Completed Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-primary">{completedToday} <span className="text-sm font-normal text-muted-foreground">/ 25 limit</span></div>
            <p className="text-xs text-muted-foreground mt-1">daily action limit</p>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">{contentItems}</div>
            <p className="text-xs text-muted-foreground mt-1">in calendar</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Published Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display text-primary">{publishedToday} <span className="text-sm font-normal text-muted-foreground">/ 3 limit</span></div>
            <p className="text-xs text-muted-foreground mt-1">daily publish limit</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Provider Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Provider Name</span>
                <span className="text-sm font-medium">{provider.name}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-sm flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Auto-send Connection Requests</span>
                <span className="text-xs px-2 py-0.5 rounded bg-muted/50">Disabled</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-sm flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Auto-send Messages</span>
                <span className="text-xs px-2 py-0.5 rounded bg-muted/50">Disabled</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-sm flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> Auto-publish Content</span>
                <span className="text-xs px-2 py-0.5 rounded bg-muted/50">Disabled</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Outcomes Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.keys(outcomes).length === 0 ? (
                <p className="text-sm text-muted-foreground">No outcomes recorded yet.</p>
              ) : (
                Object.entries(outcomes).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{type.replace(/_/g, ' ')}</span>
                    <span className="text-sm font-medium">{String(count)}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}