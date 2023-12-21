"use client";

import React from "react";
import { useAppStore } from "../../../../store/store";
import { UserStoreType } from "../../../../store/slices/user-session-slice";
import { useRunOnMount } from "../../../../components/hooks/use-on-mount";

interface IAuthProvider {
  children: React.ReactNode;
  user: UserStoreType;
}
export const AuthProvider = ({ children, user }: IAuthProvider) => {
  const { setUserSession } = useAppStore();

  useRunOnMount(() => setUserSession(user));

  return <>{children}</>;
};
