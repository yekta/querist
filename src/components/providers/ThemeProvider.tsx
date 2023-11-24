import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";

type TSystemTheme = "dark" | "light";
export type TTheme = TSystemTheme | "system";
export type TFinalTheme = "dark" | "light";

export const defaultTheme: TTheme = "system";
export const themeAtom = atomWithStorage<TTheme>("theme", defaultTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { finalTheme } = useTheme();

  useEffect(() => {
    if (finalTheme === "light") {
      if (document.documentElement.getAttribute("data-theme") !== "light") {
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    } else {
      if (document.documentElement.getAttribute("data-theme") !== "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      }
    }
  }, [finalTheme]);

  return children;
}

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  const { isDarkMode } = useDarkMode();
  const [finalTheme, setFinalTheme] = useState<TFinalTheme>(
    theme === "system" ? (isDarkMode ? "dark" : "light") : theme
  );

  useEffect(() => {
    if (theme === "system") {
      setFinalTheme(isDarkMode ? "dark" : "light");
    } else {
      setFinalTheme(theme);
    }
  }, [theme, isDarkMode]);

  return {
    theme,
    systemTheme: isDarkMode ? "dark" : "light",
    setTheme,
    finalTheme,
  };
}
