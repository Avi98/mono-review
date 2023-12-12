"use client";

import { useOrgMembers } from "../../../../../../api/org";
import { AddMembers } from "../../../../../../illustrations/ic-add-member";
import { Button } from "../../../../../components/button/Button";
import { MemberItem } from "./MemberItem";

export const MemberList = () => {
  const { data: orgMembers } = useOrgMembers(
    "8d9bffe4-6d21-422d-8629-7045cde68b77"
  );

  if (!orgMembers) {
    return (
      <div className="flex h-full w-full flex-col place-items-center  justify-center">
        <div className="flex flex-col items-center align-middle">
          <AddMembers height={"20rem"} width={"20rem"} />
          <p className="py-3 text-3xl">
            No members found for this organization
          </p>
          <p className="text-muted-foreground my-4 text-lg">
            Please add members
          </p>
          <Button type="button">Add members</Button>
        </div>
      </div>
    );
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
