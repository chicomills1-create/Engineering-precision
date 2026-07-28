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
import Resources from '@/pages/Resources';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { useEffect, useRef } from 'react';
import { ClerkProvider, SignIn, SignUp, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { dark } from '@clerk/themes';
import Admin from '@/pages/Admin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);
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
        <Route path="/resources" component={Resources} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route path="/sign-in/*?" component={SignInPage} />
        <Route path="/sign-up/*?" component={SignUpPage} />
        <Route component={NotFound} />
      </Switch>
    </Shell>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: 'Admin access',
            subtitle: 'Sign in to view project inquiries',
          },
        },
        signUp: {
          start: {
            title: 'Create your account',
            subtitle: 'Apex Grid Engineering admin',
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
function App() {
  // Ensure dark mode is active as requested
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;

const clerkAppearance = {
  theme: dark,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: 'hsl(0 72% 48%)',
    colorForeground: 'hsl(0 0% 92%)',
    colorMutedForeground: 'hsl(0 0% 62%)',
    colorDanger: 'hsl(0 62% 45%)',
    colorBackground: 'hsl(0 0% 8%)',
    colorInput: 'hsl(0 0% 12%)',
    colorInputForeground: 'hsl(0 0% 92%)',
    colorNeutral: 'hsl(0 0% 62%)',
    fontFamily: "'Inter', sans-serif",
    borderRadius: '0.25rem',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_14%)] rounded-[4px] w-[440px] max-w-full overflow-hidden shadow-2xl',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: "text-white font-bold [font-family:'Space_Grotesk',sans-serif]",
    headerSubtitle: 'text-[hsl(0_0%_62%)]',
    socialButtonsBlockButtonText: 'text-[hsl(0_0%_92%)]',
    formFieldLabel: 'text-[hsl(0_0%_80%)]',
    footerActionLink: 'text-[hsl(0_72%_58%)] hover:text-[hsl(0_72%_65%)]',
    footerActionText: 'text-[hsl(0_0%_62%)]',
    dividerText: 'text-[hsl(0_0%_62%)]',
    identityPreviewEditButton: 'text-[hsl(0_72%_58%)]',
    formFieldSuccessText: 'text-[hsl(0_0%_62%)]',
    alertText: 'text-[hsl(0_0%_92%)]',
    logoBox: 'justify-center',
    logoImage: 'h-10',
    socialButtonsBlockButton: 'border-[hsl(0_0%_20%)] bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_16%)]',
    formButtonPrimary: 'bg-[hsl(0_72%_48%)] hover:bg-[hsl(0_72%_42%)] text-white font-semibold',
    formFieldInput: 'bg-[hsl(0_0%_12%)] border-[hsl(0_0%_20%)] text-[hsl(0_0%_92%)]',
    footerAction: 'justify-center',
    dividerLine: 'bg-[hsl(0_0%_20%)]',
    alert: 'bg-[hsl(0_0%_12%)] border-[hsl(0_0%_20%)]',
    otpCodeFieldInput: 'bg-[hsl(0_0%_12%)] border-[hsl(0_0%_20%)] text-white',
    formFieldRow: 'gap-2',
    main: 'gap-6',
  },
};

function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || '/'
    : path;
}
