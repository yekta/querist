import { useTheme } from "@components/providers/ThemeProvider";
import { useDarkMode } from "usehooks-ts";

export default function HomePage() {
  const { theme, systemTheme } = useTheme();
  return (
    <div>
      Home Page{" "}
      <p>
        {theme}, {systemTheme}
      </p>
    </div>
  );
}
