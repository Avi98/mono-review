"use client";

import { Button } from "../../../../components/button/Button";
import { Input } from "../../../../components/input/BaseInput";

export const LoginForm = () => {
  const onSubmit = () => {};
  return (
    <form
      className="bg-card flex flex-col justify-between gap-5"
      onSubmit={onSubmit}
    >
      <Input placeholder="email" />
      <Input placeholder="password" type="password" />
      <Button variant={"primary"}>Login</Button>
    </form>
  );
};
