/*

    Auth login Schema

*/
import { z } from "zod";
// Pure Schema
export const authLoginSchema = z.object({
  email: z.string().email({ message: "Please write email foramt" }),
  password: z
    .string()
    .min(6, { message: "Password shoud be at least 6 letters" }),
});
// DTO
export type AuthLogin = z.infer<typeof authLoginSchema>;
