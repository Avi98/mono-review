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

interface IAddMemberForm {
  onClose?: VoidFunction;
}

export const AddMemberForm = ({ onClose }: IAddMemberForm) => {
  const methods = useForm<AddMemberFormType>({
    resolver: zodResolver(addMemberSchema),
  });

  const { handleSubmit, register } = methods;
  const addMember = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(addMember)} className="flex flex-col gap-4">
        <ControlledSelect
          name="title"
          options={titleOptions}
          placeholder="Title"
        />

        <Input
          required
          placeholder="email"
          type="email"
          {...register("email")}
        />
        <Input required placeholder="First Name" {...register("firstName")} />
        <Input required placeholder="Last Name" {...register("lastName")} />
        <ControlledSelect
          name="role"
          options={role_options}
          placeholder="User role"
        />
        {/* <div className="flex  "> */}
        {onClose ? (
          <Button size={"lg"} onClick={onClose}>
            Cancel
          </Button>
        ) : null}
        <Button size={"lg"} variant="primary" type="submit">
          Save
        </Button>
        {/* </div> */}
      </form>
    </FormProvider>
  );
};
