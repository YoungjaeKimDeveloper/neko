/*
  Auth Signup Schema
*/
import { z } from "zod";

// Check - runtime
export const authSignupSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(6, { message: "Email shoud be at least 6 characters" }),
    userName: z.string().min(5, {
      message: "User name should be at least 5 characters",
    }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters" }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  // Refine - add extra logic
  .refine((data) => data.password == data.confirmPassword, {
    message: "Password and ConfirmPassword don't match",
    // nominate the root of error
    path: ["confirmPassword"],
  });

// check - compile
// Create new type based on created Schema
export type AuthSignupFormValues = z.infer<typeof authSignupSchema>;
