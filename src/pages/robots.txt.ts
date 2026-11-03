import type { APIRoute } from 'astro';
import { maengel } from '../data/maengel';

// Die Mängelfassung soll Google nicht als Doublette der guten Seite finden
export const GET: APIRoute = ({ site }) =>
  new Response(
    maengel
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
