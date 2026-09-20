import { useState } from 'react';
import { Eye, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

type ImportReport = {
  sourceRows: number;
  namedEligible: number;
  excluded: number;
  exclusions: Record<string, number>;
  idempotent: boolean;
  batchId?: string;
  acceptedDigest?: string;
  confirmationToken?: string;
  publicEligible?: number;
  publicImported?: number;
};

type ImportProgress = {
  processed: number;
  total: number;
};

/**
 * Read a text/event-stream response body and invoke onEvent for each frame.
 * Throws if a terminal "error" event arrives; resolves when the stream ends.
 */
async function readImportStream(
  response: Response,
  onEvent: (event: string, data: any) => void,
): Promise<void> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Streaming is not supported in this browser.');
  const decoder = new TextDecoder();
  let buffer = '';
  const dispatchFrame = (frame: string) => {
    let eventName = '';
    const dataLines: string[] = [];
    for (const line of frame.split('\n')) {
      if (line.startsWith('event:')) eventName = line.slice(6).trim();
      else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
    }
    if (!eventName) return;
    try {
      onEvent(eventName, JSON.parse(dataLines.join('\n')));
    } catch {
      /* ignore malformed frame */
    }
  };
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx: number;
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      dispatchFrame(buffer.slice(0, idx));
      buffer = buffer.slice(idx + 2);
    }
  }
  if (buffer.trim()) dispatchFrame(buffer);
}

