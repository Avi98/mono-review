import { UserRoleEnum } from "../enums/memberRoleEnum";
import { MEMBER_ROLES } from "./constants";

export const getFullNameInitials = (fullName: string) => {
  const words = fullName.trim().split(" ");

  let initials = "";
  for (const w of words) {
    initials += w[0];
  }
  return initials.toUpperCase();
};

export const castStringToMember = (str: string) => {
  if (MEMBER_ROLES.includes(str as any)) return str as UserRoleEnum;
};
