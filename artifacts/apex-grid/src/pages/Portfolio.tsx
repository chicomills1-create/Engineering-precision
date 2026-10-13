import { Link } from "wouter";
import project1 from "@assets/generated_images/project-1.webp";
import project2 from "@assets/generated_images/project-2.webp";
import project3 from "@assets/generated_images/project-3.webp";
import project4 from "@assets/generated_images/project-4.webp";
import project5 from "@assets/generated_images/project-5.webp";
import project6 from "@assets/generated_images/project-6.webp";
import project7 from "@assets/generated_images/project-7.webp";
import project8 from "@assets/generated_images/project-8.webp";
import project9 from "@assets/generated_images/project-9.webp";
import portfolioBg from "@assets/generated_images/portfolio-bg.webp";
import { usePageMeta } from "@/lib/seo";

export default function Portfolio() {
  usePageMeta({
    title: "Engineering Project Portfolio | Apex Grid Engineering",
    description: "Explore Apex Grid Engineering work across commercial structural, civil, MEP, architecture, and building-assessment projects.",
    path: "/portfolio",
  });
  const projects = [
    {
      id: 1,
      title: "Mixed-Use High-Rise Tower",
      sector: "Mixed-Use High Rise",
      disciplines: ["Structural", "MEP", "Title 24"],
      image: project1,
      description: "A representative high-rise scenario: a 42-story mixed-use tower calling for advanced seismic structural engineering and highly efficient HVAC routing through constrained plenum spaces. The design approach integrates luxury residential units over 10 floors of commercial office space, balancing complex load transfers and large centralized cooling requirements.",
      stats: [
        { label: "Scale", value: "850K sq ft" },
        { label: "Cooling", value: "1,200 Tons" },
        { label: "Steel", value: "4,500 Tons" }
      ]
    },
    {
      id: 2,
      title: "Data Center Campus",
      sector: "Mission Critical / Industrial",
      disciplines: ["MEP", "Fire Protection"],
      image: project2,
      description: "A representative mission-critical scenario: MEP design featuring N+1 redundancy, advanced cooling distribution, and pre-action fire suppression systems. The facility profile demands highly reliable electrical distribution to support extreme rack densities, with large backup generator arrays integrated into the structural envelope.",
      stats: [
        { label: "Power", value: "32 MW" },
        { label: "Density", value: "250 W/sq ft" },
        { label: "Uptime", value: "Tier III" }
      ]
    },
    {
      id: 3,
      title: "Medical Campus",
      sector: "Healthcare",
      disciplines: ["Civil", "Structural", "MEP"],
      image: project3,
      description: "A representative healthcare scenario: complete site and vertical engineering for a new medical campus. The civil scope covers complex retaining walls and large stormwater detention basins, while the MEP approach addresses stringent healthcare requirements for negative-pressure isolation rooms and medical gas routing.",
      stats: [
        { label: "Scale", value: "120K sq ft" },
        { label: "Site Area", value: "14 Acres" },
        { label: "Beds", value: "85" }
      ]
    },
    {
      id: 4,
      title: "Logistics Hub",
      sector: "Industrial Warehouse",
      disciplines: ["Structural", "Civil", "Title 24"],
      image: project4,
      description: "A representative industrial scenario: a large logistics facility in tilt-up concrete construction. The structural approach minimizes steel tonnage while supporting extensive rooftop solar arrays, and civil engineering handles heavy-duty pavement design for 24/7 autonomous truck traffic.",
      stats: [
        { label: "Scale", value: "500K sq ft" },
        { label: "Clear Height", value: "40 ft" },
        { label: "Docks", value: "112" }
      ]
    },
    {
      id: 5,
      title: "Multifamily Podium Lofts",
      sector: "Multifamily Residential",
      disciplines: ["Structural", "MEP"],
      image: project5,
      description: "A representative multifamily scenario: 5-over-2 podium construction on a dense urban infill site. The structural approach navigates complex foundation underpinning adjacent to historic structures, and MEP systems use highly efficient centralized VRF systems to maximize ceiling heights in the residential units.",
      stats: [
        { label: "Units", value: "245" },
        { label: "Levels", value: "7" },
        { label: "Efficiency", value: "LEED Gold" }
      ]
    },
    {
      id: 6,
      title: "Worship Center",
      sector: "Religious / Assembly",
      disciplines: ["Structural", "MEP", "Civil"],
      image: project6,
      description: "A representative assembly scenario: a 1,800-seat worship facility with long-span steel roof framing over a column-free sanctuary. Assembly occupancy drives the engineering — high-volume ventilation sized for peak occupancy swings, acoustic-sensitive duct routing to keep mechanical noise out of the sanctuary, and site design for surge parking and event-day traffic flow.",
      stats: [
        { label: "Seats", value: "1,800" },
        { label: "Clear Span", value: "140 ft" },
        { label: "Site Area", value: "11 Acres" }
      ]
    },
    {
      id: 7,
      title: "Corporate Office Center",
      sector: "Commercial Office",
      disciplines: ["MEP", "Structural"],
      image: project7,
      description: "A representative office scenario: core-and-shell engineering for a Class A office campus, with tenant-ready MEP infrastructure designed for flexible floor-plate demising. The approach right-sizes central plant capacity, plans vertical distribution around future tenant improvements, and optimizes structural framing for open floor plates and rooftop amenity loads.",
      stats: [
        { label: "Scale", value: "310K sq ft" },
        { label: "Floors", value: "12" },
        { label: "Parking", value: "5-Level Garage" }
      ]
    },
    {
      id: 8,
      title: "Open-Air Retail Center",
      sector: "Retail / Hospitality",
      disciplines: ["Civil", "MEP", "Structural"],
      image: project8,
      description: "A representative retail scenario: a multi-building open-air retail and restaurant center. The civil scope covers full site development — grading, shared stormwater retention, and utility distribution to nine pads — and restaurant tenants call for commercial kitchen ventilation, grease systems, and heavy electrical services coordinated across shell buildings.",
      stats: [
        { label: "Buildings", value: "9" },
        { label: "Scale", value: "185K sq ft" },
        { label: "Restaurant Pads", value: "6" }
      ]
    },
    {
      id: 9,
      title: "STEM Academy Campus",
      sector: "Education",
      disciplines: ["Structural", "MEP", "Civil"],
      image: project9,
      description: "A representative education scenario: a two-story K-8 academic building with laboratory classrooms. The engineering emphasizes lab ventilation and fume exhaust, campus-wide utility infrastructure, and shaded outdoor learning courtyards, with structural design that accommodates phased construction so an existing campus can stay in session through the build.",
      stats: [
        { label: "Students", value: "1,200" },
        { label: "Scale", value: "95K sq ft" },
        { label: "Classrooms", value: "48" }
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-32 overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {portfolioBg && (
            <img 
              src={portfolioBg} 
              alt="Rendered concept imagery for representative engineering scenarios" 
              className="w-full h-full object-cover opacity-40"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Representative <span className="text-muted-foreground">Projects &amp; Capability Scenarios</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl border-l-4 border-primary pl-6">
              We engineer structures that stand and systems that work. The scenarios below are representative of the project types we design and the scales we engineer for — capability examples that show how we approach the work.
            </p>
            <div className="mt-8 max-w-2xl border border-primary/40 bg-card/60 p-5">
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                This page presents representative project types and illustrative specifications. Images are renders. These are not records of completed Apex projects. Verified references available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-32">
            {projects.map((project, idx) => (
              <div key={project.id} className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 lg:gap-20 items-center">
                
                {/* Visual Side */}
                <div className={`order-2 ${idx % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="aspect-[4/3] bg-card border border-border relative overflow-hidden group">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={`Rendered concept: ${project.title} — representative scenario`} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                        <div className="text-center">
                          <div className="w-16 h-[2px] bg-border mx-auto mb-4"></div>
                          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Documentation Archive</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`order-1 ${idx % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                    <span className="text-primary">{project.sector}</span>
                  </div>

                  <h2 className="text-4xl font-display font-bold mb-6 leading-tight">
                    {project.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.disciplines.map(d => (
                      <span key={d} className="px-3 py-1 bg-secondary text-xs font-bold uppercase tracking-wider text-foreground">
                        {d}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                    {project.description}
                  </p>

                  <div className="pt-8 border-t border-border">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Illustrative specifications</div>
                    <div className="grid grid-cols-3 gap-6">
                    {project.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-2xl font-display font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Have a project in one of these sectors?</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Tell us about your project. We can share verified references on request and walk through how we would approach your scope.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-16 px-10 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(184,0,0,0.3)]"
          >
            Contact Us for Verified References
          </Link>
        </div>
      </section>
    </div>
  );
}
