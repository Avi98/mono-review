import { useMutation, useQuery } from "@tanstack/react-query";
import { SERVER_ENDPOINT } from "./contants";
import { GetRequestBuilder } from "./common/get-request-builder";
import { PostRequestBuilder } from "./common/post-reqest-builder";
import { AddMemberFormType } from "../schema/AddMember";
import { UserRoleEnum } from "../src/enums/memberRoleEnum";
import { TitleEnum } from "../src/enums/titleEnum";
import { transformAddMembers } from "./payload-transform/transformAddMember";

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

export interface AddMemberPayload {
  role: UserRoleEnum.ALL_USER | UserRoleEnum.MEMBER;
  title: TitleEnum;
  email: string;
  firstName: string;
  username: string;
  lastName: string;
  orgId: string;
}

export type AddMemberType = AddMemberFormType & { orgId: string };

const getOrgMembers = async (orgId: string) => {
  const getRequest = new GetRequestBuilder<OrgMember[]>(
    `org/all-members/${orgId}`,
    SERVER_ENDPOINT
  );

  return getRequest.sendRequest();
};

const addMember = (payload: AddMemberPayload) => {
  const addOrgMember = new PostRequestBuilder(
    `user/add-new-member`,
    SERVER_ENDPOINT
  );
  return addOrgMember.withBody(payload).sendRequest();
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

export const useAddMember = () => {
  const mutation = useMutation({
    mutationFn: (values: AddMemberType) => {
      return addMember(transformAddMembers(values));
    },
  });
  return mutation;
};
