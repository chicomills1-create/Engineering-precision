import { useEffect, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getGetOutreachDashboardQueryKey,
  getListOutreachMessagesQueryKey,
  getListProspectsQueryKey,
  useCreateProspect,
  useGenerateOutreachDraft,
  useListCampaigns,
  useListProspects,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Sparkles } from 'lucide-react';

export type OutreachSourceType = 'lead' | 'referral_partner' | 'public_opportunity';

export interface OutreachSource {
  sourceType: OutreachSourceType;
  sourceId: number;
  label: string;
  detail?: string | null;
}

interface OutreachComposerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: OutreachSource;
  trigger?: ReactNode;
}

const generateSchema = z.object({
  prospectId: z.coerce.number().min(1, 'Prospect is required'),
});
type GenerateFormValues = z.infer<typeof generateSchema>;

const prospectSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  city: z.string().min(1, 'City is required'),
  state: z.enum(['AZ', 'CA', 'TX']),
  audience: z.enum(['architect', 'builder']),
  contactName: z.string().min(1, 'Contact name is required'),
  contactTitle: z.string().min(1, 'Contact title is required'),
  contactEmail: z.string().email('Enter a valid email').optional().or(z.literal('')),
  fitScore: z.coerce.number().min(60, 'Fit score must be at least 60').max(100),
  needScore: z.coerce.number().min(60, 'Need score must be at least 60').max(100),
  needSignals: z.string().min(1, 'Current need evidence is required'),
});
type ProspectFormValues = z.infer<typeof prospectSchema>;

const sourceTypeLabels: Record<OutreachSourceType, string> = {
  lead: 'Website inquiry',
  referral_partner: 'Referral partner',
  public_opportunity: 'Public opportunity',
};

