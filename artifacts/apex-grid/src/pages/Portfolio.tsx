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

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Nexus Commercial Tower",
      sector: "Mixed-Use High Rise",
      location: "Seattle, WA",
      year: "2023",
      disciplines: ["Structural", "MEP", "Title 24"],
      image: project1,
      description: "A 42-story tower requiring advanced seismic structural engineering and highly efficient HVAC routing through constrained plenum spaces. The design successfully integrated luxury residential units over 10 floors of commercial office space, balancing complex load transfers and massive centralized cooling requirements.",
      stats: [
        { label: "Scale", value: "850K sq ft" },
        { label: "Cooling", value: "1,200 Tons" },
        { label: "Steel", value: "4,500 Tons" }
      ]
    },
    {
      id: 2,
      title: "Veridian Data Center",
      sector: "Mission Critical / Industrial",
      location: "Ashburn, VA",
      year: "2023",
      disciplines: ["MEP", "Fire Protection"],
      image: project2,
      description: "Mission-critical MEP design featuring N+1 redundancy, advanced cooling distribution, and pre-action fire suppression systems. The facility demanded highly reliable electrical distribution to support extreme rack densities, alongside massive backup generator arrays seamlessly integrated into the structural envelope.",
      stats: [
        { label: "Power", value: "32 MW" },
        { label: "Density", value: "250 W/sq ft" },
        { label: "Uptime", value: "Tier III" }
      ]
    },
    {
      id: 3,
      title: "Desert Sky Medical Campus",
      sector: "Healthcare",
      location: "Queen Creek, AZ",
      year: "2024",
      disciplines: ["Civil", "Structural", "MEP"],
      image: project3,
      description: "Complete site and vertical engineering for a sprawling new healthcare facility. The civil scope included complex retaining walls and massive stormwater detention basins, while the MEP team tackled stringent OSHPD-level equivalent requirements for negative pressure isolation rooms and medical gas routing.",
      stats: [
        { label: "Scale", value: "120K sq ft" },
        { label: "Site Area", value: "14 Acres" },
        { label: "Beds", value: "85" }
      ]
    },
    {
      id: 4,
      title: "Aero Logistics Hub",
      sector: "Industrial Warehouse",
      location: "Reno, NV",
      year: "2022",
      disciplines: ["Structural", "Civil", "Title 24"],
      image: project4,
      description: "A massive logistics facility utilizing tilt-up concrete construction. Optimized for rapid deployment, the structural design minimized steel tonnage while supporting extensive rooftop solar arrays. Civil engineering handled heavy-duty pavement design for 24/7 autonomous truck traffic.",
      stats: [
        { label: "Scale", value: "500K sq ft" },
        { label: "Clear Height", value: "40 ft" },
        { label: "Docks", value: "112" }
      ]
    },
    {
      id: 5,
      title: "The Foundry Lofts",
      sector: "Multifamily Residential",
      location: "Austin, TX",
      year: "2023",
      disciplines: ["Structural", "MEP"],
      image: project5,
      description: "A 5-over-2 podium construction project in a dense urban infill site. Structural engineering navigated complex foundation underpinning adjacent to historic structures. MEP systems utilized highly efficient centralized VRF systems to maximize ceiling heights in the residential units.",
      stats: [
        { label: "Units", value: "245" },
        { label: "Levels", value: "7" },
        { label: "Efficiency", value: "LEED Gold" }
      ]
    },
    {
      id: 6,
      title: "Summit Ridge Worship Center",
      sector: "Religious / Assembly",
      location: "Gilbert, AZ",
      year: "2024",
      disciplines: ["Structural", "MEP", "Civil"],
      image: project6,
      description: "A 1,800-seat worship facility with long-span steel roof framing over a column-free sanctuary. Assembly occupancy drove the engineering: high-volume ventilation sized for peak occupancy swings, acoustic-sensitive duct routing to keep mechanical noise out of the sanctuary, and site design for surge parking and traffic flow on event days.",
      stats: [
        { label: "Seats", value: "1,800" },
        { label: "Clear Span", value: "140 ft" },
        { label: "Site Area", value: "11 Acres" }
      ]
    },
    {
      id: 7,
      title: "Meridian Corporate Center",
      sector: "Commercial Office",
      location: "Dallas, TX",
      year: "2023",
      disciplines: ["MEP", "Structural"],
      image: project7,
      description: "Core-and-shell engineering for a Class A office campus, with tenant-ready MEP infrastructure designed for flexible floor-plate demising. Right-sized central plant capacity, vertical distribution planned around future tenant improvements, and structural framing optimized for open floor plates and rooftop amenity loads.",
      stats: [
        { label: "Scale", value: "310K sq ft" },
        { label: "Floors", value: "12" },
        { label: "Parking", value: "5-Level Garage" }
      ]
    },
    {
      id: 8,
      title: "The Marketplace at Sonoran Crossing",
      sector: "Retail / Hospitality",
      location: "Phoenix, AZ",
      year: "2022",
      disciplines: ["Civil", "MEP", "Structural"],
      image: project8,
      description: "A multi-building open-air retail and restaurant center. Civil scope covered full site development — grading, shared stormwater retention, and utility distribution to nine pads. Restaurant tenants required commercial kitchen ventilation, grease systems, and heavy electrical services coordinated across shell buildings.",
      stats: [
        { label: "Buildings", value: "9" },
        { label: "Scale", value: "185K sq ft" },
        { label: "Restaurant Pads", value: "6" }
      ]
    },
    {
      id: 9,
      title: "Copper Trail STEM Academy",
      sector: "Education",
      location: "Mesa, AZ",
      year: "2024",
      disciplines: ["Structural", "MEP", "Civil"],
      image: project9,
      description: "A two-story K-8 academic building with laboratory classrooms. Engineering emphasized lab ventilation and fume exhaust, campus-wide utility infrastructure, and shaded outdoor learning courtyards. Structural design accommodated phased construction so the existing campus could stay in session through the build.",
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
              alt="Engineering Portfolio" 
              className="w-full h-full object-cover opacity-40"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Proven <span className="text-muted-foreground">Execution</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl border-l-4 border-primary pl-6">
              We engineer structures that stand and systems that work. Review our selected portfolio of permitted, built projects across the country.
            </p>
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
                        alt={project.title} 
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
                    <span className="text-primary">{project.location}</span>
                    <span className="w-1 h-1 bg-border rounded-full"></span>
                    <span>{project.year}</span>
                    <span className="w-1 h-1 bg-border rounded-full"></span>
                    <span>{project.sector}</span>
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

                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                    {project.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-2xl font-display font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Ready to add your project to the board?</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            We maintain an extensive archive of permitted construction documents we can share under NDA to demonstrate our specific expertise in your sector.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-16 px-10 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(184,0,0,0.3)]"
          >
            Request Full Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}