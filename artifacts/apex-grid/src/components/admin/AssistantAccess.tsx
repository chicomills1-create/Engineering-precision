import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Bot, Check, Clock, Copy, KeyRound, ShieldAlert, X } from 'lucide-react';

const apiBase = import.meta.env.VITE_API_BASE_URL ?? '/api';
export const assistantStatusQueryKey = ['assistant-access-status'] as const;
const assistantManageQueryKey = ['assistant-access-manage'] as const;
const assistantTokensQueryKey = ['assistant-access-tokens'] as const;

type AssistantStatus = {
  status: 'none' | 'pending' | 'approved' | 'consumed' | 'denied' | 'expired' | 'authenticated';
  expiresAt?: string;
};

type AssistantManage = {
  requests: Array<{ id: string; createdAt: string; expiresAt: string }>;
  sessions: Array<{ id: string; createdAt: string; lastSeenAt: string; expiresAt: string }>;
};

type AssistantApiToken = {
  id: string;
  name: string;
  scopes: string;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  revokedAt: string | null;
};

type AssistantTokenList = {
  tokens: AssistantApiToken[];
};

type AssistantTokenCreated = {
  id: string;
  name: string;
  scopes: string;
  expiresAt: string;
  token: string;
};

function formatDateTime(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleString();
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBase}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export function useAssistantStatus() {
  return useQuery({
    queryKey: assistantStatusQueryKey,
    queryFn: () => apiRequest<AssistantStatus>('/assistant-access/status'),
    refetchInterval: (query) => query.state.data?.status === 'pending' ? 2000 : false,
    staleTime: 1000,
  });
}

export function AssistantAccessEntry() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const status = useAssistantStatus();
  const [message, setMessage] = useState<string | null>(null);
  const createRequest = useMutation({
    mutationFn: () => apiRequest<AssistantStatus>('/assistant-access/requests', {
      method: 'POST',
      body: '{}',
    }),
    onSuccess: (data) => {
      setMessage(null);
      queryClient.setQueryData(assistantStatusQueryKey, data);
    },
    onError: () => setMessage('Unable to create an access request. Please try again.'),
  });

  useEffect(() => {
    if (status.data?.status === 'authenticated') {
      setLocation('/admin/seo', { replace: true });
    }
  }, [setLocation, status.data?.status]);

  const waiting = status.data?.status === 'pending' || status.data?.status === 'approved';
  if (waiting) {
    return (
      <div className="w-full max-w-[440px] border border-primary/30 bg-card p-6 text-center rounded-[4px]" data-testid="assistant-waiting">
        <Clock className="mx-auto mb-3 h-6 w-6 animate-pulse text-primary" />
        <h2 className="font-display text-xl font-semibold">Waiting for owner approval…</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This request expires in 10 minutes. Keep this page open; it refreshes automatically.
        </p>
      </div>
    );
  }

  const terminal = status.data?.status === 'denied' || status.data?.status === 'expired';
  return (
    <div className="w-full max-w-[440px] border border-border bg-card p-5 rounded-[4px]">
      {terminal && (
        <div className="mb-4 border border-destructive/40 bg-destructive/10 p-3 text-sm" role="alert">
          Access was {status.data?.status === 'denied' ? 'denied' : 'not approved before it expired'}.
        </div>
      )}
      {message && <p className="mb-4 text-sm text-destructive" role="alert">{message}</p>}
      <button
        type="button"
        onClick={() => createRequest.mutate()}
        disabled={createRequest.isPending || status.isLoading}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-[2px] border border-primary/50 bg-primary/10 px-4 font-semibold text-primary transition-colors hover:bg-primary/15 disabled:opacity-50"
        data-testid="button-assistant-access"
      >
        <Bot className="h-5 w-5" />
        {createRequest.isPending ? 'Requesting access…' : 'Assistant access'}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Owner approval only. No Google sign-in or password is required.
      </p>
    </div>
  );
}

