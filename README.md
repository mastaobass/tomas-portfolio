# tomas-stonehouse.com

Portfolio site. Astro + MDX, self-hosted fonts, no dependencies beyond the framework.
Free to host, free to run.

**Figma file:** https://www.figma.com/design/vsV5ja1ty6j3Gbv5ayu94n

## Run it

```bash
npm install
npm run dev      # http://localhost:4321/tomas-portfolio
npm run build    # static output in dist/
```

## Adding a case study

One file. No routes, no config, no new components.

Create `src/content/case-studies/<slug>.mdx`:

```mdx
---
title: Project name
outcome: One sentence. What changed, for whom, and by how much.
company: Company
role: Lead product designer
team: 2 engineers · 1 PM
timeframe: Q1–Q3 2025
platform: Web
year: 2025
track: professional        # or: northwestern
order: 4
impactLead: One line naming the change this work produced.
metrics:
  - value: "34%"
    label: reduction in review time
impactNotes:
  - Why that metric matters in business terms.
next: some-other-slug
---

import Figure from "../../components/Figure.astro";

## Context

Prose. The paragraph directly after each `##` heading is styled as that
section's thesis, so put the point there.

<Figure label="Exploration" caption="One line of context." />
```

`track` decides which landing page it appears on. `order` sets its position.
Set `draft: true` on anything unfinished.

## Structure

```
src/
  tokens/tokens.json     source of truth — mirrors the Figma variable collection
  styles/tokens.css      the same tokens as CSS custom properties
  styles/global.css      reset, type defaults, shared primitives
  lib/path.js            base-aware url() — always use it for internal links
  content.config.ts      case study schema (one collection, two tracks)
  components/            Nav, Footer, WorkRow, WorkIndex, MetaBar,
                         Figure, PullQuote, MetricGrid, NextCase
  layouts/               Base, CaseStudy
  pages/                 index, about, contact, work/, northwestern/,
                         work/[...slug] (generates all six case studies)
```

### Notable decisions

- **The work index is typographic, not a card grid.** Numbered rows with the
  outcome sentence in the highest-attention position. It also removes the
  requirement to produce six polished cover images.
- **`Figure` renders a labelled placeholder when given no `src`.** Case studies
  can be written and reviewed before the imagery exists.
- **Body prose is set in the display serif** at a `744px` measure with markdown
  `##` headings pulled into the left margin via CSS grid. Grid auto-placement is
  sparse, so the element after a heading shares its row — each label aligns with
  the top of the section it names.
- **Impact prose lives in frontmatter (`impactNotes`)**, not the MDX body, so
  every case study reports outcomes in the same shape.
- **`--ink-muted` is `#75736A`, not `#8A887E`.** The lighter value measured
  3.41:1 against the page background, which fails WCAG AA for the 13px labels it
  is used on. `#75736A` measures 4.56:1. The Figma variable was corrected to
  match.

## Design ↔ code

`src/tokens/tokens.json` and the **Portfolio Tokens** collection in Figma use the
same names (`color/ink/primary`, `space/xl`, `type/h2`). Code Connect requires a
Figma Organization plan, so instead Claude reads and writes both sides over the
Figma MCP server on request. Nothing watches for drift automatically — syncing is
a deliberate step.

This repo is also shaped to be imported into Claude Design as a design system
(GitHub repo import), which reuses these tokens and components on future projects.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push
to `main`. Repo must be public, and **Settings → Pages → Source** must be set to
**GitHub Actions**.

### Cutting over to the custom domain

1. Transfer `tomas-stonehouse.com` off Squarespace to a registrar that sells at
   cost. Recreate the existing DNS records first so the current site keeps
   resolving during the transfer.
2. In `astro.config.mjs`, set `site: "https://www.tomas-stonehouse.com"` and
   `base: "/"`. Because every internal link goes through `url()`, this is the
   only code change.
3. Add a `public/CNAME` file containing `www.tomas-stonehouse.com`.
4. Point DNS at GitHub Pages, enable HTTPS in Settings → Pages.
5. Cancel Squarespace last. If email forwarding runs through them, move it first
   — Cloudflare Email Routing is free.
# tomas-portfolio
