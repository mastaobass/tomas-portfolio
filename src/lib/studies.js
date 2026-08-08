import { getCollection } from "astro:content";

/**
 * Single source of truth for which case studies are visible.
 *
 * `draft: true` hides a study from the built site but keeps it visible in
 * `npm run dev`, so unfinished work can be previewed locally without ever
 * shipping. Every page that lists or routes to studies must go through here —
 * filtering in one page and forgetting another is how a placeholder ends up
 * live with a URL someone can link to.
 */
export const showDrafts = import.meta.env.DEV;

export async function getStudies(track) {
  const all = await getCollection("case-studies");
  return all
    .filter((s) => showDrafts || !s.data.draft)
    .filter((s) => (track ? s.data.track === track : true))
    .sort((a, b) => a.data.order - b.data.order);
}
