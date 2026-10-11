import type { APIRoute } from 'astro';
import { absolute, PROJECTS } from '../site';

// Crawlers only honour robots.txt at the domain root, so this file takes effect
// once the portfolio is served from https://dr-pavani-utti.github.io/. It also
// advertises the sitemaps of the other sites on the same domain.
export const GET: APIRoute = () => {
  const sitemaps = [absolute('/sitemap.xml'), ...PROJECTS.map((p) => `${p.url}sitemap.xml`)];
  const body = ['User-agent: *', 'Allow: /', '', ...sitemaps.map((s) => `Sitemap: ${s}`), ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
