"use client";

import React from "react";
import { Button } from "../../../../components/button/Button";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const router = useRouter();
  const signOut = React.useCallback(() => {
    //signout api
    router.push("/logouts");
  }, [router]);

  return (
    <Button type="button" variant={"outline"} size={"sm"} onClick={signOut}>
      Sign Out
    </Button>
  );
};
