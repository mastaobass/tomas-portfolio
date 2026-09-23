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
- `theme_toggle`
- `scroll_depth` at 25 / 50 / 75 / 100

When a visit arrives with `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, or `ref`, those labels are kept for the browser tab (`sessionStorage`) and copied onto each PostHog event. Nothing here calls `identify()`.

### Apply links

Use one link per application. The visible text stays `www.tomas-stonehouse.com`. The href carries the campaign. Slug: lowercase letters, numbers, and hyphens, such as `acme-senior-pd-202609`.

```html
<a href="https://www.tomas-stonehouse.com/r/acme-senior-pd-202609">www.tomas-stonehouse.com</a>
```

That path stores `utm_campaign=acme-senior-pd-202609`, `utm_source=apply`, `utm_medium=email`, then opens `/` with a clean address bar. Add `?utm_source=` or `?utm_medium=` on the short link only when those defaults are wrong. Optional `ref` is another anonymous label in the same character set, not a name or an email.

The same visit without the short path:

```text
https://www.tomas-stonehouse.com/?utm_source=apply&utm_medium=email&utm_campaign=acme-senior-pd-202609
```

In PostHog, break down or filter `$pageview`, `case_study_view`, `code_console`, `code_github`, `resume_download`, `contact_email`, and `theme_toggle` by `utm_campaign`. No events for that campaign after you send the application means the site was not opened. Pageviews and case views, then a rejection, means they looked at the work. A `contact_email` on that campaign means the portfolio produced a reply.

Funnels to keep in PostHog: Landing (`path = /`) → Case (`case_study_view` or `page_kind = case_study`) → Contact (`page_kind = contact` or `contact_email`). Break case drop-off down by `path`, and application traffic down by `utm_campaign`.

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
