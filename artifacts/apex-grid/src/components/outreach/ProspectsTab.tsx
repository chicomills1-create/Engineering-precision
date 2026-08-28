import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useListProspects,
  useCreateProspect,
  useUpdateProspect,
  getListProspectsQueryKey,
  Prospect,
  ProspectStatus,
  ProspectEmailStatus
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal, Edit, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const prospectSchema = z.object({
  companyName: z.string().min(1, 'Company name required'),
  website: z.string().optional(),
  city: z.string().min(1, 'City required'),
  state: z.enum(['AZ', 'CA', 'TX']),
  audience: z.enum(['architect', 'builder']),
  sourceUrl: z.string().optional(),
  researchNotes: z.string().optional(),
  fitScore: z.coerce.number().min(0).max(100).optional(),
  contactName: z.string().min(1, 'Contact name required'),
  contactTitle: z.string().optional(),
  contactEmail: z.string().email('Invalid email'),
});

type ProspectFormValues = z.infer<typeof prospectSchema>;

export function ProspectsTab() {
  const { data: prospects, isLoading } = useListProspects();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const createMutation = useCreateProspect({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        setIsCreateOpen(false);
      },
    },
  });

  const updateMutation = useUpdateProspect({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
      },
    },
  });

  const form = useForm<ProspectFormValues>({
    resolver: zodResolver(prospectSchema),
    defaultValues: {
      companyName: '',
      website: '',
      city: '',
      state: 'TX',
      audience: 'architect',
      sourceUrl: '',
      researchNotes: '',
      fitScore: 50,
      contactName: '',
      contactTitle: '',
      contactEmail: '',
    },
  });

  function onSubmit(data: ProspectFormValues) {
    createMutation.mutate({ 
      data: { 
        ...data,
        emailStatus: 'unverified',
        status: 'new'
      } 
    });
  }

  function updateStatus(prospect: Prospect, status: ProspectStatus) {
    updateMutation.mutate({
      id: prospect.id,
      data: {
        ...prospect,
        website: prospect.website || undefined,
        sourceUrl: prospect.sourceUrl || undefined,
        researchNotes: prospect.researchNotes || undefined,
        contactTitle: prospect.contactTitle || undefined,
        status,
      }
    });
  }

  function updateEmailStatus(prospect: Prospect, emailStatus: ProspectEmailStatus) {
    updateMutation.mutate({
      id: prospect.id,
      data: {
        ...prospect,
        website: prospect.website || undefined,
        sourceUrl: prospect.sourceUrl || undefined,
        researchNotes: prospect.researchNotes || undefined,
        contactTitle: prospect.contactTitle || undefined,
        emailStatus,
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

  return (
    <div className="space-y-6" data-testid="tab-content-prospects">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-display font-semibold">Prospect Research</h2>
          <p className="text-sm text-muted-foreground">Add and qualify commercial architects and builders.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          if (!open) form.reset();
          setIsCreateOpen(open);
        }}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-prospect">
              <Plus className="w-4 h-4 mr-2" />
              Add Prospect
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Prospect</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-create-prospect">
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4 pb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="companyName" render={({ field }) => (
                        <FormItem><FormLabel>Company Name</FormLabel><FormControl><Input {...field} data-testid="input-prospect-company" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="website" render={({ field }) => (
                        <FormItem><FormLabel>Website</FormLabel><FormControl><Input {...field} data-testid="input-prospect-website" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
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
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="contactName" render={({ field }) => (
                        <FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input {...field} data-testid="input-prospect-contact" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="contactTitle" render={({ field }) => (
                        <FormItem><FormLabel>Contact Title</FormLabel><FormControl><Input {...field} data-testid="input-prospect-title" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="contactEmail" render={({ field }) => (
                      <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} data-testid="input-prospect-email" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="sourceUrl" render={({ field }) => (
                        <FormItem><FormLabel>Source URL</FormLabel><FormControl><Input {...field} data-testid="input-prospect-source" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="fitScore" render={({ field }) => (
                        <FormItem><FormLabel>Fit Score (0-100)</FormLabel><FormControl><Input type="number" {...field} data-testid="input-prospect-score" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="researchNotes" render={({ field }) => (
                      <FormItem><FormLabel>Research Notes</FormLabel><FormControl><Textarea className="resize-none h-24" {...field} data-testid="input-prospect-notes" /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </ScrollArea>
                <DialogFooter className="mt-4 pt-4 border-t">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-prospect">
                    {createMutation.isPending ? 'Saving...' : 'Add Prospect'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-border rounded-[2px] overflow-hidden bg-card">
        {(!prospects || prospects.length === 0) ? (
          <div className="p-8 text-center text-muted-foreground" data-testid="empty-prospects">
            No prospects found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-muted/20 text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium">Company</th>
                  <th className="text-left px-4 py-3 font-medium">Location</th>
                  <th className="text-left px-4 py-3 font-medium">Contact</th>
                  <th className="text-left px-4 py-3 font-medium">Fit</th>
                  <th className="text-left px-4 py-3 font-medium text-center">Workflow</th>
                  <th className="text-left px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {prospects.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02]" data-testid={`row-prospect-${p.id}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{p.companyName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span className="capitalize">{p.audience}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{p.city}</div>
                      <div className="text-xs text-muted-foreground">{p.state}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{p.contactName}</div>
                      <div className="text-xs flex items-center gap-1.5 mt-0.5">
                        <EmailStatusIcon status={p.emailStatus} />
                        <span className="text-muted-foreground truncate max-w-[150px]">{p.contactEmail}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={p.fitScore >= 80 ? 'border-primary/50 text-primary' : ''}>
                        {p.fitScore}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={p.status === 'new' ? 'secondary' : p.status === 'suppressed' ? 'destructive' : 'default'} data-testid={`status-prospect-${p.id}`}>
                        {p.status.replace(/_/g, ' ')}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`menu-prospect-${p.id}`}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateStatus(p, 'review')} data-testid={`action-prospect-review-${p.id}`}>Mark for Review</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(p, 'approved')} data-testid={`action-prospect-approve-${p.id}`}>Approve Prospect</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(p, 'suppressed')} className="text-destructive" data-testid={`action-prospect-suppress-${p.id}`}>Suppress</DropdownMenuItem>
                          
                          <div className="h-px bg-border my-1" />
                          
                          <DropdownMenuItem onClick={() => updateEmailStatus(p, 'verified')} data-testid={`action-prospect-email-verified-${p.id}`}>Set Email Verified</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateEmailStatus(p, 'invalid')} data-testid={`action-prospect-email-invalid-${p.id}`}>Set Email Invalid</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
