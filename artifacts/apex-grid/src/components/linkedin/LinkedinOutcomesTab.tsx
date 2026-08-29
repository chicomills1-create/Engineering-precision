import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { 
  useListLinkedinOutcomes, 
  useCreateLinkedinOutcome,
  useListLinkedinPeople,
  useListLinkedinCompanies,
  useListLinkedinActions,
  useListLinkedinCampaigns,
  useListLinkedinContent,
  getListLinkedinOutcomesQueryKey,
  getGetLinkedinDashboardQueryKey,
  type LinkedinOutcome,
  type LinkedinPerson,
  type LinkedinCompany,
  type LinkedinAction,
  type LinkedinCampaign,
  type LinkedinContentItem,
  type LinkedinOutcomeInputOutcomeType
} from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Target, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LinkedinOutcomesTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: outcomes, isLoading } = useListLinkedinOutcomes();
  const { data: people } = useListLinkedinPeople();
  const { data: companies } = useListLinkedinCompanies();
  const { data: actions } = useListLinkedinActions();
  const { data: campaigns } = useListLinkedinCampaigns();
  const { data: content } = useListLinkedinContent();
  
  const createOutcome = useCreateLinkedinOutcome();
  
  const [addOpen, setAddOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    outcomeType: '',
    occurredAt: new Date().toISOString().substring(0, 16),
    value: '',
    count: '1',
    notes: '',
    sourceUrl: '',
    personId: '',
    companyId: '',
    actionId: '',
    campaignId: '',
    contentItemId: ''
  });

  const handleAdd = async () => {
    try {
      const data: any = {
        outcomeType: formData.outcomeType as LinkedinOutcomeInputOutcomeType,
        occurredAt: new Date(formData.occurredAt).toISOString(),
      };
      
      if (formData.value) data.value = parseInt(formData.value, 10);
      if (formData.count) data.count = parseInt(formData.count, 10);
      if (formData.notes) data.notes = formData.notes;
      if (formData.sourceUrl) data.sourceUrl = formData.sourceUrl;
      
      if (formData.personId && formData.personId !== 'none') data.personId = parseInt(formData.personId, 10);
      if (formData.companyId && formData.companyId !== 'none') data.companyId = parseInt(formData.companyId, 10);
      if (formData.actionId && formData.actionId !== 'none') data.actionId = parseInt(formData.actionId, 10);
      if (formData.campaignId && formData.campaignId !== 'none') data.campaignId = parseInt(formData.campaignId, 10);
      if (formData.contentItemId && formData.contentItemId !== 'none') data.contentItemId = parseInt(formData.contentItemId, 10);

      await createOutcome.mutateAsync({ data });
      
      toast({ title: 'Outcome recorded' });
      setAddOpen(false);
      setFormData({
        outcomeType: '',
        occurredAt: new Date().toISOString().substring(0, 16),
        value: '',
        count: '1',
        notes: '',
        sourceUrl: '',
        personId: '',
        companyId: '',
        actionId: '',
        campaignId: '',
        contentItemId: ''
      });
      qc.invalidateQueries({ queryKey: getListLinkedinOutcomesQueryKey() });
      qc.invalidateQueries({ queryKey: getGetLinkedinDashboardQueryKey() });
    } catch (e: any) {
      toast({ title: 'Failed to record outcome', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="text-sm text-muted-foreground p-4">Loading outcomes...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Log resulting conversions, replies, and meetings.</p>
        <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-2"/> Log Outcome</Button>
      </div>

      {outcomes?.length === 0 ? (
        <Card className="border-dashed bg-card/50">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No outcomes logged yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {outcomes?.map((outcome: LinkedinOutcome) => (
            <div key={outcome.id} className="p-4 border rounded-md bg-card/50 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="capitalize">{outcome.outcomeType.replace('_', ' ')}</Badge>
                <span className="text-sm text-muted-foreground">{format(new Date(outcome.occurredAt), 'MMM d, yyyy')}</span>
                {(outcome.value ?? 0) > 0 && <span className="text-sm font-medium ml-2 text-emerald-600">Value: ${(outcome.value ?? 0).toLocaleString()}</span>}
                {outcome.count > 1 && <Badge variant="secondary" className="ml-2">x{outcome.count}</Badge>}
              </div>
              
              {(outcome.personId || outcome.companyId || outcome.actionId || outcome.campaignId || outcome.contentItemId) && (
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-1">
                  {outcome.personId && <span className="bg-muted px-2 py-0.5 rounded">Person #{outcome.personId}</span>}
                  {outcome.companyId && <span className="bg-muted px-2 py-0.5 rounded">Company #{outcome.companyId}</span>}
                  {outcome.actionId && <span className="bg-muted px-2 py-0.5 rounded">Action #{outcome.actionId}</span>}
                  {outcome.campaignId && <span className="bg-muted px-2 py-0.5 rounded">Campaign #{outcome.campaignId}</span>}
                  {outcome.contentItemId && <span className="bg-muted px-2 py-0.5 rounded">Content #{outcome.contentItemId}</span>}
                </div>
              )}

              {outcome.notes && (
                <p className="text-sm text-foreground mt-1">{outcome.notes}</p>
              )}
              
              {outcome.sourceUrl && (
                <a href={outcome.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1">
                  Source Evidence <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Log Outcome</DialogTitle>
            <DialogDescription>Record a successful interaction or conversion.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Outcome Type *</Label>
                <Select value={formData.outcomeType} onValueChange={v => setFormData({...formData, outcomeType: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visit">Profile Visit</SelectItem>
                    <SelectItem value="reply">Reply</SelectItem>
                    <SelectItem value="meeting">Meeting Booked</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="win">Win</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date/Time *</Label>
                <Input type="datetime-local" value={formData.occurredAt} onChange={e => setFormData({...formData, occurredAt: e.target.value})} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Count</Label>
                <Input type="number" min="1" value={formData.count} onChange={e => setFormData({...formData, count: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Estimated Value ($)</Label>
                <Input type="number" min="0" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} placeholder="Optional" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Source URL</Label>
              <Input value={formData.sourceUrl} onChange={e => setFormData({...formData, sourceUrl: e.target.value})} placeholder="Link to public interaction if applicable" />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Input value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Additional context" />
            </div>

            <div className="pt-4 border-t border-border">
              <Label className="text-muted-foreground mb-4 block">Attribution (At least one required)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Person</Label>
                  <Select value={formData.personId} onValueChange={v => setFormData({...formData, personId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select person" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {people?.map((p: LinkedinPerson) => <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Company</Label>
                  <Select value={formData.companyId} onValueChange={v => setFormData({...formData, companyId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select company" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {companies?.map((c: LinkedinCompany) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Action</Label>
                  <Select value={formData.actionId} onValueChange={v => setFormData({...formData, actionId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select action" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {actions?.map((a: LinkedinAction) => <SelectItem key={a.id} value={String(a.id)}>Action #{a.id} ({a.actionType})</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Campaign</Label>
                  <Select value={formData.campaignId} onValueChange={v => setFormData({...formData, campaignId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select campaign" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {campaigns?.map((c: LinkedinCampaign) => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Content Item</Label>
                  <Select value={formData.contentItemId} onValueChange={v => setFormData({...formData, contentItemId: v})}>
                    <SelectTrigger><SelectValue placeholder="Select content" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {content?.map((c: LinkedinContentItem) => <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!formData.outcomeType || !formData.occurredAt || !(formData.personId && formData.personId !== 'none' || formData.companyId && formData.companyId !== 'none' || formData.actionId && formData.actionId !== 'none' || formData.campaignId && formData.campaignId !== 'none' || formData.contentItemId && formData.contentItemId !== 'none')}>Log Outcome</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}