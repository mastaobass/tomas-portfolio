import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// Custom domain cutover. Push to main deploys via .github/workflows/deploy.yml.
export default defineConfig({
  site: "https://www.tomas-stonehouse.com",
  base: "/",
  trailingSlash: "ignore",
  integrations: [mdx()],
});
