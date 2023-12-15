import { forwardRef } from "react";
import { cn } from "../../utils/classNameMerge";
import { baseFieldStyle } from "../utils/baseFieldStyles";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(
          "flex px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          baseFieldStyle,
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";
