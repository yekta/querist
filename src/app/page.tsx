import { Combobox, TComboboxItem } from "@components/primitives/ui/combobox";
import { useTheme } from "@components/providers/ThemeProvider";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function HomePage() {
  const { theme, systemTheme } = useTheme();
  const schemas: TComboboxItem[] = [
    {
      label: "public",
      value: "public",
    },
    {
      label: "extensions",
      value: "extensions",
    },
    {
      label: "storage",
      value: "storage",
    },
    {
      label: "pg_catalog",
      value: "pg_catalog",
    },
  ];
  const [schemaValue, setSchemaValue] = useState<string>(schemas[0].value);
  const [schemaOpen, setSchemaOpen] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-1 items-stretch justify-center">
      <div className="w-64 flex flex-col items-start justify-start border-r border-border">
        <div className="w-full border-b border-border">
          <p className="px-4 py-3 font-black text-xl">Table Editor</p>
        </div>
        <div className="w-full flex flex-col">
          <p className="px-4 py-2 font-bold text-lg">Schema</p>
          <div className="w-full px-2">
            <Combobox
              value={schemaValue}
              setValue={setSchemaValue}
              open={schemaOpen}
              setOpen={setSchemaOpen}
              items={schemas}
              noResultText="No schemas found."
              notSelectedText="Select a schema"
              searchPlaceholder="Search schemas"
              SelectedItemIcon={DocumentTextIcon}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
        Home, {theme}, {systemTheme}
      </div>
    </div>
  );
}
