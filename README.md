# tomas-portfolio

Portfolio for Tomás Stonehouse. Astro + MDX. Live preview: https://mastaobass.github.io/tomas-portfolio/

## Run locally

```bash
cd /Users/tomas/Projects/tomas-portfolio   # or your clone path
npm install
npm run dev
```

Open **http://localhost:4321/tomas-portfolio** (base path is required).

```bash
npm run build    # static output in dist/
npm run preview  # preview the production build
```

## Project layout

```
src/
  assets/              case study images (imported via Astro Image)
  content/case-studies/  one .mdx file per study
  components/          Nav, Footer, Figure, PullQuote, WorkIndex, …
  layouts/             Base, CaseStudy
  pages/               routes (work/[...slug] generates case studies)
  styles/              tokens + global CSS
  tokens/tokens.json   design tokens
public/                favicon, resume PDF only
```

## Case studies

Create `src/content/case-studies/<slug>.mdx` with frontmatter (`title`, `outcome`, `track`, `order`, `draft`, …). Set `draft: true` until a study is ready. Images live in `src/assets/` and are imported into the MDX so Figure can use Astro’s Image component.

`track: professional` or `track: northwestern` controls which index lists the study.

## Analytics

The site uses [PostHog](https://posthog.com), a free Heap-style product analytics tool: autocapture of clicks and pageviews, session replay, funnels, and named events for resume downloads, contact clicks, case study opens, and scroll depth.

Free cloud plan is 1 million events and 5,000 session recordings per month. No credit card.

1. Create an account at [us.posthog.com/signup](https://us.posthog.com/signup).
2. Open **Project settings** and copy the **Project API Key** (starts with `phc_`).
3. Paste it into `src/lib/analytics-config.js` as `POSTHOG_KEY`, then push to `main`.
4. In PostHog, turn on **Session replay** and add `www.tomas-stonehouse.com` under authorized domains if that field is shown.

Until a key is set, the analytics script is not included in the build.

Named events already wired:

- `case_study_open` / `case_study_view`
- `resume_download`
- `contact_email` / `contact_linkedin`
- `scroll_depth` at 25 / 50 / 75 / 100

## Deploy

Push to `main`. GitHub Actions builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).

Repo Settings → Pages → Source must be **GitHub Actions**.

### Custom domain later

1. Point DNS for `www.tomas-stonehouse.com` at GitHub Pages.
2. In `astro.config.mjs`, set `site: "https://www.tomas-stonehouse.com"` and `base: "/"`.
3. Add `public/CNAME` with `www.tomas-stonehouse.com`.
4. Enable HTTPS in Pages settings.

## Figma

https://www.figma.com/design/vsV5ja1ty6j3Gbv5ayu94n
