"use client";

import { Button } from "../../../../components/button/Button";
import { Input } from "../../../../components/input/BaseInput";
import { LinkButton } from "../../../../components/link";
import { useForm } from "react-hook-form";
import {
  SignUpFormSchemaType,
  signUpSchema,
} from "../../../../../schema/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../../../../../api/auth";
import { toast } from "../../../../components/toast/use-toast";

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate: signup } = useSignup({
    onSuccess: () => {
      toast({
        desc: "Please confirm your email by verifying your email",
        title: "Email sent",
        variant: "success",
      });
    },
    onError: (e) => {
      toast({
        desc: e.message || "Error occurred",
        title: "Something went wrong",
        variant: "error",
      });
    },
  });

  const onSubmit = ({
    email,
    password,
    firstName,
    lastName,
    username,
  }: SignUpFormSchemaType) => {
    signup({ email, password, firstName, lastName, username });
  };
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Email" required {...register("email")} />
        <Input placeholder="Username" required {...register("username")} />
        <Input placeholder="First Name" required {...register("firstName")} />
        <Input placeholder="Last Name" required {...register("lastName")} />
        <Input
          required
          placeholder="create password"
          type="password"
          {...register("password")}
        />
        <Input
          required
          placeholder="confirm password"
          type="password"
          {...register("confirmPassword")}
        />

        <Button variant={"primary"}>Create account</Button>
      </form>
      <p className="pt-3">
        Already have an account?&nbsp;
        <LinkButton href={"/login"}>login</LinkButton>
      </p>
    </>
  );
};
