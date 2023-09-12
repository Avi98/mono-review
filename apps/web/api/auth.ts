import { useMutation, useQuery } from "@tanstack/react-query";
import { SERVER_ENDPOINT } from "./contants";

const login = (payload: { email: string; password: string }) =>
  fetch(`${SERVER_ENDPOINT}/auth/login`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

const signup = (payload: {
  email: string;
  username: string;
  lastName: string;
  photo: string;
  password: string;
}) =>
  fetch(`${SERVER_ENDPOINT}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

const logout = () =>
  fetch(`${SERVER_ENDPOINT}/auth/logout`, { method: "DELETE" });

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
