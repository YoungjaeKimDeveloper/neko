import { z } from "zod";

export const UpdatePostSchema = z.object({
  updated_title: z.string(),
  updated_content: z.string(),
  updated_image_urls: z.array(z.any()),
  updated_reward_amount: z.coerce.number(),
  updated_location: z.string(),
  updated_is_found: z.boolean(),
});

export type UpdatePostValues = z.infer<typeof UpdatePostSchema>;
