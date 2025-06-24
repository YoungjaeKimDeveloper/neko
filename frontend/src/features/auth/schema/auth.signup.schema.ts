import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(6, { message: "Email shoud be at least 6 letters" }),
    userName: z.string().min(3, {
      message: "UserName should be at least 3 letters",
    }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 letters" }),
    confirmPassword: z.string(),
  })
  // Refine - add extra logic
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    // nominate the root of error
    path: ["confirmPassword"],
  });

export type AuthSignup = z.infer<typeof SignupSchema>;
