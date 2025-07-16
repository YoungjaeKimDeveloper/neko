/*

  Show error message based on PostSchema

*/
import { z } from "zod";

// Post Schema - Runtime
export const PostSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title should be at least 5 characters." })
    .max(20, { message: "Title should be 20 characters or less." }),
  image_urls: z
    .array(z.any(), { required_error: "At least 1 image is required" })
    .min(1, { message: "At least 1 image is required." })
    .max(5, { message: "At most 5 images allowed." }),
  content: z
    .string()
    .min(10, { message: "Description should be at least 10 characters." })
    .max(300, { message: "Description should be 300 characters or less." }),
  reward_amount: z.coerce
    .number()
    .nullable()
    .optional()
    // SuperRefine: add multiple error messages each case
    // ctx -> context value and context 1:1
    .superRefine((number, ctx) => {
      // Validation -0 nullable
      if (number === null || number === undefined) return;
      // Validation -1 (value should be a number)
      if (Number.isNaN(number)) {
        ctx.addIssue({
          code: "custom",
          message: "Reward amount must be a valid number",
        });
      }
      // Validation - 2 Range Check
      if (number < 0 || number > 500) {
        ctx.addIssue({
          code: "custom",
          message: "Total amount can't be more than $500",
        });
      }
    }),
  location: z
    .string()
    .min(3, { message: "Location should be at least 3 characters." })
    .max(10, { message: "Location should be 10 characters or less." }),
});

// Inferred type for Post - Compile
// Name Convention - --formValues
export type PostFormValues = z.infer<typeof PostSchema>;
