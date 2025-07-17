/*
    Profile schema
*/
import { z } from "zod";

export const ProfileSchema = z.object({
  location: z.string().optional(),
  image_url: z.array(z.any()).optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;
