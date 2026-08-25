# N79 Digital Self-Tour — Prototype

A self-guided, accessible tour prototype for Griffith University's N79 building, built for
Team 02's 3821ICT/7821ICT Work Integrated Learning project. This is the first coded prototype
described in [`BUILD_PLAN.md`](./BUILD_PLAN.md) — it covers the ground floor only, with sample
placeholder content standing in for the client's approved material.

## What's in this prototype

- **Landing screen** — Student / Staff / Guest entry point (no real login; role only tailors the
  welcome message and is never sent anywhere).
- **Home / navigation screen** — ground-floor points of interest as a list or a simplified map,
  filterable by category.
- **Search** — find a room, lab or facility by name, category, or description.
- **Point-of-interest detail** — name, location, description, a placeholder image, and an optional
  video/audio slot with a captions note and a toggleable transcript.
- **Accessibility** — skip-to-content link, full keyboard navigation, a high-contrast mode, a
  three-step text-size control, and alt text / transcripts on every media element.

All content lives in [`src/content/tourStops.json`](./src/content/tourStops.json) — update that
file to swap in the client's real ground-floor rooms, descriptions and approved media without
touching any component code.

## Getting started

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

## Tech stack

React + Vite + React Router, plain CSS with theme custom properties (see `src/index.css`), and a
local JSON content file — no backend, per the proposed stack in the project proposal (§5.3).

## What's placeholder vs. real

Everything content-wise is clearly marked as sample data: room names, descriptions, and the
gradient "photo" tiles standing in for real photography. The floor layout in Map view is a
schematic grid, not the official floor plan — swap it once Griffith supplies approved floor-plan
artwork. Brand colours/typography in `src/index.css` (`:root`) are placeholders pending Griffith's
approved brand assets.

## Next steps

See [`BUILD_PLAN.md`](./BUILD_PLAN.md) for the full plan: content model, requirements traceability,
suggested sprint sequence, and open questions for the client.
