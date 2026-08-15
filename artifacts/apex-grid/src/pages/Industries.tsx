import { Link } from "wouter";
import { ArrowRight, Flag } from "lucide-react";
import industriesBg from "@assets/generated_images/industries-bg.webp";
import militaryBg from "@assets/generated_images/military-bg.webp";

export default function Industries() {
  const sectors = [
    { name: "Healthcare", desc: "OSHPD compliance, medical gas, negative pressure isolation rooms, and resilient power for clinics and hospitals." },
    { name: "Data Centers", desc: "N+1 cooling redundancy, high-density power distribution, and pre-action fire suppression." },
    { name: "Tenant Improvement", desc: "Rapid turnaround structural and MEP modifications for retail, office, and restaurant build-outs." },
    { name: "Industrial / Warehouse", desc: "Tilt-up concrete structures, high-bay lighting, and large-scale ventilation." },
    { name: "Multifamily Residential", desc: "Optimized structural framing and highly efficient centralized or distributed MEP systems." },
    { name: "Retail & Hospitality", desc: "Brand-compliant aesthetic integration, commercial kitchens, and guest comfort systems." },
    { name: "Education", desc: "DSA compliance, laboratory ventilation, and campus-wide utility infrastructure." },
    { name: "Life Science", desc: "Clean rooms, fume hood exhaust, specialized lab gas systems, and vibration-sensitive structural design." },
    { name: "Government & Civic", desc: "High-security structural hardening, ATFP compliance, and stringent energy mandates." },
    { name: "Military & Defense", desc: "Veteran-owned firm engineering to UFC criteria — ATFP standoff and hardening, secure facilities, and DoD energy mandates for installations and support facilities." },
    { name: "Religious & Worship Facilities", desc: "Long-span column-free sanctuaries, assembly occupancy ventilation, acoustic-sensitive MEP, and event-day site and parking design." },
    { name: "Commercial Office", desc: "Core-and-shell engineering, tenant-ready MEP infrastructure, and flexible floor plates designed for future build-outs." },
    { name: "Restaurants & Food Service", desc: "Commercial kitchen ventilation, grease exhaust and make-up air, health-code plumbing, and fast-track tenant conversions." },
    { name: "Senior Living & Assisted Care", desc: "Licensing-driven life-safety design, emergency and standby power for required critical loads, accessibility compliance, and resident comfort systems." },
    { name: "Solar & Renewable Energy", desc: "Rooftop and carport PV structural analysis, battery energy storage systems, and utility interconnection coordination." },
    { name: "EV Charging & Automotive", desc: "DC fast-charge power distribution, service and dealership facilities, and load studies for electrified fleets." },
    { name: "Cold Storage & Food Processing", desc: "Low-temperature envelope and refrigeration engineering, freezer slab design, and process spaces engineered to support food-safety and sanitation requirements." },
    { name: "Self-Storage", desc: "Efficient structural systems for single and multi-story facilities, climate-controlled zoning, and phased site development." },
    { name: "Parking Structures", desc: "Post-tensioned and precast structural design, ventilation and CO monitoring, and EV-ready electrical infrastructure." },
    { name: "Aviation & Hangars", desc: "Long-span hangar structures, fire suppression coordination, hazardous-location electrical design where fuel operations require it, and apron drainage." },
    { name: "Fitness & Recreation", desc: "Long-span gymnasium and pool structures, high-ventilation and dehumidification systems, and vibration-tolerant floor design." },
    { name: "Breweries & Beverage", desc: "Process piping and floor drainage, heavy tank loading, CO2 monitoring, and taproom assembly-occupancy conversions." },
    { name: "Telecommunications", desc: "Tower and rooftop mount structural analysis, equipment shelter design, and resilient DC power and cooling systems." },
    { name: "Agriculture & Cannabis", desc: "Controlled-environment growing facilities, high-density lighting and dehumidification loads, and hazardous-process extraction design coordinated with fire and building officials." }
  ];

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
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {sectors.map((sector, idx) => (
              <div key={idx} className="bg-background p-10 hover:bg-secondary/50 transition-colors group">
                <div className="w-12 h-[2px] bg-primary mb-6 transition-all group-hover:w-16" />
                <h3 className="text-2xl font-display font-bold mb-4">{sector.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sector.desc}
                </p>
              </div>
            ))}
          </div>
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