# Prototype Instructions

Selected direction: third mock, FIELD NOTES / 鍏宠仈妗ｆ. Preserve pale lavender, condensed ultramarine title, spatial artwork map and thematic connections. Owner: 鍒樹腹閽? User authorized replacing demo content with D:/鏂囦欢/浣滃搧闆?and explicitly selected D:/鏂囦欢/鍒樹腹閽扮畝鍘?鍒樹腹閽扮畝鍘?.pdf for profile/contact facts. The site now uses 22 supplied images across four groups, with FRUIT DOTS posters/applications having separate entries. Profile data lives in src/portfolio.js. Preserve full poster lettering and painting signatures; never invent identity, credentials, production claims or project history. Do not publish the full r茅sum茅 PDF by default.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Responsive pass (2026-09-22)

Owner asked for phone (375/390/430), tablet (768) and desktop (1440) support plus a Vercel deploy, without redesigning the approved direction. Keep pale lavender, condensed ultramarine title, the spatial artwork map and the thematic connections.

- Breakpoints: phone `<=767px`, tablet `768-1199px`, desktop `>=1200px`. The 1440x1024 canvas is now desktop-only; below 1200px the site uses the stacked flow layout (already used on phones) so type never scales down to unreadable sizes.
- Phones keep a single-column work grid; tablets get two columns.
- The header on flow layouts is normal document flow, not absolutely positioned canvas coordinates.
- Phones/tablets get a real collapsible menu (`.nav-toggle` + `.nav-layer`); desktop keeps the original inline `.site-nav` (renamed from `.header nav`, same coordinates).
- Work images continue to use `object-fit: contain`; index thumbnails were switched from `cover` to `contain` so nothing is cropped. The hover zoom is disabled on touch layouts because a scaled contained image could clip.
- Images lazy-load except the first card (eager + `fetchpriority=high`). `prefers-reduced-motion` still disables every transition and animation.
- `public/favicon.svg` added so `/favicon.ico` no longer 404s. `vercel.json` added with the SPA fallback and asset caching; `package.json` gained `build:vercel`.
- Do not remove `src/portfolio.js` content, the Sites files, or the desktop canvas coordinates.

