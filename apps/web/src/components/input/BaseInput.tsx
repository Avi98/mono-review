import { forwardRef } from "react";
import { cn } from "../../utils/classNameMerge";
import { baseFieldStyle, errorFieldBaseStyle } from "../utils/baseFieldStyles";
import { ErrorSubField } from "../error/ErrorField";
import { FieldError } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <input
          {...props}
          ref={ref}
          className={cn(
            "flex px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            baseFieldStyle,
            className,
            error && errorFieldBaseStyle
          )}
        />
        <ErrorSubField error={error} />
      </div>
    );
  }
);

Input.displayName = "Input";
