"use client";

import { useOrgMembers } from "../../../../../../api/org";
import { MemberItem } from "./MemberItem";

export const MemberList = () => {
  const { data: orgMembers } = useOrgMembers(
    "8d9bffe4-6d21-422d-8629-7045cde68b77"
  );

  console.log({ orgMembers });
  return (
    <ul className="border-border [&>*]:border-border rounded-2xl border-2 [&>*:last-child]:border-none [&>*]:border-b-2">
      {orgMembers?.map((orgMember) => (
        <MemberItem
          fullName={`${orgMember.user_firstName} ${orgMember.user_lastName}`}
          email={orgMember.user_email}
          jobTitle={orgMember.org_user_role}
          role={orgMember.role}
        />
      ))}
    </ul>
  );
};
