import { useEffect, useRef, useState } from 'react';
import { useUnsubscribeSubscriber } from '@workspace/api-client-react';
import { CheckCircle2, Loader2, MailX } from 'lucide-react';

function getLinkParams(): { email: string; token: string } {
  const params = new URLSearchParams(window.location.search);
  return {
    email: params.get('email')?.trim() ?? '',
    token: params.get('token')?.trim() ?? '',
  };
}

export default function Unsubscribe() {
  const [{ email: linkEmail, token }] = useState(getLinkParams);
  const [email, setEmail] = useState(linkEmail);
  const unsubscribe = useUnsubscribeSubscriber();
  const oneClick = Boolean(linkEmail && token);
  const autoFired = useRef(false);

  // Signed link from an email: unsubscribe in one click, no form needed.
  useEffect(() => {
    if (oneClick && !autoFired.current) {
      autoFired.current = true;
      unsubscribe.mutate({ data: { email: linkEmail, token } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oneClick, linkEmail, token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    unsubscribe.mutate({ data: { email: email.trim() } });
  };

  if (oneClick && (unsubscribe.isPending || unsubscribe.isIdle)) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 min-h-[70vh] flex items-start justify-center">
        <div className="w-full max-w-md border border-border bg-card p-10 rounded-[2px] text-center">
          <Loader2 className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
          <h1 className="font-display text-2xl font-bold mb-2">Unsubscribing…</h1>
          <p className="text-sm text-muted-foreground">Removing {linkEmail} from our mailing list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-24 min-h-[70vh] flex items-start justify-center">
      <div className="w-full max-w-md">
        {unsubscribe.isSuccess ? (
          <div className="border border-border bg-card p-10 rounded-[2px] text-center">
            <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold mb-2">You're unsubscribed</h1>
            <p className="text-sm text-muted-foreground">
              {email} has been removed from our mailing list. You won't receive
              any further newsletters from us.
            </p>
          </div>
        ) : (
          <div className="border border-border bg-card p-10 rounded-[2px]">
            <MailX className="w-8 h-8 text-primary mb-4" />
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Newsletter</p>
            <h1 className="font-display text-2xl font-bold mb-2">Unsubscribe</h1>
            <p className="text-sm text-muted-foreground mb-6">
              {oneClick && unsubscribe.isError
                ? 'This unsubscribe link is invalid or has been altered. Enter your email address below and we\u2019ll remove you from our mailing list.'
                : "Enter your email address and we'll remove you from our mailing list."}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full h-11 px-4 bg-background border border-border rounded-[2px] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60"
              />
              {unsubscribe.isError && (
                <p className="text-sm text-destructive">
                  Something went wrong. Please check the email address and try again.
                </p>
              )}
              <button
                type="submit"
                disabled={unsubscribe.isPending}
                className="w-full h-11 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider rounded-[2px] hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {unsubscribe.isPending ? 'Unsubscribing…' : 'Unsubscribe'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
