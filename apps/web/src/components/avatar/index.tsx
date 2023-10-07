import React from "react";
import { cn } from "../../utils/classNameMerge";
import { getFullNameInitials } from "../../utils";

interface IAvatar extends Partial<HTMLSpanElement> {
  fullName: string;
}
export const Avatar = React.forwardRef<HTMLSpanElement, IAvatar>(
  (props, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full bg-sky-500",
          props.className
        )}
      >
        <span className="text-lg font-semibold capitalize">
          {getFullNameInitials(props.fullName)}
        </span>
      </span>
    );
  }
);

Avatar.displayName = "Avatar";
