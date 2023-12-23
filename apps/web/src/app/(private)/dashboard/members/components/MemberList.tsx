"use client";

import { useOrgMembers } from "../../../../../../api/org";
import { OverlayLoading } from "../../../../../components/overlayLoading";
import { useAppStore } from "../../../../../store/store";
import { EmptyMemberList } from "./EmptyMemberList";
import { MemberItem } from "./MemberItem";

export const MemberList = () => {
  const orgId = useAppStore((state) => state.currentOrgId);
  const { data: orgMembers, isLoading } = useOrgMembers(orgId || "");

  if (!orgMembers?.length && !isLoading) {
    return <EmptyMemberList />;
  }

  return (
    <OverlayLoading isLoading={isLoading}>
      <div className="container px-10 py-5">
        <h3 className="py-3 text-lg">All users in Organization</h3>
        <ul className="border-border [&>*]:border-border rounded-2xl border-2 [&>*:last-child]:border-none [&>*]:border-b-2">
          {orgMembers?.map((orgMember) => (
            <MemberItem
              fullName={`${orgMember.user_firstName} ${orgMember.user_lastName}`}
              email={orgMember.user_email}
              jobTitle={orgMember.org_user_role}
              role={orgMember.role}
              id={orgMember.org_user_user_id.toString()}
            />
          ))}
        </ul>
      </div>
    </OverlayLoading>
  );
};
