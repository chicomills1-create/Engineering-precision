import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useListOutreachReplies,
  useUpdateOutreachReply,
  getListOutreachRepliesQueryKey,
  getGetOutreachDashboardQueryKey,
  OutreachReply,
  OutreachReplyUpdate
} from '@workspace/api-client-react';
import { MailOpen, Building, CornerUpLeft, CheckCircle2, MessageSquare, Save, Mail } from 'lucide-react';

const formatDate = (d: string) => new Intl.DateTimeFormat('en-US', {
  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
}).format(new Date(d));

export function ReplyInboxTab() {
  const { data: replies, isLoading, isError } = useListOutreachReplies();
  const [filter, setFilter] = useState<'attention' | 'unread' | 'assigned' | 'resolved' | 'all'>('attention');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredReplies = useMemo(() => {
    if (!replies) return [];
    return replies.filter(r => {
      if (filter === 'attention') return r.status !== 'resolved';
      if (filter === 'unread') return r.status === 'unread';
      if (filter === 'assigned') return !!r.assignedTo && r.status !== 'resolved';
      if (filter === 'resolved') return r.status === 'resolved';
      return true;
    }).sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());
  }, [replies, filter]);

  const selectedReply = useMemo(() => {
    return replies?.find(r => r.id === selectedId) || null;
  }, [replies, selectedId]);

  if (isLoading) {
    return <div className="animate-pulse h-[400px] bg-card border border-border rounded-[2px]" />;
  }

  if (isError) {
    return <div className="p-8 text-center text-destructive border border-destructive/20 bg-destructive/5 rounded-[2px]">Failed to load replies.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[calc(100vh-250px)] lg:min-h-[600px] pb-8">
      {/* List Pane */}
      <div className={`lg:col-span-4 flex-col border border-border bg-card rounded-[2px] overflow-hidden ${selectedId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-3 border-b border-border flex items-center justify-between bg-muted/20 shrink-0">
          <h3 className="font-display font-medium text-sm">Inbox</h3>
          <div className="flex gap-1 text-[10px] sm:text-xs">
            {(['attention', 'unread', 'assigned', 'resolved'] as const).map(f => (
              <button
                key={f}
                onClick={() => { setFilter(f); setSelectedId(null); }}
                className={`px-2 py-1 rounded-[2px] capitalize ${filter === f ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredReplies.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No replies found for this filter.
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredReplies.map(reply => (
                <button
                  key={reply.id}
                  onClick={() => setSelectedId(reply.id)}
                  className={`text-left p-3 border-b border-border transition-colors hover:bg-muted/30 ${selectedId === reply.id ? 'bg-primary/5 border-l-2 border-l-primary' : 'border-l-2 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <div className="flex items-center gap-2 truncate">
                      {reply.status === 'unread' ? (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      ) : reply.status === 'resolved' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <MailOpen className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`text-sm truncate ${reply.status === 'unread' ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {reply.senderName || reply.senderEmail}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0 whitespace-nowrap">
                      {formatDate(reply.receivedAt)}
                    </span>
                  </div>
                  <div className="text-xs font-medium truncate mb-1 text-foreground/80">
                    {reply.messageType === 'auto_reply' && <span className="inline-block px-1 bg-amber-500/20 text-amber-500 text-[9px] uppercase mr-2 rounded-[2px] tracking-wider">Auto</span>}
                    {reply.messageType === 'permanent_closure' && <span className="inline-block px-1 bg-destructive/20 text-destructive text-[9px] uppercase mr-2 rounded-[2px] tracking-wider">Closed</span>}
                    {reply.subject}
                  </div>
                  <div className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed opacity-75">
                    {reply.textBody}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Pane */}
      <div className={`lg:col-span-8 border border-border bg-card rounded-[2px] flex-col overflow-hidden ${!selectedId ? 'hidden lg:flex' : 'flex'}`}>
        {selectedReply ? (
          <ReplyDetail reply={selectedReply} onBack={() => setSelectedId(null)} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
            <MessageSquare className="w-12 h-12 opacity-20 mb-4" />
            <p>Select a reply to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ReplyDetail({ reply, onBack }: { reply: OutreachReply; onBack: () => void }) {
  const queryClient = useQueryClient();
  const updateReply = useUpdateOutreachReply();
  const mutateFnRef = useRef(updateReply.mutate);
  mutateFnRef.current = updateReply.mutate;

  const handleUpdate = useCallback((data: OutreachReplyUpdate) => {
    mutateFnRef.current(
      { id: reply.id, data },
      {
        onSuccess: (updated) => {
          queryClient.setQueryData(getListOutreachRepliesQueryKey(), (old: OutreachReply[] | undefined) => {
            if (!old) return old;
            return old.map(r => r.id === reply.id ? { ...r, ...updated } : r);
          });
          queryClient.invalidateQueries({ queryKey: getGetOutreachDashboardQueryKey() });
        }
      }
    );
  }, [reply.id, queryClient]);

  const [note, setNote] = useState(reply.internalNote || '');
  const [assignee, setAssignee] = useState(reply.assignedTo || '');
  const [followUp, setFollowUp] = useState(reply.followUpAt ? reply.followUpAt.split('T')[0] : '');

  useEffect(() => {
    setNote(reply.internalNote || '');
    setAssignee(reply.assignedTo || '');
    setFollowUp(reply.followUpAt ? reply.followUpAt.split('T')[0] : '');
  }, [reply]);

  const isNoteChanged = note !== (reply.internalNote || '');
  const isAssigneeChanged = assignee !== (reply.assignedTo || '');
  const isFollowUpChanged = followUp !== (reply.followUpAt ? reply.followUpAt.split('T')[0] : '');

  const handleSaveNote = () => handleUpdate({ internalNote: note });
  const handleSaveAssignee = () => handleUpdate({ assignedTo: assignee || null });
  const handleSaveFollowUp = () => handleUpdate({ followUpAt: followUp ? new Date(followUp).toISOString() : null });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header Actions */}
      <div className="p-3 border-b border-border bg-muted/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="lg:hidden p-1.5 hover:bg-muted rounded-[2px] text-muted-foreground">
            <CornerUpLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-[2px] ${
              reply.status === 'unread' ? 'bg-primary/20 text-primary' :
              reply.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-500' :
              'bg-muted text-muted-foreground'
            }`}>
              {reply.status}
            </span>
            {reply.messageType === 'auto_reply' && (
              <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-[2px] bg-amber-500/20 text-amber-500">
                Auto-Reply
              </span>
            )}
            {reply.messageType === 'permanent_closure' && (
              <span
                className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-[2px] bg-destructive/20 text-destructive"
                data-testid="reply-permanent-closure"
              >
                Permanent Closure
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {reply.status !== 'read' && reply.status !== 'resolved' && (
            <button
              onClick={() => handleUpdate({ status: 'read' })}
              className="px-3 py-1.5 text-[11px] font-medium border border-border rounded-[2px] hover:bg-muted transition-colors"
            >
              Mark Read
            </button>
          )}
          {reply.status === 'read' && (
            <button
              onClick={() => handleUpdate({ status: 'unread' })}
              className="px-3 py-1.5 text-[11px] font-medium border border-border rounded-[2px] hover:bg-muted transition-colors"
            >
              Mark Unread
            </button>
          )}
          {reply.status !== 'resolved' ? (
            <button
              onClick={() => handleUpdate({ status: 'resolved' })}
              className="px-3 py-1.5 text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-[2px] hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
            </button>
          ) : (
            <button
              onClick={() => handleUpdate({ status: 'read' })}
              className="px-3 py-1.5 text-[11px] font-medium border border-border rounded-[2px] hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <CornerUpLeft className="w-3.5 h-3.5" /> Reopen
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
        {/* Main Content */}
        <div className="flex-1 p-5 lg:p-8 border-b md:border-b-0 md:border-r border-border min-w-0">
          <h2 className="text-xl lg:text-2xl font-display font-bold mb-6 leading-tight">{reply.subject}</h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[2px] bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                {(reply.senderName || reply.senderEmail)[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate flex items-baseline flex-wrap gap-x-2">
                  {reply.senderName || reply.senderEmail}
                  {reply.senderName && <span className="text-muted-foreground font-normal text-xs truncate">&lt;{reply.senderEmail}&gt;</span>}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {formatDate(reply.receivedAt)}
                </div>
              </div>
            </div>
          </div>

          <div className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed opacity-90 p-4 bg-muted/20 border border-border/50 rounded-[2px]">
            {reply.textBody}
          </div>
        </div>

        {/* Sidebar Context & Actions */}
        <div className="w-full md:w-72 shrink-0 p-5 lg:p-6 bg-muted/5 space-y-8 overflow-y-auto">
          
          {/* Context Block */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Context</h4>
            <div className="space-y-4 text-sm">
              {reply.companyName && (
                <div className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-xs">{reply.companyName}</div>
                    {reply.contactName && <div className="text-[11px] text-muted-foreground mt-0.5">{reply.contactName}</div>}
                  </div>
                </div>
              )}
              {reply.campaignId && (
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-medium">Campaign #{reply.campaignId}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Sequence #{reply.sequenceNumber}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Forwarding Status */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Forwarding</h4>
            <div className={`p-3 rounded-[2px] border text-xs ${
              reply.forwardStatus === 'forwarded' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
              reply.forwardStatus === 'failed' ? 'bg-destructive/10 border-destructive/20 text-destructive' :
              'bg-muted/20 border-border text-muted-foreground'
            }`}>
              <div className="font-bold capitalize tracking-wide">{reply.forwardStatus}</div>
              {reply.forwardedAt && <div className="mt-1 opacity-80 text-[10px]">{formatDate(reply.forwardedAt)}</div>}
              {reply.forwardError && <div className="mt-1 opacity-80 font-mono text-[10px] break-words">{reply.forwardError}</div>}
            </div>
          </div>

          {/* Operations */}
          <div className="space-y-5 pt-6 border-t border-border/50">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Assign To</label>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  value={assignee}
                  onChange={e => setAssignee(e.target.value)}
                  placeholder="name@apex.com"
                  className="flex-1 h-8 text-xs bg-background border border-border px-2.5 rounded-[2px] focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
                {isAssigneeChanged && (
                  <button onClick={handleSaveAssignee} className="h-8 px-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-[2px] transition-colors shrink-0">
                    <Save className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Follow-up Date</label>
              <div className="flex gap-1.5">
                <input
                  type="date"
                  value={followUp}
                  onChange={e => setFollowUp(e.target.value)}
                  className="flex-1 h-8 text-xs bg-background border border-border px-2.5 rounded-[2px] focus:outline-none focus:border-primary"
                />
                {isFollowUpChanged && (
                  <button onClick={handleSaveFollowUp} className="h-8 px-2.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-[2px] transition-colors shrink-0">
                    <Save className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">Internal Note</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Context or next steps..."
                className="w-full h-28 text-xs bg-background border border-border p-2.5 rounded-[2px] focus:outline-none focus:border-primary resize-none placeholder:text-muted-foreground/50"
              />
              {isNoteChanged && (
                <button onClick={handleSaveNote} className="mt-2 w-full h-8 text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 rounded-[2px] font-bold tracking-wide flex items-center justify-center gap-1.5 transition-colors">
                  <Save className="w-3.5 h-3.5" /> SAVE NOTE
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
