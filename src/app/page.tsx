import IconLoading from "@components/icons/IconLoading";
import { Combobox, TComboboxItem } from "@components/primitives/ui/combobox";
import { ScrollArea } from "@components/primitives/ui/scroll-area";
import { useTheme } from "@components/providers/ThemeProvider";
import {
  DocumentTextIcon,
  TableCellsIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";
import { useSchemas } from "@ts/db/useSchemas";
import { useTables } from "@ts/db/useTables";
import { useEffect, useState } from "react";
import { useElementSize } from "usehooks-ts";

export default function HomePage() {
  const {
    data: schemasData,
    isLoading: schemasIsLoading,
    isError: schemasIsError,
    isRefetching: schemasIsRefetching,
  } = useSchemas();
  const { theme, systemTheme } = useTheme();
  const schemas: TComboboxItem[] | null =
    !schemasIsLoading && !schemasIsError
      ? schemasData.map((s) => ({
          value: s,
          label: s,
        }))
      : null;
  const [schemaValue, setSchemaValue] = useState<string | null>(
    !schemasIsLoading && !schemasIsError ? schemas[0].value : null
  );
  const {
    data: tablesData,
    isLoading: tablesIsLoading,
    isRefetching: tablesIsRefetching,
    isError: tablesIsError,
  } = useTables(schemaValue);
  const [schemaOpen, setSchemaOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!schemasIsLoading && !schemasIsError) {
      setSchemaValue(
        schemasData.includes("public") ? "public" : schemasData[0]
      );
    }
  }, [schemasIsLoading, schemasIsError]);

  return (
    <div className="w-full flex flex-1 items-stretch justify-center overflow-hidden">
      <div className="w-64 flex flex-col items-start justify-start border-r border-border overflow-hidden">
        <div className="w-full border-b border-border">
          <p className="px-4 py-3 font-black text-xl">Table Editor</p>
        </div>
        <div className="w-full flex-1 flex flex-col items-start justify-start overflow-hidden">
          <ScrollArea className="w-full flex-1 flex flex-col items-start justify-start">
            <div className="w-full flex flex-col pb-16">
              <section className="w-full flex flex-col">
                <div className="w-full flex flex-col">
                  <div className="w-full px-4 py-2 flex items-center">
                    <p className="font-bold text-lg flex-shrink min-w-0 overflow-hidden overflow-ellipsis pr-2">
                      Schema
                    </p>
                    {schemasIsRefetching && (
                      <IconLoading className="w-4 h-4 opacity-60" />
                    )}
                  </div>
                  <div className="w-full px-2">
                    <Combobox
                      isLoading={schemasIsLoading}
                      isError={schemasIsError}
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
              </section>
              <section className="w-full flex flex-col pt-3">
                <div className="w-full px-4 py-2 flex items-center">
                  <p className="font-bold text-lg flex-shrink min-w-0 overflow-hidden overflow-ellipsis pr-2">
                    Tables
                  </p>
                  {tablesIsRefetching && (
                    <IconLoading className="w-4 h-4 opacity-60" />
                  )}
                </div>
                <div className="w-full flex flex-col">
                  {tablesIsError ? (
                    <div className="w-full flex items-center justify-center px-2 py-px">
                      <div className="w-full border border-border px-3 py-5 gap-2 flex items-center justify-center">
                        <ExclamationTriangleIcon className="w-4 h-4 opacity-60" />
                        <p className="text-sm text-foreground/60">Error</p>
                      </div>
                    </div>
                  ) : tablesIsLoading ? (
                    <div className="w-full flex items-center justify-center px-2 py-px">
                      <div className="w-full border border-border px-3 py-5 gap-2 flex items-center justify-center">
                        <IconLoading className="w-4 h-4 opacity-60" />
                        <p className="text-sm text-foreground/60">Loading</p>
                      </div>
                    </div>
                  ) : tablesData && tablesData.length === 0 ? (
                    <div className="w-full flex items-center justify-center px-2 py-px">
                      <p className="text-sm text-center text-foreground/60 w-full border border-border px-3 py-5">
                        No tables found.
                      </p>
                    </div>
                  ) : (
                    tablesData &&
                    tablesData.length > 0 &&
                    tablesData.map((t, i) => (
                      <TableLink
                        isSelected={i === 0 ? true : false}
                        key={t.table_name}
                        title={t.table_name}
                      />
                    ))
                  )}
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex-1 p-4">
        Home, {theme}, {systemTheme}
      </div>
    </div>
  );
}

function TableLink({
  title,
  isSelected,
}: {
  title: string;
  isSelected: boolean;
}) {
  return (
    <Link
      to="/"
      className="px-2 py-px w-full text-sm group flex items-center justify-start cursor-default"
    >
      <div
        className={`w-full flex items-center justify-start px-2.5 py-2 border ${
          isSelected
            ? "bg-border border-border"
            : "border-transparent group-hover:border-border"
        }`}
      >
        <TableCellsIcon
          className={`w-4 h-4 shrink-0 mr-2 group-hover:text-foreground
          ${isSelected ? "text-foreground" : "text-foreground/75"}`}
        />
        <p
          className={`w-full overflow-hidden overflow-ellipsis group-hover:text-foreground
          ${isSelected ? "text-foreground" : "text-foreground/75"}`}
        >
          {title}
        </p>
      </div>
    </Link>
  );
}
