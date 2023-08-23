"use client";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext, useTheme } from "./use-theme";

type ThemeType = "system" | "light" | "dark";

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme: ThemeType;
}> = (props) => {
  const [theme, setTheme] = useState(
    () => getLocalStorageTheme() || props.defaultTheme
  );
  const themeContext = useTheme();

  const handleThemeChange = useCallback((themeValue: ThemeType) => {
    const documentElement = document.documentElement;
    const classList = documentElement.classList;

    classList.remove("light", "dark");
    const saveTheme = localStorage.getItem("theme") || "system";

    documentElement.style.colorScheme = themeValue;
    classList.add(themeValue);

    setTheme(themeValue);

    try {
      setLocalStorageTheme(themeValue);
    } catch (e) {}
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== "theme") return;

      const theme = e.newValue || props.defaultTheme;
      setTheme(theme);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [props.defaultTheme, setTheme, theme]);

  const providerValue = useMemo(() => {
    return {
      theme,
      handleThemeChange,
    };
  }, [handleThemeChange, theme]);

  if (Object.keys(themeContext).length) return <>{props.children}</>;

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript />
      {props.children}
    </ThemeContext.Provider>
  );
};

const ThemeScript = memo(
  () => {
    const setThemeScript = `
(function () {
  try {
    const documentElement = document.documentElement;
    const classList = documentElement.classList;
  
    //remove all class
    classList.remove("light", "dark");
    const saveTheme = localStorage.getItem("theme") || 'system';
  
    if (saveTheme === "system") {
      const media = "(prefers-color-scheme: dark)";
      const isDarkScheme = window.matchMedia(media)?.matches;
  
      if (isDarkScheme) {
  documentElement.style.colorScheme = "dark";
  classList.add("dark");
      } else {
  documentElement.style.colorScheme = "light";
  classList.add("light");
      }
    } else if (saveTheme && ["dark", "light"].includes(saveTheme)) {
      documentElement.style.colorScheme = saveTheme;
      classList.add(saveTheme);
    }
  } catch (error) {
    console.log({error})
  }
})();
`;

    return <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />;
  },
  () => true
);
ThemeScript.displayName = "ThemeScript";

const getLocalStorageTheme = () => {
  if (typeof window !== "undefined")
    return window?.localStorage?.getItem?.("theme");
};

const setLocalStorageTheme = (themeValue: ThemeType) => {
  if (typeof window !== "undefined")
    return window?.localStorage?.setItem?.("theme", themeValue);
};
