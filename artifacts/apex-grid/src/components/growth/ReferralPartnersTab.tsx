import { useState, useEffect } from 'react';
import { useListReferralPartners, useCreateReferralPartner, useUpdateReferralPartner, getListReferralPartnersQueryKey, getGetGrowthDashboardQueryKey, ReferralPartner, ReferralPartnerRelationshipStatus } from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Network, Plus, Search, Building2, Phone, Mail, Globe, Clock, ChevronRight, Edit3, UserPlus, Send } from 'lucide-react';
import { format } from 'date-fns';
import { OutreachSource } from '@/components/outreach/OutreachComposerDialog';

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(200),
  contactName: z.string().max(160).optional(),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal('')),
  contactPhone: z.string().max(40).optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal('')),
  source: z.string().min(1, "Source is required").max(200),
  relationshipStatus: z.enum(['prospect', 'active', 'paused', 'former']).default('prospect'),
  notes: z.string().max(4000).optional(),
  nextFollowUpAt: z.string().optional().or(z.literal('')),
});

interface ReferralPartnersTabProps {
  onCreateOutreach: (source: OutreachSource) => void;
}

export function ReferralPartnersTab({ onCreateOutreach }: ReferralPartnersTabProps) {
  const { data: partners, isLoading } = useListReferralPartners();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<ReferralPartner | null>(null);

  const createMutation = useCreateReferralPartner();
  const updateMutation = useUpdateReferralPartner();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      website: '',
      source: 'Direct',
      relationshipStatus: 'prospect',
      notes: '',
      nextFollowUpAt: '',
    },
  });

  useEffect(() => {
    if (editingPartner) {
      form.reset({
        companyName: editingPartner.companyName,
        contactName: editingPartner.contactName || '',
        contactEmail: editingPartner.contactEmail || '',
        contactPhone: editingPartner.contactPhone || '',
        website: editingPartner.website || '',
        source: editingPartner.source,
        relationshipStatus: editingPartner.relationshipStatus,
        notes: editingPartner.notes || '',
        nextFollowUpAt: editingPartner.nextFollowUpAt ? editingPartner.nextFollowUpAt.split('T')[0] : '',
      });
    } else {
      form.reset({
        companyName: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        source: 'Direct',
        relationshipStatus: 'prospect',
        notes: '',
        nextFollowUpAt: '',
      });
    }
  }, [editingPartner, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Coerce empty strings to undefined for API
    const data = {
      ...values,
      contactName: values.contactName || undefined,
      contactEmail: values.contactEmail || undefined,
      contactPhone: values.contactPhone || undefined,
      website: values.website || undefined,
      notes: values.notes || undefined,
      nextFollowUpAt: values.nextFollowUpAt ? new Date(values.nextFollowUpAt).toISOString() : undefined,
    };

    if (editingPartner) {
      updateMutation.mutate(
        { id: editingPartner.id, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListReferralPartnersQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetGrowthDashboardQueryKey() });
            toast({ title: "Partner updated successfully" });
            setIsDialogOpen(false);
          },
          onError: (err) => {
            toast({ title: "Failed to update partner", description: String(err), variant: "destructive" });
          }
        }
      );
    } else {
      createMutation.mutate(
        { data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListReferralPartnersQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetGrowthDashboardQueryKey() });
            toast({ title: "Partner created successfully" });
            setIsDialogOpen(false);
          },
          onError: (err) => {
            toast({ title: "Failed to create partner", description: String(err), variant: "destructive" });
          }
        }
      );
    }
  };

  const getStatusColor = (status: ReferralPartnerRelationshipStatus) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'prospect': return 'bg-primary/10 text-primary border-primary/20';
      case 'paused': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'former': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-secondary text-secondary-foreground border-border';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-[2px]" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            Referral Network
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Manage architectural and contractor referral relationships.</p>
        </div>
        <Button 
          onClick={() => { setEditingPartner(null); setIsDialogOpen(true); }}
          className="rounded-[2px] bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Partner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners?.map(partner => (
          <Card key={partner.id} className="rounded-[2px] bg-card hover:border-primary/50 transition-colors group flex flex-col">
            <CardContent className="p-5 flex-1 flex flex-col relative">
              <button 
                className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border rounded-[2px] hover:text-primary hover:border-primary/50"
                onClick={() => { setEditingPartner(partner); setIsDialogOpen(true); }}
                title="Edit Partner"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>
              
              <div className="flex items-start justify-between mb-3">
                <Badge variant="outline" className={`rounded-[2px] capitalize font-mono text-[10px] ${getStatusColor(partner.relationshipStatus)}`}>
                  {partner.relationshipStatus}
                </Badge>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span title="Referrals Given">{partner.referralCount} R</span>
                  <span>&bull;</span>
                  <span title="Converted to Jobs">{partner.convertedCount} C</span>
                </div>
              </div>
              
              <h3 className="font-display font-bold text-lg leading-tight mb-1 truncate pr-8" title={partner.companyName}>
                {partner.companyName}
              </h3>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Building2 className="h-3 w-3" />
                <span>{partner.source}</span>
              </div>
              
              <div className="space-y-2 text-sm mt-auto border-t border-border pt-4">
                {partner.contactName && (
                  <div className="flex items-center gap-2 text-foreground/80">
                    <span className="w-4 flex justify-center text-muted-foreground"><UserPlus className="h-3.5 w-3.5" /></span>
                    <span className="truncate">{partner.contactName}</span>
                  </div>
                )}
                {partner.contactEmail && (
                  <div className="flex items-center gap-2 text-foreground/80">
                    <span className="w-4 flex justify-center text-muted-foreground"><Mail className="h-3.5 w-3.5" /></span>
                    <span className="truncate">{partner.contactEmail}</span>
                  </div>
                )}
                {partner.contactPhone && (
                  <div className="flex items-center gap-2 text-foreground/80">
                    <span className="w-4 flex justify-center text-muted-foreground"><Phone className="h-3.5 w-3.5" /></span>
                    <span>{partner.contactPhone}</span>
                  </div>
                )}
              </div>

              {partner.nextFollowUpAt && (
                <div className="mt-4 bg-primary/5 border border-primary/20 rounded-[2px] p-2 flex items-center gap-2 text-xs">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span className="text-primary font-medium">Follow up: {format(new Date(partner.nextFollowUpAt), 'MMM d, yyyy')}</span>
                </div>
              )}
              {partner.relationshipStatus === 'active' && (
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4 w-full rounded-[2px]"
                  onClick={() => onCreateOutreach({
                    sourceType: 'referral_partner',
                    sourceId: partner.id,
                    label: partner.companyName,
                    detail: partner.contactName,
                  })}
                  data-testid={`button-create-outreach-referral_partner-${partner.id}`}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Create Outreach
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        {partners?.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-border rounded-[2px]">
            <Network className="h-12 w-12 text-muted mb-4" />
            <p className="text-lg font-medium text-foreground">No referral partners found</p>
            <p className="text-sm mt-1 mb-4">Build out your network of architects and builders.</p>
            <Button 
              onClick={() => { setEditingPartner(null); setIsDialogOpen(true); }}
              variant="outline"
              className="rounded-[2px]"
            >
              Add your first partner
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-[2px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{editingPartner ? 'Edit Referral Partner' : 'Add Referral Partner'}</DialogTitle>
            <DialogDescription>
              Track relationship status and follow-ups for network growth.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Architects" {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relationshipStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-[2px] bg-background">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-[2px]">
                          <SelectItem value="prospect">Prospect</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="former">Former</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source / Connection</FormLabel>
                      <FormControl>
                        <Input placeholder="Chamber of Commerce" {...field} className="rounded-[2px] bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t border-border pt-4 mt-2">
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Primary Contact</h4>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} className="rounded-[2px] bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jane@example.com" {...field} className="rounded-[2px] bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} className="rounded-[2px] bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://..." {...field} className="rounded-[2px] bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="border-t border-border pt-4 mt-2 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nextFollowUpAt"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>Next Follow Up Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="rounded-[2px] bg-background text-foreground block w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Relationship Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Context on projects, preferences, history..." 
                          className="resize-none h-24 rounded-[2px] bg-background" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-[2px]">
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="rounded-[2px] bg-primary text-primary-foreground hover:bg-primary/90">
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Partner'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}