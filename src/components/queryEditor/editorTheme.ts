import { TFinalTheme } from "@components/providers/ThemeProvider";

const editorThemes: TEditorThemes = {
  dark: {
    background: "#14141A",
    themeName: "querist-dark" as TEditorTheme,
  },
  light: {
    background: "#FAFAFA",
    themeName: "querist-light" as TEditorTheme,
  },
};

export const getDefineThemeProps = (theme: TFinalTheme) => {
  const options = {
    base: theme === "dark" ? "vs-dark" : "vs",
    inherit: true,
    rules: [
      { background: editorThemes[theme].background },
      /* {
        token: "",
        background: theme === "dark" ? "1f1f1f" : "f0f0f0",
        foreground: theme === "dark" ? "d4d4d4" : "444444",
      },
      { token: "string.sql", foreground: "24b47e" },
      { token: "comment", foreground: "666666" },
      {
        token: "predefined.sql",
        foreground: theme === "dark" ? "D4D4D4" : "444444",
      }, */
    ],
    colors: { "editor.background": editorThemes[theme].background },
  };
  const editorTheme: TEditorTheme = editorThemes[theme].themeName;
  const props: [string, any] = [editorTheme, options];
  return props;
};

export function getEditorTheme(theme: TFinalTheme) {
  return editorThemes[theme].themeName;
}

export type TEditorTheme = "querist-dark" | "querist-light";
export type TEditorThemes = Record<TFinalTheme, TEditorThemeDef>;

export type TEditorThemeDef = {
  background: string;
  themeName: TEditorTheme;
};
