import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useListOutreachMessages,
  useUpdateOutreachMessage,
  useApproveOutreachMessage,
  useSendOutreachMessage,
  useGenerateOutreachDraft,
  useSuppressOutreachAddress,
  useListOutreachSuppressions,
  useListProspects,
  useListCampaigns,
  useMarkOutreachProspectReplied,
  getListOutreachMessagesQueryKey,
  getListProspectsQueryKey,
  getGetOutreachDashboardQueryKey,
  getListOutreachSuppressionsQueryKey,
  OutreachMessage,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { MoreHorizontal, Send, ShieldOff, Sparkles, CheckCircle2, MessageSquareReply, AlertTriangle } from 'lucide-react';
import { OutreachComposerDialog } from '@/components/outreach/OutreachComposerDialog';

import { ResponsiveTableContainer, ResponsiveTable, ResponsiveTableHeader, ResponsiveTableBody, ResponsiveTableRow, ResponsiveTableHead, ResponsiveTableCell } from '@/components/outreach/ResponsiveTable';

const editMessageSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Body is required'),
});
type EditMessageFormValues = z.infer<typeof editMessageSchema>;

const suppressSchema = z.object({
  email: z.string().email('Invalid email address'),
  reason: z.string().min(1, 'Reason is required'),
});
type SuppressFormValues = z.infer<typeof suppressSchema>;

