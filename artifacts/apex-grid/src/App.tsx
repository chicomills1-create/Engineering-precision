import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

import { Shell } from '@/components/layout/Shell';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Legal from '@/pages/Legal';
import Portfolio from '@/pages/Portfolio';
import Industries from '@/pages/Industries';
import IndustryDetail from '@/pages/IndustryDetail';
import Military from '@/pages/Military';
import Resources from '@/pages/Resources';
import About from '@/pages/About';
import Team from '@/pages/Team';
import Contact from '@/pages/Contact';
import Unsubscribe from '@/pages/Unsubscribe';
import Audience from '@/pages/Audience';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { lazy, Suspense, useEffect } from 'react';
import Capabilities from '@/pages/Capabilities';

const ClerkArea = lazy(() => import('@/ClerkArea'));
const ClientArea = lazy(() => import('@/ClientArea'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

function LazyClerk({ page }: { page: 'admin' | 'admin-seo' | 'admin-outreach' | 'admin-growth' | 'admin-payroll' | 'sign-in' | 'sign-up' }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-background text-muted-foreground">
          Loading…
        </div>
      }
    >
      <ClerkArea page={page} />
    </Suspense>
  );
}

function LazyClient({ page }: { page: 'submit' | 'portal' }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-background text-muted-foreground">
          Loading…
        </div>
      }
    >
      <ClientArea page={page} />
    </Suspense>
  );
}

function Router() {
  return (
    <Shell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:id" component={ServiceDetail} />
        <Route path="/privacy">
          <Legal page="privacy" />
        </Route>
        <Route path="/terms">
          <Legal page="terms" />
        </Route>
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/industries" component={Industries} />
        <Route path="/industries/:slug" component={IndustryDetail} />
        <Route path="/industries/:slug/" component={IndustryDetail} />
        <Route path="/military" component={Military} />
        <Route path="/resources" component={Resources} />
        <Route path="/about" component={About} />
        <Route path="/team" component={Team} />
        <Route path="/contact" component={Contact} />
        <Route path="/submit-project">
          <LazyClient page="submit" />
        </Route>
        <Route path="/client-portal">
          <LazyClient page="portal" />
        </Route>
        <Route path="/unsubscribe" component={Unsubscribe} />
        <Route path="/capabilities" component={Capabilities} />
        <Route path="/for-architects">
          <Audience audience="architects" />
        </Route>
        <Route path="/for-contractors">
          <Audience audience="contractors" />
        </Route>
        <Route path="/for-developers">
          <Audience audience="developers" />
        </Route>
        <Route path="/for-property-managers">
          <Audience audience="property-managers" />
        </Route>
        <Route path="/admin">
          <LazyClerk page="admin" />
        </Route>
        <Route path="/admin/seo">
          <LazyClerk page="admin-seo" />
        </Route>
        <Route path="/admin/outreach">
          <LazyClerk page="admin-outreach" />
        </Route>
        <Route path="/admin/growth">
          <LazyClerk page="admin-growth" />
        </Route>
        <Route path="/admin/payroll">
          <LazyClerk page="admin-payroll" />
        </Route>
        <Route path="/sign-in/*?">
          <LazyClerk page="sign-in" />
        </Route>
        <Route path="/sign-up/*?">
          <LazyClerk page="sign-up" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function App() {
  // Ensure dark mode is active as requested
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <WouterRouter base={basePath}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;
