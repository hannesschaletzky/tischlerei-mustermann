// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Mängelfassung für den Beispielbericht des Website-Check-ups (MAENGEL=1 npm run build): eigene Adresse, keine CSP
const maengel = process.env.MAENGEL === '1';

export default defineConfig({
  site: maengel ? 'https://vorher.tischlerei-mustermann.hschaletzky.com' : 'https://tischlerei-mustermann.hschaletzky.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'never' },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: { jpeg: { mozjpeg: true, quality: 72 }, webp: { quality: 72 }, avif: { quality: 55 } },
    },
  },
  // Ein gemeinsames Stylesheet statt vieler kleiner: ein Request, danach aus dem Cache
  vite: { build: { cssCodeSplit: false } },
  ...(maengel ? {} : {
    security: {
      csp: {
        directives: [
          "default-src 'self'",
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ],
      },
    },
  }),
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Playfair Display',
      cssVariable: '--font-display',
      weights: ['400 600'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Hanken Grotesk',
      cssVariable: '--font-body',
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
