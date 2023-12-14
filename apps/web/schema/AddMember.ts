import { z } from "zod";
import { UserRoleEnum } from "../src/enums/memberRoleEnum";
import { TitleEnum } from "../src/enums/titleEnum";

export const addMemberSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum([UserRoleEnum.ALL_USER, UserRoleEnum.MEMBER]),
  title: z.enum([TitleEnum.MISS, TitleEnum.MR, TitleEnum.MRS]),
});

export type AddMemberFormType = z.infer<typeof addMemberSchema>;
