import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Industries", href: "/industries" },
    { name: "Resources", href: "/resources" },
  ];

  const services = [
    { name: "MEP Design & Engineering", href: "/services/mep" },
    { name: "Structural Design & Engineering", href: "/services/structural" },
    { name: "Civil Engineering", href: "/services/civil" },
    { name: "Building Assessments", href: "/services/assessments" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-[2px] flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none tracking-tight group-hover:text-primary transition-colors">
                  APEX GRID
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-none mt-1">
                  Engineering
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-8">
            {navigation.map((item) => {
              // Insert Services dropdown after Industries
              if (item.name === "Industries") {
                return (
                  <div key="services-group" className="flex items-center gap-8">
                    <Link
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        location === item.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                    
                    <div className="relative group/nav">
                      <button className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                        location.startsWith("/services") ? "text-primary" : "text-muted-foreground"
                      }`}>
                        Services <ChevronDown className="w-4 h-4 opacity-50 group-hover/nav:rotate-180 transition-transform" />
                      </button>
                      <div className="absolute top-full left-0 pt-6 w-64 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all translate-y-2 group-hover/nav:translate-y-0">
                        <div className="bg-card border border-border p-2 shadow-2xl flex flex-col gap-1 rounded-[2px]">
                          {services.map(service => (
                            <Link 
                              key={service.href} 
                              href={service.href}
                              className="text-sm px-4 py-3 hover:bg-background hover:text-primary transition-colors text-muted-foreground font-medium rounded-[2px]"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="h-10 px-6 bg-primary text-white font-semibold text-sm flex items-center justify-center rounded-[2px] hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          <button
            className="xl:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name} className="flex flex-col gap-2">
                <Link
                  href={item.href}
                  className="text-lg font-medium p-2 text-foreground hover:text-primary border-b border-border/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.name === "Industries" && (
                  <div className="pl-4 flex flex-col gap-2 mt-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground p-2">Services</div>
                    {services.map(service => (
                      <Link 
                        key={service.href} 
                        href={service.href}
                        className="text-base text-muted-foreground p-2 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="h-14 w-full mt-4 bg-primary text-white font-bold flex items-center justify-center rounded-[2px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary rounded-[2px] flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-white" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight">
                  APEX GRID
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
                De-risking projects from concept to permit. Integrated MEP, Structural, and Civil engineering backed by licensed professionals.
              </p>
              <a href="mailto:plans@apexgrid.eng" className="inline-flex h-12 px-6 bg-secondary text-foreground font-semibold text-sm items-center justify-center rounded-[2px] hover:bg-white/10 transition-colors">
                plans@apexgrid.eng
              </a>
            </div>
            
            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Firm</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Services</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li><Link href="/services/mep" className="hover:text-primary transition-colors">MEP Engineering</Link></li>
                <li><Link href="/services/structural" className="hover:text-primary transition-colors">Structural Design</Link></li>
                <li><Link href="/services/civil" className="hover:text-primary transition-colors">Civil Engineering</Link></li>
                <li><Link href="/services/assessments" className="hover:text-primary transition-colors">Building Assessments</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Contact</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li>
                  <span className="block font-medium text-foreground mb-1">National HQ</span>
                  1450 Technical Parkway<br />Suite 400<br />San Jose, CA 95134
                </li>
                <li className="pt-4 border-t border-border/50">
                  <a href="tel:+18005550199" className="hover:text-primary transition-colors font-medium">
                    +1 (800) 555-0199
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Apex Grid Engineering. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}