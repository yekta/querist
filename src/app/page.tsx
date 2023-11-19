import { useTheme } from "@components/providers/ThemeProvider";

export default function HomePage() {
  const { theme, systemTheme } = useTheme();
  return (
    <div className="w-full flex flex-1 items-stretch justify-center">
      <div className="w-64 flex flex-col items-start justify-start border-r border-c-outline">
        <div className="w-full border-b border-c-outline">
          <p className="px-4 py-3 font-black text-xl">Table Editor</p>
        </div>
        <div className="w-full flex flex-col">
          <p className="px-4 py-2 font-bold text-lg">Schema</p>
        </div>
      </div>
      <div className="flex-1 p-4">
        Home, {theme}, {systemTheme}
      </div>
    </div>
  );
}
