"use client";

import { ArrowLeft } from "lucide-react";
import { useSideBar } from "../../provider/side-bar-provider";

export const CloseSideBar = () => {
  const { toggleSideBar } = useSideBar();
  return (
    <div className="flex justify-end">
      <ArrowLeft onClick={toggleSideBar} className="cursor-pointer " />
    </div>
  );
};
