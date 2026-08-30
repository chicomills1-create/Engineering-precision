import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  getGetLinkedinProviderQueryKey,
  getGetLinkedinDashboardQueryKey,
  getGetLinkedinQueueQueryKey,
  useExecuteLinkedinAction,
  useGetLinkedinProvider,
  useGetLinkedinQueue,
  usePrepareLinkedinQueue,
  useRescheduleLinkedinAction,
  useUpdateLinkedinAction,
  useTransitionLinkedinAction,
  type LinkedinQueueItem,
} from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { ExternalLink, Edit2, Play, CheckCircle, XCircle, AlertCircle, CalendarClock, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const phoenixToday = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Phoenix',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

const bucketLabels: Record<string, string> = {
  review: 'Needs review',
  overdue: 'Overdue',
  today: 'Today',
  upcoming: 'Upcoming',
  unscheduled: 'Unscheduled',
};

export function LinkedinApprovalQueue() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: queue, isLoading, error } = useGetLinkedinQueue({ date: phoenixToday, limit: 100 });
  const updateAction = useUpdateLinkedinAction();
  const transitionAction = useTransitionLinkedinAction();
  const prepareQueue = usePrepareLinkedinQueue();
  const rescheduleAction = useRescheduleLinkedinAction();
  const executeAction = useExecuteLinkedinAction();
  const { data: provider } = useGetLinkedinProvider();

  const [selectedAction, setSelectedAction] = useState<LinkedinQueueItem | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [transitionStatus, setTransitionStatus] = useState<string | null>(null);
  const [rescheduleMode, setRescheduleMode] = useState(false);
  const [rescheduleAt, setRescheduleAt] = useState('');
  const [formData, setFormData] = useState({ owner: '', dueAt: '', approvedCopy: '', legalBasisNote: '' });

  const invalidateQueue = () => {
    qc.invalidateQueries({ queryKey: getGetLinkedinQueueQueryKey({ date: phoenixToday, limit: 100 }) });
    qc.invalidateQueries({ queryKey: getGetLinkedinDashboardQueryKey() });
    qc.invalidateQueries({ queryKey: getGetLinkedinProviderQueryKey() });
  };

  const handleEditClick = (action: LinkedinQueueItem) => {
    setSelectedAction(action);
    setEditMode(true);
    setFormData({
      owner: action.owner || '',
      dueAt: action.dueAt ? action.dueAt.substring(0, 16) : '',
      approvedCopy: action.approvedCopy || action.draftCopy || '',
      legalBasisNote: action.legalBasisNote || '',
    });
  };

  const handleTransitionClick = (action: LinkedinQueueItem, status: string) => {
    setSelectedAction(action);
    setTransitionStatus(status);
  };

  const submitEdit = async () => {
    if (!selectedAction) return;
    try {
      await updateAction.mutateAsync({
        id: selectedAction.id,
        data: {
          owner: formData.owner || undefined,
          dueAt: formData.dueAt ? new Date(formData.dueAt).toISOString() : undefined,
          approvedCopy: formData.approvedCopy || undefined,
          legalBasisNote: formData.legalBasisNote || undefined,
        },
      });
      toast({ title: 'Action updated successfully' });
      setEditMode(false);
      setSelectedAction(null);
      invalidateQueue();
    } catch (e: any) {
      toast({ title: 'Failed to update action', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  const submitTransition = async () => {
    if (!selectedAction || !transitionStatus) return;
    try {
      await transitionAction.mutateAsync({
        id: selectedAction.id,
        data: { status: transitionStatus, note: transitionStatus === 'stopped' ? 'Skipped from daily queue' : undefined },
      });
      toast({ title: transitionStatus === 'completed' ? 'Manual LinkedIn action logged' : `Action moved to ${transitionStatus.replace('_', ' ')}` });
      setTransitionStatus(null);
      setSelectedAction(null);
      invalidateQueue();
    } catch (e: any) {
      toast({ title: 'Failed to transition action', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  const submitPrepare = async () => {
    try {
      const result = await prepareQueue.mutateAsync({ data: { date: phoenixToday, limit: 25, actionType: 'connection_note' } });
      toast({ title: 'Daily queue prepared', description: `${result.prepared} new action${result.prepared === 1 ? '' : 's'} added for review.` });
      invalidateQueue();
    } catch (e: any) {
      toast({ title: 'Unable to prepare queue', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  const openReschedule = (action: LinkedinQueueItem) => {
    setSelectedAction(action);
    setRescheduleAt(action.dueAt ? action.dueAt.substring(0, 16) : '');
    setRescheduleMode(true);
  };

  const submitReschedule = async () => {
    if (!selectedAction || !rescheduleAt) return;
    try {
      await rescheduleAction.mutateAsync({ id: selectedAction.id, data: { dueAt: new Date(rescheduleAt).toISOString() } });
      toast({ title: 'Action rescheduled' });
      setRescheduleMode(false);
      setSelectedAction(null);
      invalidateQueue();
    } catch (e: any) {
      toast({ title: 'Unable to reschedule action', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  const executeApprovedAction = async (action: LinkedinQueueItem) => {
    try {
      const result = await executeAction.mutateAsync({ id: action.id });
      const awaitingReconciliation = result.providerState === 'ambiguous';
      toast({
        title: awaitingReconciliation ? 'Provider outcome needs reconciliation' : 'Approved post published',
        description: awaitingReconciliation
          ? 'The provider request will not be retried. A signed webhook must reconcile the outcome.'
          : 'LinkedIn accepted the approved organization post.',
      });
      invalidateQueue();
    } catch (e: any) {
      toast({ title: 'Provider action rejected', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="text-sm text-muted-foreground p-4">Loading daily queue...</div>;
  if (error || !queue) return <div className="text-sm text-destructive p-4">The LinkedIn daily queue could not be loaded. Please refresh and try again.</div>;

  const groups = ['review', 'overdue', 'today', 'upcoming', 'unscheduled']
    .map((bucket) => ({ bucket, items: queue.items.filter((item) => item.bucket === bucket) }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6" data-testid="linkedin-daily-queue">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-display font-semibold">Daily LinkedIn queue</h2>
          <p className="text-sm text-muted-foreground">Prepare today’s work, approve each action, then have the designated Apex Grid owner complete it manually in LinkedIn.</p>
        </div>
        <Button onClick={submitPrepare} disabled={prepareQueue.isPending} data-testid="button-prepare-linkedin-queue">
          <Sparkles className="w-4 h-4 mr-2" />
          {prepareQueue.isPending ? 'Preparing...' : 'Prepare today’s queue'}
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <QueueMetric label="Ready today" value={queue.readyCount} tone="primary" />
        <QueueMetric label="Overdue" value={queue.overdueCount} tone={queue.overdueCount ? 'warning' : 'default'} />
        <QueueMetric label="Needs review" value={queue.reviewCount} />
        <QueueMetric label="Completed today" value={`${queue.completedToday} / ${queue.dailyLimit}`} tone="primary" />
        <QueueMetric label="Remaining capacity" value={queue.remainingToday} />
      </div>

      {groups.length === 0 ? (
        <Card className="border-dashed bg-card/50">
          <CardContent className="py-12 text-center text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>Your daily LinkedIn queue is empty.</p>
            <p className="text-sm mt-2">Prepare the queue to turn eligible researched people into reviewed actions.</p>
          </CardContent>
        </Card>
      ) : groups.map(({ bucket, items }) => (
        <section key={bucket} className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold">{bucketLabels[bucket]}</h3>
            <Badge variant="secondary">{items.length}</Badge>
          </div>
          <div className="grid gap-4">
            {items.map((action) => (
              <Card key={action.id} data-testid={`linkedin-queue-item-${action.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col xl:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={action.status === 'approved' ? 'default' : 'secondary'}>{action.status.replace('_', ' ')}</Badge>
                        <Badge variant="outline" className="uppercase tracking-wider text-[10px]">{action.actionType.replace('_', ' ')}</Badge>
                        {action.dueAt && <span className="text-sm text-muted-foreground ml-auto">Due {format(new Date(action.dueAt), 'MMM d, h:mm a')}</span>}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{action.personName || 'Research target'}</h4>
                        <p className="text-sm text-muted-foreground">{action.personRole || 'Decision-maker'}{action.companyName ? ` · ${action.companyName}` : ''}</p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-md border border-border">
                        <p className="text-sm text-foreground whitespace-pre-wrap">{action.approvedCopy || action.draftCopy || 'No copy provided.'}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span><strong>Owner:</strong> {action.owner || 'Unassigned'}</span>
                        {action.personLinkedinUrl && (
                          <a href={action.personLinkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                            Open LinkedIn <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="xl:w-52 flex flex-col gap-2 shrink-0">
                      {(action.status === 'draft' || action.status === 'pending_review') && (
                        <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleEditClick(action)}>
                          <Edit2 className="w-4 h-4 mr-2" /> Edit Draft
                        </Button>
                      )}
                      {action.status === 'draft' && (
                        <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleTransitionClick(action, 'pending_review')}>
                          <Play className="w-4 h-4 mr-2" /> Request Review
                        </Button>
                      )}
                      {action.status === 'pending_review' && (
                        <Button variant="default" size="sm" className="w-full justify-start" onClick={() => handleTransitionClick(action, 'approved')}>
                          <CheckCircle className="w-4 h-4 mr-2" /> Approve
                        </Button>
                      )}
                      {action.status === 'approved' && action.actionType !== 'organization_post' && (
                        <>
                          <div className="p-3 bg-primary/10 border border-primary/20 rounded-md mb-1">
                            <p className="text-xs text-primary flex items-start gap-1.5 leading-tight">
                              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                              The designated Apex Grid owner must send this manually in LinkedIn, then log it here.
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => openReschedule(action)}>
                            <CalendarClock className="w-4 h-4 mr-2" /> Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200" onClick={() => handleTransitionClick(action, 'completed')}>
                            <CheckCircle className="w-4 h-4 mr-2" /> Log Sent
                          </Button>
                        </>
                      )}
                      {action.status === 'approved' && action.actionType === 'organization_post' && (
                        <div className="space-y-2">
                          <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                            <p className="text-xs text-primary flex items-start gap-1.5 leading-tight">
                              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                              {provider?.capabilities.publishOrganizationPost
                                ? 'This publishes the immutable approved copy through the official provider and consumes today’s Phoenix limit.'
                                : 'Official provider publishing is unavailable. The action remains manual-only.'}
                            </p>
                          </div>
                          {action.providerState !== 'not_attempted' && (
                            <Badge variant="outline" className="capitalize">
                              Provider: {action.providerState.replace('_', ' ')}
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            className="w-full justify-start"
                            disabled={!provider?.capabilities.publishOrganizationPost || action.providerState !== 'not_attempted' || executeAction.isPending}
                            onClick={() => executeApprovedAction(action)}
                          >
                            <Play className="w-4 h-4 mr-2" /> Publish Approved Post
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => openReschedule(action)}>
                            <CalendarClock className="w-4 h-4 mr-2" /> Reschedule
                          </Button>
                        </div>
                      )}
                      {(action.status === 'draft' || action.status === 'pending_review' || action.status === 'approved') && action.providerState === 'not_attempted' && (
                        <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleTransitionClick(action, 'stopped')}>
                          <XCircle className="w-4 h-4 mr-2" /> Skip / Stop
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}

      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Action Draft</DialogTitle><DialogDescription>Refine the copy before approval.</DialogDescription></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2"><Label>Owner (Apex Grid)</Label><Input value={formData.owner} onChange={(e) => setFormData({ ...formData, owner: e.target.value })} placeholder="Designated Apex Grid owner" /></div>
            <div className="grid gap-2"><Label>Due Date</Label><Input type="datetime-local" value={formData.dueAt} onChange={(e) => setFormData({ ...formData, dueAt: e.target.value })} /></div>
            <div className="grid gap-2"><Label>Copy / Note</Label><Textarea className="min-h-[120px]" value={formData.approvedCopy} onChange={(e) => setFormData({ ...formData, approvedCopy: e.target.value })} placeholder="The drafted message or internal instruction" /></div>
            <div className="grid gap-2"><Label>Legal Basis Note</Label><Input value={formData.legalBasisNote} onChange={(e) => setFormData({ ...formData, legalBasisNote: e.target.value })} placeholder="e.g. Legitimate interest, pre-contractual" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button><Button onClick={submitEdit}>Save Changes</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={rescheduleMode} onOpenChange={setRescheduleMode}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reschedule manual action</DialogTitle><DialogDescription>Choose when this approved action should appear in the daily queue.</DialogDescription></DialogHeader>
          <div className="py-4"><Label>Due Date</Label><Input className="mt-2" type="datetime-local" value={rescheduleAt} onChange={(e) => setRescheduleAt(e.target.value)} /></div>
          <DialogFooter><Button variant="outline" onClick={() => setRescheduleMode(false)}>Cancel</Button><Button onClick={submitReschedule} disabled={!rescheduleAt}>Reschedule</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={transitionStatus !== null} onOpenChange={(open) => !open && setTransitionStatus(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm status change</DialogTitle><DialogDescription>Move this action to <strong>{transitionStatus?.replace('_', ' ')}</strong>?</DialogDescription></DialogHeader>
          <DialogFooter className="mt-6"><Button variant="outline" onClick={() => setTransitionStatus(null)}>Cancel</Button><Button onClick={submitTransition}>Confirm</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function QueueMetric({ label, value, tone = 'default' }: { label: string; value: string | number; tone?: 'default' | 'primary' | 'warning' }) {
  return (
    <Card className={tone === 'primary' ? 'border-primary/20' : tone === 'warning' ? 'border-amber-500/30' : ''}>
      <CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground">{label}</CardTitle></CardHeader>
      <CardContent><div className={`text-2xl font-bold font-display ${tone === 'primary' ? 'text-primary' : tone === 'warning' ? 'text-amber-500' : ''}`}>{value}</div></CardContent>
    </Card>
  );
}