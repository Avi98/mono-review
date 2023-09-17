import { useMutation, useQuery } from "@tanstack/react-query";
import { SERVER_ENDPOINT } from "./contants";
import { PostRequestBuilder } from "./common/post-reqest-builder";
import { DeleteRequestBuilder } from "./common/delete-request-builder";

const login = async (payload: { email: string; password: string }) => {
  const getRequest = new PostRequestBuilder("auth/login", SERVER_ENDPOINT);

  getRequest.withBody(payload);
  return await getRequest.sendRequest();
};

const signup = async (payload: {
  email: string;
  username: string;
  lastName: string;
  photo: string;
  password: string;
}) => {
  const getRequest = new PostRequestBuilder("auth/signup", SERVER_ENDPOINT);
  getRequest.withBody(payload);

  return await getRequest.sendRequest();
};

const logout = async () => {
  const deleteToken = new DeleteRequestBuilder("auth/logout", SERVER_ENDPOINT);
  return await deleteToken.sendRequest();
};

export const useLogin = ({
  onError,
  onSuccess,
}: {
  onError: VoidFunction;
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
  onError: VoidFunction;
  onSuccess: VoidFunction;
}) => {
  return useMutation({
    mutationFn: signup,
    onSuccess: onSuccess,
    onError: onError,
  });
};
