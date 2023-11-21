import IconLoading from "@components/icons/IconLoading";
import { Combobox, TComboboxItem } from "@components/primitives/ui/combobox";
import { ScrollArea } from "@components/primitives/ui/scroll-area";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useSchemas } from "@ts/db/hooks/useSchemas";
import { useSchemaTables } from "@ts/db/hooks/useSchemaTables";
import { useEffect, useState } from "react";
import { useTable } from "@ts/db/hooks/useTable";
import { DataGridQ, TRow } from "@components/dataGrid/DataGridQ";
import { TableList } from "@components/tableList/TableList";
import type { Column } from "react-data-grid";
import { SelectColumn } from "react-data-grid";

export default function HomePage() {
  const {
    data: schemasData,
    isLoading: schemasIsLoading,
    isError: schemasIsError,
    isRefetching: schemasIsRefetching,
  } = useSchemas();
  let [schemas, setSchemas] = useState<TComboboxItem[] | undefined>(undefined);
  const [schemaValue, setSchemaValue] = useState<string | undefined>(undefined);
  const [selectedTable, setSelectedTable] = useState<string | null>(undefined);

  useEffect(() => {
    if (!schemasData) return;
    setSchemaValue(schemasData.includes("public") ? "public" : schemasData[0]);
    setSchemas(
      schemasData.map((s) => ({
        value: s,
        label: s,
      }))
    );
  }, [schemasData]);

  const {
    data: schemaTablesData,
    isLoading: schemaTablesIsLoading,
    isRefetching: schemaTablesIsRefetching,
    isError: schemaTablesIsError,
  } = useSchemaTables(schemaValue);

  useEffect(() => {
    setSelectedTable(undefined);
  }, [schemaValue]);

  useEffect(() => {
    if (!schemaTablesData) return;
    if (schemaTablesData.length === 0) {
      setSelectedTable(null);
      return;
    }
    setSelectedTable(schemaTablesData[0].table_name);
  }, [schemaTablesData]);

  const doesTableBelongToSchema = schemaTablesData
    ?.map((s) => s.table_name)
    .includes(selectedTable);

  const {
    data: tableData,
    isLoading: tableDataIsLoading,
    isError: tableDataIsError,
  } = useTable({
    schemaName: doesTableBelongToSchema ? schemaValue : undefined,
    tableName: doesTableBelongToSchema ? selectedTable : undefined,
  });

  const [schemaOpen, setSchemaOpen] = useState<boolean>(false);

  const [columns, setColumns] = useState<Column<TRow>[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    setColumns([]);
    setRows([]);
    if (!tableData) return;
    const columns = tableData.fields.map((f, i) => ({
      key: f.name,
      ...f,
      frozen: i === 0,
      resizable: true,
    }));
    setColumns([{ ...SelectColumn }, ...columns]);
    setRows(tableData.rows);
    console.log(tableData.rows);
  }, [tableData]);

  const isTableListLoading =
    schemaValue === undefined ||
    selectedTable === undefined ||
    schemaTablesIsLoading ||
    schemaTablesData === null;

  const isTableLoading =
    schemaValue === undefined ||
    selectedTable === undefined ||
    schemasIsLoading ||
    schemaTablesIsLoading ||
    tableDataIsLoading;

  const isTableNonexistent =
    !schemasIsLoading &&
    !schemaTablesIsLoading &&
    !tableDataIsLoading &&
    tableData === null &&
    columns.length === 0 &&
    rows.length === 0;

  return (
    <div className="w-full flex flex-1 items-stretch justify-center overflow-hidden">
      <div className="w-64 flex flex-col items-start justify-start border-r border-border overflow-hidden">
        <div className="w-full border-b border-border">
          <p className="px-4.5 py-3 font-black text-xl">Table Editor</p>
        </div>
        <div className="w-full flex-1 flex flex-col items-start justify-start overflow-hidden">
          <ScrollArea className="w-full flex-1 flex flex-col items-start justify-start">
            <div className="w-full flex flex-col pb-16">
              <section className="w-full flex flex-col pt-1">
                <div className="w-full flex flex-col">
                  <div className="w-full px-5 py-2 flex items-center">
                    <p className="font-bold text-lg flex-shrink min-w-0 overflow-hidden overflow-ellipsis pr-2">
                      Schema
                    </p>
                    {schemasIsRefetching && (
                      <IconLoading className="w-4 h-4 opacity-60" />
                    )}
                  </div>
                  <div className="w-full px-3">
                    <Combobox
                      isLoading={schemasIsLoading || schemaValue === undefined}
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
                <div className="w-full px-5 py-2 flex items-center">
                  <p className="font-bold text-lg flex-shrink min-w-0 overflow-hidden overflow-ellipsis pr-2">
                    Tables
                  </p>
                  {schemaTablesIsRefetching && (
                    <IconLoading className="w-4 h-4 opacity-60" />
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <TableList
                    isLoading={isTableListLoading}
                    isError={schemaTablesIsError}
                    data={schemaTablesData}
                    selectedTable={selectedTable}
                    setSelectedTable={setSelectedTable}
                  />
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="w-full flex-1 overflow-hidden">
        <DataGridQ
          columns={columns}
          rows={rows}
          isLoading={isTableLoading}
          isError={tableDataIsError}
          isNonexistent={isTableNonexistent}
        />
      </div>
    </div>
  );
}
