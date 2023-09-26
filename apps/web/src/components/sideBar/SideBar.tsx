"use client";

import { HTMLAttributes } from "react";
import { cn } from "../../utils/classNameMerge";
import { useSideBar } from "../provider/side-bar-provider";

interface ISideBar extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export const SideBar = ({ children, className }: ISideBar) => {
  const { isOpen } = useSideBar();
  return (
    <div
      className={cn(
        "border-border bg-background relative z-10 flex flex-col gap-10 border-r ",
        isOpen ? "md:w-[280px]" : "w-20",
        className
      )}
    >
      {children}
    </div>
  );
};
