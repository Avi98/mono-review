import { createContext, useContext } from "react";

export const ThemeContext = createContext({});
const defaultTheme = { setTheme: (_: unknown) => {}, themes: [] };

export const useTheme = () => useContext(ThemeContext) ?? defaultTheme;
