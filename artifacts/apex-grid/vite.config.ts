import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;
const isPostMergeValidation = process.env.POST_MERGE_VALIDATION === '1';
const isPrerenderBundle = process.env.PRERENDER_BUNDLE === '1';

/** Injects the Google Search Console verification <meta> tag into <head> at
 *  build/dev time when VITE_GOOGLE_SITE_VERIFICATION is set. This ensures
 *  Googlebot sees the tag on every page load without waiting for JS. */
function gscVerificationPlugin() {
  const code = process.env.VITE_GOOGLE_SITE_VERIFICATION;
  return {
    name: 'gsc-verification',
    transformIndexHtml(html: string) {
      if (!code) return html;
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta name="google-site-verification" content="${code}" />`,
      );
    },
  };
}
/** Dev-only: resolve directory URLs under /locations/ to their static index.html
 * (Vite's SPA fallback would otherwise swallow them). Static hosting handles this in production. */
function staticDirIndex() {
  return {
    name: 'static-dir-index',
    configureServer(server: {
      middlewares: {
        use: (
          fn: (req: { url?: string }, res: unknown, next: () => void) => void,
        ) => void;
      };
    }) {
      server.middlewares.use((req, _res, next) => {
        if (req.url) {
          const [pathname, query] = req.url.split('?');
           if (/^\/(locations|architecture|general-contracting|south-africa|blog|resources|who-we-work-with|project-types|existing-building-engineering|permit-engineering|industries|solutions|government|guides|structural-engineering|mep-engineering|mechanical-engineering|electrical-engineering|plumbing-engineering|civil-engineering|geotechnical-engineering|capabilities|government-contracting|engineering-process|quality-control|professional-engineering|title-24|projects|engineering-reports|jeremy-mills|sitemap|engineering-glossary|licensing-service-coverage|about|contact|for-architects|for-contractors|for-developers|for-property-managers|services|portfolio|military|team|privacy|terms)(\/|$)/.test(pathname)) {
            const rewritten = pathname.endsWith('/')
              ? `${pathname}index.html`
              : !path.extname(pathname)
                ? `${pathname}/index.html`
                : pathname;
            req.url = query ? `${rewritten}?${query}` : rewritten;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  // Post-merge validation compiles the real app without copying the 598 MB
  // generated SEO corpus. Normal development and production builds are unchanged.
  publicDir: isPostMergeValidation || isPrerenderBundle ? false : 'public',
  plugins: [
    gscVerificationPlugin(),
    staticDirIndex(),
    react(),
    tailwindcss({ optimize: false }),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(
      import.meta.dirname,
      isPrerenderBundle ? '.prerender' : isPostMergeValidation ? '.post-merge-dist' : 'dist/public',
    ),
    emptyOutDir: true,
    minify: isPostMergeValidation || isPrerenderBundle ? false : 'esbuild',
    reportCompressedSize: !isPostMergeValidation,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          // Keep Clerk in its own lazy-loaded chunk graph
          if (id.includes('@clerk')) return undefined;
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/')
          ) {
            return 'react-vendor';
          }
          if (id.includes('@radix-ui')) return 'radix';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('framer-motion')) return 'motion';
          return undefined;
        },
      },
    },
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    // Keep generated SEO routes previewable without asking Linux to watch
    // tens of thousands of static HTML, sitemap, and report files for
    // hot-reload changes. Ignoring public only disables file watching;
    // Vite's public-file middleware still serves these files in development.
    watch: {
      ignored: ['**/public/**'],
    },
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
