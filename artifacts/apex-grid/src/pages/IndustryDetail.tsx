import { Link, useParams } from "wouter";
import { ArrowRight, CheckCircle2, ChevronRight, FileText, ShieldCheck } from "lucide-react";
import { getIndustry, INDUSTRIES_BY_CLUSTER } from "@/data/industries";
import { usePageMeta, useJsonLd, SITE_URL } from "@/lib/seo";
import NotFound from "./not-found";

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustry(slug ?? "");

  usePageMeta({
    title: industry ? industry.title : "Industry Not Found | Apex Grid Engineering",
    description: industry ? industry.meta : "Industry page not found.",
    path: `/industries/${slug}/`,
  });

  useJsonLd(
    industry
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: industry.h1,
              description: industry.meta,
              serviceType: `${industry.name} Engineering`,
              areaServed: { "@type": "Country", name: "United States" },
              provider: {
                "@type": "Organization",
                name: "Apex Grid Engineering",
                url: SITE_URL || undefined,
                telephone: "+1-480-490-0064",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "22475 E Quintero Rd",
                  addressLocality: "Queen Creek",
                  addressRegion: "AZ",
                  postalCode: "85142",
                  addressCountry: "US",
                },
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Industries", item: SITE_URL ? `${SITE_URL}/industries` : "/industries" },
                { "@type": "ListItem", position: 2, name: industry.name, item: SITE_URL ? `${SITE_URL}/industries/${industry.slug}/` : `/industries/${industry.slug}/` },
              ],
            },
          ],
        }
      : null,
  );

  if (!industry) return <NotFound />;

  const clusterGroup = INDUSTRIES_BY_CLUSTER.find((g) => g.cluster.id === industry.cluster);
  const related = clusterGroup?.industries.filter((i) => i.slug !== industry.slug) ?? [];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link href="/industries" className="hover:text-primary transition-colors">Industries</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground/70">{industry.name}</span>
          </nav>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">{industry.h1}</h1>
            <p className="text-xl md:text-2xl text-primary font-display font-semibold mb-8">{industry.h2}</p>
            {industry.intro.map((p, i) => (
              <p key={i} className="text-lg text-foreground/80 leading-relaxed mb-5">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties (blueprint H3s) */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
            {industry.specialties.map((s) => (
              <div key={s.heading} className="bg-card p-10">
                <div className="w-12 h-[2px] bg-primary mb-6" />
                <h3 className="text-xl font-display font-bold mb-4">{s.heading}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discipline scope */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Integrated Discipline Scope for {industry.name} Projects
          </h2>
          <p className="text-muted-foreground max-w-3xl mb-14">
            One coordinated engineering team across structural, MEP, civil, and geotechnical — one point of accountability from concept through permit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {industry.disciplines.map((d) => (
              <div key={d.name} className="border border-border p-8 bg-card/50">
                <h3 className="text-2xl font-display font-bold mb-4">
                  {d.href ? (
                    <Link href={d.href} className="hover:text-primary transition-colors">{d.name}</Link>
                  ) : (
                    d.name
                  )}
                </h3>
                {d.body.map((p, i) => (
                  <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-4">{p}</p>
                ))}
                <ul className="space-y-2 mt-5">
                  {d.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                {d.href && (
                  <Link href={d.href} className="inline-flex items-center gap-2 text-sm font-semibold text-primary mt-6 hover:gap-3 transition-all">
                    Explore {d.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility types / project types / deliverables */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Facility Types We Engineer</h2>
            <ul className="space-y-3">
              {industry.facilityTypes.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Project Types</h2>
            <ul className="space-y-3">
              {industry.projectTypes.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" /> Deliverables
            </h2>
            <ul className="space-y-3">
              {industry.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="w-1.5 h-1.5 bg-primary mt-1.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold mb-4 flex items-center gap-4">
            <ShieldCheck className="w-7 h-7 text-primary" /> Codes &amp; Standards We Design To
          </h2>
          <p className="text-muted-foreground max-w-3xl mb-12">
            {industry.name} projects live and die by code compliance. These are the standards our drawings and calculations are built around.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {industry.compliance.map((c) => (
              <div key={c.code} className="bg-background p-6">
                <div className="font-mono text-sm font-bold text-primary mb-2">{c.code}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related industries */}
      {related.length > 0 && (
        <section className="py-20 bg-card border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-display font-bold mb-8">
              Related Sectors — {clusterGroup?.cluster.name}
            </h2>
            <div className="flex flex-wrap gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/industries/${r.slug}`}
                  className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground/80 hover:border-primary hover:text-primary transition-colors rounded-[2px]"
                >
                  {r.name} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-28 bg-secondary border-t border-border text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Start Your {industry.name} Project</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">{industry.cta}</p>
          <Link
            href="/contact"
            className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            Upload Drawings for a Scope &amp; Fee Review <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
