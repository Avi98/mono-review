import { z } from "zod";

export const addMemberSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  title: z.string(),
});

export type AddMemberFormType = z.infer<typeof addMemberSchema>;
