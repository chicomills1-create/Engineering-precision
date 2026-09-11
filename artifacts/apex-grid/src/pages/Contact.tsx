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
import { usePageMeta, useJsonLd } from "@/lib/seo";
import { Check, FileText, Loader2, Upload, X } from "lucide-react";

const ACCEPTED_TYPES = ".pdf,.dwg,.dxf,.rvt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.jpg,.jpeg,.png,.tif,.tiff";

interface UploadedFile {
  name: string;
  objectPath: string;
}

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(3, "Email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  services: z.string().optional(),
  message: z.string().min(1, "Project details are required"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const PAGE_META = {
  title: "Contact Us | Request an Engineering Proposal | Apex Grid",
  description: "Start your project with Apex Grid Engineering. Request a proposal for architectural, MEP, structural, or civil design services — initial review response typically within 12-24 hours for most standard requests.",
  path: "/contact",
};

const DOCUMENT_CHECKLIST = [
  "Architectural drawings (PDF and CAD/DWG preferred)",
  "Site plan and survey",
  "Existing / as-built drawings (for renovations)",
  "Geotechnical / soils report (if applicable)",
  "Project scope or Statement of Work (SOW)",
  "Specifications and bid documents (if applicable)",
  "Any existing engineering drawings (Structural, MEP, Civil)",
  "Desired project schedule and permit jurisdiction",
];

export default function Contact() {
  usePageMeta(PAGE_META);

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Apex Grid Engineering",
    "url": "https://apexgrideng.com/",
    "email": "info@apexgrideng.com",
    "telephone": "+1-480-490-0064",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "22475 E Quintero Rd",
      "addressLocality": "Queen Creek",
      "addressRegion": "AZ",
      "postalCode": "85142",
      "addressCountry": "US",
    },
    "areaServed": [
      "United States",
      "Arizona",
      "California",
      "Texas",
      "Florida",
      "Nevada",
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00",
  });

  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createLead = useCreateLead();

  /** Upload a file directly through the server (proxied — no presigned URL). */
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

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      projectType: "",
      services: "",
      message: "",
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

  const onSubmit = async (data: LeadFormValues) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const partnerCode = params.get("partner") || undefined;
      await createLead.mutateAsync({
        data: {
          ...data,
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
        description: uploadedFiles.length > 0
          ? "Your uploaded documents are still attached. Please try submitting again."
          : "There was an error submitting your request. Please try again.",
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-[80vh] items-center justify-center pt-20 pb-32 bg-background">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Request Received</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
             Your project details have been logged in our system. A lead engineer will review your requirements and contact you within 12–24 hours for most standard requests.
          </p>
          <button
            onClick={() => {
              form.reset();
              setUploadedFiles([]);
              setIsSuccess(false);
            }}
            className="h-14 px-8 border border-border text-foreground font-bold text-sm uppercase tracking-wider hover:bg-card transition-colors"
          >
            Submit Another Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="font-mono text-sm tracking-widest text-primary uppercase">
              Initiate Project
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
            Project <span className="text-muted-foreground">Intake</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            Provide the specifics of your project below. Our team will review the scope and provide a comprehensive proposal.
          </p>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="john@company.com" type="email" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Architecture & Co." className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-14 bg-background border-border rounded-none focus:ring-primary">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none border-border">
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="residential">Multi-Family Residential</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="services"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Required Services</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-14 bg-background border-border rounded-none focus:ring-primary">
                                <SelectValue placeholder="Select services" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none border-border">
                              <SelectItem value="mep">MEP Only</SelectItem>
                              <SelectItem value="structural">Structural Only</SelectItem>
                              <SelectItem value="civil">Civil Only</SelectItem>
                              <SelectItem value="multi">Multi-Discipline (Full Stack)</SelectItem>
                              <SelectItem value="title24">Title 24 / Energy</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Details *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Square footage, location, timeline, and specific engineering requirements..."
                            className="min-h-[160px] bg-background border-border rounded-none focus-visible:ring-primary resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Document Upload */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Project Documents</p>
                      <div className="bg-background border border-border/60 p-5 mb-4">
                        <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                          To help us get started quickly, please provide the following <span className="text-foreground font-medium">(if available)</span>
                        </p>
                        <ul className="space-y-2">
                          {DOCUMENT_CHECKLIST.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                              <span className="text-primary mt-[3px] shrink-0">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50 leading-relaxed">
                          Don't have everything yet? No problem. Send us what you have and our team will review the information and let you know what additional documents are needed to move your project forward.
                        </p>
                      </div>
                    </div>

                    {/* Drop zone */}
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label="Upload project documents"
                      data-testid="button-upload-project-documents"
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
                          Drag & drop files here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DWG, DXF, RVT, DOC, XLS, ZIP, images — up to 20 MB each
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
                    className="h-16 w-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {createLead.isPending ? "Submitting..." : uploadingFiles.size > 0 ? "Uploading Files…" : "Submit Project Intake"}
                  </button>
                </form>
              </Form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-background border border-border p-8 sticky top-32">
                <h3 className="font-display text-xl font-bold mb-6">Direct Contact</h3>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Bidding & Proposals</h4>
                    <a href="mailto:info@apexgrideng.com" className="text-primary hover:underline">info@apexgrideng.com</a>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">General Inquiries</h4>
                    <p className="text-foreground">info@apexgrideng.com</p>
                    <p className="text-foreground">(480) 490-0064</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Business-provided contact</h4>
                    <p className="text-foreground">22475 E Quintero Rd</p>
                    <p className="text-foreground">Queen Creek, AZ 85142</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Key Service Areas</h4>
                    <ul className="space-y-2 text-sm text-foreground/80">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-[3px]">▸</span>
                        <span>Los Angeles, CA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-[3px]">▸</span>
                        <span>Miami, FL</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-[3px]">▸</span>
                        <span>Houston, TX</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-3">Service availability and stamping are confirmed per project after individual license, firm authorization, discipline, and AHJ requirements are verified.</p>
                  </div>

                  <div className="pt-8 border-t border-border">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Response Time</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our intake team processes new project submissions daily. You can expect an initial review response within 12–24 hours for most standard requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
