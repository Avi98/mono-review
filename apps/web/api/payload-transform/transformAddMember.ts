import { AddMemberType } from "../org";

export const transformAddMembers = (formValues: AddMemberType) =>
  ({
    ...formValues,
    role: formValues.role.value,
    title: formValues.title.value,
  }) as const;
