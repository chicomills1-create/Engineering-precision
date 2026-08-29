import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'wouter';
import { usePageMeta } from '@/lib/seo';

export default function NotFound() {
  usePageMeta({
    title: 'Page Not Found | Apex Grid Engineering',
    description: 'The requested Apex Grid Engineering page could not be found.',
    path: window.location.pathname,
    canonical: false,
  });
  useEffect(() => {
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousContent = robots?.content;
    const createdRobotsTag = !robots;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
    return () => {
      if (createdRobotsTag) robots?.remove();
      else if (robots && previousContent !== undefined) robots.content = previousContent;
    };
  }, []);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-foreground">
              404 Page Not Found
            </h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">The page may have moved or the address may be incomplete.</p>
          <Link href="/" className="inline-flex mt-6 text-sm font-semibold text-primary hover:underline" data-testid="link-not-found-home">
            Return to the Apex Grid homepage
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