export function MessagesTab() {
  const { data: messages, isLoading: messagesLoading, error: messagesError } = useListOutreachMessages();
  const { data: prospects, isLoading: prospectsLoading, error: prospectsError } = useListProspects();
  const { data: campaigns, isLoading: campaignsLoading, error: campaignsError } = useListCampaigns();
  const unresolvedMessages = messages?.filter((message) =>
    message.status === 'sending' || message.status === 'needs_review'
  ) ?? [];
  const { data: suppressions, isLoading: suppressionsLoading, error: suppressionsError } = useListOutreachSuppressions();
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState<OutreachMessage | null>(null);
  const [isSuppressOpen, setIsSuppressOpen] = useState(false);

  const updateMutation = useUpdateOutreachMessage({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        setIsEditOpen(null);
        toast({ title: 'Draft updated' });
      },
      onError: (error: any) => toast({ title: 'Unable to update draft', description: error?.body?.error || error?.message || 'Please try again.', variant: 'destructive' }),
    }
  });

  const approveMutation = useApproveOutreachMessage({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        toast({ title: 'Message approved and queued' });
      },
      onError: (error: any) => toast({ title: 'Approval blocked', description: error?.body?.error || error?.message || 'Please review the blockers.', variant: 'destructive' }),
    }
  });

  const sendMutation = useSendOutreachMessage({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        toast({ title: 'Message sent' });
      },
      onError: (err: any) => {
        const msg = err?.body?.error || err.message || 'Failed to send';
        toast({ title: 'Send blocked', description: msg, variant: 'destructive' });
      }
    }
  });

  const markRepliedMutation = useMarkOutreachProspectReplied({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        toast({ title: 'Prospect marked as replied. Sequence stopped.' });
      },
      onError: (error: any) => toast({ title: 'Unable to stop sequence', description: error?.body?.error || error?.message || 'Please try again.', variant: 'destructive' }),
    }
  });

  const suppressMutation = useSuppressOutreachAddress({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListOutreachSuppressionsQueryKey() });
        setIsSuppressOpen(false);
        toast({ title: 'Address suppressed' });
      },
      onError: (error: any) => toast({ title: 'Unable to suppress address', description: error?.body?.error || error?.message || 'Please try again.', variant: 'destructive' }),
    }
  });

  const editForm = useForm<EditMessageFormValues>({ resolver: zodResolver(editMessageSchema) });
  const suppressForm = useForm<SuppressFormValues>({ resolver: zodResolver(suppressSchema) });
  function onEdit(data: EditMessageFormValues) {
    if (!isEditOpen) return;
    const editableSourceType = isEditOpen.sourceType === 'lead'
      || isEditOpen.sourceType === 'referral_partner'
      || isEditOpen.sourceType === 'public_opportunity'
      ? isEditOpen.sourceType
      : undefined;
    updateMutation.mutate({
      id: isEditOpen.id,
      data: {
        prospectId: isEditOpen.prospectId,
        campaignId: isEditOpen.campaignId || undefined,
        sequenceNumber: isEditOpen.sequenceNumber,
        subject: data.subject,
        body: data.body,
        scheduledAt: isEditOpen.scheduledAt || undefined,
        sourceType: editableSourceType,
        sourceId: editableSourceType ? isEditOpen.sourceId || undefined : undefined,
      }
    });
  }

  function onSuppress(data: SuppressFormValues) {
    suppressMutation.mutate({ data });
  }

  function openEdit(msg: OutreachMessage) {
    editForm.reset({ subject: msg.subject, body: msg.body });
    setIsEditOpen(msg);
  }

  const getProspectName = (prospectId: number) => {
    return prospects?.find(p => p.id === prospectId)?.companyName || `Prospect #${prospectId}`;
  };

  const getProspectEmail = (prospectId: number) => {
    return prospects?.find(p => p.id === prospectId)?.contactEmail || '';
  };

  const getSendBlockers = (msg: OutreachMessage) => {
    if (msg.status !== 'draft' && msg.status !== 'approved') return [];
    
    const prospect = prospects?.find(p => p.id === msg.prospectId);
    if (!prospect) return ['Prospect not found'];

    const blockers = [];
    if (!['approved', 'contacted'].includes(prospect.status)) blockers.push('Prospect not approved');
    if (prospect.fitScore < 60 || prospect.needScore < 60) blockers.push('Fit/need score below 60');
    if (!prospect.needSignals?.trim()) blockers.push('Missing current need evidence');
    if (!prospect.contactName || prospect.contactName.trim() === '' || !prospect.contactTitle || prospect.contactTitle.trim() === '') blockers.push('Missing named contact/title');
    if (prospect.contactConfidence !== 'high') blockers.push('Contact confidence not high');
    if (!prospect.contactSourceUrl?.trim()) blockers.push('Missing public contact source');
    if (!prospect.contactEmail || prospect.emailStatus !== 'verified') blockers.push('Missing/unverified email');
    const normalizedEmail = prospect.contactEmail?.trim().toLowerCase();
    if (normalizedEmail && suppressions?.some((suppression) => suppression.email.trim().toLowerCase() === normalizedEmail)) {
      blockers.push('Email address is suppressed');
    }
    const normalizedCompany = prospect.companyName.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const normalizedContact = prospect.contactName?.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (normalizedCompany.includes('atmosphere architects') && ['tim boyle', 'mike hudson'].includes(normalizedContact || '')) {
      blockers.push('Existing client contact is excluded');
    }
    
    if (msg.campaignId) {
      const campaign = campaigns?.find(c => c.id === msg.campaignId);
      if (!campaign) blockers.push('Campaign not found');
      else {
        if (campaign.status !== 'active') blockers.push('Campaign is inactive');
        if (campaign.audience !== prospect.audience || !campaign.states.includes(prospect.state)) blockers.push('Campaign targeting does not match prospect');
      }
    }
    
    if (msg.status === 'draft') blockers.push('Message draft not approved');
    
    return blockers;
  };

  if (messagesLoading || prospectsLoading || campaignsLoading || suppressionsLoading) {
    return <div className="text-muted-foreground p-8" data-testid="messages-loading">Loading messages...</div>;
  }

  const hasAccessError = [messagesError, prospectsError, campaignsError, suppressionsError]
    .some((error) => (error as { status?: number } | null)?.status === 403);

  if (hasAccessError) {
    return (
      <div className="border border-destructive/50 bg-destructive/10 p-8 rounded-[2px]" data-testid="error-access-denied">
        <div className="flex items-start gap-3">
          <ShieldOff className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
          <div>
            <h2 className="font-display font-semibold text-lg mb-1">Access denied</h2>
            <p className="text-sm text-muted-foreground">
              Your account isn't authorized to view outreach queue. This page is
              limited to approved team members. If you believe this is a
              mistake, contact the site administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (messagesError || prospectsError || campaignsError || suppressionsError) {
    return <div className="p-8 text-sm text-destructive" data-testid="messages-error">The outreach queue could not be loaded. Please refresh and try again.</div>;
  }

  return (
    <div className="space-y-6" data-testid="tab-content-messages">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-display font-semibold">Outreach Queue</h2>
          <p className="text-sm text-muted-foreground">Review drafts, approve sequences, and manage sends.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Dialog open={isSuppressOpen} onOpenChange={(open) => {
            if (!open) suppressForm.reset();
            setIsSuppressOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-open-suppress">
                <ShieldOff className="w-4 h-4 mr-2" />
                Suppress
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Suppress Email Address</DialogTitle>
                <div className="text-sm text-muted-foreground mt-1">Prevent sending to a specific email address permanently.</div>
              </DialogHeader>
              <Form {...suppressForm}>
                <form onSubmit={suppressForm.handleSubmit(onSuppress)} className="space-y-4" data-testid="form-suppress">
                  <FormField control={suppressForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input {...field} data-testid="input-suppress-email" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={suppressForm.control} name="reason" render={({ field }) => (
                    <FormItem><FormLabel>Reason</FormLabel><FormControl><Input placeholder="e.g. Requested opt-out, competitor" {...field} data-testid="input-suppress-reason" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <DialogFooter className="mt-6">
                    <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
                    <Button type="submit" variant="destructive" disabled={suppressMutation.isPending} data-testid="button-submit-suppress">
                      {suppressMutation.isPending ? 'Working...' : 'Suppress Address'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <OutreachComposerDialog
            open={isGenerateOpen}
            onOpenChange={(open) => setIsGenerateOpen(open)}
            trigger={(
              <Button data-testid="button-open-generate">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Sequence
              </Button>
            )}
          />
        </div>
      </div>

      {suppressions && suppressions.length > 0 && (
        <div className="bg-muted/30 border border-border p-3 rounded-[2px]">
          <div className="flex items-center gap-2 mb-2 text-sm font-medium">
            <ShieldOff className="w-4 h-4 text-muted-foreground" /> Recent Suppressions
          </div>
          <div className="flex flex-wrap gap-2">
            {suppressions.slice(0, 5).map(s => (
              <Badge key={s.id} variant="secondary" className="text-xs truncate max-w-[200px]" title={s.reason}>
                {s.email}
              </Badge>
            ))}
            {suppressions.length > 5 && <Badge variant="secondary" className="text-xs">+{suppressions.length - 5} more</Badge>}
          </div>
        </div>
      )}

      {unresolvedMessages.length > 0 && (
        <div
          className="border border-amber-500/30 bg-amber-500/10 px-4 py-3 rounded-[2px] text-sm text-amber-200"
          data-testid="outreach-unresolved-send-review"
        >
          <span className="font-medium">
            {unresolvedMessages.length} send {unresolvedMessages.length === 1 ? 'needs' : 'need'} provider review.
          </span>{' '}
          Do not resend these messages until their SendGrid activity has been checked.
        </div>
      )}

      <Dialog open={!!isEditOpen} onOpenChange={(open) => !open && setIsEditOpen(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEdit)} className="space-y-4" data-testid="form-edit-message">
              <FormField control={editForm.control} name="subject" render={({ field }) => (
                <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} data-testid="input-edit-subject" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={editForm.control} name="body" render={({ field }) => (
                <FormItem><FormLabel>Body</FormLabel><FormControl><Textarea className="min-h-[200px]" {...field} data-testid="input-edit-body" /></FormControl><FormMessage /></FormItem>
              )} />
              <DialogFooter className="mt-6">
                <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
                <Button type="submit" disabled={updateMutation.isPending} data-testid="button-submit-edit-message">
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="border border-border rounded-[2px] overflow-hidden bg-card">
        {(!messages || messages.length === 0) ? (
          <div className="p-8 text-center text-muted-foreground" data-testid="empty-messages">
            No messages generated yet.
          </div>
        ) : (
          <ResponsiveTableContainer>
            <ResponsiveTable>
              <ResponsiveTableHeader>
                <ResponsiveTableRow className="bg-muted/20 hover:bg-muted/20">
                  <ResponsiveTableHead className="w-16">Seq</ResponsiveTableHead>
                  <ResponsiveTableHead className="w-48">Prospect</ResponsiveTableHead>
                  <ResponsiveTableHead>Subject</ResponsiveTableHead>
                  <ResponsiveTableHead className="w-32 text-center">Status</ResponsiveTableHead>
                  <ResponsiveTableHead className="w-64">Send Readiness</ResponsiveTableHead>
                  <ResponsiveTableHead className="w-24 text-right">Actions</ResponsiveTableHead>
                </ResponsiveTableRow>
              </ResponsiveTableHeader>
              <ResponsiveTableBody>
                {messages.map(m => {
                  const blockers = getSendBlockers(m);
                  return (
                    <ResponsiveTableRow key={m.id} className="hover:bg-white/[0.02]" data-testid={`row-message-${m.id}`}>
                      <ResponsiveTableCell mobileLabel="Sequence" className="text-center text-muted-foreground font-mono align-top max-md:text-left">#{m.sequenceNumber}</ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Prospect" className="align-top">
                        <div className="font-medium truncate max-w-[180px] max-md:max-w-none" title={getProspectName(m.prospectId)}>{getProspectName(m.prospectId)}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[180px] max-md:max-w-none" title={getProspectEmail(m.prospectId)}>{getProspectEmail(m.prospectId)}</div>
                      </ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Subject" className="align-top">
                        <div className="font-medium truncate max-w-[300px] max-md:max-w-none" title={m.subject}>{m.subject}</div>
                        {m.sourceType && (
                          <div className="mt-1 text-xs text-primary/80" data-testid={`message-origin-${m.id}`}>
                            Origin: {m.sourceLabel || `${m.sourceType.replace('_', ' ')}`}
                          </div>
                        )}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Status" className="text-center align-top max-md:text-left">
                        <Badge variant={m.status === 'sent' || m.status === 'delivered' ? 'default' : m.status === 'failed' || m.status === 'bounced' || m.status === 'needs_review' ? 'destructive' : m.status === 'replied' ? 'default' : 'secondary'} data-testid={`status-message-${m.id}`}>
                          {m.status}
                        </Badge>
                      </ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Readiness" className="text-xs align-top">
                        {m.error && <div className="text-destructive font-medium mb-1 line-clamp-2" title={m.error}>Error: {m.error}</div>}
                        {(m.status === 'sending' || m.status === 'needs_review') && (
                          <div className="text-amber-500 font-medium mb-1">
                            Provider outcome unresolved — do not resend.
                          </div>
                        )}
                        {m.sentAt && <div className="text-muted-foreground mb-1">Sent: {new Date(m.sentAt).toLocaleDateString()}</div>}
                        
                        {(m.status === 'draft' || m.status === 'approved') && blockers.length > 0 && (
                          <div className="flex flex-col gap-1 text-amber-500/90 bg-amber-500/10 border border-amber-500/20 rounded p-1.5">
                            <div className="flex items-center gap-1 font-medium"><AlertTriangle className="w-3 h-3" /> Blockers</div>
                            {blockers.map((b, i) => <div key={i} className="leading-tight">&bull; {b}</div>)}
                          </div>
                        )}
                        {(m.status === 'draft' || m.status === 'approved') && blockers.length === 0 && (
                          <div className="text-emerald-500 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Ready to send
                          </div>
                        )}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell mobileLabel="Actions" className="text-right align-top max-md:text-left max-md:flex max-md:gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 max-md:w-full max-md:justify-between md:border-transparent md:bg-transparent md:w-8 md:p-0" data-testid={`menu-message-${m.id}`}>
                              <span className="md:hidden">Actions</span>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="max-md:w-[90vw]">
                            {m.status === 'draft' && (
                              <DropdownMenuItem onClick={() => openEdit(m)} data-testid={`action-edit-message-${m.id}`}>
                                Review & Edit
                              </DropdownMenuItem>
                            )}
                            {m.status === 'draft' && (
                              <DropdownMenuItem onClick={() => approveMutation.mutate({ id: m.id })} data-testid={`action-approve-message-${m.id}`}>
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Approve & Queue
                              </DropdownMenuItem>
                            )}
                            {m.status === 'approved' && (
                              <DropdownMenuItem onClick={() => sendMutation.mutate({ id: m.id })} disabled={blockers.length > 0 && blockers[0] !== 'Message draft not approved'} data-testid={`action-send-message-${m.id}`}>
                                <Send className="w-4 h-4 mr-2" /> Send Now
                              </DropdownMenuItem>
                            )}
                            {['sent', 'delivered', 'approved', 'draft'].includes(m.status) && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => markRepliedMutation.mutate({ id: m.prospectId })} data-testid={`action-mark-replied-${m.id}`}>
                                  <MessageSquareReply className="w-4 h-4 mr-2" /> Mark as Replied
                                </DropdownMenuItem>
                              </>
                            )}
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
