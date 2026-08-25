# N79 Digital Self-Tour — Build Plan & Prototype Scope (v1)

*Prepared to bridge the approved Project Proposal, the Project Brief, and the team's holiday prototyping note into one actionable build plan. This document is the working plan behind the first coded prototype delivered alongside it.*

## 1. What we're building first

The Proposal (§5.3) and the team's prototyping note both agree on the same starting slice, so this is the MVP for build #1:

1. **Landing / access screen** — Student, Staff, or Guest entry point (no real authentication in the prototype; role is just used to tailor a welcome message and is stored in memory only, per the Privacy NFR — no accounts, no personal data collected).
2. **Home / navigation screen — Ground floor only** — a list + simple visual layout of ground-floor rooms, labs, and points of interest (POIs), with the ability to move between them.
3. **Point-of-interest detail** — name, location, description, image, and an optional video/audio slot (with captions/transcript placeholders wired in from day one, not bolted on later).
4. **Search/menu** — find a room, lab, or POI by name or keyword.
5. **Accessibility baseline** — scalable text, a high-contrast mode, full keyboard navigation, and alt text / caption / transcript scaffolding on every media element, aimed at WCAG 2.2 AA.
6. **Griffith-style UI shell** — clean, mobile-first layout that echoes the Griffith Mobile App's patterns (bottom/top nav, card-based lists, rounded elements). Colours/typography in the prototype are placeholders until the client supplies approved brand assets.

Explicitly deferred (per Proposal §3.2 Out of Scope and the prototyping note): other floors, real login/auth, GPS/Wi-Fi proximity content, offline mode, analytics, and any non-approved media.

## 2. Content model

Everything content-side is driven by one JSON file (`src/content/tourStops.json`) rather than a backend, per the proposed stack — this keeps it trivial for the Research & Content lead to update without touching code:

```json
{
  "id": "ground-lab-1",
  "floor": "Ground",
  "name": "Robotics Lab",
  "category": "Laboratory",
  "shortDescription": "...",
  "description": "...",
  "image": { "src": "...", "alt": "..." },
  "media": { "type": "video", "src": "...", "captionsSrc": "...", "transcript": "..." },
  "position": { "x": 20, "y": 65 }
}
```

Placeholder content for this build covers a representative set of ground-floor stops (entrance/foyer, a lecture theatre, a lab that can't be entered live, a common area, and a service desk) using clearly-labelled sample text and stock-style placeholder images — swapped for Shannon's real material once approved (Risk: "Client content arrives late" in Proposal §7).

## 3. Tech stack (per Proposal §5.3, confirmed for this build)

| Layer | Choice | Notes |
|---|---|---|
| Frontend | React + Vite | Component reuse, fast local dev, easy static build |
| Routing | React Router | Landing → Home → POI detail as real routes (deep-linkable, back-button friendly) |
| Styling | Plain CSS (custom properties for theme/contrast) | No heavy UI framework, keeps it easy to reskin with Griffith design tokens later |
| Content | Local JSON | No backend needed for the prototype |
| Hosting target | Static build (`dist/`) — deployable to GitHub Pages or any Griffith-approved static host | Nothing server-side to stand up |
| Version control | GitHub | This repo |

## 4. How this maps to the requirements

| Req | Covered by |
|---|---|
| FR-01 Start/continue tour independently | Landing screen → Home screen flow |
| FR-02 Floors/POIs shown in map/list | Home screen (ground floor list + simple layout) |
| FR-03 Move between floors/stops | Navigation between Home and POI detail; floor selector stubbed for future floors |
| FR-04 POI details shown | POI detail view |
| FR-05 Images + video/audio support | Image required, media slot optional per stop |
| FR-06 Search/browse | Search bar + category filter on Home |
| FR-07 Clear nav to map/list/search | Persistent top nav |
| FR-08 Captions/transcripts/alt text | Built into the content model and detail view from the start |
| NFR Accessibility | Contrast toggle, font-scale control, semantic HTML, keyboard focus states |
| NFR Privacy | No login backend, no data collection, role choice kept client-side only |

## 5. Team workstreams for this build (per the prototyping note)

- **Technical Development (Dikshit):** project scaffold, landing page, routing.
- **UI/UX (Simranpal):** wireframes/visual style for landing + home screens, based on the Sway reference; feed into the CSS theme tokens.
- **Research & Content (Chun Yu):** confirm real ground-floor rooms/labs/POIs from Shannon's material, fill in `tourStops.json`, flag anything needing client clarification.
- **Documentation & QA (Naomi & Toshika):** keep this plan and the requirements/user-flow docs current; run the accessibility/usability pass described below before each demo.

## 6. Suggested next 2–3 sprints (aligns with Proposal §6.2)

| Sprint | Focus | Exit criteria |
|---|---|---|
| Now (holiday build) | Landing + ground-floor Home + one POI detail, wired end-to-end | Demoable to the professor/client; navigation doesn't dead-end |
| Next | Real client content in, search working, remaining ground-floor POIs added, accessibility pass #1 | All ground-floor stops present with approved content or clearly marked placeholders |
| After | Additional floors, richer media (audio/voiceover), usability testing with 5+ users, defect fixes | ≥80% of test users complete core tasks unaided; WCAG checks pass on core screens |

## 7. Quality/testing checklist before each demo

- Keyboard-only walkthrough: Landing → Home → search → POI detail → back.
- Screen reader spot-check on POI detail (alt text, headings order).
- Contrast toggle and font-scale checked on Home and POI detail.
- Resize to a phone-width viewport — nothing overlaps or gets cut off.
- No placeholder content presented as if it were client-approved (labelled clearly as sample data).

## 8. Open questions for the client (Shannon) — carried over from the proposal

- Confirm real ground-floor room list, names, and short descriptions.
- Which POIs get photos vs. video vs. audio, and are captions/transcripts already available or need creating?
- Any rooms/labs that must be excluded entirely (restricted/lab access) rather than shown as a stop?
- Approved brand colours/typography/logo usage for the UI shell.
- Hosting destination for anything beyond local demo (GitHub Pages vs Griffith-approved host).
