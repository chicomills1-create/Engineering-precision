import { useState } from 'react';
import { Upload } from 'lucide-react';
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
};

export function VerifiedInventoryImport() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [report, setReport] = useState<ImportReport | null>(null);
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

  return (
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
  );
}