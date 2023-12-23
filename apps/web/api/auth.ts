import { useMutation, useQuery } from "@tanstack/react-query";
import { SERVER_ENDPOINT } from "./utils/contants";
import { PostRequestBuilder } from "./common/post-reqest-builder";
import { DeleteRequestBuilder } from "./common/delete-request-builder";
import { SignUpFormSchemaType } from "../schema/signup";
import { FETCH_CURRENT_USER_SESSION } from "./utils/query-keys";
import { GetRequestBuilder } from "./common/get-request-builder";

const login = async (payload: { email: string; password: string }) => {
  const loginUser = new PostRequestBuilder("auth/login", SERVER_ENDPOINT);
  return loginUser.withBody(payload).sendRequest();
};

const signup = async (
  payload: Omit<SignUpFormSchemaType, "confirmPassword">
) => {
  const getRequest = new PostRequestBuilder("auth/signup", SERVER_ENDPOINT);
  return await getRequest.withBody({ ...payload, photo: "" }).sendRequest();
};

const logout = async () => {
  const deleteToken = new DeleteRequestBuilder("auth/logout", SERVER_ENDPOINT);
  return await deleteToken.sendRequest();
};

export const useLogin = ({
  onError,
  onSuccess,
}: {
  onError: (e: Error) => void;
  onSuccess: VoidFunction;
}) => {
  return useMutation({
    mutationFn: login,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useLogout = ({
  onError,
  onSuccess,
}: {
  onError: VoidFunction;
  onSuccess: VoidFunction;
}) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useSignup = ({
  onError,
  onSuccess,
}: {
  onError: (e: Error) => void;
  onSuccess: VoidFunction;
}) => {
  return useMutation({
    mutationFn: signup,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useAuth = ({
  onSuccess,
  onError,
}: {
  onError: (e: Error) => void;
  onSuccess: VoidFunction;
}) => {
  const query = useQuery({
    queryKey: [FETCH_CURRENT_USER_SESSION],
    queryFn: getUserSession,
    onSuccess,
    onError,
  });
  return query;
};
