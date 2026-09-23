import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePageMeta, useJsonLd } from "@/lib/seo";
import { Check, Loader2, Stamp, PencilRuler, Calculator } from "lucide-react";

const proposalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  need: z.string().min(1, "Tell us what you need"),
  projectLocation: z.string().min(1, "Project location is required"),
  projectDetails: z.string().min(1, "Project details are required"),
});

type ProposalFormValues = z.infer<typeof proposalSchema>;

const PAGE_META = {
  title: "Request a Proposal | Apex Grid Engineering",
  description: "Request an engineering proposal — what you need, your details, done. Response within 12–24 hours for most standard requests.",
  path: "/request-proposal",
};

const NEEDS = [
  { value: "pe-stamp", icon: Stamp, label: "Stamp my plans" },
  { value: "design", icon: PencilRuler, label: "Design my project" },
  { value: "calculations", icon: Calculator, label: "Run the numbers" },
];

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
      need: "",
      projectLocation: "",
      projectDetails: "",
    },
  });

  const selectedNeed = form.watch("need");

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
          services: data.need,
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
      <section className="pt-32 pb-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-white">
            Request a proposal
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Tell us what you need. We send back a clear proposal — scope, timeline, fee.
          </p>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-12 px-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4 text-white">Request received</h2>
              <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
                Your project is logged. A lead engineer will review it and follow up
                within 12–24 hours.
              </p>
              <button
                onClick={() => {
                  form.reset();
                  setIsSuccess(false);
                }}
                className="h-14 px-8 border border-border text-foreground font-bold text-xs uppercase tracking-widest hover:bg-background transition-colors rounded-sm"
              >
                Submit Another Project
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                {/* Step 1 — what do you need */}
                <div>
                  <FormLabel className="block text-lg font-display font-bold text-white mb-5">
                    1. What do you need?
                  </FormLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {NEEDS.map((need) => {
                      const active = selectedNeed === need.value;
                      return (
                        <button
                          key={need.value}
                          type="button"
                          onClick={() => form.setValue("need", need.value, { shouldValidate: true })}
                          aria-pressed={active}
                          className={`flex flex-col items-center gap-3 p-6 border-2 rounded-sm transition-colors min-h-[140px] justify-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                            active
                              ? "border-primary bg-primary/10"
                              : "border-border bg-background hover:border-primary/50"
                          }`}
                        >
                          <need.icon className={`w-8 h-8 ${active ? "text-primary" : "text-muted-foreground"}`} strokeWidth={1.5} />
                          <span className={`font-bold ${active ? "text-white" : "text-foreground/80"}`}>{need.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {form.formState.errors.need && (
                    <p className="mt-3 text-sm text-destructive">{form.formState.errors.need.message}</p>
                  )}
                </div>

                {/* Step 2 — your info */}
                <div>
                  <div className="text-lg font-display font-bold text-white mb-5">2. Your info</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Your name *" className="h-14 bg-background border-border rounded-sm focus-visible:ring-primary text-base" {...field} />
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
                          <FormControl>
                            <Input type="email" placeholder="Email *" className="h-14 bg-background border-border rounded-sm focus-visible:ring-primary text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Company (optional)" className="h-14 bg-background border-border rounded-sm focus-visible:ring-primary text-base" {...field} />
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
                          <FormControl>
                            <Input type="tel" placeholder="Phone (optional)" className="h-14 bg-background border-border rounded-sm focus-visible:ring-primary text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Step 3 — project */}
                <div>
                  <div className="text-lg font-display font-bold text-white mb-5">3. The project</div>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="projectLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Project location — city, state *" className="h-14 bg-background border-border rounded-sm focus-visible:ring-primary text-base" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="projectDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="What are you building? Size, timeline, anything we should know? *"
                              className="min-h-[140px] bg-background border-border rounded-sm focus-visible:ring-primary resize-none p-4 text-base"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={createLead.isPending}
                  className="h-16 w-full bg-primary text-white font-bold text-base uppercase tracking-wider flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 rounded-sm focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none"
                >
                  {createLead.isPending ? (
                    <><Loader2 className="w-5 h-5 animate-spin mr-3" /> Sending...</>
                  ) : (
                    "Send It"
                  )}
                </button>
              </form>
            </Form>
          )}
        </div>
      </section>
    </div>
  );
}
