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
import { useSchemas } from "@ts/db/hooks/useSchemas";
import { TTablesRow, useTables } from "@ts/db/hooks/useTables";
import { useEffect, useState } from "react";
import {
  ColumnDef,
  Table,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTable } from "@ts/db/hooks/useTable";

const columnHelper = createColumnHelper<any>();

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
        <div className="w-full flex-1 flex flex-col items-start justify-start overflow-auto">
          <Table table={table} isLoading={tableDataIsLoading} />
        </div>
      </div>
    </div>
  );
}

function TableList({
  isError,
  isLoading,
  data,
  selectedTable,
  setSelectedTable,
}: {
  isError: boolean;
  isLoading: boolean;
  data: TTablesRow[];
  selectedTable: string | null;
  setSelectedTable: (table: string) => void;
}) {
  if (isError)
    return <TableListEmptyView text="Error" Icon={ExclamationTriangleIcon} />;

  if (isLoading)
    return (
      <div className="w-full flex flex-col animate-pulse duration-1000">
        {Array.from({ length: 8 }).map((_, i) => (
          <TableListItemPlaceholder key={i} />
        ))}
      </div>
    );

  if (data && data.length === 0)
    return <TableListEmptyView text="No tables found" />;

  return (
    data &&
    data.length > 0 &&
    data.map((t, i) => (
      <TableListItem
        isSelected={t.table_name === selectedTable}
        key={t.table_name}
        tableName={t.table_name}
        setTable={setSelectedTable}
      />
    ))
  );
}

function TableListItem({
  tableName,
  isSelected,
  setTable,
}: {
  tableName: string;
  isSelected: boolean;
  setTable: (table: string) => void;
}) {
  return (
    <button
      onClick={() => setTable(tableName)}
      className="px-3 py-px w-full text-sm group flex items-center justify-start cursor-default"
    >
      <div
        className={`w-full flex items-center justify-start px-2.5 py-2 border transition-[background] ${
          isSelected
            ? "bg-border border-border shadow-border shadow-borderish"
            : "border-transparent group-hover:border-border group-hover:shadow-border group-hover:shadow-borderish"
        }`}
      >
        <TableCellsIcon
          className={`w-4 h-4 shrink-0 mr-2 group-hover:text-foreground
          ${isSelected ? "text-foreground" : "text-foreground/75"}`}
        />
        <p
          className={`shrink min-w-0 overflow-hidden overflow-ellipsis group-hover:text-foreground
          ${isSelected ? "text-foreground" : "text-foreground/75"}`}
        >
          {tableName}
        </p>
      </div>
    </button>
  );
}

function TableListItemPlaceholder() {
  return (
    <div className="px-3 py-px w-full text-sm group flex items-center justify-start cursor-default">
      <div className="w-full flex items-center justify-start px-2.5 py-2 border border-transparent">
        <div className="w-4 h-4 shrink-0 mr-2 bg-foreground/10" />
        <p className="flex-1 min-w-0 overflow-hidden overflow-ellipsis bg-foreground/10 text-transparent">
          Loading
        </p>
      </div>
    </div>
  );
}

function TableListEmptyView({
  text,
  Icon,
}: {
  text: string;
  Icon?: React.ComponentType<any>;
}) {
  return (
    <div className="w-full flex items-center justify-center px-3 py-px">
      <div className="w-full border border-border px-3 py-6 gap-2 flex items-center justify-center">
        {Icon && <Icon className="w-4 h-4 opacity-60" />}
        <p className="text-sm text-foreground/60">{text}</p>
      </div>
    </div>
  );
}

function TableCell({ isHeader, value }: { isHeader?: boolean; value: any }) {
  return (
    <p
      className={`py-2 px-2 max-w-[13rem] ring-1 ring-border overflow-hidden whitespace-nowrap ${
        isHeader
          ? "bg-background-secondary font-bold text-foreground"
          : "bg-background"
      }`}
    >
      {value === null
        ? "NULL"
        : value === false
        ? "FALSE"
        : value === true
        ? "TRUE"
        : value}
    </p>
  );
}

function Table({
  table,
  isLoading,
}: {
  table: Table<any>;
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <div className="flex-1 flex items-center justify-center w-full">
        <IconLoading className="w-8 h-8 opacity-60" />
      </div>
    );
  return (
    <table className="text-sm text-left font-normal text-foreground/85">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
