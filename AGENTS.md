## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Cursor Cloud specific instructions

- Node.js 22.12 or newer is required (`engines` in `package.json`). `npm ci` installs from the lockfile and is safe to run again.
- The site is a static Astro app. `npm run dev -- --host 0.0.0.0 --port 4321` serves http://127.0.0.1:4321/. If that port already responds, leave the existing server running.
- `npm run build` writes the static site to `dist/`. There is no lint or automated test script.
- `PUBLIC_POSTHOG_KEY`, `PUBLIC_POSTHOG_HOST`, and `PUBLIC_GA_ID` are optional public analytics overrides. Leave them unset to use the fallbacks in `src/lib/analytics-config.js`.
