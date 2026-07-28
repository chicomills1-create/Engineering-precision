import officeImg from "@assets/generated_images/office.jpg";

export default function About() {
  return (
    <div className="flex flex-col">
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="font-mono text-sm tracking-widest text-primary uppercase">
              The Firm
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
            Precision. <br/><span className="text-muted-foreground">Execution.</span>
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-16">
            <div className="text-xl text-foreground/80 leading-relaxed space-y-6">
              <p>
                Apex Grid Engineering was founded on a simple premise: engineering drawings should solve problems, not create them. 
              </p>
              <p>
                We serve as the technical backbone for architecture firms and contractors nationwide. While others focus purely on theory, we focus on constructability. A design is only as good as the contractor's ability to build it.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-8 border-l border-border pl-8">
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">50+</div>
                  <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground">States Licensed</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">10k</div>
                  <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Projects Permitted</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">15</div>
                  <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Years Active</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">3</div>
                  <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Core Disciplines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="aspect-[21/9] mb-20 bg-background border border-border relative overflow-hidden">
            {officeImg ? (
              <img src={officeImg} alt="Engineering Office" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
            ) : (
              <div className="w-full h-full bg-secondary/20" />
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display mb-12 text-center">Our Methodology</h2>
            
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6">
                <div className="text-4xl font-display font-bold text-primary/40">01</div>
                <div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Code-First Compliance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We begin every project by establishing the exact parameters dictated by local jurisdictions. We don't guess at requirements; we engineer to the letter of the code, drastically reducing permitting delays.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6">
                <div className="text-4xl font-display font-bold text-primary/40">02</div>
                <div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Cross-Discipline Coordination</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Because we house Structural, MEP, and Civil under one roof, we identify clashes in the model, not in the field. Our integrated approach ensures mechanical ducts don't fight structural beams.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6">
                <div className="text-4xl font-display font-bold text-primary/40">03</div>
                <div>
                  <h3 className="text-xl font-bold mb-3 uppercase tracking-wide">Constructable Drawings</h3>
                  <p className="text-muted-foreground leading-relaxed">
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
