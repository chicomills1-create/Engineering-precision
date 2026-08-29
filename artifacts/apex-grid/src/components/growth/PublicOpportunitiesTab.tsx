import { useState, useEffect } from 'react';
import { useListPublicOpportunities, useCreatePublicOpportunity, useUpdatePublicOpportunity, usePreparePublicOpportunities, getListPublicOpportunitiesQueryKey, getGetGrowthDashboardQueryKey, PublicOpportunity, PublicOpportunityPipelineStatus, PublicOpportunityUrgency } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Search, Plus, ExternalLink, MapPin, Building, Target, Clock, Edit3, ShieldAlert, CheckCircle2, RotateCw, Send } from 'lucide-react';
import { format } from 'date-fns';
import { OutreachSource } from '@/components/outreach/OutreachComposerDialog';

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(300),
  sourceUrl: z.string().url("Must be a valid URL").max(1000),
  projectLocation: z.string().min(1, "Location is required").max(200),
  buyerOrFirm: z.string().min(1, "Buyer/Firm is required").max(200),
  disciplineFit: z.string().min(1, "Discipline fit details required").max(500),
  urgency: z.enum(['low', 'normal', 'high', 'deadline']).default('normal'),
  evidenceNotes: z.string().min(1, "Evidence notes are required").max(4000),
  owner: z.string().max(160).optional(),
  pipelineStatus: z.enum(['research', 'qualified', 'proposal', 'won', 'lost']).default('research'),
  nextAction: z.string().max(500).optional(),
  nextActionAt: z.string().optional().or(z.literal('')),
});

const researchSchema = z.object({
  state: z.enum(['AZ', 'CA', 'TX']),
  audience: z.enum(['architect', 'builder']),
  query: z.string().max(200).optional(),
});

interface PublicOpportunitiesTabProps {
  onCreateOutreach: (source: OutreachSource) => void;
}

