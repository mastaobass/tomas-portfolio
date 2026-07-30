import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// GitHub Pages preview lives at <site><base>.
// AT CUTOVER: set site to "https://www.tomas-stonehouse.com" and base to "/".
export default defineConfig({
  site: "https://mastaobass.github.io",
  base: "/tomas-portfolio",
  trailingSlash: "ignore",
  integrations: [mdx()],
});
