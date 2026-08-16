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
          if (/^\/(locations|blog|resources|who-we-work-with|project-types|existing-building-engineering|permit-engineering|industries|solutions|government|guides|structural-engineering|mep-engineering|mechanical-engineering|electrical-engineering|plumbing-engineering|civil-engineering|geotechnical-engineering|capabilities|government-contracting|engineering-process|quality-control|professional-engineering|title-24|projects|engineering-reports|sitemap|engineering-glossary)(\/|$)/.test(pathname)) {
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
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
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
