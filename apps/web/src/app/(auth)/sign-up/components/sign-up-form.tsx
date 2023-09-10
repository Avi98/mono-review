"use client";

import Link from "next/link";
import { Button } from "../../../../components/button/Button";
import { Input } from "../../../../components/input/BaseInput";

export const SignUpForm = () => {
  const newLocal = "px-0 py-0";
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
        <Link
          href={"/login"}
          className="font-semibold decoration-sky-500 hover:underline  hover:underline-offset-8"
        >
          Login
        </Link>
      </p>
    </>
  );
};
