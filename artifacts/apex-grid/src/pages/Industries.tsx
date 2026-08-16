import { Link } from "wouter";
import { ArrowRight, Flag } from "lucide-react";
import industriesBg from "@assets/generated_images/industries-bg.webp";
import militaryBg from "@assets/generated_images/military-bg.webp";
import { INDUSTRIES_BY_CLUSTER } from "@/data/industries";
import { usePageMeta } from "@/lib/seo";

export default function Industries() {
  usePageMeta({
    title: "Industries We Serve | Structural, MEP, Civil & Geotechnical | Apex Grid",
    description:
      "Deep engineering expertise across 24 industries — healthcare, data centers, military, multifamily, industrial, and more. Explore sector-specific capabilities.",
    path: "/industries",
  });

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {industriesBg && (
            <img 
              src={industriesBg} 
              alt="Commercial buildings" 
              className="w-full h-full object-cover opacity-40"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Sector <span className="text-muted-foreground">Expertise</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Engineering isn't one-size-fits-all. Different industries require entirely different code knowledge and design philosophies. We bring specialized experience to the sectors below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8 flex flex-col gap-20">
          {INDUSTRIES_BY_CLUSTER.map(({ cluster, industries }) => (
            <div key={cluster.id}>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">0{cluster.id}</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold">{cluster.name}</h2>
                <div className="flex-grow h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="bg-background p-10 hover:bg-secondary/50 transition-colors group flex flex-col"
                  >
                    <div className="w-12 h-[2px] bg-primary mb-6 transition-all group-hover:w-16" />
                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{industry.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {industry.cardBlurb}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View Capabilities <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Military & Defense banner → dedicated page */}
      <section className="relative py-24 overflow-hidden border-t border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/85 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
          <img
            src={militaryBg}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 border border-primary/60 bg-primary/10 px-4 py-2 mb-8">
              <Flag className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Veteran-Owned &amp; Operated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              We Support Our <span className="text-primary">Troops</span>
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-10">
              Apex Grid Engineering is led by a disabled U.S. Air Force veteran. We design to UFC and ATFP criteria for installations, reserve centers, and defense-contractor sites — and veteran-owned participation can strengthen your position on government bids.
            </p>
            <Link
              href="/military"
              className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
            >
              Explore Military &amp; Defense <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-secondary border-t border-border text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-8">Don't see your sector?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Our engineering fundamentals apply universally. If you have a specialized facility, reach out to discuss our relevant capabilities.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            Discuss Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}