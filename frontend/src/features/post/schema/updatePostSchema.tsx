/*
  Show error message based on updatePostSchema
*/
import { z } from "zod";
// Post Schema - Runtime
export const UpdatePostSchema = z.object({
  updated_title: z
    .string()
    .min(5, { message: "Title should be at least 5 characters." })
    .max(40, { message: "Title should be 40 characters or less." }),
  updated_image_urls: z
    .array(z.any(), { required_error: "At least 1 image is required" })
    .min(1, { message: "At least 1 image is required." })
    .max(5, { message: "At most 5 images allowed." }),
  updated_is_found: z.boolean(),
  updated_content: z
    .string()
    .min(10, { message: "Description should be at least 10 characters." })
    .max(300, { message: "Description should be 300 characters or less." }),
  updated_reward_amount: z.coerce
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
  updated_location: z
    .string()
    .min(3, { message: "Location should be at least 3 characters." })
    .max(30, { message: "Location should be 20 characters or less." }),
});

// complie type
// Name Convention - --formValues
export type UpdatePostValues = z.infer<typeof UpdatePostSchema>;
