/*
    Profile schema
*/
import { z } from "zod";

export const ProfileSchema = z.object({
  updated_location: z.string().optional(),
  updated_profile_image_url: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;
