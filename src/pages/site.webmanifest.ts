import type { APIRoute } from 'astro';
import { asset } from '../site';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: 'Dr. Pavani Utti',
      short_name: 'Dr. Pavani Utti',
      start_url: asset('/'),
      display: 'standalone',
      theme_color: '#0d9488',
      background_color: '#ffffff',
      icons: [
        { src: asset('/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { src: asset('/icon-512.png'), sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
