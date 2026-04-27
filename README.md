# The Question Lab — Bilingual Site

A complete bilingual (English / 中文) website for The Question Lab.

## Pages
- `/` — Home (cinematic hero, featured, recent, question territories, AI interrogation engine, manifesto, subscribe)
- `/episodes` — Full episode archive (table + grid views, filter by frame, sort newest/oldest)
- `/episodes/:id` — Episode detail (hero, notes, primary/counter-text, timestamps, related)
- `/index` — Question Index (8 territories with episode lists)
- `/manifesto` — Full manifesto (5 sections)
- `/subscribe` — Subscribe page

## Features
- Bilingual EN ↔ 中文 toggle (top right). Choice persisted in localStorage.
- Hash-based routing (no server config needed).
- Live AI question interrogation engine (uses `window.claude.complete` in hosted preview).
- Tweakable accent color.

## Deploy

Drop the entire `site/` folder onto any static host. No build step.

### One-click hosts
- **Vercel / Netlify**: drag `site/` into the dashboard, set publish dir to `site/`.
- **Cloudflare Pages**: connect repo, build command empty, output dir `site`.
- **GitHub Pages**: copy contents of `site/` to `gh-pages` branch root.
- **Any S3 / nginx / Caddy**: serve `site/` as static.

### Local preview
```sh
cd site && python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Files
- `index.html` — entry point, routing, app shell
- `i18n.js` — bilingual dictionary + episode/theme data
- `shell.jsx` — header, footer, language toggle, hash router, Link helper
- `page-home.jsx` — Home page
- `page-others.jsx` — Episodes / Detail / Index / Manifesto / Subscribe
- `brand.jsx` — TQL logo + episode cover templates
- `tweaks-panel.jsx` — accent-color tweak panel
- `styles.css` — base brand styles + animations
