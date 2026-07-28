import { usePageMeta } from "@/lib/seo";
import officeImg from "@assets/generated_images/office.webp";

export default function About() {
  usePageMeta(PAGE_META);

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {officeImg && (
            <img 
              src={officeImg} 
              alt="Engineering Office" 
              className="w-full h-full object-cover opacity-30"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Firm <span className="text-muted-foreground">Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              Apex Grid Engineering was founded on a simple premise: engineering drawings should solve problems in the field, not create them.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                We serve as the technical backbone for architecture firms and contractors nationwide. While others focus purely on theory, we focus on constructability. A design is only as good as the contractor's ability to build it.
              </p>
              <p>
                As an integrated design firm—housing Structural, MEP, and Civil engineering under one roof—we eliminate the friction of coordinating between disconnected consultants. We handle the heavy technical lifting so architects can focus on vision and contractors can focus on execution.
              </p>
              <p>
                We are not an outsourced drafting service. With a team of in-house Professional Engineers and more than 20 engineers on staff, every project is engineered domestically and stamped by PEs licensed in 49 states — and we're built to take on jobs of any size, with fast quote turnaround on every request.
              </p>
            </div>
            
            <div className="bg-background p-10 border border-border">
              <h3 className="font-display font-bold text-2xl mb-8">By The Numbers</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">49</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">States Licensed</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">12-24hr</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Initial Review Response</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">15</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Years of Expertise</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">3</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Core Disciplines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Our Methodology</h2>
            
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 group">
                <div className="text-5xl font-display font-bold text-border group-hover:text-primary transition-colors">01</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Code-First Compliance</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We begin every project by establishing the exact parameters dictated by local jurisdictions. We don't guess at requirements; we engineer to the letter of the code, drastically reducing permitting delays.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 group">
                <div className="text-5xl font-display font-bold text-border group-hover:text-primary transition-colors">02</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Cross-Discipline Coordination</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Because we house Structural, MEP, and Civil under one roof, we identify clashes in the model, not in the field. Our integrated approach ensures mechanical ducts don't fight structural beams.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 group">
                <div className="text-5xl font-display font-bold text-border group-hover:text-primary transition-colors">03</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Constructable Drawings</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    A beautifully engineered system means nothing if the contractor can't interpret the plans. We pride ourselves on producing the most legible, explicit, and practical construction documents in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const PAGE_META = {
  title: "About Our Engineering Firm | Apex Grid Engineering",
  description: "Meet Apex Grid Engineering — a multidisciplinary design firm delivering precise, code-compliant MEP, structural, and civil engineering solutions.",
  path: "/about",
};
