import { SelectGroup, SelectInput, SelectItem } from "./SelectInput";

interface ISelectDropdownBox {
  onChange(value: string): void;
  value: string;
  options: { label: string; value: string }[];
}

export const SelectDropdownBox = (props: ISelectDropdownBox) => {
  console.log({ props });
  return (
    <SelectInput
      label="Select member role"
      onChange={props.onChange}
      value={props.value}
    >
      {props.options.map(({ label, value }) => (
        <SelectItem value={value}>{label}</SelectItem>
      ))}
    </SelectInput>
  );
};
