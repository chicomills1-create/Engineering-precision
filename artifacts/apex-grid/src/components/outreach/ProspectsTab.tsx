import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useListProspects,
  useCreateProspect,
  useUpdateProspect,
  useRunOutreachResearch,
  useListOutreachResearchRuns,
  getListProspectsQueryKey,
  getListOutreachResearchRunsQueryKey,
  getGetOutreachDashboardQueryKey,
  Prospect,
  ProspectStatus,
  ProspectEmailStatus,
  ProspectContactConfidence
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal, CheckCircle2, XCircle, Clock, Search, AlertCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

import { ResponsiveTableContainer, ResponsiveTable, ResponsiveTableHeader, ResponsiveTableBody, ResponsiveTableRow, ResponsiveTableHead, ResponsiveTableCell } from '@/components/outreach/ResponsiveTable';

const prospectSchema = z.object({
  companyName: z.string().min(1, 'Company name required'),
  website: z.string().optional(),
  city: z.string().min(1, 'City required'),
  state: z.enum(['AZ', 'CA', 'TX']),
  audience: z.enum(['architect', 'builder']),
  sourceUrl: z.string().optional(),
  researchNotes: z.string().optional(),
  fitScore: z.coerce.number().min(0).max(100).optional(),
  needScore: z.coerce.number().min(0).max(100).optional(),
  needSignals: z.string().optional(),
  contactName: z.string().optional(),
  contactTitle: z.string().optional(),
  contactEmail: z.string().optional(),
  contactConfidence: z.enum(['unknown', 'low', 'medium', 'high']).optional(),
  contactSourceUrl: z.string().optional(),
});

type ProspectFormValues = z.infer<typeof prospectSchema>;

const researchSchema = z.object({
  state: z.enum(['AZ', 'CA', 'TX']),
  audience: z.enum(['architect', 'builder']),
  query: z.string().max(200).optional(),
});

type ResearchFormValues = z.infer<typeof researchSchema>;

function normalizeNullable(prospect: Prospect) {
  return {
    ...prospect,
    website: prospect.website || undefined,
    sourceUrl: prospect.sourceUrl || undefined,
    researchNotes: prospect.researchNotes || undefined,
    contactName: prospect.contactName || undefined,
    contactTitle: prospect.contactTitle || undefined,
    contactEmail: prospect.contactEmail || undefined,
    needSignals: prospect.needSignals || undefined,
    dedupeKey: prospect.dedupeKey || undefined,
    researchRunId: prospect.researchRunId || undefined,
    contactConfidence: prospect.contactConfidence || 'unknown',
    contactSourceUrl: prospect.contactSourceUrl || undefined,
  };
}

