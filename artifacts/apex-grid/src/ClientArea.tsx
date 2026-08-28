import { ClerkProvider } from '@clerk/react';
import { useLocation } from 'wouter';
import ProjectIntake from '@/pages/ProjectIntake';
import ClientPortal from '@/pages/ClientPortal';
import {
  basePath,
  clerkAppearance,
  clerkProxyUrl,
  clerkPubKey,
  ClerkQueryClientCacheInvalidator,
  stripBase,
} from '@/ClerkArea';

export default function ClientArea({ page }: { page: 'submit' | 'portal' }) {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <ClerkQueryClientCacheInvalidator />
      {page === 'submit' ? <ProjectIntake /> : <ClientPortal />}
    </ClerkProvider>
  );
}