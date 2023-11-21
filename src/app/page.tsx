import IconLoading from "@components/icons/IconLoading";
import { Combobox, TComboboxItem } from "@components/primitives/ui/combobox";
import { ScrollArea } from "@components/primitives/ui/scroll-area";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useSchemas } from "@ts/db/hooks/useSchemas";
import { useTables } from "@ts/db/hooks/useTables";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTable } from "@ts/db/hooks/useTable";
import { Table } from "@components/table/Table";
import { TableCell } from "@components/table/TableCell";
import { TableList } from "@components/tableList/TableList";

const columnHelper = createColumnHelper<any>();

export default function HomePage() {
  const {
    data: schemasData,
    isLoading: schemasIsLoading,
    isError: schemasIsError,
    isRefetching: schemasIsRefetching,
  } = useSchemas();
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

  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const { data: tableData, isLoading: tableDataIsLoading } = useTable(
    schemaValue,
    selectedTable
  );

  const [columns, setColumns] = useState<ColumnDef<any, any>[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("rendering");

  useEffect(() => {
    if (!schemasIsLoading && !schemasIsError) {
      setSchemaValue(
        schemasData.includes("public") ? "public" : schemasData[0]
      );
    }
  }, [schemasIsLoading, schemasIsError]);

  useEffect(() => {
    if (!tablesData) return;
    if (tablesData.length === 0) setSelectedTable(null);
    if (!tablesData[0]) return;
    setSelectedTable(tablesData[0].table_name);
  }, [tablesData]);

  useEffect(() => {
    if (!tableData || !tableData.fields || !tableData.rows) return;
    setColumns(
      tableData.fields.map((f) =>
        columnHelper.accessor(f.name, {
          id: f.name,
          header: (info) => <TableCell value={f.name} isHeader />,
          cell: (info) => <TableCell value={info.getValue()} />,
        })
      )
    );
    setRows(tableData.rows);
  }, [tableData]);

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
                      isLoading={schemasIsLoading || schemaValue === null}
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
                  {tablesIsRefetching && (
                    <IconLoading className="w-4 h-4 opacity-60" />
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <TableList
                    isLoading={tablesIsLoading}
                    isError={tablesIsError}
                    data={tablesData}
                    selectedTable={selectedTable}
                    setSelectedTable={setSelectedTable}
                  />
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 flex flex-col items-start justify-start overflow-auto">
          <Table table={table} isLoading={tableDataIsLoading} />
        </div>
      </div>
    </div>
  );
}
