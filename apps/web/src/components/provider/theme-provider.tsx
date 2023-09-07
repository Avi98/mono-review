"use client";

import React from "react";
import { ThemeProvider } from "../../utils/theme/theme";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
