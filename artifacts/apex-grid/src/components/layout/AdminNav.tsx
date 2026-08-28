import { Link, useLocation } from 'wouter';
import { useClerk } from '@clerk/react';
import { LogOut } from 'lucide-react';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function AdminNav() {
  const [location] = useLocation();
  const { signOut } = useClerk();

  const links = [
    { href: '/admin', label: 'Inquiries' },
    { href: '/admin/seo', label: 'SEO' },
    { href: '/admin/outreach', label: 'Outreach' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {links.map((link) => {
        // location matches exact or starts with for active state?
        // simple exact match
        const isActive = location === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`inline-flex items-center gap-2 h-9 px-4 border rounded-[2px] text-sm transition-colors ${
              isActive
                ? 'border-primary/50 text-primary bg-primary/10'
                : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
            data-testid={`link-admin-nav-${link.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
          >
            {link.label}
          </Link>
        );
      })}
      <div className="flex-1" />
      <button
        type="button"
        onClick={() => signOut({ redirectUrl: basePath || '/' })}
        className="inline-flex items-center gap-2 h-9 px-4 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 rounded-[2px] transition-colors"
        data-testid="button-admin-nav-sign-out"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </div>
  );
}
