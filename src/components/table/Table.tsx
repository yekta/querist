import IconLoading from "@components/icons/IconLoading";
import {
  ExclamationTriangleIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { flexRender, type Table } from "@tanstack/react-table";

export function Table({
  table,
  isLoading,
  isError,
  isNonexistant = false,
}: {
  table: Table<any>;
  isLoading: boolean;
  isError?: boolean;
  isNonexistant?: boolean;
}) {
  if (isError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-2">
        <ExclamationTriangleIcon className="w-8 h-8 text-foreground/60" />
        <p className="text-sm text-foreground/60">Something went wrong</p>
      </div>
    );
  }
  if (isLoading)
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-2">
        <IconLoading className="w-8 h-8 opacity-60" />
        <p className="text-sm text-foreground/0">Loading</p>
      </div>
    );
  if (isNonexistant) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-2">
        <TableCellsIcon className="w-6 h-6 text-foreground/60" />
        <p className="text-sm text-foreground/60">No table to show</p>
      </div>
    );
  }
  return (
    <table className="text-sm -mt-px -ml-px text-left font-normal text-foreground/85 border-0.5 border-border">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                className="p-0 m-0 select-none group"
                tabIndex={-1}
                key={header.id}
              >
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
              <td
                className="p-0 m-0 select-none group"
                tabIndex={-1}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
