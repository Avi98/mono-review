"use client";

import React from "react";
import { useLogin } from "../../../../../api/auth";
import { Button } from "../../../../components/button/Button";
import { Input } from "../../../../components/input/BaseInput";

export const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { mutate: login } = useLogin({
    onSuccess: () => {},
    onError: () => {},
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form
      className="bg-card flex flex-col justify-between gap-5"
      onSubmit={onSubmit}
    >
      <Input
        placeholder="email"
        onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
      />
      <Input
        placeholder="password"
        type="password"
        onChange={(e: React.SyntheticEvent<HTMLInputElement>) =>
          setPassword(e.currentTarget.value)
        }
      />
      <Button variant={"primary"}>Login</Button>
    </form>
  );
};
