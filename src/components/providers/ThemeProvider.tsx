import { useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";
import { useDarkMode } from "usehooks-ts";

type TSystemTheme = "dark" | "light";
export type TTheme = TSystemTheme | "system";

export const defaultTheme: TTheme = "system";
export const themeAtom = atomWithStorage<TTheme>("theme", defaultTheme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useDarkMode();
  const systemTheme = isDarkMode ? "dark" : "light";
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    if (theme === "light" || (theme === "system" && systemTheme === "light")) {
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
  }, [theme, systemTheme]);

  return children;
}

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);
  const { isDarkMode } = useDarkMode();
  const systemTheme = isDarkMode ? "dark" : "light";
  return {
    theme,
    systemTheme,
    setTheme,
  };
}
