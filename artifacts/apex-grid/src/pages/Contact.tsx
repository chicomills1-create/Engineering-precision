import { usePageMeta } from "@/lib/seo";
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
import { Check } from "lucide-react";

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
  description: "Start your project with Apex Grid Engineering. Request a proposal for MEP, structural, or civil design services — we respond within one business day.",
  path: "/contact",
};

export default function Contact() {
  usePageMeta(PAGE_META);

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
      projectType: "",
      services: "",
      message: "",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      await createLead.mutateAsync({ data });
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
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
            Your project details have been logged in our system. A lead engineer will review your requirements and contact you within 24 hours.
          </p>
          <button 
            onClick={() => {
              form.reset();
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

                  <button 
                    type="submit" 
                    disabled={createLead.isPending}
                    className="h-16 w-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {createLead.isPending ? "Submitting..." : "Submit Project Intake"}
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
                    <p className="text-foreground">+1 (800) 555-0199</p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Headquarters</h4>
                    <p className="text-foreground">22475 E Quintero Rd</p>
                    <p className="text-foreground">Queen Creek, AZ 85142</p>
                  </div>

                  <div className="pt-8 border-t border-border">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Response Time</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our intake team processes new project submissions daily. You can expect a response or preliminary proposal within 1 business day for most standard requests.
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
