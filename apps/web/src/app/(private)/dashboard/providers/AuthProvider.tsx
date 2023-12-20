"use client";

import React from "react";
import { useAppStore } from "../../../../store/store";
import { useRunOnMount } from "../../../../components/hooks/use-on-mount";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { fetchCurrentUserSession: fetchUser } = useAppStore();
  useRunOnMount(fetchUser);

  return <>{children}</>;
};
