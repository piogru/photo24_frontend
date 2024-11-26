import { z } from "zod";

export const postSchema = z.object({
  files: z.instanceof(File).array(),
  caption: z.string().max(2500),
  hideLikes: z.boolean(),
  commentsOff: z.boolean(),
  fileInfo: z.array(
    z.object({
      altText: z.string().max(128),
    }),
  ),
});

export type TPostSchema = z.infer<typeof postSchema>;
