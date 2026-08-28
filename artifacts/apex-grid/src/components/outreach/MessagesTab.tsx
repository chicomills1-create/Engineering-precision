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
  useListProspects,
  getListOutreachMessagesQueryKey,
  getListProspectsQueryKey,
  getGetOutreachDashboardQueryKey,
  OutreachMessage,
  OutreachMessageStatus,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal, Send, ShieldOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const generateSchema = z.object({
  prospectId: z.coerce.number().min(1, 'Prospect is required'),
});
type GenerateFormValues = z.infer<typeof generateSchema>;

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
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState<OutreachMessage | null>(null);
  const [isSuppressOpen, setIsSuppressOpen] = useState(false);

  const generateMutation = useGenerateOutreachDraft({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        setIsGenerateOpen(false);
        toast({ title: 'Drafts generated successfully' });
      },
    }
  });

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

  const suppressMutation = useSuppressOutreachAddress({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOutreachMessagesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListProspectsQueryKey() });
        setIsSuppressOpen(false);
        toast({ title: 'Address suppressed' });
      },
    }
  });

  const generateForm = useForm<GenerateFormValues>({ resolver: zodResolver(generateSchema) });
  const editForm = useForm<EditMessageFormValues>({ resolver: zodResolver(editMessageSchema) });
  const suppressForm = useForm<SuppressFormValues>({ resolver: zodResolver(suppressSchema) });

  function onGenerate(data: GenerateFormValues) {
    generateMutation.mutate({ id: data.prospectId, data: {} });
  }

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
        status: isEditOpen.status as any,
        scheduledAt: isEditOpen.scheduledAt || undefined,
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

  if (messagesLoading || prospectsLoading) {
    return <div className="text-muted-foreground p-8" data-testid="messages-loading">Loading messages...</div>;
  }

  return (
    <div className="space-y-6" data-testid="tab-content-messages">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-display font-semibold">Outreach Queue</h2>
          <p className="text-sm text-muted-foreground">Review drafts, approve sequences, and manage sends.</p>
        </div>
        <div className="flex gap-2">
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
              </DialogHeader>
              <Form {...suppressForm}>
                <form onSubmit={suppressForm.handleSubmit(onSuppress)} className="space-y-4" data-testid="form-suppress">
                  <FormField control={suppressForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input {...field} data-testid="input-suppress-email" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={suppressForm.control} name="reason" render={({ field }) => (
                    <FormItem><FormLabel>Reason</FormLabel><FormControl><Input {...field} data-testid="input-suppress-reason" /></FormControl><FormMessage /></FormItem>
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

          <Dialog open={isGenerateOpen} onOpenChange={(open) => {
            if (!open) generateForm.reset();
            setIsGenerateOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button data-testid="button-open-generate">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Sequence
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Outreach Drafts</DialogTitle>
              </DialogHeader>
              <Form {...generateForm}>
                <form onSubmit={generateForm.handleSubmit(onGenerate)} className="space-y-4" data-testid="form-generate-sequence">
                  <FormField control={generateForm.control} name="prospectId" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Prospect</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger data-testid="select-generate-prospect"><SelectValue placeholder="Select..." /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {prospects?.map(p => (
                            <SelectItem key={p.id} value={p.id.toString()}>{p.companyName} ({p.contactName})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <DialogFooter className="mt-6">
                    <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={generateMutation.isPending} data-testid="button-submit-generate">
                      {generateMutation.isPending ? 'Generating...' : 'Generate AI Drafts'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
                  <th className="text-left px-4 py-3 font-medium w-48">Info</th>
                  <th className="text-left px-4 py-3 font-medium w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {messages.map(m => (
                  <tr key={m.id} className="hover:bg-white/[0.02]" data-testid={`row-message-${m.id}`}>
                    <td className="px-4 py-3 text-center text-muted-foreground font-mono">#{m.sequenceNumber}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium truncate max-w-[180px]">{getProspectName(m.prospectId)}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">{getProspectEmail(m.prospectId)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium truncate max-w-[300px]">{m.subject}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={m.status === 'sent' || m.status === 'delivered' ? 'default' : m.status === 'failed' || m.status === 'bounced' ? 'destructive' : 'secondary'} data-testid={`status-message-${m.id}`}>
                        {m.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {m.error && <span className="text-destructive block truncate max-w-[180px]" title={m.error}>Error: {m.error}</span>}
                      {m.sentAt && <span className="text-muted-foreground block">Sent: {new Date(m.sentAt).toLocaleDateString()}</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
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
                              <CheckCircle2 className="w-4 h-4 mr-2" /> Approve Draft
                            </DropdownMenuItem>
                          )}
                          {m.status === 'approved' && (
                            <DropdownMenuItem onClick={() => sendMutation.mutate({ id: m.id })} data-testid={`action-send-message-${m.id}`}>
                              <Send className="w-4 h-4 mr-2" /> Send Now
                            </DropdownMenuItem>
                          )}
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
