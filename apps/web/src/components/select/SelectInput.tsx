import * as Select from "@radix-ui/react-select";
import { ReactNode, useState } from "react";
import { useToggle } from "../hooks/use-toggle";
import { ChevronDown } from "lucide-react";

interface ISelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}
export function SelectInput(props: ISelectInputProps) {
  const { open, toggle } = useToggle();

  const handleOnChange = (value: string) => {
    props.onChange(value);
  };

  return (
    <Select.Root
      onValueChange={handleOnChange}
      onOpenChange={toggle}
      open={open}
    >
      <Select.Trigger className="flex capitalize">
        <Select.Value placeholder={props.label} />
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            {/* <Select.Group>{props.children}</Select.Group> */}
            <Select.Group>
              {" "}
              <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                Fruits
              </Select.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

export const SelectItem = Select.Item;
export const SelectGroup = Select.Group;
