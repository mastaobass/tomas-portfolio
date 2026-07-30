/**
 * Base-aware URL builder.
 * The site previews at /tomas-portfolio/ on GitHub Pages and will live at /
 * once the custom domain is cut over. Always build internal links with this
 * so the cutover is a one-line config change, not a find-and-replace.
 */
export function url(pathname = "/") {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}` || "/";
}
