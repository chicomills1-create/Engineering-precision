import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { 
  useListLinkedinContent, 
  useCreateLinkedinContent,
  useUpdateLinkedinContent,
  useTransitionLinkedinContent,
  getListLinkedinContentQueryKey,
  getGetLinkedinDashboardQueryKey,
  type LinkedinContentItem
} from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ExternalLink, Plus, Edit2, Play, CheckCircle, XCircle, Share, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LinkedinContentCalendar() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: contentItems, isLoading } = useListLinkedinContent();
  const createContent = useCreateLinkedinContent();
  const updateContent = useUpdateLinkedinContent();
  const transitionContent = useTransitionLinkedinContent();
  
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<LinkedinContentItem | null>(null);
  const [transitionStatus, setTransitionStatus] = useState<{item: LinkedinContentItem, status: string} | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    pillar: '',
    sourceUrl: '',
    evidence: '',
    draftCopy: '',
    owner: '',
    scheduledFor: ''
  });

  const handleAdd = async () => {
    try {
      await createContent.mutateAsync({ 
        data: {
          title: formData.title,
          pillar: formData.pillar,
          sourceUrl: formData.sourceUrl,
          evidence: formData.evidence,
          draftCopy: formData.draftCopy || undefined,
          owner: formData.owner || undefined,
          scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor).toISOString() : undefined
        }
      });
      toast({ title: 'Content draft created' });
      setAddOpen(false);
      setFormData({ title: '', pillar: '', sourceUrl: '', evidence: '', draftCopy: '', owner: '', scheduledFor: '' });
      qc.invalidateQueries({ queryKey: getListLinkedinContentQueryKey() });
    } catch (e: any) {
      toast({ title: 'Failed to create content', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  const handleEditClick = (item: LinkedinContentItem) => {
    setFormData({
      title: item.title,
      pillar: item.pillar,
      sourceUrl: item.sourceUrl || '',
      evidence: item.evidence || '',
      draftCopy: item.approvedCopy || item.draftCopy || '',
      owner: item.owner || '',
      scheduledFor: item.scheduledFor ? item.scheduledFor.substring(0, 16) : ''
    });
    setEditOpen(item);
  };

  const handleUpdate = async () => {
    if (!editOpen) return;
    try {
      await updateContent.mutateAsync({
        id: editOpen.id,
        data: {
          title: formData.title || undefined,
          pillar: formData.pillar || undefined,
          sourceUrl: formData.sourceUrl || undefined,
          evidence: formData.evidence || undefined,
          approvedCopy: formData.draftCopy || undefined,
          owner: formData.owner || undefined,
          scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor).toISOString() : undefined
        }
      });
      toast({ title: 'Content updated' });
      setEditOpen(null);
      qc.invalidateQueries({ queryKey: getListLinkedinContentQueryKey() });
    } catch (e: any) {
      toast({ title: 'Failed to update content', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  const submitTransition = async () => {
    if (!transitionStatus) return;
    try {
      await transitionContent.mutateAsync({
        id: transitionStatus.item.id,
        data: { status: transitionStatus.status }
      });
      toast({ title: `Content moved to ${transitionStatus.status.replace('_', ' ')}` });
      setTransitionStatus(null);
      qc.invalidateQueries({ queryKey: getListLinkedinContentQueryKey() });
      if (transitionStatus.status === 'published') {
        qc.invalidateQueries({ queryKey: getGetLinkedinDashboardQueryKey() });
      }
    } catch (e: any) {
      toast({ title: 'Failed to transition content', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="text-sm text-muted-foreground p-4">Loading content calendar...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Draft and approve public posts.</p>
        <Button size="sm" onClick={() => setAddOpen(true)}><Plus className="w-4 h-4 mr-2"/> New Post</Button>
      </div>

      {contentItems?.length === 0 ? (
        <Card className="border-dashed bg-card/50">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>Your content calendar is empty.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contentItems?.map((item: LinkedinContentItem) => (
            <Card key={item.id} className={item.status === 'published' ? 'border-primary/20 bg-primary/5' : ''}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={item.status === 'published' ? 'default' : item.status === 'approved' ? 'secondary' : 'outline'}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline" className="uppercase tracking-wider text-[10px]">{item.pillar}</Badge>
                      <h4 className="font-medium text-foreground ml-2">{item.title}</h4>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-md border border-border">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {item.approvedCopy || item.draftCopy || 'No copy provided yet.'}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span><strong className="text-foreground">Owner:</strong> {item.owner || 'Unassigned'}</span>
                      <span><strong className="text-foreground">Scheduled:</strong> {item.scheduledFor ? format(new Date(item.scheduledFor), 'MMM d, h:mm a') : 'Unscheduled'}</span>
                      {item.sourceUrl && (
                        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    
                    {item.evidence && (
                      <p className="text-xs text-muted-foreground bg-muted p-2 rounded inline-block">
                        <strong>Evidence:</strong> {item.evidence}
                      </p>
                    )}
                  </div>

                  <div className="md:w-48 flex flex-col gap-2 shrink-0">
                    {(item.status === 'draft' || item.status === 'pending_review') && (
                      <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => handleEditClick(item)}>
                        <Edit2 className="w-4 h-4 mr-2" /> Edit Copy
                      </Button>
                    )}
                    
                    {item.status === 'draft' && (
                      <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => setTransitionStatus({item, status: 'pending_review'})}>
                        <Play className="w-4 h-4 mr-2" /> Request Review
                      </Button>
                    )}
                    
                    {item.status === 'pending_review' && (
                      <Button variant="default" size="sm" className="w-full justify-start" onClick={() => setTransitionStatus({item, status: 'approved'})}>
                        <CheckCircle className="w-4 h-4 mr-2" /> Approve
                      </Button>
                    )}
                    
                    {item.status === 'approved' && (
                      <Button variant="outline" size="sm" className="w-full justify-start text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200" onClick={() => setTransitionStatus({item, status: 'published'})}>
                        <Share className="w-4 h-4 mr-2" /> Log Published
                      </Button>
                    )}

                    {item.status !== 'published' && item.status !== 'stopped' && (
                      <Button variant="ghost" size="sm" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setTransitionStatus({item, status: 'stopped'})}>
                        <XCircle className="w-4 h-4 mr-2" /> Stop Content
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Form Dialog for Add/Edit */}
      <Dialog open={addOpen || editOpen !== null} onOpenChange={(open) => {
        if (!open) { setAddOpen(false); setEditOpen(null); }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editOpen ? 'Edit Content Draft' : 'Create Content Draft'}</DialogTitle>
            <DialogDescription>Plan a new public post based on verified evidence.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title / Topic *</Label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Internal title" />
              </div>
              <div className="space-y-2">
                <Label>Pillar *</Label>
                <Input value={formData.pillar} onChange={e => setFormData({...formData, pillar: e.target.value})} placeholder="e.g. Thought Leadership" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Source URL *</Label>
                <Input value={formData.sourceUrl} onChange={e => setFormData({...formData, sourceUrl: e.target.value})} placeholder="Link to research/article" />
              </div>
              <div className="space-y-2">
                <Label>Evidence *</Label>
                <Input value={formData.evidence} onChange={e => setFormData({...formData, evidence: e.target.value})} placeholder="Key takeaway" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Draft Copy</Label>
              <Textarea 
                className="min-h-[150px]" 
                value={formData.draftCopy} 
                onChange={(e: any) => setFormData({...formData, draftCopy: e.target.value})} 
                placeholder="The post text"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Owner</Label>
                <Input value={formData.owner} onChange={e => setFormData({...formData, owner: e.target.value})} placeholder="Employee Name" />
              </div>
              <div className="space-y-2">
                <Label>Scheduled For</Label>
                <Input type="datetime-local" value={formData.scheduledFor} onChange={e => setFormData({...formData, scheduledFor: e.target.value})} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setAddOpen(false); setEditOpen(null); }}>Cancel</Button>
            <Button onClick={editOpen ? handleUpdate : handleAdd} disabled={!formData.title || !formData.pillar || !formData.sourceUrl || !formData.evidence}>
              {editOpen ? 'Save Changes' : 'Create Draft'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={transitionStatus !== null} onOpenChange={(open) => !open && setTransitionStatus(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Move "{transitionStatus?.item.title}" to <strong>{transitionStatus?.status.replace('_', ' ')}</strong>?
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