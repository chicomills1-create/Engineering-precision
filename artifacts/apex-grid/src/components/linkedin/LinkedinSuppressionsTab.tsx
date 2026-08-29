import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { 
  useListLinkedinSuppressions, 
  useCreateLinkedinSuppression,
  getListLinkedinSuppressionsQueryKey,
  type LinkedinSuppression
} from '@workspace/api-client-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Shield, Plus, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LinkedinSuppressionsTab() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const { data: suppressions, isLoading } = useListLinkedinSuppressions();
  const createSuppression = useCreateLinkedinSuppression();
  
  const [addOpen, setAddOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    targetType: 'profileUrl',
    targetValue: '',
    reason: ''
  });

  const handleAdd = async () => {
    try {
      const data: any = { reason: formData.reason };
      if (formData.targetType === 'personId') data.personId = parseInt(formData.targetValue, 10);
      else if (formData.targetType === 'companyId') data.companyId = parseInt(formData.targetValue, 10);
      else data.profileUrl = formData.targetValue;

      await createSuppression.mutateAsync({ data });
      toast({ title: 'Suppression added' });
      setAddOpen(false);
      setFormData({ targetType: 'profileUrl', targetValue: '', reason: '' });
      qc.invalidateQueries({ queryKey: getListLinkedinSuppressionsQueryKey() });
    } catch (e: any) {
      toast({ title: 'Failed to add suppression', description: e.data?.error || e.message, variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="text-sm text-muted-foreground p-4">Loading suppressions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-3 bg-destructive/10 text-destructive p-4 rounded-md flex-1">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Global Suppressions</p>
            <p>Adding a target here stops any currently queued actions and prevents them from being re-entered into the research library or action queue. Provide a person ID, company ID, or profile URL.</p>
          </div>
        </div>
        <Button onClick={() => setAddOpen(true)} className="shrink-0"><Plus className="w-4 h-4 mr-2"/> Add Suppression</Button>
      </div>

      {suppressions?.length === 0 ? (
        <Card className="border-dashed bg-card/50">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No active suppressions.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {suppressions?.map((suppression: LinkedinSuppression) => (
            <div key={suppression.id} className="p-4 border border-destructive/20 rounded-md bg-destructive/5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-sm font-bold text-destructive">{suppression.normalizedTarget}</h4>
                <span className="text-xs text-muted-foreground">{format(new Date(suppression.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <p className="text-sm text-foreground">{suppression.reason}</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Suppression</DialogTitle>
            <DialogDescription>Block a person, company, or URL from future actions.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Target Type *</Label>
              <Select value={formData.targetType} onValueChange={v => setFormData({...formData, targetType: v, targetValue: ''})}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="profileUrl">Profile URL</SelectItem>
                  <SelectItem value="personId">Person ID</SelectItem>
                  <SelectItem value="companyId">Company ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Value *</Label>
              <Input 
                value={formData.targetValue} 
                onChange={e => setFormData({...formData, targetValue: e.target.value})} 
                placeholder={formData.targetType === 'profileUrl' ? "https://linkedin.com/in/..." : "ID number"} 
              />
              <p className="text-xs text-muted-foreground">
                {formData.targetType === 'profileUrl' ? 'Profile URLs are automatically normalized by the server.' : 'Must match the database ID exactly.'}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Reason *</Label>
              <Input 
                value={formData.reason} 
                onChange={e => setFormData({...formData, reason: e.target.value})} 
                placeholder="Why are they being suppressed?" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleAdd} disabled={!formData.targetValue || !formData.reason}>Block Target</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}