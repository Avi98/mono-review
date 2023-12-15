"use client";

import { useOrgMembers } from "../../../../../../api/org";
import { EmptyMemberList } from "./EmptyMemberList";
import { MemberItem } from "./MemberItem";

export const MemberList = () => {
  const { data: orgMembers } = useOrgMembers(
    //@TODO
    "83f008f8-87e4-4e3f-89c7-595cdb04287e"
  );

  if (!orgMembers?.length) {
    return <EmptyMemberList />;
  }
  return (
    <div className="container px-10 py-5">
      <h3 className="py-3 text-lg">All users in Organization</h3>
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
    </div>
  );
};
