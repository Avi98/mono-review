import Link, { LinkProps } from "next/link";
import { cn } from "../../utils/classNameMerge";
import React from "react";
import { className } from "../types";

interface LinkButtonProps extends LinkProps {
  className?: className;
  children: React.ReactNode;
}
export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, children, href, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(
          "font-semibold decoration-sky-500 hover:underline  hover:underline-offset-8",
          className
        )}
        {...props}
        href={href}
      >
        {children}
      </Link>
    );
  }
);

LinkButton.displayName = "LinkButton";
