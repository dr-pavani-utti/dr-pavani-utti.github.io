import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// A repo named `<user>.github.io` is served at the domain root; any other repo
// is served at `/<repo>/`. Google reads robots.txt, the favicon and the site
// name only from the domain root, so the portfolio belongs in the root repo.
// BASE_PATH overrides the detection (e.g. `BASE_PATH=/ npm run build`).
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'portfolio';
const base = process.env.BASE_PATH ?? (repo.endsWith('.github.io') ? '/' : `/${repo}`);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://dr-pavani-utti.github.io',
  base,
});
