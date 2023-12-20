"use client";

import React from "react";
import { useAppStore } from "../../../../store/store";

/**
 * Since user will be loggedin only after this
 * @param param0
 * @returns
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { fetchCurrentUserSession: fetchUser, user } = useAppStore();

  React.useEffect(() => {
    fetchUser();

    //only fire this once the component has been loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
