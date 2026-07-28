import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import resourcesBg from "@assets/generated_images/resources-bg.jpg";

export default function Resources() {
  const articles = [
    {
      id: 1,
      title: "How Much Does Commercial MEP Engineering Actually Cost?",
      category: "Cost & Scoping",
      readTime: "5 min",
      desc: "A breakdown of per-square-foot pricing models, flat fees, and the hidden costs of under-bidding engineering services."
    },
    {
      id: 2,
      title: "The Commercial Permit Process: Why Drawings Fail Review",
      category: "Permitting",
      readTime: "7 min",
      desc: "The top 5 reasons municipal plan checkers reject structural and MEP sets, and how our 'Three Lenses' approach prevents them."
    },
    {
      id: 3,
      title: "VRF vs. RTU: Selecting the Right HVAC System",
      category: "Technical Guide",
      readTime: "6 min",
      desc: "Variable Refrigerant Flow vs Rooftop Units. An engineering analysis of upfront capital vs long-term operational efficiency."
    },
    {
      id: 4,
      title: "ASHRAE 90.1 vs IECC: Energy Code Breakdown",
      category: "Compliance",
      readTime: "8 min",
      desc: "Navigating the complexities of commercial energy codes, Title 24 implications, and ensuring envelope compliance."
    },
    {
      id: 5,
      title: "Structural Engineer vs Architect: Who Does What?",
      category: "Firm Ops",
      readTime: "4 min",
      desc: "Clarifying scopes of work to eliminate gaps in construction documents and ensure seamless design coordination."
    },
    {
      id: 6,
      title: "Seismic Retrofitting: Triggers and Mandates",
      category: "Structural",
      readTime: "6 min",
      desc: "When does a renovation trigger mandatory seismic upgrades? A guide to avoiding surprise structural costs in tenant improvements."
    }
  ];

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-32 overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {resourcesBg && (
            <img 
              src={resourcesBg} 
              alt="Engineering Resources" 
              className="w-full h-full object-cover opacity-30"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Technical <span className="text-muted-foreground">Insights</span>
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl">
              Practical guides, code breakdowns, and cost analyses. Written by licensed engineers to help developers and architects make informed decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-background border border-border flex flex-col group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5 text-primary">
                      <Tag className="w-3 h-3" /> {article.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {article.desc}
                  </p>
                </div>
                <div className="border-t border-border p-4 bg-secondary/30 flex items-center justify-between mt-auto">
                  <span className="text-sm font-bold uppercase tracking-wider">Read Article</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter CTA */}
      <section className="py-24 bg-primary text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Code Updates directly to your inbox.</h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto">We don't spam. We only send critical updates on building code changes, material cost trends, and engineering methodologies.</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-grow h-14 px-4 bg-background border-none outline-none text-foreground"
            />
            <button type="button" className="h-14 px-8 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-black/80 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}