export function VerifiedInventoryImport() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState<ImportProgress | null>(null);
  const [report, setReport] = useState<ImportReport | null>(null);
  const [publicPreview, setPublicPreview] = useState<ImportReport | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { toast } = useToast();

  function duplicateCount(data: ImportReport): number {
    return (data.exclusions?.duplicate_email ?? 0) + (data.exclusions?.duplicate_domain ?? 0);
  }

  /** Fallback when the event stream drops mid-import: poll the batch status. */
  async function pollImportStatus(batchId: string | null) {
    if (!batchId) throw new Error('The import connection dropped before it could be tracked. Please try again.');
    const deadline = Date.now() + 10 * 60 * 1000;
    for (;;) {
      const statusResponse = await fetch(
        `${import.meta.env.BASE_URL}api/outreach/inventory/import-status/${batchId}`,
        { credentials: 'include' },
      );
      if (!statusResponse.ok) throw new Error('Could not check import status.');
      const status = await statusResponse.json();
      if (status.status === 'completed') {
        setProgress({ processed: status.sourceRowCount, total: status.sourceRowCount });
        const doneReport = { batchId, ...status.report } as ImportReport;
        setReport(doneReport);
        toast({
          title: 'Verified contacts imported',
          description: `Imported ${doneReport.namedEligible} new · ${duplicateCount(doneReport)} duplicates skipped.`,
        });
        return;
      }
      if (status.status === 'failed') throw new Error(status.error || 'Import failed');
      if (Date.now() > deadline) {
        toast({
          title: 'Import still running',
          description: 'The import is still processing on the server. Check back shortly.',
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  async function runImport() {
    if (!file) return;
    setImporting(true);
    setProgress(null);
    setReport(null);
    let batchId: string | null = null;
    let finished = false;
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/outreach/inventory/import-upload`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/csv',
          'X-Source-Filename': file.name,
        },
        body: await file.text(),
      });
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !contentType.includes('text/event-stream')) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || `Import failed (HTTP ${response.status})`);
      }
      await readImportStream(response, (event, data) => {
        if (event === 'start' || event === 'preparing') {
          batchId = data.batchId ?? batchId;
        } else if (event === 'progress') {
          setProgress({ processed: data.processed, total: data.total });
        } else if (event === 'done') {
          finished = true;
          setProgress({ processed: data.sourceRows, total: data.sourceRows });
          setReport(data);
          toast({
            title: data.idempotent ? 'Import already completed' : 'Verified contacts imported',
            description: `Imported ${data.namedEligible} new · ${duplicateCount(data)} duplicates skipped.`,
          });
        } else if (event === 'error') {
          finished = true;
          throw new Error(data.error || 'Import failed');
        }
      });
      if (!finished) {
        // Stream ended without a terminal event (connection cut) — the import
        // keeps running server-side; track it via the status endpoint.
        await pollImportStatus(batchId);
      }
    } catch (error) {
      toast({
        title: 'Import failed',
        description: error instanceof Error ? error.message : 'The CSV could not be imported.',
        variant: 'destructive',
      });
    } finally {
      setImporting(false);
    }
  }

  async function previewPublicCsv() {
    setPreviewing(true);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/outreach/inventory/public-preview`, {
        method: 'POST',
        credentials: 'include',
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Preview failed');
      setPublicPreview(result);
      toast({
        title: 'Public CSV preview ready',
        description: `${result.publicEligible} accepted; ${result.excluded} excluded. No data was written.`,
      });
    } catch (error) {
      toast({ title: 'Preview failed', description: error instanceof Error ? error.message : 'The CSV could not be previewed.', variant: 'destructive' });
    } finally {
      setPreviewing(false);
    }
  }

  async function confirmPublicImport() {
    if (!publicPreview?.batchId || !publicPreview?.acceptedDigest || !publicPreview.confirmationToken) return;
    setConfirming(true);
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/outreach/inventory/public-confirm`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-Preview-Batch-Id': publicPreview.batchId,
          'X-Preview-Accepted-Digest': publicPreview.acceptedDigest,
          'X-Preview-Confirmation-Token': publicPreview.confirmationToken,
          'X-Confirm-Import': 'yes',
        },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Import failed');
      setPublicPreview(result);
      toast({
        title: result.idempotent ? 'Public import already completed' : 'Public contacts imported',
        description: `${result.publicEligible} public prospects imported; ${result.excluded} excluded.`,
      });
    } catch (error) {
      toast({ title: 'Import failed', description: error instanceof Error ? error.message : 'The CSV could not be imported.', variant: 'destructive' });
    } finally {
      setConfirming(false);
    }
  }

  const progressPercent = progress && progress.total > 0
    ? Math.min(100, Math.round((progress.processed / progress.total) * 100))
    : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
    <Card data-testid="verified-inventory-import">
      <CardHeader>
        <CardTitle>Verified Inventory Import</CardTitle>
        <CardDescription>
          Upload the recovered FindyMail CSV. This records already-verified contacts without running verification,
          staging messages, or sending email.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            type="file"
            accept=".csv,text/csv"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              setReport(null);
              setProgress(null);
            }}
            data-testid="input-verified-inventory-csv"
          />
          <Button
            type="button"
            onClick={runImport}
            disabled={!file || importing}
            data-testid="button-import-verified-csv"
          >
            <Upload className="mr-2 h-4 w-4" />
            {importing ? 'Importing…' : 'Import Verified CSV'}
          </Button>
        </div>
        {(importing || progress) && (
          <div className="space-y-2" data-testid="verified-import-progress">
            <Progress value={progressPercent} />
            <p className="text-sm text-muted-foreground">
              {progress && progress.total > 0
                ? `${progressPercent}% · ${progress.processed.toLocaleString()} of ${progress.total.toLocaleString()} rows`
                : 'Preparing import…'}
            </p>
          </div>
        )}
        {report && (
          <div className="rounded-sm border border-border bg-muted/30 p-4 text-sm" data-testid="verified-import-report">
            <p className="font-semibold">{report.namedEligible} new prospects accepted</p>
            <p className="text-muted-foreground">{report.excluded} of {report.sourceRows} rows excluded</p>
            {Object.keys(report.exclusions).length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                {Object.entries(report.exclusions).map(([reason, count]) => (
                  <li key={reason}>{reason.replaceAll('_', ' ')}: {count}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
    <Card data-testid="public-inventory-import">
      <CardHeader>
        <CardTitle>Public-Lane Inventory Import</CardTitle>
        <CardDescription>
          Preview official, approved public role inboxes before importing. Preview is read-only; confirmation imports prospects without staging or sending email.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-sm border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
          Source: apex-public-import-426-fixed.csv · 426 public-lane rows
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={previewPublicCsv} disabled={previewing || confirming} data-testid="button-preview-public-csv">
            <Eye className="mr-2 h-4 w-4" />
            {previewing ? 'Previewing…' : 'Preview Public CSV'}
          </Button>
          <Button type="button" onClick={confirmPublicImport} disabled={!publicPreview?.batchId || confirming || Boolean(publicPreview.idempotent)} data-testid="button-confirm-public-import">
            <Upload className="mr-2 h-4 w-4" />
            {confirming ? 'Importing…' : 'Confirm Public Import'}
          </Button>
        </div>
        {publicPreview && (
          <div className="rounded-sm border border-border bg-muted/30 p-4 text-sm" data-testid="public-import-report">
            <p className="font-semibold">{publicPreview.publicEligible ?? publicPreview.publicImported ?? 0} public prospects accepted</p>
            <p className="text-muted-foreground">{publicPreview.excluded} of {publicPreview.sourceRows} rows excluded</p>
            {!publicPreview.idempotent && <p className="mt-2 text-xs text-amber-600">Review these counts, then use Confirm Public Import to write the accepted prospects.</p>}
            {Object.keys(publicPreview.exclusions).length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                {Object.entries(publicPreview.exclusions).map(([reason, count]) => (
                  <li key={reason}>{reason.replaceAll('_', ' ')}: {count}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}
