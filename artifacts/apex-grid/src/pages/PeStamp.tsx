import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import structuralBg from "@assets/generated_images/structural-bg.webp";
import { SITE_URL, useJsonLd, usePageMeta } from "@/lib/seo";

const steps = [
  {
    title: "Send us your plans",
    description:
      "Upload your drawing set, calculations, and project details through our intake. PDF plus CAD backgrounds if you have them.",
  },
  {
    title: "Licensed PE review",
    description:
      "A licensed engineer reviews for code compliance and constructability, performs or independently verifies the calculations, and returns any required revisions marked clearly.",
  },
  {
    title: "Sealed and returned",
    description:
      "Sealed drawings and calculations come back to you, ready for permit submittal to your AHJ. Typical turnaround 12–24 hours on a complete package.",
  },
];

const trustPoints = [
  "Licensed in 49 states — our PEs seal wherever your project permits", // claims-audit: evidence-gated
  "Real engineering review — responsible-charge review on every set, never a rubber stamp",
  "Fast turnaround — most review-and-seal packages back in 12–24 hours",
  "Trusted relationships — firms send us plans weekly and come back.",
];

const faqs = [
  {
    question: 'What does "review and seal" actually mean?',
    answer:
      "A licensed Professional Engineer reviews your drawings under responsible charge — checking code compliance, verifying or performing the structural, mechanical, electrical, plumbing, or civil calculations, and requiring revisions where the design falls short. Only then does the PE seal the final documents, assuming professional responsibility for the engineering. That review is what makes the seal valid with the building department.",
  },
  {
    question: "How fast is turnaround?",
    answer:
      "Typical turnaround is 12–24 hours from the time we receive a complete package. Rush review is available when a permit deadline is driving the schedule — tell us the date and we'll tell you honestly whether we can hit it.",
  },
  {
    question: "Which states do you cover?",
    answer:
      "Apex Grid Engineering is licensed in 49 states (all but Alaska). Our PEs seal wherever your project is being permitted, and we match your project to an engineer licensed in that state and discipline.", // claims-audit: evidence-gated
  },
  {
    question: "What do I need to send you?",
    answer:
      "Your drawing set (PDF; CAD backgrounds if available), any existing calculations, the project address and permitting jurisdiction (AHJ), and your permit deadline. The more complete the package, the faster the review.",
  },
  {
    question: "Will you seal drawings another engineer drew?",
    answer:
      "Yes — that is the core of this service. Our PE performs a full independent review of the set and seals only what passes. Anything that needs correction comes back to you marked clearly, so the resubmittal is clean.",
  },
  {
    question: "What does review-and-seal cost?",
    answer:
      "Fixed-fee, scoped per project based on discipline, drawing-set size, and complexity. Send your plans and we deliver a proposal typically within 12–24 hours. No hourly meters running while you wait.",
  },
];

const title = "Need a PE Stamp? Fast PE Review & Seal in 49 States | Apex Grid Engineering"; // claims-audit: evidence-gated
const description =
  "Fast, trusted PE review-and-seal for structural, MEP, and civil drawings. Licensed engineers, real review, sealed sets back in days. Send us your plans.";

export default function PeStamp() {
  usePageMeta({ title, description, path: "/pe-stamp/" });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PE Review and Seal",
    description,
    url: `${SITE_URL}/pe-stamp/`,
    serviceType: "Professional Engineer review and seal",
    areaServed: "United States",
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#business`,
      name: "Apex Grid Engineering",
      url: `${SITE_URL}/`,
    },
  });

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-32 overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          <img
            src={structuralBg}
            alt="Structural engineering drawings prepared for licensed PE review"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              Services <ArrowRight className="w-3 h-3" />
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Need a PE stamp? We got you.
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              {"Fast, trusted PE review-and-seal for structural, MEP, and civil drawings — licensed in 49 states. Send us your plans and a licensed engineer reviews, verifies, and seals them for permit." /* claims-audit: evidence-gated */}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Drawings reviewed. Seal earned. Permit moved.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A permit stuck waiting on a seal is a project bleeding money. Apex Grid Engineering gives architects, contractors, and developers a single trusted partner for PE review-and-seal: our licensed engineers take your production drawings through a real engineering review, verify or perform the calculations, mark the revisions the AHJ will demand, and seal the final set. Our PEs seal in any state we serve, and firms send us plans every week because we move fast without cutting the review that makes the seal valid.
            </p>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold mb-12 flex items-center gap-4">
                <span className="w-12 h-1 bg-primary inline-block" />
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="bg-card border border-border p-8 hover:border-primary/50 transition-colors group"
                  >
                    <div className="text-4xl font-display font-bold text-border group-hover:text-primary transition-colors mb-6">
                      0{index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="relative">
              <div className="sticky top-32 bg-card border border-border p-8">
                <div className="w-12 h-1 bg-primary mb-6" />
                <h2 className="font-display font-bold text-2xl mb-4">Engage Our Team</h2>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  Send your drawing set and project details. We confirm the right licensed engineer for your state and discipline, then deliver a fixed-fee proposal typically within 12–24 hours.
                </p>
                <ul className="space-y-4 mb-10 text-sm font-medium border-t border-border pt-8">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/submit-project"
                  className="flex h-14 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center w-full hover:bg-primary/90 transition-colors"
                >
                  Send Us Your Plans
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="block py-24 bg-card border-t border-border">
        <div className="container faq mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">PE Review-and-Seal FAQs</h2>
          {faqs.map((faq) => (
            <details key={faq.question} className="border-t border-border py-6 group">
              <summary className="cursor-pointer list-none font-display font-bold text-lg flex items-center justify-between gap-6">
                {faq.question}
                <span className="text-primary text-2xl font-normal group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-muted-foreground leading-relaxed pt-4 pr-8">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}