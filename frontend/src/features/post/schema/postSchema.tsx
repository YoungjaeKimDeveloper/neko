import { z } from "zod";

// Post Schema - Runtime
export const PostSchema = z.object({
  title: z.string().min(5, { message: "Title should be at least 5 letters" }),
  images: z
    .array(z.any())
    .min(1, { message: "At least 1 image is required" })
    .max(5, { message: "At most 5 images allowed" }),
  description: z
    .string()
    .min(10, { message: "Description should be at least 10 letters" }),
  rewardAmount: z.coerce.number(),
  location: z
    .string()
    .min(3, { message: "Location should be at least 3 letters" })
    .max(10, { message: "Location is too long (max:15 letters" }),
});

// Inferred type for Post - Compile
export type Post = z.infer<typeof PostSchema>;
