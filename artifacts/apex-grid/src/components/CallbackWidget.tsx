import { useEffect, useRef, useState } from "react";
import { PhoneCall, X, Send, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const API_BASE = `${import.meta.env.BASE_URL}api`;

// Cloudflare Turnstile invisible bot challenge.
// Falls back to Cloudflare's documented always-pass test site key in dev.
const TURNSTILE_SITE_KEY =
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || "1x00000000000000000000AA";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          size?: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("turnstile load failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("turnstile load failed"));
    document.head.appendChild(s);
  });
}

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! Want an engineer to call you back ASAP? Just give me your name and the best number to reach you.",
};

export function CallbackWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [complete, setComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const tokenPromiseRef = useRef<Promise<string | null> | null>(null);
  const sessionRef = useRef<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Kick off the invisible bot challenge as soon as the widget opens so the
  // token is usually ready before the visitor finishes typing.
  useEffect(() => {
    if (!open || sessionRef.current || tokenPromiseRef.current) return;
    tokenPromiseRef.current = (async () => {
      try {
        await loadTurnstileScript();
        return await new Promise<string | null>((resolve) => {
          const el = turnstileRef.current;
          if (!el || !window.turnstile) return resolve(null);
          window.turnstile.render(el, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (token) => resolve(token),
            "error-callback": () => resolve(null),
          });
          // Don't hang forever if the challenge never resolves
          setTimeout(() => resolve(null), 20_000);
        });
      } catch {
        return null;
      }
    })();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending || complete) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      // First message: wait for the invisible bot challenge token.
      let botToken: string | null = null;
      if (!sessionRef.current) {
        botToken = (await tokenPromiseRef.current) ?? null;
        tokenPromiseRef.current = null;
      }
      const res = await fetch(`${API_BASE}/callback-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the conversation minus the canned greeting; keep last 20 turns
        body: JSON.stringify({
          messages: next.slice(1).slice(-20),
          ...(sessionRef.current ? { session: sessionRef.current } : {}),
          ...(botToken ? { botToken } : {}),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: { reply: string; complete: boolean; session?: string } = await res.json();
      if (data.session) sessionRef.current = data.session;
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      if (data.complete) setComplete(true);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry — I couldn't send that. Please call us directly at (480) 490-0064 or use the contact form.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Invisible Turnstile bot-challenge container */}
      <div ref={turnstileRef} className="hidden" aria-hidden="true" />
      {open && (
        <div className="w-[min(92vw,380px)] bg-card border border-border shadow-2xl shadow-black/60 flex flex-col overflow-hidden rounded-[2px]">
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <div className="flex items-center gap-2 text-primary-foreground">
              <PhoneCall className="w-4 h-4" />
              <span className="font-display font-bold text-sm uppercase tracking-wide">
                Request a Callback
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close callback assistant"
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="h-72 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed rounded-[2px] whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground/90"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-card border border-border px-3 py-2 rounded-[2px]">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>

          {complete ? (
            <div className="px-4 py-3 border-t border-border bg-card text-sm text-foreground/80">
              ✓ You're on the callback list — we'll be in touch ASAP.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="flex items-center gap-2 border-t border-border bg-card p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your name & number…"
                aria-label="Message the callback assistant"
                maxLength={2000}
                className="flex-1 bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary rounded-[2px]"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send"
                className="h-9 w-9 flex items-center justify-center bg-primary text-primary-foreground disabled:opacity-50 rounded-[2px] hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Request a callback"
        className="flex items-center gap-2 h-12 px-5 bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-black/50 rounded-[2px] hover:bg-primary/90 transition-colors"
      >
        <PhoneCall className="w-4 h-4" />
        {open ? "Close" : "Call Me Back"}
      </button>
    </div>
  );
}
