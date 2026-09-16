import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePageMeta } from "@/lib/seo";
import { Check, FileText, Loader2, Upload, X, ShieldCheck, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const ACCEPTED_TYPES = ".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff";

interface UploadedFile {
  name: string;
  objectPath: string;
}

const rfpSchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().optional(),
  organization: z.string().min(1, "Issuing organization is required"),
  packageType: z.string().min(1, "Package type is required"),
  solicitationNumber: z.string().optional(),
  projectNameLocation: z.string().min(1, "Project name/location is required"),
  responseDueDate: z.string().min(1, "Response due date is required"),
  requestedDisciplines: z.string().min(1, "Requested disciplines are required"),
  scopeOfWork: z.string().min(1, "Scope of work is required"),
  notes: z.string().optional(),
});

type RfpFormValues = z.infer<typeof rfpSchema>;

const PAGE_META = {
  title: "Submit an RFP or RFQ Package | Apex Grid Engineering",
  description: "Prime contractors and procurement teams can securely submit active RFP or RFQ packages, project requirements, and supporting files for engineering review.",
  path: "/procurement/submit-rfp-rfq/",
};

const DOCUMENT_CHECKLIST = [
  "Full Solicitation / RFQ / RFP Document",
  "Statement of Work (SOW) or Scope Requirements",
  "Available Architectural or Existing Engineering Drawings",
  "Evaluation Criteria or Submittal Instructions",
  "Teaming Agreement Templates (if applicable)",
];

const FAQS = [
  {
    q: "What types of solicitations and packages do you review?",
    a: "We evaluate Requests for Proposals, Requests for Qualifications, Requests for Information, and Sources Sought notices when the requested scope may align with our engineering services. Each opportunity is reviewed for location, discipline, schedule, and contracting requirements."
  },
  {
    q: "What documents are required for a complete submission?",
    a: "A complete package should include the full solicitation document, statement of work (SOW), any available architectural or existing engineering drawings, site plans, and the specific evaluation criteria or deliverables required for the response."
  },
  {
    q: "How do you handle jurisdictional licensing requirements for active solicitations?",
    a: "We verify professional engineering licensure, firm authorization, and any jurisdiction-specific regulatory requirements prior to committing to a proposal. Ensure the project location is clearly stated in your submission so this evaluation can occur."
  },
  {
    q: "What socio-economic designations does Apex Grid Engineering hold?",
    a: "Apex Grid Engineering is a veteran-owned business. Contracting officers and prime contractors should verify current SAM.gov entity registration, representations, UEI/CAGE information, and applicable SBA size or socio-economic status directly in official records for the specific procurement vehicle."
  },
  {
    q: "How do you evaluate discipline and teaming needs?",
    a: "Our capabilities include structural, MEP, and civil engineering, with other disciplines evaluated according to the solicitation and proposed team. The responsible professionals, firm authorizations, and teaming roles are confirmed for the specific project before proposal."
  }
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://apexgrideng.com/procurement/submit-rfp-rfq/#faq",
  "mainEntity": FAQS.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a,
    },
  })),
};

