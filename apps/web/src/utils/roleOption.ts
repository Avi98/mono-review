import { UserRoleEnum } from "../enums/memberRoleEnum";

export const role_options: Array<{ label: string; value: UserRoleEnum }> = [
  { label: "Member", value: UserRoleEnum.MEMBER },
  { label: "Only view", value: UserRoleEnum.ALL_USER },
];
