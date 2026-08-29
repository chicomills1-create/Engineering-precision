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
  const { data: messages, isLoading: messagesLoading } = useListOutreachMessages();
  const { data: prospects, isLoading: prospectsLoading } = useListProspects();
  const { data: campaigns } = useListCampaigns();
  const unresolvedMessages = messages?.filter((message) =>
    message.status === 'sending' || message.status === 'needs_review'
  ) ?? [];
  const { data: suppressions } = useListOutreachSuppressions();
  
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
      },
    }
  });

  const approveMutation = useApproveOutreachMessage({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
      },
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
      }
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
    }
  });

  const editForm = useForm<EditMessageFormValues>({ resolver: zodResolver(editMessageSchema) });
  const suppressForm = useForm<SuppressFormValues>({ resolver: zodResolver(suppressSchema) });
  function onEdit(data: EditMessageFormValues) {
    if (!isEditOpen) return;
    updateMutation.mutate({
      id: isEditOpen.id,
      data: {
        prospectId: isEditOpen.prospectId,
        campaignId: isEditOpen.campaignId || undefined,
        sequenceNumber: isEditOpen.sequenceNumber,
        subject: data.subject,
        body: data.body,
        scheduledAt: isEditOpen.scheduledAt || undefined,
        sourceType: isEditOpen.sourceType || undefined,
        sourceId: isEditOpen.sourceId || undefined,
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
    if (!prospect.contactName || prospect.contactName.trim() === '' || !prospect.contactTitle || prospect.contactTitle.trim() === '') blockers.push('Missing named contact/title');
    if (prospect.contactConfidence !== 'high') blockers.push('Contact confidence not high');
    if (!prospect.contactEmail || prospect.emailStatus !== 'verified') blockers.push('Missing/unverified email');
    
    if (msg.campaignId) {
      const campaign = campaigns?.find(c => c.id === msg.campaignId);
      if (!campaign) blockers.push('Campaign not found');
      else if (campaign.status !== 'active') blockers.push('Campaign is inactive');
    }
    
    if (msg.status === 'draft') blockers.push('Message draft not approved');
    
    return blockers;
  };

  if (messagesLoading || prospectsLoading) {
    return <div className="text-muted-foreground p-8" data-testid="messages-loading">Loading messages...</div>;
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-muted/20 text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium w-16">Seq</th>
                  <th className="text-left px-4 py-3 font-medium w-48">Prospect</th>
                  <th className="text-left px-4 py-3 font-medium">Subject</th>
                  <th className="text-left px-4 py-3 font-medium w-32 text-center">Status</th>
                  <th className="text-left px-4 py-3 font-medium w-64">Send Readiness</th>
                  <th className="text-right px-4 py-3 font-medium w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {messages.map(m => {
                  const blockers = getSendBlockers(m);
                  return (
                    <tr key={m.id} className="hover:bg-white/[0.02]" data-testid={`row-message-${m.id}`}>
                      <td className="px-4 py-3 text-center text-muted-foreground font-mono align-top">#{m.sequenceNumber}</td>
                      <td className="px-4 py-3 align-top">
                        <div className="font-medium truncate max-w-[180px]" title={getProspectName(m.prospectId)}>{getProspectName(m.prospectId)}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[180px]" title={getProspectEmail(m.prospectId)}>{getProspectEmail(m.prospectId)}</div>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="font-medium truncate max-w-[300px]" title={m.subject}>{m.subject}</div>
                        {m.sourceType && (
                          <div className="mt-1 text-xs text-primary/80" data-testid={`message-origin-${m.id}`}>
                            Origin: {m.sourceLabel || `${m.sourceType.replace('_', ' ')}`}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center align-top">
                        <Badge variant={m.status === 'sent' || m.status === 'delivered' ? 'default' : m.status === 'failed' || m.status === 'bounced' || m.status === 'needs_review' ? 'destructive' : m.status === 'replied' ? 'default' : 'secondary'} data-testid={`status-message-${m.id}`}>
                          {m.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs align-top">
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
                      </td>
                      <td className="px-4 py-3 text-right align-top">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" data-testid={`menu-message-${m.id}`}>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEdit(m)} data-testid={`action-edit-message-${m.id}`}>
                              Review & Edit
                            </DropdownMenuItem>
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
