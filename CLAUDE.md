# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Convoy Truck Repair — a commercial truck repair business website (convoytruckrepair.com). The project has two parallel layers that coexist:
- **Next.js app** (`src/app/`) — React components, server-side rendering, API routes
- **Static HTML pages** (root level) — Standalone marketing pages with vanilla JS

Both layers send form data to the same n8n webhook backend for processing.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

There is no test framework configured.

## Architecture

### Dual-Stack Design
The static HTML pages (`index.html`, `about.html`, `services.html`, etc.) are fully self-contained — they reference `styles.css`, `scripts.js`, and `convoy-chat.js` directly. The Next.js layer in `src/app/` is a parallel implementation that shares the same n8n backend. Both stacks are deployed; the static pages are the primary customer-facing site.

### Form → n8n Pipeline
All service request forms (HTML or Next.js) POST to `/api/request-service` (`src/app/api/request-service/route.ts`), which validates the payload and forwards it to the n8n webhook at `N8N_WEBHOOK_URL` (set in `.env.local`). n8n generates reference numbers, routes emails, and stores submissions.

### Chatbot (`convoy-chat.js`)
A fully self-contained 485-line widget injected on all HTML pages. It manages its own session storage, styling (injected `<style>` tag), and connects to a separate n8n chat webhook for AI responses. No external dependencies.

### Environment Variables
- `N8N_WEBHOOK_URL` — n8n endpoint for form submissions (required for API route)

## Design System

The design system is documented in `docs/design/` and **must be followed** for all UI work:

- **tokens.json / tokens.css** — Single source of truth for all colors, spacing, typography, shadows, motion
- **style-guide.md** — Brand identity, accessibility requirements (WCAG 2.1 AA), component patterns
- **components.md** — Specs for all 14 component types with exact Tailwind classes

**Brand**: Dark industrial theme. Primary amber `#F5A623`, dark background `#0A0A0A–#1A1A1A`, accent red `#E63946`. Headings use Barlow Condensed (700, uppercase); body uses Inter.

The `.claude/agents/frontend-designer.md` agent is available for design system compliance audits.

## Key Files

| File | Purpose |
|------|---------|
| `styles.css` | Master stylesheet (769 lines) — dark theme, custom cursor, parallax, animations |
| `scripts.js` | Master JS (364 lines) — mobile menu, parallax, scroll effects |
| `convoy-chat.js` | AI chatbot widget (485 lines) — self-contained |
| `src/app/api/request-service/route.ts` | Form submission API handler |
| `docs/design/tailwind.preset.js` | Tailwind design tokens preset |
| `templates/n8n-form-workflow-template.json` | Reusable n8n workflow template |

## Path Alias

TypeScript path alias `@/*` maps to `./src/*`.

## Deployment

Primary: Vercel. The `vercel.json` at root configures static deployment. The `.next/` build output is gitignored.
