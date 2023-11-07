import { useMutation, useQuery } from "@tanstack/react-query";
import { SERVER_ENDPOINT } from "./contants";
import { GetRequestBuilder } from "./common/get-request-builder";

export interface OrgMember {
  org_user_id: string;
  org_user_isOwner: boolean;
  org_user_role: string;
  org_user_user_id: number;
  org_user_org_id: string;
  user_firstName: string;
  user_lastName: string;
  user_email: string;
  role: string;
}

const getOrgMembers = async (orgId: string) => {
  const getRequest = new GetRequestBuilder<OrgMember[]>(
    `org/all-members/${orgId}`,
    SERVER_ENDPOINT
  );

  return getRequest.sendRequest();
};

export const useOrgMembers = (orgId: string) => {
  const orgMembers = useQuery({
    queryKey: [orgId],
    queryFn: () => {
      return getOrgMembers(orgId);
    },
  });
  return orgMembers;
};
