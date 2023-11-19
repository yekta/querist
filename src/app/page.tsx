import { useTheme } from "@components/providers/ThemeProvider";
import { useDarkMode } from "usehooks-ts";

export default function HomePage() {
  const { theme, systemTheme } = useTheme();
  return (
    <div className="w-full flex flex-1 items-center justify-center">
      Home, {theme}, {systemTheme}
    </div>
  );
}
