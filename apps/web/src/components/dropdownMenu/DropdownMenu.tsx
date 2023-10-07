import { MoreHorizontal, MoreVertical } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../utils/classNameMerge";

interface IDropdown extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Dropdown = (props: IDropdown) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button
        onClick={props.onClick}
        className={
          "shadow-blackA4 rounded-full p-3 outline-none hover:bg-slate-500 focus:bg-slate-500 focus:shadow-[0_0_0_2px] focus:shadow-white active:bg-slate-500"
        }
      >
        <MoreVertical />
      </button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade rounded-md bg-slate-600 p-2 transition-colors ease-linear will-change-[opacity,transform]">
        {props.children}
        <DropdownMenu.Arrow className="fill-slate-500" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export const DropdownItem = (props: {
  children: ReactNode;
  className?: HTMLElement["className"];
  onClick: VoidFunction;
}) => (
  <DropdownMenu.Item
    className={cn("min-w-min cursor-pointer p-2 text-left", props.className)}
  >
    {props.children}
  </DropdownMenu.Item>
);
