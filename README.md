# tomas-portfolio

Portfolio for Tomás Stonehouse. Astro + MDX. Live preview: https://mastaobass.github.io/tomas-portfolio/

## Run locally

```bash
cd /Users/tomas/Projects/tomas-portfolio   # or your clone path
npm install
npm run dev
```

Open **http://localhost:4321/** .

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

[PostHog](https://us.posthog.com) (US cloud) and GA4 both run on the marketing site. PostHog ingest is first-party via `https://e.tomas-stonehouse.com`, which CNAMEs to PostHog's managed proxy. The project API key is public. Override it with `PUBLIC_POSTHOG_KEY` / `PUBLIC_POSTHOG_HOST` / `PUBLIC_GA_ID` (see `.env.example`). GitHub Actions passes the same names from repository secrets when they are set. An empty secret keeps the fallback in `src/lib/analytics-config.js`.

Anonymous visitors are tracked with `person_profiles: "identified_only"`. Pageviews, autocapture, and the named events below still record. Person profiles are not created for people who never identify. Do Not Track is respected, so those browsers will not appear.

Pageviews use `capture_pageview: "history_change"`, which covers full page loads and Astro client navigations. Every event gets `page_kind` (`home`, `work_index`, `case_study`, `about`, `contact`, `northwestern`) and a trailing-slash-normalized `path`, attached in `before_send` so the first pageview is included.

Named events:

- `case_study_open` / `case_study_view` / `work_index_open`
- `code_console` / `code_github` / `code_storybook`
- `resume_download`
- `contact_email` / `contact_linkedin`
- `scroll_depth` at 25 / 50 / 75 / 100

Funnels to keep in PostHog: Landing (`path = /`) → Case (`case_study_view` or `page_kind = case_study`) → Contact (`page_kind = contact` or `contact_email`). Break case drop-off down by `path`.

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
