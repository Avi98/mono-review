"use client";

import { useTheme } from "../utils/theme/use-theme";

export const Input = () => {
  const theme = useTheme();
  console.log({ theme });

  return (
    <>
      <input placeholder="hieelw"></input>
      <button
        onClick={() => {
          //@ts-expect-error
          if (theme.theme === "dark") {
            //@ts-expect-error
            theme.handleThemeChange?.("light");
          } else {
            //@ts-expect-error
            theme.handleThemeChange?.("dark");
          }
        }}
      >
        theme button
      </button>
    </>
  );
};
