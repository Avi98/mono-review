import { useMutation, useQuery } from "@tanstack/react-query";
import { SERVER_ENDPOINT } from "./contants";
import { PostRequestBuilder } from "./common/post-reqest-builder";
import { DeleteRequestBuilder } from "./common/delete-request-builder";
import { SignUpFormSchemaType } from "../schema/signup";
import { GetRequestBuilder } from "./common/get-request-builder";

const login = async (payload: { email: string; password: string }) => {
  const getRequest = new PostRequestBuilder("auth/login", SERVER_ENDPOINT);

  return getRequest.withBody(payload).sendRequest();
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

export const hasAuth = async () => {
  const getRequest = new GetRequestBuilder("auth/me", SERVER_ENDPOINT);
  return getRequest.sendRequest();
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
