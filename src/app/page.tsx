import IconLoading from "@components/icons/IconLoading";
import { Combobox, TComboboxItem } from "@components/primitives/ui/combobox";
import { useTheme } from "@components/providers/ThemeProvider";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useSchemas } from "@ts/hooks/useSchemas";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { data, isLoading, isError, isRefetching } = useSchemas();
  const { theme, systemTheme } = useTheme();
  const schemas: TComboboxItem[] | null =
    !isLoading && !isError
      ? data.map((s) => ({
          value: s,
          label: s,
        }))
      : null;
  const [schemaValue, setSchemaValue] = useState<string | null>(
    !isLoading && !isError ? schemas[0].value : null
  );
  const [schemaOpen, setSchemaOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !isError) {
      setSchemaValue(data.includes("public") ? "public" : data[0]);
    }
  }, [isLoading, isError]);

  return (
    <div className="w-full flex flex-1 items-stretch justify-center">
      <div className="w-64 flex flex-col items-start justify-start border-r border-border">
        <div className="w-full border-b border-border">
          <p className="px-4 py-3 font-black text-xl">Table Editor</p>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full px-4 py-2 flex items-center">
            <p className="font-bold text-lg flex-shrink min-w-0 overflow-hidden overflow-ellipsis pr-2">
              Schema
            </p>
            {isRefetching && <IconLoading className="w-4 h-4 opacity-60" />}
          </div>
          <div className="w-full px-2">
            <Combobox
              isLoading={isLoading}
              isError={isError}
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
