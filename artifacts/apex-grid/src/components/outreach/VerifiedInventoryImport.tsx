import { useState } from 'react';
import { Eye, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

export function VerifiedInventoryImport() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [report, setReport] = useState<ImportReport | null>(null);
  const [publicPreview, setPublicPreview] = useState<ImportReport | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const { toast } = useToast();

  async function runImport() {
    if (!file) return;
    setImporting(true);
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
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Import failed');
      setReport(result);
      toast({
        title: result.idempotent ? 'Import already completed' : 'Verified contacts imported',
        description: `${result.namedEligible} new prospects; ${result.excluded} excluded.`,
      });
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
    if (!publicPreview?.batchId || !publicPreview.acceptedDigest || !publicPreview.confirmationToken) return;
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