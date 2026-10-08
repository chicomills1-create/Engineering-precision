import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { useCreateClientJob, type ClientJobDocumentInput } from "@workspace/api-client-react";
import { ArrowRight, CheckCircle2, FileUp, Loader2, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = new Set([
  "pdf", "dwg", "dxf", "rvt", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
  "zip", "jpg", "jpeg", "png", "tif", "tiff",
]);

type UploadedDoc = ClientJobDocumentInput & { size: number };

/**
 * Homepage plan drop zone — GCs think in drawings, not forms.
 * Uploads straight to /api/client/uploads (anonymous OK), then files a
 * lightweight quote request through the same client-job API as /submit-project.
 */
export function PlanDropZone() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createJob = useCreateClientJob();

  const uploadFiles = async (files: FileList | File[] | null) => {
    if (!files?.length) return;
    setUploading(true);
    setUploadError("");
    try {
      const uploaded: UploadedDoc[] = [];
      for (const file of Array.from(files)) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "";
        if (!ALLOWED_FILE_EXTENSIONS.has(extension)) {
          throw new Error(
            `${file.name} is not supported. Use PDF, DWG, DXF, Revit, image, Office, or ZIP files.`
          );
        }
        if (file.size > MAX_FILE_BYTES) {
          throw new Error(`${file.name} exceeds the 20 MB per-file limit.`);
        }
        const response = await fetch("/api/client/uploads", {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            "x-file-name": encodeURIComponent(file.name),
          },
          body: file,
        });
        const result = (await response.json()) as {
          objectPath?: string;
          name?: string;
          uploadToken?: string;
          error?: string;
        };
        if (!response.ok || !result.objectPath || !result.uploadToken) {
          throw new Error(result.error || `Could not upload ${file.name}`);
        }
        uploaded.push({
          objectPath: result.objectPath,
          name: result.name || file.name,
          uploadToken: result.uploadToken,
          size: file.size,
        });
      }
      setDocuments((current) => [...current, ...uploaded].slice(0, 20));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "File upload failed.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    void uploadFiles(event.dataTransfer.files);
  };

  const removeDoc = (token: string) => {
    setDocuments((current) => current.filter((d) => d.uploadToken !== token));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (documents.length === 0 || uploading || createJob.isPending) return;
    createJob.mutate(
      {
        data: {
          submitterName: name,
          submitterEmail: email,
          submitterPhone: "",
          companyName: "",
          projectType: "Plan review / quote request",
          projectLocation: "",
          scope: note || "Plans uploaded from homepage drop zone.",
          timeline: "",
          budgetContext: "",
          services: "Plan review / quote request",
          documents: documents.map(({ size: _size, ...doc }) => doc),
        },
      },
      { onSuccess: () => setSubmitted(true) }
    );
  };

  if (submitted) {
    return (
      <div className="border border-primary/30 bg-card p-8 md:p-10 text-center rounded-sm">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-6" />
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
          Plans received.
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-2">
          A licensed engineering lead is reviewing your drawings.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Quote back within <span className="text-white font-semibold">12–24 hours</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-sm p-8 md:p-12 text-center cursor-pointer transition-colors ${
          dragging
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/60 bg-card/60"
        }`}
        role="button"
        aria-label="Drop your drawings here or click to browse"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff"
          className="hidden"
          onChange={(e) => void uploadFiles(e.target.files)}
        />
        <UploadCloud className="w-12 h-12 text-primary mx-auto mb-4" strokeWidth={1.5} />
        <p className="text-xl md:text-2xl font-display font-bold text-white mb-2">
          Drop your drawings here
        </p>
        <p className="text-sm text-muted-foreground">
          PDF, DWG, DXF, Revit, images, Office, or ZIP — up to 20 MB each.
          Quote back in 12–24 hours.
        </p>
      </div>

      {uploadError && (
        <p className="mt-4 text-sm text-red-400" role="alert">{uploadError}</p>
      )}

      {documents.length > 0 && (
        <ul className="mt-4 border border-border rounded-sm divide-y divide-border bg-card">
          {documents.map((doc) => (
            <li key={doc.uploadToken} className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="flex items-center gap-3 min-w-0">
                <FileUp className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-foreground truncate">{doc.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {(doc.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </span>
              <button
                type="button"
                onClick={() => removeDoc(doc.uploadToken)}
                className="p-1 text-muted-foreground hover:text-white rounded-sm"
                aria-label={`Remove ${doc.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dropzone-name" className="mb-2 block text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
            Your name *
          </label>
          <Input
            id="dropzone-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Jane Smith"
            className="h-12"
          />
        </div>
        <div>
          <label htmlFor="dropzone-email" className="mb-2 block text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
            Email *
          </label>
          <Input
            id="dropzone-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="jane@company.com"
            className="h-12"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="dropzone-note" className="mb-2 block text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
          What do you need? <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <Textarea
          id="dropzone-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. PE stamp for permit set, 4,200 sq ft TI in Phoenix…"
          rows={3}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={documents.length === 0 || uploading || createJob.isPending || !name || !email}
        className="mt-6 w-full h-14 text-sm font-bold uppercase tracking-[0.15em]"
      >
        {uploading || createJob.isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Working…
          </>
        ) : (
          <>
            Send Plans — Get My Quote <ArrowRight className="w-5 h-5" />
          </>
        )}
      </Button>
      {createJob.isError && (
        <p className="mt-3 text-sm text-red-400" role="alert">
          Something went wrong sending your plans. Please email them to info@apexgrideng.com instead.
        </p>
      )}
    </form>
  );
}
