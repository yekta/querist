import IconLoading from "@components/icons/IconLoading";
import { useTheme } from "@components/providers/ThemeProvider";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export default function QueryEditor() {
  const { finalTheme } = useTheme();
  const monaco = useMonaco();

  useEffect(() => {
    monaco?.editor.setTheme(finalTheme === "dark" ? "vs-dark" : "light");
  }, [finalTheme]);

  return (
    <Editor
      className="w-full flex-1"
      defaultLanguage="sql"
      defaultValue=""
      loading={Loading()}
      theme={finalTheme === "dark" ? "vs-dark" : "light"}
    />
  );
}

function Loading() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
      <IconLoading className="w-8 h-8 opacity-60" />
      <p className="text-foreground/0">Loading</p>
    </div>
  );
}
