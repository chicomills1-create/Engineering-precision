import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { ArrowRight, Clock, Tag, X, CheckCircle2 } from "lucide-react";
import resourcesBg from "@assets/generated_images/resources-bg.webp";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { APEX_GRID_BUSINESS_SCHEMA } from "@/lib/business-schema";

type AudienceKey = "architects" | "contractors" | "developers";

const audienceFilters: Array<{ key: AudienceKey | "all"; label: string }> = [
  { key: "all", label: "All field notes" },
  { key: "architects", label: "Architects" },
  { key: "contractors", label: "Contractors" },
  { key: "developers", label: "Developers & owners" },
];

const articles = [
  {
    id: 1,
    slug: "commercial-mep-engineering-cost",
    title: "How Much Does Commercial MEP Engineering Actually Cost?",
    category: "Cost & Scoping",
    readTime: "5 min",
    desc: "A breakdown of per-square-foot pricing models, flat fees, and the hidden costs of under-bidding engineering services.",
    audiences: ["contractors", "developers"] as AudienceKey[],
    content: (
      <div className="space-y-6 text-foreground/80 leading-relaxed">
        <p>When budgeting a commercial project, developers frequently ask for a simple per-square-foot cost for MEP engineering. While rules of thumb exist (typically ranging from $1.50 to $4.00+ per square foot depending on complexity), this metric can be dangerously misleading. The true cost of MEP engineering isn't found in the initial proposal; it's found in the total cost of construction and the lifecycle of the building.</p>
        <p>Firms that aggressively underbid proposals often do so by utilizing "copy-paste" design methodologies. They reuse generic details and oversized equipment to avoid the labor-intensive load calculations required to right-size a system. While you might save $10,000 on the engineering fee, an oversized RTU and excessive ductwork will cost you $50,000 extra in construction materials and thousands annually in wasted energy.</p>
        <p>At Apex Grid, our fee structure reflects the actual time required to conduct rigorous, site-specific calculations. We perform exhaustive Title 24 energy modeling upfront. This allows us to shave significant tonnage off HVAC requirements, reduce copper wire gauges through precise electrical load balancing, and eliminate unnecessary plumbing runs. The savings in the contractor's bid vastly outweigh our engineering fees.</p>
        <p>Furthermore, cut-rate engineering inevitably leads to coordination failures. When a poorly routed duct collides with a structural steel beam on site, the resulting Request for Information (RFI) halts progress. Trades stand around waiting for a redesigned detail, and the general contractor issues a change order. We view our fee as an insurance policy against these exact field failures.</p>
      </div>
    )
  },
  {
    id: 2,
    slug: "commercial-permit-drawings-fail-review",
    title: "The Commercial Permit Process: Why Drawings Fail Review",
    category: "Permitting",
    readTime: "7 min",
    desc: "The top 5 reasons municipal plan checkers reject structural and MEP sets, and how our 'Three Lenses' approach prevents them.",
    audiences: ["architects", "contractors", "developers"] as AudienceKey[],
    content: (
      <div className="space-y-6 text-foreground/80 leading-relaxed">
        <p>Getting a commercial project permitted is arguably the most unpredictable phase of development. Months can be lost in endless cycles of municipal plan check comments. Understanding why reviewers reject drawings is the first step to ensuring your submittal sails through on the first pass.</p>
        <p>The number one reason for rejection is <strong>incomplete coordination between disciplines</strong>. If the architectural reflected ceiling plan shows a light fixture exactly where the structural engineer placed a rigid frame connection, the plan checker will flag it. Municipalities will not approve plans that physically cannot be built. At Apex Grid, our multi-discipline structure allows us to clash-detect our own models before the city ever sees them.</p>
        <p>The second major failure point is <strong>missing calculations</strong>. A beautifully drawn seismic connection is useless to a reviewer without the math proving it meets the International Building Code (IBC). Cut-rate firms often try to submit standard details without project-specific backing. We submit exhaustive, neatly formatted calculation packages that lead the reviewer logically from the code requirement to the drawn solution.</p>
        <p>Finally, failing to address local municipal amendments guarantees a rejection. The IBC is a baseline, but local jurisdictions frequently layer on extreme structural and energy requirements (like California's Title 24 or local seismic amendments). Our engineers don't just design to the national standard; we design specifically to the municipal ordinance of the project's location, speaking the exact language the local plan checker wants to read.</p>
      </div>
    )
  },
  {
    id: 3,
    slug: "vrf-vs-rtu-commercial-hvac",
    title: "VRF vs. RTU: Selecting the Right HVAC System",
    category: "Technical Guide",
    readTime: "6 min",
    desc: "Variable Refrigerant Flow vs Rooftop Units. An engineering analysis of upfront capital vs long-term operational efficiency.",
    audiences: ["architects", "contractors", "developers"] as AudienceKey[],
    content: (
      <div className="space-y-6 text-foreground/80 leading-relaxed">
        <p>Selecting the primary HVAC architecture for a commercial building is one of the most consequential decisions a developer will make. It dictates ceiling heights, structural roof loads, electrical service sizes, and long-term operating costs. The debate typically comes down to traditional Packaged Rooftop Units (RTUs) versus modern Variable Refrigerant Flow (VRF) systems.</p>
        <p><strong>Rooftop Units (RTUs)</strong> are the traditional workhorse of commercial real estate. They are relatively inexpensive to purchase, straightforward to install, and easily serviced by any commercial HVAC technician. Because the entire system (compressor, condenser, evaporator) sits on the roof, it frees up interior mechanical space. However, they require massive ductwork to distribute air throughout the building, drastically lowering usable ceiling heights and requiring larger structural spans to support their significant weight.</p>
        <p><strong>Variable Refrigerant Flow (VRF)</strong> systems, conversely, use small refrigerant lines instead of massive air ducts to move heat around the building. This allows for significantly higher ceilings and granular zone control—you can cool one room while heating the adjacent one by transferring heat between them. VRF systems are incredibly energy-efficient, making Title 24 compliance much easier.</p>
        <p>The tradeoff? VRF systems carry a higher upfront capital cost, and their intricate refrigerant piping requires specialized installers. If the building is a long-term hold or a high-end tenant space where ceiling height is a premium, VRF is almost always the superior engineering choice. If it is a warehouse or a rapid-turn retail shell, traditional RTUs provide the most cost-effective path to permit.</p>
      </div>
    )
  },
  {
    id: 4,
    slug: "structural-engineer-vs-architect",
    title: "Structural Engineer vs Architect: Who Does What?",
    category: "Firm Ops",
    readTime: "4 min",
    desc: "Clarifying scopes of work to eliminate gaps in construction documents and ensure seamless design coordination.",
    audiences: ["architects", "contractors", "developers"] as AudienceKey[],
    content: (
      <div className="space-y-6 text-foreground/80 leading-relaxed">
        <p>A frequent source of tension on commercial projects is the blurry line between the Architect's scope and the Structural Engineer's scope. When these boundaries aren't explicitly defined at the kickoff meeting, critical details fall through the cracks, resulting in incomplete permit sets and frantic RFIs during construction.</p>
        <p>In simple terms, the Architect is responsible for the building's function, aesthetics, life-safety egress, and spatial arrangement. They define the "skin" and the "volume." The Structural Engineer is responsible for ensuring that volume does not collapse under gravity, wind, or seismic forces. They define the "bones."</p>
        <p>The friction usually occurs at the connections between the skin and the bones. For example: who details the attachment of the exterior architectural facade to the structural steel frame? The architect knows how it should look; the engineer knows what forces it must withstand. At Apex Grid, we refuse to let these details languish in the "by others" category. We proactively coordinate with the architect to engineer specific, buildable connection details for architectural elements.</p>
        <p>By establishing clear lines of demarcation—where the architect's waterproof envelope ends and our load-bearing structure begins—we ensure that the contractor receives a seamless, unified set of construction documents. No finger-pointing, just execution.</p>
      </div>
    )
  }
];

export default function Resources() {
  usePageMeta({
    title: "Engineering Resources & Answers | Apex Grid Engineering",
    description: "Answer-first guides on structural, MEP, civil, geotechnical, PE stamping, Title 24, and municipal plan-check requirements.",
    path: "/resources/",
  });
  useJsonLd(APEX_GRID_BUSINESS_SCHEMA);
  const search = useSearch();
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [audience, setAudience] = useState<AudienceKey | "all">("all");

  const handleSubscribe = async () => {
    const email = subscribeEmail.trim();
    if (!email || subscribing) return;
    setSubscribing(true);
    setSubscribeError(null);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubscribed(true);
    } catch {
      setSubscribeError("Couldn't subscribe right now — please try again or email info@apexgrideng.com.");
    } finally {
      setSubscribing(false);
    }
  };
  const [, setLocation] = useLocation();
  const articleParam = new URLSearchParams(search).get("article");
  const activeArticle = articleParam ? Number(articleParam) : null;

  const setActiveArticle = (id: number | null) => {
    setLocation(id === null ? "/resources" : `/resources?article=${id}`);
  };

  const selectedArticle = articles.find(a => a.id === activeArticle);
  const visibleArticles = audience === "all"
    ? articles
    : articles.filter(article => article.audiences.includes(audience));

  const projectReviewUrl = (articleSlug?: string) => {
    const params = new URLSearchParams({
      utm_source: "field_notes",
      utm_medium: "resource",
      utm_campaign: articleSlug ? `project_review_${articleSlug}` : "project_review",
    });
    return `/request-proposal?${params.toString()}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeArticle]);

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
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-primary" />
              <span className="font-mono text-xs tracking-[0.24em] uppercase text-primary">
                Apex Grid Field Notes
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Make the next project decision{" "}
              <span className="text-muted-foreground">with fewer surprises.</span>
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed max-w-2xl border-l-4 border-primary pl-6">
              Practical answers for architects, contractors, and owners working through scope, coordination, cost, and municipal plan-check risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href="#field-notes"
                className="inline-flex items-center justify-center gap-2 h-14 px-7 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Browse field notes <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={projectReviewUrl()}
                className="inline-flex items-center justify-center h-14 px-7 border border-border text-sm font-bold uppercase tracking-wider hover:bg-card transition-colors"
              >
                Request a project review
              </a>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Four current guides
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> 12–24h for most standard requests
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="field-notes" className="py-24 bg-card relative min-h-[600px]">
        <div className="container mx-auto px-4 md:px-8">
          
          {/* Article Reader View */}
          {selectedArticle ? (
            <article className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={() => setActiveArticle(null)}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-12"
              >
                <X className="w-4 h-4" /> Close Article
              </button>

              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-primary mb-6">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3 h-3" /> {selectedArticle.category}
                </span>
                <span className="w-1 h-1 bg-border rounded-full"></span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3 h-3" /> {selectedArticle.readTime}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-strong:text-white">
                {selectedArticle.content}
              </div>

               <div className="mt-20 pt-10 border-t border-border">
                 <div className="bg-background border border-primary/30 p-8 md:p-10">
                   <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
                     Apply this to a live project
                   </p>
                   <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                     Have a scope, coordination, or permit question?
                   </h3>
                   <p className="text-muted-foreground leading-relaxed max-w-2xl mb-7">
                     Send Apex Grid what you have. Our intake team can review the project details and respond with the next step.
                   </p>
                   <a
                     href={projectReviewUrl(selectedArticle.slug)}
                     className="inline-flex items-center gap-2 h-12 px-6 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
                   >
                     Start a project review <ArrowRight className="w-4 h-4" />
                   </a>
                 </div>
               </div>

               <div className="mt-8 flex justify-between items-center">
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="h-14 px-8 border border-border text-sm font-bold uppercase tracking-wider hover:bg-background transition-colors"
                >
                  Back to All Insights
                </button>
              </div>
            </article>
          ) : (
            /* Grid View */
             <div className="animate-in fade-in duration-500">
               <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                 <div>
                   <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-3">Choose your lens</p>
                   <h2 className="text-3xl md:text-4xl font-display font-bold">Field notes for the work ahead.</h2>
                 </div>
                 <p className="text-muted-foreground max-w-md leading-relaxed">
                   Start with the question closest to your project. Each note ends with a practical next step—not a generic sales pitch.
                 </p>
               </div>
               <div className="flex flex-wrap gap-2 mb-10">
                 {audienceFilters.map((filter) => (
                   <button
                     key={filter.key}
                     type="button"
                     onClick={() => setAudience(filter.key)}
                     aria-pressed={audience === filter.key}
                     className={`h-11 px-4 border text-xs font-mono uppercase tracking-wider transition-colors ${
                       audience === filter.key
                         ? "border-primary bg-primary/10 text-primary"
                         : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                     }`}
                   >
                     {filter.label}
                   </button>
                 ))}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {visibleArticles.map((article) => (
                 <button
                  key={article.id} 
                  onClick={() => setActiveArticle(article.id)}
                   className="text-left bg-background border border-border flex flex-col group cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <div className="p-10 flex-grow">
                    <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5 text-primary">
                        <Tag className="w-3 h-3" /> {article.category}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {article.desc}
                    </p>
                     <div className="flex flex-wrap gap-2 mt-7">
                       {article.audiences.map((articleAudience) => (
                         <span key={articleAudience} className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80 border border-border px-2 py-1">
                           {articleAudience === "developers" ? "Developers & owners" : articleAudience}
                         </span>
                       ))}
                     </div>
                  </div>
                  <div className="border-t border-border p-6 bg-secondary/30 flex items-center justify-between mt-auto">
                    <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">Read Article</span>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                 </button>
              ))}
               </div>
               {visibleArticles.length === 0 && (
                 <div className="border border-border bg-background p-10 text-center text-muted-foreground">
                   No field notes match this lens yet. Browse all notes or start a project review for a direct answer.
                 </div>
               )}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter CTA */}
       <section className="py-24 bg-primary text-center">
        <div className="container mx-auto px-4">
           <p className="text-white/70 text-xs font-mono uppercase tracking-[0.24em] mb-5">The next field note</p>
           <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Useful project intelligence, when it matters.</h2>
           <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg">One practical note on building-code changes, material cost trends, or engineering decisions. No generic marketing blast.</p>
          {subscribed ? (
            <p className="max-w-md mx-auto text-white font-semibold text-lg">✓ You're subscribed — we'll keep you posted.</p>
          ) : (
            <form
              className="max-w-md mx-auto flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                void handleSubscribe();
              }}
            >
              <input
                type="email"
                required
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Email address"
                className="flex-grow h-14 px-4 bg-background border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="h-14 px-8 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-black/80 transition-colors shadow-xl disabled:opacity-60"
              >
                {subscribing ? "…" : "Subscribe"}
              </button>
            </form>
          )}
          {subscribeError && (
            <p className="mt-4 text-white/90 text-sm">{subscribeError}</p>
          )}
        </div>
      </section>
    </div>
  );
}
