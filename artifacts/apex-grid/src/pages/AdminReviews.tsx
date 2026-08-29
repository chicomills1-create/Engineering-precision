import { useState, useEffect } from 'react';
import { Show } from '@clerk/react';
import { Redirect } from 'wouter';
import QRCode from 'qrcode';
import { Copy, Download, Check, AlertCircle, Link as LinkIcon, QrCode as QrCodeIcon, Mail, MessageSquare, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import { AdminNav } from '@/components/layout/AdminNav';

function ReviewGenerator() {
  const [inputType, setInputType] = useState<'place_id' | 'url'>('place_id');
  const [inputValue, setInputValue] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSms, setCopiedSms] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('apex_grid_review_setup');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.inputType === 'place_id' || parsed.inputType === 'url') {
          setInputType(parsed.inputType);
        }
        if (typeof parsed.inputValue === 'string') {
          setInputValue(parsed.inputValue);
        }
      } catch (e) {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('apex_grid_review_setup', JSON.stringify({ inputType, inputValue }));
  }, [inputType, inputValue]);

  let generatedUrl: string | null = null;
  let isValid = false;

  if (inputType === 'place_id') {
    const placeId = inputValue.trim();
    if (placeId.length > 0 && !/\s/.test(placeId)) {
      generatedUrl = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
      isValid = true;
    }
  } else {
    try {
      const url = new URL(inputValue);
      const hostname = url.hostname.toLowerCase();
      const isGoogleHost =
        hostname === 'google.com' ||
        hostname.endsWith('.google.com') ||
        hostname === 'g.page';
      if (url.protocol === 'https:' && isGoogleHost) {
        generatedUrl = url.toString();
        isValid = true;
      }
    } catch {
      // invalid URL
    }
  }

  useEffect(() => {
    if (isValid && generatedUrl) {
      let active = true;
      QRCode.toDataURL(generatedUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
      .then((url) => {
        if (active) setQrCodeDataUrl(url);
      })
      .catch(() => {
        if (active) setQrCodeDataUrl(null);
      });
      return () => {
        active = false;
      };
    } else {
      setQrCodeDataUrl(null);
      return undefined;
    }
  }, [generatedUrl, isValid]);

  const handleCopyLink = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      setCopiedLink(false);
    }
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const a = document.createElement('a');
    a.href = qrCodeDataUrl;
    a.download = 'apex-grid-review-qr.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const emailTemplate = `Hi [Client Name],

Thank you for working with Apex Grid Engineering on your recent project. We value your honest feedback on our performance and processes. If you have a moment, please share your experience on our Google profile using the link below.

${generatedUrl || '[Link]'}

