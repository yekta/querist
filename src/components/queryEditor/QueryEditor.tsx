import IconLoading from "@components/icons/IconLoading/IconLoading";
import { useTheme } from "@components/providers/ThemeProvider";
import {
  getDefineThemeProps,
  getEditorTheme,
} from "@components/queryEditor/editorTheme";
import { Editor, useMonaco, type EditorProps } from "@monaco-editor/react";
import { useEffect, useState } from "react";

export default function QueryEditor({ monaco }: { monaco: any }) {
  const { finalTheme } = useTheme();
  const [isMonacoReady, setIsMonacoReady] = useState(false);

  useEffect(() => {
    if (!monaco?.editor || isMonacoReady) return;
    setIsMonacoReady(true);
  }, [monaco]);

  useEffect(() => {
    if (!isMonacoReady) return;
    monaco.editor.defineTheme(...getDefineThemeProps(finalTheme));
    monaco.editor.setTheme(getEditorTheme(finalTheme));
  }, [finalTheme, isMonacoReady]);

  return (
    <Editor
      defaultLanguage="sql"
      defaultValue=""
      loading={<EditorLoading />}
      theme={getEditorTheme(finalTheme)}
      options={options}
    />
  );
}

function EditorLoading() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
      <IconLoading className="w-8 h-8" colorClassName="bg-foreground/60" />
      <p className="text-foreground/0">Loading</p>
    </div>
  );
}

const options: EditorProps["options"] = {
  tabSize: 2,
  fontSize: 13,
  minimap: {
    enabled: false,
  },
  wordWrap: "on",
  padding: {
    top: 12,
    bottom: 12,
  },
};
