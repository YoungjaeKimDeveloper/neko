/*

  Show error message based on PostSchema

*/
import { z } from "zod";

// Post Schema - Runtime
export const PostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Description is too short (min: 3 letters)" })
    .max(20, { message: "Location is too long (max: 10 letters)" }),
  image_urls: z
    .array(z.any())
    .min(1, { message: "At least 1 image is required" })
    .max(5, { message: "At most 5 images allowed" }),
  content: z
    .string()
    .min(10, { message: "Description is too short (min: 10 letters)" })
    .max(300, { message: "Description is too long (max: 300 letters)" }),
  reward_amount: z.coerce.number(),
  location: z
    .string()
    .min(3, { message: "Location is too short (min: 3 letters)" })
    .max(10, { message: "Location is too long (max: 15 letters)" }),
});

// Inferred type for Post - Compile
// Name Convention - --formValues
export type PostFormValues = z.infer<typeof PostSchema>;
