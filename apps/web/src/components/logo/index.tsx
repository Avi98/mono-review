import { HTMLAttributes } from "react";
import { ProductIcon } from "../../../illustrations/ic-productIcon";
import { cn } from "../../utils/classNameMerge";

interface ILogoIcon extends HTMLAttributes<HTMLDivElement> {}

export const LogoIcon = ({ className, ...props }: ILogoIcon) => (
  <div
    className={cn(
      "flex h-10 w-40 cursor-pointer justify-start align-middle",
      className
    )}
    {...props}
  >
    <ProductIcon />
    <div
      className={
        "flex items-center font-mono font-bold capitalize text-sky-500"
      }
    >
      Dockmz
    </div>
  </div>
);
