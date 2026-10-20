# Portfolio instructions

## Current direction — 2026-10-20

The owner requested a white background, the feel of two supplied reference images, and motion. This supersedes the earlier lavender/ultramarine FIELD NOTES spatial-map direction.

- Use a white page, black sans-serif typography, generous whitespace, a centered hero and a black pill CTA.
- Display real supplied work in a tilted overlapping fan, followed by a horizontal collection of light-gray rounded artwork cards.
- Include staggered entrance, gentle floating, hover feedback and section reveal motion. Respect `prefers-reduced-motion`; do not change the user's device preferences.
- Keep mobile, tablet and desktop layouts usable. Artwork in galleries must remain fully visible with `object-fit: contain`.
- Active UI: `src/Portfolio.jsx` and `src/portfolio.css`, imported by `src/main.jsx`. The old `App.jsx` and `styles.css` are inactive historical source.
- Public website: https://ahcasj-tech.github.io/Public-Private/ (GitHub Pages).

## Content and privacy

Owner: 刘丹钰 / LIU DANYU. Profile facts and work descriptions are in `src/portfolio.js`. Preserve factual data, poster lettering and painting signatures. Never invent identity, credentials, production claims or project history. Do not publish the full resume PDF or add private contact details by default.

The collection contains five entries and 44 images: FLOW (4), 果点 (7), 摄影 (25), 果点 · 应用 (4), 绘画 (4). Preserve all 25 photos from the owner's photography folder, in their established order. `src/photography.json` contains the ordered labels and `scripts/import-photography.py` prepares full-frame WebP images and thumbnails. Preserve original source photographs.

## Workflow

Run the local server and open a working preview yourself. Use the Product Design get-context workflow when the visual source is unclear. Record durable prototype-specific design decisions here. Compare screenshots to supplied references and check desktop, phone and tablet before delivering substantial visual changes.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must produce `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`. The current requested publishing destination is the existing GitHub Pages site.