export function AssistantTokenManager() {
  const queryClient = useQueryClient();
  const tokensQuery = useQuery({
    queryKey: assistantTokensQueryKey,
    queryFn: () => apiRequest<AssistantTokenList>('/assistant-access/tokens'),
  });
  const [newToken, setNewToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = useMutation({
    mutationFn: () => apiRequest<AssistantTokenCreated>('/assistant-access/tokens', {
      method: 'POST',
      body: JSON.stringify({ name: 'Night-shift assistant', scopes: ['seo', 'admin-read'], expiresInDays: 365 }),
    }),
    onSuccess: (data) => {
      setNewToken(data.token);
      setCopied(false);
      void queryClient.invalidateQueries({ queryKey: assistantTokensQueryKey });
    },
  });
  const revoke = useMutation({
    mutationFn: (id: string) => apiRequest<{ revoked: string }>(`/assistant-access/tokens/${id}/revoke`, {
      method: 'POST',
      body: '{}',
    }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: assistantTokensQueryKey }),
  });

  const copyToken = async () => {
    if (!newToken) return;
    try {
      await navigator.clipboard.writeText(newToken);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const tokens = tokensQuery.data?.tokens ?? [];
  const active = tokens.filter((t) => !t.revokedAt);

  return (
    <div className="mt-5 border border-border bg-card p-5 rounded-[2px]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Assistant access</p>
          <h2 className="font-display text-xl font-semibold">Permanent API token</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A long-lived key for the assistant — no more per-session approval taps. Revoke it here any time.
          </p>
        </div>
        <button
          type="button"
          onClick={() => generate.mutate()}
          disabled={generate.isPending}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 bg-primary px-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          data-testid="button-generate-assistant-token"
        >
          <KeyRound className="h-4 w-4" />
          {generate.isPending ? 'Generating…' : 'Generate token'}
        </button>
      </div>
      {generate.error && (
        <p className="mb-4 text-sm text-destructive" role="alert">Unable to generate a token. Please try again.</p>
      )}
      {newToken && (
        <div className="mb-4 border border-amber-500/60 bg-amber-500/10 p-4" role="alert" data-testid="assistant-new-token">
          <p className="font-semibold text-amber-100">Copy this token now — it will never be shown again.</p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 break-all border border-border bg-background px-3 py-2 text-sm">{newToken}</code>
            <button
              type="button"
              onClick={copyToken}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 border border-primary/50 px-3 text-sm text-primary hover:bg-primary/10"
              data-testid="button-copy-assistant-token"
            >
              <Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setNewToken(null)}
            className="mt-2 text-xs text-muted-foreground underline hover:text-foreground"
          >
            I've saved it — hide this
          </button>
        </div>
      )}
      {tokensQuery.isLoading && <p className="text-sm text-muted-foreground">Loading tokens…</p>}
      {tokensQuery.error && <p className="text-sm text-destructive">Unable to load API tokens.</p>}
      {!tokensQuery.isLoading && active.length === 0 && (
        <p className="text-sm text-muted-foreground">No active token. Generate one above to stop the approval taps.</p>
      )}
      <div className="space-y-3">
        {active.map((token) => (
          <div key={token.id} className="flex flex-col gap-3 border border-border p-4 sm:flex-row sm:items-center sm:justify-between" data-testid="assistant-api-token">
            <div>
              <p className="font-medium">{token.name}</p>
              <p className="text-xs text-muted-foreground">
                Scopes: {token.scopes} · Created {formatDateTime(token.createdAt)} · Last used {formatDateTime(token.lastUsedAt)} · Expires {formatDateTime(token.expiresAt)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => revoke.mutate(token.id)}
              disabled={revoke.isPending}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 border border-destructive/50 px-3 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
              data-testid="button-revoke-assistant-token"
            >
              <X className="h-4 w-4" /> Revoke
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AssistantAccessManager() {
  const queryClient = useQueryClient();
  const manage = useQuery({
    queryKey: assistantManageQueryKey,
    queryFn: () => apiRequest<AssistantManage>('/assistant-access/manage'),
    refetchInterval: 3000,
  });
  const action = useMutation({
    mutationFn: ({ path }: { path: string }) => apiRequest(path, { method: 'POST', body: '{}' }),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: assistantManageQueryKey }),
  });

  const pending = manage.data?.requests ?? [];
  const sessions = manage.data?.sessions ?? [];
  return (
    <section className="container mx-auto px-4 md:px-8 pt-8" aria-label="Assistant access management">
      {pending.length > 0 && (
        <div className="mb-5 flex items-start gap-3 border border-amber-500/60 bg-amber-500/10 p-4 text-amber-100" role="alert" data-testid="assistant-request-banner">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <p className="font-semibold">Assistant access approval needed</p>
            <p className="text-sm text-amber-100/75">{pending.length} request{pending.length === 1 ? '' : 's'} waiting.</p>
          </div>
        </div>
      )}
      <div className="border border-border bg-card p-5 rounded-[2px]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Assistant access</p>
            <h2 className="font-display text-xl font-semibold">Pairing requests</h2>
          </div>
          {sessions.length > 0 && (
            <button
              type="button"
              onClick={() => action.mutate({ path: '/assistant-access/revoke' })}
              disabled={action.isPending}
              className="h-9 border border-destructive/50 px-3 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
              data-testid="button-revoke-assistant-access"
            >
              Revoke assistant access
            </button>
          )}
        </div>
        {manage.isLoading && <p className="text-sm text-muted-foreground">Checking requests…</p>}
        {manage.error && <p className="text-sm text-destructive">Unable to load assistant access requests.</p>}
        {!manage.isLoading && pending.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No pending requests. {sessions.length > 0 ? `${sessions.length} assistant session${sessions.length === 1 ? ' is' : 's are'} active.` : 'No assistant session is active.'}
          </p>
        )}
        <div className="space-y-3">
          {pending.map((request) => (
            <div key={request.id} className="flex flex-col gap-3 border border-border p-4 sm:flex-row sm:items-center sm:justify-between" data-testid="assistant-pending-request">
              <div>
                <p className="font-medium">Assistant browser is waiting</p>
                <p className="text-xs text-muted-foreground">
                  Requested {new Date(request.createdAt).toLocaleTimeString()} · expires {new Date(request.expiresAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => action.mutate({ path: `/assistant-access/requests/${request.id}/approve` })}
                  disabled={action.isPending}
                  className="inline-flex h-9 items-center gap-1.5 bg-emerald-600 px-3 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
                  data-testid="button-approve-assistant"
                >
                  <Check className="h-4 w-4" /> Approve
                </button>
                <button
                  type="button"
                  onClick={() => action.mutate({ path: `/assistant-access/requests/${request.id}/deny` })}
                  disabled={action.isPending}
                  className="inline-flex h-9 items-center gap-1.5 border border-destructive/50 px-3 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
                  data-testid="button-deny-assistant"
                >
                  <X className="h-4 w-4" /> Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AssistantTokenManager />
    </section>
  );
}