Best regards,
Apex Grid Engineering`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailTemplate);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      setCopiedEmail(false);
    }
  };

  const smsTemplate = `Hi [Client Name], this is Apex Grid Engineering. We'd appreciate your honest feedback on our recent work together. You can leave a Google review here: ${generatedUrl || '[Link]'} Thank you.`;

  const handleCopySms = async () => {
    try {
      await navigator.clipboard.writeText(smsTemplate);
      setCopiedSms(true);
      setTimeout(() => setCopiedSms(false), 2000);
    } catch (err) {
      setCopiedSms(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <AdminNav />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Generator</h1>
        <p className="text-muted-foreground">
          Create direct Google review links and QR codes for post-project client follow-ups.
        </p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-md p-4 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-foreground/90 leading-relaxed">
          <strong>Accountability & Compliance:</strong> All honest feedback is welcome. Do not selectively solicit positive reviews or suppress negative feedback. This utility only generates links; it does not dispatch emails or text messages on your behalf.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Setup */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border rounded-md p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-muted-foreground" />
              Location Setup
            </h2>

            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-md hover:bg-white/5 transition-colors">
                <input 
                  type="radio" 
                  name="inputType" 
                  value="place_id" 
                  checked={inputType === 'place_id'} 
                  onChange={() => setInputType('place_id')}
                  className="w-4 h-4 text-primary focus:ring-primary/50 bg-input border-border"
                  data-testid="radio-place-id"
                />
                <span className="text-sm font-medium">Use Google Place ID</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-md hover:bg-white/5 transition-colors">
                <input 
                  type="radio" 
                  name="inputType" 
                  value="url" 
                  checked={inputType === 'url'} 
                  onChange={() => setInputType('url')}
                  className="w-4 h-4 text-primary focus:ring-primary/50 bg-input border-border"
                  data-testid="radio-url"
                />
                <span className="text-sm font-medium">Use Direct Google URL</span>
              </label>
            </div>

            <div className="space-y-2">
              <label htmlFor="inputValue" className="text-sm font-medium text-foreground">
                {inputType === 'place_id' ? 'Google Place ID' : 'HTTPS Google URL'}
              </label>
              <input
                id="inputValue"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputType === 'place_id' ? 'ChIJu46S-ZZhLxMROG5lkwZ3D7k' : 'https://g.page/r/.../review'}
                className="w-full bg-input border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50 transition-shadow"
                data-testid="input-value"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {inputType === 'place_id' 
                  ? 'Found in the Google Maps Developer Console for the Apex Grid business listing.' 
                  : 'A direct link starting with https://google.com/ or https://g.page/'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-7">
          {!inputValue.trim() ? (
            <div className="h-full min-h-[300px] border border-dashed rounded-md flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <QrCodeIcon className="w-12 h-12 mb-4 opacity-20" />
              <p>Enter your location details to generate shareable assets.</p>
            </div>
          ) : !isValid ? (
            <div className="h-full min-h-[300px] border border-dashed border-destructive/50 rounded-md flex flex-col items-center justify-center p-8 text-center text-muted-foreground bg-destructive/5">
              <AlertCircle className="w-12 h-12 mb-4 text-destructive/50" />
              <p>Please enter a valid {inputType === 'place_id' ? 'non-empty Place ID' : 'HTTPS Google URL'}.</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Asset: URL & QR */}
              <div className="bg-card border rounded-md overflow-hidden">
                <div className="bg-white/5 border-b px-6 py-4 flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    Review Link & QR Code
                  </h3>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Direct clients to this URL to leave a review.
                    </p>
                    <div className="p-3 bg-black/40 border rounded-md break-all text-xs font-mono text-foreground/80">
                      {generatedUrl}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      data-testid="btn-copy-link"
                      className="inline-flex items-center gap-2 h-9 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-[2px] hover:bg-primary/90 transition-colors"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedLink ? 'Copied' : 'Copy Link'}
                    </button>
                    <a
                      href={generatedUrl ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 h-9 px-4 border border-border text-sm font-medium rounded-[2px] hover:bg-white/5 transition-colors"
                      data-testid="link-open-review"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Link
                    </a>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center space-y-4 border-l border-border/50 pl-6">
                    {qrCodeDataUrl ? (
                      <div className="bg-white p-2 rounded-md shadow-sm">
                        <img src={qrCodeDataUrl} alt="Review QR Code" className="w-32 h-32" />
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-white/5 animate-pulse rounded-md" />
                    )}
                    <button
                      onClick={handleDownloadQr}
                      data-testid="btn-download-qr"
                      disabled={!qrCodeDataUrl}
                      className="inline-flex items-center gap-2 h-9 px-4 border border-border bg-transparent text-sm font-medium rounded-[2px] hover:bg-white/5 transition-colors disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      Download QR
                    </button>
                  </div>
                </div>
              </div>

              {/* Asset: Email */}
              <div className="bg-card border rounded-md overflow-hidden">
                <div className="bg-white/5 border-b px-6 py-4 flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Follow-up
                  </h3>
                  <button
                    onClick={handleCopyEmail}
                    data-testid="btn-copy-email"
                    className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                    {copiedEmail ? 'Copied' : 'Copy to clipboard'}
                  </button>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-foreground/80 whitespace-pre-wrap font-sans bg-black/20 p-4 rounded-md border border-white/5">
                    {emailTemplate}
                  </pre>
                </div>
              </div>

              {/* Asset: SMS */}
              <div className="bg-card border rounded-md overflow-hidden">
                <div className="bg-white/5 border-b px-6 py-4 flex items-center justify-between">
                  <h3 className="font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    SMS Follow-up
                  </h3>
                  <button
                    onClick={handleCopySms}
                    data-testid="btn-copy-sms"
                    className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedSms ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                    {copiedSms ? 'Copied' : 'Copy to clipboard'}
                  </button>
                </div>
                <div className="p-6">
                  <pre className="text-sm text-foreground/80 whitespace-pre-wrap font-sans bg-black/20 p-4 rounded-md border border-white/5">
                    {smsTemplate}
                  </pre>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function AdminReviews() {
  return (
    <>
      <Show when="signed-in">
        <ReviewGenerator />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}
