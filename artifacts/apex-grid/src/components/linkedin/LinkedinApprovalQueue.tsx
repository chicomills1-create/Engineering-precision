import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useListLinkedinActions, useUpdateLinkedinAction, useTransitionLinkedinAction, getGetLinkedinDashboardQueryKey, getListLinkedinActionsQueryKey, type LinkedinAction } from '@workspace/api-client-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExternalLink, Edit2, Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LinkedinApprovalQueue() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: actions, isLoading } = useListLinkedinActions();
  const updateAction = useUpdateLinkedinAction();
  const transitionAction = useTransitionLinkedinAction();
  
  const [selectedAction, setSelectedAction] = useState<LinkedinAction | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [transitionStatus, setTransitionStatus] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    owner: '',
    dueAt: '',
    approvedCopy: '',
    legalBasisNote: '',
  });

  const handleEditClick = (action: LinkedinAction) => {
    setSelectedAction(action);
    setEditMode(true);
    setFormData({
      owner: action.owner || '',
      dueAt: action.dueAt ? action.dueAt.substring(0, 16) : '', // format for datetime-local
      approvedCopy: action.approvedCopy || action.draftCopy || '',
      legalBasisNote: action.legalBasisNote || '',
    });
  };

  const handleTransitionClick = (action: LinkedinAction, status: string) => {
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
        }
      });
      toast({ title: 'Action updated successfully' });
      setEditMode(false);
      setSelectedAction(null);
      qc.invalidateQueries({ queryKey: getListLinkedinActionsQueryKey() });
    } catch (e: any) {
      toast({ title: 'Failed to update action', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  const submitTransition = async () => {
    if (!selectedAction || !transitionStatus) return;
    try {
      await transitionAction.mutateAsync({
        id: selectedAction.id,
        data: { status: transitionStatus }
      });
      toast({ title: `Action moved to ${transitionStatus.replace('_', ' ')}` });
      setTransitionStatus(null);
      setSelectedAction(null);
      qc.invalidateQueries({ queryKey: getListLinkedinActionsQueryKey() });
      qc.invalidateQueries({ queryKey: getGetLinkedinDashboardQueryKey() });
    } catch (e: any) {
      toast({ title: 'Failed to transition action', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="text-sm text-muted-foreground p-4">Loading queue...</div>;

  const queueActions = actions?.filter((a: LinkedinAction) => !['completed', 'replied', 'meeting_booked', 'opportunity_created', 'stopped', 'suppressed'].includes(a.status)) || [];

  return (
    <div className="space-y-6">
      {queueActions.length === 0 ? (
        <Card className="border-dashed bg-card/50">
          <CardContent className="py-12 text-center text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>The approval queue is empty.</p>
            <p className="text-sm mt-2">Generate drafts from the Research Library.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {queueActions.map((action: LinkedinAction) => (
            <Card key={action.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={action.status === 'approved' ? 'default' : 'secondary'}>
                        {action.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className="uppercase tracking-wider text-[10px]">{action.actionType.replace('_', ' ')}</Badge>
                      <span className="text-sm text-muted-foreground ml-auto">
                        Due: {action.dueAt ? format(new Date(action.dueAt), 'MMM d, h:mm a') : 'Unscheduled'}
                      </span>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-md border border-border">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {action.approvedCopy || action.draftCopy || 'No copy provided.'}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span><strong>Owner:</strong> {action.owner || 'Unassigned'}</span>
                      {action.directActionUrl && (
                        <a href={action.directActionUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                          Action URL <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="md:w-48 flex flex-col gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleEditClick(action)}>
                      <Edit2 className="w-4 h-4 mr-2" /> Edit Draft
                    </Button>
                    
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
                    
                    {action.status === 'approved' && (
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-md mb-2">
                        <p className="text-xs text-primary flex items-start gap-1.5 leading-tight">
                          <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          Approved actions do not send automatically. Execute manually, then log below.
                        </p>
                      </div>
                    )}
                    
                    {action.status === 'approved' && (
                      <Button variant="outline" size="sm" className="w-full justify-start text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200" onClick={() => handleTransitionClick(action, 'completed')}>
                        <CheckCircle className="w-4 h-4 mr-2" /> Log Completed
                      </Button>
                    )}

                    <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleTransitionClick(action, 'stopped')}>
                      <XCircle className="w-4 h-4 mr-2" /> Stop Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Action Draft</DialogTitle>
            <DialogDescription>Refine the copy before approval.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label>Owner (Employee)</Label>
              <Input value={formData.owner} onChange={e => setFormData({ ...formData, owner: e.target.value })} placeholder="e.g. jeremy@apexgrid.com" />
            </div>
            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Input type="datetime-local" value={formData.dueAt} onChange={e => setFormData({ ...formData, dueAt: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Copy / Note</Label>
              <Textarea 
                className="min-h-[120px]" 
                value={formData.approvedCopy} 
                onChange={(e: any) => setFormData({ ...formData, approvedCopy: e.target.value })} 
                placeholder="The drafted message or internal instruction"
              />
            </div>
            <div className="grid gap-2">
              <Label>Legal Basis Note (Optional)</Label>
              <Input value={formData.legalBasisNote} onChange={e => setFormData({ ...formData, legalBasisNote: e.target.value })} placeholder="e.g. Legitimate interest, pre-contractual" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
            <Button onClick={submitEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={transitionStatus !== null} onOpenChange={(open) => !open && setTransitionStatus(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Move this action to <strong>{transitionStatus?.replace('_', ' ')}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setTransitionStatus(null)}>Cancel</Button>
            <Button onClick={submitTransition}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}