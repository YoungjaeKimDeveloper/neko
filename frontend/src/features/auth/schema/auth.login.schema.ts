/*

    Auth login Schema

*/
import { z } from "zod";
// Pure Schema(About User Action) - Runtime
export const authLoginSchema = z.object({
  email: z.string().email({ message: "Please write email foramt" }),
  password: z
    .string()
    .min(6, { message: "Password shoud be at least 6 letters" }),
});
// Check the structure of type for Developer
export type AuthLoginFormValues = z.infer<typeof authLoginSchema>;
