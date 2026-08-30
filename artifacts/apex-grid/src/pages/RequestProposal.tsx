import { useState } from "react";
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
import { Check, Loader2, ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

const proposalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectLocation: z.string().min(1, "Project location is required"),
  projectType: z.string().min(1, "Project type is required"),
  services: z.string().min(1, "Required service is required"),
  projectDetails: z.string().min(1, "Project details are required"),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

const PAGE_META = {
  title: "Request a Proposal | Apex Grid Engineering",
  description: "Get a clear, decisive engineering proposal for your commercial, structural, MEP, or civil project. Initial review response typically within 12-24 hours for most standard requests.",
  path: "/request-proposal",
};

export default function RequestProposal() {
  usePageMeta(PAGE_META);

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Request an Engineering Proposal",
    "description": "Submit your project requirements for a structural, MEP, or civil engineering proposal from Apex Grid.",
    "publisher": {
      "@type": "Organization",
      "name": "Apex Grid Engineering"
    }
  });

  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const createLead = useCreateLead();

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      projectLocation: "",
      projectType: "",
      services: "",
      projectDetails: "",
    },
  });

  const onSubmit = async (data: ProposalFormValues) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const partnerCode = params.get("partner") || undefined;
      
      const message = `Location: ${data.projectLocation}\n\nDetails:\n${data.projectDetails}`;
      
      await createLead.mutateAsync({
        data: {
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          projectType: data.projectType,
          services: data.services,
          message,
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
        description: "There was an error submitting your request. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <section className="pt-24 md:pt-32 pb-20 bg-background min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 pointer-events-none bg-grid-white opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
        
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column - Context */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-12 h-[1px] bg-primary"></div>
                <span className="font-mono text-sm tracking-widest text-primary uppercase">
                  Fast-Track Intake
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                Request an Engineering <span className="text-muted-foreground">Proposal</span>
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
                Tell us about your project, and our PE-led team will review your requirements to provide a clear, actionable proposal.
              </p>

              <div className="lg:hidden flex flex-wrap gap-x-5 gap-y-2 border-y border-border py-4 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                <span>12-24h for most standard requests</span>
                <span>PE-led review</span>
              </div>

              <div className="hidden lg:block space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">12-24 Hour Initial Response</h3>
                    <p className="text-muted-foreground leading-relaxed">Our senior engineers process new requests daily for rapid turnaround on standard inquiries.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">PE-Led Expertise</h3>
                    <p className="text-muted-foreground leading-relaxed">Your project is evaluated by experienced, licensed professionals from day one.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300 fill-mode-both">
              <div className="bg-card border border-border p-6 md:p-10 lg:p-12 shadow-2xl relative">
                
                {isSuccess ? (
                  <div className="flex flex-col items-center text-center py-12 px-4 animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
                      <Check className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">Request Received</h3>
                    <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
                      Your project details have been logged in our system. A lead engineer will review your requirements and follow up within 12-24 hours for most standard requests.
                    </p>
                    <button
                      onClick={() => {
                        form.reset();
                        setIsSuccess(false);
                      }}
                      className="h-14 px-8 border border-border text-foreground font-bold text-xs uppercase tracking-widest hover:bg-background transition-colors"
                    >
                      Submit Another Project
                    </button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <Input type="tel" placeholder="(555) 123-4567" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <FormField
                          control={form.control}
                          name="projectLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Location *</FormLabel>
                              <FormControl>
                                <Input placeholder="City, State or Full Address" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="projectType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Type *</FormLabel>
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
                                  <SelectItem value="government">Government / Military</SelectItem>
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
                              <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Required Services *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-14 bg-background border-border rounded-none focus:ring-primary">
                                    <SelectValue placeholder="Select services" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-none border-border">
                                  <SelectItem value="structural">Structural Engineering</SelectItem>
                                  <SelectItem value="mep">MEP Engineering</SelectItem>
                                  <SelectItem value="civil">Civil Engineering</SelectItem>
                                  <SelectItem value="architecture">Architectural Support</SelectItem>
                                  <SelectItem value="multi">Multi-Discipline (Full Stack)</SelectItem>
                                  <SelectItem value="assessment">Building Assessment</SelectItem>
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
                          name="projectDetails"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Details *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Square footage, timeline, key challenges, or specific engineering requirements..."
                                  className="min-h-[140px] bg-background border-border rounded-none focus-visible:ring-primary resize-none p-4"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={createLead.isPending}
                        className="h-16 w-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 mt-4"
                      >
                        {createLead.isPending ? (
                          <><Loader2 className="w-5 h-5 animate-spin mr-3" /> Processing...</>
                        ) : (
                          "Submit Request"
                        )}
                      </button>
                    </form>
                  </Form>
                )}
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-card border border-border gap-6 animate-in fade-in duration-700 delay-700 fill-mode-both">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Have plans or drawings to upload?</h4>
                  <p className="text-xs text-muted-foreground mt-1">Use our comprehensive intake portal for file attachments.</p>
                </div>
                <Link href="/contact" className="h-12 px-6 bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 flex items-center text-xs font-mono uppercase tracking-widest shrink-0 transition-colors">
                  Full Intake <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
