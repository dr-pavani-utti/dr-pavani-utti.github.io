# Dr. Pavani Utti – Portfolio

Astro + Tailwind site, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```sh
npm install
npm run dev       # http://localhost:4321/portfolio/
npm run build     # dist/
```

## Base path

`astro.config.mjs` derives the base from the repo name in `GITHUB_REPOSITORY`: a repo named
`dr-pavani-utti.github.io` is served at the domain root (`/`), any other repo at `/<repo>/`.
`BASE_PATH=/ npm run build` forces it locally. Always build URLs with `asset()` / `absolute()`
from `src/site.ts`, never a hard-coded `/portfolio/`.

## SEO

- `src/layouts/Layout.astro`: title, description, canonical, favicons, Open Graph/Twitter, JSON-LD.
- `src/pages/index.astro`: page content plus `WebSite`, `ProfilePage`, `Person` and `WebApplication` structured data.
- `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`, `src/pages/site.webmanifest.ts`: generated at build time.
  `robots.txt` also lists the NEET PG / NEET SS explorer sitemaps.
- `src/pages/[legacy]/index.astro`: when served from the root, `/portfolio/` redirects to `/`.
- `public/google2cc8027b9bf0402d.html`: Google Search Console verification (keep).

Google reads the site name, favicon and `robots.txt` only from the domain root
(`https://dr-pavani-utti.github.io/`). While the site lives at `/portfolio/`, search results show
“GitHub Pages” and a globe icon. Serving it from the root requires the repo to be named
`dr-pavani-utti.github.io`.
