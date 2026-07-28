import { useState } from 'react';
import { useUnsubscribeSubscriber } from '@workspace/api-client-react';
import { CheckCircle2, MailX } from 'lucide-react';

function getPrefilledEmail(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('email')?.trim() ?? '';
}

export default function Unsubscribe() {
  const [email, setEmail] = useState(getPrefilledEmail);
  const unsubscribe = useUnsubscribeSubscriber();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    unsubscribe.mutate({ data: { email: email.trim() } });
  };

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
              Enter your email address and we'll remove you from our mailing list.
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
