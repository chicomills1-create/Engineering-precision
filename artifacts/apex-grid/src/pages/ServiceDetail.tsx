import { Link, useParams } from "wouter";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import mepBg from "@assets/generated_images/mep-bg.jpg";
import structuralBg from "@assets/generated_images/structural-bg.jpg";
import civilBg from "@assets/generated_images/civil-bg.jpg";
import assessmentBg from "@assets/generated_images/assessment-bg.jpg";
import NotFound from "./not-found";

const servicesData = {
  "mep": {
    title: "MEP Design & Engineering",
    bg: mepBg,
    desc: "Mechanical, Electrical, and Plumbing systems engineered for operational efficiency, occupant comfort, and stringent code compliance. We also handle full Title 24 energy compliance modeling in-house.",
    problemSection: {
      headline: "Coordinated Systems. Zero Guesswork.",
      content: "Uncoordinated MEP drawings are the single largest source of construction RFIs, change orders, and schedule delays. When ducts collide with steel beams in the field, profits evaporate. We engineer clash-free, coordinated systems from day one, modeling exactly how every conduit, pipe, and duct navigates the structural framework. The result? A smooth installation process and no costly surprises during rough-in."
    },
    scopeHeadline: "Scope of Expertise",
    scopes: [
      {
        title: "HVAC & Ventilation",
        desc: "Precision load calculations, duct routing, and equipment selection for optimal air quality and thermal comfort. Systems designed to minimize energy consumption and footprint."
      },
      {
        title: "Electrical Distribution",
        desc: "Robust power distribution, lighting design, and emergency backup systems. We ensure adequate capacity for current needs and future scalability."
      },
      {
        title: "Plumbing & Drainage",
        desc: "Domestic water, sanitary waste, and specialized piping networks engineered for reliability, code compliance, and water conservation."
      },
      {
        title: "Energy & Title 24 Compliance",
        desc: "Stringent energy modeling integrated directly into the design process to pass municipal sustainability requirements without sacrificing performance."
      }
    ],
    sectors: ["Residential", "Commercial", "Mixed-Use", "Light Industrial"]
  },
  "structural": {
    title: "Structural Design & Engineering",
    bg: structuralBg,
    desc: "From new commercial builds to complex seismic retrofits and ADUs. We engineer robust, material-optimized frameworks that satisfy the most rigorous municipal peer reviews.",
    problemSection: {
      headline: "Drawings Built to Get Approved.",
      content: "A structural design is useless if it spends months trapped in municipal plan check. We build our permit submittal packages with the reviewer in mind—PE-stamped, accompanied by a complete, cleanly formatted calculation package, adhering strictly to IBC/CBC standards, and fully coordinated with MEP and Civil constraints. We don't submit until we know it will pass."
    },
    scopeHeadline: "Our Structural Approach",
    scopes: [
      {
        title: "Building Design",
        desc: "Comprehensive structural framing for steel, concrete, masonry, and timber buildings, focusing on architectural intent and constructability."
      },
      {
        title: "Assessments & Inspections",
        desc: "Post-event evaluations, structural integrity reviews, and due diligence reporting for acquisitions or adaptive reuse projects."
      },
      {
        title: "Foundations & Retaining",
        desc: "Shallow and deep foundation systems, subterranean retaining walls, and shoring solutions tailored to site-specific geotechnical reports."
      },
      {
        title: "Seismic & Retrofits",
        desc: "Advanced dynamic analysis and retrofitting strategies for unreinforced masonry (URM), soft-story buildings, and historic preservation."
      }
    ],
    sectors: []
  },
  "civil": {
    title: "Civil Engineering",
    bg: civilBg,
    desc: "Site feasibility, precise grading, and intelligent stormwater management. We bridge the critical gap between raw land and vertical construction.",
    problemSection: {
      headline: "Laying the Groundwork for Vertical Success.",
      content: "The success of any development is dictated before the foundation is poured. Poor grading or inadequate utility sizing can stall a project indefinitely. We handle the complex topography, regulatory hurdles, and utility coordination to ensure your site is perfectly prepped, code-compliant, and ready for vertical execution."
    },
    scopeHeadline: "Civil Engineering Scope",
    scopes: [
      {
        title: "Site Feasibility",
        desc: "Pre-acquisition site analysis, conceptual grading, and utility availability studies to expose hidden developmental costs early."
      },
      {
        title: "Grading & Drainage",
        desc: "Topographical mastery to balance cut and fill, manage surface water flow, and establish accessible paths of travel (ADA compliance)."
      },
      {
        title: "Utilities Infrastructure",
        desc: "Sizing and routing of domestic water, fire lines, sanitary sewer, and dry utilities to service the demands of the new facility."
      },
      {
        title: "Stormwater & Detention",
        desc: "Low Impact Development (LID) strategies, bio-retention basins, and underground detention systems to meet strict environmental runoff mandates."
      }
    ],
    sectors: []
  },
  "assessments": {
    title: "Building Assessments",
    bg: assessmentBg,
    desc: "Independent engineering judgment for property transactions, renovations, and forensic analysis. We tell you exactly what you're buying or building on.",
    problemSection: {
      headline: "When Do You Need an Assessment?",
      content: "Whether you are a developer acquiring a value-add commercial property, an owner dealing with mysterious structural settling, or a tenant planning a massive equipment upgrade—you need facts, not assumptions. Our assessments provide plain-English, actionable intelligence on the exact condition, capacity, and remaining lifespan of a building's core systems."
    },
    scopeHeadline: "Assessment Deliverables",
    scopes: [
      {
        title: "Condition Reports",
        desc: "Thorough visual inspections outlining immediate hazards, deferred maintenance, and anticipated capital expenditures."
      },
      {
        title: "MEP Life-Expectancy",
        desc: "Detailed inventory and analysis of aging HVAC, electrical gear, and plumbing, with cost-to-replace projections."
      },
      {
        title: "Seismic Risk (PML)",
        desc: "Probable Maximum Loss studies to satisfy lender requirements and evaluate the structural survivability of major seismic events."
      },
      {
        title: "Code Violation Reviews",
        desc: "Forensic analysis of unpermitted additions and changes of use to determine the feasibility of legalizing existing conditions."
      }
    ],
    sectors: []
  }
};

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = params.id as keyof typeof servicesData;
  const service = servicesData[serviceId];

  if (!service) return <NotFound />;

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {service.bg && (
            <img 
              src={service.bg} 
              alt={service.title} 
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <Link href="/services" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8">
              Services <ArrowRight className="w-3 h-3" />
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              {service.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              {service.problemSection.headline}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {service.problemSection.content}
            </p>
          </div>
        </div>
      </section>

      {/* Scopes Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
            
            {/* Main Content */}
            <div className="space-y-12">
              <h2 className="text-3xl font-display font-bold mb-12 flex items-center gap-4">
                <span className="w-12 h-1 bg-primary inline-block"></span>
                {service.scopeHeadline}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.scopes.map((scope, idx) => (
                  <div key={idx} className="bg-card border border-border p-8 hover:border-primary/50 transition-colors group">
                    <div className="text-4xl font-display font-bold text-border group-hover:text-primary transition-colors mb-6">
                      0{idx + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{scope.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {scope.desc}
                    </p>
                  </div>
                ))}
              </div>

              {service.sectors && service.sectors.length > 0 && (
                <div className="mt-16 pt-16 border-t border-border">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-6">Sectors Served</h3>
                  <div className="flex flex-wrap gap-4">
                    {service.sectors.map((sector, i) => (
                      <div key={i} className="px-6 py-3 bg-secondary text-sm font-bold tracking-wider">
                        {sector}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div className="relative">
              <div className="sticky top-32 bg-card border border-border p-8">
                <div className="w-12 h-1 bg-primary mb-6"></div>
                <h3 className="font-display font-bold text-2xl mb-4">Engage Our Team</h3>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  Provide your architectural backgrounds or conceptual narrative. We will return a comprehensive, fixed-fee engineering proposal within 24 hours.
                </p>
                <ul className="space-y-4 mb-10 text-sm font-medium border-t border-border pt-8">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Nationwide PE Licensure
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Integrated Multi-Discipline
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> Guaranteed Proposal Pricing
                  </li>
                </ul>
                <Link 
                  href="/contact" 
                  className="flex h-14 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center w-full hover:bg-primary/90 transition-colors"
                >
                  Request a Proposal
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}