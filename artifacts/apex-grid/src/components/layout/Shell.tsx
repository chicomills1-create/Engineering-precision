import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/90 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-[2px] flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-primary-foreground" />
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

          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="h-10 px-6 bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center rounded-[2px] hover:bg-primary/90 transition-colors"
            >
              Start a Project
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium p-2 text-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="h-12 w-full mt-4 bg-primary text-primary-foreground font-bold flex items-center justify-center rounded-[2px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start a Project
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 bg-primary rounded-[2px] flex items-center justify-center">
                  <div className="w-2 h-2 border-2 border-primary-foreground" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight">
                  APEX GRID
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
                Licensed engineering firm offering precise, code-compliant MEP, Structural, Civil, Fire Protection, and Title 24 design. Nationwide reach, unyielding standards.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Offices</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li>
                  <span className="block font-medium text-foreground mb-1">Headquarters</span>
                  1450 Technical Parkway<br />Suite 400<br />San Jose, CA 95134
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-6 text-sm uppercase tracking-wider text-muted-foreground">Connect</h4>
              <ul className="space-y-4 text-sm text-foreground/80">
                <li>
                  <a href="mailto:plans@apexgrid.eng" className="hover:text-primary transition-colors">
                    plans@apexgrid.eng
                  </a>
                </li>
                <li>
                  <a href="tel:+18005550199" className="hover:text-primary transition-colors">
                    +1 (800) 555-0199
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
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
