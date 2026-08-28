import Admin from '@/pages/Admin';
import AdminSeo from '@/pages/AdminSeo';
import AdminOutreach from '@/pages/AdminOutreach';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { useEffect, useRef } from 'react';
import { ClerkProvider, SignIn, SignUp, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { dark } from '@clerk/themes';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

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

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || '/'
    : path;
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

function SignInPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-16">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

export type ClerkAreaPage = 'admin' | 'admin-seo' | 'admin-outreach' | 'sign-in' | 'sign-up';

export default function ClerkArea({ page }: { page: ClerkAreaPage }) {
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
      <ClerkQueryClientCacheInvalidator />
      {page === 'admin' && <Admin />}
      {page === 'admin-seo' && <AdminSeo />}
      {page === 'admin-outreach' && <AdminOutreach />}
      {page === 'sign-in' && <SignInPage />}
      {page === 'sign-up' && <SignUpPage />}
    </ClerkProvider>
  );
}