export function PublicOpportunitiesTab({ onCreateOutreach }: PublicOpportunitiesTabProps) {
  const { data: opportunities, isLoading } = useListPublicOpportunities();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState<PublicOpportunity | null>(null);

  const createMutation = useCreatePublicOpportunity();
  const updateMutation = useUpdatePublicOpportunity();
  const prepareMutation = usePreparePublicOpportunities();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      sourceUrl: '',
      projectLocation: '',
      buyerOrFirm: '',
      disciplineFit: '',
      urgency: 'normal',
      evidenceNotes: '',
      owner: '',
      pipelineStatus: 'research',
      nextAction: '',
      nextActionAt: '',
    },
  });

  const researchForm = useForm<z.infer<typeof researchSchema>>({
    resolver: zodResolver(researchSchema),
    defaultValues: {
      state: 'AZ',
      audience: 'architect',
      query: '',
    },
  });

  useEffect(() => {
    if (editingOpp) {
      form.reset({
        title: editingOpp.title,
        sourceUrl: editingOpp.sourceUrl,
        projectLocation: editingOpp.projectLocation,
        buyerOrFirm: editingOpp.buyerOrFirm,
        disciplineFit: editingOpp.disciplineFit,
        urgency: editingOpp.urgency,
        evidenceNotes: editingOpp.evidenceNotes,
        owner: editingOpp.owner || '',
        pipelineStatus: editingOpp.pipelineStatus,
        nextAction: editingOpp.nextAction || '',
        nextActionAt: editingOpp.nextActionAt ? editingOpp.nextActionAt.split('T')[0] : '',
      });
    } else {
      form.reset({
        title: '',
        sourceUrl: '',
        projectLocation: '',
        buyerOrFirm: '',
        disciplineFit: '',
        urgency: 'normal',
        evidenceNotes: '',
        owner: '',
        pipelineStatus: 'research',
        nextAction: '',
        nextActionAt: '',
      });
    }
  }, [editingOpp, form]);

  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      owner: values.owner || undefined,
      nextAction: values.nextAction || undefined,
      nextActionAt: values.nextActionAt ? new Date(values.nextActionAt).toISOString() : undefined,
    };

    if (editingOpp) {
      updateMutation.mutate(
        { id: editingOpp.id, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListPublicOpportunitiesQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetGrowthDashboardQueryKey() });
            toast({ title: "Opportunity updated successfully" });
            setIsFormOpen(false);
          },
          onError: (err) => toast({ title: "Update failed", description: String(err), variant: "destructive" })
        }
      );
    } else {
      createMutation.mutate(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListPublicOpportunitiesQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetGrowthDashboardQueryKey() });
            toast({ title: "Opportunity created successfully" });
            setIsFormOpen(false);
          },
          onError: (err) => toast({ title: "Creation failed", description: String(err), variant: "destructive" })
        }
      );
    }
  };

  const onSubmitResearch = (values: z.infer<typeof researchSchema>) => {
    const data = {
      ...values,
      query: values.query || undefined,
    };
    
    prepareMutation.mutate(
      { data },
      {
        onSuccess: (results) => {
          queryClient.invalidateQueries({ queryKey: getListPublicOpportunitiesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetGrowthDashboardQueryKey() });
          toast({ title: "Research complete", description: `Found ${results.length} new opportunities for review.` });
          setIsResearchOpen(false);
        },
        onError: (err) => toast({ title: "Research failed", description: String(err), variant: "destructive" })
      }
    );
  };

  const getStatusColor = (status: PublicOpportunityPipelineStatus) => {
    switch (status) {
      case 'research': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'qualified': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'proposal': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'won': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'lost': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  const getUrgencyColor = (urgency: PublicOpportunityUrgency) => {
    switch (urgency) {
      case 'deadline': return 'text-destructive font-bold';
      case 'high': return 'text-amber-500 font-medium';
      default: return 'text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-40 rounded-[2px]" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Public Opportunities
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Review public project RFQs, board minutes, and planning notices.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsResearchOpen(true)}
            variant="outline"
            className="rounded-[2px] border-primary/50 text-primary hover:bg-primary/10"
          >
            <RotateCw className="h-4 w-4 mr-2" />
            Run Public Research
          </Button>
          <Button 
            onClick={() => { setEditingOpp(null); setIsFormOpen(true); }}
            className="rounded-[2px] bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Manual Entry
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {opportunities?.map(opp => (
          <Card key={opp.id} className="rounded-[2px] bg-card hover:border-primary/30 transition-colors relative overflow-hidden group">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              opp.pipelineStatus === 'research' ? 'bg-purple-500/50' : 
              opp.pipelineStatus === 'won' ? 'bg-emerald-500/50' : 'bg-transparent'
            }`} />
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`rounded-[2px] capitalize font-mono text-[10px] ${getStatusColor(opp.pipelineStatus)}`}>
                      {opp.pipelineStatus}
                    </Badge>
                    <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1 ${getUrgencyColor(opp.urgency)}`}>
                      <Clock className="h-3 w-3" />
                      {opp.urgency} Priority
                    </span>
                  </div>
                  
                  <h3 className="font-display font-bold text-xl leading-tight pr-8">
                    {opp.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                    <div className="flex items-center gap-1.5" title="Buyer / Firm">
                      <Building className="h-4 w-4 text-primary/70" />
                      <span className="font-medium text-foreground">{opp.buyerOrFirm}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Location">
                      <MapPin className="h-4 w-4 text-primary/70" />
                      <span>{opp.projectLocation}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Discipline Fit">
                      <Target className="h-4 w-4 text-primary/70" />
                      <span>{opp.disciplineFit}</span>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 p-3 rounded-[2px] border border-border/50 text-sm text-foreground/90 mt-2">
                    <span className="font-medium text-muted-foreground mr-2 text-xs uppercase tracking-wider">Evidence:</span>
                    {opp.evidenceNotes}
                  </div>
                </div>
                
                <div className="w-full lg:w-64 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border pt-4 lg:pt-0 lg:pl-6">
                  <div className="space-y-3">
                    {opp.nextAction ? (
                      <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Next Action</div>
                        <div className="text-sm font-medium">{opp.nextAction}</div>
                        {opp.nextActionAt && (
                          <div className="text-xs text-primary font-mono mt-1">
                            Due {format(new Date(opp.nextActionAt), 'MMM d, yyyy')}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs uppercase tracking-wider text-muted-foreground italic">No next action</div>
                    )}
                    
                    {opp.owner && (
                      <div className="pt-2">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Owner</div>
                        <div className="text-sm">{opp.owner}</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-6">
                    {(opp.pipelineStatus === 'qualified' || opp.pipelineStatus === 'proposal') && (
                      <Button
                        type="button"
                        className="w-full justify-start rounded-[2px] h-8 text-xs"
                        onClick={() => onCreateOutreach({
                          sourceType: 'public_opportunity',
                          sourceId: opp.id,
                          label: opp.title,
                          detail: opp.buyerOrFirm,
                        })}
                        data-testid={`button-create-outreach-public_opportunity-${opp.id}`}
                      >
                        <Send className="h-3 w-3 mr-2" />
                        Create Outreach
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full justify-start rounded-[2px] h-8 text-xs"
                      onClick={() => { setEditingOpp(opp); setIsFormOpen(true); }}
                    >
                      <Edit3 className="h-3 w-3 mr-2" />
                      Update Status
                    </Button>
                    <a 
                      href={opp.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-start whitespace-nowrap rounded-[2px] text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-4 w-full"
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      View Source
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {opportunities?.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border rounded-[2px]">
            <Search className="h-12 w-12 text-muted mb-4" />
            <p className="text-lg font-medium text-foreground">No public opportunities tracked</p>
            <p className="text-sm mt-1 mb-4">Run research to find planning notices and RFQs in your target markets.</p>
            <Button 
              onClick={() => setIsResearchOpen(true)}
              variant="outline"
              className="rounded-[2px]"
            >
              Run Public Research
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isResearchOpen} onOpenChange={setIsResearchOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl flex items-center gap-2 text-purple-400">
              <Search className="h-5 w-5" />
              Public Research
            </DialogTitle>
            <DialogDescription className="text-foreground/80">
              Scan public records, board minutes, and planning notices for upcoming engineering needs.
            </DialogDescription>
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500/90 text-xs p-3 rounded-[2px] mt-4 flex gap-3 items-start">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <p>
                <strong>Review Only:</strong> This tool aggregates publicly available opportunity data. It never hallucinates contacts or implies false relationships. Output must be reviewed manually.
              </p>
            </div>
          </DialogHeader>

          <Form {...researchForm}>
            <form onSubmit={researchForm.handleSubmit(onSubmitResearch)} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={researchForm.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-[2px] bg-background">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-[2px]">
                          <SelectItem value="AZ">Arizona (AZ)</SelectItem>
                          <SelectItem value="CA">California (CA)</SelectItem>
                          <SelectItem value="TX">Texas (TX)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={researchForm.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discipline Fit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-[2px] bg-background">
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-[2px]">
                          <SelectItem value="architect">Architects & Planners</SelectItem>
                          <SelectItem value="builder">Builders & Developers</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={researchForm.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Keywords (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 'seismic retrofit', 'ADA compliance'" {...field} className="rounded-[2px] bg-background" />
                    </FormControl>
                    <FormDescription>Narrow the focus of the public record scan.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-6">
                <Button type="button" variant="ghost" onClick={() => setIsResearchOpen(false)} className="rounded-[2px]">
                  Cancel
                </Button>
                <Button type="submit" disabled={prepareMutation.isPending} className="rounded-[2px] bg-purple-600 hover:bg-purple-700 text-white">
                  {prepareMutation.isPending ? 'Scanning Public Records...' : 'Start Research Run'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-[2px] bg-card border-border max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{editingOpp ? 'Update Opportunity' : 'Add Opportunity'}</DialogTitle>
            <DialogDescription>
              Track an RFQ, planning notice, or public project requirement.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Downtown Library Renovation RFQ" {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="buyerOrFirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buyer or Issuing Firm</FormLabel>
                      <FormControl>
                        <Input placeholder="City of Phoenix" {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="projectLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Phoenix, AZ" {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sourceUrl"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Source URL</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://..." {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pipelineStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pipeline Stage</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-[2px] bg-background">
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-[2px]">
                          <SelectItem value="research">Research Review</SelectItem>
                          <SelectItem value="qualified">Qualified Fit</SelectItem>
                          <SelectItem value="proposal">Proposal Submitted</SelectItem>
                          <SelectItem value="won">Won / Awarded</SelectItem>
                          <SelectItem value="lost">Lost / Passed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-[2px] bg-background">
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-[2px]">
                          <SelectItem value="low">Low Priority</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="deadline">Approaching Deadline</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t border-border pt-4 mt-2 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="disciplineFit"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>Discipline Fit</FormLabel>
                      <FormControl>
                        <Input placeholder="Structural & MEP" {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>Internal Owner</FormLabel>
                      <FormControl>
                        <Input placeholder="Assign to team member" {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="evidenceNotes"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Evidence & Context</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Extracted from board minutes: budget approved for structural assessment..." 
                          className="resize-none h-20 rounded-[2px] bg-background" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="border-t border-border pt-4 mt-2 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nextAction"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>Next Action</FormLabel>
                      <FormControl>
                        <Input placeholder="Draft proposal response" {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nextActionAt"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>Action Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="rounded-[2px] bg-background block w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="rounded-[2px]">
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-[2px] bg-primary text-primary-foreground hover:bg-primary/90">
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Opportunity'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}