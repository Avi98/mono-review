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
      "bg-card text-card-foreground rounded-lg border sm:rounded-2xl sm:shadow-lg"
    )}
  />
));

export const CardBody = ({
  header,
  subHeader,
  children,
}: {
  header: string;
  subHeader?: string;
  children: React.ReactNode;
}) => (
  <div className="bg-card m-10 flex flex-col justify-between gap-5">
    <div className=" flex flex-col items-center justify-center gap-2 align-middle">
      <h1 className="text-2xl font-semibold">{header}</h1>
      {subHeader ? <p className="text-sm font-light">{subHeader}</p> : null}
    </div>
    <div className="py-2">{children}</div>
  </div>
);

Card.displayName = "Card";
