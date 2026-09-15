import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePageMeta } from "@/lib/seo";
import { Check, Loader2, ArrowRight, ArrowLeft, Calculator, FileText } from "lucide-react";
import { 
  ESTIMATE_PROJECT_TYPES, 
  SQFT_PROJECT_TYPES, 
  US_STATES,
  calculateEstimate,
  type EstimateResult
} from "@/lib/estimate-pricing";

const estimateSchema = z.object({
  projectType: z.enum(ESTIMATE_PROJECT_TYPES, {
    required_error: "Please select a project type",
  }),
  peBasis: z.enum(SQFT_PROJECT_TYPES).optional(),
  squareFootage: z.coerce.number().positive("Square footage must be greater than 0"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().optional(),
}).refine(data => {
  if (data.projectType === "PE stamp & plan review only" && !data.peBasis) {
    return false;
  }
  return true;
}, {
  message: "Please select what the PE stamp is for",
  path: ["peBasis"],
});

type EstimateFormValues = z.infer<typeof estimateSchema>;

const PAGE_META = {
  title: "Instant Ballpark Estimator | Apex Grid Engineering",
  description: "Get an instant, non-binding ballpark estimate for your engineering project. Preconstruction intake for MEP, Structural, Civil, and more.",
  path: "/estimate",
};

export default function Estimate() {
  usePageMeta(PAGE_META);
  const { toast } = useToast();
  const createLead = useCreateLead();

  const [step, setStep] = useState(1);
  const [result, setResult] = useState<EstimateResult | null>(null);

  const form = useForm<EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      projectType: undefined,
      peBasis: undefined,
      squareFootage: undefined,
      city: "",
      state: "",
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const watchProjectType = form.watch("projectType");
  const watchPeBasis = form.watch("peBasis");

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["projectType", "peBasis"];
    else if (step === 2) fieldsToValidate = ["squareFootage", "city", "state"];

    const isStepValid = await form.trigger(fieldsToValidate as any);
    if (isStepValid) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: EstimateFormValues) => {
    try {
      const calcResult = calculateEstimate({
        projectType: data.projectType,
        peBasis: data.peBasis,
        squareFootage: data.squareFootage,
        state: data.state,
      });

      const message = `Estimate Request:
Project Type: ${data.projectType}
Square Footage: ${data.squareFootage} sqft
Location: ${data.city}, ${data.state}
${calcResult.calcBreakdown}

Non-binding ballpark for budgeting only — final proposal follows a scope review.`;

      await createLead.mutateAsync({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          projectType: data.projectType,
          services: data.projectType,
          message,
          source: "estimate",
          medium: "website",
          campaign: "instant-ballpark",
          landingPath: "/estimate",
        },
      });

      setResult(calcResult);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: err?.response?.data?.error || "There was an error generating your estimate. Please try again.",
      });
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  };

  if (result) {
    return (
      <div className="flex flex-col min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-card border border-border p-8 md:p-12 shadow-2xl relative animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <Check className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">Request Received</h1>
            <p className="text-center text-muted-foreground mb-12">
              Your inquiry has been submitted. Below is your initial non-binding estimate based on your provided parameters.
            </p>

            <div className="border border-border bg-background p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              
              {result.type === "custom" ? (
                <>
                  <div className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    {result.message}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2">Estimated Range</h2>
                  <div className="flex flex-col mb-4">
                    <div className="text-4xl md:text-5xl font-display font-bold text-foreground">
                      {formatCurrency(result.headline!)}
                      <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground font-normal ml-3">Typical</span>
                    </div>
                    <div className="text-xl text-muted-foreground mt-2 font-medium">
                      Range: {formatCurrency(result.low!)} - {formatCurrency(result.high!)}
                    </div>
                  </div>
                </>
              )}
              
              <p className="text-xs text-muted-foreground leading-relaxed mt-4 pt-4 border-t border-border/50">
                Non-binding ballpark for budgeting only — final proposal follows a scope review.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-secondary border border-border">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Project Type</div>
                <div className="text-sm font-medium">{form.getValues("projectType")}</div>
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Assumptions</div>
                <div className="text-sm text-foreground/80 leading-relaxed">
                  {result.assumptions}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center border-t border-border pt-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border text-xs font-bold uppercase tracking-widest text-foreground shadow-sm">
                <Check className="w-4 h-4 text-primary" />
                Licensed in 49 states
              </div>
            </div>

            <button
              onClick={() => {
                form.reset();
                setStep(1);
                setResult(null);
              }}
              className="mt-12 w-full h-14 border border-border text-foreground font-bold text-sm uppercase tracking-wider hover:bg-secondary transition-colors"
            >
              Start New Estimate
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-grid-white opacity-20 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6">
            <Calculator className="w-3 h-3" /> Preconstruction Estimator
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Instant Ballpark Estimate</h1>
          <p className="text-lg text-muted-foreground">Provide basic project parameters for a preliminary, non-binding cost assessment.</p>
        </div>

        <div className="bg-card border border-border shadow-2xl">
          {/* Progress Bar */}
          <div className="flex items-center border-b border-border">
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`flex-1 p-4 text-center border-r border-border last:border-r-0 transition-colors ${step === num ? 'bg-primary/5 border-b-2 border-b-primary text-foreground' : step > num ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                <div className="text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= num ? 'bg-primary text-white' : 'bg-border text-muted-foreground'}`}>
                    {step > num ? <Check className="w-3 h-3" /> : num}
                  </span>
                  <span className="hidden sm:inline">
                    Step {num} of 3
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Step 1: Project Type */}
                <div className={step === 1 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}>
                  <h2 className="text-2xl font-display font-bold mb-6">Select Engineering Discipline</h2>
                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {ESTIMATE_PROJECT_TYPES.map((pt) => (
                            <label 
                              key={pt}
                              className={`flex items-start p-4 border cursor-pointer transition-all ${field.value === pt ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-background hover:border-primary/50'}`}
                            >
                              <div className="flex h-5 items-center">
                                <input
                                  type="radio"
                                  className="w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-offset-background"
                                  value={pt}
                                  checked={field.value === pt}
                                  onChange={field.onChange}
                                />
                              </div>
                              <div className="ml-3">
                                <span className="block text-sm font-medium text-foreground">{pt}</span>
                              </div>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchProjectType === "PE stamp & plan review only" && (
                    <div className="mt-8 p-6 bg-secondary border border-border animate-in fade-in duration-300">
                      <FormField
                        control={form.control}
                        name="peBasis"
                        render={({ field }) => (
                          <FormItem className="space-y-4">
                            <FormLabel className="text-sm font-bold text-foreground">What is the PE stamp for?</FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {SQFT_PROJECT_TYPES.map((pt) => (
                                <label 
                                  key={pt}
                                  className={`flex items-start p-3 border cursor-pointer transition-all ${field.value === pt ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-background hover:border-primary/50'}`}
                                >
                                  <div className="flex h-5 items-center">
                                    <input
                                      type="radio"
                                      className="w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-offset-background"
                                      value={pt}
                                      checked={field.value === pt}
                                      onChange={field.onChange}
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <span className="block text-xs font-medium text-foreground">{pt}</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  <div className="mt-10 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="h-12 px-8 bg-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center rounded-sm hover:bg-primary/90 transition-colors"
                    >
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Step 2: Parameters */}
                <div className={step === 2 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}>
                  <h2 className="text-2xl font-display font-bold mb-6">Project Parameters</h2>
                  <div className="bg-background border border-border p-4 mb-8 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Selected Discipline</div>
                      <div className="text-sm font-medium">
                        {watchProjectType}
                        {watchPeBasis && <span className="text-muted-foreground"> ({watchPeBasis})</span>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="squareFootage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Approximate Square Footage *</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="e.g. 10000" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project City *</FormLabel>
                            <FormControl>
                              <Input placeholder="City Name" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">State *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-14 bg-background border-border rounded-none focus:ring-primary">
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px] rounded-none border-border">
                                {US_STATES.map(s => (
                                  <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="h-12 px-6 border border-border text-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center rounded-sm hover:bg-secondary transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="h-12 px-8 bg-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center rounded-sm hover:bg-primary/90 transition-colors"
                    >
                      Next Step <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>

                {/* Step 3: Contact */}
                <div className={step === 3 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}>
                  <h2 className="text-2xl font-display font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">Where should we send your detailed engineering proposal?</p>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
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
                          <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" className="h-14 bg-background border-border rounded-none focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-10 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="h-12 px-6 border border-border text-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center rounded-sm hover:bg-secondary transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={createLead.isPending}
                      className="h-12 px-8 bg-primary text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {createLead.isPending ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</>
                      ) : (
                        "Get Estimate"
                      )}
                    </button>
                  </div>
                  <div className="mt-6 text-center text-xs text-muted-foreground">
                    By submitting this form, you agree to receive communications regarding your project. Your information is secure and never sold.
                  </div>
                </div>

              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
