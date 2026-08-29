import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  getListClientMonthlySafeListQueryKey,
  useListClientMonthlySafeList,
  useSendClientMonthlyEmail,
} from '@workspace/api-client-react';
import { CheckCircle2, Loader2, MailCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function ClientSafeListTab() {
  const queryClient = useQueryClient();
  const { data: contacts, isLoading, error } = useListClientMonthlySafeList();
  const [selected, setSelected] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null);
  const eligibleEmails = useMemo(() => contacts?.map((contact) => contact.email) ?? [], [contacts]);
  const send = useSendClientMonthlyEmail({
    mutation: {
      onSuccess: (response) => {
        setResult({ sent: response.sent, failed: response.failed });
        setConfirmOpen(false);
        setSelected([]);
        void queryClient.invalidateQueries({ queryKey: getListClientMonthlySafeListQueryKey() });
      },
    },
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading safe list…</p>;
  if ((error as { status?: number })?.status === 403) {
    return (
      <div className="border border-destructive/50 bg-destructive/10 p-8 rounded-[2px]" data-testid="error-access-denied">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
          <div>
            <h2 className="font-display font-semibold text-lg mb-1">Access denied</h2>
            <p className="text-sm text-muted-foreground">
              Your account isn't authorized to view the client safe list. This page is
              limited to approved team members. If you believe this is a
              mistake, contact the site administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <p className="text-sm text-destructive">Could not load the client safe list.</p>;

  return (
    <div className="space-y-8" data-testid="tab-content-client-safe-list">
      <div className="border border-emerald-500/30 bg-emerald-500/10 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <div>
            <h2 className="font-display text-lg font-semibold">Past-client monthly safe list</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Only archived-request contacts with explicit opt-in are shown. Suppressed,
              unsubscribed, invalid, and duplicate addresses are excluded again immediately before sending.
            </p>
          </div>
        </div>
      </div>

      {contacts?.length === 0 ? (
        <p className="border border-border bg-card p-8 text-center text-muted-foreground">
          No eligible past-client contacts yet. Archive a request and explicitly opt its contact in.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-card text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">
                    <input
                      type="checkbox"
                      aria-label="Select all eligible contacts"
                      checked={selected.length === eligibleEmails.length && eligibleEmails.length > 0}
                      onChange={(event) => setSelected(event.target.checked ? eligibleEmails : [])}
                    />
                  </th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Opted in</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact) => (
                  <tr key={contact.email} className="border-t border-border">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        aria-label={`Select ${contact.email}`}
                        checked={selected.includes(contact.email)}
                        onChange={(event) => setSelected((current) =>
                          event.target.checked
                            ? [...new Set([...current, contact.email])]
                            : current.filter((email) => email !== contact.email))}
                      />
                    </td>
                    <td className="p-3">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.email}</p>
                    </td>
                    <td className="p-3 text-muted-foreground">{contact.companyName || 'Independent client'}</td>
                    <td className="p-3 text-muted-foreground">
                      {new Date(contact.optedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-5 border border-border bg-card p-6">
            <div>
              <h3 className="font-display text-xl font-semibold">Prepare monthly email</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Draft here, then review the exact audience and message before the manual send.
              </p>
            </div>
            <Input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Email subject" maxLength={200} />
            <Textarea value={body} onChange={(event) => setBody(event.target.value)} rows={8} placeholder="Share the new project opportunity or update…" maxLength={10000} />
            <Button
              className="w-fit"
              disabled={selected.length === 0 || !subject.trim() || !body.trim()}
              onClick={() => setConfirmOpen(true)}
            >
              <MailCheck /> Review approved send ({selected.length})
            </Button>
          </div>
        </>
      )}

      {result && (
        <p className="flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          Sent {result.sent}; {result.failed} failed or became ineligible.
        </p>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve monthly client email</DialogTitle>
            <DialogDescription>
              This sends now to {selected.length} selected eligible contact{selected.length === 1 ? '' : 's'}.
              Eligibility and suppression status will be checked once more for every recipient.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <div className="border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground">Subject</p>
              <p className="font-medium">{subject}</p>
            </div>
            <div className="max-h-56 overflow-y-auto whitespace-pre-wrap border border-border bg-background p-4">
              {body}
            </div>
            <p className="text-xs text-muted-foreground">
              Apex Grid’s mailing address and a signed one-click unsubscribe link are appended automatically.
            </p>
            {send.isError && <p className="text-destructive">The send could not be completed. Try again.</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" disabled={send.isPending} onClick={() => setConfirmOpen(false)}>Keep editing</Button>
            <Button
              disabled={send.isPending}
              onClick={() => send.mutate({ data: { recipientEmails: selected, subject: subject.trim(), body: body.trim() } })}
            >
              {send.isPending ? <><Loader2 className="animate-spin" /> Sending…</> : 'Approve & send now'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}