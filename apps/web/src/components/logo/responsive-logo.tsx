"use client";
import { HTMLAttributes } from "react";
import { ProductIcon } from "../../../illustrations/ic-product-icon";
import { cn } from "../../utils/classNameMerge";

interface ILogoIcon extends HTMLAttributes<HTMLDivElement> {
  hideName: boolean;
}

export const LogoResponsiveIcon = ({
  className,
  hideName,
  ...props
}: ILogoIcon) => {
  return (
    <div
      className={cn(
        "flex h-10 w-40 cursor-pointer justify-start align-middle",
        className
      )}
      {...props}
    >
      <ProductIcon />
      <div
        className={cn(
          "flex items-center font-mono font-bold capitalize text-sky-500",
          hideName ? "hidden" : "block"
        )}
      >
        Dockmz
      </div>
    </div>
  );
};
