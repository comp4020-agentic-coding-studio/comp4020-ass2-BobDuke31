import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { courseNodeSchema } from "astro-course-university/schemas";

const weekSchema = z.coerce.number().int().min(1).max(12);
const courseNodeLoader = (dir: string) =>
  glob({ pattern: ["**/*.{md,mdx}", "!**/CLAUDE.md"], base: `src/content/${dir}` });
const teacherRefs = z.array(reference("people")).min(1);

const weightedMarking = z
  .object({
    mode: z.literal("weighted"),
    criteria: z
      .array(z.object({ name: z.string().trim().min(1), weight: z.number().positive() }))
      .min(1),
  })
  .superRefine((marking, ctx) => {
    const total = marking.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    if (total !== 100) {
      ctx.addIssue({
        code: "custom",
        path: ["criteria"],
        message: `criterion weights sum to ${total}, not 100`,
      });
    }
  });

const holisticMarking = z.object({
  mode: z.literal("holistic"),
  description: z.string().trim().min(40),
});

export const collections = {
  sessions: defineCollection({
    loader: courseNodeLoader("sessions"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        date: z.coerce.date(),
        teachers: teacherRefs.optional(),
      })
      .loose(),
  }),

  assessments: defineCollection({
    loader: courseNodeLoader("assessments"),
    schema: courseNodeSchema
      .extend({
        week: weekSchema,
        due: z.coerce.date(),
        weight: z.coerce.number().positive().max(100),
        marking: z.discriminatedUnion("mode", [weightedMarking, holisticMarking]).optional(),
      })
      .loose(),
  }),

  lectures: defineCollection({
    loader: courseNodeLoader("lectures"),
    schema: ({ image }) =>
      courseNodeSchema
        .extend({
          week: weekSchema,
          date: z.coerce.date(),
          teachers: teacherRefs.optional(),
          slides: z
            .string()
            .regex(/^\/decks\/[a-z0-9-]+\/$/)
            .optional(),
          // Flags a lecture whose page embeds a live <LiveDemo> — distinct from
          // `slides`, which every deck-bearing week has, since only three of
          // those four decks carry an interactive widget. Drives the "Live
          // demo" badge on the lectures grid and the jump-link on the lecture
          // page itself, so the strongest interactive moments surface before a
          // visitor has to read to the bottom of the page to find them.
          interactive: z.boolean().optional(),
          // Only set where a real photo/screenshot genuinely teaches the
          // week's idea better than the CSS/SVG treatment already on the
          // page — not a slot every week fills. Feeds both the lecture-grid
          // card thumbnail (LecturesGrid.astro) and the lecture page's own
          // Hero banner (ContentLayout's native heroImage prop), so the same
          // photo does both jobs instead of being sourced/cropped twice.
          heroImage: image().optional(),
          heroImageAlt: z.string().trim().optional(),
        })
        .loose()
        .superRefine((lecture, ctx) => {
          if (lecture.heroImage && !lecture.heroImageAlt) {
            ctx.addIssue({
              code: "custom",
              path: ["heroImageAlt"],
              message: "describe the image when one is supplied",
            });
          }
        }),
  }),

  people: defineCollection({
    loader: courseNodeLoader("people"),
    schema: ({ image }) =>
      z
        .object({
          title: z.string().trim().min(1),
          description: z.string().trim().min(40),
          role: z.string().trim().min(1),
          contact: z.string().trim().min(1).optional(),
          affiliation: z.string().trim().min(1).optional(),
          email: z.email().optional(),
          url: z.url().optional(),
          photo: image().optional(),
          photoAlt: z.string().trim().optional(),
          published: z.coerce.boolean().default(true),
        })
        .superRefine((person, ctx) => {
          if (person.photo && !person.photoAlt) {
            ctx.addIssue({
              code: "custom",
              path: ["photoAlt"],
              message: "describe the photo when one is supplied",
            });
          }
        }),
  }),
};
