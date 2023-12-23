import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SERVER_ENDPOINT } from "./utils/contants";
import { GetRequestBuilder } from "./common/get-request-builder";
import { PostRequestBuilder } from "./common/post-reqest-builder";
import { AddMemberFormType } from "../schema/AddMember";
import { UserRoleEnum } from "../src/enums/memberRoleEnum";
import { TitleEnum } from "../src/enums/titleEnum";
import { transformAddMembers } from "./payload-transform/transformAddMember";
import { DeleteRequestBuilder } from "./common/delete-request-builder";

export interface OrgMember {
  org_user_id: string;
  org_user_isOwner: boolean;
  org_user_role: string;
  org_user_user_id: number;
  org_user_org_id: string;
  user_firstName: string;
  user_lastName: string;
  user_email: string;
  role: UserRoleEnum;
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

interface IUpdateRolePayload {
  memberId: number;
  role: UserRoleEnum;
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

const updateMemberRole = ({ memberId, role }: IUpdateRolePayload) => {
  const updateMemberRole = new PostRequestBuilder(
    `org/update-member-role`,
    SERVER_ENDPOINT
  );

  return updateMemberRole.withBody({ memberId, role }).sendRequest();
};

const deleteMember = (memberId: string) => {
  const deleteMember = new DeleteRequestBuilder(
    `org/delete-member/${memberId}`,
    SERVER_ENDPOINT
  );

  return deleteMember.sendRequest();
};

export const FETCH_ORG_MEMBERS = "FETCH_ORG_MEMBERS";

export const useOrgMembers = (orgId = "") => {
  const orgMembers = useQuery({
    queryKey: [orgId, FETCH_ORG_MEMBERS],
    queryFn: () => getOrgMembers(orgId),
    enabled: Boolean(orgId),
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

export const useUpdateMemberRole = ({
  onSuccess,
  onError,
}: {
  onSuccess: VoidFunction;
  onError: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (payload: IUpdateRolePayload) => updateMemberRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([FETCH_ORG_MEMBERS]);
      onSuccess();
    },
    onError: onError,
  });

  return mutate;
};

export const useDeleteMember = ({
  onSuccess,
  onError,
}: {
  onSuccess: VoidFunction;
  onError: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (memberId: string) => {
      return deleteMember(memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([FETCH_ORG_MEMBERS]);
      onSuccess();
    },
    onError: onError,
  });
  return mutate;
};
