import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// Custom domain cutover. Push to main deploys via .github/workflows/deploy.yml.
//
// Squarespace case studies that no longer exist. GitHub Pages cannot send
// HTTP redirects, so Astro writes a meta-refresh page with a canonical link
// and noindex for each path. Directory output plus trailingSlash "ignore"
// serves both /slug and /slug/. /northwestern/ is still a real page.
const work = "/work/";
const graduate = "/northwestern/";

export default defineConfig({
  site: "https://www.tomas-stonehouse.com",
  base: "/",
  trailingSlash: "ignore",
  redirects: {
    "/alto-group": work,
    "/hyundai-brazil": work,
    "/information-architecture": work,
    "/isle-of-capri-casinos": work,
    "/logo-and-business-card": work,
    "/norris-university-center": graduate,
    "/oscars": work,
    "/rapid-contextual-design": work,
    "/royal-auto": work,
    "/tacos": work,
    "/ui-project": work,
    "/unique-honda-ui": work,
    "/university-of-illinois-site-redesign": work,
    "/usability-evaluation": work,
    "/ycp-san-diego": work,
  },
  integrations: [mdx()],
});