export function OutreachComposerDialog({ open, onOpenChange, source, trigger }: OutreachComposerDialogProps) {
  const { data: prospects, isLoading: prospectsLoading } = useListProspects();
  const { data: campaigns } = useListCampaigns();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isCreatingProspect, setIsCreatingProspect] = useState(false);

  const generateForm = useForm<GenerateFormValues>({
    resolver: zodResolver(generateSchema),
    defaultValues: { prospectId: undefined },
  });
  const prospectForm = useForm<ProspectFormValues>({
    resolver: zodResolver(prospectSchema),
    defaultValues: {
      companyName: '',
      city: '',
      state: 'AZ',
      audience: 'architect',
      contactName: '',
      contactTitle: '',
      contactEmail: '',
      fitScore: 60,
      needScore: 60,
      needSignals: '',
    },
  });

  useEffect(() => {
    if (open) {
      generateForm.reset({ prospectId: undefined });
      prospectForm.reset();
      setIsCreatingProspect(false);
    }
  }, [open, generateForm, prospectForm]);

  const generateMutation = useGenerateOutreachDraft({
    mutation: {
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        void queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        onOpenChange(false);
        toast({ title: 'Drafts generated successfully' });
      },
      onError: (error: any) => {
        toast({
          title: 'Unable to generate drafts',
          description: error?.body?.error || error?.message || 'Please try again.',
          variant: 'destructive',
        });
      },
    },
  });

  const createProspectMutation = useCreateProspect({
    mutation: {
      onSuccess: (prospect) => {
        void queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        generateForm.setValue('prospectId', prospect.id, { shouldValidate: true });
        setIsCreatingProspect(false);
        toast({ title: 'Prospect created', description: 'It is selected for this outreach draft.' });
      },
      onError: (error: any) => {
        toast({
          title: 'Unable to create prospect',
          description: error?.body?.error || error?.message || 'Please check the prospect details.',
          variant: 'destructive',
        });
      },
    },
  });

  function onGenerate(data: GenerateFormValues) {
    generateMutation.mutate({
      id: data.prospectId,
      data: source
        ? { sourceType: source.sourceType, sourceId: source.sourceId }
        : {},
    });
  }

  function onCreateProspect(data: ProspectFormValues) {
    createProspectMutation.mutate({
      data: {
        ...data,
        contactEmail: data.contactEmail || null,
        contactName: data.contactName || null,
        contactTitle: data.contactTitle || undefined,
        fitScore: data.fitScore,
        needScore: data.needScore,
        needSignals: data.needSignals,
        researchNotes: `Qualified from ${source ? sourceTypeLabels[source.sourceType] : 'the Growth workspace'}${source ? `: ${source.label}` : ''}`,
        status: 'review',
        emailStatus: 'unverified',
        contactConfidence: 'unknown',
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Create Outreach Draft
          </DialogTitle>
          <DialogDescription>
            Select or create the prospect this sequence is for. It will stay a draft until an employee reviews and approves it.
          </DialogDescription>
        </DialogHeader>

        {source ? (
          <div className="rounded-[2px] border border-primary/30 bg-primary/5 p-3" data-testid="outreach-source-attribution">
            <div className="text-[10px] uppercase tracking-wider text-primary">Attributed origin</div>
            <div className="mt-1 font-medium">{source.label}</div>
            <div className="text-xs text-muted-foreground">
              {sourceTypeLabels[source.sourceType]}{source.detail ? ` · ${source.detail}` : ''}
            </div>
          </div>
        ) : (
          <div className="rounded-[2px] border border-border bg-muted/20 p-3 text-sm text-muted-foreground" data-testid="outreach-source-unlinked">
            This draft has no linked Growth source.
          </div>
        )}

        {!isCreatingProspect ? (
          <Form {...generateForm}>
            <form onSubmit={generateForm.handleSubmit(onGenerate)} className="space-y-4" data-testid="form-generate-sequence">
              <FormField
                control={generateForm.control}
                name="prospectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target prospect</FormLabel>
                    <Select value={field.value?.toString() ?? ''} onValueChange={field.onChange} disabled={prospectsLoading}>
                      <FormControl>
                        <SelectTrigger data-testid="select-generate-prospect">
                          <SelectValue placeholder={prospectsLoading ? 'Loading prospects...' : 'Select a prospect'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {prospects?.filter((prospect) => !['suppressed', 'not_a_fit'].includes(prospect.status)).map((prospect) => (
                          <SelectItem key={prospect.id} value={prospect.id.toString()}>
                            {prospect.companyName}{prospect.contactName ? ` (${prospect.contactName})` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {campaigns && campaigns.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Campaign assignment and send readiness remain subject to the existing review gates.
                </p>
              )}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsCreatingProspect(true)}
                data-testid="button-create-prospect-inline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create a new prospect
              </Button>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={generateMutation.isPending || prospectsLoading} data-testid="button-submit-generate">
                  {generateMutation.isPending ? 'Generating...' : 'Generate AI Drafts'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <Form {...prospectForm}>
            <form onSubmit={prospectForm.handleSubmit(onCreateProspect)} className="space-y-4" data-testid="form-create-prospect-inline">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField control={prospectForm.control} name="companyName" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>Company name</FormLabel><FormControl><Input {...field} placeholder="Acme Architects" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={prospectForm.control} name="city" render={({ field }) => (
                  <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} placeholder="Phoenix" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={prospectForm.control} name="state" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="AZ">Arizona</SelectItem><SelectItem value="CA">California</SelectItem><SelectItem value="TX">Texas</SelectItem></SelectContent></Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={prospectForm.control} name="audience" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="architect">Architect</SelectItem><SelectItem value="builder">Builder</SelectItem></SelectContent></Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={prospectForm.control} name="contactName" render={({ field }) => (
                  <FormItem><FormLabel>Contact name</FormLabel><FormControl><Input {...field} placeholder="Jane Doe" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={prospectForm.control} name="contactTitle" render={({ field }) => (
                  <FormItem><FormLabel>Contact title</FormLabel><FormControl><Input {...field} placeholder="Principal" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={prospectForm.control} name="contactEmail" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>Contact email</FormLabel><FormControl><Input {...field} type="email" placeholder="jane@example.com" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={prospectForm.control} name="fitScore" render={({ field }) => (
                  <FormItem><FormLabel>Fit score</FormLabel><FormControl><Input {...field} type="number" min={60} max={100} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={prospectForm.control} name="needScore" render={({ field }) => (
                  <FormItem><FormLabel>Need score</FormLabel><FormControl><Input {...field} type="number" min={60} max={100} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={prospectForm.control} name="needSignals" render={({ field }) => (
                  <FormItem className="col-span-2"><FormLabel>Current need evidence</FormLabel><FormControl><Input {...field} placeholder="Active project, consultant demand, or capacity gap" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary">Review required</Badge>
                New prospects start in review and do not bypass send gates.
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreatingProspect(false)}>Back to prospects</Button>
                <Button type="submit" disabled={createProspectMutation.isPending} data-testid="button-submit-create-prospect">
                  {createProspectMutation.isPending ? 'Creating...' : 'Create & Select Prospect'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}