"use client";

import React from "react";
import { useLogout } from "../../../api/auth";
import { Button } from "../button/Button";
import { toast } from "../toast/use-toast";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();

  const { mutate: logout, isLoading: isLoggingOut } = useLogout({
    onSuccess: () => {
      router.push("/login");
      toast({
        desc: "Logging out",
        title: "Successfully logout",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        desc: "Logout failed",
        title: "Something went wrong",
        variant: "error",
      });
    },
  });

  const signOut = React.useCallback(() => {
    logout();
  }, [logout]);

  return (
    <Button
      type="button"
      variant={"default"}
      size={"sm"}
      onClick={signOut}
      disabled={isLoggingOut}
    >
      Sign Out
    </Button>
  );
};
