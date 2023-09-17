"use client";

import React from "react";
import { useLogin } from "../../../../../api/auth";
import { Button } from "../../../../components/button/Button";
import { Input } from "../../../../components/input/BaseInput";
import { toast } from "../../../../components/toast/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormType } from "../../../../../schema/login";

export const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { mutate: login } = useLogin({
    onSuccess: () => {
      toast({
        desc: "Welcome back!",
        title: "Login Successful",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        desc: "Login failed",
        title: "Please enter the correct password",
        variant: "error",
      });
    },
  });

  const { register, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = ({ email, password }: LoginFormType) => {
    login({ email, password });
  };

  return (
    <form
      className="bg-card flex flex-col justify-between gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input required placeholder="email" type="email" {...register("email")} />
      <Input
        required
        placeholder="password"
        type="password"
        {...register("password")}
      />
      <Button type="submit" variant={"primary"}>
        Login
      </Button>
    </form>
  );
};
