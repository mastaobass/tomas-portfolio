import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * One collection holds both tracks. `track` decides which landing page a study
 * appears on, so adding a seventh case study is one file — no new routes.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    // The one-sentence outcome. Shown on the work index AND the case hero.
    outcome: z.string(),
    company: z.string(),
    role: z.string(),
    team: z.string().optional(),
    timeframe: z.string(),
    platform: z.string().optional(),
    year: z.number(),
    track: z.enum(["professional", "northwestern"]),
    order: z.number(),
    draft: z.boolean().default(false),
    impactLead: z.string().optional(),
    // Impact prose lives in frontmatter so every study reports outcomes the same way.
    impactNotes: z.array(z.string()).default([]),
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    next: z.string().optional(),
  }),
});

export const collections = { "case-studies": caseStudies };
