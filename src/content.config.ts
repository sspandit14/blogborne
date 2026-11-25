import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { SUBJECT_IDS } from "./subjects";

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.md",
  }),

  schema: ({image}) => z.object({
    title: z.string(),
    description: z.string(),
    kicker: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // which sections the post belongs to; must come from src/subjects.ts (typos fail the build)
    subjects: z.array(z.enum(SUBJECT_IDS)).default([]),
    // optional free-form keywords; searchable in the archive as tag:word
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    pinned: z.boolean().default(false),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    coverCaption: z.string().optional(),
    coverCredit: z.string().optional(),
    // the work an essay discusses, shown as the "Under Review" box
    review: z.object({
      title: z.string(),
      creator: z.string().optional(),
      year: z.coerce.string().optional(),
      medium: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { posts };