"use client";
import { Select } from "./Select";
import { Controller } from "react-hook-form";
import { ISelect } from "./type";

interface IControlledSelect
  extends Omit<ISelect, "onChange" | "value" | "error"> {
  name: string;
}
export const ControlledSelect = (props: IControlledSelect) => {
  const { name, ...selectProps } = props;
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Select
          {...selectProps}
          onChange={onChange}
          value={value}
          error={error}
        />
      )}
    />
  );
};