export default function RfpRfqSubmission() {
  usePageMeta(PAGE_META);

  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createLead = useCreateLead();

  const uploadFileDirect = useCallback(async (file: File): Promise<{ objectPath: string } | null> => {
    const response = await fetch("/api/storage/uploads", {
      method: "POST",
      headers: { "x-file-name": encodeURIComponent(file.name) },
      body: file,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({})) as { error?: string };
      throw new Error(err.error ?? "Upload failed");
    }
    return response.json() as Promise<{ objectPath: string }>;
  }, []);

  const form = useForm<RfpFormValues>({
    resolver: zodResolver(rfpSchema),
    defaultValues: {
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      organization: "",
      packageType: "",
      solicitationNumber: "",
      projectNameLocation: "",
      responseDueDate: "",
      requestedDisciplines: "",
      scopeOfWork: "",
      notes: "",
    },
  });

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;
    for (const file of fileArray) {
      if (file.size > MAX_UPLOAD_BYTES) {
        toast({ variant: "destructive", title: "File Too Large", description: `${file.name} exceeds the 20 MB limit.` });
        continue;
      }
      const key = `${file.name}-${file.size}`;
      setUploadingFiles(prev => new Set(prev).add(key));
      try {
        const result = await uploadFileDirect(file);
        if (result) {
          setUploadedFiles(prev => [...prev, { name: file.name, objectPath: result.objectPath }]);
        } else {
          toast({ variant: "destructive", title: "Upload Failed", description: `Could not upload ${file.name}. Please try again.` });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : `Could not upload ${file.name}.`;
        toast({ variant: "destructive", title: "Upload Failed", description: msg });
      } finally {
        setUploadingFiles(prev => { const next = new Set(prev); next.delete(key); return next; });
      }
    }
  }, [uploadFileDirect, toast]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeFile = (objectPath: string) => {
    setUploadedFiles(prev => prev.filter(f => f.objectPath !== objectPath));
  };

  const onSubmit = async (data: RfpFormValues) => {
    if (uploadedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Required File Missing",
        description: "Please upload at least one solicitation package document.",
      });
      return;
    }

    try {
      const params = new URLSearchParams(window.location.search);
      const partnerCode = params.get("partner") || undefined;
      
      const message = [
        `Solicitation Number: ${data.solicitationNumber || 'N/A'}`,
        `Project Name & Location: ${data.projectNameLocation}`,
        `Response Due Date: ${data.responseDueDate}`,
        ``,
        `Apex Grid Scope of Work:`,
        data.scopeOfWork,
        ``,
        `Additional Notes:`,
        data.notes || 'None'
      ].join('\n');

      await createLead.mutateAsync({
        data: {
          name: data.contactName,
          email: data.contactEmail,
          company: data.organization,
          phone: data.contactPhone,
          projectType: data.packageType,
          services: data.requestedDisciplines,
          message,
          attachments: uploadedFiles.map(f => f.objectPath),
          source: params.get("utm_source") || (document.referrer ? "referral" : "direct"),
          medium: params.get("utm_medium") || undefined,
          campaign: params.get("utm_campaign") || undefined,
          landingPath: `${window.location.pathname}${window.location.search}`,
          referrer: document.referrer || undefined,
          referralPartnerCode: partnerCode,
        },
      });

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your package. Please try again.",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-[80vh] items-center justify-center pt-20 pb-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-grid-white opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
        <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Package Submitted</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Your solicitation package has been securely logged. Our engineering team will review the requirements and evaluate our capacity to provide a compliant response.
          </p>
          <button
            onClick={() => {
              form.reset();
              setUploadedFiles([]);
              setIsSuccess(false);
            }}
            className="h-14 px-8 border border-border text-foreground font-bold text-sm uppercase tracking-wider hover:bg-card transition-colors"
          >
            Submit Another Package
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <section className="pt-32 pb-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-grid-white opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="font-mono text-sm tracking-widest text-primary uppercase">
              Procurement
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
            RFP & RFQ Package <span className="text-muted-foreground">Submission</span>
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground border-l-2 border-primary/30 pl-4 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <span className="font-mono uppercase tracking-widest text-xs">By Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran</span>
          </div>
          <p className="text-xl text-foreground/80 max-w-4xl leading-relaxed italic">
            "I built Apex Grid to treat procurement requirements with the same discipline we bring to engineering work. Upload the complete package here so I can review the scope, location, disciplines, deadline, and contracting requirements against our current capacity and project-specific authorization before we commit to a response."
          </p>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Contact Information */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-primary border-b border-border pb-2">Point of Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Contact Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Contact Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@company.com" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="organization"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Issuing Organization *</FormLabel>
                            <FormControl>
                              <Input placeholder="Agency or Prime Contractor Name" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Contact Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Solicitation Details */}
                  <div className="space-y-6 pt-6">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-primary border-b border-border pb-2">Solicitation Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="packageType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Package Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 bg-background border-border rounded-none focus:ring-primary">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-none border-border">
                                <SelectItem value="rfp">Request for Proposal (RFP)</SelectItem>
                                <SelectItem value="rfq">Request for Qualifications (RFQ)</SelectItem>
                                <SelectItem value="rfi">Request for Information (RFI)</SelectItem>
                                <SelectItem value="sources-sought">Sources Sought</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="solicitationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Solicitation / Reference #</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., W9128F-24-R-0001" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="projectNameLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Name & Location *</FormLabel>
                            <FormControl>
                              <Input placeholder="Facility Name, City, State / Installation" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="responseDueDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Response Due Date *</FormLabel>
                            <FormControl>
                              <Input type="date" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="requestedDisciplines"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Requested Disciplines *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 bg-background border-border rounded-none focus:ring-primary">
                                  <SelectValue placeholder="Select disciplines" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rounded-none border-border">
                                <SelectItem value="structural">Structural Engineering</SelectItem>
                                <SelectItem value="mep">MEP Engineering</SelectItem>
                                <SelectItem value="civil">Civil Engineering</SelectItem>
                                <SelectItem value="multi">Multi-Discipline (Full Stack)</SelectItem>
                                <SelectItem value="other">Other / TBD</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="scopeOfWork"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Apex Grid Scope of Work *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Briefly describe the exact engineering scope expected from Apex Grid..."
                                className="min-h-[120px] bg-background border-border rounded-none focus-visible:ring-primary resize-none p-4"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any specific socio-economic set-asides, teaming requirements, or compliance notes..."
                                className="min-h-[100px] bg-background border-border rounded-none focus-visible:ring-primary resize-none p-4"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="space-y-4 pt-6">
                    <div>
                      <h3 className="text-sm font-mono uppercase tracking-widest text-primary border-b border-border pb-2 mb-4">Package Files & Documents *</h3>
                      <div className="bg-background border border-border/60 p-5 mb-4">
                        <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                          Please provide the following to ensure a complete evaluation:
                        </p>
                        <ul className="space-y-2">
                          {DOCUMENT_CHECKLIST.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                              <span className="text-primary mt-[3px] shrink-0">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Drop zone */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Upload package documents"
                      data-testid="button-upload-package-documents"
                      className={`border-2 border-dashed transition-colors cursor-pointer ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={onDrop}
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                    >
                      <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                          Drag & drop solicitation files here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOC, ZIP, DWG — up to 20 MB each
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={ACCEPTED_TYPES}
                      className="hidden"
                      onChange={(e) => e.target.files && handleFiles(e.target.files)}
                    />

                    {/* Uploading indicators */}
                    {uploadingFiles.size > 0 && (
                      <div className="space-y-2">
                        {Array.from(uploadingFiles).map((key) => (
                          <div key={key} className="flex items-center gap-3 bg-background border border-border px-4 py-3">
                            <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
                            <span className="text-sm text-muted-foreground truncate">{key.split("-").slice(0, -1).join("-")}</span>
                            <span className="text-xs text-primary ml-auto shrink-0">Uploading…</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Uploaded files list */}
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        {uploadedFiles.map((file) => (
                          <div key={file.objectPath} className="flex items-center gap-3 bg-background border border-primary/20 px-4 py-3">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            <button
                              type="button"
                              onClick={() => removeFile(file.objectPath)}
                              className="ml-2 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                              aria-label="Remove file"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={createLead.isPending || uploadingFiles.size > 0}
                    className="h-16 w-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 mt-8"
                  >
                    {createLead.isPending ? "Submitting..." : uploadingFiles.size > 0 ? "Uploading Files…" : "Submit Solicitation Package"}
                  </button>
                </form>
              </Form>
            </div>

            {/* Sidebar / Contextual Links */}
            <div className="lg:col-span-1">
              <div className="bg-background border border-border p-8 sticky top-32">
                <h3 className="font-display text-xl font-bold mb-6">Procurement Resources</h3>
                <ul className="space-y-4">
                  {[
                    { label: "Procurement Overview", path: "/procurement/" },
                    { label: "Firm Capabilities", path: "/capabilities" },
                    { label: "Licensing & Coverage", path: "/licensing-service-coverage/" },
                    { label: "Prime Contractor Teaming", path: "/for-contractors" },
                    { label: "Engineering Estimator", path: "/estimate/" },
                  ].map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.path} className="group flex items-center text-sm text-foreground/80 hover:text-primary transition-colors">
                        <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary mr-2 transition-colors shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a href="/capabilities-statement.html" target="_blank" rel="noopener noreferrer" className="group flex items-center text-sm text-foreground/80 hover:text-primary transition-colors">
                      <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary mr-2 transition-colors shrink-0" />
                      Capabilities Statement (PDF)
                    </a>
                  </li>
                </ul>

                <div className="mt-10 pt-8 border-t border-border">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Direct Communication</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                    For time-sensitive procurement communications or addenda updates after submission:
                  </p>
                  <a href="mailto:info@apexgrideng.com" className="text-primary hover:underline text-sm font-medium">info@apexgrideng.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-[1px] bg-primary"></div>
            <h2 className="font-mono text-sm tracking-widest text-primary uppercase">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-bold text-foreground leading-snug">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-5">
            Need Budgetary Pricing Before the Solicitation?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Use the engineering estimator for a non-binding planning range. Active RFP and RFQ packages should be submitted through the form above.
          </p>
          <Link
            href="/estimate/"
            className="inline-flex h-14 px-8 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider items-center justify-center hover:bg-primary/90 transition-colors"
          >
            Open the Engineering Estimator
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
