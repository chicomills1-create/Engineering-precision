import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePageMeta, useJsonLd } from "@/lib/seo";
import { APEX_GRID_BUSINESS_SCHEMA } from "@/lib/business-schema";
import { Check, Stamp, PencilRuler, Calculator } from "lucide-react";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(3, "Email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  need: z.string().min(1, "Tell us what you need"),
  message: z.string().min(1, "Project details are required"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const PAGE_META = {
  title: "Contact Us | Apex Grid Engineering",
  description: "Get in touch with Apex Grid Engineering. Send us a message and we'll get back to you within 12–24 hours.",
  path: "/contact",
};

/** Big tap cards instead of dropdowns — "what do you need?" */
const NEEDS = [
  { value: "pe-stamp", icon: Stamp, label: "Stamp my plans" },
  { value: "design", icon: PencilRuler, label: "Design my project" },
  { value: "calculations", icon: Calculator, label: "Run the numbers" },
];

export default function Contact() {
  usePageMeta(PAGE_META);
  useJsonLd(APEX_GRID_BUSINESS_SCHEMA);

  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const createLead = useCreateLead();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      need: "",
      message: "",
    },
  });

  const selectedNeed = form.watch("need");

  const onSubmit = async (data: LeadFormValues) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const partnerCode = params.get("partner") || undefined;
      await createLead.mutateAsync({
        data: {
          name: data.name,
          email: data.email,
          company: data.company,
          phone: data.phone,
          services: data.need,
          message: data.message,
          attachments: [],
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
        description: "There was an error submitting your message. Please try again.",
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
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Got it.</h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Your message is on its way. We'll get back to you within 12–24 hours.
          </p>
          <button
            onClick={() => {
              form.reset();
              setIsSuccess(false);
            }}
            className="h-14 px-8 border border-border text-foreground font-bold text-sm uppercase tracking-wider hover:bg-card transition-colors rounded-sm"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6 text-white">
            Get in touch
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Send us a message — we'll get back to you within 12–24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

              {/* Step 1 — what do you need (tap cards) */}
              <div>
                <span className="block text-lg font-display font-bold text-white mb-5">
                  1. What do you need?
                </span>
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
                          <Input placeholder="Email *" type="email" className="h-14 bg-background border-border rounded-sm focus-visible:ring-primary text-base" {...field} />
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
                          <Input placeholder="Phone (optional)" type="tel" className="h-14 bg-background border-border rounded-sm focus-visible:ring-primary text-base" {...field} />
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
                </div>
              </div>

              {/* Step 3 — your message */}
              <div>
                <div className="text-lg font-display font-bold text-white mb-5">3. Your message</div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="What can we help you with? *"
                          className="min-h-[140px] bg-background border-border rounded-sm focus-visible:ring-primary resize-none text-base p-4"
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
                className="h-16 w-full bg-primary text-white font-bold text-base uppercase tracking-wider flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 rounded-sm focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none"
              >
                {createLead.isPending ? "Sending..." : "Send Message"}
              </button>
              <p className="text-center text-sm text-muted-foreground -mt-6">
                Prefer email? <a href="mailto:info@apexgrideng.com" className="text-primary hover:underline">info@apexgrideng.com</a>
                {" · "}(480) 490-0064
              </p>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}