export function ProspectsTab() {
  const { data: prospects, isLoading, error: prospectsError } = useListProspects();
  const { data: researchRuns } = useListOutreachResearchRuns();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProspect, setEditingProspect] = useState<Prospect | null>(null);
  const [isResearchOpen, setIsResearchOpen] = useState(false);

  const createMutation = useCreateProspect({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        setIsCreateOpen(false);
        setEditingProspect(null);
        queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        setIsCreateOpen(false);
        toast({ title: 'Prospect added successfully' });
      },
      onError: (error: any) => toast({ title: 'Unable to save prospect', description: error?.body?.error || error?.message || 'Please review the details.', variant: 'destructive' }),
    },
  });

  const updateMutation = useUpdateProspect({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        setIsCreateOpen(false);
        setEditingProspect(null);
        toast({ title: 'Prospect updated' });
      },
      onError: (error: any) => toast({ title: 'Unable to update prospect', description: error?.body?.error || error?.message || 'Please try again.', variant: 'destructive' }),
    },
  });

  const researchMutation = useRunOutreachResearch({
    mutation: {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListOutreachResearchRunsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        setIsResearchOpen(false);
        toast({ 
          title: 'Research complete', 
          description: `Found ${data.prospects.length} high-intent prospects.` 
        });
      },
      onError: (err: any) => {
        const msg = err?.body?.error || err.message || 'Failed to run research';
        toast({ title: 'Research failed', description: msg, variant: 'destructive' });
      }
    }
  });

  const form = useForm<ProspectFormValues>({
    resolver: zodResolver(prospectSchema),
    defaultValues: {
      companyName: '', website: '', city: '', state: 'TX', audience: 'architect',
      sourceUrl: '', researchNotes: '', fitScore: 50, needScore: 50, needSignals: '',
      contactName: '', contactTitle: '', contactEmail: '', contactConfidence: 'unknown', contactSourceUrl: '',
    },
  });

  const researchForm = useForm<ResearchFormValues>({
    resolver: zodResolver(researchSchema),
    defaultValues: { state: 'TX', audience: 'architect', query: '' },
  });

  function onSubmit(data: ProspectFormValues) {
    if (editingProspect) {
      updateMutation.mutate({
        id: editingProspect.id,
        data: {
          ...data,
          emailStatus: editingProspect.emailStatus,
          status: editingProspect.status,
        },
      });
      return;
    }
    createMutation.mutate({ 
      data: { 
        ...data,
        emailStatus: 'unverified',
        status: 'new'
      } 
    });
  }

  function openEditProspect(prospect: Prospect) {
    setEditingProspect(prospect);
    form.reset({
      companyName: prospect.companyName,
      website: prospect.website || '',
      city: prospect.city,
      state: prospect.state,
      audience: prospect.audience,
      sourceUrl: prospect.sourceUrl || '',
      researchNotes: prospect.researchNotes || '',
      fitScore: prospect.fitScore,
      needScore: prospect.needScore,
      needSignals: prospect.needSignals || '',
      contactName: prospect.contactName || '',
      contactTitle: prospect.contactTitle || '',
      contactEmail: prospect.contactEmail || '',
      contactConfidence: prospect.contactConfidence || 'unknown',
      contactSourceUrl: prospect.contactSourceUrl || '',
    });
    setIsCreateOpen(true);
  }

  function onResearchSubmit(data: ResearchFormValues) {
    researchMutation.mutate({
      data: {
        state: data.state,
        audience: data.audience,
        query: data.query || undefined
      }
    });
  }

  function updateStatus(prospect: Prospect, status: ProspectStatus) {
    updateMutation.mutate({
      id: prospect.id,
      data: {
        ...normalizeNullable(prospect),
        status,
      }
    });
  }

  function updateEmailStatus(prospect: Prospect, emailStatus: ProspectEmailStatus) {
    updateMutation.mutate({
      id: prospect.id,
      data: {
        ...normalizeNullable(prospect),
        emailStatus,
      }
    });
  }

  function updateConfidence(prospect: Prospect, contactConfidence: ProspectContactConfidence) {
    updateMutation.mutate({
      id: prospect.id,
      data: {
        ...normalizeNullable(prospect),
        contactConfidence,
      }
    });
  }

  const EmailStatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'verified': return <span title="Verified"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /></span>;
      case 'invalid': return <span title="Invalid"><XCircle className="w-3.5 h-3.5 text-destructive" /></span>;
      default: return <span title="Unverified"><Clock className="w-3.5 h-3.5 text-muted-foreground" /></span>;
    }
  };

  if (isLoading) {
    return <div className="text-muted-foreground p-8" data-testid="prospects-loading">Loading prospects...</div>;
  }

  if ((prospectsError as { status?: number })?.status === 403) {
    return (
      <div className="border border-destructive/50 bg-destructive/10 p-8 rounded-[2px]" data-testid="error-access-denied">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
          <div>
            <h2 className="font-display font-semibold text-lg mb-1">Access denied</h2>
            <p className="text-sm text-muted-foreground">
              Your account isn't authorized to view prospect research. This page is
              limited to approved team members. If you believe this is a
              mistake, contact the site administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (prospectsError) {
    return <div className="p-8 text-sm text-destructive" data-testid="prospects-error">Prospects could not be loaded. Please refresh and try again.</div>;
  }

  return (
    <div className="space-y-8" data-testid="tab-content-prospects">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-display font-semibold">Prospect Research</h2>
          <p className="text-sm text-muted-foreground">Identify and qualify commercial architects and builders with active needs.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isResearchOpen} onOpenChange={(open) => {
            if (!open) researchForm.reset();
            setIsResearchOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 text-white" data-testid="button-run-research">
                <Search className="w-4 h-4 mr-2" />
                Find High-Intent Prospects
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Find High-Intent Prospects</DialogTitle>
                <div className="text-sm text-muted-foreground mt-2 space-y-2">
                  <p>Research scans public search evidence for active projects, bidding, consultant demand, growth, and relevant staffing gaps.</p>
                  <p className="font-medium text-foreground">Only firms with evidence of active need and scores &ge; 60 are imported for review.</p>
                </div>
              </DialogHeader>
              <Form {...researchForm}>
                <form onSubmit={researchForm.handleSubmit(onResearchSubmit)} className="space-y-4" data-testid="form-run-research">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={researchForm.control} name="state" render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger data-testid="select-research-state"><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent><SelectItem value="AZ">AZ</SelectItem><SelectItem value="CA">CA</SelectItem><SelectItem value="TX">TX</SelectItem></SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={researchForm.control} name="audience" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Audience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger data-testid="select-research-audience"><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent><SelectItem value="architect">Architects</SelectItem><SelectItem value="builder">Builders</SelectItem></SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={researchForm.control} name="query" render={({ field }) => (
                    <FormItem><FormLabel>Narrow query (optional)</FormLabel><FormControl><Input placeholder="e.g. Healthcare facilities, tenant improvements..." {...field} data-testid="input-research-query" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <DialogFooter className="mt-6">
                    <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={researchMutation.isPending} data-testid="button-submit-research">
                      {researchMutation.isPending ? 'Researching...' : 'Run Research'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateOpen} onOpenChange={(open) => {
            if (!open) { form.reset(); setEditingProspect(null); }
            setIsCreateOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-create-prospect">
                <Plus className="w-4 h-4 mr-2" />
                Manual Add
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingProspect ? 'Review Prospect Details' : 'Add Prospect'}</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-create-prospect">
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="companyName" render={({ field }) => (
                          <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} data-testid="input-prospect-company" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="website" render={({ field }) => (
                          <FormItem><FormLabel>Website</FormLabel><FormControl><Input {...field} data-testid="input-prospect-website" /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="contactSourceUrl" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Public Contact Source</FormLabel>
                          <FormControl><Input placeholder="https://company.com/team" {...field} data-testid="input-prospect-contact-source" /></FormControl>
                          <p className="text-xs text-muted-foreground">Public page confirming the contact's name and role. Required before sending.</p>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} data-testid="input-prospect-city" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="state" render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger data-testid="select-prospect-state"><SelectValue /></SelectTrigger></FormControl>
                              <SelectContent><SelectItem value="AZ">AZ</SelectItem><SelectItem value="CA">CA</SelectItem><SelectItem value="TX">TX</SelectItem></SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="audience" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Audience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger data-testid="select-prospect-audience"><SelectValue /></SelectTrigger></FormControl>
                              <SelectContent><SelectItem value="architect">Architect</SelectItem><SelectItem value="builder">Builder</SelectItem></SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="contactName" render={({ field }) => (
                          <FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input {...field} data-testid="input-prospect-contact" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="contactTitle" render={({ field }) => (
                          <FormItem><FormLabel>Contact Title</FormLabel><FormControl><Input {...field} data-testid="input-prospect-title" /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="contactEmail" render={({ field }) => (
                          <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} data-testid="input-prospect-email" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="contactConfidence" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Confidence</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger data-testid="select-prospect-confidence"><SelectValue /></SelectTrigger></FormControl>
                              <SelectContent><SelectItem value="unknown">Unknown</SelectItem><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="fitScore" render={({ field }) => (
                          <FormItem><FormLabel>Fit Score (0-100)</FormLabel><FormControl><Input type="number" {...field} data-testid="input-prospect-fit" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="needScore" render={({ field }) => (
                          <FormItem><FormLabel>Need Score (0-100)</FormLabel><FormControl><Input type="number" {...field} data-testid="input-prospect-need" /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="needSignals" render={({ field }) => (
                        <FormItem><FormLabel>Need Signals</FormLabel><FormControl><Input {...field} data-testid="input-prospect-signals" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </ScrollArea>
                  <DialogFooter className="mt-4 pt-4 border-t">
                    <DialogClose asChild>
                      <Button variant="outline" type="button">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-submit-prospect">
                      {(createMutation.isPending || updateMutation.isPending) ? 'Saving...' : editingProspect ? 'Save Review' : 'Add Prospect'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {researchRuns && researchRuns.length > 0 && (
        <div className="bg-muted/30 border border-border p-4 rounded-[2px] flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1 text-sm">
            <p className="font-medium">Recent Research Runs</p>
            <div className="flex flex-wrap gap-4">
              {researchRuns.slice(0, 3).map(run => (
                <div key={run.id} className="flex items-center gap-2 text-muted-foreground">
                  <span>{run.state} {run.audience}</span>
                  <Badge variant="outline" className="text-[10px] uppercase h-5">{run.status}</Badge>
                   {run.status === 'completed' && (
                     <span>({run.resultCount} added · {run.skippedCount} skipped)</span>
                   )}
                   {run.status === 'failed' && run.error && (
                     <span className="text-destructive truncate max-w-[280px]" title={run.error}>{run.error}</span>
                   )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="border border-border rounded-[2px] overflow-hidden bg-card">
        {(!prospects || prospects.length === 0) ? (
          <div className="p-8 text-center text-muted-foreground" data-testid="empty-prospects">
            No prospects found. Try running research to find high-intent firms.
          </div>
        ) : (
          <ResponsiveTableContainer>
            <ResponsiveTable>
              <ResponsiveTableHeader>
                <ResponsiveTableRow className="bg-muted/20 hover:bg-muted/20">
                  <ResponsiveTableHead className="w-[220px]">Company</ResponsiveTableHead>
                  <ResponsiveTableHead className="w-[260px]">Contact Info</ResponsiveTableHead>
                  <ResponsiveTableHead className="w-[220px]">Intent & Fit</ResponsiveTableHead>
                  <ResponsiveTableHead className="w-[120px] text-center">Workflow</ResponsiveTableHead>
                  <ResponsiveTableHead className="w-[80px] text-right">Actions</ResponsiveTableHead>
                </ResponsiveTableRow>
              </ResponsiveTableHeader>
              <ResponsiveTableBody>
                {prospects.map(p => {
                  const hasContact = p.contactName && p.contactName.trim().length > 0;
                   const isReadyForApproval = Boolean(
                     hasContact && p.contactTitle?.trim() && p.contactConfidence === 'high' &&
                     p.contactSourceUrl && p.contactEmail && p.emailStatus === 'verified' &&
                     p.fitScore >= 60 && p.needScore >= 60 && p.needSignals
                   );
                  
                  return (
                    <ResponsiveTableRow key={p.id} className="hover:bg-white/[0.02]" data-testid={`row-prospect-${p.id}`}>
                      <ResponsiveTableCell mobileLabel="Company" className="align-top">
                        <div className="font-medium text-foreground">{p.companyName}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 capitalize">{p.audience} &bull; {p.city}, {p.state}</div>
                      </ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Contact Info" className="align-top">
                        {hasContact ? (
                          <>
                            <div className="font-medium">{p.contactName} {p.contactTitle && <span className="text-muted-foreground font-normal text-xs ml-1">({p.contactTitle})</span>}</div>
                            <div className="text-xs flex items-center gap-1.5 mt-0.5">
                              <EmailStatusIcon status={p.emailStatus} />
                              <span className="text-muted-foreground truncate max-w-[200px] max-md:max-w-none">{p.contactEmail || 'No email'}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                              Confidence: <span className={p.contactConfidence === 'high' ? 'text-emerald-500' : 'text-amber-500'}>{p.contactConfidence}</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-amber-500 bg-amber-500/10 px-2 py-1 rounded text-xs inline-flex font-medium items-center gap-1.5 border border-amber-500/20">
                            <AlertCircle className="w-3 h-3" /> Contact research needed
                          </div>
                        )}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Intent & Fit" className="align-top">
                        <div className="flex gap-2 mb-1">
                          <Badge variant="outline" className={p.needScore >= 60 ? 'border-primary/50 text-primary' : ''} title="Need Score">
                            N: {p.needScore}
                          </Badge>
                          <Badge variant="outline" className={p.fitScore >= 60 ? 'border-primary/50 text-primary' : ''} title="Fit Score">
                            F: {p.fitScore}
                          </Badge>
                        </div>
                        {p.needSignals && (
                          <div className="text-xs text-muted-foreground truncate max-w-[200px] max-md:max-w-none max-md:whitespace-normal" title={p.needSignals}>
                            {p.needSignals}
                          </div>
                        )}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Workflow" className="text-center align-top max-md:text-left">
                        <Badge variant={p.status === 'new' ? 'secondary' : p.status === 'suppressed' ? 'destructive' : 'default'} data-testid={`status-prospect-${p.id}`}>
                          {p.status.replace(/_/g, ' ')}
                        </Badge>
                      </ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Actions" className="text-right align-top max-md:text-left max-md:flex max-md:gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 max-md:w-full max-md:justify-between md:border-transparent md:bg-transparent md:w-8 md:p-0" data-testid={`menu-prospect-${p.id}`}>
                              <span className="md:hidden">Actions</span>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="max-md:w-[90vw]">
                             <DropdownMenuItem onClick={() => openEditProspect(p)} data-testid={`action-prospect-edit-${p.id}`}>Review & Edit Details</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(p, 'review')} data-testid={`action-prospect-review-${p.id}`}>Mark for Review</DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateStatus(p, 'approved')} 
                              disabled={!isReadyForApproval}
                              title={!isReadyForApproval ? "Requires verified contact name/title and high confidence" : undefined}
                              data-testid={`action-prospect-approve-${p.id}`}
                            >
                              Approve Prospect
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(p, 'suppressed')} className="text-destructive" data-testid={`action-prospect-suppress-${p.id}`}>Suppress</DropdownMenuItem>
                            
                            <div className="h-px bg-border my-1" />
                            <div className="px-2 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Contact Confidence</div>
                            <DropdownMenuItem onClick={() => updateConfidence(p, 'high')} data-testid={`action-prospect-conf-high-${p.id}`}>Set High</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateConfidence(p, 'medium')} data-testid={`action-prospect-conf-medium-${p.id}`}>Set Medium</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateConfidence(p, 'low')} data-testid={`action-prospect-conf-low-${p.id}`}>Set Low</DropdownMenuItem>
                            
                            <div className="h-px bg-border my-1" />
                            <div className="px-2 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Email Status</div>
                            <DropdownMenuItem onClick={() => updateEmailStatus(p, 'verified')} data-testid={`action-prospect-email-verified-${p.id}`}>Set Verified</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateEmailStatus(p, 'invalid')} data-testid={`action-prospect-email-invalid-${p.id}`}>Set Invalid</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </ResponsiveTableCell>
                    </ResponsiveTableRow>
                  );
                })}
              </ResponsiveTableBody>
            </ResponsiveTable>
          </ResponsiveTableContainer>
        )}
      </div>
    </div>
  );
}
