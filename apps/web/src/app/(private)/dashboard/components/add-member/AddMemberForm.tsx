"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  AddMemberFormType,
  addMemberSchema,
} from "../../../../../../schema/AddMember";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../../../components/input/BaseInput";
import { Button } from "../../../../../components/button/Button";
import { role_options } from "../../../../../utils/roleOption";
import { ControlledSelect } from "../../../../../components/select/ControlledSelect";
import { titleOptions } from "../../../../../utils/titleOption";
import { useAddMember } from "../../../../../../api/org";
import { toast } from "../../../../../components/toast/use-toast";
import { useRouter } from "next/navigation";

interface IAddMemberForm {
  onClose?: VoidFunction;
}

export const AddMemberForm = ({ onClose }: IAddMemberForm) => {
  //@TODO
  const orgId = "83f008f8-87e4-4e3f-89c7-595cdb04287e";

  const methods = useForm<AddMemberFormType>({
    resolver: zodResolver(addMemberSchema),
  });
  const { mutate: saveMember, isSuccess, isLoading, error } = useAddMember();
  const router = useRouter();

  const { handleSubmit, register, formState } = methods;

  if (isSuccess) {
    toast({
      title: `Added member`,
      desc: `Send invite through email`,
      variant: "success",
    });
    router.push("/dashboard/members");
  } else if (error) {
    toast({
      title: `Failed to add member`,
      desc: (error as Error)?.message || "Something went wrong",
      variant: "error",
    });
  }

  const addMember = async (formValues: AddMemberFormType) => {
    saveMember({ ...formValues, orgId });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(addMember)}
        className="flex flex-col gap-4"
        noValidate={true}
      >
        <ControlledSelect
          name="title"
          options={titleOptions}
          placeholder="Title"
        />

        <Input
          required
          placeholder="First Name"
          error={formState.errors.firstName}
          {...register("firstName")}
        />
        <Input
          required
          placeholder="Last Name"
          {...register("lastName")}
          error={formState.errors.lastName}
        />
        <Input
          required
          placeholder="Username"
          {...register("username")}
          error={formState.errors.username}
        />

        <Input
          required
          placeholder="email"
          type="email"
          error={formState.errors.email}
          {...register("email")}
        />
        <ControlledSelect
          name="role"
          options={role_options}
          placeholder="User role"
        />
        {onClose ? (
          <Button size={"lg"} onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
        ) : null}
        <Button
          size={"lg"}
          variant="primary"
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Save
        </Button>
      </form>
    </FormProvider>
  );
};
