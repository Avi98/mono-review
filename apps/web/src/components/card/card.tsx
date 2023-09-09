import React from "react";
import { cn } from "../../utils/classNameMerge";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn(
      "bg-card text-card-foreground rounded-lg border p-10 sm:rounded-2xl sm:shadow-lg"
    )}
  />
));

Card.displayName = "Card";
