"use client";

import Link from "next/link";
import { Button } from "../../../../components/button/Button";
import { Input } from "../../../../components/input/BaseInput";
import { LinkButton } from "../../../../components/link";

export const SignUpForm = () => {
  return (
    <>
      <form className="flex flex-col gap-3">
        <Input placeholder="Email" />
        <Input placeholder="create password" type="password" />
        <Input placeholder="confirm password" type="password" />

        <Button variant={"primary"}>Create account</Button>
      </form>
      <p className="pt-3">
        Already have an account?&nbsp;
        <LinkButton href={"/login"}>login</LinkButton>
      </p>
    </>
  );
};
