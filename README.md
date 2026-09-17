# N79 Navigator — Griffith University Digital Self-Tour

A self-guided, accessible wayfinding app for Griffith University's N79 building (Henry Smerdon
Engineering, Technology and Aviation), built for Team 02's 3821ICT/7821ICT Work Integrated
Learning project.

Live deployment: https://singleproject.vercel.app

## What's in this build

- **Landing screen** — building overview with quick links to login, the Wi-Fi guide and the
  About page.
- **About N79** — the building's story, key stats and what's inside.
- **Login** — Student, Staff or Guest entry (no real authentication; the session lives only in
  this browser tab and is never sent anywhere).
- **Room directory** — all five levels of N79, each with a searchable room/lab list and an
  interactive floor plan (click-to-zoom, drag-to-pan, keyboard zoom and pan).
- **Room details** — a photo gallery, description, access notes, and any related video or
  external resource (e.g. a Matterport 3D tour) for each room or lab.
- **Wi-Fi guide** — step-by-step connection instructions for students & staff, visitors, and
  eduroam users.
- **Profile** — account status and sign-out.

## Accessibility features

- Skip-to-content link on every page.
- A **high-contrast mode** (header toggle) that swaps the theme for a WCAG AAA–contrast
  black/white/yellow palette — covers every page, form, photo overlay and map hotspot, not just
  the base colours.
- A three-step **text size** control. Typography is defined in `rem` and scaled from a single
  `--font-scale` custom property, so every heading, label and button grows together without
  breaking layout.
- Full keyboard support on the interactive floor plan (+/- to zoom, arrow keys to pan once
  zoomed) in addition to the on-screen zoom controls.
- Semantic landmarks, `aria-current`/`aria-pressed`/`aria-selected` state on navigation and
  toggles, and real `role="tablist"`/`tab`/`tabpanel` wiring on the Wi-Fi and login role tabs.
- Real `<a>`/`<Link>` elements for in-app navigation (not click handlers on `<div>`/`<button>`),
  so opening a page in a new tab, right-click, and browser history all work as expected.
- `prefers-reduced-motion` is respected; all transitions and the auth-loading spinner are
  disabled for visitors who request it.
- Alt text on every photo, and a captions note on embedded video.

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
```

## Tech stack

React 19 + Vite + React Router (`HashRouter`, so the built app works unchanged on Vercel, GitHub
Pages, or any static host), plain CSS with theme custom properties (`src/index.css`), and local
JSON content (`src/content/`) — no backend.

## Content

Room and level data lives in [`src/content/rooms.json`](./src/content/rooms.json) and
[`src/content/levels.json`](./src/content/levels.json); photography lives under
`src/assets/rooms/room-<id>/`. `src/content/rooms.js` and `src/content/levels.js` merge that data
with the actual image assets (via `import.meta.glob`) and resolve which rooms share a single map
hotspot, so updating a room's copy or swapping a photo never touches component code.

See [`BUILD_PLAN.md`](./BUILD_PLAN.md) for the original build plan and requirements traceability
from the first prototype.
