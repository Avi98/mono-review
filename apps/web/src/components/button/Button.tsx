import React, { ButtonHTMLAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Loader } from "../loader";

const button = cva(
  "inline-flex items-center justify-center font-medium rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus:ring ",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        plain: "text-primary hover:text-primary/80 hover:underline",
        outline:
          "border bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        primary: "bg-primaryGreen text-primary hover:bg-primaryGreen/90 ",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:text-destructive-foreground/80",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, isLoading = false, children, ...props },
    ref
  ) => {
    return (
      <button
        className={button({ className, variant, size })}
        ref={ref}
        {...props}
      >
        {isLoading ? <Loader /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";
