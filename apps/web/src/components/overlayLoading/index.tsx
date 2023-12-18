import React from "react";
import { Loader } from "../loader";

interface IOverlayLoading {
  isLoading: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | null;
  bgOverlay?: boolean;
}

export const OverlayLoading = ({
  isLoading,
  children,
  size = "xl",
  bgOverlay = false,
}: IOverlayLoading) => {
  if (isLoading && bgOverlay) {
    return (
      <>
        <div className="absolute z-10 grid h-screen w-screen place-items-center">
          <Loader size={size} />
        </div>
        <div className="grid h-full w-full place-items-center opacity-0">
          {children}
        </div>
      </>
    );
  }
  if (isLoading)
    return (
      <div className="absolute grid h-screen w-screen place-items-center">
        <Loader size={size} />
      </div>
    );

  return children;
};
