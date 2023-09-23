import z from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords did not match",
      });
    }
  });

export type SignUpFormSchemaType = z.infer<typeof signUpSchema>;
