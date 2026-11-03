import type { APIRoute } from 'astro';

// Auch die Mängelfassung darf gecrawlt werden: Sie trägt auf jeder Seite noindex, und eine Sperre hier würde Google
// das noindex gar nicht erst sehen lassen (und im Check-up als eigener Befund auftauchen)
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
