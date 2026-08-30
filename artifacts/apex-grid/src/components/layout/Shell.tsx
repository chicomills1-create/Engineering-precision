import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";
// Callback assistant temporarily disabled (Aug 2026) until Turnstile bot
// protection is configured. Re-enable by restoring this import and the
// <CallbackWidget /> render below.
// import { CallbackWidget } from "@/components/CallbackWidget";
import { useState, useEffect, useRef } from "react";
import { FEATURED_INDUSTRIES } from "@/data/industries";

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Industries", href: "/industries" },
    { name: "Delivery", href: "/team#construction-delivery" },
    { name: "Military", href: "/military" },
    { name: "Resources", href: "/resources" },
  ];

  const services = [
    { name: "MEP Design & Engineering", href: "/services/mep" },
    { name: "Structural Design & Engineering", href: "/services/structural" },
    { name: "Civil Engineering", href: "/services/civil" },
    { name: "Building Assessments", href: "/services/assessments" },
    { name: "Architectural Design", href: "/services/architecture" },
    { name: "General Contracting · PCM", href: "/team#construction-delivery" },
  ];

  // Static, content-rich discipline pages (generated into public/) — plain
  // anchors so the browser loads the static HTML instead of the SPA router.
  const disciplines = [
    { name: "Structural Engineering", href: "/structural-engineering/" },
    { name: "MEP Engineering", href: "/mep-engineering/" },
    { name: "Civil Engineering", href: "/civil-engineering/" },
    { name: "Mechanical (HVAC)", href: "/mechanical-engineering/" },
    { name: "Electrical Engineering", href: "/electrical-engineering/" },
    { name: "Plumbing Engineering", href: "/plumbing-engineering/" },
  ];

  return (
       <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl shadow-black/50" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="group flex items-center gap-3">
              <Logo className="w-9 h-9 text-primary group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-none tracking-tight group-hover:text-primary transition-colors">
                  APEX GRID
                </span>
                <span className="text-[8px] uppercase tracking-[0.12em] text-muted-foreground leading-none mt-1 whitespace-nowrap">
                  Engineering · Architecture · General Contracting
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
                     <div className="group/ind">
                      <Link
                        href={item.href}
                        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                          location.startsWith("/industries") ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {item.name} <ChevronDown className="w-4 h-4 opacity-50 group-hover/ind:rotate-180 transition-transform" />
                      </Link>
                       <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[min(1100px,95vw)] opacity-0 pointer-events-none group-hover/ind:opacity-100 group-hover/ind:pointer-events-auto group-focus-within/ind:opacity-100 group-focus-within/ind:pointer-events-auto transition-all translate-y-2 group-hover/ind:translate-y-0 group-focus-within/ind:translate-y-0">
                        <div className="bg-card border border-border p-8 shadow-2xl rounded-[2px] grid grid-cols-3 gap-x-10 gap-y-8">
                          <div className="col-span-3">
                            <div className="text-[11px] font-mono uppercase tracking-widest text-primary mb-3">Featured Industries</div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                              {FEATURED_INDUSTRIES.slice(0, 8).map((industry) => (
                                <Link
                                  key={industry.slug}
                                  href={`/industries/${industry.slug}`}
                                  className="text-sm py-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
                                >
                                  {industry.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="col-span-3 pt-4 border-t border-border flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">24 sectors organized by practice group</span>
                            <Link href="/industries" className="text-sm font-semibold text-primary hover:underline">
                              Browse All Industries →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group/nav">
                       <button
                         type="button"
                         aria-haspopup="menu"
                         className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                        location.startsWith("/services") ? "text-primary" : "text-muted-foreground"
                       }`}>
                        Services <ChevronDown className="w-4 h-4 opacity-50 group-hover/nav:rotate-180 transition-transform" />
                      </button>
                       <div className="absolute top-full left-0 pt-6 w-64 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto group-focus-within/nav:opacity-100 group-focus-within/nav:pointer-events-auto transition-all translate-y-2 group-hover/nav:translate-y-0 group-focus-within/nav:translate-y-0">
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
                          <div className="border-t border-border mt-1 pt-2">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-4 pb-1">Disciplines</div>
                            {disciplines.map(d => (
                              <a
                                key={d.href}
                                href={d.href}
                                className="block text-sm px-4 py-2.5 hover:bg-background hover:text-primary transition-colors text-muted-foreground font-medium rounded-[2px]"
                              >
                                {d.name}
                              </a>
                            ))}
                          </div>
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
              href="/request-proposal?utm_source=website&utm_medium=organic&utm_campaign=site_header"
              className="h-10 min-w-[150px] whitespace-nowrap px-5 bg-primary text-white font-semibold text-sm flex items-center justify-center rounded-[2px] hover:bg-primary/90 transition-colors"
            >
              Request a Proposal
            </Link>
          </nav>

          <button
            ref={mobileMenuButtonRef}
            type="button"
            className="xl:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            data-testid="button-mobile-navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
           <div id="mobile-navigation" className="xl:hidden absolute top-full left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
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
                    <div className="flex flex-col gap-1">
                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground p-2">Featured Industries</div>
                      {FEATURED_INDUSTRIES.slice(0, 8).map((industry) => (
                        <Link
                          key={industry.slug}
                          href={`/industries/${industry.slug}`}
                          className="text-base text-muted-foreground p-2 hover:text-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {industry.name}
                        </Link>
                      ))}
                      <Link
                        href="/industries"
                        className="text-base text-primary font-semibold p-2 hover:text-primary/80"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Browse All 24 Industries →
                      </Link>
                    </div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground p-2 mt-2 border-t border-border/50 pt-4">Services</div>
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
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground p-2 mt-2">Disciplines</div>
                    {disciplines.map(d => (
                      <a
                        key={d.href}
                        href={d.href}
                        className="text-base text-muted-foreground p-2 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {d.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 border-t border-border/50 pt-4">
              <Link
                href="/client-portal"
                className="text-base text-muted-foreground p-2 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Client Portal
              </Link>
              <span className="text-border">/</span>
              <Link
                href="/admin"
                className="text-base text-muted-foreground p-2 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Employee Access
              </Link>
            </div>
            <Link
              href="/request-proposal?utm_source=website&utm_medium=organic&utm_campaign=mobile_nav"
              className="h-14 w-full mt-4 bg-primary text-white font-bold flex items-center justify-center rounded-[2px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request a Proposal
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      {/* <CallbackWidget /> — disabled until bot protection is configured */}

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Logo className="w-9 h-9 text-primary" />
                <span className="font-display font-bold text-xl tracking-tight">
                  APEX GRID
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
                De-risking projects from concept to permit. Integrated Architecture, MEP, Structural, and Civil design backed by licensed professionals.
              </p>
              <a href="mailto:info@apexgrideng.com" className="inline-flex h-12 px-6 bg-secondary text-foreground font-semibold text-sm items-center justify-center rounded-[2px] hover:bg-white/10 transition-colors">
                info@apexgrideng.com
              </a>
            </div>
            
            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Firm</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/team" className="hover:text-primary transition-colors">Team</Link></li>
                <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
                <li><Link href="/capabilities" className="hover:text-primary transition-colors">Capabilities</Link></li>
                <li><a href="/blog/" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="/locations/" className="hover:text-primary transition-colors">Service Areas</a></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Link href="/client-portal" className="hover:text-primary transition-colors">Client Portal</Link>
                  <span className="text-border">/</span>
                  <Link href="/admin" className="hover:text-primary transition-colors">Employee Access</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Services</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li><Link href="/services/mep" className="hover:text-primary transition-colors">MEP Engineering</Link></li>
                <li><Link href="/services/structural" className="hover:text-primary transition-colors">Structural Design</Link></li>
                <li><Link href="/services/civil" className="hover:text-primary transition-colors">Civil Engineering</Link></li>
                <li><Link href="/services/assessments" className="hover:text-primary transition-colors">Building Assessments</Link></li>
                <li><Link href="/services/architecture" className="hover:text-primary transition-colors">Architectural Design</Link></li>
              </ul>
              <h4 className="font-display font-semibold mb-4 mt-8 text-sm uppercase tracking-wider text-muted-foreground">Disciplines</h4>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li><a href="/structural-engineering/" className="hover:text-primary transition-colors">Structural Engineering</a></li>
                <li><a href="/mep-engineering/" className="hover:text-primary transition-colors">MEP Engineering</a></li>
                <li><a href="/civil-engineering/" className="hover:text-primary transition-colors">Civil Engineering</a></li>
                <li><a href="/mechanical-engineering/" className="hover:text-primary transition-colors">Mechanical (HVAC)</a></li>
                <li><a href="/electrical-engineering/" className="hover:text-primary transition-colors">Electrical Engineering</a></li>
                <li><a href="/plumbing-engineering/" className="hover:text-primary transition-colors">Plumbing Engineering</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Who We Serve</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li><Link href="/for-architects" className="hover:text-primary transition-colors">For Architects</Link></li>
                <li><Link href="/for-contractors" className="hover:text-primary transition-colors">For Contractors</Link></li>
                <li><Link href="/for-developers" className="hover:text-primary transition-colors">For Developers</Link></li>
                <li><Link href="/for-property-managers" className="hover:text-primary transition-colors">For Property Managers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Contact</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li>
                  <span className="block font-medium text-foreground mb-1">Headquarters</span>
                  22475 E Quintero Rd<br />Queen Creek, AZ 85142
                </li>
                <li className="pt-4 border-t border-border/50">
                  <span className="block font-medium text-foreground mb-2">Service Areas</span>
                  <ul className="space-y-1 text-foreground/70">
                    <li>Los Angeles, CA</li>
                    <li>Miami, FL</li>
                    <li>Houston, TX</li>
                  </ul>
                </li>
                <li className="pt-4 border-t border-border/50">
                  <a href="tel:+14804900064" className="hover:text-primary transition-colors font-medium">
                    (480) 490-0064
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
